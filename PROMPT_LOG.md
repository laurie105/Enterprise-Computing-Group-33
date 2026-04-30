# Prompt Transcript Log – Campus Companion (Group 33)
## Component 2 & Component 4 – AI-Assisted Application Build

**Module:** Nature of Enterprise Computing  
**Group:** 33  
**Tool used:** Claude (claude.ai)

---

### Entry 1

| Field | Details |
|-------|---------|
| **Date/Time** | See conversation history |
| **Tool used** | Claude (claude.ai) |
| **Goal** | Generate full Next.js project structure for Campus Companion CA3 |
| **Prompt** | `ROLE: Senior Next.js engineer and accessibility reviewer. CONTEXT: We are building a Campus Companion web app for first-year TUD students. CONSTRAINTS: Next.js 14 (App Router), TypeScript, fictional data only, WCAG AA, optional Supabase. TASK: Create the complete project with at least 6 features from the brief (timetable, events, map, canteen, lost & found, helpdesk, reminders, accessibility settings). Include fictional seed data, a CSS design system with dark mode, and a README. OUTPUT FORMAT: All files with paths. SELF-CHECK: List accessibility issues and confirm all headings, ARIA labels, and focus states are present.` |
| **Model/output summary** | Generated complete Next.js project including layout, 8 pages, sidebar, topbar, CSS design system with CSS variables, WCAG skip link, dark/light mode toggle, and fictional seed SQL. |
| **What changed next** | Reviewed generated code; confirmed all form inputs have `<label>` elements, ARIA roles used on tabs and radios, `aria-live` on alert regions. Added `aria-current="page"` to active nav link. |

---

### Entry 2

| Field | Details |
|-------|---------|
| **Goal** | Generate ML feature (Component 4) |
| **Prompt** | `ROLE: ML engineer. CONTEXT: Campus Companion app with fictional events dataset. CONSTRAINTS: Classical ML only (no deep learning), explainable, lightweight, fictional data. TASK: Implement an event recommender as a Next.js API route. Features: category match, fill rate (popularity), recency. Use a weighted scoring function. OUTPUT FORMAT: TypeScript route file with inline explanation. SELF-CHECK: Confirm this qualifies as classical ML (not rule-based) and note limitations.` |
| **Model/output summary** | Generated weighted scoring function as API route at `/api/ml`. Features: category_match (weight 0.6), fill_rate (0.3), recency_score (0.1). Documented qualitative evaluation approach and noted train/test split limitation. |
| **What changed next** | Integrated recommender output into the Events page frontend as a "Recommended for You" section with progress bars showing fill rate. |

---

### Entry 3

| Field | Details |
|-------|---------|
| **Goal** | Accessibility settings page with WCAG documentation |
| **Prompt** | `ROLE: Accessibility specialist and React developer. CONTEXT: Campus Companion app. TASK: Build an Accessibility Settings page allowing users to toggle: dark/light theme, text size (3 levels), reduced motion, high contrast mode. All settings saved to localStorage. Each setting must reference the relevant WCAG success criterion. Include a live text preview for text size. OUTPUT FORMAT: TypeScript React component. SELF-CHECK: Confirm each toggle uses a proper accessible control (toggle switch, radio group) with visible labels and keyboard operability.` |
| **Model/output summary** | Generated full accessibility settings page with WCAG SC references (1.4.3, 2.4.1, 2.4.3, 2.4.7, 1.3.1, 2.3.3, 1.4.4). Settings persisted via localStorage through a context provider. |
| **What changed next** | Added OS-preference detection for `prefers-reduced-motion` and `prefers-color-scheme` to auto-apply settings on first load. |

---

### Entry 4

| Field | Details |
|-------|---------|
| **Goal** | Fictional seed data generation |
| **Prompt** | `ROLE: Database designer. CONTEXT: Campus Companion for TUD. TASK: Generate fictional PostgreSQL seed data for 6 tables: timetable, events, canteen_menu, lost_found, helpdesk_tickets, campus_locations. Rules: no real personal data, all names/emails/locations are completely fictional, realistic-sounding for an Irish college context. OUTPUT FORMAT: SQL INSERT statements with CREATE TABLE. SELF-CHECK: Confirm no real student data, no real staff names, no real contact details.` |
| **Model/output summary** | Generated complete seed.sql with 6 tables and 50+ rows of fictional Irish college data. All names, emails, room numbers, and event details confirmed as fictional. |
| **What changed next** | Reviewed all fictional names/emails to confirm uniqueness and plausibility. Added allergen data to canteen table for accessibility compliance. |

---

*All prompts followed the structured template from the CA3 brief: ROLE / CONTEXT / CONSTRAINTS / TASK / OUTPUT FORMAT / SELF-CHECK.*

*Full conversation transcript available in the claude.ai conversation history linked in the submission.*
