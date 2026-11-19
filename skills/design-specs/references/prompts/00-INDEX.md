# Design Prompts Index

Quick reference for all design system prompts. Each prompt is engineered to produce genuinely unique, bespoke designs that avoid typical AI patterns.

---

## Dashboards

| # | Style | Best For | Key Characteristics |
|---|-------|----------|---------------------|
| 01 | [Neobrutalist](01-dashboard-neobrutalist.md) | Bold statements, anti-corporate | Thick borders, solid shadows, zero radius, raw |
| 02 | [Elegant Minimal](02-dashboard-elegant-minimal.md) | Productivity tools, workspaces | Craft/Cal/Linear fusion, spring physics, content-first |
| 03 | [Developer Dark](03-dashboard-developer-dark.md) | Dev tools, infrastructure | IDE-style, glassmorphism, keyboard-first |
| 04 | [Warm Human](04-dashboard-warm-human.md) | Wellness, education, personal | Headspace/Airbnb feel, gentle gamification |

---

## Landing Pages

| # | Style | Best For | Key Characteristics |
|---|-------|----------|---------------------|
| 05 | [Neobrutalist](05-landing-neobrutalist.md) | Bold brands, anti-SaaS | Hard shadows, no curves, marquee, raw energy |
| 06 | [Warm Human](06-landing-warm-human.md) | Wellness, home services, education | Serif headlines, floating circles, editorial warmth |
| 07 | [Editorial/Magazine](07-landing-editorial-magazine.md) | Content brands, publications | Typography-driven, drop caps, art-directed images |
| 08 | [Tech SaaS Premium](08-landing-tech-saas-premium.md) | Dev tools, B2B SaaS | Linear/Supabase fusion, canvas particles, custom cursor |
| 09 | [Cinematic Dark](09-landing-cinematic-dark.md) | Premium products, dramatic reveals | Liquid glass, maximum negative space, movie-like |
| 10 | [Playful Geometric](10-landing-playful-geometric.md) | Creative tools, design products | Bold shapes, vibrant colors, bouncy motion |

---

## Bonus Styles

| # | Style | Best For | Key Characteristics |
|---|-------|----------|---------------------|
| 11 | [Japanese Minimalist](11-bonus-japanese-minimalist.md) | Luxury, craft, contemplative | Wabi-sabi, massive whitespace, asymmetry |
| 12 | [Swiss Design](12-bonus-swiss-design.md) | Information-heavy, systematic | Grid perfection, typography-is-design, objective |
| 13 | [Retro-Futurist](13-bonus-retro-futurist.md) | Space tech, vintage-inspired | 1960s space-age, atomic motifs, orbit animations |

---

## Usage Tips

### Getting Better Results

1. **Iterate section by section** - Request hero first, then features, then footer
2. **Reject generic output** - If it looks like typical SaaS, demand structural changes
3. **Specify libraries upfront** - Mention Framer Motion, GSAP, Lenis explicitly
4. **Provide screenshot references** - Pair text prompts with visual examples

### Customization Points

Each prompt has placeholder areas you should customize:
- **Product description** - What your product does
- **Accent colors** - Your brand colors
- **Typography** - Your font choices
- **Specific features** - What sections you need

### Technical Defaults

Unless changed, all prompts assume:
- Next.js + React + TypeScript
- Tailwind CSS
- Framer Motion for animations
- Single React component output

---

## Anti-Patterns to Explicitly Reject

Tell AI to NOT create:
- 3-column equal-width feature card grids
- Centered hero with text-over-image
- Generic rounded cards with soft shadows
- Gradient backgrounds with random floating shapes
- Stock icon libraries used generically
- "Trust the process" / "Built with love" copy
- Standard testimonial carousels
- Generic "How it works" 1-2-3 sections

---

## Quick Start

1. Pick a prompt that matches your aesthetic goal
2. Copy the full prompt
3. Add your product-specific details
4. Request section-by-section implementation
5. Iterate until satisfied
