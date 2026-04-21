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
  MASTER_PRIVATE_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    const { key, machine_id, product_id } = await request.json() as any;

    if (!key || !machine_id || !product_id) {
      return new Response(JSON.stringify({ success: false, message: 'Missing parameters' }), { status: 400 });
    }

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

    const activation = await env.DB.prepare(
      `SELECT id, machine_name, activated_at
       FROM activations
       WHERE license_key = ? AND machine_id = ? AND COALESCE(status, 'active') = 'active'`
    ).bind(key, machine_id).first<{ id: string; machine_name: string | null; activated_at: number }>();

    if (!activation) {
      return new Response(JSON.stringify({
        success: false,
        message: 'This device is not activated for this license.'
      }), { status: 404 });
    }

    const now = Date.now();
    const validUntil = now + ENTITLEMENT_TTL_MS;
    const refreshAfter = now + ENTITLEMENT_REFRESH_AFTER_MS;
    const machineName = activation.machine_name || 'Windows Device';

    await env.DB.prepare(
      'UPDATE activations SET last_validated_at = ?, entitlement_expires_at = ? WHERE id = ?'
    ).bind(now, validUntil, activation.id).run();

    const entitlement = await createSignedEntitlement({
      email: license.email,
      product_id,
      license_key: license.key,
      machine_id,
      machine_name: machineName,
      plan: license.founder_status ? 'founder' : 'standard',
      activated_at: activation.activated_at,
      issued_at: now,
      refresh_after: refreshAfter,
      valid_until: validUntil
    }, env.MASTER_PRIVATE_KEY);

    return new Response(JSON.stringify({
      success: true,
      license: entitlement,
      entitlement,
      refresh_after: refreshAfter,
      valid_until: validUntil
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, message: err.message }), { status: 500 });
  }
};
