# Next.js 15.x Development Guidelines for AI Assistants

Last updated: April 23, 2025

## Technology Stack

- Next.js 15.3.1 (App Router with stable Turbopack dev mode)
- React 19.1.0 (Server Components, React Compiler)
- TypeScript 5.8.3 (6.0 on roadmap)
- Tailwind CSS 4.1.4
- Shadcn UI 2.4.1 / Radix UI 1.1.6
- Supabase
  - @supabase/supabase-js@^3.43.0 (full Edge-runtime support + streaming)
  - @supabase/auth-helpers-nextjs@^0.16.0
  - @supabase/ui@^0.52.0 (official UI components)
- Modern state management
  - Zustand 5.0.4
  - TanStack Query 5.74.6

## Key Principles

- Write concise, technically accurate TypeScript code
- Use functional, declarative programming (avoid classes)
- Prioritize React Server Components; keep Client Components tiny
- Implement proper error handling and validation
- Ship accessible, mobile-first UIs (WCAG AA compliance)
- Optimize Core Web Vitals: INP (<200ms), LCP (<2.5s), CLS (<0.1)
  - Note: INP (Interaction to Next Paint) replaced FID in March 2024

## Key Next.js 15.x Features

### Built-in Font Optimization

```typescript
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], weight: ['400','700'] })

export default function Page() {
  return <main className={inter.className}>...</main>
}
```

- Self-hosts font files (no third-party CDN requests)
- Auto-subsets only the glyphs actually used
- Preloads key fonts to improve LCP
- Typically reduces first-paint times by hundreds of milliseconds

### Next.js Analytics & Telemetry

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

- `next/analytics` for measuring Core Web Vitals in production
- Server-side instrumentation points for App Router and Middleware
- Automatic tracking of bundle size, INP, CLS, and other metrics
- Integrates with Vercel Analytics SDK

### Vercel Edge Config / KV

```typescript
import { edgeConfig } from '@vercel/edge-config'

export async function middleware(req) {
  const flag = await edgeConfig.get('new-navbar-enabled')
  if (flag) { /* ... */ }
  return NextResponse.next()
}
```

- Per-request feature flags or A/B parameters
- Global configuration without redeploys
- Sub-1ms reads from any region
- Ideal for dark launches, canary rollouts, and fast rollbacks

### Bundle Analysis

```javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({ /* your config */ })
```

- Install and wrap your `next.config.js`
- Run `ANALYZE=true next build`
- Visualize client and server bundle sizes
- Identify tree-shaking issues and oversized dependencies

### Internationalization (i18n)

```javascript
// next.config.js
module.exports = {
  i18n: {
    locales: ['en', 'fr', 'de'],
    defaultLocale: 'en',
  },
}
```

- Automatic locale detection and redirection
- Per-locale static props/pages with `generateStaticParams`
- Lightweight runtime polyfills for unsupported browsers
- Pairs well with libraries like `next-intl` for richer formatting

## Code Style & Conventions

### Naming Conventions

- **Files**: Use kebab-case for all filenames (`user-profile.tsx`, `auth-form.tsx`)
- **Components**: Use PascalCase for component names (`UserProfile`, `AuthForm`)
- **Variables**: Use descriptive names with auxiliary verbs:
  - Booleans: Use prefixes like `is`, `has`, `can`, `should` (`isLoading`, `hasError`, `canSubmit`)
  - Event handlers: Use `handle` prefix (`handleSubmit`, `handleClick`)
- **Directories**: Use lowercase with dashes (`components/auth-wizard`, `lib/api-utils`)

### File & Component Structure

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

**Note**: Use `.client.tsx` and `.server.ts` suffixes to surface RSC boundaries. Use barrel exports (index.ts) per folder and collocate tests (*.test.tsx).

## Next.js 15.3.1 & React 19.1 Best Practices

### Breaking Changes & Migration

- **Cache defaults**: Now `force-cache` instead of `no-store`
  - Explicitly add `cache: 'no-store'` when needed
  - Add 'no-store' segment config where appropriate
- **Async Request API**: Use GET.ts, POST.ts instead of route.ts
  - Export a handler function returning Response
- **Next.js Form**: Use `<Form action={createUser}>...</Form>` for progressive enhancement
- **Turbopack**: Now default for dev mode
  - Keep custom webpack loaders for build only or migrate to Turbopack plugins
- **Security**: Patch to 15.2.3+ for CVE-2025-29927
  - Validate x-middleware-subrequest header in custom middleware

### Async APIs & Cookie Handling

- `cookies()`, `headers()`, and `draftMode()` are now **async** functions:

```typescript
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
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

### React 19 Removed APIs

- contextTypes / getChildContext → Use new Context API
- string refs → Use callback refs or useRef
- ReactDOM.findDOMNode → Use ref + ref.current
- ReactDOM.render/hydrate → Use createRoot / hydrateRoot
- function-component defaultProps → Use ES default parameters

### Server vs Client Components

- Default to Server Components for all components
- Only use Client Components (`'use client'`) when necessary for:
  - Interactivity and event listeners
  - Using hooks (`useState`, `useEffect`, etc.)
  - Browser-only APIs
  - Component lifecycle events
- Keep Client Components small (< 500 LOC)
- Push data fetching up to Server Components whenever possible

### Data Fetching

```typescript
// lib/preload-users.server.ts
import 'server-only';
import { cache } from 'react';

export const preloadUsers = cache(async () => {
  const res = await fetch(`${API}/users`, { cache: 'no-store' }); // Explicit cache setting
  return res.json() as Promise<User[]>;
});

// Usage in Server Component
import { preloadUsers } from '@/lib/preload-users.server';

export default async function UsersPage() {
  const users = await preloadUsers();
  return <UserList users={users} />;
}
```

- Kick off fetch early using `cache()` or React 19 `preload()` to avoid waterfalls
- On client, use TanStack Query 5.74.6 with `suspense: true` for mutations
- Implement proper Suspense boundaries with fallbacks
- Use explicit cache settings with all fetch calls (avoid default force-cache)
- Consider Incremental Partial Prerendering (IPPR) for dynamic pages

### Routing & Navigation

- Use App Router folder structure for routes
- Implement nested layouts for code reuse
- Use route groups for logical organization
- Add `dynamic` export to set caching behavior: `export const dynamic = 'force-static';`
- Implement proper loading.tsx, error.tsx, and not-found.tsx pages
- Use metadata API for SEO optimization
- Use generateStaticParams for IPPR (static rendering with dynamic paths)

### Error Handling

- Implement error boundaries with error.tsx files (Next.js 15.x auto-captures RSC errors)
- Use next-safe-action 5.x with structured returns: `{ok, data}|{error}`
- Log critical errors server-side via next/telemetry or Supabase Edge Function
- Provide user-friendly error messages
- Use early returns and guard clauses to handle edge cases

## TypeScript 5.8 Implementation (6.0 on roadmap)

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

## Tailwind CSS 4.1 Implementation

- Use utility-first approach
- Implement mobile-first responsive design
- Use JIT mode effectively for custom values
- Leverage Tailwind 4.1 new utilities:
  - text-shadow-* for text shadow effects
  - mask-* for advanced masking
  - wrap-* for text wrapping control
- Be aware of renamed bare shadow, radius, and blur scales from v4
- Container query support is now GA (stable) for component-based responsiveness
- Dark mode default is still class-based, but media approach is deprecated
  - Set once in tailwind.config.ts
- Implement `class-variance-authority` for component variants
- Embrace new utilities for neumorphism and advanced masks
- Avoid excessive classname complexity; extract to components when needed

## Supabase Integration (Launch Week 14 Features)

### Package Versions & Setup

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const createSupabaseClient = () => 
  createClient<Database>(supabaseUrl, supabaseAnonKey);
```

- Use `@supabase/supabase-js@^3.43.0` for full Edge-runtime support and streaming APIs
- Upgrade to `@supabase/auth-helpers-nextjs@^0.16.0` for compatibility with Next.js 15's async `cookies()` API
- Implement Row Level Security (RLS) for all tables
- Use Supabase Auth for authentication
- Leverage type-safe queries with generated types

### Supabase UI Library

```typescript
import { Auth, Card, Avatar } from '@supabase/ui';

export function AuthForm() {
  return (
    <Card>
      <Auth 
        supabaseClient={supabase} 
        appearance={{ theme: 'dark' }}
        providers={['google', 'github']}
      />
    </Card>
  );
}
```

- Import from `@supabase/ui` for auth widgets, dropzones, realtime chat, cursors, and avatar stacks
- Replaces custom implementations of standard patterns

### Edge Functions

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

- Deploy Deno 2.1-based Edge Functions directly from the Supabase Dashboard
- Set environment variables in the UI
- Simplifies serverless deployment workflow

### Realtime Broadcast

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
```

- Replace client-side `.channel()` loops with database-triggered broadcasts
- Triggers fire securely from Postgres whenever you `INSERT` or `UPDATE`

### Declarative Schemas & Migrations

```bash
# Create a new migration
supabase migration new add_profiles_table

# Apply migrations
supabase migration up
```

- Write migrations in SQL (not UI clicks) for source-control parity
- Use `supabase migration new` plus `.sql` files in Git
- Hook them into CI/CD for consistent RLS policies

### Advanced Features

- **Automatic Embeddings**: Use `vector_generate_embedding()` function in a SQL trigger to auto-populate `VECTOR` columns
- **Route API → Nearest Replica**: Enable geo-routing for sub-50ms reads using the closest read replica
- **Dedicated Poolers**: Opt into co-located pgBouncer per project for stable connection pooling under heavy load
- Use optimistic updates for better UX
- Store sensitive data securely
- Never expose service_role key to the browser

## Performance Optimization

### Core Web Vitals Targets (2025)

| Metric | Target | Tips |
|--------|--------|------|
| INP (replaced FID in Mar 2024) | < 200 ms | Avoid long JS tasks; split Client bundles; use React Compiler |
| LCP | < 2.5 s | Optimize hero images via next/image w/ priority |
| CLS | < 0.1 | Reserve space; use size="*" |

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

## Security Best Practices

- Patch to Next.js 15.2.3+ for CVE-2025-29927 middleware bypass vulnerability
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

## Testing & CI/CD

- Jest 32 now runs ESM natively
- Use "jest-environment-edge" when testing middleware
- Playwright 2.8 ships RSC helpers for testing streaming UIs without waitForTimeout
- Maintain an Edge-runtime test suite for route handlers with mocked Request

### Automated E2E Testing

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

### Lighthouse CI for Performance Budgets

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

- Automatically enforce performance budgets in pull requests
- Catch Core Web Vitals regressions before they reach production
- Set specific budgets for LCP, CLS, and INP

### Documentation & Standards

- Write unit tests with Jest and React Testing Library
- Implement E2E tests for critical user flows
- Use JSDoc for functions and components
- Ensure proper type documentation
- Test for accessibility issues (WCAG AA compliance)
- Implement visual regression testing when needed

## Advanced Project Setup & Scaling

### pnpm Workspaces

```json
// package.json
{
  "private": true,
  "workspaces": ["apps/*", "packages/*"]
}
```

- **Fast installs** via global content-addressable store
- **Strict versioning** and easy cross-package linking
- Shared `node_modules` in root for deduplication
- Simple setup: `pnpm install` in repo root
- Reference sibling packages by name in imports without extra configuration

### Turborepo or Nx for Monorepos

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

- Cache and parallelize builds, tests, linting across packages
- Unified workflow for front-end, API routes, shared components
- Task pipelining to rebuild only what changed
- Run with: `pnpm turbo run build --filter=apps/web...`

### ESLint & TypeScript Checks in CI

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

- Prevent accidental type errors or lint failures
- Enforce zero-warning policy
- Run tests automatically on pushes and pull requests

### Production Observability

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

### PWA Features

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

## Deployment & CI/CD Best Practices

- Use Vercel for deployment
- Implement proper environment variables management
- Set up CI/CD pipelines for automated testing
- Use the latest Node.js LTS version
- Leverage Vercel Edge Functions for global performance
- Implement proper logging and monitoring
- Use feature branches and pull requests
- Leverage preview deployments for testing

## Quick Migration Checklist for Next.js 15.3.1

1. **Update dependencies**
   - Next.js → 15.3.1
   - React → 19.1.0
   - TypeScript → 5.8.3
   - Tailwind CSS → 4.1.4
   - Supabase client → @supabase/supabase-js@^3.43.0
   - Auth helpers → @supabase/auth-helpers-nextjs@^0.16.0
   - UI components → @supabase/ui@^0.52.0
   - Zustand → 5.0.4
   - TanStack Query → 5.74.6

2. **Fix breaking changes**
   - Convert route.ts to GET.ts/POST.ts using codemod:

     ```bash
     npx @next/codemod@canary next-async-request-api .
     ```

   - Update `cookies()`, `headers()`, and `draftMode()` calls to be async:

     ```typescript
     const cookieStore = await cookies();
     ```

   - Audit fetch() calls - add `cache: 'no-store'` explicitly where needed
   - Remove old React APIs (contextTypes, string refs)
   - Swap FID monitoring for INP

3. **Security updates**
   - Patch for CVE-2025-29927 (update to 15.2.3+)
   - Validate x-middleware-subrequest header in custom middleware

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
   - Import UI components from @supabase/ui
   - Deploy Edge Functions from dashboard
   - Set up Declarative Schemas
   - Configure Realtime broadcasts from database triggers
