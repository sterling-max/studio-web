export interface Env {
  DB: D1Database;
  PADDLE_WEBHOOK_SECRET: string;
  RESEND_API_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  
  // 1. Verify Paddle Signature
  const signature = request.headers.get('paddle-signature');
  const rawBody = await request.text();
  
  if (!signature || !rawBody) {
    return new Response('Missing signature or body', { status: 401 });
  }

  const isValid = await verifyPaddleSignature(signature, rawBody, env.PADDLE_WEBHOOK_SECRET);
  if (!isValid) {
    console.error('Invalid Paddle Signature');
    return new Response('Invalid signature', { status: 401 });
  }

  try {
    const body: any = JSON.parse(rawBody);

    // Paddle Transaction Completed
    if (body.event_type === 'transaction.completed') {
      const data = body.data;
      const email = data.customer?.email || data.details?.customer?.email;
      const transactionId = data.id;
      const customerId = data.customer_id;
      
      // Get primary item (Max Commander)
      const primaryItem = data.items[0];
      const productId = primaryItem?.product?.id || 'mc_pro';
      const priceId = primaryItem?.price?.id;
      
      // Extract custom data (e.g., founder_status)
      const customData = primaryItem?.price?.custom_data || {};
      const founderStatus = customData.founder_status === true || customData.founder_status === "true" ? 1 : 0;

      if (!email) {
        return new Response('Missing customer email', { status: 400 });
      }

      // Generate a unique license key: MC-PRO-XXXX-XXXX-XXXX-XXXX
      const uuid = crypto.randomUUID().replace(/-/g, '').toUpperCase();
      const key = `MC-PRO-${uuid.substring(0, 4)}-${uuid.substring(4, 8)}-${uuid.substring(8, 12)}-${uuid.substring(12, 16)}`;

      // Store in D1 with new fields
      await env.DB.prepare(
        `INSERT INTO licenses 
         (key, email, product_id, transaction_id, order_id, created_at, payload, customer_id, price_id, founder_status) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(
        key, 
        email, 
        productId, 
        transactionId,
        transactionId, // Also put in order_id for legacy compatibility
        Date.now(), 
        JSON.stringify({ email, transactionId, customerId, priceId, founder_status: !!founderStatus }),
        customerId,
        priceId,
        founderStatus
      ).run();

      // 2. Send Automated Delivery Email via Resend
      if (env.RESEND_API_KEY) {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'Sterling Lab <noreply@sterling.ltd>',
            to: [email],
            subject: 'Your Max Commander Pro License 🦾',
            html: renderEmailTemplate(key, email, !!founderStatus)
          })
        });
      }

      return new Response(JSON.stringify({ success: true, key }));
    }

    return new Response('Event ignored', { status: 200 });

  } catch (err: any) {
    console.error('Webhook Error:', err.message);
    return new Response(err.message, { status: 500 });
  }
};

/**
 * Verifies Paddle Webhook Signature (HMAC-SHA256)
 */
async function verifyPaddleSignature(signatureHeader: string, body: string, secret: string): Promise<boolean> {
  const parts = signatureHeader.split(';');
  const tsPart = parts.find(p => p.startsWith('ts='));
  const hPart = parts.find(p => p.startsWith('h1=') || p.startsWith('h='));

  if (!tsPart || !hPart) {
    console.error('Webhook signature parts missing:', signatureHeader);
    return false;
  }

  const timestamp = tsPart.split('=')[1];
  const receivedHash = hPart.split('=')[1];
  const signedPayload = `${timestamp}:${body}`;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );

  const signatureBytes = new Uint8Array(
    receivedHash.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16))
  );

  const isValid = await crypto.subtle.verify(
    'HMAC',
    key,
    signatureBytes,
    encoder.encode(signedPayload)
  );

  if (!isValid) {
    console.error('Signature Mismatch Debug:');
    console.error('- Timestamp:', timestamp);
    console.error('- Secret (first 10):', secret.substring(0, 10) + '...');
    console.error('- Payload Length:', body.length);
  }

  return isValid;
}

function renderEmailTemplate(key: string, email: string, isFounder: boolean) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a; background-color: #ffffff;">
      <div style="margin-bottom: 40px;">
        <h1 style="font-size: 24px; font-weight: 800; color: #007AFF; margin: 0; letter-spacing: -0.02em;">Sterling <span style="color: #1a1a1a;">Lab</span></h1>
      </div>
      
      <h2 style="font-size: 32px; font-weight: 800; line-height: 1.1; margin-bottom: 24px; color: #1a1a1a;">Ready for take-off.</h2>
      
      <p style="font-size: 16px; line-height: 1.6; color: #4a4a4a; margin-bottom: 32px;">
        Thank you for your purchase. You've officially upgraded to <strong>Max Commander Pro</strong>${isFounder ? ' (Founder Edition)' : ''}. 
        Your license key is ready to activate on up to 3 devices.
      </p>

      <div style="background-color: #f5f5f7; border-radius: 16px; padding: 32px; text-align: center; margin-bottom: 32px; border: 1px solid #e5e5e5;">
        <span style="display: block; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #86868b; margin-bottom: 8px;">Your License Key</span>
        <code style="font-family: 'SF Mono', SFMono-Regular, ui-monospace, 'DejaVu Sans Mono', monospace; font-size: 20px; font-weight: 700; color: #007AFF; letter-spacing: 0.05em;">${key}</code>
      </div>

      ${isFounder ? `
      <div style="background-color: #007AFF10; border-radius: 12px; padding: 16px; margin-bottom: 32px; border: 1px solid #007AFF30;">
        <p style="margin: 0; font-size: 14px; font-weight: 700; color: #007AFF;">🛡️ Founder Status Confirmed</p>
        <p style="margin: 4px 0 0 0; font-size: 13px; color: #4a4a4a;">You'll receive a special badge and priority support in the app.</p>
      </div>` : ''}

      <div style="margin-bottom: 40px;">
        <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 12px;">Quick Start</h3>
        <ol style="font-size: 15px; line-height: 1.6; color: #4a4a4a; padding-left: 20px;">
          <li>Open <strong>Max Commander</strong></li>
          <li>Press <kbd style="background: #eee; padding: 2px 4px; border-radius: 4px; font-size: 13px;">F9</kbd> to open Settings</li>
          <li>Go to the <strong>License</strong> section</li>
          <li>Paste your key and click <strong>Apply License</strong></li>
        </ol>
      </div>

      <hr style="border: 0; border-top: 1px solid #eee; margin-bottom: 32px;" />

      <p style="font-size: 13px; color: #86868b; line-height: 1.5;">
        Need help? You can manage your activated devices at any time by visiting the 
        <a href="https://sterling.ltd/?tab=manage" style="color: #007AFF; text-decoration: none; font-weight: 600;">Sterling Management Portal</a>.
      </p>

      <div style="margin-top: 60px; font-size: 11px; color: #b0b0b0; text-transform: uppercase; letter-spacing: 0.1em;">
        © 2026 Sterling Lab. Hand-crafted with precision.
      </div>
    </div>
  `;
}
