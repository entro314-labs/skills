# Swiss Design / International Typographic Style Landing Page

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

```typescript
// Required dependencies
{
  "dependencies": {
    "next": "^16.4.0",
    "react": "^19.3.0",
    "react-dom": "^19.3.0",
    "motion": "^14.14.0", // Minimal use - page transitions only
    "clsx": "^2.1.0"
  },
  "devDependencies": {
    "@types/node": "^26.6.0",
    "@types/react": "^19.3.0",
    "typescript": "^7.0.0",
    "tailwindcss": "^4.3.0",
    "@tailwindcss/postcss": "^4.3.0"
  }
}
```

---

## Color System

Swiss Design uses an extremely limited palette. The constraint IS the feature.

### Color Palette Definition

```css
:root {
  /* Primary Colors - The Swiss Palette */
  --swiss-white: #FFFFFF;
  --swiss-black: #000000;
  --swiss-red: #FF0000;        /* Pure red - the ONLY accent */

  /* Gray Scale - Mathematical Steps */
  --gray-100: #F5F5F5;         /* 96% white */
  --gray-200: #E5E5E5;         /* 90% white */
  --gray-300: #D4D4D4;         /* 83% white */
  --gray-400: #A3A3A3;         /* 64% white */
  --gray-500: #737373;         /* 45% white */
  --gray-600: #525252;         /* 32% white */
  --gray-700: #404040;         /* 25% white */
  --gray-800: #262626;         /* 15% white */
  --gray-900: #171717;         /* 9% white */

  /* Functional Colors */
  --text-primary: var(--swiss-black);
  --text-secondary: var(--gray-600);
  --text-tertiary: var(--gray-400);
  --text-inverted: var(--swiss-white);

  --bg-primary: var(--swiss-white);
  --bg-secondary: var(--gray-100);
  --bg-inverted: var(--swiss-black);

  --border-light: var(--gray-200);
  --border-medium: var(--gray-400);
  --border-strong: var(--swiss-black);

  --accent: var(--swiss-red);
}
```

### Tailwind Color Configuration

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  --color-*: initial;
  --color-transparent: transparent;
  --color-current: currentColor;
  --color-white: #FFFFFF;
  --color-black: #000000;
  --color-red: #FF0000;
  --color-gray-100: #F5F5F5;
  --color-gray-200: #E5E5E5;
  --color-gray-300: #D4D4D4;
  --color-gray-400: #A3A3A3;
  --color-gray-500: #737373;
  --color-gray-600: #525252;
  --color-gray-700: #404040;
  --color-gray-800: #262626;
  --color-gray-900: #171717;
}
```

### Color Usage Rules

```typescript
// CORRECT color usage
const correctUsage = {
  // Headlines: Always black or white (inverted sections)
  headline: 'text-black', // or 'text-white' on black bg

  // Body text: Black or dark gray
  body: 'text-black', // or 'text-gray-700'

  // Secondary text: Medium gray
  secondary: 'text-gray-500',

  // Accent: ONLY red, used sparingly
  accent: 'text-red', // or 'bg-red'

  // Backgrounds: White, light gray, or black
  background: 'bg-white', // 'bg-gray-100', 'bg-black'

  // Borders: Light gray for subtle, black for strong
  border: 'border-gray-200', // or 'border-black'
};

// INCORRECT - Never do these
const incorrectUsage = {
  // NO blue, green, purple, orange, etc.
  wrongColor: 'text-blue-500', // NEVER

  // NO gradients
  gradient: 'bg-linear-to-r', // NEVER

  // NO multiple accent colors
  multiAccent: ['red', 'blue'], // NEVER - only red

  // NO tinted backgrounds
  tintedBg: 'bg-red-50', // NEVER - use pure white or gray
};
```

---

## Typography System

Typography is the HEART of Swiss Design. It must be mathematical, clear, and powerful.

### Font Stack

```css
:root {
  /* Primary Font: Helvetica Neue or Inter */
  --font-primary: 'Helvetica Neue', 'Inter', -apple-system, sans-serif;

  /* Display Font: Same family, different weight */
  --font-display: 'Helvetica Neue', 'Inter', -apple-system, sans-serif;

  /* Monospace: For numbers and data */
  --font-mono: 'SF Mono', 'JetBrains Mono', 'Consolas', monospace;
}
```

### Font Loading

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
});

// If using local Helvetica Neue
import localFont from 'next/font/local';

const helveticaNeue = localFont({
  src: [
    {
      path: '../fonts/HelveticaNeue-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/HelveticaNeue-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/HelveticaNeue-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/HelveticaNeue-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/HelveticaNeue-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-helvetica',
});
```

### Type Scale - Mathematical Progression

The type scale follows a mathematical ratio (1.333 - Perfect Fourth):

```css
:root {
  /* Base Unit */
  --type-base: 16px;

  /* Type Scale (Perfect Fourth: 1.333) */
  --type-xs: 0.75rem;      /* 12px */
  --type-sm: 0.875rem;     /* 14px */
  --type-base: 1rem;       /* 16px */
  --type-lg: 1.333rem;     /* 21.33px */
  --type-xl: 1.777rem;     /* 28.43px */
  --type-2xl: 2.369rem;    /* 37.90px */
  --type-3xl: 3.157rem;    /* 50.52px */
  --type-4xl: 4.209rem;    /* 67.34px */
  --type-5xl: 5.61rem;     /* 89.76px */
  --type-6xl: 7.478rem;    /* 119.65px */
  --type-7xl: 9.969rem;    /* 159.50px */

  /* Line Heights - Based on baseline grid */
  --leading-none: 1;
  --leading-tight: 1.1;
  --leading-snug: 1.2;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;

  /* Letter Spacing */
  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.05em;
  --tracking-wider: 0.1em;
  --tracking-widest: 0.15em;
  --tracking-ultra: 0.25em;
}
```

### Tailwind Typography Configuration

```css
/* src/app/globals.css */
@theme {
  --text-*: initial;
  --text-xs: 0.75rem;
  --text-xs--line-height: 1rem;
  --text-sm: 0.875rem;
  --text-sm--line-height: 1.25rem;
  --text-base: 1rem;
  --text-base--line-height: 1.5rem;
  --text-lg: 1.333rem;
  --text-lg--line-height: 1.75rem;
  --text-xl: 1.777rem;
  --text-xl--line-height: 2rem;
  --text-2xl: 2.369rem;
  --text-2xl--line-height: 2.5rem;
  --text-3xl: 3.157rem;
  --text-3xl--line-height: 1.1;
  --text-4xl: 4.209rem;
  --text-4xl--line-height: 1.1;
  --text-5xl: 5.61rem;
  --text-5xl--line-height: 1;
  --text-6xl: 7.478rem;
  --text-6xl--line-height: 1;
  --text-7xl: 9.969rem;
  --text-7xl--line-height: 0.9;

  --tracking-*: initial;
  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.05em;
  --tracking-wider: 0.1em;
  --tracking-widest: 0.15em;
  --tracking-ultra: 0.25em;

  --font-weight-*: initial;
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-black: 900;
}
```

### Typography Classes

```typescript
// Typography utility classes
const typographyClasses = {
  // Display Headlines - Massive, tight, uppercase
  displayXL: 'text-7xl font-black uppercase tracking-tighter leading-none',
  displayLG: 'text-6xl font-black uppercase tracking-tighter leading-none',
  displayMD: 'text-5xl font-bold uppercase tracking-tight leading-tight',

  // Headlines - Bold, tight tracking
  h1: 'text-4xl font-bold tracking-tight leading-tight',
  h2: 'text-3xl font-bold tracking-tight leading-snug',
  h3: 'text-2xl font-semibold tracking-normal leading-snug',
  h4: 'text-xl font-semibold tracking-normal leading-normal',
  h5: 'text-lg font-medium tracking-normal leading-normal',
  h6: 'text-base font-medium tracking-wide uppercase leading-normal',

  // Body Text
  bodyLG: 'text-lg font-normal tracking-normal leading-relaxed',
  body: 'text-base font-normal tracking-normal leading-relaxed',
  bodySM: 'text-sm font-normal tracking-normal leading-relaxed',
  bodyXS: 'text-xs font-normal tracking-wide leading-normal',

  // Labels & Captions
  label: 'text-xs font-medium tracking-widest uppercase leading-none',
  caption: 'text-xs font-normal tracking-wide leading-normal',
  overline: 'text-xs font-bold tracking-ultra uppercase leading-none',

  // Special Swiss Typography
  rotatedLabel: 'text-xs font-bold tracking-ultra uppercase origin-left -rotate-90',
  numberDisplay: 'font-mono text-6xl font-bold tracking-tight leading-none',
  yearDisplay: 'font-mono text-7xl font-black tracking-tighter leading-none',
};
```

### Typography Component

```tsx
// components/Typography.tsx
import { cn } from '@/lib/utils';

type TypographyVariant =
  | 'display-xl' | 'display-lg' | 'display-md'
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'body-lg' | 'body' | 'body-sm' | 'body-xs'
  | 'label' | 'caption' | 'overline';

interface TypographyProps {
  variant: TypographyVariant;
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
  uppercase?: boolean;
  inverted?: boolean;
}

const variantStyles: Record<TypographyVariant, string> = {
  'display-xl': 'text-7xl font-black tracking-tighter leading-none',
  'display-lg': 'text-6xl font-black tracking-tighter leading-none',
  'display-md': 'text-5xl font-bold tracking-tight leading-tight',
  'h1': 'text-4xl font-bold tracking-tight leading-tight',
  'h2': 'text-3xl font-bold tracking-tight leading-snug',
  'h3': 'text-2xl font-semibold tracking-normal leading-snug',
  'h4': 'text-xl font-semibold tracking-normal leading-normal',
  'h5': 'text-lg font-medium tracking-normal leading-normal',
  'h6': 'text-base font-medium tracking-wide leading-normal',
  'body-lg': 'text-lg font-normal tracking-normal leading-relaxed',
  'body': 'text-base font-normal tracking-normal leading-relaxed',
  'body-sm': 'text-sm font-normal tracking-normal leading-relaxed',
  'body-xs': 'text-xs font-normal tracking-wide leading-normal',
  'label': 'text-xs font-medium tracking-widest leading-none',
  'caption': 'text-xs font-normal tracking-wide leading-normal',
  'overline': 'text-xs font-bold tracking-ultra leading-none',
};

const defaultElements: Record<TypographyVariant, keyof JSX.IntrinsicElements> = {
  'display-xl': 'h1',
  'display-lg': 'h1',
  'display-md': 'h2',
  'h1': 'h1',
  'h2': 'h2',
  'h3': 'h3',
  'h4': 'h4',
  'h5': 'h5',
  'h6': 'h6',
  'body-lg': 'p',
  'body': 'p',
  'body-sm': 'p',
  'body-xs': 'p',
  'label': 'span',
  'caption': 'span',
  'overline': 'span',
};

export function Typography({
  variant,
  as,
  children,
  className,
  uppercase = false,
  inverted = false,
}: TypographyProps) {
  const Element = as || defaultElements[variant];

  return (
    <Element
      className={cn(
        variantStyles[variant],
        uppercase && 'uppercase',
        inverted ? 'text-white' : 'text-black',
        className
      )}
    >
      {children}
    </Element>
  );
}
```

---

## Grid System

The grid is the foundation of Swiss Design. Every element must align to the grid.

### 12-Column Grid

```css
:root {
  /* Grid Configuration */
  --grid-columns: 12;
  --grid-gutter: 24px;
  --grid-margin: 48px;
  --grid-max-width: 1440px;

  /* Baseline Grid */
  --baseline: 8px;
  --baseline-2: 16px;
  --baseline-3: 24px;
  --baseline-4: 32px;
  --baseline-5: 40px;
  --baseline-6: 48px;
  --baseline-8: 64px;
  --baseline-10: 80px;
  --baseline-12: 96px;
  --baseline-16: 128px;
  --baseline-20: 160px;
  --baseline-24: 192px;
}

/* Grid Container */
.swiss-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--grid-gutter);
  max-width: var(--grid-max-width);
  margin: 0 auto;
  padding: 0 var(--grid-margin);
}

/* Column Spans */
.col-1 { grid-column: span 1; }
.col-2 { grid-column: span 2; }
.col-3 { grid-column: span 3; }
.col-4 { grid-column: span 4; }
.col-5 { grid-column: span 5; }
.col-6 { grid-column: span 6; }
.col-7 { grid-column: span 7; }
.col-8 { grid-column: span 8; }
.col-9 { grid-column: span 9; }
.col-10 { grid-column: span 10; }
.col-11 { grid-column: span 11; }
.col-12 { grid-column: span 12; }

/* Column Start Positions */
.col-start-1 { grid-column-start: 1; }
.col-start-2 { grid-column-start: 2; }
.col-start-3 { grid-column-start: 3; }
.col-start-4 { grid-column-start: 4; }
.col-start-5 { grid-column-start: 5; }
.col-start-6 { grid-column-start: 6; }
.col-start-7 { grid-column-start: 7; }
.col-start-8 { grid-column-start: 8; }
.col-start-9 { grid-column-start: 9; }
.col-start-10 { grid-column-start: 10; }
.col-start-11 { grid-column-start: 11; }
.col-start-12 { grid-column-start: 12; }
```

### Tailwind Grid Configuration

```css
/* src/app/globals.css */
@theme {
  /* Baseline grid spacing (8px increments) */
  --spacing-baseline: 8px;
  --spacing-baseline-2: 16px;
  --spacing-baseline-3: 24px;
  --spacing-baseline-4: 32px;
  --spacing-baseline-5: 40px;
  --spacing-baseline-6: 48px;
  --spacing-baseline-8: 64px;
  --spacing-baseline-10: 80px;
  --spacing-baseline-12: 96px;
  --spacing-baseline-16: 128px;
  --spacing-baseline-20: 160px;
  --spacing-baseline-24: 192px;

  --container-swiss: 1440px;

  --gap-gutter: 24px;

  --padding-margin-x: 48px;
}
```

### Grid Container Component

```tsx
// components/SwissGrid.tsx
import { cn } from '@/lib/utils';

interface SwissGridProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function SwissGrid({ children, className, as: Element = 'div' }: SwissGridProps) {
  return (
    <Element
      className={cn(
        'grid grid-cols-12 gap-6',
        'max-w-swiss mx-auto',
        'px-6 md:px-12',
        className
      )}
    >
      {children}
    </Element>
  );
}

// Grid Column Component
interface GridColumnProps {
  children: React.ReactNode;
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  start?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  className?: string;
}

const spanClasses: Record<number, string> = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  7: 'col-span-7',
  8: 'col-span-8',
  9: 'col-span-9',
  10: 'col-span-10',
  11: 'col-span-11',
  12: 'col-span-12',
};

const startClasses: Record<number, string> = {
  1: 'col-start-1',
  2: 'col-start-2',
  3: 'col-start-3',
  4: 'col-start-4',
  5: 'col-start-5',
  6: 'col-start-6',
  7: 'col-start-7',
  8: 'col-start-8',
  9: 'col-start-9',
  10: 'col-start-10',
  11: 'col-start-11',
  12: 'col-start-12',
};

export function GridColumn({ children, span = 12, start, className }: GridColumnProps) {
  return (
    <div
      className={cn(
        spanClasses[span],
        start && startClasses[start],
        className
      )}
    >
      {children}
    </div>
  );
}
```

### Grid Visualization (Development Only)

```tsx
// components/GridOverlay.tsx
'use client';

import { useState, useEffect } from 'react';

export function GridOverlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle with Ctrl/Cmd + G
      if ((e.ctrlKey || e.metaKey) && e.key === 'g') {
        e.preventDefault();
        setVisible(v => !v);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-9999">
      {/* Column Grid */}
      <div className="max-w-swiss mx-auto h-full px-12">
        <div className="grid grid-cols-12 gap-6 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="bg-red/10 border-l border-r border-red/20"
            />
          ))}
        </div>
      </div>

      {/* Baseline Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(255,0,0,0.1) 1px, transparent 1px)',
          backgroundSize: '100% 8px',
        }}
      />
    </div>
  );
}
```

---

## Spacing System

All spacing follows the baseline grid (8px increments).

### Spacing Scale

```css
:root {
  --space-0: 0;
  --space-1: 8px;      /* 1 baseline unit */
  --space-2: 16px;     /* 2 baseline units */
  --space-3: 24px;     /* 3 baseline units */
  --space-4: 32px;     /* 4 baseline units */
  --space-5: 40px;     /* 5 baseline units */
  --space-6: 48px;     /* 6 baseline units */
  --space-8: 64px;     /* 8 baseline units */
  --space-10: 80px;    /* 10 baseline units */
  --space-12: 96px;    /* 12 baseline units */
  --space-16: 128px;   /* 16 baseline units */
  --space-20: 160px;   /* 20 baseline units */
  --space-24: 192px;   /* 24 baseline units */
  --space-32: 256px;   /* 32 baseline units */
}
```

### Tailwind Spacing

```css
/* src/app/globals.css */
@theme {
  --spacing-*: initial;
  --spacing-0: 0;
  --spacing-1: 8px;
  --spacing-2: 16px;
  --spacing-3: 24px;
  --spacing-4: 32px;
  --spacing-5: 40px;
  --spacing-6: 48px;
  --spacing-8: 64px;
  --spacing-10: 80px;
  --spacing-12: 96px;
  --spacing-16: 128px;
  --spacing-20: 160px;
  --spacing-24: 192px;
  --spacing-32: 256px;
}
```

### Section Spacing

```typescript
// Consistent section spacing
const sectionSpacing = {
  // Vertical padding between sections
  section: 'py-16 md:py-20 lg:py-24', // 128px / 160px / 192px

  // Large sections (hero, footer)
  sectionLarge: 'py-20 md:py-24 lg:py-32', // 160px / 192px / 256px

  // Compact sections
  sectionCompact: 'py-12 md:py-16', // 96px / 128px

  // Content spacing within sections
  contentGap: 'gap-8 md:gap-10 lg:gap-12', // 64px / 80px / 96px

  // Element spacing
  elementGap: 'gap-4 md:gap-6', // 32px / 48px

  // Tight spacing
  tightGap: 'gap-2 md:gap-3', // 16px / 24px
};
```

---

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

---

## Component Library

### Button Component

Swiss buttons are rectangular, with no rounded corners. They communicate through typography and color contrast.

```tsx
// components/Button.tsx
import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

// React 19: ref is a regular prop (ComponentProps<'button'> includes it), so no forwardRef
interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const variants = {
  primary: 'bg-black text-white hover:bg-gray-800',
  secondary: 'bg-red text-white hover:bg-red/90',
  ghost: 'bg-transparent text-black hover:bg-gray-100',
  outline: 'bg-transparent text-black border-2 border-black hover:bg-black hover:text-white',
};

const sizes = {
  sm: 'px-4 py-2 text-xs tracking-widest uppercase font-medium',
  md: 'px-6 py-3 text-sm tracking-widest uppercase font-medium',
  lg: 'px-8 py-4 text-base tracking-widest uppercase font-semibold',
};

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles - NO rounded corners
        'inline-flex items-center justify-center',
        'transition-colors duration-instant',
        'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:pointer-events-none',
        // Variant and size
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

### Link Component

```tsx
// components/Link.tsx
import NextLink from 'next/link';
import { cn } from '@/lib/utils';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  underline?: boolean;
  external?: boolean;
}

export function Link({
  href,
  children,
  className,
  underline = true,
  external = false,
}: LinkProps) {
  const linkClasses = cn(
    'inline-flex items-center',
    'text-black hover:text-red',
    'transition-colors duration-fast',
    underline && 'border-b border-black hover:border-red',
    className
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={linkClasses}>
      {children}
    </NextLink>
  );
}
```

### Input Component

```tsx
// components/Input.tsx
import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

interface InputProps extends ComponentProps<'input'> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-medium tracking-widest uppercase mb-2"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          // Base styles - sharp corners
          'w-full px-4 py-3',
          'bg-white text-black',
          'border-2 border-black',
          'text-base font-normal',
          // Focus state
          'focus:outline-hidden focus:ring-0 focus:border-red',
          'transition-colors duration-fast',
          // Placeholder
          'placeholder:text-gray-400',
          // Error state
          error && 'border-red',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-2 text-xs text-red font-medium">{error}</p>
      )}
    </div>
  );
}
```

### Card Component

Swiss cards have NO shadows, NO rounded corners, and rely on borders and spacing for hierarchy.

```tsx
// components/Card.tsx
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'bordered' | 'filled' | 'inverted';
}

const cardVariants = {
  default: 'bg-white',
  bordered: 'bg-white border-2 border-black',
  filled: 'bg-gray-100',
  inverted: 'bg-black text-white',
};

export function Card({ children, className, variant = 'default' }: CardProps) {
  return (
    <div
      className={cn(
        // NO rounded corners, NO shadows
        'p-6 md:p-8',
        cardVariants[variant],
        className
      )}
    >
      {children}
    </div>
  );
}

// Card Header
export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('mb-6 pb-4 border-b border-gray-200', className)}>
      {children}
    </div>
  );
}

// Card Content
export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('', className)}>{children}</div>;
}

// Card Footer
export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('mt-6 pt-4 border-t border-gray-200', className)}>
      {children}
    </div>
  );
}
```

### Divider Component

```tsx
// components/Divider.tsx
import { cn } from '@/lib/utils';

interface DividerProps {
  className?: string;
  variant?: 'light' | 'medium' | 'strong';
  orientation?: 'horizontal' | 'vertical';
}

export function Divider({
  className,
  variant = 'light',
  orientation = 'horizontal',
}: DividerProps) {
  const variants = {
    light: 'bg-gray-200',
    medium: 'bg-gray-400',
    strong: 'bg-black',
  };

  if (orientation === 'vertical') {
    return (
      <div
        className={cn(
          'w-px h-full',
          variants[variant],
          className
        )}
      />
    );
  }

  return (
    <hr
      className={cn(
        'w-full h-px border-0',
        variants[variant],
        className
      )}
    />
  );
}
```

### Rotated Label Component

A signature Swiss Design element - text rotated 90 degrees.

```tsx
// components/RotatedLabel.tsx
import { cn } from '@/lib/utils';

interface RotatedLabelProps {
  children: React.ReactNode;
  className?: string;
  position?: 'left' | 'right';
}

export function RotatedLabel({
  children,
  className,
  position = 'left',
}: RotatedLabelProps) {
  return (
    <span
      className={cn(
        'text-xs font-bold tracking-ultra uppercase',
        'whitespace-nowrap',
        position === 'left'
          ? 'origin-left -rotate-90 translate-y-full'
          : 'origin-right rotate-90 -translate-y-full',
        className
      )}
    >
      {children}
    </span>
  );
}
```

### Number Display Component

Large typographic numbers - a Swiss Design staple.

```tsx
// components/NumberDisplay.tsx
import { cn } from '@/lib/utils';

interface NumberDisplayProps {
  number: string | number;
  label?: string;
  className?: string;
  size?: 'md' | 'lg' | 'xl';
}

const sizes = {
  md: 'text-5xl',
  lg: 'text-6xl',
  xl: 'text-7xl',
};

export function NumberDisplay({
  number,
  label,
  className,
  size = 'lg',
}: NumberDisplayProps) {
  return (
    <div className={cn('', className)}>
      <span
        className={cn(
          sizes[size],
          'font-mono font-black tracking-tighter leading-none',
          'text-black'
        )}
      >
        {number}
      </span>
      {label && (
        <span className="block mt-2 text-xs font-medium tracking-widest uppercase text-gray-500">
          {label}
        </span>
      )}
    </div>
  );
}
```

---

## Section-by-Section Implementation

### 1. Navigation

Minimal, typography-focused navigation with no decorations.

```tsx
// components/Navigation.tsx
'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <nav className="max-w-swiss mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - Typography based */}
          <a
            href="/"
            className="text-lg font-bold tracking-tight uppercase"
          >
            Studio
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    'text-sm font-medium tracking-wide uppercase',
                    'text-black hover:text-red',
                    'transition-colors duration-fast'
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <a
            href="#contact"
            className={cn(
              'hidden md:inline-flex',
              'px-6 py-2',
              'bg-black text-white',
              'text-xs font-medium tracking-widest uppercase',
              'hover:bg-red transition-colors duration-fast'
            )}
          >
            Get in Touch
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 space-y-1.5">
              <span
                className={cn(
                  'block h-0.5 bg-black transition-transform duration-normal',
                  mobileOpen && 'rotate-45 translate-y-2'
                )}
              />
              <span
                className={cn(
                  'block h-0.5 bg-black transition-opacity duration-normal',
                  mobileOpen && 'opacity-0'
                )}
              />
              <span
                className={cn(
                  'block h-0.5 bg-black transition-transform duration-normal',
                  mobileOpen && '-rotate-45 -translate-y-2'
                )}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-normal',
            mobileOpen ? 'max-h-64' : 'max-h-0'
          )}
        >
          <ul className="py-4 space-y-4 border-t border-gray-200">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm font-medium tracking-wide uppercase"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
```

### 2. Hero Section

Massive typography with mathematical grid placement. Asymmetric but perfectly aligned.

```tsx
// sections/HeroSection.tsx
import { SwissGrid, GridColumn } from '@/components/SwissGrid';
import { Button } from '@/components/Button';

export function HeroSection() {
  return (
    <section className="min-h-screen pt-20 md:pt-24 pb-16 md:pb-24 flex items-center">
      <SwissGrid>
        {/* Rotated Year Label */}
        <GridColumn span={1} className="hidden lg:block relative">
          <span className="absolute bottom-0 left-0 text-xs font-bold tracking-ultra uppercase origin-bottom-left -rotate-90 whitespace-nowrap">
            Est. 2024
          </span>
        </GridColumn>

        {/* Main Headline */}
        <GridColumn span={12} start={1} className="lg:col-span-11 lg:col-start-2">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none uppercase">
            We Design
            <br />
            <span className="text-red">Digital</span>
            <br />
            Experiences
          </h1>
        </GridColumn>

        {/* Subheadline and CTA */}
        <GridColumn span={12} start={1} className="lg:col-span-5 lg:col-start-2 mt-12 md:mt-16">
          <p className="text-lg md:text-xl font-normal leading-relaxed text-gray-600 mb-8">
            A strategic design studio focused on creating meaningful digital products that solve real problems.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" size="lg">
              View Work
            </Button>
            <Button variant="outline" size="lg">
              About Us
            </Button>
          </div>
        </GridColumn>

        {/* Large Number */}
        <GridColumn span={12} start={1} className="lg:col-span-4 lg:col-start-9 mt-12 lg:mt-0 lg:self-end">
          <div className="text-right">
            <span className="block font-mono text-8xl md:text-9xl font-black tracking-tighter leading-none text-gray-100">
              01
            </span>
            <span className="block mt-2 text-xs font-medium tracking-widest uppercase text-gray-400">
              Selected Projects
            </span>
          </div>
        </GridColumn>

        {/* Bottom Border */}
        <GridColumn span={12} className="mt-16 md:mt-24">
          <div className="h-px bg-black" />
        </GridColumn>
      </SwissGrid>
    </section>
  );
}
```

### 3. Work/Projects Section

Grid-based project showcase with strong typography hierarchy.

```tsx
// sections/WorkSection.tsx
import { SwissGrid, GridColumn } from '@/components/SwissGrid';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  image: string;
}

const projects: Project[] = [
  {
    id: '1',
    number: '01',
    title: 'Minimal Banking App',
    category: 'Product Design',
    year: '2024',
    image: '/projects/project-01.jpg',
  },
  {
    id: '2',
    number: '02',
    title: 'E-Commerce Platform',
    category: 'Web Development',
    year: '2024',
    image: '/projects/project-02.jpg',
  },
  {
    id: '3',
    number: '03',
    title: 'Brand Identity System',
    category: 'Branding',
    year: '2023',
    image: '/projects/project-03.jpg',
  },
  {
    id: '4',
    number: '04',
    title: 'Mobile Health App',
    category: 'UI/UX Design',
    year: '2023',
    image: '/projects/project-04.jpg',
  },
];

export function WorkSection() {
  return (
    <section id="work" className="py-16 md:py-24 bg-white">
      <SwissGrid>
        {/* Section Header */}
        <GridColumn span={12} className="mb-12 md:mb-16">
          <div className="flex items-end justify-between border-b-2 border-black pb-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight uppercase">
              Selected Work
            </h2>
            <span className="text-xs font-bold tracking-ultra uppercase text-gray-400">
              2023-2024
            </span>
          </div>
        </GridColumn>

        {/* Projects Grid */}
        {projects.map((project, index) => (
          <GridColumn
            key={project.id}
            span={12}
            className={cn(
              'md:col-span-6',
              // Alternate large/small layout
              index % 3 === 0 && 'md:col-span-12 lg:col-span-8',
              index % 3 === 1 && 'lg:col-span-4',
              index % 3 === 2 && 'lg:col-span-6',
            )}
          >
            <a
              href={`/work/${project.id}`}
              className="group block"
            >
              {/* Project Image - Grayscale, no rounded corners */}
              <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className={cn(
                    'object-cover grayscale',
                    'transition-all duration-slow',
                    'group-hover:grayscale-0'
                  )}
                />

                {/* Project Number Overlay */}
                <span className="absolute top-4 left-4 font-mono text-4xl font-black text-white mix-blend-difference">
                  {project.number}
                </span>
              </div>

              {/* Project Info */}
              <div className="mt-4 flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight group-hover:text-red transition-colors duration-fast">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {project.category}
                  </p>
                </div>
                <span className="text-xs font-mono tracking-tight text-gray-400">
                  {project.year}
                </span>
              </div>
            </a>
          </GridColumn>
        ))}

        {/* View All Link */}
        <GridColumn span={12} className="mt-12 md:mt-16 text-center">
          <a
            href="/work"
            className={cn(
              'inline-flex items-center gap-2',
              'text-sm font-medium tracking-widest uppercase',
              'text-black hover:text-red',
              'border-b-2 border-black hover:border-red',
              'transition-colors duration-fast',
              'pb-1'
            )}
          >
            View All Projects
            <span aria-hidden>→</span>
          </a>
        </GridColumn>
      </SwissGrid>
    </section>
  );
}
```

### 4. About/Services Section

Asymmetric two-column layout with large typography and structured information.

```tsx
// sections/AboutSection.tsx
import { SwissGrid, GridColumn } from '@/components/SwissGrid';
import { NumberDisplay } from '@/components/NumberDisplay';

interface Service {
  number: string;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    number: '01',
    title: 'Strategy',
    description: 'Research, positioning, and planning to define clear objectives.',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Visual systems, interfaces, and experiences built to last.',
  },
  {
    number: '03',
    title: 'Development',
    description: 'Clean, performant code that brings designs to life.',
  },
  {
    number: '04',
    title: 'Growth',
    description: 'Optimization and iteration based on real data.',
  },
];

const stats = [
  { number: '12+', label: 'Years Experience' },
  { number: '84', label: 'Projects Delivered' },
  { number: '100%', label: 'Client Satisfaction' },
];

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-gray-100">
      <SwissGrid>
        {/* Section Label */}
        <GridColumn span={12} className="mb-8 md:mb-12">
          <span className="text-xs font-bold tracking-ultra uppercase text-red">
            About
          </span>
        </GridColumn>

        {/* Main Statement */}
        <GridColumn span={12} className="lg:col-span-8 mb-12 lg:mb-0">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            We believe in the power of systematic thinking and objective design to solve complex problems.
          </h2>
        </GridColumn>

        {/* Stats */}
        <GridColumn span={12} className="lg:col-span-4 lg:pl-8">
          <div className="grid grid-cols-3 lg:grid-cols-1 gap-8 lg:gap-6">
            {stats.map((stat) => (
              <NumberDisplay
                key={stat.label}
                number={stat.number}
                label={stat.label}
                size="md"
              />
            ))}
          </div>
        </GridColumn>

        {/* Divider */}
        <GridColumn span={12} className="my-12 md:my-16">
          <div className="h-px bg-black" />
        </GridColumn>

        {/* Services Header */}
        <GridColumn span={12} className="mb-8">
          <h3 className="text-xs font-bold tracking-ultra uppercase">
            Services
          </h3>
        </GridColumn>

        {/* Services Grid */}
        {services.map((service) => (
          <GridColumn
            key={service.number}
            span={12}
            className="md:col-span-6 lg:col-span-3"
          >
            <div className="group">
              <span className="block font-mono text-4xl font-black text-gray-200 group-hover:text-red transition-colors duration-fast">
                {service.number}
              </span>
              <h4 className="mt-4 text-xl font-semibold tracking-tight">
                {service.title}
              </h4>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          </GridColumn>
        ))}
      </SwissGrid>
    </section>
  );
}
```

### 5. Testimonials/Clients Section

Typography-forward testimonial display with client logos.

```tsx
// sections/TestimonialsSection.tsx
import { SwissGrid, GridColumn } from '@/components/SwissGrid';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

const testimonial: Testimonial = {
  quote: "Their systematic approach to design transformed how we think about our product. Every decision was intentional, every element purposeful.",
  author: "Sarah Chen",
  role: "CEO",
  company: "TechCorp",
};

const clients = [
  'Google',
  'Apple',
  'Microsoft',
  'Stripe',
  'Airbnb',
  'Spotify',
];

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-black text-white">
      <SwissGrid>
        {/* Section Label */}
        <GridColumn span={12} className="mb-12 md:mb-16">
          <span className="text-xs font-bold tracking-ultra uppercase text-red">
            Testimonial
          </span>
        </GridColumn>

        {/* Quote */}
        <GridColumn span={12} className="lg:col-span-10 lg:col-start-2">
          <blockquote>
            <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed tracking-tight">
              "{testimonial.quote}"
            </p>
            <footer className="mt-8 md:mt-12">
              <cite className="not-italic">
                <span className="block text-lg font-semibold">
                  {testimonial.author}
                </span>
                <span className="block mt-1 text-sm text-gray-400">
                  {testimonial.role}, {testimonial.company}
                </span>
              </cite>
            </footer>
          </blockquote>
        </GridColumn>

        {/* Divider */}
        <GridColumn span={12} className="my-12 md:my-16">
          <div className="h-px bg-gray-800" />
        </GridColumn>

        {/* Clients Header */}
        <GridColumn span={12} className="mb-8">
          <span className="text-xs font-bold tracking-ultra uppercase text-gray-400">
            Trusted By
          </span>
        </GridColumn>

        {/* Client Logos as Typography */}
        <GridColumn span={12}>
          <div className="flex flex-wrap gap-x-12 gap-y-6">
            {clients.map((client) => (
              <span
                key={client}
                className="text-xl md:text-2xl font-semibold tracking-tight text-gray-500 hover:text-white transition-colors duration-fast"
              >
                {client}
              </span>
            ))}
          </div>
        </GridColumn>
      </SwissGrid>
    </section>
  );
}
```

### 6. Process Section

Numbered steps with clean typography hierarchy.

```tsx
// sections/ProcessSection.tsx
import { SwissGrid, GridColumn } from '@/components/SwissGrid';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

const steps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We begin by understanding your business, users, and goals through research and stakeholder interviews.',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'We define the problem, identify opportunities, and create a roadmap for success.',
  },
  {
    number: '03',
    title: 'Design',
    description: 'We craft systematic solutions through wireframes, prototypes, and visual design.',
  },
  {
    number: '04',
    title: 'Build',
    description: 'We develop clean, scalable code that brings the design to life.',
  },
  {
    number: '05',
    title: 'Launch',
    description: 'We deploy, monitor, and iterate based on real-world data and feedback.',
  },
];

export function ProcessSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <SwissGrid>
        {/* Section Header */}
        <GridColumn span={12} className="lg:col-span-4 mb-12 lg:mb-0">
          <span className="block text-xs font-bold tracking-ultra uppercase text-red mb-4">
            Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            How We Work
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            A systematic approach to solving complex design challenges.
          </p>
        </GridColumn>

        {/* Process Steps */}
        <GridColumn span={12} className="lg:col-span-7 lg:col-start-6">
          <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
            {steps.map((step) => (
              <div
                key={step.number}
                className="group py-6 md:py-8 grid grid-cols-12 gap-4 items-start"
              >
                <span className="col-span-2 font-mono text-2xl md:text-3xl font-black text-gray-200 group-hover:text-red transition-colors duration-fast">
                  {step.number}
                </span>
                <div className="col-span-10">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </GridColumn>
      </SwissGrid>
    </section>
  );
}
```

### 7. Contact Section

Large typography CTA with minimal form.

```tsx
// sections/ContactSection.tsx
import { SwissGrid, GridColumn } from '@/components/SwissGrid';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

export function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-gray-100">
      <SwissGrid>
        {/* Section Label */}
        <GridColumn span={12} className="mb-8">
          <span className="text-xs font-bold tracking-ultra uppercase text-red">
            Contact
          </span>
        </GridColumn>

        {/* Large CTA */}
        <GridColumn span={12} className="lg:col-span-8 mb-12 lg:mb-0">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none uppercase">
            Let's Work
            <br />
            Together
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
            Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you within 24 hours.
          </p>
        </GridColumn>

        {/* Contact Info */}
        <GridColumn span={12} className="lg:col-span-4">
          <div className="space-y-8">
            <div>
              <span className="block text-xs font-bold tracking-ultra uppercase text-gray-400 mb-2">
                Email
              </span>
              <a
                href="mailto:hello@studio.com"
                className="text-xl font-semibold hover:text-red transition-colors duration-fast"
              >
                hello@studio.com
              </a>
            </div>
            <div>
              <span className="block text-xs font-bold tracking-ultra uppercase text-gray-400 mb-2">
                Phone
              </span>
              <a
                href="tel:+1234567890"
                className="text-xl font-semibold hover:text-red transition-colors duration-fast"
              >
                +1 (234) 567-890
              </a>
            </div>
            <div>
              <span className="block text-xs font-bold tracking-ultra uppercase text-gray-400 mb-2">
                Address
              </span>
              <address className="not-italic text-gray-600 leading-relaxed">
                123 Design Street
                <br />
                Zurich, Switzerland
              </address>
            </div>
          </div>
        </GridColumn>

        {/* Divider */}
        <GridColumn span={12} className="my-12 md:my-16">
          <div className="h-px bg-black" />
        </GridColumn>

        {/* Contact Form */}
        <GridColumn span={12} className="lg:col-span-8">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Name"
                name="name"
                placeholder="Your name"
                required
              />
              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
              />
            </div>
            <Input
              label="Subject"
              name="subject"
              placeholder="Project inquiry"
            />
            <div>
              <label
                htmlFor="message"
                className="block text-xs font-medium tracking-widest uppercase mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder="Tell us about your project..."
                className="w-full px-4 py-3 bg-white text-black border-2 border-black focus:outline-hidden focus:border-red transition-colors duration-fast placeholder:text-gray-400 resize-none"
                required
              />
            </div>
            <Button type="submit" variant="primary" size="lg">
              Send Message
            </Button>
          </form>
        </GridColumn>
      </SwissGrid>
    </section>
  );
}
```

### 8. Footer

Minimal, information-dense footer with clear grid structure.

```tsx
// components/Footer.tsx
import { SwissGrid, GridColumn } from '@/components/SwissGrid';

const footerLinks = {
  work: [
    { label: 'All Projects', href: '/work' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Archive', href: '/archive' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Team', href: '/team' },
    { label: 'Careers', href: '/careers' },
  ],
  connect: [
    { label: 'Twitter', href: 'https://twitter.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Dribbble', href: 'https://dribbble.com' },
  ],
};

export function Footer() {
  return (
    <footer className="py-12 md:py-16 bg-black text-white">
      <SwissGrid>
        {/* Logo and Tagline */}
        <GridColumn span={12} className="lg:col-span-4 mb-12 lg:mb-0">
          <a href="/" className="text-2xl font-bold tracking-tight uppercase">
            Studio
          </a>
          <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-xs">
            A strategic design studio focused on creating meaningful digital products.
          </p>
        </GridColumn>

        {/* Links */}
        <GridColumn span={4} className="lg:col-span-2 lg:col-start-7">
          <span className="block text-xs font-bold tracking-ultra uppercase text-gray-400 mb-4">
            Work
          </span>
          <ul className="space-y-3">
            {footerLinks.work.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-gray-300 hover:text-white transition-colors duration-fast"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </GridColumn>

        <GridColumn span={4} className="lg:col-span-2">
          <span className="block text-xs font-bold tracking-ultra uppercase text-gray-400 mb-4">
            Company
          </span>
          <ul className="space-y-3">
            {footerLinks.company.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-gray-300 hover:text-white transition-colors duration-fast"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </GridColumn>

        <GridColumn span={4} className="lg:col-span-2">
          <span className="block text-xs font-bold tracking-ultra uppercase text-gray-400 mb-4">
            Connect
          </span>
          <ul className="space-y-3">
            {footerLinks.connect.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-300 hover:text-white transition-colors duration-fast"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </GridColumn>

        {/* Bottom Bar */}
        <GridColumn span={12} className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Studio. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="/privacy"
                className="text-xs text-gray-500 hover:text-white transition-colors duration-fast"
              >
                Privacy
              </a>
              <a
                href="/terms"
                className="text-xs text-gray-500 hover:text-white transition-colors duration-fast"
              >
                Terms
              </a>
            </div>
          </div>
        </GridColumn>
      </SwissGrid>
    </footer>
  );
}
```

---

## Complete Page Assembly

```tsx
// app/page.tsx
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/sections/HeroSection';
import { WorkSection } from '@/sections/WorkSection';
import { AboutSection } from '@/sections/AboutSection';
import { TestimonialsSection } from '@/sections/TestimonialsSection';
import { ProcessSection } from '@/sections/ProcessSection';
import { ContactSection } from '@/sections/ContactSection';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <WorkSection />
        <AboutSection />
        <TestimonialsSection />
        <ProcessSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
```

---

## Global Styles

```css
/* app/globals.css */
@import "tailwindcss";
/* @theme tokens: see the Tailwind theme blocks above */

@layer base {
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scroll-behavior: auto; /* NO smooth scroll in Swiss Design */
  }

  body {
    font-family: var(--font-inter), 'Helvetica Neue', -apple-system, sans-serif;
    font-weight: 400;
    line-height: 1.5;
    color: #000000;
    background-color: #FFFFFF;
  }

  /* Selection */
  ::selection {
    background-color: #FF0000;
    color: #FFFFFF;
  }

  /* Focus styles */
  :focus-visible {
    outline: 2px solid #000000;
    outline-offset: 2px;
  }

  /* Scrollbar - minimal */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #F5F5F5;
  }

  ::-webkit-scrollbar-thumb {
    background: #000000;
  }

  /* Images - grayscale by default */
  img {
    max-width: 100%;
    height: auto;
  }
}

/* Hide scrollbar but keep functionality */
@utility scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}
```

---

## Responsive Behavior

Swiss Design maintains its principles across all screen sizes through systematic adaptation.

```typescript
// Responsive breakpoint usage
const responsivePatterns = {
  // Typography scales down systematically
  headline: {
    base: 'text-4xl',    // Mobile: 42px
    md: 'md:text-5xl',   // Tablet: 56px
    lg: 'lg:text-6xl',   // Desktop: 75px
    xl: 'xl:text-7xl',   // Large: 100px
  },

  // Grid columns reduce
  gridLayout: {
    base: 'col-span-12',          // Mobile: full width
    md: 'md:col-span-6',          // Tablet: half
    lg: 'lg:col-span-4',          // Desktop: third
  },

  // Spacing reduces proportionally
  sectionPadding: {
    base: 'py-12',       // Mobile: 96px
    md: 'md:py-16',      // Tablet: 128px
    lg: 'lg:py-24',      // Desktop: 192px
  },

  // Grid margins
  gridMargin: {
    base: 'px-4',        // Mobile: 32px
    md: 'md:px-8',       // Tablet: 64px
    lg: 'lg:px-12',      // Desktop: 96px
  },
};
```

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
