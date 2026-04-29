# Build Flow - Astro Migration

> Phase done = parity proof passed, not just code written.
> Each phase has a Proof line - show evidence before declaring complete.

## Prerequisites
- Node.js (v18+), npm
- Git
- Resend account with a verified sending domain/address
- Vercel account
- Do not modify `client/` during migration.
- Stop after each task and ask for confirmation before moving on.

---

## P1 — Create Astro Workspace And Copy Codex First [GATE G1]
**Goal:** Create `bsi-astro/` and a migration-ready codex mirror before any UI work.
- [ ] `bsi-astro/` exists
- [ ] `bsi-astro/CODEX.md` copied from root
- [ ] `bsi-astro/codex/` copied from root
- [ ] `bsi-astro/codex/ProjectSummary.md` rewritten for migration
- [ ] `bsi-astro/codex/BuildFlow.md` rewritten for migration
- [ ] `bsi-astro/codex/Progress.md` rewritten for migration
- [ ] `bsi-astro/codex/RepositoryMemory.md` rewritten for migration
- [ ] `bsi-astro/codex/_fill_manifest.md` rewritten for migration
**Proof:** Show `bsi-astro/` tree and the Current Phase in `bsi-astro/codex/Progress.md`.
**Commit:** `chore(migration): create bsi-astro codex mirror`

## P2 — Scaffold Astro With React Support And Vercel Suitability [GATE G2]
**Goal:** Initialize Astro with React + Tailwind and ensure dev/build scripts run.
- [ ] Astro app initializes inside `bsi-astro/`
- [ ] React integration installed for islands
- [ ] Tailwind configured
- [ ] `npm run dev` works
- [ ] `npm run build` works
**Proof:** Run `npm run dev` and `npm run build` in `bsi-astro/`.
**Commit:** `chore(config): scaffold astro with react and tailwind`

## P3 — Copy Every Asset And Public File One To One [GATE G3]
**Goal:** Copy all assets and public files from `client/` into `bsi-astro/` without renaming.
- [ ] `client/src/assets/**` copied to `bsi-astro/src/assets/**`
- [ ] `client/public/**` copied to `bsi-astro/public/**`
- [ ] Filenames and folder names preserved (including `StorageRetrival`)
- [ ] Required public files preserved (favicon.svg, icons.svg, robots.txt, sitemap.xml, og-products-placeholder.png, product-placeholder.svg, shared/brand-logo.png)
**Proof:** Show asset tree parity and public file list.
**Commit:** `chore(assets): copy assets and public files one-to-one`

## P4 — Port Global Styling And Design Tokens Without Redesign [GATE G4]
**Goal:** Recreate the global visual system exactly.
- [ ] Brand tokens and CSS variables copied
- [ ] Global typography preserved (Google font + Material Symbols)
- [ ] Background/surface system preserved
- [ ] Utility classes and custom classes preserved
- [ ] Responsive CSS behavior preserved
**Proof:** Base layout renders with correct background, fonts, and navbar spacing.
**Commit:** `feat(ui): port global styling and tokens`

## P5 — Build Astro Layout Shell And Static Route Framework [GATE G5]
**Goal:** Replace client-side routing with Astro file routes and shared layout.
- [ ] Astro routes for /, /products, /products/[categorySlug], /about, /contact, /privacy-policy, 404
- [ ] Shared layout exists
- [ ] Footer visible on all pages
- [ ] Page spacing accounts for fixed navbar
**Proof:** All routes render from Astro pages.
**Commit:** `feat(ui): add astro layout shell and routes`

## P6 — Port SEO Head Logic From Helmet To Astro Head [GATE G6]
**Goal:** Convert all page metadata to Astro head tags.
- [ ] Titles preserved
- [ ] Descriptions preserved
- [ ] Open Graph tags preserved
- [ ] robots.txt and sitemap.xml remain available
**Proof:** View HTML source for multiple pages and confirm server-rendered head tags.
**Commit:** `feat(seo): port head metadata to astro`

## P7 — Port Catalog Data And Static Category Generation [GATE G7]
**Goal:** Move catalog data and generate category pages from the same source.
- [ ] `productCatalog` migrated intact
- [ ] `productImages` migrated intact
- [ ] Image matching still works
- [ ] Category pages generated from catalog source
**Proof:** Every category slug resolves and product counts match the Vite app.
**Commit:** `feat(data): port catalog data and static paths`

## P8 — Rebuild The Home Page Exactly [GATE G8]
**Goal:** Recreate the current home page section by section with no redesign.
- [ ] Hero preserved
- [ ] Trust strip preserved
- [ ] Featured products preserved (including placeholders)
- [ ] Logo marquee preserved
- [ ] Why Choose Us preserved (including placeholder image)
- [ ] Testimonials preserved
- [ ] Industrial grid/check pattern preserved
**Proof:** Side-by-side parity check against current `/`.
**Commit:** `feat(ui): rebuild home page with parity`

## P9 — Rebuild Products, Category Detail, About, Contact, Privacy, And 404 [GATE G9]
**Goal:** Recreate all non-home pages exactly.
- [ ] Products landing page matches
- [ ] Category pages match
- [ ] About page matches (including remote image usage)
- [ ] Contact page matches (including map placeholder)
- [ ] Privacy page matches exactly
- [ ] 404 page matches exactly
**Proof:** Walk through each route and compare with current Vite version.
**Commit:** `feat(ui): rebuild remaining pages with parity`

## P10 — Recreate Global Interactive Shell Using React Islands [GATE G10]
**Goal:** Rebuild interactive shell behavior without SPA routing.
- [ ] Fixed navbar works
- [ ] Mobile nav works
- [ ] Floating enquiry button works
- [ ] Global modal orchestration works
**Proof:** Static route HTML exists and interactive controls still function.
**Commit:** `feat(ui): reintroduce interactive shell as islands`

## P11 — Port Enquiry Modal And Server-Side Enquiry Endpoint [GATE G11]
**Goal:** Preserve enquiry experience with server-side secrets.
- [ ] Same form fields and validation behavior
- [ ] Same consent requirement
- [ ] Same product selection behavior
- [ ] Same success/error toast behavior
- [ ] Same-origin `/api/enquiry` endpoint in Astro
**Proof:** Form opens and submits successfully in the Astro app.
**Commit:** `feat(api): port enquiry modal and server endpoint`

## P12 — Port Chatbot Island And Its Handoff Into Enquiry [GATE G12]
**Goal:** Preserve guided recommendation flow exactly.
- [ ] Entry question preserved
- [ ] Cranes/hoists branch preserved
- [ ] Generators branch preserved
- [ ] Recommendation confidence labels preserved
- [ ] Shortlist behavior preserved
- [ ] "Enquire for this product" opens enquiry with selected product
**Proof:** Both chatbot branches complete and hand off properly.
**Commit:** `feat(chatbot): port chatbot and enquiry handoff`

## P13 — Reapply Smooth Scroll, Motion, And Transition Behavior Carefully [GATE G13]
**Goal:** Reproduce the current experiential feel without breaking SSR.
- [ ] Smooth scroll behavior restored if appropriate
- [ ] Page transitions restored as closely as practical
- [ ] Hover motions preserved
- [ ] Modal scale/orientation behavior preserved
- [ ] Deviations documented if parity is not possible
**Proof:** Compare motion behavior on key interactions and record any deltas.
**Commit:** `feat(ui): restore motion and transitions with parity`

## P14 — Full Parity Review, Codex Update, And Handover [GATE G14]
**Goal:** Confirm parity and document readiness.
- [ ] Progress.md updated with real migration state
- [ ] RepositoryMemory.md updated with actual Astro architecture
- [ ] Parity gaps listed honestly
- [ ] Route-by-route verification completed
- [ ] Final decision recorded (ready or not ready)
**Proof:** Written parity report and route checklist.
**Commit:** `chore(migration): finalize parity review and handover`
