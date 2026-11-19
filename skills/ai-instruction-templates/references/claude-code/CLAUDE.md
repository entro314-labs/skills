---
title: 'Claude Code User Memory'
description:
  '- Use 2-space indentation for JavaScript/TypeScript/JSON/YAML - Use 4-space indentation for
  Python/Go - Always use semicolons in JavaScript/TypeScript.'
category: 'Claude Code'
---

# Claude Code User Memory

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

- Write tests for all business logic
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

### Tools & Setup

- Primary IDE: Windsurf, VS Code
- Terminal: iTerm2, Ghostty on macOS
- Package manager: pnpm (primary), npm (fallback)
- Node.js version manager: fnm with automatic .nvmrc switching
- Shell: zsh with antidote plugin manager and Starship prompt
- Use TypeScript for new JavaScript projects
- Prefer Vite over Webpack for new projects
- Use ESLint + Prettier for code formatting (via pnpm dlx)
- PostgreSQL for database development
- Docker for containerization
- Homebrew for macOS package management

### Debugging

- Use debugger statements over console.log for complex debugging
- Add meaningful error messages with context
- Log important state changes in development mode
- Use structured logging for production applications

## pnpm Workflow Preferences

### Package Management

- Always use pnpm instead of npm/yarn
- Use `pnpm dlx` instead of `npx` for one-off commands
- Prefer `pnpm add` over `pnpm install <package>` for new dependencies
- Use `pnpm up` for updates, `pnpm up --latest` for major version updates
- Use frozen lockfile (`pnpm i --frozen-lockfile`) for CI/production
- Use `pnpm store prune` periodically to clean unused packages

### Development Commands

- `pnpm run dev` for development servers
- `pnpm run build` for production builds
- `pnpm run test` for running tests
- `pnpm run lint` for linting
- Use parallel execution with `pnpm -r` for workspace operations
- Prefer workspace commands for monorepo management

### Node.js Version Management

- Use fnm for Node.js version switching
- Always check for .nvmrc files in projects
- Use `fnm use` to switch versions
- Keep Node.js versions in sync across projects

## Database & Infrastructure

### PostgreSQL Preferences

- Default to PostgreSQL for new projects
- Use connection details: localhost, postgres user, postgres database
- Prefer psql for database operations
- Use pg_dump/pg_restore for database backups

### Docker Workflow

- Use `docker compose` (new syntax) over `docker-compose`
- Prefer multi-stage builds for optimization
- Use .dockerignore files to exclude unnecessary files
- Clean up containers regularly with custom nuke scripts

## Performance & Optimization

### General Principles

- Measure before optimizing
- Focus on user-perceived performance first
- Use appropriate data structures for the task
- Minimize bundle size in frontend applications
- Implement proper error boundaries and fallbacks

### Frontend Specific

- Lazy load components and routes where appropriate
- Optimize images and assets
- Use code splitting for large applications
- Implement proper caching strategies
- Monitor Core Web Vitals

## Security Considerations

### Best Practices

- Never commit secrets or API keys
- Use environment variables for configuration
- Validate all user inputs
- Implement proper authentication and authorization
- Keep dependencies updated and scan for vulnerabilities
- Use HTTPS in production
- Implement proper CORS policies

## Documentation Standards

### Code Documentation

- Write clear README files with setup instructions
- Document complex algorithms and business logic
- Include examples in documentation
- Keep documentation close to the code it describes
- Update documentation when code changes

### API Documentation

- Use OpenAPI/Swagger for REST APIs
- Include request/response examples
- Document error codes and messages
- Provide SDKs or code examples where helpful

## Workflow Preferences

### Development Workflow

- Start with failing tests (TDD when appropriate)
- Run tests before committing
- Use feature flags for incomplete features
- Implement monitoring and observability
- Plan for rollback strategies

### Communication

- Over-communicate in remote environments
- Document decisions and reasoning
- Share knowledge through code comments and docs
- Ask for clarification when requirements are unclear

## Large Codebase Drift Prevention System

### Project Manifest Integration

- **Primary Reference**: PROJECT_MANIFEST.md (contains all architectural decisions and code
  patterns)
- **Refactor Tracking**: REFACTOR_PLAN.md (tracks technical debt and cleanup tasks)
- **Memory Persistence**: This CLAUDE.md file maintains session-to-session context

### Critical Code Patterns (Never Break)

- ❌ NEVER introduce 'any' types in TypeScript code
- ❌ NEVER skip error handling in API calls
- ❌ NEVER break established component structure patterns
- ❌ NEVER bypass the Result<T, E> pattern for async operations
- ✅ ALWAYS check PROJECT_MANIFEST.md before making changes
- ✅ ALWAYS update REFACTOR_PLAN.md when identifying issues
- ✅ ALWAYS follow established file naming and organization patterns

### Session Start Protocol

1. Read PROJECT_MANIFEST.md for current architectural patterns and rules
2. Check REFACTOR_PLAN.md for any blocking 🔴 issues that need immediate attention
3. Run codebase health check: `/technical-debt --quick` or `/audit security --quick`
4. Focus on specific files/modules from the refactor plan

### Session End Protocol

1. Update this CLAUDE.md with any new architectural decisions or patterns established
2. Update REFACTOR_PLAN.md with newly identified technical debt or issues
3. Update PROJECT_MANIFEST.md if core patterns or standards changed
4. Run final validation to ensure no drift introduced

### Drift Prevention Commands (Use Regularly)

```bash
# Daily codebase health check
/technical-debt --quick            # Quick scan for new issues
/review latest --security          # Review recent changes for drift

# Weekly maintenance
/audit security --full             # Full security and type safety audit
/dependencies analyze              # Check dependency health
/refactor --analyze                # Identify refactoring opportunities

# Monthly deep clean
/technical-debt --full             # Comprehensive technical debt analysis
/clean --dead-code --duplicates    # Remove unused code and duplication
/benchmark --performance           # Performance analysis
```

### Code Development Rules

When writing or modifying code:

1. **Always** follow the established patterns in PROJECT_MANIFEST.md
2. **Always** use proper TypeScript types (never 'any' unless absolutely necessary)
3. **Always** implement the Result<T, E> pattern for async operations
4. **Always** follow the established component structure pattern
5. **Always** add proper error handling to all API calls

### Quality Gates

- **Pre-commit**: No 'any' types introduced, all async functions have error handling
- **Weekly**: Run `/technical-debt --quick` to catch drift early
- **Monthly**: Complete `/technical-debt --full` and `/audit security --full`
- **Quarterly**: Review and update PROJECT_MANIFEST.md patterns

### Established Code Patterns (Never Break)

- **Error Handling**: Result<T, E> pattern for all async operations
- **Component Structure**: Interface definition → hooks → derived state → handlers → effects →
  render
- **API Services**: Centralized in /services with consistent error handling
- **Type Definitions**: All types in /types folder, imported everywhere
- **File Naming**: kebab-case for files, PascalCase for components

### Architectural Decisions Made

- 2025-01-27: Established Result<T, E> pattern for error handling consistency
- 2025-01-27: Standardized component structure across all React components
- 2025-01-27: Centralized all type definitions in /types folder
- 2025-01-27: Implemented drift prevention system with three-file tracking

### Anti-Patterns to Avoid (Lessons Learned)

- Never introduce 'any' types without extremely strong justification
- Never skip error handling in API calls or async operations
- Never create inline type definitions in components
- Never bypass established service layer for API calls
- Never copy-paste code without extracting common patterns
- Never mix different error handling approaches in the same codebase

### Current Focus Areas (Large Codebase Management)

1. **Type Safety**: Eliminate remaining 'any' types systematically
2. **Pattern Consistency**: Ensure all API calls follow Result<T, E> pattern
3. **Code Quality**: Remove duplication and improve maintainability
4. **Performance**: Identify and fix performance bottlenecks

### Red Flags (Watch For in Code Reviews)

- Any new 'any' types being introduced
- API calls without proper error handling
- Components not following established structure pattern
- Direct database queries in presentation layer
- Inconsistent naming conventions
- Security vulnerabilities (unvalidated inputs, etc.)
