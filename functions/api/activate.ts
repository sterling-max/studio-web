import {
  blockedLicenseMessage,
  createSignedEntitlement,
  ENTITLEMENT_REFRESH_AFTER_MS,
  ENTITLEMENT_TTL_MS,
  isLicenseUsable,
  type LicenseRecord
} from './_shared/licensing';

export interface Env {
  DB: D1Database;
  MASTER_PRIVATE_KEY: string; // Base64 encoded private key seed
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  
  try {
    const { key, machine_id, machine_name, product_id } = await request.json() as any;

    if (!key || !machine_id || !product_id) {
      return new Response(JSON.stringify({ success: false, message: 'Missing parameters' }), { status: 400 });
    }
    const now = Date.now();

    // 1. Check if license exists and matches product
    const license = await env.DB.prepare(
      'SELECT key, email, product_id, status, founder_status FROM licenses WHERE key = ? AND product_id = ?'
    ).bind(key, product_id).first<LicenseRecord>();

    if (!license) {
      return new Response(JSON.stringify({ success: false, message: 'Invalid license key for this product' }), { status: 404 });
    }

    if (!isLicenseUsable(license)) {
      return new Response(JSON.stringify({
        success: false,
        status: license.status,
        message: blockedLicenseMessage(license.status)
      }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 2. Check existing activations
    const activations = await env.DB.prepare(
      "SELECT id, machine_id, activated_at FROM activations WHERE license_key = ? AND COALESCE(status, 'active') = 'active'"
    ).bind(key).all<{ machine_id: string }>();

    const isAlreadyActivated = activations.results.some(a => a.machine_id === machine_id);

    if (!isAlreadyActivated) {
      if (activations.results.length >= 3) {
        return new Response(JSON.stringify({ 
          success: false, 
          message: 'Activation limit reached (3 devices). Please manage your devices at sterling.ltd/manage' 
        }), { status: 403 });
      }

      // 3. Record new activation
      await env.DB.prepare(
        'INSERT INTO activations (id, license_key, machine_id, machine_name, activated_at, status, last_validated_at, entitlement_expires_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
      ).bind(
        crypto.randomUUID(),
        key,
        machine_id,
        machine_name || 'Windows Device',
        now,
        'active',
        now,
        now + ENTITLEMENT_TTL_MS
      ).run();
    }

    const validUntil = now + ENTITLEMENT_TTL_MS;
    const refreshAfter = now + ENTITLEMENT_REFRESH_AFTER_MS;
    const activeActivation = await env.DB.prepare(
      "SELECT id, activated_at FROM activations WHERE license_key = ? AND machine_id = ? AND COALESCE(status, 'active') = 'active'"
    ).bind(key, machine_id).first<{ id: string; activated_at: number }>();

    if (!activeActivation) {
      return new Response(JSON.stringify({ success: false, message: 'Activation could not be created' }), { status: 500 });
    }

    await env.DB.prepare(
      'UPDATE activations SET machine_name = ?, last_validated_at = ?, entitlement_expires_at = ? WHERE id = ?'
    ).bind(machine_name || 'Windows Device', now, validUntil, activeActivation.id).run();

    const boundPayload = {
      email: license.email,
      product_id,
      license_key: license.key,
      machine_id,
      machine_name: machine_name || 'Windows Device',
      plan: license.founder_status ? 'founder' as const : 'standard' as const,
      activated_at: activeActivation.activated_at,
      issued_at: now,
      refresh_after: refreshAfter,
      valid_until: validUntil
    };

    const licenseJson = await createSignedEntitlement(boundPayload, env.MASTER_PRIVATE_KEY);

    return new Response(JSON.stringify({
      success: true,
      license: licenseJson,
      entitlement: licenseJson,
      refresh_after: refreshAfter,
      valid_until: validUntil
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, message: err.message }), { status: 500 });
  }
};
