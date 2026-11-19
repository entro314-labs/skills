# Next.js 15.x Development Guidelines

*Last updated: April 23, 2025*

## Technology Stack

- Next.js 15.3.1 (App Router with stable Turbopack dev mode)
- React 19.1.0 (Server Components, React Compiler)
- TypeScript 5.8.3 (6.0 on roadmap)
- Tailwind CSS 4.1.4
- Shadcn UI 2.4.1 / Radix UI 1.1.6
- Supabase:
  - @supabase/supabase-js@^3.43.0 (Edge-runtime support + streaming)
  - @supabase/auth-helpers-nextjs@^0.16.0
  - @supabase/ui@^0.52.0 (official UI components)
- State management:
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

- Self-hosts font files (no third-party CDN requests)
- Auto-subsets only the glyphs actually used
- Preloads key fonts to improve LCP
- Typically reduces first-paint times by hundreds of milliseconds

### Next.js Analytics & Telemetry

- `next/analytics` for measuring Core Web Vitals in production
- Server-side instrumentation points for App Router and Middleware
- Automatic tracking of bundle size, INP, CLS, and other metrics
- Integrates with Vercel Analytics SDK

### Vercel Edge Config / KV

- Per-request feature flags or A/B parameters
- Global configuration without redeploys
- Sub-1ms reads from any region
- Ideal for dark launches, canary rollouts, and fast rollbacks

### Bundle Analysis

- Visualize client and server bundle sizes
- Identify tree-shaking issues and oversized dependencies
- Run with `ANALYZE=true next build`

### Internationalization (i18n)

- Automatic locale detection and redirection
- Per-locale static props/pages with `generateStaticParams`
- Lightweight runtime polyfills for unsupported browsers
- Pairs well with libraries like `next-intl` for richer formatting

## Code Style & Conventions

### Naming Conventions

- **Files**: Use kebab-case (`user-profile.tsx`, `auth-form.tsx`)
- **Components**: Use PascalCase (`UserProfile`, `AuthForm`)
- **Variables**: Use descriptive names with auxiliary verbs:
  - Booleans: Use prefixes `is`, `has`, `can`, `should` (`isLoading`, `hasError`)
  - Event handlers: Use `handle` prefix (`handleSubmit`, `handleClick`)
- **Directories**: Use lowercase with dashes (`components/auth-wizard`, `lib/api-utils`)

### File & Component Structure

- Use `.client.tsx` and `.server.ts` suffixes to surface RSC boundaries
- Use barrel exports (index.ts) per folder and collocate tests (*.test.tsx)
- Place types/interfaces at the end of files
- Keep main component export at the top
- Component-specific helper functions should be in the same file

## Next.js 15.3.1 & React 19.1 Best Practices

### Breaking Changes & Migration

- **Cache defaults**: Now `force-cache` instead of `no-store`
  - Explicitly add `cache: 'no-store'` when needed
- **Async Request API**: Use GET.ts, POST.ts instead of route.ts
- **Next.js Form**: Use `<Form action={createUser}>...</Form>` for progressive enhancement
- **Turbopack**: Now default for dev mode
- **Security**: Patch to 15.2.3+ for CVE-2025-29927
  - Validate x-middleware-subrequest header in custom middleware

### Async APIs & Cookie Handling

- `cookies()`, `headers()`, and `draftMode()` are now **async** functions
- Route handlers can be sync or async
- Migration codemod available: `npx @next/codemod@canary next-async-request-api .`

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

- Kick off fetch early using `cache()` or React 19 `preload()` to avoid waterfalls
- On client, use TanStack Query 5.74.6 with `suspense: true` for mutations
- Implement proper Suspense boundaries with fallbacks
- Use explicit cache settings with all fetch calls (avoid default force-cache)
- Consider Incremental Partial Prerendering (IPPR) for dynamic pages

### Routing & Navigation

- Use App Router folder structure for routes
- Implement nested layouts for code reuse
- Use route groups for logical organization
- Add `dynamic` export to set caching behavior
- Implement proper loading.tsx, error.tsx, and not-found.tsx pages
- Use metadata API for SEO optimization
- Use generateStaticParams for IPPR (static rendering with dynamic paths)

### Error Handling

- Implement error boundaries with error.tsx files
- Use next-safe-action 5.x with structured returns
- Log critical errors server-side via next/telemetry or Supabase Edge Function
- Provide user-friendly error messages
- Use early returns and guard clauses to handle edge cases

## TypeScript Implementation

- Use TypeScript for all code
- Keep "target": "es2022" in tsconfig.json
- Use decorators with `--experimentalDecorators` flag (still needed)
- Use interfaces for public APIs and types for unions/complex types
- Implement Zod for runtime type validation and parsing
- Define proper type definitions for all components and functions
- Use strict TypeScript configuration
- Leverage type inference where possible to reduce boilerplate

## Tailwind CSS Implementation

- Use utility-first approach
- Implement mobile-first responsive design
- Use JIT mode effectively for custom values
- Leverage Tailwind 4.1 new utilities:
  - text-shadow-* for text shadow effects
  - mask-* for advanced masking
  - wrap-* for text wrapping control
- Be aware of renamed bare shadow, radius, and blur scales from v4
- Container query support is now GA (stable) for component-based responsiveness
- Implement `class-variance-authority` for component variants
- Avoid excessive classname complexity; extract to components when needed

## UI Components & Accessibility

- Use Shadcn UI and Radix UI for accessible component primitives
- Ensure proper keyboard navigation
- Implement correct ARIA attributes
- Provide proper focus management
- Use semantic HTML elements
- Ensure proper color contrast (WCAG AA compliance minimum)
- Test with screen readers
- Implement proper form labels and error messages

## State Management

- Use Server Components to minimize client-side state
- For client-side state:
  - Use Zustand for global state management
  - Use TanStack Query for server state
  - Use React's built-in hooks for component-level state
- Implement proper loading, error, and empty states
- Use React Context sparingly and for truly global concerns

## Supabase Integration

### Package Versions & Setup

- Use `@supabase/supabase-js@^3.43.0` for full Edge-runtime support
- Upgrade to `@supabase/auth-helpers-nextjs@^0.16.0` for compatibility
- Implement Row Level Security (RLS) for all tables
- Use Supabase Auth for authentication
- Leverage type-safe queries with generated types

### Supabase UI Library

- Import from `@supabase/ui` for auth widgets, dropzones, realtime chat, cursors
- Replaces custom implementations of standard patterns

### Edge Functions

- Deploy Deno 2.1-based Edge Functions directly from the Supabase Dashboard
- Set environment variables in the UI
- Simplifies serverless deployment workflow

### Realtime Broadcast

- Replace client-side `.channel()` loops with database-triggered broadcasts
- Triggers fire securely from Postgres whenever you `INSERT` or `UPDATE`

### Declarative Schemas & Migrations

- Write migrations in SQL (not UI clicks) for source-control parity
- Use `supabase migration new` plus `.sql` files in Git
- Hook them into CI/CD for consistent RLS policies

### Advanced Features

- **Automatic Embeddings**: Use `vector_generate_embedding()` for `VECTOR` columns
- **Route API → Nearest Replica**: Enable geo-routing for sub-50ms reads
- **Dedicated Poolers**: Opt into co-located pgBouncer per project
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
- Enable Incremental Partial Prerendering (IPPR) for dynamic pages
- Optimize for server-side rendering
- Implement proper HTTP caching
- Set explicit cache settings for all fetch calls

## Testing & CI/CD

- Jest 32 now runs ESM natively
- Use "jest-environment-edge" when testing middleware
- Playwright 2.8 ships RSC helpers for testing streaming UIs
- Maintain an Edge-runtime test suite for route handlers
- Implement Lighthouse CI for performance budgets
- Write unit tests with Jest and React Testing Library
- Implement E2E tests for critical user flows
- Test for accessibility issues (WCAG AA compliance)

## Advanced Project Setup & Scaling

### pnpm Workspaces

- **Fast installs** via global content-addressable store
- **Strict versioning** and easy cross-package linking
- Shared `node_modules` in root for deduplication
- Simple setup: `pnpm install` in repo root

### Turborepo or Nx for Monorepos

- Cache and parallelize builds, tests, linting across packages
- Unified workflow for front-end, API routes, shared components
- Task pipelining to rebuild only what changed

### Production Observability

- Sentry for error tracking and source-map upload
- LogRocket for session replays and network/log playback
- Implement custom telemetry for business metrics

### PWA Features

- Service Workers & Offline Support via next-pwa
- Add Web App Manifest for install on mobile/desktop
- Control splash screen, icons, display mode

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

## Common Anti-Patterns to Avoid (2025)

- Fetching data in a Client Component when you can lift it to the server
- Relying on useEffect for read-only URL params - use Server searchParams instead
- Leaving cache unspecified (now defaults to force-cache)
- Using context for theme toggles - prefer Zustand persistent store
- Creating Client Components larger than 500 LOC
- Using legacy React APIs (contextTypes, string refs, findDOMNode)
- Prop drilling across many component layers
- Implementing auth middleware without validating x-middleware-subrequest header
- Using UI clicks instead of SQL for database migrations
- Using FID instead of INP for performance monitoring
- Neglecting error handling and validation
- Writing overly complex components (split into smaller pieces)

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
   - Convert route.ts to GET.ts/POST.ts using codemod
   - Update `cookies()`, `headers()`, and `draftMode()` calls to be async
   - Audit fetch() calls - add `cache: 'no-store'` explicitly where needed
   - Remove old React APIs (contextTypes, string refs)
   - Swap FID monitoring for INP

3. **Security updates**
   - Patch for CVE-2025-29927 (update to 15.2.3+)
   - Validate x-middleware-subrequest header in custom middleware

4. **Tailwind migration**
   - Run the official migration tool: `npx @tailwindcss/migrate`
   - Adopt Tailwind 4.1 utilities like text-shadow-*, mask-*, wrap-*

5. **Optimize performance**
   - Enable React Compiler (opt-in)
   - Add built-in Analytics with next/analytics
   - Self-host fonts with next/font
   - Run bundle analysis with @next/bundle-analyzer
   - Set up Lighthouse CI for performance budget enforcement

6. **Add new Supabase features**
   - Import UI components from @supabase/ui
   - Deploy Edge Functions from dashboard
   - Set up Declarative Schemas
   - Configure Realtime broadcasts from database triggers
