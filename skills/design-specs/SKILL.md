---
name: design-specs
description: "Library of exhaustive design specifications for dashboards and landing pages in named styles (neobrutalist, elegant minimal, developer dark, warm human, editorial, tech SaaS premium, cinematic dark, playful geometric, Japanese minimalist, Swiss, retro-futurist), plus layout notes and master design prompts. Use when the user asks for one of these design styles or their design specs."
disable-model-invocation: true
---

# design-specs

Thirteen named visual styles for dashboards and landing pages. Each style exists twice: a brief prompt (40-150 lines) and an exhaustive specification (1,000-2,800 lines) with tokens, component code, animation values and sample data.

## How to use

1. Pick one style from the table below. If the request does not name one, match on the "Best for" column and say which style was picked.
2. Read the brief first: the matching numbered section of [references/master-design-prompts.md](references/master-design-prompts.md). It is enough for a first pass or a single section.
3. Read the full spec only for the chosen style, and only when building the complete page. Do not load more than one full spec; they are long and they contradict each other on purpose.
4. Replace the placeholders (product description, accent colors, typography, sections) with the project's own, then build section by section.

## Styles

| # | Style | Kind | Best for | Key characteristics | Full spec | Lines |
|---|---|---|---|---|---|---|
| 1 | Neobrutalist | Dashboard | Bold statements, anti-corporate | Thick borders, solid shadows, zero radius, raw | [01-dashboard-neobrutalist.md](references/prompts/01-dashboard-neobrutalist.md) | 998 |
| 2 | Elegant Minimal | Dashboard | Productivity tools, workspaces | Craft/Cal/Linear fusion, spring physics, content-first | [02-dashboard-elegant-minimal.md](references/prompts/02-dashboard-elegant-minimal.md) | 1,860 |
| 3 | Developer Dark | Dashboard | Dev tools, infrastructure | IDE-style, glassmorphism, keyboard-first | [03-dashboard-developer-dark.md](references/prompts/03-dashboard-developer-dark.md) | 2,467 |
| 4 | Warm Human | Dashboard | Wellness, education, personal | Headspace/Airbnb feel, gentle gamification | [04-dashboard-warm-human.md](references/prompts/04-dashboard-warm-human.md) | 1,917 |
| 5 | Neobrutalist | Landing | Bold brands, anti-SaaS | Hard shadows, no curves, marquee, raw energy | [05-landing-neobrutalist.md](references/prompts/05-landing-neobrutalist.md) | 2,812 |
| 6 | Warm Human | Landing | Wellness, home services, education | Serif headlines, floating circles, editorial warmth | [06-landing-warm-human.md](references/prompts/06-landing-warm-human.md) | 2,230 |
| 7 | Editorial/Magazine | Landing | Content brands, publications | Typography-driven, drop caps, art-directed images | [07-landing-editorial-magazine.md](references/prompts/07-landing-editorial-magazine.md) | 2,110 |
| 8 | Tech SaaS Premium | Landing | Dev tools, B2B SaaS | Linear/Supabase fusion, canvas particles, custom cursor | [08-landing-tech-saas-premium.md](references/prompts/08-landing-tech-saas-premium.md) | 1,408 |
| 9 | Cinematic Dark | Landing | Premium products, dramatic reveals | Liquid glass, maximum negative space, movie-like | [09-landing-cinematic-dark.md](references/prompts/09-landing-cinematic-dark.md) | 1,911 |
| 10 | Playful Geometric | Landing | Creative tools, design products | Bold shapes, vibrant colors, bouncy motion | [10-landing-playful-geometric.md](references/prompts/10-landing-playful-geometric.md) | 2,063 |
| 11 | Japanese Minimalist | Landing | Luxury, craft, contemplative | Wabi-sabi, massive whitespace, asymmetry | [11-bonus-japanese-minimalist.md](references/prompts/11-bonus-japanese-minimalist.md) | 2,318 |
| 12 | Swiss Design | Landing | Information-heavy, systematic | Grid perfection, typography-is-design, objective | [12-bonus-swiss-design.md](references/prompts/12-bonus-swiss-design.md) | 2,555 |
| 13 | Retro-Futurist | Landing | Space tech, vintage-inspired | 1960s space-age, atomic motifs, orbit animations | [13-bonus-retro-futurist.md](references/prompts/13-bonus-retro-futurist.md) | 2,317 |

The brief for style N is section "N." of [references/master-design-prompts.md](references/master-design-prompts.md).

## Other references

| File | Use it for | Lines |
|---|---|---|
| [references/prompting-notes.md](references/prompting-notes.md) | Why output turns generic, what to specify instead, how to iterate, anti-patterns to reject | 74 |
| [references/technique-checklist.md](references/technique-checklist.md) | One-line layout, animation, effect and typography techniques to paste into a prompt | 108 |
| [references/saas-landing-spec.md](references/saas-landing-spec.md) | Style-neutral SaaS landing page spec: layout, scroll, animation, effects, components, with snippets | 225 |
| [references/human-centered-landing-spec.md](references/human-centered-landing-spec.md) | Style-neutral warm, human-centered landing page spec with timing tables | 272 |

## Stack the specs assume

Versions were checked against the npm registry on 2026-11-19. Where a spec conflicts with current official documentation or with the versions installed in the project, the official docs and the project win.

| Package | Version | Notes |
|---|---|---|
| `next` | 16.4 | App Router |
| `react`, `react-dom` | 19.3 | `ref` is a regular prop; no `forwardRef` |
| `typescript` | 7.0 | |
| `tailwindcss`, `@tailwindcss/postcss` | 4.3 | CSS-first config: `@import "tailwindcss"` and `@theme` in `globals.css`, no `tailwind.config.js` |
| `motion` | 14.14 | The package formerly named `framer-motion`. Import from `motion/react` |
| `lenis` | 1.3 | The package formerly named `@studio-freight/lenis` |
| `gsap` | 3.15 | With ScrollTrigger, in the specs that use it |

Output defaults to a single React component file unless the request says otherwise.

Tailwind v4 behavior the specs rely on:

- Theme tokens are CSS variables. `--color-washi` in `@theme` creates `bg-washi`, `text-washi` and the variable `var(--color-washi)`. A `:root` variable that shares a theme name (for example `--shadow-md` or `--leading-tight`) also restyles the matching utility.
- Tokens that point at another variable, such as `next/font` variables, go in `@theme inline`.
- Any whole number works without a theme entry: `duration-800`, `border-3`, `z-9999`, `rotate-3`.
- Buttons no longer get `cursor: pointer` from Preflight. Add `cursor-pointer`.
- `border` and `ring` default to `currentColor`, and `ring` is 1px. Always name the color and width.
- `hover:` only applies on devices that can hover.
- Renamed utilities: `bg-gradient-to-*` is `bg-linear-to-*`, `flex-shrink-*` is `shrink-*`, `outline-none` is `outline-hidden`, and the old `shadow-sm`, `rounded-sm`, `blur-sm` are now `shadow-xs`, `rounded-xs`, `blur-xs`.
