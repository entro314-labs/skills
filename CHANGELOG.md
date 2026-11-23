# Changelog

## Unreleased

### Added

- Claude Code plugin marketplace (`entro314-labs`) so skills install with `/plugin install <skill>@entro314-labs`.
- `ui-declutter` skill.
- `brand-writing` plugin with six skills: `positioning-messaging`, `brand-voice`, `copywriting`, `landing-page-copy`, `copy-editing` and `ux-writing`.
- `remotion` plugin with seven skills: `remotion-core`, `remotion-project-conventions`, `remotion-transitions`, `remotion-maplibre-maps`, `remotion-explainer-videos`, `remotion-promo-videos` and `remotion-rendering`.
- `remotion-product-film` skill in the `remotion` plugin: product video brief plus cinematic film production. It replaces the cinematic launch reference that was inside `remotion-promo-videos`.
- `crete` plugin (Athens to Crete methodology) in `plugins/crete/`, moved here from `entro314-labs/athens-to-crete`.
- Seven plugins (123 skills, 3 subagents) converted from earlier Claude Code slash commands, analysis prompts and guide collections: `codebase-analysis`, `business-analysis`, `drift-prevention`, `code-quality`, `thinking-tools`, `dev-guides` (with the `ui-engineer`, `ui-ux-designer` and `react-nextjs-expert` subagents) and `dev-workflow`.
- `ux-joy-audit` skill: a five-lens audit of pages and flows (comprehension, human copy and voice, onboarding, waiting states and micro-interactions, component fit), with references for dry-wit message pools and Iris UI component fit.

### Changed

- `design-specs`: specs now target Next.js 16, React 19, TypeScript 7, Tailwind CSS 4 (CSS `@theme` blocks instead of `tailwind.config`), Motion 14 (`motion/react`, replacing `framer-motion`), Lenis 1.3 (`lenis`, replacing `@studio-freight/lenis`) and GSAP 3.15. `SKILL.md` is now a style picker and the only place package versions are written; the specs name packages without versions. Each style has its own folder under `references/styles/` with a `brief.md`, an `index.md` entry point and the full specification split into parts (`tokens.md`, `motion.md`, `components.md`, `sections.md`, `page.md`), replacing the single 1,000-2,800 line files and the combined master prompts file. Each colour value is now written once per spec, in the Tailwind theme. The three overlapping layout notes are merged into `technique-checklist.md`, and the two prompting notes and the prompt index into `prompting-notes.md`.
