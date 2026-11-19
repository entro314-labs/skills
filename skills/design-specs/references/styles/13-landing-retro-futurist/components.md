# Retro-Futurist Landing Page: Components

Part of the [Retro-Futurist Landing Page specification](index.md).

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

import { motion } from 'motion/react';
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

import { motion } from 'motion/react';

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
import { motion, type HTMLMotionProps } from 'motion/react';

// React 19: ref is a regular prop (HTMLMotionProps<'button'> includes it), so no forwardRef
interface ButtonProps extends HTMLMotionProps<'button'> {
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

export function Button({ variant = 'primary', size = 'md', angled = true, className, children, ...props }: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'font-display font-bold uppercase tracking-widest',
        'transition-colors duration-300',
        'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-space-navy',
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
import { motion } from 'motion/react';

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
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 bg-linear-to-br from-orange/10 to-transparent pointer-events-none" />
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
import { motion, AnimatePresence } from 'motion/react';

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
