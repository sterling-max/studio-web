export interface Env {
  DB: D1Database;
  MASTER_PRIVATE_KEY: string; // Base64 encoded private key seed
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  
  try {
    const { key, machine_id, product_id } = await request.json() as any;

    if (!key || !machine_id || !product_id) {
      return new Response(JSON.stringify({ success: false, message: 'Missing parameters' }), { status: 400 });
    }

    // 1. Check if license exists and matches product
    const license = await env.DB.prepare(
      'SELECT * FROM licenses WHERE key = ? AND product_id = ?'
    ).bind(key, product_id).first<{ key: string, email: string, payload: string }>();

    if (!license) {
      return new Response(JSON.stringify({ success: false, message: 'Invalid license key for this product' }), { status: 404 });
    }

    // 2. Check existing activations
    const activations = await env.DB.prepare(
      'SELECT machine_id FROM activations WHERE license_key = ?'
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
        'INSERT INTO activations (id, license_key, machine_id, activated_at) VALUES (?, ?, ?, ?)'
      ).bind(crypto.randomUUID(), key, machine_id, Date.now()).run();
    }

    // 4. Sign a machine-bound license
    // Payload contains: email, product_id, machine_id, activated_at
    const boundPayload = {
      email: license.email,
      product_id,
      machine_id,
      activated_at: Date.now()
    };
    
    const payloadStr = JSON.stringify(boundPayload);
    const signature = await signPayload(payloadStr, env.MASTER_PRIVATE_KEY);

    return new Response(JSON.stringify({
      success: true,
      license: `payload=${btoa(payloadStr)};signature_hex=${signature}`
    }));

  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, message: err.message }), { status: 500 });
  }
};

async function signPayload(payload: string, privateKeyBase64: string): Promise<string> {
  // In a real implementation, we'd use crypto.subtle.importKey and sign
  // Cloudflare supports Ed25519. We'll implement the actual signing logic here.
  // This is a placeholder for the actual subtle crypto calls.
  return "SIGNATURE_PLACEHOLDER"; 
}
