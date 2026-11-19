# Claude Code User Memory - Modern Stack 2025

## Core Development Principles

### Backward Compatibility Policy

- **NEVER** maintain backward compatibility or create compatibility layers
- **ALWAYS** update all files, imports, exports to new implementations
- **ALWAYS** remove obsolete files and implementations completely
- **NEVER** create bridging implementations

### Pre-Implementation Validation

- **ALWAYS** check for existing, same or similar functions, classes, files before creating new ones
- **ALWAYS** read files before editing
- **NEVER** create types that don't exist in database
- **CONDUCT** thorough impact analysis before beginning implementation
- **VERIFY** hypothesis with actual files - never assume

### Integration Requirements

- **ENSURE** tight integration with proper imports/exports/references throughout codebase
- **CREATE** complete implementations from scratch, not simplified placeholders or examples
- **DEEPLY** integrate new components with existing app structure and design system
- **DON'T** create duplicate overlapping, or similar implementations

## Implementation Standards

### Complete Solution Delivery

- **IMPLEMENT** all necessary components, imports, dependencies
- **INCLUDE** comprehensive error handling, input validation, edge cases, state management
- **INCORPORATE** security measures and appropriate tests
- **UPDATE** all affected components across entire stack
- **MAINTAIN** consistency between frontend, backend, database layers

### Systematic Process

- **UPDATE** core functionality and shared utilities first
- **PROPAGATE** changes outward to dependent components
- **EXTEND** existing components rather than creating duplicates
- **TACKLE** issues systematically - finish one file before moving to next
- **IGNORE** 3-check limits for linting/typing - ensure complete file health

### Database & Schema Management

- **ALWAYS** use the database/postgresql/supabase migrations as source of truth
- **ALWAYS** modify existing migrations instead of creating new ones
- **ALWAYS** be aware of the sequence of migrations, modify the latest that takes precedence and clean up previous overridden ones
- **ALWAYS** check `supabase/migrations` and be aware of content
- **NEVER** create database schema or types that don't exist in actual database
- **VERIFY** schema against migration files before implementation

## Core Technology Stack

### Next.js 15+ (canary) with App Router

- **All dynamic APIs are now async** - `await cookies()`, `await headers()`, `await params()`, `await searchParams()`, `await draftMode()`
- **Use codemod for migration** - `npx @next/codemod@canary upgrade latest` automates most conversions
- **Server Components are default** - only add `'use client'` when you need browser-only features
- **Caching behavior changed** - fetch requests, GET routes, and client navigation are NOT cached by default
- **React 19 as default** - App Router uses React 19, Pages Router maintains React 18 compatibility
- **Turbopack stable for dev** - use `next dev --turbo` for 10x faster development builds
- **Enhanced error boundaries** - use `error.tsx` in each route segment for better error handling

### React 19.1.1

- **React Compiler eliminates manual optimization** - no more `useMemo`, `useCallback`, or `React.memo` in most cases
- **Actions API for server state** - use Server Actions with automatic pending states and error handling
- **`use()` hook for promises** - read promises and context conditionally within render
- **Document metadata as JSX** - render `<title>`, `<meta>`, `<link>` directly in components without `next/head`
- **Refs as props** - pass refs like regular props, no more `forwardRef` needed
- **Asset preloading APIs** - use `preinit()` and `preload()` for optimized resource loading

### TypeScript 5.9.2

- **Strict mode mandatory** - enable all strict flags for maximum type safety
- **Module resolution** - use `"moduleResolution": "bundler"` for modern bundlers
- **Import type syntax** - use `import type` for type-only imports to improve tree-shaking
- **Satisfies operator** - use `satisfies` for better type inference while maintaining assignability
- **No-emit compilation** - run `tsc --noEmit` alongside SWC for type checking without compilation

## Build Tools & Development

### SWC Core 1.13.3

- **20x faster than Babel** - Rust-powered compilation with 70x improvement on multi-core systems
- **TypeScript stripping** - removes types without type checking for maximum compilation speed
- **Next.js default compiler** - replaces Babel in Next.js 15+ projects
- **Configuration via .swcrc** - customize JSX, TypeScript, and transformation options
- **Separate type checking** - run `tsc --noEmit` alongside SWC for both speed and type safety
- **Production ready** - battle-tested by Vercel, ByteDance, and Tencent at scale

### Biome 2.2.0 (replaces ESLint + Prettier)

- **Unified toolchain** - single tool replacing ESLint + Prettier with 10x performance
- **Zero configuration** - sensible defaults work out of the box for most projects
- **349 linting rules** - comprehensive coverage with performance-focused implementation
- **Exact version pinning** - use `--save-exact` to avoid rule changes between minor versions
- **Single command** - `biome check --write` formats, lints, and applies safe fixes
- **LSP integration** - first-party VS Code extension with real-time diagnostics

### Turbo 10.14.0

- **Monorepo management** - caching and parallel execution for build systems
- **Bundle analysis** - use Next.js analyzer with `ANALYZE=true npm run build`
- **Lighthouse integration** - automated performance monitoring in CI
- **Web Vitals tracking** - built-in metrics with `@vercel/analytics`

## Styling & UI

### Tailwind CSS 4.1.12

- **No more `tailwind.config.js`** - configure everything in CSS using `@theme` directive
- **Import syntax** - use `@import "tailwindcss"` instead of `@tailwind` directives
- **Dynamic values without brackets** - `h-100` instead of `h-[100px]`, `grid-cols-15` instead of `grid-cols-[15]`
- **CSS variable syntax** - use `bg-(--primary-color)` instead of `bg-[--primary-color]`
- **Theme configuration in CSS** - define all design tokens with `@theme { --color-primary: #1d4ed8; }`
- **Built-in Lightning CSS** - includes vendor prefixing, nesting, and import handling automatically
- **Automatic content detection** - no need to configure content paths in most cases
- **Container queries built-in** - use `@container` and `@sm:`, `@lg:` prefixes directly
- **Browser requirements** - Safari 16.4+, Chrome 111+, Firefox 128+ (use v3.4 for older browsers)

### shadcn/ui 2.10.0

- **Copy-paste components** - you own the code, not a traditional library dependency
- **CLI installation** - `npx shadcn@latest init && npx shadcn@latest add button`
- **CSS variable theming** - customize colors via `:root` and `.dark` classes in globals.css
- **Radix UI primitives** - accessibility and behavior handled automatically
- **Tailwind integration** - components use utility classes and design tokens
- **Zero runtime cost** - all components live in your codebase for full control

### tw-animate-css 1.3.7

- **Tailwind CSS 4.0 compatible** - pure CSS animations without JavaScript dependencies
- **Entrance/exit animations** - `animate-in fade-in zoom-in` and `animate-out slide-out-to-top`
- **Duration and delay controls** - `duration-300`, `delay-150` for precise timing
- **State-based animations** - `data-[state=show]:animate-in` for conditional animations
- **Accessibility aware** - automatically respects `prefers-reduced-motion` settings
- **Tree-shaking optimized** - unused animations excluded from final CSS bundle

## Data Management

### TanStack Query 5.85.3 (Server State)

- **Object syntax only** - `useQuery({ queryKey, queryFn })` (legacy overloads removed)
- **keepPreviousData replaced** - use `placeholderData: keepPreviousData` for same behavior
- **Suspense now stable** - use with React 19's concurrent features for better UX
- **DevTools integration essential** - use for debugging query states and cache behavior
- **Automatic garbage collection** - optimized memory management with stale-while-revalidate
- **Infinite queries enhanced** - new `maxPages` option to limit stored pages for performance
- **Better error handling** - use `useMutation` with automatic retry and optimistic updates

### Zustand 5.0.7 (Client State)

- **No providers needed** - minimal setup with direct hook usage `const state = useStore(selector)`
- **Immutable updates** - use `set((state) => ({ ...state, newProp }))` pattern consistently
- **TypeScript-first** - define store interfaces for complete type safety
- **Middleware support** - persist, devtools, subscribeWithSelector for enhanced functionality
- **Selective subscriptions** - use shallow comparison to prevent unnecessary re-renders
- **Slice pattern** - organize large stores by splitting into logical domains

### Zod 4.0.17 (Runtime Validation)

- **Runtime validation** - `z.infer<typeof schema>` for automatic TypeScript type generation
- **Schema composition** - use `.extend()`, `.merge()`, `.pick()` for building complex schemas
- **Safe parsing** - use `.safeParse()` to avoid try-catch blocks and handle errors gracefully
- **Custom validation** - `.refine()` and `.transform()` for complex business logic validation
- **Form integration** - pairs perfectly with react-hook-form and shadcn/ui form components
- **Error handling** - detailed error messages with path information for debugging

## Database & Backend

### PostgreSQL 17.4+

- **2x performance improvement** - concurrent write operations and optimized WAL processing
- **Incremental backups native** - built-in support reducing storage needs and recovery times significantly
- **Enhanced JSON capabilities** - new `JSON_TABLE()` function for converting JSON to relational tables, improved JSONB indexing
- **Advanced monitoring** - new `pg_wait_events` system view, enhanced `EXPLAIN` with I/O timing and memory usage reporting
- **Improved query optimization** - better CTE handling, automatic IS NOT NULL elimination, enhanced partition pruning
- **Logical replication upgrades** - failover slots, sync replication slots, improved performance for subtransactions
- **SQL/JSON standard compliance** - JSON constructors, identity functions, and table conversion functions now available
- **Security enhancements** - `sslnegotiation=direct` for faster TLS, improved function search path safety during maintenance
- **Memory-efficient vacuum** - improved vacuum implementation using less memory with better performance

### postgres.js 3.4.7 (Primary Database Client)

- **Tagged template literals** - `sql\`SELECT * FROM users WHERE id = ${id}\`` for automatic parameter escaping
- **Connection pooling automatic** - efficient connection management out of the box (20-50 connections typical)
- **Stream processing** - use `.cursor()` for large result sets to avoid memory issues
- **Transaction support** - `sql.begin()` for atomic operations with automatic rollback
- **BigInt support** - configure `postgres({ types: { bigint: postgres.BigInt } })` for large numbers
- **Type safety** - excellent TypeScript integration for compile-time query validation
- **Logical replication** - real-time subscriptions with `sql.subscribe()`

### Supabase SSR 0.7.0 (Auth/Realtime)

- **Auth Helpers deprecated** - migrate from `@supabase/auth-helpers-nextjs` to `@supabase/ssr`
- **Two client functions** - `createBrowserClient()` for client-side, `createServerClient()` for server-side
- **No provider wrappers** - direct client usage without React context providers
- **Middleware pattern** - use `updateSession()` function in `middleware.ts` for session management
- **Cookie handling automatic** - SSR package manages session cookies transparently
- **Type generation** - `supabase gen types typescript` for full type safety

### Database Configuration & Best Practices

#### Performance & Configuration

- **Memory settings** - `shared_buffers`: 25-40% of RAM, adjust `work_mem` per connection count
- **Write performance** - benefit from PG17's 2x improvement in concurrent write operations
- **Query optimization** - leverage PG17's automatic IS NOT NULL elimination and improved CTE planning
- **Vacuum tuning** - configure autovacuum parameters to utilize PG17's memory-efficient vacuum implementation
- **Connection management** - monitor with `pg_stat_activity` and implement timeout strategies
- **JSONB with GIN indexes** - use `CREATE INDEX ON table USING GIN (jsonb_column)` for 30% faster queries
- **Incremental backup strategy** - utilize PG17's native incremental backups for faster recovery times
- **Monitoring integration** - combine `pg_stat_activity` with `pg_wait_events` for comprehensive performance insights

#### Security & Reliability

- **Parameterized queries mandatory** - prevent SQL injection while improving query plan caching (automatic with postgres.js)
- **Environment variable secrets** - never hardcode database credentials in application code
- **SSL/TLS optimization** - use `sslnegotiation=direct` for improved connection security in PG17
- **Role-based access control** - implement principle of least privilege with regular access audits
- **Connection encryption** - ensure encryption in transit and at rest for production deployments
- **Backup verification** - test incremental backup restoration procedures regularly
- **Monitoring alerts** - set up alerts for connection pool exhaustion, query timeouts, and replication lag
- **Row Level Security with Supabase** - configure RLS policies in Supabase, postgres.js respects them automatically when using service role key

## Testing

### Vitest 3.2.4 + Playwright 1.54.2

- **Vitest for unit tests** - faster Jest alternative with native ESM and TypeScript support
- **Browser mode available** - test in real browsers with `@vitest/browser` for better compatibility
- **Playwright for E2E** - reliable browser automation with auto-wait and retry mechanisms
- **Parallel execution** - both tools run tests concurrently by default for faster feedback
- **Zero TypeScript setup** - native TypeScript support without additional configuration
- **Hot module replacement** - instant test re-runs during development with Vitest

### Testing Standards

- Write tests for all business logic using Vitest 3.2.4
- Use Playwright 1.54.2 for E2E testing
- Use descriptive test names that explain behavior
- Group related tests with describe blocks
- Mock external dependencies in unit tests
- Prefer integration tests for complex workflows

## Progressive Web App

### Serwist/next 9.1.1

- **Zero-config PWA** - successor to Workbox and next-pwa with sensible defaults
- **Service worker generation** - automatically creates optimized SW with precaching strategies
- **Offline support** - intelligent caching for assets and API responses
- **Background sync** - queue failed requests for retry when connectivity returns
- **Push notifications** - built-in support for web push API
- **App Router compatible** - designed specifically for Next.js 13+ app directory structure
- **TypeScript integration** - full type safety with `@serwist/next/typings`

## AI Integration

### Vercel AI SDK 5.0.15

- **Provider-agnostic** - unified API across OpenAI, Anthropic, Google, and other providers
- **Streaming by default** - `streamText()` and `useChat()` for real-time response handling
- **Tool calling enhanced** - structured function calls with automatic validation and error handling
- **Multi-modal support** - seamless text, image, audio, and PDF processing
- **Edge runtime optimized** - designed for Vercel Edge Functions with minimal cold starts
- **Cost optimization** - built-in token counting and usage tracking for budget management
- **Type-safe interactions** - full TypeScript support for prompts and responses

## Development Environment & Tools

### Tools & Setup

- **Primary IDE**: VS Code with Biome extension
- **Primary AI Assistant**: claude code
- **Terminal**: Ghostty on macOS
- **Package manager**: pnpm (primary), bun (fallback)
- **Node.js version manager**: mise
- **Shell**: zsh with antidote plugin manager and Starship prompt
- **Database**: PostgreSQL 17.4+ for database development
- **Containerization**: Docker
- **Package management**: Homebrew for macOS

### pnpm Workflow Preferences

- Always use pnpm instead of npm/yarn
- Use `pnpm dlx` instead of `npx` for one-off commands
- Use `pnpm up --latest` for major version updates
- Use `pnpm i --frozen-lockfile` for CI/production
- Use `pnpm -r` for workspace operations

### Development Commands

- `pnpm run dev` for development servers
- `pnpm run build` for production builds
- `pnpm run test` for running tests
- `npx biome check --write .` for linting/formatting

## Code Style & Project Structure

### Code Style

- Use 2-space indentation for JavaScript/TypeScript/JSON/YAML
- Use 4-space indentation for Python/Go
- Always use semicolons in JavaScript/TypeScript
- Prefer const/let over var
- Use descriptive variable names, avoid abbreviations
- Add JSDoc comments for complex functions
- Prefer functional programming patterns where appropriate

### Project Structure

- Follow conventional directory structures (src/, lib/, components/, etc.)
- Keep components small and focused (single responsibility)
- Separate business logic from UI components
- Use barrel exports (index.js/ts) for clean imports
- Place shared utilities in utils/ or lib/ directories

### Git Workflow

- Use conventional commit messages (feat:, fix:, docs:, etc.)
- Create feature branches from main/master
- Squash commits before merging to main
- Always create pull/merge requests for code review
- Keep commits atomic and focused

### Debugging

- Use debugger statements over console.log for complex debugging
- Add meaningful error messages with context
- Log important state changes in development mode
- Use structured logging for production applications

## Performance Optimization

### Stack Integration Performance

- **Type safety chain** - Zod runtime validation → TypeScript compile-time → SWC fast compilation
- **Performance pipeline** - SWC compilation + TanStack Query caching + postgres.js connection pooling
- **Build optimization** - automatic tree-shaking with SWC transforms and Next.js bundling
- **Progressive enhancement** - Serwist PWA + shadcn/ui accessibility + tw-animate-css performance
- **Development experience** - hot reload with SWC speed + TanStack Query DevTools + shadcn CLI

### Build Performance

- SWC compilation (20x faster than Babel)
- Turbopack for development: `next dev --turbo`
- Type checking: `tsc --noEmit` alongside SWC
- Biome for linting (10x faster than ESLint + Prettier)

### Runtime Performance

- React 19 Compiler handles optimization automatically
- TanStack Query for intelligent caching
- PostgreSQL 17.4 performance improvements
- Connection pooling with postgres.js

## Quality Standards & Technology Compliance

### Technology Stack Compliance

- **RESPECT** tech stack and follow latest/modern practices
- **CHECK** `package.json` for high-level stack understanding
- **USE** linting and typing tools for validation like biome, not builds/dev servers
- **DON'T** use deprecated APIs or create compatibility implementations
- **KEEP** entire codebase up to date with imports/exports/references

### Feature Completeness

- **DON'T** create incomplete features, examples or showcases
- **ENSURE** API endpoints have necessary schema/functions
- **FULLY** connect API to UI or create all necessary components
- **NEVER** create simplified versions - recreate files if needed
- **FOLLOW** existing project styles, conventions, error handling
- **ALWAYS** make sure that SCHEMA, TYPES, API, UI are fully aligned and connected
- **NEVER** remove unused imports before you audit the intended functionality, it might imply a missing feature

### Security & Responsibility

- **PROACTIVELY** identify and address security vulnerabilities
- **IMPLEMENT** appropriate data protection measures
- **ADHERE** to privacy-by-design principles
- **CONSIDER** accessibility in user-facing components
- **FLAG** potential ethical concerns

## Documentation Standards

### Code Documentation

- Write clear README files with setup instructions
- Document complex algorithms and business logic
- Include examples in documentation
- Update documentation when code changes
- Always check latest online documentation for tools/APIs

### Documentation Approach

- **UPDATE** documentation to reflect new implementations only
- **DON'T** document legacy or compatibility aspects
- **ENSURE** code comments reflect current implementation
- **INCLUDE** intent comments explaining "why" not just "what"
- **MAINTAIN** living documentation that evolves with implementation

### Workflow Preferences

- Start with failing tests (TDD when appropriate)
- Run `npx biome check --write .` before committing
- Use feature flags for incomplete features
- Plan for rollback strategies
- Follow cutting-edge conventions and recommendations

## Validation Checklist

### Pre-Implementation

- [ ] Check existing functionality and naming patterns
- [ ] Verify database schema in migrations
- [ ] Read target files before editing
- [ ] Confirm tech stack compatibility
- [ ] Analyze full project context

### During Implementation

- [ ] Update core functionality first
- [ ] Implement comprehensive error handling
- [ ] Verify cross-component compatibility
- [ ] Remove legacy code immediately

### Post-Implementation

- [ ] All imports/exports updated throughout codebase
- [ ] All linting/typing errors resolved
- [ ] Feature fully connected from API to UI
- [ ] Documentation reflects current implementation
- [ ] Security vulnerabilities addressed
