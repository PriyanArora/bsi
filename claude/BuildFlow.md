# Build Flow

> Phase done = checkpoint passes, not code written.
> Each phase has a **Proof** line — what the student must demonstrate to pass the gate.

## Prerequisites
- Node.js (v18+), npm
- Git
- MongoDB Atlas account (free tier)
- Google Cloud Console project (for Gmail OAuth2 credentials)
- Vercel account (for frontend deployment — P16)
- Render or Railway account (for backend deployment — P15)
- Do NOT set up CI/CD until P17

---

## P1 — Repo Setup `[GATE G1]`
**Goal:** Clean repo with monorepo structure (client/ + server/), .gitignore, dependencies installed, env example files
- [ ] Conventional initial commit
- [ ] .gitignore covers secrets, deps, build artifacts (node_modules, .env, dist)
- [ ] Folder structure: client/ (React+Vite) and server/ (Express)
- [ ] .env.example in server/ with all keys listed (no values)
- [ ] Dependencies install cleanly in both client/ and server/
**Proof:** Show `git log --oneline -1`. Show `ls client/ server/`. Show .gitignore contents. Run `npm install` in both dirs.
**Commit:** `chore(init): initialise monorepo with client and server structure`

## P2 — MongoDB Connection `[GATE G2 — requires G1]`
**Goal:** Mongoose connects to MongoDB Atlas from server/, config from .env, connection verified
- [ ] Mongoose connection module reads MONGODB_URI from .env
- [ ] Connection success/failure logged with structured logging
- [ ] Config comes from env, not hardcoded
- [ ] Connection test passes (server starts and connects)
**Proof:** Start server, show console log confirming MongoDB connected. Show no hardcoded URI in code.
**Commit:** `feat(db): add MongoDB Atlas connection with Mongoose`

## P3 — Enquiry Model + Seed `[GATE G3 — requires G2]`
**Goal:** Enquiry Mongoose schema defined, seed script inserts test data, data verifiable in Atlas
- [ ] Enquiry schema matches manifest (fullName, phone, email, companyName, productOfInterest, message, source, createdAt)
- [ ] Field validations on schema (required fields, enum for source)
- [ ] Seed script inserts 3-5 realistic sample enquiries
- [ ] Seed is idempotent (safe to run multiple times)
- [ ] Data visible in MongoDB Atlas dashboard
**Proof:** Run seed script. Show MongoDB Atlas screenshot or `mongosh` query showing inserted documents.
**Commit:** `feat(db): add Enquiry model and seed script`

## P4 — Express Server + Enquiry Endpoint `[GATE G4 — requires G3]`
**Goal:** Express server with POST /api/enquiry that validates input and saves to MongoDB. GET /api/health returns status.
- [ ] Express server starts on PORT from .env
- [ ] POST /api/enquiry validates and saves enquiry to MongoDB
- [ ] GET /api/health returns JSON status
- [ ] Input sanitized (no raw user input stored)
- [ ] CORS configured to allow FRONTEND_URL only
- [ ] Error path returns meaningful JSON error (not stack trace)
**Proof:** Use curl or Postman: POST valid enquiry → 201 + saved to DB. POST invalid enquiry → 400 + error message. GET /api/health → 200.
**Commit:** `feat(api): add enquiry endpoint with validation and health check`

## P5 — Enquiry Validation + Rate Limiting + Tests `[GATE G5 — requires G4]`
**Goal:** Zod validation on backend, rate limiting on enquiry endpoint, integration tests passing
- [ ] Zod schema validates: fullName required, phone required (Indian 10-digit), email optional (valid format), other fields optional
- [ ] express-rate-limit applied to POST /api/enquiry
- [ ] Integration tests: valid submission → 201, missing fullName → 400, invalid phone → 400, rate limit exceeded → 429
- [ ] All tests pass
**Proof:** Run test suite, show all passing. Show rate limiter config.
**Commit:** `feat(api): add Zod validation, rate limiting, and integration tests`

## P6 — Nodemailer Service `[GATE G6 — requires G5]`
**Goal:** Email service module using Gmail OAuth2. Enquiry endpoint sends email on successful save.
- [ ] Nodemailer transporter configured with Gmail OAuth2 (clientId, clientSecret, refreshToken)
- [ ] Email service is a separate module (not inline in route handler)
- [ ] Enquiry endpoint: save to DB first, then send email. DB save failure → 500. Email failure → log error but still return success (enquiry is saved).
- [ ] Email contains formatted enquiry details (name, phone, product, message, source)
- [ ] No hardcoded credentials — all from .env
- [ ] Unit tests for email service (mock transporter)
**Proof:** Submit enquiry via curl → email arrives in owner's Gmail. Show no hardcoded credentials. Run tests.
**Commit:** `feat(email): add Nodemailer service with Gmail OAuth2`

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
**Goal:** Enquiry modal with Shadcn form components, React Hook Form + Zod validation, connected to backend API
- [ ] Enquiry modal opens from floating button and navbar
- [ ] Form uses Shadcn/ui components + React Hook Form + Zod
- [ ] Client-side validation matches backend (fullName required, phone Indian format, email optional format)
- [ ] Successful submission calls POST /api/enquiry and shows success toast
- [ ] Error state shows user-friendly message
- [ ] Form resets after successful submission
**Proof:** Open modal, submit valid enquiry → toast + email received + saved in DB. Submit invalid phone → client-side error shown. Show network tab confirming API call.
**Commit:** `feat(ui): add enquiry form modal with validation and API integration`

## P9 — Chatbot + Product Pages `[GATE G9 — requires G8]`
**Goal:** Decision-tree chatbot component, product pages with real content structure, chatbot pre-fills enquiry form
- [ ] Chatbot opens from "Help me choose" button in navbar
- [ ] Decision tree asks: application type, load capacity, lift height, usage frequency
- [ ] Recommends product category based on answers
- [ ] Opens enquiry modal with productOfInterest pre-selected and source=chatbot
- [ ] Products page displays all product categories with specs and enquiry buttons
- [ ] Product enquiry buttons open modal with product pre-selected
- [ ] No regressions on existing enquiry flow
**Proof:** Walk through chatbot flow → shows recommendation → opens enquiry form with product pre-selected. Submit → email shows source=chatbot. Products page buttons work.
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
- [ ] Server starts cleanly with only .env values
- [ ] Missing env var → server fails fast with clear error message
- [ ] No hardcoded values in any file
- [ ] CORS correctly restricts to FRONTEND_URL
**Proof:** Delete .env, start server → see clear error for each missing var. Restore .env → server starts. Test CORS from wrong origin → blocked.
**Commit:** `chore(config): harden environment configuration and validation`

## P14 — Performance `[GATE G14 — requires G13]`
**Goal:** Lighthouse audit passing, bundle optimised, images optimised
- [ ] Lighthouse performance score > 80
- [ ] Bundle size analysed and any large dependencies tree-shaken
- [ ] Images compressed and using modern formats where possible
- [ ] Lazy loading on below-fold content
- [ ] Graceful without optimisation layer (works if JS loads slowly)
**Proof:** Run Lighthouse audit, show scores. Show bundle analysis output.
**Commit:** `perf(ui): optimise bundle size and loading performance`

## P15 — Deploy Backend `[GATE G15 — requires G14]`
**Goal:** Express API live on Render or Railway, connected to MongoDB Atlas, email sending works
- [ ] Server deployed and reachable at public URL
- [ ] GET /api/health returns 200
- [ ] POST /api/enquiry works from deployed URL (saves to Atlas + sends email)
- [ ] All env vars set in host platform (not in repo)
- [ ] HTTPS enforced
**Proof:** curl deployed /api/health → 200. curl POST enquiry → 201 + email received. Show env vars in host dashboard (values redacted).
**Commit:** `chore(deploy): deploy backend to Render/Railway`

## P16 — Deploy Frontend `[GATE G16 — requires G15]`
**Goal:** React app live on Vercel, DNS configured, connects to production backend
- [ ] Frontend deployed to Vercel at production URL
- [ ] DNS pointed to Vercel (domain configured)
- [ ] Frontend connects to production backend API
- [ ] Enquiry form works end-to-end in production
- [ ] All pages load correctly
- [ ] HTTPS via Vercel
**Proof:** Visit production URL. Submit enquiry → email received. Navigate all pages. Show HTTPS in browser.
**Commit:** `chore(deploy): deploy frontend to Vercel with DNS`

## P17 — CI/CD `[GATE G17 — requires G16]`
**Goal:** GitHub Actions pipeline — tests on push, deploy on merge to main
- [ ] GitHub Actions workflow: run tests on every push
- [ ] Tests pass in CI environment
- [ ] Merge to main triggers deployment
- [ ] Failed tests block merge/deploy
**Proof:** Push a commit → show GitHub Actions running tests. Show failed test blocking deploy.
**Commit:** `ci(pipeline): add GitHub Actions for test and deploy`
