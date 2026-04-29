# Repository Memory - Astro Migration

**Recorded:** 2026-04-28
**Repository:** /home/priyan/Desktop/bsi

## Current Shape
- `client/` remains the source-of-truth React + Vite app.
- `bsi-astro/` exists for the migration target.
- Root codex stays unchanged; the migration uses `bsi-astro/codex/`.

## What Exists In bsi-astro
- `CODEX.md` copied from root.
- `codex/` mirror rewritten for Astro migration planning.
- Astro scaffold with `src/`, `public/`, and `astro.config.mjs`.
- React integration installed for islands.
- Tailwind configured with `src/styles/global.css`.
- Vercel adapter installed.
- Assets copied to `src/assets/` with original folder names preserved.
- Public files copied to `public/` including required assets.
- Global CSS migrated from `client/src/index.css`, including fonts, tokens, and utility classes.
- CSS dependencies added: `tw-animate-css` and `shadcn`.
- Layout shell created in `src/layouts/Layout.astro` with navbar, footer, and floating enquire button.
- Static routes created for all required URLs, including products category paths.
- Page head metadata moved to Astro head slots, with JSON-LD from `client/index.html` in the shared layout.
- `productCatalog.js` and `productImages.js` copied into `src/lib/`.
- Category routes now use catalog data for static paths and metadata props.
- Home page rebuilt using Astro components in `src/components/home/` with placeholders preserved.
- Industrial grid background ported to `src/components/ui/IndustrialGridBackground.astro`.
- Products, category, about, contact, privacy, and 404 pages rebuilt with Astro components and catalog-driven data.
- React islands added for navbar, mobile nav, floating enquire button, and modal orchestration.
- Enquiry modal ported to `src/components/react/EnquiryModal.jsx` with shared schema.
- Server-side `/api/enquiry` endpoint and shared handler added under `src/pages/api/`.
- Chatbot island ported to `src/components/react/ChatbotModal.jsx` with decision tree and enquiry handoff.
- Lenis smooth scroll re-enabled via `src/components/react/SmoothScrollProvider.jsx` mounted in `src/layouts/Layout.astro`.
- Page entry transitions restored via `.page-transition` animation in `src/styles/global.css`.
- Hover motion restored for featured cards and product/category cards.
- Smooth scroll tuned (+20%) and Lenis CSS overrides added to reduce jitter.
- Back-to-top button wired via `data-back-to-top` hook and layout script.
- Asset image imports normalized to URL strings (logo marquee, trust strip, product images).

## Migration Rules
- One-to-one parity with the current site in `client/`.
- Preserve routes, copy, assets, placeholders, and interactions exactly.
- Keep secrets server-side only.
- Auto-continue between tasks per the updated migration guide.

## Next Step
- Final acceptance review and user QA sign-off.
