export interface Env {
  DB: D1Database;
  LEMON_SQUEEZY_WEBHOOK_SECRET: string;
  RESEND_API_KEY: string;
}

type LemonSqueezyOrderPayload = {
  meta?: {
    event_name?: string;
    custom_data?: {
      product_id?: string;
      founder_status?: boolean | string;
    };
  };
  data?: {
    id?: string;
    attributes?: {
      customer_id?: number | string;
      first_order_item?: {
        product_id?: number | string;
        variant_id?: number | string;
      };
      identifier?: string;
      order_number?: number | string;
      user_email?: string;
      refunded_at?: string | null;
      status?: string;
    };
  };
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  const signature = request.headers.get('x-signature');
  const rawBody = await request.text();

  if (!signature || !rawBody) {
    return new Response('Missing signature or body', { status: 401 });
  }

  const isValid = await verifyLemonSqueezySignature(signature, rawBody, env.LEMON_SQUEEZY_WEBHOOK_SECRET);
  if (!isValid) {
    console.error('Invalid Lemon Squeezy signature');
    return new Response('Invalid signature', { status: 401 });
  }

  try {
    const body = JSON.parse(rawBody) as LemonSqueezyOrderPayload;
    const eventName = request.headers.get('x-event-name') || body.meta?.event_name;

    if (eventName === 'order_created') {
      const attributes = body.data?.attributes;
      const orderItem = attributes?.first_order_item;
      const customData = body.meta?.custom_data || {};
      const email = attributes?.user_email;

      if (!email) {
        console.error('Lemon Squeezy order missing user_email');
        return new Response('Missing customer email', { status: 400 });
      }

      const transactionId = attributes?.identifier || body.data?.id || String(attributes?.order_number || '');
      const orderId = body.data?.id || String(attributes?.order_number || transactionId);
      const customerId = attributes?.customer_id ? String(attributes.customer_id) : null;
      const productId = customData.product_id || 'mc_pro';
      const priceId = orderItem?.variant_id ? String(orderItem.variant_id) : null;
      const founderStatus = customData.founder_status === true || customData.founder_status === 'true' ? 1 : 0;

      const existingLicense = await env.DB.prepare(
        'SELECT key FROM licenses WHERE transaction_id = ? OR order_id = ? LIMIT 1'
      ).bind(transactionId, orderId).first<{ key: string }>();

      if (existingLicense) {
        return new Response(JSON.stringify({ success: true, key: existingLicense.key, duplicate: true }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const uuid = crypto.randomUUID().replace(/-/g, '').toUpperCase();
      const key = `MC-PRO-${uuid.substring(0, 4)}-${uuid.substring(4, 8)}-${uuid.substring(8, 12)}-${uuid.substring(12, 16)}`;

      await env.DB.prepare(
        `INSERT INTO licenses
         (key, email, product_id, transaction_id, order_id, created_at, payload, customer_id, price_id, founder_status, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(
        key,
        email,
        productId,
        transactionId,
        orderId,
        Date.now(),
        JSON.stringify({ email, transactionId, customerId, priceId, founder_status: !!founderStatus }),
        customerId,
        priceId,
        founderStatus,
        'active'
      ).run();

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
            subject: 'Your Max Commander Pro License',
            html: renderEmailTemplate(key, email, !!founderStatus)
          })
        });
      }

      return new Response(JSON.stringify({ success: true, key }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (eventName === 'order_refunded') {
      const transactionId = extractTransactionId(body);
      await markLicensesForOrder(env.DB, transactionId, 'refunded', 'Purchase was refunded through Lemon Squeezy.');

      return new Response(JSON.stringify({ success: true, event: eventName }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (eventName === 'dispute_created') {
      const transactionId = extractTransactionId(body);
      await markLicensesForOrder(env.DB, transactionId, 'disputed', 'Payment dispute opened in Lemon Squeezy.');

      return new Response(JSON.stringify({ success: true, event: eventName }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (eventName === 'dispute_resolved') {
      const transactionId = extractTransactionId(body);
      await restoreDisputedLicensesForOrder(env.DB, transactionId);

      return new Response(JSON.stringify({ success: true, event: eventName }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response('Event ignored', { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown webhook error';
    console.error('Webhook error:', message);
    return new Response(message, { status: 500 });
  }
};

function extractTransactionId(body: LemonSqueezyOrderPayload): string {
  const attributes = body.data?.attributes;
  return attributes?.identifier || body.data?.id || String(attributes?.order_number || '');
}

async function markLicensesForOrder(
  db: D1Database,
  transactionId: string,
  status: 'refunded' | 'disputed',
  reason: string
): Promise<void> {
  if (!transactionId) {
    console.warn(`Unable to mark ${status} license: missing Lemon Squeezy transaction identifier`);
    return;
  }

  const now = Date.now();
  const timestampColumn = status === 'refunded' ? 'refunded_at' : 'disputed_at';

  await db.prepare(
    `UPDATE licenses
     SET status = ?, ${timestampColumn} = ?, revoked_at = ?, revocation_reason = ?
     WHERE transaction_id = ? OR order_id = ?`
  ).bind(status, now, now, reason, transactionId, transactionId).run();

  await db.prepare(
    `UPDATE activations
     SET status = 'revoked', deactivated_at = ?
     WHERE license_key IN (
       SELECT key FROM licenses WHERE transaction_id = ? OR order_id = ?
     )`
  ).bind(now, transactionId, transactionId).run();
}

async function restoreDisputedLicensesForOrder(db: D1Database, transactionId: string): Promise<void> {
  if (!transactionId) {
    console.warn('Unable to restore disputed license: missing Lemon Squeezy transaction identifier');
    return;
  }

  await db.prepare(
    `UPDATE licenses
     SET status = 'active', disputed_at = NULL, revoked_at = NULL, revocation_reason = NULL
     WHERE (transaction_id = ? OR order_id = ?) AND status = 'disputed'`
  ).bind(transactionId, transactionId).run();
}

async function verifyLemonSqueezySignature(signatureHeader: string, body: string, secret: string): Promise<boolean> {
  if (!secret) {
    console.error('Lemon Squeezy webhook secret is not configured');
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

  const signatureBytes = hexToBytes(signatureHeader.trim());
  if (!signatureBytes) {
    return false;
  }
  const signatureBuffer = signatureBytes.buffer.slice(
    signatureBytes.byteOffset,
    signatureBytes.byteOffset + signatureBytes.byteLength
  ) as ArrayBuffer;

  return crypto.subtle.verify('HMAC', key, signatureBuffer, encoder.encode(body));
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
        <p style="margin: 0; font-size: 14px; font-weight: 700; color: #007AFF;">Founder Status Confirmed</p>
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
        &copy; 2026 Sterling Lab. Hand-crafted with precision.
      </div>
    </div>
  `;
}
