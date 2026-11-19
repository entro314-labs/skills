# Playful Geometric Landing Page - Exhaustive Technical Specification

For creative tools, design products, or when you want energetic optimism. Bold shapes, vibrant colors, and motion that brings joy. This is NOT subtle-it's a visual playground where shapes are structural elements, color is used boldly, and animation brings personality.

---

## Output Requirements

- **Framework**: Next.js 16+ with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom configuration
- **Animation**: Motion (spring physics, bouncy feel)
- **Output**: Single page component with all sections

---

## Page Structure Overview

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER - Transparent with pill nav                             │
│                                                                 │
│  ●Logo              About  Features  Pricing    [Get Started]   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  HERO - Shapes floating around text                             │
│                                                                 │
│       ▲                               ●                         │
│            ●                                                    │
│                                                                 │
│              MAKE                                               │
│              THINGS             ■                               │
│              BEAUTIFUL                                          │
│                                        ▲                        │
│     Subtext goes here in a                                      │
│     lighter weight font                      ●                  │
│                                                                 │
│        [Start Creating]     [Learn More]                        │
│                                                                 │
│    ■                                                            │
│                    ●                              ▲              │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  LOGOS MARQUEE - Bouncing on scroll                             │
│                                                                 │
│  ← Logo  Logo  Logo  Logo  Logo  Logo  Logo  Logo  Logo →       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

╭─────────────────────────────────────────────────────────────────╮
│  TILTED SECTION (-2deg) - Features Bento                        │
│                                                                 │
│   ┌──────────────────┐  ┌──────────────────┐  ┌────────────┐    │
│   │  ●               │  │      ▲           │  │            │    │
│   │  Feature 1       │  │  Feature 2       │  │  Feature 3 │    │
│   │  (BLUE bg)       │  │  (PINK bg)       │  │  (YELLOW)  │    │
│   │                  │  │                  │  │            │    │
│   └──────────────────┘  └──────────────────┘  └────────────┘    │
│   ┌────────────────────────────┐  ┌────────────────────────┐    │
│   │                            │  │        ■               │    │
│   │  Feature 4 (LARGE)         │  │  Feature 5             │    │
│   │  (GREEN bg)                │  │  (PURPLE bg)           │    │
│   └────────────────────────────┘  └────────────────────────┘    │
│                                                                 │
╰─────────────────────────────────────────────────────────────────╯

┌─────────────────────────────────────────────────────────────────┐
│  HOW IT WORKS - Numbered steps with bouncing shapes             │
│                                                                 │
│        (1)                   (2)                   (3)          │
│     ╭──────╮             ╭──────╮             ╭──────╮          │
│     │      │             │      │             │      │          │
│     │  ●   │  ───────▶   │  ■   │  ───────▶   │  ▲   │          │
│     │      │             │      │             │      │          │
│     ╰──────╯             ╰──────╯             ╰──────╯          │
│      Sign Up              Create               Share            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  TESTIMONIALS - Cards with random rotation                      │
│                                                                 │
│   ┌──────────────┐                                              │
│   │ "Quote..."   │  ┌──────────────┐                            │
│   │ - Name       │  │ "Quote..."   │   ┌──────────────┐         │
│   │ (rotate -3°) │  │ - Name       │   │ "Quote..."   │         │
│   └──────────────┘  │ (rotate 2°)  │   │ - Name       │         │
│                     └──────────────┘   │ (rotate -2°) │         │
│                                        └──────────────┘         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  PRICING - Pill-shaped cards                                    │
│                                                                 │
│   ╭──────────────╮  ╭──────────────────╮  ╭──────────────╮      │
│   │              │  │   POPULAR ●      │  │              │      │
│   │    Free      │  │                  │  │     Pro      │      │
│   │    $0        │  │      Plus        │  │     $49      │      │
│   │              │  │      $19         │  │              │      │
│   │  [Start]     │  │                  │  │  [Start]     │      │
│   │              │  │    [Start]       │  │              │      │
│   ╰──────────────╯  ╰──────────────────╯  ╰──────────────╯      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  CTA - Full-width with floating shapes                          │
│                                                                 │
│      ●                                                          │
│              Ready to create                                    │
│                something amazing?         ▲                     │
│                                                                 │
│                  [Get Started Free]                             │
│    ■                                              ●             │
│                         ▲                                       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  FOOTER - Clean with colorful accents                           │
│                                                                 │
│  Logo          Product    Company    Resources    Legal         │
│                Link       Link       Link         Link          │
│                Link       Link       Link         Link          │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│  © 2024 Brand    ●  ■  ▲                      Twitter  GitHub   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Color System

### CSS Custom Properties

```css
:root {
  /* Primary Palette - Bold & Vibrant */
  --play-blue: #3B82F6;
  --play-blue-light: #60A5FA;
  --play-blue-dark: #2563EB;

  --play-pink: #EC4899;
  --play-pink-light: #F472B6;
  --play-pink-dark: #DB2777;

  --play-yellow: #FBBF24;
  --play-yellow-light: #FCD34D;
  --play-yellow-dark: #F59E0B;

  --play-green: #10B981;
  --play-green-light: #34D399;
  --play-green-dark: #059669;

  --play-purple: #8B5CF6;
  --play-purple-light: #A78BFA;
  --play-purple-dark: #7C3AED;

  --play-orange: #F97316;
  --play-orange-light: #FB923C;
  --play-orange-dark: #EA580C;

  /* Backgrounds */
  --bg-primary: #FAFAFA;
  --bg-secondary: #F4F4F5;
  --bg-dark: #18181B;

  /* Text */
  --text-primary: #18181B;
  --text-secondary: #52525B;
  --text-light: #A1A1AA;
  --text-inverse: #FAFAFA;

  /* Shadows (Colorful) */
  --shadow-blue: 0 10px 30px -5px rgba(59, 130, 246, 0.4);
  --shadow-pink: 0 10px 30px -5px rgba(236, 72, 153, 0.4);
  --shadow-yellow: 0 10px 30px -5px rgba(251, 191, 36, 0.4);
  --shadow-green: 0 10px 30px -5px rgba(16, 185, 129, 0.4);
  --shadow-purple: 0 10px 30px -5px rgba(139, 92, 246, 0.4);
}
```

### Tailwind Theme

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  --color-play-blue: #3B82F6;
  --color-play-blue-light: #60A5FA;
  --color-play-blue-dark: #2563EB;
  --color-play-pink: #EC4899;
  --color-play-pink-light: #F472B6;
  --color-play-pink-dark: #DB2777;
  --color-play-yellow: #FBBF24;
  --color-play-yellow-light: #FCD34D;
  --color-play-yellow-dark: #F59E0B;
  --color-play-green: #10B981;
  --color-play-green-light: #34D399;
  --color-play-green-dark: #059669;
  --color-play-purple: #8B5CF6;
  --color-play-purple-light: #A78BFA;
  --color-play-purple-dark: #7C3AED;
  --color-play-orange: #F97316;
  --color-play-orange-light: #FB923C;
  --color-play-orange-dark: #EA580C;

  --text-display-xl: clamp(56px, 12vw, 140px);
  --text-display-xl--line-height: 1.0;
  --text-display-xl--letter-spacing: -0.03em;
  --text-display-lg: clamp(48px, 10vw, 96px);
  --text-display-lg--line-height: 1.05;
  --text-display-lg--letter-spacing: -0.02em;
  --text-display-md: clamp(36px, 6vw, 64px);
  --text-display-md--line-height: 1.1;
  --text-display-md--letter-spacing: -0.02em;
  --text-display-sm: clamp(28px, 4vw, 40px);
  --text-display-sm--line-height: 1.2;
  --text-display-sm--letter-spacing: -0.01em;
  --text-body-lg: 20px;
  --text-body-lg--line-height: 1.6;
  --text-body: 16px;
  --text-body--line-height: 1.6;
  --text-body-sm: 14px;
  --text-body-sm--line-height: 1.5;

  --radius-pill: 100px;
  --radius-blob: 30% 70% 70% 30% / 30% 30% 70% 70%;
  --radius-2xl: 20px;
  --radius-3xl: 28px;
  --radius-4xl: 36px;

  --shadow-play-blue: 0 10px 30px -5px rgba(59, 130, 246, 0.4);
  --shadow-play-pink: 0 10px 30px -5px rgba(236, 72, 153, 0.4);
  --shadow-play-yellow: 0 10px 30px -5px rgba(251, 191, 36, 0.4);
  --shadow-play-green: 0 10px 30px -5px rgba(16, 185, 129, 0.4);
  --shadow-play-purple: 0 10px 30px -5px rgba(139, 92, 246, 0.4);
  --shadow-play-orange: 0 10px 30px -5px rgba(249, 115, 22, 0.4);
  --shadow-card: 0 4px 20px rgba(0, 0, 0, 0.08);
  --shadow-card-hover: 0 20px 40px rgba(0, 0, 0, 0.12);

  --animate-float: float 6s ease-in-out infinite;
  --animate-float-delayed: float 6s ease-in-out 2s infinite;
  --animate-spin-slow: spin 30s linear infinite;
  --animate-bounce-gentle: bounce-gentle 2s ease-in-out infinite;
  --animate-wiggle: wiggle 2s ease-in-out infinite;

  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }
  @keyframes bounce-gentle {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  @keyframes wiggle {
    0%, 100% { transform: rotate(-3deg); }
    50% { transform: rotate(3deg); }
  }
}

@theme inline {
  --font-sans: var(--font-space-grotesk), system-ui, sans-serif;
  --font-display: var(--font-cabinet), var(--font-space-grotesk), system-ui, sans-serif;
}

/* No theme entry needed in v4: font-normal, font-medium, font-semibold, font-bold, font-extrabold, -rotate-3, -rotate-2, rotate-2, rotate-3, rotate-5 */
```

---

## Typography System

### Font Loading

```typescript
// src/app/layout.tsx
import { Space_Grotesk } from 'next/font/google';
import localFont from 'next/font/local';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

// Optional: If using Cabinet Grotesk (self-hosted)
const cabinetGrotesk = localFont({
  src: [
    { path: '../fonts/CabinetGrotesk-Medium.woff2', weight: '500' },
    { path: '../fonts/CabinetGrotesk-Bold.woff2', weight: '700' },
    { path: '../fonts/CabinetGrotesk-Extrabold.woff2', weight: '800' },
  ],
  variable: '--font-cabinet',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${cabinetGrotesk.variable}`}>
      <body className="bg-white text-zinc-900 font-sans antialiased">
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
    background-color: #FAFAFA;
    color: #18181B;
    font-family: var(--font-space-grotesk);
    font-weight: 400;
  }

  ::selection {
    background-color: #EC4899;
    color: white;
  }
}

@layer components {
  /* Display Typography - Bold */
  .text-play-display {
    font-family: var(--font-cabinet), var(--font-space-grotesk);
    font-weight: 800;
    font-size: clamp(56px, 12vw, 140px);
    line-height: 1.0;
    letter-spacing: -0.03em;
    color: #18181B;
  }

  .text-play-headline {
    font-family: var(--font-cabinet), var(--font-space-grotesk);
    font-weight: 700;
    font-size: clamp(48px, 10vw, 96px);
    line-height: 1.05;
    letter-spacing: -0.02em;
  }

  .text-play-title {
    font-family: var(--font-space-grotesk);
    font-weight: 700;
    font-size: clamp(28px, 4vw, 40px);
    line-height: 1.2;
    letter-spacing: -0.01em;
  }

  .text-play-subtitle {
    font-family: var(--font-space-grotesk);
    font-weight: 500;
    font-size: 20px;
    line-height: 1.5;
    color: #52525B;
  }

  /* Body Typography */
  .text-play-body {
    font-family: var(--font-space-grotesk);
    font-weight: 400;
    font-size: 16px;
    line-height: 1.6;
    color: #52525B;
  }

  .text-play-body-lg {
    font-family: var(--font-space-grotesk);
    font-weight: 400;
    font-size: 20px;
    line-height: 1.6;
  }

  /* Caption/Label */
  .text-play-caption {
    font-family: var(--font-space-grotesk);
    font-weight: 600;
    font-size: 12px;
    line-height: 1.4;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  /* Colorful text utilities */
  .text-gradient-play {
    background: linear-gradient(135deg, #3B82F6, #EC4899, #FBBF24);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}
```

---

## Shape System

### CSS Shape Definitions

```css
@layer components {
  /* Circle */
  .shape-circle {
    border-radius: 50%;
  }

  /* Pill */
  .shape-pill {
    border-radius: 100px;
  }

  /* Blob rectangle */
  .shape-blob {
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  }

  /* Squircle */
  .shape-squircle {
    border-radius: 28px;
  }

  /* Triangle (CSS) */
  .shape-triangle {
    width: 0;
    height: 0;
    border-left: 40px solid transparent;
    border-right: 40px solid transparent;
    border-bottom: 70px solid currentColor;
  }

  .shape-triangle-sm {
    border-left-width: 20px;
    border-right-width: 20px;
    border-bottom-width: 35px;
  }

  .shape-triangle-lg {
    border-left-width: 60px;
    border-right-width: 60px;
    border-bottom-width: 105px;
  }

  /* Square with rotation */
  .shape-square {
    border-radius: 8px;
  }

  /* Star (using clip-path) */
  .shape-star {
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  }
}
```

### Floating Shape Component

```tsx
// src/components/FloatingShape.tsx
'use client';

import { motion } from 'motion/react';

type ShapeType = 'circle' | 'square' | 'triangle';
type ColorType = 'blue' | 'pink' | 'yellow' | 'green' | 'purple' | 'orange';

interface FloatingShapeProps {
  type: ShapeType;
  color: ColorType;
  size: number;
  position: { x: string; y: string };
  delay?: number;
  duration?: number;
  rotate?: number;
}

const colorMap: Record<ColorType, string> = {
  blue: '#3B82F6',
  pink: '#EC4899',
  yellow: '#FBBF24',
  green: '#10B981',
  purple: '#8B5CF6',
  orange: '#F97316',
};

export function FloatingShape({
  type,
  color,
  size,
  position,
  delay = 0,
  duration = 6,
  rotate = 0,
}: FloatingShapeProps) {
  const bgColor = colorMap[color];

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: position.x,
        top: position.y,
        width: type === 'triangle' ? 0 : size,
        height: type === 'triangle' ? 0 : size,
        ...(type === 'circle' && { borderRadius: '50%', backgroundColor: bgColor }),
        ...(type === 'square' && { borderRadius: '8px', backgroundColor: bgColor }),
        ...(type === 'triangle' && {
          borderLeft: `${size / 2}px solid transparent`,
          borderRight: `${size / 2}px solid transparent`,
          borderBottom: `${size * 0.866}px solid ${bgColor}`,
        }),
      }}
      initial={{ rotate, y: 0 }}
      animate={{
        rotate: rotate + 360,
        y: [-20, 0, -20],
      }}
      transition={{
        rotate: {
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        },
        y: {
          duration,
          delay,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
    />
  );
}
```

### Background Shapes Container

```tsx
// src/components/BackgroundShapes.tsx
'use client';

import { FloatingShape } from './FloatingShape';

export function BackgroundShapes() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Top left */}
      <FloatingShape
        type="circle"
        color="blue"
        size={80}
        position={{ x: '10%', y: '15%' }}
        delay={0}
      />
      <FloatingShape
        type="triangle"
        color="pink"
        size={60}
        position={{ x: '5%', y: '40%' }}
        delay={1}
        rotate={15}
      />

      {/* Top right */}
      <FloatingShape
        type="square"
        color="yellow"
        size={50}
        position={{ x: '85%', y: '10%' }}
        delay={0.5}
        rotate={-10}
      />
      <FloatingShape
        type="circle"
        color="green"
        size={40}
        position={{ x: '90%', y: '35%' }}
        delay={2}
      />

      {/* Bottom left */}
      <FloatingShape
        type="square"
        color="purple"
        size={70}
        position={{ x: '8%', y: '75%' }}
        delay={1.5}
        rotate={20}
      />

      {/* Bottom right */}
      <FloatingShape
        type="triangle"
        color="orange"
        size={55}
        position={{ x: '88%', y: '70%' }}
        delay={2.5}
        rotate={-15}
      />
      <FloatingShape
        type="circle"
        color="pink"
        size={35}
        position={{ x: '75%', y: '85%' }}
        delay={0.8}
      />
    </div>
  );
}
```

---

## Animation System

### Core Animation Values

```typescript
// src/lib/animations.ts
import { Variants, Transition } from 'motion/react';

// Playful spring - bouncy
export const playfulSpring: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 15,
};

// Extra bouncy spring
export const bouncySpring: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 10,
};

// Gentle spring
export const gentleSpring: Transition = {
  type: 'spring',
  stiffness: 150,
  damping: 20,
};

// Quick tween
export const quickTween: Transition = {
  type: 'tween',
  duration: 0.3,
  ease: 'easeOut',
};

// Fade in with bounce
export const fadeInBounce: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
    },
  },
};

// Pop in
export const popIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 15,
    },
  },
};

// Stagger container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Stagger item with bounce
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
    },
  },
};

// Wiggle animation for shapes
export const wiggle: Variants = {
  initial: { rotate: 0 },
  animate: {
    rotate: [-3, 3, -3],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Hover lift
export const hoverLift = {
  y: -10,
  scale: 1.05,
  transition: playfulSpring,
};

// Hover rotate
export const hoverRotate = {
  rotate: 5,
  scale: 1.1,
  transition: playfulSpring,
};

// Tap squish
export const tapSquish = {
  scale: 0.95,
  transition: { duration: 0.1 },
};
```

### Scroll-Triggered Animation Component

```tsx
// src/components/AnimateInView.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef, ReactNode } from 'react';
import { fadeInBounce, popIn, playfulSpring } from '@/lib/animations';

interface AnimateInViewProps {
  children: ReactNode;
  variant?: 'bounce' | 'pop' | 'slide';
  delay?: number;
  className?: string;
}

export function AnimateInView({
  children,
  variant = 'bounce',
  delay = 0,
  className = '',
}: AnimateInViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  const variants = variant === 'pop' ? popIn : fadeInBounce;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

---

## Tilted Section Component

```tsx
// src/components/TiltedSection.tsx
'use client';

import { ReactNode } from 'react';

interface TiltedSectionProps {
  children: ReactNode;
  angle?: number;
  bgColor?: string;
  className?: string;
}

export function TiltedSection({
  children,
  angle = -2,
  bgColor = '#F4F4F5',
  className = '',
}: TiltedSectionProps) {
  return (
    <section
      className={`relative py-24 md:py-32 my-12 ${className}`}
      style={{
        transform: `rotate(${angle}deg)`,
        marginLeft: '-5vw',
        marginRight: '-5vw',
        paddingLeft: 'calc(5vw + 24px)',
        paddingRight: 'calc(5vw + 24px)',
        backgroundColor: bgColor,
      }}
    >
      <div
        style={{ transform: `rotate(${-angle}deg)` }}
        className="max-w-7xl mx-auto"
      >
        {children}
      </div>
    </section>
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
import { playfulSpring, tapSquish } from '@/lib/animations';

interface HeaderProps {
  brandName: string;
  navItems: Array<{ label: string; href: string }>;
  ctaText: string;
  ctaHref: string;
}

export function Header({ brandName, navItems, ctaText, ctaHref }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={playfulSpring}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-zinc-100"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            {/* Colorful shape logo */}
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-play-blue" />
              <div className="w-3 h-3 rounded-full bg-play-pink" />
              <div className="w-3 h-3 rounded-full bg-play-yellow" />
            </div>
            <span className="font-bold text-lg">{brandName}</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.div
                key={item.href}
                whileHover={{ y: -2 }}
                transition={playfulSpring}
              >
                <Link
                  href={item.href}
                  className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px -5px rgba(59, 130, 246, 0.4)' }}
            whileTap={tapSquish}
            transition={playfulSpring}
          >
            <Link
              href={ctaHref}
              className="btn-play-primary"
            >
              {ctaText}
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
```

---

### 2. Hero Component

```tsx
// src/components/Hero.tsx
'use client';

import { motion } from 'motion/react';
import { staggerContainer, staggerItem, playfulSpring, tapSquish } from '@/lib/animations';
import { FloatingShape } from './FloatingShape';

interface HeroProps {
  headline: string[];
  subtext: string;
  primaryCta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
}

export function Hero({ headline, subtext, primaryCta, secondaryCta }: HeroProps) {
  // Split headline into colorful words
  const colors = ['text-play-blue', 'text-play-pink', 'text-play-yellow'];

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingShape type="circle" color="blue" size={100} position={{ x: '8%', y: '20%' }} />
        <FloatingShape type="triangle" color="pink" size={70} position={{ x: '85%', y: '15%' }} rotate={20} />
        <FloatingShape type="square" color="yellow" size={60} position={{ x: '75%', y: '60%' }} rotate={-15} />
        <FloatingShape type="circle" color="green" size={50} position={{ x: '12%', y: '70%' }} delay={1} />
        <FloatingShape type="triangle" color="purple" size={45} position={{ x: '90%', y: '75%' }} rotate={10} delay={1.5} />
        <FloatingShape type="square" color="orange" size={40} position={{ x: '5%', y: '50%' }} rotate={25} delay={2} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Headline with colored words */}
          <motion.h1
            variants={staggerItem}
            className="text-play-display mb-8"
          >
            {headline.map((word, index) => (
              <span
                key={index}
                className={`block ${colors[index % colors.length]}`}
              >
                {word}
              </span>
            ))}
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={staggerItem}
            className="text-play-subtitle max-w-xl mx-auto mb-12"
          >
            {subtext}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href={primaryCta.href}
              className="btn-play-primary"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px -5px rgba(59, 130, 246, 0.4)' }}
              whileTap={tapSquish}
              transition={playfulSpring}
            >
              {primaryCta.text}
            </motion.a>
            <motion.a
              href={secondaryCta.href}
              className="btn-play-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={tapSquish}
              transition={playfulSpring}
            >
              {secondaryCta.text}
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
```

---

### 3. Logo Marquee Component

```tsx
// src/components/LogoMarquee.tsx
'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

interface LogoMarqueeProps {
  logos: Array<{ src: string; alt: string }>;
}

export function LogoMarquee({ logos }: LogoMarqueeProps) {
  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="py-16 overflow-hidden bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <p className="text-play-caption text-zinc-400">
          Trusted by teams at
        </p>
      </div>

      <div className="relative">
        <motion.div
          className="flex gap-16 items-center"
          animate={{ x: [0, -1920] }}
          transition={{
            x: {
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <motion.div
              key={index}
              className="shrink-0 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              whileHover={{ scale: 1.1, y: -5 }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

---

### 4. Features Bento Grid

```tsx
// src/components/FeaturesBento.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { staggerContainer, staggerItem, playfulSpring, hoverLift } from '@/lib/animations';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: 'blue' | 'pink' | 'yellow' | 'green' | 'purple';
  size: 'small' | 'medium' | 'large';
}

interface FeaturesBentoProps {
  features: Feature[];
}

const colorClasses = {
  blue: 'bg-play-blue text-white',
  pink: 'bg-play-pink text-white',
  yellow: 'bg-play-yellow text-zinc-900',
  green: 'bg-play-green text-white',
  purple: 'bg-play-purple text-white',
};

const sizeClasses = {
  small: 'col-span-1 row-span-1',
  medium: 'col-span-1 md:col-span-2 row-span-1',
  large: 'col-span-1 md:col-span-2 row-span-2',
};

export function FeaturesBento({ features }: FeaturesBentoProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section ref={ref} className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              whileHover={hoverLift}
              className={`
                ${colorClasses[feature.color]}
                ${sizeClasses[feature.size]}
                rounded-3xl p-8 cursor-pointer
              `}
            >
              {/* Icon */}
              <div className="mb-6 text-4xl">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-play-title text-2xl mb-4">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="opacity-90">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

---

### 5. How It Works Section

```tsx
// src/components/HowItWorks.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { staggerContainer, staggerItem, playfulSpring } from '@/lib/animations';

interface Step {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: 'blue' | 'pink' | 'yellow';
}

interface HowItWorksProps {
  headline: string;
  steps: Step[];
}

const colorClasses = {
  blue: 'bg-play-blue',
  pink: 'bg-play-pink',
  yellow: 'bg-play-yellow',
};

export function HowItWorks({ headline, steps }: HowItWorksProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={playfulSpring}
          className="text-play-headline text-center mb-20"
        >
          {headline}
        </motion.h2>

        {/* Steps */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              className="text-center relative"
            >
              {/* Connector line (not on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-zinc-200">
                  <motion.div
                    className={`h-full ${colorClasses[step.color]}`}
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
                    style={{ transformOrigin: 'left' }}
                  />
                </div>
              )}

              {/* Circle with icon */}
              <motion.div
                className={`
                  w-32 h-32 mx-auto mb-8 rounded-full
                  ${colorClasses[step.color]}
                  flex items-center justify-center text-white text-4xl
                  shadow-lg
                `}
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={playfulSpring}
              >
                {step.icon}
              </motion.div>

              {/* Number */}
              <p className="text-play-caption text-zinc-400 mb-2">
                Step {step.number}
              </p>

              {/* Title */}
              <h3 className="text-play-title text-xl mb-4">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-play-body max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

---

### 6. Testimonials Section

```tsx
// src/components/Testimonials.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import Image from 'next/image';
import { staggerContainer, staggerItem, playfulSpring } from '@/lib/animations';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rotation: number;
}

interface TestimonialsProps {
  headline: string;
  testimonials: Testimonial[];
}

export function Testimonials({ headline, testimonials }: TestimonialsProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section ref={ref} className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={playfulSpring}
          className="text-play-headline text-center mb-20"
        >
          {headline}
        </motion.h2>

        {/* Testimonial cards with random rotation */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              whileHover={{
                y: -10,
                rotate: 0,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
              }}
              transition={playfulSpring}
              className="bg-white rounded-3xl p-8 shadow-card cursor-pointer"
              style={{ rotate: `${testimonial.rotation}deg` }}
            >
              {/* Quote */}
              <p className="text-play-body-lg text-zinc-800 mb-8">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold text-zinc-900">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-zinc-500">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

---

### 7. Pricing Section

```tsx
// src/components/Pricing.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { staggerContainer, staggerItem, playfulSpring, tapSquish } from '@/lib/animations';

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  popular?: boolean;
  color: 'blue' | 'pink' | 'purple';
}

interface PricingProps {
  headline: string;
  tiers: PricingTier[];
}

const borderColorClasses = {
  blue: 'border-play-blue',
  pink: 'border-play-pink',
  purple: 'border-play-purple',
};

const bgColorClasses = {
  blue: 'bg-play-blue',
  pink: 'bg-play-pink',
  purple: 'bg-play-purple',
};

export function Pricing({ headline, tiers }: PricingProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-zinc-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={playfulSpring}
          className="text-play-headline text-center mb-20"
        >
          {headline}
        </motion.h2>

        {/* Pricing cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={playfulSpring}
              className={`
                relative bg-white rounded-[40px] p-8 shadow-card
                ${tier.popular ? `border-4 ${borderColorClasses[tier.color]}` : 'border border-zinc-100'}
              `}
            >
              {/* Popular badge */}
              {tier.popular && (
                <div className={`
                  absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1
                  ${bgColorClasses[tier.color]} text-white text-sm font-semibold
                  rounded-full
                `}>
                  Most Popular
                </div>
              )}

              {/* Name */}
              <h3 className="text-xl font-semibold text-zinc-900 mb-2">
                {tier.name}
              </h3>

              {/* Price */}
              <div className="mb-4">
                <span className="text-5xl font-bold text-zinc-900">
                  {tier.price}
                </span>
                <span className="text-zinc-500">
                  /{tier.period}
                </span>
              </div>

              {/* Description */}
              <p className="text-zinc-500 mb-8">
                {tier.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <span className={`w-5 h-5 rounded-full ${bgColorClasses[tier.color]} flex items-center justify-center`}>
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                      </svg>
                    </span>
                    <span className="text-zinc-600">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.a
                href={tier.ctaHref}
                className={`
                  block w-full py-4 text-center font-semibold rounded-full
                  ${tier.popular
                    ? `${bgColorClasses[tier.color]} text-white`
                    : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'
                  }
                  transition-colors
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={tapSquish}
                transition={playfulSpring}
              >
                {tier.ctaText}
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

---

### 8. CTA Section

```tsx
// src/components/CTA.tsx
'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { playfulSpring, tapSquish } from '@/lib/animations';
import { FloatingShape } from './FloatingShape';

interface CTAProps {
  headline: string;
  subtext: string;
  buttonText: string;
  buttonHref: string;
}

export function CTA({ headline, subtext, buttonText, buttonHref }: CTAProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section ref={ref} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingShape type="circle" color="blue" size={120} position={{ x: '5%', y: '20%' }} />
        <FloatingShape type="triangle" color="pink" size={80} position={{ x: '90%', y: '15%' }} rotate={15} />
        <FloatingShape type="square" color="yellow" size={60} position={{ x: '85%', y: '70%' }} rotate={-20} />
        <FloatingShape type="circle" color="green" size={50} position={{ x: '10%', y: '75%' }} delay={1} />
        <FloatingShape type="triangle" color="purple" size={70} position={{ x: '50%', y: '80%' }} rotate={30} delay={1.5} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={playfulSpring}
          className="text-play-headline mb-6"
        >
          {headline}
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ ...playfulSpring, delay: 0.1 }}
          className="text-play-subtitle mb-12"
        >
          {subtext}
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ ...playfulSpring, delay: 0.2 }}
        >
          <motion.a
            href={buttonHref}
            className="btn-play-primary btn-play-lg"
            whileHover={{ scale: 1.1, boxShadow: '0 15px 40px -5px rgba(59, 130, 246, 0.5)' }}
            whileTap={tapSquish}
            transition={playfulSpring}
          >
            {buttonText}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
```

---

### 9. Footer Component

```tsx
// src/components/Footer.tsx
'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

interface FooterProps {
  brandName: string;
  columns: Array<{
    title: string;
    links: Array<{ label: string; href: string }>;
  }>;
  socialLinks: Array<{ icon: React.ReactNode; href: string; label: string }>;
}

export function Footer({ brandName, columns, socialLinks }: FooterProps) {
  return (
    <footer className="bg-zinc-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-play-blue" />
                <div className="w-3 h-3 rounded-full bg-play-pink" />
                <div className="w-3 h-3 rounded-full bg-play-yellow" />
              </div>
              <span className="font-bold text-lg">{brandName}</span>
            </div>

            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-zinc-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((column, index) => (
            <div key={index}>
              <h4 className="font-semibold text-sm text-zinc-400 uppercase tracking-wider mb-4">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-zinc-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} {brandName}. All rights reserved.
          </p>

          {/* Decorative shapes */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-play-blue" />
            <div className="w-2 h-2 rounded-sm bg-play-pink" />
            <div
              className="w-0 h-0"
              style={{
                borderLeft: '4px solid transparent',
                borderRight: '4px solid transparent',
                borderBottom: '7px solid #FBBF24',
              }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
```

---

## Button Components

```css
@layer components {
  /* Primary button - pill shape with color */
  .btn-play-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px 28px;
    background-color: #3B82F6;
    color: white;
    border: none;
    border-radius: 100px;
    font-family: var(--font-space-grotesk);
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-play-primary:hover {
    background-color: #2563EB;
  }

  /* Large variant */
  .btn-play-lg {
    padding: 18px 36px;
    font-size: 18px;
  }

  /* Secondary button - outline */
  .btn-play-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px 28px;
    background-color: transparent;
    color: #18181B;
    border: 2px solid #E4E4E7;
    border-radius: 100px;
    font-family: var(--font-space-grotesk);
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-play-secondary:hover {
    border-color: #18181B;
    background-color: #18181B;
    color: white;
  }

  /* Color variants */
  .btn-play-pink {
    background-color: #EC4899;
  }
  .btn-play-pink:hover {
    background-color: #DB2777;
  }

  .btn-play-yellow {
    background-color: #FBBF24;
    color: #18181B;
  }
  .btn-play-yellow:hover {
    background-color: #F59E0B;
  }

  .btn-play-green {
    background-color: #10B981;
  }
  .btn-play-green:hover {
    background-color: #059669;
  }

  .btn-play-purple {
    background-color: #8B5CF6;
  }
  .btn-play-purple:hover {
    background-color: #7C3AED;
  }
}
```

---

## Required npm Packages

```json
{
  "dependencies": {
    "next": "^16.4.0",
    "react": "^19.3.0",
    "react-dom": "^19.3.0",
    "motion": "^14.14.0"
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
  navigation: Array<{ label: string; href: string }>;
  hero: {
    headline: string[];
    subtext: string;
    primaryCta: { text: string; href: string };
    secondaryCta: { text: string; href: string };
  };
  logos: Array<{ src: string; alt: string }>;
  features: Array<{
    title: string;
    description: string;
    icon: string;
    color: 'blue' | 'pink' | 'yellow' | 'green' | 'purple';
    size: 'small' | 'medium' | 'large';
  }>;
  howItWorks: {
    headline: string;
    steps: Array<{
      number: string;
      title: string;
      description: string;
      icon: string;
      color: 'blue' | 'pink' | 'yellow';
    }>;
  };
  testimonials: {
    headline: string;
    items: Array<{
      quote: string;
      author: string;
      role: string;
      company: string;
      avatar: string;
      rotation: number;
    }>;
  };
  pricing: {
    headline: string;
    tiers: Array<{
      name: string;
      price: string;
      period: string;
      description: string;
      features: string[];
      ctaText: string;
      ctaHref: string;
      popular?: boolean;
      color: 'blue' | 'pink' | 'purple';
    }>;
  };
  cta: {
    headline: string;
    subtext: string;
    buttonText: string;
    buttonHref: string;
  };
  footer: {
    columns: Array<{
      title: string;
      links: Array<{ label: string; href: string }>;
    }>;
  };
}

export const sampleContent: SiteContent = {
  brand: {
    name: 'Playful',
  },
  navigation: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
  ],
  hero: {
    headline: ['MAKE', 'THINGS', 'BEAUTIFUL'],
    subtext: 'The creative toolkit that brings your wildest ideas to life. Design, animate, and ship faster than ever.',
    primaryCta: { text: 'Start Creating', href: '#' },
    secondaryCta: { text: 'Learn More', href: '#' },
  },
  logos: [
    { src: '/logos/logo1.svg', alt: 'Company 1' },
    { src: '/logos/logo2.svg', alt: 'Company 2' },
    { src: '/logos/logo3.svg', alt: 'Company 3' },
    { src: '/logos/logo4.svg', alt: 'Company 4' },
    { src: '/logos/logo5.svg', alt: 'Company 5' },
    { src: '/logos/logo6.svg', alt: 'Company 6' },
  ],
  features: [
    { title: 'Lightning Fast', description: 'Build in minutes, not hours.', icon: '⚡', color: 'blue', size: 'medium' },
    { title: 'Beautiful by Default', description: 'Every design looks stunning.', icon: '✨', color: 'pink', size: 'small' },
    { title: 'Collaborative', description: 'Work together seamlessly.', icon: '👥', color: 'yellow', size: 'small' },
    { title: 'Powerful Animations', description: 'Bring your designs to life with buttery smooth animations.', icon: '🎬', color: 'green', size: 'large' },
    { title: 'Export Anywhere', description: 'Ship to any platform.', icon: '🚀', color: 'purple', size: 'medium' },
  ],
  howItWorks: {
    headline: 'How it works',
    steps: [
      { number: '1', title: 'Sign Up', description: 'Create your free account in seconds.', icon: '📝', color: 'blue' },
      { number: '2', title: 'Create', description: 'Build something amazing with our tools.', icon: '🎨', color: 'pink' },
      { number: '3', title: 'Share', description: 'Show the world what you made.', icon: '🌍', color: 'yellow' },
    ],
  },
  testimonials: {
    headline: 'Loved by creators',
    items: [
      { quote: 'This tool changed how I approach design. Everything is so intuitive!', author: 'Sarah Chen', role: 'Designer', company: 'Figma', avatar: '/avatars/1.jpg', rotation: -3 },
      { quote: 'The animations are incredible. My clients are always impressed.', author: 'Marcus Johnson', role: 'Creative Director', company: 'Studio', avatar: '/avatars/2.jpg', rotation: 2 },
      { quote: 'Finally, a tool that keeps up with my creativity.', author: 'Emma Wilson', role: 'Illustrator', company: 'Freelance', avatar: '/avatars/3.jpg', rotation: -2 },
    ],
  },
  pricing: {
    headline: 'Simple pricing',
    tiers: [
      { name: 'Free', price: '$0', period: 'month', description: 'Perfect for getting started', features: ['5 projects', 'Basic shapes', 'Community support'], ctaText: 'Start Free', ctaHref: '#', color: 'blue' },
      { name: 'Pro', price: '$19', period: 'month', description: 'For serious creators', features: ['Unlimited projects', 'All shapes & animations', 'Priority support', 'Team collaboration'], ctaText: 'Get Pro', ctaHref: '#', popular: true, color: 'pink' },
      { name: 'Enterprise', price: '$49', period: 'month', description: 'For large teams', features: ['Everything in Pro', 'Custom branding', 'SSO & security', 'Dedicated support'], ctaText: 'Contact Sales', ctaHref: '#', color: 'purple' },
    ],
  },
  cta: {
    headline: 'Ready to create something amazing?',
    subtext: 'Join thousands of creators who are already building the future.',
    buttonText: 'Get Started Free',
    buttonHref: '#',
  },
  footer: {
    columns: [
      { title: 'Product', links: [{ label: 'Features', href: '#' }, { label: 'Pricing', href: '#' }, { label: 'Changelog', href: '#' }] },
      { title: 'Company', links: [{ label: 'About', href: '#' }, { label: 'Blog', href: '#' }, { label: 'Careers', href: '#' }] },
      { title: 'Resources', links: [{ label: 'Documentation', href: '#' }, { label: 'Help Center', href: '#' }, { label: 'Community', href: '#' }] },
      { title: 'Legal', links: [{ label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }] },
    ],
  },
};
```

---

## What to ABSOLUTELY AVOID

1. **Muted, Safe Colors** - NO grays, NO pastels. Use bold, saturated colors.

2. **Static Layouts** - Everything should have potential for motion. Shapes float, cards lift, buttons bounce.

3. **Subtle Animations** - NO 0.2s fades. Use bouncy springs with lower damping (10-15).

4. **Corporate Tone** - NO stiff, serious language. Playful copy that matches the visual energy.

5. **Symmetry Everywhere** - Break the grid. Rotate cards slightly. Offset elements.

6. **Plain Rectangles** - Use pills, circles, blobs, squircles. Sharp corners are rare.

7. **Small Hover Effects** - Hover states should be dramatic: scale 1.1, rotate 5°, colorful shadows.

8. **Linear Easing** - Always use spring physics for interactive elements.

9. **Monochrome Sections** - Each section should have color variety. Multiple accent colors.

10. **Thin Fonts** - Use bold weights (600, 700, 800). Light weights don't match the energy.

11. **Small Typography** - Headlines should be massive (56-140px clamp).

12. **Invisible Shapes** - Background shapes should be clearly visible, not subtle accents.

13. **Standard Shadows** - Use colorful shadows that match the element's color.

14. **Slow Scroll Reveal** - Elements should bounce in energetically, not fade slowly.

15. **Boring Icons** - Use emoji or custom playful icons, not generic outline icons.

---

## Responsive Considerations

```css
@layer components {
  @media (max-width: 768px) {
    .text-play-display {
      font-size: clamp(40px, 15vw, 80px);
    }

    .text-play-headline {
      font-size: clamp(32px, 10vw, 56px);
    }

    /* Stack buttons on mobile */
    .btn-play-primary,
    .btn-play-secondary {
      width: 100%;
    }

    /* Reduce shape sizes */
    .floating-shape {
      transform: scale(0.7);
    }

    /* Single column grids */
    .features-grid,
    .testimonials-grid,
    .pricing-grid {
      grid-template-columns: 1fr;
    }

    /* Remove tilted sections on mobile */
    .tilted-section {
      transform: none;
      margin-left: 0;
      margin-right: 0;
    }
  }
}
```

---

## Final Notes

This Playful Geometric style is about **joyful energy and bold expression**. Every element should feel alive-shapes float, buttons bounce, colors pop. It's a visual playground that communicates creativity and optimism.

Key differentiators:
- **Bold, saturated colors** - blue, pink, yellow, green, purple, orange
- **Geometric shapes** as structural elements, not decoration
- **Spring physics** with lower damping for bouncy feel
- **Tilted sections** and rotated cards
- **Massive typography** with colored words
- **Dramatic hover states** - scale, rotate, colorful shadows
- **Pills and circles** - no sharp rectangles
- **Energetic animations** - everything bounces in

The page should feel like it's celebrating creativity-confident, playful, and impossible to ignore. Serious product, playful presentation.
