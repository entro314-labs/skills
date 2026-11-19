# Playful Geometric Landing Page: Design Tokens

Part of the [Playful Geometric Landing Page specification](index.md).

## Color System

### CSS Custom Properties

```css
:root {
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
  /* Primary Palette - Bold & Vibrant */
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
/* Continues globals.css, after the @import "tailwindcss" line and the @theme blocks above */

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
