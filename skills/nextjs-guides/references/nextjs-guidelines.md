---
title: Next.js 15.x Development Guidelines for AI Assistants
version: 2.0.0
lastUpdated: 2025-04-23
tags:
  - nextjs
  - react
  - tailwind
  - TypeScript
  - Supabase
  - development
aiIntegration: true
---

# Next.js 15.x Development Guidelines for AI Assistants

Last updated: April 23, 2025

> This document follows versioning best practices with updates every 4 weeks or when CVEs are published. We only pin to stable releases.

## 📋 Table of Contents <!--table-of-contents-->

1. [Technology Stack](#technology-stack)
2. [Key Principles](#key-principles)
3. [Next.js 15.x Features](#nextjs-15x-features)
    - [Font Optimization](#font-optimization)
    - [Analytics & Telemetry](#analytics--telemetry)
    - [Edge Config / KV](#vercel-edge-config--kv)
    - [Bundle Analysis](#bundle-analysis)
    - [Internationalization](#internationalization-i18n)
4. [Code Style & Conventions](#code-style--conventions)
    - [Naming Conventions](#naming-conventions)
    - [File & Component Structure](#file--component-structure)
5. [Next.js 15.3.1 & React 19.1 Best Practices](#nextjs-1531--react-191-best-practices)
    - [Breaking Changes & Migration](#breaking-changes--migration)
    - [Async APIs & Cookie Handling](#async-apis--cookie-handling)
    - [React 19 Removed APIs](#react-19-removed-apis)
    - [Server vs Client Components](#server-vs-client-components)
    - [Data Fetching](#data-fetching)
    - [Routing & Navigation](#routing--navigation)
    - [Error Handling](#error-handling)
6. [TypeScript 5.8 Implementation](#typescript-58-implementation-60-on-roadmap)
7. [Tailwind CSS 4.1 Implementation](#tailwind-css-41-implementation)
8. [UI Components & Accessibility](#ui-components--accessibility)
9. [State Management](#state-management)
10. [Supabase Integration](#supabase-integration-launch-week-14-features)
    - [Package Versions & Setup](#package-versions--setup)
    - [Edge Functions](#edge-functions)
    - [Realtime Broadcast](#realtime-broadcast)
    - [Declarative Schemas & Migrations](#declarative-schemas--migrations)
    - [Advanced Features](#advanced-features)
11. [Performance Optimization](#performance-optimization)
12. [Testing & CI/CD](#testing--cicd)
    - [Automated E2E Testing](#automated-e2e-testing)
    - [Lighthouse CI for Performance Budgets](#lighthouse-ci-for-performance-budgets)
    - [Documentation & Standards](#documentation--standards)
13. [Advanced Project Setup & Scaling](#advanced-project-setup--scaling)
    - [pnpm Workspaces](#pnpm-workspaces)
    - [Turborepo or Nx for Monorepos](#turborepo-or-nx-for-monorepos)
    - [ESLint & TypeScript Checks in CI](#eslint--typescript-checks-in-ci)
    - [Production Observability](#production-observability)
    - [PWA Features](#pwa-features)
14. [Security Best Practices](#security-best-practices)
15. [Common Anti-Patterns to Avoid](#common-anti-patterns-to-avoid-2025)
16. [Code Examples](#code-examples)
17. [Deployment & CI/CD Best Practices](#deployment--cicd-best-practices)
18. [Quick Migration Checklist](#quick-migration-checklist-for-nextjs-1531)
19. [AI Agent Integration Guide](#ai-agent-integration-guide)

## 📝 Changelog

- **v2.0.0 (2025-04-23)**: Enhanced document for AI assistants, improved structure, added AI-specific guidance, expanded code examples
- **v1.0.0 (2025-04-15)**: Initial guidelines released

## Technology Stack <!--technology-stack-->

*The foundation: modern, stable, and performant tools with solid TypeScript integration.*

- Next.js 15.3.1 (App Router with stable Turbopack dev mode)
- React 19.1.0 (Server Components, React Compiler)
- TypeScript 5.8.3
- Tailwind CSS 4.1.4
- Shadcn UI 2.4.1 / Radix UI 1.1.6
- Supabase
  - @supabase/supabase-js@^3.43.0 (full Edge-runtime support + streaming)
  - @supabase/ssr
- Modern state management
  - Zustand 5.0.4
  - TanStack Query 5.74.6

<!-- AI-BOUNDARY-END -->

## Key principles <!--key-principles-->

*Focus: balance performance, accessibility, and developer experience with server-first architecture.*

**KP-1.** **Code structure**: Write concise, technically accurate TypeScript code using functional, declarative programming (avoid classes).
<!-- triple: (prefer, functional_programming, architecture) -->

**KP-2.** **Accessibility**: Ship accessible, mobile-first UIs with WCAG AA compliance and color contrast ratio ≥ 4.5:1.
<!-- triple: (ensure, accessibility_compliance, user_experience) -->

**KP-3.** **Architecture**: Prioritize React Server Components; keep Client Components tiny (< 500 LOC).
<!-- triple: (prefer, server_components, performance) -->

**KP-4.** **Reliability**: Implement proper error handling and validation at all levels.
<!-- triple: (implement, error_handling, reliability) -->

**KP-5.** **Performance**: Optimize Core Web Vitals: INP (<200ms), LCP (<2.5s), CLS (<0.1).

- Note: INP (Interaction to Next Paint) replaced FID in March 2024.
<!-- triple: (optimize, core_web_vitals, performance) -->

<!-- GUIDELINE_END -->

## Next.js 15.x Features <!--nextjs-15x-features-->

*Key capabilities: focus on these features for optimal performance and developer experience.*

### Built-in Font Optimization <!--font-optimization-->

*Self-hosted fonts reduce network requests and layout shifts.*

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], weight: ['400','700'] })

export default function Page() {
  return <main className={inter.className}>...</main>
}
```

**Benefits:**

- Self-hosts font files (no third-party CDN requests)
- Auto-subsets only the glyphs actually used
- Preloads key fonts to improve LCP
- Typically reduces first-paint times by hundreds of milliseconds

<!-- GUIDELINE_END -->

### Next.js Analytics & Telemetry <!--analytics--telemetry-->

*Built-in performance tracking for Core Web Vitals with zero config.*

```typescript
// app/layout.tsx
import { Analytics } from 'next/analytics'

export default function RootLayout({ children }) {
  return (
    <>
      {children}
      <Analytics />
    </>
  )
}
```

**Features:**

- `next/analytics` for measuring Core Web Vitals in production
- Server-side instrumentation points for App Router and Middleware
- Automatic tracking of bundle size, INP, CLS, and other metrics
- Integrates with Vercel Analytics SDK

<!-- GUIDELINE_END -->

### Vercel Edge Config / KV <!--edge-config-kv-->

*Ultra-fast, edge-based configuration and feature flags.*

```typescript
// middleware.ts
import { edgeConfig } from '@vercel/edge-config'

export async function middleware(req) {
  const flag = await edgeConfig.get('new-navbar-enabled')
  if (flag) { /* ... */ }
  return NextResponse.next()
}
```

**Use Cases:**

- Per-request feature flags or A/B parameters
- Global configuration without redeploys
- Sub-1ms reads from any region
- Ideal for dark launches, canary rollouts, and fast rollbacks

<!-- GUIDELINE_END -->

### Bundle Analysis <!--bundle-analysis-->

*Visualize and optimize your JavaScript bundles for better load times.*

```javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({ /* your config */ })
```

**Usage:**

- Install and wrap your `next.config.js`
- Run `ANALYZE=true next build`
- Visualize client and server bundle sizes
- Identify tree-shaking issues and oversized dependencies

<!-- GUIDELINE_END -->

### Internationalization (i18n) <!--internationalization-i18n-->

*First-class support for multiple languages without additional libraries.*

```javascript
// next.config.js
module.exports = {
  i18n: {
    locales: ['en', 'fr', 'de'],
    defaultLocale: 'en',
  },
}
```

**Features:**

- Automatic locale detection and redirection
- Per-locale static props/pages with `generateStaticParams`
- Lightweight runtime polyfills for unsupported browsers
- Pairs well with libraries like `next-intl` for richer formatting

<!-- GUIDELINE_END -->

## Code Style & Conventions <!--code-style--conventions-->

*Consistent patterns: follow these conventions for readable, maintainable code.*

### Naming Conventions <!--naming-conventions-->

*Clear, consistent naming improves code readability and AI assistant understanding.*

- **Files**: Use kebab-case for all filenames (`user-profile.tsx`, `auth-form.tsx`)
- **Components**: Use PascalCase for component names (`UserProfile`, `AuthForm`)
- **Variables**: Use descriptive names with auxiliary verbs:
  - Booleans: Use prefixes like `is`, `has`, `can`, `should` (`isLoading`, `hasError`, `canSubmit`)
  - Event handlers: Use `handle` prefix (`handleSubmit`, `handleClick`)
- **Directories**: Use lowercase with dashes (`components/auth-wizard`, `lib/api-utils`)

<!-- GUIDELINE_END -->

### File & Component Structure <!--file--component-structure-->

*Consistent structure enables better collaboration and easier maintenance.*

```typescript
// Example component structure (user-card.client.tsx)
'use client'; // Only when necessary

import { useState } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';

// Main component export
export function UserCard({ user, onAction }: UserCardProps) {
  // Component logic
  return (
    <div className="rounded-lg border p-4">
      {/* Component JSX */}
    </div>
  );
}

// Helper functions specific to this component
function formatUserName(user: User) {
  // Implementation
}

// Types/interfaces at the end
interface UserCardProps {
  user: User;
  onAction?: (userId: string) => void;
}

interface User {
  id: string;
  name: string;
  // other properties
}
```

**Best Practices:**

- Use `.client.tsx` and `.server.ts` suffixes to surface RSC boundaries
- Use barrel exports (index.ts) per folder and collocate tests (*.test.tsx)
- Keep folders ≤ 4 levels deep for better AI navigation

<!-- @prompt: "In Next.js 15.x, organize components with clear server/client boundaries using .server.tsx and .client.tsx suffixes" -->

<!-- GUIDELINE_END -->

## Next.js 15.3.1 & React 19.1 Best Practices <!--nextjs-1531--react-191-best-practices-->

*Key updates: async APIs, new hooks, and compiler optimizations define this release.*

### Breaking Changes & Migration <!--breaking-changes--migration-->

*Critical changes requiring code updates when migrating to Next.js 15.x.*

- ⚠️ **Cache defaults**: Now `force-cache` instead of `no-store`
  - Explicitly add `cache: 'no-store'` when needed
  - Add 'no-store' segment config where appropriate
- ⚠️ **Async Request API**: Use GET.ts, POST.ts instead of route.ts
  - Export a handler function returning Response
- **Next.js Form**: Use `<Form action={createUser}>...</Form>` for progressive enhancement
- **Turbopack**: Now default for dev mode
  - Keep custom webpack loaders for build only or migrate to Turbopack plugins
- ⚠️ **Security**: Patch to 15.2.3+ for CVE-2025-29927
  - Validate x-middleware-subrequest header in custom middleware

<!-- GUIDELINE_END -->

### Async APIs & Cookie Handling <!--async-apis--cookie-handling-->

*Request API methods are now async and require proper await handling.*

- ⚠️ `cookies()`, `headers()`, and `draftMode()` are now **async** functions:

```typescript
// app/dashboard/page.tsx
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')
  // ...
}
```

- Route handlers can be sync or async:
  - Use synchronous: `export function GET(req) { /* ... */ }`
  - Use async when using `await`: `export async function GET(req) { /* ... */ }`
- Migration codemod available:

```bash
npx @next/codemod@canary next-async-request-api .
```

<!-- GUIDELINE_END -->

### React 19 Removed APIs <!--react-19-removed-apis-->

*Legacy APIs removed in React 19 that must be replaced in your code.*

- ⚠️ contextTypes / getChildContext → Use new Context API
- ⚠️ string refs → Use callback refs or useRef
- ⚠️ ReactDOM.findDOMNode → Use ref + ref.current
- ⚠️ ReactDOM.render/hydrate → Use createRoot / hydrateRoot
- ⚠️ function-component defaultProps → Use ES default parameters

<!-- GUIDELINE_END -->

### Server vs Client Components <!--server-vs-client-components-->

*Guidelines for deciding when to use Server vs Client components.*

**Server Components (Default):**

- Use for data fetching, static content, SEO optimization
- Smaller bundle size, faster initial load
- Prefer `await use(fetch(...))` in RSC when you need streaming

**Client Components (Only when needed):**

- Use only for interactivity, events, and browser APIs
- Add `'use client'` directive at top of file
- Keep Client Components small (< 500 LOC)
- Don't wrap compiler-optimized components in `memo` unless you benchmark

**Example of proper component split:**

```typescript
// users-page.server.tsx
import { Suspense } from 'react';
import { UserFilters } from './user-filters.client';
import { UserList } from './user-list.server';
import { LoadingSkeleton } from '@/components/ui/loading';

export default async function UsersPage() {
  return (
    <main>
      <h1>Users</h1>
      <UserFilters /> {/* Client component for interactivity */}
      <Suspense fallback={<LoadingSkeleton />}>
        <UserList /> {/* Server component for data fetching */}
      </Suspense>
    </main>
  );
}
```

<!-- 🤖prompt: "Default to Server Components; only use Client Components for interactivity, state, or browser APIs" -->

<!-- GUIDELINE_END -->

### Data fetching <!--data-fetching-->

*Optimized data fetching patterns to eliminate waterfalls and improve UX.*

```typescript
// lib/preload-users.server.ts - Early fetching with cache
import 'server-only';
import { cache } from 'react';

export const preloadUsers = cache(async () => {
  const res = await fetch(`${API}/users`, {
    cache: 'no-store' // Explicit cache setting
  });
  return res.json() as Promise<User[]>;
});

// React 19 preload syntax for RSC
import { preload as preloadUsers } from '@/lib/users';

// Usage in Server Component
export default async function UsersPage() {
  // Start fetch as early as possible
  preloadUsers();

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <UserListContainer />
    </Suspense>
  );
}

async function UserListContainer() {
  const users = await preloadUsers();
  return <UserList users={users} />;
}
```

**Best Practices:**

- Kick off fetch early using `cache()` or React 19 `preload()` to avoid waterfalls
- Use React 19's `use()` hook for streaming data in RSC:

  ```typescript
  // React 19 use hook example
  import { use } from 'react';

  async function UserProfile({ userId }) {
    // Streaming fetch with use() hook
    const user = use(fetch(`/api/users/${userId}`).then(res => res.json()));
    return <div>{user.name}</div>;
  }
  ```

- On client, use TanStack Query 5.74.6 with `suspense: true` for mutations
- Implement proper Suspense boundaries with fallbacks
- Use explicit cache settings with all fetch calls (avoid default force-cache)
- Consider Incremental Partial Prerendering (IPPR) for dynamic pages

<!-- 🤖prompt: "Always use explicit cache settings with fetch(); prefer Server Components for data fetching" -->

<!-- GUIDELINE_END -->

### Routing & Navigation <!--routing--navigation-->

*App Router best practices for organized, performant routing.*

- Use App Router folder structure for routes
- Implement nested layouts for code reuse
- Use route groups for logical organization
- Add `dynamic` export to set caching behavior: `export const dynamic = 'force-static';`
- Implement proper loading.tsx, error.tsx, and not-found.tsx pages
- Use metadata API for SEO optimization
- Use generateStaticParams for IPPR (static rendering with dynamic paths)

```typescript
// app/blog/[slug]/page.tsx
export const dynamic = 'force-static';

// Generate static routes at build time
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPost({ params }) {
  const post = await getPostBySlug(params.slug);
  return <PostComponent post={post} />;
}
```

<!-- GUIDELINE_END -->

### Error Handling <!--error-handling-->

*Robust error management for better user experience and debugging.*

- Implement error boundaries with error.tsx files (Next.js 15.x auto-captures RSC errors)
- Use next-safe-action 5.x with structured returns: `{ok, data}|{error}`
- Log critical errors server-side via next/telemetry or Supabase Edge Function
- Provide user-friendly error messages
- Use early returns and guard clauses to handle edge cases

```typescript
// app/dashboard/error.tsx
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ErrorAlert } from '@/components/ui/error-alert';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to monitoring service
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <div className="p-4">
      <ErrorAlert
        title="Something went wrong!"
        description="We've logged this error and will look into it."
      />
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
```

<!-- GUIDELINE_END -->

## TypeScript 5.8 Implementation  <!--typescript-58-implementation-->

*TypeScript best practices for reliable, maintainable code.*

- Use TypeScript for all code
- Keep "target": "es2022" in tsconfig.json
- Use decorators with `--experimentalDecorators` flag (still needed)
- Leverage current TypeScript features:
  - Const type parameters
  - Variadic tuple types
  - Type-only imports
  - Template literal types
- Use interfaces for public APIs and types for unions/complex types
- Implement Zod for runtime type validation and parsing
- Define proper type definitions for all components and functions
- Use strict TypeScript configuration
- Leverage type inference where possible to reduce boilerplate

```typescript
// Example of proper TypeScript usage
import { z } from 'zod';
import type { ReactNode } from 'react';

// Use template literal types
type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonClassName = `btn-${ButtonVariant}-${ButtonSize}`;

// Use interfaces for component props
interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: ReactNode;
  onClick?: () => void;
}

// Zod schema for runtime validation
export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2).max(50),
  email: z.string().email(),
  role: z.enum(['admin', 'user']),
});

// Type inference from schema
export type User = z.infer<typeof UserSchema>;
```

<!-- GUIDELINE_END -->

## Tailwind CSS 4.1 Implementation <!--tailwind-css-41-implementation-->

*Modern utility-first styling with the latest Tailwind features.*

- Use utility-first approach
- Implement mobile-first responsive design
- Use JIT mode effectively for custom values
- Leverage Tailwind 4.1 new utilities:
  - text-shadow-* for text shadow effects
  - clip-*for advanced clipping (replaced mask-* in beta 4.1.3-3)
  - wrap-* for text wrapping control
- Be aware of renamed bare shadow, radius, and blur scales from v4
- Container query support is now GA (stable) for component-based responsiveness
- Dark mode default is still class-based, but media approach is deprecated
  - Set once in tailwind.config.ts
- Implement `class-variance-authority` for component variants
- Embrace new utilities for neumorphism and advanced masks
- Avoid excessive classname complexity; extract to components when needed

```typescript
// Button component with class-variance-authority
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  "rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
        ghost: "bg-transparent hover:bg-gray-100 focus:ring-gray-500",
      },
      size: {
        sm: "text-sm px-3 py-1.5",
        md: "text-base px-4 py-2",
        lg: "text-lg px-5 py-2.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export function Button({
  variant,
  size,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
}
```

<!-- 🤖prompt: "Use utility-first Tailwind CSS, extract repeated patterns to components using class-variance-authority" -->

<!-- GUIDELINE_END -->

## UI Components & Accessibility <!--ui-components--accessibility-->

*Accessible, reusable UI components following WCAG standards.*

- Use Shadcn UI and Radix UI for accessible component primitives
- Ensure proper keyboard navigation
- Implement correct ARIA attributes
- Provide proper focus management
- Use semantic HTML elements
- Ensure proper color contrast (WCAG AA compliance minimum, ratio ≥ 4.5:1)
- Test with screen readers
- Implement proper form labels and error messages

```typescript
// Accessible form input example
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  description?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, description, id, className, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
    const descriptionId = description ? `${inputId}-description` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    return (
      <div className="w-full">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium mb-1"
        >
          {label}
        </label>

        {description && (
          <p
            id={descriptionId}
            className="text-sm text-gray-500 mb-2"
          >
            {description}
          </p>
        )}

        <input
          id={inputId}
          ref={ref}
          aria-describedby={cn(descriptionId, errorId)}
          aria-invalid={!!error}
          className={cn(
            "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2",
            error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500",
            className
          )}
          {...props}
        />

        {error && (
          <p
            id={errorId}
            className="mt-1 text-sm text-red-500"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
```

<!-- GUIDELINE_END -->

## State Management <!--state-management-->

*Efficient state management strategies for global and component state.*

- Use Server Components to minimize client-side state
- For client-side state:
  - Use Zustand for global state management
  - Use TanStack Query for server state
  - Use React's built-in hooks for component-level state
- Implement proper loading, error, and empty states
- Use React Context sparingly and for truly global concerns

```typescript
// Example Zustand store with persistence
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage',
    }
  )
);

// Usage in client component
'use client';

import { useThemeStore } from '@/stores/theme-store';

export function ThemeSwitcher() {
  const { theme, setTheme } = useThemeStore();

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'system')}
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="system">System</option>
    </select>
  );
}
```

<!-- GUIDELINE_END -->

## Supabase Integration (Launch Week 14 Features) <!--supabase-integration-->

*Best practices for integrating with Supabase's latest features.*

### Package Versions & Setup <!--package-versions--setup-->

*Proper setup for optimal Supabase integration with Next.js 15.x.*

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const createSupabaseClient = () =>
  createClient<Database>(supabaseUrl, supabaseAnonKey);
```

**Key Points:**

- Use `@supabase/supabase-js@^3.43.0` for full Edge-runtime support and streaming APIs
- Upgrade to `@supabase/ssr` for compatibility with Next.js 15's async `cookies()` API
- Implement Row Level Security (RLS) for all tables
- Use Supabase Auth for authentication
- Leverage type-safe queries with generated types

<!-- GUIDELINE_END -->

### Edge Functions <!--edge-functions-->

*Serverless functions for secure backend logic.*

```typescript
// Client-side or Server Component
const callFunction = async (payload) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_SUPABASE_FUNCTION_URL,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify(payload)
    }
  );
  return response.json();
};
```

**Benefits:**

- Deploy Deno 2.1-based Edge Functions directly from the Supabase Dashboard
- Set environment variables in the UI
- Simplifies serverless deployment workflow

**Edge Runtime Limits:**

- Vercel Edge Functions: 125 MB memory, 5s execution time
- Supabase Edge Functions: 1 GB memory, 30s execution time

<!-- GUIDELINE_END -->

### Realtime Broadcast <!--realtime-broadcast-->

*Efficient realtime updates with database-triggered broadcasts.*

```typescript
// Client component
const setupRealtimeListener = async () => {
  const { data } = await supabase
    .channel('room')
    .on('broadcast', { event: 'new_message' }, payload => {
      // Handle the broadcast
      console.log(payload);
    })
    .subscribe();
};

// Row Level Security policy for realtime channels
// In SQL migration
CREATE POLICY "Users can subscribe to chat rooms they belong to"
ON public.messages
FOR SELECT
TO authenticated
USING (
  auth.uid() IN (
    SELECT user_id FROM room_members WHERE room_id = messages.room_id
  )
);
```

**Key Benefits:**

- Replace client-side `.channel()` loops with database-triggered broadcasts
- Triggers fire securely from Postgres whenever you `INSERT` or `UPDATE`
- Secure channels with Row Level Security policies

<!-- GUIDELINE_END -->

### Declarative Schemas & Migrations <!--declarative-schemas--migrations-->

*Version-controlled database schema management.*

```bash
# Create a new migration
supabase migration new add_profiles_table

# Apply migrations
supabase migration up
```

**Best Practices:**

- Write migrations in SQL (not UI clicks) for source-control parity
- Use `supabase migration new` plus `.sql` files in Git
- Hook them into CI/CD for consistent RLS policies

<!-- GUIDELINE_END -->

### Advanced Features <!--advanced-features-->

*Cutting-edge Supabase capabilities for enhanced functionality.*

- **Automatic Embeddings**: Use `vector_generate_embedding()` function in a SQL trigger to auto-populate `VECTOR` columns
- **Vector Similarity**: Use `vector_similarity()` for Approximate Nearest Neighbor (ANN) searches
- **Route API → Nearest Replica**: Enable geo-routing for sub-50ms reads using the closest read replica
- **Dedicated Poolers**: Opt into co-located pgBouncer per project for stable connection pooling under heavy load
- **GraphQL**: Use `pg_graphql` extension for automatic GraphQL API generation
- Use optimistic updates for better UX
- Store sensitive data securely
- Never expose service_role key to the browser

```sql
-- Vector similarity search example
SELECT
  id,
  content,
  vector_similarity(embedding, '[0.1, 0.2, ...]') as similarity
FROM documents
ORDER BY similarity DESC
LIMIT 5;

-- pg_graphql extension setup
CREATE EXTENSION pg_graphql;
```

<!-- GUIDELINE_END -->

## Performance Optimization <!--performance-optimization-->

*Strategies for achieving optimal Core Web Vitals and user experience.*

### Core Web Vitals Targets (2025)

| Metric | Target | Tips |
|--------|--------|------|
| INP (replaced FID in Mar 2024) | < 200 ms | Avoid long JS tasks; split Client bundles; use React Compiler |
| LCP | < 2.5 s | Optimize hero images via next/image w/ priority |
| CLS | < 0.1 | Reserve space; use size="*" |

**Key Techniques:**

- Enable React Compiler (opt-in via Babel plugin; avoids manual memo)
- Use `<script async="true">` streaming helpers for faster edge-render
- Implement image optimization with next/image
- Use route-based code splitting
- Leverage React.memo and useMemo/useCallback judiciously
- Implement proper loading patterns with Suspense
- Enable Incremental Partial Prerendering (IPPR) using generateStaticParams for dynamic pages with stable segments
- Optimize for server-side rendering
- Implement proper HTTP caching
- Set explicit cache settings for all fetch calls

```typescript
// Optimized image example
import Image from 'next/image';

export function HeroSection() {
  return (
    <div className="relative h-96 w-full">
      <Image
        src="/hero.jpg"
        alt="Hero image"
        fill
        sizes="100vw"
        priority={true} // LCP optimization
        className="object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Welcome</h1>
      </div>
    </div>
  );
}
```

<!-- 🤖prompt: "Optimize Core Web Vitals: optimize LCP by using next/image with priority, minimize INP by using React Compiler, prevent CLS by reserving space" -->

<!-- GUIDELINE_END -->

## Testing & CI/CD <!--testing--cicd-->

*Comprehensive testing strategies for reliable applications.*

- Jest 32 now runs ESM natively
- Use "jest-environment-edge" when testing middleware
- Playwright 2.8 ships RSC helpers for testing streaming UIs without waitForTimeout
- Maintain an Edge-runtime test suite for route handlers with mocked Request
- **Vitest 2.x**: Use with JSDOM-edge for fast, ESM-native feedback during development

```typescript
// Example Vitest test - vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom-edge',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
});

// Component test example
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from './button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });
});
```

<!-- GUIDELINE_END -->

### Automated E2E Testing <!--automated-e2e-testing-->

*End-to-end testing for critical user flows.*

```typescript
// example Playwright test (tests/login.spec.ts)
import { test, expect } from '@playwright/test';

test('login flow works', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name=email]', 'alice@example.com');
  await page.fill('input[name=password]', 'hunter2');
  await page.click('button[type=submit]');
  await expect(page).toHaveURL('/dashboard');
});
```

**Benefits:**

- Catch regressions in complex flows (forms, auth, multi-step wizards)
- Playwright's cross-browser coverage includes Chrome, Safari, and Firefox
- Built-in CI integrations (Vercel, GitHub Actions) make it easy to run on every PR

**Note:** Puppeteer remains available as a legacy alternative for Chrome-only testing, but Playwright is recommended for modern projects due to its cross-browser support.

<!-- GUIDELINE_END -->

### Lighthouse CI for Performance Budgets <!--lighthouse-ci-for-performance-budgets-->

*Automated performance monitoring in CI/CD pipelines.*

```yaml
# .github/workflows/lhci.yml
name: Lighthouse CI
on: [push]
jobs:
  lhci:
    name: Lighthouse
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install dependencies
        run: npm ci
      - name: Build project
        run: npm run build
      - name: Lighthouse CI
        run: npx lhci autorun
```

**Key Benefits:**

- Automatically enforce performance budgets in pull requests
- Catch Core Web Vitals regressions before they reach production
- Set specific budgets for LCP, CLS, and INP

<!-- GUIDELINE_END -->

### Documentation & Standards <!--documentation--standards-->

*Guidelines for consistent, high-quality code documentation.*

- Write unit tests with Jest and React Testing Library
- Implement E2E tests for critical user flows
- Use JSDoc for functions and components
- Ensure proper type documentation
- Test for accessibility issues (WCAG AA compliance)
- Implement visual regression testing when needed

```typescript
/**
 * Button component for user interaction
 *
 * @param {object} props - Component props
 * @param {ReactNode} props.children - Button content
 * @param {ButtonVariant} [props.variant='primary'] - Visual style variant
 * @param {ButtonSize} [props.size='md'] - Size variant
 * @param {boolean} [props.isLoading=false] - Loading state
 * @param {() => void} [props.onClick] - Click handler
 *
 * @example
 * <Button variant="primary" size="md" onClick={() => console.log('clicked')}>
 *   Save
 * </Button>
 */
```

<!-- GUIDELINE_END -->

## Advanced Project Setup & Scaling <!--advanced-project-setup--scaling-->

*Scalable project architecture for large applications and teams.*

### pnpm Workspaces <!--pnpm-workspaces-->

*Efficient package management for monorepos.*

```json
// package.json
{
  "private": true,
  "workspaces": ["apps/*", "packages/*"]
}
```

**Benefits:**

- **Fast installs** via global content-addressable store
- **Strict versioning** and easy cross-package linking
- Shared `node_modules` in root for deduplication
- Simple setup: `pnpm install` in repo root
- Reference sibling packages by name in imports without extra configuration

<!-- GUIDELINE_END -->

### Turborepo or Nx for Monorepos <!--turborepo-or-nx-for-monorepos-->

*High-performance build system for monorepos.*

```json
// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "lint": {
      "outputs": []
    },
    "test": {
      "outputs": []
    }
  }
}
```

**Key Features:**

- Cache and parallelize builds, tests, linting across packages
- Unified workflow for front-end, API routes, shared components
- Task pipelining to rebuild only what changed
- Run with: `pnpm turbo run build --filter=apps/web...`
- 🚀 Enable remote caching (Turborepo Remote or Nx Cloud) to persist artifacts between CI runs and slash build times by 50-80%

<!-- GUIDELINE_END -->

### ESLint & TypeScript Checks in CI <!--eslint--typescript-checks-in-ci-->

*Automated code quality checks in CI/CD pipelines.*

```yaml
# .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  build-and-lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - run: pnpm install
      - run: pnpm tsc --noEmit
      - run: pnpm eslint . --max-warnings=0
      - run: pnpm turbo run test
```

**Benefits:**

- Prevent accidental type errors or lint failures
- Enforce zero-warning policy
- Run tests automatically on pushes and pull requests

<!-- GUIDELINE_END -->

### Production Observability <!--production-observability-->

*Monitoring and error tracking for production applications.*

#### Sentry for Error Tracking

```javascript
// sentry.client.config.js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

- Setup: `pnpm add @sentry/nextjs && npx @sentry/wizard -i nextjs`
- Exception tracking, release tagging, source-map upload
- Automatic error boundary integration

#### LogRocket for Session Replays

```typescript
// app/layout.tsx (client component)
'use client';

import LogRocket from 'logrocket';

if (typeof window !== 'undefined') {
  LogRocket.init('your-app/your-project');
}
```

- Setup: `pnpm add logrocket`
- Session replays and network/log playback
- Understand user interactions that led to errors

<!-- GUIDELINE_END -->

### PWA Features <!--pwa-features-->

*Progressive Web App capabilities for enhanced user experience.*

#### Service Workers & Offline Support

```javascript
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
  /* your existing config */
});
```

- Setup: `pnpm add next-pwa workbox-window`
- Offline support and asset caching
- Better resilience and "app-like" feel

#### Web App Manifest for Install

```json
// public/manifest.json
{
  "name": "My Next.js App",
  "short_name": "MyApp",
  "start_url": "/?source=pwa",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#1a202c",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

- Add to home screen on mobile/desktop
- Control splash screen, icons, display mode
- Link in layout:

```tsx
<link rel="manifest" href="/manifest.json" />
<meta name="theme-color" content="#1a202c" />
```

<!-- GUIDELINE_END -->

## Security Best Practices <!--security-best-practices-->

*Essential security measures for Next.js applications.*

- ⚠️ Patch to Next.js 15.2.3+ for CVE-2025-29927 middleware bypass vulnerability
- Enforce Supabase RLS; never expose service_role key to browser
- Sanitize Markdown/HTML output
- Implement Content Security Policy with default-src 'self'
- Rate-limit route handlers with standard-headers-rate-limit middleware
- Implement proper authentication and authorization
- Protect against common vulnerabilities (XSS, CSRF)
- Use environment variables for sensitive information
- Use proper CORS settings
- Validate data on both client and server
- Keep dependencies updated

```javascript
// next.config.js - Security headers with CSP nonce
// Generate a unique nonce for each request
const generateNonce = () => {
  return crypto.randomUUID().replace(/-/g,'');
};

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ({ nonce = generateNonce() }) => `
      default-src 'self';
      script-src 'self' 'nonce-${nonce}' https://cdn.jsdelivr.net;
      style-src 'self' 'nonce-${nonce}';
      img-src 'self' data: https://res.cloudinary.com;
      connect-src 'self' https://api.your-domain.com;
      font-src 'self';
      object-src 'none';
      frame-ancestors 'none';
    `.replace(/\s{2,}/g, ' ').trim()
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  // Additional headers...
];

// middleware.ts - Validate subrequest header
export function middleware(req: NextRequest) {
  // Critical security check for CVE-2025-29927
  const isSubrequest = req.headers.get('x-middleware-subrequest');
  if (isSubrequest && !isValidSubrequest(isSubrequest)) {
    return new NextResponse(null, { status: 403 });
  }

  // Your middleware logic...
}

function isValidSubrequest(value: string): boolean {
  // Validate the header value is from an authorized source
  return ['next-route', 'next-api'].includes(value);
}
```

<!-- 🤖prompt: "Always validate middleware subrequest headers, implement proper Content Security Policy, and never expose service_role keys" -->

<!-- GUIDELINE_END -->

## Common anti-patterns to avoid (2025) <!--common-anti-patterns-to-avoid-2025-->

*Practices to avoid for better performance, security, and maintainability.*

### Performance anti-patterns

- 🐢 Fetching data in a Client Component when you can lift it to the server
<!-- triple: (avoid, fetch_in_client, performance) -->
- 🐢 Using useEffect for read-only URL params - use Server searchParams instead
<!-- triple: (avoid, useeffect_for_url_params, performance) -->
- 🐢 Leaving cache unspecified (now defaults to force-cache)
<!-- triple: (avoid, unspecified_cache, performance) -->
- 🐢 Using FID instead of INP for performance monitoring
<!-- triple: (avoid, deprecated_metrics, performance) -->

### Architecture anti-patterns

- 🏗️ Creating Client Components larger than 500 LOC
<!-- triple: (avoid, large_client_components, architecture) -->
- 🏗️ Using legacy React APIs (contextTypes, string refs, findDOMNode)
<!-- triple: (avoid, legacy_react_apis, architecture) -->
- 🏗️ Prop drilling across many component layers
<!-- triple: (avoid, prop_drilling, architecture) -->
- 🏗️ Using context for theme toggles - prefer Zustand persistent store
<!-- triple: (avoid, context_for_preferences, architecture) -->
- 🏗️ Writing overly complex components (split into smaller pieces)
<!-- triple: (avoid, complex_components, architecture) -->

### Security anti-patterns

- 🔒 Implementing auth middleware without validating x-middleware-subrequest header
<!-- triple: (avoid, missing_middleware_validation, security) -->
- 🔒 Using UI clicks instead of SQL for database migrations
<!-- triple: (avoid, ui_based_migrations, security) -->
- 🔒 Exposing service_role keys to the browser
<!-- triple: (avoid, exposing_service_keys, security) -->

### Development anti-patterns

- 🧰 Neglecting error handling and validation
<!-- triple: (avoid, missing_error_handling, reliability) -->
- 🧰 Ignoring accessibility requirements
<!-- triple: (avoid, ignoring_accessibility, user_experience) -->

<!-- 🤖prompt: "Always lift data fetching to Server Components; never fetch in Client Components unless the data is user-specific" -->

<!-- GUIDELINE_END -->

## Code Examples <!--code-examples-->

*Complete component examples demonstrating best practices.*

### Server Component with Data Fetching <!--server-component-with-data-fetching-->

```typescript
// app/users/page.tsx
import { Suspense } from 'react';
import { UserList } from '@/components/user-list';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import { fetchUsers } from '@/lib/data';

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
  const users = await fetchUsers();
  return <UserList users={users} />;
}
```

### Server Action with Validation <!--server-action-with-validation-->

```typescript
// app/actions/create-user.ts
'use server';

import { z } from 'zod';
import { createSafeAction } from 'next-safe-action';
import { db } from '@/lib/db';

const userSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  role: z.enum(['admin', 'user']),
});

export const createUser = createSafeAction(userSchema, async (data) => {
  try {
    const user = await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        role: data.role,
      },
    });

    return { success: true, data: user };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to create user. Please try again.'
    };
  }
});
```

### Client Component with Form <!--client-component-with-form-->

```typescript
// components/user-form.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAction } from 'next-safe-action/hooks';
import { createUser } from '@/app/actions/create-user';

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  role: z.enum(['admin', 'user']),
});

type FormValues = z.infer<typeof formSchema>;

export function UserForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'user',
    },
  });

  const { execute, status, error } = useAction(createUser);

  const onSubmit = (data: FormValues) => {
    execute(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          {...register('name')}
          placeholder="Name"
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Additional form fields */}

      <Button
        type="submit"
        disabled={status === 'executing'}
      >
        {status === 'executing' ? 'Creating...' : 'Create User'}
      </Button>

      {error && (
        <p className="text-sm text-red-500 mt-2">{error}</p>
      )}
    </form>
  );
}
```

<!-- GUIDELINE_END -->

## Deployment & CI/CD best practices <!--deployment-cicd-best-practices-->

*Optimal deployment strategies for Next.js applications.*

- Use Vercel for deployment
- Implement proper environment variables management:
  - Use environment variables securely with Vercel's built-in secrets management
  - Always prefix client-side variables with `NEXT_PUBLIC_`
  - Never expose sensitive variables (`SUPABASE_SERVICE_KEY`, etc.) to the client
- Set up CI/CD pipelines for automated testing
- Use the latest Node.js LTS version
- Leverage Vercel Edge Functions for global performance
- Implement proper logging and monitoring
- Use feature branches and pull requests
- Leverage preview deployments for testing

**Documentation:**

- [Next.js Official Docs](https://nextjs.org/docs)
- [React Official Docs](https://react.dev)
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm test
      - name: Deploy to Vercel
        if: github.ref == 'refs/heads/main'
        uses: vercel/vercel-action@v3
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

<!-- GUIDELINE_END -->

## Quick Migration Checklist for Next.js 15.3.1 <!--quick-migration-checklist-for-nextjs-1531-->

*Comprehensive checklist for upgrading to Next.js 15.3.1.*

1. **Update dependencies**
   - Next.js → 15.3.1
   - React → 19.1.0
   - TypeScript → 5.8.3
   - Tailwind CSS → 4.1.4
   - Supabase client → @supabase/supabase-js@^3.43.0
   - Auth helpers → @supabase/ssr
   - UI components → @supabase/ui@^0.52.0
   - Zustand → 5.0.4
   - TanStack Query → 5.74.6

2. **Fix breaking changes**
   - ⚠️ Convert route.ts to GET.ts/POST.ts using codemod:

     ```bash
     npx @next/codemod@canary next-async-request-api .
     ```

   - ⚠️ Update `cookies()`, `headers()`, and `draftMode()` calls to be async:

     ```typescript
     const cookieStore = await cookies();
     ```

   - ⚠️ Audit fetch() calls - add `cache: 'no-store'` explicitly where needed
   - ⚠️ Remove old React APIs (contextTypes, string refs)
   - ⚠️ Swap FID monitoring for INP

3. **Security updates**
   - ⚠️ Patch for CVE-2025-29927 (update to 15.2.3+)
   - ⚠️ Validate x-middleware-subrequest header in custom middleware

4. **Tailwind migration**
   - Run the official migration tool:

     ```bash
     npx @tailwindcss/migrate
     ```

   - Adopt Tailwind 4.1 utilities like text-shadow-*, mask-*, wrap-*

5. **Optimize performance**
   - Enable React Compiler (opt-in)
   - Add built-in Analytics:

     ```typescript
     import { Analytics } from 'next/analytics'
     ```

   - Self-host fonts with next/font:

     ```typescript
     import { Inter } from 'next/font/google'
     ```

   - Run bundle analysis with @next/bundle-analyzer
   - Set up Lighthouse CI for performance budget enforcement

6. **Add new Supabase features**
   - Deploy Edge Functions from dashboard
   - Set up Declarative Schemas
   - Configure Realtime broadcasts from database triggers

<!-- GUIDELINE_END -->

## AI agent integration guide <!--ai-agent-integration-guide-->

*Best practices for integrating AI code assistants with Next.js projects.*

### Structured Project Data for AI

Below is a structured representation of project guidelines for AI assistants:

```json
{
  "next_version": "15.3.1",
  "react_version": "19.1.0",
  "typescript_version": "5.8.3",
  "tailwind_version": "4.1.4",
  "key_principles": {
    "server_components_first": true,
    "functional_programming": true,
    "accessibility_compliance": "WCAG AA",
    "performance_targets": {
      "INP": "<200ms",
      "LCP": "<2.5s",
      "CLS": "<0.1"
    }
  },
  "style_guidelines": {
    "file_naming": "kebab-case",
    "component_naming": "PascalCase",
    "variable_prefixes": {
      "boolean": ["is", "has", "can", "should"],
      "events": "handle"
    },
    "component_boundaries": {
      "server": ".server.tsx",
      "client": ".client.tsx"
    }
  },
  "anti_patterns": {
    "performance": [
      "Fetching data in Client Components",
      "Using useEffect for URL params",
      "Unspecified fetch cache"
    ],
    "architecture": [
      "Large Client Components (>500 LOC)",
      "Legacy React APIs",
      "Excessive prop drilling"
    ],
    "security": [
      "Missing x-middleware-subrequest validation",
      "Exposing service_role keys"
    ]
  }
}
```

### AI-Specific Commenting Guidelines

When writing code for AI tools like Cursor, Cline, or Copilot Chat, include explicit boundary markers and intent comments:

```typescript
// AI-GUIDE: Server Component - Add data fetching here
// DEV INTENT: Component for displaying paginated user list with filtering

import { Suspense } from 'react';
import { UserList } from '@/components/user-list';
import { fetchUsers } from '@/lib/data';

// AI-BOUNDARY-START: Server logic
async function UsersContainer({ page, filter }) {
  // Logic for fetching users with pagination and filtering
  const users = await fetchUsers({ page, filter });
  return <UserList users={users} />;
}
// AI-BOUNDARY-END

export default function UsersPage({ searchParams }) {
  const page = parseInt(searchParams.page || '1');
  const filter = searchParams.filter || '';

  return (
    <main>
      <h1>Users</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <UsersContainer page={page} filter={filter} />
      </Suspense>
    </main>
  );
}
```

### Memory Optimization for AI Tools

To help AI assistants maintain context and provide better suggestions:

1. **Keep folder nesting ≤ 4 levels deep** to simplify navigation
2. **Use consistent jargon** across the codebase (e.g., always "Incremental Partial Prerendering (IPPR)", never "partial ISR")
3. **Provide short, explicit examples** (≤ 15 lines) for common patterns
4. **Use barrel files (index.ts)** for clear module exports
5. **Maintain a reference/ directory** with constants, type definitions, and key configuration

```
├── reference/
│   ├── env.ts          # Environment variables documentation
│   ├── api-routes.ts   # API endpoint constants
│   ├── colors.ts       # Design system colors
│   └── breakpoints.ts  # Responsive breakpoints
```

### AI Cheat Sheet for Components

Create a `.ai-helpers` directory with simplified guidance for AI assistants:

```
├── .ai-helpers/
│   ├── component-templates/  # Copy-paste examples for common patterns
│   ├── server-api.md         # Simplified API documentation
│   ├── style-guide.json      # Machine-readable style rules
│   └── ai-cheatsheet.md      # Quick commands and patterns
```

<!-- 🤖prompt: "When suggesting code for Next.js 15.x, use .server.tsx suffixes for Server Components and .client.tsx for Client Components" -->

<!-- GUIDELINE_END -->
