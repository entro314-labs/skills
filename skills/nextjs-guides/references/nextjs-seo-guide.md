# Next.js 15 SEO & Social Optimization Guide

## Core App Router SEO Setup

### 1. Enhanced Root Layout Metadata

```typescript
// app/layout.tsx
import { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' }
  ]
}

export const metadata: Metadata = {
  metadataBase: new URL('https://your-domain.com'),
  title: {
    template: '%s | YourSite',
    default: 'YourSite - Default Title'
  },
  description: 'Your site description',
  keywords: ['keyword1', 'keyword2'],
  authors: [{ name: 'Your Name', url: 'https://your-domain.com' }],
  creator: 'Your Name',
  publisher: 'Your Company',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    siteName: 'YourSite',
    title: 'YourSite',
    description: 'Your site description',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'YourSite'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@yourhandle',
    creator: '@yourhandle'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-verification-code',
    yandex: 'your-verification-code',
    yahoo: 'your-verification-code',
  },
  alternates: {
    canonical: 'https://your-domain.com',
    languages: {
      'en-US': 'https://your-domain.com/en-us',
      'de-DE': 'https://your-domain.com/de',
    },
  },
}
```

### 2. Dynamic Metadata for Pages

```typescript
// app/package/[slug]/page.tsx
import { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const packageData = await getPackageData(params.slug)
  
  if (!packageData) {
    return {
      title: 'Package Not Found',
      robots: { index: false, follow: false }
    }
  }

  const title = `${packageData.name} - ${packageData.description}`
  const description = `Install ${packageData.name} via Homebrew. ${packageData.description}. Downloads: ${packageData.downloadCount}`

  return {
    title,
    description,
    keywords: [packageData.name, ...packageData.tags, 'homebrew', 'package'],
    openGraph: {
      title,
      description,
      url: `https://your-domain.com/package/${params.slug}`,
      type: 'article',
      images: [
        {
          url: `/api/og/package?name=${encodeURIComponent(packageData.name)}&downloads=${packageData.downloadCount}`,
          width: 1200,
          height: 630,
          alt: `${packageData.name} package information`
        }
      ],
      publishedTime: packageData.createdAt,
      modifiedTime: packageData.updatedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://your-domain.com/package/${params.slug}`
    },
    other: {
      'article:author': packageData.maintainer,
      'article:section': 'Homebrew Packages',
      'article:tag': packageData.tags.join(','),
    }
  }
}
```

### 3. Advanced Dynamic OG Image Generation

```typescript
// app/api/og/route.tsx
import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'Default Title'
  const subtitle = searchParams.get('subtitle') || ''
  const theme = searchParams.get('theme') || 'light'

  // Load custom fonts
  const interSemiBold = fetch(
    new URL('./Inter-SemiBold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme === 'dark' ? '#0a0a0a' : '#ffffff',
          backgroundImage: theme === 'dark' 
            ? 'radial-gradient(circle at 25px 25px, #333 2%, transparent 0%), radial-gradient(circle at 75px 75px, #333 2%, transparent 0%)'
            : 'radial-gradient(circle at 25px 25px, #e5e5e5 2%, transparent 0%), radial-gradient(circle at 75px 75px, #e5e5e5 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 120px',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontSize: '60px',
              fontWeight: 600,
              color: theme === 'dark' ? '#ffffff' : '#0a0a0a',
              lineHeight: 1.2,
              marginBottom: '20px',
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              style={{
                fontSize: '30px',
                color: theme === 'dark' ? '#a3a3a3' : '#666666',
                lineHeight: 1.4,
                margin: 0,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: await interSemiBold,
          style: 'normal',
          weight: 600,
        },
      ],
    }
  )
}
```

### 4. Package-Specific OG Images

```typescript
// app/api/og/package/route.tsx
import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name') || 'Package'
  const downloads = searchParams.get('downloads') || '0'
  const version = searchParams.get('version') || '1.0.0'
  
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          backgroundColor: '#0a0a0a',
          backgroundImage: 'linear-gradient(45deg, #1e293b 25%, transparent 25%), linear-gradient(-45deg, #1e293b 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1e293b 75%), linear-gradient(-45deg, transparent 75%, #1e293b 75%)',
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            padding: '60px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div
              style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#10b981',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '40px',
              }}
            >
              📦
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h1
                style={{
                  fontSize: '48px',
                  fontWeight: 700,
                  color: '#ffffff',
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                {name}
              </h1>
              <p
                style={{
                  fontSize: '24px',
                  color: '#94a3b8',
                  margin: 0,
                }}
              >
                v{version}
              </p>
            </div>
          </div>
          
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', gap: '40px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '32px', fontWeight: 700, color: '#10b981' }}>
                  {parseInt(downloads).toLocaleString()}
                </span>
                <span style={{ fontSize: '18px', color: '#94a3b8' }}>Downloads</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '24px', color: '#94a3b8' }}>Powered by</span>
              <span style={{ fontSize: '28px', fontWeight: 700, color: '#ffffff' }}>
                Homebrew
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
```

### 5. Comprehensive JSON-LD Structured Data

```typescript
// lib/structured-data.ts
interface Package {
  name: string
  description: string
  version: string
  downloadCount: number
  homepage?: string
  license?: string
  maintainer: string
  repository?: string
  createdAt: string
  updatedAt: string
}

export function generateSoftwareApplicationSchema(pkg: Package, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': url,
    name: pkg.name,
    description: pkg.description,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: ['macOS', 'Linux'],
    url: url,
    downloadUrl: `https://formulae.brew.sh/formula/${pkg.name}`,
    version: pkg.version,
    dateCreated: pkg.createdAt,
    dateModified: pkg.updatedAt,
    author: {
      '@type': 'Person',
      name: pkg.maintainer
    },
    provider: {
      '@type': 'Organization',
      name: 'Homebrew',
      url: 'https://brew.sh'
    },
    aggregateRating: pkg.downloadCount > 1000 ? {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      ratingCount: Math.floor(pkg.downloadCount / 100),
      bestRating: '5',
      worstRating: '1'
    } : undefined,
    interactionStatistic: {
      '@type': 'InteractionCounter',
      interactionType: 'https://schema.org/DownloadAction',
      userInteractionCount: pkg.downloadCount
    },
    license: pkg.license,
    codeRepository: pkg.repository,
    installUrl: `homebrew://formula/${pkg.name}`,
    // Entity linking for better knowledge graph integration
    sameAs: pkg.repository ? [pkg.repository] : undefined
  }
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BrewDB',
    url: 'https://your-domain.com',
    description: 'Comprehensive Homebrew package database and analytics',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://your-domain.com/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    },
    publisher: {
      '@type': 'Organization',
      name: 'BrewDB',
      logo: {
        '@type': 'ImageObject',
        url: 'https://your-domain.com/logo.png'
      }
    }
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}
```

### 6. Dynamic Sitemap Generation

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'

interface Package {
  slug: string
  updatedAt: string
  downloadCount: number
}

async function getPackages(): Promise<Package[]> {
  // Your data fetching logic
  return []
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const packages = await getPackages()
  const baseUrl = 'https://your-domain.com'

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/analytics`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  const packagePages = packages.map((pkg) => ({
    url: `${baseUrl}/package/${pkg.slug}`,
    lastModified: new Date(pkg.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: Math.min(0.9, 0.5 + (pkg.downloadCount / 100000) * 0.4),
  }))

  return [...staticPages, ...packagePages]
}
```

### 7. Advanced Robots Configuration

```typescript
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/private/'],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
    ],
    sitemap: 'https://your-domain.com/sitemap.xml',
    host: 'https://your-domain.com',
  }
}
```

### 8. PWA Manifest

```typescript
// app/manifest.ts
import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BrewDB - Homebrew Package Database',
    short_name: 'BrewDB',
    description: 'Comprehensive Homebrew package database and analytics',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#10b981',
    orientation: 'portrait-primary',
    categories: ['developer', 'utilities', 'productivity'],
    lang: 'en',
    dir: 'ltr',
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      }
    ],
    screenshots: [
      {
        src: '/screenshots/desktop.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide'
      },
      {
        src: '/screenshots/mobile.png',
        sizes: '375x812',
        type: 'image/png',
        form_factor: 'narrow'
      }
    ]
  }
}
```

### 9. Performance Optimization

```typescript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'date-fns'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/api/og/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig
```

### 10. Analytics Integration

```typescript
// lib/analytics.ts
import { track } from '@vercel/analytics'

export const trackPageView = (url: string, title: string) => {
  track('Page View', { url, title })
}

export const trackPackageView = (packageName: string, downloadCount: number) => {
  track('Package View', { 
    package: packageName, 
    popularity: downloadCount > 10000 ? 'high' : downloadCount > 1000 ? 'medium' : 'low'
  })
}

export const trackSearch = (query: string, resultsCount: number) => {
  track('Search', { query, results: resultsCount })
}
```

### 11. Core Web Vitals Monitoring

```typescript
// app/web-vitals.tsx
'use client'

import { getCLS, getFID, getFCP, getLCP, getTTFB, getINP } from 'web-vitals'
import { track } from '@vercel/analytics'
import { useEffect } from 'react'

export function WebVitals() {
  useEffect(() => {
    getCLS((metric) => track('CLS', { value: metric.value, rating: metric.rating }))
    getINP((metric) => track('INP', { value: metric.value, rating: metric.rating }))
    getFCP((metric) => track('FCP', { value: metric.value, rating: metric.rating }))
    getLCP((metric) => track('LCP', { value: metric.value, rating: metric.rating }))
    getTTFB((metric) => track('TTFB', { value: metric.value, rating: metric.rating }))
  }, [])

  return null
}
```

### 12. Advanced Core Web Vitals Optimization

```typescript
// lib/performance.ts
export const performanceConfig = {
  // Optimize for INP (replaces FID as of March 2024)
  interactionThreshold: 200, // milliseconds
  
  // LCP optimization targets
  lcpThreshold: 2.5, // seconds
  
  // CLS optimization targets  
  clsThreshold: 0.1,
  
  // Performance monitoring
  reportingThreshold: {
    good: 75, // 75th percentile threshold for "good" rating
    needsImprovement: 90,
    poor: 100
  }
}

// Real User Monitoring integration
export function reportWebVitals(metric: any) {
  // Send to your analytics provider
  if (metric.name === 'INP') {
    // INP is now the primary interactivity metric
    console.log('Interaction to Next Paint:', metric.value)
  }
  
  // Report to multiple endpoints for comprehensive tracking
  Promise.all([
    fetch('/api/analytics/vitals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metric)
    }),
    // Send to Google Analytics 4 if configured
    gtag?.('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    })
  ])
}
```

### 12. Advanced Search Features

```typescript
// app/search/page.tsx
import { Metadata } from 'next'
import { Suspense } from 'react'

interface SearchPageProps {
  searchParams: { q?: string; category?: string; sort?: string }
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const query = searchParams.q || ''
  const category = searchParams.category || ''
  
  if (!query) {
    return {
      title: 'Search Homebrew Packages',
      description: 'Search through thousands of Homebrew packages and casks',
      robots: { index: true, follow: true }
    }
  }

  const title = `Search: "${query}"${category ? ` in ${category}` : ''}`
  const description = `Search results for "${query}" in Homebrew packages${category ? ` within ${category} category` : ''}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://your-domain.com/search?q=${encodeURIComponent(query)}`,
    },
    alternates: {
      canonical: `https://your-domain.com/search?q=${encodeURIComponent(query)}`
    }
  }
}
```

### 13. Entity-Based SEO and Knowledge Graph Optimization

```typescript
// lib/entity-seo.ts
export function generateEntitySchema(entityData: {
  name: string
  description: string
  url: string
  sameAs?: string[]
  additionalType?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': ['Thing', entityData.additionalType || 'SoftwareApplication'],
    '@id': entityData.url,
    name: entityData.name,
    description: entityData.description,
    url: entityData.url,
    // Critical for entity linking and knowledge graph integration
    sameAs: entityData.sameAs || [],
    // Help search engines understand entity relationships
    subjectOf: {
      '@type': 'WebPage',
      url: entityData.url,
      name: `${entityData.name} - Package Information`,
      description: entityData.description
    }
  }
}

// Enhanced FAQ schema for featured snippets
export function generateFAQSchema(faqs: Array<{question: string, answer: string}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}

// How-to schema for instructional content
export function generateHowToSchema(steps: Array<{name: string, text: string}>, name: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: name,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text
    }))
  }
}
```

### 14. Enhanced Social Media Integration

```typescript
// lib/social-optimization.ts
interface SocialMetadata {
  title: string
  description: string
  image: string
  url: string
  type?: string
  author?: string
  publishedTime?: string
  modifiedTime?: string
  tags?: string[]
}

export function generateEnhancedSocialMeta(data: SocialMetadata): Record<string, string> {
  return {
    // Enhanced Open Graph
    'og:title': data.title,
    'og:description': data.description,
    'og:image': data.image,
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': data.title,
    'og:url': data.url,
    'og:type': data.type || 'website',
    'og:locale': 'en_US',
    
    // Article-specific metadata
    ...(data.type === 'article' && {
      'article:author': data.author,
      'article:published_time': data.publishedTime,
      'article:modified_time': data.modifiedTime,
      'article:tag': data.tags?.join(',') || ''
    }),

    // Enhanced Twitter/X Cards (still uses twitter: prefix as of 2025)
    'twitter:card': 'summary_large_image',
    'twitter:title': data.title,
    'twitter:description': data.description,
    'twitter:image': data.image,
    'twitter:image:alt': data.title,
    
    // LinkedIn optimization
    'linkedin:owner': data.author || '',
    
    // Pinterest rich pins
    'pinterest:rich_pin': 'true'
  }
}
```

```

## Implementation Checklist

- [ ] Update root layout with comprehensive metadata
- [ ] Implement dynamic metadata for all pages
- [ ] Create OG image generation endpoints
- [ ] Add structured data to all relevant pages with entity linking
- [ ] Generate dynamic sitemap with priority scoring
- [ ] Configure robots.txt with AI bot restrictions
- [ ] Add PWA manifest with screenshots
- [ ] Implement Core Web Vitals tracking (including INP)
- [ ] Set up proper caching headers and security policies
- [ ] Add search functionality with proper SEO
- [ ] Configure analytics tracking for all metrics
- [ ] Test all OG images and metadata across platforms
- [ ] Validate structured data with Google's Rich Results Test
- [ ] Submit sitemap to search consoles
- [ ] Monitor Core Web Vitals in real-user conditions
- [ ] Implement entity-based SEO with sameAs properties
- [ ] Set up FAQ and HowTo schemas for featured snippets

## Key Benefits

- **Search Visibility**: Comprehensive metadata and structured data improve search rankings
- **Social Sharing**: Dynamic OG images increase engagement rates by up to 650%
- **Performance**: Optimized caching and image formats improve Core Web Vitals scores
- **Indexing**: Proper sitemaps and robots.txt ensure complete crawling
- **Rich Results**: Structured data enables rich snippets and knowledge graph integration
- **PWA Features**: Manifest enables app-like experience and installation
- **Core Web Vitals**: Websites passing all CWV tests rank 28% higher on average
- **Entity Recognition**: Entity-based SEO improves visibility in knowledge panels
- **Featured Snippets**: FAQ and HowTo schemas increase chances of position zero results
- **AI-Ready**: Proper structured data prepares content for AI-driven search features

## 2025 SEO Considerations

**Core Web Vitals Updates:**
- INP (Interaction to Next Paint) replaced FID in March 2024
- 75th percentile threshold required for "Good" rating across all metrics
- Real user data (CrUX) is the only ranking factor data Google uses

**Entity-Based Search:**
- Search engines prioritize entities over keywords
- SameAs properties crucial for knowledge graph integration
- Entity linking to authoritative sources (Wikipedia, Wikidata) recommended

**AI and Voice Search:**
- Structured data becomes critical for AI-driven search results
- FAQ schema essential for voice search optimization
- Featured snippets increasingly important for zero-position results

**Social Media Evolution:**
- Twitter Cards still use "twitter:" prefix despite platform rebrand to X
- LinkedIn and Pinterest rich pins gaining importance
- Dynamic social images show 2-3x higher engagement than static ones
