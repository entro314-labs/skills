# Cinematic Dark Landing Page - Exhaustive Technical Specification

Linear's "liquid glass" aesthetic taken further. A landing page that feels like a movie, not a website. Maximum impact through restraint. Each scroll reveals a new scene. Depth-of-field through blur layers. Sparse content where every word counts.

---

## Output Requirements

- **Framework**: Next.js 16+ with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom configuration
- **Animation**: Motion + GSAP (for scroll-triggered parallax)
- **Smooth Scroll**: Lenis (very slow lerp: 0.07 for cinematic feel)
- **Output**: Single page component with all sections
- **Mode**: Dark mode ONLY - no light mode variant

---

## Page Structure Overview

```
┌─────────────────────────────────────────────────────────────────┐
│  FULL VIEWPORT - HERO                                           │
│                                                                 │
│     ╭─────────────────────────────────────────────────────╮     │
│     │                                                     │     │
│     │                  [gradient orb blur]                │     │
│     │                                                     │     │
│     ╰─────────────────────────────────────────────────────╯     │
│                                                                 │
│                         HEADLINE                                │
│                     (72-96px, centered)                         │
│                                                                 │
│                   One line of subtext                           │
│                                                                 │
│                       [Start]                                   │
│                                                                 │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                   (noise overlay)                       │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  FULL VIEWPORT - PRODUCT SHOWCASE                               │
│                                                                 │
│              ╭───────────────────────────────╮                  │
│              │                               │                  │
│              │    ┌─────────────────────┐    │   (glass panel)  │
│              │    │                     │    │                  │
│              │    │   [product mockup]  │    │                  │
│              │    │    with perspective │    │                  │
│              │    │      & blur layers  │    │                  │
│              │    │                     │    │                  │
│              │    └─────────────────────┘    │                  │
│              │                               │                  │
│              ╰───────────────────────────────╯                  │
│                                                                 │
│                    "A single line of text"                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  FULL VIEWPORT - FEATURE 1                                      │
│                                                                 │
│                     ○ (gradient orb - different color)          │
│                                                                 │
│                                                                 │
│              Feature Headline Here                              │
│                                                                 │
│            Brief supporting text. Nothing more.                 │
│                                                                 │
│                                                                 │
│               ┌─────────────────────────┐                       │
│               │   [visual element]      │                       │
│               │    floating with        │                       │
│               │    subtle parallax      │                       │
│               └─────────────────────────┘                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  FULL VIEWPORT - FEATURE 2                                      │
│                                                                 │
│   ┌────────────────────────────────────────────────────────┐    │
│   │                                                        │    │
│   │                  [full-width visual]                   │    │
│   │                  edge-to-edge glow                     │    │
│   │                                                        │    │
│   └────────────────────────────────────────────────────────┘    │
│                                                                 │
│                                                                 │
│                    Short Headline                               │
│                                                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  FULL VIEWPORT - SINGLE QUOTE                                   │
│                                                                 │
│                                                                 │
│                                                                 │
│                                                                 │
│           "A powerful statement that resonates."                │
│                                                                 │
│                         - Name                                  │
│                                                                 │
│                                                                 │
│                                                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  FULL VIEWPORT - CTA                                            │
│                                                                 │
│                                                                 │
│                                                                 │
│                       Ready to begin?                           │
│                                                                 │
│                         [Start]                                 │
│                                                                 │
│                                                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  FOOTER - Minimal                                               │
│                                                                 │
│  Logo                                           Links  Social   │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│                        © 2024 Brand                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Color System

### CSS Custom Properties

```css
:root {
  /* Backgrounds - Near Pure Black */
  --void: #050505;
  --void-light: #0A0A0B;
  --surface: #111113;
  --surface-elevated: #18181B;

  /* Text */
  --text-primary: #FAFAFA;
  --text-secondary: #A1A1AA;
  --text-dim: #52525B;
  --text-muted: #3F3F46;

  /* Accent - Subtle Indigo */
  --accent: #6366F1;
  --accent-glow: rgba(99, 102, 241, 0.15);
  --accent-dim: rgba(99, 102, 241, 0.08);

  /* Secondary Accent - Emerald */
  --accent-alt: #10B981;
  --accent-alt-glow: rgba(16, 185, 129, 0.10);

  /* Glass Effects */
  --glass-bg: rgba(255, 255, 255, 0.03);
  --glass-bg-hover: rgba(255, 255, 255, 0.05);
  --glass-border: rgba(255, 255, 255, 0.08);
  --glass-border-bright: rgba(255, 255, 255, 0.12);
  --glass-rim: rgba(255, 255, 255, 0.1);

  /* Shadows & Glows */
  --glow-accent: 0 0 80px 20px var(--accent-glow);
  --glow-accent-alt: 0 0 80px 20px var(--accent-alt-glow);
  --shadow-elevated: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}
```

### Tailwind Theme

```css
/* src/app/globals.css */
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-void: #050505;
  --color-void-light: #0A0A0B;
  --color-surface: #111113;
  --color-surface-elevated: #18181B;
  --color-accent: #6366F1;
  --color-accent-glow: rgba(99, 102, 241, 0.15);
  --color-accent-dim: rgba(99, 102, 241, 0.08);
  --color-accent-alt: #10B981;
  --color-accent-alt-glow: rgba(16, 185, 129, 0.10);
  --color-glass-bg: rgba(255, 255, 255, 0.03);
  --color-glass-bg-hover: rgba(255, 255, 255, 0.05);
  --color-glass-border: rgba(255, 255, 255, 0.08);
  --color-glass-border-bright: rgba(255, 255, 255, 0.12);
  --color-glass-rim: rgba(255, 255, 255, 0.1);

  --text-cinematic-xl: clamp(56px, 10vw, 120px);
  --text-cinematic-xl--line-height: 1.0;
  --text-cinematic-xl--letter-spacing: -0.04em;
  --text-cinematic-lg: clamp(48px, 8vw, 96px);
  --text-cinematic-lg--line-height: 1.05;
  --text-cinematic-lg--letter-spacing: -0.03em;
  --text-cinematic-md: clamp(36px, 5vw, 64px);
  --text-cinematic-md--line-height: 1.1;
  --text-cinematic-md--letter-spacing: -0.02em;
  --text-cinematic-sm: clamp(24px, 3vw, 36px);
  --text-cinematic-sm--line-height: 1.2;
  --text-cinematic-sm--letter-spacing: -0.01em;
  --text-body: 18px;
  --text-body--line-height: 1.7;
  --text-body--letter-spacing: 0;
  --text-body-sm: 14px;
  --text-body-sm--line-height: 1.6;
  --text-body-sm--letter-spacing: 0.01em;
  --text-caption: 12px;
  --text-caption--line-height: 1.5;
  --text-caption--letter-spacing: 0.05em;

  --backdrop-blur-glass: 40px;
  --backdrop-blur-glass-lg: 60px;

  --ease-cinematic: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-smooth-out: cubic-bezier(0.22, 1, 0.36, 1);

  --animate-gradient-pulse: gradient-pulse 20s ease-in-out infinite;
  --animate-light-flare: light-flare 8s ease-in-out infinite;
  --animate-float: float 6s ease-in-out infinite;

  @keyframes gradient-pulse {
    0%, 100% { opacity: 0.15; transform: scale(1); }
    50% { opacity: 0.25; transform: scale(1.1); }
  }
  @keyframes light-flare {
    0% { transform: translateX(-100%) rotate(15deg); opacity: 0; }
    10% { opacity: 0.1; }
    100% { transform: translateX(200%) rotate(15deg); opacity: 0; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
}

@theme inline {
  --font-sans: var(--font-inter), system-ui, sans-serif;
  --font-display: var(--font-inter), system-ui, sans-serif;
}

/* No theme entry needed in v4: font-normal, font-medium, font-semibold, duration-400, duration-600, duration-800, duration-1000, duration-1200 */
```

---

## Typography System

### Font Loading

```typescript
// src/app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="bg-void text-white font-sans antialiased">
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
    background-color: #050505;
    color: #FAFAFA;
    font-family: var(--font-inter);
    font-weight: 400;
  }

  ::selection {
    background-color: rgba(99, 102, 241, 0.4);
    color: #FAFAFA;
  }
}

@layer components {
  /* Display Typography */
  .text-cinematic-display {
    font-family: var(--font-inter);
    font-weight: 500;
    font-size: clamp(56px, 10vw, 120px);
    line-height: 1.0;
    letter-spacing: -0.04em;
    color: #FAFAFA;
  }

  .text-cinematic-headline {
    font-family: var(--font-inter);
    font-weight: 500;
    font-size: clamp(48px, 8vw, 96px);
    line-height: 1.05;
    letter-spacing: -0.03em;
    color: #FAFAFA;
  }

  .text-cinematic-title {
    font-family: var(--font-inter);
    font-weight: 500;
    font-size: clamp(36px, 5vw, 64px);
    line-height: 1.1;
    letter-spacing: -0.02em;
  }

  .text-cinematic-subtitle {
    font-family: var(--font-inter);
    font-weight: 400;
    font-size: clamp(24px, 3vw, 36px);
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: #A1A1AA;
  }

  /* Body Typography */
  .text-cinematic-body {
    font-family: var(--font-inter);
    font-weight: 400;
    font-size: 18px;
    line-height: 1.7;
    color: #A1A1AA;
    max-width: 400px;
  }

  .text-cinematic-body-sm {
    font-family: var(--font-inter);
    font-weight: 400;
    font-size: 14px;
    line-height: 1.6;
    letter-spacing: 0.01em;
    color: #52525B;
  }

  /* Caption */
  .text-cinematic-caption {
    font-family: var(--font-inter);
    font-weight: 500;
    font-size: 12px;
    line-height: 1.5;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #52525B;
  }
}
```

---

## Background System

### Noise Texture Overlay

```css
@layer components {
  .noise-overlay {
    position: fixed;
    inset: 0;
    z-index: 100;
    pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    opacity: 0.03;
  }
}
```

### Gradient Orbs Component

```tsx
// src/components/GradientOrbs.tsx
'use client';

import { motion } from 'motion/react';

interface GradientOrbProps {
  color?: 'indigo' | 'emerald' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  position: { top?: string; left?: string; right?: string; bottom?: string };
  className?: string;
}

export function GradientOrb({
  color = 'indigo',
  size = 'md',
  position,
  className = '',
}: GradientOrbProps) {
  const colorMap = {
    indigo: 'rgba(99, 102, 241, 0.15)',
    emerald: 'rgba(16, 185, 129, 0.10)',
    purple: 'rgba(147, 51, 234, 0.12)',
  };

  const sizeMap = {
    sm: 'w-[400px] h-[400px]',
    md: 'w-[600px] h-[600px]',
    lg: 'w-[800px] h-[800px]',
  };

  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${sizeMap[size]} ${className}`}
      style={{
        ...position,
        background: `radial-gradient(circle, ${colorMap[color]} 0%, transparent 70%)`,
        filter: 'blur(80px)',
      }}
      animate={{
        opacity: [0.15, 0.25, 0.15],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}
```

### Background Container

```tsx
// src/components/CinematicBackground.tsx
'use client';

import { GradientOrb } from './GradientOrb';

export function CinematicBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Base background */}
      <div className="absolute inset-0 bg-void" />

      {/* Gradient orbs */}
      <GradientOrb
        color="indigo"
        size="lg"
        position={{ top: '-20%', right: '-10%' }}
      />
      <GradientOrb
        color="emerald"
        size="md"
        position={{ bottom: '10%', left: '-15%' }}
      />
      <GradientOrb
        color="purple"
        size="sm"
        position={{ top: '40%', left: '60%' }}
      />

      {/* Noise overlay */}
      <div className="noise-overlay" />
    </div>
  );
}
```

---

## Glass Morphism System

### Glass Panel CSS

```css
@layer components {
  /* Standard glass panel */
  .glass-panel {
    position: relative;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.05) 0%,
      rgba(255, 255, 255, 0.02) 100%
    );
    backdrop-filter: blur(40px);
    -webkit-backdrop-filter: blur(40px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 24px;
    overflow: hidden;
  }

  /* Rim light effect */
  .glass-panel::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%,
      transparent 100%
    );
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  /* Light flare effect */
  .glass-panel-flare::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.05),
      transparent
    );
    animation: light-flare 8s ease-in-out infinite;
    pointer-events: none;
  }

  /* Elevated glass */
  .glass-elevated {
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0.03) 100%
    );
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }

  /* Glass with glow */
  .glass-glow-indigo {
    box-shadow:
      0 25px 50px -12px rgba(0, 0, 0, 0.5),
      0 0 80px 20px rgba(99, 102, 241, 0.15);
  }

  .glass-glow-emerald {
    box-shadow:
      0 25px 50px -12px rgba(0, 0, 0, 0.5),
      0 0 80px 20px rgba(16, 185, 129, 0.10);
  }
}
```

### Glass Panel Component

```tsx
// src/components/GlassPanel.tsx
'use client';

import { motion, useMotionValue, useTransform } from 'motion/react';
import { useRef, ReactNode } from 'react';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  glow?: 'indigo' | 'emerald' | 'none';
  enableMouseParallax?: boolean;
  enableFlare?: boolean;
}

export function GlassPanel({
  children,
  className = '',
  glow = 'none',
  enableMouseParallax = false,
  enableFlare = true,
}: GlassPanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const translateX = useTransform(mouseX, [-0.5, 0.5], [-3, 3]);
  const translateY = useTransform(mouseY, [-0.5, 0.5], [-3, 3]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableMouseParallax || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const glowClass = glow === 'indigo'
    ? 'glass-glow-indigo'
    : glow === 'emerald'
    ? 'glass-glow-emerald'
    : '';

  const flareClass = enableFlare ? 'glass-panel-flare' : '';

  return (
    <motion.div
      ref={ref}
      className={`glass-panel ${glowClass} ${flareClass} ${className}`}
      style={enableMouseParallax ? { x: translateX, y: translateY } : {}}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}
```

---

## Animation System

### Core Animation Values

```typescript
// src/lib/animations.ts
import { Variants, Transition } from 'motion/react';

// Base cinematic transition
export const cinematicTransition: Transition = {
  duration: 1.2,
  ease: [0.25, 0.46, 0.45, 0.94],
};

export const smoothOutTransition: Transition = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1],
};

// Section fade in
export const sectionFadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Content slide up
export const slideUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Scale in for product
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Stagger container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Stagger item
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Glow pulse
export const glowPulse: Variants = {
  initial: {
    boxShadow: '0 0 60px 15px rgba(99, 102, 241, 0.15)',
  },
  animate: {
    boxShadow: [
      '0 0 60px 15px rgba(99, 102, 241, 0.15)',
      '0 0 80px 25px rgba(99, 102, 241, 0.25)',
      '0 0 60px 15px rgba(99, 102, 241, 0.15)',
    ],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};
```

### Scroll Animation Hook

```typescript
// src/hooks/useCinematicScroll.ts
'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export function useCinematicScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.07, // Very slow for cinematic feel
      duration: 1.5,
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

### Parallax Hook

```typescript
// src/hooks/useParallax.ts
'use client';

import { useRef } from 'react';
import { useScroll, useTransform, MotionValue } from 'motion/react';

interface ParallaxOptions {
  offset?: [string, string];
  speed?: number;
}

export function useParallax(
  options: ParallaxOptions = {}
): { ref: React.RefObject<HTMLDivElement | null>; y: MotionValue<string> } {
  const { offset = ['start end', 'end start'], speed = 0.3 } = options;
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any,
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${speed * 100}%`, `${-speed * 100}%`]
  );

  return { ref, y };
}
```

---

## Component Specifications

### 1. Header Component

```tsx
// src/components/Header.tsx
'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import Link from 'next/link';

interface HeaderProps {
  brandName: string;
  ctaText: string;
  ctaHref: string;
}

export function Header({ brandName, ctaText, ctaHref }: HeaderProps) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);
  const blur = useTransform(scrollY, [0, 100], [0, 20]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
      }}
    >
      {/* Background that fades in on scroll */}
      <motion.div
        className="absolute inset-0 bg-void/80 border-b border-glass-border"
        style={{ opacity }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-sm font-medium text-white tracking-wide"
          >
            {brandName}
          </Link>

          {/* CTA */}
          <Link
            href={ctaHref}
            className="btn-cinematic-sm"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
```

**Header Button CSS:**

```css
@layer components {
  .btn-cinematic-sm {
    padding: 8px 16px;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #FAFAFA;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.02em;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .btn-cinematic-sm:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.3);
  }
}
```

---

### 2. Hero Section

```tsx
// src/components/Hero.tsx
'use client';

import { motion } from 'motion/react';
import { staggerContainer, staggerItem, slideUp } from '@/lib/animations';

interface HeroProps {
  headline: string;
  subtext: string;
  ctaText: string;
  ctaHref: string;
}

export function Hero({ headline, subtext, ctaText, ctaHref }: HeroProps) {
  return (
    <section className="section-viewport relative">
      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center px-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Headline */}
        <motion.h1
          variants={slideUp}
          className="text-cinematic-headline mb-8"
        >
          {headline}
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={staggerItem}
          className="text-cinematic-body mx-auto mb-12"
        >
          {subtext}
        </motion.p>

        {/* CTA */}
        <motion.div variants={staggerItem}>
          <a href={ctaHref} className="btn-cinematic">
            {ctaText}
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          className="w-6 h-10 border border-glass-border rounded-full flex justify-center pt-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 bg-white/50 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
```

**Section CSS:**

```css
@layer components {
  .section-viewport {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 120px 0;
  }
}
```

---

### 3. Product Showcase Section

```tsx
// src/components/ProductShowcase.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import Image from 'next/image';
import { GlassPanel } from './GlassPanel';
import { scaleIn, slideUp } from '@/lib/animations';

interface ProductShowcaseProps {
  imageSrc: string;
  imageAlt: string;
  tagline: string;
}

export function ProductShowcase({ imageSrc, imageAlt, tagline }: ProductShowcaseProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section ref={ref} className="section-viewport">
      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {/* Product in glass panel */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={scaleIn}
        >
          <GlassPanel
            glow="indigo"
            enableMouseParallax
            className="p-4 md:p-8 mb-12"
          >
            {/* Blur layer for depth */}
            <div className="absolute inset-0 -z-10">
              <Image
                src={imageSrc}
                alt=""
                fill
                className="object-cover blur-3xl opacity-30 scale-110"
              />
            </div>

            {/* Product mockup with perspective */}
            <div className="relative" style={{ perspective: '1000px' }}>
              <motion.div
                className="relative"
                style={{ transform: 'rotateX(2deg)' }}
                whileHover={{ rotateX: 0, scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  width={1200}
                  height={800}
                  className="rounded-lg"
                />
              </motion.div>
            </div>
          </GlassPanel>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={slideUp}
          className="text-cinematic-subtitle"
        >
          {tagline}
        </motion.p>
      </div>
    </section>
  );
}
```

---

### 4. Feature Section

```tsx
// src/components/Feature.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef, ReactNode } from 'react';
import { slideUp, staggerContainer, staggerItem } from '@/lib/animations';
import { useParallax } from '@/hooks/useParallax';

interface FeatureProps {
  headline: string;
  subtext?: string;
  visual: ReactNode;
  visualPosition?: 'above' | 'below';
}

export function Feature({
  headline,
  subtext,
  visual,
  visualPosition = 'below',
}: FeatureProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const { ref: parallaxRef, y } = useParallax({ speed: 0.15 });

  return (
    <section ref={ref} className="section-viewport">
      <motion.div
        className="max-w-5xl mx-auto px-6 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Visual above text */}
        {visualPosition === 'above' && (
          <motion.div
            ref={parallaxRef}
            style={{ y }}
            variants={staggerItem}
            className="mb-16"
          >
            {visual}
          </motion.div>
        )}

        {/* Headline */}
        <motion.h2
          variants={slideUp}
          className="text-cinematic-title mb-6"
        >
          {headline}
        </motion.h2>

        {/* Subtext */}
        {subtext && (
          <motion.p
            variants={staggerItem}
            className="text-cinematic-body mx-auto"
          >
            {subtext}
          </motion.p>
        )}

        {/* Visual below text */}
        {visualPosition === 'below' && (
          <motion.div
            ref={parallaxRef}
            style={{ y }}
            variants={staggerItem}
            className="mt-16"
          >
            {visual}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
```

---

### 5. Full-Width Visual Section

```tsx
// src/components/FullWidthVisual.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import Image from 'next/image';
import { slideUp } from '@/lib/animations';

interface FullWidthVisualProps {
  imageSrc: string;
  imageAlt: string;
  headline?: string;
}

export function FullWidthVisual({ imageSrc, imageAlt, headline }: FullWidthVisualProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="section-viewport">
      <div className="w-full max-w-7xl mx-auto px-6">
        {/* Full-width image with glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Glow behind image */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1/2 bg-linear-to-t from-accent-glow to-transparent blur-3xl" />
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-glass-border">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={1920}
              height={1080}
              className="w-full"
            />
          </div>
        </motion.div>

        {/* Optional headline */}
        {headline && (
          <motion.h2
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={slideUp}
            className="text-cinematic-title text-center mt-16"
          >
            {headline}
          </motion.h2>
        )}
      </div>
    </section>
  );
}
```

---

### 6. Quote Section

```tsx
// src/components/Quote.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

interface QuoteProps {
  text: string;
  author: string;
  role?: string;
}

export function Quote({ text, author, role }: QuoteProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });

  return (
    <section ref={ref} className="section-viewport">
      <div className="max-w-3xl mx-auto px-6 text-center">
        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-cinematic-md text-white/90 mb-12"
        >
          "{text}"
        </motion.blockquote>

        {/* Attribution */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <p className="text-white/80 font-medium mb-1">
            {author}
          </p>
          {role && (
            <p className="text-cinematic-caption">
              {role}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
```

---

### 7. CTA Section

```tsx
// src/components/CTA.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { slideUp, staggerContainer, staggerItem } from '@/lib/animations';

interface CTAProps {
  headline: string;
  buttonText: string;
  buttonHref: string;
}

export function CTA({ headline, buttonText, buttonHref }: CTAProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });

  return (
    <section ref={ref} className="section-viewport">
      <motion.div
        className="max-w-2xl mx-auto px-6 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Headline */}
        <motion.h2
          variants={slideUp}
          className="text-cinematic-title mb-12"
        >
          {headline}
        </motion.h2>

        {/* Button */}
        <motion.div variants={staggerItem}>
          <a href={buttonHref} className="btn-cinematic btn-cinematic-glow">
            {buttonText}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
```

---

### 8. Footer Component

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
    <footer ref={ref} className="relative py-24 border-t border-glass-border">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16"
        >
          {/* Brand */}
          <Link href="/" className="text-lg font-medium text-white">
            {brandName}
          </Link>

          {/* Links + Social */}
          <div className="flex flex-wrap items-center gap-8">
            {/* Links */}
            <nav className="flex gap-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/50 hover:text-white transition-colors duration-400"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Social */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-white/50 hover:text-white transition-colors duration-400"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-px bg-glass-border mb-8 origin-left"
        />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-sm text-white/30">
            © {new Date().getFullYear()} {brandName}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
```

---

## Button Components

```css
@layer components {
  /* Standard cinematic button */
  .btn-cinematic {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 16px 32px;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #FAFAFA;
    border-radius: 8px;
    font-family: var(--font-inter);
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.02em;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .btn-cinematic:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.3);
  }

  /* With glow effect */
  .btn-cinematic-glow {
    background: rgba(99, 102, 241, 0.1);
    border-color: rgba(99, 102, 241, 0.3);
  }

  .btn-cinematic-glow:hover {
    background: rgba(99, 102, 241, 0.2);
    border-color: rgba(99, 102, 241, 0.5);
    box-shadow: 0 0 30px 5px rgba(99, 102, 241, 0.2);
  }

  /* Solid variant */
  .btn-cinematic-solid {
    background: #FAFAFA;
    border-color: #FAFAFA;
    color: #050505;
  }

  .btn-cinematic-solid:hover {
    background: #E4E4E7;
    border-color: #E4E4E7;
  }

  /* Ghost variant */
  .btn-cinematic-ghost {
    padding: 8px 0;
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.6);
  }

  .btn-cinematic-ghost:hover {
    color: #FAFAFA;
  }
}
```

---

## Icon System

Minimal, thin-stroke icons that match the cinematic aesthetic.

```tsx
// src/components/icons/CinematicIcons.tsx

export const ArrowRight = ({ className = '' }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className={className}
  >
    <path
      d="M3 8H13M13 8L9 4M13 8L9 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ArrowUpRight = ({ className = '' }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className={className}
  >
    <path
      d="M4 12L12 4M12 4H6M12 4V10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const GitHub = ({ className = '' }: { className?: string }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    className={className}
  >
    <path
      d="M9 1C4.58 1 1 4.58 1 9C1 12.54 3.29 15.53 6.47 16.59C6.87 16.66 7.02 16.42 7.02 16.21C7.02 16.02 7.01 15.39 7.01 14.72C5 15.09 4.48 14.23 4.32 13.78C4.23 13.55 3.84 12.84 3.5 12.65C3.22 12.5 2.82 12.13 3.49 12.12C4.12 12.11 4.57 12.7 4.72 12.94C5.44 14.15 6.59 13.81 7.05 13.6C7.12 13.08 7.33 12.73 7.56 12.53C5.78 12.33 3.92 11.64 3.92 8.58C3.92 7.68 4.23 6.94 4.74 6.36C4.66 6.16 4.38 5.32 4.82 4.19C4.82 4.19 5.49 3.98 7.02 5.04C7.66 4.86 8.34 4.77 9.02 4.77C9.7 4.77 10.38 4.86 11.02 5.04C12.55 3.97 13.22 4.19 13.22 4.19C13.66 5.32 13.38 6.16 13.3 6.36C13.81 6.94 14.12 7.67 14.12 8.58C14.12 11.65 12.25 12.33 10.47 12.53C10.76 12.78 11.01 13.26 11.01 14.01C11.01 15.08 11 15.94 11 16.21C11 16.42 11.15 16.67 11.55 16.59C14.71 15.53 17 12.53 17 9C17 4.58 13.42 1 9 1Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Discord = ({ className = '' }: { className?: string }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    className={className}
  >
    <path
      d="M14.5 4.5C13.4 4 12.22 3.64 11 3.5C10.87 3.73 10.72 4.04 10.62 4.29C9.32 4.16 8.03 4.16 6.75 4.29C6.65 4.04 6.49 3.73 6.36 3.5C5.14 3.64 3.95 4 2.85 4.51C0.63 7.79 0.04 10.98 0.34 14.13C1.76 15.18 3.14 15.82 4.5 16.25C4.82 15.81 5.11 15.34 5.35 14.85C4.88 14.68 4.43 14.46 4 14.21C4.11 14.13 4.22 14.04 4.32 13.95C7.03 15.21 9.99 15.21 12.68 13.95C12.79 14.04 12.89 14.13 13 14.21C12.57 14.46 12.12 14.68 11.65 14.85C11.89 15.34 12.18 15.81 12.5 16.25C13.86 15.82 15.24 15.18 16.66 14.13C17.02 10.48 16.1 7.32 14.5 4.5ZM6 12.25C5.18 12.25 4.5 11.47 4.5 10.5C4.5 9.53 5.16 8.75 6 8.75C6.84 8.75 7.52 9.53 7.5 10.5C7.5 11.47 6.84 12.25 6 12.25ZM12 12.25C11.18 12.25 10.5 11.47 10.5 10.5C10.5 9.53 11.16 8.75 12 8.75C12.84 8.75 13.52 9.53 13.5 10.5C13.5 11.47 12.84 12.25 12 12.25Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
```

---

## Required npm Packages

```json
{
  "dependencies": {
    "next": "^16.4.0",
    "react": "^19.3.0",
    "react-dom": "^19.3.0",
    "motion": "^14.14.0",
    "lenis": "^1.3.0",
    "gsap": "^3.15.0"
  },
  "devDependencies": {
    "typescript": "^7.0.0",
    "@types/react": "^19.3.0",
    "@types/node": "^26.6.0",
    "tailwindcss": "^4.3.0",
    "@tailwindcss/postcss": "^4.3.0",
    "postcss": "^8.5.0"
  }
}
```

---

## Sample Data Structure

```typescript
// src/data/content.ts

export interface SiteContent {
  brand: {
    name: string;
  };
  hero: {
    headline: string;
    subtext: string;
    cta: {
      text: string;
      href: string;
    };
  };
  productShowcase: {
    imageSrc: string;
    imageAlt: string;
    tagline: string;
  };
  features: Array<{
    headline: string;
    subtext?: string;
    visualSrc?: string;
  }>;
  quote?: {
    text: string;
    author: string;
    role?: string;
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
    name: 'Linear',
  },
  hero: {
    headline: 'Build software\nat the speed of thought',
    subtext: 'The issue tracking tool you\'ll actually enjoy using.',
    cta: {
      text: 'Get Started',
      href: '#',
    },
  },
  productShowcase: {
    imageSrc: '/images/product.png',
    imageAlt: 'Linear interface',
    tagline: 'Designed for modern software teams.',
  },
  features: [
    {
      headline: 'Made for keyboard-first workflows',
      subtext: 'Navigate, create, and manage without reaching for your mouse.',
    },
    {
      headline: 'Integrates with your stack',
      visualSrc: '/images/integrations.png',
    },
  ],
  quote: {
    text: 'Linear is the tool we\'ve always wanted for issue tracking.',
    author: 'Guillermo Rauch',
    role: 'CEO, Vercel',
  },
  cta: {
    headline: 'Ready to build?',
    buttonText: 'Start for free',
    buttonHref: '#',
  },
  footer: {
    links: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Docs', href: '#' },
      { label: 'Privacy', href: '#' },
    ],
  },
};
```

---

## Complete Page Assembly

```tsx
// src/app/page.tsx
'use client';

import { useCinematicScroll } from '@/hooks/useCinematicScroll';
import { CinematicBackground } from '@/components/CinematicBackground';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ProductShowcase } from '@/components/ProductShowcase';
import { Feature } from '@/components/Feature';
import { FullWidthVisual } from '@/components/FullWidthVisual';
import { Quote } from '@/components/Quote';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';
import { GlassPanel } from '@/components/GlassPanel';
import { Twitter, GitHub, Discord } from '@/components/icons/CinematicIcons';
import { sampleContent } from '@/data/content';
import Image from 'next/image';

export default function Home() {
  useCinematicScroll();

  const { brand, hero, productShowcase, features, quote, cta, footer } = sampleContent;

  return (
    <>
      <CinematicBackground />

      <main className="relative z-10">
        <Header
          brandName={brand.name}
          ctaText="Get Started"
          ctaHref="#"
        />

        <Hero
          headline={hero.headline}
          subtext={hero.subtext}
          ctaText={hero.cta.text}
          ctaHref={hero.cta.href}
        />

        <ProductShowcase
          imageSrc={productShowcase.imageSrc}
          imageAlt={productShowcase.imageAlt}
          tagline={productShowcase.tagline}
        />

        <Feature
          headline={features[0].headline}
          subtext={features[0].subtext}
          visual={
            <GlassPanel className="p-8" glow="emerald">
              <div className="h-64 flex items-center justify-center text-white/30">
                Keyboard visualization
              </div>
            </GlassPanel>
          }
        />

        <FullWidthVisual
          imageSrc={features[1].visualSrc!}
          imageAlt="Integrations"
          headline={features[1].headline}
        />

        {quote && (
          <Quote
            text={quote.text}
            author={quote.author}
            role={quote.role}
          />
        )}

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
            { icon: <GitHub />, href: '#', label: 'GitHub' },
            { icon: <Discord />, href: '#', label: 'Discord' },
          ]}
        />
      </main>
    </>
  );
}
```

---

## What to ABSOLUTELY AVOID

1. **Dense Content** - NO more than 20-30 words per viewport. Let visuals speak.

2. **Bright Colors** - NO saturated colors. Everything subtle, muted, glowing softly.

3. **Multiple CTAs** - ONE call-to-action per section maximum. Often zero.

4. **Feature Lists** - NO bullet points, NO feature grids. One concept at a time.

5. **Light Mode** - This is dark mode ONLY. No light variant.

6. **Busy Animations** - NO bouncy, energetic movement. Everything slow, smooth, cinematic.

7. **Small Text** - Headlines should be 48-96px. Subtext should be sparse.

8. **Competing Elements** - ONE focal point per viewport. Everything else recedes.

9. **Testimonial Carousels** - At most ONE powerful quote. No carousel.

10. **Salesy Copy** - NO urgency, NO "limited time", NO aggressive marketing language.

11. **Crowded Layouts** - Full-height sections. Massive negative space.

12. **Fast Scroll** - Lenis lerp should be 0.07 or lower. Scrolling feels like gliding.

13. **Sharp Edges on Glass** - Glass panels need 24px+ border-radius and rim lighting.

14. **Static Backgrounds** - Gradient orbs should pulse slowly. Light flares should sweep.

15. **Generic Stock Photos** - Product mockups only. High-quality renders with depth.

---

## Responsive Considerations

```css
@layer components {
  @media (max-width: 768px) {
    .section-viewport {
      min-height: auto;
      padding: 80px 0;
    }

    .text-cinematic-headline {
      font-size: clamp(36px, 10vw, 56px);
    }

    .text-cinematic-title {
      font-size: clamp(28px, 8vw, 42px);
    }

    .glass-panel {
      border-radius: 16px;
    }

    .btn-cinematic {
      width: 100%;
      justify-content: center;
    }
  }
}
```

---

## Final Notes

This Cinematic Dark style is about **atmosphere over information**. Every scroll should feel like a scene transition in a film. Maximum impact through restraint-every element must earn its place.

Key differentiators:
- **Full-viewport sections** - one concept per screen
- **Sparse content** - 20-30 words maximum per section
- **Glass morphism** with rim lighting and light flares
- **Gradient orbs** for ambient depth
- **Very slow scroll** (lerp: 0.07) for cinematic pacing
- **Subtle parallax** on multiple layers
- **Mouse-reactive glass panels** (2-3px movement)
- **Near-black background** (#050505) with no light mode

The page should feel like a movie trailer-atmospheric, confident, mysterious. Not selling features, but evoking emotion.
