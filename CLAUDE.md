# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Amaltas University ("Where healing grows") — a multi-page React concept marketing site for a health-sciences university, built with Vite + React Router. Requires Node.js 18+.

## Commands

```bash
npm install
npm run dev      # vite dev server → http://localhost:5173 (auto-opens browser)
npm run build    # production build → dist/
npm run preview  # serve the production build locally
```

There is no test runner, linter, or formatter configured — `dev`, `build`, and `preview` are the only scripts.

## Architecture

- **Entry & routing.** `src/main.jsx` mounts `BrowserRouter` → `App.jsx`. `App.jsx` is the single source of routes (`Routes`/`Route`), and renders a fixed `Navbar` + `Footer` around the routed `<main>`. Each route maps to one file in `src/pages/`. The catch-all `*` route renders `NotFound`. `ScrollToTop` (from `Layout.jsx`) resets scroll on every route change.

- **Content is data-driven.** All copy and structured content (institutions, programmes, leaders, testimonials, nav items, etc.) lives in `src/data/content.js` as exported arrays. Pages import these arrays and `.map()` over them — when adding or editing content, edit `content.js`, not the page JSX. Lucide icon components are imported in `content.js` and stored directly on the data objects (e.g. `{ icon: Stethoscope, ... }`); pages render them as `<item.icon />`. Nav structure (including dropdowns via `children`) is driven by the `NAV` export and consumed by `Navbar.jsx`.

- **Design system lives in CSS, not components.** `src/index.css` (~780 lines) is the entire design system: CSS custom properties (`--navy`, `--gold`, etc.), all component classes (`.btn`, `.btn-gold`, `.wrap`, `.eyebrow`, `.page-hero`, reveal animations), and responsive rules. Styling is done with global className strings, not CSS modules or a CSS-in-JS library. The same brand tokens are mirrored as JS values in `src/theme.js` (exported object `C`) for the cases where colors are set via inline `style={}` (common in this codebase for one-off glows/positions). Keep `index.css` `:root` vars and `theme.js` `C` in sync.

- **Animation primitives are hand-rolled (zero animation deps).** `src/components/Primitives.jsx` + `src/hooks/useScroll.js` implement the motion system:
  - `useInView` — IntersectionObserver hook; by default `repeat: true`, so reveals **re-trigger every time** an element scrolls back into view (not one-shot).
  - `<Reveal variant="left|right|zoom|img" delay="d1..d6">` — wraps children with scroll-reveal classes (`.rv`, `.rv-*`) that pair with `index.css` transitions.
  - `<Tilt>` — mouse-position 3D tilt via inline transform.
  - `useCountUp` + `<StatNum v= suf= run=>` — eased count-up animation, gated on a `run` flag (typically wired to in-view state).
  - `src/components/HelixCanvas.jsx` — the home hero's mouse-reactive `<canvas>` particle/DNA-helix effect (pure canvas + rAF).

## Conventions

- JSX files use `.jsx`; React is imported explicitly per file (not auto-injected).
- Inactive/placeholder links use `href="#"` with `onClick={(e) => e.preventDefault()}` — this is intentional for the concept site; don't "fix" them into real routes unless asked.
- `dist/` is committed to the repo (not gitignored) — rebuild it if you change source and the deployed/static output needs to match.

## Content caveat

Per the README: testimonials and several figures (e.g. "800+ beds", world-record framing) are **plausible placeholders**, and contact details / claims are concept content. Treat marketing/regulatory claims as unverified.
