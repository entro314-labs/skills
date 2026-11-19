# Japanese Minimalist Landing Page: Motion

Part of the [Japanese Minimalist Landing Page specification](index.md).

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
