# Deployment Checks

Use this before promoting the Astro site from local verification to production.

## Required CI Checks

- `npm run verify:enquiry`
- `npm run build`

The GitHub Actions workflow in `.github/workflows/verify.yml` runs both checks on pushes to `main` and on pull requests. Branch protection should require this workflow before merge or deployment.

## Required Environment Variables

Set these in local `.env` files and in the deployment provider. Do not expose them in browser code.

- `RESEND_API_KEY`
- `ENQUIRY_FROM_EMAIL`
- `RECEIVER_EMAIL`
- `ENQUIRY_RATE_LIMIT_MAX`
- `ENQUIRY_RATE_LIMIT_WINDOW_MS`

## Provider Verification

Before production launch, verify these outside the repo:

- Resend account is active
- Sender address or sending domain is verified
- SPF, DKIM, and domain authentication pass if a domain sender is used
- Reply-to points to the visitor email when provided
- A production-style enquiry reaches the owner inbox

## Deployment Verification

After Vercel is connected to `client/`, verify:

- Home, products, product category, about, contact, privacy, and 404 routes load
- `/api/enquiry` accepts valid submissions
- Invalid submissions return structured JSON
- Rate-limited submissions return HTTP 429
- Custom domain resolves over HTTPS
