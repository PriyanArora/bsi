# Astro Migration Guide

## Current Reality
- The Astro + React site is now the canonical frontend and belongs in `client/`.
- `bsi-astro/` was only a staging workspace for the conversion and should not remain as a second app after promotion.
- UI parity target is the existing Vite site, with one intentional footer change:
  the back-to-top button is offset so it does not clash with the floating enquiry button and lines up under the `Contact Us` column.

## Parity That Must Be Preserved
- Routes:
  - `/`
  - `/products`
  - `/products/[categorySlug]`
  - `/about`
  - `/contact`
  - `/privacy-policy`
  - `404`
- Content, imagery, placeholders, typography, spacing, hover states, and responsive behavior must stay one-to-one with the Vite build.
- Interactive behavior that must keep working:
  - floating enquiry button
  - navbar “Help me choose”
  - mobile nav
  - chatbot recommendation handoff into enquiry
  - product enquiry buttons
  - AMC CTA enquiry button
  - About-page “Ready for an Audit?” button
  - smooth scroll
  - footer back-to-top
  - home hero desktop parallax

## Astro Source Of Truth
- Layout and shell:
  - `client/src/layouts/Layout.astro`
  - `client/src/styles/global.css`
- React islands:
  - `client/src/components/react/Navbar.jsx`
  - `client/src/components/react/MobileNav.jsx`
  - `client/src/components/react/FloatingEnquireButton.jsx`
  - `client/src/components/react/ModalRoot.jsx`
  - `client/src/components/react/EnquiryModal.jsx`
  - `client/src/components/react/ChatbotModal.jsx`
  - `client/src/components/react/SmoothScrollProvider.jsx`
- Static Astro sections/pages:
  - `client/src/components/home/*`
  - `client/src/components/products/*`
  - `client/src/components/about/*`
  - `client/src/components/contact/*`
  - `client/src/components/layout/Footer.astro`
  - `client/src/pages/**/*`
- Data:
  - `client/src/lib/productCatalog.js`
  - `client/src/lib/productImages.js`
  - `client/src/lib/chatbotTree.js`
  - `client/src/lib/enquirySchema.js`
  - `client/src/lib/shellEvents.js`

## Important Architecture Note
- The migrated Astro app still contains the inherited same-origin submission path:
  - `client/src/pages/api/enquiry.js`
  - `client/src/pages/api/_shared/enquiry-handler.js`
- That means the current app is not yet truly “frontend-only”, even though the UI migration is complete.
- If the business decision is to move to SendGrid and remove the backend layer entirely, Codex planning must resolve that explicitly before code changes are made.

## Do Not Get This Wrong
- Direct browser calls to the SendGrid mail API are not acceptable because they would expose provider credentials publicly.
- A real frontend-only replacement must be one of:
  1. a public third-party form endpoint/workflow designed for browser submission,
  2. a different hosted form product,
  3. or a deliberate decision to keep a minimal serverless relay and only swap providers.
- Do not write planning docs that assume “frontend-only + SendGrid API from the browser” is safe. It is not.

## Migration Outcomes Already Landed
- Astro pages and islands match the Vite site structure.
- Enquiry triggers in static Astro sections/pages are wired back into the shared modal event system.
- Home hero desktop parallax behavior has been restored.
- Footer back-to-top placement has been adjusted to the requested aligned position.
- The duplicate staging planning bundle in `bsi-astro/codex/` is disposable and should not be kept as long-term repo state.

## Final Repo Shape
```text
root/
├── client/                # Astro + React app
├── codex/                 # root planning docs; update these next
├── ASTRO_MIGRATION_GUIDE.md
└── ...
```

## Root Planning Update For The Next Prompt
- Rewrite `codex/ProjectSummary.md` around Astro + React, not Vite + React Router.
- Rewrite `codex/RepositoryMemory.md` to record that the Vite app has been retired and `client/` is now the Astro app.
- Rewrite `codex/Progress.md` so visual migration/parity is treated as complete, not in progress.
- Record the unresolved enquiry architecture decision clearly:
  current code still uses the inherited `/api/enquiry` serverless path.
- Update any build/deploy notes that still describe the old Vite middleware or the staging `bsi-astro/` folder.
