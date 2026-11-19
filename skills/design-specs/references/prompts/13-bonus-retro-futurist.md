# Retro-Futurist Landing Page

## Design Philosophy & Core Principles

This specification creates a landing page inspired by Retro-Futurism - the aesthetic of how 1960s designers imagined the year 2000. Think Apollo-era NASA graphics, TWA Flight Center architecture, Googie diners, and vintage sci-fi illustrations. This is **space-age optimism** translated into digital design - bold, confident, and adventurous.

### The Retro-Futurist Vision

1. **Atomic Age Optimism** - Technology as humanity's greatest adventure
2. **Space Exploration Wonder** - Infinite possibilities, cosmic scale
3. **Jet-Set Glamour** - Sophisticated, aspirational, stylish
4. **Geometric Confidence** - Strong shapes, bold angles, dynamic compositions
5. **Retrofitted Future** - Vintage aesthetics with modern capabilities
6. **Playful Boldness** - Not afraid to be dramatic and eye-catching

### Visual References

```typescript
// Design inspiration sources
const visualReferences = {
  architecture: [
    'TWA Flight Center (Eero Saarinen)',
    'LAX Theme Building',
    'Seattle Space Needle',
    'Googie coffee shops',
    "World's Fair pavilions",
  ],
  graphics: [
    'NASA Apollo-era posters',
    'Saul Bass title sequences',
    'Vintage airline advertisements',
    'Mid-century movie posters',
    'Atomic Age logos',
  ],
  illustration: [
    'Chesley Bonestell space art',
    'Robert McCall NASA murals',
    'Vintage sci-fi pulp covers',
    'Populuxe design',
  ],
};
```

---

## Technical Stack

```typescript
// Required dependencies
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "framer-motion": "^10.16.0",
    "@studio-freight/lenis": "^1.0.0",
    "clsx": "^2.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0"
  }
}
```

---

## Color System

The Retro-Futurist palette combines deep space tones with vibrant atomic-age accents.

### Color Palette Definition

```css
:root {
  /* Primary - Space Navy */
  --space-navy: #0D1B2A;
  --space-navy-light: #1B3A5F;
  --space-navy-dark: #06101A;

  /* Secondary - Cosmic Blue */
  --cosmic-blue: #1B3A5F;
  --cosmic-blue-light: #2E5A8C;
  --cosmic-blue-dark: #0F2540;

  /* Accent - Retro Orange (PRIMARY ACCENT) */
  --retro-orange: #F77F00;
  --retro-orange-light: #FFA033;
  --retro-orange-dark: #CC6600;

  /* Accent - Atomic Teal */
  --atomic-teal: #00B4D8;
  --atomic-teal-light: #48CAE4;
  --atomic-teal-dark: #0096B4;

  /* Warm Accents */
  --cream: #EAE2B7;
  --gold: #E9C46A;
  --coral: #E76F51;

  /* Text Colors */
  --text-cream: #E0E1DD;
  --text-white: #FAFAFA;
  --text-dark: #0D1B2A;

  /* Functional */
  --background-primary: var(--space-navy);
  --background-secondary: var(--cosmic-blue);
  --foreground: var(--text-cream);
  --accent-primary: var(--retro-orange);
  --accent-secondary: var(--atomic-teal);
}
```

### Tailwind Color Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      // Space Navy
      'space-navy': {
        DEFAULT: '#0D1B2A',
        light: '#1B3A5F',
        dark: '#06101A',
      },

      // Cosmic Blue
      'cosmic-blue': {
        DEFAULT: '#1B3A5F',
        light: '#2E5A8C',
        dark: '#0F2540',
      },

      // Retro Orange
      orange: {
        DEFAULT: '#F77F00',
        light: '#FFA033',
        dark: '#CC6600',
      },

      // Atomic Teal
      teal: {
        DEFAULT: '#00B4D8',
        light: '#48CAE4',
        dark: '#0096B4',
      },

      // Warm Accents
      cream: '#EAE2B7',
      gold: '#E9C46A',
      coral: '#E76F51',

      // Text
      white: '#FAFAFA',
      'cream-text': '#E0E1DD',
    },
  },
};
```

### Gradient Definitions

```css
:root {
  /* Space Gradient - Primary Background */
  --gradient-space: linear-gradient(
    180deg,
    var(--space-navy) 0%,
    var(--cosmic-blue) 50%,
    var(--atomic-teal) 100%
  );

  /* Sunset Gradient - Hero Backgrounds */
  --gradient-sunset: linear-gradient(
    180deg,
    var(--retro-orange) 0%,
    var(--coral) 50%,
    var(--space-navy) 100%
  );

  /* Horizon Gradient - Section Transitions */
  --gradient-horizon: linear-gradient(
    90deg,
    var(--space-navy) 0%,
    var(--cosmic-blue-light) 50%,
    var(--space-navy) 100%
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

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      backgroundImage: {
        'gradient-space': 'linear-gradient(180deg, #0D1B2A 0%, #1B3A5F 50%, #00B4D8 100%)',
        'gradient-sunset': 'linear-gradient(180deg, #F77F00 0%, #E76F51 50%, #0D1B2A 100%)',
        'gradient-horizon': 'linear-gradient(90deg, #0D1B2A 0%, #2E5A8C 50%, #0D1B2A 100%)',
        'gradient-atomic': 'linear-gradient(135deg, #00B4D8 0%, #0096B4 100%)',
        'gradient-burst': 'linear-gradient(135deg, #FFA033 0%, #F77F00 50%, #CC6600 100%)',
      },
    },
  },
};
```

---

## Typography System

Typography is BOLD, GEOMETRIC, and WIDE-TRACKED. Think Futura, not Helvetica.

### Font Stack

```css
:root {
  /* Display Font - Geometric Sans */
  --font-display: 'Space Grotesk', 'Futura', 'Avant Garde Gothic', sans-serif;

  /* Body Font - Readable Geometric */
  --font-body: 'Inter', 'Jost', sans-serif;

  /* Mono Font - Retro Numbers */
  --font-mono: 'Space Mono', 'JetBrains Mono', monospace;
}
```

### Font Loading

```typescript
// app/layout.tsx
import { Space_Grotesk, Space_Mono, Inter } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
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

  /* Letter Spacing - Key to Retro Feel */
  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.05em;
  --tracking-wider: 0.1em;
  --tracking-widest: 0.15em;
  --tracking-ultra: 0.25em;
  --tracking-mega: 0.35em;
}
```

### Tailwind Typography Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    fontFamily: {
      display: ['var(--font-display)', 'Futura', 'sans-serif'],
      body: ['var(--font-body)', 'Inter', 'sans-serif'],
      mono: ['var(--font-mono)', 'Space Mono', 'monospace'],
    },
    fontSize: {
      'xs': ['0.75rem', { lineHeight: '1rem' }],
      'sm': ['0.875rem', { lineHeight: '1.25rem' }],
      'base': ['1rem', { lineHeight: '1.5rem' }],
      'lg': ['1.25rem', { lineHeight: '1.75rem' }],
      'xl': ['1.5rem', { lineHeight: '2rem' }],
      '2xl': ['2rem', { lineHeight: '2.25rem' }],
      '3xl': ['2.5rem', { lineHeight: '1.1' }],
      '4xl': ['3.5rem', { lineHeight: '1.1' }],
      '5xl': ['4.5rem', { lineHeight: '1' }],
      '6xl': ['6rem', { lineHeight: '1' }],
      '7xl': ['8rem', { lineHeight: '0.9' }],
    },
    letterSpacing: {
      tight: '-0.02em',
      normal: '0',
      wide: '0.05em',
      wider: '0.1em',
      widest: '0.15em',
      ultra: '0.25em',
      mega: '0.35em',
    },
  },
};
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
        outline && 'text-transparent bg-clip-text bg-gradient-to-r from-cream to-cream [-webkit-text-stroke:2px_#E0E1DD]',
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

## Motion & Animation System

Animation is CENTRAL to Retro-Futurism. Orbits, pulses, and scan lines create the space-age feel.

### Animation Configuration

```typescript
// lib/motion.ts
import { Variants, Transition } from 'framer-motion';

// Base transitions
export const retroTransition: Transition = {
  duration: 0.6,
  ease: [0.34, 1.56, 0.64, 1], // Slight overshoot for playful feel
};

export const smoothTransition: Transition = {
  duration: 0.8,
  ease: [0.25, 0.1, 0.25, 1],
};

// Orbit animation (continuous)
export const orbitAnimation = (duration: number = 20, radius: number = 200) => ({
  animate: {
    rotate: 360,
  },
  transition: {
    duration,
    repeat: Infinity,
    ease: 'linear',
  },
  style: {
    transformOrigin: `center ${radius}px`,
  },
});

// Pulse glow animation
export const pulseGlow: Variants = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(247, 127, 0, 0.5)',
      '0 0 40px rgba(247, 127, 0, 0.8), 0 0 60px rgba(0, 180, 216, 0.3)',
      '0 0 20px rgba(247, 127, 0, 0.5)',
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Scan line effect
export const scanLine: Variants = {
  animate: {
    y: ['-100%', '100%'],
    opacity: [0, 1, 1, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'linear',
      times: [0, 0.1, 0.9, 1],
    },
  },
};

// Entrance animation with retro flair
export const retroEntrance: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
    rotate: -5,
  },
  animate: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: retroTransition,
  },
};

// Stagger container
export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Fade up with scale
export const fadeUpScale: Variants = {
  initial: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: smoothTransition,
  },
};

// Typewriter effect
export const typewriter = (text: string, speed: number = 100) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text]);

  return displayText;
};
```

### CSS Animations

```css
/* Orbit animation */
@keyframes orbit {
  from {
    transform: rotate(0deg) translateX(var(--orbit-radius, 100px)) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translateX(var(--orbit-radius, 100px)) rotate(-360deg);
  }
}

.orbit {
  animation: orbit var(--orbit-duration, 20s) linear infinite;
}

/* Reverse orbit */
.orbit-reverse {
  animation: orbit var(--orbit-duration, 15s) linear infinite reverse;
}

/* Pulse glow */
@keyframes pulse-glow {
  0%, 100% {
    box-shadow:
      0 0 20px rgba(247, 127, 0, 0.5),
      0 0 40px rgba(247, 127, 0, 0.2);
  }
  50% {
    box-shadow:
      0 0 40px rgba(247, 127, 0, 0.8),
      0 0 80px rgba(247, 127, 0, 0.4),
      0 0 120px rgba(0, 180, 216, 0.2);
  }
}

.pulse-glow {
  animation: pulse-glow 3s ease-in-out infinite;
}

/* Scan line */
@keyframes scan-line {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(100%);
    opacity: 0;
  }
}

.scan-line::after {
  content: '';
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00B4D8, transparent);
  box-shadow: 0 0 10px #00B4D8, 0 0 20px #00B4D8;
  animation: scan-line 4s ease-in-out infinite;
}

/* Blink effect for status lights */
@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

.blink {
  animation: blink 1s ease-in-out infinite;
}

/* Radar sweep */
@keyframes radar-sweep {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.radar-sweep {
  animation: radar-sweep 4s linear infinite;
  transform-origin: center;
}

/* Float animation */
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.float {
  animation: float 6s ease-in-out infinite;
}
```

### Scroll Behavior

```typescript
// lib/scroll.ts
'use client';

import Lenis from '@studio-freight/lenis';

export function initSmoothScroll() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return lenis;
}
```

---

## Design Elements

### Starburst Shape Component

```tsx
// components/Starburst.tsx
interface StarburstProps {
  points?: number;
  size?: number;
  color?: string;
  className?: string;
}

export function Starburst({
  points = 8,
  size = 100,
  color = '#F77F00',
  className,
}: StarburstProps) {
  const generatePoints = () => {
    const pts: string[] = [];
    const outerRadius = size / 2;
    const innerRadius = outerRadius * 0.4;

    for (let i = 0; i < points * 2; i++) {
      const angle = (i * Math.PI) / points - Math.PI / 2;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const x = size / 2 + radius * Math.cos(angle);
      const y = size / 2 + radius * Math.sin(angle);
      pts.push(`${x},${y}`);
    }

    return pts.join(' ');
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
    >
      <polygon
        points={generatePoints()}
        fill={color}
      />
    </svg>
  );
}
```

### Orbit Ring Component

```tsx
// components/OrbitRing.tsx
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface OrbitRingProps {
  size?: number;
  duration?: number;
  color?: string;
  thickness?: number;
  children?: React.ReactNode;
  className?: string;
  reverse?: boolean;
}

export function OrbitRing({
  size = 400,
  duration = 20,
  color = '#00B4D8',
  thickness = 2,
  children,
  className,
  reverse = false,
}: OrbitRingProps) {
  return (
    <div
      className={cn('relative', className)}
      style={{ width: size, height: size }}
    >
      {/* Orbit ring (tilted for 3D effect) */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: `${thickness}px solid ${color}`,
          transform: 'rotateX(60deg)',
          opacity: 0.6,
        }}
      />

      {/* Orbiting element */}
      {children && (
        <motion.div
          className="absolute"
          style={{
            top: '50%',
            left: '50%',
            transformOrigin: `0 ${size / 4}px`,
          }}
          animate={{ rotate: reverse ? -360 : 360 }}
          transition={{
            duration,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
```

### Radar Display Component

```tsx
// components/RadarDisplay.tsx
'use client';

import { motion } from 'framer-motion';

interface RadarDisplayProps {
  size?: number;
  className?: string;
}

export function RadarDisplay({ size = 200, className }: RadarDisplayProps) {
  return (
    <div
      className={cn('relative rounded-full overflow-hidden', className)}
      style={{
        width: size,
        height: size,
        background: 'radial-gradient(circle, #0D1B2A 0%, #06101A 100%)',
        border: '2px solid #00B4D8',
      }}
    >
      {/* Concentric circles */}
      {[0.25, 0.5, 0.75].map((scale) => (
        <div
          key={scale}
          className="absolute rounded-full border border-teal/30"
          style={{
            width: `${scale * 100}%`,
            height: `${scale * 100}%`,
            top: `${(1 - scale) * 50}%`,
            left: `${(1 - scale) * 50}%`,
          }}
        />
      ))}

      {/* Cross hairs */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-teal/30" />
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-teal/30" />

      {/* Sweep */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'conic-gradient(from 0deg, transparent 0deg, rgba(0, 180, 216, 0.3) 30deg, transparent 60deg)',
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Blips */}
      <div className="absolute w-2 h-2 bg-orange rounded-full animate-pulse" style={{ top: '30%', left: '60%' }} />
      <div className="absolute w-1.5 h-1.5 bg-teal rounded-full animate-pulse" style={{ top: '70%', left: '40%' }} />
    </div>
  );
}
```

### Diagonal Stripe Pattern

```tsx
// components/DiagonalStripes.tsx
interface DiagonalStripesProps {
  color1?: string;
  color2?: string;
  stripeWidth?: number;
  className?: string;
}

export function DiagonalStripes({
  color1 = '#F77F00',
  color2 = '#0D1B2A',
  stripeWidth = 10,
  className,
}: DiagonalStripesProps) {
  return (
    <div
      className={className}
      style={{
        background: `repeating-linear-gradient(
          45deg,
          ${color1},
          ${color1} ${stripeWidth}px,
          ${color2} ${stripeWidth}px,
          ${color2} ${stripeWidth * 2}px
        )`,
      }}
    />
  );
}
```

---

## Component Library

### Button Component

Retro buttons have angled shapes and bold colors.

```tsx
// components/Button.tsx
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  angled?: boolean;
}

const variants = {
  primary: 'bg-orange text-space-navy hover:bg-orange-light',
  secondary: 'bg-teal text-space-navy hover:bg-teal-light',
  outline: 'bg-transparent text-cream-text border-2 border-orange hover:bg-orange hover:text-space-navy',
  ghost: 'bg-transparent text-cream-text hover:bg-white/10',
};

const sizes = {
  sm: 'px-5 py-2 text-xs',
  md: 'px-8 py-3 text-sm',
  lg: 'px-10 py-4 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', angled = true, className, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'font-display font-bold uppercase tracking-widest',
          'transition-colors duration-300',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-space-navy',
          'disabled:opacity-50 disabled:pointer-events-none',
          angled && 'clip-path-angled', // Custom clip-path class
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
```

### CSS for Angled Button

```css
/* Angled button clip-path */
.clip-path-angled {
  clip-path: polygon(8% 0, 100% 0, 92% 100%, 0 100%);
}

/* Alternative: skewed parallelogram */
.clip-path-skew {
  clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%);
}
```

### Card Component

```tsx
// components/RetroCard.tsx
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface RetroCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'bordered';
  cornerAccent?: boolean;
}

const cardVariants = {
  default: 'bg-cosmic-blue/50',
  glass: 'bg-white/5 backdrop-blur-md',
  bordered: 'bg-transparent border-2 border-teal/50',
};

export function RetroCard({
  children,
  className,
  variant = 'default',
  cornerAccent = true,
}: RetroCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={cn(
        'relative p-6 md:p-8 rounded-2xl overflow-hidden',
        cardVariants[variant],
        className
      )}
    >
      {/* Corner accent */}
      {cornerAccent && (
        <div
          className="absolute top-0 right-0 w-16 h-16 bg-orange"
          style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Subtle glow on hover */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-orange/10 to-transparent pointer-events-none" />
    </motion.div>
  );
}
```

### Status Light Component

```tsx
// components/StatusLight.tsx
import { cn } from '@/lib/utils';

interface StatusLightProps {
  status?: 'active' | 'warning' | 'offline';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

const statusColors = {
  active: 'bg-teal shadow-[0_0_10px_rgba(0,180,216,0.8)]',
  warning: 'bg-orange shadow-[0_0_10px_rgba(247,127,0,0.8)]',
  offline: 'bg-coral shadow-[0_0_10px_rgba(231,111,81,0.8)]',
};

const sizes = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4',
};

export function StatusLight({
  status = 'active',
  size = 'md',
  label,
  className,
}: StatusLightProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div
        className={cn(
          'rounded-full animate-pulse',
          statusColors[status],
          sizes[size]
        )}
      />
      {label && (
        <span className="font-mono text-xs uppercase tracking-widest text-cream-text/70">
          {label}
        </span>
      )}
    </div>
  );
}
```

### Mission Counter Component

```tsx
// components/MissionCounter.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MissionCounterProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function MissionCounter({
  value,
  label,
  prefix = '',
  suffix = '',
  className,
}: MissionCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const interval = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(interval);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [value]);

  return (
    <div className={cn('text-center', className)}>
      <div className="font-mono text-5xl md:text-6xl font-bold text-orange tracking-tight">
        {prefix}
        <AnimatePresence mode="popLayout">
          <motion.span
            key={displayValue}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {displayValue.toLocaleString()}
          </motion.span>
        </AnimatePresence>
        {suffix}
      </div>
      <div className="mt-2 font-display text-xs uppercase tracking-mega text-cream-text/70">
        {label}
      </div>
    </div>
  );
}
```

---

## Section-by-Section Implementation

### 1. Navigation

```tsx
// components/Navigation.tsx
'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { StatusLight } from './StatusLight';

const navItems = [
  { label: 'Mission', href: '#mission' },
  { label: 'Technology', href: '#tech' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-space-navy/80 backdrop-blur-md border-b border-teal/20">
      <nav className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-burst flex items-center justify-center">
              <span className="font-display text-space-navy font-bold text-xs">★</span>
            </div>
            <span className="font-display text-lg font-bold uppercase tracking-widest text-cream-text">
              Cosmos
            </span>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    'font-display text-sm uppercase tracking-widest',
                    'text-cream-text/70 hover:text-orange',
                    'transition-colors duration-300'
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Status & CTA */}
          <div className="hidden md:flex items-center gap-6">
            <StatusLight status="active" label="Systems Online" />
            <a
              href="#launch"
              className={cn(
                'px-6 py-2 bg-orange text-space-navy',
                'font-display font-bold text-xs uppercase tracking-widest',
                'hover:bg-orange-light transition-colors duration-300',
                'clip-path-angled'
              )}
            >
              Launch
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 space-y-1.5">
              <motion.span
                className="block h-0.5 bg-cream-text"
                animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }}
              />
              <motion.span
                className="block h-0.5 bg-cream-text"
                animate={{ opacity: mobileOpen ? 0 : 1 }}
              />
              <motion.span
                className="block h-0.5 bg-cream-text"
                animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: mobileOpen ? 'auto' : 0 }}
          className="md:hidden overflow-hidden"
        >
          <ul className="py-4 space-y-4 border-t border-teal/20">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block font-display text-sm uppercase tracking-widest text-cream-text"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </nav>
    </header>
  );
}
```

### 2. Hero Section

```tsx
// sections/HeroSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/Button';
import { Starburst } from '@/components/Starburst';
import { OrbitRing } from '@/components/OrbitRing';
import { retroEntrance, staggerContainer, fadeUpScale } from '@/lib/motion';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-space">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        {/* Stars */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cream-text rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.5,
            }}
          />
        ))}
      </div>

      {/* Orbiting elements */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <OrbitRing size={600} duration={30} color="rgba(0, 180, 216, 0.3)" thickness={1}>
          <div className="w-4 h-4 bg-teal rounded-full shadow-[0_0_20px_rgba(0,180,216,0.8)]" />
        </OrbitRing>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <OrbitRing size={800} duration={40} color="rgba(247, 127, 0, 0.2)" thickness={1} reverse>
          <div className="w-3 h-3 bg-orange rounded-full shadow-[0_0_15px_rgba(247,127,0,0.8)]" />
        </OrbitRing>
      </div>

      {/* Starbursts */}
      <div className="absolute top-20 right-20 opacity-30">
        <Starburst size={80} color="#F77F00" />
      </div>
      <div className="absolute bottom-40 left-10 opacity-20">
        <Starburst size={60} points={6} color="#00B4D8" />
      </div>

      {/* Main content */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        {/* Overline */}
        <motion.div variants={fadeUpScale}>
          <span className="inline-block px-4 py-2 border border-teal/50 rounded-full font-mono text-xs uppercase tracking-mega text-teal mb-8">
            Mission 2024
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={retroEntrance}
          className="font-display text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-ultra leading-none text-cream-text mb-6"
        >
          The Future
          <br />
          <span className="text-orange text-glow-orange">Is Now</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUpScale}
          className="font-body text-lg md:text-xl text-cream-text/70 tracking-wide leading-relaxed max-w-2xl mx-auto mb-10"
        >
          Embark on a journey through innovation. Where yesterday's dreams become today's reality.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUpScale}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="primary" size="lg">
            Begin Mission
          </Button>
          <Button variant="outline" size="lg">
            Explore More
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={fadeUpScale}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-xs uppercase tracking-mega text-cream-text/50">
            Scroll to Explore
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-cream-text/30 flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 bg-orange rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-space-navy to-transparent" />
    </section>
  );
}
```

### 3. Mission Stats Section

```tsx
// sections/StatsSection.tsx
'use client';

import { motion } from 'framer-motion';
import { MissionCounter } from '@/components/MissionCounter';
import { RadarDisplay } from '@/components/RadarDisplay';
import { StatusLight } from '@/components/StatusLight';
import { staggerContainer, fadeUpScale } from '@/lib/motion';

const stats = [
  { value: 2847, label: 'Missions Completed', suffix: '+' },
  { value: 99.7, label: 'Success Rate', suffix: '%' },
  { value: 156, label: 'Active Systems', prefix: '' },
  { value: 24, label: 'Global Stations', suffix: '' },
];

export function StatsSection() {
  return (
    <section className="py-24 md:py-32 bg-space-navy relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 180, 216, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 180, 216, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="font-display text-xs uppercase tracking-mega text-teal mb-4 block">
            Mission Control
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-widest text-cream-text">
            Real-Time Status
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Stats grid */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="lg:col-span-2 grid grid-cols-2 gap-8"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={fadeUpScale}>
                <MissionCounter
                  value={stat.value}
                  label={stat.label}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Radar display */}
          <div className="flex flex-col items-center gap-6">
            <RadarDisplay size={250} />
            <div className="flex items-center gap-6">
              <StatusLight status="active" label="Online" />
              <StatusLight status="warning" label="Alert" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### 4. Features/Technology Section

```tsx
// sections/TechnologySection.tsx
'use client';

import { motion } from 'framer-motion';
import { RetroCard } from '@/components/RetroCard';
import { Starburst } from '@/components/Starburst';
import { staggerContainer, fadeUpScale } from '@/lib/motion';

const technologies = [
  {
    icon: '◎',
    title: 'Quantum Drive',
    description: 'Next-generation propulsion system enabling faster-than-light travel across the galaxy.',
  },
  {
    icon: '◈',
    title: 'Neural Link',
    description: 'Direct brain-computer interface for seamless communication between crew and vessel.',
  },
  {
    icon: '◉',
    title: 'Fusion Core',
    description: 'Clean, unlimited energy powering all systems with zero emissions.',
  },
  {
    icon: '◇',
    title: 'Holo-Display',
    description: 'Three-dimensional holographic interfaces for intuitive command and control.',
  },
];

export function TechnologySection() {
  return (
    <section
      id="tech"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0D1B2A 0%, #1B3A5F 50%, #0D1B2A 100%)',
      }}
    >
      {/* Angled overlay */}
      <div
        className="absolute inset-0"
        style={{ clipPath: 'polygon(0 5%, 100% 0, 100% 95%, 0 100%)' }}
      />

      {/* Starbursts */}
      <div className="absolute top-40 left-10 opacity-20">
        <Starburst size={100} color="#F77F00" />
      </div>
      <div className="absolute bottom-20 right-20 opacity-15">
        <Starburst size={120} points={12} color="#00B4D8" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="font-display text-xs uppercase tracking-mega text-orange mb-4 block">
            Advanced Systems
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-widest text-cream-text mb-4">
            Tomorrow's Technology
          </h2>
          <p className="font-body text-lg text-cream-text/60 max-w-2xl mx-auto">
            Pioneering innovations that push the boundaries of what's possible.
          </p>
        </div>

        {/* Technology cards */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {technologies.map((tech) => (
            <motion.div key={tech.title} variants={fadeUpScale}>
              <RetroCard variant="glass" cornerAccent>
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-atomic flex items-center justify-center">
                    <span className="text-space-navy text-2xl">{tech.icon}</span>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-display text-xl font-bold uppercase tracking-wider text-cream-text mb-2">
                      {tech.title}
                    </h3>
                    <p className="font-body text-cream-text/60 leading-relaxed">
                      {tech.description}
                    </p>
                  </div>
                </div>
              </RetroCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

### 5. Timeline/Process Section

```tsx
// sections/TimelineSection.tsx
'use client';

import { motion } from 'framer-motion';
import { staggerContainer, fadeUpScale } from '@/lib/motion';

const timelineSteps = [
  {
    year: '2020',
    title: 'Foundation',
    description: 'Initial research and development phase begins.',
  },
  {
    year: '2022',
    title: 'Prototype',
    description: 'First successful test of core systems.',
  },
  {
    year: '2023',
    title: 'Launch',
    description: 'Public release and initial deployment.',
  },
  {
    year: '2024',
    title: 'Expansion',
    description: 'Global rollout and advanced features.',
  },
  {
    year: '2025',
    title: 'The Future',
    description: 'Next-generation capabilities unlocked.',
  },
];

export function TimelineSection() {
  return (
    <section id="timeline" className="py-24 md:py-32 bg-space-navy">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="font-display text-xs uppercase tracking-mega text-teal mb-4 block">
            Mission Timeline
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-widest text-cream-text">
            Launch Sequence
          </h2>
        </div>

        {/* Timeline */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal via-orange to-teal -translate-x-1/2" />

          {/* Timeline items */}
          {timelineSteps.map((step, index) => (
            <motion.div
              key={step.year}
              variants={fadeUpScale}
              className={`relative flex items-center gap-8 mb-16 last:mb-0 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Content */}
              <div className={`w-1/2 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                <span className="font-mono text-4xl font-bold text-orange">
                  {step.year}
                </span>
                <h3 className="font-display text-xl font-bold uppercase tracking-wider text-cream-text mt-2">
                  {step.title}
                </h3>
                <p className="font-body text-cream-text/60 mt-2">
                  {step.description}
                </p>
              </div>

              {/* Center dot */}
              <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-space-navy border-4 border-orange shadow-[0_0_20px_rgba(247,127,0,0.5)]" />

              {/* Spacer for other side */}
              <div className="w-1/2" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

### 6. CTA Section

```tsx
// sections/CTASection.tsx
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/Button';
import { DiagonalStripes } from '@/components/DiagonalStripes';
import { Starburst } from '@/components/Starburst';
import { retroEntrance } from '@/lib/motion';

export function CTASection() {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      {/* Background with diagonal stripes */}
      <DiagonalStripes
        color1="#F77F00"
        color2="#0D1B2A"
        stripeWidth={15}
        className="absolute inset-0 opacity-20"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-space-navy/90 via-space-navy/70 to-space-navy/90" />

      {/* Starbursts */}
      <div className="absolute top-10 left-1/4 opacity-30">
        <Starburst size={150} color="#F77F00" />
      </div>
      <div className="absolute bottom-10 right-1/4 opacity-20">
        <Starburst size={100} points={12} color="#00B4D8" />
      </div>

      {/* Content */}
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={retroEntrance}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        <span className="font-display text-xs uppercase tracking-mega text-teal mb-6 block">
          Ready for Liftoff?
        </span>

        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-ultra leading-none text-cream-text mb-6">
          Join the
          <br />
          <span className="text-orange text-glow-orange">Mission</span>
        </h2>

        <p className="font-body text-lg md:text-xl text-cream-text/70 max-w-2xl mx-auto mb-10">
          Be part of something extraordinary. The countdown to the future starts now.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="primary" size="lg">
            Launch Now
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>

        {/* Countdown teaser */}
        <div className="mt-16 flex items-center justify-center gap-8">
          {['D', 'H', 'M', 'S'].map((unit, i) => (
            <div key={unit} className="text-center">
              <div className="font-mono text-3xl md:text-4xl font-bold text-orange">
                {String(Math.floor(Math.random() * 99)).padStart(2, '0')}
              </div>
              <div className="font-mono text-xs uppercase tracking-widest text-cream-text/50 mt-1">
                {unit === 'D' ? 'Days' : unit === 'H' ? 'Hours' : unit === 'M' ? 'Min' : 'Sec'}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
```

### 7. Contact Section

```tsx
// sections/ContactSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/Button';
import { staggerContainer, fadeUpScale } from '@/lib/motion';

export function ContactSection() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-cosmic-blue">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="font-display text-xs uppercase tracking-mega text-orange mb-4 block">
            Communications
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-widest text-cream-text">
            Open Channel
          </h2>
        </div>

        {/* Contact form */}
        <motion.form
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={fadeUpScale}>
              <label className="font-mono text-xs uppercase tracking-widest text-cream-text/70 mb-2 block">
                Call Sign
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-3 bg-space-navy/50 border-2 border-teal/30 rounded-lg text-cream-text font-body placeholder:text-cream-text/30 focus:outline-none focus:border-orange transition-colors"
              />
            </motion.div>
            <motion.div variants={fadeUpScale}>
              <label className="font-mono text-xs uppercase tracking-widest text-cream-text/70 mb-2 block">
                Frequency
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-space-navy/50 border-2 border-teal/30 rounded-lg text-cream-text font-body placeholder:text-cream-text/30 focus:outline-none focus:border-orange transition-colors"
              />
            </motion.div>
          </div>

          <motion.div variants={fadeUpScale}>
            <label className="font-mono text-xs uppercase tracking-widest text-cream-text/70 mb-2 block">
              Transmission
            </label>
            <textarea
              rows={6}
              placeholder="Your message..."
              className="w-full px-4 py-3 bg-space-navy/50 border-2 border-teal/30 rounded-lg text-cream-text font-body placeholder:text-cream-text/30 focus:outline-none focus:border-orange transition-colors resize-none"
            />
          </motion.div>

          <motion.div variants={fadeUpScale} className="text-center">
            <Button type="submit" variant="primary" size="lg">
              Send Transmission
            </Button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
}
```

### 8. Footer

```tsx
// components/Footer.tsx
import { Starburst } from './Starburst';

const footerLinks = {
  mission: [
    { label: 'Overview', href: '#' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Technology', href: '#tech' },
  ],
  resources: [
    { label: 'Documentation', href: '#' },
    { label: 'Support', href: '#' },
    { label: 'Status', href: '#' },
  ],
  company: [
    { label: 'About', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#contact' },
  ],
};

export function Footer() {
  return (
    <footer className="py-16 bg-space-navy-dark border-t border-teal/20 relative overflow-hidden">
      {/* Starburst decoration */}
      <div className="absolute top-10 right-10 opacity-10">
        <Starburst size={200} color="#F77F00" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & tagline */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-burst flex items-center justify-center">
                <span className="font-display text-space-navy font-bold text-xs">★</span>
              </div>
              <span className="font-display text-lg font-bold uppercase tracking-widest text-cream-text">
                Cosmos
              </span>
            </div>
            <p className="font-body text-sm text-cream-text/50 leading-relaxed">
              The future is now. Join us on this extraordinary journey.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display text-xs uppercase tracking-mega text-orange mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="font-body text-sm text-cream-text/60 hover:text-cream-text transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-teal/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-cream-text/40">
            © {new Date().getFullYear()} Cosmos. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="font-mono text-xs text-cream-text/40 hover:text-cream-text transition-colors">
              Privacy
            </a>
            <a href="#" className="font-mono text-xs text-cream-text/40 hover:text-cream-text transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
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
import { StatsSection } from '@/sections/StatsSection';
import { TechnologySection } from '@/sections/TechnologySection';
import { TimelineSection } from '@/sections/TimelineSection';
import { CTASection } from '@/sections/CTASection';
import { ContactSection } from '@/sections/ContactSection';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <StatsSection />
        <TechnologySection />
        <TimelineSection />
        <CTASection />
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
@tailwind base;
@tailwind components;
@tailwind utilities;

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

@layer utilities {
  /* Clip paths */
  .clip-path-angled {
    clip-path: polygon(8% 0, 100% 0, 92% 100%, 0 100%);
  }

  .clip-path-chevron {
    clip-path: polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%);
  }

  /* Text effects */
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
}
```

---

## What to ABSOLUTELY AVOID

### Visual Mistakes

```typescript
const forbiddenElements = {
  // NO modern minimalism
  minimalist: 'bg-white text-gray-900', // NEVER - too contemporary

  // NO soft, muted colors
  mutedPalette: 'bg-slate-100 text-slate-600', // NEVER

  // NO subtle shadows
  subtleShadow: 'shadow-sm', // NEVER - go bold or none

  // NO tiny, delicate typography
  tinyText: 'text-xs font-light tracking-normal', // NEVER

  // NO standard border-radius
  standardRadius: 'rounded-md', // Use rounded-2xl or clip-path instead

  // NO flat buttons
  flatButton: 'bg-gray-100 text-gray-700', // NEVER - needs energy

  // NO contemporary gradients
  modernGradient: 'from-purple-500 to-pink-500', // NEVER
};
```

### Animation Mistakes

```typescript
const forbiddenAnimations = {
  // NO slow, subtle fades
  subtleFade: { duration: 0.15, opacity: [0, 1] }, // NEVER - too weak

  // NO micro-interactions only
  microOnly: { scale: 1.02 }, // NEVER - go bigger

  // NO static pages
  noAnimation: undefined, // NEVER - animation is central to retro-futurism

  // NO overly complex 3D
  excessive3D: { rotateX: 45, rotateY: 30, rotateZ: 15 }, // NEVER - keep it readable
};
```

### Typography Mistakes

```typescript
const forbiddenTypography = {
  // NO tight letter-spacing on headlines
  tightHeadline: 'tracking-tight', // NEVER - use tracking-widest or tracking-ultra

  // NO lowercase headlines
  lowercaseHeadline: 'capitalize', // NEVER - use uppercase

  // NO serif fonts
  serifFont: 'font-serif', // NEVER - stay geometric

  // NO thin weights for headlines
  thinHeadline: 'font-light', // NEVER - use bold or black

  // NO standard sans-serif
  boringFont: 'font-sans', // NEVER - use Space Grotesk or Futura
};
```

### Content Mistakes

```typescript
const forbiddenContent = {
  // NO corporate speak
  corporateSpeak: 'Leverage synergies', // NEVER

  // NO timid CTAs
  weakCTA: 'Learn more', // NEVER - use 'Launch', 'Begin Mission', 'Engage'

  // NO generic imagery
  stockPhotos: 'business-meeting.jpg', // NEVER

  // NO modern tech clichés
  techCliche: 'AI-powered', // NEVER - use space/atomic language

  // NO subtle color usage
  subtleAccent: 'text-orange/50', // NEVER - go full saturation
};
```

---

## Retro-Futurist Checklist

### Color & Palette
- [ ] Deep space navy as primary background
- [ ] Retro orange as main accent
- [ ] Atomic teal as secondary accent
- [ ] High saturation, bold colors
- [ ] Space-age gradients (sunset, horizon)

### Typography
- [ ] Geometric sans-serif (Space Grotesk, Futura)
- [ ] VERY wide letter-spacing (0.15em+)
- [ ] Uppercase headlines
- [ ] Bold/black weights for display
- [ ] Monospace for data/numbers

### Visual Elements
- [ ] Starburst shapes
- [ ] Orbit animations
- [ ] Status lights (blinking)
- [ ] Radar/mission control elements
- [ ] Angled clip-paths
- [ ] Diagonal stripes

### Animation
- [ ] Orbiting elements
- [ ] Pulsing glows
- [ ] Scan line effects
- [ ] Typewriter text
- [ ] Playful entrance animations
- [ ] Countdown timers

### Layout
- [ ] Full-bleed sections
- [ ] Angled section dividers
- [ ] Generous spacing
- [ ] Bold, confident compositions
- [ ] Space-themed decorations

### Mood
- [ ] Optimistic, not dystopian
- [ ] Adventurous, not corporate
- [ ] Confident, not timid
- [ ] Playful, not serious
- [ ] Nostalgic, not dated

---

## Final Notes

Retro-Futurism is about **optimism** and **adventure**. It's the aesthetic of a future that never was - when space travel was humanity's greatest aspiration and technology promised a utopian tomorrow.

Key principles:
- **Be bold** - No timid design choices
- **Use motion** - Animation is central, not optional
- **Wide tracking** - Letter-spacing is your friend
- **Saturated colors** - Orange and teal at full power
- **Space themes** - Orbits, stars, missions, launches

When done right, Retro-Futurism creates websites that feel exciting, confident, and uniquely memorable. It's design that makes people smile.

Remember: The future is NOW.
