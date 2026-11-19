---
title: 'Project Manifest - MyRoomie Platform Architecture'
description:
  '- Framework: Next.js 15.4.2-canary.19 (App Router) - React: 19.1.0 with React Compiler -
  Language: TypeScript 5.8.3 (strict mode) - Database: Supabase.'
category: 'Claude Code Drift Prevention'
---

# Project Manifest - MyRoomie Platform Architecture

## Core Architecture Overview

### Technology Stack

- **Framework**: Next.js 15.4.2-canary.19 (App Router)
- **React**: 19.1.0 with React Compiler
- **Language**: TypeScript 5.8.3 (strict mode)
- **Database**: Supabase (PostgreSQL) with real-time subscriptions
- **Styling**: Tailwind CSS 4.1.11 + Shadcn/ui components
- **State Management**: Zustand + React Query (@tanstack/react-query)
- **Authentication**: Supabase Auth with @auth/supabase-adapter
- **Payments**: Stripe with React Stripe.js integration
- **Maps**: Google Maps + Places API v2
- **AI**: Multi-provider (@ai-sdk/anthropic, @ai-sdk/openai-compatible)

### Application Architecture Principles

#### Route Organization (App Router)

```
/app
├── (auth)           # Authentication routes (/login, /signup, /verify)
├── (dashboard)      # User dashboard routes (/dashboard, /matches, /messages)
├── (manage)         # Property management routes (/manage-properties, /manage-tenants)
├── /admin           # Admin panel routes
├── /api             # API routes with proper organization
├── /enterprise      # Enterprise features (relocations, reporting)
└── /[feature]       # Public marketing pages
```

#### Component Architecture

```
/components
├── /admin           # Admin-specific components
├── /auth            # Authentication components
├── /ui              # Shadcn/ui base components (button, card, etc.)
├── /[feature]       # Feature-specific components (properties, matching, etc.)
├── /layout          # Layout components (navbar, footer, etc.)
├── /providers       # React context providers
└── /mobile          # Mobile-specific components
```

## Established Code Patterns (NEVER BREAK)

### 1. TypeScript Type System Rules

```typescript
// ❌ FORBIDDEN - Never use these patterns:
const data: any = await apiCall(); // No 'any' types
const user = data as User; // No type assertions
throw new Error('Something failed'); // No raw throws

// ✅ REQUIRED - Always use these patterns:
interface ApiResponse<T> {
  data: T;
  error?: string;
}

type Result<T, E = Error> = { success: true; data: T } | { success: false; error: E };
```

### 2. Component Structure Pattern (Established 2025-01-27)

```typescript
// ALL components must follow this exact structure:
interface ComponentProps {
  // Properly typed props
}

export function ComponentName({ ...props }: ComponentProps) {
  // 1. Hooks (React hooks, custom hooks)
  const [state, setState] = useState()
  const { data, isLoading } = useQuery()

  // 2. Derived state and computed values
  const computedValue = useMemo(() => calculation, [dependency])

  // 3. Event handlers (wrapped in useCallback)
  const handleAction = useCallback(() => {
    // handler logic
  }, [dependencies])

  // 4. Effects
  useEffect(() => {
    // side effects
  }, [dependencies])

  // 5. Early returns for loading/error states
  if (isLoading) return <Skeleton />
  if (error) return <ErrorComponent error={error} />

  // 6. Render JSX
  return (
    <div>
      {/* component JSX */}
    </div>
  )
}
```

### 3. API Service Pattern (Established 2025-01-27)

```typescript
// All API calls must use this pattern:
export async function apiServiceCall<T>(params: RequestParams): Promise<Result<T>> {
  try {
    const { data, error } = await supabase.from('table').select();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error : new Error('Unknown error'),
    };
  }
}
```

### 4. Supabase Integration Pattern

```typescript
// Server components (app directory)
import { createClient } from '@/lib/supabase/server';

// Client components
import { createClient } from '@/lib/supabase/client';

// Always use typed client
const supabase = createClient<Database>();

// Always handle errors properly
const { data, error } = await supabase.from('users').select();
if (error) {
  return { success: false, error };
}
```

### 5. Authentication Pattern

```typescript
// Server-side auth check (required for protected routes)
import { createClient } from '@/lib/supabase/server'

export default async function ProtectedPage() {
  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return <PageContent user={user} />
}

// Client-side auth hook
const { user, isLoading } = useUser()
if (isLoading) return <Skeleton />
if (!user) return <LoginPrompt />
```

## File Naming Conventions

### Component Files

- **Client Components**: `component-name.client.tsx`
- **Server Components**: `component-name.server.tsx` (or no suffix)
- **Page Components**: `page.tsx` (App Router standard)
- **Layout Components**: `layout.tsx` (App Router standard)
- **Loading Components**: `loading.tsx` (App Router standard)
- **Error Components**: `error.tsx` (App Router standard)

### API Routes

- **REST Endpoints**: `/api/[resource]/route.ts`
- **Nested Resources**: `/api/[resource]/[id]/route.ts`
- **Actions**: `/api/[resource]/[action]/route.ts`

### Type Definitions

- **Database Types**: `database.types.ts` (generated)
- **Feature Types**: `[feature].types.ts`
- **Shared Types**: Place in `/types/` directory

## Current Implementation Status

### ✅ Core Features Complete

- [x] **Authentication System** (`/app/(auth)` + `/lib/auth`)
  - Supabase Auth with social providers
  - Role-based access control (Admin, Property Manager, User)
  - Email verification and password reset
- [x] **User Management** (`/app/(dashboard)` + `/components/user`)
  - Multi-persona onboarding (Student, Young Professional, Property Manager)
  - Profile completion wizard
  - MBTI personality integration
- [x] **Property Management** (`/app/(manage)` + `/components/properties`)
  - Property CRUD operations
  - Room management within properties
  - Bulk operations for property managers
  - Property analytics dashboard
- [x] **Matching Engine** (`/components/matching` + `/lib/matching`)
  - Compatibility algorithm with personality matching
  - Location-based matching with Google Places API
  - Preference-based filtering
- [x] **Real-time Messaging** (`/components/chat` + `/lib/messaging`)
  - Supabase real-time subscriptions
  - Typing indicators
  - Message history and notifications
- [x] **Payment Integration** (`/app/(dashboard)/payments` + `/lib/stripe`)
  - Stripe subscription management
  - Boost purchases for enhanced visibility
  - Billing history and invoice management

### ✅ Advanced Features Complete

- [x] **Admin Dashboard** (`/app/admin` + `/components/admin`)
  - User management and verification
  - Property oversight and approval system
  - Analytics and reporting
  - System monitoring and health checks
- [x] **Enterprise Features** (`/app/enterprise` + `/components/enterprise`)
  - Corporate relocation management
  - Bulk employee onboarding
  - Custom reporting and analytics
- [x] **Google Maps Integration** (`/lib/google-*`)
  - Places API v2 implementation
  - Address validation and geocoding
  - Comprehensive location analysis
  - Air quality and environmental data
- [x] **Internationalization** (`/lib/i18n`)
  - 6 languages supported (EN, ES, DE, IT, PL, PT)
  - Country-specific content
  - Currency localization

### 🔄 In Progress

- [ ] **Mobile Optimization** (`/components/mobile`)
  - Bottom sheet navigation
  - Pull-to-refresh functionality
  - Mobile-specific card layouts
- [ ] **Performance Optimization**
  - DataLoader implementation for N+1 queries
  - Database query optimization
  - Bundle size optimization
- [ ] **Testing Infrastructure**
  - Unit tests for core business logic
  - Integration tests for API routes
  - E2E tests for critical user flows

### 📋 TODO (Next Sprint)

- [ ] **Enhanced Analytics**
  - User behavior tracking
  - Conversion funnel analysis
  - A/B testing framework
- [ ] **Advanced Notifications**
  - Push notifications with web-push
  - Email notification templates
  - Notification preferences management
- [ ] **Content Management**
  - Blog system completion (`/app/blog` + `/components/blog`)
  - SEO optimization
  - Content scheduling

## Known Technical Debt

### 🔴 Critical (Fix Immediately)

1. **DataLoader N+1 Queries** (`/lib/dataloader`)
   - Location: Property and user data fetching
   - Impact: Database performance issues
   - Status: Implementation in progress

2. **Error Boundary Coverage**
   - Location: Route groups missing error boundaries
   - Impact: Poor user experience on errors
   - Fix: Add error.tsx files to all route groups

3. **Type Safety Gaps**
   - Location: Some API responses still untyped
   - Impact: Runtime errors and poor DX
   - Fix: Complete type definitions in `/types`

### 🟡 Important (Next Sprint)

1. **Test Coverage**
   - Current: <30% coverage
   - Target: >80% for core business logic
   - Priority: Authentication, matching, payments

2. **Mobile Performance**
   - Issue: Heavy components on mobile devices
   - Solution: Implement lazy loading and code splitting

3. **Database Query Optimization**
   - Issue: Complex queries need indexing
   - Solution: Add proper indexes and query optimization

### 🟢 Nice to Have

1. **Component Storybook**
   - Status: Setup complete, needs component stories
   - Benefit: Better component documentation

2. **Advanced Caching**
   - Current: Basic React Query caching
   - Enhancement: Redis for server-side caching

## Security & Compliance

### Implemented Security Measures

- ✅ **Row Level Security** (Supabase RLS policies)
- ✅ **Input Validation** (Zod schemas)
- ✅ **Authentication** (Supabase Auth + JWT)
- ✅ **CORS Protection** (Next.js middleware)
- ✅ **Rate Limiting** (API route protection)

### GDPR Compliance

- ✅ **Data Export** (`/api/users/export-data`)
- ✅ **Data Deletion** (`/api/auth/delete-account`)
- ✅ **Privacy Controls** (User settings)
- ✅ **Cookie Consent** (Cookie policy page)

### Security Audit TODO

- [ ] Penetration testing
- [ ] Dependency vulnerability scan
- [ ] Security headers audit
- [ ] Data encryption at rest verification

## Performance Standards

### Current Metrics

- **Lighthouse Score**: Target >90 (currently ~85)
- **Core Web Vitals**: Monitoring with Vercel Analytics
- **Bundle Size**: <2MB total (currently ~1.8MB)
- **API Response Time**: <200ms average

### Optimization Strategies

- **Code Splitting**: Route-based and component-based
- **Image Optimization**: Next.js Image component + WebP
- **Database**: Query optimization and indexing
- **Caching**: React Query + CDN caching

## Deployment & Infrastructure

### Production Environment

- **Hosting**: Vercel (with Preview deployments)
- **Database**: Supabase (hosted PostgreSQL)
- **File Storage**: Supabase Storage
- **CDN**: Vercel Edge Network
- **Monitoring**: Vercel Analytics + Sentry

### Environment Management

- **Development**: Local Supabase + local env
- **Staging**: Supabase staging project
- **Production**: Supabase production project

### CI/CD Pipeline

- **Build**: TypeScript check + ESLint + Prettier
- **Test**: Unit tests + integration tests
- **Deploy**: Automatic deployment on main branch
- **Monitor**: Post-deployment health checks

## Documentation Standards

### Code Documentation

- **Components**: JSDoc comments for complex logic
- **API Routes**: OpenAPI documentation (TODO)
- **Hooks**: Usage examples and parameter descriptions
- **Utilities**: Function documentation with examples

### Architecture Documentation

- **ADRs**: Architecture Decision Records (TODO)
- **API Documentation**: Swagger/OpenAPI (TODO)
- **Database Schema**: Auto-generated from migrations
- **Deployment Guide**: Step-by-step setup instructions
