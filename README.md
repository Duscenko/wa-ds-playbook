# WA Design System Playbook

Interactive documentation for the WA Technology Design System — Casino, Sportsbook & Lottery.

Built on **shadcn/ui** with **Figma Variables** for white-label theming.

## Getting Started

```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Build for production
npm run build
```

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Vercel auto-detects Vite → click Deploy
5. Done! Your URL: `wa-design-system.vercel.app`

## Structure

```
src/
├── App.jsx              # Main app with sidebar nav
├── main.jsx             # Entry point
├── styles.css           # Global styles + CSS variables
├── data/
│   ├── tokens.js        # All Figma Variable tokens
│   └── components.js    # Component documentation data
├── components/
│   ├── LivePreviews.jsx # Interactive component previews
│   ├── useHover.js      # Hover/pressed state hook
│   └── UI.jsx           # Shared UI components
└── pages/
    ├── GetStarted.jsx   # Introduction, Principles, Architecture
    ├── Foundations.jsx   # Color, Typography, Spacing, Radii, Shadows, Charts
    ├── DesignSystem.jsx  # Tokens, Components, Patterns
    └── Resources.jsx     # Figma Library, JSON Exports
```

## Pages

- **Get Started**: Introduction, Principles, Token Architecture (3-tier system)
- **Foundations**: Color (Primitives/Utility/Semantic tabs), Typography, Spacing, Border Radii, Shadows, Chart Colors
- **Design System**: Tokens reference, 10 Components with live previews, Patterns (placeholder)
- **Resources**: Figma Library links, JSON Exports

## Components (10 atoms)

Each with interactive preview, variants, sizes, token mappings, accessibility guidelines, and Do/Don't rules:

Button · Icons · Alert · Badge · Card · Checkbox · Dialog · Input · Switch · Sheet

## Token Architecture

| Tier | Name | Description |
|------|------|-------------|
| T1 | Primitives | Brand-specific colors (swap for new theme) |
| T2 | Utility | Global functional colors (shared across ALL brands) |
| T3 | Semantic | Context-aware tokens with dark/light values |

## Tech Stack

- React 18
- Vite 6
- Inter + JetBrains Mono + Space Grotesk fonts
- Zero external UI dependencies (custom components)
