---
title: MyRoomie - Next.js 15 Development Guidelines for AI Code Generation
version: 1.1.0
lastUpdated: 2025-05-02
purpose: "AI-driven development for MyRoomie platform"
tags:
  - nextjs
  - react
  - typescript
  - supabase
  - myroomie
  - living-as-a-service
---

# MyRoomie - Next.js 15 Development Guidelines for AI Code Generation

Last updated: May 02, 2025

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
      "auth_helpers": "@supabase/ssr@0.16.0"
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
    "auth": "supabase_auth_with_ssr",
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

1. @Technology Stack Reference
2. @Key Coding Principles
3. @File & Component Structure
4. @Component Templates
5. @Data Fetching Patterns
6. @State Management Patterns
7. @Form Implementation Patterns
8. @Authentication & Authorization
9. @Database Schema
10. @API & Server Functions
11. @Error Handling Patterns
12. @TypeScript Implementation
13. @Database Schema
14. @Feature Implementation
15. @Testing Templates
16. @Internationalization
17. @Progressive Web App (PWA)
18. @Anti-Patterns to Avoid
19. @Business Context & Roadmap

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
  "@supabase/ssr": "0.16.0",
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
  const supabase = await createServerClient();
  
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
    const supabase = await createServerClient();
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
  const supabase = await createServerClient();
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
  const supabase = await createServerClient();
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
  const supabase = await createServerClient();
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
  const supabase = await createServerClient();
  
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
  
  const supabase = await createServerClient();
  
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
import { createClientComponentClient } from '@/lib/supabase/client';
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
    
    const supabase = await createServerClient();
    
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
    
    const supabase = await createServerClient();
    
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

### Supabase Auth Implementation

The application uses Supabase Auth for all authentication functionality:

#### Setting up environment variables

```typescript
// .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### Server-Side Auth Utilities

```typescript
// lib/supabase/server.ts
import { createServerClient as createServerClientBase } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { cache } from 'react';
import type { Database } from '@/types/database.types';

export const createServerClient = cache(async () => {
  const cookieStore = cookies();
  
  return createServerClientBase<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          cookieStore.set(name, value, options);
        },
        remove(name: string, options: any) {
          cookieStore.set(name, '', { ...options, maxAge: 0 });
        },
      },
    }
  );
});

// Helper function to get the current user from the server
export async function getCurrentUser() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
```

#### Client-Side Auth Utilities

```typescript
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/database.types';

export function createClientComponentClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

#### Middleware for Auth

```typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const pathname = request.nextUrl.pathname;
  
  // Create a Supabase client specifically for middleware
  const supabase = createMiddlewareClient({ 
    req: request, 
    res: response 
  });
  
  // Refresh session if available
  await supabase.auth.getSession();
  
  // Check auth for protected routes
  if (isProtectedRoute(pathname)) {
    const { data: { session } } = await supabase.auth.getSession();
    
    // If no session, redirect to login
    if (!session) {
      const redirectUrl = new URL('/login', request.url);
      redirectUrl.searchParams.set('callbackUrl', request.nextUrl.href);
      return NextResponse.redirect(redirectUrl);
    }
    
    // For role-specific routes, check the user's role
    if (pathname.startsWith('/admin') && 
        session?.user?.user_metadata?.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }
  
  return response;
}

// Helper function to determine if a route is protected
function isProtectedRoute(pathname: string): boolean {
  const protectedPaths = [
    '/dashboard',
    '/account',
    '/admin',
    '/properties/manage',
    '/matches',
  ];
  
  return protectedPaths.some(path => pathname.startsWith(path));
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/auth).*)',
  ],
}
```

#### Auth Context Provider

```typescript
// components/providers/auth-provider.client.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createClientComponentClient } from '@/lib/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
          setIsLoading(false);
        }
      );
      
      setIsLoading(false);
      
      return () => {
        subscription?.unsubscribe();
      };
    };
    
    initSupabase();
  }, [supabase]);
  
  const signOut = async () => {
    await supabase.auth.signOut();
  };
  
  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        session, 
        isLoading, 
        signOut 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
```

#### Login Form

```typescript
// components/auth/login-form.client.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createClientComponentClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm({ redirectTo = '/dashboard' }: { redirectTo?: string }) {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClientComponentClient();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  
  const onSubmit = async (data: LoginFormValues) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      
      if (error) throw error;
      
      router.push(redirectTo);
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to sign in'
      );
    }
  };
  
  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <Input
              id="password"
              type="password"
              {...register('password')}
              placeholder="••••••••"
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </Button>
        </div>
      </form>
    </div>
  );
}
```

#### Sign Up Form

```typescript
// components/auth/signup-form.client.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createClientComponentClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export function SignupForm({ redirectTo = '/onboarding' }: { redirectTo?: string }) {
  const [error, setError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });
  
  const onSubmit = async (data: SignupFormValues) => {
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) throw error;
      
      setEmailSent(true);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to sign up'
      );
    }
  };
  
  if (emailSent) {
    return (
      <div className="space-y-4">
        <Alert>
          <AlertDescription>
            A confirmation email has been sent to your email address.
            Please check your inbox and follow the link to complete your registration.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <Input
              id="name"
              {...register('name')}
              placeholder="John Doe"
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">
                {errors.name.message}
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
              {...register('email')}
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <Input
              id="password"
              type="password"
              {...register('password')}
              placeholder="••••••••"
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing up...' : 'Sign up'}
          </Button>
        </div>
      </form>
    </div>
  );
}
```

#### OAuth Provider Authentication

```typescript
// components/auth/oauth-buttons.client.tsx
'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { GoogleIcon, GithubIcon } from '@/components/ui/icons';

export function OAuthButtons({ redirectTo = '/dashboard' }: { redirectTo?: string }) {
  const [isLoading, setIsLoading] = useState({
    google: false,
    github: false,
  });
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient();
  
  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    try {
      setIsLoading({ ...isLoading, [provider]: true });
      setError(null);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback?redirect_to=${redirectTo}`,
        },
      });
      
      if (error) throw error;
    } catch (error) {
      setError(
        error instanceof Error ? error.message : `Failed to sign in with ${provider}`
      );
    } finally {
      setIsLoading({ ...isLoading, [provider]: false });
    }
  };
  
  return (
    <div className="space-y-3">
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => handleOAuthLogin('google')}
        disabled={isLoading.google}
      >
        <GoogleIcon className="h-5 w-5 mr-2" />
        {isLoading.google ? 'Signing in...' : 'Continue with Google'}
      </Button>
      
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => handleOAuthLogin('github')}
        disabled={isLoading.github}
      >
        <GithubIcon className="h-5 w-5 mr-2" />
        {isLoading.github ? 'Signing in...' : 'Continue with GitHub'}
      </Button>
      
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}
```

#### Auth Callback Route

```typescript
// app/auth/callback/route.ts
import { createServerClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const redirectTo = requestUrl.searchParams.get('redirect_to') || '/dashboard';
  
  if (code) {
    const supabase = await createServerClient();
    
    // Exchange the code for a session
    await supabase.auth.exchangeCodeForSession(code);
  }
  
  // Redirect to the dashboard or intended destination
  return NextResponse.redirect(new URL(redirectTo, request.url));
}
```

### Role-Based Access Control

The application implements a comprehensive role-based access control (RBAC) system using Supabase:

#### User Roles

- `user`: Regular user
- `landlord`: Property owner
- `admin`: System administrator
- `enterprise`: Enterprise client

#### Protected Route Components

```typescript
// components/auth/protected-route.server.tsx
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export async function ProtectedRoute({ 
  children, 
  allowedRoles = [] 
}: ProtectedRouteProps) {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/login');
  }
  
  // If roles are specified, check if user has an allowed role
  if (allowedRoles.length > 0) {
    const userRole = user.user_metadata?.role || 'user';
    
    if (!allowedRoles.includes(userRole)) {
      redirect('/dashboard'); // Redirect to a default page
    }
  }
  
  return <>{children}</>;
}

// Usage in layout
// app/(dashboard)/admin/layout.tsx
import { ProtectedRoute } from '@/components/auth/protected-route.server';

export default function AdminLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="admin-layout">
        <AdminSidebar />
        <main className="admin-content">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
```

#### Role-Conditional UI Rendering

```typescript
// components/ui/conditional-role.client.tsx
'use client';

import { useAuth } from '@/components/providers/auth-provider.client';

interface ConditionalRoleProps {
  children: React.ReactNode;
  allowedRoles: string[];
  fallback?: React.ReactNode;
}

export function ConditionalRole({ 
  children, 
  allowedRoles, 
  fallback = null 
}: ConditionalRoleProps) {
  const { user } = useAuth();
  
  if (!user) {
    return fallback;
  }
  
  const userRole = user.user_metadata?.role || 'user';
  
  if (!allowedRoles.includes(userRole)) {
    return fallback;
  }
  
  return <>{children}</>;
}

// Usage in components
// components/properties/property-actions.client.tsx
import { ConditionalRole } from '@/components/ui/conditional-role.client';

export function PropertyActions({ propertyId }: { propertyId: string }) {
  return (
    <div className="space-x-2">
      <ConditionalRole allowedRoles={['admin', 'landlord']}>
        <Button variant="outline" onClick={handleEdit}>
          Edit Property
        </Button>
        <Button variant="destructive" onClick={handleDelete}>
          Delete Property
        </Button>
      </ConditionalRole>
    </div>
  );
}
```

#### Database Security with Row Level Security

```sql
-- Example RLS policy for properties
CREATE POLICY "Public properties are viewable by everyone" 
ON properties FOR SELECT
USING (status = 'active');

CREATE POLICY "Users can create properties" 
ON properties FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can update their properties" 
ON properties FOR UPDATE
TO authenticated
USING (auth.uid() = owner_id);

CREATE POLICY "Owners can delete their properties" 
ON properties FOR DELETE
TO authenticated
USING (auth.uid() = owner_id);

-- Admin policy (override other policies)
CREATE POLICY "Admins can do everything with properties" 
ON properties
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND user_metadata->>'role' = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND user_metadata->>'role' = 'admin'
  )
);
```

## Data Fetching

### Server Components

Server Components fetch data directly from the database:

```typescript
// app/(dashboard)/properties/page.tsx
import { createServerClient } from '@/lib/supabase/server';
import { PropertyList } from '@/components/properties/property-list';

export default async function PropertiesPage({ searchParams }: { searchParams: { query?: string } }) {
  const supabase = await createServerClient();
  
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

### Repository Pattern for Server Components

```typescript
// lib/repositories/property-repository.ts
import { createServerClient } from '@/lib/supabase/server';
import { type Database } from '@/types/database.types';

type Property = Database['public']['Tables']['properties']['Row'];
type PropertyCreateInput = Database['public']['Tables']['properties']['Insert'];

export const PropertyRepository = {
  async findAll(filters = {}) {
    const supabase = await createServerClient();
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
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from('properties')
      .select('*, rooms(*)')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return data;
  },
  
  async create(property: PropertyCreateInput) {
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from('properties')
      .insert(property)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },
  
  async update(id: string, updates: Partial<Property>) {
    const supabase = await createServerClient();
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
    const supabase = await createServerClient();
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    return true;
  },
};
```

### Client Component Data Fetching with React Query

```typescript
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
```

## Error Handling

### Error Boundary

```typescript
// components/error-boundary.tsx
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ErrorBoundary({ 
  children, 
  fallback
}: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      setHasError(true);
      setError(error.error || new Error('An unknown error occurred'));
      
      // Report to monitoring service
      // reportError(error);
    };
    
    window.addEventListener('error', handleError);
    
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);
  
  if (hasError) {
    if (fallback) {
      return <>{fallback}</>;
    }
    
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
        <p className="text-gray-600 mb-6 max-w-md">
          We're sorry for the inconvenience. Our team has been notified of this issue.
        </p>
        {error && (
          <div className="mb-6 p-4 bg-gray-100 rounded-md text-left overflow-auto max-w-md">
            <p className="text-sm text-red-600">
              {error.message || 'Unknown error'}
            </p>
          </div>
        )}
        <Button onClick={() => window.location.reload()}>
          Reload page
        </Button>
      </div>
    );
  }
  
  return <>{children}</>;
}
```

### Error Component for API Errors

```typescript
// components/ui/error-display.tsx
interface ErrorDisplayProps {
  error: Error | unknown;
  title?: string;
  retry?: () => void;
}

export function ErrorDisplay({ 
  error, 
  title = 'Error', 
  retry 
}: ErrorDisplayProps) {
  const errorMessage = error instanceof Error 
    ? error.message 
    : 'An unknown error occurred';
  
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{title}</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{errorMessage}</p>
          </div>
          {retry && (
            <div className="mt-4">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={retry}
                className="text-red-800 bg-red-50 hover:bg-red-100"
              >
                Try again
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

### API Error Handler

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

## TypeScript Implementation

### Type Definitions for Database

```typescript
// types/database.types.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string
          bio: string | null
          personality: string | null
          profile_image_url: string | null
          preferred_market: string | null
          role: string | null
        }
        Insert: {
          id: string
          created_at?: string
          name: string
          email: string
          bio?: string | null
          personality?: string | null
          profile_image_url?: string | null
          preferred_market?: string | null
          role?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          email?: string
          bio?: string | null
          personality?: string | null
          profile_image_url?: string | null
          preferred_market?: string | null
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      properties: {
        Row: {
          id: string
          owner_id: string
          address: string
          details: Json | null
          amenities: string[]
          status: string
          created_at: string
          coordinates: unknown | null
          market_code: string | null
        }
        Insert: {
          id?: string
          owner_id: string
          address: string
          details?: Json | null
          amenities?: string[]
          status?: string
          created_at?: string
          coordinates?: unknown | null
          market_code?: string | null
        }
        Update: {
          id?: string
          owner_id?: string
          address?: string
          details?: Json | null
          amenities?: string[]
          status?: string
          created_at?: string
          coordinates?: unknown | null
          market_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "properties_owner_id_fkey"
            columns: ["owner_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "properties_market_code_fkey"
            columns: ["market_code"]
            referencedRelation: "market_configs"
            referencedColumns: ["market_code"]
          }
        ]
      }
      rooms: {
        Row: {
          id: string
          property_id: string
          name: string
          size: number
          price: number
          availability: string[] | null
          lease_type: string
          description: string | null
          features: string[] | null
          created_at: string
        }
        Insert: {
          id?: string
          property_id: string
          name: string
          size: number
          price: number
          availability?: string[] | null
          lease_type: string
          description?: string | null
          features?: string[] | null
          created_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          name?: string
          size?: number
          price?: number
          availability?: string[] | null
          lease_type?: string
          description?: string | null
          features?: string[] | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rooms_property_id_fkey"
            columns: ["property_id"]
            referencedRelation: "properties"
            referencedColumns: ["id"]
          }
        ]
      }
      // Other tables...
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
