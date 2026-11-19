---
title: 'Master Reference Index - Next.js Modern Stack'
description:
  'Complete offline reference for AI assistants working with Next.js 15.3+, Tailwind CSS 4+, and
  shadcn/ui 2.7+.'
category: 'Nextjs Tailwind Shadcn Docs'
---

# Master Reference Index - Next.js Modern Stack

_Complete offline reference for AI assistants working with Next.js 15.3+, Tailwind CSS 4+, and
shadcn/ui 2.7+_

## 📚 Guide Navigation

| Guide                                      | Focus                         | Use Case                   |
| ------------------------------------------ | ----------------------------- | -------------------------- |
| **[Quick Reference Guide](#quick-ref)**    | Essential patterns & commands | Quick lookups, basic setup |
| **[Next.js 15+ Core API](#core-api)**      | Functions, hooks, APIs        | Building functionality     |
| **[Component Patterns](#components)**      | File conventions, structure   | Architecture decisions     |
| **[Modern Stack Setup](#setup)**           | Installation & configuration  | New project setup          |
| **[Tailwind CSS 4+ Reference](#tailwind)** | Styling, theming, utilities   | Design implementation      |
| **[shadcn/ui Components](#shadcn)**        | UI component library          | Interface development      |
| **[Common Patterns](#patterns)**           | Frequently used solutions     | Problem-solving            |
| **[Performance Guide](#performance)**      | Optimization techniques       | Speed improvements         |
| **[Testing Patterns](#testing)**           | Testing strategies            | Quality assurance          |
| **[Deployment Guide](#deployment)**        | Production deployment         | Going live                 |
| **[Troubleshooting](#troubleshooting)**    | Common issues & fixes         | Problem resolution         |

---

## ⚡ Quick Commands Reference

### Essential Commands

```bash
# Project Creation
npx create-next-app@latest my-app --typescript --tailwind --app --src-dir

# Package Management
npm install tailwindcss@next @tailwindcss/postcss@next postcss
npm install next-themes lucide-react class-variance-authority
npx shadcn@latest init
npx shadcn@latest add button card form

# Development
npm run dev --turbo          # Start with Turbopack
npm run build               # Production build
npm run start               # Production server
npm run lint                # ESLint check
npm run type-check          # TypeScript check

# Testing
npm run test                # Unit tests
npm run test:coverage       # Coverage report
npm run test:e2e           # End-to-end tests

# Deployment
vercel                      # Deploy to Vercel
docker build -t my-app .    # Docker build
```

### shadcn/ui Component Commands

```bash
# Core Components
npx shadcn@latest add button card input label form

# Navigation
npx shadcn@latest add navigation-menu dropdown-menu breadcrumb

# Feedback
npx shadcn@latest add alert dialog toast progress

# Data Display
npx shadcn@latest add table badge avatar separator

# Form Components
npx shadcn@latest add checkbox radio-group select textarea switch

# Layout
npx shadcn@latest add tabs sheet accordion collapsible
```

---

## 🏗️ Project Structure Template

### Recommended File Organization

```
my-next-app/
├── src/
│   ├── app/                    # App Router
│   │   ├── globals.css         # Global styles + Tailwind
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   ├── loading.tsx         # Global loading UI
│   │   ├── error.tsx           # Error boundary
│   │   ├── not-found.tsx       # 404 page
│   │   ├── (dashboard)/        # Route groups
│   │   ├── api/                # API routes
│   │   └── [dynamic]/          # Dynamic routes
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── layout/             # Layout components
│   │   ├── forms/              # Form components
│   │   └── providers/          # Context providers
│   ├── lib/
│   │   ├── utils.ts            # Utility functions
│   │   ├── validations.ts      # Zod schemas
│   │   └── constants.ts        # App constants
│   ├── hooks/                  # Custom React hooks
│   ├── types/                  # TypeScript definitions
│   └── styles/                 # Additional styles
├── public/                     # Static assets
├── docs/                       # Documentation
├── tests/                      # Test files
├── .env.local                  # Environment variables
├── components.json             # shadcn/ui config
├── next.config.ts              # Next.js configuration
├── tailwind.config.js          # Tailwind config (v3) or remove for v4
├── postcss.config.mjs          # PostCSS config
├── tsconfig.json              # TypeScript config
└── package.json               # Dependencies
```

---

## 🚀 Version Compatibility Matrix

### Current Recommended Versions (2025)

| Package          | Version | Notes                              |
| ---------------- | ------- | ---------------------------------- |
| **Next.js**      | 15.3+   | Stable Turbopack, React 19 support |
| **React**        | 19+     | New hooks, no forwardRef needed    |
| **Tailwind CSS** | 4.0+    | Oxide engine, CSS-first config     |
| **shadcn/ui**    | 2.7+    | React 19 compatible                |
| **TypeScript**   | 5.0+    | Latest features and performance    |
| **Node.js**      | 18.17+  | Required for Next.js 15+           |

### Breaking Changes Summary

- **Tailwind v3 → v4**: JavaScript config → CSS config
- **shadcn/ui v1 → v2.7+**: forwardRef removal, new patterns
- **Next.js 14 → 15**: Async request APIs, new caching
- **React 18 → 19**: Enhanced hooks, concurrent features

---

## 🎯 Essential Code Snippets

### 1. Basic Page Component

```tsx
// app/page.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Next.js 15+</CardTitle>
        </CardHeader>
        <CardContent>
          <Button>Get Started</Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

### 2. Server Component with Data Fetching

```tsx
// app/posts/page.tsx
export default async function PostsPage() {
  const posts = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 }, // ISR - revalidate every hour
  }).then((res) => res.json());

  return (
    <div className="space-y-4">
      {posts.map((post: any) => (
        <Card key={post.id}>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{post.excerpt}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

### 3. Client Component with Form

```tsx
// components/contact-form.tsx
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
  name: z.string().min(2),
  email: z.string().email(),
});

export function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '' },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

### 4. API Route Handler

```tsx
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export async function GET() {
  try {
    const users = await db.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email } = createUserSchema.parse(body);

    const user = await db.user.create({
      data: { name, email },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

### 5. Theme Provider Setup

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

// app/layout.tsx
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

---

## 🔧 Configuration Templates

### 1. Next.js Configuration

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const config: NextConfig = {
  experimental: {
    turbo: true,
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default config;
```

### 2. Tailwind CSS 4+ Configuration

```css
/* app/globals.css */
@import 'tailwindcss';
@import 'tw-animate-css';

@theme {
  --font-display: 'Inter', 'system-ui', 'sans-serif';
  --color-brand: oklch(0.7 0.15 200);
  --radius: 0.5rem;
}

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
}

.dark {
  --background: oklch(0.094 0 0);
  --foreground: oklch(0.98 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
}
```

### 3. PostCSS Configuration

```javascript
// postcss.config.mjs
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

### 4. TypeScript Configuration

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

## 📋 Migration Checklists

### From Next.js 14 to 15+

- [ ] Update to Node.js 18.17+
- [ ] Update Next.js: `npm install next@latest`
- [ ] Update React: `npm install react@latest react-dom@latest`
- [ ] Make request APIs async (`cookies()`, `headers()`, `params`)
- [ ] Update cache strategies (fetch no longer cached by default)
- [ ] Test all functionality
- [ ] Update deployment configuration

### From Tailwind CSS v3 to v4

- [ ] Backup existing configuration
- [ ] Run upgrade tool: `npx @tailwindcss/upgrade@next`
- [ ] Install v4 packages: `npm install tailwindcss@next @tailwindcss/postcss@next`
- [ ] Update PostCSS config to use `@tailwindcss/postcss`
- [ ] Convert `tailwind.config.js` to CSS `@theme` blocks
- [ ] Update CSS imports: Remove `@tailwind` directives, add `@import "tailwindcss"`
- [ ] Update animation imports: Remove `tailwindcss-animate`, add `tw-animate-css`
- [ ] Test all styling
- [ ] Update renamed utilities (shadow-sm → shadow-xs, etc.)

### From shadcn/ui v1 to v2.7+

- [ ] Update CLI: `npm uninstall -g shadcn-ui`
- [ ] Reinitialize: `npx shadcn@latest init --force`
- [ ] Update React to version 19
- [ ] Remove forwardRef usage: `npx @next/codemod@canary remove-forward-ref`
- [ ] Update all components: `npx shadcn@latest add --all --overwrite`
- [ ] Test component functionality
- [ ] Update custom component patterns

---

## 🔍 Quick Debugging Steps

### Build Failures

1. Clear cache: `rm -rf .next node_modules package-lock.json`
2. Reinstall: `npm install`
3. Check Node.js version: `node --version` (need 18.17+)
4. Check TypeScript errors: `npm run type-check`
5. Check ESLint: `npm run lint`

### Styling Issues

1. Verify PostCSS config: `postcss.config.mjs`
2. Check CSS imports: `@import "tailwindcss"`
3. Verify theme provider: `suppressHydrationWarning`
4. Check component.json: `cssVariables: true`
5. Inspect element classes in browser

### Performance Issues

1. Enable Turbopack: `npm run dev --turbo`
2. Analyze bundle: `ANALYZE=true npm run build`
3. Check for memory leaks in useEffect cleanup
4. Use React DevTools Profiler
5. Monitor Core Web Vitals

---

## 📚 Essential Resources

### Official Documentation

- **Next.js Docs**: <https://nextjs.org/docs>
- **Tailwind CSS Docs**: <https://tailwindcss.com/docs>
- **shadcn/ui Docs**: <https://ui.shadcn.com/>
- **React Docs**: <https://react.dev/>

### Tools & Utilities

- **Tailwind CSS Playground**: <https://play.tailwindcss.com/>
- **Component Library**: <https://ui.shadcn.com/components>
- **Color Palette Generator**: <https://uicolors.app/>
- **Icon Library**: <https://lucide.dev/>

### Community & Support

- **Next.js Discord**: <https://discord.com/invite/nextjs>
- **GitHub Discussions**: <https://github.com/vercel/next.js/discussions>
- **Stack Overflow**: Tags `next.js`, `tailwindcss`, `react`
- **Twitter/X**: @nextjs, @tailwindcss, @shadcn

---

## ⭐ Best Practices Summary

### Development

- ✅ Use Server Components by default, Client Components when needed
- ✅ Leverage Turbopack for faster development
- ✅ Implement proper error boundaries
- ✅ Use TypeScript for better DX and fewer bugs
- ✅ Follow accessibility guidelines

### Performance

- ✅ Optimize images with Next.js Image component
- ✅ Use dynamic imports for code splitting
- ✅ Implement proper caching strategies
- ✅ Monitor Core Web Vitals
- ✅ Use streaming with Suspense

### Styling

- ✅ Use semantic color variables
- ✅ Implement consistent dark mode
- ✅ Leverage container queries for component responsiveness
- ✅ Use OKLCH color space for better accessibility
- ✅ Follow mobile-first responsive design

### Security

- ✅ Validate all inputs with Zod
- ✅ Implement proper authentication
- ✅ Use HTTPS in production
- ✅ Set security headers
- ✅ Rate limit API endpoints

### Testing

- ✅ Write unit tests for utilities and components
- ✅ Use integration tests for user flows
- ✅ Implement E2E tests for critical paths
- ✅ Monitor test coverage
- ✅ Use visual regression testing

This master reference index provides AI assistants with comprehensive access to all aspects of
modern Next.js development. Each section links to detailed information while providing quick access
to the most commonly needed patterns and solutions.
