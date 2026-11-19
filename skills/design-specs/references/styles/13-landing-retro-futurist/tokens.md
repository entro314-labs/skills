# Retro-Futurist Landing Page: Design Tokens

Part of the [Retro-Futurist Landing Page specification](index.md).

## Color System

The Retro-Futurist palette combines deep space tones with vibrant atomic-age accents.

### Color Palette Definition

```css
:root {
  /* Colours that also exist in the Tailwind theme point at it, so each value is written once, in @theme. */

  /* Accent - Retro Orange (PRIMARY ACCENT) */
  --retro-orange: var(--color-orange);
  --retro-orange-light: var(--color-orange-light);
  --retro-orange-dark: var(--color-orange-dark);

  /* Accent - Atomic Teal */
  --atomic-teal: var(--color-teal);
  --atomic-teal-light: var(--color-teal-light);
  --atomic-teal-dark: var(--color-teal-dark);

  /* Text Colors */
  --text-cream: var(--color-cream-text);
  --text-white: var(--color-white);
  --text-dark: var(--color-space-navy);

  /* Functional */
  --background-primary: var(--color-space-navy);
  --background-secondary: var(--color-cosmic-blue);
  --foreground: var(--text-cream);
  --accent-primary: var(--retro-orange);
  --accent-secondary: var(--atomic-teal);
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
  /* Space Navy */
  --color-space-navy: #0D1B2A;
  --color-space-navy-light: #1B3A5F;
  --color-space-navy-dark: #06101A;
  /* Cosmic Blue */
  --color-cosmic-blue: #1B3A5F;
  --color-cosmic-blue-light: #2E5A8C;
  --color-cosmic-blue-dark: #0F2540;
  /* Retro Orange */
  --color-orange: #F77F00;
  --color-orange-light: #FFA033;
  --color-orange-dark: #CC6600;
  /* Atomic Teal */
  --color-teal: #00B4D8;
  --color-teal-light: #48CAE4;
  --color-teal-dark: #0096B4;
  /* Warm Accents */
  --color-cream: #EAE2B7;
  --color-gold: #E9C46A;
  --color-coral: #E76F51;
  /* Text */
  --color-white: #FAFAFA;
  --color-cream-text: #E0E1DD;
}
```

### Gradient Definitions

```css
:root {
  /* Colours that also exist in the Tailwind theme point at it, so each value is written once, in @theme. */

  /* Space Gradient - Primary Background */
  --gradient-space: linear-gradient(
    180deg,
    var(--color-space-navy) 0%,
    var(--color-cosmic-blue) 50%,
    var(--atomic-teal) 100%
  );

  /* Sunset Gradient - Hero Backgrounds */
  --gradient-sunset: linear-gradient(
    180deg,
    var(--retro-orange) 0%,
    var(--color-coral) 50%,
    var(--color-space-navy) 100%
  );

  /* Horizon Gradient - Section Transitions */
  --gradient-horizon: linear-gradient(
    90deg,
    var(--color-space-navy) 0%,
    var(--color-cosmic-blue-light) 50%,
    var(--color-space-navy) 100%
  );

  /* Atomic Glow - Accent Elements */
  --gradient-atomic: linear-gradient(
    135deg,
    var(--atomic-teal) 0%,
    var(--atomic-teal-dark) 100%
  );

  /* Orange Burst - CTA Elements */
  --gradient-burst: linear-gradient(
    135deg,
    var(--retro-orange-light) 0%,
    var(--retro-orange) 50%,
    var(--retro-orange-dark) 100%
  );
}
```

### Tailwind Gradient Configuration

```css
/* src/app/globals.css */
@theme {
  --background-image-gradient-space: linear-gradient(180deg, #0D1B2A 0%, #1B3A5F 50%, #00B4D8 100%);
  --background-image-gradient-sunset: linear-gradient(180deg, #F77F00 0%, #E76F51 50%, #0D1B2A 100%);
  --background-image-gradient-horizon: linear-gradient(90deg, #0D1B2A 0%, #2E5A8C 50%, #0D1B2A 100%);
  --background-image-gradient-atomic: linear-gradient(135deg, #00B4D8 0%, #0096B4 100%);
  --background-image-gradient-burst: linear-gradient(135deg, #FFA033 0%, #F77F00 50%, #CC6600 100%);
}
```

---

## Typography System

Typography is BOLD, GEOMETRIC, and WIDE-TRACKED. Think Futura, not Helvetica.

### Font Stack

```css
:root {
  /* Display Font - Geometric Sans */
  --font-display: var(--font-space-grotesk), 'Futura', 'Avant Garde Gothic', sans-serif;

  /* Body Font - Readable Geometric */
  --font-body: var(--font-inter), 'Jost', sans-serif;

  /* Mono Font - Retro Numbers */
  --font-mono: var(--font-space-mono), 'JetBrains Mono', monospace;
}
```

### Font Loading

```typescript
// app/layout.tsx
import { Space_Grotesk, Space_Mono, Inter } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${spaceMono.variable} ${inter.variable}`}>
      <body className="font-body bg-space-navy text-cream-text">
        {children}
      </body>
    </html>
  );
}
```

### Type Scale

```css
:root {
  /* Type Scale */
  --type-xs: 0.75rem;      /* 12px */
  --type-sm: 0.875rem;     /* 14px */
  --type-base: 1rem;       /* 16px */
  --type-lg: 1.25rem;      /* 20px */
  --type-xl: 1.5rem;       /* 24px */
  --type-2xl: 2rem;        /* 32px */
  --type-3xl: 2.5rem;      /* 40px */
  --type-4xl: 3.5rem;      /* 56px */
  --type-5xl: 4.5rem;      /* 72px */
  --type-6xl: 6rem;        /* 96px */
  --type-7xl: 8rem;        /* 128px */

  /* Line Heights */
  --leading-none: 1;
  --leading-tight: 1.1;
  --leading-snug: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
}
```

### Tailwind Typography Configuration

```css
/* src/app/globals.css */
@theme {
  --font-*: initial;

  --text-*: initial;
  --text-xs: 0.75rem;
  --text-xs--line-height: 1rem;
  --text-sm: 0.875rem;
  --text-sm--line-height: 1.25rem;
  --text-base: 1rem;
  --text-base--line-height: 1.5rem;
  --text-lg: 1.25rem;
  --text-lg--line-height: 1.75rem;
  --text-xl: 1.5rem;
  --text-xl--line-height: 2rem;
  --text-2xl: 2rem;
  --text-2xl--line-height: 2.25rem;
  --text-3xl: 2.5rem;
  --text-3xl--line-height: 1.1;
  --text-4xl: 3.5rem;
  --text-4xl--line-height: 1.1;
  --text-5xl: 4.5rem;
  --text-5xl--line-height: 1;
  --text-6xl: 6rem;
  --text-6xl--line-height: 1;
  --text-7xl: 8rem;
  --text-7xl--line-height: 0.9;

  --tracking-*: initial;

  /* Letter Spacing - Key to Retro Feel */
  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.05em;
  --tracking-wider: 0.1em;
  --tracking-widest: 0.15em;
  --tracking-ultra: 0.25em;
  --tracking-mega: 0.35em;
}

@theme inline {
  --font-display: var(--font-space-grotesk), Futura, sans-serif;
  --font-body: var(--font-inter), Inter, sans-serif;
  --font-mono: var(--font-space-mono), "Space Mono", monospace;
}
```

### Typography Classes

```typescript
// Typography utility classes - Retro Futurist style
const typographyClasses = {
  // Display Headlines - MASSIVE, WIDE-TRACKED, UPPERCASE
  displayXL: 'font-display text-7xl font-bold uppercase tracking-ultra leading-none',
  displayLG: 'font-display text-6xl font-bold uppercase tracking-widest leading-none',
  displayMD: 'font-display text-5xl font-bold uppercase tracking-widest leading-tight',

  // Section Headlines
  h1: 'font-display text-4xl font-bold uppercase tracking-widest leading-tight',
  h2: 'font-display text-3xl font-bold uppercase tracking-wider leading-snug',
  h3: 'font-display text-2xl font-semibold uppercase tracking-wider leading-snug',
  h4: 'font-display text-xl font-semibold uppercase tracking-wide leading-normal',
  h5: 'font-display text-lg font-medium uppercase tracking-wide leading-normal',
  h6: 'font-display text-base font-medium uppercase tracking-widest leading-normal',

  // Body Text
  bodyLG: 'font-body text-lg font-normal tracking-wide leading-relaxed',
  body: 'font-body text-base font-normal tracking-wide leading-relaxed',
  bodySM: 'font-body text-sm font-normal tracking-wide leading-relaxed',

  // Labels & Captions - Wide tracking is KEY
  label: 'font-display text-xs font-semibold tracking-mega uppercase',
  caption: 'font-body text-xs font-normal tracking-wider leading-normal',
  overline: 'font-display text-xs font-bold tracking-mega uppercase',

  // Special Retro Elements
  countdown: 'font-mono text-6xl font-bold tracking-tight leading-none',
  missionLabel: 'font-mono text-sm font-bold tracking-widest uppercase',
  statNumber: 'font-display text-5xl font-bold tracking-tight leading-none',
};
```

### Typography Component

```tsx
// components/Typography.tsx
import { cn } from '@/lib/utils';

type TypographyVariant =
  | 'display-xl' | 'display-lg' | 'display-md'
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'body-lg' | 'body' | 'body-sm'
  | 'label' | 'caption' | 'overline'
  | 'countdown' | 'mission-label' | 'stat-number';

interface TypographyProps {
  variant: TypographyVariant;
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  outline?: boolean;
}

const variantStyles: Record<TypographyVariant, string> = {
  'display-xl': 'font-display text-7xl font-bold uppercase tracking-ultra leading-none',
  'display-lg': 'font-display text-6xl font-bold uppercase tracking-widest leading-none',
  'display-md': 'font-display text-5xl font-bold uppercase tracking-widest leading-tight',
  'h1': 'font-display text-4xl font-bold uppercase tracking-widest leading-tight',
  'h2': 'font-display text-3xl font-bold uppercase tracking-wider leading-snug',
  'h3': 'font-display text-2xl font-semibold uppercase tracking-wider leading-snug',
  'h4': 'font-display text-xl font-semibold uppercase tracking-wide leading-normal',
  'h5': 'font-display text-lg font-medium uppercase tracking-wide leading-normal',
  'h6': 'font-display text-base font-medium uppercase tracking-widest leading-normal',
  'body-lg': 'font-body text-lg font-normal tracking-wide leading-relaxed',
  'body': 'font-body text-base font-normal tracking-wide leading-relaxed',
  'body-sm': 'font-body text-sm font-normal tracking-wide leading-relaxed',
  'label': 'font-display text-xs font-semibold tracking-mega uppercase',
  'caption': 'font-body text-xs font-normal tracking-wider leading-normal',
  'overline': 'font-display text-xs font-bold tracking-mega uppercase',
  'countdown': 'font-mono text-6xl font-bold tracking-tight leading-none',
  'mission-label': 'font-mono text-sm font-bold tracking-widest uppercase',
  'stat-number': 'font-display text-5xl font-bold tracking-tight leading-none',
};

export function Typography({
  variant,
  as,
  children,
  className,
  glow = false,
  outline = false,
}: TypographyProps) {
  const Element = as || 'span';

  return (
    <Element
      className={cn(
        variantStyles[variant],
        glow && 'drop-shadow-[0_0_20px_rgba(247,127,0,0.5)]',
        outline && 'text-transparent bg-clip-text bg-linear-to-r from-cream to-cream [-webkit-text-stroke:2px_#E0E1DD]',
        className
      )}
    >
      {children}
    </Element>
  );
}
```

### Text Effects

```css
/* Retro text effects */
.text-glow-orange {
  text-shadow:
    0 0 10px rgba(247, 127, 0, 0.5),
    0 0 20px rgba(247, 127, 0, 0.3),
    0 0 40px rgba(247, 127, 0, 0.2);
}

.text-glow-teal {
  text-shadow:
    0 0 10px rgba(0, 180, 216, 0.5),
    0 0 20px rgba(0, 180, 216, 0.3),
    0 0 40px rgba(0, 180, 216, 0.2);
}

.text-shadow-retro {
  text-shadow:
    3px 3px 0 #F77F00,
    6px 6px 0 rgba(0, 0, 0, 0.3);
}

.text-outline-cream {
  color: transparent;
  -webkit-text-stroke: 2px #E0E1DD;
}

.text-outline-orange {
  color: transparent;
  -webkit-text-stroke: 2px #F77F00;
}
```

---

## Spacing System

```css
:root {
  /* Spacing Scale */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-32: 128px;
  --space-40: 160px;
}
```

### Section Spacing

```typescript
const sectionSpacing = {
  // Large sections (hero, CTA)
  sectionLarge: 'py-24 md:py-32 lg:py-40', // 96px / 128px / 160px

  // Standard sections
  section: 'py-16 md:py-24 lg:py-32', // 64px / 96px / 128px

  // Compact sections
  sectionCompact: 'py-12 md:py-16 lg:py-20', // 48px / 64px / 80px

  // Content gaps
  contentGap: 'gap-8 md:gap-12 lg:gap-16', // 32px / 48px / 64px
};
```

---

## Global Styles

```css
/* app/globals.css */
/* Continues globals.css, after the @import "tailwindcss" line and the @theme blocks above */

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
  }

  body {
    font-family: var(--font-body);
    background-color: #0D1B2A;
    color: #E0E1DD;
    overflow-x: hidden;
  }

  /* Selection */
  ::selection {
    background-color: #F77F00;
    color: #0D1B2A;
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #0D1B2A;
  }

  ::-webkit-scrollbar-thumb {
    background: #1B3A5F;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #00B4D8;
  }
}

/* Clip paths */
@utility clip-path-angled {
  clip-path: polygon(8% 0, 100% 0, 92% 100%, 0 100%);
}

@utility clip-path-chevron {
  clip-path: polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%);
}

/* Text effects */
@utility text-glow-orange {
  text-shadow:
    0 0 10px rgba(247, 127, 0, 0.5),
    0 0 20px rgba(247, 127, 0, 0.3),
    0 0 40px rgba(247, 127, 0, 0.2);
}

@utility text-glow-teal {
  text-shadow:
    0 0 10px rgba(0, 180, 216, 0.5),
    0 0 20px rgba(0, 180, 216, 0.3),
    0 0 40px rgba(0, 180, 216, 0.2);
}
```
