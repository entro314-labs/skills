---
title: Next.js 15.x Development Guidelines for AI Code Generation
version: 3.0.0
lastUpdated: 2025-04-23
purpose: "Complete AI-driven development"
tags:
  - nextjs
  - react
  - tailwind
  - TypeScript
  - Supabase
  - ai-development
---

# Next.js 15.x Development Guidelines for AI Code Generation

Last updated: April 23, 2025

> This document is specifically optimized for AI coding assistants to generate complete application code following our team standards. AI: Use these guidelines to generate production-ready Next.js code.

## 🤖 AI Quick Reference

```json
{
  "framework": {
    "next_version": "15.3.1",
    "react_version": "19.1.0",
    "typescript_version": "5.8.3",
    "tailwind_version": "4.1.4",
    "supabase": {
      "client": "@supabase/supabase-js@^3.43.0",
      "auth_helpers": "@supabase/auth-helpers-nextjs@^0.16.0",
      "ui": "@supabase/ui@^0.52.0"
    },
    "state": {
      "global": "zustand@5.0.4",
      "server": "TanStack Query@5.74.6" 
    }
  },
  "architecture": {
    "default_component_type": "server",
    "client_component_max_loc": 500,
    "file_naming": "kebab-case",
    "component_naming": "PascalCase",
    "component_organization": "feature-based",
    "state_preference": "server-first"
  },
  "patterns": {
    "data_fetching": "fetch_in_server_components",
    "auth": "supabase_auth_helpers",
    "forms": "react_hook_form_with_zod",
    "styling": "tailwind_with_cva",
    "error_handling": "error_boundaries_with_fallbacks"
  },
  "code_style": {
    "general": "functional",
    "imports": "explicit_named_imports",
    "exports": "named_component_exports",
    "types": "explicit_interface_props",
    "functions": "arrow_functions_preferred"
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
13. [Testing Templates](#testing-templates)
14. [Common Features Implementation](#common-features-implementation)
15. [Anti-Patterns to Avoid](#anti-patterns-to-avoid)
16. [Code Generation Examples](#code-generation-examples)

## Technology Stack Reference

**Core Technologies:**

```json
{
  "next": "15.3.1",
  "react": "19.1.0",
  "typescript": "5.8.3",
  "tailwindcss": "4.1.4",
  "@supabase/supabase-js": "3.43.0",
  "@supabase/auth-helpers-nextjs": "0.16.0",
  "zustand": "5.0.4",
  "@tanstack/react-query": "5.74.6",
  "zod": "3.22.4",
  "react-hook-form": "7.53.0",
  "class-variance-authority": "0.7.0",
  "next-intl": "3.5.4"
}
```

## Key Coding Principles

*These principles guide all code generation decisions.*

**KP-1.** **Server-first architecture**: Default to Server Components for all pages and most components.

```typescript
// 👉 AI: Generate Server Components by default (no 'use client' directive)
// app/users/page.tsx
import { UsersTable } from '@/components/users/users-table';

export default async function UsersPage() {
  return <UsersTable />;
}
```

**KP-2.** **TypeScript everywhere**: All code must be strongly typed with proper interfaces.

```typescript
// 👉 AI: Always define interfaces for component props and data structures
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
}

interface UsersTableProps {
  users: User[];
  isLoading?: boolean;
  onUserSelect?: (userId: string) => void;
}
```

**KP-3.** **Explicit component boundaries**: Use `.server.tsx` and `.client.tsx` suffixes.

```typescript
// 👉 AI: Use these naming conventions for all components
// components/users/user-card.server.tsx - Server Component
// components/users/user-form.client.tsx - Client Component
```

**KP-4.** **Defensive coding**: Implement proper error handling, loading states, and empty states.

```typescript
// 👉 AI: Always include error, loading, and empty states in components
export async function ProductsGrid() {
  try {
    const products = await fetchProducts();
    
    if (products.length === 0) {
      return <EmptyState message="No products found" />;
    }
    
    return <Grid products={products} />;
  } catch (error) {
    return <ErrorDisplay error={error} />;
  }
}
```

**KP-5.** **Accessibility first**: All UI must be WCAG AA compliant.

```typescript
// 👉 AI: Always include proper ARIA attributes and semantic HTML
<button
  aria-label="Delete item"
  onClick={handleDelete}
  disabled={isLoading}
  className="text-red-500 hover:text-red-700 focus:ring-2 focus:ring-red-500"
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
│   ├── api/              # API routes (GET.ts, POST.ts)
│   ├── layout.tsx        # Root layout
├── components/           # UI components
│   ├── ui/               # Primitive UI components
│   ├── [feature]/        # Feature-specific components
├── lib/                  # Utility functions
│   ├── actions/          # Server actions
│   ├── api/              # API utility functions
│   ├── supabase/         # Supabase client functions
│   ├── utils/            # General utilities
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
├── stores/               # Zustand stores
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
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
// UI components
import { Button } from '@/components/ui/button';
// Utilities
import { formatDate } from '@/lib/utils';
// Types
import type { User } from '@/types/user';

// 2. Component definition
export function UserProfile({ userId }: UserProfileProps) {
  // 3. Hooks, state and effects
  const [isEditing, setIsEditing] = useState(false);
  
  // 4. Handler functions
  const handleEdit = () => setIsEditing(true);
  
  // 5. Render logic
  return (
    <div className="p-4 border rounded-lg">
      {/* JSX structure */}
    </div>
  );
}

// 6. Helper components/functions (if needed)
function UserAvatar({ url }: { url: string }) {
  return <img src={url} alt="User avatar" className="rounded-full" />;
}

// 7. Types
interface UserProfileProps {
  userId: string;
}
```

## Component Templates

### Page Component Template

```typescript
// 👉 AI: Use this template for page components
// app/[feature]/page.tsx

import { Suspense } from 'react';
import { FeatureComponent } from '@/components/feature/feature-component.server';
import { FeatureHeader } from '@/components/feature/feature-header';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';

// Metadata
export const metadata = {
  title: 'Feature Page',
  description: 'Description of this feature page',
};

// Optional: Static params for static generation
export async function generateStaticParams() {
  // If this is a dynamic route that should be static
  return [
    { param: 'value1' },
    { param: 'value2' },
  ];
}

// Default export: The page component
export default function FeaturePage({ 
  params,
  searchParams,
}: {
  params: { slug?: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <main className="container py-8">
      <FeatureHeader />
      
      <Suspense fallback={<LoadingSkeleton />}>
        <FeatureComponent 
          slug={params.slug}
          filter={searchParams.filter as string}
        />
      </Suspense>
    </main>
  );
}
```

### Server Component Template

```typescript
// 👉 AI: Use this template for server components
// components/feature/feature-list.server.tsx

import { cache } from 'react';
import { db } from '@/lib/db';
import { FeatureItem } from './feature-item.server';
import { EmptyState } from '@/components/ui/empty-state';

// Data fetching (with caching)
const getFeatureItems = cache(async (filter?: string) => {
  // Fetch data with proper error handling
  try {
    // Data fetching logic
    return items;
  } catch (error) {
    console.error('Failed to fetch items:', error);
    throw new Error('Failed to load items. Please try again later.');
  }
});

// Component
export async function FeatureList({ 
  filter,
}: { 
  filter?: string 
}) {
  const items = await getFeatureItems(filter);
  
  if (!items || items.length === 0) {
    return <EmptyState message="No items found" />;
  }
  
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <FeatureItem key={item.id} item={item} />
      ))}
    </div>
  );
}
```

### Client Component Template

```typescript
// 👉 AI: Use this template for client components
// components/feature/feature-form.client.tsx

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createFeatureItem } from '@/lib/actions/feature-actions';

// Form schema
const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function FeatureForm({ 
  onSuccess,
}: { 
  onSuccess?: () => void 
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });
  
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      await createFeatureItem(data);
      form.reset();
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
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
      
      {/* Additional form fields */}
      
      {error && (
        <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save'}
      </Button>
    </form>
  );
}
```

## Data Fetching Patterns

### Server Component Data Fetching

```typescript
// 👉 AI: Use this pattern for Server Component data fetching
// components/products/product-list.server.tsx

import 'server-only';
import { cache } from 'react';
import { ProductCard } from './product-card.server';

// Cache the data fetch to avoid redundant requests
export const getProducts = cache(async (category?: string) => {
  const url = new URL(`${process.env.API_URL}/products`);
  if (category) url.searchParams.set('category', category);
  
  const res = await fetch(url, { 
    // Explicitly set cache policy - crucial in Next.js 15.x
    cache: 'no-store',
    // For authenticated requests, include headers
    headers: {
      'Authorization': `Bearer ${process.env.API_TOKEN}`
    }
  });
  
  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }
  
  return res.json();
});

export async function ProductList({ category }: { category?: string }) {
  const products = await getProducts(category);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Parallel Data Fetching

```typescript
// 👉 AI: Use this pattern for parallel data fetching
// app/dashboard/page.tsx

import { Suspense } from 'react';
import { UserStats } from '@/components/users/user-stats.server';
import { RevenueChart } from '@/components/dashboard/revenue-chart.server';
import { ProductsList } from '@/components/products/products-list.server';
import { DashboardSkeleton } from '@/components/skeletons/dashboard-skeleton';

export default async function DashboardPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Suspense fallback={<DashboardSkeleton type="chart" />}>
          {/* Each component fetches its own data in parallel */}
          <RevenueChart />
        </Suspense>
      </div>
      
      <div>
        <Suspense fallback={<DashboardSkeleton type="stats" />}>
          <UserStats />
        </Suspense>
      </div>
      
      <div className="lg:col-span-3">
        <Suspense fallback={<DashboardSkeleton type="list" />}>
          <ProductsList />
        </Suspense>
      </div>
    </div>
  );
}
```

### Client Component Data Fetching with TanStack Query

```typescript
// 👉 AI: Use this pattern for Client Component data fetching
// hooks/use-products.ts

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useProducts(category?: string) {
  const queryClient = useQueryClient();
  
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products', category],
    queryFn: async () => {
      const url = new URL('/api/products');
      if (category) url.searchParams.set('category', category);
      
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Failed to fetch products');
      }
      return res.json();
    },
  });
  
  const addProduct = useMutation({
    mutationFn: async (newProduct) => {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      
      if (!res.ok) {
        throw new Error('Failed to add product');
      }
      
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product added successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to add product');
    },
  });
  
  return {
    products,
    isLoading,
    error,
    addProduct: addProduct.mutate,
    isAddingProduct: addProduct.isPending,
  };
}

// Usage in client component
// components/products/product-admin.client.tsx
'use client';

import { useProducts } from '@/hooks/use-products';

export function ProductAdmin() {
  const { products, isLoading, addProduct } = useProducts();
  
  // Component implementation
}
```

## State Management Patterns

### Server-first State

```typescript
// 👉 AI: Use server-first approach wherever possible
// app/products/[id]/page.tsx

export default async function ProductPage({ params }: { params: { id: string } }) {
  // Fetch product and related data on server
  const product = await getProduct(params.id);
  const relatedProducts = await getRelatedProducts(params.id);
  
  return (
    <div>
      {/* Pass fully hydrated data to client components */}
      <ProductView product={product} relatedProducts={relatedProducts} />
    </div>
  );
}
```

### Global Client State with Zustand

```typescript
// 👉 AI: Use this pattern for global client state
// stores/cart-store.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  totalPrice: number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => set((state) => {
        const existingItem = state.items.find((i) => i.id === item.id);
        
        if (existingItem) {
          // Update quantity if item exists
          return {
            items: state.items.map((i) => 
              i.id === item.id 
                ? { ...i, quantity: i.quantity + 1 } 
                : i
            ),
          };
        }
        
        // Add new item
        return {
          items: [...state.items, { ...item, quantity: 1 }],
        };
      }),
      
      removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      })),
      
      updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map((item) => 
          item.id === id ? { ...item, quantity } : item
        ),
      })),
      
      clearCart: () => set({ items: [] }),
      
      get itemCount() {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      get totalPrice() {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity, 
          0
        );
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

// Usage in client component
// components/cart/cart-button.client.tsx
'use client';

import { useCartStore } from '@/stores/cart-store';

export function CartButton() {
  const { itemCount, totalPrice } = useCartStore();
  
  return (
    <button className="relative">
      <ShoppingCartIcon />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {itemCount}
        </span>
      )}
    </button>
  );
}
```

### Form State with React Hook Form

```typescript
// 👉 AI: Use this pattern for form state
// components/checkout/checkout-form.client.tsx

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { processCheckout } from '@/lib/actions/checkout-actions';
import { useCartStore } from '@/stores/cart-store';

const checkoutSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  postalCode: z.string().min(3, 'Postal code is required'),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function CheckoutForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { items, totalPrice, clearCart } = useCartStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
  });
  
  const onSubmit = async (data: CheckoutFormValues) => {
    if (items.length === 0) return;
    
    setIsSubmitting(true);
    
    try {
      await processCheckout({
        items,
        totalAmount: totalPrice,
        shippingDetails: data,
      });
      
      clearCart();
      // Redirect to success page or show success message
    } catch (error) {
      console.error('Checkout failed:', error);
      // Show error message
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Full Name
        </label>
        <Input
          id="name"
          {...register('name')}
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>
      
      {/* Additional form fields */}
      
      <div className="pt-4 border-t">
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting || items.length === 0}
        >
          {isSubmitting ? 'Processing...' : `Pay ${totalPrice.toFixed(2)}`}
        </Button>
      </div>
    </form>
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
import { createSafeAction } from 'next-safe-action';
import { sendEmail } from '@/lib/email';
import { db } from '@/lib/db';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const submitContactForm = createSafeAction(contactSchema, async (data) => {
  try {
    // Save to database
    const savedMessage = await db.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        message: data.message,
        createdAt: new Date(),
      },
    });
    
    // Send notification email
    await sendEmail({
      to: 'support@example.com',
      subject: 'New Contact Form Submission',
      text: `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`,
    });
    
    return { success: true, data: { id: savedMessage.id } };
  } catch (error) {
    console.error('Failed to submit contact form:', error);
    return { 
      success: false, 
      error: 'Failed to submit form. Please try again later.' 
    };
  }
});

// Usage in component
// components/contact/contact-form.tsx

'use client';

import { useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { submitContactForm } from '@/lib/actions/contact-actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Sending...' : 'Send Message'}
    </Button>
  );
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(submitContactForm.action, { 
    message: null, 
    success: null 
  });
  
  // Reset form on successful submission
  if (state.success && formRef.current) {
    formRef.current.reset();
  }
  
  return (
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
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          minLength={10}
          className="w-full p-2 border rounded-md"
        />
      </div>
      
      {state.error && (
        <p className="text-red-500">{state.error}</p>
      )}
      
      {state.success && (
        <p className="text-green-500">Message sent successfully!</p>
      )}
      
      <SubmitButton />
    </form>
  );
}
```

### API Route Form Submission

```typescript
// 👉 AI: Use this pattern for forms using API routes
// app/api/newsletter/POST.ts

import { z } from 'zod';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Schema for validation
const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: Request) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const result = newsletterSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message }, 
        { status: 400 }
      );
    }
    
    const { email } = result.data;
    
    // Check if email already exists
    const existingSubscriber = await db.newsletter.findUnique({
      where: { email },
    });
    
    if (existingSubscriber) {
      return NextResponse.json(
        { message: 'You are already subscribed' },
        { status: 200 }
      );
    }
    
    // Add to database
    await db.newsletter.create({
      data: { email, subscribedAt: new Date() },
    });
    
    return NextResponse.json(
      { message: 'Subscribed successfully' },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    );
  }
}

// Usage in client component
// components/newsletter/newsletter-form.client.tsx

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    setError(null);
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }
      
      setMessage(data.message);
      setEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        aria-label="Email address"
        required
        className="flex-grow"
      />
      
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Subscribing...' : 'Subscribe'}
      </Button>
      
      {message && (
        <p className="mt-2 text-sm text-green-600">{message}</p>
      )}
      
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </form>
  );
}
```

## Authentication & Authorization

### Supabase Auth Setup

```typescript
// 👉 AI: Use this pattern for Supabase Auth
// lib/supabase/auth.ts

import { createClient } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/types/supabase';

// Client-side Supabase client
export const createBrowserClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  
  return createClient<Database>(supabaseUrl, supabaseAnonKey);
};

// Server-side Supabase client
export const createServerSupabaseClient = async () => {
  const cookieStore = await cookies();
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
        set: (name, value, options) => {
          cookieStore.set({ name, value, ...options });
        },
        remove: (name, options) => {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );
};

// Middleware for Route Protection
// middleware.ts
import { NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req) {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;
  
  // Check x-middleware-subrequest for security (CVE-2025-29927)
  const isSubrequest = req.headers.get('x-middleware-subrequest');
  if (isSubrequest && !['next-route', 'next-api'].includes(isSubrequest)) {
    return new NextResponse(null, { status: 403 });
  }
  
  // Only run on protected routes
  if (
    pathname.startsWith('/dashboard') || 
    pathname.startsWith('/account')
  ) {
    const supabase = createMiddlewareClient({ req, res });
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    
    // Additional role-based checks
    if (
      pathname.startsWith('/admin') && 
      session.user.user_metadata.role !== 'admin'
    ) {
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
  ],
};
```

### Auth Components

```typescript
// 👉 AI: Use these patterns for auth UI components
// components/auth/login-form.client.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createBrowserClient } from '@/lib/supabase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const loginSchema = z.object({
  email: z.string().email('Valid email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  
  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    
    const supabase = createBrowserClient();
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      
      if (error) {
        throw error;
      }
      
      // Refresh the page to update auth state
      router.refresh();
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      setError(
        err instanceof Error 
          ? err.message 
          : 'Failed to login. Please check your credentials.'
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
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
            aria-invalid={!!errors.password}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
        
        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
      
      <div className="mt-4 text-center text-sm">
        <a href="/reset-password" className="text-blue-600 hover:underline">
          Forgot password?
        </a>
      </div>
    </div>
  );
}
```

### Auth Provider

```typescript
// 👉 AI: Use this pattern for auth context
// components/providers/auth-provider.client.tsx

'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createBrowserClient } from '@/lib/supabase/auth';
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createBrowserClient();
  
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);
  
  const signOut = async () => {
    await supabase.auth.signOut();
  };
  
  return (
    <AuthContext.Provider value={{ user, session, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
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
// components/ui/button.tsx

'use client';

import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500",
        outline: "border border-gray-300 bg-transparent hover:bg-gray-100 focus-visible:ring-gray-500",
        ghost: "hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-500",
        destructive: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
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
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, width, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, width, className }))}
        ref={ref}
        {...props}
      >
        {children}
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

export function DashboardLayout({ 
  children,
  sidebar,
}: { 
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar - fixed width */}
      <div className="hidden md:block w-64 p-4 border-r">
        {sidebar}
      </div>
      
      {/* Main content - flexible width */}
      <div className="flex-1 p-4 md:p-6 overflow-auto">
        {children}
      </div>
    </div>
  );
}

// Usage
// app/dashboard/layout.tsx
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { DashboardLayout } from '@/components/layouts/dashboard-layout';

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout sidebar={<DashboardSidebar />}>
      {children}
    </DashboardLayout>
  );
}
```

### Responsive Design

```typescript
// 👉 AI: Use these responsive design patterns
// components/product/product-grid.tsx

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// Mobile-first approach with container queries
// components/product/product-card.tsx
export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="@container border rounded-lg overflow-hidden">
      <div className="relative aspect-square">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-cover w-full h-full"
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-lg @sm:text-xl">{product.name}</h3>
        <p className="text-gray-600 @sm:text-lg">${product.price.toFixed(2)}</p>
        <div className="mt-3 @sm:flex @sm:items-center @sm:justify-between">
          <Button size="sm" className="w-full @sm:w-auto">Add to Cart</Button>
          <Button variant="ghost" size="sm" className="w-full mt-2 @sm:mt-0 @sm:w-auto">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}
```

## API & Server Functions

### Route Handler Pattern

```typescript
// 👉 AI: Use this pattern for API route handlers
// app/api/products/[id]/GET.ts

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createServerSupabaseClient } from '@/lib/supabase/auth';

// Validate URL params
const paramsSchema = z.object({
  id: z.string().uuid('Invalid product ID'),
});

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
    
    // Optional: Get authenticated user
    const supabase = await createServerSupabaseClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    // Fetch product
    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Check for private fields that should only be visible to admins
    if (product.isPrivate && (!session || session.user.user_metadata.role !== 'admin')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
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
// lib/actions/product-actions.ts

'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { createSafeAction } from 'next-safe-action';
import { createServerSupabaseClient } from '@/lib/supabase/auth';
import { isAdmin } from '@/lib/auth';

// Schema for validation
const productSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().optional(),
  price: z.number().positive('Price must be positive'),
  categoryId: z.string().uuid('Invalid category ID'),
  isPublished: z.boolean().default(false),
});

// Create product action
export const createProduct = createSafeAction(productSchema, async (data) => {
  try {
    // Get current user
    const supabase = await createServerSupabaseClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return { success: false, error: 'Authentication required' };
    }
    
    // Check if user is authorized
    if (!(await isAdmin(session.user.id))) {
      return { success: false, error: 'Not authorized' };
    }
    
    // Create product
    const { data: product, error } = await supabase
      .from('products')
      .insert({
        name: data.name,
        description: data.description || '',
        price: data.price,
        category_id: data.categoryId,
        is_published: data.isPublished,
        created_by: session.user.id,
      })
      .select()
      .single();
    
    if (error) {
      throw new Error(error.message);
    }
    
    // Revalidate product list page
    revalidatePath('/products');
    
    return { success: true, data: product };
  } catch (error) {
    console.error('Create product error:', error);
    return { 
      success: false, 
      error: error instanceof Error 
        ? error.message 
        : 'Failed to create product'
    };
  }
});

// Delete product action
export const deleteProduct = createSafeAction(
  z.object({ id: z.string().uuid() }),
  async ({ id }) => {
    try {
      // Authentication and authorization checks
      const supabase = await createServerSupabaseClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        return { success: false, error: 'Authentication required' };
      }
      
      if (!(await isAdmin(session.user.id))) {
        return { success: false, error: 'Not authorized' };
      }
      
      // Delete product
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Revalidate paths
      revalidatePath('/products');
      revalidatePath(`/products/${id}`);
      
      // Redirect after deletion
      redirect('/products');
    } catch (error) {
      console.error('Delete product error:', error);
      return { 
        success: false, 
        error: error instanceof Error 
          ? error.message 
          : 'Failed to delete product'
      };
    }
  }
);
```

### Edge API Pattern

```typescript
// 👉 AI: Use this pattern for edge API routes
// app/api/search/GET.ts

import { NextResponse } from 'next/server';
import { z } from 'zod';

// Export for Edge API
export const runtime = 'edge';

// Query parameters schema
const searchParamsSchema = z.object({
  q: z.string().min(1, 'Search query is required'),
  limit: z.string().optional().transform(val => {
    const parsed = parseInt(val || '10');
    return isNaN(parsed) ? 10 : Math.min(Math.max(1, parsed), 100);
  }),
  page: z.string().optional().transform(val => {
    const parsed = parseInt(val || '1');
    return isNaN(parsed) ? 1 : Math.max(1, parsed);
  }),
});

export async function GET(request: Request) {
  try {
    // Get the URL and search params
    const { searchParams } = new URL(request.url);
    
    // Validate search params
    const result = searchParamsSchema.safeParse(Object.fromEntries(searchParams));
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }
    
    const { q, limit, page } = result.data;
    
    // Rate limiting middleware would go here
    // (omitted for brevity - implement per your needs)
    
    // Search logic 
    const response = await fetch(
      `${process.env.SEARCH_API_URL}/search?query=${encodeURIComponent(q)}&limit=${limit}&page=${page}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SEARCH_API_KEY}`,
        },
      }
    );
    
    if (!response.ok) {
      throw new Error('Search API error');
    }
    
    const searchResults = await response.json();
    
    // Return search results
    return NextResponse.json(searchResults);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Failed to perform search' },
      { status: 500 }
    );
  }
}
```

## Error Handling Patterns

### Error Boundary

```typescript
// 👉 AI: Use this pattern for error boundaries
// app/[feature]/error.tsx

'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function FeatureError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error monitoring service
    console.error('Feature error:', error);
  }, [error]);
  
  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[400px]">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
        <p className="text-gray-600 mb-6">
          We're sorry, but there was an error loading this page.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset}>
            Try again
          </Button>
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            Go home
          </Button>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 p-4 bg-red-50 text-red-800 rounded-lg text-left overflow-auto max-w-md mx-auto">
            <p className="font-mono text-sm break-words">{error.message}</p>
            {error.stack && (
              <pre className="mt-2 text-xs overflow-auto">{error.stack}</pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
```

### Data Fetching Error Handling

```typescript
// 👉 AI: Use this pattern for data fetching errors
// components/products/product-details.server.tsx

import { notFound } from 'next/navigation';
import { ErrorBoundary } from 'react-error-boundary';

async function getProductDetails(id: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/products/${id}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      if (res.status === 404) {
        notFound(); // This will trigger not-found.tsx
      }
      throw new Error(`Failed to fetch product: ${res.status}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error; // Re-throw to be caught by the error boundary
  }
}

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="p-4 bg-red-50 rounded-lg">
      <h3 className="text-lg font-medium text-red-800">
        Failed to load product details
      </h3>
      <p className="text-red-700 mb-3">
        {error.message || 'There was an error loading the product information.'}
      </p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Try again
      </button>
    </div>
  );
}

export async function ProductDetails({ id }: { id: string }) {
  // In Server Components, Next.js error.tsx handles errors automatically,
  // but this shows how you might implement more granular error boundaries
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {/* Product details content */}
      <ProductDetailsContent productId={id} />
    </ErrorBoundary>
  );
}

async function ProductDetailsContent({ productId }: { productId: string }) {
  const product = await getProductDetails(productId);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <div className="text-xl font-semibold">${product.price.toFixed(2)}</div>
      {/* More product details */}
    </div>
  );
}
```

### Form Validation Error Handling

```typescript
// 👉 AI: Use this pattern for form validation errors
// components/checkout/billing-form.client.tsx

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { processPayment } from '@/lib/actions/payment-actions';

// Form schema with detailed error messages
const billingSchema = z.object({
  cardNumber: z
    .string()
    .regex(/^[0-9]{16}$/, 'Card number must be 16 digits with no spaces'),
  cardName: z
    .string()
    .min(2, 'Cardholder name is required'),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry date must be in MM/YY format'),
  cvv: z
    .string()
    .regex(/^[0-9]{3,4}$/, 'CVV must be 3 or 4 digits'),
});

type BillingFormValues = z.infer<typeof billingSchema>;

export function BillingForm({ 
  onSuccess,
  amount,
}: { 
  onSuccess: () => void;
  amount: number;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BillingFormValues>({
    resolver: zodResolver(billingSchema),
    defaultValues: {
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
    },
  });
  
  const onSubmit = async (data: BillingFormValues) => {
    setIsSubmitting(true);
    setServerError(null);
    
    try {
      // Process payment (this would normally go through a payment gateway)
      const result = await processPayment({
        ...data,
        amount,
      });
      
      if (!result.success) {
        throw new Error(result.error || 'Payment failed');
      }
      
      // Call success callback
      onSuccess();
    } catch (error) {
      // Handle different types of errors
      if (error instanceof z.ZodError) {
        // Schema validation errors (client-side)
        const fieldError = error.errors[0];
        setServerError(`Validation error: ${fieldError.message}`);
      } else if (error instanceof Error) {
        // Payment processing errors
        setServerError(error.message);
      } else {
        // Unknown errors
        setServerError('An unexpected error occurred during payment processing');
      }
      
      // Log error for monitoring
      console.error('Payment error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="cardName" className="block text-sm font-medium mb-1">
          Cardholder Name
        </label>
        <Input
          id="cardName"
          {...register('cardName')}
          placeholder="John Doe"
          aria-invalid={!!errors.cardName}
        />
        {errors.cardName && (
          <p className="mt-1 text-sm text-red-500">{errors.cardName.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
          Card Number
        </label>
        <Input
          id="cardNumber"
          {...register('cardNumber')}
          placeholder="1234567890123456"
          aria-invalid={!!errors.cardNumber}
        />
        {errors.cardNumber && (
          <p className="mt-1 text-sm text-red-500">{errors.cardNumber.message}</p>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="expiryDate" className="block text-sm font-medium mb-1">
            Expiry Date
          </label>
          <Input
            id="expiryDate"
            {...register('expiryDate')}
            placeholder="MM/YY"
            aria-invalid={!!errors.expiryDate}
          />
          {errors.expiryDate && (
            <p className="mt-1 text-sm text-red-500">{errors.expiryDate.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="cvv" className="block text-sm font-medium mb-1">
            CVV
          </label>
          <Input
            id="cvv"
            {...register('cvv')}
            placeholder="123"
            aria-invalid={!!errors.cvv}
          />
          {errors.cvv && (
            <p className="mt-1 text-sm text-red-500">{errors.cvv.message}</p>
          )}
        </div>
      </div>
      
      {serverError && (
        <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {serverError}
        </div>
      )}
      
      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
      </Button>
    </form>
  );
}
```

## TypeScript Implementation

### Component Props

```typescript
// 👉 AI: Use these patterns for TypeScript props
// components/data-table/data-table.tsx

import { ReactNode } from 'react';

// Define generic type for data
export interface TableColumn<T> {
  key: string;
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  cell?: (item: T) => ReactNode;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  rowKey: keyof T | ((item: T) => string);
  onRowClick?: (item: T) => void;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
  sorting?: {
    column: string | null;
    direction: 'asc' | 'desc' | null;
    onSort: (column: string) => void;
  };
}

export function DataTable<T>({
  columns,
  data,
  isLoading = false,
  emptyMessage = 'No data available',
  rowKey,
  onRowClick,
  pagination,
  sorting,
}: DataTableProps<T>) {
  // Implementation
  return (
    <div className="w-full overflow-hidden border rounded-lg">
      {/* Table implementation */}
    </div>
  );
}

// Usage example:
// <DataTable<User>
//   columns={[
//     { key: 'name', header: 'Name' },
//     { key: 'email', header: 'Email' },
//     { 
//       key: 'role', 
//       header: 'Role',
//       cell: (user) => <RoleBadge role={user.role} /> 
//     },
//   ]}
//   data={users}
//   rowKey="id"
//   onRowClick={(user) => navigate(`/users/${user.id}`)}
// />
```

### API Response Types

```typescript
// 👉 AI: Use these patterns for API response types
// types/api.ts

// Base response type
export interface ApiResponse<T> {
  data: T;
  meta?: {
    page?: number;
    pageSize?: number;
    totalItems?: number;
    totalPages?: number;
  };
}

// Error response type
export interface ApiErrorResponse {
  error: {
    message: string;
    code?: string;
    details?: Record<string, string[]>;
  };
}

// Pagination params
export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

// Filter params for lists
export interface ProductFilterParams extends PaginationParams {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: 'price' | 'createdAt' | 'name';
  sortOrder?: 'asc' | 'desc';
}

// Type guard for error responses
export function isApiError(response: unknown): response is ApiErrorResponse {
  return (
    typeof response === 'object' &&
    response !== null &&
    'error' in response &&
    typeof (response as ApiErrorResponse).error.message === 'string'
  );
}

// Helper to extract data from response
export async function fetchApi<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, options);
  
  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json();
    throw new Error(errorData.error.message || 'API request failed');
  }
  
  return response.json() as Promise<T>;
}
```

### Zod Schema Patterns

```typescript
// 👉 AI: Use these patterns for Zod schemas
// lib/schemas/user-schema.ts

import { z } from 'zod';

// Base schema with common validations
export const userBaseSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, 'Please enter a valid phone number')
    .optional(),
});

// Create user schema extends base with password requirements
export const createUserSchema = userBaseSchema.extend({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }
);

// Update user schema makes all fields optional except ID
export const updateUserSchema = userBaseSchema
  .partial()
  .extend({
    id: z.string().uuid('Invalid user ID'),
  });

// Type inference from schema
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

// Server-side validation function
export function validateUserData(data: unknown): CreateUserInput {
  return createUserSchema.parse(data);
}

// Client-side validation function (returns errors instead of throwing)
export function validateUserDataSafe(data: unknown) {
  return createUserSchema.safeParse(data);
}
```

## Testing Templates

### Component Test

```typescript
// 👉 AI: Use this pattern for component tests
// components/button/button.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click me</Button>);
    
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-blue-600'); // Default variant is primary
  });
  
  it('applies variant classes correctly', () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    
    const button = screen.getByRole('button', { name: 'Secondary Button' });
    expect(button).toHaveClass('bg-gray-100');
    expect(button).not.toHaveClass('bg-blue-600');
  });
  
  it('handles click events', () => {
    const handleClick = jest.fn();
    
    render(<Button onClick={handleClick}>Clickable</Button>);
    
    const button = screen.getByRole('button', { name: 'Clickable' });
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('is disabled when isLoading is true', () => {
    render(<Button isLoading>Loading</Button>);
    
    const button = screen.getByRole('button', { name: 'Loading' });
    expect(button).toBeDisabled();
  });
  
  it('renders with custom className', () => {
    render(<Button className="custom-class">Custom Button</Button>);
    
    const button = screen.getByRole('button', { name: 'Custom Button' });
    expect(button).toHaveClass('custom-class');
  });
});
```

### API Route Test

```typescript
// 👉 AI: Use this pattern for API route tests
// app/api/auth/register/POST.test.ts

import { NextRequest } from 'next/server';
import { POST } from './POST';
import { createServerSupabaseClient } from '@/lib/supabase/auth';

// Mock Supabase client
jest.mock('@/lib/supabase/auth', () => ({
  createServerSupabaseClient: jest.fn(),
}));

describe('POST /api/auth/register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('registers a new user successfully', async () => {
    // Mock Supabase response
    const mockSupabase = {
      auth: {
        signUp: jest.fn().mockResolvedValue({
          data: { user: { id: 'user-123' } },
          error: null,
        }),
      },
    };
    
    (createServerSupabaseClient as jest.Mock).mockResolvedValue(mockSupabase);
    
    // Create request with valid payload
    const request = new NextRequest('https://example.com/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'Password123',
        name: 'Test User',
      }),
    });
    
    // Call the handler
    const response = await POST(request);
    const data = await response.json();
    
    // Verify response
    expect(response.status).toBe(201);
    expect(data).toEqual({
      success: true,
      message: 'User registered successfully',
    });
    
    // Verify Supabase was called with correct params
    expect(mockSupabase.auth.signUp).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'Password123',
      options: {
        data: {
          name: 'Test User',
        },
      },
    });
  });
  
  it('returns validation error for invalid payload', async () => {
    // Create request with invalid payload
    const request = new NextRequest('https://example.com/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'invalid-email',
        password: 'short',
      }),
    });
    
    // Call the handler
    const response = await POST(request);
    const data = await response.json();
    
    // Verify validation failed
    expect(response.status).toBe(400);
    expect(data.error).toBeDefined();
    expect(data.error).toContain('valid email');
  });
  
  it('handles Supabase errors correctly', async () => {
    // Mock Supabase error
    const mockSupabase = {
      auth: {
        signUp: jest.fn().mockResolvedValue({
          data: null,
          error: {
            message: 'Email already in use',
          },
        }),
      },
    };
    
    (createServerSupabaseClient as jest.Mock).mockResolvedValue(mockSupabase);
    
    // Create request with valid payload
    const request = new NextRequest('https://example.com/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'existing@example.com',
        password: 'Password123',
        name: 'Existing User',
      }),
    });
    
    // Call the handler
    const response = await POST(request);
    const data = await response.json();
    
    // Verify error response
    expect(response.status).toBe(400);
    expect(data.error).toBe('Email already in use');
  });
});
```

### E2E Test

```typescript
// 👉 AI: Use this pattern for E2E tests
// e2e/login.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Go to login page before each test
    await page.goto('/login');
  });
  
  test('displays the login form', async ({ page }) => {
    // Check for form elements
    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
    await expect(page.getByText('Forgot password?')).toBeVisible();
  });
  
  test('shows validation errors for empty fields', async ({ page }) => {
    // Try to submit without filling fields
    await page.getByRole('button', { name: 'Sign In' }).click();
    
    // Check for validation messages
    await expect(page.getByText('Email is required')).toBeVisible();
    await expect(page.getByText('Password is required')).toBeVisible();
  });
  
  test('shows error for invalid credentials', async ({ page }) => {
    // Fill form with invalid credentials
    await page.getByLabel('Email').fill('invalid@example.com');
    await page.getByLabel('Password').fill('wrongpassword');
    
    // Submit form
    await page.getByRole('button', { name: 'Sign In' }).click();
    
    // Check for error message
    await expect(page.getByText('Invalid email or password')).toBeVisible();
  });
  
  test('logs in successfully with valid credentials', async ({ page }) => {
    // Fill form with valid test credentials
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('Password123');
    
    // Submit form
    await page.getByRole('button', { name: 'Sign In' }).click();
    
    // Check for successful login (redirect to dashboard)
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('Welcome back')).toBeVisible();
  });
  
  test('navigates to forgot password page', async ({ page }) => {
    // Click forgot password link
    await page.getByText('Forgot password?').click();
    
    // Check redirect to forgot password page
    await expect(page).toHaveURL('/forgot-password');
    await expect(page.getByRole('heading', { name: 'Reset Password' })).toBeVisible();
  });
});
```

## Common Features Implementation

### Data Grid with Sorting & Pagination

```typescript
// 👉 AI: Use this pattern for data tables/grids
// components/ui/data-grid.tsx

'use client';

import { useState } from 'react';
import { 
  ChevronDown,
  ChevronUp,
  ChevronLeft, 
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface Column<T> {
  key: string;
  header: string;
  cell?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataGridProps<T> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  initialSort?: {
    column: string;
    direction: 'asc' | 'desc';
  };
  rowKeyField: keyof T;
  onRowClick?: (item: T) => void;
  emptyState?: React.ReactNode;
  isLoading?: boolean;
}

export function DataGrid<T>({
  data,
  columns,
  pageSize = 10,
  initialSort,
  rowKeyField,
  onRowClick,
  emptyState,
  isLoading = false,
}: DataGridProps<T>) {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  
  // Sorting state
  const [sortColumn, setSortColumn] = useState<string | null>(
    initialSort?.column || null
  );
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(
    initialSort?.direction || 'asc'
  );
  
  // Handle sort change
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      // Toggle direction if already sorting by this column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sort column and default to ascending
      setSortColumn(column);
      setSortDirection('asc');
    }
    
    // Reset to first page when sorting changes
    setCurrentPage(1);
  };
  
  // Sort the data
  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0;
    
    const aValue = a[sortColumn as keyof T];
    const bValue = b[sortColumn as keyof T];
    
    if (aValue === bValue) return 0;
    
    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;
    
    const result = aValue < bValue ? -1 : 1;
    return sortDirection === 'asc' ? result : -result;
  });
  
  // Paginate the data
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = sortedData.slice(startIndex, startIndex + pageSize);
  
  // Handle page change
  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="border rounded-md p-4 w-full">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-10 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  // Empty state
  if (data.length === 0) {
    return (
      <div className="border rounded-md p-8 w-full">
        {emptyState || (
          <div className="text-center">
            <p className="text-gray-500">No data available</p>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className="w-full">
      <div className="rounded-md border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 text-left font-medium text-gray-500"
                >
                  {column.sortable ? (
                    <button
                      className="flex items-center space-x-1 focus:outline-none"
                      onClick={() => handleSort(column.key)}
                    >
                      <span>{column.header}</span>
                      <span className="flex flex-col h-4">
                        {sortColumn === column.key ? (
                          sortDirection === 'asc' ? (
                            <ChevronUp className="h-3 w-3" />
                          ) : (
                            <ChevronDown className="h-3 w-3" />
                          )
                        ) : (
                          <>
                            <ChevronUp className="h-2 w-2 opacity-30" />
                            <ChevronDown className="h-2 w-2 opacity-30" />
                          </>
                        )}
                      </span>
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {paginatedData.map((item) => (
              <tr
                key={String(item[rowKeyField])}
                className={
                  onRowClick
                    ? "hover:bg-gray-50 cursor-pointer"
                    : ""
                }
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3">
                    {column.cell ? column.cell(item) : String(item[column.key as keyof T] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            Showing {startIndex + 1} to {Math.min(startIndex + pageSize, data.length)} of {data.length} entries
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
              aria-label="First page"
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
              aria-label="Last page"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
```

### File Upload Component

```typescript
// 👉 AI: Use this pattern for file uploads
// components/ui/file-upload.client.tsx

'use client';

import { useState, useRef } from 'react';
import { UploadCloud, X, AlertCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
  onUpload: (file: File) => Promise<void>;
  accept?: string;
  maxSizeMB?: number;
  label?: string;
  helperText?: string;
  multiple?: boolean;
}

export function FileUpload({
  onUpload,
  accept = 'image/*',
  maxSizeMB = 5,
  label = 'Upload a file',
  helperText,
  multiple = false,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setError(null);
    
    // Validate file size
    const oversizedFiles = selectedFiles.filter(file => file.size > maxSizeBytes);
    
    if (oversizedFiles.length > 0) {
      setError(`File${oversizedFiles.length > 1 ? 's' : ''} exceed${oversizedFiles.length === 1 ? 's' : ''} the maximum size of ${maxSizeMB}MB`);
      return;
    }
    
    // Set files
    if (multiple) {
      setFiles(prev => [...prev, ...selectedFiles]);
    } else {
      setFiles(selectedFiles.slice(0, 1));
    }
  };
  
  const handleUpload = async () => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    setError(null);
    setIsSuccess(false);
    
    try {
      for (const file of files) {
        await onUpload(file);
      }
      
      setIsSuccess(true);
      // Clear files after successful upload
      setFiles([]);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };
  
  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };
  
  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-1">{label}</label>
      
      <div className="border-2 border-dashed rounded-md p-6 text-center">
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          className="hidden"
        />
        
        {files.length === 0 ? (
          <div
            onClick={() => inputRef.current?.click()}
            className="cursor-pointer"
          >
            <UploadCloud className="h-10 w-10 mx-auto text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">
              Drag and drop files here, or click to browse
            </p>
            {helperText && (
              <p className="text-xs text-gray-400 mt-1">{helperText}</p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
                >
                  <div className="flex items-center">
                    <div className="ml-2 truncate">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex space-x-2">
              <Button
                type="button"
                onClick={handleUpload}
                disabled={isUploading || files.length === 0}
              >
                {isUploading ? 'Uploading...' : 'Upload'}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={() => inputRef.current?.click()}
              >
                Add more files
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {error && (
        <div className="mt-2 flex items-center text-red-500 text-sm">
          <AlertCircle className="h-4 w-4 mr-1" />
          <span>{error}</span>
        </div>
      )}
      
      {isSuccess && (
        <div className="mt-2 flex items-center text-green-500 text-sm">
          <Check className="h-4 w-4 mr-1" />
          <span>Uploaded successfully!</span>
        </div>
      )}
    </div>
  );
}

// Usage example:
// <FileUpload
//   onUpload={async (file) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     
//     const response = await fetch('/api/upload', {
//       method: 'POST',
//       body: formData,
//     });
//     
//     if (!response.ok) {
//       throw new Error('Upload failed');
//     }
//   }}
//   accept="image/*"
//   maxSizeMB={2}
//   helperText="Accepted formats: JPG, PNG, GIF (max 2MB)"
// />
```

### Internationalization Setup

```typescript
// 👉 AI: Use this pattern for internationalization
// middleware.ts

import { createMiddleware } from 'next-intl/server';
import { NextResponse } from 'next/server';

// Supported locales
export const locales = ['en', 'fr', 'de', 'es'];
export const defaultLocale = 'en';

// Create next-intl middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export default async function middleware(request) {
  // Check x-middleware-subrequest for security (CVE-2025-29927)
  const isSubrequest = request.headers.get('x-middleware-subrequest');
  if (isSubrequest && !['next-route', 'next-api'].includes(isSubrequest)) {
    return new NextResponse(null, { status: 403 });
  }
  
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - API routes
  // - /_next (Next.js internals)
  // - /static (usually used for favicons and images)
  // - all root files (favicon.ico, robots.txt, etc.)
  matcher: ['/((?!api|_next|static|[\\w-]+\\.\\w+).*)'],
};

// i18n.ts
import { getRequestConfig } from 'next-intl/server';
 
export default getRequestConfig(async ({ locale }) => {
  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

// next.config.js
const withNextIntl = require('next-intl/plugin')('./i18n.ts');

module.exports = withNextIntl({
  // Your Next.js config
});

// Usage in components
// app/[locale]/page.tsx
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('HomePage');
  
  return (
    <main>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </main>
  );
}

// Language switcher component
// components/language-switcher.client.tsx
'use client';

import { usePathname, useRouter } from 'next-intl/client';
import { locales } from '@/middleware';

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  
  return (
    <div className="flex items-center space-x-2">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => router.replace(pathname, { locale })}
          className="px-2 py-1 rounded hover:bg-gray-100"
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
```

### Theme Switcher

```typescript
// 👉 AI: Use this pattern for theme switching
// components/theme/theme-provider.client.tsx

'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  
  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);
  
  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem('theme', theme);
    
    // Apply theme to document
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);
  
  // Listen for system theme changes
  useEffect(() => {
    if (theme !== 'system') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(mediaQuery.matches ? 'dark' : 'light');
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}

// components/theme/theme-switcher.client.tsx
'use client';

import { Sun, Moon, Laptop } from 'lucide-react';
import { useTheme } from './theme-provider.client';
import { Button } from '@/components/ui/button';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={theme === 'light' ? 'primary' : 'outline'}
        size="sm"
        onClick={() => setTheme('light')}
        aria-label="Light mode"
      >
        <Sun className="h-4 w-4" />
      </Button>
      
      <Button
        variant={theme === 'dark' ? 'primary' : 'outline'}
        size="sm"
        onClick={() => setTheme('dark')}
        aria-label="Dark mode"
      >
        <Moon className="h-4 w-4" />
      </Button>
      
      <Button
        variant={theme === 'system' ? 'primary' : 'outline'}
        size="sm"
        onClick={() => setTheme('system')}
        aria-label="System theme"
      >
        <Laptop className="h-4 w-4" />
      </Button>
    </div>
  );
}

// Usage in layout
// app/layout.tsx
import { ThemeProvider } from '@/components/theme/theme-provider.client';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

// Tailwind config
// tailwind.config.ts
module.exports = {
  darkMode: 'class',
  // rest of your config
};
```

### Authentication Flow

```typescript
// 👉 AI: Use this pattern for auth flow implementation
// components/auth/auth-flow.client.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from './login-form';
import { RegisterForm } from './register-form';
import { ForgotPasswordForm } from './forgot-password-form';
import { ResetPasswordForm } from './reset-password-form';

type AuthView = 'login' | 'register' | 'forgot-password' | 'reset-password';

export function AuthFlow({
  initialView = 'login',
  redirectUrl = '/dashboard',
  resetToken,
}: {
  initialView?: AuthView;
  redirectUrl?: string;
  resetToken?: string;
}) {
  const router = useRouter();
  const [view, setView] = useState<AuthView>(
    resetToken ? 'reset-password' : initialView
  );
  
  const handleSuccess = () => {
    router.push(redirectUrl);
  };
  
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      {view === 'login' && (
        <>
          <h1 className="text-2xl font-bold mb-6">Sign In</h1>
          <LoginForm onSuccess={handleSuccess} />
          <div className="mt-4 text-center space-y-2">
            <p>
              Don't have an account?{' '}
              <button
                className="text-blue-600 hover:underline"
                onClick={() => setView('register')}
              >
                Sign up
              </button>
            </p>
            <p>
              <button
                className="text-blue-600 hover:underline"
                onClick={() => setView('forgot-password')}
              >
                Forgot password?
              </button>
            </p>
          </div>
        </>
      )}
      
      {view === 'register' && (
        <>
          <h1 className="text-2xl font-bold mb-6">Create Account</h1>
          <RegisterForm onSuccess={handleSuccess} />
          <div className="mt-4 text-center">
            <p>
              Already have an account?{' '}
              <button
                className="text-blue-600 hover:underline"
                onClick={() => setView('login')}
              >
                Sign in
              </button>
            </p>
          </div>
        </>
      )}
      
      {view === 'forgot-password' && (
        <>
          <h1 className="text-2xl font-bold mb-6">Reset Password</h1>
          <ForgotPasswordForm
            onSuccess={() => {
              alert('Check your email for reset instructions');
              setView('login');
            }}
          />
          <div className="mt-4 text-center">
            <p>
              <button
                className="text-blue-600 hover:underline"
                onClick={() => setView('login')}
              >
                Back to sign in
              </button>
            </p>
          </div>
        </>
      )}
      
      {view === 'reset-password' && (
        <>
          <h1 className="text-2xl font-bold mb-6">Set New Password</h1>
          <ResetPasswordForm
            token={resetToken || ''}
            onSuccess={() => {
              alert('Password reset successfully');
              setView('login');
            }}
          />
        </>
      )}
    </div>
  );
}
```

### Pagination Component

```typescript
// 👉 AI: Use this pattern for pagination
// components/ui/pagination.tsx

import { Button } from '@/components/ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}: PaginationProps) {
  // Don't render pagination if only one page
  if (totalPages <= 1) {
    return null;
  }
  
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    
    // Always show first page
    pageNumbers.push(1);
    
    // Calculate range around current page
    const leftSibling = Math.max(2, currentPage - siblingCount);
    const rightSibling = Math.min(totalPages - 1, currentPage + siblingCount);
    
    // Add ellipsis if needed
    if (leftSibling > 2) {
      pageNumbers.push('...');
    }
    
    // Add pages in range
    for (let i = leftSibling; i <= rightSibling; i++) {
      pageNumbers.push(i);
    }
    
    // Add ellipsis if needed
    if (rightSibling < totalPages - 1) {
      pageNumbers.push('...');
    }
    
    // Always show last page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };
  
  const pageNumbers = getPageNumbers();
  
  return (
    <nav className="flex justify-center mt-6" aria-label="Pagination">
      <ul className="flex items-center space-x-1">
        {/* Previous button */}
        <li>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
          >
            Previous
          </Button>
        </li>
        
        {/* Page numbers */}
        {pageNumbers.map((page, index) => (
          <li key={index}>
            {typeof page === 'number' ? (
              <Button
                variant={currentPage === page ? 'primary' : 'outline'}
                size="sm"
                onClick={() => onPageChange(page)}
                aria-current={currentPage === page ? 'page' : undefined}
                aria-label={`Go to page ${page}`}
              >
                {page}
              </Button>
            ) : (
              <span className="px-2 text-gray-500">...</span>
            )}
          </li>
        ))}
        
        {/* Next button */}
        <li>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Go to next page"
          >
            Next
          </Button>
        </li>
      </ul>
    </nav>
  );
}

// Usage example
// <Pagination
//   currentPage={currentPage}
//   totalPages={totalPages}
//   onPageChange={(page) => {
//     router.push(`/products?page=${page}`);
//   }}
// />
```

### Modal Component

```typescript
// 👉 AI: Use this pattern for modals
// components/ui/modal.tsx

'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { XIcon } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  closeOnClickOutside?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  closeOnClickOutside = true,
  size = 'md',
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  // Handle mounting on client only
  useEffect(() => {
    setMounted(true);
    
    // Lock body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);
  
  // Handle click outside
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnClickOutside && e.target === overlayRef.current) {
      onClose();
    }
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };
  
  // Don't render on server
  if (!mounted || !isOpen) {
    return null;
  }
  
  // Render modal in portal
  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div
        className={`bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} max-h-[90vh] flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 id="modal-title" className="text-lg font-medium">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        
        {/* Body */}
        <div className="p-4 overflow-y-auto flex-grow">{children}</div>
        
        {/* Footer */}
        {footer && (
          <div className="px-4 py-3 border-t">{footer}</div>
        )}
      </div>
    </div>,
    document.body
  );
}

// Usage example
// const [isModalOpen, setIsModalOpen] = useState(false);
// 
// <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
// 
// <Modal
//   isOpen={isModalOpen}
//   onClose={() => setIsModalOpen(false)}
//   title="Confirm Action"
//   footer={
//     <div className="flex justify-end space-x-2">
//       <Button variant="outline" onClick={() => setIsModalOpen(false)}>
//         Cancel
//       </Button>
//       <Button onClick={handleConfirm}>Confirm</Button>
//     </div>
//   }
// >
//   <p>Are you sure you want to perform this action?</p>
// </Modal>
```

## Anti-Patterns to Avoid

```typescript
// 👉 AI: NEVER generate code like this!

// ❌ ANTI-PATTERN: Fetching data in Client Component
// components/products/product-list.client.tsx

'use client';

import { useState, useEffect } from 'react';

export function ProductList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // ❌ BAD: Fetching data in useEffect in a Client Component
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}

// ✅ CORRECT: Use Server Component for data fetching
// components/products/product-list.server.tsx
// async function ProductList() {
//   const products = await fetch('/api/products').then(res => res.json());
//   
//   return (
//     <div>
//       {products.map((product) => (
//         <div key={product.id}>{product.name}</div>
//       ))}
//     </div>
//   );
// }

// ❌ ANTI-PATTERN: Not specifying cache behavior
// lib/api.ts

export async function fetchProducts() {
  // ❌ BAD: No explicit cache policy (defaults to force-cache in Next.js 15.x)
  const res = await fetch('/api/products');
  return res.json();
}

// ✅ CORRECT: Explicitly specify cache behavior
// export async function fetchProducts() {
//   const res = await fetch('/api/products', { cache: 'no-store' });
//   return res.json();
// }

// ❌ ANTI-PATTERN: Large Client Components
// components/dashboard/dashboard.client.tsx

'use client';

export function Dashboard() {
  // ❌ BAD: Huge Client Component with too many responsibilities
  // Hundreds of lines of component logic, state, and UI
  // Multiple unrelated features all in one component
  // ...
  
  return (
    <div>
      {/* Complex nested JSX with many conditionals */}
      {/* Multiple sections that should be separate components */}
    </div>
  );
}

// ✅ CORRECT: Split into smaller, focused components with Server Components where possible
// - DashboardLayout.server.tsx (layout structure)
// - UserStats.server.tsx (data fetching and display)
// - ActivityFeed.server.tsx (data fetching and display)
// - NotificationsPanel.client.tsx (interactive elements only)

// ❌ ANTI-PATTERN: Missing error handling
// components/checkout/payment-form.client.tsx

'use client';

export function PaymentForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ❌ BAD: No error handling or loading state
    const result = await fetch('/api/payment', {
      method: 'POST',
      body: JSON.stringify({
        // form data
      }),
    });
    
    // ❌ BAD: No validation of response
    const data = await result.json();
    
    // Proceed assuming success
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit">Submit Payment</button>
    </form>
  );
}

// ❌ ANTI-PATTERN: Exposing sensitive keys
// lib/supabase.ts

// ❌ BAD: NEVER expose service role key to the client
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // ❌ DANGER: Should never be exposed!
);

// ✅ CORRECT: Only use service role key in server contexts
// Create separate clients for frontend and backend

// ❌ ANTI-PATTERN: Ignoring accessibility
// components/ui/dropdown.client.tsx

'use client';

export function Dropdown({ options, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  
  // ❌ BAD: Missing keyboard navigation, ARIA attributes, and proper semantics
  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)}>
        Select Option
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 bg-white border">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onSelect(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
