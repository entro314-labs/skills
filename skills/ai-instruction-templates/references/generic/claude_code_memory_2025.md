# Claude Code User Memory - Modern Stack 2025

## Coding Preferences

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

### Testing

- Write tests for all business logic using Vitest 3.2.4
- Use Playwright 1.54.2 for E2E testing
- Use descriptive test names that explain behavior
- Group related tests with describe blocks
- Mock external dependencies in unit tests
- Prefer integration tests for complex workflows

### Git Workflow

- Use conventional commit messages (feat:, fix:, docs:, etc.)
- Create feature branches from main/master
- Squash commits before merging to main
- Always create pull/merge requests for code review
- Keep commits atomic and focused

## Development Environment

### Core Stack

- **Framework**: Next.js 15+ (canary) with App Router
- **React**: 19.1.1 (React Compiler enabled, no manual optimization needed)
- **TypeScript**: 5.9.2 with strict configuration
- **Build**: SWC Core 1.13.3 (default in Next.js 15+)
- **Linting/Formatting**: Biome 2.2.0 (replaces ESLint + Prettier)
- **Monorepo**: Turbo 10.14.0

### Key Breaking Changes & Migrations

- **Next.js 15**: Dynamic APIs are async (`await cookies()`, `await headers()`, `await params()`)
- **React 19**: Server Components default, React Compiler eliminates manual optimization
- **Tailwind 4**: CSS-first config with `@theme` directive, no tailwind.config.js
- Use codemod: `npx @next/codemod@canary upgrade latest`

### Tools & Setup

- Primary IDE: VS Code with Biome extension
- Primary AI Assistant: claude code
- Terminal: Ghostty on macOS
- Package manager: pnpm (primary), bun (fallback)
- Node.js version manager: mise
- Shell: zsh with antidote plugin manager and Starship prompt
- Use TypeScript for new JavaScript projects
- PostgreSQL 17.4+ for database development
- Docker for containerization
- Homebrew for macOS package management

### Debugging

- Use debugger statements over console.log for complex debugging
- Add meaningful error messages with context
- Log important state changes in development mode
- Use structured logging for production applications

## Styling & UI

### Tailwind CSS 4.1.12

- CSS-first configuration using `@theme` directive
- Import: `@import "tailwindcss"` in globals.css
- Dynamic values without brackets: `h-100` vs `h-[100px]`
- Built-in Lightning CSS and container queries
- Browser requirements: Safari 16.4+, Chrome 111+, Firefox 128+

### Component Libraries

- **shadcn/ui 2.10.0**: Copy-paste components built on Radix UI
- **tw-animate-css 1.3.7**: CSS animations with tree-shaking
- Installation: `npx shadcn@latest init && npx shadcn@latest add button`

## Data Management

### State Management

- **TanStack Query 5.85.3**: Server state with object syntax only
- **Zustand 5.0.7**: Client state with persist and subscribeWithSelector middleware
- **Zod 4.0.17**: Runtime validation and TypeScript inference

### Key Patterns

```typescript
// TanStack Query v5 syntax
const { data } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
  placeholderData: keepPreviousData,
})

// Zod schema inference
const UserSchema = z.object({ email: z.string().email() })
type User = z.infer<typeof UserSchema>
```

## Database & Backend

### PostgreSQL 17.4+

- 2x faster concurrent transactions, improved vacuum memory
- Incremental backups native, enhanced JSON capabilities
- Connection details: localhost, postgres user, postgres database
- Use psql for database operations, pg_dump/pg_restore for backups

### Database Libraries

- **postgres.js 3.4.7**: Primary for complex queries and performance
- **Supabase SSR 0.7.0**: Auth/realtime with createServerClient pattern
- Migration from @supabase/auth-helpers-nextjs required

### Configuration

```javascript
// postgres.js setup
const sql = postgres(DATABASE_URL, {
  max: 20, idle_timeout: 20, connect_timeout: 10
})

// Supabase SSR with cookies
const supabase = createServerClient(url, key, { cookies: cookieHandler })
```

## pnpm Workflow Preferences

### Package Management

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

## Performance & Optimization

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

### Progressive Web App

- **Serwist/next 9.1.1**: Zero-config PWA with service workers
- Automatic precaching and offline support

## Security Considerations

### Best Practices

- Use environment variables for all secrets
- Parameterized queries (automatic with postgres.js)
- Input validation with Zod schemas
- Row Level Security with Supabase
- PostgreSQL 17.4 enhanced SSL configuration
- HTTPS in production with proper CORS policies

## AI Integration

### Vercel AI SDK 5.0.15

- Multi-provider support (OpenAI, Anthropic)
- Streaming responses with useChat hook
- Tool calling with Zod schema validation
- Installation: `npm install ai @ai-sdk/openai @ai-sdk/anthropic`

## Documentation Standards

### Code Documentation

- Write clear README files with setup instructions
- Document complex algorithms and business logic
- Include examples in documentation
- Update documentation when code changes
- Always check latest online documentation for tools/APIs

### Workflow Preferences

- Start with failing tests (TDD when appropriate)
- Run `npx biome check --write .` before committing
- Use feature flags for incomplete features
- Plan for rollback strategies
- Follow cutting-edge conventions and recommendations
