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
  const { request, env } = context;
  const url = new URL(request.url);
  const token = url.searchParams.get('token');
  const activationId = url.searchParams.get('id');

  if (!token || !activationId) {
    return new Response('Token and ID required', { status: 400 });
  }

  // 1. Verify token and find email
  const recovery = await env.DB.prepare(
    'SELECT email FROM recovery_tokens WHERE token = ? AND expires_at > ?'
  ).bind(token, Date.now()).first<{ email: string }>();

  if (!recovery) {
    return new Response('Invalid or expired token', { status: 401 });
  }

  // 2. Verify that this activation belongs to a license owned by this email
  const ownership = await env.DB.prepare(
    `SELECT a.id FROM activations a 
     JOIN licenses l ON a.license_key = l.key 
     WHERE a.id = ? AND l.email = ?`
  ).bind(activationId, recovery.email).first();

  if (!ownership) {
    return new Response('Activation not found or unauthorized', { status: 403 });
  }

  // 3. Delete the activation
  await env.DB.prepare('DELETE FROM activations WHERE id = ?').bind(activationId).run();

  return new Response(JSON.stringify({ success: true }));
};
