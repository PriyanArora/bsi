# BSI Solutionz — Project Summary (Web)

> Authorized Bajaj Indef dealer website — product showcase, guided chatbot, and enquiry system for industrial crane and hoist buyers in India.

**Problem:** Industrial buyers looking for cranes and hoists have no easy way to discover BSI Solutionz's product range, get guided to the right product for their needs, or submit enquiries online. The owner needs a professional web presence for marketing and lead generation.

---

## System Overview
```
Browser (React SPA)
  ├── / Home
  ├── /products
  ├── /about
  ├── /contact
  ├── /* 404
  ├── Enquiry Modal (floating button + chatbot flow)
  └── Chatbot Overlay (decision tree, frontend only)
        │
        ▼
  POST /api/enquiry ──► Vercel Function
                            │
                            ▼
                         Resend API
                            │
                            ▼
                      Owner inbox
```
**Core Constraint:** Enquiry submission must reliably reach the owner's inbox without relying on a cold custom backend. This is the money path — if it breaks, the site has no business value.

---

## Features
- Product showcase — display Bajaj Indef cranes/hoists with images, specs, and enquiry buttons
- Enquiry form — modal with validated fields, submits to a serverless endpoint, emails owner
- Hardcoded chatbot — decision-tree wizard guiding users to the right product, pre-fills enquiry form
- SEO — static meta tags per page, sitemap.xml, robots.txt, Google Search Console ready
- Floating "Enquire Now" button — persistent on every page, opens enquiry modal
- Contact page — company contact info, location, office hours (no duplicate form)
- About page — company mission, experience, industries served
- 404 page — friendly error page for invalid routes

---

## Tech Stack
| Layer | Technology | Host |
|-------|-----------|------|
| Frontend | React + Vite, React Router v7, Tailwind CSS, Shadcn/ui, Aceternity UI, Framer Motion, React Hook Form + Zod | Vercel |
| Submission Layer | Vercel Functions + Resend Email API | Vercel + Resend |
| CI/CD | GitHub Actions | GitHub |

---

## Architecture Decisions
**D1 — SPA over SSR:** React + Vite (client-side SPA), not Next.js/Remix. Static meta tags + sitemap sufficient for SEO. SPA is simpler, minimal maintenance, no server-side rendering overhead. Deploys to Vercel CDN for fast loads.

**D2 — Resend over Gmail OAuth2 SMTP:** Use an HTTPS email provider from a serverless function instead of Gmail SMTP. This removes SMTP port restrictions, avoids custom always-on backend hosting, and keeps provider secrets out of the browser.

**D3 — Hardcoded chatbot over AI:** Decision-tree wizard built entirely in React (frontend only). Zero maintenance, zero cost, no AI API dependency. Product categories are finite and well-defined.

**D4 — No custom database at launch:** Do not maintain a custom enquiry database in the initial production architecture. The first production goal is reliable delivery with simpler operations; owned persistence can be added later only if business reporting or backup requirements justify it.

**D5 — Single hosting surface:** Deploy the site and its submission endpoint on Vercel. This avoids cold-start concerns from a separately hosted Express service and reduces operational overhead.

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
| Home | `/` | public | — |
| Products | `/products` | public | — |
| About Us | `/about` | public | — |
| Contact | `/contact` | public | — |
| 404 | `/*` | public | Catch-all for invalid routes |

---

## API Reference

### Public (no auth)
| Method | Path | Purpose |
|--------|------|---------|
| POST | /api/enquiry | Validate + sanitize + send enquiry email via Resend |

### Auth Routes
None — no authentication in this project.

### Protected Routes
None — no protected resources.

---

## File Structure
```
root/
├── client/
│   ├── api/               # Co-located Vercel serverless submission handler
│   └── src/
│       ├── assets/        # Product, logo, and brand imagery
│       ├── components/    # Shared UI (Navbar, Footer, EnquiryModal, Chatbot)
│       ├── lib/           # Validation, catalogs, and helpers
│       └── pages/         # Home, Products, About, Contact, NotFound
├── codex/
└── .codex-commands/
```

---

## Environment Variables
| Key | Description | Required |
|-----|------------|---------|
| RESEND_API_KEY | Resend API key used by the serverless handler | yes |
| ENQUIRY_FROM_EMAIL | Verified sender address/domain used for enquiry emails | yes |
| RECEIVER_EMAIL | Owner's email address that receives enquiry notifications | yes |
