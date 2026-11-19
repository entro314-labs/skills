# The Ultimate Next.js 15.3+ Guide: Complete Offline Reference

**Next.js 15.3+ • Tailwind CSS 4.1+ • shadcn/ui 2.7+ • React 19**

*Last Updated: January 2025 • Version 3.0.0*

---

## 📋 Table of Contents

1. [Stack Overview & Revolution](#stack-overview--revolution)
2. [Breaking Changes & Migration](#breaking-changes--migration)
3. [Complete Setup Guide](#complete-setup-guide)
4. [Next.js 15.3+ Deep Dive](#nextjs-153-deep-dive)
5. [Tailwind CSS 4.1+ Revolution](#tailwind-css-41-revolution)
6. [shadcn/ui 2.7+ Modern Architecture](#shadcnui-27-modern-architecture)
7. [Advanced Integration Patterns](#advanced-integration-patterns)
8. [Performance Optimization](#performance-optimization)
9. [Best Practices & Conventions](#best-practices--conventions)
10. [Production Deployment](#production-deployment)
11. [Troubleshooting Guide](#troubleshooting-guide)
12. [Code Examples](#code-examples)

---

## Stack Overview & Revolution

### The Performance Revolution

The modern web development landscape has undergone a **seismic shift** with these revolutionary updates:

**🚀 Tailwind CSS 4.1+ Oxide Engine:**

- **5x faster full builds** (105ms vs 960ms for complex sites)
- **100x faster incremental builds** measured in microseconds
- **Zero-configuration setup** with automatic content detection
- **35% smaller footprint** with Rust-based optimizations

**⚡ Next.js 15.3+ Enhancements:**

- **Stable Turbopack** for development (alpha for production)
- **Client instrumentation** and navigation hooks
- **React 19 stable support** with server components
- **Enhanced caching semantics** and fetch behavior

**🎨 shadcn/ui 2.7+ Evolution:**

- **React 19 compatibility** with forwardRef removal
- **Tailwind v4 full support** with OKLCH colors
- **Resolve anywhere** feature for flexible file placement
- **Cross-framework route support** (Laravel, Vite, React Router)

### Core Technology Stack

```json
{
  "runtime": {
    "nextjs": "15.3.1+",
    "react": "19.1.0+",
    "typescript": "5.8.3+",
    "nodejs": "20.x LTS"
  },
  "styling": {
    "tailwind": "4.1.4+",
    "shadcn_ui": "2.7.0+",
    "radix_ui": "1.1.6+",
    "tw_animate_css": "latest"
  },
  "state_management": {
    "zustand": "5.0.4+",
    "tanstack_query": "5.74.6+",
    "server_state": "React Server Components"
  },
  "backend": {
    "supabase_js": "3.43.0+",
    "auth_helpers": "0.16.0+",
    "edge_functions": "Deno 2.1+"
  }
}
```

---

## Breaking Changes & Migration

### 🚨 Critical Next.js 15.3+ Changes

**Async Request APIs (Major Breaking Change):**

```typescript
// ❌ Before (Next.js 14.x)
import { cookies, headers } from 'next/headers'

export default function Page() {
  const cookieStore = cookies()
  const headersList = headers()
  return <div>...</div>
}

// ✅ After (Next.js 15.x)
import { cookies, headers } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const headersList = await headers()
  return <div>...</div>
}
```

**Route Handler Changes:**

```typescript
// ❌ Before: route.ts
export function GET(request) { /* ... */ }

// ✅ After: GET.ts or route.ts with explicit exports
export async function GET(request) { /* ... */ }
```

**Fetch Caching Defaults:**

```typescript
// ⚠️ Now defaults to 'force-cache' instead of 'no-store'
const data = await fetch('/api/data', {
  cache: 'no-store' // Explicitly set when needed
})
```

### 🎨 Tailwind CSS 4.1+ Breaking Changes

**Removed Utilities:**

- `bg-opacity-*` → Use `bg-black/50` syntax
- `text-opacity-*` → Use `text-black/50` syntax
- `flex-shrink-*` → Use `shrink-*`
- `overflow-ellipsis` → Use `text-ellipsis`

**Renamed Utilities:**

- `shadow-sm` → `shadow-xs`
- `shadow` → `shadow-sm`
- `rounded-sm` → `rounded-xs`
- `rounded` → `rounded-sm`
- `ring` → `ring-3` (now defaults to 1px)
- `outline-none` → `outline-hidden`

**Configuration Migration:**

```css
/* ❌ Before: tailwind.config.js */
module.exports = {
  theme: {
    colors: { primary: '#3b82f6' },
    fontFamily: { display: ['Inter', 'sans-serif'] }
  }
}

/* ✅ After: globals.css */
@import "tailwindcss";
@theme {
  --color-primary: #3b82f6;
  --font-display: "Inter", sans-serif;
  --breakpoint-3xl: 1920px;
}
```

### 🔧 shadcn/ui 2.7+ Changes

**React 19 Pattern Migration:**

```typescript
// ❌ Before: forwardRef pattern
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <button ref={ref} className={cn("px-4 py-2", className)} {...props} />
  )
)

// ✅ After: Direct component pattern
function Button({ className, ...props }: ButtonProps) {
  return (
    <button 
      data-slot="button" 
      className={cn("px-4 py-2", className)} 
      {...props} 
    />
  )
}
```

**Animation Library Migration:**

```bash
# Remove old dependency
npm uninstall tailwindcss-animate

# Install new dependency
npm install tw-animate-css
```

```css
/* Update CSS imports */
@import "tailwindcss";
@import "tw-animate-css"; /* New animation library */
```

---

## Complete Setup Guide

### 1. Project Initialization

**New Project (Recommended Path):**

```bash
# Create Next.js project with modern defaults
npx create-next-app@latest my-app \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

cd my-app
```

**Package Installation:**

```bash
# Core dependencies
npm install next@latest react@latest react-dom@latest
npm install tailwindcss@latest @tailwindcss/postcss@latest postcss@latest
npm install lucide-react class-variance-authority clsx tailwind-merge
npm install zustand@latest @tanstack/react-query@latest

# Development dependencies
npm install -D tw-animate-css @types/node typescript eslint
```

### 2. PostCSS Configuration

**Create `postcss.config.mjs`:**

```javascript
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

### 3. Global Styles Setup

**Update `src/app/globals.css`:**

```css
@import "tailwindcss";
@import "tw-animate-css";

@theme {
  /* Typography */
  --font-display: "Inter", "sans-serif";
  --font-body: "Inter", "sans-serif";
  --font-mono: "JetBrains Mono", "monospace";
  
  /* Custom Colors */
  --color-primary: oklch(0.7 0.15 200);
  --color-secondary: oklch(0.8 0.1 120);
  --color-brand: oklch(0.5 0.2 240);
  
  /* Layout */
  --breakpoint-3xl: 1920px;
  --radius: 0.5rem;
  --spacing: 0.25rem;
  
  /* Animation */
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

:root {
  /* Light theme colors */
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
  
  /* Chart colors */
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
}

.dark {
  /* Dark theme colors */
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
  
  /* Dark chart colors */
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
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}
```

### 4. shadcn/ui Installation

**Initialize shadcn/ui:**

```bash
# Use the latest CLI with v4 support
npx shadcn@latest init
```

**Configuration options:**

- ✅ Framework: Next.js
- ✅ Style: new-york (recommended for v4)
- ✅ Base color: neutral or zinc
- ✅ CSS variables: yes
- ✅ TypeScript: yes
- ✅ App Router: yes
- ✅ src/ directory: yes

**Install core components:**

```bash
# Essential UI components
npx shadcn@latest add button card input label
npx shadcn@latest add dropdown-menu dialog sheet
npx shadcn@latest add form checkbox radio-group select
npx shadcn@latest add navigation-menu breadcrumb
npx shadcn@latest add table tabs accordion
```

### 5. Dark Mode Setup

**Install next-themes:**

```bash
npm install next-themes
```

**Create theme provider (`src/components/theme-provider.tsx`):**

```typescript
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

**Update root layout (`src/app/layout.tsx`):**

```typescript
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

## Next.js 15.3+ Deep Dive

### Revolutionary Features

**🚀 Turbopack for Builds (Stable for Dev, Alpha for Production):**

```bash
# Development with Turbopack
npm run dev --turbo

# Production builds (alpha)
npm run build --turbo
```

**📊 Client Instrumentation & Navigation Hooks:**

```typescript
// app/instrumentation.ts
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Server-side instrumentation
    console.log('Build completed with optimizations');
  }
  
  if (process.env.NEXT_RUNTIME === 'edge') {
    // Edge runtime instrumentation
    console.log('Edge function initialized');
  }
}
```

**🔗 Enhanced Navigation Hooks:**

```typescript
"use client";

import { useLinkStatus } from 'next/navigation';
import Link from 'next/link';

export function NavigationLink({ href, children }) {
  const status = useLinkStatus(href);
  
  return (
    <Link 
      href={href}
      className={cn(
        "transition-colors",
        status === 'pending' && "opacity-50"
      )}
    >
      {children}
    </Link>
  );
}
```

**🗂️ TypeScript Configuration Support:**

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const config: NextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.css': ['css'],
      },
    },
    optimizeCss: true,
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

### Enhanced Data Fetching

**Server Components with Streaming:**

```typescript
// app/users/page.tsx
import { Suspense } from 'react';
import { UserList } from '@/components/user-list';
import { LoadingSkeleton } from '@/components/ui/loading';

export default async function UsersPage() {
  return (
    <main className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      <Suspense fallback={<LoadingSkeleton />}>
        <UserListContainer />
      </Suspense>
    </main>
  );
}

async function UserListContainer() {
  // Parallel data fetching
  const [users, stats] = await Promise.all([
    fetchUsers(),
    fetchUserStats()
  ]);
  
  return (
    <>
      <UserStats stats={stats} />
      <UserList users={users} />
    </>
  );
}
```

**Enhanced Caching Strategies:**

```typescript
// lib/data.ts
import { cache } from 'react';

// Server-side caching with React cache
export const getUsers = cache(async () => {
  const response = await fetch('/api/users', {
    cache: 'force-cache', // Static generation
    next: { 
      revalidate: 3600, // Revalidate every hour
      tags: ['users'] // Cache tagging for selective invalidation
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  
  return response.json();
});

// Real-time data fetching
export const getUsersRealtime = async () => {
  const response = await fetch('/api/users', {
    cache: 'no-store' // Always fresh data
  });
  
  return response.json();
};
```

### Advanced Routing Patterns

**Route Groups and Layouts:**

```
app/
├── (auth)/
│   ├── login/
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   └── layout.tsx
├── (dashboard)/
│   ├── analytics/
│   │   └── page.tsx
│   ├── settings/
│   │   └── page.tsx
│   └── layout.tsx
└── layout.tsx
```

**Dynamic Routes with Type Safety:**

```typescript
// app/blog/[slug]/page.tsx
interface BlogPostProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPost({ params, searchParams }: BlogPostProps) {
  const { slug } = await params;
  const { highlight } = await searchParams;
  
  const post = await getBlogPost(slug);
  
  return (
    <article className="prose prose-lg max-w-4xl mx-auto">
      <h1 className={highlight ? "bg-yellow-200" : ""}>
        {post.title}
      </h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
```

---

## Tailwind CSS 4.1+ Revolution

### The Oxide Engine Performance Breakthrough

**Build Performance Comparison:**

| Project Size | v3.x Build Time | v4.x Build Time | Improvement |
|--------------|----------------|----------------|-------------|
| Small (1K classes) | 200ms | 40ms | 5x faster |
| Medium (10K classes) | 960ms | 105ms | 9x faster |
| Large (50K classes) | 5.2s | 520ms | 10x faster |
| Incremental | 150ms | 1.5ms | 100x faster |

### CSS-First Configuration Revolution

**Theme Definition:**

```css
@import "tailwindcss";
@import "tw-animate-css";

@theme {
  /* Typography Scale */
  --font-display: "Inter", "sans-serif";
  --font-body: "Inter", "sans-serif";
  --font-mono: "JetBrains Mono", "monospace";
  
  /* Custom Text Sizes */
  --text-tiny: 0.625rem;
  --text-tiny--line-height: 1.5rem;
  
  /* Color System with OKLCH */
  --color-brand-50: oklch(0.99 0.01 240);
  --color-brand-100: oklch(0.97 0.02 240);
  --color-brand-500: oklch(0.64 0.15 240);
  --color-brand-900: oklch(0.21 0.08 240);
  
  /* Wide Gamut Colors */
  --color-mint-100: oklch(0.97 0.15 145);
  --color-mint-500: oklch(0.7 0.28 145);
  --color-mint-900: oklch(0.4 0.37 145);
  
  /* Custom Breakpoints */
  --breakpoint-3xl: 1920px;
  --breakpoint-4xl: 2560px;
  
  /* Animation Easings */
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ease-elastic: cubic-bezier(0.68, -0.6, 0.32, 1.6);
}
```

### Modern CSS Features

**Container Queries (Now in Core):**

```html
<div class="@container">
  <div class="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-4">
    <div class="p-4 @sm:p-6 @lg:p-8">
      <h3 class="text-lg @sm:text-xl @lg:text-2xl">Responsive Card</h3>
      <p class="text-sm @sm:text-base">Content that adapts to container size</p>
    </div>
  </div>
</div>

<!-- Max-width container queries -->
<div class="@container">
  <div class="grid grid-cols-3 @max-md:grid-cols-1">
    <!-- Stacked on smaller containers -->
  </div>
</div>
```

**3D Transforms:**

```html
<div class="perspective-distant">
  <div class="rotate-x-12 rotate-y-6 transform-3d hover:rotate-x-24 transition-transform">
    <img src="/card.jpg" alt="3D Card" class="rounded-lg shadow-2xl" />
  </div>
</div>

<!-- Scale and translate in 3D space -->
<div class="transform-3d hover:scale-110 hover:translate-z-4 transition-all">
  Interactive 3D Element
</div>
```

**Enhanced Gradients:**

```html
<!-- Linear gradients with angles -->
<div class="bg-linear-45 from-purple-600 to-blue-600">
  Diagonal gradient
</div>

<!-- Radial gradients -->
<div class="bg-radial-[at_center] from-yellow-400 via-orange-500 to-red-600">
  Radial sunset
</div>

<!-- Conic gradients -->
<div class="bg-conic from-red-500 via-yellow-500 via-green-500 via-blue-500 to-red-500">
  Color wheel effect
</div>
```

**New Text Features (4.1+):**

```html
<!-- Text shadows -->
<h1 class="text-shadow-lg text-shadow-blue-500/50">
  Text with colored shadow
</h1>

<!-- Advanced text wrapping -->
<p class="wrap-balance">
  Automatically balanced text wrapping for better typography
</p>

<p class="wrap-pretty">
  Prettier text wrapping that avoids orphans
</p>
```

### Custom Utilities with @utility

**Advanced Button Variants:**

```css
@utility btn-gradient {
  background: linear-gradient(135deg, var(--color-purple-600), var(--color-blue-600));
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius);
  font-weight: 600;
  transition: all 200ms var(--ease-smooth);
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

@utility btn-gradient:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.3);
}

@utility btn-glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius);
  color: white;
}

@utility card-neumorphism {
  background: var(--color-gray-100);
  border-radius: 20px;
  box-shadow: 
    20px 20px 60px #bebebe,
    -20px -20px 60px #ffffff;
}
```

### Dynamic Utilities

**Any Value Works:**

```html
<!-- Grid columns - any number -->
<div class="grid grid-cols-7 gap-3">
<div class="grid grid-cols-13 gap-7">

<!-- Spacing - any value -->
<div class="mt-17 px-23 py-11">

<!-- Custom colors -->
<div class="bg-[#ff6b35] text-[#2d3748]">

<!-- Data attribute styling -->
<div data-state="open" class="opacity-50 data-[state=open]:opacity-100">
```

---

## shadcn/ui 2.7+ Modern Architecture

### React 19 Component Evolution

**Modern Component Pattern:**

```typescript
// components/ui/button.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

// No forwardRef needed in React 19!
export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
```

### Advanced Component Patterns

**Form Components with Enhanced Validation:**

```typescript
// components/ui/form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof formSchema>;

export function SignupForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Handle form submission
      console.log("Form data:", data);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...form.register("email")}
          aria-invalid={!!form.formState.errors.email}
        />
        {form.formState.errors.email && (
          <p className="text-sm text-destructive">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          {...form.register("password")}
          aria-invalid={!!form.formState.errors.password}
        />
        {form.formState.errors.password && (
          <p className="text-sm text-destructive">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      <Button 
        type="submit" 
        className="w-full"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? "Creating account..." : "Sign up"}
      </Button>
    </form>
  );
}
```

### Enhanced Animation System

**Modern Animation Patterns:**

```typescript
// components/ui/animated-card.tsx
"use client";

import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedCard({ children, className, delay = 0 }: AnimatedCardProps) {
  return (
    <div
      className={cn(
        "animate-in slide-in-from-bottom-4 fade-in-0",
        "duration-700 ease-out",
        className
      )}
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: 'both'
      }}
    >
      {children}
    </div>
  );
}

// Usage
export function CardGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <AnimatedCard key={item.id} delay={index * 100}>
          <Card>
            <CardContent>{item.content}</CardContent>
          </Card>
        </AnimatedCard>
      ))}
    </div>
  );
}
```

### Component Composition Patterns

**Advanced Layout Components:**

```typescript
// components/layout/dashboard-shell.tsx
interface DashboardShellProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function DashboardShell({ 
  children, 
  title, 
  description, 
  actions 
}: DashboardShellProps) {
  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        {actions && <div className="flex space-x-2">{actions}</div>}
      </div>
      <div className="space-y-6">{children}</div>
    </div>
  );
}

// Usage
export function AnalyticsPage() {
  return (
    <DashboardShell
      title="Analytics"
      description="View your application metrics and insights."
      actions={
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      }
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Users" value="2,350" />
        <StatsCard title="Active Sessions" value="1,234" />
        <StatsCard title="Conversion Rate" value="12.5%" />
        <StatsCard title="Revenue" value="$15,231" />
      </div>
    </DashboardShell>
  );
}
```

---

## Advanced Integration Patterns

### Server Actions with Type Safety

**Advanced Server Actions:**

```typescript
// app/actions/user-actions.ts
"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache";
import { createSafeAction } from "next-safe-action";

const createUserSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  role: z.enum(["admin", "user", "moderator"]),
  settings: z.object({
    notifications: z.boolean().default(true),
    theme: z.enum(["light", "dark", "system"]).default("system"),
  }),
});

export const createUser = createSafeAction(createUserSchema, async (data) => {
  try {
    // Validate permissions
    const session = await getServerSession();
    if (!session?.user?.permissions?.includes("create_user")) {
      throw new Error("Insufficient permissions");
    }

    // Create user
    const user = await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        role: data.role,
        settings: data.settings,
      },
    });

    // Revalidate relevant data
    revalidateTag("users");
    revalidatePath("/admin/users");

    return { 
      success: true, 
      data: user,
      message: "User created successfully" 
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create user"
    };
  }
});

// Optimistic update action
export const updateUserRole = createSafeAction(
  z.object({
    userId: z.string(),
    role: z.enum(["admin", "user", "moderator"]),
  }),
  async ({ userId, role }) => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
    
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: { role },
    });

    revalidateTag(`user-${userId}`);
    return { success: true, data: updatedUser };
  }
);
```

**Client Component with Optimistic Updates:**

```typescript
// components/user-role-selector.tsx
"use client";

import { useOptimistic, useTransition } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAction } from "next-safe-action/hooks";
import { updateUserRole } from "@/app/actions/user-actions";

interface User {
  id: string;
  name: string;
  role: "admin" | "user" | "moderator";
}

export function UserRoleSelector({ user }: { user: User }) {
  const [isPending, startTransition] = useTransition();
  const [optimisticRole, setOptimisticRole] = useOptimistic(
    user.role,
    (state, newRole: string) => newRole as User["role"]
  );

  const { execute } = useAction(updateUserRole);

  const handleRoleChange = (newRole: User["role"]) => {
    setOptimisticRole(newRole);
    
    startTransition(async () => {
      await execute({ userId: user.id, role: newRole });
    });
  };

  return (
    <Select 
      value={optimisticRole} 
      onValueChange={handleRoleChange}
      disabled={isPending}
    >
      <SelectTrigger className={isPending ? "opacity-50" : ""}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="user">User</SelectItem>
        <SelectItem value="moderator">Moderator</SelectItem>
        <SelectItem value="admin">Admin</SelectItem>
      </SelectContent>
    </Select>
  );
}
```

### Advanced State Management

**Zustand Store with Persistence:**

```typescript
// stores/app-store.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { devtools } from "zustand/middleware";

interface AppState {
  // Theme state
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;

  // UI state
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  
  // User preferences
  preferences: {
    language: string;
    timezone: string;
    dateFormat: string;
  };
  updatePreferences: (preferences: Partial<AppState["preferences"]>) => void;

  // Notifications
  notifications: Array<{
    id: string;
    title: string;
    message: string;
    type: "info" | "success" | "warning" | "error";
    timestamp: Date;
  }>;
  addNotification: (notification: Omit<AppState["notifications"][0], "id" | "timestamp">) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        // Theme
        theme: "system",
        setTheme: (theme) => set({ theme }),

        // UI
        sidebarOpen: true,
        setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),

        // Preferences
        preferences: {
          language: "en",
          timezone: "UTC",
          dateFormat: "MM/dd/yyyy",
        },
        updatePreferences: (newPreferences) =>
          set((state) => ({
            preferences: { ...state.preferences, ...newPreferences },
          })),

        // Notifications
        notifications: [],
        addNotification: (notification) =>
          set((state) => ({
            notifications: [
              ...state.notifications,
              {
                ...notification,
                id: Math.random().toString(36).substr(2, 9),
                timestamp: new Date(),
              },
            ],
          })),
        removeNotification: (id) =>
          set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
          })),
        clearNotifications: () => set({ notifications: [] }),
      }),
      {
        name: "app-storage",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          theme: state.theme,
          preferences: state.preferences,
          sidebarOpen: state.sidebarOpen,
        }),
      }
    ),
    { name: "app-store" }
  )
);
```

**TanStack Query Integration:**

```typescript
// hooks/use-users.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppStore } from "@/stores/app-store";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch("/api/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  const addNotification = useAppStore((state) => state.addNotification);

  return useMutation({
    mutationFn: async (userData: CreateUserData) => {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) throw new Error("Failed to create user");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      addNotification({
        title: "Success",
        message: "User created successfully",
        type: "success",
      });
    },
    onError: (error) => {
      addNotification({
        title: "Error",
        message: error.message,
        type: "error",
      });
    },
  });
}
```

---

## Performance Optimization

### Core Web Vitals Targets (2025)

| Metric | Target | Critical Actions |
|--------|--------|-----------------|
| **INP** (replaces FID) | < 200ms | Split client bundles, avoid long JS tasks, use React Compiler |
| **LCP** | < 2.5s | Optimize hero images with `priority`, preload critical fonts |
| **CLS** | < 0.1 | Reserve space for images, use `size` attributes |
| **FCP** | < 1.8s | Minimize blocking resources, optimize server response |

### Image Optimization Strategies

**Advanced Image Component:**

```typescript
// components/ui/optimized-image.tsx
import Image from "next/image";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  sizes?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  objectFit = "cover",
  placeholder = "blur",
  blurDataURL,
  sizes = "100vw",
}: OptimizedImageProps) {
  // Generate placeholder for better UX
  const shimmer = (w: number, h: number) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#f6f7f8" offset="20%" />
          <stop stop-color="#edeef1" offset="50%" />
          <stop stop-color="#f6f7f8" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#f6f7f8" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite" />
    </svg>
  `;

  const toBase64 = (str: string) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={cn("transition-opacity duration-300", className)}
      style={{ objectFit }}
      placeholder={placeholder}
      blurDataURL={
        blurDataURL ||
        (width && height
          ? `data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`
          : undefined)
      }
      sizes={sizes}
      quality={90}
    />
  );
}

// Usage examples
export function HeroSection() {
  return (
    <div className="relative h-screen w-full">
      <OptimizedImage
        src="/hero-image.jpg"
        alt="Hero background"
        width={1920}
        height={1080}
        priority // Critical for LCP
        className="absolute inset-0 z-0"
        sizes="100vw"
      />
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-6xl font-bold text-white">Welcome</h1>
      </div>
    </div>
  );
}
```

### Font Optimization

**Advanced Font Loading:**

```typescript
// app/fonts.ts
import { Inter, Roboto_Mono, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";

// Primary font with optimized loading
export const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

// Monospace font for code
export const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-mono",
});

// Display font for headings
export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
  variable: "--font-display",
});

// Custom local font
export const customFont = localFont({
  src: [
    {
      path: "../public/fonts/custom-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/custom-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-custom",
});

// app/layout.tsx
import { inter, robotoMono, playfair } from "./fonts";

export default function RootLayout({ children }) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${robotoMono.variable} ${playfair.variable}`}
    >
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
```

### Bundle Optimization

**Dynamic Imports and Code Splitting:**

```typescript
// components/dashboard/analytics-dashboard.tsx
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Heavy chart library - load only when needed
const AdvancedChart = dynamic(() => import("./advanced-chart"), {
  loading: () => (
    <div className="h-64 bg-muted animate-pulse rounded-lg flex items-center justify-center">
      Loading chart...
    </div>
  ),
  ssr: false, // Client-side only
});

// Admin panel - load only for admin users
const AdminPanel = dynamic(() => import("./admin-panel"), {
  loading: () => <AdminPanelSkeleton />,
});

// Map component - heavy and rarely used
const InteractiveMap = dynamic(() => import("./interactive-map"), {
  loading: () => <MapSkeleton />,
  ssr: false,
});

export function AnalyticsDashboard({ userRole, showMap }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<ChartSkeleton />}>
          <AdvancedChart />
        </Suspense>
        
        {userRole === "admin" && (
          <Suspense fallback={<AdminPanelSkeleton />}>
            <AdminPanel />
          </Suspense>
        )}
      </div>
      
      {showMap && (
        <Suspense fallback={<MapSkeleton />}>
          <InteractiveMap />
        </Suspense>
      )}
    </div>
  );
}
```

### React Compiler Integration

**Next.js Configuration for React Compiler:**

```typescript
// next.config.ts
import type { NextConfig } from "next";

const config: NextConfig = {
  experimental: {
    reactCompiler: {
      enabled: true,
      compilationMode: "annotation", // or "all"
    },
  },
  // Other optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
  },
};

export default config;
```

**Optimized Components with React Compiler:**

```typescript
// components/expensive-component.tsx
"use client";

// React Compiler will automatically optimize this
export function ExpensiveComponent({ data, filters }) {
  // Heavy computation - React Compiler optimizes this automatically
  const processedData = data
    .filter(item => filters.category === "all" || item.category === filters.category)
    .map(item => ({
      ...item,
      processed: true,
      timestamp: new Date().toISOString(),
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-4">
      {processedData.map(item => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}

// Manual optimization still possible when needed
const MemoizedItemCard = memo(function ItemCard({ item }) {
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-semibold">{item.title}</h3>
      <p className="text-sm text-muted-foreground">{item.description}</p>
    </div>
  );
});
```

---

## Best Practices & Conventions

### Code Organization Patterns

**Recommended Project Structure:**

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Route groups
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/
│   │   ├── analytics/
│   │   ├── settings/
│   │   └── layout.tsx
│   ├── api/                      # API routes
│   │   ├── auth/
│   │   │   └── route.ts
│   │   └── users/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/                   # Reusable UI components
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── index.ts             # Barrel exports
│   ├── forms/                    # Form components
│   ├── layout/                   # Layout components
│   └── features/                 # Feature-specific components
├── lib/                          # Utilities and configurations
│   ├── utils.ts                  # cn() and general utilities
│   ├── validations.ts            # Zod schemas
│   ├── auth.ts                   # Authentication logic
│   └── db.ts                     # Database configuration
├── hooks/                        # Custom React hooks
│   ├── use-local-storage.ts
│   ├── use-debounce.ts
│   └── use-media-query.ts
├── stores/                       # State management
│   ├── auth-store.ts
│   └── app-store.ts
├── types/                        # TypeScript definitions
│   ├── auth.ts
│   ├── database.ts
│   └── api.ts
└── middleware.ts                 # Next.js middleware
```

### Naming Conventions

**File and Component Naming:**

```typescript
// ✅ Good: kebab-case for files
user-profile.tsx
auth-form.tsx
dashboard-analytics.tsx

// ✅ Good: PascalCase for components
export function UserProfile() {}
export function AuthForm() {}
export function DashboardAnalytics() {}

// ✅ Good: Descriptive boolean names
const isLoading = true;
const hasError = false;
const canSubmit = true;
const shouldShowModal = false;

// ✅ Good: Event handler naming
const handleSubmit = () => {};
const handleClick = () => {};
const handleInputChange = () => {};

// ✅ Good: Component boundaries
user-card.client.tsx  // Client component
user-list.server.tsx  // Server component
user-api.route.ts     // API route
```

### TypeScript Best Practices

**Comprehensive Type Definitions:**

```typescript
// types/api.ts
export interface ApiResponse<T = any> {
  data: T;
  message: string;
  success: boolean;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// types/user.ts
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  settings: UserSettings;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = "admin" | "user" | "moderator";

export interface UserSettings {
  theme: "light" | "dark" | "system";
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
  privacy: {
    profileVisibility: "public" | "private" | "friends";
    showEmail: boolean;
  };
}

// Utility types
export type CreateUserData = Omit<User, "id" | "createdAt" | "updatedAt">;
export type UpdateUserData = Partial<Pick<User, "name" | "avatar" | "settings">>;
export type UserWithoutSensitiveData = Omit<User, "email" | "settings">;
```

**Runtime Validation with Zod:**

```typescript
// lib/validations.ts
import { z } from "zod";

export const userSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string()
    .email("Please enter a valid email address")
    .toLowerCase(),
  role: z.enum(["admin", "user", "moderator"]),
  settings: z.object({
    theme: z.enum(["light", "dark", "system"]).default("system"),
    notifications: z.object({
      email: z.boolean().default(true),
      push: z.boolean().default(true),
      marketing: z.boolean().default(false),
    }),
  }),
});

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean().optional(),
});

export const resetPasswordSchema = z.object({
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Type inference
export type User = z.infer<typeof userSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
```

### Component Design Patterns

**Compound Component Pattern:**

```typescript
// components/ui/data-table.tsx
interface DataTableProps<T> {
  data: T[];
  children: React.ReactNode;
}

interface DataTableHeaderProps {
  children: React.ReactNode;
}

interface DataTableRowProps<T> {
  item: T;
  children: (item: T) => React.ReactNode;
}

interface DataTableCellProps {
  children: React.ReactNode;
  className?: string;
}

// Main component
export function DataTable<T>({ data, children }: DataTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <table className="w-full">
        {children}
      </table>
    </div>
  );
}

// Sub-components
DataTable.Header = function DataTableHeader({ children }: DataTableHeaderProps) {
  return (
    <thead className="bg-muted/50">
      <tr>{children}</tr>
    </thead>
  );
};

DataTable.Body = function DataTableBody({ children }: { children: React.ReactNode }) {
  return <tbody className="divide-y">{children}</tbody>;
};

DataTable.Row = function DataTableRow<T>({ item, children }: DataTableRowProps<T>) {
  return <tr className="hover:bg-muted/50">{children(item)}</tr>;
};

DataTable.Cell = function DataTableCell({ children, className }: DataTableCellProps) {
  return (
    <td className={cn("px-4 py-2 text-sm", className)}>
      {children}
    </td>
  );
};

// Usage
export function UsersTable({ users }: { users: User[] }) {
  return (
    <DataTable data={users}>
      <DataTable.Header>
        <DataTable.Cell>Name</DataTable.Cell>
        <DataTable.Cell>Email</DataTable.Cell>
        <DataTable.Cell>Role</DataTable.Cell>
        <DataTable.Cell>Actions</DataTable.Cell>
      </DataTable.Header>
      <DataTable.Body>
        {users.map((user) => (
          <DataTable.Row key={user.id} item={user}>
            {(user) => (
              <>
                <DataTable.Cell>{user.name}</DataTable.Cell>
                <DataTable.Cell>{user.email}</DataTable.Cell>
                <DataTable.Cell>
                  <Badge variant="outline">{user.role}</Badge>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </DataTable.Cell>
              </>
            )}
          </DataTable.Row>
        ))}
      </DataTable.Body>
    </DataTable>
  );
}
```

### Accessibility Implementation

**WCAG 2.1 AA Compliance Patterns:**

```typescript
// components/ui/accessible-modal.tsx
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useEffect, useRef } from "react";

interface AccessibleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function AccessibleModal({ 
  isOpen, 
  onClose, 
  title, 
  description, 
  children 
}: AccessibleModalProps) {
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement;
    } else {
      // Restore focus when modal closes
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-md"
        onOpenAutoFocus={(e) => {
          // Focus the first focusable element in the modal
          const firstFocusable = e.currentTarget.querySelector(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          ) as HTMLElement;
          firstFocusable?.focus();
        }}
        onCloseAutoFocus={(e) => {
          e.preventDefault(); // Prevent auto focus, we handle it manually
        }}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

// Screen reader announcements
export function useAnnouncement() {
  const announce = (message: string, priority: "polite" | "assertive" = "polite") => {
    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", priority);
    announcement.setAttribute("aria-atomic", "true");
    announcement.className = "sr-only";
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  return { announce };
}
```

---

## Production Deployment

### Next.js Configuration for Production

**Optimized Production Configuration:**

```typescript
// next.config.ts
import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const config: NextConfig = {
  // Performance optimizations
  experimental: {
    turbo: process.env.NODE_ENV === "development" ? true : false,
    optimizeCss: true,
    serverMinification: true,
    webVitalsAttribution: ["CLS", "LCP", "INP"],
  },
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
    reactRemoveProperties: process.env.NODE_ENV === "production",
  },
  
  // Image optimization
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ["example.com", "cdn.example.com"],
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.vercel-insights.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self'",
              "connect-src 'self' https:",
            ].join("; "),
          },
        ],
      },
    ];
  },
  
  // Redirects and rewrites
  async redirects() {
    return [
      {
        source: "/old-page",
        destination: "/new-page",
        permanent: true,
      },
    ];
  },
  
  // Bundle analysis
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!dev && !isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@sentry/node": "@sentry/browser",
      };
    }
    
    return config;
  },
};

// Sentry configuration for error tracking
export default withSentryConfig(
  config,
  {
    silent: true,
    org: "your-org",
    project: "your-project",
  },
  {
    widenClientFileUpload: true,
    transpileClientSDK: true,
    tunnelRoute: "/monitoring",
    hideSourceMaps: true,
    disableLogger: true,
  }
);
```

### Environment Variables Management

**Environment Configuration:**

```bash
# .env.local (development)
DATABASE_URL="postgresql://user:password@localhost:5432/myapp_dev"
NEXTAUTH_SECRET="development-secret-key"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# .env.production (production)
DATABASE_URL="postgresql://user:password@prod-host:5432/myapp_prod"
NEXTAUTH_SECRET="secure-production-secret"
NEXTAUTH_URL="https://yourdomain.com"
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
SENTRY_DSN="your-sentry-dsn"
UPSTASH_REDIS_REST_URL="your-redis-url"
UPSTASH_REDIS_REST_TOKEN="your-redis-token"
```

**Environment Validation:**

```typescript
// lib/env.ts
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  NEXTAUTH_SECRET: z.string().min(1),
  NEXTAUTH_URL: z.string().url(),
  DATABASE_URL: z.string().url(),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  SENTRY_DSN: z.string().url().optional(),
});

export const env = envSchema.parse(process.env);
```

### CI/CD Pipeline

**GitHub Actions Workflow:**

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run type checking
        run: npm run type-check
      
      - name: Run linting
        run: npm run lint
      
      - name: Run tests
        run: npm run test
        env:
          NODE_ENV: test
      
      - name: Run E2E tests
        run: npm run test:e2e
        env:
          NODE_ENV: test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build application
        run: npm run build
        env:
          NODE_ENV: production
      
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v10
        with:
          configPath: './.lighthouserc.json'
          uploadArtifacts: true
          temporaryPublicStorage: true

  deploy:
    needs: [test, build]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to Vercel
        uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### Monitoring and Analytics

**Performance Monitoring Setup:**

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

// lib/monitoring.ts
import * as Sentry from "@sentry/nextjs";

export function initMonitoring() {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
    environment: process.env.NODE_ENV,
    integrations: [
      new Sentry.BrowserTracing({
        tracePropagationTargets: ["localhost", /^https:\/\/yourdomain\.com/],
      }),
    ],
  });
}

// Custom error tracking
export function trackError(error: Error, context?: Record<string, any>) {
  Sentry.captureException(error, {
    tags: context,
    level: 'error',
  });
}

export function trackEvent(event: string, data?: Record<string, any>) {
  Sentry.addBreadcrumb({
    message: event,
    data,
    level: 'info',
  });
}
```

---

## Troubleshooting Guide

### Common Next.js 15.3+ Issues

**1. Async Request API Errors:**

```typescript
// ❌ Error: Cannot read properties of undefined
const cookieStore = cookies();

// ✅ Solution: Make function async and await
export default async function Page() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  return <div>...</div>;
}
```

**2. Route Handler Migration:**

```typescript
// ❌ Old pattern that may not work
export function GET(request: NextRequest) {
  return Response.json({ data: 'hello' });
}

// ✅ New pattern with explicit async
export async function GET(request: NextRequest) {
  const data = await fetchData();
  return Response.json({ data });
}
```

**3. Caching Issues:**

```typescript
// ❌ Unintended caching (now default)
const data = await fetch('/api/data');

// ✅ Explicit cache control
const staticData = await fetch('/api/data', { cache: 'force-cache' });
const dynamicData = await fetch('/api/data', { cache: 'no-store' });
const revalidatedData = await fetch('/api/data', { 
  next: { revalidate: 60 } 
});
```

### Tailwind CSS 4.1+ Issues

**1. Configuration Not Working:**

```css
/* ❌ Old v3 syntax */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ✅ New v4 syntax */
@import "tailwindcss";
@import "tw-animate-css";
```

**2. PostCSS Configuration:**

```javascript
// ❌ Old configuration
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

// ✅ New configuration
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

**3. Class Names Not Working:**

```html
<!-- ❌ Renamed utilities -->
<div class="shadow ring outline-none">

<!-- ✅ Updated class names -->
<div class="shadow-sm ring-3 outline-hidden">
```

### shadcn/ui 2.7+ Issues

**1. Component Installation Errors:**

```bash
# ❌ If getting peer dependency errors
npm install --legacy-peer-deps

# ✅ Better approach - use pnpm or yarn
pnpm install  # Handles peer deps better
```

**2. React 19 Compatibility:**

```typescript
// ❌ Old forwardRef pattern causing issues
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, ref) => <button ref={ref} {...props} />
);

// ✅ Use codemod or manual migration
npx @next/codemod@canary remove-forward-ref ./components

// Or update manually:
function Button({ ...props }: ButtonProps) {
  return <button data-slot="button" {...props} />;
}
```

**3. Animation Library Issues:**

```bash
# ❌ Old animation dependency
npm uninstall tailwindcss-animate

# ✅ New animation library
npm install tw-animate-css
```

```css
/* Update CSS imports */
@import "tailwindcss";
@import "tw-animate-css"; /* Replace tailwindcss-animate */
```

### Performance Issues

**1. Large Bundle Sizes:**

```typescript
// Check bundle analyzer
npm install --save-dev @next/bundle-analyzer

// next.config.ts
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(config);

// Run analysis
ANALYZE=true npm run build
```

**2. Slow Development Builds:**

```bash
# Enable Turbopack for faster dev builds
npm run dev --turbo

# Or in package.json
{
  "scripts": {
    "dev": "next dev --turbo"
  }
}
```

**3. Memory Issues:**

```typescript
// next.config.ts
export default {
  experimental: {
    workerThreads: false,
    cpus: 1, // Limit CPU usage
  },
  webpack: (config) => {
    config.optimization.splitChunks = {
      chunks: 'all',
      maxSize: 244000,
    };
    return config;
  },
};
```

### Common Anti-Patterns to Avoid

**1. Performance Anti-Patterns:**

```typescript
// ❌ Fetching in Client Components unnecessarily
'use client';
export function UserList() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetch('/api/users').then(res => res.json()).then(setUsers);
  }, []);
  
  return <div>{/* ... */}</div>;
}

// ✅ Fetch in Server Components
export async function UserList() {
  const users = await fetch('/api/users').then(res => res.json());
  return <div>{/* ... */}</div>;
}
```

**2. State Management Anti-Patterns:**

```typescript
// ❌ Prop drilling
function App() {
  const [user, setUser] = useState(null);
  return <Dashboard user={user} setUser={setUser} />;
}

function Dashboard({ user, setUser }) {
  return <Sidebar user={user} setUser={setUser} />;
}

// ✅ Use state management
const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
```

**3. SEO Anti-Patterns:**

```typescript
// ❌ Missing metadata
export default function Page() {
  return <div>Content</div>;
}

// ✅ Proper metadata
export const metadata = {
  title: 'Page Title',
  description: 'Page description',
  openGraph: {
    title: 'Page Title',
    description: 'Page description',
  },
};
```

---

## Code Examples

### Complete Authentication System

**Auth Provider with Supabase:**

```typescript
// lib/auth.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

### Advanced Data Table Component

**Reusable Data Table with Sorting and Filtering:**

```typescript
// components/ui/data-table.tsx
"use client";

import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  searchPlaceholder?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Search...",
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder={searchPlaceholder}
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

// Usage example
export function UsersTable() {
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <Badge variant="outline">{row.getValue("role")}</Badge>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => editUser(user.id)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => deleteUser(user.id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={users} searchPlaceholder="Search users..." />;
}
```

---

## Migration Checklist

### Automated Migration Tools

```bash
# 1. Update dependencies
npm update next@latest react@latest react-dom@latest

# 2. Run Next.js migration codemod
npx @next/codemod@canary next-async-request-api .

# 3. Run Tailwind migration
npx @tailwindcss/upgrade@next

# 4. Update shadcn/ui components
npx shadcn@latest init --force
npx shadcn@latest add --all --overwrite

# 5. React 19 migration
npx @next/codemod@canary remove-forward-ref ./components
```

### Manual Checklist

**✅ Next.js 15.3+ Migration:**

- [ ] Update all async request API calls (`cookies()`, `headers()`, etc.)
- [ ] Convert route handlers to new pattern
- [ ] Add explicit cache settings to all fetch calls
- [ ] Test Turbopack compatibility
- [ ] Update TypeScript configuration
- [ ] Verify middleware functionality

**✅ Tailwind CSS 4.1+ Migration:**

- [ ] Update PostCSS configuration
- [ ] Migrate `tailwind.config.js` to CSS `@theme`
- [ ] Update renamed utility classes
- [ ] Replace deprecated utilities
- [ ] Test container queries
- [ ] Verify custom component styles

**✅ shadcn/ui 2.7+ Migration:**

- [ ] Update animation library (`tw-animate-css`)
- [ ] Remove forwardRef usage
- [ ] Update component imports
- [ ] Test dark mode functionality
- [ ] Verify accessibility features

**✅ General Testing:**

- [ ] Run full test suite
- [ ] Test in all target browsers
- [ ] Verify Core Web Vitals
- [ ] Check mobile responsiveness
- [ ] Test accessibility with screen readers
- [ ] Validate production build

---

This comprehensive guide serves as your complete offline reference for building modern web applications with Next.js 15.3+, Tailwind CSS 4.1+, and shadcn/ui 2.7+. Keep this document handy for quick reference during development, troubleshooting, and optimization tasks.

**Remember:** This stack represents the cutting edge of web development, offering unprecedented performance improvements and developer experience enhancements. The investment in migration and learning these new patterns will pay dividends in improved productivity and application performance.
