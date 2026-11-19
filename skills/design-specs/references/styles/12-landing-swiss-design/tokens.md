# Swiss Design / International Typographic Style Landing Page: Design Tokens

Part of the [Swiss Design / International Typographic Style Landing Page specification](index.md).

## Color System

Swiss Design uses an extremely limited palette. The constraint IS the feature.

### Color Palette Definition

```css
:root {
  /* Colours that also exist in the Tailwind theme point at it, so each value is written once, in @theme. */

  /* Primary Colors - The Swiss Palette */
  --swiss-white: var(--color-white);
  --swiss-black: var(--color-black);
  --swiss-red: var(--color-red);        /* Pure red - the ONLY accent */

  /* Functional Colors */
  --text-primary: var(--swiss-black);
  --text-secondary: var(--color-gray-600);
  --text-tertiary: var(--color-gray-400);
  --text-inverted: var(--swiss-white);

  --bg-primary: var(--swiss-white);
  --bg-secondary: var(--color-gray-100);
  --bg-inverted: var(--swiss-black);

  --border-light: var(--color-gray-200);
  --border-medium: var(--color-gray-400);
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

  /* Gray Scale - Mathematical Steps */
  --color-gray-100: #F5F5F5; /* 96% white */
  --color-gray-200: #E5E5E5; /* 90% white */
  --color-gray-300: #D4D4D4; /* 83% white */
  --color-gray-400: #A3A3A3; /* 64% white */
  --color-gray-500: #737373; /* 45% white */
  --color-gray-600: #525252; /* 32% white */
  --color-gray-700: #404040; /* 25% white */
  --color-gray-800: #262626; /* 15% white */
  --color-gray-900: #171717; /* 9% white */
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

  /* Letter Spacing */
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
  /* Clear Tailwind's default spacing scale first. The 8px scale that replaces it is under
     "Tailwind Spacing" below; a reset placed there would also clear the baseline tokens. */
  --spacing-*: initial;

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
  /* Replaces the default scale: --spacing-*: initial is declared with the grid tokens above */
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

## Global Styles

```css
/* app/globals.css */
@import "tailwindcss";
/* @theme tokens: the theme blocks above, plus the transition tokens in motion.md */

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
