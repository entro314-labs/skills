# Retro-Futurist Landing Page

---

## Design Philosophy & Core Principles

This specification creates a landing page inspired by Retro-Futurism - the aesthetic of how 1960s designers imagined the year 2000. Think Apollo-era NASA graphics, TWA Flight Center architecture, Googie diners, and vintage sci-fi illustrations. This is **space-age optimism** translated into digital design - bold, confident, and adventurous.

### The Retro-Futurist Vision

1. **Atomic Age Optimism** - Technology as humanity's greatest adventure
2. **Space Exploration Wonder** - Infinite possibilities, cosmic scale
3. **Jet-Set Glamour** - Sophisticated, aspirational, stylish
4. **Geometric Confidence** - Strong shapes, bold angles, dynamic compositions
5. **Retrofitted Future** - Vintage aesthetics with modern capabilities
6. **Playful Boldness** - Not afraid to be dramatic and eye-catching

### Visual References

```typescript
// Design inspiration sources
const visualReferences = {
  architecture: [
    'TWA Flight Center (Eero Saarinen)',
    'LAX Theme Building',
    'Seattle Space Needle',
    'Googie coffee shops',
    "World's Fair pavilions",
  ],
  graphics: [
    'NASA Apollo-era posters',
    'Saul Bass title sequences',
    'Vintage airline advertisements',
    'Mid-century movie posters',
    'Atomic Age logos',
  ],
  illustration: [
    'Chesley Bonestell space art',
    'Robert McCall NASA murals',
    'Vintage sci-fi pulp covers',
    'Populuxe design',
  ],
};
```

---

## Technical Stack

```bash
npm install next react react-dom motion lenis clsx
npm install -D @types/node @types/react typescript tailwindcss @tailwindcss/postcss
```

Install the current releases. The versions this spec was checked against are in the stack table in [SKILL.md](../../../SKILL.md).

---

## Parts

Read [brief.md](brief.md) for the short version of this style. The full specification is split into the files below; read the ones the task needs, in this order.

| File | Contains | Lines |
|---|---|---|
| [tokens.md](tokens.md) | Color System; Typography System; Spacing System; Global Styles | 527 |
| [motion.md](motion.md) | Motion & Animation System | 274 |
| [components.md](components.md) | Design Elements; Component Library | 461 |
| [sections.md](sections.md) | Section-by-Section Implementation | 785 |
| [page.md](page.md) | Complete Page Assembly | 34 |

---

## What to ABSOLUTELY AVOID

### Visual Mistakes

```typescript
const forbiddenElements = {
  // NO modern minimalism
  minimalist: 'bg-white text-gray-900', // NEVER - too contemporary

  // NO soft, muted colors
  mutedPalette: 'bg-slate-100 text-slate-600', // NEVER

  // NO subtle shadows
  subtleShadow: 'shadow-xs', // NEVER - go bold or none

  // NO tiny, delicate typography
  tinyText: 'text-xs font-light tracking-normal', // NEVER

  // NO standard border-radius
  standardRadius: 'rounded-md', // Use rounded-2xl or clip-path instead

  // NO flat buttons
  flatButton: 'bg-gray-100 text-gray-700', // NEVER - needs energy

  // NO contemporary gradients
  modernGradient: 'from-purple-500 to-pink-500', // NEVER
};
```

### Animation Mistakes

```typescript
const forbiddenAnimations = {
  // NO slow, subtle fades
  subtleFade: { duration: 0.15, opacity: [0, 1] }, // NEVER - too weak

  // NO micro-interactions only
  microOnly: { scale: 1.02 }, // NEVER - go bigger

  // NO static pages
  noAnimation: undefined, // NEVER - animation is central to retro-futurism

  // NO overly complex 3D
  excessive3D: { rotateX: 45, rotateY: 30, rotateZ: 15 }, // NEVER - keep it readable
};
```

### Typography Mistakes

```typescript
const forbiddenTypography = {
  // NO tight letter-spacing on headlines
  tightHeadline: 'tracking-tight', // NEVER - use tracking-widest or tracking-ultra

  // NO lowercase headlines
  lowercaseHeadline: 'capitalize', // NEVER - use uppercase

  // NO serif fonts
  serifFont: 'font-serif', // NEVER - stay geometric

  // NO thin weights for headlines
  thinHeadline: 'font-light', // NEVER - use bold or black

  // NO standard sans-serif
  boringFont: 'font-sans', // NEVER - use Space Grotesk or Futura
};
```

### Content Mistakes

```typescript
const forbiddenContent = {
  // NO corporate speak
  corporateSpeak: 'Leverage synergies', // NEVER

  // NO timid CTAs
  weakCTA: 'Learn more', // NEVER - use 'Launch', 'Begin Mission', 'Engage'

  // NO generic imagery
  stockPhotos: 'business-meeting.jpg', // NEVER

  // NO modern tech clichés
  techCliche: 'AI-powered', // NEVER - use space/atomic language

  // NO subtle color usage
  subtleAccent: 'text-orange/50', // NEVER - go full saturation
};
```

---

## Retro-Futurist Checklist

### Color & Palette
- [ ] Deep space navy as primary background
- [ ] Retro orange as main accent
- [ ] Atomic teal as secondary accent
- [ ] High saturation, bold colors
- [ ] Space-age gradients (sunset, horizon)

### Typography
- [ ] Geometric sans-serif (Space Grotesk, Futura)
- [ ] VERY wide letter-spacing (0.15em+)
- [ ] Uppercase headlines
- [ ] Bold/black weights for display
- [ ] Monospace for data/numbers

### Visual Elements
- [ ] Starburst shapes
- [ ] Orbit animations
- [ ] Status lights (blinking)
- [ ] Radar/mission control elements
- [ ] Angled clip-paths
- [ ] Diagonal stripes

### Animation
- [ ] Orbiting elements
- [ ] Pulsing glows
- [ ] Scan line effects
- [ ] Typewriter text
- [ ] Playful entrance animations
- [ ] Countdown timers

### Layout
- [ ] Full-bleed sections
- [ ] Angled section dividers
- [ ] Generous spacing
- [ ] Bold, confident compositions
- [ ] Space-themed decorations

### Mood
- [ ] Optimistic, not dystopian
- [ ] Adventurous, not corporate
- [ ] Confident, not timid
- [ ] Playful, not serious
- [ ] Nostalgic, not dated

---

## Final Notes

Retro-Futurism is about **optimism** and **adventure**. It's the aesthetic of a future that never was - when space travel was humanity's greatest aspiration and technology promised a utopian tomorrow.

Key principles:
- **Be bold** - No timid design choices
- **Use motion** - Animation is central, not optional
- **Wide tracking** - Letter-spacing is your friend
- **Saturated colors** - Orange and teal at full power
- **Space themes** - Orbits, stars, missions, launches

When done right, Retro-Futurism creates websites that feel exciting, confident, and uniquely memorable. It's design that makes people smile.

Remember: The future is NOW.
