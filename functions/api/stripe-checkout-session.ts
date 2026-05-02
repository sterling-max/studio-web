export interface Env {
  STRIPE_SECRET_KEY: string;
}

const ALLOWED_PRICE_IDS = new Set([
  'price_1TPpU2Ipbg44pq2FTpPLespg', // Founder €15 (test)
  'price_1TSRYPIpbg44pq2FwFvSzqRr', // Standard €25 (test)
]);

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (!env.STRIPE_SECRET_KEY) {
    return new Response(JSON.stringify({ error: 'Stripe not configured' }), {
      status: 500,
      headers: corsHeaders,
    });
  }

  let body: { priceId?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: corsHeaders,
    });
  }

  const { priceId } = body;

  if (!priceId || !ALLOWED_PRICE_IDS.has(priceId)) {
    return new Response(JSON.stringify({ error: 'Invalid price ID' }), {
      status: 400,
      headers: corsHeaders,
    });
  }

  const isFounder = priceId === 'price_1TPpU2Ipbg44pq2FTpPLespg';

  try {
    const params = new URLSearchParams({
      'mode': 'payment',
      'line_items[0][price]': priceId,
      'line_items[0][quantity]': '1',
      'success_url': 'https://sterling.ltd/?purchase=success',
      'cancel_url': 'https://sterling.ltd/products/max-commander',
      'automatic_tax[enabled]': 'true',
      'tax_id_collection[enabled]': 'true',
      'allow_promotion_codes': 'true',
      'metadata[product_id]': 'mc_pro',
      'metadata[license_tier]': isFounder ? 'founder' : 'standard',
      'metadata[founder_status]': isFounder ? 'true' : 'false',
      'payment_intent_data[statement_descriptor]': 'MAXCMD',
      'payment_intent_data[metadata][product_id]': 'mc_pro',
      'payment_intent_data[metadata][license_tier]': isFounder ? 'founder' : 'standard',
    });

    const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const session = await stripeRes.json() as { id?: string; url?: string; error?: { message: string } };

    if (!stripeRes.ok || !session.url) {
      console.error('Stripe session creation failed:', session.error?.message);
      return new Response(
        JSON.stringify({ error: session.error?.message || 'Failed to create checkout session' }),
        { status: 400, headers: corsHeaders }
      );
    }

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Checkout session error:', message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
