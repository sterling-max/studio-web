export type StripeLicenseSource = {
  email: string;
  productId?: string;
  transactionId: string;
  orderId: string;
  customerId?: string | null;
  priceId?: string | null;
  founderStatus?: boolean;
  payload?: Record<string, unknown>;
};

export async function createLicenseForStripePayment(
  db: D1Database,
  source: StripeLicenseSource
): Promise<{ key: string; duplicate: boolean }> {
  const productId = source.productId || 'mc_pro';
  const existingLicense = await db.prepare(
    'SELECT key FROM licenses WHERE transaction_id = ? OR order_id = ? LIMIT 1'
  ).bind(source.transactionId, source.orderId).first<{ key: string }>();

  if (existingLicense) {
    return { key: existingLicense.key, duplicate: true };
  }

  const uuid = crypto.randomUUID().replace(/-/g, '').toUpperCase();
  const key = `MC-PRO-${uuid.substring(0, 4)}-${uuid.substring(4, 8)}-${uuid.substring(8, 12)}-${uuid.substring(12, 16)}`;
  const now = Date.now();
  const founderStatus = source.founderStatus ? 1 : 0;

  await db.prepare(
    `INSERT INTO licenses
     (key, email, product_id, transaction_id, order_id, created_at, payload, customer_id, price_id, founder_status, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    key,
    source.email,
    productId,
    source.transactionId,
    source.orderId,
    now,
    JSON.stringify({
      email: source.email,
      product_id: productId,
      transaction_id: source.transactionId,
      order_id: source.orderId,
      customer_id: source.customerId || null,
      price_id: source.priceId || null,
      founder_status: Boolean(founderStatus),
      provider: 'stripe',
      created_at: now,
      ...source.payload
    }),
    source.customerId || null,
    source.priceId || null,
    founderStatus,
    'active'
  ).run();

  return { key, duplicate: false };
}

export async function markStripeLicensesForOrder(
  db: D1Database,
  transactionId: string,
  status: 'refunded' | 'disputed',
  reason: string
): Promise<void> {
  if (!transactionId) {
    console.warn(`Unable to mark ${status} license: missing Stripe transaction identifier`);
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

export async function restoreStripeDisputedLicenses(db: D1Database, transactionId: string): Promise<void> {
  if (!transactionId) {
    console.warn('Unable to restore disputed license: missing Stripe transaction identifier');
    return;
  }

  await db.prepare(
    `UPDATE licenses
     SET status = 'active', disputed_at = NULL, revoked_at = NULL, revocation_reason = NULL
     WHERE (transaction_id = ? OR order_id = ?) AND status = 'disputed'`
  ).bind(transactionId, transactionId).run();
}

export async function sendLicenseEmail(
  resendApiKey: string | undefined,
  key: string,
  email: string,
  isFounder: boolean
): Promise<void> {
  if (!resendApiKey) return;

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'Sterling Lab <noreply@sterling.ltd>',
      to: [email],
      subject: 'Your Max Commander Pro License',
      html: renderLicenseEmail(key, email, isFounder)
    })
  });
}

function renderLicenseEmail(key: string, email: string, isFounder: boolean): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a; background-color: #ffffff;">
      <h1 style="font-size: 24px; font-weight: 800; color: #007AFF; margin: 0 0 40px 0;">Sterling <span style="color: #1a1a1a;">Lab</span></h1>
      <h2 style="font-size: 32px; font-weight: 800; line-height: 1.1; margin-bottom: 24px; color: #1a1a1a;">Ready for take-off.</h2>
      <p style="font-size: 16px; line-height: 1.6; color: #4a4a4a; margin-bottom: 32px;">
        Thank you for your purchase. You've upgraded to <strong>Max Commander Pro</strong>${isFounder ? ' (Founder Edition)' : ''}.
        Your license key is ready to activate on up to 3 devices.
      </p>
      <div style="background-color: #f5f5f7; border-radius: 16px; padding: 32px; text-align: center; margin-bottom: 32px; border: 1px solid #e5e5e5;">
        <span style="display: block; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #86868b; margin-bottom: 8px;">Your License Key</span>
        <code style="font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 20px; font-weight: 700; color: #007AFF; letter-spacing: 0.05em;">${key}</code>
      </div>
      <p style="font-size: 13px; color: #86868b; line-height: 1.5;">
        Need help? You can manage your activated devices at any time by visiting
        <a href="https://sterling.ltd/manage" style="color: #007AFF; text-decoration: none; font-weight: 600;">Sterling Management Portal</a>.
      </p>
    </div>
  `;
}
