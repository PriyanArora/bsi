# Pre-Deploy Local Verification

Generated: 2026-05-03
Rechecked: 2026-05-04

## Commands Run

- `npm run verify:enquiry`
- `npm run build`
- `npm run check`

## Enquiry Endpoint Proof

`npm run verify:enquiry` covers:

- Valid submission returns HTTP 200 and sends the expected Resend payload through a mocked provider call
- Invalid submission returns HTTP 400 with structured JSON
- Repeated submissions from the same client are rate limited with HTTP 429

## Build Output Review

`npm run build` completed successfully and generated 14 static pages.

`npm run check` completed successfully with 0 errors, 0 warnings, and 0 hints.

Static output size:

- `client/dist`: 20M
- `client/.vercel/output/static`: 20M
- CSS bundle: 52K
- React runtime bundle: 182K, deferred with the modal island
- Idle modal root bundle: 36K
- Enquiry modal bundle: 105K, loaded on demand
- Chatbot modal bundle: 25K, loaded on demand

## Asset Review

Astro image optimization now emits WebP variants for product cards, logo strips, hero media, about media, and category/product cards. Largest generated WebP assets:

- `INDEF-M`: 147K
- `hero-crane`: 115K
- `CH-IV-1`: 92K
- `CH-III`: 74K
- `SMD-HOIST`: 66K

The source assets are still present in the static output because they are imported as Astro image metadata, but rendered pages now reference optimized WebP outputs for the main visible image surfaces.

## Content Cleanup

Removed the remaining visible placeholder copy from the home featured products section. The remaining placeholder asset references are product fallback behavior for missing catalog images and are intentional.

## JavaScript Review

- Lenis smooth scrolling is restored as a desktop-only enhancement; phones use native scrolling to preserve pinch zoom
- Removed unused shadcn and tw-animate-css package imports
- Converted the navbar and mobile menu from React to static Astro plus a small inline script
- Converted the floating enquiry button from React to static HTML
- Hydrates the modal root as a React island with `client:load`
- Split enquiry and chatbot modal code into lazy-loaded chunks

## Still Needs External Verification

- Lighthouse run against a served build
- Mobile performance audit with a real browser
- Google Search Console token value
- Resend account, sender, API key, and live delivery verification
- Vercel deployment and production smoke test
