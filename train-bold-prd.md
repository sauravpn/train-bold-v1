# TRAIN BOLD — Product Requirements Document

**Version:** 1.0
**Status:** Pre-launch
**Last updated:** October 2026

---

## 1. Overview

**Product name:** TRAIN BOLD

**Tagline:** Your race is one day. Your training is every day.

**Product type:** Endurance and hybrid-sport training platform (web application)

**Stage:** Pre-launch. The current deliverable is a landing page with an early-access email signup. The full product will be built in later phases.

---

## 2. Problem Statement

Athletes training for endurance and hybrid races — HYROX, Ironman, triathlons, marathons, and similar events — spend **months** preparing for a **single race day**.

During that long preparation:

- Progress is invisible day to day. Improvements in pace, power, endurance, and nutrition are spread across apps, spreadsheets, and memory.
- Motivation drops between races because there is no feedback loop celebrating the work itself.
- Existing tools focus on raw activity logging (single workouts) rather than the **journey toward a goal**.
- Achievements like PRs, milestones, and consistency streaks go unmarked — only the final race result gets recognition.

**The core problem:** months of discipline can disappear into a single result. The journey itself is not measured, celebrated, or shared.

---

## 3. Solution

TRAIN BOLD turns the long road to race day into something worth celebrating **every day**.

The platform connects performance tracking, goal setting, nutrition, and achievements into one focused view built around the athlete's next start line.

### 3.1 Core pillars

| Pillar | Description |
|---|---|
| **Performance** | Track running, swimming, cycling, HYROX, and other disciplines in one place. |
| **Goals** | Set race goals (event, date, target time) and break them into measurable milestones. |
| **Fuel** | Track nutrition and dietary targets alongside training. |
| **Achievements** | Capture PRs and milestones and turn them into shareable achievement cards. |

### 3.2 Key product concepts

- **Campaign:** a goal-centered container (e.g. "Road to HYROX — Berlin, 19 February") with a countdown to race day, a goal time, a current predicted time, and an overall journey progress percentage.
- **Milestone timeline:** a visual progression of checkpoints (e.g. "Base built", "5K PB", "Race sim", race day) showing completed vs. upcoming milestones.
- **Multi-sport metrics:** per-discipline cards (run, cycle, swim, nutrition) showing PRs and trend indicators.
- **Achievement cards:** shareable artifacts generated from PRs and milestones, so progress can be celebrated socially.

### 3.3 What the product is NOT (pre-launch scope)

- No fake testimonials, customer logos, or claims of existing users/partnerships.
- No social network, coaching marketplace, or wearable integrations in v1.
- The landing page email form currently has a frontend-only success state; a real database/email system will be connected in a later step.

---

## 4. Target Audience

- Amateur and semi-competitive endurance athletes training for HYROX, Ironman, triathlon, marathon, and similar events.
- Athletes who already track workouts but lack a goal-centered, motivating view of the full journey.
- Age range: roughly 25–45, data-curious, motivated by measurable progress.

---

## 5. Goals & Success Metrics

### Pre-launch (landing page)

- Build an early-access email list of interested athletes.
- Communicate the brand idea clearly: the journey matters, not just race day.
- Establish a premium, credible visual identity before product launch.

### Post-launch (future)

- Signup → first campaign created (activation).
- Weekly active tracking across at least two disciplines.
- Milestone completion and achievement-card shares (engagement/virality).

---

## 6. UI/UX Design Requirements

### 6.1 Design direction

A **dark, editorial, performance-focused** visual system — more "sports data terminal" than typical fitness app.

| Token | Value | Usage |
|---|---|---|
| Background | Near-black with a green undertone (`oklch(0.115 0.01 155)`) | Page background |
| Surface / raised surface | Slightly lighter dark tones | Cards, dashboards |
| Primary | Acid lime (`oklch(0.87 0.235 126)`) | CTAs, key numbers, accents |
| Foreground | Off-white | Body text |
| Display font | Barlow Condensed (black, uppercase, tight leading) | Headlines, big numbers |
| Body font | DM Sans | Paragraphs, labels |

### 6.2 Design principles

- **Data-first:** numbers (PRs, countdowns, percentages) are the heroes; typography scales up for stats.
- **Restrained motion:** subtle reveal animations on load, hover states on cards, a scrolling ticker strip; respects `prefers-reduced-motion`.
- **Sharp geometry:** minimal border radius, 1px rules and grid lines, gap-px card grids.
- **Accessible contrast:** readable type sizes and contrast ratios throughout.
- **Responsive:** layouts collapse cleanly from desktop to mobile; dashboards stack.

### 6.3 Landing page structure (current deliverable)

1. **Header** — brand mark + "Early access" anchor link.
2. **Hero** — full-bleed night-training photography with gradient overlay; headline "Your race is one day. Your training is every day."; email signup form with success state; floating mini dashboard card.
3. **Ticker strip** — scrolling brand keywords (PRs · Milestones · Training · Nutrition…).
4. **Problem section** — "You train for months. You race for one day."
5. **Vision section** (inverted light-on-dark) — "What if every training day felt like a small finish line?"
6. **Platform features** — four cards: Performance, Goals, Fuel, Achievements.
7. **Product preview** — realistic SaaS dashboard mock: campaign header with race countdown, goal vs. predicted time, journey progress bar, four metric cards (run/cycle/swim/nutrition), and a milestone timeline.
8. **Emotional section** — "Don't wait for race day to feel like you've won."
9. **How it works** — three steps: Set your goal → Train & track → Celebrate the wins.
10. **Early access CTA** — lime block with second signup form.
11. **Footer** — brand, tagline, copyright, back-to-top.

### 6.4 Component behavior

- **Signup form:** email validation, submit → inline success confirmation ("You're on the early access list"). Frontend-only for now.
- **Dashboard mocks:** static but realistic data (e.g. "Road to HYROX", 126 days to race, goal 01:25:00, predicted 01:29:42, 68% progress).
- **No placeholders that claim traction:** no testimonials, logos, or user counts.

---

## 7. Technical Notes (current implementation)

- **Stack:** TanStack Start (React 19, SSR), Tailwind CSS v4, shadcn-style components, Vite.
- **Fonts:** Barlow Condensed + DM Sans via Google Fonts link in the root route.
- **SEO:** per-route head metadata (title, description, og tags, twitter card).
- **Future backend:** Lovable Cloud for the email list, authentication, and athlete data (to be enabled in a later step).

---

## 8. Roadmap

| Phase | Scope |
|---|---|
| **0 — Pre-launch (current)** | Landing page, early-access email capture (frontend state), brand identity. |
| **1 — Foundation** | Real email capture + database, authentication, athlete profiles. |
| **2 — Core tracking** | Campaigns, race goals, multi-sport performance logging, milestone timelines. |
| **3 — Fuel & achievements** | Nutrition targets, PR detection, shareable achievement cards. |
| **4 — Growth** | Social sharing, integrations (wearables, Strava), mobile experience. |

---

## 9. Open Questions

- Which wearable/file integrations matter most for v1 (Strava, Garmin, Apple Health)?
- Should achievement cards be image-based (OG-style) for social sharing?
- Pricing model: free tier vs. subscription for advanced analytics?
