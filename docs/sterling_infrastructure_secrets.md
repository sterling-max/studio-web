# Sterling Website Infrastructure Secrets

This document records where Sterling Lab website/backend secrets belong. It intentionally avoids storing raw secret values because this repo contains deployable website code and shared project memory.

## Cloudflare Pages Secrets

Configure these in the `sterling-lab` Cloudflare Pages project:

| Variable | Purpose |
|----------|---------|
| `ADMIN_SECRET` | Manual license generation authorization for `/api/generate-key` |
| `MASTER_PRIVATE_KEY` | License entitlement signing |
| `STRIPE_SECRET_KEY` | Stripe Checkout API |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signature verification |
| `RESEND_API_KEY` | Transactional email |
| `TURNSTILE_SECRET_KEY` | Support form challenge verification |
| `FEEDBACK_HASH_SALT` | Feedback anti-abuse hashing |
| `DOWNLOAD_ANALYTICS_SALT` | Download analytics hashing |

## Licensing And Admin

| Variable | Scope | Notes |
|----------|-------|-------|
| `ADMIN_SECRET` | Cloudflare Pages secret, local `.dev.vars` when needed | Used as `Authorization: Bearer <ADMIN_SECRET>` for `/api/generate-key`. |
| `MASTER_PRIVATE_KEY` | Cloudflare Pages secret, local `.dev.vars` when needed | Hex Ed25519 seed used only by Pages Functions to sign entitlements. |
| `MASTER_PUBLIC_KEY` | Public identifier | Safe to keep in docs and app verification code. |

## Payments And Email

| Variable | Scope | Notes |
|----------|-------|-------|
| `STRIPE_SECRET_KEY` | Cloudflare Pages secret, local `.dev.vars` when needed | Server-side Stripe Checkout/API key. |
| `STRIPE_WEBHOOK_SECRET` | Cloudflare Pages secret, local `.dev.vars` when needed | Stripe webhook signature verification. |
| `RESEND_API_KEY` | Cloudflare Pages secret, local `.dev.vars` when needed | License and magic-link email sending. |

## Feedback Protection

| Variable | Scope | Notes |
|----------|-------|-------|
| `TURNSTILE_SECRET_KEY` | Cloudflare Pages secret, local `.dev.vars` when needed | Server-side Turnstile verification for `/api/feedback`. |
| `FEEDBACK_HASH_SALT` | Cloudflare Pages secret | Salt for feedback IP/message abuse hashes. Rotate only with awareness that old rate-limit hashes stop matching. |

The Turnstile site key is public and can remain in client code. The current widget site key is listed below under public identifiers.

## Download Analytics

| Variable | Scope | Notes |
|----------|-------|-------|
| `DOWNLOAD_ANALYTICS_SALT` | Cloudflare Pages secret | Salt for hashed download analytics identifiers. |

## Plugin Catalog And Artifacts

| Binding | Scope | Notes |
|---------|-------|-------|
| `BUCKET` | Cloudflare R2 binding | Serves Max Commander release artifacts and `.mcx` plugin packages. |
| `DB` | Cloudflare D1 binding | Stores plugin catalog metadata and feedback records. |

R2 upload credentials should not be stored in this website repo. Use Cloudflare/GitHub secrets or the app repo infrastructure secret reference when an operator-side S3-compatible upload is required.

## Cloudflare Bindings And Public Identifiers

| Item | Value |
|------|-------|
| `DB` database ID | `8b2bacb0-66d7-4926-824c-02cba07fd23a` |
| `DB` database name | `sterling-db` |
| `MASTER_PUBLIC_KEY` | `1831041f28a8e16d9620d1c89cfce74083d60bd2f790d7ab540d23db1d4599da` |
| Turnstile site key | `0x4AAAAAADKFo5qBhHotewbL` |

## Local Development

- Keep local secret values only in ignored files such as `.dev.vars` and `.env.local`.
- Stripe local key files such as `.stripe_restricted_key.local` are ignored by `.gitignore` and should stay local.
- Do not copy raw values into `GEMINI.md`, planning docs, changelogs, screenshots, or build logs.
- Rotate `ADMIN_SECRET` and `MASTER_PRIVATE_KEY` if they were exposed outside trusted local/Cloudflare secret storage.
- Keep deployment instructions focused on variable names and Cloudflare/GitHub secret locations, not raw values.
