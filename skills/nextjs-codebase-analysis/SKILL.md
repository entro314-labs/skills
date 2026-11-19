---
name: nextjs-codebase-analysis
description: "Analyzes a Next.js 15.3 codebase: App Router structure, server and client components, data fetching, caching, auth, performance and conventions, producing a structured report. Use when asked to review or analyze a Next.js project."
disable-model-invocation: true
---

# Next.js 15.3 Codebase Analysis Prompt

You are tasked with performing a comprehensive analysis of a Next.js 15.3 codebase that uses Supabase, Tailwind CSS 4.0/4.1, and Shadcn UI. Your goal is to identify missing components, routes, schema elements, and other discrepancies across all layers of the application.

## Analysis Framework

### 1. Codebase Structure Assessment

First, map out the complete project structure and identify:

**Core Directories to Analyze:**

- `/app` - App Router structure, routes, layouts, pages
- `/components` - UI components (Shadcn UI and custom)
- `/lib` - Utility libraries, database connections, configurations
- `/hooks` - Custom React hooks
- `/utils` - Utility functions
- `/types` - TypeScript type definitions
- `/schemas` - Validation schemas (Zod, etc.)
- `/api` or `/app/api` - API routes
- `/supabase` - Database migrations, types, functions
- `/public` - Static assets
- `/styles` - Global styles, Tailwind configuration

### 2. Layer-by-Layer Analysis

#### A. Database Schema Analysis (Supabase)

- **Examine:** `supabase/migrations/`, database.types.ts, schema.sql files
- **Identify:**
  - Tables without corresponding TypeScript types
  - Tables without API endpoints
  - Tables without UI components for CRUD operations
  - Missing indexes, constraints, or RLS policies
  - Orphaned foreign key references
  - Tables with no corresponding forms or display components

#### B. API Routes Analysis

- **Examine:** `/app/api/` directory structure
- **Cross-reference with:**
  - Database tables (does each table have CRUD endpoints?)
  - Frontend data fetching (are all API calls mapped to existing endpoints?)
  - Authentication requirements vs. actual implementation
- **Identify:**
  - API routes without corresponding database operations
  - Database tables without API endpoints
  - Missing error handling patterns
  - Inconsistent response formats
  - Missing validation middleware

#### C. Route Structure Analysis (App Router)

- **Examine:** `/app` directory structure, `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx` files
- **Identify:**
  - Pages without corresponding navigation links
  - Navigation links pointing to non-existent routes
  - Missing loading states for async routes
  - Missing error boundaries
  - Routes without proper metadata
  - Protected routes without authentication checks
  - Routes missing corresponding API endpoints

#### D. UI Components Analysis

- **Examine:** Components directory, Shadcn UI usage, custom components
- **Cross-reference with:**
  - Database schema (form components for each table)
  - API endpoints (components that consume each endpoint)
  - Routes (components used in each route)
- **Identify:**
  - Database entities without corresponding form components
  - API responses without display components
  - Missing reusable components for common patterns
  - Shadcn UI components that could replace custom implementations
  - Form components without validation schemas
  - Display components without proper error states

#### E. Hooks and State Management Analysis

- **Examine:** Custom hooks, data fetching patterns, state management
- **Identify:**
  - Repeated data fetching logic that could be abstracted into hooks
  - API calls not wrapped in custom hooks
  - Missing error handling in hooks
  - State management patterns that could be optimized
  - Hooks without proper TypeScript typing

#### F. TypeScript Types and Schemas Analysis

- **Examine:** Type definitions, Zod schemas, Supabase generated types
- **Cross-reference with:**
  - Database schema
  - API request/response patterns
  - Form validation requirements
- **Identify:**
  - Database tables without TypeScript types
  - API endpoints without proper typing
  - Form components without validation schemas
  - Type inconsistencies between layers
  - Missing union types for database enums

### 3. Integration Points Analysis

#### Authentication & Authorization

- Check if all protected routes have proper auth guards
- Verify RLS policies match route protection
- Identify missing role-based access controls
- Check for consistent authentication patterns

#### Data Flow Consistency

- Trace data from database → API → hooks → components
- Identify broken or incomplete data flows
- Check for consistent error handling across layers
- Verify loading states are implemented throughout

#### UI/UX Consistency

- Check for consistent component usage patterns
- Identify missing responsive design implementations
- Verify accessibility features across components
- Check for consistent styling and theming

### 4. Technology Stack Compliance

#### Next.js 15.3 Features

- Verify proper App Router usage
- Check for Server Components vs Client Components optimization
- Identify missing Suspense boundaries
- Check for proper use of new Next.js 15 features

#### Supabase Integration

- Verify proper client initialization
- Check for optimal query patterns
- Identify missing real-time subscriptions where beneficial
- Check for proper error handling in database operations

#### Tailwind CSS 4.0/4.1

- Verify modern Tailwind patterns
- Identify legacy CSS that could be replaced
- Check for consistent design system usage
- Identify missing responsive variants

#### Shadcn UI

- Check for proper component implementation
- Identify custom components that could use Shadcn alternatives
- Verify consistent theming and variant usage
- Check for accessibility compliance

## Report Structure

Generate a comprehensive report with the following sections:

### 1. Executive Summary

- Overall codebase health score
- Critical missing components
- Major discrepancies found
- Priority recommendations

### 2. Missing Components Report

```
- Database Schema Gaps
  - Tables: [list missing tables based on usage patterns]
  - Columns: [missing columns in existing tables]
  - Relationships: [missing foreign keys/relationships]

- API Endpoints Gaps
  - CRUD Operations: [missing endpoints for existing tables]
  - Custom Endpoints: [needed endpoints based on UI patterns]
  - Authentication: [missing auth-protected endpoints]

- UI Components Gaps
  - Forms: [missing form components for data entities]
  - Display: [missing components for data visualization]
  - Navigation: [missing navigation elements]
  - Feedback: [missing loading/error states]

- Route Gaps
  - Pages: [missing pages for complete user flows]
  - Layouts: [missing layout components]
  - Metadata: [missing SEO/metadata implementations]

- Hooks & Utils Gaps
  - Data Fetching: [missing custom hooks for data operations]
  - Utilities: [missing utility functions for common operations]
  - Validation: [missing schema validations]
```

### 3. Legacy & Obsolete Code Report

- Outdated patterns that could be modernized
- Unused components or utilities
- Deprecated API usage
- Inefficient implementations

### 4. Discrepancies & Inconsistencies Report

- Type mismatches between layers
- Inconsistent naming conventions
- Different error handling patterns
- Styling inconsistencies

### 5. Overlap & Duplication Report

- Duplicate components with slight variations
- Repeated logic that could be abstracted
- Similar API endpoints that could be consolidated
- Redundant utility functions

### 6. Architecture Improvement Recommendations

- Suggested refactoring priorities
- Missing architectural patterns
- Performance optimization opportunities
- Developer experience improvements

### 7. Implementation Roadmap

- Priority levels for each finding
- Estimated effort for each improvement
- Dependency relationships between improvements
- Quick wins vs. major refactoring needs

## Analysis Instructions

1. **Start with file structure mapping** - Get a complete overview of the codebase organization
2. **Analyze dependencies** - Check package.json and import/export patterns
3. **Follow data flows** - Trace how data moves through each layer
4. **Check consistency patterns** - Look for established patterns and deviations
5. **Identify quick wins** - Highlight easy improvements with high impact
6. **Consider user journeys** - Ensure complete user flows are supported
7. **Validate against best practices** - Check against Next.js, Supabase, and React best practices

## Output Format

Provide the analysis in a structured markdown report with:

- Clear headings and subheadings
- Code examples where relevant
- Specific file paths and line numbers when possible
- Priority levels (Critical, High, Medium, Low)
- Actionable recommendations with implementation guidance

Focus on being thorough, specific, and actionable in your findings.
