# Swiss Design / International Typographic Style Landing Page: Motion

Part of the [Swiss Design / International Typographic Style Landing Page specification](index.md).

## Motion & Animation

Swiss Design uses **minimal to no animation**. Movement is only for **function**, never decoration.

### Animation Philosophy

```typescript
// Swiss Design animation rules:
// 1. Animation should be INVISIBLE - user shouldn't notice it
// 2. Only animate for functional feedback (hover, state change)
// 3. Use LINEAR or EASE - no bouncy springs
// 4. Duration should be SHORT - 150ms to 300ms max
// 5. NO entrance animations for content
// 6. NO parallax effects
// 7. NO floating elements
```

### Transition Configuration

```css
:root {
  /* Functional transitions only */
  --transition-instant: 100ms linear;
  --transition-fast: 150ms ease;
  --transition-normal: 200ms ease;
  --transition-slow: 300ms ease;

  /* Timing functions - simple and direct */
  --ease-default: ease;
  --ease-in: ease-in;
  --ease-out: ease-out;
  --ease-linear: linear;
}
```

### Tailwind Transition Configuration

```css
/* src/app/globals.css */
@theme {
  --transition-duration-instant: 100ms;
  --transition-duration-fast: 150ms;
  --transition-duration-normal: 200ms;
  --transition-duration-slow: 300ms;

  --ease-swiss: ease;
}
```

### Allowed Animations

```typescript
// The ONLY animations allowed in Swiss Design

// 1. Hover state feedback
const hoverTransition = {
  className: 'transition-colors duration-fast',
  // Example: Link color change on hover
};

// 2. Focus state feedback
const focusTransition = {
  className: 'transition-all duration-fast',
  // Example: Input border change on focus
};

// 3. Button state feedback
const buttonTransition = {
  className: 'transition-colors duration-instant',
  // Example: Background color change
};

// 4. Page transitions (if absolutely necessary)
const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2, ease: 'linear' },
};
```

### Motion Configuration

```tsx
// lib/motion.ts
import { Variants, Transition } from 'motion/react';

// The ONLY transition style for Swiss Design
export const swissTransition: Transition = {
  duration: 0.2,
  ease: 'linear',
};

// Page transition variants (minimal)
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: swissTransition,
  },
  exit: {
    opacity: 0,
    transition: swissTransition,
  },
};

// Stagger children (if needed)
export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.05, // Very fast stagger
    },
  },
};

// Simple fade (the only content animation allowed)
export const fadeIn: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: 'linear',
    },
  },
};
```

### What NOT to Animate

```typescript
// NEVER animate these in Swiss Design:

const forbiddenAnimations = [
  // NO spring physics
  { type: 'spring' }, // NEVER

  // NO bouncy easing
  { ease: 'backOut' }, // NEVER
  { ease: [0.175, 0.885, 0.32, 1.275] }, // NEVER (overshoot)

  // NO translate/scale entrance
  { y: 20 }, // NEVER - content doesn't slide in
  { scale: 0.95 }, // NEVER - content doesn't scale in

  // NO parallax
  { scrollYProgress }, // NEVER

  // NO floating/continuous animation
  { animate: { y: [0, -10, 0] } }, // NEVER

  // NO rotation animations
  { rotate: 360 }, // NEVER

  // NO blur/filter animations
  { filter: 'blur(10px)' }, // NEVER

  // NO 3D transforms
  { rotateX: 15 }, // NEVER
  { perspective: 1000 }, // NEVER
];
```

### Scroll Behavior

```css
/* Simple, instant scroll - no smooth scrolling */
html {
  scroll-behavior: auto; /* NOT smooth */
}

/* If anchor links are needed, use minimal scroll */
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}
```
