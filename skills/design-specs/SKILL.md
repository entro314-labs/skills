---
name: design-specs
description: "Library of design specifications for dashboards and landing pages in named styles (neobrutalist, elegant minimal, developer dark, warm human, editorial, tech SaaS premium, cinematic dark, playful geometric, Japanese minimalist, Swiss, retro-futurist), each with a brief prompt and an exhaustive specification split into parts, plus technique and prompting notes. Use when the user asks for one of these design styles or their design specs."
disable-model-invocation: true
---

# design-specs

Thirteen named visual styles for dashboards and landing pages, engineered to produce bespoke designs that avoid typical AI patterns. Each style has its own folder under `references/styles/` with a brief (35-150 lines) and an exhaustive specification (1,000-2,800 lines, split into parts) covering tokens, component code, animation values and sample data.

## How to use

1. Pick one style from the table below. If the request does not name one, match on the "Best for" column and say which style was picked.
2. Read that style's `brief.md` first. It is enough for a first pass or a single section.
3. For a full build, read the style's `index.md`. It holds the output requirements, the page structure, what to avoid and a table of the parts, so only the parts the task needs are loaded.
4. Stay inside one style folder. The styles contradict each other on purpose.
5. Replace the placeholders (product description, accent colors, typography, sections) with the project's own, then build section by section.

## Styles

| # | Style | Kind | Best for | Key characteristics | Folder | Brief | Full spec |
|---|---|---|---|---|---|---|---|
| 1 | Neobrutalist | Dashboard | Bold statements, anti-corporate | Thick borders, solid shadows, zero radius, raw | [01-dashboard-neobrutalist](references/styles/01-dashboard-neobrutalist/index.md) | 134 lines | 1,017 lines |
| 2 | Elegant Minimal | Dashboard | Productivity tools, workspaces | Craft/Cal/Linear fusion, spring physics, content-first | [02-dashboard-elegant-minimal](references/styles/02-dashboard-elegant-minimal/index.md) | 149 lines | 1,866 lines |
| 3 | Developer Dark | Dashboard | Dev tools, infrastructure | IDE-style, glassmorphism, keyboard-first | [03-dashboard-developer-dark](references/styles/03-dashboard-developer-dark/index.md) | 104 lines | 2,482 lines |
| 4 | Warm Human | Dashboard | Wellness, education, personal | Headspace/Airbnb feel, gentle gamification | [04-dashboard-warm-human](references/styles/04-dashboard-warm-human/index.md) | 81 lines | 1,926 lines |
| 5 | Neobrutalist | Landing | Bold brands, anti-SaaS | Hard shadows, no curves, marquee, raw energy | [05-landing-neobrutalist](references/styles/05-landing-neobrutalist/index.md) | 35 lines | 2,814 lines |
| 6 | Warm Human | Landing | Wellness, home services, education | Serif headlines, floating circles, editorial warmth | [06-landing-warm-human](references/styles/06-landing-warm-human/index.md) | 74 lines | 2,235 lines |
| 7 | Editorial/Magazine | Landing | Content brands, publications | Typography-driven, drop caps, art-directed images | [07-landing-editorial-magazine](references/styles/07-landing-editorial-magazine/index.md) | 47 lines | 2,106 lines |
| 8 | Tech SaaS Premium | Landing | Dev tools, B2B SaaS | Linear/Supabase fusion, canvas particles, custom cursor | [08-landing-tech-saas-premium](references/styles/08-landing-tech-saas-premium/index.md) | 145 lines | 1,429 lines |
| 9 | Cinematic Dark | Landing | Premium products, dramatic reveals | Liquid glass, maximum negative space, movie-like | [09-landing-cinematic-dark](references/styles/09-landing-cinematic-dark/index.md) | 63 lines | 1,903 lines |
| 10 | Playful Geometric | Landing | Creative tools, design products | Bold shapes, vibrant colors, bouncy motion | [10-landing-playful-geometric](references/styles/10-landing-playful-geometric/index.md) | 55 lines | 2,046 lines |
| 11 | Japanese Minimalist | Landing | Luxury, craft, contemplative | Wabi-sabi, massive whitespace, asymmetry | [11-landing-japanese-minimalist](references/styles/11-landing-japanese-minimalist/index.md) | 38 lines | 2,306 lines |
| 12 | Swiss Design | Landing | Information-heavy, systematic | Grid perfection, typography-is-design, objective | [12-landing-swiss-design](references/styles/12-landing-swiss-design/index.md) | 44 lines | 2,555 lines |
| 13 | Retro-Futurist | Landing | Space tech, vintage-inspired | 1960s space-age, atomic motifs, orbit animations | [13-landing-retro-futurist](references/styles/13-landing-retro-futurist/index.md) | 34 lines | 2,306 lines |

Every style folder uses the same file names:

| File | Holds |
|---|---|
| `brief.md` | The short prompt for the style |
| `index.md` | Entry point: output requirements, structure overview, what to avoid, final notes, and the parts table |
| `tokens.md` | Colors, typography, layout, spacing and global styles. The Tailwind theme blocks are here in the order they must appear in `globals.css` (the Swiss spec also keeps its transition tokens in `motion.md`) |
| `motion.md` | Animation system, timing, smooth scroll, cursor |
| `components.md` | Buttons, forms, icons and other shared components |
| `sections.md` | Page sections (landing pages) or dashboard views, in page order |
| `page.md` | Sample data and the assembled page |

A part over 900 lines is split into numbered files (`sections-1.md`, `sections-2.md`); the parts table in `index.md` lists which headings each file contains. Not every style has every part.

## Other references

| File | Use it for | Lines |
|---|---|---|
| [references/prompting-notes.md](references/prompting-notes.md) | Why output turns generic, what to specify instead, how to iterate, anti-patterns to reject | 74 |
| [references/technique-checklist.md](references/technique-checklist.md) | One-line layout, animation, effect and typography techniques to paste into a prompt | 108 |
| [references/saas-landing-spec.md](references/saas-landing-spec.md) | Style-neutral SaaS landing page spec: layout, scroll, animation, effects, components, with snippets | 225 |
| [references/human-centered-landing-spec.md](references/human-centered-landing-spec.md) | Style-neutral warm, human-centered landing page spec with timing tables | 272 |

## Stack the specs assume

Versions were checked against the npm registry on 2026-11-19, and a Next.js app built from these versions with spec 09's theme and hooks compiles. Where a spec conflicts with current official documentation or with the versions installed in the project, the official docs and the project win.

| Package | Version | Notes |
|---|---|---|
| `next` | 16.4 | App Router |
| `react`, `react-dom` | 19.3 | `ref` is a regular prop; no `forwardRef` |
| `typescript` | 7.0 | |
| `@types/react`, `@types/react-dom` | 19.3 | |
| `@types/node` | 26.6 | |
| `tailwindcss`, `@tailwindcss/postcss` | 4.3 | CSS-first config: `@import "tailwindcss"` and `@theme` in `globals.css`, no `tailwind.config.js` |
| `postcss` | 8.5 | |
| `motion` | 14.14 | The package formerly named `framer-motion`. Import from `motion/react` |
| `lenis` | 1.3 | The package formerly named `@studio-freight/lenis` |
| `gsap` | 3.15 | With ScrollTrigger, in the specs that use it |
| `clsx` | 2.1 | |
| `tailwind-merge` | 3.7 | 3.x is the line that understands Tailwind 4 class names |

This table is the only place versions are written down. The specs list package names without versions, so a version refresh edits this table and nothing else. Packages a single spec adds (Radix primitives, `cmdk`, `recharts`, `lucide-react` and similar) are installed at their current release.

Output defaults to a single React component file unless the request says otherwise.

Tailwind v4 behavior the specs rely on:

- Theme tokens are CSS variables. `--color-washi` in `@theme` creates `bg-washi`, `text-washi` and the variable `var(--color-washi)`. A `:root` variable that shares a theme name (for example `--shadow-md` or `--leading-tight`) also restyles the matching utility.
- Tokens that point at another variable, such as `next/font` variables, go in `@theme inline`.
- `globals.css` has one `@import "tailwindcss"`. A Google Fonts `@import url(...)` goes above it; a browser ignores an `@import` that follows other rules.
- Any whole number works without a theme entry: `duration-800`, `border-3`, `z-9999`, `rotate-3`.
- Buttons no longer get `cursor: pointer` from Preflight. Add `cursor-pointer`.
- `border` and `ring` default to `currentColor`, and `ring` is 1px. Always name the color and width.
- `hover:` only applies on devices that can hover.
- Renamed utilities: `bg-gradient-to-*` is `bg-linear-to-*`, `flex-shrink-*` is `shrink-*`, `outline-none` is `outline-hidden`, and the old `shadow-sm`, `rounded-sm`, `blur-sm` are now `shadow-xs`, `rounded-xs`, `blur-xs`.
