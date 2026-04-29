# Progress

**Current Gate:** G2 (Resend Setup)
**Current Phase:** P2
**Project Category:** web
**Last Updated:** 2026-04-28
**Session Notes:** The Astro app has replaced the old Vite app in `client/`. Public pages now live under `client/src/pages/`, interactive UI is isolated in React islands under `client/src/components/react/`, and the current enquiry path remains `client/src/pages/api/enquiry.js` -> Resend. The visual parity pass is complete, including restored hero parallax, restored static CTA enquiry triggers, and the final footer back-to-top alignment change. The remaining work is operational: provider verification, abuse controls, deployment, and any explicit future decision about replacing the current submission architecture.

> Current code is Astro-first. Any future “frontend-only + SendGrid” change must be treated as a deliberate architecture change, not assumed current truth.

---

## G0 — Project Setup `[complete]`
- [x] G0.1 Identity — all questions answered + confirmed
- [x] G0.2 Developer Profile — all questions answered + confirmed
- [x] G0.3 Architecture + category detected + confirmed
- [x] G0.4 Features & Structure — all questions answered + confirmed
- [x] G0.5 Constraints & Red Lines — all questions answered + confirmed
- [x] G0.6 Fill manifest, generated docs, and verification completed

---

## P1 — Repo Setup `[complete]`
- [x] `client/` is the promoted Astro app
- [x] `.gitignore` covers generated/build artifacts and env files
- [x] `client/.env.example` exists
- [x] Client dependencies install cleanly
- [x] Old Vite staging/app duplication has been removed

## P2 — Resend Setup `[in progress]`
- [ ] Resend account created for the project
- [ ] Sending domain or sender address verified
- [ ] API key stored only in deployment/local env vars
- [x] Future provider-change risk is documented: do not expose secrets in the browser

## P3 — Submission Endpoint `[complete in code, pending live provider proof]`
- [x] `client/src/pages/api/enquiry.js` exists as the Astro submission route
- [x] Shared handler sanitizes and validates payloads
- [x] Owner email payload is generated in readable text and HTML forms
- [x] Error paths return structured JSON without stack traces
- [ ] Live provider-backed delivery verified with real env values

## P4 — Validation + Abuse Controls `[in progress]`
- [x] Frontend Zod validation exists
- [x] Submission route re-validates normalized payloads
- [ ] Abuse/rate-limit control added
- [ ] Reproducible proof covers valid and invalid submissions

## P5 — Enquiry Form Integration `[complete in code, pending live provider proof]`
- [x] Floating button opens the modal
- [x] Static CTAs open the modal through the shared event bus
- [x] Success path resets the form and shows a toast
- [x] Error path shows a user-friendly message
- [x] Chatbot handoff preserves product context

## P6 — Delivery Verification `[not started]`
- [ ] Provider activity logs show successful deliveries
- [ ] From address/domain authentication passes
- [ ] Reply-to behavior verified
- [ ] Production-style enquiry reaches owner inbox reliably

## P7 — Astro App Shell + Routing `[complete]`
- [x] Astro routes exist for home, products, category detail, about, contact, privacy, and 404
- [x] Shared layout shell is in place
- [x] React islands power the interactive surfaces
- [x] `npm run build` succeeds in `client/`

## P8 — Enquiry Form UX `[complete]`
- [x] Product selection flow supports category/product/service choices
- [x] Chatbot handoff preselects product context
- [x] Modal scaling/focus/close behavior is implemented
- [x] Shared submission target remains `/api/enquiry`

## P9 — Chatbot + Product Pages `[complete]`
- [x] Navbar and mobile nav open the chatbot
- [x] Recommendation flow exists for cranes/hoists and generators
- [x] Products landing and category pages render from catalog data
- [x] Product and category CTAs preserve enquiry context
- [x] No parity regressions remain in the shared enquiry flow

## P10 — Contact + About Pages `[in progress]`
- [x] Contact page includes phone, email, address, office hours, and contact guidance
- [x] About page includes mission, experience, industries served, and testimonials
- [x] No duplicate contact form exists outside the modal
- [ ] Approved placeholder content still remains in some sections

## P11 — SEO `[in progress]`
- [x] Unique page titles and descriptions are rendered through Astro head content
- [x] OG tags exist on public pages
- [x] `robots.txt` and `sitemap.xml` exist in `client/public`
- [x] LocalBusiness JSON-LD exists in the shared layout
- [ ] Search Console verification tag not yet added

## P12 — Polish + Interactivity `[in progress]`
- [x] Smooth scrolling is wired through Lenis
- [x] Home hero desktop parallax is restored
- [x] Footer back-to-top behavior works and final alignment change is applied
- [x] Responsive layout and hover motion are present across the approved pages
- [ ] Performance review and final content cleanup still pending

## P13 — Environment Config `[in progress]`
- [x] `client/.env.example` matches the current submission path
- [x] Missing env vars fail explicitly server-side
- [x] Provider secrets remain off the browser bundle
- [ ] Real local and deployed env values still need verification

## P14 — Performance `[not started]`
- [ ] Lighthouse review run on the promoted Astro site
- [ ] Asset review completed
- [ ] Bundle/output review completed
- [ ] Mobile performance verified

## P15 — Deploy Astro App + Submission Endpoint `[not started]`
- [ ] Vercel project points at `client/`
- [ ] Public routes load correctly in deployment
- [ ] `/api/enquiry` works in deployment
- [ ] Deployment env vars are configured

## P16 — Domain + Production Verification `[not started]`
- [ ] Custom domain points at Vercel
- [ ] HTTPS works
- [ ] Cross-page production smoke test completed
- [ ] Production enquiry reaches the owner inbox

## P17 — CI/CD `[not started]`
- [ ] Build verification is wired into CI
- [ ] Any required tests/checks run in CI
- [ ] Deployment protections are documented
- [ ] Failed verification blocks merge/deploy
