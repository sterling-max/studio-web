export interface Env {
  DB: D1Database;
  PADDLE_WEBHOOK_SECRET: string;
  RESEND_API_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
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

    if (body.event_type === 'transaction.completed') {
      const data = body.data;
      const email = data.customer?.email || data.details?.customer?.email || data.customer?.email_address;
      const transactionId = data.id;
      const customerId = data.customer_id;
      const primaryItem = data.items[0];
      const productId = primaryItem?.product?.id || 'mc_pro';
      const priceId = primaryItem?.price?.id;
      const customData = primaryItem?.price?.custom_data || {};
      const founderStatus = customData.founder_status === true || customData.founder_status === 'true' ? 1 : 0;
      const finalEmail = email || `sim_${Date.now()}@test.sterling.ltd`;

      const existingLicense = await env.DB.prepare(
        'SELECT key FROM licenses WHERE transaction_id = ? OR order_id = ? LIMIT 1'
      ).bind(transactionId, transactionId).first<{ key: string }>();

      if (existingLicense) {
        return new Response(JSON.stringify({ success: true, key: existingLicense.key, duplicate: true }));
      }

      const uuid = crypto.randomUUID().replace(/-/g, '').toUpperCase();
      const key = `MC-PRO-${uuid.substring(0, 4)}-${uuid.substring(4, 8)}-${uuid.substring(8, 12)}-${uuid.substring(12, 16)}`;

      await env.DB.prepare(
        `INSERT INTO licenses
         (key, email, product_id, transaction_id, order_id, created_at, payload, customer_id, price_id, founder_status, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(
        key,
        finalEmail,
        productId,
        transactionId,
        transactionId,
        Date.now(),
        JSON.stringify({ email: finalEmail, transactionId, customerId, priceId, founder_status: !!founderStatus }),
        customerId,
        priceId,
        founderStatus,
        'active'
      ).run();

      if (env.RESEND_API_KEY && finalEmail && !finalEmail.includes('@test.sterling.ltd')) {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'Sterling Lab <noreply@sterling.ltd>',
            to: [email],
            subject: 'Your Max Commander Pro License',
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

async function verifyPaddleSignature(signatureHeader: string, body: string, secret: string): Promise<boolean> {
  const parts = signatureHeader.split(';');
  const tsPart = parts.find((part) => part.startsWith('ts='));
  const hPart = parts.find((part) => part.startsWith('h1=') || part.startsWith('h='));

  if (!tsPart || !hPart) {
    console.error('Webhook signature parts missing:', signatureHeader);
    return false;
  }

  const timestamp = tsPart.split('=')[1];
  const receivedHash = hPart.split('=')[1];
  const signedPayload = `${timestamp}:${body}`;
  const signatureBytes = hexToBytes(receivedHash);

  if (!signatureBytes) {
    return false;
  }

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );
  const signatureBuffer = signatureBytes.buffer.slice(
    signatureBytes.byteOffset,
    signatureBytes.byteOffset + signatureBytes.byteLength
  ) as ArrayBuffer;

  return crypto.subtle.verify('HMAC', key, signatureBuffer, encoder.encode(signedPayload));
}

function hexToBytes(hex: string): Uint8Array | null {
  if (!/^[0-9a-f]+$/i.test(hex) || hex.length % 2 !== 0) {
    return null;
  }

  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i += 1) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }

  return bytes;
}

function renderEmailTemplate(key: string, email: string, isFounder: boolean) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a; background-color: #ffffff;">
      <h1 style="font-size: 24px; font-weight: 800; color: #007AFF; margin: 0 0 40px 0;">Sterling <span style="color: #1a1a1a;">Lab</span></h1>
      <h2 style="font-size: 32px; font-weight: 800; line-height: 1.1; margin-bottom: 24px; color: #1a1a1a;">Ready for take-off.</h2>
      <p style="font-size: 16px; line-height: 1.6; color: #4a4a4a; margin-bottom: 32px;">
        Thank you for your purchase. You've officially upgraded to <strong>Max Commander Pro</strong>${isFounder ? ' (Founder Edition)' : ''}.
        Your license key is ready to activate on up to 3 devices.
      </p>
      <div style="background-color: #f5f5f7; border-radius: 16px; padding: 32px; text-align: center; margin-bottom: 32px; border: 1px solid #e5e5e5;">
        <span style="display: block; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #86868b; margin-bottom: 8px;">Your License Key</span>
        <code style="font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 20px; font-weight: 700; color: #007AFF; letter-spacing: 0.05em;">${key}</code>
      </div>
      <p style="font-size: 13px; color: #86868b; line-height: 1.5;">
        Need help? You can manage your activated devices at any time by visiting
        <a href="https://sterling.ltd/?tab=manage" style="color: #007AFF; text-decoration: none; font-weight: 600;">Sterling Management Portal</a>.
      </p>
    </div>
  `;
}
