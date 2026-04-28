# Progress

**Current Gate:** G2 (Resend Setup)
**Current Phase:** P2
**Project Category:** web
**Last Updated:** 2026-04-28
**Session Notes:** The legacy `server/` backend has been removed. The repo now uses a client-only Vercel shape with a co-located `client/api/enquiry.js` serverless handler and matching Vite dev middleware. The remaining blockers are provider provisioning, delivery verification, abuse controls, and production deployment. Frontend implementation is materially ahead of the original tracker and is recorded below.

> Gates are still blocked by missing proof for provider setup and deployment, even when implementation code already exists.

---

## G0 — Project Setup `[complete]`
- [x] G0.1 Identity — all questions answered + confirmed
- [x] G0.2 Developer Profile — all questions answered + confirmed
- [x] G0.3 Architecture + category detected + confirmed
- [x] G0.4 Features & Structure — all questions answered + confirmed
- [x] G0.5 Constraints & Red Lines — all questions answered + confirmed
- [x] G0.6 Critique + cross-check — all concerns resolved
- [x] G0.6 Fill manifest — all fields populated, user confirmed
- [x] G0.6 Files generated — ProjectSummary, Codex_guide, BuildFlow, Progress
- [x] G0.6 Verification — zero placeholders in any codex/ file
- [x] Unused ProjectSummary templates deleted

---

## P1 — Repo Setup `[complete]`
- [x] `.gitignore` covers secrets, deps, and build artifacts
- [x] Repo shape is now `client/` with co-located `client/api/` serverless submission code
- [x] `client/.env.example` exists for the current architecture
- [x] Client dependencies install cleanly
- [x] Legacy `server/` backend removed from the repo

## P2 — Resend Setup `[in progress]`
- [ ] Resend account created for the project
- [ ] Sending domain or sender address verified
- [ ] API key created and stored only in deployment env vars
- [x] Gmail OAuth2 and MongoDB are removed from the real submission path and from the repo

## P3 — Submission Endpoint `[in progress]`
- [x] `client/api/enquiry.js` exists as the serverless handler target
- [x] Shared handler sanitizes and validates input before provider call
- [x] Email payload is built in readable text and HTML formats for the owner inbox
- [x] Error paths return structured JSON without stack traces
- [x] Local `npm run dev` keeps `/api/enquiry` working through Vite middleware
- [ ] Live provider-backed delivery verified with real env values

## P4 — Validation + Abuse Controls `[in progress]`
- [x] Frontend Zod validation exists for first name, last name, phone, email, and consent
- [x] Serverless handler re-validates the submitted payload
- [ ] Abuse control added at the submission layer
- [ ] Tests or reproducible live proof cover valid and invalid submissions
- [ ] End-to-end submission verified against real provider credentials

## P5 — Enquiry Form Integration `[complete in code, pending live provider proof]`
- [x] Enquiry modal opens from floating button and navbar
- [x] Form uses React Hook Form + Zod
- [x] Client submits to same-origin `/api/enquiry`
- [x] Success path shows toast and resets the form
- [x] Error path shows user-friendly toast messaging
- [x] Chatbot handoff still opens the same enquiry form with product preselection

## P6 — Delivery Verification `[not started]`
- [ ] Resend activity logs show successful deliveries
- [ ] From address/domain authentication passes
- [ ] Deployed env vars verified in Vercel
- [ ] Production enquiry reaches owner inbox reliably

## P7 — React Skeleton + Routing `[complete]`
- [x] React + Vite app in `client/`
- [x] Tailwind configured
- [x] React Router routes for home, products, category detail, about, contact, privacy, and 404
- [x] Shared layout with navbar, footer, mobile nav, and floating enquiry button
- [x] Navigation works through the current route tree

## P8 — Enquiry Form `[complete in code, pending live provider proof]`
- [x] Modal UI is built and integrated
- [x] Product selection flow supports direct entry and chatbot-led entry
- [x] Form validation, consent, and reset logic are implemented
- [x] Submit path no longer depends on a separate custom backend

## P9 — Chatbot + Product Pages `[complete]`
- [x] “Help me choose” opens the chatbot
- [x] Decision tree exists for crane/hoist and generator discovery
- [x] Recommendations lead into the enquiry flow with preselected product context
- [x] Products page and category pages expose enquiry actions
- [x] AMC CTA and category/product enquiry paths are implemented

## P10 — Contact + About Pages `[in progress]`
- [x] Contact page includes phone, email, address, office hours, and contact guidance
- [x] About page includes company positioning, supporting sections, and testimonials
- [x] Floating enquiry flow is preserved instead of duplicating a contact form
- [x] Responsive layout work is present across both pages
- [ ] Map/content placeholders still remain in parts of the content

## P11 — SEO `[in progress]`
- [x] Unique page titles and descriptions are present through `react-helmet-async`
- [x] Open Graph tags exist on public pages
- [x] `robots.txt` and `sitemap.xml` exist in `client/public`
- [ ] JSON-LD local business schema not yet added
- [ ] Google Search Console verification tag not yet added

## P12 — Polish + Animations `[in progress]`
- [x] Page transitions are implemented with Framer Motion
- [x] Home page includes the current custom visual treatment and preserved section styling
- [x] Product/logo imagery is lazy loaded in multiple grids and sections
- [x] Mobile/orientation handling exists for modal scaling and layout flow
- [ ] Performance verification and final content cleanup still pending

## P13 — Environment Config `[in progress]`
- [x] `client/.env.example` reflects the new serverless env shape
- [x] Provider secrets remain server-side only; no `VITE_` secret exposure is used
- [x] Missing required env vars fail explicitly inside the shared submission handler
- [ ] Real local and deployed env values still need to be provisioned and verified

## P14 — Performance `[not started]`
- [ ] Lighthouse audit run after architecture migration
- [ ] Bundle size review
- [ ] Image compression audit
- [ ] Mobile performance verification

## P15 — Deploy Frontend + Submission Endpoint `[not started]`
- [ ] Vercel project created for the `client/` app
- [ ] `/api/enquiry` works in the deployed environment
- [ ] Production env vars set in Vercel
- [ ] HTTPS confirmed

## P16 — Domain + Production Verification `[not started]`
- [ ] Squarespace DNS pointed at Vercel
- [ ] Production site loads correctly on the custom domain
- [ ] Live enquiry reaches inbox in production
- [ ] Final cross-page production smoke test completed

## P17 — CI/CD `[not started]`
- [ ] Test/build automation defined
- [ ] CI pipeline wired
- [ ] Deploy protections verified
