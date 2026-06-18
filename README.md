# Amaltas University — Flagship Redesign

> *"Where healing grows."* A modern, multi-page React concept site for Amaltas University, Dewas.

A premium, emotionally engaging redesign concept built with **Vite + React + React Router**. Gold is the brand-native accent — *Amaltas* is the golden-flowering tree (Cassia fistula) — tying prestige, warmth, and the name together.

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

> Requires Node.js 18+.

## Pages (matches the navigation bar)

| Route | Page |
|---|---|
| `/` | Home — cinematic mouse-reactive hero, stats, story, previews |
| `/institutions` | All 7 health-science institutions with programmes |
| `/admissions` | Programme explorer, live countdown, 4-step process, enquiry form, fees & scholarships |
| `/why` | Why Amaltas — differentiators, animated stats, world-record band |
| `/leadership` | Leadership profiles |
| `/voices` | Testimonial carousel, voices grid, virtual-tour CTA |
| `*` | Custom 404 |

## What's implemented (zero external animation deps)

- **Mouse-reactive canvas hero** — particle constellation + rotating DNA double-helix that flees the cursor (`HelixCanvas.jsx`)
- **Word-by-word headline reveal** with gold gradient
- **Scroll-reveal** via IntersectionObserver, **count-up** stats, **3D tilt** cards
- **Audience router** chips, **infinite trust marquee**, **filterable programme list**
- **Weighted testimonial carousel**, **live admissions countdown**, **scroll-progress** nav beam
- Fully **responsive** with mobile menu

## Project structure

```
src/
├── main.jsx              # entry + BrowserRouter
├── App.jsx               # routes
├── index.css            # full design system (tokens, components, animations)
├── theme.js             # JS color tokens
├── hooks/useScroll.js   # useInView, useCountUp
├── data/content.js      # all institution/program/leader/voice content
├── components/          # Navbar, Footer, HelixCanvas, Layout, Primitives
└── pages/               # Home, Institutions, Admissions, Why, Leadership, Voices, NotFound
```

## Design system

- **Type:** Fraunces (display) + Hanken Grotesk (body) — loaded via Google Fonts in `index.css`
- **Color:** navy `#0A1626` · emerald `#0E7A66` · Amaltas gold `#E0A93B` · ivory `#F7F4EC`
- **Motion:** calm easeOutExpo entrances — *medical trust*, not bouncy

## Recommended production upgrades

Swap the zero-dependency equivalents for the real stack when you ship:
- **GSAP + ScrollTrigger** for scroll choreography
- **Lenis** for smooth scrolling
- **React Three Fiber / Three.js** for a richer 3D hero
- **Framer Motion** for route + component transitions
- Replace placeholder gradients with real campus photography & video

## ⚠️ Content note

Testimonials and some figures (e.g. "800+ beds", world-record framing) are **plausible placeholders**. Verify exact accredited claims, real student quotes, and regulatory wording with the university before publishing — medical-education marketing claims carry compliance weight.

---
Concept redesign · not affiliated with or endorsed by Amaltas University.
