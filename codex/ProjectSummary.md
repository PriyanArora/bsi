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
  POST /api/enquiry ──► Express API (Render/Railway)
                            │
                    ┌───────┴───────┐
                    ▼               ▼
              MongoDB Atlas    Nodemailer
              (enquiry backup)  (Gmail OAuth2 → owner inbox)
```
**Core Constraint:** Enquiry submission must reliably reach the owner's Gmail inbox and be saved to MongoDB as backup. This is the money path — if it breaks, the site has no business value.

---

## Features
- Product showcase — display Bajaj Indef cranes/hoists with images, specs, and enquiry buttons
- Enquiry form — modal with validated fields, submits to API, emails owner, saves to MongoDB
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
| Backend | Node.js + Express, Nodemailer (Gmail OAuth2), express-rate-limit, dotenv | Render or Railway |
| Database | MongoDB Atlas + Mongoose | MongoDB Atlas (free tier) |
| CI/CD | GitHub Actions | GitHub |

---

## Architecture Decisions
**D1 — SPA over SSR:** React + Vite (client-side SPA), not Next.js/Remix. Static meta tags + sitemap sufficient for SEO. SPA is simpler, minimal maintenance, no server-side rendering overhead. Deploys to Vercel CDN for fast loads.

**D2 — Gmail OAuth2 over app passwords:** Nodemailer with Gmail OAuth2. More secure, no credential rotation needed, no "less secure apps" setting. Industry standard for programmatic Gmail access.

**D3 — Hardcoded chatbot over AI:** Decision-tree wizard built entirely in React (frontend only). Zero maintenance, zero cost, no AI API dependency. Product categories are finite and well-defined.

**D4 — MongoDB for enquiry backup:** Store all enquiries in MongoDB Atlas alongside emailing them. Email can fail silently or get lost. MongoDB backup ensures no enquiry is ever lost. Free tier sufficient.

**D5 — Separate frontend/backend hosting:** Frontend on Vercel, backend on Render or Railway. Both offer free tiers. Vercel optimized for SPA delivery with CDN. Render/Railway for Node.js backend.

---

## Data Models
```
Enquiry
  fullName:          String    required
  phone:             String    required
  email:             String    optional
  companyName:        String    optional
  productOfInterest: String    optional
  message:           String    optional
  createdAt:         Date      default: now
```

---

## Seed Data
3-5 sample enquiries with realistic Indian names, phone numbers (10-digit, starts with 6-9), and varied product interests. Idempotent — clears existing seed data before inserting. Development/testing only.

---

## Core Service Logic
**Enquiry flow:**
1. User fills enquiry form (from floating button or chatbot flow)
2. Frontend validates with Zod (fullName required, phone required + Indian format, email optional + format check)
3. POST to /api/enquiry with form data
4. Backend validates + sanitizes input
5. Save enquiry document to MongoDB via Mongoose
6. Send email to owner via Nodemailer (Gmail OAuth2) with formatted HTML email
7. Return success/failure response to frontend
8. Frontend shows success toast or error message

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
| POST | /api/enquiry | Validate + sanitize + save to MongoDB + send email |
| GET | /api/health | Health check for uptime monitoring |

### Auth Routes
None — no authentication in this project.

### Protected Routes
None — no protected resources.

---

## File Structure
```
root/
├── client/
│   └── src/
│       ├── components/    # Shared UI (Navbar, Footer, EnquiryModal, Chatbot)
│       ├── pages/         # Home, Products, About, Contact, NotFound
│       ├── hooks/         # Custom hooks
│       ├── services/      # API calls (enquiry submission)
│       ├── lib/           # Shadcn/ui utilities
│       └── utils/         # Validation schemas, helpers
├── server/
│   └── src/
│       ├── config/        # DB connection, env validation
│       ├── middleware/     # Rate limiter, error handler, CORS
│       ├── models/        # Enquiry Mongoose model
│       ├── routes/        # Enquiry route, health route
│       ├── services/      # Email service (Nodemailer)
│       └── utils/         # Validation schemas, sanitisation
├── codex/
├── html/                  # Google Stitch prototype (reference only)
└── .github/workflows/     # CI/CD
```

---

## Environment Variables
| Key | Description | Required |
|-----|------------|---------|
| PORT | Express server port | yes |
| NODE_ENV | Environment (development/production) | yes |
| MONGODB_URI | MongoDB Atlas connection string | yes |
| GMAIL_CLIENT_ID | Google OAuth2 client ID | yes |
| GMAIL_CLIENT_SECRET | Google OAuth2 client secret | yes |
| GMAIL_REFRESH_TOKEN | Google OAuth2 refresh token | yes |
| SENDER_EMAIL | Gmail address for sending | yes |
| RECEIVER_EMAIL | Owner's email for receiving enquiries | yes |
| FRONTEND_URL | Frontend origin for CORS | yes |
