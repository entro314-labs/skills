---
title: 'Troubleshooting & Solutions Guide'
description: 'For AI Assistants: Comprehensive solutions for common issues and debugging.'
category: 'Nextjs Tailwind Shadcn Docs'
---

# Troubleshooting & Solutions Guide

_For AI Assistants: Comprehensive solutions for common issues and debugging_

## 🚨 Installation & Setup Issues

### Next.js 15+ Installation Problems

**Issue: "Cannot resolve module 'next'"**

```bash
# Solution: Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install next@latest react@latest react-dom@latest
```

**Issue: TypeScript compilation errors after upgrade**

```bash
# Solution: Update TypeScript and type definitions
npm install -D typescript@latest @types/node@latest @types/react@latest @types/react-dom@latest

# Clear Next.js cache
rm -rf .next

# Regenerate types
npm run build
```

**Issue: "Module not found: Can't resolve '@/...'"**

```json
// tsconfig.json - Fix path mapping
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Tailwind CSS 4+ Issues

**Issue: "@tailwindcss/postcss not found"**

```bash
# Solution: Install correct packages for v4
npm uninstall tailwindcss autoprefixer
npm install tailwindcss@next @tailwindcss/postcss@next postcss
```

**Issue: Styles not applying in development**

```css
/* globals.css - Ensure correct imports for v4 */
@import 'tailwindcss';
/* NOT: @tailwind base; @tailwind components; @tailwind utilities; */
```

**Issue: "Unknown at-rule @theme"**

```javascript
// postcss.config.mjs - Ensure correct configuration
export default {
  plugins: {
    '@tailwindcss/postcss': {}, // Correct plugin name
  },
};
```

**Issue: Custom theme colors not working**

```css
/* globals.css - Proper theme setup */
:root {
  --my-color: oklch(0.5 0.2 240);
}

@theme inline {
  --color-my-color: var(--my-color); /* Required for Tailwind access */
}

/* Usage: bg-my-color, text-my-color */
```

### shadcn/ui 2.7+ Issues

**Issue: "Cannot find module '@/components/ui/...'"**

```bash
# Solution: Check components.json configuration
npx shadcn@latest init --force

# Verify paths in components.json
{
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

**Issue: Components not styling correctly**

```json
// components.json - Ensure v4 compatibility
{
  "tailwind": {
    "config": "", // Should be empty for v4
    "css": "src/app/globals.css",
    "cssVariables": true
  }
}
```

**Issue: React 19 forwardRef errors**

```bash
# Solution: Update components using codemod
npx @next/codemod@canary remove-forward-ref ./components

# Or manually update to data-slot pattern
```

---

## 🎨 Styling & Theme Issues

### Dark Mode Not Working

**Issue: Theme toggle not functioning**

```tsx
// Check theme provider setup
'use client';
import { ThemeProvider } from 'next-themes';

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      {' '}
      {/* Important! */}
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

**Issue: Hydration mismatch with theme**

```tsx
// Solution: Proper theme component with mounting check
'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>Toggle Theme</button>
  );
}
```

### CSS Variables Not Working

**Issue: CSS variables undefined in components**

```css
/* Solution: Ensure proper CSS variable setup */
:root {
  --my-variable: value;
}

.dark {
  --my-variable: dark-value;
}

@theme inline {
  --color-my-variable: var(--my-variable);
}
```

**Issue: Tailwind classes not generating**

```css
/* Check content paths in CSS */
@import 'tailwindcss';
@source "src/**/*.{js,ts,jsx,tsx}";
@source "components/**/*.{js,ts,jsx,tsx}";
@source "!node_modules/**/*";
```

### Animation Issues

**Issue: tailwindcss-animate not working**

```bash
# Solution: Update to new animation system
npm uninstall tailwindcss-animate
npm install -D tw-animate-css
```

```css
/* globals.css */
@import "tw-animate-css";

/* Usage remains the same */
<div class="animate-in slide-in-from-bottom-4 duration-300">
```

---

## ⚡ Performance Issues

### Slow Build Times

**Issue: Build taking too long**

```typescript
// next.config.ts - Enable optimizations
const config: NextConfig = {
  experimental: {
    turbo: true, // Enable Turbopack
    optimizeCss: true,
    serverComponentsHmrCache: true,
  },
  webpack: (config, { dev }) => {
    if (!dev) {
      // Production optimizations
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
```

**Issue: Large bundle size**

```bash
# Analyze bundle
npm install --save-dev @next/bundle-analyzer
ANALYZE=true npm run build

# Fix by using dynamic imports
const HeavyComponent = dynamic(() => import('./heavy-component'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
```

### Runtime Performance Issues

**Issue: Slow page transitions**

```tsx
// Solution: Optimize with Suspense boundaries
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <SlowComponent />
      </Suspense>
    </div>
  );
}
```

**Issue: Memory leaks in client components**

```tsx
// Solution: Proper cleanup
'use client';
import { useEffect, useRef } from 'react';

export function Component() {
  const intervalRef = useRef<NodeJS.Timeout>();
  const abortControllerRef = useRef<AbortController>();

  useEffect(() => {
    // Setup
    intervalRef.current = setInterval(() => {}, 1000);
    abortControllerRef.current = new AbortController();

    // Cleanup
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  return <div>Component</div>;
}
```

---

## 🔄 Data Fetching Issues

### Server Component Data Fetching

**Issue: "Cannot use hooks in server component"**

```tsx
// ❌ Wrong: Using hooks in server component
export default function Page() {
  const [data, setData] = useState(); // Error!
  return <div>Page</div>;
}

// ✅ Solution: Use server component pattern
export default async function Page() {
  const data = await fetch('/api/data').then((res) => res.json());
  return <div>{data.title}</div>;
}
```

**Issue: "Cannot access request in server component"**

```tsx
// ❌ Wrong: Accessing request directly
export default function Page({ request }) {
  const url = request.url; // Error!
}

// ✅ Solution: Use searchParams and params
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const search = await searchParams;
  return <div>Page {id}</div>;
}
```

### Client Component Data Fetching

**Issue: Fetch not working in client component**

```tsx
// ❌ Wrong: Direct fetch in component body
'use client';
export function Component() {
  const data = fetch('/api/data'); // Error!
  return <div>Component</div>;
}

// ✅ Solution: Use useEffect for client-side fetching
('use client');
import { useEffect, useState } from 'react';

export function Component() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then(setData);
  }, []);

  return <div>{data?.title}</div>;
}
```

### API Route Issues

**Issue: "Internal Server Error" in API routes**

```typescript
// Solution: Proper error handling
export async function GET(request: NextRequest) {
  try {
    const data = await someAsyncOperation();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

**Issue: CORS errors in API routes**

```typescript
// Solution: Add CORS headers
export async function GET(request: NextRequest) {
  const data = { message: 'Hello World' };

  return NextResponse.json(data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function OPTIONS(request: NextRequest) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
```

---

## 🔐 Authentication Issues

### NextAuth.js Common Problems

**Issue: "Invalid callback URL" error**

```typescript
// Solution: Check NEXTAUTH_URL configuration
// .env.local
NEXTAUTH_URL="http://localhost:3000" // Development
NEXTAUTH_URL="https://yourdomain.com" // Production

// next-auth configuration
export const authOptions: NextAuthOptions = {
  providers: [...],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};
```

**Issue: Session not persisting**

```typescript
// Solution: Check session configuration
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt', // or "database"
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
};
```

**Issue: "Cannot read properties of null (session)"**

```tsx
// Solution: Proper loading state handling
'use client';
import { useSession } from 'next-auth/react';

export function ProfileComponent() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'unauthenticated') return <p>Access Denied</p>;

  return <p>Welcome {session?.user?.email}!</p>;
}
```

---

## 🛠️ Development Tools Issues

### ESLint Configuration Problems

**Issue: ESLint errors with new Next.js features**

```json
// .eslintrc.json - Updated configuration
{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "rules": {
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }
    ],
    "react/no-unescaped-entities": "off",
    "@next/next/no-page-custom-font": "off"
  },
  "overrides": [
    {
      "files": ["*.ts", "*.tsx"],
      "parser": "@typescript-eslint/parser"
    }
  ]
}
```

### TypeScript Issues

**Issue: Type errors with async components**

```typescript
// Solution: Proper typing for async components
import { ReactNode } from 'react';

interface Props {
  params: Promise<{ id: string }>;
  children: ReactNode;
}

export default async function Layout({ params, children }: Props) {
  const { id } = await params;
  return <div>{children}</div>;
}
```

**Issue: Module resolution errors**

```json
// tsconfig.json - Fix module resolution
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": false,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "plugins": [{ "name": "next" }]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"]
}
```

---

## 📱 Deployment Issues

### Vercel Deployment Problems

**Issue: Build failing on Vercel**

```json
// package.json - Ensure correct build script
{
  "scripts": {
    "build": "next build",
    "start": "next start"
  },
  "engines": {
    "node": ">=18.17.0"
  }
}
```

**Issue: Environment variables not working**

```bash
# Solution: Check variable names and scoping
# ✅ Server-side: Any name
DATABASE_URL="..."

# ✅ Client-side: Must start with NEXT_PUBLIC_
NEXT_PUBLIC_API_URL="..."

# ❌ Wrong: Server variables on client
# Cannot access DATABASE_URL in client components
```

**Issue: Function timeout errors**

```typescript
// vercel.json - Configure function timeouts
{
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

### Docker Deployment Issues

**Issue: Docker build failing**

```dockerfile
# Solution: Multi-stage build with proper permissions
FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --only=production && npm cache clean --force

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
```

---

## 🧪 Testing Issues

### Vitest Configuration Problems

**Issue: Tests not finding modules**

```typescript
// vitest.config.ts - Fix module resolution
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

**Issue: "ReferenceError: React is not defined"**

```typescript
// vitest.config.ts - Add React plugin properly
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()], // Ensure React plugin is included
  test: {
    environment: 'happy-dom',
    globals: true, // Enable global test functions
  },
});
```

### Testing Library Issues

**Issue: Components not rendering in tests**

```tsx
// Solution: Proper test wrapper setup
// src/test/utils.tsx
import { render, RenderOptions } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';

function TestProviders({ children }: { children: ReactNode }) {
  return (
    <div>{children}</div>
    // Add providers like ThemeProvider, QueryClient, etc.
  );
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: TestProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

---

## 🔧 Debugging Techniques

### Next.js Debug Mode

```bash
# Enable debug mode
DEBUG=next:* npm run dev

# Debug specific modules
DEBUG=next:build npm run build
DEBUG=next:router npm run dev
```

### React DevTools Profiler

```tsx
// Enable profiler in development
import { Profiler } from 'react';

function onRenderCallback(id, phase, actualDuration) {
  console.log('Profiler:', { id, phase, actualDuration });
}

export function ProfiledComponent({ children }) {
  return (
    <Profiler id="MyComponent" onRender={onRenderCallback}>
      {children}
    </Profiler>
  );
}
```

### Network Debugging

```typescript
// Log all fetch requests
const originalFetch = global.fetch;
global.fetch = async (...args) => {
  console.log('Fetch request:', args[0]);
  const response = await originalFetch(...args);
  console.log('Fetch response:', response.status, response.statusText);
  return response;
};
```

### Performance Debugging

```typescript
// Measure component render time
import { useEffect, useRef } from 'react';

export function useRenderTime(componentName: string) {
  const renderStart = useRef(performance.now());

  useEffect(() => {
    const renderTime = performance.now() - renderStart.current;
    console.log(`${componentName} render time: ${renderTime.toFixed(2)}ms`);
    renderStart.current = performance.now();
  });
}

// Usage
export function MyComponent() {
  useRenderTime('MyComponent');
  return <div>Component content</div>;
}
```

---

## 📞 Getting Help

### Official Resources

- **Next.js Documentation**: <https://nextjs.org/docs>
- **Next.js GitHub Issues**: <https://github.com/vercel/next.js/issues>
- **Next.js Discord**: <https://discord.com/invite/nextjs>
- **Tailwind CSS Documentation**: <https://tailwindcss.com/docs>
- **shadcn/ui Documentation**: <https://ui.shadcn.com/>

### Community Resources

- **Stack Overflow**: Use tags `next.js`, `tailwindcss`, `react`
- **Reddit**: r/nextjs, r/reactjs, r/webdev
- **Twitter**: Follow @nextjs, @tailwindcss, @shadcn

### Debugging Checklist

**Before asking for help:**

- [ ] Check error messages carefully
- [ ] Search existing issues on GitHub
- [ ] Try the solution in a fresh project
- [ ] Check version compatibility
- [ ] Review configuration files
- [ ] Test in different browsers
- [ ] Check network tab for failed requests
- [ ] Review console for additional errors

**When asking for help:**

- [ ] Provide minimal reproducible example
- [ ] Include error messages and stack traces
- [ ] Specify versions of all relevant packages
- [ ] Describe expected vs actual behavior
- [ ] Include relevant configuration files
- [ ] Mention deployment environment if applicable

This comprehensive troubleshooting guide provides AI assistants with the knowledge needed to
diagnose and resolve common issues when working with the modern Next.js stack.
