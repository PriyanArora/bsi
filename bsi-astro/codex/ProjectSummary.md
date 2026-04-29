# BSI Solutionz - Project Summary (Astro Migration)

> One-to-one migration of the existing React + Vite site in `client/` into an Astro app in `bsi-astro/`. No redesign or copy edits.

**Problem:** Industrial buyers looking for cranes and hoists have no easy way to discover BSI Solutionz's product range, get guided to the right product for their needs, or submit enquiries online. The owner needs a professional web presence for marketing and lead generation.

**Migration Target:** Match the current site exactly in layout, copy, assets, interactions, placeholders, and routes. The Astro version is not the main version until the user accepts it.

---

## System Overview
```
Browser (Astro SSR/SSG)
  ├── / Home
  ├── /products
  ├── /products/[categorySlug]
  ├── /about
  ├── /contact
  ├── /privacy-policy
  ├── /404
  ├── React Islands: Enquiry Modal, Chatbot Modal, Mobile Nav, Floating Enquire Button
  └── Optional: Smooth Scroll + Page Transitions (parity only)
        │
        ▼
  POST /api/enquiry -> Astro/Vercel Function
                            │
                            ▼
                         Resend API
                            │
                            ▼
                      Owner inbox
```

**Core Constraints:**
- `client/` remains untouched and is the source of truth.
- Astro output must match the current site one-to-one.
- Secrets remain server-side only.

---

## Features
- Product showcase - display Bajaj Indef cranes/hoists with images, specs, and enquiry buttons
- Enquiry form - modal with validated fields, submits to a serverless endpoint, emails owner
- Hardcoded chatbot - decision-tree wizard guiding users to the right product, pre-fills enquiry form
- SEO - static meta tags per page, sitemap.xml, robots.txt, Google Search Console ready
- Floating "Enquire Now" button - persistent on every page, opens enquiry modal
- Contact page - company contact info, location, office hours (no duplicate form)
- About page - company mission, experience, industries served
- 404 page - friendly error page for invalid routes

---

## Tech Stack
| Layer | Technology | Host |
|-------|-----------|------|
| Frontend | Astro + React (islands), Tailwind CSS, Shadcn/ui, Framer Motion (parity) | Vercel |
| Submission Layer | Astro API routes (Vercel Functions) + Resend Email API | Vercel + Resend |
| CI/CD | GitHub Actions | GitHub |

---

## Architecture Decisions
**D1 - Astro SSR/SSG over SPA:** Improve crawlability and reduce client payload while preserving the exact UI.
**D2 - React islands for interactivity:** Keep pages static by default and hydrate only interactive shells.
**D3 - Resend over Gmail OAuth2 SMTP:** Use a serverless submission route with secrets kept server-side.
**D4 - No custom database at launch:** Enquiry payload exists only as a validated request body.
**D5 - Source-of-truth stays in client/:** The Astro app is a migration target until user acceptance.

---

## Data Models
No custom persistent application models at launch. Enquiry payload exists only as a validated request body sent to the serverless submission handler and forwarded to the email provider.

---

## Core Service Logic
**Enquiry flow:**
1. User fills enquiry form (from floating button or chatbot flow)
2. Frontend validates with Zod (firstName + lastName required, phone required + Indian format, email optional + format check)
3. POST to /api/enquiry with form data
4. Serverless handler validates + sanitizes input
5. Serverless handler sends email to owner through Resend API
6. Return success/failure response to frontend
7. Frontend shows success toast or error message

**Chatbot flow (frontend only):**
1. User clicks "Help me choose" in navbar
2. Decision tree: application type, load capacity, lift height, usage frequency
3. Recommends product category based on answers
4. Opens enquiry modal with productOfInterest pre-selected
5. User can modify any field before submitting

---

## Frontend Pages
| Page | Route | Auth | Guard behaviour |
|------|-------|------|-----------------|
| Home | `/` | public | - |
| Products | `/products` | public | - |
| Product Category | `/products/[categorySlug]` | public | - |
| About Us | `/about` | public | - |
| Contact | `/contact` | public | - |
| Privacy Policy | `/privacy-policy` | public | - |
| 404 | `404` | public | Astro 404 route |

---

## API Reference

### Public (no auth)
| Method | Path | Purpose |
|--------|------|---------|
| POST | /api/enquiry | Validate + sanitize + send enquiry email via Resend |

### Auth Routes
None - no authentication in this project.

### Protected Routes
None - no protected resources.

---

## File Structure
```
bsi-astro/
├── CODEX.md
├── codex/
├── public/            # copied from client/public
├── src/
│   ├── assets/        # copied from client/src/assets
│   ├── components/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   └── styles/
├── astro.config.*
├── package.json
└── .env.example
```

---

## Environment Variables
| Key | Description | Required |
|-----|------------|----------|
| RESEND_API_KEY | Resend API key used by the serverless handler | yes |
| ENQUIRY_FROM_EMAIL | Verified sender address/domain used for enquiry emails | yes |
| RECEIVER_EMAIL | Owner's email address that receives enquiry notifications | yes |
