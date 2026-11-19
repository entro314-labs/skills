# Swiss Design / International Typographic Style Landing Page

---

## Design Philosophy & Core Principles

This specification creates a landing page following Swiss Design (International Typographic Style) principles - a design movement that emerged from Switzerland in the 1950s. The aesthetic is defined by **mathematical precision**, **typography as the primary design element**, **objective clarity**, and **systematic grid-based layouts**. Every design decision must serve communication and function.

### The Swiss Design Manifesto

1. **The Grid is Sacred** - All elements align to a mathematical grid system
2. **Typography IS the Design** - Text is not decoration, it's architecture
3. **Objectivity Over Expression** - Remove personal artistic flourishes
4. **Clarity Above All** - Every element must communicate clearly
5. **Reduction to Essentials** - If it doesn't serve function, remove it
6. **Asymmetry Within Order** - Dynamic tension through mathematical placement

### What Makes This Style Unique

Swiss Design is the **opposite** of decorative design. There are:
- **NO gradients** (flat colors only)
- **NO shadows** (except for functional hierarchy)
- **NO rounded corners** (sharp geometry only)
- **NO decorative animations** (movement only for function)
- **NO illustrative graphics** (typography and geometry only)
- **NO color variety** (black, white, and ONE accent color)

---

## Technical Stack

```bash
npm install next react react-dom motion clsx
npm install -D @types/node @types/react typescript tailwindcss @tailwindcss/postcss
```

`motion`: Minimal use - page transitions only.

Install the current releases. The versions this spec was checked against are in the stack table in [SKILL.md](../../../SKILL.md).

---

## Parts

Read [brief.md](brief.md) for the short version of this style. The full specification is split into the files below; read the ones the task needs, in this order.

| File | Contains | Lines |
|---|---|---|
| [tokens.md](tokens.md) | Color System; Typography System; Grid System; Spacing System; Global Styles; Responsive Behavior | 797 |
| [motion.md](motion.md) | Motion & Animation | 186 |
| [components.md](components.md) | Component Library | 349 |
| [sections.md](sections.md) | Section-by-Section Implementation | 892 |
| [page.md](page.md) | Complete Page Assembly | 34 |

---

## What to ABSOLUTELY AVOID

### Visual Elements

```typescript
// NEVER include these in Swiss Design:

const forbiddenElements = {
  // NO rounded corners EVER
  roundedCorners: 'rounded-lg', // NEVER
  borderRadius: 'rounded-full', // NEVER

  // NO shadows
  boxShadow: 'shadow-lg', // NEVER
  dropShadow: 'drop-shadow-md', // NEVER

  // NO gradients
  gradient: 'bg-linear-to-r', // NEVER

  // NO color variety
  extraColors: 'text-blue-500', // NEVER - only black, white, gray, red

  // NO decorative icons
  heroIcons: 'icon-sparkle', // NEVER
  decorativeIcons: '<Sparkles />', // NEVER

  // NO illustrations
  illustrations: 'abstract-blob.svg', // NEVER
  decorativeImages: 'pattern.png', // NEVER

  // NO blur effects
  backdropBlur: 'backdrop-blur-lg', // NEVER
  glassmorphism: 'bg-white/10 backdrop-blur', // NEVER

  // NO 3D effects
  perspective: 'perspective-1000', // NEVER
  transform3D: 'rotate-x-12', // NEVER
};
```

### Animation Mistakes

```typescript
// NEVER animate like this:

const forbiddenAnimations = {
  // NO bouncy physics
  springAnimation: {
    type: 'spring',
    stiffness: 200,
    damping: 10,
  }, // NEVER

  // NO entrance animations
  slideIn: {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  }, // NEVER

  // NO scale animations
  scaleUp: {
    whileHover: { scale: 1.05 },
  }, // NEVER

  // NO floating elements
  float: {
    animate: {
      y: [0, -10, 0],
      transition: { repeat: Infinity },
    },
  }, // NEVER

  // NO parallax
  parallax: {
    style: { y: scrollYProgress },
  }, // NEVER

  // NO staggered reveals
  stagger: {
    transition: { staggerChildren: 0.2 },
  }, // NEVER (if used, keep extremely fast: 0.03)

  // NO rotation
  rotate: {
    animate: { rotate: 360 },
  }, // NEVER
};
```

### Typography Mistakes

```typescript
// NEVER do these with typography:

const forbiddenTypography = {
  // NO decorative fonts
  scriptFont: 'font-dancing-script', // NEVER
  displayFont: 'font-playfair', // NEVER (serif display)

  // NO extreme weights together
  mixedWeights: 'font-thin with font-black', // NEVER in same hierarchy

  // NO colored text (except red accent)
  coloredText: 'text-blue-500', // NEVER
  gradientText: 'bg-linear-to-r bg-clip-text', // NEVER

  // NO text shadows
  textShadow: 'text-shadow', // NEVER

  // NO excessive letter spacing on body
  wideBody: 'tracking-widest', // NEVER on body text

  // NO centered body text
  centeredParagraph: 'text-center', // NEVER for body paragraphs

  // NO justified text
  justified: 'text-justify', // NEVER
};
```

### Layout Mistakes

```typescript
// NEVER structure layouts like this:

const forbiddenLayouts = {
  // NO centered everything
  allCentered: 'items-center justify-center text-center', // NEVER for whole sections

  // NO off-grid placement
  absoluteRandom: 'absolute top-[137px] left-[42px]', // NEVER

  // NO overlapping elements
  overlapping: 'z-10 -mt-20', // NEVER decoratively

  // NO cards with shadows and rounded corners
  modernCard: 'rounded-2xl shadow-xl', // NEVER

  // NO masonry layouts
  masonry: 'columns-3', // NEVER

  // NO floating action buttons
  fab: 'fixed bottom-4 right-4 rounded-full', // NEVER

  // NO hero with video background
  videoBg: '<video autoPlay muted loop />', // NEVER

  // NO carousel/slider
  carousel: '<Swiper />', // NEVER
};
```

### Content Mistakes

```typescript
// NEVER include content like this:

const forbiddenContent = {
  // NO emoji
  emoji: 'Launch your product', // NEVER with emoji

  // NO marketing superlatives
  buzzwords: 'Revolutionary AI-powered solution', // NEVER
  hyperbole: 'The #1 platform for...', // NEVER

  // NO fake testimonials with avatars
  avatarTestimonials: 'John D., CEO', // NEVER with circular avatar

  // NO decorative dividers
  waveDivider: '<WaveSvg />', // NEVER
  patternDivider: 'border-dashed', // NEVER

  // NO badge/pill components
  badge: 'inline-flex rounded-full px-3 py-1 bg-blue-100', // NEVER

  // NO progress bars/meters
  progressBar: '<Progress value={75} />', // NEVER decoratively
};
```

---

## Swiss Design Checklist

Before submitting, verify:

### Grid & Layout
- [ ] All elements align to 12-column grid
- [ ] Spacing follows 8px baseline
- [ ] Asymmetric but balanced composition
- [ ] No decorative off-grid elements
- [ ] Clear visual hierarchy through placement

### Typography
- [ ] Helvetica Neue or Inter only
- [ ] Type scale follows mathematical ratio
- [ ] Headlines are bold/black weight
- [ ] Body text is regular weight
- [ ] Labels are uppercase with wide tracking
- [ ] Left-aligned text (not centered paragraphs)

### Color
- [ ] Only black, white, grays, and ONE red
- [ ] No gradients anywhere
- [ ] High contrast ratios
- [ ] Red used sparingly as accent

### Visual Style
- [ ] No rounded corners (0 border-radius)
- [ ] No shadows
- [ ] No blur effects
- [ ] No decorative elements
- [ ] Images are grayscale by default
- [ ] Clean, sharp edges everywhere

### Animation
- [ ] Minimal to no animation
- [ ] No entrance animations for content
- [ ] No parallax effects
- [ ] No floating elements
- [ ] Only functional hover states
- [ ] Duration under 300ms

### Components
- [ ] Rectangular buttons (no rounded)
- [ ] Simple, borderless inputs
- [ ] No card shadows
- [ ] Dividers are simple lines
- [ ] No decorative icons

---

## Final Notes

Swiss Design is about **restraint** and **clarity**. Every element must earn its place. If you're unsure whether to add something, the answer is probably no.

The grid is not a suggestion-it's the foundation. Typography is not decoration-it's architecture. Color is not expression-it's function.

When implemented correctly, Swiss Design creates websites that feel timeless, professional, and supremely confident. The absence of decoration IS the statement.

Remember: Less is not just more. Less is everything.
