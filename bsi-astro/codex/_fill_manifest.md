# Fill Manifest
# Generated during G0.6. This is the single source of truth for all file generation.
# Codex writes this FIRST, user reviews and corrects HERE, then Codex fills all templates from this.
# Do not touch any template file until this manifest is confirmed by the user.

---

## IDENTITY
name: BSI Solutionz
tagline: Authorized Bajaj Indef dealer website - product showcase, guided chatbot, and enquiry system for industrial crane and hoist buyers in India.
problem: Industrial buyers looking for cranes and hoists have no easy way to discover BSI Solutionz's product range, get guided to the right product for their needs, or submit enquiries online. The owner needs a professional web presence for marketing and lead generation.
type: migration
category: web
core_constraint: One-to-one parity with the existing `client/` site while keeping the enquiry flow server-side and secure.

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
| Frontend | Astro + React (islands), Tailwind CSS, Shadcn/ui, Framer Motion (parity), React Hook Form + Zod | Vercel |
| Submission Layer | Astro API routes (Vercel Functions) + Resend Email API | Vercel + Resend |
| CI/CD | GitHub Actions | GitHub |

---

## COMMIT CONFIG
scopes: migration, ui, seo, assets, api, chatbot, data, config, content
tdd_targets: validateEnquiry, sanitizeInput, chatbotDecisionTree
docker_phase: none
ci_phase: P14

---

## ARCHITECTURE DECISIONS
D1_title: Astro SSR/SSG over SPA
D1_decision: Use Astro for server-rendered or pre-rendered pages with React islands for interactivity
D1_why: Better crawlability and smaller client payload without changing the current UI

D2_title: React islands only
D2_decision: Hydrate only interactive components (modals, nav, motion helpers)
D2_why: Keep pages static by default and preserve SSR/SSG output

D3_title: Resend over Gmail OAuth2 SMTP
D3_decision: Use Resend through a serverless submission route
D3_why: Keeps provider secrets server-side and avoids a custom always-on backend

D4_title: No custom database at launch
D4_decision: Do not maintain a custom enquiry database in the migration
D4_why: The current business path only needs reliable delivery to the owner inbox

D5_title: Source-of-truth stays in client/
D5_decision: The existing Vite app remains the source of truth until the user accepts the Astro version
D5_why: Migration must prove one-to-one parity before replacement

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
feature_1: Product showcase - display Bajaj Indef cranes/hoists with images, specs, and enquiry buttons
feature_2: Enquiry form - modal with validated fields, submits to a serverless endpoint, emails owner
feature_3: Hardcoded chatbot - decision-tree wizard guiding users to the right product, pre-fills enquiry form
feature_4: SEO - static meta tags per page, sitemap.xml, robots.txt, Google Search Console ready
feature_5: Floating "Enquire Now" button - persistent on every page, opens enquiry modal
feature_6: Contact page - company contact info, location, office hours (no duplicate form)
feature_7: About page - company mission, experience, industries served
feature_8: Privacy policy page - preserves all current sections and wording
feature_9: 404 page - friendly error page for invalid routes

---

## ROUTES / ENTRY POINTS / SCREENS

### web: Routes

frontend_pages:
  - GET / | public | Home - hero, product highlights, testimonials, trust badges
  - GET /products | public | Products - full product catalog with enquiry buttons
  - GET /products/[categorySlug] | public | Product Category - category detail and product list
  - GET /about | public | About Us - mission, experience, industries served
  - GET /contact | public | Contact - contact info, location, office hours
  - GET /privacy-policy | public | Privacy Policy - preserved copy and sections
  - GET /404 | public | 404 - error page

public_routes:
  - POST /api/enquiry | public | Validate + sanitize + send enquiry email via Resend

auth_routes: none

protected_routes: none

---

## RED LINES
redline_1: No provider API keys or secrets in the repo - ever. Env vars only, no browser exposure.
redline_2: No public GET endpoint for enquiry data - enquiries are write-only from the public internet.
redline_3: No AI/LLM dependency - chatbot must be a hardcoded decision tree with zero external API calls.
redline_4: Phone number must be validated as Indian format (10 digits, starts with 6-9) on both frontend and backend.
redline_5: No browser-side direct call to the email provider with a secret API key.
redline_6: Do not modify or delete `client/` during migration.
redline_7: Do not redesign or change copy; preserve placeholders and routes exactly.

---

## ENV VARS
env_1: RESEND_API_KEY | Resend API key used by the serverless handler | yes
env_2: ENQUIRY_FROM_EMAIL | Verified sender address or domain used for enquiry emails | yes
env_3: RECEIVER_EMAIL | Owner's email address that receives enquiry notifications | yes

---

## PHASES

phase_1_name: Create Astro Workspace And Copy Codex First
phase_1_goal: Create bsi-astro/ and copy CODEX.md and codex/ before any UI work
phase_1_checkboxes:
  - bsi-astro/ exists
  - bsi-astro/CODEX.md copied from root
  - bsi-astro/codex/ copied from root
  - bsi-astro/codex/ProjectSummary.md rewritten for migration
  - bsi-astro/codex/BuildFlow.md rewritten for migration
  - bsi-astro/codex/Progress.md rewritten for migration
  - bsi-astro/codex/RepositoryMemory.md rewritten for migration
  - bsi-astro/codex/_fill_manifest.md rewritten for migration
phase_1_proof: Show bsi-astro tree and Current Phase in bsi-astro/codex/Progress.md
phase_1_commit: chore(migration): create bsi-astro codex mirror

phase_2_name: Scaffold Astro With React Support And Vercel Suitability
phase_2_goal: Initialize Astro with React + Tailwind and ensure dev/build scripts run
phase_2_checkboxes:
  - Astro app initializes inside bsi-astro/
  - React integration installed for islands
  - Tailwind configured
  - npm run dev works
  - npm run build works
phase_2_proof: Run npm run dev and npm run build in bsi-astro/
phase_2_commit: chore(config): scaffold astro with react and tailwind

phase_3_name: Copy Every Asset And Public File One To One
phase_3_goal: Copy all assets and public files from client/ into bsi-astro/ without renaming
phase_3_checkboxes:
  - client/src/assets/** copied to bsi-astro/src/assets/**
  - client/public/** copied to bsi-astro/public/**
  - Filenames and folder names preserved (including StorageRetrival)
  - Required public files preserved (favicon.svg, icons.svg, robots.txt, sitemap.xml, og-products-placeholder.png, product-placeholder.svg, shared/brand-logo.png)
phase_3_proof: Show asset tree parity and public file list
phase_3_commit: chore(assets): copy assets and public files one-to-one

phase_4_name: Port Global Styling And Design Tokens Without Redesign
phase_4_goal: Recreate the global visual system exactly
phase_4_checkboxes:
  - Brand tokens and CSS variables copied
  - Global typography preserved (Google font + Material Symbols)
  - Background/surface system preserved
  - Utility classes and custom classes preserved
  - Responsive CSS behavior preserved
phase_4_proof: Base layout renders with correct background, fonts, and navbar spacing
phase_4_commit: feat(ui): port global styling and tokens

phase_5_name: Build Astro Layout Shell And Static Route Framework
phase_5_goal: Replace client-side routing with Astro file routes and shared layout
phase_5_checkboxes:
  - Routes created for /, /products, /products/[categorySlug], /about, /contact, /privacy-policy, 404
  - Shared layout exists
  - Footer visible on all pages
  - Page spacing accounts for fixed navbar
phase_5_proof: All routes render from Astro pages
phase_5_commit: feat(ui): add astro layout shell and routes

phase_6_name: Port SEO Head Logic From Helmet To Astro Head
phase_6_goal: Convert all page metadata to Astro head tags
phase_6_checkboxes:
  - Titles preserved
  - Descriptions preserved
  - Open Graph tags preserved
  - robots.txt and sitemap.xml remain available
phase_6_proof: View HTML source and confirm server-rendered head tags
phase_6_commit: feat(seo): port head metadata to astro

phase_7_name: Port Catalog Data And Static Category Generation
phase_7_goal: Move catalog data and generate category pages from the same source
phase_7_checkboxes:
  - productCatalog migrated intact
  - productImages migrated intact
  - Image matching still works
  - Category pages generated from catalog source
phase_7_proof: Every category slug resolves and product counts match the Vite app
phase_7_commit: feat(data): port catalog data and static paths

phase_8_name: Rebuild The Home Page Exactly
phase_8_goal: Recreate the current home page section by section with no redesign
phase_8_checkboxes:
  - Hero preserved
  - Trust strip preserved
  - Featured products preserved (including placeholders)
  - Logo marquee preserved
  - Why Choose Us preserved (including placeholder image)
  - Testimonials preserved
  - Industrial grid/check pattern preserved
phase_8_proof: Side-by-side parity check against current /
phase_8_commit: feat(ui): rebuild home page with parity

phase_9_name: Rebuild Products, Category Detail, About, Contact, Privacy, And 404
phase_9_goal: Recreate all non-home pages exactly
phase_9_checkboxes:
  - Products landing page matches
  - Category pages match
  - About page matches (including remote image usage)
  - Contact page matches (including map placeholder)
  - Privacy page matches exactly
  - 404 page matches exactly
phase_9_proof: Walk through each route and compare with current Vite version
phase_9_commit: feat(ui): rebuild remaining pages with parity

phase_10_name: Recreate Global Interactive Shell Using React Islands
phase_10_goal: Rebuild interactive shell behavior without SPA routing
phase_10_checkboxes:
  - Fixed navbar works
  - Mobile nav works
  - Floating enquiry button works
  - Global modal orchestration works
phase_10_proof: Static route HTML exists and interactive controls still function
phase_10_commit: feat(ui): reintroduce interactive shell as islands

phase_11_name: Port Enquiry Modal And Server-Side Enquiry Endpoint
phase_11_goal: Preserve enquiry experience with server-side secrets
phase_11_checkboxes:
  - Same form fields and validation behavior
  - Same consent requirement
  - Same product selection behavior
  - Same success/error toast behavior
  - Same-origin /api/enquiry endpoint in Astro
phase_11_proof: Form opens and submits successfully in the Astro app
phase_11_commit: feat(api): port enquiry modal and server endpoint

phase_12_name: Port Chatbot Island And Its Handoff Into Enquiry
phase_12_goal: Preserve guided recommendation flow exactly
phase_12_checkboxes:
  - Entry question preserved
  - Cranes/hoists branch preserved
  - Generators branch preserved
  - Recommendation confidence labels preserved
  - Shortlist behavior preserved
  - Enquire for this product opens enquiry modal with selected product
phase_12_proof: Both chatbot branches complete and hand off properly
phase_12_commit: feat(chatbot): port chatbot and enquiry handoff

phase_13_name: Reapply Smooth Scroll, Motion, And Transition Behavior Carefully
phase_13_goal: Reproduce the current experiential feel without breaking SSR
phase_13_checkboxes:
  - Smooth scroll behavior restored if appropriate
  - Page transitions restored as closely as practical
  - Hover motions preserved
  - Modal scale/orientation behavior preserved
  - Deviations documented if parity is not possible
phase_13_proof: Compare motion behavior on key interactions and record any deltas
phase_13_commit: feat(ui): restore motion and transitions with parity

phase_14_name: Full Parity Review, Codex Update, And Handover
phase_14_goal: Confirm parity and document readiness
phase_14_checkboxes:
  - Progress.md updated with real migration state
  - RepositoryMemory.md updated with actual Astro architecture
  - Parity gaps listed honestly
  - Route-by-route verification completed
  - Final decision recorded (ready or not ready)
phase_14_proof: Written parity report and route checklist
phase_14_commit: chore(migration): finalize parity review and handover
