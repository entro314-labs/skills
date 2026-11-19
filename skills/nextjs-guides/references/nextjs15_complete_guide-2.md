# Next.js 15 Complete Development Guide

## Table of Contents

1. [Introduction to Next.js 15](#introduction-to-nextjs-15)
2. [Initial Setup and Installation](#initial-setup-and-installation)
3. [React 19 Integration and Compatibility](#react-19-integration-and-compatibility)
4. [Project Structure and Architecture](#project-structure-and-architecture)
5. [Breaking Changes and Migration](#breaking-changes-and-migration)
6. [Development Best Practices](#development-best-practices)
7. [Performance Optimization](#performance-optimization)
8. [Production Setup](#production-setup)
9. [Styling with Tailwind CSS v4 and ShadCN](#styling-with-tailwind-css-v4-and-shadcn)
10. [Testing and Quality Assurance](#testing-and-quality-assurance)
11. [Advanced Techniques](#advanced-techniques)
12. [Troubleshooting and Common Issues](#troubleshooting-and-common-issues)

---

## Introduction to Next.js 15

Next.js 15 represents a significant evolution in modern web development, offering enhanced performance, scalability, and developer experience. Key highlights include:

- **React 19 Support**: Full compatibility with React 19 RC
- **Async Request APIs**: Major breaking changes for server-side APIs
- **Improved Caching Strategy**: Updated default caching behavior
- **Turbopack Integration**: Enhanced development performance
- **App Router Enhancements**: Continued evolution of the app directory

### What's New in Next.js 15

- React 19 RC support with improved server components
- Async request APIs (cookies, headers, params, searchParams)
- Updated fetch behavior (no longer cached by default)
- Enhanced Turbopack for faster development
- Improved client-side router cache behavior
- Better TypeScript support and developer experience

---

## Initial Setup and Installation

### Prerequisites

- **Node.js 18+** (Check with `node -v`)
- **npm, pnpm, yarn, or bun** package manager
- Basic knowledge of React and TypeScript

### Creating a New Next.js 15 Project

```bash
npx create-next-app@latest my-nextjs15-app --ts --tailwind --eslint --app
```

#### Configuration Options

When prompted, select these recommended options:

```
✔ Would you like your code inside a `src/` directory? … Yes
✔ Would you like to use Turbopack for `next dev`? … Yes  
✔ Would you like to customize the import alias (`@/*` by default)? … No
```

### Manual Upgrade from Next.js 14

```bash
# Using the upgrade codemod (recommended)
npx @next/codemod@canary upgrade latest

# Manual upgrade
npm i next@latest react@latest react-dom@latest eslint-config-next@latest
```

### Package.json Configuration

Add these essential scripts to your `package.json`:

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc -b",
    "format": "prettier --write .",
    "test": "vitest --reporter=verbose",
    "test:e2e": "npx playwright test"
  }
}
```

---

## React 19 Integration and Compatibility

### Dependency Management

React 19 is in RC stage, which means some packages may not yet support it as a peer dependency.

#### Using npm with React 19

When running `npx shadcn@latest init`, you'll be prompted to handle peer dependency issues:

```
? How would you like to proceed?
❯ Use --force
  Use --legacy-peer-deps
```

Choose based on your preference, then test thoroughly.

#### Using pnpm, bun, or yarn

These package managers handle React 19 peer dependencies more gracefully and typically don't require flags.

### Key React 19 Changes

#### useFormState → useActionState

```tsx
// Before (React 18)
import { useFormState } from 'react-dom'

function MyForm() {
  const [state, formAction] = useFormState(action, initialState)
  return <form action={formAction}>...</form>
}

// After (React 19)
import { useActionState } from 'react'

function MyForm() {
  const [state, formAction, pending] = useActionState(action, initialState)
  return <form action={formAction}>...</form>
}
```

#### Enhanced useFormStatus

```tsx
// React 19 includes additional properties
import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending, data, method, action } = useFormStatus()
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  )
}
```

### Package Compatibility Status

| Package | React 19 Status | Notes |
|---------|----------------|--------|
| lucide-react | ✅ | Full support |
| @radix-ui/* | 🚧 | Works with flags |
| recharts | 🚧 | Requires react-is override |
| react-hook-form | ✅ | Full support |
| sonner | ✅ | Full support |

#### Recharts with React 19

Add to your `package.json`:

```json
{
  "overrides": {
    "react-is": "^19.0.0-rc-69d4b800-20241021"
  }
}
```

---

## Project Structure and Architecture

### Recommended File Organization

#### Grouping by Feature (Recommended)

```
src/
├── app/
│   ├── (group)/
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── dashboard/
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       └── ...
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   └── todos/
│       ├── components/
│       ├── hooks/
│       └── services/
├── lib/
│   ├── utils.ts
│   ├── prisma.ts
│   └── validations.ts
├── hooks/
│   ├── use-local-storage.ts
│   └── use-mobile.ts
└── middleware.ts
```

#### Alternative: Feature-Based App Directory

```
src/
├── app/
│   ├── dashboard/
│   │   ├── components/
│   │   │   ├── dashboard-header.tsx
│   │   │   └── dashboard-widgets.tsx
│   │   ├── services/
│   │   │   ├── fetch-data.ts
│   │   │   └── auth-service.ts
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── layout.tsx
│   └── page.tsx
└── middleware.ts
```

### Key Architectural Principles

#### 1. Leverage App Directory Benefits

- **Server Components by Default**: Reduce client-side JavaScript
- **Automatic Code Splitting**: Component-level optimization
- **Co-located Data Fetching**: Better organization and performance

#### 2. Strategic Client Component Usage

```tsx
// Server Component (default)
async function ServerPage() {
  const data = await fetchData()
  return (
    <div>
      <h1>Server Rendered Content</h1>
      <ClientInteractiveComponent data={data} />
    </div>
  )
}

// Client Component (when needed)
'use client'
function ClientInteractiveComponent({ data }) {
  const [state, setState] = useState()
  return <InteractiveUI />
}
```

#### 3. Proper Data Fetching Patterns

```tsx
// In Server Components
async function Page() {
  // This runs on the server
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 60 } // Cache for 60 seconds
  })
  
  return <DisplayData data={data} />
}

// In Client Components
'use client'
function ClientComponent() {
  const [data, setData] = useState()
  
  useEffect(() => {
    fetch('/api/data').then(res => res.json()).then(setData)
  }, [])
  
  return <DisplayData data={data} />
}
```

---

## Breaking Changes and Migration

### 1. Async Request APIs (Major Breaking Change)

Previously synchronous APIs are now asynchronous:

#### cookies()

```tsx
// Before
import { cookies } from 'next/headers'

export default function Page() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  return <div>{token?.value}</div>
}

// After
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')
  return <div>{token?.value}</div>
}
```

#### headers()

```tsx
// Before
import { headers } from 'next/headers'

export default function Page() {
  const headersList = headers()
  const userAgent = headersList.get('user-agent')
  return <div>{userAgent}</div>
}

// After
import { headers } from 'next/headers'

export default async function Page() {
  const headersList = await headers()
  const userAgent = headersList.get('user-agent')
  return <div>{userAgent}</div>
}
```

#### params and searchParams

```tsx
// Before
type Params = { slug: string }
type SearchParams = { [key: string]: string | string[] | undefined }

export default function Page({ params, searchParams }: {
  params: Params
  searchParams: SearchParams
}) {
  const { slug } = params
  const { query } = searchParams
  return <div>{slug} - {query}</div>
}

// After
type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Page(props: {
  params: Params
  searchParams: SearchParams
}) {
  const params = await props.params
  const searchParams = await props.searchParams
  const { slug } = params
  const { query } = searchParams
  return <div>{slug} - {query}</div>
}
```

#### Client Components Alternative

For client components, use React's `use()` hook:

```tsx
'use client'
import { use } from 'react'

type Params = Promise<{ slug: string }>

export default function ClientPage(props: { params: Params }) {
  const params = use(props.params)
  const { slug } = params
  return <div>{slug}</div>
}
```

### 2. Fetch Behavior Changes

```tsx
// Before: Cached by default
export default async function Page() {
  const a = await fetch('https://api.example.com/data') // Was cached
  return <div>{a.title}</div>
}

// After: Not cached by default
export default async function Page() {
  const a = await fetch('https://api.example.com/data') // Not cached
  const b = await fetch('https://api.example.com/data', { 
    cache: 'force-cache' 
  }) // Explicitly cached
  
  return <div>{a.title}</div>
}
```

#### Segment-Level Caching

```tsx
// Enable caching for all fetch requests in this segment
export const fetchCache = 'default-cache'

export default async function Page() {
  const a = await fetch('https://api.example.com/data') // Now cached
  const b = await fetch('https://api.example.com/other', { 
    cache: 'no-store' 
  }) // Override: not cached
  
  return <div>{a.title}</div>
}
```

### 3. Route Handlers Caching

```tsx
// Before: GET methods were cached
export async function GET() {
  return Response.json({ data: 'cached' })
}

// After: Explicitly opt-in to caching
export const dynamic = 'force-static'

export async function GET() {
  return Response.json({ data: 'cached' })
}
```

### 4. Client-Side Router Cache

Page segments are no longer reused by default when navigating via `<Link>` or `useRouter`.

```tsx
// Enable stale times for caching
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
}
```

### 5. Configuration Updates

#### Runtime Configuration

```tsx
// Before
export const runtime = 'experimental-edge'

// After
export const runtime = 'edge'
```

#### Bundle Configuration

```tsx
// Before
const nextConfig = {
  experimental: {
    bundlePagesExternals: true,
    serverComponentsExternalPackages: ['package-name'],
  },
}

// After
const nextConfig = {
  bundlePagesRouterDependencies: true,
  serverExternalPackages: ['package-name'],
}
```

---

## Development Best Practices

### 1. TypeScript Configuration

Always use TypeScript for better developer experience:

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

Define reusable types and interfaces:

```tsx
// types/user.ts
interface User {
  id: number
  name: string
  email: string
}

interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

// Usage
const fetchUser = async (id: number): Promise<ApiResponse<User>> => {
  const response = await fetch(`/api/users/${id}`)
  return response.json()
}
```

### 2. Data Fetching Strategies

#### Static Site Generation (SSG)

```tsx
// For pages that don't change often
export default async function StaticPage() {
  const data = await fetch('https://api.example.com/static-data', {
    cache: 'force-cache'
  })
  
  return <div>{data.content}</div>
}
```

#### Incremental Static Regeneration (ISR)

```tsx
// For pages that update periodically
export default async function ISRPage() {
  const data = await fetch('https://api.example.com/dynamic-data', {
    next: { revalidate: 60 } // Revalidate every 60 seconds
  })
  
  return <div>{data.content}</div>
}
```

#### Server-Side Rendering (SSR)

```tsx
// For pages that need fresh data on every request
export default async function SSRPage() {
  const data = await fetch('https://api.example.com/user-data', {
    cache: 'no-store'
  })
  
  return <div>{data.content}</div>
}
```

#### Client-Side Fetching

```tsx
'use client'
import { useEffect, useState } from 'react'

export default function ClientPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetch('/api/client-data')
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
  }, [])
  
  if (loading) return <div>Loading...</div>
  
  return <div>{data.content}</div>
}
```

### 3. Error Handling Best Practices

#### Global Error Boundaries

```tsx
// app/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Try again
      </button>
    </div>
  )
}
```

#### Custom 404 Pages

```tsx
// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-4xl font-bold mb-4">404 - Page Not Found</h2>
      <p className="text-gray-600 mb-6">Could not find the requested resource.</p>
      <Link 
        href="/"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Return Home
      </Link>
    </div>
  )
}
```

#### API Error Handling

```tsx
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const users = await fetchUsers()
    return NextResponse.json({ users, success: true })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users', success: false },
      { status: 500 }
    )
  }
}
```

### 4. Middleware Best Practices

```tsx
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Authentication check
  const token = request.cookies.get('auth-token')
  
  if (request.nextUrl.pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // Add custom headers
  const response = NextResponse.next()
  response.headers.set('x-custom-header', 'my-value')
  
  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
```

### 5. Accessibility Best Practices

```tsx
// Semantic HTML and ARIA attributes
export default function AccessibleComponent() {
  return (
    <main>
      <h1>Page Title</h1>
      <nav aria-label="Main navigation">
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>
      
      <section aria-labelledby="content-heading">
        <h2 id="content-heading">Content Section</h2>
        <p>Content goes here...</p>
      </section>
      
      <button 
        aria-expanded={isOpen}
        aria-controls="dropdown-menu"
        onClick={toggleDropdown}
      >
        Menu
      </button>
      
      {isOpen && (
        <ul id="dropdown-menu" role="menu">
          <li role="menuitem">Option 1</li>
          <li role="menuitem">Option 2</li>
        </ul>
      )}
    </main>
  )
}
```

---

## Performance Optimization

### 1. Image Optimization

```tsx
import Image from 'next/image'

// Optimized image loading
export default function OptimizedImages() {
  return (
    <>
      {/* Hero image - load immediately */}
      <Image
        src="/hero.jpg"
        alt="Hero image"
        width={1200}
        height={600}
        priority
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,..."
      />
      
      {/* Gallery images - lazy load */}
      <Image
        src="/gallery-1.jpg"
        alt="Gallery image"
        width={400}
        height={300}
        loading="lazy"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </>
  )
}
```

### 2. Dynamic Imports and Code Splitting

```tsx
import dynamic from 'next/dynamic'

// Lazy load heavy components
const HeavyChart = dynamic(() => import('../components/HeavyChart'), {
  ssr: false,
  loading: () => <div>Loading chart...</div>
})

const MapComponent = dynamic(() => import('../components/Map'), {
  ssr: false,
  loading: () => <div>Loading map...</div>
})

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <HeavyChart />
      <MapComponent />
    </div>
  )
}
```

### 3. Font Optimization

```tsx
// app/layout.tsx
import { Inter, Roboto_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
```

### 4. Bundle Analysis

```bash
# Install bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Analyze your bundle
npm run build && npm run analyze
```

```javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // Your existing config
})
```

### 5. Memory Usage Optimization

```javascript
// next.config.js
module.exports = {
  experimental: {
    // Optimize memory usage for large apps
    swcMinify: true,
    serverComponentsExternalPackages: ['@prisma/client'],
  }
}
```

### 6. Performance Monitoring

```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

### 7. Prefetching Strategies

```tsx
import Link from 'next/link'

export default function Navigation() {
  return (
    <nav>
      {/* Prefetch important pages */}
      <Link href="/dashboard" prefetch={true}>
        Dashboard
      </Link>
      
      {/* Don't prefetch less important pages */}
      <Link href="/rarely-visited" prefetch={false}>
        Rarely Visited
      </Link>
    </nav>
  )
}
```

---

## Production Setup

### 1. Code Quality Tools

#### ESLint Configuration

```bash
npm install --save-dev @typescript-eslint/parser eslint-plugin-unicorn eslint-plugin-import eslint-plugin-playwright eslint-config-prettier eslint-plugin-prettier eslint-plugin-simple-import-sort
```

```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:unicorn/recommended",
    "plugin:import/recommended",
    "plugin:playwright/recommended",
    "plugin:prettier/recommended"
  ],
  "plugins": ["simple-import-sort"],
  "rules": {
    "simple-import-sort/exports": "error",
    "simple-import-sort/imports": "error",
    "unicorn/no-array-callback-reference": "off",
    "unicorn/no-array-for-each": "off",
    "unicorn/no-array-reduce": "off",
    "unicorn/prevent-abbreviations": [
      "error",
      {
        "allowList": {
          "e2e": true
        },
        "replacements": {
          "props": false,
          "ref": false,
          "params": false
        }
      }
    ]
  }
}
```

#### Prettier Configuration

```javascript
// prettier.config.js
module.exports = {
  arrowParens: 'avoid',
  bracketSameLine: false,
  bracketSpacing: true,
  htmlWhitespaceSensitivity: 'css',
  insertPragma: false,
  jsxSingleQuote: false,
  plugins: ['prettier-plugin-tailwindcss'],
  printWidth: 80,
  proseWrap: 'always',
  quoteProps: 'as-needed',
  requirePragma: false,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
}
```

### 2. Git Hooks with Husky

```bash
npm install --save-dev @commitlint/cli@latest @commitlint/config-conventional@latest husky@latest
npx husky-init && npm install
```

```bash
# .husky/pre-commit
npm run lint && npm run type-check
```

```bash
# .husky/prepare-commit-msg
exec < /dev/tty && npx cz --hook || true
```

```javascript
// commitlint.config.cjs
const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'references-empty': [1, 'never'],
    'footer-max-line-length': [0, 'always'],
    'body-max-line-length': [0, 'always'],
  },
}

module.exports = config
```

### 3. Environment Configuration

```bash
# .env.local
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
NEXT_PUBLIC_API_URL="https://api.example.com"
```

```bash
# .env.production
DATABASE_URL="your-production-db-url"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-production-secret"
NEXT_PUBLIC_API_URL="https://api.yourdomain.com"
```

### 4. Database Setup with Prisma

```bash
npm install prisma @prisma/client
npx prisma init
```

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("POSTGRES_URL_NON_POOLING")
}

model User {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  email     String   @unique
  name      String?
  posts     Post[]
}

model Post {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
}
```

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

declare global {
  var __database__: PrismaClient
}

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.__database__) {
    global.__database__ = new PrismaClient()
  }
  prisma = global.__database__
}

export default prisma
```

### 5. Internationalization (i18n)

```bash
npm install negotiator @formatjs/intl-localematcher
npm install --save-dev @types/negotiator
```

```typescript
// features/internationalization/i18n-config.ts
export const i18n = {
  defaultLocale: 'en-US',
  locales: ['en-US', 'es-ES', 'fr-FR'],
} as const

export type Locale = (typeof i18n)['locales'][number]
```

```typescript
// middleware.ts
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { type NextRequest, NextResponse } from 'next/server'
import { i18n } from './features/internationalization/i18n-config'

function getLocale(request: NextRequest) {
  const headers = {
    'accept-language': request.headers.get('accept-language') ?? '',
  }
  const languages = new Negotiator({ headers }).languages()
  return match(languages, i18n.locales, i18n.defaultLocale)
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const pathnameHasLocale = i18n.locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (pathnameHasLocale) return

  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ['/((?!api|_next|.*.svg$).*)'],
}
```

### 6. CI/CD with GitHub Actions

```yaml
# .github/workflows/pull-request.yml
name: Pull Request

on: [pull_request]

jobs:
  lint:
    name: ⬣ ESLint
    runs-on: ubuntu-latest
    steps:
      - name: ⬇️ Checkout repo
        uses: actions/checkout@v3
      - name: ⎔ Setup node
        uses: actions/setup-node@v3
        with:
          node-version: 20
      - name: 📥 Download deps
        uses: bahmutov/npm-install@v1
      - name: 🔬 Lint
        run: npm run lint

  type-check:
    name: ʦ TypeScript
    runs-on: ubuntu-latest
    steps:
      - name: ⬇️ Checkout repo
        uses: actions/checkout@v3
      - name: ⎔ Setup node
        uses: actions/setup-node@v3
        with:
          node-version: 20
      - name: 📥 Download deps
        uses: bahmutov/npm-install@v1
      - name: 🔎 Type check
        run: npm run type-check

  vitest:
    name: ⚡ Vitest
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:12
        env:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: testdb
        ports:
          - 5432:5432
    steps:
      - name: ⬇️ Checkout repo
        uses: actions/checkout@v3
      - name: ⎔ Setup node
        uses: actions/setup-node@v3
        with:
          node-version: 20
      - name: 📥 Download deps
        uses: bahmutov/npm-install@v1
      - name: 🛠 Setup Database
        run: npm run prisma:wipe
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/testdb
      - name: ⚡ Run vitest
        run: npm run test -- --coverage
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/testdb

  playwright:
    name: 🎭 Playwright
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:12
        env:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: testdb
        ports:
          - 5432:5432
    steps:
      - name: ⬇️ Checkout repo
        uses: actions/checkout@v3
      - name: ⎔ Setup node
        uses: actions/setup-node@v3
        with:
          node-version: 20
      - name: 📥 Download deps
        uses: bahmutov/npm-install@v1
      - name: 🌐 Install Playwright Browsers
        run: npx playwright install --with-deps
      - name: 🛠 Setup Database
        run: npm run prisma:wipe
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/testdb
      - name: 🎭 Playwright Run
        run: npx playwright test
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/testdb
```

---

## Styling with Tailwind CSS v4 and ShadCN

### 1. Tailwind CSS v4 Setup

Tailwind CSS v4 eliminates the need for a `tailwind.config.ts` file by using inline theme configuration in CSS.

```bash
npx shadcn@latest init
```

### 2. Global CSS Configuration

```css
/* app/globals.css */
@import "tailwindcss";
@import "tailwindcss-animate";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background-primary: rgb(249 250 251);
  --color-background-secondary: rgb(18 18 18);
  --color-text-primary: rgb(55 65 81);
  --color-text-secondary: rgb(243 244 246);
  --color-buttons: rgb(250 204 21);
  --color-border: rgb(209 213 219);
}

:root {
  --background-primary: rgba(249, 250, 251, 1);
  --background-secondary: rgba(18, 18, 18, 1);
  --text-primary: rgba(55, 65, 81, 1);
  --text-secondary: rgba(243, 244, 246, 1);
  --buttons: rgba(250, 204, 21, 1);
  --border-color: rgba(209, 213, 219, 1);
}

.dark {
  --background-primary: rgba(18, 18, 18, 1);
  --background-secondary: rgba(249, 250, 251, 1);
  --text-primary: rgba(243, 244, 246, 1);
  --text-secondary: rgba(55, 65, 81, 1);
}
```

### 3. Dark Mode Implementation

```bash
npm install next-themes
```

```tsx
// components/theme-provider.tsx
"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  )
}
```

```tsx
// components/theme-toggle.tsx
"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <button
      className="fixed bottom-4 right-4 p-2 bg-buttons text-textPrimary rounded"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}
    </button>
  )
}
```

### 4. ShadCN Component Usage

```tsx
// Example component using ShadCN UI
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginForm() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="Enter your password" />
        </div>
        <Button className="w-full">Sign In</Button>
      </CardContent>
    </Card>
  )
}
```

### 5. Adding Components

```bash
# Add specific components
npx shadcn@latest add button card input label

# Add all components
npx shadcn@latest add
```

---

## Testing and Quality Assurance

### 1. Unit Testing with Vitest

```bash
npm install -D vitest @testing-library/react @testing-library/dom @testing-library/jest-dom @testing-library/user-event happy-dom @vitejs/plugin-react vite-tsconfig-paths
```

```typescript
// vitest.config.ts
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./src/tests/setup-test-environment.ts'],
    include: ['./src/**/*.{spec,test}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
})
```

```typescript
// src/tests/setup-test-environment.ts
import '@testing-library/jest-dom/vitest'

// @ts-ignore
globalThis.IS_REACT_ACT_ENVIRONMENT = true
```

```tsx
// src/tests/react-test-utils.tsx
import type { RenderOptions } from '@testing-library/react'
import { render } from '@testing-library/react'
import type { ReactElement } from 'react'

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
) =>
  render(ui, {
    wrapper: ({ children }) => <>{children}</>,
    ...options,
  })

export * from '@testing-library/react'
export { customRender as render }
export { default as userEvent } from '@testing-library/user-event'
```

```tsx
// Example test
import { describe, expect, test } from 'vitest'
import { render, screen } from '@/tests/react-test-utils'

function MyComponent({ title }: { title: string }) {
  return <h1>{title}</h1>
}

describe('MyComponent', () => {
  test('renders with title', () => {
    render(<MyComponent title="Hello World" />)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })
})
```

### 2. E2E Testing with Playwright

```bash
npm init playwright@latest
```

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './playwright',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: process.env.CI ? 'npm run build && npm run start' : 'npm run dev',
    port: 3000,
  },
})
```

```typescript
// playwright/example.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should display welcome message', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible()
  })

  test('should navigate to about page', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'About' }).click()
    await expect(page).toHaveURL('/about')
  })
})
```

---

## Advanced Techniques

### 1. Server Actions

```tsx
// app/actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  
  // Validate inputs
  if (!title || !content) {
    throw new Error('Title and content are required')
  }
  
  // Save to database
  await prisma.post.create({
    data: { title, content }
  })
  
  revalidatePath('/posts')
  redirect('/posts')
}
```

```tsx
// components/post-form.tsx
import { createPost } from '@/app/actions'

export default function PostForm() {
  return (
    <form action={createPost} className="space-y-4">
      <div>
        <label htmlFor="title" className="block mb-2">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="content" className="block mb-2">Content</label>
        <textarea
          id="content"
          name="content"
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Create Post
      </button>
    </form>
  )
}
```

### 2. Optimistic UI Updates

```tsx
'use client'

import { useOptimistic, useTransition } from 'react'
import { addTodo } from '@/app/actions'

interface Todo {
  id: string
  text: string
  completed: boolean
}

export default function TodoList({ todos }: { todos: Todo[] }) {
  const [isPending, startTransition] = useTransition()
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo: Todo) => [...state, newTodo]
  )

  async function handleSubmit(formData: FormData) {
    const text = formData.get('text') as string
    
    addOptimisticTodo({
      id: Math.random().toString(),
      text,
      completed: false
    })
    
    startTransition(async () => {
      await addTodo(text)
    })
  }

  return (
    <div>
      <ul>
        {optimisticTodos.map((todo) => (
          <li key={todo.id} className={isPending ? 'opacity-50' : ''}>
            {todo.text}
          </li>
        ))}
      </ul>
      
      <form action={handleSubmit}>
        <input
          name="text"
          placeholder="Add a todo..."
          className="p-2 border rounded"
        />
        <button type="submit" disabled={isPending}>
          {isPending ? 'Adding...' : 'Add Todo'}
        </button>
      </form>
    </div>
  )
}
```

### 3. Streaming with Suspense

```tsx
// app/dashboard/page.tsx
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

async function UserStats() {
  const stats = await fetchUserStats() // Slow operation
  return <div>Stats: {stats.total}</div>
}

async function RecentActivity() {
  const activity = await fetchRecentActivity() // Another slow operation
  return <div>Recent: {activity.length} items</div>
}

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      <div className="grid grid-cols-2 gap-4">
        <Suspense fallback={<Skeleton className="h-20" />}>
          <UserStats />
        </Suspense>
        
        <Suspense fallback={<Skeleton className="h-20" />}>
          <RecentActivity />
        </Suspense>
      </div>
    </div>
  )
}
```

### 4. Parallel Data Fetching

```tsx
// Parallel fetching for better performance
export default async function Page() {
  // These will fetch in parallel
  const [user, posts, comments] = await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchComments()
  ])

  return (
    <div>
      <UserProfile user={user} />
      <PostsList posts={posts} />
      <CommentsList comments={comments} />
    </div>
  )
}
```

### 5. Route Handlers with Advanced Features

```tsx
// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const createPostSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(1),
  tags: z.array(z.string()).optional()
})

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') ?? '1')
  const limit = parseInt(searchParams.get('limit') ?? '10')
  
  const posts = await prisma.post.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: 'desc' }
  })
  
  return NextResponse.json({
    posts,
    pagination: {
      page,
      limit,
      total: await prisma.post.count()
    }
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, tags } = createPostSchema.parse(body)
    
    const post = await prisma.post.create({
      data: { title, content, tags }
    })
    
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

---

## Troubleshooting and Common Issues

### 1. Development Performance Issues

#### Check Antivirus Software

Add your project folder to antivirus exclusion lists to improve file access speed.

#### Enable Turbopack

```bash
npm run dev --turbopack
```

#### Optimize Imports

```tsx
// Bad: Imports all icons
import { IconHome, IconUser } from 'react-icons/md'

// Good: Import only what you need
import IconHome from 'react-icons/md/IconHome'
import IconUser from 'react-icons/md/IconUser'
```

#### Optimize Tailwind Content Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Good: specific
    // './packages/**/*.{js,ts,jsx,tsx}', // Bad: too broad
  ],
}
```

### 2. React 19 Compatibility Issues

#### Peer Dependency Warnings

```bash
# If using npm, use flags to resolve peer dependency issues
npm install --legacy-peer-deps

# Or use force
npm install --force
```

#### TypeScript Type Issues

```bash
# Update React types
npm install --save-dev @types/react@latest @types/react-dom@latest
```

### 3. Hydration Mismatches

```tsx
// Bad: Different content between server and client
function BadComponent() {
  return <div>{new Date().toISOString()}</div>
}

// Good: Use useEffect for client-only content
function GoodComponent() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return <div>Loading...</div>
  }
  
  return <div>{new Date().toISOString()}</div>
}
```

### 4. Memory Issues

```javascript
// next.config.js
module.exports = {
  experimental: {
    serverComponentsHmrCache: true, // Cache server components during HMR
  },
  logging: {
    fetches: {
      fullUrl: true, // Enable detailed fetch logging
    },
  },
}
```

### 5. Build Errors

#### Clear Next.js Cache

```bash
rm -rf .next
npm run build
```

#### Check for Circular Dependencies

```bash
# Install dependency cruiser
npm install --save-dev dependency-cruiser

# Check for circular dependencies
npx depcruise --validate --output-type err src
```

### 6. Deployment Issues

#### Environment Variables

```bash
# Ensure all required environment variables are set
# Use a .env.example file to document required variables

# .env.example
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret"
NEXT_PUBLIC_API_URL="https://api.example.com"
```

#### Build Optimization

```javascript
// next.config.js
module.exports = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: ['lodash', 'date-fns'],
  },
  images: {
    domains: ['example.com'],
    formats: ['image/webp', 'image/avif'],
  },
}
```

### 7. Common Debugging Tools

#### Turbopack Tracing

```bash
# Generate trace file
NEXT_TURBOPACK_TRACING=1 npm run dev

# Analyze trace
next internal trace .next/trace-turbopack
```

#### Performance Monitoring

```tsx
// Monitor Web Vitals
export function reportWebVitals(metric) {
  console.log(metric)
  
  // Send to analytics
  if (typeof window !== 'undefined') {
    gtag('event', metric.name, {
      value: Math.round(metric.value),
      event_label: metric.id,
      non_interaction: true,
    })
  }
}
```

### 8. Essential Tips for Success

1. **Always Test Thoroughly**: After upgrading or making significant changes, test all functionality
2. **Use TypeScript**: Catch errors at compile time rather than runtime
3. **Monitor Performance**: Use tools like Lighthouse and Vercel Speed Insights
4. **Keep Dependencies Updated**: Regularly update packages, especially security patches
5. **Follow the Official Documentation**: Next.js documentation is comprehensive and up-to-date
6. **Use Community Resources**: Join the Next.js Discord and follow GitHub discussions

### 9. Key Resources

- **Official Documentation**: <https://nextjs.org/docs>
- **React 19 Guide**: <https://react.dev/blog/2024/04/25/react-19-upgrade-guide>
- **Turbopack Documentation**: <https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack>
- **ShadCN UI**: <https://ui.shadcn.com/>
- **Next.js Examples**: <https://github.com/vercel/next.js/tree/canary/examples>

---

## Conclusion

Next.js 15 brings significant improvements and some breaking changes that require careful migration. The key to success is:

1. Understanding the new async APIs and updating your code accordingly
2. Leveraging React 19 features while handling compatibility issues
3. Following production best practices from the start
4. Implementing proper testing and quality assurance
5. Optimizing for performance and user experience

By following this guide, you'll be well-equipped to build modern, scalable, and performant web applications with Next.js 15. Remember to always refer to the official documentation for the most up-to-date information and best practices.

---

*This guide was compiled from multiple authoritative sources including the official Next.js documentation, React 19 upgrade guides, and production best practices from experienced developers. Last updated: June 2025*
