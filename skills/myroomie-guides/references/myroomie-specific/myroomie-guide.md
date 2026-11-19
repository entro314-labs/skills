# MyRoomie Platform - Comprehensive Development Guide

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
   - [Root Directory Organization](#21-root-directory-organization)
   - [Source Code Organization](#22-source-code-organization-src)
3. [Technical Stack](#3-technical-stack)
4. [Architecture & Design Patterns](#4-architecture--design-patterns)
   - [Client/Server Architecture](#41-clientserver-architecture)
   - [Data Flow Patterns](#42-data-flow-patterns)
5. [Development Guidelines](#5-development-guidelines)
   - [Code Conventions](#51-code-conventions)
   - [File Organization](#52-file-organization)
   - [Component Structure](#53-component-structure)
   - [Styling Approach](#54-styling-approach)
6. [State Management](#6-state-management)
   - [Zustand Stores](#61-zustand-stores)
   - [React Query Integration](#62-react-query-integration)
7. [UI/UX Guidelines](#7-uiux-guidelines)
   - [Design System](#71-design-system)
   - [Component Hierarchy](#72-component-hierarchy)
   - [Loading States](#73-loading-states)
   - [Responsive Design](#74-responsive-design)
8. [Authentication & Authorization](#8-authentication--authorization)
   - [Authentication Providers](#81-authentication-providers)
   - [Role-Based Access Control](#82-role-based-access-control)
9. [Database Schema](#9-database-schema)
   - [Core Tables](#91-core-tables)
   - [Additional Features](#92-additional-features)
10. [Data Fetching](#10-data-fetching)
    - [Server Components](#101-server-components)
    - [Client Components](#102-client-components)
11. [API Routes](#11-api-routes)
12. [Internationalization (i18n)](#12-internationalization-i18n)
13. [Progressive Web App (PWA)](#13-progressive-web-app-pwa)
14. [Feature Implementations](#14-feature-implementations)
    - [Roommate Matching System](#141-roommate-matching-system)
    - [User Onboarding Workflow](#142-user-onboarding-workflow)
    - [Financial Management](#143-financial-management)
    - [Community Features](#144-community-features)
15. [Testing Strategy](#15-testing-strategy)
16. [Error Handling](#16-error-handling)
17. [Deployment Architecture](#17-deployment-architecture)
18. [Analytics & Monitoring](#18-analytics--monitoring)
19. [Security Best Practices](#19-security-best-practices)
20. [Strategic Business Roadmap (2025-2031)](#20-strategic-business-roadmap-2025-2031)
    - [Key Objectives & Targets](#201-key-objectives--targets)
    - [Implementation Phases](#202-implementation-phases)
    - [Feature Prioritization (MoSCoW)](#203-feature-prioritization-moscow)
21. [Future Technical Roadmap](#21-future-technical-roadmap)
    - [AI/ML Implementation](#211-aiml-implementation)
    - [Architecture Evolution](#212-architecture-evolution)
    - [Scaling Strategy](#213-scaling-strategy)

## 1. Project Overview

**MyRoomie** is a comprehensive "Living as a Service" (LaaS) platform built to transform the European rental housing market through three integrated pillars:

1. **MyRoomie Living (B2C)**: AI-powered flatmate matching with community-focused living features
2. **MyRoomie Manage (B2B)**: Property optimization services for landlords and property managers with predictive maintenance and dynamic pricing
3. **MyRoomie Pro (Enterprise)**: End-to-end relocation solutions for corporations and universities

### Vision & Business Objectives

The platform addresses critical challenges in housing affordability, operational inefficiency, fragmented relocation processes, and community disconnection across European markets. Key strategic objectives include:

- Expanding from current 45,776 users to 1.2M+ users across 11 European markets by 2031
- Increasing premium conversion rate from 4.7% to 12%
- Growing from 246 to 7,500+ properties under management
- Enhancing AI matching accuracy from 75% to 90%
- Building powerful network effects and proprietary data moats
- Generating €17.55M in annual revenue by 2031

### Market Expansion Strategy

The platform will expand in phases across European markets:

1. **Foundation Markets**: Greece, Poland, Malta, Portugal, Estonia
2. **Expansion Markets**: Ireland, Austria, Czech Republic
3. **Growth Markets**: Romania, Slovakia, Slovenia

### Core Platform Capabilities

The MyRoomie platform provides the following key capabilities:

- **Advanced Roommate Matching**: AI-powered compatibility scoring with lifestyle, personality, and preference matching
- **Comprehensive Property Management**: Tools for landlords to optimize property performance
- **Community Building**: Social features for tenants to build communities within properties
- **Financial Management**: Expense splitting, deposit management, and payment tracking
- **Enterprise Relocation**: End-to-end solutions for corporate relocation needs
- **Multi-market Support**: Localized experiences for different European markets
- **Mobile-first Experience**: Progressive Web App with responsive design

### Current Development State

The platform is currently implemented using a modern Next.js architecture with server and client components, Supabase for backend services, and a comprehensive testing strategy. The development approach follows a modular structure with domain-driven design principles and clean separation of concerns.

## 2. Project Structure

### 2.1 Root Directory Organization

```
myroomiev3/
├── .husky/               # Git hooks for pre-commit automation
├── .idea/                # IntelliJ IDEA configuration
├── .next/                # Next.js build output (generated)
├── public/               # Static assets
├── src/                  # Application source code
│   ├── app/              # Next.js App Router routes
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and libraries
│   ├── migrations/       # Database migrations
│   ├── stores/           # State management (Zustand)
│   └── types/            # TypeScript type definitions
├── .gitignore            # Git ignore configuration
├── create.sh             # Script to create new components/pages
├── eslint.config.mjs     # ESLint configuration
├── lighthouserc.js       # Lighthouse CI configuration
├── middleware.ts         # Next.js middleware
├── next.config.ts        # Next.js configuration
├── package.json          # Node.js dependencies and scripts
├── pnpm-lock.yaml        # PNPM lockfile
├── pnpm-workspace.yaml   # PNPM workspace configuration
├── postcss.config.mjs    # PostCSS configuration
├── setup.sh              # Project setup script
├── tsconfig.json         # TypeScript configuration
└── vercel.json           # Vercel deployment configuration
```

### 2.2 Source Code Organization (`src/`)

#### App Directory (`src/app/`)

The application follows Next.js App Router structure with route groups (parentheses) for logical organization:

```
src/app/
├── (auth)/               # Authentication-related routes
│   ├── login/
│   ├── signup/
│   └── verify/
├── (dashboard)/          # User dashboard routes
│   ├── community/
│   ├── matches/
│   │   └── [id]/         # Dynamic route for match details
│   ├── profile/
│   └── properties/
│       └── [id]/         # Dynamic route for property details
├── (enterprise)/         # Enterprise-specific features
│   ├── relocations/
│   └── reporting/
├── (manage)/             # Property management features
│   ├── analytics/
│   ├── properties/
│   └── tenants/
├── admin/                # Admin panel
│   ├── dashboard/
│   ├── help/
│   ├── markets/
│   ├── properties/
│   ├── security/
│   ├── settings/
│   └── users/
├── api/                  # API routes
│   ├── auth/
│   ├── communities/
│   ├── enterprise/
│   ├── matches/
│   ├── payments/
│   ├── properties/
│   └── users/
├── offline/              # Offline experience
├── properties/           # Public property routes
│   └── search/
├── property/             # Individual property routes
│   └── [id]/
│       └── finance/
├── layout.tsx            # Root layout
└── page.tsx              # Homepage
```

#### Components Directory (`src/components/`)

Components are organized by domain-specific features:

```
src/components/
├── admin/                # Admin-specific components
├── auth/                 # Authentication components
├── chat/                 # Messaging components
├── common/               # Shared components
├── community/            # Community-related components
├── enterprise/           # Enterprise features components
├── finance/              # Financial tools components
├── i18n/                 # Internationalization components
├── manage/               # Property management components
├── matching/             # Roommate matching components
├── notifications/        # Notification system components
├── onboarding/           # User onboarding components
├── properties/           # Property-related components
├── pwa/                  # Progressive Web App components
├── search/               # Search functionality components
├── ui/                   # Base UI component library
└── users/                # User-related components
```

#### Additional Source Directories

```
src/hooks/                # Custom React hooks
src/lib/                  # Utility functions and libraries
  ├── i18n/               # Internationalization utilities
  │   └── locales/        # Translation files
  ├── supabase/           # Supabase client utilities
  └── utils/              # General utilities
src/migrations/           # Database migrations
src/stores/               # Zustand store definitions
src/types/                # TypeScript type definitions
```

## 3. Technical Stack

### Core Technologies

- **Frontend Framework**: Next.js 15.3.1 with App Router
- **UI Library**: React 19.1.0
- **Type Safety**: TypeScript 5.8.3
- **Styling**:
  - Tailwind CSS 4.1.4
  - shadcn/ui components (version 2.4.1)
  - CSS modules for component-specific styles
- **State Management**:
  - Zustand 5.0.4 for global client-side state
  - TanStack Query 5.74.6 for server state
- **Backend**: Supabase for authentication, database, storage, and realtime features
  - @supabase/supabase-js v3.43.0
  - @supabase/auth-helpers-nextjs v0.16.0
- **Forms & Validation**:
  - React Hook Form for form management
  - Zod for schema validation
- **Authentication**:
  - NextAuth.js with multiple providers
  - JWT-based auth with secure cookies
- **Internationalization**:
  - next-intl for translation management
  - ICU message format support
- **Data Visualization**: Recharts for charts and graphs
- **Progressive Web App**:
  - next-pwa for service worker
  - Offline capabilities and installable experience
- **Testing**:
  - Jest for unit testing
  - React Testing Library for component testing
  - Playwright for end-to-end testing
  - Lighthouse CI for performance monitoring
- **DevOps & Monitoring**:
  - GitHub Actions for CI/CD
  - Sentry for error tracking
  - Analytics tracking for user behavior
- **Deployment**: Vercel with Edge Functions

## 4. Architecture & Design Patterns

### 4.1 Client/Server Architecture

The application follows Next.js App Router architecture with a clear separation between server and client components:

#### Server Components

- Default in Next.js App Router
- No client-side JavaScript sent to browser
- Direct database access through Supabase
- Used for initial data fetching, SEO, and static content
- No React hooks or browser APIs

#### Client Components

- Marked with `'use client'` directive
- Used for interactive UI elements
- Hydrated with JavaScript on the client
- Can use React hooks, event handlers, and browser APIs
- Communicate with the server through API routes or server actions

```typescript
// Server Component Example (src/app/properties/page.tsx)
import { createServerClient } from '@/lib/supabase/server';
import { PropertyList } from '@/components/properties/property-list';

export default async function PropertiesPage() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching properties:', error);
    return <div>Error loading properties</div>;
  }
  
  return <PropertyList properties={data} />;
}
```

```typescript
// Client Component Example (src/components/properties/property-form.client.tsx)
'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@/lib/supabase/client';

export function PropertyForm() {
  const [address, setAddress] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClientComponentClient();
    await supabase.from('properties').insert({ address });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input value={address} onChange={(e) => setAddress(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### 4.2 Data Flow Patterns

The application implements a unidirectional data flow pattern:

1. **Server-Side Data Flow**
   - Supabase queries in server components
   - API routes with controlled access
   - Server actions for form submissions
   - Database triggers for complex operations

2. **Client-Side Data Flow**
   - Zustand stores for global state
   - React Query for server state and caching
   - Local component state with React hooks
   - WebSocket subscriptions for real-time updates

3. **Repository Pattern**

   ```typescript
   // src/lib/repositories/property-repository.ts
   export const PropertyRepository = {
     async findById(id: string) {
       const supabase = createServerClient();
       const { data, error } = await supabase
         .from('properties')
         .select('*')
         .eq('id', id)
         .single();
         
       if (error) throw error;
       return data;
     },
     
     async create(property: PropertyCreateInput) {
       // Implementation...
     },
     
     // Additional methods...
   };
   ```

4. **Query Builder Pattern**

   ```typescript
   function buildPropertyQuery(filters: PropertyFilters) {
     let query = supabase.from('properties').select('*');
     
     if (filters.priceMin) {
       query = query.gte('price', filters.priceMin);
     }
     
     if (filters.priceMax) {
       query = query.lte('price', filters.priceMax);
     }
     
     // Additional filters...
     
     return query;
   }
   ```

## 5. Development Guidelines

### 5.1 Code Conventions

#### TypeScript Usage

- Strong typing enforced throughout the codebase
- Interfaces and types defined in dedicated files (`src/types/`)
- Zod for runtime validation of data
- Type augmentation for third-party libraries where needed

#### Naming Conventions

- **Files**:
  - Use kebab-case for all filenames (`user-profile.tsx`, `auth-form.tsx`)
  - Client Components: Add `.client.tsx` suffix: `navbar.client.tsx`
  - Server Components: No suffix or optional `.server.tsx` suffix
  - Page components: `page.tsx`
  - Layout components: `layout.tsx`
  - API routes: `route.ts` or HTTP method files (`GET.ts`, `POST.ts`)

- **Components**:
  - Use PascalCase for component names: `UserProfile`, `AuthForm`
  - Export named components rather than default exports

- **Functions**:
  - Use camelCase for functions: `fetchUserData()`, `handleSubmit()`
  - Prefix event handlers with `handle`: `handleClick()`, `handleChange()`
  - Prefix boolean variables with auxiliary verbs: `isLoading`, `hasError`

- **Types/Interfaces**:
  - Use PascalCase: `UserProfile`, `PropertyData`
  - Suffix props with `Props`: `ButtonProps`, `CardProps`
  - Export types/interfaces at the end of the file

- **Hooks**:
  - Use camelCase with `use` prefix: `useAuth`, `useMatches`

- **Store files**:
  - Use kebab-case with `-store` suffix: `auth-store.ts`

### 5.2 File Organization

The application follows a feature-based organization within the source directory:

```typescript
// Component Types
- UI Components: Pure, reusable components without business logic
- Feature Components: Domain-specific components with business logic
- Layout Components: Components that handle page layouts
- Page Components: Components that represent entire pages
```

### 5.3 Component Structure

```typescript
// Standard Component Structure

// Client directive if needed
'use client';

// Imports
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Interface for props
interface ComponentNameProps {
  prop1: string;
  prop2: number;
  optional?: boolean;
}

// Component definition
export function ComponentName({ prop1, prop2, optional = false }: ComponentNameProps) {
  // State, hooks, etc.
  const [state, setState] = useState(false);
  
  // Event handlers
  const handleClick = () => {
    setState(!state);
  };
  
  // JSX return
  return (
    <div className={cn("base-classes", optional && "conditional-class")}>
      <h2>{prop1}</h2>
      <p>{prop2}</p>
      <Button onClick={handleClick}>Click Me</Button>
    </div>
  );
}
```

### 5.4 Styling Approach

#### TailwindCSS Usage

The application uses Tailwind CSS with a utility-first approach:

```tsx
<div className="flex min-h-screen flex-col items-center justify-center p-24">
  <div className="max-w-5xl w-full text-center">
    <h1 className="text-6xl font-bold mb-8">
      Welcome to <span className="text-blue-600">MyRoomie</span>
    </h1>
  </div>
</div>
```

#### Utility Functions

We use the `cn` utility function to conditionally apply classes:

```typescript
// lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

```typescript
// Usage
<button 
  className={cn(
    "px-4 py-2 rounded-md",
    isActive && "bg-blue-600 text-white",
    !isActive && "bg-gray-200 text-gray-800",
    className
  )}
>
  {children}
</button>
```

#### Class Variance Authority

For complex components with multiple variants, we use class-variance-authority:

```typescript
// Button variants example
import { cva, type VariantProps } from 'class-variance-authority';

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

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

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

#### CSS Variables for Theming

We use CSS variables for theming, defined in `globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  /* Other variables... */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* Dark mode variables... */
}
```

## 7. UI/UX Guidelines

### 7.1 Design System

The application uses shadcn/ui components with custom theming:

#### Color Palette

- **Primary**: blue-600 (#2563EB)
- **Secondary**: gray-900 (#111827)
- **Accent**: purple-600 (#9333EA)
- **Success**: green-600 (#10B981)
- **Warning**: yellow-500 (#F59E0B)
- **Error**: red-600 (#DC2626)
- **Background**: white (#FFFFFF) or gray-50 (#F9FAFB)

#### Typography

- **Headings**: font-bold, text-gray-900
- **Body**: text-gray-600
- **Links**: text-blue-600, hover:text-blue-800

#### Spacing

- Consistent spacing using Tailwind's spacing scale
- Container padding: px-4 sm:px-6 lg:px-8
- Vertical spacing between sections: space-y-8

#### Components

- **Cards**: rounded-xl border shadow-sm
- **Buttons**: rounded-md for standard, rounded-full for CTAs
- **Forms**: clear labels, good spacing, helpful error messages

#### Theming System

- Light and dark mode support via `next-themes`
- CSS variables for theme values
- Theme toggling with persistent preferences

```tsx
// src/components/theme-provider.tsx
'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

### 7.2 Component Hierarchy

The application follows a clear component hierarchy:

1. **Base UI Components**: Low-level UI primitives (buttons, inputs, etc.)
2. **Composite Components**: Combinations of base components (cards, forms, etc.)
3. **Feature Components**: Domain-specific components (PropertyCard, MatchList, etc.)
4. **Page Components**: Full page layouts combining feature components

Example Card Component:

```typescript
// src/components/ui/card.tsx
import { cn } from '@/lib/utils';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div className={cn(
      "bg-white rounded-xl border shadow-sm overflow-hidden",
      className
    )}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export function CardHeader({ className, children }: CardHeaderProps) {
  return (
    <div className={cn("p-6 border-b", className)}>
      {children}
    </div>
  );
}

interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

export function CardContent({ className, children }: CardContentProps) {
  return (
    <div className={cn("p-6", className)}>
      {children}
    </div>
  );
}
```

### 7.3 Loading States

The application implements consistent loading states for asynchronous operations:

- Skeleton loaders for content placeholders
- Suspense boundaries for React Server Components
- Animated loading indicators for user actions

Example Skeleton Component:

```tsx
// src/components/properties/property-list-skeleton.tsx
export function PropertyListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="flex flex-col rounded-lg overflow-hidden border shadow-sm animate-pulse">
          <div className="h-48 w-full bg-gray-200" />
          <div className="flex-1 p-4">
            <div className="h-6 w-3/4 bg-gray-200 rounded mb-2" />
            <div className="h-4 w-full bg-gray-200 rounded mb-2" />
            <div className="h-4 w-5/6 bg-gray-200 rounded mb-4" />
            <div className="flex justify-between items-center">
              <div className="h-4 w-1/4 bg-gray-200 rounded" />
              <div className="h-4 w-1/4 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
```

Server Component with Suspense:

```tsx
// src/app/properties/page.tsx
import { Suspense } from 'react';
import { PropertyList } from '@/components/property-list';
import { PropertyListSkeleton } from '@/components/property-list-skeleton';

export default function PropertiesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Available Properties</h1>
      
      <Suspense fallback={<PropertyListSkeleton />}>
        <PropertyListContainer />
      </Suspense>
    </div>
  );
}

async function PropertyListContainer() {
  // Fetch data and return PropertyList component
  // ...
}
```

### 7.4 Responsive Design

The application implements a mobile-first approach with responsive design:

- Tailwind breakpoints:
  - `sm`: 640px and up
  - `md`: 768px and up
  - `lg`: 1024px and up
  - `xl`: 1280px
  - `2xl`: 1536px
- Responsive layout components using CSS Grid and Flexbox
- Touch-optimized interactions for mobile users
- Component variants for different screen sizes

Example Responsive Component:

```tsx
// src/components/property-card.tsx
<div className={cn(
  "flex flex-col rounded-lg overflow-hidden border shadow-sm", 
  "md:flex-row md:h-64",
  className
)}>
  <div className="relative h-48 w-full md:w-1/3 md:h-full">
    <Image
      src={imageUrl || '/placeholder.png'}
      alt={title}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-cover"
    />
  </div>
  
  <div className="flex-1 p-4">
    <h3 className="text-lg font-semibold mb-1">{title}</h3>
    <p className="text-gray-600 text-sm mb-2">{description}</p>
    
    <div className="mt-auto pt-4 flex justify-between items-center">
      <p className="text-blue-600 font-medium">{price} €</p>
      <Button size="sm">View Details</Button>
    </div>
  </div>
</div>
```

#### Form Handling

The application uses React Hook Form with Zod validation for form handling:

```tsx
// src/components/auth/login-form.client.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  const onSubmit = async (data: LoginFormValues) => {
    // Handle login
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full">
          Log In
        </Button>
      </form>
    </Form>
  );
}
```

#### Accessibility Considerations

The application follows accessibility best practices:

- ARIA attributes for interactive elements
- Keyboard navigation support
- Color contrast compliance (ratio ≥ 4.5:1)
- Screen reader support
- Focus management
- WCAG AA compliance

## 9. Database Schema

The application uses Supabase (PostgreSQL) for its database with a comprehensive schema:

### 9.1 Core Tables

#### `profiles`

```typescript
{
  id: string                    // User ID (Primary Key)
  created_at: string            // Creation timestamp
  name: string                  // User's full name
  email: string                 // User's email
  bio: string | null            // User biography
  personality: string | null    // Personality attributes
  profile_image_url: string | null // Profile image
  preferred_market: string | null // Preferred location
  role: string | null           // User role
}
```

#### `properties`

```typescript
{
  id: string                    // Property ID (Primary Key)
  owner_id: string              // Owner user ID (Foreign Key to profiles)
  address: string               // Property address
  details: Json | null          // Property details (JSON)
  amenities: string[]           // Available amenities 
  status: string                // Property status
  created_at: string            // Creation timestamp
  coordinates: unknown | null   // Geo coordinates
  market_code: string | null    // Market code (Foreign Key to market_configs)
}
```

#### `rooms`

```typescript
{
  id: string                    // Room ID (Primary Key)
  property_id: string           // Property ID (Foreign Key to properties)
  name: string                  // Room name
  size: number                  // Room size in square meters
  price: number                 // Room price
  availability: string[] | null // Availability dates
  lease_type: string            // Lease type
  description: string | null    // Room description
  features: string[] | null     // Room features
  created_at: string            // Creation timestamp
}
```

#### `matches`

```typescript
{
  id: string                    // Match ID (Primary Key)
  user1_id: string              // First user ID (Foreign Key to profiles)
  user2_id: string              // Second user ID (Foreign Key to profiles)
  status: string                // Match status
  compatibility: number         // Compatibility score
  created_at: string            // Creation timestamp
  updated_at: string | null     // Last update timestamp
}
```

#### `bookings`

```typescript
{
  id: string                    // Booking ID (Primary Key)
  user_id: string               // User ID (Foreign Key to profiles)
  room_id: string               // Room ID (Foreign Key to rooms)
  status: string                // Booking status
  start_date: string            // Lease start date
  end_date: string | null       // Lease end date
  created_at: string            // Creation timestamp
}
```

### 9.2 Additional Features

#### Community Features

##### `communities`

```typescript
{
  id: string                    // Community ID (Primary Key)
  name: string                  // Community name
  description: string           // Community description
  type: string                  // Community type
  image_url: string | null      // Community image
  is_private: boolean           // Privacy setting
  rules: string[] | null        // Community rules
  location: string | null       // Community location
  property_id: string | null    // Associated property (Foreign Key to properties)
  creator_id: string            // Creator user ID (Foreign Key to profiles)
  created_at: string            // Creation timestamp
}
```

##### `community_members`

```typescript
{
  id: string                    // Membership ID (Primary Key)
  community_id: string          // Community ID (Foreign Key to communities)
  user_id: string               // User ID (Foreign Key to profiles)
  role: string                  // Member role
  joined_at: string             // Join timestamp
}
```

##### `community_events`

```typescript
{
  id: string                    // Event ID (Primary Key)
  community_id: string          // Community ID (Foreign Key to communities)
  creator_id: string            // Creator user ID (Foreign Key to profiles)
  title: string                 // Event title
  description: string           // Event description
  start_time: string            // Event start time
  end_time: string              // Event end time
  location: string | null       // Event location
  max_participants: number | null // Maximum participants
  created_at: string            // Creation timestamp
}
```

#### Messaging System

##### `chat_conversations`

```typescript
{
  id: string                    // Conversation ID (Primary Key)
  match_id: string              // Match ID (Foreign Key to matches)
  created_at: string            // Creation timestamp
  updated_at: string            // Last update timestamp
}
```

##### `chat_messages`

```typescript
{
  id: string                    // Message ID (Primary Key)
  conversation_id: string       // Conversation ID (Foreign Key to chat_conversations)
  sender_id: string             // Sender user ID (Foreign Key to profiles)
  content: string               // Message content
  is_read: boolean              // Read status
  created_at: string            // Creation timestamp
}
```

##### `chat_typing_status`

```typescript
{
  conversation_id: string       // Conversation ID (Foreign Key to chat_conversations)
  user_id: string               // User ID (Foreign Key to profiles)
  is_typing: boolean            // Typing status
  last_updated: string          // Last update timestamp
}
```

#### Financial Features

##### `expense_splits`

```typescript
{
  id: string                    // Expense ID (Primary Key)
  property_id: string           // Property ID (Foreign Key to properties)
  creator_id: string            // Creator user ID (Foreign Key to profiles)
  title: string                 // Expense title
  description: string | null    // Expense description
  total_amount: number          // Total amount
  currency: string              // Currency code
  category: string              // Expense category
  due_date: string | null       // Due date
  created_at: string            // Creation timestamp
  updated_at: string            // Last update timestamp
}
```

##### `expense_shares`

```typescript
{
  id: string                    // Share ID (Primary Key)
  expense_id: string            // Expense ID (Foreign Key to expense_splits)
  user_id: string               // User ID (Foreign Key to profiles)
  amount: number                // Share amount
  status: string                // Payment status
  paid_at: string | null        // Payment timestamp
  reminder_sent_at: string | null // Last reminder timestamp
  created_at: string            // Creation timestamp
  updated_at: string            // Last update timestamp
}
```

##### `security_deposits`

```typescript
{
  id: string                    // Deposit ID (Primary Key)
  property_id: string           // Property ID (Foreign Key to properties)
  room_id: string               // Room ID (Foreign Key to rooms)
  tenant_id: string             // Tenant user ID (Foreign Key to profiles)
  amount: number                // Deposit amount
  currency: string              // Currency code
  status: string                // Deposit status
  held_by: string               // Custodian
  deposit_type: string          // Deposit type
  deposit_date: string | null   // Deposit date
  expected_return_date: string | null // Expected return date
  actual_return_date: string | null // Actual return date
  withholding_amount: number | null // Withheld amount
  withholding_reason: string | null // Reason for withholding
  external_reference: string | null // External reference
  created_at: string            // Creation timestamp
  updated_at: string            // Last update timestamp
}
```

#### Enterprise Relocation

##### `relocations`

```typescript
{
  id: string                    // Relocation ID (Primary Key)
  employee_id: string           // Employee user ID (Foreign Key to profiles)
  enterprise_id: string         // Enterprise ID (Foreign Key to enterprise_clients)
  status: string                // Relocation status
  start_date: string            // Start date
  end_date: string | null       // End date
  destination: string           // Destination
  budget: number | null         // Budget
  currency: string              // Currency code
  details: Json | null          // Additional details (JSON)
  created_at: string            // Creation timestamp
  updated_at: string            // Last update timestamp
}
```

##### `enterprise_clients`

```typescript
{
  id: string                    // Enterprise ID (Primary Key)
  name: string                  // Enterprise name
  contact_email: string         // Contact email
  subscription_level: string    // Subscription level
  branding: Json | null         // Branding settings (JSON)
  settings: Json | null         // Enterprise settings (JSON)
  created_at: string            // Creation timestamp
}
```

#### Market Configuration

##### `market_configs`

```typescript
{
  market_code: string           // Market code (Primary Key)
  name: string                  // Market name
  currency: string              // Default currency
  language: string              // Default language
  is_active: boolean            // Active status
  time_zone: string             // Market timezone
  date_format: string           // Date format
  settings: Json                // Additional settings
  created_at: string            // Creation timestamp
  updated_at: string            // Last update timestamp
}
```

#### Database Functions

The database includes custom PostgreSQL functions for advanced operations:

- `calculate_equal_expense_shares`: Splits expenses equally among users
- `calculate_proportional_expense_shares`: Splits expenses proportionally
- `get_property_expense_stats`: Retrieves expense statistics for a property
- `properties_within_radius`: Finds properties within a geographical radius
- `match_compatibility_score`: Calculates compatibility between users

#### Database Security

The database implements row-level security (RLS) policies to ensure data access control:

```sql
-- Example RLS policy for properties
CREATE POLICY "Properties are viewable by everyone"
  ON properties FOR SELECT
  USING (true);

CREATE POLICY "Properties are editable by their owners"
  ON properties FOR UPDATE
  USING (auth.uid() = owner_id);

CREATE POLICY "Properties are insertable by authenticated users"
  ON properties FOR INSERT
  WITH CHECK (auth.uid() = owner_id);
```

## 8. Authentication & Authorization

### 8.1 Authentication Providers

The application uses NextAuth.js with multiple authentication providers:

- Email/Password (Credentials)
- Google OAuth
- GitHub OAuth

```typescript
// src/app/api/auth/[...nextauth]/route.ts
export const authOptions: NextAuthOptions = {
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      // Configuration...
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      // Add user data to session
      if (session?.user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }
      return session;
    },
    // Other callbacks...
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
  // Additional configuration...
};
```

#### Server-Side Auth

```typescript
// lib/auth.ts
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}
```

```typescript
// lib/supabase/server.ts
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import { type Database } from '@/types/database.types';

export const createServerClient = () => {
  const cookieStore = cookies();
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  
  return createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    },
    global: {
      headers: {
        'x-supabase-cookie': cookieStore.toString(),
      },
    },
  });
};
```

#### Authentication Flow

1. User visits login/signup page
2. User authenticates via NextAuth.js
3. JWT token is generated and stored in cookies
4. Session information is available in both server and client components
5. Protected routes redirect unauthenticated users to login

### 8.2 Role-Based Access Control

The application implements a comprehensive role-based access control (RBAC) system:

#### User Roles

- `user`: Regular user
- `landlord`: Property owner
- `admin`: System administrator
- `enterprise`: Enterprise client

#### RBAC Implementation Details

1. **Database Level**: RLS (Row Level Security) policies in Supabase
2. **API Level**: Role checks in API routes
3. **UI Level**: Conditional rendering based on user role
4. **Middleware**: Route protection based on role

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    const session = getSession(request);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  // Protect enterprise routes
  if (pathname.startsWith('/enterprise')) {
    const session = getSession(request);
    
    if (!session || session.user.role !== 'enterprise') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/enterprise/:path*',
    '/manage/:path*',
  ],
};
```

#### Conditional UI Rendering

```tsx
// Example of role-based conditional rendering
{user?.role === 'admin' && (
  <Button onClick={openAdminPanel}>Admin Panel</Button>
)}

{user?.role === 'landlord' && (
  <Button onClick={openPropertyManagement}>Manage Properties</Button>
)}
```

#### Protected Layout Components

```typescript
// app/(dashboard)/layout.tsx
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/login');
  }
  
  return (
    <div className="dashboard-layout">
      <DashboardSidebar user={user} />
      <main className="dashboard-content">
        {children}
      </main>
    </div>
  );
}
```

#### API Route Protection

```typescript
// Example API route with role-based access control
export async function GET(request: Request) {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  if (session.user.role !== 'admin' && session.user.role !== 'landlord') {
    return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
  }
  
  // Proceed with authorized request handling
}

## 6. State Management

The application employs a comprehensive state management strategy with multiple layers:

### 6.1 Zustand Stores

The application uses Zustand for client-side state management with several domain-specific stores:

1. **Auth Store**: User authentication state and session management
2. **User Store**: User profile and preferences
3. **Properties Store**: Property listings and details
4. **Matches Store**: Roommate matches and interactions
5. **Communities Store**: Community membership and activities
6. **Search Store**: Search parameters and results
7. **Market Config Store**: Market-specific configurations

Each store follows a similar pattern:
- State interface definition
- Actions for state manipulation
- Async operations for API interactions
- Selector hooks for consuming components

Example Zustand store implementation:

```typescript
// stores/user-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { type Database } from '@/types/database.types';

interface UserState {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  setProfile: (profile: UserProfile | null) => void;
  fetchProfile: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  clearProfile: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      profile: null,
      isLoading: false,
      error: null,
      
      setProfile: (profile) => set({ profile }),
      
      fetchProfile: async () => {
        set({ isLoading: true, error: null });
        try {
          const supabase = createClientComponentClient<Database>();
          const { data: { user } } = await supabase.auth.getUser();
          
          if (!user) {
            set({ profile: null, isLoading: false });
            return;
          }
          
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
          
          if (error) throw error;
          set({ profile: data, isLoading: false });
        } catch (error: any) {
          set({ 
            error: error instanceof Error ? error.message : 'An error occurred',
            isLoading: false 
          });
        }
      },
      
      updateProfile: async (updates) => {
        const { profile } = get();
        if (!profile) return;
        
        set({ isLoading: true, error: null });
        try {
          const supabase = createClientComponentClient<Database>();
          
          const { data, error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', profile.id)
            .select()
            .single();
          
          if (error) throw error;
          set({ profile: data, isLoading: false });
        } catch (error: any) {
          set({
            error: error instanceof Error ? error.message : 'An error occurred',
            isLoading: false
          });
        }
      },
      
      clearProfile: () => set({ profile: null, error: null }),
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ profile: state.profile }),
    }
  )
);
```

### 6.2 React Query Integration

TanStack Query is used for server state management with the following benefits:

- Cached API responses
- Automatic refetching
- Loading and error states
- Optimistic updates
- Mutation handling

Example React Query implementation:

```typescript
// hooks/use-properties.ts
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { type Database } from '@/types/database.types';

export function useProperties(filters = {}) {
  const supabase = createClientComponentClient<Database>();
  
  return useQuery({
    queryKey: ['properties', filters],
    queryFn: async () => {
      let query = supabase
        .from('properties')
        .select('*, rooms(*)');
        
      // Apply filters if present
      if (filters.location) {
        query = query.ilike('address', `%${filters.location}%`);
      }
      
      if (filters.priceMin) {
        query = query.gte('rooms.price', filters.priceMin);
      }
      
      if (filters.priceMax) {
        query = query.lte('rooms.price', filters.priceMax);
      }
      
      const { data, error } = await query;
      
      if (error) throw new Error(error.message);
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useCreateProperty() {
  const queryClient = useQueryClient();
  const supabase = createClientComponentClient<Database>();
  
  return useMutation({
    mutationFn: async (newProperty) => {
      const { data, error } = await supabase
        .from('properties')
        .insert(newProperty)
        .select()
        .single();
        
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
}
```

#### Store Integration Patterns

The application uses several patterns to integrate Zustand stores with React Query:

1. **Hydration Pattern**: Stores subscribe to query results

   ```typescript
   const { data } = useQuery({
     queryKey: ['user'],
     queryFn: fetchUserProfile,
     onSuccess: (data) => {
       useUserStore.getState().setProfile(data);
     }
   });
   ```

2. **Mutation Pattern**: Stores trigger mutations and optimistically update

   ```typescript
   const { mutate } = useMutation({
     mutationFn: updateUserProfile,
     onMutate: (variables) => {
       // Optimistically update store
       const previousState = useUserStore.getState().profile;
       useUserStore.getState().setProfile({ ...previousState, ...variables });
       return { previousState };
     },
     onError: (error, variables, context) => {
       // Revert to previous state on error
       useUserStore.getState().setProfile(context.previousState);
     }
   });
   ```

3. **Subscription Pattern**: Stores subscribe to real-time updates

   ```typescript
   useEffect(() => {
     const supabase = createClientComponentClient();
     
     const subscription = supabase
       .channel('public:messages')
       .on('postgres_changes', { 
         event: 'INSERT', 
         schema: 'public', 
         table: 'messages' 
       }, (payload) => {
         useChatStore.getState().addMessage(payload.new);
       })
       .subscribe();
       
     return () => {
       subscription.unsubscribe();
     };
   }, []);
   ```

The application also uses React's built-in hooks for local component state:

- `useState` for simple component state
- `useReducer` for complex state logic
- Custom hooks for reusable state logic

For context-specific state, the application uses React Context API:

- Theme context for dark/light mode
- Auth context for user session
- Toast context for notifications

## 10. Data Fetching

The application implements multiple data fetching patterns depending on component type:

### 10.1 Server Components

Server Components fetch data directly from the database:

```typescript
// app/(dashboard)/properties/page.tsx
import { createServerClient } from '@/lib/supabase/server';
import { PropertyList } from '@/components/properties/property-list';

export default async function PropertiesPage({ searchParams }: { searchParams: { query?: string } }) {
  const supabase = createServerClient();
  
  let query = supabase
    .from('rooms')
    .select(`
      id,
      name,
      size,
      price,
      availability,
      lease_type,
      properties(id, address, details, amenities)
    `)
    .order('created_at', { ascending: false });
  
  // Apply filters if present
  if (searchParams?.query) {
    query = query.or(`name.ilike.%${searchParams.query}%,properties.address.ilike.%${searchParams.query}%`);
  }
  
  const { data: rooms, error } = await query;
  
  if (error) {
    console.error('Error fetching rooms:', error);
    return <div>Error loading properties</div>;
  }
  
  return <PropertyList rooms={rooms} />;
}
```

#### Repository Pattern for Server Components

```typescript
// lib/repositories/property-repository.ts
import { createServerClient } from '@/lib/supabase/server';
import { type Database } from '@/types/database.types';

type Property = Database['public']['Tables']['properties']['Row'];
type PropertyCreateInput = Database['public']['Tables']['properties']['Insert'];

export const PropertyRepository = {
  async findAll(filters = {}) {
    const supabase = createServerClient();
    let query = supabase.from('properties').select('*');
    
    // Apply filters
    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    
    if (filters.owner_id) {
      query = query.eq('owner_id', filters.owner_id);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },
  
  async findById(id: string) {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('properties')
      .select('*, rooms(*)')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return data;
  },
  
  async create(property: PropertyCreateInput) {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('properties')
      .insert(property)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },
  
  async update(id: string, updates: Partial<Property>) {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('properties')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },
  
  async delete(id: string) {
    const supabase = createServerClient();
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    return true;
  },
};
```

### 10.2 Client Components

Client Components use React Query for data fetching:

```typescript
// hooks/use-properties.ts
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { type Database } from '@/types/database.types';

type PropertyFilters = {
  location?: string;
  priceMin?: number;
  priceMax?: number;
  amenities?: string[];
  status?: string;
  [key: string]: any;
};

export function useProperties(filters: PropertyFilters = {}) {
  const supabase = createClientComponentClient<Database>();
  
  return useQuery({
    queryKey: ['properties', filters],
    queryFn: async () => {
      let query = supabase
        .from('properties')
        .select('*, rooms(*)');
        
      // Apply filters
      if (filters.location) {
        query = query.ilike('address', `%${filters.location}%`);
      }
      
      if (filters.priceMin) {
        query = query.gte('rooms.price', filters.priceMin);
      }
      
      if (filters.priceMax) {
        query = query.lte('rooms.price', filters.priceMax);
      }
      
      if (filters.amenities?.length) {
        query = query.contains('amenities', filters.amenities);
      }
      
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      
      const { data, error } = await query;
      
      if (error) throw new Error(error.message);
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useCreateProperty() {
  const queryClient = useQueryClient();
  const supabase = createClientComponentClient<Database>();
  
  return useMutation({
    mutationFn: async (newProperty) => {
      const { data, error } = await supabase
        .from('properties')
        .insert(newProperty)
        .select()
        .single();
        
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });
}

export function useUpdateProperty() {
  const queryClient = useQueryClient();
  const supabase = createClientComponentClient<Database>();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }) => {
      const { data, error } = await supabase
        .from('properties')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      queryClient.invalidateQueries({ queryKey: ['property', data.id] });
    },
  });
}
```

#### Client Component Data Usage

```tsx
// components/properties/property-list.client.tsx
'use client';

import { useState } from 'react';
import { useProperties } from '@/hooks/use-properties';
import { PropertyCard } from '@/components/properties/property-card';
import { PropertyFilter } from '@/components/properties/property-filter';
import { Button } from '@/components/ui/button';

export function PropertyListClient() {
  const [filters, setFilters] = useState({});
  const { data, isLoading, error } = useProperties(filters);
  
  if (isLoading) {
    return <PropertyListSkeleton />;
  }
  
  if (error) {
    return <div>Error loading properties: {error.message}</div>;
  }
  
  return (
    <div>
      <PropertyFilter 
        onFilterChange={setFilters} 
        currentFilters={filters} 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {data.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
        
        {data.length === 0 && (
          <div className="col-span-full text-center py-12">
            <h3 className="text-lg font-medium mb-2">No properties found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your filters</p>
            <Button onClick={() => setFilters({})}>Clear Filters</Button>
          </div>
        )}
      </div>
    </div>
  );
}
```

#### Real-time Subscriptions

For real-time data, the application uses Supabase Realtime:

```tsx
// hooks/use-realtime-messages.ts
'use client';

import { useState, useEffect, useRef } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { type Database } from '@/types/database.types';

type Message = Database['public']['Tables']['chat_messages']['Row'];

export function useRealtimeMessages(conversationId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const supabase = createClientComponentClient<Database>();
  const currentUser = useRef(null);
  
  useEffect(() => {
    // Get current user
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      currentUser.current = user?.id;
    };
    
    getCurrentUser();
    
    // Initial load of messages
    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('chat_messages')
          .select('*')
          .eq('conversation_id', conversationId)
          .order('created_at');
        
        if (error) throw error;
        if (data) setMessages(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch messages'));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMessages();
    
    // Subscribe to new messages
    const messageSubscription = supabase
      .channel(`chat:${conversationId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'chat_messages',
        filter: `conversation_id=eq.${conversationId}`
      }, (payload) => {
        setMessages(current => [...current, payload.new as Message]);
      })
      .subscribe();
      
    // Subscribe to typing indicators
    const typingSubscription = supabase
      .channel(`typing:${conversationId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'chat_typing_status',
        filter: `conversation_id=eq.${conversationId}`
      }, (payload) => {
        if (payload.new.user_id !== currentUser.current) {
          setIsTyping(payload.new.is_typing);
        }
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(messageSubscription);
      supabase.removeChannel(typingSubscription);
    };
  }, [conversationId, supabase]);
  
  // Update typing status
  const updateTypingStatus = (isTyping: boolean) => {
    if (!currentUser.current) return;
    
    supabase
      .from('chat_typing_status')
      .upsert({
        conversation_id: conversationId,
        user_id: currentUser.current,
        is_typing: isTyping,
        last_updated: new Date().toISOString()
      })
      .then(() => {
        // Handle status update if needed
      });
  };
  
  // Send message
  const sendMessage = async (content: string) => {
    if (!currentUser.current) return;
    
    try {
      // Set typing to false when sending a message
      updateTypingStatus(false);
      
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          conversation_id: conversationId,
          sender_id: currentUser.current,
          content
        });
        
      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to send message'));
      throw err;
    }
  };
  
  return { 
    messages, 
    isLoading,
    error,
    isTyping, 
    sendMessage,
    setTyping: updateTypingStatus
  };
}
```

## 11. API Routes

The application implements REST API routes using Next.js Route Handlers:

### API Structure

API routes follow RESTful conventions:

- `GET /api/properties` - List properties
- `POST /api/properties` - Create property
- `GET /api/properties/{id}` - Get property details
- `PUT /api/properties/{id}` - Update property
- `DELETE /api/properties/{id}` - Delete property

### Route Implementation

```typescript
// app/api/properties/route.ts
import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { getSession } from '@/lib/auth';
import { propertySchema } from '@/lib/validations/property';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10;
  const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0;
  const status = searchParams.get('status') || 'active';
  
  const supabase = createServerClient();
  
  const { data, error, count } = await supabase
    .from('properties')
    .select('*, rooms(*)', { count: 'exact' })
    .eq('status', status)
    .range(offset, offset + limit - 1);
  
  if (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({
    data,
    pagination: {
      limit,
      offset,
      total: count || 0,
    },
  });
}

export async function POST(request: Request) {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const body = await request.json();
    
    // Validate request body
    const result = propertySchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({
        error: 'Invalid request body',
        details: result.error.format(),
      }, { status: 400 });
    }
    
    const supabase = createServerClient();
    
    // Add owner_id from authenticated user
    const { data, error } = await supabase
      .from('properties')
      .insert({
        ...result.data,
        owner_id: session.user.id,
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating property:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'An error occurred'
    }, { status: 500 });
  }
}
```

### Dynamic Route Handlers

```typescript
// app/api/properties/[id]/route.ts
import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { getSession } from '@/lib/auth';
import { propertyUpdateSchema } from '@/lib/validations/property';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from('properties')
    .select('*, rooms(*)')
    .eq('id', params.id)
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }
    
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ data });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const body = await request.json();
    
    // Validate request body
    const result = propertyUpdateSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({
        error: 'Invalid request body',
        details: result.error.format(),
      }, { status: 400 });
    }
    
    const supabase = createServerClient();
    
    // Check ownership
    const { data: property, error: fetchError } = await supabase
      .from('properties')
      .select('owner_id')
      .eq('id', params.id)
      .single();
    
    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return NextResponse.json({ error: 'Property not found' }, { status: 404 });
      }
      
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }
    
    // Verify ownership or admin role
    if (property.owner_id !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    // Update property
    const { data, error } = await supabase
      .from('properties')
      .update(result.data)
      .eq('id', params.id)
      .select()
      .single();
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'An error occurred'
    }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const supabase = createServerClient();
  
  // Check ownership
  const { data: property, error: fetchError } = await supabase
    .from('properties')
    .select('owner_id')
    .eq('id', params.id)
    .single();
  
  if (fetchError) {
    if (fetchError.code === 'PGRST116') {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }
    
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }
  
  // Verify ownership or admin role
  if (property.owner_id !== session.user.id && session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  
  // Delete property
  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', params.id);
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json(null, { status: 204 });
}
```

### API Response Format

The application uses a consistent API response format:

```json
// Success response
{
  "data": [...],
  "pagination": {
    "limit": 10,
    "offset": 0,
    "total": 100
  }
}

// Error response
{
  "error": "Error message",
  "details": {
    "fieldName": {
      "_errors": ["Validation error message"]
    }
  }
}
```

### Input Validation

API routes use Zod schemas for request validation:

```typescript
// lib/validations/property.ts
import { z } from 'zod';

export const propertySchema = z.object({
  address: z.string().min(5, 'Address must be at least 5 characters').max(255),
  details: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    type: z.string().optional(),
    year_built: z.number().optional(),
    neighborhood: z.string().optional(),
    public_transport: z.string().optional(),
    nearby: z.string().optional(),
  }).optional(),
  amenities: z.array(z.string()).default([]),
  status: z.enum(['active', 'pending', 'inactive']).default('active'),
  market_code: z.string().optional(),
});

export const propertyUpdateSchema = propertySchema.partial();
```

## 12. Internationalization (i18n)

The application implements comprehensive internationalization using next-intl:

### Language Support

The application supports multiple languages:

- English (en) - Primary language
- French (fr)
- Spanish (es)
- German (de)
- Italian (it)
- Polish (pl)
- Portuguese (pt)

### Translation Files

JSON-based translation files in `src/lib/i18n/locales/`:

```
src/lib/i18n/locales/
├── de.json
├── en.json
├── es.json
├── fr.json
├── it.json
├── pl.json
└── pt.json
```

Example translation file (`en.json`):

```json
{
  "common": {
    "welcome": "Welcome to MyRoomie",
    "login": "Login",
    "signup": "Sign Up",
    "logout": "Logout",
    "search": "Search",
    "notFound": "Not Found"
  },
  "auth": {
    "emailLabel": "Email",
    "passwordLabel": "Password",
    "forgotPassword": "Forgot Password?",
    "newAccount": "Don't have an account? Sign up",
    "existingAccount": "Already have an account? Login"
  },
  "properties": {
    "title": "Properties",
    "search": "Search Properties",
    "filters": "Filters",
    "price": "Price",
    "location": "Location",
    "amenities": "Amenities"
  },
  "profile": {
    "title": "Profile",
    "edit": "Edit Profile",
    "preferences": "Preferences",
    "matches": "Matches",
    "communities": "Communities"
  }
}
```

### Implementation with next-intl

Configuration in `middleware.ts`:

```typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const locales = ['en', 'fr', 'es', 'de', 'it', 'pl', 'pt'];
const defaultLocale = 'en';

function getLocale(request: NextRequest) {
  // Check if there's a cookie with a language preference
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) return cookieLocale;
  
  // Get locale from Accept-Language header
  const headers = new Headers(request.headers);
  const acceptLanguage = headers.get('accept-language') || '';
  
  // Use negotiator to match the best locale
  const negotiator = new Negotiator({ headers: { 'accept-language': acceptLanguage } });
  try {
    return match(negotiator.languages(), locales, defaultLocale);
  } catch (error) {
    return defaultLocale;
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip for static assets and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }
  
  // Get locale from request
  const locale = getLocale(request);
  
  // Redirect if pathname doesn't start with locale
  if (!pathname.startsWith(`/${locale}`)) {
    // Build the new pathname with locale
    const newPathname = `/${locale}${pathname}`;
    const newUrl = new URL(newPathname, request.url);
    
    // Preserve search params
    newUrl.search = request.nextUrl.search;
    
    return NextResponse.redirect(newUrl);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

Integration with Next.js App Router:

```typescript
// app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'fr' },
    { locale: 'es' },
    { locale: 'de' },
    { locale: 'it' },
    { locale: 'pl' },
    { locale: 'pt' },
  ];
}

async function getMessages(locale: string) {
  try {
    return (await import(`@/lib/i18n/locales/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages(locale);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

Usage in components:

```tsx
'use client';

import { useTranslations } from 'next-intl';

export function WelcomeMessage() {
  const t = useTranslations('common');
  
  return (
    <h1>{t('welcome')}</h1>
  );
}
```

### Language Switcher

```tsx
// components/i18n/language-selector.client.tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
  { code: 'pl', name: 'Polski' },
  { code: 'pt', name: 'Português' },
];

export function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  
  const handleLanguageChange = (newLocale: string) => {
    // Get the current pathname without the locale prefix
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    
    // Navigate to the same page with the new locale
    router.push(`/${newLocale}${pathWithoutLocale}`);
    
    // Set cookie for next requests
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 30}`;
  };
  
  return (
    <Select value={locale} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-32">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            {language.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
```

## 13. Progressive Web App (PWA)

The application is configured as a Progressive Web App for enhanced mobile experience:

### PWA Configuration

The application uses `next-pwa` to enable PWA features:

```typescript
// next.config.ts
import withPWA from 'next-pwa';

const nextConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  sw: 'service-worker.js',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts',
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
        },
      },
    },
    {
      urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-font-assets',
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
        },
      },
    },
    {
      urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-image-assets',
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
      },
    },
    {
      urlPattern: /\.(?:js)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-js-assets',
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
      },
    },
    {
      urlPattern: /\.(?:css|less)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-style-assets',
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
      },
    },
    {
      urlPattern: /\/_next\/data\/.+\/.+\.json$/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'next-data',
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
      },
    },
    {
      urlPattern: /\.(?:json|xml|csv)$/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'static-data-assets',
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
      },
    },
    {
      urlPattern: ({ url }) => {
        const isSameOrigin = self.origin === url.origin;
        return isSameOrigin && url.pathname.startsWith('/api/');
      },
      handler: 'NetworkFirst',
      method: 'GET',
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 10 * 60, // 10 minutes
        },
        networkTimeoutSeconds: 10,
      },
    },
    {
      urlPattern: /.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'others',
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
        networkTimeoutSeconds: 10,
      },
    },
  ],
});

export default nextConfig;
```

### Web App Manifest

```json
// public/manifest.json
{
  "name": "MyRoomie - Living as a Service",
  "short_name": "MyRoomie",
  "description": "Find your perfect roommate and living space",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2563EB",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

### Offline Experience

The application provides an offline fallback page for no connectivity:

```tsx
// app/offline/page.tsx
import Link from 'next/link';
import { WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <WifiOff className="h-16 w-16 text-gray-400 mb-6" />
      <h1 className="text-3xl font-bold mb-2">You're offline</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        It looks like you're not connected to the internet. Some features may be unavailable
        until you reconnect.
      </p>
      <Button asChild>
        <Link href="/">Try Again</Link>
      </Button>
    </div>
  );
}
```

### Installation Prompt

```tsx
// components/pwa/install-prompt.client.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export function InstallPrompt() {
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  
  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
      setShowPrompt(true);
    };
    
    window.addEventListener('beforeinstallprompt', handler);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);
  
  const handleInstall = async () => {
    if (!installPrompt) return;
    
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
  };
  
  if (!showPrompt) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white p-4 rounded-lg shadow-lg border max-w-xs">
      <h3 className="font-medium mb-2">Install MyRoomie</h3>
      <p className="text-sm text-gray-600 mb-4">
        Add MyRoomie to your home screen for a better experience.
      </p>
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => setShowPrompt(false)}>
          Not Now
        </Button>
        <Button size="sm" onClick={handleInstall}>
          <Download className="h-4 w-4 mr-2" />
          Install
        </Button>
      </div>
    </div>
  );
}
```

## 14. Feature Implementations

### 14.1 Roommate Matching System

The roommate matching system implements a sophisticated compatibility algorithm based on multiple factors:

#### Matching Data Points

- **Personal Information**: Basic demographic information
- **Lifestyle Preferences**: Cleanliness, noise tolerance, guest frequency, waking hours
- **Personality Traits**: Introversion/extroversion, planning style, emotional expressiveness
- **Housing Preferences**: Budget range, location, lease duration, room type

#### Compatibility Calculation

The matching algorithm in the API routes calculates compatibility scores between users:

```typescript
// lib/matching/compatibility.ts
export interface MatchPreferences {
  lifestyle: LifestylePreferences;
  personality: PersonalityTraits;
  locations: string[];
  budget: BudgetRange;
}

export function calculateCompatibilityScore(user1Prefs: MatchPreferences, user2Prefs: MatchPreferences): number {
  // Weighted scoring system between 0-100
  let score = 0;
  const weights = {
    lifestyle: 0.4,   // 40% of total score
    personality: 0.3, // 30% of total score
    location: 0.2,    // 20% of total score
    budget: 0.1       // 10% of total score
  };

  // Calculate lifestyle compatibility
  const lifestyleScore = calculateLifestyleCompatibility(user1Prefs.lifestyle, user2Prefs.lifestyle);
  
  // Calculate personality compatibility
  const personalityScore = calculatePersonalityCompatibility(user1Prefs.personality, user2Prefs.personality);
  
  // Location preference overlap
  const locationScore = calculateLocationOverlap(user1Prefs.locations, user2Prefs.locations);
  
  // Budget compatibility
  const budgetScore = calculateBudgetCompatibility(user1Prefs.budget, user2Prefs.budget);
  
  // Weighted sum
  score = (lifestyleScore * weights.lifestyle) +
          (personalityScore * weights.personality) +
          (locationScore * weights.location) +
          (budgetScore * weights.budget);
          
  return Math.round(score);
}

function calculateLifestyleCompatibility(lifestyle1: LifestylePreferences, lifestyle2: LifestylePreferences): number {
  // Implementation for lifestyle compatibility based on:
  // - Cleanliness compatibility (exact match = 100, adjacent level = 75, etc.)
  // - Sleeping hours overlap
  // - Noise tolerance
  // - Smoking/pets/guest preferences
  // Returns a score from 0-100
}

function calculatePersonalityCompatibility(personality1: PersonalityTraits, personality2: PersonalityTraits): number {
  // Implementation for personality compatibility based on:
  // - Complementary traits
  // - Shared values
  // - Communication styles
  // Returns a score from 0-100
}

function calculateLocationOverlap(locations1: string[], locations2: string[]): number {
  // Implementation for location compatibility:
  // - Count shared locations
  // - Normalized by total unique locations
  // Returns a score from 0-100
}

function calculateBudgetCompatibility(budget1: BudgetRange, budget2: BudgetRange): number {
  // Implementation for budget compatibility:
  // - Calculate overlap percentage of budget ranges
  // Returns a score from 0-100
}
```

#### Match Status Flow

Matches go through several states:

1. `pending`: Initial match suggestion
2. `accepted`: User has accepted the match
3. `mutual`: Both users have accepted the match
4. `rejected`: User has rejected the match
5. `expired`: Match was not acted upon within timeframe

```typescript
// app/api/matches/[id]/route.ts
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const body = await request.json();
    const { status } = body;
    
    if (!['accepted', 'rejected'].includes(status)) {
      return NextResponse.json({
        error: 'Invalid status. Must be "accepted" or "rejected"'
      }, { status: 400 });
    }
    
    const supabase = createServerClient();
    
    // Get the match
    const { data: match, error: fetchError } = await supabase
      .from('matches')
      .select('*')
      .eq('id', params.id)
      .single();
    
    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return NextResponse.json({ error: 'Match not found' }, { status: 404 });
      }
      
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }
    
    // Verify user is part of the match
    if (match.user1_id !== session.user.id && match.user2_id !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    // Update match status
    let updateData: any = {};
    
    if (match.user1_id === session.user.id) {
      updateData.user1_status = status;
    } else {
      updateData.user2_status = status;
    }
    
    // Check if match is mutual (both accepted)
    if (status === 'accepted') {
      if (
        (match.user1_id === session.user.id && match.user2_status === 'accepted') ||
        (match.user2_id === session.user.id && match.user1_status === 'accepted')
      ) {
        updateData.status = 'mutual';
        
        // Create a conversation for mutual matches
        const { data: conversation, error: conversationError } = await supabase
          .from('chat_conversations')
          .insert({ match_id: match.id })
          .select()
          .single();
        
        if (conversationError) {
          console.error('Error creating conversation:', conversationError);
        }
      }
    } else if (status === 'rejected') {
      // If either user rejects, the match is rejected
      updateData.status = 'rejected';
    }
    
    const { data, error } = await supabase
      .from('matches')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single();
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'An error occurred'
    }, { status: 500 });
  }
}
```

### 14.2 User Onboarding Workflow

The onboarding process is implemented as a multi-step wizard with progressive data collection:

#### Wizard Implementation

The `profile-wizard.client.tsx` component implements a comprehensive onboarding flow with:

- Five distinct steps (personal info, housing, lifestyle, personality, verification)
- Step-specific validation schemas using Zod
- Persistent state using Zustand with localStorage
- File upload for profile images
- Complex form state management with React Hook Form

```typescript
// components/onboarding/profile-wizard.client.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useProfileWizardStore } from '@/stores/profile-wizard-store';
import { 
  personalInfoSchema, 
  housingPreferencesSchema,
  lifestylePreferencesSchema,
  personalityTraitsSchema,
  verificationSchema
} from '@/lib/validations/profile-wizard';

const steps = [
  { id: 'personalInfo', title: 'Personal Information', schema: personalInfoSchema },
  { id: 'housingPreferences', title: 'Housing Preferences', schema: housingPreferencesSchema },
  { id: 'lifestylePreferences', title: 'Lifestyle', schema: lifestylePreferencesSchema },
  { id: 'personalityTraits', title: 'Personality', schema: personalityTraitsSchema },
  { id: 'verification', title: 'Verification', schema: verificationSchema },
];

export function ProfileWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const currentStepData = steps[currentStep];
  
  const { 
    formData, 
    updateFormData, 
    completedSteps, 
    markStepCompleted,
    resetWizard
  } = useProfileWizardStore();
  
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(currentStepData.schema),
    defaultValues: formData[currentStepData.id] || {},
  });
  
  // Load saved data when step changes
  useEffect(() => {
    reset(formData[currentStepData.id] || {});
  }, [currentStep, formData, reset, currentStepData.id]);
  
  const handleNextStep = async (data: any) => {
    // Update form data in store
    updateFormData({
      [currentStepData.id]: data
    });
    
    // Mark current step as completed
    markStepCompleted(currentStepData.id);
    
    // If last step, save all data
    if (currentStep === steps.length - 1) {
      await saveAllData();
    } else {
      // Move to next step
      setCurrentStep(currentStep + 1);
      
      // Reset form with data for the next step
      const nextStepId = steps[currentStep + 1].id;
      reset(formData[nextStepId] || {});
    }
  };
  
  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const saveAllData = async () => {
    try {
      // Implementation to save all data to the backend
      // This would create/update the user profile
      // and then redirect to the dashboard

      router.push('/dashboard');
    } catch (error) {
      console.error('Error saving profile data:', error);
    }
  };
  
  // Render different form fields based on current step
  const renderStepFields = () => {
    switch (currentStepData.id) {
      case 'personalInfo':
        return (
          // Personal info form fields
        );
      case 'housingPreferences':
        return (
          // Housing preferences form fields
        );
      case 'lifestylePreferences':
        return (
          // Lifestyle preferences form fields
        );
      case 'personalityTraits':
        return (
          // Personality traits form fields
        );
      case 'verification':
        return (
          // Verification form fields
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className={`flex-1 text-center ${
                index < currentStep 
                  ? 'text-blue-600' 
                  : index === currentStep 
                  ? 'text-blue-800 font-medium' 
                  : 'text-gray-400'
              }`}
            >
              {step.title}
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all" 
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit(handleNextStep)}>
        <h2 className="text-2xl font-bold mb-6">{currentStepData.title}</h2>
        
        {renderStepFields()}
        
        <div className="flex justify-between mt-8">
          <Button
            type="button"
            variant="outline"
            onClick={handlePreviousStep}
            disabled={currentStep === 0}
          >
            Back
          </Button>
          
          <Button type="submit">
            {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
          </Button>
        </div>
      </form>
    </div>
  );
}
```

#### Data Persistence

The onboarding data is saved to multiple Supabase tables:

- User profile in `profiles` table
- Preferences in `user_preferences` table
- Verification status in `user_verifications` table

```typescript
// stores/profile-wizard-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProfileWizardState {
  formData: Record<string, any>;
  completedSteps: string[];
  updateFormData: (newData: Record<string, any>) => void;
  markStepCompleted: (stepId: string) => void;
  resetWizard: () => void;
}

export const useProfileWizardStore = create<ProfileWizardState>()(
  persist(
    (set) => ({
      formData: {},
      completedSteps: [],
      
      updateFormData: (newData) => set((state) => ({
        formData: { ...state.formData, ...newData }
      })),
      
      markStepCompleted: (stepId) => set((state) => ({
        completedSteps: state.completedSteps.includes(stepId)
          ? state.completedSteps
          : [...state.completedSteps, stepId]
      })),
      
      resetWizard: () => set({ formData: {}, completedSteps: [] }),
    }),
    {
      name: 'profile-wizard-storage',
    }
  )
);
```

### 14.3 Financial Management

The application includes sophisticated financial tools for shared living expenses:

#### Expense Splitting

The `expense-calculator.client.tsx` component implements three splitting methods:

1. **Equal Split**: Divides expenses equally among participants
2. **Proportional Split**: Assigns expenses based on predefined ratios
3. **Custom Split**: Allows manual entry of individual amounts

```typescript
// components/finance/expense-calculator.client.tsx
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { z } from 'zod';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePicker } from '@/components/ui/date-picker';
import { type Database } from '@/types/database.types';

const expenseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  currency: z.string().min(1, 'Currency is required'),
  category: z.string().min(1, 'Category is required'),
  splitType: z.enum(['equal', 'proportional', 'custom']),
});

type ExpenseFormValues = z.infer<typeof expenseSchema>;

interface ExpenseCalculatorProps {
  propertyId: string;
}

export function ExpenseCalculator({ propertyId }: ExpenseCalculatorProps) {
  const supabase = createClientComponentClient<Database>();
  const queryClient = useQueryClient();
  
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
  const [splitType, setSplitType] = useState<'equal' | 'proportional' | 'custom'>('equal');
  const [proportions, setProportions] = useState<Record<string, number>>({});
  const [customAmounts, setCustomAmounts] = useState<Record<string, number>>({});
  const [dueDate, setDueDate] = useState<Date | null>(null);
  
  // Fetch property members
  const { data: members, isLoading: membersLoading } = useQuery({
    queryKey: ['propertyMembers', propertyId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('property_members')
        .select('*, profiles(id, name, email, profile_image_url)')
        .eq('property_id', propertyId);
        
      if (error) throw new Error(error.message);
      return data;
    },
  });
  
  // Create expense mutation
  const createExpense = useMutation({
    mutationFn: async (expenseData: any) => {
      const { data, error } = await supabase
        .from('expense_splits')
        .insert(expenseData)
        .select('*')
        .single();
        
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses', propertyId] });
      // Reset form
      reset();
      setSelectedMemberIds([]);
      setProportions({});
      setCustomAmounts({});
      setDueDate(null);
    },
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      title: '',
      description: '',
      amount: 0,
      currency: 'EUR',
      category: 'rent',
      splitType: 'equal',
    },
  });
  
  const amount = watch('amount');
  
  // Update equal splits when amount or selected members change
  useEffect(() => {
    if (splitType === 'equal' && selectedMemberIds.length > 0 && amount) {
      const equalAmount = amount / selectedMemberIds.length;
      const newCustomAmounts = Object.fromEntries(
        selectedMemberIds.map(id => [id, equalAmount])
      );
      setCustomAmounts(newCustomAmounts);
    }
  }, [amount, selectedMemberIds, splitType]);
  
  // Calculate amounts based on proportions
  useEffect(() => {
    if (splitType === 'proportional' && Object.keys(proportions).length > 0 && amount) {
      const totalProportion = Object.values(proportions).reduce((sum, value) => sum + value, 0);
      if (totalProportion > 0) {
        const newCustomAmounts = Object.fromEntries(
          Object.entries(proportions).map(([id, proportion]) => [
            id, (proportion / totalProportion) * amount
          ])
        );
        setCustomAmounts(newCustomAmounts);
      }
    }
  }, [proportions, amount, splitType]);
  
  const handleMemberToggle = (memberId: string, checked: boolean) => {
    setSelectedMemberIds(prev => {
      if (checked) {
        return [...prev, memberId];
      } else {
        return prev.filter(id => id !== memberId);
      }
    });
    
    // Also update proportions and custom amounts
    if (!checked) {
      setProportions(prev => {
        const { [memberId]: _, ...rest } = prev;
        return rest;
      });
      
      setCustomAmounts(prev => {
        const { [memberId]: _, ...rest } = prev;
        return rest;
      });
    } else if (splitType === 'proportional') {
      // Add default proportion of 1
      setProportions(prev => ({
        ...prev,
        [memberId]: 1,
      }));
    } else if (splitType === 'custom') {
      // Add default amount of 0
      setCustomAmounts(prev => ({
        ...prev,
        [memberId]: 0,
      }));
    }
  };
  
  const handleProportionChange = (memberId: string, value: number) => {
    setProportions(prev => ({
      ...prev,
      [memberId]: value,
    }));
  };
  
  const handleCustomAmountChange = (memberId: string, value: number) => {
    setCustomAmounts(prev => ({
      ...prev,
      [memberId]: value,
    }));
  };
  
  const handleSplitTypeChange = (value: 'equal' | 'proportional' | 'custom') => {
    setSplitType(value);
    
    if (value === 'equal' && selectedMemberIds.length > 0 && amount) {
      // Reset to equal distribution
      const equalAmount = amount / selectedMemberIds.length;
      const newCustomAmounts = Object.fromEntries(
        selectedMemberIds.map(id => [id, equalAmount])
      );
      setCustomAmounts(newCustomAmounts);
    } else if (value === 'proportional') {
      // Set default proportions of 1 for all selected members
      const newProportions = Object.fromEntries(
        selectedMemberIds.map(id => [id, 1])
      );
      setProportions(newProportions);
    }
  };
  
  const onSubmit = async (data: ExpenseFormValues) => {
    if (selectedMemberIds.length === 0) {
      // Show error: need to select at least one member
      return;
    }
    
    // Prepare participants data based on split type
    let participants = [];
    
    if (splitType === 'custom') {
      participants = selectedMemberIds.map(id => ({
        user_id: id,
        amount: customAmounts[id] || 0
      }));
    } else if (splitType === 'proportional') {
      participants = selectedMemberIds.map(id => ({
        user_id: id,
        proportion: proportions[id] || 0
      }));
    } else {
      // Equal split
      participants = selectedMemberIds.map(id => ({
        user_id: id
      }));
    }
    
    await createExpense.mutateAsync({
      property_id: propertyId,
      title: data.title,
      description: data.description || null,
      total_amount: data.amount,
      currency: data.currency,
      category: data.category,
      due_date: dueDate ? format(dueDate, 'yyyy-MM-dd') : null,
      split_type: splitType,
      participants
    });
  };
  
  if (membersLoading) {
    return <div>Loading members...</div>;
  }
  
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-6">Create New Expense</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic expense information fields */}
        {/* ... */}
        
        {/* Split type selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Split Type</label>
          <Select
            value={splitType}
            onValueChange={(value: any) => handleSplitTypeChange(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select split type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="equal">Equal Split</SelectItem>
              <SelectItem value="proportional">Proportional Split</SelectItem>
              <SelectItem value="custom">Custom Split</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Member selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Members</label>
          <div className="space-y-2">
            {members?.map(member => (
              <div key={member.profiles.id} className="flex items-center">
                <Checkbox
                  id={`member-${member.profiles.id}`}
                  checked={selectedMemberIds.includes(member.profiles.id)}
                  onCheckedChange={(checked) => handleMemberToggle(member.profiles.id, checked as boolean)}
                />
                <label htmlFor={`member-${member.profiles.id}`} className="ml-2 text-sm">
                  {member.profiles.name || member.profiles.email}
                </label>
                
                {/* Show proportion input for proportional split */}
                {splitType === 'proportional' && selectedMemberIds.includes(member.profiles.id) && (
                  <div className="ml-auto flex items-center">
                    <Input
                      type="number"
                      min="0"
                      value={proportions[member.profiles.id] || 0}
                      onChange={(e) => handleProportionChange(member.profiles.id, parseFloat(e.target.value) || 0)}
                      className="w-24"
                    />
                    <span className="ml-2">parts</span>
                  </div>
                )}
                
                {/* Show custom amount input for custom split */}
                {splitType === 'custom' && selectedMemberIds.includes(member.profiles.id) && (
                  <div className="ml-auto flex items-center">
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={customAmounts[member.profiles.id] || 0}
                      onChange={(e) => handleCustomAmountChange(member.profiles.id, parseFloat(e.target.value) || 0)}
                      className="w-24"
                    />
                    <span className="ml-2">€</span>
                  </div>
                )}
                
                {/* Show calculated equal amount for equal split */}
                {splitType === 'equal' && selectedMemberIds.includes(member.profiles.id) && selectedMemberIds.length > 0 && (
                  <div className="ml-auto">
                    <span>{(amount / selectedMemberIds.length).toFixed(2)} €</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Summary */}
        <div className="border-t pt-4">
          <h3 className="font-medium mb-2">Summary</h3>
          <div className="space-y-1">
            {selectedMemberIds.map(id => {
              const member = members?.find(m => m.profiles.id === id);
              return (
                <div key={id} className="flex justify-between">
                  <span>{member?.profiles.name || member?.profiles.email}</span>
                  <span>
                    {customAmounts[id]?.toFixed(2) || '0.00'} €
                  </span>
                </div>
              );
            })}
            {selectedMemberIds.length > 0 && (
              <div className="flex justify-between font-medium border-t pt-1">
                <span>Total</span>
                <span>
                  {Object.values(customAmounts).reduce((sum, value) => sum + value, 0).toFixed(2)} €
                </span>
              </div>
            )}
          </div>
        </div>
        
        <Button type="submit" className="w-full">Create Expense</Button>
      </form>
    </div>
  );
}
```

#### Database Triggers

The application uses PostgreSQL database functions to calculate expense shares:

```sql
-- Function to calculate equal expense shares
CREATE OR REPLACE FUNCTION calculate_equal_expense_shares()
RETURNS TRIGGER AS $
DECLARE
  share_amount DECIMAL;
  participant RECORD;
BEGIN
  -- Calculate equal share amount
  SELECT NEW.total_amount / array_length(NEW.participants, 1) INTO share_amount;
  
  -- Create expense shares for each participant
  FOR participant IN SELECT * FROM unnest(NEW.participants) AS p
  LOOP
    INSERT INTO expense_shares (
      expense_id,
      user_id,
      amount,
      status,
      created_at,
      updated_at
    ) VALUES (
      NEW.id,
      participant.user_id,
      share_amount,
      'pending',
      NOW(),
      NOW()
    );
  END LOOP;
  
  RETURN NEW;
END;
$ LANGUAGE plpgsql;

-- Trigger to automatically calculate shares after expense creation
CREATE TRIGGER calculate_expense_shares_trigger
AFTER INSERT ON expense_splits
FOR EACH ROW
WHEN (NEW.split_type = 'equal')
EXECUTE FUNCTION calculate_equal_expense_shares();
```

#### Security Deposit Management

The `security-deposit-manager.client.tsx` component handles full deposit lifecycle:

1. Deposit collection when tenancy begins
2. Tracking deposit status during tenancy
3. Return calculation including withholdings
4. Return processing with reason documentation

### 14.4 Community Features

The communities feature provides social networking for residents:

#### Community Store

The `communities-store.ts` module manages:

- Community membership
- Event organization
- Discussion posts
- Private vs. public communities
- Property-specific communities

```typescript
// stores/communities-store.ts
'use client';

import { create } from 'zustand';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { type Database } from '@/types/database.types';

type Community = Database['public']['Tables']['communities']['Row'] & {
  creator?: {
    id: string;
    name: string;
    email: string;
    profile_image_url?: string;
  };
};

type CommunityMember = Database['public']['Tables']['community_members']['Row'] & {
  profiles?: {
    id: string;
    name: string;
    email: string;
    profile_image_url?: string;
  };
};

type CommunityEvent = Database['public']['Tables']['community_events']['Row'];

interface CommunitiesState {
  communities: Community[];
  selectedCommunity: Community | null;
  members: CommunityMember[];
  events: CommunityEvent[];
  posts: any[];
  isLoading: boolean;
  error: string | null;
  
  fetchCommunities: () => Promise<void>;
  fetchCommunityById: (id: string) => Promise<void>;
  fetchMembers: (communityId: string) => Promise<void>;
  fetchEvents: (communityId: string) => Promise<void>;
  fetchPosts: (communityId: string) => Promise<void>;
  
  createCommunity: (communityData: Partial<Community>) => Promise<Community>;
  updateCommunity: (id: string, updates: Partial<Community>) => Promise<void>;
  joinCommunity: (communityId: string, role?: string) => Promise<void>;
  leaveCommunity: (communityId: string) => Promise<void>;
  
  createEvent: (communityId: string, eventData: Partial<CommunityEvent>) => Promise<void>;
  createPost: (communityId: string, content: string) => Promise<void>;
}

export const useCommunitiesStore = create<CommunitiesState>((set, get) => ({
  communities: [],
  selectedCommunity: null,
  members: [],
  events: [],
  posts: [],
  isLoading: false,
  error: null,
  
  fetchCommunities: async () => {
    set({ isLoading: true, error: null });
    try {
      const supabase = createClientComponentClient<Database>();
      
      const { data, error } = await supabase
        .from('communities')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw new Error(error.message);
      }
      
      set({ communities: data as Community[], isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false
      });
    }
  },
  
  fetchCommunityById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const supabase = createClientComponentClient<Database>();

      // Fetch a single community with creator information
      const { data, error } = await supabase
        .from('communities')
        .select(`
          *,
          creator:profiles(id, name, email, profile_image_url)
        `)
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      set({ selectedCommunity: data as Community, isLoading: false });

      // Also fetch members, events, and posts
      get().fetchMembers(id);
      get().fetchEvents(id);
      get().fetchPosts(id);
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false
      });
    }
  },
  
  fetchMembers: async (communityId: string) => {
    try {
      const supabase = createClientComponentClient<Database>();
      
      const { data, error } = await supabase
        .from('community_members')
        .select(`
          *,
          profiles(id, name, email, profile_image_url)
        `)
        .eq('community_id', communityId);
      
      if (error) {
        throw new Error(error.message);
      }
      
      set({ members: data as CommunityMember[] });
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  },
  
  fetchEvents: async (communityId: string) => {
    try {
      const supabase = createClientComponentClient<Database>();
      
      const { data, error } = await supabase
        .from('community_events')
        .select('*')
        .eq('community_id', communityId)
        .order('start_time', { ascending: true });
      
      if (error) {
        throw new Error(error.message);
      }
      
      set({ events: data });
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  },
  
  fetchPosts: async (communityId: string) => {
    try {
      const supabase = createClientComponentClient<Database>();
      
      const { data, error } = await supabase
        .from('community_posts')
        .select(`
          *,
          author:profiles(id, name, email, profile_image_url)
        `)
        .eq('community_id', communityId)
        .order('created_at', { ascending: false });
      
      if (error) {
        throw new Error(error.message);
      }
      
      set({ posts: data });
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  },
  
  createCommunity: async (communityData: Partial<Community>) => {
    set({ isLoading: true, error: null });
    try {
      const supabase = createClientComponentClient<Database>();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('You must be logged in to create a community');
      }
      
      const { data, error } = await supabase
        .from('communities')
        .insert({
          ...communityData,
          creator_id: user.id,
        })
        .select()
        .single();
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Add creator as member with 'admin' role
      await supabase
        .from('community_members')
        .insert({
          community_id: data.id,
          user_id: user.id,
          role: 'admin',
        });
      
      // Update communities list
      set(state => ({
        communities: [data as Community, ...state.communities],
        isLoading: false
      }));
      
      return data as Community;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false
      });
      throw error;
    }
  },
  
  updateCommunity: async (id: string, updates: Partial<Community>) => {
    set({ isLoading: true, error: null });
    try {
      const supabase = createClientComponentClient<Database>();
      
      const { data, error } = await supabase
        .from('communities')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Update selected community and communities list
      set(state => ({
        selectedCommunity: data as Community,
        communities: state.communities.map(c =>
          c.id === id ? { ...c, ...updates } : c
        ),
        isLoading: false
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false
      });
    }
  },
  
  joinCommunity: async (communityId: string, role = 'member') => {
    try {
      const supabase = createClientComponentClient<Database>();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('You must be logged in to join a community');
      }
      
      const { error } = await supabase
        .from('community_members')
        .insert({
          community_id: communityId,
          user_id: user.id,
          role,
        });
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Refresh members list
      get().fetchMembers(communityId);
    } catch (error) {
      console.error('Error joining community:', error);
      throw error;
    }
  },
  
  leaveCommunity: async (communityId: string) => {
    try {
      const supabase = createClientComponentClient<Database>();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('You must be logged in to leave a community');
      }
      
      const { error } = await supabase
        .from('community_members')
        .delete()
        .eq('community_id', communityId)
        .eq('user_id', user.id);
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Refresh members list
      get().fetchMembers(communityId);
    } catch (error) {
      console.error('Error leaving community:', error);
      throw error;
    }
  },
  
  createEvent: async (communityId: string, eventData: Partial<CommunityEvent>) => {
    try {
      const supabase = createClientComponentClient<Database>();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('You must be logged in to create an event');
      }
      
      const { error } = await supabase
        .from('community_events')
        .insert({
          ...eventData,
          community_id: communityId,
          creator_id: user.id,
        });
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Refresh events list
      get().fetchEvents(communityId);
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },
  
  createPost: async (communityId: string, content: string) => {
    try {
      const supabase = createClientComponentClient<Database>();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('You must be logged in to create a post');
      }
      
      const { error } = await supabase
        .from('community_posts')
        .insert({
          community_id: communityId,
          author_id: user.id,
          content,
        });
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Refresh posts list
      get().fetchPosts(communityId);
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },
}));
```

#### Community Role System

Communities implement their own role system:

- **Creator**: Original community founder
- **Admin**: Full management capabilities
- **Moderator**: Content moderation capabilities
- **Member**: Standard participation rights

## 15. Testing Strategy

The application implements a comprehensive testing strategy across multiple levels:

### Unit Testing

The application uses Jest for unit testing:

```typescript
// lib/utils.test.ts
import { cn, formatCurrency, calculateDaysBetween } from './utils';

describe('cn utility', () => {
  it('should merge class names correctly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
    expect(cn('class1', null, 'class2')).toBe('class1 class2');
    expect(cn('class1', undefined, 'class2')).toBe('class1 class2');
    expect(cn('class1', false && 'class2')).toBe('class1');
    expect(cn('class1', true && 'class2')).toBe('class1 class2');
  });
  
  it('should handle conditional classes', () => {
    const isActive = true;
    const isDisabled = false;
    
    expect(cn(
      'base-class',
      isActive && 'active-class',
      isDisabled && 'disabled-class'
    )).toBe('base-class active-class');
  });
});

describe('formatCurrency', () => {
  it('should format numbers according to currency and locale', () => {
    expect(formatCurrency(1234.56, 'EUR', 'en')).toBe('€1,234.56');
    expect(formatCurrency(1234.56, 'USD', 'en')).toBe('$1,234.56');
    expect(formatCurrency(1234.56, 'EUR', 'de')).toBe('1.234,56 €');
  });
});

describe('calculateDaysBetween', () => {
  it('should calculate days between two dates correctly', () => {
    const date1 = new Date('2023-01-01');
    const date2 = new Date('2023-01-10');
    
    expect(calculateDaysBetween(date1, date2)).toBe(9);
    expect(calculateDaysBetween(date2, date1)).toBe(9);
  });
});
```

### Component Testing

The application uses React Testing Library for component testing:

```typescript
// components/ui/button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './button';

describe('Button', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click me</Button>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-blue-600'); // Primary variant
  });
  
  it('applies custom className', () => {
    render(<Button className="custom-class">Click me</Button>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toHaveClass('custom-class');
  });
  
  it('applies correct variant styles', () => {
    render(<Button variant="secondary">Secondary</Button>);
    
    const button = screen.getByRole('button', { name: /secondary/i });
    expect(button).toHaveClass('bg-gray-200');
    expect(button).not.toHaveClass('bg-blue-600');
  });
  
  it('applies correct size styles', () => {
    render(<Button size="sm">Small</Button>);
    
    const button = screen.getByRole('button', { name: /small/i });
    expect(button).toHaveClass('text-sm');
  });
  
  it('handles click events', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    await userEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Click me</Button>);
    
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('BUTTON');
  });
});
```

### End-to-End Testing

The application uses Playwright for end-to-end testing:

```typescript
// tests/e2e/auth-flow.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should allow user to sign up', async ({ page }) => {
    // Navigate to signup page
    await page.goto('/signup');
    
    // Fill out signup form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'securePassword123');
    await page.fill('input[name="confirmPassword"]', 'securePassword123');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Verify redirect to onboarding
    await expect(page).toHaveURL(/onboarding/);
  });
  
  test('should allow user to log in', async ({ page }) => {
    // Navigate to login page
    await page.goto('/login');
    
    // Fill out login form
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'securePassword123');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Verify redirect to dashboard
    await expect(page).toHaveURL(/dashboard/);
    
    // Verify user is logged in
    await expect(page.locator('text=Test User')).toBeVisible();
  });
  
  test('should show error for invalid credentials', async ({ page }) => {
    // Navigate to login page
    await page.goto('/login');
    
    // Fill out login form with invalid credentials
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'wrongPassword');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Verify error message
    await expect(page.locator('text=Invalid email or password')).toBeVisible();
  });
});
```

### API Testing

The application tests API routes with Supertest:

```typescript
// tests/api/properties.test.ts
import { createRequest, createResponse } from 'node-mocks-http';
import { GET, POST } from '@/app/api/properties/route';
import { supabaseMock } from '../mocks/supabase-mock';

// Mock Supabase client
jest.mock('@/lib/supabase/server', () => ({
  createServerClient: () => supabaseMock,
}));

describe('Properties API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  describe('GET /api/properties', () => {
    it('should return properties with pagination', async () => {
      const mockData = [
        { id: '1', address: '123 Main St' },
        { id: '2', address: '456 Oak Ave' },
      ];
      
      supabaseMock.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            range: jest.fn().mockResolvedValue({
              data: mockData,
              count: 2,
              error: null,
            }),
          }),
        }),
      });
      
      const req = createRequest({
        method: 'GET',
        url: '/api/properties?limit=10&offset=0',
      });
      const res = createResponse();
      
      // Call the API handler
      const response = await GET(req);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data).toEqual({
        data: mockData,
        pagination: {
          limit: 10,
          offset: 0,
          total: 2,
        },
      });
    });
    
    it('should handle errors', async () => {
      supabaseMock.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            range: jest.fn().mockResolvedValue({
              data: null,
              error: { message: 'Database error' },
            }),
          }),
        }),
      });
      
      const req = createRequest({
        method: 'GET',
        url: '/api/properties',
      });
      
      // Call the API handler
      const response = await GET(req);
      const data = await response.json();
      
      expect(response.status).toBe(500);
      expect(data).toEqual({
        error: 'Database error',
      });
    });
  });
});
```

### CI/CD Integration

The application integrates testing with GitHub Actions:

```yaml
# .github/workflows/test.yml
name: Test

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linting
        run: npm run lint
      
      - name: Run type checking
        run: npm run typecheck
      
      - name: Run unit tests
        run: npm run test:unit
      
      - name: Run component tests
        run: npm run test:components
      
      - name: Run E2E tests
        run: |
          npm run build
          npm run test:e2e
      
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v9
        with:
          configPath: './lighthouserc.js'
          uploadArtifacts: true
          temporaryPublicStorage: true
```

## 16. Error Handling

The application implements a comprehensive error handling strategy:

### Frontend Error Handling

#### Global Error Boundary

```typescript
// components/error-boundary.tsx
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      setHasError(true);
      setError(error.error);
      
      // Report to monitoring service
      if (typeof window !== 'undefined' && window.Sentry) {
        window.Sentry.captureException(error.error);
      }
    };
    
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);
  
  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <div className="max-w-md">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-6">
            We're sorry for the inconvenience. Our team has been notified of this issue.
          </p>
          <div className="mb-6 p-4 bg-gray-100 rounded-md text-left overflow-auto">
            <code className="text-sm text-red-600">
              {error?.message || 'Unknown error'}
            </code>
          </div>
          <Button onClick={() => window.location.reload()}>
            Reload page
          </Button>
        </div>
      </div>
    );
  }
  
  return children;
}
```

#### Form Error Handling

```typescript
// components/auth/login-form.client.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  const onSubmit = async (data: LoginFormValues) => {
    try {
      setServerError(null);
      
      // Login implementation
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'An error occurred during login');
      }
      
      // Handle successful login (redirect, etc.)
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'Login failed');
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {serverError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{serverError}</AlertDescription>
        </Alert>
      )}
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="w-full rounded-md border border-gray-300 px-3 py-2"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className="w-full rounded-md border border-gray-300 px-3 py-2"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>
      
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Log in'}
      </Button>
    </form>
  );
}
```

#### API Error Handling

```typescript
// lib/api-error.ts
export class ApiError extends Error {
  public statusCode: number;
  public details?: Record<string, any>;
  
  constructor(message: string, statusCode: number = 500, details?: Record<string, any>) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.details = details;
  }
  
  static badRequest(message: string = 'Bad Request', details?: Record<string, any>) {
    return new ApiError(message, 400, details);
  }
  
  static unauthorized(message: string = 'Unauthorized', details?: Record<string, any>) {
    return new ApiError(message, 401, details);
  }
  
  static forbidden(message: string = 'Forbidden', details?: Record<string, any>) {
    return new ApiError(message, 403, details);
  }
  
  static notFound(message: string = 'Not Found', details?: Record<string, any>) {
    return new ApiError(message, 404, details);
  }
  
  static internal(message: string = 'Internal Server Error', details?: Record<string, any>) {
    return new ApiError(message, 500, details);
  }
}

// Middleware for handling API errors
export async function withErrorHandler(handler: Function) {
  try {
    return await handler();
  } catch (error) {
    if (error instanceof ApiError) {
      return Response.json(
        { error: error.message, details: error.details },
        { status: error.statusCode }
      );
    }
    
    console.error('Unhandled error:', error);
    return Response.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
```

### Backend Error Handling

#### Error Handling in API Routes

```typescript
// app/api/properties/route.ts
import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { getSession } from '@/lib/auth';
import { propertySchema } from '@/lib/validations/property';
import { ApiError, withErrorHandler } from '@/lib/api-error';

export async function GET(request: Request) {
  return withErrorHandler(async () => {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0;
    
    if (isNaN(limit) || isNaN(offset) || limit < 1 || offset < 0) {
      throw ApiError.badRequest('Invalid pagination parameters');
    }
    
    const supabase = createServerClient();
    
    const { data, error, count } = await supabase
      .from('properties')
      .select('*, rooms(*)', { count: 'exact' })
      .range(offset, offset + limit - 1);
    
    if (error) {
      console.error('Error fetching properties:', error);
      throw ApiError.internal('Error fetching properties');
    }
    
    return NextResponse.json({
      data,
      pagination: {
        limit,
        offset,
        total: count || 0,
      },
    });
  });
}

export async function POST(request: Request) {
  return withErrorHandler(async () => {
    const session = await getSession();
    
    if (!session) {
      throw ApiError.unauthorized();
    }
    
    const body = await request.json();
    
    // Validate request body
    const result = propertySchema.safeParse(body);
    if (!result.success) {
      throw ApiError.badRequest('Invalid request body', result.error.format());
    }
    
    const supabase = createServerClient();
    
    // Add owner_id from authenticated user
    const { data, error } = await supabase
      .from('properties')
      .insert({
        ...result.data,
        owner_id: session.user.id,
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating property:', error);
      throw ApiError.internal('Error creating property');
    }
    
    return NextResponse.json({ data }, { status: 201 });
  });
}
```

#### Database Error Handling

```typescript
// lib/supabase/error-handler.ts
import { PostgrestError } from '@supabase/supabase-js';
import { ApiError } from '@/lib/api-error';

export function handleDatabaseError(error: PostgrestError | null): never {
  if (!error) {
    throw ApiError.internal('Unknown database error');
  }
  
  // Custom error handling based on PostgreSQL error codes
  switch (error.code) {
    case '23505': // unique_violation
      throw ApiError.badRequest('A record with this data already exists', {
        constraint: error.details,
      });
      
    case '23503': // foreign_key_violation
      throw ApiError.badRequest('Referenced record does not exist', {
        constraint: error.details,
      });
      
    case '23514': // check_violation
      throw ApiError.badRequest('Data validation failed', {
        constraint: error.details,
      });
      
    case '42P01': // undefined_table
      throw ApiError.internal('Database configuration error');
      
    case 'PGRST116': // Not found
      throw ApiError.notFound('Record not found');
      
    default:
      console.error('Database error:', error);
      throw ApiError.internal(`Database error: ${error.message}`);
  }
}
```

## 17. Deployment Architecture

The application uses a modern cloud-based deployment architecture:

### Vercel Deployment

The application is deployed on Vercel with the following configuration:

```json
// vercel.json
{
  "buildCommand": "pnpm run build",
  "installCommand": "pnpm install",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["fra1", "cdg1", "lhr1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://res.cloudinary.com blob:"
        }
      ]
    }
  ],
  "rewrites": [
    { "source": "/api/v1/:path*", "destination": "/api/:path*" }
  ],
  "redirects": [
    { "source": "/app", "destination": "/dashboard", "permanent": true }
  ],
  "env": {
    "NEXT_PUBLIC_APP_URL": "https://myroomie.com",
    "NEXT_PUBLIC_DEFAULT_LOCALE": "en"
  }
}
```

### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches:
      - main
      - develop

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linting
        run: npm run lint
      
      - name: Run type checking
        run: npm run typecheck
      
      - name: Run tests
        run: npm run test
  
  deploy-develop:
    needs: test
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Vercel (Preview)
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./
          alias-domains: staging.myroomie.com
  
  deploy-production:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Vercel (Production)
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./
          vercel-args: '--prod'
```

### Environment Configuration

The application uses environment-specific configuration:

```typescript
// lib/config.ts
export const config = {
  // App information
  appName: 'MyRoomie',
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  
  // API configuration
  apiUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  apiVersion: 'v1',
  
  // Supabase
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  
  // Authentication
  authCookieName: 'myroomie_auth',
  authCookieMaxAge: 60 * 60 * 24 * 30, // 30 days
  
  // Internationalization
  defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en',
  supportedLocales: ['en', 'fr', 'es', 'de', 'it', 'pl', 'pt'],
  
  // Feature flags
  features: {
    communities: process.env.NEXT_PUBLIC_FEATURE_COMMUNITIES === 'true',
    enterprise: process.env.NEXT_PUBLIC_FEATURE_ENTERPRISE === 'true',
    financialTools: process.env.NEXT_PUBLIC_FEATURE_FINANCIAL_TOOLS === 'true',
    multiMarket: process.env.NEXT_PUBLIC_FEATURE_MULTI_MARKET === 'true',
  },
  
  // Monitoring
  sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID,
  
  // Deployment environment
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT || 'development',
};
```

## 18. Analytics & Monitoring

The application implements comprehensive analytics and monitoring:

### Analytics Implementation

```typescript
// lib/analytics.ts
export type AnalyticsEvent = {
  name: string;
  properties?: Record<string, any>;
};

export type AnalyticsPageView = {
  path: string;
  title: string;
  properties?: Record<string, any>;
};

export type AnalyticsIdentify = {
  userId: string;
  traits?: Record<string, any>;
};

class Analytics {
  private initialized = false;
  private queue: Array<() => void> = [];
  
  initialize() {
    if (typeof window === 'undefined') return;
    
    // Load analytics script
    const script = document.createElement('script');
    script.src = '/analytics.js';
    script.async = true;
    script.onload = () => {
      this.initialized = true;
      this.processQueue();
    };
    document.head.appendChild(script);
  }
  
  private processQueue() {
    while (this.queue.length > 0) {
      const task = this.queue.shift();
      task?.();
    }
  }
  
  private addToQueue(task: () => void) {
    if (this.initialized) {
      task();
    } else {
      this.queue.push(task);
    }
  }
  
  pageView({ path, title, properties = {} }: AnalyticsPageView) {
    this.addToQueue(() => {
      if (window.analytics) {
        window.analytics.page(title, {
          path,
          url: window.location.origin + path,
          title,
          ...properties,
        });
      }
    });
  }
  
  track({ name, properties = {} }: AnalyticsEvent) {
    this.addToQueue(() => {
      if (window.analytics) {
        window.analytics.track(name, properties);
      }
    });
  }
  
  identify({ userId, traits = {} }: AnalyticsIdentify) {
    this.addToQueue(() => {
      if (window.analytics) {
        window.analytics.identify(userId, traits);
      }
    });
  }
}

export const analytics = new Analytics();
```

#### Analytics Provider

```typescript
// components/analytics/analytics-provider.client.tsx
'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { analytics } from '@/lib/analytics';

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Initialize analytics
  useEffect(() => {
    analytics.initialize();
  }, []);
  
  // Track page views
  useEffect(() => {
    if (pathname) {
      const path = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      const title = document.title;
      
      analytics.pageView({
        path,
        title,
      });
    }
  }, [pathname, searchParams]);
  
  return children;
}
```

### Monitoring with Sentry

```typescript
// lib/sentry.ts
import * as Sentry from '@sentry/nextjs';
import { config } from '@/lib/config';

export function initializeSentry() {
  if (typeof window !== 'undefined' && config.sentryDsn && config.isProduction) {
    Sentry.init({
      dsn: config.sentryDsn,
      environment: config.environment,
      tracesSampleRate: 0.2,
      integrations: [
        new Sentry.BrowserTracing({
          tracePropagationTargets: ['localhost', /^https:\/\/myroomie\.com/],
        }),
        new Sentry.Replay({
          maskAllText: true,
          blockAllMedia: true,
        }),
      ],
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    });
  }
}

// Create error boundary component for Sentry
export const SentryErrorBoundary = Sentry.ErrorBoundary;
```

### Performance Monitoring

```typescript
// lib/performance.ts
export function reportWebVitals(metric: NextWebVitalsMetric) {
  if (typeof window === 'undefined' || !config.isProduction) return;
  
  // Log to console during development
  if (config.isDevelopment) {
    console.log(metric);
    return;
  }
  
  // Track Core Web Vitals
  const { name, value, id } = metric;
  
  // Send to analytics
  analytics.track({
    name: 'web_vitals',
    properties: {
      metric_name: name,
      metric_value: Math.round(name === 'CLS' ? value * 1000 : value),
      metric_id: id,
    },
  });
  
  // Send to Sentry
  Sentry.captureMessage('Web Vitals', {
    level: 'info',
    tags: {
      metric_name: name,
      metric_value: Math.round(name === 'CLS' ? value * 1000 : value),
    },
  });
}
```

## 19. Security Best Practices

The application implements several security best practices:

### Content Security Policy

```typescript
// app/api/content-security-policy/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const csp = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com;
    img-src 'self' data: https://res.cloudinary.com blob:;
    connect-src 'self' https://*.supabase.co https://*.sentry.io;
    frame-ancestors 'none';
    form-action 'self';
    base-uri 'self';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim();
  
  return new NextResponse('Content-Security-Policy successfully set', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Content-Security-Policy': csp,
    },
  });
}
```

### CSRF Protection

```typescript
// lib/csrf.ts
import { nanoid } from 'nanoid';
import { cookies } from 'next/headers';

export function generateCsrfToken(): string {
  const token = nanoid(32);
  cookies().set('csrf-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60, // 1 hour
  });
  return token;
}

export function validateCsrfToken(requestToken: string): boolean {
  const storedToken = cookies().get('csrf-token')?.value;
  return !!storedToken && storedToken === requestToken;
}
```

### Rate Limiting

```typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Create a new ratelimiter instance
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
});

// Rate limiter configuration
const authLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '5m'), // 10 requests per 5 minutes
  prefix: 'ratelimit:auth',
});

const apiLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '1m'), // 100 requests per minute
  prefix: 'ratelimit:api',
});

export async function middleware(request: NextRequest) {
  // Get IP address for rate limiting
  const ip = request.ip || '127.0.0.1';
  const { pathname } = request.nextUrl;
  
  // Apply rate limiting to authentication endpoints
  if (pathname.startsWith('/api/auth')) {
    const { success, limit, reset, remaining } = await authLimiter.limit(`auth:${ip}`);
    
    if (!success) {
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
          'Retry-After': Math.floor((reset - Date.now()) / 1000).toString(),
        },
      });
    }
  }
  
  // Apply rate limiting to other API endpoints
  if (pathname.startsWith('/api') && !pathname.startsWith('/api/auth')) {
    const { success, limit, reset, remaining } = await apiLimiter.limit(`api:${ip}`);
    
    if (!success) {
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
          'Retry-After': Math.floor((reset - Date.now()) / 1000).toString(),
        },
      });
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
```

### Authentication Security

```typescript
// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { ApiError, withErrorHandler } from '@/lib/api-error';
import { loginSchema } from '@/lib/validations/auth';
import { cookies } from 'next/headers';
import { validateCsrfToken } from '@/lib/csrf';

export async function POST(request: Request) {
  return withErrorHandler(async () => {
    // Validate CSRF token
    const csrfToken = request.headers.get('x-csrf-token');
    if (!csrfToken || !validateCsrfToken(csrfToken)) {
      throw ApiError.forbidden('Invalid CSRF token');
    }
    
    const body = await request.json();
    
    // Validate request body
    const result = loginSchema.safeParse(body);
    if (!result.success) {
      throw ApiError.badRequest('Invalid request body', result.error.format());
    }
    
    const { email, password } = result.data;
    
    const supabase = createServerClient();
    
    // Sign in with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      if (error.status === 400) {
        throw ApiError.unauthorized('Invalid email or password');
      }
      throw ApiError.internal('Authentication error');
    }
    
    // Set secure cookie for session
    cookies().set('session', JSON.stringify(data.session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    
    return NextResponse.json({
      user: {
        id: data.user.id,
        email: data.user.email,
      }
    });
  });
}
```
