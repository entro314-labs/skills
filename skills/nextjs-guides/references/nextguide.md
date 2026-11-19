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

- Next.js 15.3.2 (App Router with stable Turbopack dev mode)
- React 19.1.0 (Server Components, React Compiler)
- TypeScript 5.8.3
- Tailwind CSS 4.1.6
- Shadcn UI 2.5.0 / Radix UI 1.4.1
- Supabase
  - @supabase/supabase-js 2.49.4
  - @supabase/ssr 0.6.1
  - @supabase/storage-js 2.7.3
- Modern state management
  - Zustand 5.0.4
  - TanStack Query 5.76.1
  - TanStack Table 8.21.3
- UI & Animation
  - Framer Motion 12.11.3
  - Embla Carousel 8.6.0
  - Vaul 1.1.2 (Drawers)
- Forms & Validation
  - React Hook Form 7.56.3
  - Zod 3.24.4
  - Conform.to 1.5.0
- Testing
  - Vitest 3.1.3
  - Playwright 1.52.0
- API & Services
  - Stripe 18.1.0
  - Resend 4.5.1 (Email)
  - Cloudinary 2.6.0
- Data Visualization
  - Recharts 2.15.3
  - D3 7.9.0
- Maps & Geolocation
  - Mapbox GL 3.12.0
  - Leaflet 1.9.4
  - React Leaflet 5.0.0
- Internationalization
  - Next-intl 4.1.0

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

**Benefits:**

- Self-hosts font files (no third-party CDN requests)
- Auto-subsets only the glyphs actually used
- Preloads key fonts to improve LCP
- Typically reduces first-paint times by hundreds of milliseconds

<!-- GUIDELINE_END -->

### Next.js Analytics & Telemetry <!--analytics--telemetry-->

*Built-in performance tracking for Core Web Vitals with zero config.*

**Features:**

- `next/analytics` for measuring Core Web Vitals in production
- Server-side instrumentation points for App Router and Middleware
- Automatic tracking of bundle size, INP, CLS, and other metrics
- Integrates with Vercel Analytics SDK

<!-- GUIDELINE_END -->

**Use Cases:**

- Per-request feature flags or A/B parameters
- Global configuration without redeploys
- Sub-1ms reads from any region
- Ideal for dark launches, canary rollouts, and fast rollbacks

<!-- GUIDELINE_END -->

### Bundle Analysis <!--bundle-analysis-->

*Visualize and optimize your JavaScript bundles for better load times.*

**Usage:**

- Install and wrap your `next.config.js`
- Run `ANALYZE=true next build`
- Visualize client and server bundle sizes
- Identify tree-shaking issues and oversized dependencies

<!-- GUIDELINE_END -->

### Internationalization (i18n) <!--internationalization-i18n-->

*First-class support for multiple languages without additional libraries.*

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

**Best Practices:**

- Use `.client.tsx` and `.server.ts` suffixes to surface RSC boundaries
- Use barrel exports (index.ts) per folder and collocate tests (*.test.tsx)
- Keep folders ≤ 4 levels deep for better AI navigation

<!-- @prompt: "In Next.js 15.x, organize components with clear server/client boundaries using .server.tsx and .client.tsx suffixes" -->

<!-- GUIDELINE_END -->
## Next.js 15.3.2 & React 19.1 Best Practices <!--nextjs-1532--react-191-best-practices-->

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
- ⚠️ **Security**: Patch to 15.3.2+ for CVE-2025-29927
  - Validate x-middleware-subrequest header in custom middleware
- ⚠️ **Server Actions**: Require `'use server'` directive at the top of the file

<!-- GUIDELINE_END -->

### Async APIs & Cookie Handling <!--async-apis--cookie-handling-->

*Request API methods are now async and require proper await handling.*

- **Session Tokens**: Use `const cookies = await cookies()` for async cookie access
- **Headers**: Use `const headers = await headers()` for request headers
- **Redirects**: Use `redirect('/path')` instead of NextResponse.redirect
- **Static Params**: Implement `generateStaticParams()` instead of getStaticPaths
- **Data Loading**: Use `{ cache: 'no-store' }` for dynamic fetches
- **Auth**: Use `await auth()` pattern for authentication checks
- **Route Handlers**: Handle cookies with `cookies().set()` and `cookies().get()`

<!-- GUIDELINE_END -->

### React 19 Removed APIs <!--react-19-removed-apis-->

*Legacy APIs removed in React 19 that must be replaced in your code.*

- ⚠️ contextTypes / getChildContext → Use new Context API
- ⚠️ string refs → Use callback refs or useRef
- ⚠️ ReactDOM.findDOMNode → Use ref + ref.current
- ⚠️ ReactDOM.render/hydrate → Use createRoot / hydrateRoot
- ⚠️ function-component defaultProps → Use ES default parameters
- ⚠️ unstable_act → Use @testing-library/react instead
- ⚠️ component.setState callback → Use useEffect or flushSync

<!-- GUIDELINE_END -->

### New React Hooks & Features <!--new-react-hooks--features-->

*Latest React 19.1 hooks and features for improved performance and DX.*

- **useOptimistic**: Create optimistic UI updates before server response
- **useFormStatus**: Track form submission states natively
- **useFormState**: Manage form state with server actions
- **use**: Unwrap promises in components (replaces await in Server Components)
- **useActionState**: Handle action status, data, and errors elegantly
- **Document Metadata**: Use metadata export API for SEO
- **Asset Loading**: Implement priority loading for critical assets
- **View Transitions**: Use `startViewTransition` API for smooth page changes
- **Server Actions**: Enhanced validation with zod integration

<!-- GUIDELINE_END -->

### Performance Optimizations <!--performance-optimizations-->

*Key techniques to minimize bundle size and improve loading times.*

- **Partial Prerendering**: Use PPR with streaming for hybrid static/dynamic pages
- **Server Components**: Default components to Server Components where possible
- **React Cache**: Use `React.cache()` for memoized data fetching
- **Image Optimization**: Enable AVIF format for 20% smaller images
- **Font Optimization**: Use `next/font` with `subsets` parameter
- **Suspense Boundaries**: Place strategically for component-level streaming
- **Edge Runtime**: Deploy lightweight functions to global edge network
- **Route Groups**: Use (folders) for logical code organization without URL impact
- **Parallel Routes**: Implement @folder patterns for complex layouts

<!-- GUIDELINE_END -->
### Server vs Client Components <!--server-vs-client-components-->

*Guidelines for deciding when to use Server vs Client components.*

**Server Components (Default):**

- Use for data fetching, static content, SEO optimization
- Smaller bundle size, faster initial load
- Prefer `await use(fetch(...))` in RSC when you need streaming
- Access server-only resources directly (databases, file system)
- Secure sensitive data and API keys

**Client Components (Only when needed):**

- Use only for interactivity, events, and browser APIs
- Add `'use client'` directive at top of file
- Keep Client Components small (< 500 LOC)
- Don't wrap compiler-optimized components in `memo` unless you benchmark
- Use React.lazy() for code-splitting client components

<!-- 🤖prompt: "Default to Server Components; only use Client Components for interactivity, state, or browser APIs" -->

<!-- GUIDELINE_END -->

### Data fetching <!--data-fetching-->

*Optimized data fetching patterns to eliminate waterfalls and improve UX.*

**Best Practices:**

- Kick off fetch early using `cache()` or React 19 `preload()` to avoid waterfalls
- Use React 19's `use()` hook for streaming data in RSC
- On client, use TanStack Query 5.76.1 with `suspense: true` for mutations
- Implement proper Suspense boundaries with fallbacks
- Use explicit cache settings with all fetch calls (avoid default force-cache)
- Consider Incremental Partial Prerendering (IPPR) for dynamic pages
- Implement stale-while-revalidate patterns with `revalidatePath()` or `revalidateTag()`

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
- Implement View Transitions API for smooth page navigation
- Use `<Link>` component with prefetch for instant page transitions

<!-- GUIDELINE_END -->

### Error Handling <!--error-handling-->

*Robust error management for better user experience and debugging.*

- Implement error boundaries with error.tsx files (Next.js 15.x auto-captures RSC errors)
- Use next-safe-action 5.x with structured returns: `{ok, data}|{error}`
- Log critical errors server-side via next/telemetry or Supabase Edge Function
- Provide user-friendly error messages
- Use early returns and guard clauses to handle edge cases

<!-- GUIDELINE_END -->
## TypeScript 5.8 Implementation <!--typescript-58-implementation-->

*TypeScript best practices for reliable, maintainable code.*

- Use TypeScript for all code
- Keep "target": "es2022" in tsconfig.json
- Leverage current TypeScript features:
  - Const type parameters
  - Variadic tuple types
  - Type-only imports
  - Template literal types
  - Satisfies operator for precise type checking
  - Decorator metadata for reflection
  - Using statement for resource management
- Use interfaces for public APIs and types for unions/complex types
- Implement Zod for runtime type validation and parsing
- Define proper type definitions for all components and functions
- Use strict TypeScript configuration
- Leverage type inference where possible to reduce boilerplate
- Implement the `noUncheckedIndexedAccess` flag for safer property access
- Use the new `exactOptionalPropertyTypes` option for strict optional handling
- Apply `moduleDetection: "force"` in tsconfig.json for consistent module behavior

<!-- GUIDELINE_END -->

## Tailwind CSS 4.1.6 Implementation <!--tailwind-css-41-implementation-->

*Modern utility-first styling with the latest Tailwind features.*

- Use utility-first approach
- Implement mobile-first responsive design
- Use JIT mode effectively for custom values
- Leverage Tailwind 4.1 new utilities:
  - text-shadow-* for text shadow effects
  - clip-*for advanced clipping (replaced mask-* in beta 4.1.3-3)
  - wrap-* for text wrapping control
  - scroll-* for custom scrollbar styling
  - text-balance and text-wrap:balance for improved typography
- Be aware of renamed bare shadow, radius, and blur scales from v4
- Container query support is now GA (stable) for component-based responsiveness
- Dark mode default is still class-based, but media approach is deprecated
  - Set once in tailwind.config.ts
- Implement `class-variance-authority` for component variants
- Embrace new utilities for neumorphism and advanced masks
- Avoid excessive classname complexity; extract to components when needed
- Use the new `@layer` syntax for component extraction:

```jsx
@layer components {
  .btn-primary {
    @apply bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md;
  }
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
- Use @radix-ui/react-visually-hidden for screen reader content
- Apply inert attribute for inactive UI elements
- Implement :focus-visible styling for keyboard-only focus indicators
- Test with axe-core or similar tools in development
- Support reduced motion preferences with prefers-reduced-motion
- Implement proper heading hierarchy (h1-h6)
- Include lang attribute on html element
- Use proper button and link semantics (buttons for actions, links for navigation)
- Provide text alternatives for non-text content
- Implement skip links for keyboard navigation

<!-- GUIDELINE_END -->

## State Management <!--state-management-->

*Efficient state management strategies for global and component state.*

- Use Server Components to minimize client-side state
- For client-side state:
  - Use Zustand 5.0.4 for global state management
  - Use TanStack Query 5.76.1 for server state
  - Use React's built-in hooks for component-level state
- Implement proper loading, error, and empty states
- Use React Context sparingly and for truly global concerns
- Prefer local component state when possible
- Leverage React 19's useOptimistic for optimistic UI updates
- Implement useTransition for non-blocking UI updates
- Use useFormState and useFormStatus for form interactions
- Apply immutable update patterns for state changes
- Consider atomic state design for complex states
- Separate UI state from domain/business logic
- Keep state close to where it's used
- Extract reusable state logic with custom hooks
- Implement proper state persistence with localStorage/sessionStorage
- Use URL state for shareable and bookmarkable state

<!-- GUIDELINE_END -->
## Supabase Integration <!--supabase-integration-->

*Best practices for integrating with Supabase's latest features.*

### Package Versions & Setup <!--package-versions--setup-->

*Proper setup for optimal Supabase integration with Next.js 15.x.*

**Key Points:**

- Use `@supabase/supabase-js@^2.49.4` for full Edge-runtime support and streaming APIs
- Use `@supabase/ssr@^0.6.1` for compatibility with Next.js 15's async `cookies()` API
- Implement Row Level Security (RLS) for all tables
- Use Supabase Auth for authentication with PKCE flow
- Leverage type-safe queries with generated types

<!-- GUIDELINE_END -->

### Edge Functions <!--edge-functions-->

*Serverless functions for secure backend logic.*

**Benefits:**

- Deploy Deno 2.3-based Edge Functions directly from the Supabase Dashboard
- Set environment variables in the UI
- Simplifies serverless deployment workflow

**Edge Runtime Limits:**

- Vercel Edge Functions: 128 MB memory, 5s execution time
- Supabase Edge Functions: 1.5 GB memory, 40s execution time

<!-- GUIDELINE_END -->

### Realtime Broadcast <!--realtime-broadcast-->

*Efficient realtime updates with database-triggered broadcasts.*

**Key Benefits:**

- Replace client-side `.channel()` loops with database-triggered broadcasts
- Triggers fire securely from Postgres whenever you `INSERT` or `UPDATE`
- Secure channels with Row Level Security policies
- Utilize presence indicators for user online status
- Enable multiplayer collaboration with conflict resolution

<!-- GUIDELINE_END -->

### Declarative Schemas & Migrations <!--declarative-schemas--migrations-->

*Version-controlled database schema management.*

**Best Practices:**

- Write migrations in SQL (not UI clicks) for source-control parity
- Use `supabase migration new` plus `.sql` files in Git
- Hook them into CI/CD for consistent RLS policies

<!-- GUIDELINE_END -->

### Advanced Features <!--advanced-features-->

*Cutting-edge Supabase capabilities for enhanced functionality.*

- **Enhanced Vector Database**: Use `vector_generate_embedding()` with multiple model options or bring your own embeddings
- **Hybrid Vector Search**: Combine semantic vector searches with metadata filtering for improved accuracy
- **Vector Indexes**: Leverage HNSW and IVFFlat indexes for performance at scale
- **Route API → Nearest Replica**: Enable geo-routing for sub-40ms reads using the closest read replica
- **Dedicated Poolers**: Opt into co-located pgBouncer per project for stable connection pooling under heavy load
- **GraphQL**: Use `pg_graphql` extension for automatic GraphQL API generation with fragments support
- **Storage CDN**: Leverage global CDN for optimized asset delivery
- Use optimistic updates for better UX
- Store sensitive data securely using Vault
- Never expose service_role key to the browser

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

<!-- 🤖prompt: "Optimize Core Web Vitals: optimize LCP by using next/image with priority, minimize INP by using React Compiler, prevent CLS by reserving space" -->

<!-- GUIDELINE_END -->

## Third-Party Service Integrations <!--third-party-service-integrations-->

*Best practices for integrating external services and APIs.*

### Payment Processing

- Stripe 18.1.0 for payments and subscriptions
- Server-side webhooks for event handling
- Client-side Stripe.js Elements components
- Secure Checkout implementation

### Email Services

- Resend 4.5.1 for transactional emails
- React-based email templates
- Email verification and password reset flows

### Media Management

- Cloudinary 2.6.0 for image and video storage/optimization
- Next.js image optimization integration
- Automatic responsive images

### Maps & Geolocation

- Mapbox GL 3.12.0 for interactive maps
- Leaflet 1.9.4 for simpler use cases
- React Leaflet 5.0.0 for React integration
- Geocoding and location-based features

### Data Visualization

- Recharts 2.15.3 for React-based charts
- D3 7.9.0 for complex visualizations
- Responsive data dashboards

## Testing & CI/CD <!--testing--cicd-->

*Comprehensive testing strategies for reliable applications.*

- Vitest 3.1.3 for fast unit and integration testing
- Jest 32 now runs ESM natively
- Use "jest-environment-edge" when testing middleware
- Playwright 1.52.0 for end-to-end testing
- Playwright 2.8 ships RSC helpers for testing streaming UIs without waitForTimeout
- Maintain an Edge-runtime test suite for route handlers with mocked Request

<!-- GUIDELINE_END -->

### Automated E2E Testing <!--automated-e2e-testing-->

*End-to-end testing for critical user flows.*

**Benefits:**

- Catch regressions in complex flows (forms, auth, multi-step wizards)
- Playwright's cross-browser coverage includes Chrome, Safari, and Firefox
- Built-in CI integrations (Vercel, GitHub Actions) make it easy to run on every PR

**Note:** Puppeteer remains available as a legacy alternative for Chrome-only testing, but Playwright is recommended for modern projects due to its cross-browser support.

<!-- GUIDELINE_END -->

### Lighthouse CI for Performance Budgets <!--lighthouse-ci-for-performance-budgets-->

*Automated performance monitoring in CI/CD pipelines.*

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

<!-- GUIDELINE_END -->

## Advanced Project Setup & Scaling <!--advanced-project-setup--scaling-->

*Scalable project architecture for large applications and teams.*

### pnpm Workspaces <!--pnpm-workspaces-->

*Efficient package management for monorepos.*

**Benefits:**

- **Fast installs** via global content-addressable store
- **Strict versioning** and easy cross-package linking
- Shared `node_modules` in root for deduplication
- Simple setup: `pnpm install` in repo root
- Reference sibling packages by name in imports without extra configuration

<!-- GUIDELINE_END -->

### Turborepo or Nx for Monorepos <!--turborepo-or-nx-for-monorepos-->

*High-performance build system for monorepos.*

**Key Features:**

- Cache and parallelize builds, tests, linting across packages
- Unified workflow for front-end, API routes, shared components
- Task pipelining to rebuild only what changed
- Run with: `pnpm turbo run build --filter=apps/web...`
- 🚀 Enable remote caching (Turborepo Remote or Nx Cloud) to persist artifacts between CI runs and slash build times by 50-80%

<!-- GUIDELINE_END -->

### ESLint & TypeScript Checks in CI <!--eslint--typescript-checks-in-ci-->

*Automated code quality checks in CI/CD pipelines.*

**Benefits:**

- Prevent accidental type errors or lint failures
- Enforce zero-warning policy
- Run tests automatically on pushes and pull requests

<!-- GUIDELINE_END -->

### Production Observability <!--production-observability-->

*Monitoring and error tracking for production applications.*

<!-- GUIDELINE_END -->

### PWA Features <!--pwa-features-->

*Progressive Web App capabilities for enhanced user experience.*

#### Service Workers & Offline Support

- Setup: `pnpm add next-pwa workbox-window`
- Offline support and asset caching
- Better resilience and "app-like" feel

#### Web App Manifest for Install

- Add to home screen on mobile/desktop
- Control splash screen, icons, display mode
- Link in layout:
<!-- GUIDELINE_END -->

## Security Best Practices <!--security-best-practices-->

*Essential security measures for Next.js applications.*

- ⚠️ Patch to Next.js 15.3.2+ for CVE-2025-29927 middleware bypass vulnerability
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

<!-- GUIDELINE_END -->

## Quick Migration Checklist for Next.js 15.3.2 <!--quick-migration-checklist-for-nextjs-1532-->

*Comprehensive checklist for upgrading to Next.js 15.3.2.*

1. **Update dependencies**
   - Next.js → 15.3.2
   - React → 19.1.0
   - TypeScript → 5.8.3
   - Tailwind CSS → 4.1.6
   - Supabase client → @supabase/supabase-js@^2.49.4
   - Auth helpers → @supabase/ssr@^0.6.1
   - Storage → @supabase/storage-js@^2.7.3
   - UI components → Shadcn UI 2.5.0 / Radix UI 1.4.1
   - Zustand → 5.0.4
   - TanStack Query → 5.76.1
   - React Hook Form → 7.56.3
   - Zod → 3.24.4
   - Framer Motion → 12.11.3
   - Testing → Vitest 3.1.3 / Playwright 1.52.0
   - Map libraries → Mapbox GL 3.12.0 / Leaflet 1.9.4

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
   - ⚠️ Patch for CVE-2025-29927 (update to 15.3.2+)
   - ⚠️ Validate x-middleware-subrequest header in custom middleware

4. **Tailwind migration**
   - Run the official migration tool:

     ```bash
     npx @tailwindcss/migrate
     ```

   - Adopt Tailwind 4.1.6 utilities like text-shadow-*, clip-*, wrap-*

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

<!-- GUIDELINE_END -->

## AI agent integration guide <!--ai-agent-integration-guide-->

*Best practices for integrating AI code assistants with Next.js projects.*

### Structured Project Data for AI

Below is a structured representation of project guidelines for AI assistants:

```json
{
  "next_version": "15.3.2",
  "react_version": "19.1.0",
  "typescript_version": "5.8.3",
  "tailwind_version": "4.1.6",
  "libraries": {
    "state_management": {
      "zustand": "5.0.4",
      "tanstack_query": "5.76.1",
      "tanstack_table": "8.21.3"
    },
    "ui_framework": "shadcn-ui 2.5.0",
    "ui_primitives": "radix-ui 1.4.1",
    "animation": "framer-motion 12.11.3",
    "forms": {
      "react_hook_form": "7.56.3",
      "zod": "3.24.4",
      "conform": "1.5.0"
    },
    "testing": {
      "vitest": "3.1.3",
      "playwright": "1.52.0"
    },
    "services": {
      "stripe": "18.1.0",
      "cloudinary": "2.6.0",
      "resend": "4.5.1"
    },
    "maps": {
      "mapbox": "3.12.0",
      "leaflet": "1.9.4"
    }
  },
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