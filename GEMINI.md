# Project Memory (GEMINI.md)

## Project Summary
This project is the "Sterling Lab" main portfolio website (`main-site-max`). It showcases a suite of premium software products including Max Commander, Dash, Zap Studio, EasyMonitor, and Tales Universe. The application is built with standard React 19, Vite, TypeScript, and utilizes Framer Motion for animations and Tailwind CSS v4 for styling.

## Dev Key

DEV-KEY-$T3RL1NG-PRO

## Architecture & Tech Stack
- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4 + PostCSS
- **Animations:** Framer Motion (`AnimatePresence`, `motion.div`)
- **Icons:** Lucide React
- **Routing:** Custom state-based routing (`activeTab` mapped to URL parameters like `?tab=product-dash`) instead of React Router to enable smooth page transitions.
- **Backend (Cloudflare):** Integrated Cloudflare Pages Functions (`/functions/api`) as a serverless licensing backend.
- **Database (Cloudflare):** D1 SQL database for license and machine activation tracking.
    - **Database ID:** `8b2bacb0-66d7-4926-824c-02cba07fd23a`
    - **Database Name:** `sterling-db`
    - **Binding:** `DB`
    - **Master Public Key:** `1831041f28a8e16d9620d1c89cfce74083d60bd2f790d7ab540d23db1d4599da`
    - **Master Private Key:** `4395f3369c7578f095d51faa4c349c9cbc23a22ff7737fc507618274b5201df2` (CRITICAL: Upload to Cloudflare as secret)

## UI/UX Rules & Aesthetics
- **Theme:** Dark, premium "Sterling" aesthetic heavily utilizing glassmorphism, subtle gradients, and glow effects.
- **Colors:** Core palette includes `sterling-midnight` (dark background), `sterling-deep`, `sterling-mist` (text/foreground), `sterling-blue`, and `sterling-cyan`.
- **Typography:** Currently `Inter` (system font stack), but planned upgrade to a premium grotesque sans-serif (e.g., Geist, Manrope).
- **Interactions:** Heavy emphasis on pixel-perfect, memorable UX with high-quality micro-interactions, smooth tab transitions, and hover states.

## Product Portfolio
1. **Max Commander:** Dual-pane file manager with an acrylic interface.
    - **FREE:** Dual-Pane, TC Keybindings, Archive Support, Multi-Rename, Native Context Menu, LAN Browsing, Quick Viewer, FTP/SFTP, Cloud Hybrid, Sterling Blitz, Git Status.
    - **PRO:** Space Analyzer (Treemap), Profiles & Workspaces (Path Firewall), Plugin System, Git History & Detail Views.
2. **Dash:** Audio/Music player with "Infinite Glide Lyrics" and glassmorphic UI.
3. **Zap Studio:** AI-generated children's story video creator.
4. **EasyMonitor:** System monitoring tool with interactive trend charts.
5. **Tales Universe:** Fairy-tale library interface.

## Decisions & Conventions
- Maintain contextual awareness using this `GEMINI.md` file.
- Strict adherence to standard UI/UX best practices to produce rich, pixel-perfect interfaces.
- Break down tasks into modular pieces with single responsibilities.
- Ensure pending assets and enhancements (as outlined in `PendingAssets.md`) are tracked and completed.
- The user handles running backend/frontend dev servers; do not try to run them via tools.
- Never commit changes unless explicitly instructed by the user.
- **Licensing Logic:** Master private key signing resides 100% in Cloudflare Functions. Do not expose private keys in the frontend repository.
- **Machine Identification:** Activations now include `machine_name` (Computer Name) for improved UX in the management portal.
- **Deactivation Flow:** Users can deactivate machines both via the Sterling Portal and locally within the Max Commander app.
- **Lemon Squeezy Webhook:** Configure Lemon Squeezy to call `https://sterling.ltd/api/lemon-squeezy-webhook`. Store the signing secret only in Lemon Squeezy and Cloudflare Pages as `LEMON_SQUEEZY_WEBHOOK_SECRET`; do not commit the secret value. Registered events: `order_created`, `order_refunded`, `license_key_created`, `license_key_updated`, `dispute_created`, `dispute_resolved`.
- **Lemon Squeezy Checkout:** Max Commander checkout ID is `86608fca-fab5-4b6d-a6cb-f74c2487e6c4`. Standard checkout URL passes `checkout[custom][product_id]=mc_pro`. Founder checkout uses discount code `FOUNDER26` via `checkout[discount_code]=FOUNDER26` and passes `checkout[custom][founder_status]=true`. The site opens Lemon Squeezy popup checkout by adding `embed=1` at runtime.
- **Licensing Revocation Model:** Sterling D1 remains the source of truth. Disable native Lemon Squeezy license key generation for Max Commander. The app should use signed 7-day machine-bound entitlements, refresh online every 24 hours, and disable Pro when `/api/validate-license` reports refunded/disputed/revoked status. App-side contract is documented in `docs/max_commander_licensing_integration.md`.


## Pending Tasks
* [ ] **Assets:** Replace placeholder product mockup icons in `ProductCard.tsx` with high-resolution mockups.
* [ ] **Brand Identity:** Update Favicon (`public/`) and replace text logo in `Navbar.tsx` and `App.tsx` with a custom SVG vector logo.
* [ ] **Backgrounds:** Add subtle noise textures or high-resolution "mist" overlays to `src/index.css`.
* [ ] **Typography:** Integrate a premium font like Geist or Manrope to replace system fonts.
* [ ] **Case Studies:** Implement functional "View Case Study" pages with descriptions and imagery for each product.
* [x] **Licensing Backend:** Complete Cloudflare DNS and D1 binding for `/api/activate`, `/api/manage`, and `/api/send-magic-link`.
* [x] **Licensing UI:** Finalize the `/manage` portal with machine deactivation logic and computer name display.
* [ ] **Lemon Squeezy Webhook Verification:** Implement signature verification for Lemon Squeezy webhooks in the Cloudflare function.
- **Email Delivery:** Integrate an email provider (e.g., Resend) for real magic link delivery.
* [x] **Tester Key Generator:** Implemented `/api/generate-key` for manual license creation.

## Manual Key Generation (Admin)
To generate a spare key for a tester, send a POST request to:
`https://sterling.ltd/api/generate-key`

**Headers:**
- `Authorization: Bearer DEV-KEY-$T3RL1NG-PRO`
- `Content-Type: application/json`

**Body:**
```json
{
  "email": "tester@example.com",
  "product_id": "mc_pro",
  "founder_status": true
}
```
The response will contain a key starting with `MC-FREE-`.

