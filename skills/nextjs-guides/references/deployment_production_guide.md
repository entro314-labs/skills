---
title: 'Deployment & Production Guide'
description: 'For AI Assistants: Complete deployment strategies and production optimization.'
category: 'Nextjs Tailwind Shadcn Docs'
---

# Deployment & Production Guide

_For AI Assistants: Complete deployment strategies and production optimization_

## 🚀 Platform-Specific Deployment

### Vercel Deployment (Recommended)

#### Quick Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Login and deploy
vercel login
vercel

# Production deployment
vercel --prod
```

#### Vercel Configuration

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1", "sfo1"],
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "crons": [
    {
      "path": "/api/cron/cleanup",
      "schedule": "0 2 * * *"
    }
  ],
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
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/old-path",
      "destination": "/new-path",
      "permanent": true
    }
  ],
  "rewrites": [
    {
      "source": "/api/proxy/:path*",
      "destination": "https://api.example.com/:path*"
    }
  ]
}
```

#### Environment Variables

```bash
# Set via Vercel CLI
vercel env add NEXTAUTH_SECRET production
vercel env add DATABASE_URL production

# Or via dashboard
# dashboard.vercel.com → project → settings → environment variables
```

---

### Docker Deployment

#### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Build stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - '5432:5432'

  redis:
    image: redis:7-alpine
    ports:
      - '6379:6379'

volumes:
  postgres_data:
```

#### Next.js Standalone Build

```typescript
// next.config.ts
const config: NextConfig = {
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
};
```

---

### AWS Deployment

#### AWS Lambda with SST

```bash
npm install sst
```

```typescript
// sst.config.ts
import { SSTConfig } from 'sst';
import { NextjsSite } from 'sst/constructs';

export default {
  config(_input) {
    return {
      name: 'my-nextjs-app',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, 'site', {
        path: '.',
        environment: {
          DATABASE_URL: process.env.DATABASE_URL!,
          NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
        },
        customDomain: {
          domainName: 'myapp.com',
          domainAlias: 'www.myapp.com',
        },
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
```

#### EC2 with PM2

```bash
# Install PM2
npm install -g pm2

# Create ecosystem file
```

```javascript
// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'nextjs-app',
      script: 'npm',
      args: 'start',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
```

```bash
# Deploy with PM2
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

---

### Netlify Deployment

#### Netlify Configuration

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NEXT_PRIVATE_TARGET = "server"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
```

---

## ⚙️ Production Configuration

### Environment Variables Setup

```bash
# .env.production
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1

# Database
DATABASE_URL="postgresql://user:pass@host:5432/db"

# Authentication
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-secret-key"

# External Services
STRIPE_SECRET_KEY="sk_live_..."
SENDGRID_API_KEY="SG...."

# Analytics
GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"

# Feature Flags
FEATURE_NEW_DASHBOARD=true
FEATURE_BETA_FEATURES=false
```

### Next.js Production Config

```typescript
// next.config.ts
import { NextConfig } from 'next';

const config: NextConfig = {
  // Production optimizations
  poweredByHeader: false,
  compress: true,

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
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
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
          },
        ],
      },
    ];
  },

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Compiler optimizations
  compiler: {
    removeConsole: true,
    reactRemoveProperties: true,
  },

  // Bundle optimization
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Bundle analysis in production
      config.resolve.alias = {
        ...config.resolve.alias,
        'react/jsx-runtime.js': 'preact/compat/jsx-runtime',
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      };
    }
    return config;
  },

  // Experimental features
  experimental: {
    optimizeCss: true,
    gzipSize: true,
  },
};

export default config;
```

---

## 🔒 Security Best Practices

### Content Security Policy

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https:;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `;

  const response = NextResponse.next();
  response.headers.set('Content-Security-Policy', cspHeader.replace(/\s{2,}/g, ' ').trim());
  response.headers.set('X-Nonce', nonce);

  return response;
}
```

### Rate Limiting

```typescript
// lib/rate-limit.ts
import { LRUCache } from 'lru-cache';

type Options = {
  uniqueTokenPerInterval?: number;
  interval?: number;
};

export default function rateLimit(options: Options = {}) {
  const tokenCache = new LRUCache({
    max: options.uniqueTokenPerInterval || 500,
    ttl: options.interval || 60000,
  });

  return {
    check: (limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const tokenCount = (tokenCache.get(token) as number[]) || [0];
        if (tokenCount[0] === 0) {
          tokenCache.set(token, tokenCount);
        }
        tokenCount[0] += 1;

        const currentUsage = tokenCount[0];
        const isRateLimited = currentUsage >= limit;

        if (isRateLimited) {
          reject(new Error('Rate limit exceeded'));
        } else {
          resolve();
        }
      }),
  };
}

// Usage in API route
const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Limit each IP to 500 requests per interval
});

export async function GET(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1';

  try {
    await limiter.check(10, ip); // 10 requests per minute
  } catch {
    return new Response('Rate limit exceeded', { status: 429 });
  }

  // Handle request
  return Response.json({ message: 'Success' });
}
```

### Input Validation & Sanitization

```typescript
// lib/validation.ts
import { z } from 'zod';
import DOMPurify from 'isomorphic-dompurify';

// API input validation
export const userSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-zA-Z\s]+$/),
  email: z.string().email(),
  age: z.number().int().min(0).max(120),
});

// HTML sanitization
export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href'],
  });
}

// SQL injection prevention (with Prisma)
export async function safeUserQuery(email: string) {
  // Prisma automatically prevents SQL injection
  return await prisma.user.findUnique({
    where: { email }, // Safe: Prisma handles parameterization
  });
}
```

---

## 📊 Monitoring & Analytics

### Application Monitoring

```typescript
// lib/monitoring.ts
import { NextRequest } from 'next/server';

export function createLogger() {
  return {
    info: (message: string, meta?: object) => {
      console.log(
        JSON.stringify({
          level: 'info',
          message,
          timestamp: new Date().toISOString(),
          ...meta,
        })
      );
    },
    error: (message: string, error?: Error, meta?: object) => {
      console.error(
        JSON.stringify({
          level: 'error',
          message,
          error: error?.message,
          stack: error?.stack,
          timestamp: new Date().toISOString(),
          ...meta,
        })
      );
    },
    warn: (message: string, meta?: object) => {
      console.warn(
        JSON.stringify({
          level: 'warn',
          message,
          timestamp: new Date().toISOString(),
          ...meta,
        })
      );
    },
  };
}

// Request logging middleware
export function logRequest(request: NextRequest) {
  const logger = createLogger();

  logger.info('Request received', {
    method: request.method,
    url: request.url,
    userAgent: request.headers.get('user-agent'),
    ip: request.ip,
  });
}
```

### Error Tracking with Sentry

```bash
npm install @sentry/nextjs
```

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  debug: false,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  integrations: [
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});
```

```typescript
// sentry.server.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  debug: false,
});
```

### Performance Monitoring

```typescript
// lib/performance.ts
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;

  static getInstance() {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  measureApiCall = <T>(name: string, fn: () => Promise<T>): Promise<T> => {
    const start = Date.now();

    return fn()
      .then((result) => {
        const duration = Date.now() - start;
        this.recordMetric('api_call_duration', duration, { endpoint: name });
        return result;
      })
      .catch((error) => {
        const duration = Date.now() - start;
        this.recordMetric('api_call_error', duration, {
          endpoint: name,
          error: error.message,
        });
        throw error;
      });
  };

  private recordMetric(name: string, value: number, tags: Record<string, string>) {
    // Send to your monitoring service
    console.log(`Metric: ${name} = ${value}`, tags);

    // Example: Send to DataDog, New Relic, etc.
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', name, {
        value: Math.round(value),
        custom_map: tags,
      });
    }
  }
}
```

---

## 🚦 Health Checks & Readiness

### Health Check Endpoint

```typescript
// app/api/health/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const checks = {
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    status: 'ok',
    checks: {
      database: 'unknown',
      memory: 'unknown',
    },
  };

  try {
    // Database check
    await prisma.$queryRaw`SELECT 1`;
    checks.checks.database = 'ok';
  } catch (error) {
    checks.checks.database = 'error';
    checks.status = 'error';
  }

  // Memory check
  const memUsage = process.memoryUsage();
  const memUsedMB = memUsage.heapUsed / 1024 / 1024;
  checks.checks.memory = memUsedMB < 500 ? 'ok' : 'warning';

  const status = checks.status === 'ok' ? 200 : 503;

  return NextResponse.json(checks, { status });
}
```

### Readiness Probe

```typescript
// app/api/ready/route.ts
import { NextResponse } from 'next/server';

let isReady = false;

// Mark as ready after initialization
setTimeout(() => {
  isReady = true;
}, 5000); // 5 seconds startup time

export async function GET() {
  if (!isReady) {
    return NextResponse.json({ status: 'not ready' }, { status: 503 });
  }

  return NextResponse.json({ status: 'ready' });
}
```

---

## 📈 Performance Optimization

### CDN Configuration

```typescript
// next.config.ts
const config: NextConfig = {
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://cdn.yourdomain.com' : '',

  images: {
    loader: 'custom',
    loaderFile: './src/lib/image-loader.ts',
  },
};
```

```typescript
// src/lib/image-loader.ts
export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const params = new URLSearchParams({
    url: src,
    w: width.toString(),
    q: (quality || 75).toString(),
  });

  return `https://cdn.yourdomain.com/image?${params}`;
}
```

### Database Connection Pooling

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

### Caching Strategy

```typescript
// lib/cache.ts
import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export async function getCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = 300
): Promise<T> {
  // Try to get from cache
  const cached = await redis.get(key);

  if (cached) {
    return JSON.parse(cached);
  }

  // Fetch fresh data
  const data = await fetcher();

  // Cache the result
  await redis.setex(key, ttl, JSON.stringify(data));

  return data;
}

// Usage in API route
export async function GET() {
  const data = await getCachedData(
    'api:users',
    () => prisma.user.findMany(),
    600 // 10 minutes
  );

  return Response.json(data);
}
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - run: npm ci
      - run: npm run test:coverage
      - run: npm run build

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3

  deploy:
    needs: test
    runs-on: ubuntu-latest
    environment: production

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - run: npm ci

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-args: '--prod'
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}

  notify:
    needs: [test, deploy]
    runs-on: ubuntu-latest
    if: always()

    steps:
      - name: Notify deployment status
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          channel: '#deployments'
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

---

## 📋 Production Checklist

### Pre-Deployment

- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] SSL certificates configured
- [ ] CDN setup complete
- [ ] Monitoring tools configured
- [ ] Error tracking enabled
- [ ] Security headers implemented
- [ ] Rate limiting configured

### Post-Deployment

- [ ] Health checks passing
- [ ] Performance metrics within targets
- [ ] Error rates acceptable
- [ ] User flows tested
- [ ] Backup systems verified
- [ ] Rollback plan documented

### Security Audit

- [ ] Dependencies scanned for vulnerabilities
- [ ] Secrets properly secured
- [ ] HTTPS enforced
- [ ] Input validation implemented
- [ ] Rate limiting active
- [ ] CSP headers configured
- [ ] Authentication flows secure

This comprehensive deployment guide provides AI assistants with the knowledge needed to successfully
deploy and maintain Next.js applications in production environments across various platforms.
