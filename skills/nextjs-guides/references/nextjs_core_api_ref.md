---
title: 'Next.js 15+ Core API Reference'
description: 'For AI Assistants: Essential functions, hooks, and APIs.'
category: 'Nextjs Tailwind Shadcn Docs'
---

# Next.js 15+ Core API Reference

_For AI Assistants: Essential functions, hooks, and APIs_

## 🎯 Navigation & Routing

### useRouter (Client-side Navigation)

```tsx
'use client';
import { useRouter } from 'next/navigation';

export function NavigationComponent() {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => router.push('/dashboard')}>Go to Dashboard</button>
      <button onClick={() => router.replace('/login')}>Replace with Login</button>
      <button onClick={() => router.back()}>Go Back</button>
      <button onClick={() => router.refresh()}>Refresh</button>
      {/* Disable scroll to top */}
      <button onClick={() => router.push('/page', { scroll: false })}>
        Navigate without scroll
      </button>
    </div>
  );
}
```

### usePathname & useSearchParams

```tsx
'use client';
import { usePathname, useSearchParams } from 'next/navigation';

export function PathInfo() {
  const pathname = usePathname(); // '/dashboard/settings'
  const searchParams = useSearchParams(); // URLSearchParams object

  const query = searchParams.get('query'); // Get specific param
  const hasFilter = searchParams.has('filter'); // Check existence

  return (
    <div>
      <p>Current path: {pathname}</p>
      <p>Query param: {query}</p>
      <p>Has filter: {hasFilter.toString()}</p>
    </div>
  );
}
```

### Link Component (Optimized Navigation)

```tsx
import Link from 'next/link';

export function NavigationLinks() {
  return (
    <nav>
      {/* Basic link */}
      <Link href="/about">About</Link>

      {/* Dynamic route */}
      <Link href={`/posts/${postId}`}>Post</Link>

      {/* Query parameters */}
      <Link
        href={{
          pathname: '/search',
          query: { q: 'nextjs', category: 'tech' },
        }}
      >
        Search Tech
      </Link>

      {/* Control prefetching */}
      <Link href="/heavy-page" prefetch={false}>
        Heavy Page (No Prefetch)
      </Link>

      {/* Replace history */}
      <Link href="/login" replace>
        Login (Replace)
      </Link>

      {/* Scroll control */}
      <Link href="/section" scroll={false}>
        No Scroll Reset
      </Link>
    </nav>
  );
}
```

### useParams (Route Parameters)

```tsx
'use client';
import { useParams } from 'next/navigation';

// For route: /posts/[slug]/comments/[id]
export function RouteInfo() {
  const params = useParams<{ slug: string; id: string }>();

  return (
    <div>
      <p>Post slug: {params.slug}</p>
      <p>Comment ID: {params.id}</p>
    </div>
  );
}
```

---

## 🔄 Data Fetching & Caching

### Server Component Data Fetching

```tsx
// app/posts/page.tsx
export default async function PostsPage() {
  // Static generation (cached)
  const staticData = await fetch('https://api.example.com/posts', {
    cache: 'force-cache',
  });

  // Server-side rendering (fresh on every request)
  const dynamicData = await fetch('https://api.example.com/live-data', {
    cache: 'no-store',
  });

  // Incremental Static Regeneration
  const revalidatedData = await fetch('https://api.example.com/news', {
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  // With tags for on-demand revalidation
  const taggedData = await fetch('https://api.example.com/products', {
    next: { tags: ['products'] },
  });

  return (
    <div>
      <Posts data={staticData} />
      <LiveFeed data={dynamicData} />
      <News data={revalidatedData} />
      <Products data={taggedData} />
    </div>
  );
}
```

### revalidatePath & revalidateTag

```tsx
// app/actions.ts
'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  // Save to database
  await db.post.create({ data: { title, content } });

  // Revalidate specific page
  revalidatePath('/posts');

  // Revalidate by tag
  revalidateTag('posts');

  // Redirect after action
  redirect('/posts');
}

export async function updateProduct(id: string, data: any) {
  await db.product.update({ where: { id }, data });

  // Revalidate specific product page
  revalidatePath(`/products/${id}`);

  // Revalidate all products
  revalidateTag('products');
}
```

---

## 📝 Server Actions & Forms

### Basic Server Action

```tsx
// app/actions.ts
'use server';

export async function submitForm(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;

  // Validation
  if (!name || !email) {
    return { error: 'Name and email are required' };
  }

  try {
    // Process data
    await db.user.create({ data: { name, email } });
    return { success: 'User created successfully' };
  } catch (error) {
    return { error: 'Failed to create user' };
  }
}
```

### Form with useFormState & useFormStatus

```tsx
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { submitForm } from './actions';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useFormState(submitForm, null);

  return (
    <form action={formAction}>
      <input name="name" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <SubmitButton />

      {state?.error && <p className="text-red-500">{state.error}</p>}
      {state?.success && <p className="text-green-500">{state.success}</p>}
    </form>
  );
}
```

### Next.js Form Component

```tsx
import Form from 'next/form';

export function SearchForm() {
  return (
    <Form action="/search">
      <input name="query" placeholder="Search..." />
      <button type="submit">Search</button>
    </Form>
  );
}
```

---

## 🍪 Headers & Cookies

### Reading Headers (Server Components)

```tsx
// app/dashboard/page.tsx
import { headers } from 'next/headers';

export default async function Dashboard() {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent');
  const authorization = headersList.get('authorization');

  return (
    <div>
      <p>User Agent: {userAgent}</p>
      <p>Authorized: {!!authorization}</p>
    </div>
  );
}
```

### Working with Cookies

```tsx
// Server Component - Reading
import { cookies } from 'next/headers';

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme');
  const sessionId = cookieStore.get('sessionId');

  return (
    <div>
      <p>Theme: {theme?.value}</p>
      <p>Session: {sessionId?.value}</p>
    </div>
  );
}

// Server Action - Setting/Deleting
('use server');

export async function updatePreferences(formData: FormData) {
  const cookieStore = await cookies();
  const theme = formData.get('theme') as string;

  // Set cookie
  cookieStore.set('theme', theme, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  // Delete cookie
  cookieStore.delete('old-preference');
}
```

---

## 🛣️ Route Handlers (API Routes)

### Basic Route Handler

```tsx
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';

  const users = await db.user.findMany({
    skip: (parseInt(page) - 1) * 10,
    take: 10,
  });

  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const user = await db.user.create({ data: body });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 400 });
  }
}
```

### Dynamic Route Handler

```tsx
// app/api/users/[id]/route.ts
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const user = await db.user.findUnique({
    where: { id },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await db.user.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
```

### Route Handler with Cookies & Headers

```tsx
// app/api/auth/route.ts
import { cookies, headers } from 'next/headers';

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const headersList = await headers();

  const { email, password } = await request.json();
  const userAgent = headersList.get('user-agent');

  // Authenticate user
  const user = await authenticate(email, password);

  if (user) {
    // Set session cookie
    cookieStore.set('session', user.sessionToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}
```

---

## 🎛️ Route Configuration

### Page/Layout Configuration Options

```tsx
// app/dashboard/page.tsx

// Control rendering behavior
export const dynamic = 'force-dynamic'; // or 'force-static', 'error', 'auto'
export const dynamicParams = true; // Handle dynamic segments
export const revalidate = 3600; // Revalidate every hour
export const fetchCache = 'auto'; // Control fetch caching
export const runtime = 'nodejs'; // or 'edge'
export const preferredRegion = 'auto'; // or specific regions
export const maxDuration = 30; // Execution timeout in seconds

export default function DashboardPage() {
  return <div>Dashboard</div>;
}
```

### generateStaticParams (Static Generation)

```tsx
// app/posts/[slug]/page.tsx

export async function generateStaticParams() {
  const posts = await db.post.findMany({
    select: { slug: true },
  });

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await db.post.findUnique({
    where: { slug },
  });

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
```

---

## 🖼️ Image & Metadata

### Next.js Image Component

```tsx
import Image from 'next/image';

export function ProductImage({ product }) {
  return (
    <div className="relative w-full h-64">
      {/* Responsive image */}
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={800}
        height={600}
        className="object-cover rounded-lg"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority // For above-the-fold images
      />

      {/* Fill container */}
      <Image src={product.heroImage} alt="Hero" fill className="object-cover" sizes="100vw" />
    </div>
  );
}
```

### Metadata Generation

```tsx
// app/posts/[slug]/page.tsx
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.post.findUnique({ where: { slug } });

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.imageUrl],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.imageUrl],
    },
  };
}
```

### Static Metadata

```tsx
// app/about/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about our company',
  keywords: ['about', 'company', 'team'],
  authors: [{ name: 'John Doe' }],
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return <div>About Us</div>;
}
```

---

## 🎨 Styling & Fonts

### Font Optimization

```tsx
// app/layout.tsx
import { Inter, Roboto_Mono } from 'next/font/google';
import localFont from 'next/font/local';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

const customFont = localFont({
  src: './fonts/custom.woff2',
  display: 'swap',
  variable: '--font-custom',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable} ${customFont.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
```

---

## 🚨 Error Handling

### Error Boundaries

```tsx
// app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-muted-foreground mb-4">{error.message}</p>
      <button onClick={reset} className="px-4 py-2 bg-primary text-primary-foreground rounded">
        Try again
      </button>
    </div>
  );
}
```

### Not Found Page

```tsx
// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-4xl font-bold mb-4">404 - Page Not Found</h2>
      <p className="text-muted-foreground mb-6">Could not find the requested resource.</p>
      <Link
        href="/"
        className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
      >
        Return Home
      </Link>
    </div>
  );
}
```

### Global Loading UI

```tsx
// app/loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}
```

---

## 🔧 Middleware

### Basic Middleware

```tsx
// middleware.ts
import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Authentication check
  const token = request.cookies.get('session')?.value;

  if (request.nextUrl.pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Add custom headers
  const response = NextResponse.next();
  response.headers.set('x-pathname', request.nextUrl.pathname);

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

### Advanced Middleware

```tsx
import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // A/B Testing
  if (pathname === '/') {
    const bucket = request.cookies.get('bucket')?.value || (Math.random() > 0.5 ? 'A' : 'B');

    if (bucket === 'B') {
      return NextResponse.rewrite(new URL('/home-variant-b', request.url));
    }
  }

  // Internationalization
  const locale = request.cookies.get('locale')?.value || 'en';
  if (!pathname.startsWith(`/${locale}`)) {
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  return NextResponse.next();
}
```

This API reference covers the essential Next.js 15+ functions and patterns that AI assistants need
to build modern React applications efficiently.
