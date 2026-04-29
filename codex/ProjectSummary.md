# BSI Solutionz — Project Summary (Web)

> Authorized Bajaj Indef dealer website — Astro marketing site with React islands for enquiry capture and guided product selection.

**Problem:** Industrial buyers need a clear way to discover BSI Solutionz's crane, hoist, and generator offerings, get guided toward the right category, and submit an enquiry that reaches the owner reliably.

---

## System Overview
```text
Browser (Astro pages + React islands)
  ├── / Home
  ├── /products
  ├── /products/[categorySlug]
  ├── /about
  ├── /contact
  ├── /privacy-policy
  ├── /404
  ├── Enquiry Modal (floating button + CTA triggers)
  └── Chatbot Overlay (hardcoded decision tree)
        │
        ▼
  POST /api/enquiry ──► Astro API route
                            │
                            ▼
                         Resend API
                            │
                            ▼
                      Owner inbox
```

**Core Constraint:** The money path is enquiry delivery. Any future provider or architecture change must preserve reliable delivery while keeping secrets out of the browser.

**Current Architecture Note:** The promoted Astro app still uses the same-origin `/api/enquiry` route under `client/src/pages/api/`. A future “frontend-only + SendGrid” change is not implemented and must not expose provider secrets client-side.

---

## Features
- Static Astro page routes for home, products, category detail, about, contact, privacy, and 404
- React islands for navbar/mobile nav, smooth scrolling, enquiry modal, chatbot modal, and floating enquiry trigger
- Product catalog for Bajaj Indef lifting equipment and Jakson diesel generator ranges
- Hardcoded recommendation chatbot that hands off into the enquiry modal
- Shared enquiry flow from floating button, chatbot, product cards, category cards, AMC CTA, and About CTA
- SEO metadata, sitemap, robots, and LocalBusiness JSON-LD
- Responsive industrial-style UI with hero parallax, logo marquee, and hover motion

---

## Tech Stack
| Layer | Technology | Host |
|-------|-----------|------|
| Frontend | Astro 6, React 19 islands, Tailwind CSS 4, Lenis, Sonner, React Hook Form + Zod | Vercel |
| Submission Layer | Astro API route + Resend Email API | Vercel + Resend |
| CI/CD | GitHub Actions | GitHub |

---

## Architecture Decisions
**D1 — Astro over SPA:** The site now uses Astro file routes and server-rendered HTML for public pages. This keeps the marketing site crawlable while limiting hydration to the surfaces that actually need client-side state.

**D2 — React islands for interactivity:** Navbar state, modal orchestration, chatbot logic, and the enquiry form remain in React instead of being rewritten into imperative DOM code.

**D3 — Same-origin submission path over browser-exposed secrets:** The current enquiry path stays behind `/api/enquiry`. If the provider changes later, the secret boundary must remain server-side or move to a browser-safe external workflow.

**D4 — Hardcoded chatbot over AI:** Product selection is finite and deterministic. A decision tree is cheaper, safer, and easier to maintain than an LLM integration.

**D5 — No custom database at launch:** Enquiries are validated, forwarded, and delivered. Owned persistence can be added later only if business reporting or recovery needs justify it.

---

## Data Models
No custom persistent application model at launch. The enquiry payload exists only as validated request data sent through the submission path.

---

## Core Service Logic
**Enquiry flow**
1. User opens the enquiry modal from any CTA.
2. React Hook Form + Zod validate the payload client-side.
3. The modal POSTs JSON to `/api/enquiry`.
4. The Astro API route parses, validates, and sanitizes the payload again.
5. The shared handler sends the enquiry through Resend.
6. The UI shows success or error feedback through Sonner toasts.

**Chatbot flow**
1. User opens “Help me choose”.
2. The hardcoded question tree asks about solution track and use case details.
3. The chatbot recommends a category/product.
4. The recommendation hands off into the same enquiry modal with product context prefilled.

---

## Public Routes
| Method | Path | Purpose |
|--------|------|---------|
| GET | / | Home page |
| GET | /products | Product landing page |
| GET | /products/[categorySlug] | Static category detail page |
| GET | /about | About page |
| GET | /contact | Contact page |
| GET | /privacy-policy | Privacy policy page |
| POST | /api/enquiry | Validate, sanitize, and send enquiry email |

---

## File Structure
```text
root/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   ├── home/
│   │   │   ├── layout/
│   │   │   ├── products/
│   │   │   ├── react/
│   │   │   └── ui/
│   │   ├── layouts/
│   │   ├── lib/
│   │   ├── pages/
│   │   │   ├── api/
│   │   │   └── products/
│   │   └── styles/
│   ├── astro.config.mjs
│   └── package.json
└── codex/
```

---

## Environment Variables
| Key | Description | Required |
|-----|------------|---------|
| RESEND_API_KEY | Resend API key used by the current enquiry handler | yes |
| ENQUIRY_FROM_EMAIL | Verified sender address/domain | yes |
| RECEIVER_EMAIL | Inbox that receives enquiry notifications | yes |
