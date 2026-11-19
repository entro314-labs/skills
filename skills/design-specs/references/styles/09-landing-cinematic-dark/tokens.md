# Cinematic Dark Landing Page: Design Tokens

Part of the [Cinematic Dark Landing Page specification](index.md).

## Color System

### CSS Custom Properties

```css
:root {
  /* Colours that also exist in the Tailwind theme point at it, so each value is written once, in @theme. */

  /* Text */
  --text-primary: #FAFAFA;
  --text-secondary: #A1A1AA;
  --text-dim: #52525B;
  --text-muted: #3F3F46;

  /* Shadows & Glows */
  --glow-accent: 0 0 80px 20px var(--color-accent-glow);
  --glow-accent-alt: 0 0 80px 20px var(--color-accent-alt-glow);
  --shadow-elevated: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}
```

### Tailwind Theme

```css
/* src/app/globals.css */
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  /* Backgrounds - Near Pure Black */
  --color-void: #050505;
  --color-void-light: #0A0A0B;
  --color-surface: #111113;
  --color-surface-elevated: #18181B;

  /* Accent - Subtle Indigo */
  --color-accent: #6366F1;
  --color-accent-glow: rgba(99, 102, 241, 0.15);
  --color-accent-dim: rgba(99, 102, 241, 0.08);

  /* Secondary Accent - Emerald */
  --color-accent-alt: #10B981;
  --color-accent-alt-glow: rgba(16, 185, 129, 0.10);

  /* Glass Effects */
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
/* Continues globals.css, after the @import "tailwindcss" line and the @theme blocks above */

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
