---
title: 'Modern Stack Setup Guide'
description: 'Next.js 15.3+ + Tailwind CSS 4+ + shadcn/ui 2.7+.'
category: 'Nextjs Tailwind Shadcn Docs'
---

# Modern Stack Setup Guide

_Next.js 15.3+ + Tailwind CSS 4+ + shadcn/ui 2.7+_

## 🚀 Revolutionary Stack Overview

This guide covers the cutting-edge combination of:

- **Next.js 15.3+**: Stable Turbopack, enhanced App Router, React 19 support
- **Tailwind CSS 4.0+**: Oxide engine, CSS-first config, 5x faster builds
- **shadcn/ui 2.7+**: React 19 compatible, Tailwind v4 support, modern patterns
- **React 19**: No forwardRef, enhanced Server Components, improved performance

---

## 📋 Prerequisites

```bash
# Check versions
node --version  # >= 18.17.0
npm --version   # >= 9.0.0

# Alternative package managers
pnpm --version  # >= 8.0.0 (recommended)
yarn --version  # >= 3.0.0
```

---

## 🏗️ Step 1: Project Initialization

### Option A: New Project (Recommended)

```bash
# Create Next.js project with modern defaults
npx create-next-app@latest my-modern-app \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --turbopack \
  --import-alias "@/*"

cd my-modern-app
```

### Option B: Manual Setup

```bash
# Create project directory
mkdir my-modern-app && cd my-modern-app

# Initialize package.json
npm init -y

# Install Next.js and React
npm install next@latest react@latest react-dom@latest
npm install -D typescript @types/node @types/react @types/react-dom
npm install -D eslint eslint-config-next

# Create initial files
mkdir -p src/app
touch src/app/layout.tsx src/app/page.tsx src/app/globals.css
```

---

## 🎨 Step 2: Tailwind CSS 4+ Setup

### Install Tailwind CSS 4

```bash
# Install Tailwind CSS 4 with PostCSS plugin
npm install tailwindcss@next @tailwindcss/postcss@next postcss
npm install -D tw-animate-css
```

### Configure PostCSS

Create `postcss.config.mjs`:

```javascript
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
```

### Setup Global Styles

Update `src/app/globals.css`:

```css
@import 'tailwindcss';
@import 'tw-animate-css';

@theme {
  /* Typography */
  --font-display: 'Inter', 'system-ui', 'sans-serif';
  --font-body: 'Inter', 'system-ui', 'sans-serif';
  --font-mono: 'JetBrains Mono', 'Menlo', 'monospace';

  /* Color System */
  --color-brand: oklch(0.7 0.15 200);
  --color-accent: oklch(0.8 0.12 150);

  /* Spacing & Layout */
  --radius: 0.5rem;
  --container-max-width: 1400px;

  /* Custom Breakpoints */
  --breakpoint-3xl: 1920px;
  --breakpoint-4xl: 2560px;

  /* Animation */
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

:root {
  /* Light mode variables */
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.985 0 0);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.205 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
}

.dark {
  /* Dark mode variables */
  --background: oklch(0.094 0 0);
  --foreground: oklch(0.98 0 0);
  --card: oklch(0.094 0 0);
  --card-foreground: oklch(0.98 0 0);
  --popover: oklch(0.094 0 0);
  --popover-foreground: oklch(0.98 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.162 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.162 0 0);
  --muted-foreground: oklch(0.661 0 0);
  --accent: oklch(0.162 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.631 0.207 27.325);
  --destructive-foreground: oklch(0.985 0 0);
  --border: oklch(0.162 0 0);
  --input: oklch(0.162 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
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
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

/* Custom utilities */
@utility container {
  max-width: var(--container-max-width);
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@utility btn-gradient {
  background: linear-gradient(135deg, var(--color-brand), var(--color-accent));
  color: white;
  border: none;
  transition: all 200ms var(--ease-smooth);
}

@utility btn-gradient:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.3);
}
```

---

## 🧩 Step 3: shadcn/ui 2.7+ Installation

### Initialize shadcn/ui

```bash
# Use the latest CLI with Tailwind v4 support
npx shadcn@latest init
```

**Configuration prompts:**

```
✔ Which style would you like to use? › new-york
✔ Which color would you like to use as base color? › neutral
✔ Would you like to use CSS variables for colors? › yes
✔ Are you using a custom tailwind prefix eg. tw-? › no
✔ Where is your global CSS file? › src/app/globals.css
✔ Would you like to use TypeScript (recommended)? › yes
✔ Where is your tailwind.config file? › Not needed for v4
✔ Configure the import alias for components? › @/components
✔ Configure the import alias for utils? › @/lib/utils
✔ Are you using React Server Components? › yes
✔ Write configuration to components.json? › yes
```

### Verify components.json

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
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

### Install Essential Dependencies

```bash
# Core dependencies for shadcn/ui
npm install lucide-react class-variance-authority clsx tailwind-merge
npm install @radix-ui/react-slot

# For forms
npm install react-hook-form @hookform/resolvers zod

# For dark mode
npm install next-themes
```

### Add Core Components

```bash
# Essential UI components
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add form

# Navigation components
npx shadcn@latest add dropdown-menu
npx shadcn@latest add navigation-menu

# Feedback components
npx shadcn@latest add dialog
npx shadcn@latest add sheet
npx shadcn@latest add toast

# Data display
npx shadcn@latest add table
npx shadcn@latest add badge
npx shadcn@latest add avatar

# Form components
npx shadcn@latest add checkbox
npx shadcn@latest add radio-group
npx shadcn@latest add select
npx shadcn@latest add textarea
npx shadcn@latest add switch
```

---

## ⚙️ Step 4: Next.js Configuration

### Create next.config.ts

```typescript
import type { NextConfig } from 'next';

const config: NextConfig = {
  // Experimental features
  experimental: {
    turbo: true, // Enable Turbopack for dev
    optimizeCss: true, // CSS optimization
    serverComponentsHmrCache: true,
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default config;
```

### Update package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "format": "prettier --write .",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "clean": "rm -rf .next",
    "analyze": "ANALYZE=true npm run build"
  }
}
```

---

## 🎭 Step 5: Theme Provider Setup

### Create Theme Provider

```typescript
// src/components/theme-provider.tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

### Create Mode Toggle Component

```typescript
// src/components/mode-toggle.tsx
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

---

## 📄 Step 6: Layout & Page Setup

### Root Layout

```typescript
// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | My Modern App',
    default: 'My Modern App',
  },
  description: 'A modern Next.js application with the latest stack',
  keywords: ['nextjs', 'tailwindcss', 'shadcn', 'react'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  metadataBase: new URL('https://yourdomain.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourdomain.com',
    title: 'My Modern App',
    description: 'A modern Next.js application',
    siteName: 'My Modern App',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Modern App',
    description: 'A modern Next.js application',
    creator: '@yourusername',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                  <a className="mr-6 flex items-center space-x-2" href="/">
                    <span className="font-bold">My App</span>
                  </a>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                  <nav className="flex items-center space-x-6">
                    {/* Navigation items */}
                  </nav>
                </div>
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="border-t">
              <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                  <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    Built with ❤️ using the modern stack.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Home Page

```typescript
// src/app/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ModeToggle } from '@/components/mode-toggle';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-end mb-8">
        <ModeToggle />
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <Badge variant="secondary" className="text-sm">
            Next.js 15.3+ • Tailwind CSS 4+ • shadcn/ui 2.7+
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Welcome to the{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Modern Stack
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the future of web development with cutting-edge tools,
            lightning-fast performance, and exceptional developer experience.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/dashboard">Get Started</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/docs">View Documentation</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <Card>
            <CardHeader>
              <CardTitle>⚡ Lightning Fast</CardTitle>
              <CardDescription>
                Turbopack + Oxide engine delivers 5x faster builds
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Experience development speeds that will change how you build applications.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🎨 Modern Design</CardTitle>
              <CardDescription>
                Beautiful components with dark mode support
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Stunning UI components that work perfectly in light and dark themes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🚀 Developer Experience</CardTitle>
              <CardDescription>
                TypeScript, ESLint, and modern tooling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Everything you need for productive development out of the box.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
```

---

## 🔧 Step 7: Development Tools

### TypeScript Configuration

```json
// tsconfig.json
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
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### ESLint Configuration

```json
// .eslintrc.json
{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "rules": {
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }
    ],
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

### Prettier Configuration

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "printWidth": 80,
  "endOfLine": "lf",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

---

## 🧪 Step 8: Testing Setup (Optional)

### Install Testing Dependencies

```bash
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom
```

### Vitest Configuration

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

---

## 🚀 Step 9: Start Development

```bash
# Start development server with Turbopack
npm run dev

# In another terminal, type check
npm run type-check

# Lint your code
npm run lint

# Build for production
npm run build
```

---

## ✅ Verification Checklist

### Development Environment

- [ ] Development server starts without errors
- [ ] Hot reloading works correctly
- [ ] TypeScript compilation succeeds
- [ ] ESLint passes without errors
- [ ] Dark mode toggle functions properly

### Component Testing

- [ ] shadcn/ui components render correctly
- [ ] Tailwind CSS classes apply properly
- [ ] Responsive design works on different screen sizes
- [ ] Animations and transitions work smoothly

### Build Testing

- [ ] Production build completes successfully
- [ ] Bundle size is optimized
- [ ] All pages load correctly in production
- [ ] Performance metrics are satisfactory

### Browser Compatibility

- [ ] Works in Chrome/Edge
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Mobile responsiveness verified

---

## 🔧 Troubleshooting

### Common Issues

**1. "Module not found: @tailwindcss/postcss"**

```bash
# Solution: Ensure correct installation
npm install @tailwindcss/postcss@next postcss
```

**2. CSS not applying in development**

```css
/* Verify imports in globals.css */
@import 'tailwindcss';
@import 'tw-animate-css';
```

**3. shadcn/ui components not rendering**

```bash
# Verify installation
npx shadcn@latest init --force
npx shadcn@latest add button --overwrite
```

**4. Dark mode not working**

```typescript
// Check theme provider setup
<html suppressHydrationWarning>
  <ThemeProvider attribute="class">
```

---

## 📚 Next Steps

1. **Add Database**: Setup Prisma, Drizzle, or your preferred ORM
2. **Authentication**: Implement NextAuth.js or Clerk
3. **API Routes**: Create API endpoints for your application
4. **State Management**: Add Zustand, Redux Toolkit, or Context
5. **Deployment**: Deploy to Vercel, Netlify, or your preferred platform

---

## 🔗 Useful Resources

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Tailwind CSS 4 Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Component Library](https://ui.shadcn.com/)
- [React 19 Documentation](https://react.dev/)

This setup provides a modern, performant, and scalable foundation for building React applications
with the latest tools and best practices.
