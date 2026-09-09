# bluffhouse — Game Mechanics & Minimalistic Glassmorphic Web UI

<img src="https://files.catbox.moe/z6ewwn.gif" alt="Bluffhouse Logo" width="100%" />

> **Guide for game mechanics and example of minimalistic web Ui using React**

A lightning-fast, pure client-side companion guide and documentation single-page application (SPA). Designed with a pitch-black, translucent glassmorphism aesthetic inspired by dark frosted glass surfaces, high-contrast typography, and responsive micro-interactions.

---

## Tech Stack

<p align="left">
  <a href="https://skillicons.dev"> <br/> 
  <img src="https://skillicons.dev/icons?i=react,js,tailwind,nodejs" alt="Tech Stack Icons" />
  </a>
</p>

<p align="left">
  <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 19" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
</p>

### Frontend & Core
- ![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB) **[React 19](https://react.dev/)** — Component-driven UI architecture using modern hooks and concurrent rendering features.
- ![JavaScript](https://img.shields.io/badge/ES_Modules-F7DF1E?style=flat-square&logo=javascript&logoColor=black) **[JavaScript (ES Modules)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)** — Modular, dependency-free business logic and dynamic game formula simulations.

### Styling & Design System
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white) **[Tailwind CSS v4](https://tailwindcss.com/)** (`@tailwindcss/vite`) — Native CSS imports with `@import "tailwindcss"`.

### Icons & Utilities
- ![Lucide](https://img.shields.io/badge/Lucide_React-F56565?style=flat-square&logo=feather&logoColor=white) **[Lucide React](https://lucide.dev/)** — Clean, lightweight SVG icon set.
- ![NPM](https://img.shields.io/badge/Utilities-clsx_%26_tailwind--merge-CB3837?style=flat-square&logo=npm&logoColor=white) **[clsx](https://github.com/lukeed/clsx) & [tailwind-merge](https://github.com/dcastil/tailwind-merge)** — Dynamic class merging and collision resolution.
- ![Canvas](https://img.shields.io/badge/Effects-canvas--confetti-4B0082?style=flat-square) **[canvas-confetti](https://www.npmjs.com/package/canvas-confetti)** — Lightweight celebratory particle effects for simulator interactions.

---

## Features & Architecture

### 1. Minimalistic Glassmorphism UI
- **Translucent Layering**: Frosted glass surfaces with variable blur depths and specular borders.
- **High-Contrast Readability**: Engineered for clarity with pure white headers and light-zinc body copy, avoiding dim or muddy text.
- **Mobile-First & Responsive**:
  - Compact sticky navigation bar (`h-14 sm:h-16`) with mobile touch targets.
  - Slide-in glass navigation drawer with header and auto-closing links on tap.
  - Horizontally scrollable data tables (`overflow-x-auto min-w-[480px]`) preventing layout clipping on phone screens (360px–400px).
- **Global Search Modal (`Cmd+K` / `Ctrl+K`)**: Keyboard-navigable search across weapons, cards, and command documentation.

### 2. Interactive Game Mechanics & Simulators
- **Interactive Stat Builder**:
  - Real-time attribute allocation (HP, STR, DEX, SPD, DEF) with level scaling (Lv 1–100).
  - Live calculations for Hit Points, Critical Hit %, Damage Mitigation, and Speed differentials.
  - Multi-slot Talisman Pouch equipping system with level threshold unlocks.
- **Weapon Smithy Upgrade Simulator**:
  - Interactive +0 to +10 weapon forging preview across Common, Elite, and Boss tiers.
  - Live formula breakdown showing base strike damage scaling, stat bonuses, shield block percentages, and cumulative shard expenditures.
- **Combat Formula Pipeline**:
  - Documentation of tactical actions (Light, Heavy, Guard, Dodge, Flee).
  - Damage mitigation formulas, Guard Counter damage multipliers (+35%), and Dodge First-Strike priority mechanics.
- **Gacha & Minigame Mechanics**:
  - Summon rate tables with pity mechanics for Anime Card rarities (Common to Mythic).
  - Russian Roulette item combination playbooks (Magnifying Glass, Hand Saw, Handcuffs, Beer, Cigarettes) and card wager duel formats.
- **Bot Commands Directory**:
  - Searchable, category-filtered catalog of Telegram bot slash commands with click-to-copy code badges.

---

## Project Structure

```text
frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   └── Sidebar.jsx        # Responsive collapsible & mobile drawer navigation
│   │   ├── tools/
│   │   │   ├── StatCalculator.jsx    # Real-time character attribute & title builder
│   │   │   └── UpgradeSimulator.jsx  # Weapon +0 to +10 smithy forge calculator
│   │   ├── ui/
│   │   │   ├── Callout.jsx        # Documentation alert callouts (tip, note, warn)
│   │   │   └── CommandBadge.jsx   # Inline command pills with clipboard copy
│   │   ├── Navbar.jsx             # Glassmorphic header with search and Telegram link
│   │   ├── SearchModal.jsx        # Global fuzzy search dialog (Cmd+K)
│   │   └── CopyButton.jsx         # One-click copy utility button
│   ├── data/
│   │   └── gameData.js            # Central source of truth for weapons, cards, stats, and commands
│   ├── pages/
│   │   ├── LandingPage.jsx        # Glassmorphic hero page and module catalog
│   │   ├── RPGProgressionPage.jsx # Site of Grace leveling, titles, and stat formulas
│   │   ├── WeaponsDatabasePage.jsx# Weapon tiers, daily shop, and smithy scaling
│   │   ├── BestiaryPage.jsx       # Encounter spawn rate distributions and drop tables
│   │   ├── CombatSimulatorPage.jsx# Combat move mechanics and damage pipeline formulas
│   │   ├── CardDexPage.jsx        # Gacha probabilities and legendary talisman buffs
│   │   ├── MiniGamesPage.jsx      # Russian Roulette item combinations and duels
│   │   └── CommandsPage.jsx       # Searchable bot slash command directory
│   ├── App.jsx                    # Root layout, routing state, and ambient background
│   ├── index.css                  # Tailwind v4 imports, glassmorphism design tokens & styles
│   └── main.jsx                   # Application entry point
├── package.json
└── vite.config.js
```

---

## Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm** or **pnpm** / **yarn**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/guide-web.git
   cd guide-web/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Building for Production

Compile optimized, minified static client-side bundles:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

---

## License

Distributed under the MIT License. Feel free to use this codebase as a template or reference for building dark glassmorphic web applications and documentation portals in React.
