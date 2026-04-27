# Repository Memory

**Recorded:** 2026-04-27
**Repository:** `/home/priyan/Desktop/bsi`

## Current Shape
- Monorepo with `client/` (React + Vite SPA) and `server/` (Express + MongoDB + Nodemailer).
- Guidance/docs were originally mentor-scoped and have been renamed to Codex-scoped paths.
- Hidden command folder was renamed to `.codex-commands` because a root-level `.codex` file already exists and blocked the exact hidden-folder rename to `.codex`.

## Actual Product Scope
- Business site for BSI Solutionz, an authorized Bajaj Indef dealer, with product catalog, enquiry capture, recommendation chatbot, SEO metadata, and supporting pages.
- Frontend also includes Jakson diesel generator catalog and generator recommendation branches, which go beyond the original crane/hoist-only summary.

## What Exists In Code
- Backend:
  - Express app with `GET /api/health` and `POST /api/enquiry`.
  - Mongoose enquiry model, DB connect module, seed script, Zod validation, rate limiting, and Gmail OAuth2 email service.
  - Jest/Supertest tests for enquiry route and email service are present.
- Frontend:
  - Router, shared layout, navbar, footer, mobile nav, floating enquiry button.
  - Home, products, product category, about, contact, privacy policy, and 404 pages.
  - Enquiry modal wired with React Hook Form + Zod and POST submission to the backend.
  - Decision-tree chatbot with crane/hoist and generator branches.
  - Product catalog and asset-matching helpers for category and product imagery.
  - Page transitions, smooth scrolling, SEO metadata, and multiple polished content sections.

## Progress Reality Vs Recorded Progress
- `codex/Progress.md` says work stopped at G7 / P7 and describes only the backend through G6 as complete.
- The codebase is materially ahead of that tracker on the frontend:
  - Routing and layout exist.
  - About, contact, privacy, and 404 pages exist.
  - Product category pages, product grid, product imagery, and CTA flows exist.
  - Enquiry modal and chatbot flows exist.
  - SEO tags and transitions are already implemented.
- The tracker is therefore stale and should not be treated as an exact representation of current implementation status.

## Important Divergences And Risks
- Commit history does not follow the documented conventional-commit rule. Recent commits are `temp 26` through `temp 36`.
- Tooling could not be verified locally because dependencies are not installed in `client/` or `server/`.
  - `server`: `npm test -- --runInBand` failed because `jest` is not installed locally.
  - `client`: `npm run build` failed because `vite` is not installed locally.
  - `client`: `npm run lint` failed because `@eslint/js` is not installed locally.
- Frontend/backend contract is inconsistent in several places:
  - Client uses `firstName` + `lastName`, then derives `fullName` before submission.
  - Client allows multiple selected products and joins them into a string before submit.
  - Backend validator allows email-only submissions and does not enforce Indian mobile numbers starting with `6-9`, despite the project red lines saying it should.
- Backend env var names diverge from the original summary:
  - Docs describe `SENDER_EMAIL` and `RECEIVER_EMAIL`.
  - Code currently expects `GMAIL_FROM` and `NOTIFICATION_EMAIL`.
- Placeholder and unfinished content still exist in the frontend:
  - Featured products cards still use placeholder media/content.
  - Contact page still has a Google Maps placeholder.
  - Some about/home sections still carry TODO-style or placeholder content.
- `client/src/components/about/AboutBento.jsx` embeds a remote Google-hosted image instead of using a local asset.

## Working Mental Model
- Treat the repo as a partially documented production marketing site where implementation has advanced faster than the mentor workflow files.
- The next useful future pass is not feature work by default; it is reconciliation:
  - bring docs/progress up to actual state,
  - align frontend/backend validation,
  - restore runnable local toolchains,
  - then verify the enquiry path end-to-end.
