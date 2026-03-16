export interface Env {
  DB: D1Database;
  MASTER_PRIVATE_KEY: string; // Base64 encoded private key seed
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const encoder = new TextEncoder();
  
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

    const licenseJson = JSON.stringify({
      payload: btoa(String.fromCharCode(...encoder.encode(payloadStr))),
      signature: signature
    });

    return new Response(JSON.stringify({
      success: true,
      license: licenseJson
    }));

  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, message: err.message }), { status: 500 });
  }
};

async function signPayload(payload: string, privateKeyHex: string): Promise<string> {
  const data = new TextEncoder().encode(payload);
  
  // Convert hex seed to Uint8Array
  const seed = new Uint8Array(privateKeyHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
  
  // Ed25519 PKCS#8 header for a 32-byte private key
  // This is a minimal DER-encoded PKCS#8 for Ed25519
  const pkcs8Header = new Uint8Array([
    0x30, 0x2e, 0x02, 0x01, 0x00, 0x30, 0x05, 0x06, 0x03, 0x2b, 0x65, 0x70, 0x04, 0x22, 0x04, 0x20
  ]);
  const pkcs8 = new Uint8Array(pkcs8Header.length + seed.length);
  pkcs8.set(pkcs8Header);
  pkcs8.set(seed, pkcs8Header.length);

  const key = await crypto.subtle.importKey(
    "pkcs8",
    pkcs8,
    { name: "Ed25519", namedCurve: "Ed25519" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    { name: "Ed25519" },
    key,
    data
  );

  // Convert signature to hex
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}
