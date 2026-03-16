export interface Env {
  DB: D1Database;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  
  try {
    const { email } = await request.json() as any;

    if (!email) {
       return new Response('Email required', { status: 400 });
    }

    // 1. Check if user exists
    const user = await env.DB.prepare(
      'SELECT email FROM licenses WHERE email = ? LIMIT 1'
    ).bind(email).first();

    if (!user) {
      // Return success anyway to prevent email enumeration, but don't send anything
      return new Response(JSON.stringify({ success: true, message: 'Link sent if email exists' }));
    }

    // 2. Generate token
    const token = crypto.randomUUID();
    await env.DB.prepare(
      'INSERT INTO recovery_tokens (token, email, expires_at) VALUES (?, ?, ?)'
    ).bind(token, email, Date.now() + 3600000).run(); // 1 hour expiry

    // 3. Send Email
    const magicLink = `https://sterling.ltd/?tab=manage&token=${token}`;
    // await sendEmail(email, magicLink);

    return new Response(JSON.stringify({ success: true, link: magicLink })); // Return link for testing

  } catch (err: any) {
    return new Response(err.message, { status: 500 });
  }
};
