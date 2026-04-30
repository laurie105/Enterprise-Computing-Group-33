# Campus Companion – Group 33

**Module:** Nature of Enterprise Computing  
**Assessment:** CA3 – AI-Assisted Application Build (Component 2)  
**Due:** 1 May 2026 at 17:00

---

## Overview

Campus Companion is a Next.js web application that gives TUD students a single place to access key campus services: timetables, events, the canteen menu, a campus location directory, lost & found, a helpdesk ticketing system, in-app reminders, and accessibility settings.

> ⚠️ **All data in this application is entirely fictional.** No real student names, numbers, emails, or personal data are used anywhere.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | CSS (custom design system, no Tailwind) |
| Icons | lucide-react |
| Database | Supabase (PostgreSQL) for student login |
| Deployment | Netlify (free tier) |
| CI/CD | Git → Netlify auto-deploy on push to `main` |

---

## Features implemented (Component 2 minimum: 4 required)

1. ✅ **Timetable** – Weekly/list view of fictional Computing General Year 1 schedule
2. ✅ **Events** – Filterable events calendar with ML-powered recommendations
3. ✅ **Campus Map / Location Directory** – Find buildings, offices, and services
4. ✅ **Canteen Menu** – Daily menu with allergen info and dietary filters
5. ✅ **Lost & Found** – Browse found items and report a new found item
6. ✅ **Helpdesk Tickets** – Raise a support ticket and view ticket status
7. ✅ **Reminders / Notifications** – In-app reminders with add/delete/complete
8. ✅ **Accessibility Settings** – Dark mode, text size, reduced motion, high contrast

---

## ML Feature (Component 4)

**Model:** Popularity-weighted category filter (classical ML-style scoring)

**How it works:**  
Each event is scored using a weighted formula:

```
score = (category_match × 0.6) + (fill_rate × 0.3) + (recency_score × 0.1)
```

- `category_match`: 1 if the event's category matches the user's saved interests, else 0
- `fill_rate`: how full the event is (attendees / capacity) — a proxy for social popularity
- `recency_score`: how soon the event is (closer = higher score)

Events are then ranked by score and the top N are shown as "Recommended for You."

**API endpoint:** `GET /api/ml?interests=Academic,Society,Career&n=3`

**Evaluation:** Qualitative inspection — recommendations correctly surface high-fill-rate events matching user interest categories. A train/test split would require real clickstream data; documented as a known limitation.

---

## How to run locally

### Prerequisites
- Node.js 18+
- npm

### Steps

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd campus-companion

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase URL and anon key

# 4. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Supabase setup

1. Create a free Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL in `data/seed.sql` in the Supabase SQL editor
3. Copy your project URL and anon key into `.env.local`

The student login stores submitted student details in the `students` table. Course options are loaded from the TU Dublin A-Z undergraduate courses page through the app's `/api/courses` route.

---

## Deployment (Component 3)

1. Push this repo to GitHub
2. Connect to [Netlify](https://netlify.com) → New site from Git
3. Build command: `npm run build`
4. Publish directory: `.next`
5. The `netlify.toml` in the root handles Next.js plugin configuration automatically
6. Add environment variables in Netlify → Site Settings → Environment Variables

---

## Environment variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key |

---

## Fictional seed data

All seed data is in `data/seed.sql`. It includes:

- `timetable` – 10 fictional class entries
- `events` – 10 fictional campus events
- `canteen_menu` – 12 fictional menu items
- `lost_found` – 8 fictional lost items
- `helpdesk_tickets` – 5 fictional support tickets
- `campus_locations` – 10 fictional campus buildings/services

---

## Accessibility (Component 5)

The app is built with WCAG 2.1 Level AA principles:

- Skip-to-content link on every page (SC 2.4.1)
- Semantic HTML: `<main>`, `<nav>`, `<section>`, `<article>`, `<header>` (SC 1.3.1)
- ARIA labels on all interactive elements
- Visible focus rings (SC 2.4.7)
- Logical tab order throughout (SC 2.4.3)
- Colour contrast ≥ 4.5:1 in default and high-contrast modes (SC 1.4.3)
- Reduce Motion setting (SC 2.3.3)
- Text resize up to 200% (SC 1.4.4)
- All form inputs have associated `<label>` elements (SC 1.3.1)
- `aria-live` regions for dynamic alerts and form feedback

---

## Project structure

```
campus-companion/
├── app/
│   ├── layout.tsx          # Root layout with sidebar & topbar
│   ├── globals.css         # Design system / CSS variables
│   ├── page.tsx            # Dashboard
│   ├── timetable/page.tsx
│   ├── events/page.tsx
│   ├── map/page.tsx
│   ├── canteen/page.tsx
│   ├── lost-found/page.tsx
│   ├── helpdesk/page.tsx
│   ├── reminders/page.tsx
│   ├── accessibility-settings/page.tsx
│   └── api/ml/route.ts     # ML recommender API endpoint
├── components/
│   ├── Sidebar.tsx
│   ├── Topbar.tsx
│   └── AccessibilityWrapper.tsx
├── lib/
│   └── supabase.ts
├── data/
│   └── seed.sql            # Fictional database seed data
├── netlify.toml
├── next.config.js
├── package.json
└── README.md
```

---

*Campus Companion · Group 33 · Nature of Enterprise Computing · TUD Tallaght*
