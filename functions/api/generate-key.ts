export interface Env {
  DB: D1Database;
  ADMIN_SECRET: string; // Should be set to DEV-KEY-$T3RL1NG-PRO in Cloudflare
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  
  // 1. Authorization Check
  const authHeader = request.headers.get('Authorization');
  if (authHeader !== `Bearer DEV-KEY-$T3RL1NG-PRO`) {
    return new Response(JSON.stringify({ success: false, message: 'Unauthorized' }), { 
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { email, product_id = 'mc_pro', founder_status = 0 } = await request.json() as any;

    if (!email) {
      return new Response(JSON.stringify({ success: false, message: 'Email is required' }), { status: 400 });
    }

    // 2. Generate a unique license key: MC-FREE-XXXX-XXXX-XXXX-XXXX
    const uuid = crypto.randomUUID().replace(/-/g, '').toUpperCase();
    const key = `MC-FREE-${uuid.substring(0, 4)}-${uuid.substring(4, 8)}-${uuid.substring(8, 12)}-${uuid.substring(12, 16)}`;

    // 3. Store in D1
    // We reuse the schema from paddle-webhook but tag it as a manual/free key
    await env.DB.prepare(
      `INSERT INTO licenses 
       (key, email, product_id, transaction_id, order_id, created_at, payload, founder_status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      key, 
      email, 
      product_id, 
      'MANUAL_GENERATION',
      'FREE_TESTER',
      Date.now(), 
      JSON.stringify({ email, type: 'tester', generated_by: 'admin_api' }),
      founder_status ? 1 : 0
    ).run();

    return new Response(JSON.stringify({
      success: true,
      key,
      email,
      product_id,
      message: `License key generated for ${email}. It is ready for activation.`
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, message: err.message }), { status: 500 });
  }
};
