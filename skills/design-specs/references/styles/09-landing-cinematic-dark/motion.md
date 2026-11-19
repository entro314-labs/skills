# Cinematic Dark Landing Page: Motion

Part of the [Cinematic Dark Landing Page specification](index.md).

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
