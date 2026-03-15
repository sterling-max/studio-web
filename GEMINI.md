# Project Memory (GEMINI.md)

## Project Summary
This project is the "Sterling Lab" main portfolio website (`main-site-max`). It showcases a suite of premium software products including Max Commander, Dash, Zap Studio, EasyMonitor, and Tales Universe. The application is built with standard React 19, Vite, TypeScript, and utilizes Framer Motion for animations and Tailwind CSS v4 for styling.

## Architecture & Tech Stack
- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4 + PostCSS
- **Animations:** Framer Motion (`AnimatePresence`, `motion.div`)
- **Icons:** Lucide React
- **Routing:** Custom state-based routing (`activeTab` mapped to URL parameters like `?tab=product-dash`) instead of React Router to enable smooth page transitions.

## UI/UX Rules & Aesthetics
- **Theme:** Dark, premium "Sterling" aesthetic heavily utilizing glassmorphism, subtle gradients, and glow effects.
- **Colors:** Core palette includes `sterling-midnight` (dark background), `sterling-deep`, `sterling-mist` (text/foreground), `sterling-blue`, and `sterling-cyan`.
- **Typography:** Currently `Inter` (system font stack), but planned upgrade to a premium grotesque sans-serif (e.g., Geist, Manrope).
- **Interactions:** Heavy emphasis on pixel-perfect, memorable UX with high-quality micro-interactions, smooth tab transitions, and hover states.

## Product Portfolio
1. **Max Commander:** Dual-pane file manager with an acrylic interface.
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

## Pending Tasks
* [ ] **Assets:** Replace placeholder product mockup icons in `ProductCard.tsx` with high-resolution mockups.
* [ ] **Brand Identity:** Update Favicon (`public/`) and replace text logo in `Navbar.tsx` and `App.tsx` with a custom SVG vector logo.
* [ ] **Backgrounds:** Add subtle noise textures or high-resolution "mist" overlays to `src/index.css`.
* [ ] **Typography:** Integrate a premium font like Geist or Manrope to replace system fonts.
* [ ] **Case Studies:** Implement functional "View Case Study" pages with descriptions and imagery for each product.
