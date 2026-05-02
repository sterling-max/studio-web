import {
  createLicenseForStripePayment,
  markStripeLicensesForOrder,
  restoreStripeDisputedLicenses,
  sendLicenseEmail,
} from './_shared/stripeLicensing';

export interface Env {
  DB: D1Database;
  STRIPE_WEBHOOK_SECRET: string;
  RESEND_API_KEY?: string;
}

type StripeEvent = {
  id: string;
  type: string;
  data: {
    object: Record<string, unknown>;
  };
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (!env.STRIPE_WEBHOOK_SECRET) {
    console.error('STRIPE_WEBHOOK_SECRET is not configured');
    return new Response('Webhook secret not configured', { status: 500 });
  }

  const signature = request.headers.get('stripe-signature');
  const rawBody = await request.text();

  if (!signature || !rawBody) {
    return new Response('Missing signature or body', { status: 400 });
  }

  const isValid = await verifyStripeSignature(signature, rawBody, env.STRIPE_WEBHOOK_SECRET);
  if (!isValid) {
    console.error('Invalid Stripe webhook signature');
    return new Response('Invalid signature', { status: 401 });
  }

  let event: StripeEvent;
  try {
    event = JSON.parse(rawBody) as StripeEvent;
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  console.log(`Stripe event received: ${event.type} (${event.id})`);

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object, env);
        break;

      case 'charge.refunded':
        await handleRefund(event.data.object, env.DB);
        break;

      case 'charge.dispute.created':
        await handleDisputeCreated(event.data.object, env.DB);
        break;

      case 'charge.dispute.closed':
        await handleDisputeClosed(event.data.object, env.DB);
        break;

      default:
        console.log(`Unhandled Stripe event: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(`Error handling Stripe event ${event.type}:`, message);
    return new Response(message, { status: 500 });
  }
};

// ─── Event Handlers ───────────────────────────────────────────────────────────

async function handleCheckoutCompleted(
  session: Record<string, unknown>,
  env: Env
): Promise<void> {
  const email = session.customer_details
    ? (session.customer_details as Record<string, unknown>).email as string | null
    : session.customer_email as string | null;

  if (!email) {
    console.error('checkout.session.completed: missing customer email', session.id);
    return;
  }

  const metadata = (session.metadata || {}) as Record<string, string>;
  const sessionId = session.id as string;
  const paymentIntent = session.payment_intent as string | null;

  // Use payment_intent as transaction_id (stable, unique per payment)
  const transactionId = paymentIntent || sessionId;
  const orderId = sessionId;
  const customerId = session.customer as string | null;
  const founderStatus = metadata.founder_status === 'true';
  const productId = metadata.product_id || 'mc_pro';
  const priceId = session.amount_total
    ? (founderStatus ? 'price_1TPpU2Ipbg44pq2FTpPLespg' : 'price_1TSRYPIpbg44pq2FwFvSzqRr')
    : null;

  const { key, duplicate } = await createLicenseForStripePayment(env.DB, {
    email,
    productId,
    transactionId,
    orderId,
    customerId,
    priceId,
    founderStatus,
    payload: {
      stripe_session_id: sessionId,
      stripe_payment_intent: paymentIntent,
    },
  });

  if (duplicate) {
    console.log(`Duplicate checkout.session.completed for session ${sessionId} — key: ${key}`);
    return;
  }

  console.log(`License created: ${key} for ${email} (founder: ${founderStatus})`);
  await sendLicenseEmail(env.RESEND_API_KEY, key, email, founderStatus);
}

async function handleRefund(
  charge: Record<string, unknown>,
  db: D1Database
): Promise<void> {
  const paymentIntent = charge.payment_intent as string | null;
  const chargeId = charge.id as string;
  const transactionId = paymentIntent || chargeId;

  await markStripeLicensesForOrder(
    db,
    transactionId,
    'refunded',
    'Payment was refunded via Stripe.'
  );
  console.log(`License(s) revoked for refunded transaction: ${transactionId}`);
}

async function handleDisputeCreated(
  dispute: Record<string, unknown>,
  db: D1Database
): Promise<void> {
  const paymentIntent = dispute.payment_intent as string | null;
  const disputeId = dispute.id as string;
  const transactionId = paymentIntent || disputeId;

  await markStripeLicensesForOrder(
    db,
    transactionId,
    'disputed',
    'Payment dispute opened in Stripe.'
  );
  console.log(`License(s) suspended for disputed transaction: ${transactionId}`);
}

async function handleDisputeClosed(
  dispute: Record<string, unknown>,
  db: D1Database
): Promise<void> {
  const status = dispute.status as string;
  const paymentIntent = dispute.payment_intent as string | null;
  const disputeId = dispute.id as string;
  const transactionId = paymentIntent || disputeId;

  if (status === 'won') {
    // Merchant won — restore license
    await restoreStripeDisputedLicenses(db, transactionId);
    console.log(`License(s) restored after won dispute: ${transactionId}`);
  } else {
    // lost or warning_closed — keep revoked
    console.log(`Dispute closed with status "${status}" — license remains revoked: ${transactionId}`);
  }
}

// ─── Stripe Signature Verification (HMAC-SHA256 with timing-safe compare) ─────

async function verifyStripeSignature(
  signatureHeader: string,
  body: string,
  secret: string
): Promise<boolean> {
  // stripe-signature format: t=timestamp,v1=hash[,v1=hash...]
  const parts = Object.fromEntries(
    signatureHeader.split(',').map((part) => part.split('=') as [string, string])
  );

  const timestamp = parts['t'];
  const v1 = parts['v1'];

  if (!timestamp || !v1) {
    console.error('Malformed stripe-signature header');
    return false;
  }

  // Reject stale webhooks (>5 minutes)
  const tolerance = 5 * 60;
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - parseInt(timestamp, 10)) > tolerance) {
    console.error(`Stripe webhook timestamp too old: ${timestamp}`);
    return false;
  }

  const signedPayload = `${timestamp}.${body}`;
  const encoder = new TextEncoder();

  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signatureBytes = await crypto.subtle.sign('HMAC', key, encoder.encode(signedPayload));
  const computed = [...new Uint8Array(signatureBytes)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  // Timing-safe comparison
  if (computed.length !== v1.length) return false;
  let mismatch = 0;
  for (let i = 0; i < computed.length; i++) {
    mismatch |= computed.charCodeAt(i) ^ v1.charCodeAt(i);
  }
  return mismatch === 0;
}
