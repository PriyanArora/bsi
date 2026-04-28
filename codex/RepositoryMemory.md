# Repository Memory

**Recorded:** 2026-04-28
**Repository:** `/home/priyan/Desktop/bsi`

## Current Shape
- Repo now centers on `client/`, which contains the React + Vite app and a co-located `client/api/` serverless enquiry handler.
- The old `server/` directory has been removed after the architecture pivot away from Express, MongoDB, and Gmail SMTP.
- Guidance/docs were renamed to Codex-scoped paths.
- Hidden command folder was renamed to `.codex-commands` because a root-level `.codex` file already exists.

## Actual Product Scope
- Business site for BSI Solutionz with product catalog, enquiry capture, recommendation chatbot, SEO metadata, and supporting pages.
- Frontend includes both Bajaj Indef lifting systems and Jakson diesel generator catalog flows.

## What Exists In Code
- App shell:
  - Router, shared layout, navbar, footer, mobile nav, floating enquiry button.
  - Home, products, product category, about, contact, privacy, and 404 pages.
- Enquiry system:
  - Modal form using React Hook Form + Zod.
  - Same-origin submission target at `/api/enquiry`.
  - `client/api/enquiry.js` serverless handler plus shared validation/email assembly logic.
  - Vite dev middleware mirrors `/api/enquiry` locally so `npm run dev` still exercises the submission path without a separate backend.
- Recommendation flow:
  - Hardcoded decision-tree chatbot for crane/hoist and generator discovery.
  - Product recommendation handoff into the same enquiry modal.
- Content/polish:
  - Product catalog helpers and image mapping.
  - Page transitions, smooth scrolling, SEO tags, and multiple styled landing sections.

## Progress Reality
- Frontend implementation is well beyond the original early-phase tracker.
- Routing, layout, chatbot flow, product detail flow, contact/about pages, SEO tags, and animation work already exist in code.
- Current blockers are no longer backend construction; they are provider setup, delivery verification, abuse controls, and deployment.

## Current Risks / Gaps
- Resend is not yet configured with live credentials, so enquiry delivery is not yet verified end-to-end.
- Submission path currently has validation but no dedicated abuse/rate-limit layer.
- Placeholder content remains in parts of the site:
  - featured products copy/media placeholders,
  - Google Maps placeholder on contact page,
  - some placeholder/home/about content still needs final replacement.
- Structured data and Search Console verification are still missing.
- Commit history still does not follow the documented conventional-commit rule.

## Working Mental Model
- Treat the repo as a nearly complete marketing frontend whose critical remaining work is operational rather than visual.
- The money path is now: browser form -> same-origin serverless handler -> Resend -> owner inbox.
- Do not reintroduce browser-exposed email secrets or a sleeping custom backend unless there is a clear business reason to add owned persistence later.
