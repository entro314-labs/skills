---
title: 'Performance Optimization Guide'
description: 'For AI Assistants: Comprehensive performance patterns and optimizations.'
category: 'Nextjs Tailwind Shadcn Docs'
---

# Performance Optimization Guide

_For AI Assistants: Comprehensive performance patterns and optimizations_

## 🚀 Core Performance Principles

### Performance Budget Guidelines

- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms
- **Time to Interactive (TTI)**: < 3.5s
- **JavaScript Bundle Size**: < 200KB gzipped
- **CSS Bundle Size**: < 20KB gzipped

---

## 🎯 Next.js 15+ Performance Optimizations

### Turbopack Configuration

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const config: NextConfig = {
  // Enable Turbopack for development
  experimental: {
    turbo: {
      rules: {
        // Optimize CSS processing
        '*.css': ['css'],
        '*.scss': ['sass'],
        // Handle static assets
        '*.svg': ['raw'],
        '*.png': ['file'],
        '*.jpg': ['file'],
        '*.webp': ['file'],
      },
      resolveAlias: {
        // Alias for faster resolution
        '@': './src',
        '~': './src',
      },
      resolveExtensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.css'],
    },
    // Enable CSS optimization
    optimizeCss: true,
    // Optimize server components HMR cache
    serverComponentsHmrCache: true,
  },

  // Compiler optimizations
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
    // Enable SWC minification
    swcMinify: true,
  },

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
  },

  // Bundle analysis
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle size
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }
    return config;
  },
};

export default config;
```

### Route Segment Configuration

```typescript
// app/dashboard/page.tsx
// Static generation for performance
export const revalidate = 3600; // Revalidate every hour
export const dynamic = 'force-static'; // Force static generation
export const fetchCache = 'force-cache'; // Cache all fetch requests

// app/api/data/route.ts
// API route optimization
export const runtime = 'edge'; // Use edge runtime for faster cold starts
export const maxDuration = 5; // Limit execution time
```

---

## 🖼️ Image Optimization Patterns

### Responsive Images with Art Direction

```tsx
import Image from 'next/image';
import { getImageProps } from 'next/image';

// Art direction pattern
export function ResponsiveHero() {
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    alt: 'Hero image',
    width: 1200,
    height: 600,
    src: '/hero-desktop.jpg',
  });

  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    alt: 'Hero image',
    width: 600,
    height: 800,
    src: '/hero-mobile.jpg',
  });

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktop} />
      <source media="(max-width: 767px)" srcSet={mobile} />
      <img {...rest} />
    </picture>
  );
}

// Optimized gallery pattern
export function ImageGallery({
  images,
}: {
  images: Array<{ src: string; alt: string; priority?: boolean }>;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <div key={image.src} className="relative aspect-square">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={image.priority || index < 3} // Prioritize first 3 images
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        </div>
      ))}
    </div>
  );
}
```

### Progressive Image Loading

```tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export function ProgressiveImage({ src, alt, width, height, className }: ProgressiveImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          hasError && 'opacity-50'
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />

      {/* Loading placeholder */}
      {isLoading && (
        <div className="absolute inset-0 bg-muted animate-pulse" style={{ width, height }} />
      )}

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <span className="text-muted-foreground text-sm">Failed to load</span>
        </div>
      )}
    </div>
  );
}
```

---

## 📦 Bundle Optimization

### Dynamic Imports with Suspense

```tsx
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load heavy components
const HeavyChart = dynamic(() => import('@/components/heavy-chart'), {
  loading: () => <Skeleton className="h-96 w-full" />,
  ssr: false, // Disable SSR for client-only components
});

const DataVisualization = dynamic(() => import('@/components/data-viz'), {
  loading: () => <div className="animate-pulse bg-muted h-64 rounded" />,
});

// Code splitting by route
const AdminPanel = dynamic(() => import('@/components/admin-panel'), {
  ssr: false,
});

// Conditional loading
const AdvancedFeatures = dynamic(() => import('@/components/advanced-features'), {
  loading: () => <Skeleton className="h-40 w-full" />,
});

export function Dashboard({ isAdmin, showAdvanced }: { isAdmin: boolean; showAdvanced: boolean }) {
  return (
    <div className="space-y-6">
      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <HeavyChart />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-64 w-full" />}>
        <DataVisualization />
      </Suspense>

      {isAdmin && (
        <Suspense fallback={<Skeleton className="h-40 w-full" />}>
          <AdminPanel />
        </Suspense>
      )}

      {showAdvanced && (
        <Suspense fallback={<Skeleton className="h-40 w-full" />}>
          <AdvancedFeatures />
        </Suspense>
      )}
    </div>
  );
}
```

### Tree Shaking Optimization

```typescript
// utils/optimized-imports.ts

// ❌ Bad: Imports entire library
import * as _ from 'lodash';
import * as date from 'date-fns';

// ✅ Good: Import only what you need
import { debounce, throttle } from 'lodash-es';
import { format, parseISO } from 'date-fns';

// ❌ Bad: Imports all icons
import * as Icons from 'lucide-react';

// ✅ Good: Import specific icons
import { Search, Filter, Download } from 'lucide-react';

// For large libraries, use dynamic imports
export const getChartsLibrary = () => import('recharts');
export const getDatePicker = () => import('react-datepicker');
```

---

## 🔄 Data Fetching Optimization

### Parallel Data Fetching

```tsx
// app/dashboard/page.tsx
export default async function Dashboard() {
  // ✅ Parallel fetching for independent data
  const [userStats, recentActivity, notifications] = await Promise.all([
    fetch('/api/stats').then((res) => res.json()),
    fetch('/api/activity').then((res) => res.json()),
    fetch('/api/notifications').then((res) => res.json()),
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatsCard data={userStats} />
      <ActivityFeed data={recentActivity} />
      <NotificationList data={notifications} />
    </div>
  );
}
```

### Request Deduplication

```typescript
// lib/request-cache.ts
const requestCache = new Map<string, Promise<any>>();

export function cachedFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const key = `${url}-${JSON.stringify(options)}`;

  if (requestCache.has(key)) {
    return requestCache.get(key);
  }

  const request = fetch(url, options)
    .then(res => res.json())
    .finally(() => {
      // Clean up cache after request completes
      requestCache.delete(key);
    });

  requestCache.set(key, request);
  return request;
}

// Usage in components
export async function UserProfile({ userId }: { userId: string }) {
  // Multiple components can call this without duplicate requests
  const user = await cachedFetch(`/api/users/${userId}`);

  return <div>{user.name}</div>;
}
```

### Streaming with Suspense Boundaries

```tsx
// app/dashboard/loading.tsx
export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
      <Skeleton className="h-96" />
    </div>
  );
}

// app/dashboard/page.tsx
import { Suspense } from 'react';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Fast loading content first */}
      <header>
        <h1>Dashboard</h1>
      </header>

      {/* Stream in heavy components */}
      <Suspense fallback={<StatsCardsSkeleton />}>
        <StatsCards />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<ChartSkeleton />}>
          <AnalyticsChart />
        </Suspense>

        <Suspense fallback={<ActivitySkeleton />}>
          <RecentActivity />
        </Suspense>
      </div>
    </div>
  );
}

// Individual loading components for better UX
function StatsCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-24" />
      ))}
    </div>
  );
}
```

---

## 🎨 CSS & Styling Performance

### Critical CSS Extraction

```css
/* globals.css - Critical styles first */
@import 'tailwindcss';

/* Critical above-the-fold styles */
@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: var(--font-inter);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

/* Critical layout styles */
@layer components {
  .header {
    @apply sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur;
  }

  .main-content {
    @apply container mx-auto px-4 py-6;
  }
}

/* Non-critical styles can be loaded later */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

### CSS Optimization with Tailwind 4

```css
/* Optimized content detection */
@import 'tailwindcss';
@source "src/**/*.{js,ts,jsx,tsx}";
@source "components/**/*.{js,ts,jsx,tsx}";
@source "!node_modules/**/*";
@source "!.next/**/*";

/* Custom utilities for performance */
@utility container-optimized {
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@utility gpu-accelerated {
  transform: translateZ(0);
  will-change: transform;
}

/* Efficient animations */
@utility animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## 📱 Client-Side Performance

### Virtualization for Large Lists

```tsx
'use client';

import { FixedSizeList as List } from 'react-window';
import { useMemo } from 'react';

interface VirtualizedListProps {
  items: Array<{ id: string; title: string; description: string }>;
  height: number;
  itemHeight: number;
}

export function VirtualizedList({ items, height, itemHeight }: VirtualizedListProps) {
  const Row = useMemo(
    () =>
      ({ index, style }: { index: number; style: React.CSSProperties }) => {
        const item = items[index];

        return (
          <div style={style} className="flex items-center space-x-4 px-4">
            <div className="flex-1">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          </div>
        );
      },
    [items]
  );

  return (
    <List height={height} itemCount={items.length} itemSize={itemHeight} width="100%">
      {Row}
    </List>
  );
}

// Usage
export function LargeDataList() {
  const [data] = useState(() =>
    Array.from({ length: 10000 }, (_, i) => ({
      id: i.toString(),
      title: `Item ${i + 1}`,
      description: `Description for item ${i + 1}`,
    }))
  );

  return (
    <div className="h-96 border rounded-lg">
      <VirtualizedList items={data} height={384} itemHeight={80} />
    </div>
  );
}
```

### Intersection Observer for Lazy Loading

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';

function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      options
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return [ref, isIntersecting] as const;
}

export function LazySection({ children }: { children: React.ReactNode }) {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
  });

  return (
    <div ref={ref} className="min-h-[200px]">
      {isIntersecting ? (
        children
      ) : (
        <div className="flex items-center justify-center h-48">
          <div className="animate-pulse bg-muted rounded h-32 w-full" />
        </div>
      )}
    </div>
  );
}
```

---

## 🧠 Memory Optimization

### Prevent Memory Leaks

```tsx
'use client';

import { useEffect, useRef, useCallback } from 'react';

export function useCleanupEffect(effect: () => void | (() => void), deps: any[]) {
  const cleanupRef = useRef<(() => void) | void>();

  useEffect(() => {
    cleanupRef.current = effect();

    return () => {
      if (typeof cleanupRef.current === 'function') {
        cleanupRef.current();
      }
    };
  }, deps);
}

// Component with proper cleanup
export function PerformantComponent() {
  const intervalRef = useRef<NodeJS.Timeout>();
  const abortControllerRef = useRef<AbortController>();

  useCleanupEffect(() => {
    // Setup interval
    intervalRef.current = setInterval(() => {
      console.log('Interval tick');
    }, 1000);

    // Setup fetch with abort controller
    abortControllerRef.current = new AbortController();

    fetch('/api/data', {
      signal: abortControllerRef.current.signal,
    }).catch((err) => {
      if (err.name !== 'AbortError') {
        console.error('Fetch error:', err);
      }
    });

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return <div>Performant Component</div>;
}
```

### Optimized Event Handlers

```tsx
'use client';

import { useCallback, useMemo } from 'react';
import { debounce } from 'lodash-es';

export function OptimizedSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // Memoized debounced search function
  const debouncedSearch = useMemo(
    () =>
      debounce(async (searchQuery: string) => {
        if (!searchQuery.trim()) {
          setResults([]);
          return;
        }

        try {
          const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
          const data = await response.json();
          setResults(data);
        } catch (error) {
          console.error('Search error:', error);
        }
      }, 300),
    []
  );

  // Cleanup debounced function
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  const handleItemClick = useCallback((id: string) => {
    // Optimized click handler
    console.log('Item clicked:', id);
  }, []);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        className="w-full p-2 border rounded"
      />

      <div className="mt-4 space-y-2">
        {results.map((item: any) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className="p-2 border rounded cursor-pointer hover:bg-gray-50"
          >
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 📊 Performance Monitoring

### Web Vitals Tracking

```tsx
// app/layout.tsx
import { Suspense } from 'react';

// Lazy load performance monitoring
const PerformanceMonitor = dynamic(() => import('@/components/performance-monitor'), {
  ssr: false,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Suspense fallback={null}>
          <PerformanceMonitor />
        </Suspense>
      </body>
    </html>
  );
}
```

```tsx
// components/performance-monitor.tsx
'use client';

import { useReportWebVitals } from 'next/web-vitals';

export default function PerformanceMonitor() {
  useReportWebVitals((metric) => {
    // Send to analytics service
    if (typeof window !== 'undefined') {
      // Google Analytics 4
      gtag('event', metric.name, {
        value: Math.round(metric.value),
        event_label: metric.id,
        non_interaction: true,
      });

      // Custom analytics
      fetch('/api/analytics/vitals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: metric.name,
          value: metric.value,
          rating: metric.rating,
          delta: metric.delta,
          id: metric.id,
          url: window.location.href,
          userAgent: navigator.userAgent,
        }),
      }).catch(console.error);
    }
  });

  return null;
}
```

### Bundle Analysis Setup

```bash
# Install bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Add script to package.json
{
  "scripts": {
    "analyze": "ANALYZE=true npm run build"
  }
}
```

```javascript
// next.config.js - Bundle analysis
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // Your Next.js config
});
```

---

## 🚀 Advanced Optimization Techniques

### Service Worker for Caching

```typescript
// public/sw.js
const CACHE_NAME = 'app-cache-v1';
const urlsToCache = ['/', '/static/js/bundle.js', '/static/css/main.css'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)));
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      return response || fetch(event.request);
    })
  );
});
```

### Edge-Side Includes (ESI) Pattern

```tsx
// components/dynamic-content.tsx
export async function DynamicContent({ userId }: { userId: string }) {
  const [personalizedData, staticData] = await Promise.all([
    // Dynamic, user-specific data (not cacheable)
    fetch(`/api/user/${userId}/personalized`, { cache: 'no-store' }),
    // Static data (highly cacheable)
    fetch('/api/static-content', {
      next: { revalidate: 3600 }, // Cache for 1 hour
    }),
  ]);

  return (
    <div>
      <StaticSection data={staticData} />
      <PersonalizedSection data={personalizedData} />
    </div>
  );
}
```

### Optimistic UI Updates

```tsx
'use client';

import { useOptimistic, useTransition } from 'react';

export function OptimisticTodoList({
  todos,
  addTodo,
}: {
  todos: Todo[];
  addTodo: (text: string) => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(todos, (state, newTodo: Todo) => [
    ...state,
    newTodo,
  ]);

  const handleSubmit = async (formData: FormData) => {
    const text = formData.get('text') as string;

    // Optimistically add todo
    addOptimisticTodo({
      id: crypto.randomUUID(),
      text,
      completed: false,
    });

    // Start transition for actual update
    startTransition(async () => {
      await addTodo(text);
    });
  };

  return (
    <div>
      <form action={handleSubmit}>
        <input name="text" required />
        <button type="submit" disabled={isPending}>
          Add Todo
        </button>
      </form>

      <ul>
        {optimisticTodos.map((todo) => (
          <li key={todo.id} className={isPending ? 'opacity-50' : ''}>
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 🔧 Performance Debugging Tools

### Performance Profiler Component

```tsx
'use client';

import { Profiler, ProfilerOnRenderCallback } from 'react';

const onRenderCallback: ProfilerOnRenderCallback = (
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Profiler:', {
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
    });
  }
};

export function PerformanceProfiler({ id, children }: { id: string; children: React.ReactNode }) {
  if (process.env.NODE_ENV !== 'development') {
    return <>{children}</>;
  }

  return (
    <Profiler id={id} onRender={onRenderCallback}>
      {children}
    </Profiler>
  );
}
```

### Custom Performance Hook

```tsx
'use client';

import { useEffect, useRef } from 'react';

export function usePerformanceMetrics(componentName: string) {
  const renderCountRef = useRef(0);
  const startTimeRef = useRef<number>();

  useEffect(() => {
    renderCountRef.current += 1;
    startTimeRef.current = performance.now();

    return () => {
      if (startTimeRef.current) {
        const duration = performance.now() - startTimeRef.current;
        console.log(`${componentName} render ${renderCountRef.current}: ${duration.toFixed(2)}ms`);
      }
    };
  });

  useEffect(() => {
    console.log(`${componentName} mounted`);
    return () => console.log(`${componentName} unmounted`);
  }, [componentName]);
}
```

This comprehensive performance optimization guide provides AI assistants with the essential
techniques and patterns needed to build fast, efficient React applications with the modern Next.js
stack.
