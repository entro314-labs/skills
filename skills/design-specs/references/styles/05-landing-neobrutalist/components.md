# Neobrutalist Landing Page: Components

Part of the [Neobrutalist Landing Page specification](index.md).

## Button Components

### NeoButton Component

```tsx
interface NeoButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'inverted';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
  xl: 'px-10 py-5 text-xl',
};

const variantClasses = {
  primary: `
    bg-neo-hot text-neo-cream
    border-3 border-neo-black
    shadow-neo-md
    hover:translate-x-[-2px] hover:translate-y-[-2px]
    hover:shadow-neo-lg
    active:translate-x-0 active:translate-y-0
    active:shadow-neo-sm
  `,
  secondary: `
    bg-neo-cream text-neo-black
    border-3 border-neo-black
    shadow-neo-md
    hover:bg-neo-kraft
    hover:translate-x-[-2px] hover:translate-y-[-2px]
    hover:shadow-neo-lg
    active:translate-x-0 active:translate-y-0
    active:shadow-neo-sm
  `,
  ghost: `
    bg-transparent text-neo-black
    border-3 border-transparent
    hover:border-neo-black
    hover:shadow-neo-sm
  `,
  inverted: `
    bg-neo-black text-neo-cream
    border-3 border-neo-black
    shadow-[6px_6px_0_0_#FFFEF0]
    hover:translate-x-[-3px] hover:translate-y-[-3px]
    hover:shadow-[9px_9px_0_0_#FFFEF0]
  `,
};

export function NeoButton({
  variant,
  size = 'md',
  children,
  href,
  onClick,
  className = '',
}: NeoButtonProps) {
  const classes = `
    inline-flex items-center justify-center gap-2
    font-bold uppercase tracking-wider
    transition-all duration-100 ease-out
    cursor-pointer
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
```

---

## Custom SVG Icons (Stroke Only)

```tsx
// Icons must be stroke-only, 2-3px stroke width, no fills

export function ArrowRightIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <path d="M4 10H16" />
      <path d="M11 5L16 10L11 15" />
    </svg>
  );
}

export function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    >
      <path d="M4 10L8 14L16 6" />
    </svg>
  );
}

export function CrossIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="square"
    >
      <path d="M5 5L15 15" />
      <path d="M15 5L5 15" />
    </svg>
  );
}

export function PlusIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    >
      <path d="M10 4V16" />
      <path d="M4 10H16" />
    </svg>
  );
}

// Social icons - also stroke only
export function TwitterIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
    >
      <path d="M2 2L8 10M18 2L12 10M8 10L2 18M12 10L18 18" />
    </svg>
  );
}

export function GitHubIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="10" cy="10" r="8" />
      <path d="M6 15C6 12 8 11 10 11C12 11 14 12 14 15" />
      <circle cx="7" cy="8" r="1.5" />
      <circle cx="13" cy="8" r="1.5" />
    </svg>
  );
}
```

---

## Animated Counter Component

```tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 1.5,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Linear easing (no smooth curves for neobrutalism)
      setCount(Math.floor(progress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);

  return (
    <motion.span
      ref={ref}
      className="font-mono text-5xl font-bold tracking-tight"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.1 }}
    >
      {prefix}{count}{suffix}
    </motion.span>
  );
}
```
