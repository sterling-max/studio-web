export interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);
  const token = url.searchParams.get('token');

  if (!token) {
    return new Response('Token required', { status: 400 });
  }

  // 1. Verify token
  const recovery = await env.DB.prepare(
    'SELECT email FROM recovery_tokens WHERE token = ? AND expires_at > ?'
  ).bind(token, Date.now()).first<{ email: string }>();

  if (!recovery) {
    return new Response('Invalid or expired token', { status: 401 });
  }

  const email = recovery.email;

  // 2. Fetch licenses and their activations
  const licenses = await env.DB.prepare(
    'SELECT key, product_id, created_at FROM licenses WHERE email = ?'
  ).bind(email).all();

  const results = await Promise.all(licenses.results.map(async (l: any) => {
    const activations = await env.DB.prepare(
      'SELECT id, machine_id, machine_name, activated_at FROM activations WHERE license_key = ?'
    ).bind(l.key).all();
    return { ...l, activations: activations.results };
  }));

  return new Response(JSON.stringify({ 
    success: true, 
    email,
    licenses: results 
  }));
};

export const onRequestDelete: PagesFunction<Env> = async (context) => {
    // Logic for deactivating a machine
    // ... verification of token and ownership ...
    return new Response(JSON.stringify({ success: true }));
};
