// Deprecated Lemon Squeezy checkout references.
// Keep these values for historical/reference use only; active Max Commander paid checkout is paused.
export const MAX_COMMANDER_CHECKOUT_ID = '86608fca-fab5-4b6d-a6cb-f74c2487e6c4';
export const MAX_COMMANDER_CHECKOUT_URL = `https://sterling.lemonsqueezy.com/checkout/buy/${MAX_COMMANDER_CHECKOUT_ID}`;
export const MAX_COMMANDER_FOUNDER_DISCOUNT_CODE = 'FOUNDER26';
export const MAX_COMMANDER_FOUNDER_CHECKOUT_URL = [
  MAX_COMMANDER_CHECKOUT_URL,
  '?checkout[discount_code]=',
  MAX_COMMANDER_FOUNDER_DISCOUNT_CODE,
  '&checkout[custom][product_id]=mc_pro',
  '&checkout[custom][founder_status]=true'
].join('');
export const MAX_COMMANDER_STANDARD_CHECKOUT_URL = `${MAX_COMMANDER_CHECKOUT_URL}?checkout[custom][product_id]=mc_pro`;

export const maxCommanderCheckoutUrls = {
  founder: import.meta.env.VITE_LEMON_SQUEEZY_FOUNDER_CHECKOUT_URL || MAX_COMMANDER_FOUNDER_CHECKOUT_URL,
  standard: import.meta.env.VITE_LEMON_SQUEEZY_STANDARD_CHECKOUT_URL || MAX_COMMANDER_STANDARD_CHECKOUT_URL
};

export function withLemonSqueezyEmbed(url: string): string {
  const checkoutUrl = new URL(url);
  checkoutUrl.searchParams.set('embed', '1');
  return checkoutUrl.toString();
}
