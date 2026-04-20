# VitalPath Member Portal

The member-facing web application for **VitalPath** (Culmina Health) — a longevity healthcare platform. This is the Data & Education layer: a longitudinal dashboard of labs, wearables, epigenetics, medications, and physician insights, unified in one place.

Built with Next.js 14, TypeScript, Tailwind CSS, and Recharts. Deployed to Cloudflare Pages via `@cloudflare/next-on-pages`.

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Create local secrets file
cp .dev.vars.example .dev.vars
# (leave blank for now — Phase 1 runs entirely on mock data)

# 3. Run the dev server
npm run dev
# → http://localhost:3000 (redirects to /dashboard)
```

The dashboard will render with mock data out of the box. No backend, Azure, or Terra connection is needed for Phase 1 UI iteration.

---

## Project structure

```
app/
  (member)/          # Route group for authenticated member pages
    layout.tsx       # Sidebar + topbar + bottom nav shell
    dashboard/       # Overview dashboard (real components + mock data)
    labs/            # Lab results (placeholder — Phase 2)
    wearables/       # Wearable data (placeholder — Phase 2)
    epigenetics/     # Epigenetic profile (placeholder — Phase 3)
    medications/     # Medications (placeholder — Phase 1 polish)
    messages/        # Care team messaging (placeholder — Phase 1 polish)
    education/       # Education hub + AI Q&A (placeholder — Phase 2)
    careplan/        # Care plan (placeholder — Phase 1 polish)
  api/
    health/          # Edge health-check endpoint
  layout.tsx         # Root layout (fonts, metadata)
  page.tsx           # Root redirects to /dashboard

components/
  layout/            # Sidebar, topbar, bottom nav
  dashboard/         # Stat cards, care feed, program progress
  charts/            # Recharts wrappers (biomarker chart, etc.)
  ui/                # Reusable UI primitives (ComingSoon, etc.)

lib/
  mock/              # Mock data for Phase 1 — replace with DB queries later
  nav-config.ts      # Single source of truth for nav items
  utils.ts           # cn() class merge helper

styles/
  globals.css        # Tailwind + component classes + fonts

tailwind.config.ts   # VitalPath design tokens (teal palette, typography)
wrangler.jsonc       # Cloudflare Pages + bindings config
next.config.mjs      # Next.js config (Cloudflare-compatible)
```

---

## Design system

The app uses the same design tokens as the VitalPath pitch site — imported as Tailwind theme values:

| Token         | Value         | Purpose                                   |
| ------------- | ------------- | ----------------------------------------- |
| `teal.DEFAULT`| `#1DA8A0`     | Primary brand color                       |
| `teal.light`  | `#5EC4BD`     | Hover, secondary accents                  |
| `deep.DEFAULT`| `#0D3D3D`     | Dark section backgrounds                  |
| `portal.bg`   | `#0F0F0E`     | Portal shell background (dark mode)       |
| `portal.accent`| `#C8B88A`    | Muted gold used throughout the member app |

Fonts: **Playfair Display** (display/headings) + **DM Sans** (body) — same as the pitch site.

---

## Roadmap

### Phase 1 — Foundation (current)
- [x] Next.js app scaffolded on Cloudflare Pages
- [x] Design system aligned with pitch site
- [x] Shell: sidebar, topbar, mobile bottom nav
- [x] Overview dashboard with mock data
- [ ] Medications: active list + adherence calendar
- [ ] Care Plan: goals, lab schedule, physician notes
- [ ] Messages: async threaded messaging UI
- [ ] Education Hub: MDX-based article library
- [ ] Auth (Auth.js) + Cloudflare D1 session store

### Phase 2 — Data ingestion
- [ ] Lab PDF upload → R2 → Azure Document Intelligence
- [ ] Terra API wearable OAuth + webhook handling
- [ ] Azure PostgreSQL (Canada) for time-series data
- [ ] AI Q&A (Azure OpenAI + Azure AI Search)
- [ ] iOS + Android companion apps (HealthKit / Health Connect bridge)

### Phase 3 — Intelligence & production
- [ ] AI pattern detection (cross-correlated signals)
- [ ] Physician portal for alert review
- [ ] Epigenetic age tracking
- [ ] FHIR R4 import from LifeLabs / DynaLife
- [ ] Audit logging for PIPEDA / PHIPA compliance
- [ ] Push notifications
- [ ] Full native mobile app (React Native + Expo)

---

## Deployment

### One-time setup
```bash
# Authenticate with Cloudflare
npx wrangler login

# Create the Pages project (one-time)
npx wrangler pages project create vitalpath-portal
```

### Local preview of the Cloudflare build
```bash
npm run preview
```

### Deploy to Cloudflare Pages
```bash
npm run pages:deploy
```

Or push to your `main` branch and let the GitHub → Cloudflare Pages integration auto-deploy.

---

## Compliance notes

- All patient data stays in **Canadian data centers** (Cloudflare + Azure Canada regions only)
- **Azure OpenAI accessed under BAA** with no-training data agreement
- AI outputs **always labeled** and never presented as medical advice
- **Zero patient PHI** sent to the LLM — education Q&A is grounded in a curated knowledge repo via Azure AI Search

---

© 2026 VitalPath Health · Culmina Health Inc.
