# Max Commander - Main Site Features

## Lemon Squeezy Webhook

- Webhook URL: `https://sterling.ltd/api/lemon-squeezy-webhook`
- Cloudflare secret name: `LEMON_SQUEEZY_WEBHOOK_SECRET`
- Signing secret value: stored in Lemon Squeezy and Cloudflare Pages secrets. Do not commit it to the repo.
- Active events:
  - `order_created`
  - `order_refunded`
  - `license_key_created`
  - `license_key_updated`
  - `dispute_created`
  - `dispute_resolved`
- Native Lemon Squeezy license key generation: disabled for Max Commander. Sterling D1 remains the license authority.
- Local entitlement TTL: 7 days.
- Silent refresh target: every 24 hours when online.
- App integration notes: `docs/max_commander_licensing_integration.md`

## Lemon Squeezy Checkout

- Storefront checkout URL: `https://sterling.lemonsqueezy.com/checkout/buy/86608fca-fab5-4b6d-a6cb-f74c2487e6c4`
- Checkout ID: `86608fca-fab5-4b6d-a6cb-f74c2487e6c4`
- Standard license checkout: `https://sterling.lemonsqueezy.com/checkout/buy/86608fca-fab5-4b6d-a6cb-f74c2487e6c4`
- Founder discount code: `FOUNDER26`
- Founder checkout: `https://sterling.lemonsqueezy.com/checkout/buy/86608fca-fab5-4b6d-a6cb-f74c2487e6c4?discount=FOUNDER26`
- Embedded popup checkout uses the same URLs with `embed=1` added at runtime.

Next steps:
- [ ] Implement License Management Portal
- [ ] Implement Activation API (Cloudflare Worker)
- [ ] Implement Lemon Squeezy webhook
