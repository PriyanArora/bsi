# Build Flow

> Phase done = checkpoint passes, not code written.
> Each phase has a **Proof** line — what the student must demonstrate to pass the gate.

## Prerequisites
- Node.js (v18+), npm
- Git
- Resend account with a verified sending domain/address
- Vercel account
- Do NOT set up CI/CD until P17

---

## P1 — Repo Setup `[GATE G1]`
**Goal:** Clean repo with `client/` as the app root, co-located serverless submission code, .gitignore, dependencies installed, and env example files
- [ ] Conventional initial commit
- [ ] .gitignore covers secrets, deps, build artifacts (node_modules, .env, dist)
- [ ] Folder structure: `client/` app with co-located `client/api/` submission endpoint
- [ ] `.env.example` in `client/` with all current keys listed (no values)
- [ ] Client dependencies install cleanly
**Proof:** Show `git log --oneline -1`. Show `ls client/`. Show .gitignore contents. Run `npm install` in `client/`.
**Commit:** `chore(init): initialise client app and co-located submission structure`

## P2 — Resend Setup `[GATE G2 — requires G1]`
**Goal:** Verified email delivery provider configured for this project, with no browser-exposed secrets.
- [ ] Resend account created for the project
- [ ] Sending domain or sender address verified
- [ ] API key created and stored only in deployment env vars
- [ ] Gmail OAuth2 credentials and MongoDB dependency marked for removal from production plan
**Proof:** Show verified sender in Resend dashboard. Show env var names only, with values redacted. Show no client-side secret exposure.
**Commit:** `chore(email): configure resend and retire gmail oauth plan`

## P3 — Submission Endpoint `[GATE G3 — requires G2]`
**Goal:** Serverless POST /api/enquiry endpoint exists on the frontend host and sends enquiries through Resend.
- [ ] POST /api/enquiry exists as a serverless handler
- [ ] Input sanitized before provider call
- [ ] Email payload contains enquiry details in a readable format
- [ ] Error path returns meaningful JSON error (not stack trace)
- [ ] No custom always-on backend required
**Proof:** POST valid enquiry → 201 or success JSON and email arrives. POST invalid enquiry → 400 + error message.
**Commit:** `feat(api): add serverless enquiry submission endpoint`

## P4 — Validation + Abuse Controls `[GATE G4 — requires G3]`
**Goal:** Enquiry submission is validated and protected without a custom Express server.
- [ ] Zod schema validates: firstName required, lastName required, phone required (Indian 10-digit), email optional (valid format), other fields optional
- [ ] Abuse control added at the submission layer (provider, middleware, or platform-friendly rate limiting)
- [ ] Tests or reproducible proof cover valid and invalid submissions
- [ ] All tests or manual proof pass
**Proof:** Submit valid enquiry → success. Submit invalid phone → 400. Demonstrate the abuse-control configuration or provider rule.
**Commit:** `feat(api): add submission validation and abuse controls`

## P5 — Enquiry Form Integration `[GATE G5 — requires G4]`
**Goal:** Frontend enquiry form submits to the serverless endpoint and handles responses cleanly.
- [ ] Enquiry modal opens from floating button and navbar
- [ ] Form uses Shadcn/ui components + React Hook Form + Zod
- [ ] Client-side validation matches submission endpoint
- [ ] Successful submission calls POST /api/enquiry and shows success toast
- [ ] Error state shows user-friendly message
- [ ] Form resets after successful submission
**Proof:** Open modal, submit valid enquiry → toast + email received. Submit invalid phone → client-side error shown. Show network tab confirming API call.
**Commit:** `feat(ui): connect enquiry form to serverless submission flow`

## P6 — Delivery Verification `[GATE G6 — requires G5]`
**Goal:** Production-style email delivery is verified with provider logs and no Gmail SMTP dependency remains.
- [ ] Resend activity logs show successful deliveries
- [ ] From address/domain authentication passes
- [ ] No Google OAuth2 / Gmail SMTP dependency remains in the production path
- [ ] No MongoDB dependency remains in the production path
- [ ] Secrets stored only in deployment env vars
**Proof:** Submit enquiry → email arrives and corresponding provider log entry exists. Show no Gmail/Mongo production dependency in architecture.
**Commit:** `feat(email): verify provider delivery and remove legacy dependencies`

## P7 — React Skeleton + Routing `[GATE G7 — requires G6]`
**Goal:** React app with React Router v7, layout (navbar + footer), all pages render, Tailwind configured
- [ ] React + Vite app in client/ with Tailwind CSS configured
- [ ] Shadcn/ui initialised
- [ ] React Router v7 with routes: /, /products, /about, /contact, /* (404)
- [ ] Shared layout: navbar + footer (from HTML prototype structure)
- [ ] All pages render with placeholder content
- [ ] Navigation between pages works
**Proof:** Run `npm run dev` in client/. Click through all nav links. Show 404 page for invalid route.
**Commit:** `feat(ui): add React skeleton with routing and layout`

## P8 — Enquiry Form `[GATE G8 — requires G7]`
**Goal:** Enquiry modal with Shadcn form components, React Hook Form + Zod validation, connected to the serverless submission endpoint
- [ ] Enquiry modal opens from floating button and navbar
- [ ] Form uses Shadcn/ui components + React Hook Form + Zod
- [ ] Client-side validation matches the submission handler (firstName + lastName required, phone Indian format, email optional format)
- [ ] Successful submission calls POST /api/enquiry and shows success toast
- [ ] Error state shows user-friendly message
- [ ] Form resets after successful submission
**Proof:** Open modal, submit valid enquiry → toast + email received. Submit invalid phone → client-side error shown. Show network tab confirming API call.
**Commit:** `feat(ui): add enquiry form modal with validation and serverless integration`

## P9 — Chatbot + Product Pages `[GATE G9 — requires G8]`
**Goal:** Decision-tree chatbot component, product pages with real content structure, chatbot pre-fills enquiry form
- [ ] Chatbot opens from "Help me choose" button in navbar
- [ ] Decision tree asks: application type, load capacity, lift height, usage frequency
- [ ] Recommends product category based on answers
- [ ] Opens enquiry modal with productOfInterest pre-selected
- [ ] Products page displays all product categories with specs and enquiry buttons
- [ ] Product enquiry buttons open modal with product pre-selected
- [ ] No regressions on existing enquiry flow
**Proof:** Walk through chatbot flow → shows recommendation → opens enquiry form with product pre-selected. Submit successfully. Products page buttons work.
**Commit:** `feat(ui): add chatbot decision tree and product pages`

## P10 — Contact + About Pages `[GATE G10 — requires G9]`
**Goal:** Contact page with company info (no duplicate form), About page with company content. Both styled from prototype.
- [ ] Contact page shows: phone, email, address, office hours, map/location placeholder
- [ ] Contact page uses floating enquiry button (no separate form)
- [ ] About page shows: mission, experience, industries served, trust badges
- [ ] Testimonial cards with placeholder content (marked for client replacement)
- [ ] Both pages responsive
- [ ] No regressions
**Proof:** Navigate to /contact and /about. Verify no duplicate form on contact. Floating button works on both pages.
**Commit:** `feat(ui): add contact and about pages from prototype`

## P11 — SEO `[GATE G11 — requires G10]`
**Goal:** Static meta tags on all pages, sitemap.xml, robots.txt, Open Graph tags
- [ ] Each page has unique title, description, keywords meta tags
- [ ] Open Graph tags (og:title, og:description, og:image) on all pages
- [ ] sitemap.xml generated with all public routes
- [ ] robots.txt allows crawling
- [ ] Structured data (JSON-LD) for local business
- [ ] Google Search Console verification tag ready
**Proof:** View page source for each page — show unique meta tags. Access /sitemap.xml and /robots.txt. Run Lighthouse SEO audit.
**Commit:** `feat(seo): add meta tags, sitemap, robots.txt, and structured data`

## P12 — Polish + Animations `[GATE G12 — requires G11]`
**Goal:** Aceternity UI effects, Framer Motion transitions, responsive design verified, images optimised
- [ ] Hero section uses Aceternity UI effects (spotlight, animated cards, or similar)
- [ ] Page transitions with Framer Motion
- [ ] All pages responsive (mobile, tablet, desktop)
- [ ] Images lazy loaded
- [ ] Placeholder images marked for client replacement
- [ ] Acceptable load time on mobile
**Proof:** Test on mobile viewport. Show Lighthouse performance score. Demonstrate animations.
**Commit:** `feat(ui): add animations and responsive polish`

## P13 — Environment Config `[GATE G13 — requires G12]`
**Goal:** All environment configs documented and working for dev and production
- [ ] .env.example updated with all current keys
- [ ] Submission endpoint runs cleanly with only env values
- [ ] Missing env var → endpoint fails fast with clear error message
- [ ] No hardcoded values in any file
- [ ] No email provider secret exposed to the browser bundle
**Proof:** Remove required env var → see clear failure. Restore env vars → submission succeeds. Confirm no client-side secret exposure in built assets.
**Commit:** `chore(config): harden serverless environment configuration`

## P14 — Performance `[GATE G14 — requires G13]`
**Goal:** Lighthouse audit passing, bundle optimised, images optimised
- [ ] Lighthouse performance score > 80
- [ ] Bundle size analysed and any large dependencies tree-shaken
- [ ] Images compressed and using modern formats where possible
- [ ] Lazy loading on below-fold content
- [ ] Graceful without optimisation layer (works if JS loads slowly)
**Proof:** Run Lighthouse audit, show scores. Show bundle analysis output.
**Commit:** `perf(ui): optimise bundle size and loading performance`

## P15 — Deploy Frontend + Submission Endpoint `[GATE G15 — requires G14]`
**Goal:** React app and its serverless submission endpoint live on Vercel, with provider env vars configured
- [ ] Frontend deployed to Vercel at production URL
- [ ] POST /api/enquiry works in the deployed environment and sends email
- [ ] All env vars set in Vercel (not in repo)
- [ ] HTTPS enforced
**Proof:** Visit deployment, submit enquiry → email received. Show env vars in dashboard with values redacted.
**Commit:** `chore(deploy): deploy frontend and submission endpoint to vercel`

## P16 — Domain + Production Verification `[GATE G16 — requires G15]`
**Goal:** DNS pointed to Vercel, production site verified end-to-end, no separate backend host involved
- [ ] Frontend deployed to Vercel at production URL
- [ ] DNS pointed to Vercel (domain configured)
- [ ] Enquiry form works end-to-end in production
- [ ] All pages load correctly
- [ ] HTTPS via Vercel
**Proof:** Visit production URL. Submit enquiry → email received. Navigate all pages. Show HTTPS in browser.
**Commit:** `chore(deploy): connect production domain and verify enquiry flow`

## P17 — CI/CD `[GATE G17 — requires G16]`
**Goal:** GitHub Actions pipeline — tests on push, deploy on merge to main
- [ ] GitHub Actions workflow: run tests on every push
- [ ] Tests pass in CI environment
- [ ] Merge to main triggers deployment
- [ ] Failed tests block merge/deploy
**Proof:** Push a commit → show GitHub Actions running tests. Show failed test blocking deploy.
**Commit:** `ci(pipeline): add GitHub Actions for test and deploy`
