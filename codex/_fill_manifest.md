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
core_constraint: Enquiry submission must reliably reach the owner's inbox without depending on a cold custom backend. This is the money path — if it breaks, the site has no business value.

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
| Submission Layer | Vercel Functions + Resend Email API | Vercel + Resend |
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

D2_title: Resend over Gmail OAuth2 SMTP
D2_decision: Use Resend through a serverless submission function
D2_why: Removes SMTP port restrictions, avoids a custom always-on backend, and keeps provider secrets out of the browser.

D3_title: Hardcoded chatbot over AI
D3_decision: Decision-tree wizard built entirely in React (frontend only)
D3_why: Zero maintenance, zero cost, no AI API dependency. Product categories are finite and well-defined. Chatbot recommends a product, then opens the enquiry modal with product pre-selected.

D4_title: No custom database at launch
D4_decision: Do not maintain a custom enquiry database in the initial production architecture
D4_why: The first production goal is reliable delivery with simpler operations. Owned persistence can be added later only if business reporting or backup requirements justify it.

D5_title: Single hosting surface
D5_decision: Frontend and submission endpoint on Vercel
D5_why: Avoids cold-start concerns from a separately hosted Express service and reduces operational overhead.

---

## DATA / STRUCTURE

### web: Models
model_1: none | no custom persistent application model at launch | enquiry payload exists only as validated request body

---

## SEED / FIXTURES / TEST DATA
strategy: No seed data at launch because the production architecture does not keep a custom enquiry database. Use sanitized example payloads only for manual testing and automated tests.

---

## CORE LOGIC
logic:
  1. User fills enquiry form (from floating button or chatbot flow)
  2. Frontend validates with Zod (firstName + lastName required, phone required + Indian format 10 digits starting 6-9, email optional + format check, other fields optional)
  3. POST to /api/enquiry with form data
  4. Serverless handler validates + sanitizes input
  5. Serverless handler sends email to owner through Resend API
  6. Return success/failure response to frontend
  7. Frontend shows success toast or error message

Chatbot logic (frontend only):
  1. User clicks "Help me choose" in navbar
  2. Decision tree presents questions: application type (indoor/outdoor), load capacity range, lift height, usage frequency
  3. Based on answers, recommends a product category
  4. Opens enquiry modal with productOfInterest pre-selected
  5. User can modify any field before submitting

---

## FEATURES
feature_1: Product showcase — display Bajaj Indef cranes/hoists with images, specs, and enquiry buttons
feature_2: Enquiry form — modal with validated fields, submits to a serverless endpoint, emails owner
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
  - POST /api/enquiry | public | Validate + sanitize + send enquiry email via Resend

auth_routes: none

protected_routes: none

---

## RED LINES
redline_1: No provider API keys or secrets in the repo — ever. Env vars only, no browser exposure.
redline_2: No public GET endpoint for enquiry data — enquiries are write-only from the public internet.
redline_3: No AI/LLM dependency — chatbot must be a hardcoded decision tree with zero external API calls.
redline_4: Phone number must be validated as Indian format (10 digits, starts with 6-9) on both frontend and backend.
redline_5: No browser-side direct call to the email provider with a secret API key.

---

## ENV VARS
env_1: RESEND_API_KEY | Resend API key used by the serverless handler | yes
env_2: ENQUIRY_FROM_EMAIL | Verified sender address or domain used for enquiry emails | yes
env_3: RECEIVER_EMAIL | Owner's email address that receives enquiry notifications | yes

---

## PHASES

phase_1_name: Repo Setup
phase_1_goal: Clean repo with client/ as the app root, co-located serverless submission code, .gitignore, dependencies installed, env example files
phase_1_checkboxes:
  - Conventional initial commit
  - .gitignore covers secrets, deps, build artifacts (node_modules, .env, dist)
  - Folder structure: client/ app with co-located client/api/ submission endpoint
  - .env.example in client/ with all keys listed (no values)
  - Dependencies install cleanly in client/
phase_1_proof: Show `git log --oneline -1`. Show `ls client/`. Show .gitignore contents. Run `npm install` in client/.
phase_1_commit: chore(init): initialise client app and co-located submission structure

phase_2_name: Resend Setup
phase_2_goal: Verified email delivery provider configured for this project, with no browser-exposed secrets
phase_2_checkboxes:
  - Resend account created for the project
  - Sending domain or sender address verified
  - API key created and stored only in deployment env vars
  - Gmail OAuth2 credentials and MongoDB dependency marked for removal from production plan
phase_2_proof: Show verified sender in Resend dashboard. Show env var names only, with values redacted. Show no client-side secret exposure.
phase_2_commit: chore(email): configure resend and retire gmail oauth plan

phase_3_name: Submission Endpoint
phase_3_goal: Serverless POST /api/enquiry endpoint exists on the frontend host and sends enquiries through Resend
phase_3_checkboxes:
  - POST /api/enquiry exists as a serverless handler
  - Input sanitized before provider call
  - Email payload contains enquiry details in a readable format
  - Error path returns meaningful JSON error (not stack trace)
  - No custom always-on backend required
phase_3_proof: POST valid enquiry → success JSON and email arrives. POST invalid enquiry → 400 + error message.
phase_3_commit: feat(api): add serverless enquiry submission endpoint

phase_4_name: Validation + Abuse Controls
phase_4_goal: Enquiry submission is validated and protected without a custom Express server
phase_4_checkboxes:
  - Zod schema validates: firstName required, lastName required, phone required (Indian 10-digit), email optional (valid format), other fields optional
  - Abuse control added at the submission layer (provider, middleware, or platform-friendly rate limiting)
  - Tests or reproducible proof cover valid and invalid submissions
  - All tests or manual proof pass
phase_4_proof: Submit valid enquiry → success. Submit invalid phone → 400. Demonstrate the abuse-control configuration or provider rule.
phase_4_commit: feat(api): add submission validation and abuse controls

phase_5_name: Enquiry Form Integration
phase_5_goal: Frontend enquiry form submits to the serverless endpoint and handles responses cleanly
phase_5_checkboxes:
  - Enquiry modal opens from floating button and navbar
  - Form uses Shadcn/ui components + React Hook Form + Zod
  - Client-side validation matches submission endpoint
  - Successful submission calls POST /api/enquiry and shows success toast
  - Error state shows user-friendly message
  - Form resets after successful submission
phase_5_proof: Open modal, submit valid enquiry → toast + email received. Submit invalid phone → client-side error shown. Show network tab confirming API call.
phase_5_commit: feat(ui): connect enquiry form to serverless submission flow

phase_6_name: Delivery Verification
phase_6_goal: Production-style email delivery is verified with provider logs and no Gmail SMTP dependency remains
phase_6_checkboxes:
  - Resend activity logs show successful deliveries
  - From address/domain authentication passes
  - No Google OAuth2 / Gmail SMTP dependency remains in the production path
  - No MongoDB dependency remains in the production path
  - Secrets stored only in deployment env vars
phase_6_proof: Submit enquiry → email arrives and corresponding provider log entry exists. Show no Gmail/Mongo production dependency in architecture.
phase_6_commit: feat(email): verify provider delivery and remove legacy dependencies

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
phase_8_goal: Enquiry modal with Shadcn form components, React Hook Form + Zod validation, connected to the serverless submission endpoint
phase_8_checkboxes:
  - Enquiry modal opens from floating button and navbar
  - Form uses Shadcn/ui components + React Hook Form + Zod
  - Client-side validation matches the submission handler (firstName + lastName required, phone Indian format, email optional format)
  - Successful submission calls POST /api/enquiry and shows success toast
  - Error state shows user-friendly message
  - Form resets after successful submission
phase_8_proof: Open modal, submit valid enquiry → toast + email received. Submit invalid phone → client-side error shown. Show network tab confirming API call.
phase_8_commit: feat(ui): add enquiry form modal with validation and API integration

phase_9_name: Chatbot + Product Pages
phase_9_goal: Decision-tree chatbot component, product pages with real content structure, chatbot pre-fills enquiry form
phase_9_checkboxes:
  - Chatbot opens from "Help me choose" button in navbar
  - Decision tree asks: application type, load capacity, lift height, usage frequency
  - Recommends product category based on answers
  - Opens enquiry modal with productOfInterest pre-selected
  - Products page displays all product categories with specs and enquiry buttons
  - Product enquiry buttons open modal with product pre-selected
  - No regressions on existing enquiry flow
phase_9_proof: Walk through chatbot flow → shows recommendation → opens enquiry form with product pre-selected. Submit successfully. Products page buttons work.
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
  - Submission endpoint runs cleanly with only env values
  - Missing env var → endpoint fails fast with clear error message
  - No hardcoded values in any file
  - No email provider secret exposed to the browser bundle
phase_13_proof: Remove required env var → see clear failure. Restore env vars → submission succeeds. Confirm no client-side secret exposure in built assets.
phase_13_commit: chore(config): harden serverless environment configuration

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

phase_15_name: Deploy Frontend + Submission Endpoint
phase_15_goal: React app and its serverless submission endpoint live on Vercel, with provider env vars configured
phase_15_checkboxes:
  - Frontend deployed to Vercel at production URL
  - POST /api/enquiry works in the deployed environment and sends email
  - All env vars set in Vercel (not in repo)
  - HTTPS enforced
phase_15_proof: Visit deployment, submit enquiry → email received. Show env vars in dashboard with values redacted.
phase_15_commit: chore(deploy): deploy frontend and submission endpoint to vercel

phase_16_name: Domain + Production Verification
phase_16_goal: DNS pointed to Vercel, production site verified end-to-end, no separate backend host involved
phase_16_checkboxes:
  - Frontend deployed to Vercel at production URL
  - DNS pointed to Vercel (domain configured)
  - Enquiry form works end-to-end in production
  - All pages load correctly
  - HTTPS via Vercel
phase_16_proof: Visit production URL. Submit enquiry → email received. Navigate all pages. Show HTTPS in browser.
phase_16_commit: chore(deploy): connect production domain and verify enquiry flow

phase_17_name: CI/CD
phase_17_goal: GitHub Actions pipeline — tests on push, deploy on merge to main
phase_17_checkboxes:
  - GitHub Actions workflow: run tests on every push
  - Tests pass in CI environment
  - Merge to main triggers deployment
  - Failed tests block merge/deploy
phase_17_proof: Push a commit → show GitHub Actions running tests. Show failed test blocking deploy.
phase_17_commit: ci(pipeline): add GitHub Actions for test and deploy
