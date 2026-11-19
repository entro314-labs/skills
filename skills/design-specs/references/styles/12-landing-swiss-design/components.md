# Swiss Design / International Typographic Style Landing Page: Components

Part of the [Swiss Design / International Typographic Style Landing Page specification](index.md).

## Component Library

### Button Component

Swiss buttons are rectangular, with no rounded corners. They communicate through typography and color contrast.

```tsx
// components/Button.tsx
import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

// React 19: ref is a regular prop (ComponentProps<'button'> includes it), so no forwardRef
interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const variants = {
  primary: 'bg-black text-white hover:bg-gray-800',
  secondary: 'bg-red text-white hover:bg-red/90',
  ghost: 'bg-transparent text-black hover:bg-gray-100',
  outline: 'bg-transparent text-black border-2 border-black hover:bg-black hover:text-white',
};

const sizes = {
  sm: 'px-4 py-2 text-xs tracking-widest uppercase font-medium',
  md: 'px-6 py-3 text-sm tracking-widest uppercase font-medium',
  lg: 'px-8 py-4 text-base tracking-widest uppercase font-semibold',
};

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles - NO rounded corners
        'inline-flex items-center justify-center',
        'transition-colors duration-instant',
        'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:pointer-events-none',
        // Variant and size
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

### Link Component

```tsx
// components/Link.tsx
import NextLink from 'next/link';
import { cn } from '@/lib/utils';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  underline?: boolean;
  external?: boolean;
}

export function Link({
  href,
  children,
  className,
  underline = true,
  external = false,
}: LinkProps) {
  const linkClasses = cn(
    'inline-flex items-center',
    'text-black hover:text-red',
    'transition-colors duration-fast',
    underline && 'border-b border-black hover:border-red',
    className
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={linkClasses}>
      {children}
    </NextLink>
  );
}
```

### Input Component

```tsx
// components/Input.tsx
import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

interface InputProps extends ComponentProps<'input'> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-medium tracking-widest uppercase mb-2"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          // Base styles - sharp corners
          'w-full px-4 py-3',
          'bg-white text-black',
          'border-2 border-black',
          'text-base font-normal',
          // Focus state
          'focus:outline-hidden focus:ring-0 focus:border-red',
          'transition-colors duration-fast',
          // Placeholder
          'placeholder:text-gray-400',
          // Error state
          error && 'border-red',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-2 text-xs text-red font-medium">{error}</p>
      )}
    </div>
  );
}
```

### Card Component

Swiss cards have NO shadows, NO rounded corners, and rely on borders and spacing for hierarchy.

```tsx
// components/Card.tsx
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'bordered' | 'filled' | 'inverted';
}

const cardVariants = {
  default: 'bg-white',
  bordered: 'bg-white border-2 border-black',
  filled: 'bg-gray-100',
  inverted: 'bg-black text-white',
};

export function Card({ children, className, variant = 'default' }: CardProps) {
  return (
    <div
      className={cn(
        // NO rounded corners, NO shadows
        'p-6 md:p-8',
        cardVariants[variant],
        className
      )}
    >
      {children}
    </div>
  );
}

// Card Header
export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('mb-6 pb-4 border-b border-gray-200', className)}>
      {children}
    </div>
  );
}

// Card Content
export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('', className)}>{children}</div>;
}

// Card Footer
export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('mt-6 pt-4 border-t border-gray-200', className)}>
      {children}
    </div>
  );
}
```

### Divider Component

```tsx
// components/Divider.tsx
import { cn } from '@/lib/utils';

interface DividerProps {
  className?: string;
  variant?: 'light' | 'medium' | 'strong';
  orientation?: 'horizontal' | 'vertical';
}

export function Divider({
  className,
  variant = 'light',
  orientation = 'horizontal',
}: DividerProps) {
  const variants = {
    light: 'bg-gray-200',
    medium: 'bg-gray-400',
    strong: 'bg-black',
  };

  if (orientation === 'vertical') {
    return (
      <div
        className={cn(
          'w-px h-full',
          variants[variant],
          className
        )}
      />
    );
  }

  return (
    <hr
      className={cn(
        'w-full h-px border-0',
        variants[variant],
        className
      )}
    />
  );
}
```

### Rotated Label Component

A signature Swiss Design element - text rotated 90 degrees.

```tsx
// components/RotatedLabel.tsx
import { cn } from '@/lib/utils';

interface RotatedLabelProps {
  children: React.ReactNode;
  className?: string;
  position?: 'left' | 'right';
}

export function RotatedLabel({
  children,
  className,
  position = 'left',
}: RotatedLabelProps) {
  return (
    <span
      className={cn(
        'text-xs font-bold tracking-ultra uppercase',
        'whitespace-nowrap',
        position === 'left'
          ? 'origin-left -rotate-90 translate-y-full'
          : 'origin-right rotate-90 -translate-y-full',
        className
      )}
    >
      {children}
    </span>
  );
}
```

### Number Display Component

Large typographic numbers - a Swiss Design staple.

```tsx
// components/NumberDisplay.tsx
import { cn } from '@/lib/utils';

interface NumberDisplayProps {
  number: string | number;
  label?: string;
  className?: string;
  size?: 'md' | 'lg' | 'xl';
}

const sizes = {
  md: 'text-5xl',
  lg: 'text-6xl',
  xl: 'text-7xl',
};

export function NumberDisplay({
  number,
  label,
  className,
  size = 'lg',
}: NumberDisplayProps) {
  return (
    <div className={cn('', className)}>
      <span
        className={cn(
          sizes[size],
          'font-mono font-black tracking-tighter leading-none',
          'text-black'
        )}
      >
        {number}
      </span>
      {label && (
        <span className="block mt-2 text-xs font-medium tracking-widest uppercase text-gray-500">
          {label}
        </span>
      )}
    </div>
  );
}
```
