# Build Flow

> Phase done = checkpoint passes, not code written.
> Each phase has a **Proof** line — what must be demonstrated to pass the gate.

## Prerequisites
- Node.js 22.12+ and npm
- Git
- Vercel account
- Email provider account for the chosen submission architecture

## Architecture Constraint
- Current code uses an Astro API route plus Resend.
- If the provider changes later, do not expose provider secrets in the browser.
- “Frontend-only” is acceptable only if the chosen workflow is browser-safe by design.

---

## P1 — Repo Setup `[GATE G1]`
**Goal:** Clean Astro repo with `client/` as the app root, dependencies installed, env example present, and no staging app left behind.
- [ ] Conventional initial commit
- [ ] `.gitignore` covers dependencies, generated Astro files, env files, and build artifacts
- [ ] `client/` contains the promoted Astro app
- [ ] `.env.example` exists in `client/`
- [ ] Client dependencies install cleanly
**Proof:** Show `ls client/`. Show `client/.gitignore`. Run `npm install` in `client/`.
**Commit:** `chore(init): finalise astro app repo structure`

## P2 — Resend Setup `[GATE G2 — requires G1]`
**Goal:** Current delivery provider configured with verified sender details and no browser-exposed secrets.
- [ ] Resend account created for the project
- [ ] Sending domain or sender address verified
- [ ] API key created and stored only in deployment env vars
- [ ] Future provider-change note documented if Resend is being replaced later
**Proof:** Show verified sender in the provider dashboard. Show env var names only, with values redacted.
**Commit:** `chore(email): configure current enquiry provider`

## P3 — Submission Endpoint `[GATE G3 — requires G2]`
**Goal:** Same-origin `/api/enquiry` path exists in Astro and can deliver enquiries through the current provider.
- [ ] `client/src/pages/api/enquiry.js` handles POST requests
- [ ] Shared handler sanitizes input before the provider call
- [ ] Email payload is readable in owner inbox
- [ ] Error paths return structured JSON without stack traces
- [ ] No custom always-on backend is required
**Proof:** POST valid enquiry -> success JSON and email arrives. POST invalid enquiry -> 400 + clear message.
**Commit:** `feat(api): add astro enquiry submission route`

## P4 — Validation + Abuse Controls `[GATE G4 — requires G3]`
**Goal:** Enquiry submission is validated and protected at both the browser and submission layers.
- [ ] Zod schema validates first name, last name, phone, email, consent, and optional fields
- [ ] Submission path re-validates the normalized payload
- [ ] Abuse control added at the submission layer
- [ ] Reproducible proof covers valid and invalid submissions
**Proof:** Submit valid enquiry -> success. Submit invalid phone -> 400. Show the abuse-control mechanism used.
**Commit:** `feat(api): harden enquiry validation and abuse controls`

## P5 — Enquiry Form Integration `[GATE G5 — requires G4]`
**Goal:** The React enquiry modal submits cleanly through the current submission path.
- [ ] Floating button opens the modal
- [ ] Static CTAs open the modal through the shared event system
- [ ] Client-side validation matches the server-side schema
- [ ] Success path resets the form and shows a toast
- [ ] Error path shows a user-friendly failure message
**Proof:** Open modal from multiple CTAs, submit valid enquiry, see toast and network success.
**Commit:** `feat(ui): connect enquiry modal to astro submission flow`

## P6 — Delivery Verification `[GATE G6 — requires G5]`
**Goal:** Production-style delivery is verified end-to-end.
- [ ] Provider activity logs show successful deliveries
- [ ] From address/domain authentication passes
- [ ] Reply-to behavior works as expected
- [ ] Owner inbox receives production-style enquiries reliably
**Proof:** Submit enquiry -> email arrives and provider log entry exists.
**Commit:** `feat(email): verify production enquiry delivery`

## P7 — Astro App Shell + Routing `[GATE G7 — requires G6]`
**Goal:** Astro file routes, shared layout, and React islands are in place for the public site.
- [ ] Astro routes exist for home, products, category detail, about, contact, privacy, and 404
- [ ] Shared layout handles navbar, footer, floating button, modal root, and smooth scroll provider
- [ ] Public navigation works across the route tree
- [ ] `npm run build` succeeds
**Proof:** Run `npm run build` in `client/`. Show the generated routes list.
**Commit:** `feat(ui): add astro shell and route structure`

## P8 — Enquiry Form UX `[GATE G8 — requires G7]`
**Goal:** The enquiry modal UX is production-ready for product selection flows.
- [ ] Multi-select product chooser works
- [ ] Chatbot handoff preselects the recommended product
- [ ] Service option handoff supports AMC Care
- [ ] Modal accessibility behaviors still work
**Proof:** Open from chatbot and CTA paths, verify preselection and close/focus behavior.
**Commit:** `feat(ui): finalise enquiry modal experience`

## P9 — Chatbot + Product Pages `[GATE G9 — requires G8]`
**Goal:** Recommendation flow and product catalog routes work together without regressions.
- [ ] Chatbot opens from navbar and mobile nav
- [ ] Product landing page renders both product families
- [ ] Category pages generate from catalog data
- [ ] Product/category CTAs preserve enquiry context
- [ ] No regressions on the shared enquiry path
**Proof:** Walk the chatbot flow and at least two product/category enquiry flows.
**Commit:** `feat(ui): finalise chatbot and product route behavior`

## P10 — Contact + About Pages `[GATE G10 — requires G9]`
**Goal:** Supporting pages match the approved Astro site content and layout.
- [ ] Contact page shows phone, email, address, office hours, and map placeholder
- [ ] About page shows mission, experience, industries served, and trust content
- [ ] No duplicate contact form exists outside the enquiry modal
- [ ] Remaining placeholders are intentional and documented
**Proof:** Navigate to `/about` and `/contact` and verify the intended content blocks.
**Commit:** `feat(ui): finalise about and contact pages`

## P11 — SEO `[GATE G11 — requires G10]`
**Goal:** Server-rendered metadata is correct in Astro.
- [ ] Unique titles and descriptions exist for each public page
- [ ] OG tags are present on public pages
- [ ] `robots.txt` and `sitemap.xml` are present
- [ ] LocalBusiness JSON-LD exists in the layout
- [ ] Search Console verification tag is added if provided
**Proof:** View rendered page source for multiple routes. Access `/robots.txt` and `/sitemap.xml`.
**Commit:** `feat(seo): finalise astro metadata and crawl files`

## P12 — Polish + Interactivity `[GATE G12 — requires G11]`
**Goal:** Visual polish and interactive behavior match the approved Astro build.
- [ ] Smooth scrolling works
- [ ] Hero parallax works on desktop
- [ ] Footer back-to-top behavior works and aligns correctly
- [ ] Hover motion and page-enter motion work as intended
- [ ] Responsive layouts hold across mobile, tablet, and desktop
**Proof:** Manual smoke test across key viewports and interaction points.
**Commit:** `feat(ui): finalise astro polish and motion`

## P13 — Environment Config `[GATE G13 — requires G12]`
**Goal:** Environment handling is explicit and safe.
- [ ] `.env.example` matches the current submission path
- [ ] Missing env vars fail with clear server-side errors
- [ ] No provider secret is exposed to the browser bundle
- [ ] Production env names are documented
**Proof:** Remove a required env var locally and observe the explicit failure.
**Commit:** `chore(config): harden astro environment configuration`

## P14 — Performance `[GATE G14 — requires G13]`
**Goal:** Performance is measured and acceptable for the deployed marketing site.
- [ ] Lighthouse performance review completed
- [ ] Heavy assets reviewed
- [ ] Lazy loading confirmed on below-fold images
- [ ] Bundle/output shape reviewed after Astro promotion
**Proof:** Show the audit and what was accepted or changed.
**Commit:** `perf(ui): review astro performance and assets`

## P15 — Deploy Astro App + Submission Endpoint `[GATE G15 — requires G14]`
**Goal:** The Astro app and its current submission path run in the deployed environment.
- [ ] Vercel project is configured for `client/`
- [ ] Public routes load correctly in deployment
- [ ] `/api/enquiry` works in deployment
- [ ] Env vars are set in Vercel
**Proof:** Visit deployment and submit a live enquiry.
**Commit:** `chore(deploy): deploy astro site and enquiry route`

## P16 — Domain + Production Verification `[GATE G16 — requires G15]`
**Goal:** Production domain and full smoke test are complete.
- [ ] Custom domain points at Vercel
- [ ] HTTPS works
- [ ] All public routes load on the production domain
- [ ] Production enquiry reaches the owner inbox
**Proof:** Run a production smoke test across routes and the enquiry flow.
**Commit:** `chore(deploy): verify production domain and delivery`

## P17 — CI/CD `[GATE G17 — requires G16]`
**Goal:** Automated verification is in place.
- [ ] Build verification runs in CI
- [ ] Any tests/checks required by the repo run in CI
- [ ] Deployment protections are documented
- [ ] Failed verification blocks merge/deploy
**Proof:** Show a CI run and the commands it executes.
**Commit:** `ci(pipeline): add astro verification workflow`
