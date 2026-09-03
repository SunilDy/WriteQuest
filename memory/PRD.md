# WriteQuest — PRD

## Original Problem Statement
Mobile-first high-conversion landing page & digital asset fulfillment system selling the "Writer's Quest" complete blueprint kit (beat-by-beat story development system for novelists/screenwriters). Tactile working-notebook aesthetic (parchment #F9F7F1, ink #1F2022, craft borders #E5DFD3, red pen #C83B2D, highlighter #F2E29F). Single-tier pricing, Razorpay checkout (₹599 INR), webhook-driven order records in MongoDB, email delivery skipped for now (MOCKED delivery log). User additionally required Awwwards-level craft: kinetic masked hero reveal, numbered manifesto chapters, slow editorial marquee, framer-motion scroll reveals, lenis smooth scrolling, subtle parallax/3D hero.

## Architecture
- Frontend: React 19 + TypeScript (Vite), Tailwind CSS 4, motion (framer-motion), lenis, lucide-react, base-ui shadcn components, sonner toasts.
- Backend: FastAPI (`/api` prefix), motor/MongoDB.
- Payments: Razorpay python SDK — MOCK MODE until `RAZORPAY_KEY_ID`/`RAZORPAY_KEY_SECRET` are set in `/app/backend/.env` (currently empty placeholders). PRICE_INR=599.

## User Personas
- Aspiring novelist stuck mid-manuscript needing a finishable system.
- Screenwriter/episodic writer needing 4-structure beat sheets.
- Pen-and-paper storyteller wanting printable workbook + Excel tracker.
- Hype-fatigued writer wanting a quiet, execution-focused toolkit.

## Core Requirements (static)
Hero hook "You have a story. You don't have a system.", product preview gallery with zoom modals, interactive 4-framework showcase (Three-Act, Hero's Journey, Save the Cat, Story Circle), single-tier ₹599 pricing card, sticky mobile conversion bar (48px+ targets), Razorpay checkout + lead capture, FAQ accordion, order records in MongoDB, delivery log, failed-webhook recovery logging.

## Implemented (2026-09-03 — MongoDB removed, Google Sheets order log)
- MongoDB fully removed from the backend (no motor/db usage; lib/db.py unused).
- New lib/sheets.py: service-account Google Sheets appender (google-api-python-client + google-auth). Tabs: `orders` (created/paid/failed rows: timestamp, event, order ID, payment ID, email, amount in paise), `leads`, `webhook_logs`.
- Orders held in memory for the running process (signature verification + idempotent success screen); the Google Sheet is the durable record. Sheet appends never block or break checkout (try/except + asyncio.to_thread).
- Until GOOGLE_SERVICE_ACCOUNT_JSON + GOOGLE_SHEETS_SPREADSHEET_ID are set in backend/.env, events fall back to server logs (`[sheet:tab] ...` lines) — verified working.
- `/api/` now reports `order_log: google-sheets | server-logs-only`.

## Implemented (2026-09-03 — corrected product description update)
- Page restructured to the prescribed 8-part order: Hero (story-arc SVG mark as visual anchor, no stock photography) → marquee → Who it's for (3 audiences incl. Pratilipi/Matrubharti) → Peek inside the system (6 dashboard sections in browser chrome + 4 cross-cutting tools, zoom modals) → How you'll actually use it (one story-arc diagram + one-line caption per framework) → Pricing (single ₹599 card, trust microcopy "No subscription · One-time purchase · Instant access", highlighter-fill CTA) → Format flexibility (Notion/paper/Excel blocks with explicit no-parity honesty note) → FAQ (5 prescribed questions) → Final CTA (repeat headline + CTA + microcopy).
- Copy corrections: hub-and-spoke Notion system (central Writing Dashboard, 6 linked sections, one dedicated plot database per framework, Scene Planner Kanban + Acts views, Quick Action Buttons, Chapters database, per-framework todo lists). Removed: "four modules each with its own dashboard", unified-beat-map claims, auto cross-link claims, printable/Excel parity claims, ₹2,645 value anchor, "120-page workbook", "lifetime updates", invented "7-day refund" and Field Note testimonial.
- Voice rules applied: sentence case, contractions, numerals as numerals, every CTA names action + outcome ("Get the Blueprint Kit").
- Highlighter yellow now reserved for buy actions only (hero/header/pricing/sticky/final/checkout CTAs); heading accents use hand-drawn red pen underlines.
- Refund FAQ answer is a PLACEHOLDER — real policy must be confirmed before publishing.
- Backend ASSETS copy updated to corrected product (Notion Writing Dashboard, Printable Workbooks, Excel-Sheet Version, Explainer Videos).

## Implemented (2026-09-02 — initial build)
- Kinetic hero: masked line-by-line reveal, 3D mouse-tilt notebook card, scroll parallax, washi tape, red margin annotations, credibility markers.
- Slow editorial marquee (72s) with craft quotes.
- Interactive framework showcase: 4 tabs, animated beat panels, per-framework red margin notes.
- Numbered manifesto chapters (01–05) + ink Field Note tile, hover-reveal annotations.
- Product gallery: 4 hand-built CSS mockups (Notion dashboard, PDF workbook, Excel tracker, video) with spotlight zoom modals.
- "What's Inside" inventory grid with format badges and struck-through value anchor (₹2,645 → ₹599).
- Single-tier pricing card with guarantee badges, stamp, tape detail.
- Sticky mobile conversion bar (scroll-triggered, safe-area aware).
- FAQ accordion with animated expansion.
- Checkout funnel: email capture dialog → Razorpay order creation → MOCKED payment simulation (real Razorpay Checkout.js path activates automatically when keys are set) → signature verification → success screen with 4 asset buttons (MOCKED links) + delivery log toggle.
- Backend endpoints: `/api/checkout/config`, `/api/checkout/create-order`, `/api/checkout/verify`, `/api/orders/{id}`, `/api/webhooks/razorpay` (HMAC verification + retry logging to `webhook_logs`), `/api/leads`.
- MongoDB collections: `orders`, `leads`, `webhook_logs`.
- Lenis smooth scrolling + grain overlay + full data-testid coverage.

## Backlog
- P0: Activate Google Sheets logging: user pastes service-account JSON + spreadsheet ID → set env vars → create sheet tabs `orders`, `leads`, `webhook_logs` → share sheet with service-account email as Editor.
- P0: Drop real Razorpay test/live keys into backend/.env + register webhook URL; attach real asset download URLs/files.
- P1: Resend email delivery (managed integration) replacing the MOCKED delivery log.
- P1: Exit-intent lead capture modal offering sample 1-page beat sheet PDF (leads endpoint already exists).
- P2: Multi-currency localization by buyer IP.
- P2: Customer portal login for re-downloading kit updates.
- P2: Core Web Vitals audit + WCAG AA validation pass.

## Next Tasks
1. Get Razorpay test keys (dashboard.razorpay.com) → set env vars → test with card 4111 1111 1111 1111.
2. Connect Resend for real delivery emails.
3. Upload final kit files and sign asset URLs.
