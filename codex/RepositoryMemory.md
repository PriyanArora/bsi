# Repository Memory

**Recorded:** 2026-04-28
**Repository:** `/home/priyan/Desktop/bsi`

## Current Shape
- `client/` is now the promoted Astro app.
- The old Vite implementation has been retired from the repo.
- The temporary `bsi-astro/` staging workspace is gone.
- The temporary `.codex-commands/` helper bundle is gone.

## What Exists In Code
- Public routes are Astro pages under `client/src/pages/`.
- Shared page shell lives in `client/src/layouts/Layout.astro`.
- Interactive surfaces live in React islands under `client/src/components/react/`.
- Product, about, contact, and home sections are static Astro components.
- The enquiry path is currently:
  - `client/src/components/react/EnquiryModal.jsx`
  - `client/src/pages/api/enquiry.js`
  - `client/src/pages/api/_shared/enquiry-handler.js`

## Migration Outcome
- Astro parity work is complete enough for the Astro app to replace the Vite app.
- Final parity fixes already applied:
  - restored home hero parallax,
  - restored static CTA enquiry triggers through the shared event bus,
  - adjusted footer back-to-top placement to avoid overlap and align with the contact column.

## Actual Product Scope
- Business marketing site for BSI Solutionz
- Bajaj Indef lifting systems catalog
- Jakson diesel generator catalog
- Guided recommendation chatbot
- Enquiry capture flow
- SEO/public-site pages

## Current Risks / Open Decisions
- Live provider delivery has not been re-verified with production credentials.
- Abuse/rate-limit protection is still not implemented beyond validation.
- Placeholder content still remains in approved placeholder areas:
  - featured products media/copy,
  - contact-page map,
  - some home/about placeholder content.
- The requested future direction of “frontend-only + SendGrid” is still an architecture decision, not current code.
- Direct browser calls to a provider like SendGrid are not acceptable if they require a secret API key.

## Working Mental Model
- Treat the repo as an Astro marketing site with React islands, not as a Vite SPA.
- The current money path is:
  browser form -> same-origin Astro API route -> Resend -> owner inbox
- If the submission architecture changes later, preserve:
  - secret isolation,
  - same user-facing enquiry flow,
  - identical product/context handoff behavior.
