# Japanese Minimalist Landing Page: Components

Part of the [Japanese Minimalist Landing Page specification](index.md).

## Button Components

### Minimal Button

```css
@layer components {
  .btn-zen-minimal {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 16px 32px;
    background-color: transparent;
    border: 1px solid var(--color-sumi);
    color: var(--color-sumi);
    font-family: var(--font-inter);
    font-weight: 400;
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1);
  }

  .btn-zen-minimal:hover {
    background-color: var(--color-sumi);
    color: var(--color-washi);
  }

  /* Ghost variant - even more subtle */
  .btn-zen-ghost {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 0;
    background: transparent;
    border: none;
    color: var(--color-sumi-light);
    font-family: var(--font-inter);
    font-weight: 400;
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    transition: color 0.8s cubic-bezier(0.25, 0.1, 0.25, 1);
  }

  .btn-zen-ghost:hover {
    color: var(--color-sumi);
  }

  /* With underline animation */
  .btn-zen-underline {
    position: relative;
    display: inline-block;
    padding: 4px 0;
    color: var(--color-sumi);
    font-family: var(--font-inter);
    font-weight: 400;
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
  }

  .btn-zen-underline::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: var(--color-sumi);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1);
  }

  .btn-zen-underline:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
}
```

### Button Component

```tsx
// src/components/Button.tsx
import { ReactNode } from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: 'minimal' | 'ghost' | 'underline';
  onClick?: () => void;
  className?: string;
}

export function Button({
  children,
  href,
  variant = 'minimal',
  onClick,
  className = '',
}: ButtonProps) {
  const baseClass = variant === 'minimal'
    ? 'btn-zen-minimal'
    : variant === 'ghost'
    ? 'btn-zen-ghost'
    : 'btn-zen-underline';

  if (href) {
    return (
      <Link href={href} className={`${baseClass} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`${baseClass} ${className}`}>
      {children}
    </button>
  );
}
```

---

## Icon System

Simple, single-stroke line icons inspired by Japanese calligraphy. Minimal, elegant, 1px stroke weight.

```tsx
// src/components/icons/ZenIcons.tsx

export const ArrowRight = ({ className = '' }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    className={className}
  >
    <path
      d="M4 10H16M16 10L11 5M16 10L11 15"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ArrowDown = ({ className = '' }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    className={className}
  >
    <path
      d="M10 4V16M10 16L5 11M10 16L15 11"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Plus = ({ className = '' }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    className={className}
  >
    <path
      d="M10 4V16M4 10H16"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

export const Close = ({ className = '' }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    className={className}
  >
    <path
      d="M5 5L15 15M15 5L5 15"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

export const Menu = ({ className = '' }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    className={className}
  >
    <path
      d="M3 6H17M3 10H17M3 14H17"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

// Social icons - simplified
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
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Instagram = ({ className = '' }: { className?: string }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    className={className}
  >
    <rect
      x="2"
      y="2"
      width="14"
      height="14"
      rx="3"
      stroke="currentColor"
      strokeWidth="1"
    />
    <circle
      cx="9"
      cy="9"
      r="3"
      stroke="currentColor"
      strokeWidth="1"
    />
    <circle cx="13.5" cy="4.5" r="0.5" fill="currentColor" />
  </svg>
);

export const LinkedIn = ({ className = '' }: { className?: string }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    className={className}
  >
    <rect
      x="2"
      y="2"
      width="14"
      height="14"
      rx="1"
      stroke="currentColor"
      strokeWidth="1"
    />
    <path
      d="M5.5 7.5V12.5M8 7.5V12.5M8 10C8 8.5 12.5 8.5 12.5 10V12.5"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="5.5" cy="5.5" r="0.5" fill="currentColor" />
  </svg>
);
```

---

## Image Treatment

### Grayscale with Contrast

```css
@layer components {
  .image-zen {
    filter: grayscale(100%) contrast(1.05);
    transition: filter 1.5s cubic-bezier(0.25, 0.1, 0.25, 1);
  }

  /* Optional: subtle warmth on hover */
  .image-zen-hover:hover {
    filter: grayscale(70%) contrast(1.02) sepia(5%);
  }

  /* Desaturated (not fully grayscale) */
  .image-muted {
    filter: saturate(0.4) contrast(1.02);
  }

  /* High contrast black and white */
  .image-sumi {
    filter: grayscale(100%) contrast(1.2);
  }
}
```

### Image Component

```tsx
// src/components/ZenImage.tsx
import Image from 'next/image';

interface ZenImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  treatment?: 'grayscale' | 'muted' | 'sumi';
  className?: string;
}

export function ZenImage({
  src,
  alt,
  fill = false,
  width,
  height,
  treatment = 'grayscale',
  className = '',
}: ZenImageProps) {
  const treatmentClass = treatment === 'grayscale'
    ? 'image-zen'
    : treatment === 'muted'
    ? 'image-muted'
    : 'image-sumi';

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${treatmentClass} ${className}`}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`${treatmentClass} ${className}`}
    />
  );
}
```
