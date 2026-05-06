# Support Feedback And Plugin Catalog

## Summary
- Sterling Lab owns one product-agnostic support intake flow at `/support`.
- Max Commander is the first app integration and submits feedback to the same `/api/feedback` endpoint as the website.
- Max Commander plugins are exposed through an official product-scoped catalog at `/products/max-commander/plugins`.
- Plugin downloads are free for now, but plugin use remains a Max Commander Pro feature.

## Website Implementation
- `/support` presents a Sterling-styled feedback form with product selection, request type, title, message, optional email, and contact permission.
- `/support?product=max-commander` preselects Max Commander for links from the product page or app fallback.
- `POST /api/feedback` stores feedback in D1 with product, source, version, platform, request type, message, and triage fields.
- `/products/max-commander/plugins` renders the official plugin catalog using `/api/plugins?product_id=max-commander`, with static built-in metadata as a visual fallback if the API has no rows yet.
- Admin plugin management lives at `/admin/plugins` and uses existing admin authentication.
- Admin upload stores `.mcx` packages in R2 and stores/updates metadata in D1.

## Data Model
- `feedback_items` tracks product-agnostic support events.
- `feedback_rate_limits` tracks hashed IP counters for public endpoint abuse control.
- `plugin_catalog` tracks public catalog metadata and the R2 object key for each package.
- Feedback statuses are intentionally small: `new`, `reviewed`, `potential`, `planned`, `fixed`, `declined`, `duplicate`.
- Plugin catalog rows are public only when `enabled = 1`.

## UX Rules
- The support page follows the existing Sterling Lab visual language: Inter/system font, `sterling-*` palette, deep surfaces, blue/cyan accents, compact premium controls, and restrained Framer Motion entrance.
- The plugin catalog is an official catalog, not a marketplace. No ratings, public comments, or community submission flow in v1.
- Plugin cards must show Pro-only status and free-for-now download availability together to avoid licensing confusion.

## Security Hardening
- Website feedback submissions require Cloudflare Turnstile. The public site key is embedded for the Sterling widget (`0x4AAAAAADKFo5qBhHotewbL`), while `TURNSTILE_SECRET_KEY` must exist as a Cloudflare Pages secret.
- App feedback submissions bypass Turnstile but still require `source = app`, an app version, duplicate detection, content checks, and shared rate limits.
- Rate limits are D1-backed using hashed IP keys: 5 submissions per 10 minutes and 20 submissions per 24 hours.
- The API stores `ip_hash` and `message_hash`, not raw IP addresses.
- Duplicate title/message submissions from the same hashed IP are rejected for one hour.
- Website forms include a hidden honeypot field and reject submissions with excessive links.
- TODO before production: confirm the Turnstile widget allows `sterling.ltd` and `www.sterling.ltd`, confirm `TURNSTILE_SECRET_KEY` is present in Cloudflare Pages, and apply `db/migration_004_support_plugins.sql` to production D1.

## Validation Checklist
- `/support` submits general Sterling feedback with no product selected.
- `/support?product=max-commander` preselects Max Commander.
- `/api/feedback` rejects empty title/message submissions.
- `/api/feedback` rejects website submissions without a valid Turnstile token.
- `/api/feedback` rate-limits repeated app and website submissions.
- `/products/max-commander/plugins` renders official plugins with version, permissions, compatibility, and download actions.
- `/admin/plugins` can upload a `.mcx`, edit metadata, hide/show catalog rows, and refresh the public catalog.
- R2 download requests return the package only for enabled catalog rows.
