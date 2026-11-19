# Japanese Minimalist Landing Page - Exhaustive Technical Specification

A landing page inspired by Japanese design principles: Ma (negative space), Wabi-sabi (beauty in imperfection), and Kanso (simplicity). This is NOT generic minimalism - it's intentional restraint where space itself is a design element.

---

## Output Requirements

- **Framework**: Next.js with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom configuration
- **Animation**: Motion (extremely subtle - nearly imperceptible)
- **Smooth Scroll**: Lenis (very slow lerp: 0.05)
- **Output**: Single page component with all sections

---

## Page Structure Overview

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER (nearly invisible - small text, extreme margins)        │
│                                                                 │
│  nav items                              logo mark               │
│  (10px, uppercase, tracked)             (simple line icon)      │
└─────────────────────────────────────────────────────────────────┘

                              (200px space)

┌─────────────────────────────────────────────────────────────────┐
│  HERO - Asymmetric Typography                                   │
│                                                                 │
│     ┌─────────────────┐                                         │
│     │                 │                                         │
│     │   LESS          │                                         │
│     │   IS            │                                         │
│     │   MORE          │         (massive negative space)        │
│     │                 │                                         │
│     │   subtitle      │                                         │
│     │   (small)       │                                         │
│     │                 │                                         │
│     │   [Explore]     │                                         │
│     └─────────────────┘                                         │
│                                                                 │
│  left: 15%                                                      │
└─────────────────────────────────────────────────────────────────┘

                              (200px space)

┌─────────────────────────────────────────────────────────────────┐
│  PHILOSOPHY - Single Statement                                  │
│                                                                 │
│                                                                 │
│              "The space between things                          │
│               is as important as                                │
│               the things themselves."                           │
│                                                                 │
│                     - attribution                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

                              (200px space)

┌─────────────────────────────────────────────────────────────────┐
│  FEATURE 1 - Image Left, Text Right (Wide Gap)                  │
│                                                                 │
│  ┌──────────────┐                 ┌─────────────────────────┐   │
│  │              │                 │  01                     │   │
│  │   [image]    │     120px gap   │                         │   │
│  │   grayscale  │                 │  FEATURE TITLE          │   │
│  │              │                 │                         │   │
│  │              │                 │  Description text with  │   │
│  └──────────────┘                 │  generous line height   │   │
│                                   │  and letter spacing.    │   │
│                                   └─────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘

                              (200px space)

┌─────────────────────────────────────────────────────────────────┐
│  FEATURE 2 - Text Left, Image Right (Reversed)                  │
│                                                                 │
│  ┌─────────────────────────┐                 ┌──────────────┐   │
│  │  02                     │                 │              │   │
│  │                         │     120px gap   │   [image]    │   │
│  │  FEATURE TITLE          │                 │   grayscale  │   │
│  │                         │                 │              │   │
│  │  Description text       │                 │              │   │
│  │  continues here.        │                 └──────────────┘   │
│  └─────────────────────────┘                                    │
└─────────────────────────────────────────────────────────────────┘

                              (200px space)

┌─────────────────────────────────────────────────────────────────┐
│  VERTICAL ACCENT - Side Text                                    │
│                                                                 │
│  │ 本                                                           │
│  │ 質  ──────────────────────────────────────────────────────   │
│  │ 的                                                           │
│  │                       Horizontal divider line                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

                              (200px space)

┌─────────────────────────────────────────────────────────────────┐
│  FEATURE 3 - Full Width Image with Overlay Text                 │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                         │    │
│  │                    [full bleed image]                   │    │
│  │                       grayscale                         │    │
│  │                                                         │    │
│  │         Small caption text                              │    │
│  │         bottom left                                     │    │
│  │                                                         │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

                              (200px space)

┌─────────────────────────────────────────────────────────────────┐
│  PRINCIPLES - Three Concepts                                    │
│                                                                 │
│      間                    簡素                   侘寂           │
│      MA                   KANSO                 WABI-SABI       │
│                                                                 │
│   Negative space      Simplicity             Imperfection       │
│   as presence         as clarity             as beauty          │
│                                                                 │
│   Brief description   Brief description      Brief description  │
│   with generous       continues with         ends here with     │
│   line height.        same styling.          same pattern.      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

                              (200px space)

┌─────────────────────────────────────────────────────────────────┐
│  TESTIMONIAL - Single Voice                                     │
│                                                                 │
│                                                                 │
│         "The simplicity brought clarity                         │
│          to everything we do."                                  │
│                                                                 │
│                                                                 │
│              Name                                               │
│              Role, Company                                      │
│                                                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

                              (200px space)

┌─────────────────────────────────────────────────────────────────┐
│  CTA - Minimal Call to Action                                   │
│                                                                 │
│                                                                 │
│              Begin your journey                                 │
│                                                                 │
│                 [Start]                                         │
│                                                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

                              (200px space)

┌─────────────────────────────────────────────────────────────────┐
│  FOOTER - Understated                                           │
│                                                                 │
│  Brand                                                          │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  Links (tiny)                              Social (icons only)  │
│                                                                 │
│                        © 2024                                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Color System

### CSS Custom Properties

```css
:root {
  /* Base - Rice Paper Whites */
  --washi: #FAF9F7;
  --washi-warm: #F5F3EF;
  --washi-cool: #FAFBFA;

  /* Ink - Sumi Blacks */
  --sumi: #1A1A1A;
  --sumi-soft: #2D2D2D;
  --sumi-light: #666666;
  --sumi-faint: #999999;

  /* Accent - Vermillion (Shu) */
  --vermillion: #C7372F;
  --vermillion-dark: #A62D27;

  /* Secondary - Forest (Matsu) */
  --matsu: #2D5A4A;
  --matsu-light: #3D7A64;

  /* Neutral - Stone (Ishi) */
  --ishi: #8B8680;
  --ishi-light: #B5B0A8;
  --ishi-dark: #5C5955;

  /* Natural - Wood (Ki) */
  --ki: #C4A77D;
  --ki-light: #D9C9A8;
  --ki-dark: #A68B5B;

  /* Borders */
  --border-subtle: rgba(26, 26, 26, 0.08);
  --border-medium: rgba(26, 26, 26, 0.15);
}
```

### Tailwind Theme

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  --color-washi: #FAF9F7;
  --color-washi-warm: #F5F3EF;
  --color-washi-cool: #FAFBFA;
  --color-sumi: #1A1A1A;
  --color-sumi-soft: #2D2D2D;
  --color-sumi-light: #666666;
  --color-sumi-faint: #999999;
  --color-vermillion: #C7372F;
  --color-vermillion-dark: #A62D27;
  --color-matsu: #2D5A4A;
  --color-matsu-light: #3D7A64;
  --color-ishi: #8B8680;
  --color-ishi-light: #B5B0A8;
  --color-ishi-dark: #5C5955;
  --color-ki: #C4A77D;
  --color-ki-light: #D9C9A8;
  --color-ki-dark: #A68B5B;

  --text-display-xl: clamp(48px, 8vw, 120px);
  --text-display-xl--line-height: 1.0;
  --text-display-xl--letter-spacing: -0.02em;
  --text-display-lg: clamp(36px, 5vw, 72px);
  --text-display-lg--line-height: 1.1;
  --text-display-lg--letter-spacing: -0.01em;
  --text-display-md: clamp(28px, 4vw, 48px);
  --text-display-md--line-height: 1.2;
  --text-display-md--letter-spacing: 0;
  --text-body-lg: 18px;
  --text-body-lg--line-height: 1.9;
  --text-body-lg--letter-spacing: 0.02em;
  --text-body: 16px;
  --text-body--line-height: 1.9;
  --text-body--letter-spacing: 0.02em;
  --text-body-sm: 14px;
  --text-body-sm--line-height: 1.8;
  --text-body-sm--letter-spacing: 0.02em;
  --text-caption: 11px;
  --text-caption--line-height: 1.6;
  --text-caption--letter-spacing: 0.15em;
  --text-label: 10px;
  --text-label--line-height: 1.5;
  --text-label--letter-spacing: 0.2em;

  --spacing-ma-xs: 40px;
  --spacing-ma-sm: 80px;
  --spacing-ma-md: 120px;
  --spacing-ma-lg: 200px;
  --spacing-ma-xl: 280px;

  --container-content-narrow: 480px;
  --container-content: 640px;
  --container-content-wide: 800px;
  --container-container: 1200px;
  --container-container-wide: 1400px;

  --ease-zen: cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-settle: cubic-bezier(0.22, 1, 0.36, 1);
}

@theme inline {
  --font-sans: var(--font-inter), system-ui, sans-serif;
  --font-display: var(--font-cormorant), Georgia, serif;
}

/* No theme entry needed in v4: font-thin, font-extralight, font-light, font-normal, duration-800, duration-1000, duration-1200, duration-1500, duration-2000 */
```

---

## Typography System

### Font Loading

```typescript
// src/app/layout.tsx
import { Inter, Cormorant } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400'],
  display: 'swap',
});

const cormorant = Cormorant({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="bg-washi text-sumi font-sans font-light antialiased">
        {children}
      </body>
    </html>
  );
}
```

### Typography Utility Classes

```css
/* src/app/globals.css */
@import "tailwindcss";
/* @theme tokens: see the Tailwind theme blocks above */

@layer base {
  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background-color: var(--washi);
    color: var(--sumi);
    font-family: var(--font-inter);
    font-weight: 300;
    line-height: 1.9;
    letter-spacing: 0.02em;
  }

  ::selection {
    background-color: var(--vermillion);
    color: var(--washi);
  }
}

@layer components {
  /* Display Typography - Light Weight */
  .text-zen-display {
    font-family: var(--font-cormorant);
    font-weight: 300;
    font-size: clamp(48px, 8vw, 120px);
    line-height: 1.0;
    letter-spacing: -0.02em;
    color: var(--sumi);
  }

  .text-zen-headline {
    font-family: var(--font-cormorant);
    font-weight: 300;
    font-size: clamp(36px, 5vw, 64px);
    line-height: 1.1;
    letter-spacing: -0.01em;
  }

  .text-zen-title {
    font-family: var(--font-inter);
    font-weight: 300;
    font-size: clamp(24px, 3vw, 32px);
    line-height: 1.3;
    letter-spacing: 0.01em;
  }

  /* Body Typography - Generous Spacing */
  .text-zen-body {
    font-family: var(--font-inter);
    font-weight: 300;
    font-size: 16px;
    line-height: 1.9;
    letter-spacing: 0.02em;
    color: var(--sumi-light);
  }

  .text-zen-body-large {
    font-family: var(--font-inter);
    font-weight: 300;
    font-size: 18px;
    line-height: 1.9;
    letter-spacing: 0.02em;
  }

  /* Caption Typography - Uppercase, Tracked */
  .text-zen-caption {
    font-family: var(--font-inter);
    font-weight: 400;
    font-size: 11px;
    line-height: 1.6;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--sumi-light);
  }

  .text-zen-label {
    font-family: var(--font-inter);
    font-weight: 400;
    font-size: 10px;
    line-height: 1.5;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--sumi-faint);
  }

  /* Number Typography */
  .text-zen-number {
    font-family: var(--font-cormorant);
    font-weight: 300;
    font-size: 14px;
    letter-spacing: 0.05em;
    color: var(--sumi-faint);
  }

  /* Vertical Text */
  .text-vertical {
    writing-mode: vertical-rl;
    text-orientation: mixed;
  }

  /* Japanese Characters */
  .text-kanji {
    font-family: 'Noto Sans JP', var(--font-inter), sans-serif;
    font-weight: 300;
  }
}
```

---

## Texture System

### Washi Paper Texture (CSS Only)

```css
@layer components {
  /* Subtle paper texture using CSS noise */
  .texture-washi {
    position: relative;
  }

  .texture-washi::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    opacity: 0.03;
    pointer-events: none;
    mix-blend-mode: multiply;
  }

  /* Alternative grain texture */
  .texture-grain {
    position: relative;
  }

  .texture-grain::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence baseFrequency='0.8' type='turbulence' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E");
    opacity: 0.02;
    pointer-events: none;
  }
}
```

### SVG Filter for Grain

```tsx
// Include in layout or page component
const GrainFilter = () => (
  <svg className="fixed w-0 h-0" aria-hidden="true">
    <defs>
      <filter id="grain-filter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves="4"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
    </defs>
  </svg>
);
```

---

## Layout System

### Asymmetric Grid

```css
@layer components {
  /* Asymmetric 1:2 ratio grid */
  .grid-asymmetric {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 120px;
    align-items: start;
  }

  /* Dramatic 1:3 ratio grid */
  .grid-dramatic {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 120px;
    align-items: start;
  }

  /* Reversed asymmetric */
  .grid-asymmetric-reverse {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 120px;
    align-items: start;
  }

  /* Off-center content container */
  .content-offset-left {
    max-width: 500px;
    margin-left: 15%;
  }

  .content-offset-right {
    max-width: 500px;
    margin-left: auto;
    margin-right: 15%;
  }

  /* Centered but narrow */
  .content-narrow-center {
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }
}
```

### Ma (Negative Space) Sections

```css
@layer components {
  /* Section with extreme vertical padding */
  .section-ma {
    padding-top: 200px;
    padding-bottom: 200px;
  }

  .section-ma-sm {
    padding-top: 120px;
    padding-bottom: 120px;
  }

  .section-ma-lg {
    padding-top: 280px;
    padding-bottom: 280px;
  }

  /* Container with horizontal breathing room */
  .container-zen {
    width: 100%;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 48px;
    padding-right: 48px;
  }

  @media (max-width: 768px) {
    .container-zen {
      padding-left: 24px;
      padding-right: 24px;
    }

    .section-ma {
      padding-top: 120px;
      padding-bottom: 120px;
    }
  }
}
```

---

## Animation System

### Core Animation Values

```typescript
// src/lib/animations.ts
import { Variants, Transition } from 'motion/react';

// Base transition - very slow, contemplative
export const zenTransition: Transition = {
  duration: 1.2,
  ease: [0.25, 0.1, 0.25, 1], // Custom zen easing
};

export const settleTransition: Transition = {
  duration: 1.5,
  ease: [0.22, 1, 0.36, 1],
};

export const slowTransition: Transition = {
  duration: 2,
  ease: [0.25, 0.1, 0.25, 1],
};

// Fade in - nearly imperceptible
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Paper settle - gentle float up
export const paperSettle: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Stagger children - slow reveal
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

// Stagger item
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Line draw - for dividers
export const lineDraw: Variants = {
  hidden: {
    scaleX: 0,
    transformOrigin: 'left',
  },
  visible: {
    scaleX: 1,
    transition: {
      duration: 1.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Image reveal - grayscale to visible
export const imageReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.02,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};
```

### Scroll Animation Hook

```typescript
// src/hooks/useZenScroll.ts
'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export function useZenScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05, // Very slow, contemplative scroll
      duration: 2,
      smoothWheel: true,
      wheelMultiplier: 0.8,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
}
```

### Scroll-Triggered Animation Component

```tsx
// src/components/ScrollReveal.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef, ReactNode } from 'react';
import { paperSettle, fadeIn } from '@/lib/animations';

interface ScrollRevealProps {
  children: ReactNode;
  variant?: 'fade' | 'settle';
  delay?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  variant = 'settle',
  delay = 0,
  className = '',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px',
  });

  const variants = variant === 'fade' ? fadeIn : paperSettle;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      style={{ transitionDelay: `${delay}s` }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

---

## Component Specifications

### 1. Header Component

```tsx
// src/components/Header.tsx
'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { fadeIn } from '@/lib/animations';

interface HeaderProps {
  brandName: string;
  navItems: Array<{ label: string; href: string }>;
}

export function Header({ brandName, navItems }: HeaderProps) {
  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="fixed top-0 left-0 right-0 z-50 bg-washi/80 backdrop-blur-xs"
    >
      <div className="container-zen">
        <div className="flex items-center justify-between h-20">
          {/* Navigation - Left */}
          <nav className="flex items-center gap-12">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-zen-label text-sumi-light hover:text-sumi transition-colors duration-800 ease-zen"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Brand Mark - Right */}
          <Link
            href="/"
            className="text-zen-caption text-sumi tracking-widest"
          >
            {brandName}
          </Link>
        </div>
      </div>

      {/* Subtle bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-sumi/10 to-transparent" />
    </motion.header>
  );
}
```

**Header CSS (in globals.css):**

```css
@layer components {
  .header-zen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    background-color: rgba(250, 249, 247, 0.8);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  .header-nav-link {
    font-family: var(--font-inter);
    font-weight: 400;
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--sumi-light);
    text-decoration: none;
    transition: color 0.8s cubic-bezier(0.25, 0.1, 0.25, 1);
  }

  .header-nav-link:hover {
    color: var(--sumi);
  }
}
```

---

### 2. Hero Component

```tsx
// src/components/Hero.tsx
'use client';

import { motion } from 'motion/react';
import { staggerContainer, staggerItem, lineDraw } from '@/lib/animations';

interface HeroProps {
  headline: string[];
  subtitle: string;
  ctaText: string;
  ctaHref: string;
}

export function Hero({ headline, subtitle, ctaText, ctaHref }: HeroProps) {
  return (
    <section className="min-h-screen flex items-center section-ma texture-washi">
      <div className="container-zen">
        <motion.div
          className="content-offset-left"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Headline - Stacked Words */}
          <div className="mb-16">
            {headline.map((word, index) => (
              <motion.h1
                key={index}
                variants={staggerItem}
                className="text-zen-display block"
              >
                {word}
              </motion.h1>
            ))}
          </div>

          {/* Divider Line */}
          <motion.div
            variants={lineDraw}
            className="w-16 h-px bg-sumi/30 mb-12"
          />

          {/* Subtitle */}
          <motion.p
            variants={staggerItem}
            className="text-zen-body max-w-xs mb-16"
          >
            {subtitle}
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={staggerItem}>
            <a
              href={ctaHref}
              className="btn-zen-minimal"
            >
              {ctaText}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
```

**Hero CSS:**

```css
@layer components {
  .hero-zen {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding-top: 200px;
    padding-bottom: 200px;
  }

  .hero-headline-word {
    font-family: var(--font-cormorant);
    font-weight: 300;
    font-size: clamp(48px, 10vw, 140px);
    line-height: 0.95;
    letter-spacing: -0.03em;
    color: var(--sumi);
    display: block;
  }
}
```

---

### 3. Philosophy / Quote Section

```tsx
// src/components/Philosophy.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { fadeIn, lineDraw } from '@/lib/animations';

interface PhilosophyProps {
  quote: string;
  attribution?: string;
}

export function Philosophy({ quote, attribution }: PhilosophyProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-150px' });

  return (
    <section ref={ref} className="section-ma-lg">
      <div className="container-zen">
        <div className="max-w-3xl mx-auto text-center">
          {/* Top decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-12 h-px bg-sumi/20 mx-auto mb-16 origin-center"
          />

          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-zen-headline text-sumi/90 mb-12"
          >
            "{quote}"
          </motion.blockquote>

          {/* Attribution */}
          {attribution && (
            <motion.cite
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="text-zen-caption text-sumi-faint not-italic"
            >
              - {attribution}
            </motion.cite>
          )}

          {/* Bottom decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.5, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-12 h-px bg-sumi/20 mx-auto mt-16 origin-center"
          />
        </div>
      </div>
    </section>
  );
}
```

---

### 4. Feature Section (Asymmetric)

```tsx
// src/components/Feature.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import Image from 'next/image';

interface FeatureProps {
  number: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
}

export function Feature({
  number,
  title,
  description,
  imageSrc,
  imageAlt,
  reverse = false,
}: FeatureProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="section-ma">
      <div className="container-zen">
        <div className={`grid-asymmetric ${reverse ? 'grid-asymmetric-reverse' : ''}`}>
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
            className={`relative aspect-4/5 overflow-hidden ${reverse ? 'order-2' : 'order-1'}`}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover grayscale contrast-[1.05]"
            />
          </motion.div>

          {/* Content */}
          <div className={`flex flex-col justify-center ${reverse ? 'order-1' : 'order-2'}`}>
            {/* Number */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="text-zen-number mb-8"
            >
              {number}
            </motion.span>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-zen-title mb-8"
            >
              {title}
            </motion.h2>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-12 h-px bg-sumi/20 mb-8 origin-left"
            />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-zen-body max-w-sm"
            >
              {description}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Feature CSS:**

```css
@layer components {
  .feature-image-zen {
    position: relative;
    aspect-ratio: 4 / 5;
    overflow: hidden;
  }

  .feature-image-zen img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%) contrast(1.05);
    transition: filter 1.5s cubic-bezier(0.25, 0.1, 0.25, 1);
  }

  /* Optional: subtle color on hover */
  .feature-image-zen:hover img {
    filter: grayscale(70%) contrast(1.02);
  }
}
```

---

### 5. Full Bleed Image Section

```tsx
// src/components/FullBleedImage.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import Image from 'next/image';

interface FullBleedImageProps {
  imageSrc: string;
  imageAlt: string;
  caption?: string;
}

export function FullBleedImage({ imageSrc, imageAlt, caption }: FullBleedImageProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="section-ma-sm">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-full aspect-video md:aspect-21/9"
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover grayscale"
        />

        {/* Caption overlay */}
        {caption && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="absolute bottom-8 left-8 md:bottom-12 md:left-12"
          >
            <p className="text-zen-caption text-washi/80">
              {caption}
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
```

---

### 6. Vertical Accent Divider

```tsx
// src/components/VerticalAccent.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

interface VerticalAccentProps {
  kanji: string;
  meaning: string;
}

export function VerticalAccent({ kanji, meaning }: VerticalAccentProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="section-ma-sm">
      <div className="container-zen">
        <div className="flex items-center gap-8">
          {/* Vertical Kanji */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-vertical text-kanji text-2xl text-sumi/30 tracking-widest"
          >
            {kanji}
          </motion.div>

          {/* Horizontal Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex-1 h-px bg-sumi/10 origin-left"
          />

          {/* Meaning */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="text-zen-label"
          >
            {meaning}
          </motion.span>
        </div>
      </div>
    </section>
  );
}
```

---

### 7. Principles Section (Three Columns)

```tsx
// src/components/Principles.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

interface Principle {
  kanji: string;
  romaji: string;
  title: string;
  description: string;
}

interface PrinciplesProps {
  principles: Principle[];
}

export function Principles({ principles }: PrinciplesProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="section-ma">
      <div className="container-zen">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.romaji}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 1.5,
                delay: 0.2 * index,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-center"
            >
              {/* Kanji */}
              <p className="text-kanji text-4xl md:text-5xl text-sumi/20 mb-4">
                {principle.kanji}
              </p>

              {/* Romaji */}
              <p className="text-zen-caption mb-8">
                {principle.romaji}
              </p>

              {/* Title */}
              <h3 className="text-zen-title mb-6">
                {principle.title}
              </h3>

              {/* Description */}
              <p className="text-zen-body text-sm max-w-xs mx-auto">
                {principle.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### 8. Testimonial Section

```tsx
// src/components/Testimonial.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export function Testimonial({ quote, author, role, company }: TestimonialProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-150px' });

  return (
    <section ref={ref} className="section-ma-lg bg-washi-warm texture-washi">
      <div className="container-zen">
        <div className="max-w-2xl mx-auto text-center">
          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-zen-headline text-2xl md:text-3xl mb-16"
          >
            "{quote}"
          </motion.blockquote>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-8 h-px bg-sumi/20 mx-auto mb-8 origin-center"
          />

          {/* Author Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
          >
            <p className="text-zen-body-large text-sumi mb-2">
              {author}
            </p>
            <p className="text-zen-caption text-sumi-faint">
              {role}, {company}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

---

### 9. CTA Section

```tsx
// src/components/CTA.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

interface CTAProps {
  headline: string;
  buttonText: string;
  buttonHref: string;
}

export function CTA({ headline, buttonText, buttonHref }: CTAProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="section-ma-lg">
      <div className="container-zen">
        <div className="max-w-lg mx-auto text-center">
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-zen-headline mb-16"
          >
            {headline}
          </motion.h2>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            <a href={buttonHref} className="btn-zen-minimal">
              {buttonText}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

---

### 10. Footer Component

```tsx
// src/components/Footer.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import Link from 'next/link';

interface FooterProps {
  brandName: string;
  links: Array<{ label: string; href: string }>;
  socialLinks: Array<{ icon: React.ReactNode; href: string; label: string }>;
}

export function Footer({ brandName, links, socialLinks }: FooterProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <footer ref={ref} className="section-ma-sm border-t border-sumi/5">
      <div className="container-zen">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="mb-16"
        >
          <p className="text-zen-title">{brandName}</p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full h-px bg-sumi/10 mb-12 origin-left"
        />

        {/* Bottom Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
        >
          {/* Links */}
          <nav className="flex flex-wrap gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-zen-label text-sumi-light hover:text-sumi transition-colors duration-800"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-sumi-light hover:text-sumi transition-colors duration-800"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-zen-label text-sumi-faint">
            © {new Date().getFullYear()}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
```

---

## Button Components

### Minimal Button

```css
@layer components {
  .btn-zen-minimal {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 16px 32px;
    background-color: transparent;
    border: 1px solid var(--sumi);
    color: var(--sumi);
    font-family: var(--font-inter);
    font-weight: 400;
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1);
  }

  .btn-zen-minimal:hover {
    background-color: var(--sumi);
    color: var(--washi);
  }

  /* Ghost variant - even more subtle */
  .btn-zen-ghost {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 0;
    background: transparent;
    border: none;
    color: var(--sumi-light);
    font-family: var(--font-inter);
    font-weight: 400;
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    transition: color 0.8s cubic-bezier(0.25, 0.1, 0.25, 1);
  }

  .btn-zen-ghost:hover {
    color: var(--sumi);
  }

  /* With underline animation */
  .btn-zen-underline {
    position: relative;
    display: inline-block;
    padding: 4px 0;
    color: var(--sumi);
    font-family: var(--font-inter);
    font-weight: 400;
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
  }

  .btn-zen-underline::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: var(--sumi);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1);
  }

  .btn-zen-underline:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
}
```

### Button Component

```tsx
// src/components/Button.tsx
import { ReactNode } from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: 'minimal' | 'ghost' | 'underline';
  onClick?: () => void;
  className?: string;
}

export function Button({
  children,
  href,
  variant = 'minimal',
  onClick,
  className = '',
}: ButtonProps) {
  const baseClass = variant === 'minimal'
    ? 'btn-zen-minimal'
    : variant === 'ghost'
    ? 'btn-zen-ghost'
    : 'btn-zen-underline';

  if (href) {
    return (
      <Link href={href} className={`${baseClass} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`${baseClass} ${className}`}>
      {children}
    </button>
  );
}
```

---

## Icon System

Simple, single-stroke line icons inspired by Japanese calligraphy. Minimal, elegant, 1px stroke weight.

```tsx
// src/components/icons/ZenIcons.tsx

export const ArrowRight = ({ className = '' }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    className={className}
  >
    <path
      d="M4 10H16M16 10L11 5M16 10L11 15"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ArrowDown = ({ className = '' }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    className={className}
  >
    <path
      d="M10 4V16M10 16L5 11M10 16L15 11"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Plus = ({ className = '' }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    className={className}
  >
    <path
      d="M10 4V16M4 10H16"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

export const Close = ({ className = '' }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    className={className}
  >
    <path
      d="M5 5L15 15M15 5L5 15"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

export const Menu = ({ className = '' }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    className={className}
  >
    <path
      d="M3 6H17M3 10H17M3 14H17"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

// Social icons - simplified
export const Twitter = ({ className = '' }: { className?: string }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    className={className}
  >
    <path
      d="M2 2L16 16M2 16L9.5 8.5M16 2L9.5 8.5"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Instagram = ({ className = '' }: { className?: string }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    className={className}
  >
    <rect
      x="2"
      y="2"
      width="14"
      height="14"
      rx="3"
      stroke="currentColor"
      strokeWidth="1"
    />
    <circle
      cx="9"
      cy="9"
      r="3"
      stroke="currentColor"
      strokeWidth="1"
    />
    <circle cx="13.5" cy="4.5" r="0.5" fill="currentColor" />
  </svg>
);

export const LinkedIn = ({ className = '' }: { className?: string }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    className={className}
  >
    <rect
      x="2"
      y="2"
      width="14"
      height="14"
      rx="1"
      stroke="currentColor"
      strokeWidth="1"
    />
    <path
      d="M5.5 7.5V12.5M8 7.5V12.5M8 10C8 8.5 12.5 8.5 12.5 10V12.5"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="5.5" cy="5.5" r="0.5" fill="currentColor" />
  </svg>
);
```

---

## Image Treatment

### Grayscale with Contrast

```css
@layer components {
  .image-zen {
    filter: grayscale(100%) contrast(1.05);
    transition: filter 1.5s cubic-bezier(0.25, 0.1, 0.25, 1);
  }

  /* Optional: subtle warmth on hover */
  .image-zen-hover:hover {
    filter: grayscale(70%) contrast(1.02) sepia(5%);
  }

  /* Desaturated (not fully grayscale) */
  .image-muted {
    filter: saturate(0.4) contrast(1.02);
  }

  /* High contrast black and white */
  .image-sumi {
    filter: grayscale(100%) contrast(1.2);
  }
}
```

### Image Component

```tsx
// src/components/ZenImage.tsx
import Image from 'next/image';

interface ZenImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  treatment?: 'grayscale' | 'muted' | 'sumi';
  className?: string;
}

export function ZenImage({
  src,
  alt,
  fill = false,
  width,
  height,
  treatment = 'grayscale',
  className = '',
}: ZenImageProps) {
  const treatmentClass = treatment === 'grayscale'
    ? 'image-zen'
    : treatment === 'muted'
    ? 'image-muted'
    : 'image-sumi';

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${treatmentClass} ${className}`}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`${treatmentClass} ${className}`}
    />
  );
}
```

---

## Required npm Packages

```bash
npm install next react react-dom motion lenis
npm install -D typescript @types/react @types/node tailwindcss @tailwindcss/postcss postcss
```

Install the current releases. The versions this spec was checked against are in the stack table in the skill's SKILL.md.

---

## Sample Data Structure

```typescript
// src/data/content.ts

export interface SiteContent {
  brand: {
    name: string;
  };
  navigation: Array<{
    label: string;
    href: string;
  }>;
  hero: {
    headline: string[];
    subtitle: string;
    cta: {
      text: string;
      href: string;
    };
  };
  philosophy: {
    quote: string;
    attribution?: string;
  };
  features: Array<{
    number: string;
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
  }>;
  principles: Array<{
    kanji: string;
    romaji: string;
    title: string;
    description: string;
  }>;
  testimonial: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
  cta: {
    headline: string;
    buttonText: string;
    buttonHref: string;
  };
  footer: {
    links: Array<{
      label: string;
      href: string;
    }>;
  };
}

export const sampleContent: SiteContent = {
  brand: {
    name: 'MUJI',
  },
  navigation: [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Contact', href: '#contact' },
  ],
  hero: {
    headline: ['LESS', 'IS', 'MORE'],
    subtitle: 'A meditation on essential design. Where space itself becomes the message.',
    cta: {
      text: 'Explore',
      href: '#about',
    },
  },
  philosophy: {
    quote: 'The space between things is as important as the things themselves.',
    attribution: 'Japanese Design Philosophy',
  },
  features: [
    {
      number: '01',
      title: 'Intentional Simplicity',
      description: 'Every element serves a purpose. Nothing is added for decoration alone. What remains is essential.',
      imageSrc: '/images/feature-01.jpg',
      imageAlt: 'Minimal interior space',
    },
    {
      number: '02',
      title: 'Natural Materials',
      description: 'Wood, paper, stone. Materials that age gracefully and connect us to the natural world.',
      imageSrc: '/images/feature-02.jpg',
      imageAlt: 'Natural wood texture',
    },
    {
      number: '03',
      title: 'Thoughtful Restraint',
      description: 'The courage to leave out. To trust in emptiness. To let the essential speak for itself.',
      imageSrc: '/images/feature-03.jpg',
      imageAlt: 'Empty room with single object',
    },
  ],
  principles: [
    {
      kanji: '間',
      romaji: 'MA',
      title: 'Negative Space',
      description: 'Space is not empty-it is a presence. The pause between notes that gives music meaning.',
    },
    {
      kanji: '簡素',
      romaji: 'KANSO',
      title: 'Simplicity',
      description: 'Eliminate the unnecessary. What remains is clarity, purpose, and essential beauty.',
    },
    {
      kanji: '侘寂',
      romaji: 'WABI-SABI',
      title: 'Imperfection',
      description: 'Beauty in the imperfect, impermanent, and incomplete. The crack in the pottery.',
    },
  ],
  testimonial: {
    quote: 'The simplicity brought clarity to everything we do. It changed how we think about our work.',
    author: 'Takeshi Yamamoto',
    role: 'Creative Director',
    company: 'Studio Zero',
  },
  cta: {
    headline: 'Begin your journey',
    buttonText: 'Start',
    buttonHref: '/contact',
  },
  footer: {
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Contact', href: '/contact' },
    ],
  },
};
```

---

## Complete Page Assembly

```tsx
// src/app/page.tsx
'use client';

import { useZenScroll } from '@/hooks/useZenScroll';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Philosophy } from '@/components/Philosophy';
import { Feature } from '@/components/Feature';
import { VerticalAccent } from '@/components/VerticalAccent';
import { FullBleedImage } from '@/components/FullBleedImage';
import { Principles } from '@/components/Principles';
import { Testimonial } from '@/components/Testimonial';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';
import { Twitter, Instagram, LinkedIn } from '@/components/icons/ZenIcons';
import { sampleContent } from '@/data/content';

export default function Home() {
  useZenScroll();

  const { brand, navigation, hero, philosophy, features, principles, testimonial, cta, footer } = sampleContent;

  return (
    <main className="texture-washi">
      <Header
        brandName={brand.name}
        navItems={navigation}
      />

      <Hero
        headline={hero.headline}
        subtitle={hero.subtitle}
        ctaText={hero.cta.text}
        ctaHref={hero.cta.href}
      />

      <Philosophy
        quote={philosophy.quote}
        attribution={philosophy.attribution}
      />

      <Feature
        {...features[0]}
        reverse={false}
      />

      <VerticalAccent
        kanji="本質的"
        meaning="ESSENTIAL"
      />

      <Feature
        {...features[1]}
        reverse={true}
      />

      <FullBleedImage
        imageSrc="/images/full-bleed.jpg"
        imageAlt="Contemplative space"
        caption="The beauty of restraint"
      />

      <Feature
        {...features[2]}
        reverse={false}
      />

      <Principles principles={principles} />

      <Testimonial {...testimonial} />

      <CTA
        headline={cta.headline}
        buttonText={cta.buttonText}
        buttonHref={cta.buttonHref}
      />

      <Footer
        brandName={brand.name}
        links={footer.links}
        socialLinks={[
          { icon: <Twitter />, href: '#', label: 'Twitter' },
          { icon: <Instagram />, href: '#', label: 'Instagram' },
          { icon: <LinkedIn />, href: '#', label: 'LinkedIn' },
        ]}
      />
    </main>
  );
}
```

---

## What to ABSOLUTELY AVOID

1. **Bright, Saturated Colors** - No neon, no vibrant hues. Everything muted, desaturated, natural.

2. **Centered Layouts** - Almost nothing centered. Use asymmetric positioning (15%, 20%, not 50%).

3. **Fast Animations** - NO animations under 0.8s. Everything slow, contemplative. 1.2-2s typical.

4. **Dense Content** - NO packed sections. Massive negative space (200px+ padding) between everything.

5. **Glossy Effects** - NO gradients, NO shiny surfaces, NO glass effects. Matte, paper-like textures only.

6. **Drop Shadows** - NO box-shadow for depth. If shadows exist, they're barely perceptible.

7. **Decorative Elements** - NO flourishes, NO icons for decoration, NO background patterns.

8. **Bold Font Weights** - NO font-weight above 400. Primary text is 300 (light).

9. **Standard Hover States** - NO scale transforms, NO dramatic color changes. Opacity shifts only (1 → 0.7).

10. **Busy Backgrounds** - NO complex backgrounds. Solid colors with optional subtle grain texture.

11. **Multiple Focal Points** - ONE element dominates each section. Everything else recedes.

12. **Rounded Corners** - Minimal to none. Sharp, precise edges.

13. **Spring Animations** - NO bouncy physics. Use tween with custom easing only.

14. **Stock Photo Aesthetic** - NO colorful lifestyle images. Grayscale, high contrast, isolated subjects.

15. **Small Margins** - NO tight spacing. Gap values should be 80px, 120px, 200px-never 16px, 24px.

---

## Responsive Considerations

```css
@layer components {
  /* Mobile adjustments */
  @media (max-width: 768px) {
    .section-ma {
      padding-top: 120px;
      padding-bottom: 120px;
    }

    .section-ma-lg {
      padding-top: 160px;
      padding-bottom: 160px;
    }

    .grid-asymmetric,
    .grid-asymmetric-reverse {
      grid-template-columns: 1fr;
      gap: 60px;
    }

    .content-offset-left,
    .content-offset-right {
      margin-left: 0;
      margin-right: 0;
      max-width: 100%;
    }

    .text-zen-display {
      font-size: clamp(36px, 12vw, 72px);
    }
  }
}
```

---

## Final Notes

This Japanese Minimalist style is about **absence as presence**. Every design decision should ask: "Can I remove this?" The goal is not emptiness but **intentional restraint**-a calm, contemplative experience where the user's attention is never fought for but gently guided.

Key differentiators from generic minimalism:
- **Asymmetry** over symmetry
- **Light weights** (300) over regular (400)
- **Very slow animations** (1.2-2s) over quick (0.2-0.3s)
- **Extreme whitespace** (200px) over moderate (40-60px)
- **Grayscale imagery** over color
- **Off-center positioning** over centered

The page should feel like a meditation-unhurried, breathing, with space for contemplation.
