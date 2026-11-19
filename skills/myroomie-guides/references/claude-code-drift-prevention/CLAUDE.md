---
title: 'Claude Code User Memory - MyRoomie Platform'
description:
  'MyRoomie is a comprehensive roommate and property matching platform built with Next.js 15, React
  19, TypeScript, and Supabase. The platform serves mul.'
category: 'Claude Code Drift Prevention'
---

# Claude Code User Memory - MyRoomie Platform

## Project Overview

MyRoomie is a comprehensive roommate and property matching platform built with Next.js 15, React 19,
TypeScript, and Supabase. The platform serves multiple personas (students, young professionals,
property managers, enterprise clients) with sophisticated matching algorithms, real-time messaging,
and property management tools.

## Core Technology Stack

### Framework & Infrastructure

- **Frontend**: Next.js 15.4.2-canary.19 with App Router
- **React**: 19.1.0 with React Compiler enabled
- **TypeScript**: 5.8.3 with strict mode
- **Database**: Supabase (PostgreSQL) with real-time subscriptions
- **Styling**: Tailwind CSS 4.1.11 with custom design system
- **State Management**: Zustand 5.0.6 + React Query (@tanstack/react-query 5.83.0)
- **Authentication**: Supabase Auth with social providers
- **Payments**: Stripe integration with subscription management
- **AI Integration**: Multiple providers (@ai-sdk/anthropic, @ai-sdk/openai-compatible, etc.)

### Development Environment

- **Node.js**: >=22.x requirement
- **Package Manager**: pnpm 10.13.1 (primary), with workspace support
- **IDE**: Windsurf, VS Code with Cursor rules
- **Database Tools**: Supabase CLI for migrations and type generation
- **Performance**: Turbopack for dev/build, bundle analyzer
- **Quality**: ESLint 9.32.0, Prettier 3.6.2, TypeScript strict mode

## Project Architecture Patterns

### File Structure Standards

```
/src
  /app                    # Next.js App Router
    /(auth)              # Authentication route group
    /(dashboard)         # User dashboard route group
    /(manage)            # Property management route group
    /api                 # API routes
  /components            # Reusable UI components
    /admin              # Admin-specific components
    /auth               # Authentication components
    /ui                 # Shadcn/ui components
    /[feature]          # Feature-specific components
  /lib                  # Utilities and shared logic
    /supabase           # Supabase client configuration
    /auth               # Authentication utilities
    /[feature]          # Feature-specific utilities
  /hooks                # Custom React hooks
  /stores               # Zustand stores
  /types                # ALL TypeScript interfaces
  /i18n                 # Internationalization
/supabase
  /migrations           # Database migrations
  /functions           # Edge functions
```

### Established Code Patterns (Never Break)

#### Type System Rules

- ❌ **NEVER** use 'any' types - use proper TypeScript interfaces
- ❌ **NEVER** skip error handling in API calls or async operations
- ❌ **NEVER** create inline type definitions in components
- ✅ **ALWAYS** define types in `/types` folder with proper interfaces
- ✅ **ALWAYS** use discriminated unions for complex states
- ✅ **ALWAYS** validate API responses with Zod schemas

#### Component Structure Pattern

```typescript
// Established component structure - follow exactly:
interface ComponentProps {
  // All props with proper types
}

export function Component({ prop1, prop2 }: ComponentProps) {
  // 1. Hooks (useState, useEffect, custom hooks)
  // 2. Derived state and computed values
  // 3. Event handlers (useCallback)
  // 4. Effects (useEffect)
  // 5. Early returns/loading states
  // 6. Render JSX
}
```

#### API Service Pattern

```typescript
// All API calls use this Result<T, E> pattern:
type Result<T, E = Error> = { success: true; data: T } | { success: false; error: E };

// API service structure:
export async function apiCall<T>(params: RequestParams): Promise<Result<T>> {
  try {
    const response = await fetch(/* ... */);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}
```

#### Supabase Integration Pattern

```typescript
// Always use typed Supabase client
import { createClient } from '@/lib/supabase/client';
import type { Database } from '@/types/database.types';

// Server components use server client
import { createClient } from '@/lib/supabase/server';

// Always handle Supabase errors properly
const { data, error } = await supabase.from('table').select();
if (error) return { success: false, error };
```

### Naming Conventions

- **Files**: kebab-case (user-profile.tsx, property-search.client.tsx)
- **Components**: PascalCase (UserProfile, PropertySearch)
- **Functions**: camelCase (getUserProfile, searchProperties)
- **Constants**: SCREAMING_SNAKE_CASE (API_BASE_URL, MAX_UPLOAD_SIZE)
- **Types/Interfaces**: PascalCase (UserProfileData, PropertySearchFilters)
- **Client Components**: .client.tsx suffix
- **Server Components**: .server.tsx suffix (or no suffix)

## Feature-Specific Patterns

### Authentication & Authorization

- Use `@/lib/auth/secure-auth` for server-side auth checks
- Admin access via `@/lib/auth/is-admin`
- Property manager access via `@/lib/auth/is-property-manager`
- Role-based access control in `@/lib/auth/role-based-auth`

### Real-time Features

- Supabase real-time subscriptions for messaging
- Real-time notifications with `@/lib/notifications/notification-service`
- WebSocket connections managed in `@/lib/messaging/real-time-service`

### State Management

- **Global State**: Zustand stores in `/stores`
- **Server State**: React Query for API data
- **Form State**: React Hook Form with Zod validation
- **URL State**: Next.js searchParams for filters/pagination

### Database Operations

- **Migrations**: SQL files in `/supabase/migrations`
- **Type Generation**: `pnpm run types:local` or `pnpm run types:remote`
- **Validation**: Always validate with `pnpm run db:validate`

### Google Maps Integration

- Use `@/lib/google-places-v2` for Places API v2
- Address validation via `@/lib/google-address-validation`
- Environmental data via `@/lib/google-environmental-apis`

## Development Workflow

### Daily Commands

```bash
# Start development
pnpm run dev                    # Standard dev server
pnpm run dev:turbopack         # Turbopack dev server

# Code quality
pnpm run validate              # TypeScript + lint + format check
pnpm run typecheck             # TypeScript validation only
pnpm run lint:fix              # Auto-fix linting issues

# Database
pnpm run db:validate           # Check database status + lint
pnpm run types:check           # Verify generated types
```

### Pre-commit Workflow

- **Lint-staged** runs automatically on commit
- **TypeScript check** must pass
- **ESLint + Prettier** formatting applied
- **Database migrations** validated if changed

### Testing Strategy

- **API Routes**: Test with proper error handling
- **Components**: Focus on user interactions and edge cases
- **Database**: Integration tests for complex queries
- **Auth**: Test all permission levels and edge cases

## Quality Standards & Anti-Patterns

### Code Quality Gates

- **Pre-commit**: No TypeScript errors, ESLint passes, Prettier formatted
- **Build**: `pnpm run build:check` must pass
- **Security**: `pnpm run security:audit` for dependency vulnerabilities
- **Performance**: Lighthouse scores monitored

### Anti-Patterns to Avoid

- ❌ Direct database queries in React components
- ❌ Untyped API responses or any 'any' types
- ❌ Global state mutations outside stores
- ❌ Missing error boundaries in route groups
- ❌ Inline styles (use Tailwind classes only)
- ❌ Copy-paste code without abstraction
- ❌ Mixing client/server components incorrectly

### Performance Requirements

- **Core Web Vitals**: Monitor with Vercel Analytics
- **Bundle Size**: Use `pnpm run analyze` to check bundles
- **Database**: Use DataLoader pattern for N+1 query prevention
- **Images**: Optimize with Next.js Image component
- **Code Splitting**: Lazy load heavy components

## Platform-Specific Features

### Multi-Persona Architecture

- **Students**: University verification, student-specific matching
- **Young Professionals**: Career-based matching, professional networks
- **Property Managers**: Portfolio management, tenant screening
- **Enterprise**: Corporate relocations, bulk operations

### Matching Engine

- **Compatibility**: MBTI personality integration
- **Location**: Google Places API with comprehensive analysis
- **Preferences**: Lifestyle, budget, and roommate compatibility
- **AI-Enhanced**: Smart recommendations based on user behavior

### Internationalization (i18n)

- **Locales**: EN, ES, DE, IT, PL, PT supported
- **Content**: Country-specific content in `/lib/content`
- **Currency**: Local currency support via `/lib/utils/currency-service`
- **Translations**: JSON files in `/lib/i18n/locales`

## Current Technical Debt & Focus Areas

### High Priority (Address Immediately)

- [ ] Complete DataLoader implementation for N+1 query prevention
- [ ] Standardize error handling across all API routes
- [ ] Implement comprehensive error boundaries
- [ ] Optimize real-time subscription performance

### Medium Priority (Next Sprint)

- [ ] Complete mobile responsive design
- [ ] Enhance admin analytics dashboard
- [ ] Implement advanced caching strategies
- [ ] Add comprehensive test coverage

### Monitoring & Maintenance

- [ ] Set up proper logging and monitoring
- [ ] Database query optimization
- [ ] Security audit and penetration testing
- [ ] Performance benchmarking and optimization

## Environment & Deployment

### Environment Variables

- **Supabase**: URL, anon key, service role key
- **Google**: Maps API, Places API v2 keys
- **Stripe**: Public/secret keys for payments
- **AI Services**: Anthropic, OpenAI API keys
- **Security**: JWT secrets, encryption keys

### Deployment Pipeline

- **Vercel**: Production deployment with preview branches
- **Database**: Supabase hosted PostgreSQL
- **CDN**: Vercel Edge Network for static assets
- **Monitoring**: Vercel Analytics + custom dashboard

## Security Considerations

### Data Protection

- **GDPR Compliance**: Data export/deletion endpoints
- **Auth Security**: Supabase RLS policies enforced
- **API Security**: Rate limiting and input validation
- **File Uploads**: Secure with proper validation

### Access Control

- **Role-Based**: Admin, Property Manager, User roles
- **Row-Level Security**: Supabase RLS policies
- **API Protection**: Authentication required for all routes
- **Admin Features**: Additional security layers

## Launch Readiness Checklist

### Core Features Complete

- [x] User authentication and onboarding
- [x] Property and roommate matching
- [x] Real-time messaging
- [x] Payment integration
- [x] Admin dashboard
- [x] Multi-persona support

### Performance & Security

- [ ] Security audit complete
- [ ] Performance optimization complete
- [ ] Error monitoring configured
- [ ] Backup and recovery tested

### Business Ready

- [ ] Legal pages updated
- [ ] Analytics tracking configured
- [ ] Customer support system ready
- [ ] Marketing site optimized
