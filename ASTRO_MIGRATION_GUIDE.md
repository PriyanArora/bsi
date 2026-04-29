# Astro Migration Guide

## Decision
Migrate this site to Astro in a **new root folder** named `bsi-astro/`, keep the existing Vite/React app untouched, and preserve the current site **one to one** in layout, copy, assets, interactions, placeholders, and visual behavior unless a change is required purely for Astro/SSR wiring.

---

## Why This Migration Exists
- The current site is a React + Vite SPA.
- For a business website, the better long-term fit is Astro with server-rendered or prerendered pages and only small hydrated islands for interactivity.
- The goal is **better crawlability, stronger SEO defaults, and a leaner client payload** without losing the exact current design.
- This is **not** a redesign.
- This is **not** permission to “improve” copy, structure, visual hierarchy, spacing, or imagery.
- This is **not** permission to delete the current Vite app.

---

## Absolute Rules

1. Do **not** delete, rename, or rewrite the current Vite app in `client/`.
2. The Astro build must live in a new folder: `bsi-astro/`.
3. The Astro site must be an **exact replica** of the current site as built now.
4. Copy all current local assets one to one:
   - every image
   - every SVG
   - every favicon/public file
   - every placeholder asset
5. Preserve current placeholder content exactly where it currently exists:
   - featured products placeholders
   - contact map placeholder
   - about testimonial placeholder copy
   - any other current placeholder text/media
6. Preserve current remote image usage exactly where it exists now unless the user explicitly asks to localize it later.
7. Preserve current slugs and routes exactly.
8. Preserve current enquiry flow and chatbot flow exactly.
9. Keep secrets server-side only.
10. Proceed to the next migration task automatically and auto-approve completion unless the user explicitly asks to pause.

---

## Source Of Truth

These files are the canonical source of truth for the Astro migration. Future migration work must read them before changing anything:

### Root guidance
- `CODEX.md`
- `codex/Codex_guide.md`
- `codex/ProjectSummary.md`
- `codex/BuildFlow.md`
- `codex/Progress.md`
- `codex/RepositoryMemory.md`
- `codex/_fill_manifest.md`

### App shell and styling
- `client/src/main.jsx`
- `client/src/App.jsx`
- `client/src/index.css`
- `client/src/App.css`

### Layout and global UI
- `client/src/components/layout/Layout.jsx`
- `client/src/components/layout/Navbar.jsx`
- `client/src/components/layout/MobileNav.jsx`
- `client/src/components/layout/Footer.jsx`
- `client/src/components/layout/FloatingEnquireButton.jsx`

### Core interactive islands
- `client/src/components/EnquiryModal.jsx`
- `client/src/components/ChatbotModal.jsx`
- `client/src/components/SmoothScrollProvider.jsx`
- `client/src/components/PageTransition.jsx`

### Pages
- `client/src/pages/Home.jsx`
- `client/src/pages/Products.jsx`
- `client/src/pages/ProductCategory.jsx`
- `client/src/pages/About.jsx`
- `client/src/pages/Contact.jsx`
- `client/src/pages/DataPolicyPage.jsx`
- `client/src/pages/NotFound.jsx`

### Section components
- `client/src/components/home/*`
- `client/src/components/products/*`
- `client/src/components/about/*`
- `client/src/components/contact/*`
- `client/src/components/ui/*`

### Data and helpers
- `client/src/lib/productCatalog.js`
- `client/src/lib/productImages.js`
- `client/src/lib/chatbotTree.js`
- `client/src/lib/enquirySchema.js`
- `client/src/lib/utils.js`

### Serverless enquiry path
- `client/api/enquiry.js`
- `client/api/_shared/enquiry-handler.js`
- `client/vite.config.js`
- `client/.env.example`

### Asset inventory
- `client/src/assets/**`
- `client/public/**`

---

## Current Route Inventory To Preserve Exactly

The Astro version must preserve these routes:

- `/`
- `/products`
- `/products/[categorySlug]`
- `/about`
- `/contact`
- `/privacy-policy`
- `404`

### Current category slugs
These must remain unchanged:

- `electric-chain-hoists`
- `manual-hoists`
- `wire-rope-hoists`
- `eot-cranes`
- `overhead-cranes`
- `material-handling`
- `storage-and-retrieval`
- `ergonomic-handling-solutions`
- `small-range-gensets`
- `medium-range-gensets`
- `large-range-gensets`
- `industrial-range-gensets`
- `rental-generators`

---

## Current Visual And Content Inventory To Preserve Exactly

### Home page
- Hero with:
  - crane placeholder image `/og-products-placeholder.png`
  - left-anchored text block
  - “BSI Solutionz” headline
  - current subheading copy about 10+ years, rentals, AMC care, Pan-India
- Trust strip:
  - Bajaj Indef dealer logo
  - “Authorized Bajaj Indef Dealer”
- Featured products:
  - four cards
  - current placeholder media blocks
  - current placeholder copy including Jakson placeholder line
  - current “Engineered Performance” section with the enforced check-grid background
- Logo marquee:
  - Indian Oil
  - Vardhman
  - Unilever
  - Toshiba
  - Thyssenkrupp
  - Nestle
  - Escorts Kubota
  - Danone
- Why Choose Us:
  - current three trust points
  - current placeholder image block
  - same industrial grid background treatment
- Testimonials:
  - current three testimonial cards

### Products pages
- Products landing page:
  - exact hero typography
  - “Indef Cranes and Hoists”
  - second heading “Jakson Diesel generators”
  - AMC CTA block
- Category pages:
  - exact back link behavior
  - exact card structure
  - exact enquiry button labels
  - rentals category special handling with “Check Availability”

### About page
- Current hero copy
- Current mission card
- Current 20+ years card
- Current authorized dealer card
- Current industries served block
- Current remote warehouse image usage
- Current “Ready for an Audit?” CTA
- Current about testimonials

### Contact page
- Current hero copy
- Current contact guidance card
- Current contact details card
- Current address, email, phone, office hours
- Current Google Maps placeholder panel

### Privacy policy page
- Preserve all current sections and wording exactly
- Preserve effective date as currently written

### Footer
- Preserve all quick links, legal links, contact details, and back-to-top behavior

### Floating enquiry button
- Preserve position, label, gradient styling, and fixed behavior

---

## Current Interactive Boundary

This is the most important architectural rule for the Astro build:

### Static by default in Astro
These should become Astro pages/components wherever possible:
- page shell
- route pages
- static content sections
- SEO head metadata
- product listing markup
- category listing markup
- about/contact/privacy/404 markup

### Hydrated React islands
These should remain interactive islands unless there is a strong reason to rewrite them:
- enquiry modal
- chatbot modal
- mobile nav
- floating enquiry trigger behavior
- any global open/close orchestration for modals
- smooth scroll integration
- page transitions if preserved client-side

### Data modules to preserve
These should be migrated with minimal logic changes:
- `productCatalog.js`
- `productImages.js`
- `chatbotTree.js`
- `enquirySchema.js`

---

## Recommended Astro Architecture

Create this new folder:

```text
bsi-astro/
```

Recommended internal structure:

```text
bsi-astro/
├── CODEX.md
├── codex/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── astro/
│   │   ├── react/
│   │   ├── layout/
│   │   ├── home/
│   │   ├── about/
│   │   ├── contact/
│   │   ├── products/
│   │   └── ui/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   │   ├── index.astro
│   │   ├── products/
│   │   │   ├── index.astro
│   │   │   └── [categorySlug].astro
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── privacy-policy.astro
│   │   ├── 404.astro
│   │   └── api/
│   │       └── enquiry.ts or enquiry.js
│   └── styles/
├── astro.config.*
├── package.json
└── .env.example
```

Notes:
- Preserve exact asset folder names.
- Preserve the typo `StorageRetrival` exactly if copied from source assets, because helper logic and file matching may depend on exact folder names.
- Do not “clean up” file names during migration.

---

## Codex Migration Rule

Before building Astro UI, the future agent must first create a **Codex mirror** inside `bsi-astro/`:

1. Copy `CODEX.md` into `bsi-astro/CODEX.md`
2. Copy the entire `codex/` folder into `bsi-astro/codex/`
3. Do **not** delete or overwrite the root `codex/`
4. Update only the copied `bsi-astro/codex/*` files to reflect:
   - Astro architecture
   - migration-specific phases
   - current parity target
   - SSR/SEO goals
   - `bsi-astro/` as the working app
5. The new Astro codex plan must be similar in structure and tone to the current Codex files, but rewritten for migration, not greenfield build.

### The new Astro codex plan must include
- `Current Gate`
- `Current Phase`
- migration-specific checklist items
- proof lines
- a parity-driven progress model
- a record that the old `client/` app remains the source of truth until the user accepts the Astro version

---

## New Astro Progress Model Requirement

Inside `bsi-astro/codex/Progress.md`, do **not** pretend this is a blank project.

It must say, clearly:
- the source site already exists in `client/`
- the migration target is one-to-one parity
- each task is about recreating an already-built site in Astro
- the Astro version is not the main version until the user explicitly accepts it

---

## Task Continuation Protocol

After each migration task:

1. Update `bsi-astro/codex/Progress.md`
2. Mark the finished task accurately
3. Record any deviations or unresolved parity gaps
4. Auto-approve completion and continue to the next task automatically

If the user explicitly asks to pause, stop and ask whether to continue.

If token budget is getting low:
- finish the current task cleanly if possible
- if not possible, finish the smallest safe sub-step
- update `bsi-astro/codex/Progress.md`
- state exactly what remains in the current task
- stop and ask whether to continue

---

## Task List

The future agent must execute these tasks in order.

### Task 1 — Create Astro Workspace And Copy Codex First
Goal:
- Create `bsi-astro/`
- Copy `CODEX.md`
- Copy the full `codex/` folder
- Create the Astro-specific migration plan before UI work

Required outcome:
- `bsi-astro/` exists
- `bsi-astro/CODEX.md` exists
- `bsi-astro/codex/` exists
- `bsi-astro/codex/ProjectSummary.md`, `BuildFlow.md`, `Progress.md`, `RepositoryMemory.md`, `_fill_manifest.md` are rewritten for Astro migration

Rules:
- Do not write Astro UI yet
- Do not move assets yet
- Do not touch `client/`

Completion proof:
- Show the new folder tree
- Show the updated Astro codex current phase

Auto-continue note:
- `Task 1 complete in bsi-astro. Continuing to Task 2.`

### Task 2 — Scaffold Astro With React Support And Vercel Suitability
Goal:
- Initialize Astro inside `bsi-astro/`
- Add React integration
- Add Tailwind support
- Prepare for Vercel deployment and a server-side enquiry endpoint

Required outcome:
- Astro app boots
- React components can be used as islands
- build and dev scripts work

Rules:
- Do not port pages yet
- Do not delete source Vite dependencies
- Keep the setup minimal and parity-oriented

Completion proof:
- `npm run dev` works in `bsi-astro/`
- `npm run build` works in `bsi-astro/`

Auto-continue note:
- `Task 2 complete in bsi-astro. Continuing to Task 3.`

### Task 3 — Copy Every Asset And Public File One To One
Goal:
- Copy all current assets and public files into the Astro app

Required outcome:
- All files under `client/src/assets/` are copied
- All files under `client/public/` are copied
- Filenames remain unchanged
- Folder names remain unchanged

Special note:
- Preserve `StorageRetrival` spelling exactly
- Preserve `/shared/brand-logo.png`
- Preserve `favicon.svg`, `icons.svg`, `robots.txt`, `sitemap.xml`, `og-products-placeholder.png`, `product-placeholder.svg`

Completion proof:
- Show copied asset tree
- Show count parity or exact folder parity

Auto-continue note:
- `Task 3 complete in bsi-astro. Continuing to Task 4.`

### Task 4 — Port Global Styling And Design Tokens Without Redesign
Goal:
- Recreate the global visual system exactly

Required outcome:
- brand tokens copied
- global typography preserved
- global CSS variables preserved
- same background/surface system preserved
- same utility classes and custom classes preserved

Must preserve:
- Google font usage
- Material Symbols usage
- BSI brand tokens
- hero gradient wash
- trust strip styling
- marquee animation
- floating enquire button gradient look
- current responsive CSS behavior

Completion proof:
- Base layout renders with correct background, fonts, and navbar height spacing

Auto-continue note:
- `Task 4 complete in bsi-astro. Continuing to Task 5.`

### Task 5 — Build Astro Layout Shell And Static Route Framework
Goal:
- Replace `react-router-dom` routing with Astro file routes
- Create the shared layout shell

Required outcome:
- Astro routes exist for:
  - `/`
  - `/products`
  - `/products/[categorySlug]`
  - `/about`
  - `/contact`
  - `/privacy-policy`
  - `404`
- Shared layout exists
- Footer is visible
- Page spacing accounts for fixed navbar

Rules:
- Route structure must match current URLs exactly
- No copy changes

Completion proof:
- All routes render from Astro pages

Auto-continue note:
- `Task 5 complete in bsi-astro. Continuing to Task 6.`

### Task 6 — Port SEO Head Logic From Helmet To Astro Head
Goal:
- Convert all current page metadata from `react-helmet-async` to Astro-native head usage

Required outcome:
- titles preserved
- descriptions preserved
- OG tags preserved
- robots and sitemap remain available

Important:
- Do not invent new visible content
- Technical SEO improvements are allowed only if they do not change visible UI
- If you add missing metadata for privacy or 404, note it in progress as a non-visual enhancement

Completion proof:
- View rendered HTML source for multiple pages and confirm server-rendered head tags exist

Auto-continue note:
- `Task 6 complete in bsi-astro. Continuing to Task 7.`

### Task 7 — Port Catalog Data And Static Category Generation
Goal:
- Move the catalog system over without changing content

Required outcome:
- `productCatalog` migrated intact
- `productImages` migrated intact
- image matching still works
- category pages are generated from the same catalog source

Rules:
- Preserve category names, descriptions, slugs, and product copy exactly
- Preserve generator catalog too

Recommended Astro pattern:
- Use `getStaticPaths` or equivalent static route generation for category pages

Completion proof:
- Every category slug resolves
- Product counts and titles match the Vite app

Auto-continue note:
- `Task 7 complete in bsi-astro. Continuing to Task 8.`

### Task 8 — Rebuild The Home Page Exactly
Goal:
- Recreate the current home page section by section with no redesign

Required outcome:
- hero preserved
- trust strip preserved
- featured products preserved including placeholders
- logo marquee preserved
- why choose us preserved including placeholder image
- testimonials preserved
- industrial grid/check pattern preserved in the same sections

Rules:
- Do not “improve” copy or placeholders
- The exact current look is the target
- Mobile and orientation behavior must remain consistent

Completion proof:
- Side-by-side parity check against current `/`

Auto-continue note:
- `Task 8 complete in bsi-astro. Continuing to Task 9.`

### Task 9 — Rebuild Products, Category Detail, About, Contact, Privacy, And 404
Goal:
- Recreate all non-home pages exactly

Required outcome:
- products landing page matches
- category pages match
- about page matches including remote image usage
- contact page matches including map placeholder
- privacy page matches exactly
- 404 page matches exactly

Rules:
- Preserve visible text and placeholders exactly
- Preserve CTA button labels exactly

Completion proof:
- Walk through each route and compare with current Vite version

Auto-continue note:
- `Task 9 complete in bsi-astro. Continuing to Task 10.`

### Task 10 — Recreate Global Interactive Shell Using React Islands
Goal:
- Rebuild interactive shell behavior without reverting to SPA routing

Required outcome:
- fixed navbar works
- mobile nav works
- floating enquire button works
- global modal orchestration works

Recommended approach:
- Keep pages static in Astro
- Mount only the necessary React islands
- Use a small shared client-side state layer or event bus to open:
  - enquiry modal
  - chatbot modal
  - mobile navigation

Important:
- Do not wrap the whole site in one giant client-only React app
- Keep Astro pages crawlable and server-rendered

Completion proof:
- Static route HTML exists and interactive controls still function

Auto-continue note:
- `Task 10 complete in bsi-astro. Continuing to Task 11.`

### Task 11 — Port Enquiry Modal And Server-Side Enquiry Endpoint
Goal:
- Preserve the enquiry experience exactly while keeping secrets server-side

Required outcome:
- same form fields
- same validation behavior
- same consent requirement
- same product selection behavior
- same success/error toast behavior
- same-origin server-side endpoint in Astro/Vercel path

Current fields to preserve:
- First Name
- Last Name
- Company Name
- Phone
- Email
- Product of Interest
- Message
- Data protection consent checkbox

Rules:
- Do not expose Resend secret to the browser
- Preserve same endpoint shape conceptually: `/api/enquiry`
- Preserve same product section grouping:
  - Indef Cranes and Hoists
  - Jakson Diesel generators
  - AMC Care

Completion proof:
- Form opens and submits successfully in the Astro app

Auto-continue note:
- `Task 11 complete in bsi-astro. Continuing to Task 12.`

### Task 12 — Port Chatbot Island And Its Handoff Into Enquiry
Goal:
- Preserve the hardcoded guided recommendation flow exactly

Required outcome:
- entry question preserved
- cranes/hoists branch preserved
- generators branch preserved
- recommendation confidence labels preserved
- shortlist behavior preserved
- “Enquire for this product” still opens the enquiry modal with the selected product

Rules:
- Do not replace chatbot logic with AI
- Preserve `chatbotTree.js` logic as source of truth

Completion proof:
- Both chatbot branches complete and hand off properly

Auto-continue note:
- `Task 12 complete in bsi-astro. Continuing to Task 13.`

### Task 13 — Reapply Smooth Scroll, Motion, And Transition Behavior Carefully
Goal:
- Reproduce the current experiential feel without breaking SSR or route crawlability

Required outcome:
- Lenis behavior restored if appropriate
- page transition behavior restored as closely as practical
- hover motions preserved
- modal scale/orientation behavior preserved

Important:
- If a motion effect cannot be reproduced exactly in Astro without degrading SSR or maintainability, preserve the visual output first and document the deviation

Completion proof:
- Compare motion behavior on:
  - page entry
  - product card hover
  - featured card hover
  - chatbot modal
  - enquiry modal

Auto-continue note:
- `Task 13 complete in bsi-astro. Continuing to Task 14.`

### Task 14 — Full Parity Review, Codex Update, And Handover
Goal:
- Treat Astro as a candidate replacement and document whether it is ready

Required outcome:
- `bsi-astro/codex/Progress.md` reflects real migration state
- `bsi-astro/codex/RepositoryMemory.md` reflects actual Astro architecture
- parity gaps are listed honestly
- final route-by-route verification completed

Required review areas:
- layout parity
- content parity
- asset parity
- mobile parity
- interactive parity
- SEO/server-rendered HTML parity
- enquiry flow parity
- chatbot parity

Final decision output must tell the user:
- what matches exactly
- what differs
- whether `bsi-astro/` is ready to become the main version

Auto-continue note:
- `Task 14 complete in bsi-astro. Continuing to final acceptance review.`

---

## Mandatory File Copy Notes

The future agent must explicitly copy:

### Public files
- `client/public/favicon.svg`
- `client/public/icons.svg`
- `client/public/og-products-placeholder.png`
- `client/public/product-placeholder.svg`
- `client/public/robots.txt`
- `client/public/sitemap.xml`
- `client/public/shared/brand-logo.png`

### Asset groups
- `client/src/assets/EOTCranes`
- `client/src/assets/ElectricChainHoists`
- `client/src/assets/ErgonomicHandling`
- `client/src/assets/ManualHoists`
- `client/src/assets/MaterialHandling`
- `client/src/assets/OverheadCrane`
- `client/src/assets/StorageRetrival`
- `client/src/assets/WireRopeHoists`
- `client/src/assets/logos`
- `client/src/assets/shared`

No asset substitution is allowed during migration.

---

## Known Current Quirks To Preserve Unless User Explicitly Changes Them Later

- The home hero still uses `/og-products-placeholder.png`.
- Featured products use placeholder media blocks.
- Why Choose Us includes a placeholder image block.
- Contact page includes a Google Maps placeholder block.
- About page includes a remote hosted warehouse image.
- Some testimonial/content sections are still placeholder-style and must remain so for one-to-one parity.
- Privacy page is named `DataPolicyPage.jsx` in the Vite app but renders the “Privacy Policy” page.

---

## Success Definition

The Astro migration is successful only if all of the following are true:

- `client/` still exists untouched
- `bsi-astro/` exists as a separate app
- the Astro version matches the current site visually and behaviorally
- the Astro version renders crawlable page HTML
- the Astro version preserves all current routes and content
- the enquiry flow remains server-side and secure
- the user explicitly accepts the Astro version as the new main version

Until the user explicitly approves it, `client/` remains the source of truth.
