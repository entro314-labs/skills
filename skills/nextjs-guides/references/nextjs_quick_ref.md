---
title: 'Next.js Modern Stack - Quick Reference Guide'
description: 'For AI Assistants: Essential patterns, commands, and setups.'
category: 'Nextjs Tailwind Shadcn Docs'
---

# Next.js Modern Stack - Quick Reference Guide

_For AI Assistants: Essential patterns, commands, and setups_

## 🚀 Modern Stack Overview

**Current Versions (2025)**

- **Next.js**: 15.3+ (Stable Turbopack, App Router)
- **Tailwind CSS**: 4.0+ (Oxide engine, CSS-first config)
- **shadcn/ui**: 2.7+ (React 19 compatible, v4 Tailwind support)
- **React**: 19+ (No forwardRef, enhanced Server Components)

---

## ⚡ Quick Setup Commands

### New Project Creation

```bash
# Recommended: Modern setup with all defaults
npx create-next-app@latest my-app \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

cd my-app

# Install Tailwind CSS 4+
npm install tailwindcss@next @tailwindcss/postcss@next postcss

# Initialize shadcn/ui 2.7+
npx shadcn@latest init
```

### Essential Dependencies

```bash
# Core UI components
npm install lucide-react class-variance-authority clsx tailwind-merge
npm install next-themes  # For dark mode
npm install -D tw-animate-css  # New animation system

# Add essential components
npx shadcn@latest add button card input label form
npx shadcn@latest add dropdown-menu dialog sheet
```

---

## 📁 File Structure Template

```
src/
├── app/
│   ├── globals.css              # Tailwind imports + CSS variables
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Home page
│   ├── loading.tsx              # Global loading UI
│   ├── error.tsx                # Global error boundary
│   ├── not-found.tsx           # 404 page
│   └── (dashboard)/            # Route groups
│       ├── layout.tsx          # Nested layout
│       ├── dashboard/
│       │   └── page.tsx
│       └── settings/
│           └── page.tsx
├── components/
│   ├── ui/                     # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── form.tsx
│   ├── theme-provider.tsx      # Dark mode provider
│   ├── mode-toggle.tsx         # Theme switcher
│   └── layout/                 # Custom layout components
├── lib/
│   ├── utils.ts               # cn() utility + helpers
│   └── validations.ts         # Zod schemas
├── hooks/                     # Custom React hooks
└── types/                     # TypeScript definitions
```

---

## 🎨 Tailwind CSS 4+ Configuration

### PostCSS Setup (`postcss.config.mjs`)

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

### Global Styles (`src/app/globals.css`)

```css
@import 'tailwindcss';
@import 'tw-animate-css';

@theme {
  /* Custom design tokens */
  --font-display: 'Inter', 'sans-serif';
  --color-brand: oklch(0.7 0.15 200);
  --breakpoint-3xl: 1920px;
  --radius: 0.5rem;
}

:root {
  /* Light mode variables */
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  /* ... other semantic colors */
}

.dark {
  /* Dark mode variables */
  --background: oklch(0.094 0 0);
  --foreground: oklch(0.98 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  /* ... other dark mode colors */
}

@theme inline {
  /* Map CSS variables to Tailwind tokens */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
}

@layer base {
  * {
    border-color: var(--border);
  }
  body {
    background: var(--background);
    color: var(--foreground);
    font-feature-settings:
      'rlig' 1,
      'calt' 1;
  }
}
```

---

## 🔧 Core Configuration Files

### Next.js Config (`next.config.ts`)

```typescript
import type { NextConfig } from 'next';

const config: NextConfig = {
  experimental: {
    turbo: true, // Enable Turbopack
    optimizeCss: true, // CSS optimization
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    formats: ['image/webp', 'image/avif'],
  },
};

export default config;
```

### shadcn/ui Config (`components.json`)

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  }
}
```

### TypeScript Config (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## 🎯 Essential React Patterns

### Server Component (Default)

```tsx
// app/dashboard/page.tsx
export default async function DashboardPage() {
  const data = await fetch('https://api.example.com/data', {
    cache: 'force-cache', // or 'no-store' for dynamic
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <DataDisplay data={data} />
    </div>
  );
}
```

### Client Component

```tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function InteractiveComponent() {
  const [count, setCount] = useState(0);

  return (
    <div className="space-y-4">
      <p className="text-lg">Count: {count}</p>
      <Button onClick={() => setCount(count + 1)}>Increment</Button>
    </div>
  );
}
```

### Layout with Theme Provider

```tsx
// app/layout.tsx
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Theme Provider Component

```tsx
// components/theme-provider.tsx
'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

---

## 🧩 Common shadcn/ui Patterns

### Form with Validation

```tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </Form>
  );
}
```

### Card Layout Pattern

```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function FeatureCard({ title, description, children }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
```

### Mode Toggle Component

```tsx
'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
```

---

## 🔨 Common Development Commands

### Development

```bash
# Start development server
npm run dev
npm run dev --turbo  # With Turbopack

# Build for production
npm run build

# Start production server
npm run start

# Linting and type checking
npm run lint
npm run type-check
```

### shadcn/ui Component Management

```bash
# Add new components
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add form

# Add multiple components
npx shadcn@latest add button card input label

# Update existing components
npx shadcn@latest update

# List available components
npx shadcn@latest
```

### Debugging and Analysis

```bash
# Check bundle size
npm run build && npm run analyze

# Performance profiling
NEXT_PROFILE=true npm run build

# Type coverage
npx type-coverage --strict

# Dependency updates
npx npm-check-updates -u
```

---

## 🚨 Common Pitfalls & Solutions

### ❌ Avoid These Patterns

```tsx
// ❌ Don't use old Tailwind v3 config file
// tailwind.config.js - Not needed in v4

// ❌ Don't use deprecated imports
// @tailwind base; @tailwind components; @tailwind utilities;

// ❌ Don't use tailwindcss-animate
// import 'tailwindcss-animate'

// ❌ Don't use React.forwardRef with React 19
const Button = React.forwardRef(...)
```

### ✅ Use These Instead

```tsx
// ✅ Use CSS-first configuration
@import "tailwindcss";
@theme { /* config here */ }

// ✅ Use tw-animate-css
@import "tw-animate-css";

// ✅ Use data-slot pattern (React 19)
function Button({ ...props }: React.ComponentProps<"button">) {
  return <button data-slot="button" {...props} />;
}
```

---

## 📊 Performance Checklist

### Build Performance

- [ ] Using Tailwind CSS 4.0+ with Oxide engine
- [ ] Turbopack enabled for development
- [ ] CSS optimization enabled in Next.js config
- [ ] Proper content detection in CSS

### Runtime Performance

- [ ] Server Components used where possible
- [ ] Client Components only for interactivity
- [ ] Dynamic imports for heavy components
- [ ] Proper image optimization configuration

### Bundle Size

- [ ] CSS bundle under 10KB (typical with Tailwind v4)
- [ ] JavaScript chunks properly split
- [ ] Unused dependencies removed
- [ ] Tree shaking working correctly

---

## 🔗 Quick Links

**Documentation**

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [shadcn/ui Docs](https://ui.shadcn.com/)

**Tools**

- [Component Library](https://ui.shadcn.com/components)
- [Color Converter](https://tailwindcss.com/docs/customizing-colors)
- [Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

This reference guide covers the essential patterns and configurations for building modern React
applications with the Next.js 15.3+, Tailwind CSS 4+, and shadcn/ui 2.7+ stack.
