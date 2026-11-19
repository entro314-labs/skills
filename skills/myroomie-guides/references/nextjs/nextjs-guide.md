---
title: MyRoomie - Next.js 15.x Development Guidelines for AI Code Generation
version: 1.0.0
lastUpdated: 2025-05-01
purpose: "AI-driven development for MyRoomie platform"
tags:
  - nextjs
  - react
  - typescript
  - supabase
  - myroomie
  - living-as-a-service
---

# MyRoomie - Next.js 15.x Development Guidelines for AI Code Generation

Last updated: May 01, 2025

> This document is specifically optimized for AI coding assistants to generate complete application code following MyRoomie platform standards. AI: Use these guidelines to generate production-ready Next.js code that aligns with our "Living as a Service" (LaaS) platform architecture.

## 🤖 AI Quick Reference

```json
{
  "platform": {
    "name": "MyRoomie",
    "description": "Living as a Service (LaaS) platform",
    "pillars": ["MyRoomie Living (B2C)", "MyRoomie Manage (B2B)", "MyRoomie Pro (Enterprise)"],
    "target_markets": ["Greece", "Poland", "Malta", "Portugal", "Estonia", "Ireland", "Austria", "Czech Republic", "Romania", "Slovakia", "Slovenia"]
  },
  "framework": {
    "next_version": "15.3.1",
    "react_version": "19.1.0",
    "typescript_version": "5.8.3",
    "tailwind_version": "4.1.4",
    "shadcn_ui_version": "2.4.1",
    "supabase": {
      "client": "@supabase/supabase-js@3.43.0",
      "auth_helpers": "@supabase/auth-helpers-nextjs@0.16.0"
    },
    "state": {
      "global": "zustand@5.0.4",
      "server": "TanStack Query@5.74.6"
    }
  },
  "architecture": {
    "default_component_type": "server",
    "client_component_suffix": ".client.tsx",
    "server_component_suffix": ".server.tsx",
    "file_naming": "kebab-case",
    "component_naming": "PascalCase",
    "component_organization": "feature-based",
    "state_preference": "server-first"
  },
  "patterns": {
    "data_fetching": "fetch_in_server_components",
    "auth": "supabase_auth_with_nextauth",
    "forms": "react_hook_form_with_zod",
    "styling": "tailwind_with_cva",
    "error_handling": "error_boundaries_with_fallbacks",
    "internationalization": "next-intl"
  },
  "code_style": {
    "general": "functional",
    "imports": "grouped_and_ordered",
    "exports": "named_component_exports",
    "types": "explicit_interface_props",
    "functions": "arrow_functions_preferred"
  },
  "key_features": {
    "roommate_matching": "AI-powered compatibility algorithm",
    "property_management": "Landlord tools with predictive maintenance",
    "financial_tools": "Expense splitting, deposits, payments",
    "community_features": "Social networking for residents",
    "enterprise_relocation": "End-to-end corporate solutions"
  }
}
```

## 📋 Table of Contents

1. [Technology Stack Reference](#technology-stack-reference)
2. [Key Coding Principles](#key-coding-principles)
3. [File & Component Structure](#file--component-structure)
4. [Component Templates](#component-templates)
5. [Data Fetching Patterns](#data-fetching-patterns)
6. [State Management Patterns](#state-management-patterns)
7. [Form Implementation Patterns](#form-implementation-patterns)
8. [Authentication & Authorization](#authentication--authorization)
9. [Styling Patterns](#styling-patterns)
10. [API & Server Functions](#api--server-functions)
11. [Error Handling Patterns](#error-handling-patterns)
12. [TypeScript Implementation](#typescript-implementation)
13. [Database Schema](#database-schema)
14. [Feature Implementation](#feature-implementation)
15. [Testing Templates](#testing-templates)
16. [Internationalization](#internationalization)
17. [Progressive Web App (PWA)](#progressive-web-app-pwa)
18. [Anti-Patterns to Avoid](#anti-patterns-to-avoid)
19. [Business Context & Roadmap](#business-context--roadmap)

## Technology Stack Reference

**Core Technologies:**

```json
{
  "next": "15.3.1",
  "react": "19.1.0",
  "typescript": "5.8.3",
  "tailwindcss": "4.1.4",
  "shadcn/ui": "2.4.1",
  "@supabase/supabase-js": "3.43.0",
  "nextauth": "5.2.1",
  "zustand": "5.0.4",
  "@tanstack/react-query": "5.74.6",
  "zod": "3.22.4",
  "react-hook-form": "7.53.0",
  "class-variance-authority": "0.7.0",
  "next-intl": "3.5.4",
  "next-pwa": "5.6.0"
}
```

## Key Coding Principles

*These principles guide all code generation decisions for the MyRoomie platform.*

**KP-1.** **Server-first architecture**: Default to Server Components for all pages and most components.

```typescript
// 👉 AI: Generate Server Components by default (no 'use client' directive)
// app/properties/page.tsx
import { createServerClient } from '@/lib/supabase/server';
import { PropertyList } from '@/components/properties/property-list';

export default async function PropertiesPage() {
  const supabase = createServerClient();

  const { data: properties, error } = await supabase
    .from('properties')
    .select('*, rooms(*)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching properties:', error);
    return <div>Error loading properties</div>;
  }

  return <PropertyList properties={properties} />;
}
```

**KP-2.** **TypeScript everywhere**: All code must be strongly typed with proper interfaces.

```typescript
// 👉 AI: Always define interfaces for component props and data structures
interface Property {
  id: string;
  address: string;
  details: PropertyDetails | null;
  amenities: string[];
  status: 'active' | 'pending' | 'inactive';
  created_at: string;
  coordinates: unknown | null;
  market_code: string | null;
  rooms: Room[];
}

interface Room {
  id: string;
  property_id: string;
  name: string;
  size: number;
  price: number;
  availability: string[] | null;
  lease_type: string;
  description: string | null;
  features: string[] | null;
  created_at: string;
}

interface PropertyListProps {
  properties: Property[];
}
```

**KP-3.** **Explicit component boundaries**: Use `.server.tsx` and `.client.tsx` suffixes.

```typescript
// 👉 AI: Use these naming conventions for all components
// components/properties/property-card.server.tsx - Server Component
// components/properties/property-form.client.tsx - Client Component
```

**KP-4.** **Defensive coding**: Implement proper error handling, loading states, and empty states.

```typescript
// 👉 AI: Always include error, loading, and empty states in components
export async function PropertyGrid() {
  try {
    const supabase = createServerClient();
    const { data: properties, error } = await supabase
      .from('properties')
      .select('*, rooms(*)')
      .eq('status', 'active');

    if (error) {
      throw new Error(`Failed to fetch properties: ${error.message}`);
    }

    if (properties.length === 0) {
      return <EmptyState message="No properties found" />;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    );
  } catch (error) {
    return <ErrorDisplay error={error} />;
  }
}
```

**KP-5.** **Accessibility first**: All UI must be WCAG AA compliant.

```typescript
// 👉 AI: Always include proper ARIA attributes and semantic HTML
<button
  aria-label="Delete property"
  onClick={handleDelete}
  disabled={isLoading}
  className={cn(
    "text-red-500 hover:text-red-700",
    "focus:ring-2 focus:ring-red-500 focus:outline-none",
    "rounded-md px-3 py-2",
    isLoading && "opacity-50 cursor-not-allowed"
  )}
>
  {isLoading ? 'Deleting...' : 'Delete'}
</button>
```

## File & Component Structure

**Directory Organization:**

```
src/
├── app/                  # Next.js App Router pages
│   ├── (auth)/           # Route group for auth pages
│   ├── (dashboard)/      # Route group for dashboard
│   ├── (manage)/         # Property management features
│   ├── (enterprise)/     # Enterprise-specific features
│   ├── api/              # API routes (route.ts, GET.ts, POST.ts)
│   ├── layout.tsx        # Root layout
├── components/           # UI components
│   ├── admin/            # Admin-specific components
│   ├── auth/             # Authentication components
│   ├── chat/             # Messaging components
│   ├── common/           # Shared components
│   ├── community/        # Community-related components
│   ├── enterprise/       # Enterprise features components
│   ├── finance/          # Financial tools components
│   ├── i18n/             # Internationalization components
│   ├── manage/           # Property management components
│   ├── matching/         # Roommate matching components
│   ├── notifications/    # Notification system components
│   ├── onboarding/       # User onboarding components
│   ├── properties/       # Property-related components
│   ├── pwa/              # Progressive Web App components
│   ├── search/           # Search functionality components
│   ├── ui/               # Base UI component library
│   └── users/            # User-related components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
│   ├── actions/          # Server actions
│   ├── api/              # API utility functions
│   ├── i18n/             # Internationalization utilities
│   │   └── locales/      # Translation files
│   ├── matching/         # Roommate matching algorithms
│   ├── supabase/         # Supabase client functions
│   └── utils/            # General utilities
├── stores/               # Zustand stores
├── types/                # TypeScript type definitions
├── migrations/           # Database migrations
```

**File Naming Conventions:**

- All filenames use `kebab-case.tsx`
- Components use `PascalCase` for exports
- Component boundaries specified with `.server.tsx` or `.client.tsx`
- Page-specific components can be in a folder with the page name
- Feature-specific components should be in a folder with the feature name

**Component Structure Pattern:**

```typescript
// 👉 AI: Follow this component structure pattern
// [filename].tsx
'use client'; // Only for Client Components

// 1. Imports (grouped and ordered)
// React and Next.js imports
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// Third-party libraries
import { useQuery } from '@tanstack/react-query';
// UI components
import { Button } from '@/components/ui/button';
// Utilities
import { formatDate } from '@/lib/utils';
// Types
import type { Property } from '@/types/property';

// 2. Component definition
export function PropertyCard({ property, isHighlighted }: PropertyCardProps) {
  // 3. Hooks, state and effects
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  // 4. Handler functions
  const handleViewDetails = () => {
    router.push(`/properties/${property.id}`);
  };

  // 5. Render logic
  return (
    <div className={cn(
      "p-4 border rounded-lg",
      isHighlighted && "border-blue-600"
    )}>
      <h3 className="text-lg font-semibold">{property.address}</h3>
      <div className="mt-2 space-y-2">
        {/* More JSX structure */}
      </div>
      <Button onClick={handleViewDetails} className="mt-4">
        View Details
      </Button>
    </div>
  );
}

// 6. Helper components/functions (if needed)
function PropertyBadge({ status }: { status: Property['status'] }) {
  const badgeClasses = {
    active: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    inactive: "bg-gray-100 text-gray-800"
  };

  return (
    <span className={cn("px-2 py-1 rounded-full text-xs font-medium", badgeClasses[status])}>
      {status}
    </span>
  );
}

// 7. Types
interface PropertyCardProps {
  property: Property;
  isHighlighted?: boolean;
}
```

## Component Templates

### Page Component Template

```typescript
// 👉 AI: Use this template for page components
// app/properties/[id]/page.tsx

import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';
import { PropertyDetails } from '@/components/properties/property-details.server';
import { PropertyHeader } from '@/components/properties/property-header.server';
import { PropertyRelated } from '@/components/properties/property-related.server';
import { PropertySkeleton } from '@/components/properties/property-skeleton';

// Metadata
export async function generateMetadata({ params }: { params: { id: string } }) {
  const supabase = createServerClient();
  const { data: property } = await supabase
    .from('properties')
    .select('address, details')
    .eq('id', params.id)
    .single();

  if (!property) {
    return {
      title: 'Property Not Found',
      description: 'The requested property could not be found',
    };
  }

  return {
    title: `${property.address} | MyRoomie`,
    description: property.details?.description || `View details for ${property.address}`,
  };
}

// Static parameters for ISR/SSG
export async function generateStaticParams() {
  const supabase = createServerClient();
  const { data: properties } = await supabase
    .from('properties')
    .select('id')
    .eq('status', 'active')
    .limit(20);

  return properties?.map(property => ({
    id: property.id,
  })) || [];
}

// Default export: The page component
export default async function PropertyPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createServerClient();
  const { data: property, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !property) {
    notFound();
  }

  return (
    <main className="container py-8">
      <PropertyHeader property={property} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          <Suspense fallback={<PropertySkeleton />}>
            <PropertyDetails propertyId={params.id} />
          </Suspense>
        </div>

        <div>
          {/* Sidebar content */}
          <ContactForm propertyId={params.id} />
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Similar Properties</h2>
        <Suspense fallback={<div>Loading similar properties...</div>}>
          <PropertyRelated
            currentPropertyId={params.id}
            marketCode={property.market_code}
          />
        </Suspense>
      </div>
    </main>
  );
}
```

### Server Component Template

```typescript
// 👉 AI: Use this template for server components
// components/properties/property-details.server.tsx

import { cache } from 'react';
import { createServerClient } from '@/lib/supabase/server';
import { PropertyAmenities } from './property-amenities';
import { PropertyMap } from './property-map';
import { RoomsList } from '../rooms/rooms-list.server';
import { ErrorDisplay } from '@/components/ui/error-display';

// Data fetching (with caching)
const getPropertyWithRooms = cache(async (propertyId: string) => {
  const supabase = createServerClient();

  // Fetch property with rooms
  const { data: property, error } = await supabase
    .from('properties')
    .select(`
      *,
      rooms(*)
    `)
    .eq('id', propertyId)
    .single();

  if (error) {
    console.error('Failed to fetch property details:', error);
    throw new Error('Failed to load property details. Please try again later.');
  }

  return property;
});

// Component
export async function PropertyDetails({
  propertyId,
}: {
  propertyId: string
}) {
  try {
    const property = await getPropertyWithRooms(propertyId);

    return (
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">About This Property</h2>
          <p className="text-gray-700">{property.details?.description || 'No description available.'}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Amenities</h2>
          <PropertyAmenities amenities={property.amenities || []} />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Available Rooms</h2>
          <RoomsList rooms={property.rooms} propertyId={propertyId} />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Location</h2>
          <PropertyMap
            address={property.address}
            coordinates={property.coordinates}
          />
        </section>
      </div>
    );
  } catch (error) {
    return <ErrorDisplay error={error} />;
  }
}
```

### Client Component Template

```typescript
// 👉 AI: Use this template for client components
// components/properties/contact-form.client.tsx

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { sendPropertyInquiry } from '@/lib/actions/property-actions';

// Form schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm({
  propertyId,
}: {
  propertyId: string
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      await sendPropertyInquiry({
        propertyId,
        ...data
      });

      setSuccess(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Contact About This Property</h3>

      {success && (
        <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
          <AlertDescription>
            Your inquiry has been sent! We'll get back to you soon.
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <Input
            id="name"
            {...form.register('name')}
            aria-invalid={!!form.formState.errors.name}
          />
          {form.formState.errors.name && (
            <p className="mt-1 text-sm text-red-500">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <Input
            id="email"
            type="email"
            {...form.register('email')}
            aria-invalid={!!form.formState.errors.email}
          />
          {form.formState.errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            Phone (Optional)
          </label>
          <Input
            id="phone"
            {...form.register('phone')}
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Message
          </label>
          <Textarea
            id="message"
            rows={4}
            {...form.register('message')}
            aria-invalid={!!form.formState.errors.message}
          />
          {form.formState.errors.message && (
            <p className="mt-1 text-sm text-red-500">
              {form.formState.errors.message.message}
            </p>
          )}
        </div>

        {error && (
          <Alert className="bg-red-50 text-red-800 border-red-200">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Inquiry'}
        </Button>
      </form>
    </div>
  );
}
```

## Data Fetching Patterns

### Server Component Data Fetching

```typescript
// 👉 AI: Use this pattern for Server Component data fetching
// components/matches/matches-list.server.tsx

import 'server-only';
import { cache } from 'react';
import { createServerClient } from '@/lib/supabase/server';
import { MatchCard } from './match-card.server';
import { getCurrentUser } from '@/lib/auth';
import { EmptyState } from '@/components/ui/empty-state';

// Cache the data fetch to avoid redundant requests
export const getUserMatches = cache(async () => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const supabase = createServerClient();

  // Fetch matches where the current user is either user1 or user2
  const { data, error } = await supabase
    .from('matches')
    .select(`
      *,
      user1:profiles!matches_user1_id_fkey(*),
      user2:profiles!matches_user2_id_fkey(*)
    `)
    .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
    .order('compatibility', { ascending: false });

  if (error) {
    console.error('Error fetching matches:', error);
    throw new Error(`Failed to fetch matches: ${error.message}`);
  }

  return data;
});

export async function MatchesList() {
  try {
    const matches = await getUserMatches();

    if (matches.length === 0) {
      return (
        <EmptyState
          title="No matches yet"
          description="We're still looking for your perfect match. Check back soon!"
          action={{ label: 'Update Preferences', href: '/profile/preferences' }}
        />
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    );
  } catch (error) {
    return <div>Error loading matches: {error instanceof Error ? error.message : 'Unknown error'}</div>;
  }
}
```

### Parallel Data Fetching

```typescript
// 👉 AI: Use this pattern for parallel data fetching
// app/dashboard/page.tsx

import { Suspense } from 'react';
import { UserMatches } from '@/components/matches/user-matches.server';
import { PropertyListings } from '@/components/properties/property-listings.server';
import { CommunityActivity } from '@/components/community/community-activity.server';
import { UpcomingPayments } from '@/components/finance/upcoming-payments.server';
import { DashboardSkeleton } from '@/components/skeletons/dashboard-skeleton';

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold mb-4">Your Matches</h2>
        <Suspense fallback={<DashboardSkeleton type="matches" />}>
          {/* Each component fetches its own data in parallel */}
          <UserMatches limit={4} />
        </Suspense>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Finances</h2>
        <Suspense fallback={<DashboardSkeleton type="payments" />}>
          <UpcomingPayments />
        </Suspense>
      </div>

      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold mb-4">Recent Properties</h2>
        <Suspense fallback={<DashboardSkeleton type="properties" />}>
          <PropertyListings limit={6} />
        </Suspense>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Community Activity</h2>
        <Suspense fallback={<DashboardSkeleton type="community" />}>
          <CommunityActivity />
        </Suspense>
      </div>
    </div>
  );
}
```

### Client Component Data Fetching with TanStack Query

```typescript
// 👉 AI: Use this pattern for Client Component data fetching
// hooks/use-properties.ts

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClientComponentClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import type { Database } from '@/types/database.types';

export type PropertyFilters = {
  location?: string;
  priceMin?: number;
  priceMax?: number;
  amenities?: string[];
  status?: string;
};

export function useProperties(filters: PropertyFilters = {}) {
  const supabase = createClientComponentClient<Database>();

  return useQuery({
    queryKey: ['properties', filters],
    queryFn: async () => {
      let query = supabase
        .from('properties')
        .select('*, rooms(*)')
        .eq('status', filters.status || 'active');

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

      if (filters.amenities?.length) {
        query = query.contains('amenities', filters.amenities);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching properties:', error);
        throw new Error(`Failed to fetch properties: ${error.message}`);
      }

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

      if (error) {
        throw new Error(`Failed to create property: ${error.message}`);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast.success('Property created successfully');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to create property');
    },
  });
}

// Usage in client component
// components/properties/property-filter.client.tsx
'use client';

import { useState } from 'react';
import { useProperties } from '@/hooks/use-properties';
import { PropertyCard } from './property-card.client';

export function FilterablePropertyList() {
  const [filters, setFilters] = useState<PropertyFilters>({
    status: 'active',
  });

  const { data: properties, isLoading, error } = useProperties(filters);

  // Filter handling logic

  if (isLoading) return <div>Loading properties...</div>;
  if (error) return <div>Error loading properties: {error.message}</div>;

  return (
    <div>
      {/* Filters UI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {properties?.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
```

## State Management Patterns

### Server-first State

```typescript
// 👉 AI: Use server-first approach wherever possible
// app/properties/[id]/page.tsx

export default async function PropertyPage({ params }: { params: { id: string } }) {
  // Fetch property and related data on server
  const property = await getProperty(params.id);
  const relatedProperties = await getRelatedProperties(params.id);

  return (
    <div>
      {/* Pass fully hydrated data to client components */}
      <PropertyView
        property={property}
        relatedProperties={relatedProperties}
      />
    </div>
  );
}
```

### Global Client State with Zustand

```typescript
// 👉 AI: Use this pattern for global client state
// stores/communities-store.ts

import { create } from 'zustand';
import type { Database } from '@/types/database.types';

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

  // Implementation of other methods...
  fetchMembers: async (communityId) => {/* implementation */},
  fetchEvents: async (communityId) => {/* implementation */},
  fetchPosts: async (communityId) => {/* implementation */},
  createCommunity: async (communityData) => {/* implementation */},
  updateCommunity: async (id, updates) => {/* implementation */},
  joinCommunity: async (communityId, role = 'member') => {/* implementation */},
  leaveCommunity: async (communityId) => {/* implementation */}
}));

// Usage in client component
// components/community/community-card.client.tsx
'use client';

import { useCommunitiesStore } from '@/stores/communities-store';

export function CommunityCard({ communityId }: { communityId: string }) {
  const { communities, fetchCommunityById, joinCommunity } = useCommunitiesStore();

  // Component implementation
}
```

### Form State with React Hook Form

```typescript
// 👉 AI: Use this pattern for form state
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

  // Render wizard with current step form
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

        {/* Render step-specific form fields based on the current step */}
        {currentStepData.id === 'personalInfo' && (
          /* Personal info form fields */
          <div className="space-y-4">
            {/* Fields for personal info */}
          </div>
        )}

        {/* Other steps' form fields */}

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

## Form Implementation Patterns

### Server Action Form

```typescript
// 👉 AI: Use this pattern for forms using Server Actions
// lib/actions/contact-actions.ts

'use server';

import { z } from 'zod';
import { createServerClient } from '@/lib/supabase/server';
import { getCurrentUser } from '@/lib/auth';
import { sendEmail } from '@/lib/email';

// Schema for validation
const contactSchema = z.object({
  propertyId: z.string().uuid('Invalid property ID'),
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function sendPropertyInquiry(data: z.infer<typeof contactSchema>) {
  try {
    // Validate input data
    const validatedData = contactSchema.parse(data);

    // Get current user if logged in
    const currentUser = await getCurrentUser();

    const supabase = createServerClient();

    // Get property details
    const { data: property, error: propertyError } = await supabase
      .from('properties')
      .select('address, owner_id')
      .eq('id', validatedData.propertyId)
      .single();

    if (propertyError) {
      throw new Error(`Property not found: ${propertyError.message}`);
    }

    // Store inquiry in database
    const { error: inquiryError } = await supabase
      .from('property_inquiries')
      .insert({
        property_id: validatedData.propertyId,
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        message: validatedData.message,
        user_id: currentUser?.id,
      });

    if (inquiryError) {
      throw new Error(`Failed to save inquiry: ${inquiryError.message}`);
    }

    // Get owner's email
    const { data: owner, error: ownerError } = await supabase
      .from('profiles')
      .select('email')
      .eq('id', property.owner_id)
      .single();

    if (ownerError) {
      console.error('Error fetching owner:', ownerError);
      // Continue even if we can't get the owner's email
    }

    // Send email notification
    if (owner?.email) {
      await sendEmail({
        to: owner.email,
        subject: `New inquiry for your property: ${property.address}`,
        text: `
          Name: ${validatedData.name}
          Email: ${validatedData.email}
          Phone: ${validatedData.phone || 'Not provided'}

          Message:
          ${validatedData.message}
        `,
      });
    }

    return { success: true };
  } catch (error) {
    console.error('Property inquiry error:', error);
    throw error instanceof Error
      ? error
      : new Error('Failed to send inquiry. Please try again later.');
  }
}

// Usage in client component
// components/properties/contact-form.client.tsx

'use client';

import { useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { sendPropertyInquiry } from '@/lib/actions/contact-actions';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Sending...' : 'Send Inquiry'}
    </Button>
  );
}

export function ContactForm({ propertyId }: { propertyId: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(
    async (prevState: any, formData: FormData) => {
      try {
        // Create an object with form values
        const data = {
          propertyId,
          name: formData.get('name') as string,
          email: formData.get('email') as string,
          phone: formData.get('phone') as string,
          message: formData.get('message') as string,
        };

        await sendPropertyInquiry(data);

        // On success
        formRef.current?.reset();
        return { success: true };
      } catch (error) {
        // On error
        return {
          error: error instanceof Error ? error.message : 'Something went wrong'
        };
      }
    },
    { success: false, error: null }
  );

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Contact About This Property</h3>

      {state.success && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md">
          Your inquiry has been sent successfully! We'll get back to you soon.
        </div>
      )}

      <form ref={formRef} action={formAction} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <Input
            id="name"
            name="name"
            required
            minLength={2}
            aria-required="true"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            aria-required="true"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            Phone (Optional)
          </label>
          <Input
            id="phone"
            name="phone"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Message
          </label>
          <Textarea
            id="message"
            name="message"
            rows={4}
            required
            minLength={10}
            aria-required="true"
          />
        </div>

        {state.error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-md">
            {state.error}
          </div>
        )}

        <SubmitButton />
      </form>
    </div>
  );
}
```

### API Route Form Submission

```typescript
// 👉 AI: Use this pattern for forms using API routes
// app/api/community/join/POST.ts

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createServerClient } from '@/lib/supabase/server';
import { getSession } from '@/lib/auth';

// Schema for validation
const joinCommunitySchema = z.object({
  communityId: z.string().uuid('Invalid community ID'),
  role: z.enum(['member', 'moderator']).default('member'),
});

export async function POST(request: Request) {
  try {
    // Get authenticated user
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const result = joinCommunitySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { communityId, role } = result.data;

    const supabase = createServerClient();

    // Check if community exists
    const { data: community, error: communityError } = await supabase
      .from('communities')
      .select('id, name, is_private')
      .eq('id', communityId)
      .single();

    if (communityError) {
      return NextResponse.json(
        { error: 'Community not found' },
        { status: 404 }
      );
    }

    // Check if user is already a member
    const { data: existingMembership, error: membershipError } = await supabase
      .from('community_members')
      .select('id')
      .eq('community_id', communityId)
      .eq('user_id', session.user.id)
      .single();

    if (existingMembership) {
      return NextResponse.json(
        { message: 'You are already a member of this community' },
        { status: 200 }
      );
    }

    // For private communities, need additional checks/invites (simplified here)
    if (community.is_private && role !== 'member') {
      return NextResponse.json(
        { error: 'Cannot join private community with elevated role' },
        { status: 403 }
      );
    }

    // Add user to community
    const { data: newMembership, error: createError } = await supabase
      .from('community_members')
      .insert({
        community_id: communityId,
        user_id: session.user.id,
        role,
        joined_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (createError) {
      return NextResponse.json(
        { error: 'Failed to join community' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: `Successfully joined ${community.name}`,
        membership: newMembership
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Join community error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

// Usage in client component
// components/community/join-community-button.client.tsx

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function JoinCommunityButton({
  communityId,
  communityName,
  onSuccess,
}: {
  communityId: string;
  communityName: string;
  onSuccess?: () => void;
}) {
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleJoin = async () => {
    setIsJoining(true);
    setError(null);

    try {
      const response = await fetch('/api/community/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ communityId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to join community');
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleJoin}
        disabled={isJoining}
        className="w-full"
      >
        {isJoining ? 'Joining...' : `Join ${communityName}`}
      </Button>

      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </>
  );
}
```

## Authentication & Authorization

### Supabase and NextAuth Integration

```typescript
// 👉 AI: Use this pattern for Supabase Auth with NextAuth
// app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { SupabaseAdapter } from '@auth/supabase-adapter';
import { createClient } from '@supabase/supabase-js';

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
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });

        if (error || !data.user) {
          return null;
        }

        return {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata.name,
          role: data.user.user_metadata.role || 'user',
        };
      }
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
    async jwt({ token, user }) {
      // Add custom claims to JWT
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    }
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

### Authentication Utilities

```typescript
// 👉 AI: Use these patterns for auth utilities
// lib/auth.ts

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { createServerClient } from '@/lib/supabase/server';

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}

export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}

export async function hasRole(requiredRole: string | string[]) {
  const user = await getCurrentUser();

  if (!user) {
    return false;
  }

  // Check against array of roles
  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(user.role);
  }

  // Check against single role
  return user.role === requiredRole;
}

export async function isAdmin() {
  return hasRole('admin');
}

// Check if user has access to a specific property
export async function canAccessProperty(propertyId: string) {
  const user = await getCurrentUser();

  if (!user) {
    return false;
  }

  // Admins can access any property
  if (user.role === 'admin') {
    return true;
  }

  const supabase = createServerClient();

  // Check if user is the owner
  const { data: property } = await supabase
    .from('properties')
    .select('owner_id')
    .eq('id', propertyId)
    .single();

  if (property?.owner_id === user.id) {
    return true;
  }

  // Check if user is a tenant of this property
  const { data: booking } = await supabase
    .from('bookings')
    .select('id')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .or(`room_id.in.(${
      supabase.from('rooms').select('id').eq('property_id', propertyId).toString()
    })`)
    .single();

  return !!booking;
}

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

### Route Protection

```typescript
// 👉 AI: Use this pattern for route protection
// middleware.ts

import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;

  // Check x-middleware-subrequest for security
  const isSubrequest = req.headers.get('x-middleware-subrequest');
  if (isSubrequest && !['next-route', 'next-api'].includes(isSubrequest)) {
    return new NextResponse(null, { status: 403 });
  }

  // Only run on protected routes
  if (
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/account') ||
    pathname.startsWith('/matches') ||
    pathname.startsWith('/manage') ||
    pathname.startsWith('/enterprise')
  ) {
    const supabase = createMiddlewareClient({ req, res });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Role-based access control
    const userRole = session.user.user_metadata.role || 'user';

    // Admin routes
    if (pathname.startsWith('/admin') && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // Landlord routes
    if (pathname.startsWith('/manage') && !['admin', 'landlord'].includes(userRole)) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // Enterprise routes
    if (pathname.startsWith('/enterprise') && !['admin', 'enterprise'].includes(userRole)) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/account/:path*',
    '/admin/:path*',
    '/manage/:path*',
    '/enterprise/:path*',
    '/matches/:path*',
  ],
};
```

### Auth Context Provider

```typescript
// 👉 AI: Use this pattern for auth context
// components/providers/auth-provider.client.tsx

'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useSession, SessionProvider } from 'next-auth/react';
import type { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

function AuthProviderContent({ children }: { children: React.ReactNode }) {
  const { data: sessionData, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const initSupabase = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);

      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setSession(session);
          setUser(session?.user ?? null);
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    };

    initSupabase();
  }, [supabase, sessionData]);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading: status === 'loading',
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProviderContent>{children}</AuthProviderContent>
    </SessionProvider>
  );
}

// Usage in layout
// app/layout.tsx
import { AuthProvider } from '@/components/providers/auth-provider.client';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

## Styling Patterns

### Tailwind with Class Variance Authority

```typescript
// 👉 AI: Use this pattern for component variants
// lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// components/ui/button.tsx
'use client';

import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
        outline: "border border-gray-300 bg-transparent hover:bg-gray-100 focus:ring-gray-500",
        ghost: "bg-transparent hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500",
        destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
      },
      size: {
        xs: "h-8 px-2.5 text-xs",
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-5 text-base",
        xl: "h-12 px-6 text-base",
      },
      width: {
        auto: "",
        full: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      width: "auto",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, width, isLoading, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, width, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

// Usage
// <Button variant="primary" size="lg" width="full">Sign In</Button>
```

### Layout Patterns

```typescript
// 👉 AI: Use these layout patterns
// components/layouts/dashboard-layout.tsx

import { SidebarNav } from '@/components/ui/sidebar-nav';

interface NavigationItem {
  title: string;
  href: string;
  icon?: React.ComponentType;
  children?: NavigationItem[];
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  navigation: NavigationItem[];
  userRole: string;
}

export function DashboardLayout({
  children,
  navigation,
  userRole,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar - desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto border-r bg-white">
          <div className="flex items-center flex-shrink-0 px-4">
            <img
              className="h-8 w-auto"
              src="/logo.svg"
              alt="MyRoomie"
            />
          </div>
          <div className="mt-5 flex-grow flex flex-col">
            <SidebarNav items={navigation} userRole={userRole} />
          </div>
          <div className="p-4 border-t">
            <UserProfile />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Mobile header */}
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-white border-b">
          <MobileMenuButton />
        </div>

        {/* Content area */}
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}

// Usage
// app/(dashboard)/layout.tsx
import { getCurrentUser } from '@/lib/auth';
import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import { dashboardNavigation } from '@/config/navigation';

export default async function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <DashboardLayout
      navigation={dashboardNavigation}
      userRole={user.role}
    >
      {children}
    </DashboardLayout>
  );
}
```

### Responsive Design

```typescript
// 👉 AI: Use these responsive design patterns
// components/properties/property-grid.tsx

export function PropertyGrid({ properties }: { properties: Property[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}

// Responsive property card
export function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
      {/* Image container with responsive sizing */}
      <div className="relative h-48 sm:h-40 md:h-48 lg:h-40 xl:h-48">
        <img
          src={property.imageUrl || '/images/property-placeholder.jpg'}
          alt={property.address}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <PropertyStatusBadge status={property.status} />
        </div>
      </div>

      <div className="p-4">
        {/* Main content area */}
        <div className="mb-2">
          <h3 className="font-semibold text-lg line-clamp-1" title={property.address}>
            {property.address}
          </h3>
          <p className="text-gray-600 text-sm">
            {property.rooms.length} {property.rooms.length === 1 ? 'room' : 'rooms'} available
          </p>
        </div>

        {/* Price range */}
        <div className="mb-3">
          <PriceRange rooms={property.rooms} />
        </div>

        {/* Grid layout for amenities that adapts based on screen size */}
        <div className="grid grid-cols-2 gap-1 mb-4">
          {(property.amenities || []).slice(0, 4).map((amenity) => (
            <div key={amenity} className="flex items-center text-xs">
              <div className="w-1 h-1 rounded-full bg-blue-600 mr-1"></div>
              <span className="truncate">{amenity}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-2 border-t">
          <Link
            href={`/properties/${property.id}`}
            className="text-blue-600 text-sm font-medium hover:text-blue-800"
          >
            View Details
          </Link>

          <BookmarkButton propertyId={property.id} />
        </div>
      </div>
    </div>
  );
}

// Responsive container
// components/ui/container.tsx
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("container mx-auto px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

// Usage example
// <Container className="py-8">
//   <PropertyGrid properties={properties} />
// </Container>
```

## API & Server Functions

### Route Handler Pattern

```typescript
// 👉 AI: Use this pattern for API route handlers
// app/api/matches/[id]/route.ts

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createServerClient } from '@/lib/supabase/server';
import { getSession } from '@/lib/auth';

// Validate URL params
const paramsSchema = z.object({
  id: z.string().uuid('Invalid match ID'),
});

// Validate body for PATCH request
const updateSchema = z.object({
  status: z.enum(['accepted', 'rejected']),
});

// GET match details
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Validate params
    const result = paramsSchema.safeParse(params);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { id } = result.data;

    // Get authenticated user
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const supabase = createServerClient();

    // Fetch match with user details
    const { data: match, error } = await supabase
      .from('matches')
      .select(`
        *,
        user1:profiles!matches_user1_id_fkey(id, name, email, profile_image_url),
        user2:profiles!matches_user2_id_fkey(id, name, email, profile_image_url)
      `)
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Match not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Verify current user is part of this match
    const userId = session.user.id;
    if (match.user1_id !== userId && match.user2_id !== userId) {
      return NextResponse.json(
        { error: 'Forbidden: You are not part of this match' },
        { status: 403 }
      );
    }

    return NextResponse.json(match);
  } catch (error) {
    console.error('Error fetching match:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// Update match status (accept/reject)
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Validate params
    const paramsResult = paramsSchema.safeParse(params);
    if (!paramsResult.success) {
      return NextResponse.json(
        { error: paramsResult.error.issues[0].message },
        { status: 400 }
      );
    }

    const { id } = paramsResult.data;

    // Get authenticated user
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Validate request body
    const body = await request.json();
    const bodyResult = updateSchema.safeParse(body);

    if (!bodyResult.success) {
      return NextResponse.json(
        { error: bodyResult.error.issues[0].message },
        { status: 400 }
      );
    }

    const { status } = bodyResult.data;

    const supabase = createServerClient();

    // Get the match
    const { data: match, error: fetchError } = await supabase
      .from('matches')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Match not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { error: fetchError.message },
        { status: 500 }
      );
    }

    // Verify user is part of this match
    const userId = session.user.id;
    if (match.user1_id !== userId && match.user2_id !== userId) {
      return NextResponse.json(
        { error: 'Forbidden: You are not part of this match' },
        { status: 403 }
      );
    }

    // Update match status
    let updateData: any = {};

    if (match.user1_id === userId) {
      updateData.user1_status = status;
    } else {
      updateData.user2_status = status;
    }

    // Check if match is mutual (both accepted)
    if (status === 'accepted') {
      if (
        (match.user1_id === userId && match.user2_status === 'accepted') ||
        (match.user2_id === userId && match.user1_status === 'accepted')
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
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating match:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
```

### Server Action Pattern

```typescript
// 👉 AI: Use this pattern for server actions
// lib/actions/expense-actions.ts

'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { createServerClient } from '@/lib/supabase/server';
import { getCurrentUser } from '@/lib/auth';

// Schema for expense validation
const expenseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  amount: z.number().positive('Amount must be greater than 0'),
  currency: z.string().default('EUR'),
  category: z.string().min(1, 'Category is required'),
  property_id: z.string().uuid('Invalid property ID'),
  due_date: z.string().optional(),
  split_type: z.enum(['equal', 'proportional', 'custom']),
  participants: z.array(
    z.object({
      user_id: z.string().uuid(),
      amount: z.number().optional(),
      proportion: z.number().optional(),
    })
  ).min(1, 'At least one participant is required'),
});

type ExpenseInput = z.infer<typeof expenseSchema>;

export async function createExpense(data: ExpenseInput) {
  try {
    // Validate input
    const validatedData = expenseSchema.parse(data);

    // Get current user
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error('Authentication required');
    }

    const supabase = createServerClient();

    // Verify current user has access to this property
    const { data: propertyAccess, error: accessError } = await supabase
      .from('property_members')
      .select('id')
      .eq('property_id', validatedData.property_id)
      .eq('user_id', currentUser.id)
      .single();

    // Also check if they're the owner
    const { data: propertyOwnership, error: ownershipError } = await supabase
      .from('properties')
      .select('id')
      .eq('id', validatedData.property_id)
      .eq('owner_id', currentUser.id)
      .single();

    if (!propertyAccess && !propertyOwnership) {
      throw new Error('You do not have access to this property');
    }

    // Create expense in database
    const { data: expense, error: expenseError } = await supabase
      .from('expense_splits')
      .insert({
        property_id: validatedData.property_id,
        title: validatedData.title,
        description: validatedData.description || null,
        total_amount: validatedData.amount,
        currency: validatedData.currency,
        category: validatedData.category,
        due_date: validatedData.due_date || null,
        split_type: validatedData.split_type,
        creator_id: currentUser.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (expenseError) {
      throw new Error(`Failed to create expense: ${expenseError.message}`);
    }

    // Create individual expense shares
    const shares = validatedData.participants.map((participant) => ({
      expense_id: expense.id,
      user_id: participant.user_id,
      amount: calculateShareAmount(
        validatedData.split_type,
        validatedData.amount,
        participant,
        validatedData.participants
      ),
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));

    const { error: sharesError } = await supabase
      .from('expense_shares')
      .insert(shares);

    if (sharesError) {
      throw new Error(`Failed to create expense shares: ${sharesError.message}`);
    }

    // Revalidate related pages
    revalidatePath(`/properties/${validatedData.property_id}/finances`);
    revalidatePath('/dashboard');

    return { success: true, data: expense };
  } catch (error) {
    console.error('Create expense error:', error);
    return {
      success: false,
      error: error instanceof Error
        ? error.message
        : 'Failed to create expense'
    };
  }
}

// Helper function to calculate individual share amounts
function calculateShareAmount(
  splitType: string,
  totalAmount: number,
  participant: { user_id: string; amount?: number; proportion?: number },
  allParticipants: { user_id: string; amount?: number; proportion?: number }[]
) {
  if (splitType === 'equal') {
    return totalAmount / allParticipants.length;
  }

  if (splitType === 'custom' && participant.amount !== undefined) {
    return participant.amount;
  }

  if (splitType === 'proportional' && participant.proportion !== undefined) {
    const totalProportion = allParticipants.reduce(
      (sum, p) => sum + (p.proportion || 0),
      0
    );

    return (participant.proportion / totalProportion) * totalAmount;
  }

  // Default to equal split if invalid configuration
  return totalAmount / allParticipants.length;
}
```

### API Response Format

```typescript
// 👉 AI: Use this pattern for API response format
// lib/api-utils.ts

import { NextResponse } from 'next/server';

type ApiSuccessResponse<T> = {
  data: T;
  pagination?: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
  message?: string;
};

type ApiErrorResponse = {
  error: string;
  details?: any;
  code?: string;
};

export function apiResponse<T>(
  data: T,
  options?: {
    status?: number;
    pagination?: ApiSuccessResponse<T>['pagination'];
    message?: string;
  }
): NextResponse<ApiSuccessResponse<T>> {
  const { status = 200, pagination, message } = options || {};

  const response: ApiSuccessResponse<T> = { data };

  if (pagination) {
    response.pagination = pagination;
  }

  if (message) {
    response.message = message;
  }

  return NextResponse.json(response, { status });
}

export function apiError(
  error: string | Error,
  options?: {
    status?: number;
    details?: any;
    code?: string;
  }
): NextResponse<ApiErrorResponse> {
  const { status = 400, details, code } = options || {};
  const errorMessage = error instanceof Error ? error.message : error;

  const response: ApiErrorResponse = { error: errorMessage };

  if (details) {
    response.details = details;
  }

  if (code) {
    response.code = code;
  }

  return NextResponse.json(response, { status });
}

// Usage example
// app/api/properties/route.ts

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');

    const supabase = createServerClient();

    // Fetch properties with pagination
    const { data, error, count } = await supabase
      .from('properties')
      .select('*', { count: 'exact' })
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (error) {
      throw error;
    }

    const totalPages = Math.ceil((count || 0) / pageSize);

    return apiResponse(data, {
      pagination: {
        page,
        pageSize,
        totalItems: count || 0,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return apiError(error, {
      status: 500,
      code: 'PROPERTIES_FETCH_ERROR'
    });
  }
}
