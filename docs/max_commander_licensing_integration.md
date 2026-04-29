# Max Commander Licensing Integration

> Deprecated payment reference: this document describes the Lemon Squeezy-era payment integration. Max Commander is moving to direct Stripe payments. Keep the technical details here for possible future reference, but do not treat Lemon Squeezy as the active implementation path.

## Authority Model

Sterling Lab remains the license authority. Lemon Squeezy is the Merchant of Record and sends payment lifecycle webhooks.

Disable Lemon Squeezy native license key generation for Max Commander. The website backend generates `MC-PRO-...` license keys on `order_created` and stores them in Cloudflare D1.

## Backend Endpoints

### Activate

`POST https://sterling.ltd/api/activate`

Request:

```json
{
  "key": "MC-PRO-XXXX-XXXX-XXXX-XXXX",
  "product_id": "mc_pro",
  "machine_id": "stable-machine-fingerprint",
  "machine_name": "Max-PC"
}
```

Behavior:

- Fails if the license does not exist.
- Fails if `licenses.status` is not `active`.
- Allows up to 3 active devices.
- Reuses the existing activation if the same `machine_id` is already active.
- Returns a signed entitlement valid for 7 days.

Response:

```json
{
  "success": true,
  "license": "{\"version\":2,\"payload\":\"...\",\"signature\":\"...\"}",
  "entitlement": "{\"version\":2,\"payload\":\"...\",\"signature\":\"...\"}",
  "refresh_after": 1764633600000,
  "valid_until": 1765152000000
}
```

### Validate Existing Activation

`POST https://sterling.ltd/api/validate-license`

Request:

```json
{
  "key": "MC-PRO-XXXX-XXXX-XXXX-XXXX",
  "product_id": "mc_pro",
  "machine_id": "stable-machine-fingerprint"
}
```

Behavior:

- Does not create a new activation.
- Requires an existing active activation for the same `machine_id`.
- Fails if the license was refunded, disputed, or revoked.
- Returns a fresh signed entitlement.

## Signed Entitlement

The `license` and `entitlement` fields currently contain the same signed JSON string.

Decoded payload shape:

```json
{
  "email": "customer@example.com",
  "product_id": "mc_pro",
  "license_key": "MC-PRO-XXXX-XXXX-XXXX-XXXX",
  "machine_id": "stable-machine-fingerprint",
  "machine_name": "Max-PC",
  "plan": "founder",
  "activated_at": 1764547200000,
  "issued_at": 1764547200000,
  "refresh_after": 1764633600000,
  "valid_until": 1765152000000
}
```

The app must verify the Ed25519 signature using the existing Sterling public key before trusting the payload.

## App-Side Rules

- Store the signed entitlement locally.
- Do not store Pro state as a plain boolean.
- On startup:
  - Verify signature.
  - Verify `machine_id` matches the current machine.
  - Verify `product_id === "mc_pro"`.
  - If `Date.now() <= valid_until`, allow Pro features.
  - If `Date.now() > refresh_after` and internet is available, call `/api/validate-license` silently.
  - If refresh succeeds, replace the local entitlement.
  - If refresh fails with `403`, disable Pro immediately and show the server message.
  - If refresh fails due to network only, keep Pro until `valid_until`.
  - If `Date.now() > valid_until`, disable Pro until validation succeeds.

Recommended UX:

- Refresh silently once every 24 hours when online.
- Allow up to 7 days offline use.
- Show a non-blocking warning when fewer than 48 hours remain and refresh is failing.
- Show a blocking license screen after `valid_until`.

## Refunds And Disputes

Lemon Squeezy webhook events:

- `order_refunded`: sets `licenses.status = "refunded"` and revokes all active activations.
- `dispute_created`: sets `licenses.status = "disputed"` and revokes all active activations.
- `dispute_resolved`: restores licenses from `disputed` to `active`; the user may need to activate again if activations were revoked.

Because the app can work offline, refund/dispute revocation is enforced the next time the app refreshes the entitlement, or when the 7-day local entitlement expires.

## Deactivation

The web portal marks activations as `deactivated` instead of deleting rows. The app can keep its existing local deactivation flow, but it should also clear the local entitlement after successful deactivation.
