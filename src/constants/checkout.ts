// ─── Stripe Price IDs (test mode) ─────────────────────────────────────────────
// Swap for live price IDs when going live.
export const STRIPE_PRICE_FOUNDER = 'price_1TPpU2Ipbg44pq2FTpPLespg'; // €15 - Founder
export const STRIPE_PRICE_STANDARD = 'price_1TSRYPIpbg44pq2FwFvSzqRr'; // €25 - Standard

// ─── Stripe Checkout ───────────────────────────────────────────────────────────
/**
 * Calls the Cloudflare Function to create a Stripe Checkout Session and
 * redirects the browser to the hosted checkout page.
 */
export async function startStripeCheckout(
  priceId: string,
  onError?: (msg: string) => void
): Promise<void> {
  try {
    const res = await fetch('/api/stripe-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId }),
    });

    const data = await res.json() as { url?: string; error?: string };

    if (!res.ok || !data.url) {
      const msg = data.error || 'Failed to start checkout. Please try again.';
      console.error('Stripe checkout error:', msg);
      onError?.(msg);
      return;
    }

    window.location.href = data.url;
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Network error. Please try again.';
    console.error('Stripe checkout fetch error:', msg);
    onError?.(msg);
  }
}

// ─── Deprecated Lemon Squeezy references (parked, do not use) ─────────────────
export const MAX_COMMANDER_CHECKOUT_ID = '86608fca-fab5-4b6d-a6cb-f74c2487e6c4';
export const MAX_COMMANDER_FOUNDER_DISCOUNT_CODE = 'FOUNDER26';
