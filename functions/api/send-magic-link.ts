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

    // 3. Send Email via Resend
    const magicLink = `https://sterling.ltd/?tab=manage&token=${token}`;
    
    const resendApiKey = (env as any).RESEND_API_KEY;
    if (!resendApiKey) {
      // Fallback for testing if key isn't set yet
      return new Response(JSON.stringify({ success: true, link: magicLink, warning: 'RESEND_API_KEY not found' }));
    }

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Sterling Lab <noreply@sterling.ltd>',
        to: [email],
        subject: 'Your Sterling Lab Login Link',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
            <h1 style="color: #007AFF;">Sterling Lab</h1>
            <p>Click the button below to log in to your license management portal. This link expires in 1 hour.</p>
            <div style="margin: 30px 0;">
              <a href="${magicLink}" style="background-color: #007AFF; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">
                Manage My Licenses
              </a>
            </div>
            <p style="font-size: 12px; color: #999;">If you didn't request this link, you can safely ignore this email.</p>
          </div>
        `
      })
    });

    if (!emailRes.ok) {
      const errorText = await emailRes.text();
      throw new Error(`Resend API error: ${errorText}`);
    }

    return new Response(JSON.stringify({ success: true }));

  } catch (err: any) {
    return new Response(err.message, { status: 500 });
  }
};
