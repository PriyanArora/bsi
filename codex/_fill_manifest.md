# Fill Manifest
# Updated after the Astro promotion. This is the current source of truth for root codex files.

---

## IDENTITY
name: BSI Solutionz
tagline: Authorized Bajaj Indef dealer website — Astro marketing site with guided product selection and enquiry capture.
problem: Industrial buyers need to discover the product range, get guided toward the right category, and submit an enquiry that reaches the owner reliably.
type: production
category: web
core_constraint: Enquiry delivery is the money path. Provider or architecture changes must not expose secrets in the browser or break delivery reliability.

---

## DEVELOPER
dev_name: Priyan
dev_level: intermediate
dev_knows: JavaScript, MongoDB, Node.js, Express, HTML, CSS, React basics
dev_gaps: Astro, deployment, provider-backed enquiry delivery
dev_goal: Able to ship and maintain production marketing sites and enquiry flows independently

---

## TECH STACK
| Layer | Technology | Host |
|-------|-----------|------|
| Frontend | Astro 6, React 19 islands, Tailwind CSS 4, Lenis, Sonner, React Hook Form + Zod | Vercel |
| Submission Layer | Astro API route + Resend Email API | Vercel + Resend |
| CI/CD | GitHub Actions | GitHub |

---

## COMMIT CONFIG
scopes: ui, api, email, seo, config, deploy, perf, ci
tdd_targets: normalizeEnquiryPayload, sendEnquiryEmail, chatbotDecisionTree
docker_phase: none
ci_phase: P17

---

## ARCHITECTURE DECISIONS
D1_title: Astro over SPA
D1_decision: Public site routes are Astro file routes, not a client-routed SPA
D1_why: Server-rendered HTML fits a marketing site better and limits hydration to interactive surfaces.

D2_title: React islands for interactive surfaces
D2_decision: Keep modals, navbar state, chatbot, and smooth scrolling in React islands
D2_why: These areas need client-side state; the rest of the site does not.

D3_title: Same-origin submission route over browser-exposed secrets
D3_decision: Current enquiries POST to `/api/enquiry` under `client/src/pages/api/`
D3_why: Provider secrets stay server-side. Any future provider change must preserve that boundary or move to a browser-safe workflow.

D4_title: Hardcoded chatbot over AI
D4_decision: Product guidance remains a deterministic decision tree
D4_why: Product selection is finite, explainable, and does not justify an AI dependency.

D5_title: No custom database at launch
D5_decision: Enquiries are validated and forwarded; no owned persistence yet
D5_why: Simpler operations, less maintenance, faster path to reliable delivery.

---

## DATA / STRUCTURE
model_1: none | no custom persistent application model at launch | enquiry payload exists only as validated request data

---

## CORE LOGIC
logic:
  1. User opens enquiry modal from any approved CTA
  2. Client validates via React Hook Form + Zod
  3. Modal POSTs JSON to /api/enquiry
  4. Astro API route parses, validates, and sanitizes the payload
  5. Shared handler sends the enquiry through Resend
  6. UI shows toast feedback

chatbot_logic:
  1. User opens "Help me choose"
  2. Decision tree asks about track and use case details
  3. Recommends a category/product
  4. Opens the same enquiry modal with context prefilled

---

## FEATURES
feature_1: Static Astro pages for public marketing routes
feature_2: React-island enquiry modal with validated submission flow
feature_3: Hardcoded recommendation chatbot
feature_4: Product catalog pages and static category generation
feature_5: SEO metadata, sitemap, robots, and LocalBusiness JSON-LD
feature_6: Floating enquiry button and shared CTA handoff behavior

---

## ROUTES / ENTRY POINTS / SCREENS
frontend_pages:
  - GET / | public | Home
  - GET /products | public | Product landing page
  - GET /products/[categorySlug] | public | Static category page
  - GET /about | public | About page
  - GET /contact | public | Contact page
  - GET /privacy-policy | public | Privacy page
  - GET /404 | public | Not found page

public_routes:
  - POST /api/enquiry | public | Validate, sanitize, and send enquiry email

auth_routes: none
protected_routes: none

---

## RED LINES
redline_1: No provider API keys or secrets in the repo
redline_2: No browser-side direct provider call that needs a secret API key
redline_3: No public read endpoint for enquiry data
redline_4: Chatbot remains a hardcoded decision tree
redline_5: Phone validation must remain consistent across client and submission layers

---

## ENV VARS
env_1: RESEND_API_KEY | Resend API key used by the current enquiry handler | yes
env_2: ENQUIRY_FROM_EMAIL | Verified sender address/domain | yes
env_3: RECEIVER_EMAIL | Owner inbox that receives enquiries | yes

---

## PHASES
phase_1_name: Repo Setup
phase_1_goal: Final Astro repo shape is clean and builds locally
phase_1_commit: chore(init): finalise astro app repo structure

phase_2_name: Resend Setup
phase_2_goal: Current provider is configured without browser-exposed secrets
phase_2_commit: chore(email): configure current enquiry provider

phase_3_name: Submission Endpoint
phase_3_goal: Same-origin Astro submission route works end-to-end
phase_3_commit: feat(api): add astro enquiry submission route

phase_4_name: Validation + Abuse Controls
phase_4_goal: Submission flow is validated and protected
phase_4_commit: feat(api): harden enquiry validation and abuse controls

phase_5_name: Enquiry Form Integration
phase_5_goal: Enquiry modal UX is connected cleanly to the current submission path
phase_5_commit: feat(ui): connect enquiry modal to astro submission flow

phase_6_name: Delivery Verification
phase_6_goal: Production-style delivery is verified
phase_6_commit: feat(email): verify production enquiry delivery

phase_7_name: Astro App Shell + Routing
phase_7_goal: Astro pages, shared layout, and React islands are stable
phase_7_commit: feat(ui): add astro shell and route structure

phase_8_name: Enquiry Form UX
phase_8_goal: Product selection and modal behavior are production-ready
phase_8_commit: feat(ui): finalise enquiry modal experience

phase_9_name: Chatbot + Product Pages
phase_9_goal: Recommendation flow and product pages work together cleanly
phase_9_commit: feat(ui): finalise chatbot and product route behavior

phase_10_name: Contact + About Pages
phase_10_goal: Supporting pages match the approved Astro content
phase_10_commit: feat(ui): finalise about and contact pages

phase_11_name: SEO
phase_11_goal: Astro metadata and crawl files are correct
phase_11_commit: feat(seo): finalise astro metadata and crawl files

phase_12_name: Polish + Interactivity
phase_12_goal: Motion, responsiveness, and shared interactions are correct
phase_12_commit: feat(ui): finalise astro polish and motion

phase_13_name: Environment Config
phase_13_goal: Env handling is explicit and safe
phase_13_commit: chore(config): harden astro environment configuration

phase_14_name: Performance
phase_14_goal: Performance is reviewed and acceptable
phase_14_commit: perf(ui): review astro performance and assets

phase_15_name: Deploy Astro App + Submission Endpoint
phase_15_goal: Deployed Astro app and enquiry route work in Vercel
phase_15_commit: chore(deploy): deploy astro site and enquiry route

phase_16_name: Domain + Production Verification
phase_16_goal: Custom domain and full production smoke test are complete
phase_16_commit: chore(deploy): verify production domain and delivery

phase_17_name: CI/CD
phase_17_goal: Automated verification is in place
phase_17_commit: ci(pipeline): add astro verification workflow
