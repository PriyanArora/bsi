# Progress

**Current Gate:** G5 (Enquiry Validation + Rate Limiting + Tests)
**Current Phase:** P5
**Project Category:** web
**Last Updated:** 2026-03-24
**Session Notes:** G1–G4 complete. Express server running, health + enquiry endpoints working, input sanitized, CORS configured, error handler in place. Starting P5 — Zod validation, rate limiting, integration tests.

> Each gate (G) corresponds to a phase (P): G1 = P1, G2 = P2, etc.
> ALL checkboxes must be `[x]` with proof shown to pass a gate.

---

## G0 — Project Setup `[complete]`
- [x] G0.1 Identity — all questions answered + confirmed
- [x] G0.2 Developer Profile — all questions answered + confirmed
- [x] G0.3 Architecture + category detected + confirmed
- [x] G0.4 Features & Structure — all questions answered + confirmed
- [x] G0.5 Constraints & Red Lines — all questions answered + confirmed
- [x] G0.6 Critique + cross-check — all concerns resolved
- [x] G0.6 Fill manifest — all fields populated, user confirmed
- [x] G0.6 Files generated — ProjectSummary, Claude_guide, BuildFlow, Progress
- [x] G0.6 Verification — zero placeholders in any claude/ file
- [x] Unused ProjectSummary templates deleted

---

## P1 — Repo Setup `[complete]`
- [x] Conventional initial commit
- [x] .gitignore covers secrets, deps, build artifacts (node_modules, .env, dist)
- [x] Folder structure: client/ (React+Vite) and server/ (Express)
- [x] .env.example in server/ with all keys listed (no values)
- [x] Dependencies install cleanly in both client/ and server/

## P2 — MongoDB Connection `[complete]`
- [x] Mongoose connection module reads MONGODB_URI from .env
- [x] Connection success/failure logged with structured logging
- [x] Config comes from env, not hardcoded
- [x] Connection test passes (server starts and connects)

## P3 — Enquiry Model + Seed `[complete]`
- [x] Enquiry schema matches manifest (fullName, phone, email, companyName, productOfInterest, message, source, createdAt)
- [x] Field validations on schema (required fields, enum for source)
- [x] Seed script inserts 3-5 realistic sample enquiries
- [x] Seed is idempotent (safe to run multiple times)
- [x] Data visible in MongoDB Atlas dashboard

## P4 — Express Server + Enquiry Endpoint `[complete]`
- [x] Express server starts on PORT from .env
- [x] POST /api/enquiry validates and saves enquiry to MongoDB
- [x] GET /api/health returns JSON status
- [x] Input sanitized (no raw user input stored)
- [x] CORS configured to allow FRONTEND_URL only
- [x] Error path returns meaningful JSON error (not stack trace)

## P5 — Enquiry Validation + Rate Limiting + Tests `[not started]`
- [ ] Zod schema validates: fullName required, phone required (Indian 10-digit), email optional (valid format), other fields optional
- [ ] express-rate-limit applied to POST /api/enquiry
- [ ] Integration tests: valid submission → 201, missing fullName → 400, invalid phone → 400, rate limit exceeded → 429
- [ ] All tests pass

## P6 — Nodemailer Service `[locked — requires P5]`
- [ ] Nodemailer transporter configured with Gmail OAuth2 (clientId, clientSecret, refreshToken)
- [ ] Email service is a separate module (not inline in route handler)
- [ ] Enquiry endpoint: save to DB first, then send email. DB save failure → 500. Email failure → log error but still return success.
- [ ] Email contains formatted enquiry details (name, phone, product, message, source)
- [ ] No hardcoded credentials — all from .env
- [ ] Unit tests for email service (mock transporter)

## P7 — React Skeleton + Routing `[locked — requires P6]`
- [ ] React + Vite app in client/ with Tailwind CSS configured
- [ ] Shadcn/ui initialised
- [ ] React Router v7 with routes: /, /products, /about, /contact, /* (404)
- [ ] Shared layout: navbar + footer (from HTML prototype structure)
- [ ] All pages render with placeholder content
- [ ] Navigation between pages works

## P8 — Enquiry Form `[locked — requires P7]`
- [ ] Enquiry modal opens from floating button and navbar
- [ ] Form uses Shadcn/ui components + React Hook Form + Zod
- [ ] Client-side validation matches backend (fullName required, phone Indian format, email optional format)
- [ ] Successful submission calls POST /api/enquiry and shows success toast
- [ ] Error state shows user-friendly message
- [ ] Form resets after successful submission

## P9 — Chatbot + Product Pages `[locked — requires P8]`
- [ ] Chatbot opens from "Help me choose" button in navbar
- [ ] Decision tree asks: application type, load capacity, lift height, usage frequency
- [ ] Recommends product category based on answers
- [ ] Opens enquiry modal with productOfInterest pre-selected and source=chatbot
- [ ] Products page displays all product categories with specs and enquiry buttons
- [ ] Product enquiry buttons open modal with product pre-selected
- [ ] No regressions on existing enquiry flow

## P10 — Contact + About Pages `[locked — requires P9]`
- [ ] Contact page shows: phone, email, address, office hours, map/location placeholder
- [ ] Contact page uses floating enquiry button (no separate form)
- [ ] About page shows: mission, experience, industries served, trust badges
- [ ] Testimonial cards with placeholder content (marked for client replacement)
- [ ] Both pages responsive
- [ ] No regressions

## P11 — SEO `[locked — requires P10]`
- [ ] Each page has unique title, description, keywords meta tags
- [ ] Open Graph tags (og:title, og:description, og:image) on all pages
- [ ] sitemap.xml generated with all public routes
- [ ] robots.txt allows crawling
- [ ] Structured data (JSON-LD) for local business
- [ ] Google Search Console verification tag ready

## P12 — Polish + Animations `[locked — requires P11]`
- [ ] Hero section uses Aceternity UI effects (spotlight, animated cards, or similar)
- [ ] Page transitions with Framer Motion
- [ ] All pages responsive (mobile, tablet, desktop)
- [ ] Images lazy loaded
- [ ] Placeholder images marked for client replacement
- [ ] Acceptable load time on mobile

## P13 — Environment Config `[locked — requires P12]`
- [ ] .env.example updated with all current keys
- [ ] Server starts cleanly with only .env values
- [ ] Missing env var → server fails fast with clear error message
- [ ] No hardcoded values in any file
- [ ] CORS correctly restricts to FRONTEND_URL

## P14 — Performance `[locked — requires P13]`
- [ ] Lighthouse performance score > 80
- [ ] Bundle size analysed and any large dependencies tree-shaken
- [ ] Images compressed and using modern formats where possible
- [ ] Lazy loading on below-fold content
- [ ] Graceful without optimisation layer (works if JS loads slowly)

## P15 — Deploy Backend `[locked — requires P14]`
- [ ] Server deployed and reachable at public URL
- [ ] GET /api/health returns 200
- [ ] POST /api/enquiry works from deployed URL (saves to Atlas + sends email)
- [ ] All env vars set in host platform (not in repo)
- [ ] HTTPS enforced

## P16 — Deploy Frontend `[locked — requires P15]`
- [ ] Frontend deployed to Vercel at production URL
- [ ] DNS pointed to Vercel (domain configured)
- [ ] Frontend connects to production backend API
- [ ] Enquiry form works end-to-end in production
- [ ] All pages load correctly
- [ ] HTTPS via Vercel

## P17 — CI/CD `[locked — requires P16]`
- [ ] GitHub Actions workflow: run tests on every push
- [ ] Tests pass in CI environment
- [ ] Merge to main triggers deployment
- [ ] Failed tests block merge/deploy
