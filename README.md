# TRAIN BOLD

> **Your race is one day. Your training is every day.**

TRAIN BOLD is an endurance and hybrid-sport training platform built for athletes preparing for HYROX, Ironman, triathlons, and marathons. This repository contains the Phase 0 pre-launch application featuring the dark, editorial "sports data terminal" aesthetic, interactive campaign telemetry preview, shareable achievement card generator, and early-access email capture system.

---

## ⚡ Tech Stack

- **Framework:** React 18 + Vite + TypeScript
- **Styling:** Tailwind CSS with custom editorial sports tokens & tactical grid system
- **Design System:** Dark palette (`#080d0a` near-black with green undertone, acid lime `#c2f835` accents, Barlow Condensed & DM Sans typography)
- **Icons:** Lucide React
- **Celebration Feedback:** Canvas Confetti

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ or v24 LTS)
- npm

### Installation & Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the local development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`.

### Production Build

```bash
npm run build
npm run preview
```

---

## 📋 Features Implemented (Phase 0 Pre-Launch)

1. **Header & Navigation:**
   - Brand mark with pulse indicator.
   - Smooth-scrolling anchor links to platform pillars, terminal preview, and how it works.
   - Discreet **Waitlist DB** badge with real-time signup counter and export modal.
   - Quick launcher for the PR Card Creator.

2. **Hero Section:**
   - High-impact editorial headline: *"YOUR RACE IS ONE DAY. YOUR TRAINING IS EVERY DAY."*
   - Interactive discipline focus selector (HYROX, Marathon, Ironman 70.3, Triathlon, Ultra).
   - Early-access email capture with real-time format validation, confetti animation, and inline confirmation.
   - Floating live mini telemetry card featuring the Berlin HYROX countdown and 68% journey progress.

3. **Infinite Marquee Ticker:**
   - Brand keywords and training telemetry cues scrolling seamlessly with pause-on-hover.

4. **Problem Section ("The Endurance Paradox"):**
   - Tactical 4-grid breakdown addressing the black box of training, app fragmentation, the middle-month motivation drop, and unrecorded personal records.

5. **Vision Section ("Small Finish Lines"):**
   - High-contrast paradigm comparison detailing the transition from passive workout loggers to active race campaigns.

6. **Four Core Platform Pillars:**
   - **Performance:** Multi-sport telemetry engine (run, bike, swim, functional).
   - **Goals & Campaigns:** Event countdown, target finish times, and dynamic race time predictions.
   - **Fuel & Nutrition:** Intra-workout carb absorption rates and hydration protocols.
   - **Achievements:** Automated benchmark PR detection and milestone celebratory cards.

7. **Live SaaS Dashboard Mock:**
   - **Campaign Switcher:** Seamlessly toggle between:
     - *Road to HYROX Berlin* (126 days out, target `01:25:00`, predicted `01:29:42`)
     - *Road to Valencia Marathon* (52 days out, target `02:59:59`, predicted `02:58:15`)
     - *Road to Ironman 70.3 Mallorca* (206 days out, target `04:45:00`, predicted `04:49:10`)
   - Segmented campaign journey progress bar.
   - 4-grid multi-sport metric cards with trend indicators and PR tags.
   - Milestone timeline with step-by-step benchmarks from base building to race simulation.

8. **Shareable Achievement Card Generator:**
   - Interactive card minting modal allowing custom athlete names, PR values, and event milestones.
   - Real-time dark editorial preview with QR badges and brand stamps.
   - Text copying and simulated export ready for social sharing.

9. **Early-Access Data Management:**
   - All email submissions are stored locally in the browser (`localStorage`).
   - Built-in waitlist drawer with one-click **Export to CSV** and **Export to JSON** capabilities.

---

## 🎨 Design Tokens

| Token | Hex / Spec | Usage |
|---|---|---|
| **Background** | `#080d0a` | Deep near-black with subtle pine/green undertone |
| **Surface** | `#0f1612` / `#141e19` | Cards, dashboards, raised terminal surfaces |
| **Surface Border** | `#1f3026` / `#2c4436` | Tactical 1px borders and grid dividers |
| **Primary (Acid Lime)** | `#c2f835` | Hero CTAs, progress bars, PR numbers, accents |
| **Foreground** | `#f2f5f3` | High-contrast editorial headers and body text |
| **Display Font** | `Barlow Condensed` | High-energy uppercase typography |
| **Body Font** | `DM Sans` | Clean legibility for labels and paragraphs |
