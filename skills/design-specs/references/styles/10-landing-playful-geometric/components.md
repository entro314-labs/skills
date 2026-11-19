# Playful Geometric Landing Page: Components

Part of the [Playful Geometric Landing Page specification](index.md).

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
