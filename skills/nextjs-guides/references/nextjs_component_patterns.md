---
title: 'Next.js Component Patterns & File Conventions'
description: 'For AI Assistants: File structure, routing, and component organization.'
category: 'Nextjs Tailwind Shadcn Docs'
---

# Next.js Component Patterns & File Conventions

_For AI Assistants: File structure, routing, and component organization_

## 📁 App Router File Conventions

### Special Files Overview

```
app/
├── layout.tsx          # Root layout (required)
├── page.tsx            # Home page (required)
├── loading.tsx         # Loading UI
├── error.tsx           # Error boundary
├── not-found.tsx       # 404 page
├── global-error.tsx    # Global error boundary
├── route.tsx           # API route handler
├── template.tsx        # Re-rendered layout
├── default.tsx         # Parallel route fallback
└── middleware.tsx      # Request middleware
```

### Route Organization Patterns

#### Basic Route Structure

```
app/
├── page.tsx                    # / (home)
├── about/
│   └── page.tsx               # /about
├── blog/
│   ├── page.tsx               # /blog
│   └── [slug]/
│       └── page.tsx           # /blog/[slug]
├── dashboard/
│   ├── layout.tsx             # Shared dashboard layout
│   ├── page.tsx               # /dashboard
│   ├── analytics/
│   │   └── page.tsx           # /dashboard/analytics
│   └── settings/
│       └── page.tsx           # /dashboard/settings
└── api/
    ├── auth/
    │   └── route.ts           # /api/auth
    └── users/
        ├── route.ts           # /api/users
        └── [id]/
            └── route.ts       # /api/users/[id]
```

#### Advanced Route Organization

```
app/
├── (marketing)/              # Route group - doesn't affect URL
│   ├── layout.tsx           # Marketing layout
│   ├── about/
│   │   └── page.tsx         # /about
│   └── contact/
│       └── page.tsx         # /contact
├── (dashboard)/             # Route group with different layout
│   ├── layout.tsx           # Dashboard layout
│   ├── dashboard/
│   │   ├── @sidebar/        # Parallel route slot
│   │   │   ├── page.tsx
│   │   │   └── default.tsx
│   │   ├── @content/        # Parallel route slot
│   │   │   ├── page.tsx
│   │   │   └── default.tsx
│   │   ├── layout.tsx       # Layout accepting slots
│   │   └── page.tsx
│   └── settings/
│       └── page.tsx
├── blog/
│   ├── [...slug]/           # Catch-all route
│   │   └── page.tsx         # /blog/any/nested/path
│   └── [[...slug]]/         # Optional catch-all
│       └── page.tsx         # /blog or /blog/any/path
└── shop/
    └── [category]/
        └── [product]/
            ├── page.tsx      # /shop/[category]/[product]
            ├── loading.tsx   # Loading for this page
            └── error.tsx     # Error boundary for this page
```

---

## 🏗️ Layout Patterns

### Root Layout (Required)

```tsx
// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | My App',
    default: 'My App',
  },
  description: 'A modern Next.js application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background">
            <header>
              <Navigation />
            </header>
            <main>{children}</main>
            <footer>
              <Footer />
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Nested Layout with Navigation

```tsx
// app/(dashboard)/layout.tsx
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar className="w-64 border-r" />
      <div className="flex flex-col flex-1">
        <Header className="border-b" />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
```

### Parallel Routes Layout

```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
  sidebar,
  analytics,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  analytics: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-4 gap-6">
      <div className="col-span-1">{sidebar}</div>
      <div className="col-span-2">{children}</div>
      <div className="col-span-1">{analytics}</div>
    </div>
  );
}
```

---

## 📄 Page Component Patterns

### Basic Page

```tsx
// app/about/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about our company',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      <p className="text-lg text-muted-foreground">We are a modern company building the future.</p>
    </div>
  );
}
```

### Dynamic Page with Data Fetching

```tsx
// app/blog/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="prose prose-lg mx-auto">
      <h1>{post.title}</h1>
      <div className="text-muted-foreground mb-8">
        Published on {new Date(post.publishedAt).toLocaleDateString()}
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

async function getPost(slug: string) {
  // Fetch post data
  const res = await fetch(`https://api.example.com/posts/${slug}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;
  return res.json();
}

async function getAllPosts() {
  const res = await fetch('https://api.example.com/posts');
  return res.json();
}
```

### Page with Search Params

```tsx
// app/search/page.tsx
import { Suspense } from 'react';
import { SearchResults } from '@/components/search-results';
import { SearchFilters } from '@/components/search-filters';

type Props = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    page?: string;
  }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = params.q || '';
  const category = params.category || '';
  const page = parseInt(params.page || '1');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Results {query && `for "${query}"`}</h1>

      <div className="grid grid-cols-4 gap-8">
        <aside className="col-span-1">
          <SearchFilters />
        </aside>

        <main className="col-span-3">
          <Suspense fallback={<div className="animate-pulse">Loading results...</div>}>
            <SearchResults query={query} category={category} page={page} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
```

---

## 🔧 Component Architecture Patterns

### Component Organization

```
components/
├── ui/                     # shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   ├── form.tsx
│   └── input.tsx
├── layout/                 # Layout components
│   ├── header.tsx
│   ├── footer.tsx
│   ├── sidebar.tsx
│   └── navigation.tsx
├── features/               # Feature-specific components
│   ├── auth/
│   │   ├── login-form.tsx
│   │   ├── signup-form.tsx
│   │   └── auth-provider.tsx
│   ├── blog/
│   │   ├── post-card.tsx
│   │   ├── post-list.tsx
│   │   └── post-content.tsx
│   └── dashboard/
│       ├── stats-card.tsx
│       ├── recent-activity.tsx
│       └── user-profile.tsx
├── shared/                 # Shared/common components
│   ├── loading-spinner.tsx
│   ├── error-message.tsx
│   ├── confirmation-dialog.tsx
│   └── data-table.tsx
└── providers/              # Context providers
    ├── theme-provider.tsx
    ├── auth-provider.tsx
    └── query-provider.tsx
```

### Server Component Pattern

```tsx
// components/features/blog/post-list.tsx
import { PostCard } from './post-card';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  coverImage: string;
  publishedAt: string;
}

export async function PostList() {
  const posts: Post[] = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 },
  }).then((res) => res.json());

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No posts found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
```

### Client Component with Hooks

```tsx
// components/features/dashboard/stats-card.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface StatsCardProps {
  title: string;
  endpoint: string;
  refreshInterval?: number;
}

export function StatsCard({ title, endpoint, refreshInterval = 30000 }: StatsCardProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [endpoint, refreshInterval]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="animate-pulse h-8 bg-muted rounded" />
        ) : error ? (
          <p className="text-destructive text-sm">{error}</p>
        ) : (
          <div className="text-2xl font-bold">{data?.value || 0}</div>
        )}
      </CardContent>
    </Card>
  );
}
```

### Compound Component Pattern

```tsx
// components/shared/data-table.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DataTableProps {
  children: React.ReactNode;
  title?: string;
}

export function DataTable({ children, title }: DataTableProps) {
  return (
    <Card>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">{children}</table>
        </div>
      </CardContent>
    </Card>
  );
}

DataTable.Header = function DataTableHeader({ children }: { children: React.ReactNode }) {
  return (
    <thead>
      <tr className="border-b">{children}</tr>
    </thead>
  );
};

DataTable.HeaderCell = function DataTableHeaderCell({ children }: { children: React.ReactNode }) {
  return <th className="text-left p-2 font-medium">{children}</th>;
};

DataTable.Body = function DataTableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
};

DataTable.Row = function DataTableRow({ children }: { children: React.ReactNode }) {
  return <tr className="border-b">{children}</tr>;
};

DataTable.Cell = function DataTableCell({ children }: { children: React.ReactNode }) {
  return <td className="p-2">{children}</td>;
};

// Usage:
// <DataTable title="Users">
//   <DataTable.Header>
//     <DataTable.HeaderCell>Name</DataTable.HeaderCell>
//     <DataTable.HeaderCell>Email</DataTable.HeaderCell>
//   </DataTable.Header>
//   <DataTable.Body>
//     <DataTable.Row>
//       <DataTable.Cell>John Doe</DataTable.Cell>
//       <DataTable.Cell>john@example.com</DataTable.Cell>
//     </DataTable.Row>
//   </DataTable.Body>
// </DataTable>
```

---

## 🎭 Context Providers Pattern

### Theme Provider

```tsx
// components/providers/theme-provider.tsx
'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

### Auth Provider

```tsx
// components/providers/auth-provider.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        throw new Error('Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
```

### Combined Providers

```tsx
// components/providers/index.tsx
'use client';

import { ThemeProvider } from './theme-provider';
import { AuthProvider } from './auth-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
```

---

## 🔄 Loading & Error Patterns

### Streaming with Suspense

```tsx
// app/dashboard/page.tsx
import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function LoadingSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="h-6 bg-muted animate-pulse rounded" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="h-4 bg-muted animate-pulse rounded" />
          <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
        </div>
      </CardContent>
    </Card>
  );
}

async function UserStats() {
  const stats = await fetch('https://api.example.com/stats', {
    cache: 'no-store',
  }).then((res) => res.json());

  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{stats.totalUsers}</div>
        <p className="text-muted-foreground">Total Users</p>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <Suspense fallback={<LoadingSkeleton />}>
        <UserStats />
      </Suspense>

      <Suspense fallback={<LoadingSkeleton />}>
        <UserStats />
      </Suspense>

      <Suspense fallback={<LoadingSkeleton />}>
        <UserStats />
      </Suspense>
    </div>
  );
}
```

### Error Boundary with Recovery

```tsx
// app/dashboard/error.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="h-5 w-5" />
          Something went wrong!
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {error.message || 'An unexpected error occurred.'}
        </p>

        <div className="flex gap-2">
          <Button onClick={reset} variant="default">
            Try again
          </Button>
          <Button onClick={() => (window.location.href = '/')} variant="outline">
            Go home
          </Button>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <details className="mt-4">
            <summary className="cursor-pointer text-xs text-muted-foreground">
              Error Details
            </summary>
            <pre className="text-xs bg-muted p-2 rounded mt-2 overflow-auto">{error.stack}</pre>
          </details>
        )}
      </CardContent>
    </Card>
  );
}
```

---

## 🎨 Styling Patterns

### Component Variants with CVA

```tsx
// components/ui/badge.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
```

### Responsive Grid Layout

```tsx
// components/layout/responsive-grid.tsx
import { cn } from '@/lib/utils';

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
}

export function ResponsiveGrid({ children, className }: ResponsiveGridProps) {
  return (
    <div
      className={cn(
        'grid gap-6',
        'grid-cols-1',
        'sm:grid-cols-2',
        'lg:grid-cols-3',
        'xl:grid-cols-4',
        className
      )}
    >
      {children}
    </div>
  );
}
```

This comprehensive guide covers the essential file conventions, component patterns, and
architectural approaches for building scalable Next.js applications.
