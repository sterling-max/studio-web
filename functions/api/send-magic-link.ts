export interface Env {
  DB: D1Database;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  
  try {
    const { email } = await request.json() as any;
    console.log('Sending magic link for email:', email);

    if (!email) {
       return new Response('Email required', { status: 400 });
    }

    // 1. Check if user exists
    console.log('Checking if user exists in DB...');
    const user = await env.DB.prepare(
      'SELECT email FROM licenses WHERE email = ? LIMIT 1'
    ).bind(email).first();

    if (!user) {
      console.log('User not found in licenses table');
      // Return success anyway to prevent email enumeration, but don't send anything
      return new Response(JSON.stringify({ success: true, message: 'Link sent if email exists' }));
    }

    // 2. Generate token
    console.log('Generating token and saving to DB...');
    const token = crypto.randomUUID();
    await env.DB.prepare(
      'INSERT INTO recovery_tokens (token, email, expires_at) VALUES (?, ?, ?)'
    ).bind(token, email, Date.now() + 3600000).run(); // 1 hour expiry

    // 3. Send Email via Resend
    console.log('Preparing Resend email...');
    const magicLink = `https://sterling.ltd/?tab=manage&token=${token}`;
    
    const resendApiKey = (env as any).RESEND_API_KEY;
    if (!resendApiKey) {
      console.warn('RESEND_API_KEY is missing from environment');
      // Fallback for testing if key isn't set yet
      return new Response(JSON.stringify({ success: true, link: magicLink, warning: 'RESEND_API_KEY not found' }));
    }

    console.log('Calling Resend API...');
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

    console.log('Resend Response status:', emailRes.status);
    if (!emailRes.ok) {
      const errorText = await emailRes.text();
      console.error('Resend Error:', errorText);
      throw new Error(`Resend API error: ${errorText}`);
    }

    console.log('Email sent successfully!');
    return new Response(JSON.stringify({ success: true }));

  } catch (err: any) {
    console.error('Worker Catch Block Error:', err.message);
    return new Response(err.message || 'Internal Worker Error', { status: 500 });
  }
};
