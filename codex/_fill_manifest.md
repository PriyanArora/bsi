# Fill Manifest
# Generated during G0.6. This is the single source of truth for all file generation.
# Codex writes this FIRST, user reviews and corrects HERE, then Codex fills all templates from this.
# Do not touch any template file until this manifest is confirmed by the user.

---

## IDENTITY
name: BSI Solutionz
tagline: Authorized Bajaj Indef dealer website — product showcase, guided chatbot, and enquiry system for industrial crane and hoist buyers in India.
problem: Industrial buyers looking for cranes and hoists have no easy way to discover BSI Solutionz's product range, get guided to the right product for their needs, or submit enquiries online. The owner needs a professional web presence for marketing and lead generation.
type: production
category: web
core_constraint: Enquiry submission must reliably reach the owner's Gmail inbox and be saved to MongoDB as backup. This is the money path — if it breaks, the site has no business value.

---

## DEVELOPER
dev_name: Priyan
dev_level: intermediate
dev_knows: JavaScript, MongoDB, Node.js, Express, HTML, CSS
dev_gaps: React (first time using it)
dev_goal: Able to host end-to-end full-stack websites independently

---

## TECH STACK
| Layer | Technology | Host |
|-------|-----------|------|
| Frontend | React + Vite, React Router v7, Tailwind CSS, Shadcn/ui, Aceternity UI, Framer Motion, React Hook Form + Zod | Vercel |
| Backend | Node.js + Express, Nodemailer (Gmail OAuth2), express-rate-limit, dotenv | Render or Railway |
| Database | MongoDB Atlas + Mongoose | MongoDB Atlas (free tier) |
| CI/CD | GitHub Actions | GitHub |

---

## COMMIT CONFIG
scopes: api, ui, db, email, chatbot, seo, config, ci
tdd_targets: validateEnquiry, sanitizeInput, chatbotDecisionTree
docker_phase: none
ci_phase: P17

---

## ARCHITECTURE DECISIONS
D1_title: SPA over SSR
D1_decision: React + Vite (client-side SPA), not Next.js/Remix
D1_why: Static meta tags + sitemap sufficient for SEO. SPA is simpler, minimal maintenance, no server-side rendering overhead. Deploys to Vercel CDN for fast loads.

D2_title: Gmail OAuth2 over app passwords
D2_decision: Nodemailer with Gmail OAuth2 (client ID, client secret, refresh token)
D2_why: More secure, no credential rotation needed, no "less secure apps" setting. Industry standard for programmatic Gmail access.

D3_title: Hardcoded chatbot over AI
D3_decision: Decision-tree wizard built entirely in React (frontend only)
D3_why: Zero maintenance, zero cost, no AI API dependency. Product categories are finite and well-defined. Chatbot recommends a product, then opens the enquiry modal with product pre-selected.

D4_title: MongoDB for enquiry backup
D4_decision: Store all enquiries in MongoDB Atlas alongside emailing them
D4_why: Email can fail silently or get lost. MongoDB backup ensures no enquiry is ever lost. Free tier is sufficient for expected volume.

D5_title: Separate frontend/backend hosting
D5_decision: Frontend on Vercel, backend on Render or Railway
D5_why: Both offer free tiers. Vercel optimized for static/SPA delivery with CDN. Render/Railway for Node.js backend with environment variable management.

---

## DATA / STRUCTURE

### web: Models
model_1: Enquiry | fullName: String required | phone: String required | email: String optional | companyName: String optional | productOfInterest: String optional | message: String optional | source: String enum[direct,chatbot] default:direct | createdAt: Date default:now

---

## SEED / FIXTURES / TEST DATA
strategy: Create a seed script that inserts 3-5 sample enquiries with realistic Indian names, phone numbers (10-digit, starts with 6-9), and varied product interests. Idempotent — clears existing seed data before inserting. Used for development/testing only, never in production.

---

## CORE LOGIC
logic:
  1. User fills enquiry form (from floating button or chatbot flow)
  2. Frontend validates with Zod (fullName required, phone required + Indian format 10 digits starting 6-9, email optional + format check, other fields optional)
  3. POST to /api/enquiry with form data
  4. Backend validates + sanitizes input (express-validator or Zod)
  5. Save enquiry document to MongoDB via Mongoose
  6. Send email to owner via Nodemailer (Gmail OAuth2) with enquiry details formatted as HTML email
  7. Return success/failure response to frontend
  8. Frontend shows success toast or error message

Chatbot logic (frontend only):
  1. User clicks "Help me choose" in navbar
  2. Decision tree presents questions: application type (indoor/outdoor), load capacity range, lift height, usage frequency
  3. Based on answers, recommends a product category
  4. Opens enquiry modal with productOfInterest pre-selected and source set to "chatbot"
  5. User can modify any field before submitting

---

## FEATURES
feature_1: Product showcase — display Bajaj Indef cranes/hoists with images, specs, and enquiry buttons
feature_2: Enquiry form — modal with validated fields, submits to API, emails owner, saves to MongoDB
feature_3: Hardcoded chatbot — decision-tree wizard guiding users to the right product, pre-fills enquiry form
feature_4: SEO — static meta tags per page, sitemap.xml, robots.txt, Google Search Console ready
feature_5: Floating "Enquire Now" button — persistent on every page, opens enquiry modal
feature_6: Contact page — company contact info, location, office hours (no duplicate form)
feature_7: About page — company mission, experience, industries served
feature_8: 404 page — friendly error page for invalid routes

---

## ROUTES / ENTRY POINTS / SCREENS

### web: Routes

frontend_pages:
  - GET / | public | Home — hero, product highlights, testimonials, trust badges
  - GET /products | public | Products — full product catalog with enquiry buttons
  - GET /about | public | About Us — mission, experience, industries served
  - GET /contact | public | Contact — contact info, location, office hours
  - GET /* | public | 404 — catch-all error page

public_routes:
  - POST /api/enquiry | public | Validate + sanitize + save enquiry to MongoDB + send email via Nodemailer
  - GET /api/health | public | Health check for uptime monitoring

auth_routes: none

protected_routes: none

---

## RED LINES
redline_1: No Gmail OAuth2 credentials or any secrets in the repo — ever. .env only, .gitignore enforced.
redline_2: No public GET endpoint for enquiry data — enquiries are write-only from the public internet.
redline_3: No AI/LLM dependency — chatbot must be a hardcoded decision tree with zero external API calls.
redline_4: Phone number must be validated as Indian format (10 digits, starts with 6-9) on both frontend and backend.
redline_5: No unauthenticated access to stored enquiry data. Owner reads from Gmail inbox or MongoDB Atlas dashboard directly.

---

## ENV VARS
env_1: PORT | Express server port | yes
env_2: MONGODB_URI | MongoDB Atlas connection string | yes
env_3: GMAIL_CLIENT_ID | Google OAuth2 client ID for Nodemailer | yes
env_4: GMAIL_CLIENT_SECRET | Google OAuth2 client secret for Nodemailer | yes
env_5: GMAIL_REFRESH_TOKEN | Google OAuth2 refresh token for Nodemailer | yes
env_6: SENDER_EMAIL | Gmail address used to send enquiry emails | yes
env_7: RECEIVER_EMAIL | Owner's email address that receives enquiry notifications | yes
env_8: FRONTEND_URL | Frontend origin URL for CORS whitelist | yes
env_9: NODE_ENV | Environment flag (development/production) | yes

---

## PHASES

phase_1_name: Repo Setup
phase_1_goal: Clean repo with monorepo structure (client/ + server/), .gitignore, dependencies installed, env example files
phase_1_checkboxes:
  - Conventional initial commit
  - .gitignore covers secrets, deps, build artifacts (node_modules, .env, dist)
  - Folder structure: client/ (React+Vite) and server/ (Express)
  - .env.example in server/ with all keys listed (no values)
  - Dependencies install cleanly in both client/ and server/
phase_1_proof: Show `git log --oneline -1`. Show `ls client/ server/`. Show .gitignore contents. Run `npm install` in both dirs.
phase_1_commit: chore(init): initialise monorepo with client and server structure

phase_2_name: MongoDB Connection
phase_2_goal: Mongoose connects to MongoDB Atlas from server/, config from .env, connection verified
phase_2_checkboxes:
  - Mongoose connection module reads MONGODB_URI from .env
  - Connection success/failure logged with structured logging
  - Config from env, not hardcoded
  - Connection test passes (server starts and connects)
phase_2_proof: Start server, show console log confirming MongoDB connected. Show no hardcoded URI in code.
phase_2_commit: feat(db): add MongoDB Atlas connection with Mongoose

phase_3_name: Enquiry Model + Seed
phase_3_goal: Enquiry Mongoose schema defined, seed script inserts test data, data verifiable in Atlas
phase_3_checkboxes:
  - Enquiry schema matches manifest (fullName, phone, email, companyName, productOfInterest, message, source, createdAt)
  - Field validations on schema (required fields, enum for source)
  - Seed script inserts 3-5 realistic sample enquiries
  - Seed is idempotent (safe to run multiple times)
  - Data visible in MongoDB Atlas dashboard
phase_3_proof: Run seed script. Show MongoDB Atlas screenshot or `mongosh` query showing inserted documents.
phase_3_commit: feat(db): add Enquiry model and seed script

phase_4_name: Express Server + Enquiry Endpoint
phase_4_goal: Express server with POST /api/enquiry that validates input and saves to MongoDB. GET /api/health returns status.
phase_4_checkboxes:
  - Express server starts on PORT from .env
  - POST /api/enquiry validates and saves enquiry to MongoDB
  - GET /api/health returns JSON status
  - Input sanitized (no raw user input stored)
  - CORS configured to allow FRONTEND_URL only
  - Error path returns meaningful JSON error (not stack trace)
phase_4_proof: Use curl or Postman: POST valid enquiry → 201 + saved to DB. POST invalid enquiry → 400 + error message. GET /api/health → 200.
phase_4_commit: feat(api): add enquiry endpoint with validation and health check

phase_5_name: Enquiry Validation + Rate Limiting + Tests
phase_5_goal: Zod validation on backend, rate limiting on enquiry endpoint, integration tests passing
phase_5_checkboxes:
  - Zod schema validates: fullName required, phone required (Indian 10-digit), email optional (valid format), other fields optional
  - express-rate-limit applied to POST /api/enquiry
  - Integration tests: valid submission → 201, missing fullName → 400, invalid phone → 400, rate limit exceeded → 429
  - All tests pass
phase_5_proof: Run test suite, show all passing. Show rate limiter config.
phase_5_commit: feat(api): add Zod validation, rate limiting, and integration tests

phase_6_name: Nodemailer Service
phase_6_goal: Email service module using Gmail OAuth2. Enquiry endpoint sends email on successful save.
phase_6_checkboxes:
  - Nodemailer transporter configured with Gmail OAuth2 (clientId, clientSecret, refreshToken)
  - Email service is a separate module (not inline in route handler)
  - Enquiry endpoint: save to DB first, then send email. DB save failure → 500. Email failure → log error but still return success (enquiry is saved).
  - Email contains formatted enquiry details (name, phone, product, message, source)
  - No hardcoded credentials — all from .env
  - Unit tests for email service (mock transporter)
phase_6_proof: Submit enquiry via curl → email arrives in owner's Gmail. Show no hardcoded credentials. Run tests.
phase_6_commit: feat(email): add Nodemailer service with Gmail OAuth2

phase_7_name: React Skeleton + Routing
phase_7_goal: React app with React Router v7, layout (navbar + footer), all pages render, Tailwind configured
phase_7_checkboxes:
  - React + Vite app in client/ with Tailwind CSS configured
  - Shadcn/ui initialised
  - React Router v7 with routes: /, /products, /about, /contact, /* (404)
  - Shared layout: navbar + footer (from HTML prototype structure)
  - All pages render with placeholder content
  - Navigation between pages works
phase_7_proof: Run `npm run dev` in client/. Click through all nav links. Show 404 page for invalid route.
phase_7_commit: feat(ui): add React skeleton with routing and layout

phase_8_name: Enquiry Form
phase_8_goal: Enquiry modal with Shadcn form components, React Hook Form + Zod validation, connected to backend API
phase_8_checkboxes:
  - Enquiry modal opens from floating button and navbar
  - Form uses Shadcn/ui components + React Hook Form + Zod
  - Client-side validation matches backend (fullName required, phone Indian format, email optional format)
  - Successful submission calls POST /api/enquiry and shows success toast
  - Error state shows user-friendly message
  - Form resets after successful submission
phase_8_proof: Open modal, submit valid enquiry → toast + email received + saved in DB. Submit invalid phone → client-side error shown. Show network tab confirming API call.
phase_8_commit: feat(ui): add enquiry form modal with validation and API integration

phase_9_name: Chatbot + Product Pages
phase_9_goal: Decision-tree chatbot component, product pages with real content structure, chatbot pre-fills enquiry form
phase_9_checkboxes:
  - Chatbot opens from "Help me choose" button in navbar
  - Decision tree asks: application type, load capacity, lift height, usage frequency
  - Recommends product category based on answers
  - Opens enquiry modal with productOfInterest pre-selected and source=chatbot
  - Products page displays all product categories with specs and enquiry buttons
  - Product enquiry buttons open modal with product pre-selected
  - No regressions on existing enquiry flow
phase_9_proof: Walk through chatbot flow → shows recommendation → opens enquiry form with product pre-selected. Submit → email shows source=chatbot. Products page buttons work.
phase_9_commit: feat(ui): add chatbot decision tree and product pages

phase_10_name: Contact + About Pages
phase_10_goal: Contact page with company info (no duplicate form), About page with company content. Both styled from prototype.
phase_10_checkboxes:
  - Contact page shows: phone, email, address, office hours, map/location placeholder
  - Contact page uses floating enquiry button (no separate form)
  - About page shows: mission, experience, industries served, trust badges
  - Testimonial cards with placeholder content (marked for client replacement)
  - Both pages responsive
  - No regressions
phase_10_proof: Navigate to /contact and /about. Verify no duplicate form on contact. Floating button works on both pages.
phase_10_commit: feat(ui): add contact and about pages from prototype

phase_11_name: SEO
phase_11_goal: Static meta tags on all pages, sitemap.xml, robots.txt, Open Graph tags
phase_11_checkboxes:
  - Each page has unique title, description, keywords meta tags
  - Open Graph tags (og:title, og:description, og:image) on all pages
  - sitemap.xml generated with all public routes
  - robots.txt allows crawling
  - Structured data (JSON-LD) for local business
  - Google Search Console verification tag ready
phase_11_proof: View page source for each page — show unique meta tags. Access /sitemap.xml and /robots.txt. Run Lighthouse SEO audit.
phase_11_commit: feat(seo): add meta tags, sitemap, robots.txt, and structured data

phase_12_name: Polish + Animations
phase_12_goal: Aceternity UI effects, Framer Motion transitions, responsive design verified, images optimised
phase_12_checkboxes:
  - Hero section uses Aceternity UI effects (spotlight, animated cards, or similar)
  - Page transitions with Framer Motion
  - All pages responsive (mobile, tablet, desktop)
  - Images lazy loaded
  - Placeholder images marked for client replacement
  - Acceptable load time on mobile
phase_12_proof: Test on mobile viewport. Show Lighthouse performance score. Demonstrate animations.
phase_12_commit: feat(ui): add animations and responsive polish

phase_13_name: Environment Config
phase_13_goal: All environment configs documented and working for dev and production
phase_13_checkboxes:
  - .env.example updated with all current keys
  - Server starts cleanly with only .env values
  - Missing env var → server fails fast with clear error message
  - No hardcoded values in any file
  - CORS correctly restricts to FRONTEND_URL
phase_13_proof: Delete .env, start server → see clear error for each missing var. Restore .env → server starts. Test CORS from wrong origin → blocked.
phase_13_commit: chore(config): harden environment configuration and validation

phase_14_name: Performance
phase_14_goal: Lighthouse audit passing, bundle optimised, images optimised
phase_14_checkboxes:
  - Lighthouse performance score > 80
  - Bundle size analysed and any large dependencies tree-shaken
  - Images compressed and using modern formats where possible
  - Lazy loading on below-fold content
  - Graceful without optimisation layer (works if JS loads slowly)
phase_14_proof: Run Lighthouse audit, show scores. Show bundle analysis output.
phase_14_commit: perf(ui): optimise bundle size and loading performance

phase_15_name: Deploy Backend
phase_15_goal: Express API live on Render or Railway, connected to MongoDB Atlas, email sending works
phase_15_checkboxes:
  - Server deployed and reachable at public URL
  - GET /api/health returns 200
  - POST /api/enquiry works from deployed URL (saves to Atlas + sends email)
  - All env vars set in host platform (not in repo)
  - HTTPS enforced
phase_15_proof: curl deployed /api/health → 200. curl POST enquiry → 201 + email received. Show env vars in host dashboard (values redacted).
phase_15_commit: chore(deploy): deploy backend to Render/Railway

phase_16_name: Deploy Frontend
phase_16_goal: React app live on Vercel, DNS configured, connects to production backend
phase_16_checkboxes:
  - Frontend deployed to Vercel at production URL
  - DNS pointed to Vercel (domain configured)
  - Frontend connects to production backend API
  - Enquiry form works end-to-end in production
  - All pages load correctly
  - HTTPS via Vercel
phase_16_proof: Visit production URL. Submit enquiry → email received. Navigate all pages. Show HTTPS in browser.
phase_16_commit: chore(deploy): deploy frontend to Vercel with DNS

phase_17_name: CI/CD
phase_17_goal: GitHub Actions pipeline — tests on push, deploy on merge to main
phase_17_checkboxes:
  - GitHub Actions workflow: run tests on every push
  - Tests pass in CI environment
  - Merge to main triggers deployment
  - Failed tests block merge/deploy
phase_17_proof: Push a commit → show GitHub Actions running tests. Show failed test blocking deploy.
phase_17_commit: ci(pipeline): add GitHub Actions for test and deploy
