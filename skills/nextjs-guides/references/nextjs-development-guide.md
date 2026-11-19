### Best Practices Summary <!--best-practices-summary-->

*Key practices for Supabase integration with Next.js 15+.*

#### Authentication Flow Best Practices

1. **Use Server-Side Authentication**
   - Leverage `@supabase/ssr` for server-side authentication
   - Implement middleware for session management
   - Protect routes based on authentication status

2. **Server Actions for Auth Operations**
   - Implement server actions for sign-up, sign-in, sign-out, and password reset
   - Validate all inputs with proper error handling
   - Use encoded redirects to pass error/success messages between pages

3. **Session Handling**
   - Refresh sessions in middleware
   - Use the auth callback route for OAuth and magic link redirects
   - Store authentication state server-side, avoiding client-side storage for sensitive data

#### Database Access Best Practices

1. **Row-Level Security (RLS)**
   - Enable RLS on all tables
   - Implement policies based on `auth.uid()`
   - Create fine-grained policies for different operations (SELECT, INSERT, UPDATE, DELETE)
   - Use SQL functions for complex policy logic

2. **Data Fetching Patterns**
   - Use server components for initial data fetching
   - Implement real-time subscriptions for dynamic updates
   - Optimize queries with indexes and proper joins
   - Cache appropriately based on data volatility

3. **Storage Security**
   - Implement RLS on storage buckets
   - Use unique file paths with user IDs to prevent conflicts
   - Apply proper Content-Type and Cache-Control headers
   - Use signed URLs for private content

#### Deployment Considerations

1. **Environment Configuration**
   - Set proper environment variables (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
   - Configure redirect URLs in Supabase dashboard
   - Set up proper CORS policies

2. **Security Headers**
   - Implement Content Security Policy
   - Set proper CORS headers
   - Validate middleware subrequest headers

3. **Error Handling**
   - Implement proper error boundaries
   - Log errors appropriately
   - Provide user-friendly error messages

#### Component Structure

1. **Server vs. Client Components**
   - Use server components for data fetching
   - Use client components for interactivity
   - Implement proper loading and error states

2. **Auth UI Components**
   - Create reusable authentication forms
   - Implement proper form validation
   - Use server actions for form submissions

3. **Real-time Components**
   - Implement proper channel subscription handling
   - Clean up subscriptions on component unmount
   - Use presence for tracking user status

By following these best practices, you'll create a robust, secure, and performant application with Next.js and Supabase.

### Password Reset Implementation <!--password-reset-implementation-->

*Implementing password reset functionality.*

```typescript
// app/auth/forgot-password/page.tsx
import { forgotPasswordAction } from '@/app/actions/auth';
import { FormMessage, type Message } from '@/components/ui/form-message';
import { SubmitButton } from '@/components/ui/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function ForgotPassword({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  // Convert search params to Message type
  const message: Message = searchParams.error
    ? { error: searchParams.error }
    : searchParams.success
    ? { success: searchParams.success }
    : { message: '' };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-md">
        <div>
          <h1 className="text-2xl font-bold">Reset Password</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to receive a password reset link.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
            />
          </div>

          <SubmitButton
            className="w-full"
            formAction={forgotPasswordAction}
            pendingText="Sending reset link..."
          >
            Send Reset Link
          </SubmitButton>

          <div className="text-center">
            <Link
              href="/auth/signin"
              className="text-sm text-primary hover:underline"
            >
              Back to sign in
            </Link>
          </div>

          {/* Display error or success message */}
          {(message.error || message.success) && (
            <FormMessage message={message} />
          )}
        </div>
      </form>
    </div>
  );
}

// app/auth/reset-password/page.tsx
import { resetPasswordAction } from '@/app/actions/auth';
import { FormMessage, type Message } from '@/components/ui/form-message';
import { SubmitButton } from '@/components/ui/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  // Verify that user is authenticated after clicking reset link
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/auth/signin');
  }
  
  // Convert search params to Message type
  const message: Message = searchParams.error
    ? { error: searchParams.error }
    : searchParams.success
    ? { success: searchParams.success }
    : { message: '' };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-md">
        <div>
          <h1 className="text-2xl font-bold">Set New Password</h1>
          <p className="text-sm text-muted-foreground">
            Please enter your new password below.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          <SubmitButton
            className="w-full"
            formAction={resetPasswordAction}
            pendingText="Updating password..."
          >
            Update Password
          </SubmitButton>

          {/* Display error or success message */}
          {(message.error || message.success) && (
            <FormMessage message={message} />
          )}
        </div>
      </form>
    </div>
  );
}
```### Row-Level Security <!--row-level-security-->
*Secure data access with Row-Level Security policies.*

```sql
-- Example Row-Level Security policies to apply in Supabase SQL Editor

-- Enable RLS on a table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for viewing profiles (users can view only their own)
CREATE POLICY "Users can view their own profiles"
ON profiles
FOR SELECT
USING (auth.uid() = id);

-- Allow users to update their own profiles
CREATE POLICY "Users can update their own profiles"
ON profiles
FOR UPDATE
USING (auth.uid() = id);

-- Allow users to insert their own profile
CREATE POLICY "Users can insert their own profile"
ON profiles
FOR INSERT
WITH CHECK (auth.uid() = id);

-- Allow users to view public profiles
CREATE POLICY "Anyone can view public profiles"
ON profiles
FOR SELECT
USING (is_public = true);

-- Project table policies
CREATE POLICY "Users can view their own projects"
ON projects
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Project members can view projects"
ON projects
FOR SELECT
USING (
  auth.uid() IN (
    SELECT user_id FROM project_members
    WHERE project_id = id
  )
);

-- Cross-table policies with JOIN conditions
CREATE POLICY "Team members can view team projects"
ON projects
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM teams
    JOIN team_members ON teams.id = team_members.team_id
    WHERE teams.id = projects.team_id
    AND team_members.user_id = auth.uid()
  )
);

-- Policies using stored procedures
CREATE POLICY "Admins can do anything"
ON projects
USING (is_admin(auth.uid()));

-- Create a function to check if a user is an admin
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $
  SELECT EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = $1
    AND role = 'admin'
  );
$ LANGUAGE sql SECURITY DEFINER;
```### Protected Routes Implementation <!--protected-routes-implementation-->
*Implementing protected routes with authentication checks.*

```typescript
// app/dashboard/layout.tsx
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { DashboardNav } from '@/components/dashboard/nav';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  // If no user is authenticated, redirect to sign in
  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <DashboardNav user={user} />
      <main className="flex flex-col p-8">{children}</main>
    </div>
  );
}

// app/dashboard/page.tsx
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { DashboardCard } from '@/components/dashboard/card';
import { UserStats } from '@/components/dashboard/user-stats';

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  // Fetch user profile and other data
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id)
    .single();
  
  // Fetch user stats
  const { data: stats } = await supabase.rpc('get_user_stats', {
    user_id: user?.id,
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Profile Completion"
          value={profile ? '100%' : '0%'}
          description={profile ? 'Your profile is complete' : 'Complete your profile'}
          href="/dashboard/profile"
        />
        
        <DashboardCard
          title="Active Projects"
          value={stats?.active_projects ?? 0}
          description="Projects you're working on"
          href="/dashboard/projects"
        />
        
        <DashboardCard
          title="Completed Tasks"
          value={stats?.completed_tasks ?? 0}
          description="Tasks you've completed"
          href="/dashboard/tasks"
        />
      </div>
      
      <UserStats user={user} stats={stats} />
    </div>
  );
}

// components/dashboard/user-avatar.tsx
'use client';

import { useEffect, useState } from 'react';
import { createClientSupabaseClient } from '@/lib/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@supabase/supabase-js';

interface UserAvatarProps {
  user: User;
  className?: string;
}

export function UserAvatar({ user, className }: UserAvatarProps) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const supabase = createClientSupabaseClient();
  
  useEffect(() => {
    async function fetchAvatar() {
      const { data: profile } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', user.id)
        .single();
      
      if (profile?.avatar_url) {
        const { data } = supabase.storage
          .from('avatars')
          .getPublicUrl(profile.avatar_url);
        
        setAvatarUrl(data.publicUrl);
      }
    }
    
    fetchAvatar();
  }, [user.id, supabase]);
  
  return (
    <Avatar className={className}>
      <AvatarImage src={avatarUrl ?? undefined} alt={user.email ?? 'User'} />
      <AvatarFallback>
        {user.email ? user.email.substring(0, 2).toUpperCase() : 'U'}
      </AvatarFallback>
    </Avatar>
  );
}

// components/auth-button.tsx
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { signOutAction } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export async function AuthButton() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  return user ? (
    <form action={signOutAction}>
      <Button variant="outline" type="submit">
        Sign out
      </Button>
    </form>
  ) : (
    <div className="flex items-center gap-4">
      <Button variant="outline" asChild>
        <Link href="/auth/signin">Sign in</Link>
      </Button>
      <Button asChild>
        <Link href="/auth/signup">Sign up</Link>
      </Button>
    </div>
  );
}
```### Auth Components and Pages <!--auth-components-and-pages-->
*Components and pages for authentication flows.*

```typescript
// components/ui/form-message.tsx
'use client';

export type Message = 
  | { success: string }
  | { error: string }
  | { message: string };

export function FormMessage({ message }: { message: Message }) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-md text-sm">
      {'success' in message && (
        <div className="text-green-600 border-l-2 border-green-600 px-4">
          {message.success}
        </div>
      )}
      {'error' in message && (
        <div className="text-red-600 border-l-2 border-red-600 px-4">
          {message.error}
        </div>
      )}
      {'message' in message && (
        <div className="text-foreground border-l-2 px-4">{message.message}</div>
      )}
    </div>
  );
}

// components/ui/submit-button.tsx
'use client';

import { Button } from '@/components/ui/button';
import { type ComponentProps } from 'react';
import { useFormStatus } from 'react-dom';

type Props = ComponentProps<typeof Button> & {
  pendingText?: string;
};

export function SubmitButton({
  children,
  pendingText = 'Submitting...',
  ...props
}: Props) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending} disabled={pending} {...props}>
      {pending ? pendingText : children}
    </Button>
  );
}

// app/auth/signin/page.tsx
import { signInAction } from '@/app/actions/auth';
import { FormMessage, type Message } from '@/components/ui/form-message';
import { SubmitButton } from '@/components/ui/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default async function SignIn({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  // Convert search params to Message type
  const message: Message = searchParams.error
    ? { error: searchParams.error }
    : searchParams.success
    ? { success: searchParams.success }
    : { message: '' };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-md">
        <div>
          <h1 className="text-2xl font-bold">Sign in</h1>
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/auth/forgot-password"
                className="text-xs text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          <SubmitButton
            className="w-full"
            formAction={signInAction}
            pendingText="Signing in..."
          >
            Sign in
          </SubmitButton>

          {/* Display error or success message */}
          {(message.error || message.success) && (
            <FormMessage message={message} />
          )}
        </div>
      </form>
    </div>
  );
}

// app/auth/signup/page.tsx
import { signUpAction } from '@/app/actions/auth';
import { FormMessage, type Message } from '@/components/ui/form-message';
import { SubmitButton } from '@/components/ui/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default async function SignUp({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  // Convert search params to Message type
  const message: Message = searchParams.error
    ? { error: searchParams.error }
    : searchParams.success
    ? { success: searchParams.success }
    : { message: '' };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-md">
        <div>
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          <SubmitButton
            className="w-full"
            formAction={signUpAction}
            pendingText="Creating account..."
          >
            Create account
          </SubmitButton>

          {/* Display error or success message */}
          {(message.error || message.success) && (
            <FormMessage message={message} />
          )}
        </div>
      </form>
    </div>
  );
}
```### Auth Callback Handler <!--auth-callback-handler-->
*Handle authentication callbacks and session exchanges.*

```typescript
// app/auth/callback/route.ts
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;
  const redirectTo = requestUrl.searchParams.get('redirectTo')?.toString();

  if (code) {
    const supabase = await createServerSupabaseClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Handle redirects after authentication
  if (redirectTo) {
    return NextResponse.redirect(`${origin}${redirectTo}`);
  }

  // Default redirect to dashboard
  return NextResponse.redirect(`${origin}/dashboard`);
}
```### Authentication Server Actions <!--authentication-server-actions-->
*Server actions for handling authentication operations.*

```typescript
// app/actions/auth.ts
'use server';

import { createServerSupabaseClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { encodedRedirect } from '@/lib/utils';

export async function signUpAction(formData: FormData) {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const supabase = await createServerSupabaseClient();
  const origin = headers().get('origin');

  if (!email || !password) {
    return encodedRedirect(
      'error',
      '/auth/signup',
      'Email and password are required'
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect('error', '/auth/signup', error.message);
  }

  return encodedRedirect(
    'success',
    '/auth/signup',
    'Please check your email for a verification link'
  );
}

export async function signInAction(formData: FormData) {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const supabase = await createServerSupabaseClient();

  if (!email || !password) {
    return encodedRedirect(
      'error',
      '/auth/signin',
      'Email and password are required'
    );
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect('error', '/auth/signin', error.message);
  }

  return redirect('/dashboard');
}

export async function forgotPasswordAction(formData: FormData) {
  const email = formData.get('email')?.toString();
  const supabase = await createServerSupabaseClient();
  const origin = headers().get('origin');

  if (!email) {
    return encodedRedirect('error', '/auth/forgot-password', 'Email is required');
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirectTo=/auth/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect('error', '/auth/forgot-password', error.message);
  }

  return encodedRedirect(
    'success',
    '/auth/forgot-password',
    'Check your email for a password reset link'
  );
}

export async function resetPasswordAction(formData: FormData) {
  const password = formData.get('password')?.toString();
  const confirmPassword = formData.get('confirmPassword')?.toString();
  const supabase = await createServerSupabaseClient();

  if (!password || !confirmPassword) {
    return encodedRedirect(
      'error',
      '/auth/reset-password',
      'Password and confirm password are required'
    );
  }

  if (password !== confirmPassword) {
    return encodedRedirect(
      'error',
      '/auth/reset-password',
      'Passwords do not match'
    );
  }

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return encodedRedirect('error', '/auth/reset-password', error.message);
  }

  return encodedRedirect(
    'success',
    '/dashboard',
    'Password updated successfully'
  );
}

export async function signOutAction() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  return redirect('/auth/signin');
}
```---
title: Next.js 15.x Development Guidelines for AI Assistants
version: 3.0.0
lastUpdated: 2025-05-02
tags: [nextjs, react, tailwind, typescript, supabase, development, ai]
---

# Next.js 15.x Development Guidelines for AI Assistants
Last updated: May 02, 2025

> This document follows versioning best practices with updates every 4 weeks or when CVEs are published. We only pin to stable releases.

## 📋 Table of Contents
1. @Technology Stack
2. @Key Principles
3. @Next.js 15.x Features
    - @Server Actions & Mutations
    - @Explicit Caching Controls
    - @Font Optimization
    - @Analytics & Telemetry
    - @Edge Config / KV
    - @Bundle Analysis
    - @Internationalization
4. @Code Style & Conventions
    - @Naming Conventions
    - @File & Component Structure
5. @Next.js 15.3.1 & React 19.1 Best Practices
    - @Breaking Changes & Migration
    - @Async APIs & Cookie Handling
    - @React 19 Features & Removed APIs
    - @Server vs Client Components
    - @Data Fetching & Caching
    - @Routing & Navigation
    - @Error Handling
6. @TypeScript 5.8 Implementation
7. @Tailwind CSS 4.1 Implementation
8. @UI Components & Accessibility
9. @State Management
10. @Supabase Integration
    - @Package Versions & Setup
    - @Authentication & Row-Level Security
    - @Edge Functions
    - @Realtime & Presence
    - @Storage Optimization
    - @Declarative Schemas & Migrations
    - @Advanced Features
11. @Performance Optimization
12. @Testing & CI/CD
    - @Automated E2E Testing
    - @Lighthouse CI for Performance Budgets
    - @Documentation & Standards
13. @Advanced Project Setup & Scaling
    - @pnpm Workspaces
    - @Turborepo for Monorepos
    - @ESLint & TypeScript Checks in CI
    - @Production Observability
    - @PWA Features
14. @Security Best Practices
15. @Common Anti-Patterns to Avoid
16. @Code Examples
17. @Deployment & CI/CD Best Practices
18. @Quick Migration Checklist
19. @AI Agent Integration Guide

## 📝 Changelog
- **v3.0.0 (2025-05-02)**: Enhanced guide with latest implementation details for Supabase, Next.js 15.3.1, TanStack Query 5.74.6, and React 19.1; improved code examples for AI agents; added sections on Server Actions and Explicit Caching
- **v2.0.0 (2025-04-23)**: Enhanced document for AI assistants, improved structure, added AI-specific guidance, expanded code examples
- **v1.0.0 (2025-04-15)**: Initial guidelines released

## Technology Stack <!--technology-stack-->
*The foundation: modern, stable, and performant tools with solid TypeScript integration.*

- Next.js 15.3.1 (App Router with stable Turbopack dev mode)
- React 19.1.0 (Server Components, React Compiler, new concurrent features)
- TypeScript 5.8.3 (with 6.0 on roadmap)
- Tailwind CSS 4.1.4 (CSS-first config with container queries support)
- Shadcn UI 2.4.1 / Radix UI 1.1.6
- Supabase
  - @supabase/supabase-js@^3.43.0 (full Edge-runtime support + streaming)
  - @supabase/ssr@^0.16.0 (replaces auth-helpers-nextjs)
  - @supabase/ui@^0.52.0 (official UI components)
- Modern state management
  - Zustand 5.0.4 (for client-side global state)
  - TanStack Query 5.74.6 (for server state management)
- Form handling & validation
  - React Hook Form (for uncontrolled form inputs)
  - Zod (schema validation with custom error messages)
  - class-variance-authority (for consistent component styling variants)
- Internationalization
  - next-intl (for multi-language support)

<!-- GUIDELINE_END -->

## Quick Migration Checklist for Next.js 15.3.1 <!--quick-migration-checklist-for-nextjs-1531-->
*Comprehensive checklist for upgrading to Next.js 15.3.1.*

1. **Update dependencies**
   ```bash
   # Using pnpm (recommended)
   pnpm up next@15.3.1 react@19.1.0 react-dom@19.1.0 --latest
   pnpm up typescript@5.8.3 @types/react@latest @types/react-dom@latest --latest
   pnpm up @supabase/supabase-js@^3.43.0 @supabase/ssr@^0.16.0 --latest
   pnpm up zustand@5.0.4 @tanstack/react-query@5.74.6 --latest
   ```

2. **Fix breaking changes**
   - ⚠️ Convert route.ts to GET.ts/POST.ts using codemod:

     ```bash
     npx @next/codemod@canary next-async-request-api .
     ```

   - ⚠️ Update `cookies()`, `headers()`, and `draftMode()` calls to be async:

     ```typescript
     const cookieStore = await cookies();
     ```

   - ⚠️ Audit fetch() calls - add `cache: 'no-store'` explicitly where needed
   - ⚠️ Remove old React APIs (contextTypes, string refs)
   - ⚠️ Swap FID monitoring for INP

3. **Security updates**
   - ⚠️ Patch for CVE-2025-29927 (update to 15.3.1+)
   - ⚠️ Validate x-middleware-subrequest header in custom middleware
   - ⚠️ Audit authentication flows and Supabase integration

4. **Supabase migration**
   - Migrate from auth-helpers-nextjs to @supabase/ssr package
   - Update authentication flows with async cookies() handling
   - Check Row-Level Security policies
   - Enable latest Supabase features (Realtime, Storage CDN, etc.)

5. **React 19 features**
   - Adopt React 19's new hooks (useOptimistic, use)
   - Simplify code with ref directly as a prop (without forwardRef)
   - Use context as JSX (without .Provider)
   - Enable React Compiler for performance optimization

6. **Performance optimization**
   - Enable Next.js Analytics
   - Optimize Core Web Vitals (INP, LCP, CLS)
   - Self-host fonts with next/font
   - Run bundle analysis with @next/bundle-analyzer
   - Set up Lighthouse CI for performance budget enforcement
   - Implement Incremental Partial Prerendering (IPPR) with generateStaticParams

7. **Tooling Updates**
   - Configure ESLint for Next.js 15
   - Update TypeScript config for Node 18 module support
   - Upgrade to Tailwind CSS 4.1 (run migration tool)
   - Update testing library dependencies
   - Configure Playwright for E2E testing

```bash
# Run migration verification script
pnpm dlx @next/codemod@latest next-integration-check ./app
```

<!-- GUIDELINE_END -->

### Real-time Collaborative Component <!--real-time-collaborative-component-->

```typescript
// components/documents/document-editor.client.tsx
'use client';

import { useEffect, useState } from 'react';
import { Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import { useUser } from '@/hooks/use-user';
import { createClientSupabaseClient } from '@/lib/supabase/client';
import { Toolbar } from '@/components/documents/editor-toolbar';
import { UserCursor } from '@/components/documents/user-cursor';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface DocumentEditorProps {
  documentId: string;
  initialContent: any;
}

export function DocumentEditor({ documentId, initialContent }: DocumentEditorProps) {
  const [editor, setEditor] = useState<Editor | null>(null);
  const [activeUsers, setActiveUsers] = useState<Record<string, any>>({});
  const { user } = useUser();
  const supabase = createClientSupabaseClient();
  
  useEffect(() => {
    if (!user?.id) return;
    
    // Set up Tiptap editor with collaboration extensions
    const newEditor = new Editor({
      extensions: [
        StarterKit,
        Collaboration.configure({
          document: initialContent,
        }),
        CollaborationCursor.configure({
          provider: supabase,
          user: {
            id: user.id,
            name: user.name,
            color: stringToColor(user.id),
          },
        }),
      ],
      content: initialContent,
      editorProps: {
        attributes: {
          class: 'prose prose-sm sm:prose lg:prose-lg mx-auto focus:outline-none',
        },
      },
      onUpdate: ({ editor }) => {
        // Send document changes to Supabase
        supabase
          .from('document_contents')
          .upsert({
            document_id: documentId,
            content: editor.getJSON(),
            updated_at: new Date().toISOString(),
            updated_by: user.id,
          })
          .then(({ error }) => {
            if (error) console.error('Failed to save document:', error);
          });
      },
    });
    
    setEditor(newEditor);
    
    // Set up real-time presence for this document
    const channel = supabase
      .channel(`document:${documentId}`)
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        setActiveUsers(state);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        // Someone joined
        console.log('User joined:', newPresences);
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        // Someone left
        console.log('User left:', leftPresences);
      })
      .subscribe(async (status) => {
        if (status !== 'SUBSCRIBED') return;
        
        // Track user presence
        await channel.track({
          user_id: user.id,
          name: user.name,
          avatar_url: user.avatarUrl,
          online_at: new Date().toISOString(),
        });
      });
    
    // Clean up
    return () => {
      newEditor.destroy();
      supabase.removeChannel(channel);
    };
  }, [documentId, initialContent, user, supabase]);
  
  // Helper function to generate consistent colors from strings
  function stringToColor(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 95%, 45%)`;
  }
  
  if (!editor) {
    return <div>Loading editor...</div>;
  }
  
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="border-b">
        <CardTitle>Collaborative Document</CardTitle>
        
        <div className="flex items-center space-x-2">
          {Object.values(activeUsers).map((presence: any) => (
            <UserCursor
              key={presence.user_id}
              name={presence.name}
              avatarUrl={presence.avatar_url}
              color={stringToColor(presence.user_id)}
            />
          ))}
        </div>
      </CardHeader>
      
      <Toolbar editor={editor} />
      
      <CardContent className="p-6 min-h-[500px]">
        <EditorContent editor={editor} />
      </CardContent>
      
      <CardFooter className="border-t p-4 text-sm text-gray-500">
        Last saved: {new Date().toLocaleTimeString()}
      </CardFooter>
    </Card>
  );
}
```

<!-- GUIDELINE_END -->

## Key Principles <!--key-principles-->

*Focus: balance performance, accessibility, and developer experience with server-first architecture.*

1. **Code Structure**: Write concise, technically accurate TypeScript code using functional, declarative programming (avoid classes).
2. **Accessibility**: Ship accessible, mobile-first UIs with WCAG AA compliance and color contrast ratio ≥ 4.5:1.
3. **Architecture**: Prioritize React Server Components; keep Client Components small and focused (< 500 LOC).
4. **Data Management**: Explicit caching controls for all data fetching; validate all inputs with Zod.
5. **Security**: Implement Row-Level Security in Supabase; treat Server Actions like public APIs.
6. **Reliability**: Implement proper error handling and validation at all levels with type safety.
7. **Performance**: Optimize Core Web Vitals: INP (<200ms), LCP (<2.5s), CLS (<0.1).
   - Note: INP (Interaction to Next Paint) replaced FID in March 2024.

<!-- GUIDELINE_END -->

## Next.js 15.x Features <!--nextjs-15x-features-->

*Key capabilities: focus on these features for optimal performance and developer experience.*

### Server Actions & Mutations <!--server-actions--mutations-->

*First-class form handling with server-side validation and processing.*

```typescript
// app/actions/create-user.ts
'use server';

import { z } from 'zod';
import { createSafeAction } from 'next-safe-action';
import { revalidatePath } from 'next/cache';

// Define schema for validation
const userSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  role: z.enum(['admin', 'user']),
});

// Create typesafe server action
export const createUser = createSafeAction(userSchema, async (data) => {
  try {
    // Process on server (DB operation, etc.)
    const user = await db.user.create({
      data
    });
    
    // Revalidate affected paths
    revalidatePath('/users');
    
    return { success: true, data: user };
  } catch (error) {
    return { 
      success: false, 
      error: 'Failed to create user' 
    };
  }
});

// app/components/user-form.client.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from 'next/form'; // Enhanced form
import { useAction } from 'next-safe-action/hooks';
import { createUser } from '@/app/actions/create-user';

export function UserForm() {
  const { execute, status } = useAction(createUser);
  
  // Form implementation with React Hook Form
  // ...
  
  return (
    <Form action={createUser}>
      {/* Form fields */}
      <Button type="submit">Create User</Button>
    </Form>
  );
}
```

**Key Benefits:**

- Actions run securely on the server with full Node.js API access
- Removes the need for separate API routes
- Progressive enhancement (forms work without JavaScript)
- Seamless integration with React's use/Suspense patterns
- Typesafe with `next-safe-action` integration

<!-- GUIDELINE_END -->

### Explicit Caching Controls <!--explicit-caching-controls-->

*Fine-grained control over data freshness and caching.*

```typescript
// app/products/page.tsx
export default async function ProductsPage() {
  // Explicitly set caching behavior
  const products = await fetch('https://api.example.com/products', {
    cache: 'no-store', // Always fresh data
    // Alternative options:
    // cache: 'force-cache' // Default - cache indefinitely
    // next: { revalidate: 60 } // Time-based revalidation (seconds)
  }).then(res => res.json());
  
  return (
    <div>
      <h1>Products</h1>
      <ProductList products={products} />
    </div>
  );
}

// Route segment config control
export const dynamic = 'force-dynamic'; // Never cache this route

// Alternatives:
// export const dynamic = 'auto'; // Default behavior
// export const dynamic = 'force-static'; // Always static
// export const revalidate = 60; // Revalidate every 60 seconds
// export const dynamicParams = true; // Dynamic params not in generateStaticParams
```

**Key Points:**

- Next.js 15.x defaults to `force-cache` (previously was `no-store`)
- Always set explicit caching behavior for all fetch requests
- Use segment config exports to control entire route caching behavior
- Combine with `revalidatePath()` or `revalidateTag()` for targeted updates

<!-- GUIDELINE_END -->

### Built-in Font Optimization <!--font-optimization-->

*Self-hosted fonts reduce network requests and layout shifts.*

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'], 
  weight: ['400','700'],
  display: 'swap' // Improves rendering experience
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}

// For local fonts:
import localFont from 'next/font/local'

const customFont = localFont({
  src: './fonts/CustomFont.woff2',
  display: 'swap'
})
```

**Benefits:**

- Self-hosts font files (no third-party CDN requests)
- Auto-subsets only the glyphs actually used
- Preloads key fonts to improve LCP
- Eliminates Cumulative Layout Shift (CLS)
- Typically reduces first-paint times by hundreds of milliseconds

<!-- GUIDELINE_END -->

### Next.js Analytics & Telemetry <!--analytics--telemetry-->

*Built-in performance tracking for Core Web Vitals with zero config.*

```typescript
// app/layout.tsx
import { Analytics } from 'next/analytics'

export default function RootLayout({ children }) {
  return (
    <>
      {children}
      <Analytics />
    </>
  )
}

// Instrument server-side events for custom telemetry
// instrumentation.js (root directory)
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { setupPerformanceObserver } = await import('./monitoring/server')
    setupPerformanceObserver()
  }
}
```

**Features:**

- `next/analytics` for measuring Core Web Vitals in production
- Server-side instrumentation points for App Router and Middleware
- Automatic tracking of bundle size, INP, CLS, and other metrics
- Integrates with Vercel Analytics SDK

<!-- GUIDELINE_END -->

### Edge Config / KV <!--edge-config-kv-->

*Ultra-fast, edge-based configuration and feature flags.*

```typescript
// middleware.ts
import { edgeConfig } from '@vercel/edge-config'

export async function middleware(req) {
  const flag = await edgeConfig.get('new-navbar-enabled')
  if (flag) {
    // Apply new navbar logic
  }
  return NextResponse.next()
}

// Use with Server Components
import { kv } from '@vercel/kv'

export default async function Page() {
  // Access KV store from Server Components
  const views = await kv.incr('page_views')
  return <div>This page has been viewed {views} times</div>
}
```

**Use Cases:**

- Per-request feature flags or A/B parameters
- Global configuration without redeploys
- Sub-1ms reads from any region
- Ideal for dark launches, canary rollouts, and fast rollbacks
- Rate limiting and view counters

<!-- GUIDELINE_END -->

### Bundle Analysis <!--bundle-analysis-->

*Visualize and optimize your JavaScript bundles for better load times.*

```javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({
  // your config here
})
```

**Usage:**

- Install and wrap your `next.config.js`
- Run `ANALYZE=true next build`
- Visualize client and server bundle sizes
- Identify tree-shaking issues and oversized dependencies
- Use React 19's compiler to automatically optimize components

<!-- GUIDELINE_END -->

### Internationalization (i18n) <!--internationalization-i18n-->

*First-class support for multiple languages.*

```typescript
// next-intl implementation (recommended)
// middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'fr', 'de'],
  defaultLocale: 'en',
  localePrefix: 'always' // Options: 'as-needed', 'always', or 'never'
});

// Configure matching paths
export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};

// Usage in Server Component
import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations('home');
  return <h1>{t('title')}</h1>;
}

// Usage in Client Component
'use client';
import { useTranslations } from 'next-intl';

export function ClientComponent() {
  const t = useTranslations('common');
  return <button>{t('submit')}</button>;
}
```

**Features:**

- Support for multiple localization strategies (path, domain, or query)
- Automatic locale detection and redirection
- Fully typed with TypeScript augmentation
- Formatting dates, numbers, and lists according to locale
- Built-in performance optimizations with message catalogs

<!-- GUIDELINE_END -->

## Code Style & Conventions <!--code-style--conventions-->

*Consistent patterns: follow these conventions for readable, maintainable code.*

### Naming Conventions <!--naming-conventions-->

*Clear, consistent naming improves code readability and AI assistant understanding.*

- **Files**: Use kebab-case for all filenames (`user-profile.tsx`, `auth-form.tsx`)
- **Components**: Use PascalCase for component names (`UserProfile`, `AuthForm`)
- **Variables**: Use descriptive names with auxiliary verbs:
  - Booleans: Use prefixes like `is`, `has`, `can`, `should` (`isLoading`, `hasError`, `canSubmit`)
  - Event handlers: Use `handle` prefix (`handleSubmit`, `handleClick`)
  - Data fetching: Use `fetch` prefix (`fetchUsers`, `fetchProfileData`)
  - Actions/Mutations: Use verb-noun format (`createUser`, `updateProfile`)
- **Directories**: Use lowercase with dashes (`components/auth-wizard`, `lib/api-utils`)
- **Server Actions**: Use verb-noun format (`createUser.ts`, `updateProfile.ts`)
- **Route Handlers**: Use HTTP method as export name (`export async function GET()`)

<!-- GUIDELINE_END -->

### File & Component Structure <!--file--component-structure-->

*Consistent structure enables better collaboration and easier maintenance.*

```typescript
// Example component structure (user-card.client.tsx)
'use client'; // Only needed for Client Components

import { useState } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { cva } from 'class-variance-authority';

// Style variants (if applicable)
const cardVariants = cva(
  "rounded-lg border p-4", // Base styles
  {
    variants: {
      variant: {
        default: "bg-white border-gray-200 shadow-sm",
        highlighted: "bg-blue-50 border-blue-200 shadow-md",
      },
      size: {
        sm: "p-2 text-sm",
        md: "p-4 text-base",
        lg: "p-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// Main component export
export function UserCard({ 
  user, 
  onAction,
  variant,
  size,
  className
}: UserCardProps) {
  // Component logic
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleExpandToggle = () => setIsExpanded(!isExpanded);
  
  return (
    <div className={cardVariants({ variant, size, className })}>
      <Avatar user={user} />
      <h3 className="font-semibold">{user.name}</h3>
      
      {isExpanded && (
        <div className="mt-2">
          <p>{user.bio}</p>
          <time>{formatDate(user.joinedAt)}</time>
        </div>
      )}
      
      <div className="flex mt-4 gap-2">
        <Button variant="ghost" onClick={handleExpandToggle}>
          {isExpanded ? 'Show Less' : 'Show More'}
        </Button>
        {onAction && (
          <Button onClick={() => onAction(user.id)}>
            Connect
          </Button>
        )}
      </div>
    </div>
  );
}

// Helper functions specific to this component
function formatUserName(user: User) {
  // Implementation
  return `${user.firstName} ${user.lastName}`;
}

// Types/interfaces at the end
interface UserCardProps {
  user: User;
  onAction?: (userId: string) => void;
  variant?: "default" | "highlighted";
  size?: "sm" | "md" | "lg";
  className?: string;
}

interface User {
  id: string;
  name: string;
  bio?: string;
  joinedAt: Date;
  avatar?: string;
}
```

**Best Practices:**

- Use `.client.tsx` and `.server.tsx` suffixes to surface RSC boundaries
- Place related components in the same directory
- Use barrel exports (index.ts) per folder for cleaner imports
- Collocate tests with components (*.test.tsx)
- Keep folders ≤ 4 levels deep for better AI navigation
- Order imports: React, external libraries, internal components, utils
- Place types/interfaces at the end of the file

<!-- 🤖prompt: "In Next.js 15.x, organize components with clear server/client boundaries using .server.tsx and .client.tsx suffixes" -->

<!-- GUIDELINE_END -->

## Next.js 15.3.1 & React 19.1 Best Practices <!--nextjs-1531--react-191-best-practices-->

*Key updates: async APIs, new hooks, and compiler optimizations define this release.*

### Breaking Changes & Migration <!--breaking-changes--migration-->

*Critical changes requiring code updates when migrating to Next.js 15.x.*

- ⚠️ **Cache defaults**: Now `force-cache` (previously was `no-store`)
  - Explicitly add `cache: 'no-store'` when needed for dynamic data
  - Add 'no-store' segment config where appropriate
- ⚠️ **Async Request APIs**: Use GET.ts, POST.ts instead of route.ts
  - Export a handler function returning Response
- ⚠️ **Cookies, Headers, and DraftMode**: Now async
  - `const cookieStore = await cookies()`
  - `const headersList = await headers()`
  - `const { isEnabled } = await draftMode()`
- **Next.js Form**: Use `<Form action={createUser}>...</Form>` for progressive enhancement
- **Turbopack**: Now default for dev mode
  - Keep custom webpack loaders for build only or migrate to Turbopack plugins
- ⚠️ **Security**: Patch to 15.3.1+ for security vulnerabilities
  - Validate x-middleware-subrequest header in custom middleware

<!-- GUIDELINE_END -->

### Async APIs & Cookie Handling <!--async-apis--cookie-handling-->

*Request API methods are now async and require proper await handling.*

```typescript
// app/dashboard/page.tsx
import { cookies } from 'next/headers'

export default async function Page() {
  // Was synchronous in Next.js 14.x
  // Now MUST be awaited in Next.js 15.x
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')
  
  // Headers are also async now
  const headersList = await headers()
  const userAgent = headersList.get('user-agent')
  
  // Supabase cookie-based auth with @supabase/ssr
  import { createServerClient } from '@supabase/ssr'
  
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name, options) {
          cookieStore.set({ name, value: '', ...options })
        }
      }
    }
  )
  
  const { data } = await supabase.auth.getSession()
  // ...
}

// Route handlers can be sync or async:
// app/api/users/route.ts
export function GET(req) { 
  // Synchronous route handler
  return Response.json({ users: [] })
}

// app/api/posts/route.ts
export async function GET(req) { 
  // Async route handler with await
  const posts = await fetchPosts()
  return Response.json({ posts })
}

// Migration codemod available: 
// npx @next/codemod@canary next-async-request-api .
```

**Key Points:**

- `cookies()`, `headers()`, and `draftMode()` are now async (BREAKING CHANGE)
- Supabase integration continues to work with the new @supabase/ssr package
- Use cookies API for session handling or local preferences
- Route handlers can remain synchronous if they don't use await

<!-- GUIDELINE_END -->

### React 19 Features & Removed APIs <!--react-19-features--removed-apis-->

*Key updates in React 19.1 to leverage and legacy APIs to replace.*

#### New React 19 Features

```typescript
// Use hook for async data
'use client';

import { use } from 'react';

function ProfileData({ promise }) {
  // Unwrap a promise directly in a component
  const data = use(promise);
  return <div>{data.name}</div>;
}

// useOptimistic for immediate UI updates
'use client';

import { useOptimistic } from 'react';

function MessageList({ messages, sendMessage }) {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [...state, newMessage]
  );
  
  return (
    <div>
      {optimisticMessages.map(message => (
        <div key={message.id}>{message.text}</div>
      ))}
      <button onClick={() => {
        // Show optimistic update immediately
        const optimisticMsg = { id: 'temp', text: 'Sending...' };
        addOptimisticMessage(optimisticMsg);
        // Then send actual request
        sendMessage('Hello');
      }}>
        Send
      </button>
    </div>
  );
}

// Ref as prop without forwardRef (new in React 19)
function Input({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}

// Context rendered directly as JSX
const ThemeContext = createContext('light');

function App() {
  return (
    // No need for ThemeContext.Provider
    <ThemeContext value="dark">
      <Content />
    </ThemeContext>
  );
}
```

#### Removed APIs (React 19)

- ⚠️ contextTypes / getChildContext → Use new Context API
- ⚠️ string refs → Use callback refs or useRef
- ⚠️ ReactDOM.findDOMNode → Use ref + ref.current
- ⚠️ ReactDOM.render/hydrate → Use createRoot / hydrateRoot
- ⚠️ function-component defaultProps → Use ES default parameters

```typescript
// BEFORE (deprecated)
function Button(props) {
  // ...
}
Button.defaultProps = {
  color: 'blue',
  size: 'md'
};

// AFTER (use ES default parameters)
function Button({ color = 'blue', size = 'md', ...props }) {
  // ...
}
```

<!-- GUIDELINE_END -->

### Server vs Client Components <!--server-vs-client-components-->

*Guidelines for deciding when to use Server vs Client components.*

**Server Components (Default):**

- Use for data fetching, static content, SEO optimization
- Smaller bundle size, faster initial load
- Prefer `await use(fetch(...))` in RSC when you need streaming
- No client-side JavaScript by default (better performance)
- No `useState`, `useEffect`, or browser-only APIs

**Client Components (Only when needed):**

- Use only for interactivity, events, and browser APIs
- Add `'use client'` directive at top of file
- Keep Client Components small (< 500 LOC)
- Don't wrap compiler-optimized components in `memo` unless you benchmark
- Move data fetching up to parent Server Components when possible

**Example of proper component split:**

```typescript
// users-page.server.tsx
import { Suspense } from 'react';
import { UserFilters } from './user-filters.client';
import { UserList } from './user-list.server';
import { LoadingSkeleton } from '@/components/ui/loading';

// Server Component for page with data fetching
export default async function UsersPage() {
  return (
    <main>
      <h1>Users</h1>
      <UserFilters /> {/* Client component for interactivity */}
      <Suspense fallback={<LoadingSkeleton />}>
        <UserList /> {/* Server component for data fetching */}
      </Suspense>
    </main>
  );
}

// user-list.server.tsx
import { UserCard } from './user-card.client';
import { fetchUsers } from '@/lib/data';

export async function UserList() {
  // Data fetching happens here on the server
  const users = await fetchUsers();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map(user => (
        <UserCard 
          key={user.id} 
          user={user} 
          // Pass down data fetched on server to client component
        />
      ))}
    </div>
  );
}

// user-filters.client.tsx
'use client';

import { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export function UserFilters() {
  // State and interactivity happens in Client Component
  const [filter, setFilter] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const handleFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.set('filter', filter);
    router.push(`${pathname}?${params.toString()}`);
  };
  
  return (
    <div className="flex gap-2 mb-4">
      <input 
        type="text" 
        value={filter} 
        onChange={(e) => setFilter(e.target.value)} 
        className="px-2 py-1 border rounded"
      />
      <button 
        onClick={handleFilter}
        className="px-3 py-1 bg-blue-500 text-white rounded"
      >
        Filter
      </button>
    </div>
  );
}
```

**Boundary Transfer Rules:**

- Data moves DOWN from Server → Client Components (as props)
- Events move UP from Client → Server Components (via actions/callbacks)
- Keep data fetching in Server Components when possible
- Split interactive UI elements into Client Components

<!-- 🤖prompt: "Default to Server Components; only use Client Components for interactivity, state, or browser APIs" -->

<!-- GUIDELINE_END -->

### Data Fetching & Caching <!--data-fetching--caching-->

*Optimized data fetching patterns to eliminate waterfalls and improve UX.*

```typescript
// lib/preload-users.server.ts - Early fetching with cache
import 'server-only';
import { cache } from 'react';

export const preloadUsers = cache(async (filter = '') => {
  const res = await fetch(`${API}/users?filter=${filter}`, { 
    cache: 'no-store' // Explicit cache setting
  });
  
  if (!res.ok) {
    throw new Error(`Failed to fetch users: ${res.status}`);
  }
  
  return res.json() as Promise<User[]>;
});

// React 19 preload syntax for RSC
import { preload as preloadUsers } from '@/lib/users';

// Usage in Server Component
export default async function UsersPage({ searchParams }) {
  const filter = searchParams.filter || '';
  
  // Start fetch as early as possible
  preloadUsers(filter);
  
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <UserListContainer filter={filter} />
    </Suspense>
  );
}

async function UserListContainer({ filter }) {
  const users = await preloadUsers(filter);
  return <UserList users={users} />;
}

// Client-side data fetching with TanStack Query
'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

export function UserProfile({ userId }) {
  // Suspense-enabled query
  const { data } = useSuspenseQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    suspense: true,
  });
  
  return <div>{data.name}</div>;
}
```

**Best Practices:**

- Kick off fetch early using `cache()` or React 19 `preload()` to avoid waterfalls
- On client, use TanStack Query 5.74.6 with `suspense: true` for mutations
- Implement proper Suspense boundaries with fallbacks
- Use explicit cache settings with all fetch calls (avoid default force-cache)
- Consider Incremental Partial Prerendering (IPPR) for dynamic pages
- Use `Promise.all` when fetching multiple independent resources

```typescript
// Parallel fetching example
export default async function DashboardPage() {
  // Fetch multiple resources in parallel
  const [userData, statsData, notificationsData] = await Promise.all([
    fetchUser(),
    fetchStats(),
    fetchNotifications()
  ]);
  
  return (
    // Render with all data available
  );
}
```

<!-- 🤖prompt: "Always use explicit cache settings with fetch(); prefer Server Components for data fetching" -->

<!-- GUIDELINE_END -->

### Routing & Navigation <!--routing--navigation-->

*App Router best practices for organized, performant routing.*

```typescript
// app/blog/[slug]/page.tsx
export const dynamic = 'force-static';

// Generate static routes at build time
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogPost({ params }) {
  const post = await getPostBySlug(params.slug);
  return <PostComponent post={post} />;
}

// In client component for navigation
'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function Navigation() {
  const router = useRouter();
  
  return (
    <nav>
      {/* Use Link for navigation when possible */}
      <Link href="/dashboard">Dashboard</Link>
      
      {/* Use router.push for programmatic navigation */}
      <button onClick={() => router.push('/settings')}>
        Settings
      </button>
    </nav>
  );
}
```

**Routing Best Practices:**

- Use App Router folder structure for routes (`app/blog/[slug]/page.tsx`)
- Implement nested layouts for code reuse (`layout.tsx`)
- Use route groups for logical organization (`(marketing)/...`)
- Add `dynamic` export to set caching behavior
- Implement proper `loading.tsx`, `error.tsx`, and `not-found.tsx` pages
- Use metadata API for SEO optimization
- Use `generateStaticParams` for IPPR (static rendering with dynamic paths)
- Prefer `Link` component over `router.push` when possible
- Use IPPR for routes with stable parameters
- Utilize catchall routes (`[...slug]`) and optional catch-all routes (`[[...slug]]`) when needed

<!-- GUIDELINE_END -->

### Error Handling <!--error-handling-->

*Robust error management for better user experience and debugging.*

```typescript
// app/dashboard/error.tsx - Error boundary
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ErrorAlert } from '@/components/ui/error-alert';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to monitoring service
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <div className="p-4">
      <ErrorAlert 
        title="Something went wrong!" 
        description="We've logged this error and will look into it."
      />
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}

// Global not-found handler
// app/not-found.tsx
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mb-4">The page you're looking for doesn't exist.</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Go home
      </Link>
    </div>
  );
}

// Route-specific not-found
// app/blog/[slug]/not-found.tsx
export default function BlogNotFound() {
  return (
    <div>
      <h1>Blog Post Not Found</h1>
      <p>Sorry, we couldn't find that blog post.</p>
      <Link href="/blog">View all blog posts</Link>
    </div>
  );
}

// Triggering not-found
import { notFound } from 'next/navigation';

export default async function BlogPost({ params }) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    // This will render the closest not-found.tsx
    notFound();
  }
  
  return <ArticleComponent post={post} />;
}
```

**Error Handling Best Practices:**

- Implement error boundaries with error.tsx files (Next.js 15.x auto-captures RSC errors)
- Use next-safe-action 5.x with structured returns for Server Actions: `{ok, data}|{error}`
- Log critical errors server-side via instrumentation or Supabase Edge Function
- Provide user-friendly error messages with recovery options
- Use early returns and guard clauses to handle edge cases
- Implement proper loading states to improve perceived performance
- Use `notFound()` for 404 scenarios with dedicated not-found.tsx pages
- Handle errors at appropriate levels of component tree (global vs. route-specific)

<!-- GUIDELINE_END -->

## TypeScript 5.8 Implementation <!--typescript-58-implementation-->

*TypeScript best practices for reliable, maintainable code.*

```typescript
// tsconfig.json example
{
  "compilerOptions": {
    "target": "es2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,  // Safer array/object access
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "node18",  // New in TS 5.8
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

// Example of proper TypeScript usage
import { z } from 'zod';
import type { ReactNode } from 'react';

// Use template literal types
type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonClassName = `btn-${ButtonVariant}-${ButtonSize}`;

// Use interfaces for component props
interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: ReactNode;
  onClick?: () => void;
}

// Zod schema for runtime validation
export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2).max(50),
  email: z.string().email(),
  role: z.enum(['admin', 'user']),
});

// Type inference from schema
export type User = z.infer<typeof UserSchema>;

// Type-safe Supabase integration
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database.types';

// Strongly-typed client
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Type-safe queries
const { data: users } = await supabase
  .from('users')
  .select('id, name, email')
  .eq('is_active', true);
```

**TypeScript Best Practices:**

- Use TypeScript for all code with strict mode enabled
- Keep "target": "es2022" in tsconfig.json
- Use decorators with `--experimentalDecorators` flag when needed
- Leverage TypeScript 5.8's improved type inference for conditional returns
- Use const type parameters for generic functions
- Use the new `--module node18` target for Node 18+ projects
- Use interfaces for public APIs and types for unions/complex types
- Implement Zod for runtime type validation and parsing
- Define proper type definitions for all components and functions
- Generate types from database schema (Supabase, Prisma)
- Use type inference where possible to reduce boilerplate
- Leverage `satisfies` operator for type checking with inference
- Avoid type assertions (`as`) when possible

<!-- GUIDELINE_END -->

## Tailwind CSS 4.1 Implementation <!--tailwind-css-41-implementation-->

*Modern utility-first styling with the latest Tailwind features.*

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  // New CSS-first config approach (Tailwind 4+)
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'oklch(0.65 0.2 240)',
          hover: 'oklch(0.6 0.2 240)',
        },
        // New oklch color format for better device consistency
      },
      containerQueries: {
        // New container query support
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
} satisfies Config

// Button component with class-variance-authority
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  "rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary-hover focus:ring-primary/50",
        secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
        ghost: "bg-transparent hover:bg-gray-100 focus:ring-gray-500",
      },
      size: {
        sm: "text-sm px-3 py-1.5",
        md: "text-base px-4 py-2",
        lg: "text-lg px-5 py-2.5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export function Button({ 
  variant, 
  size, 
  className, 
  ...props 
}: ButtonProps) {
  return (
    <button 
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
}
```

**Tailwind CSS Best Practices:**

- Use utility-first approach for most styling
- Implement mobile-first responsive design
- Migrate to CSS-first config system (Tailwind v4)
- Adopt container queries for component-based responsiveness
- Use oklch color format for more consistent color across devices
- Leverage Tailwind 4.1 new utilities:
  - `text-shadow-*` for text shadow effects
  - `mask-*` for advanced masking
  - `wrap-*` for text wrapping control
- Implement `class-variance-authority` for component variants
- Use Tailwind plugin API for custom variants (through JS config)
- Group related utilities with Tailwind's grouping selectors (`group-hover`)
- Consider Prettier plugin for Tailwind to auto-sort classes
- Create design tokens for themes and dark mode support (via CSS variables)

<!-- 🤖prompt: "Use utility-first Tailwind CSS, extract repeated patterns to components using class-variance-authority" -->

<!-- GUIDELINE_END -->

## UI Components & Accessibility <!--ui-components--accessibility-->

*Accessible, reusable UI components following WCAG standards.*

```typescript
// Accessible form input example with shadcn/ui
// components/ui/input.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  description?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, description, id, ...props }, ref) => {
    const inputId = id || `input-${React.useId()}`;
    const descriptionId = description ? `${inputId}-description` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    
    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        
        {description && (
          <p 
            id={descriptionId} 
            className="text-sm text-gray-500 mb-2"
          >
            {description}
          </p>
        )}
        
        <input
          id={inputId}
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={cn(descriptionId, errorId)}
          {...props}
        />
        
        {error && (
          <p 
            id={errorId}
            className="mt-1 text-sm text-red-500"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };

// Custom component built on Radix UI primitives
// components/ui/dialog.tsx
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

// Usage example (with custom styling and accessibility)
// components/confirmation-dialog.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function ConfirmationDialog({
  trigger,
  title,
  description,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{cancelText}</Button>
          </DialogClose>
          <Button onClick={onConfirm}>{confirmText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

**UI and Accessibility Best Practices:**

- Use Shadcn UI and Radix UI for accessible component primitives
- Ensure proper keyboard navigation and focus management
- Implement correct ARIA attributes for all interactive elements
- Use semantic HTML elements (`<button>`, `<nav>`, etc.)
- Ensure proper color contrast (WCAG AA compliance minimum, ratio ≥ 4.5:1)
- Test with screen readers and keyboard-only navigation
- Implement proper form labels and error messages
- Add descriptive alt text for images
- Use appropriate heading levels (h1-h6) in correct order
- Add `sr-only` text for icon-only buttons
- Test with reduced motion preferences
- Ensure interactive elements have sufficient size (44x44px tap targets)
- Customize shadcn/ui components to match your design system

<!-- GUIDELINE_END -->

## State Management <!--state-management-->

*Efficient state management strategies for global and component state.*

```typescript
// Zustand store for global UI state
// stores/theme-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage',
    }
  )
);

// Custom hooks to access store (recommended pattern)
export function useTheme() {
  return useThemeStore(state => state.theme);
}

export function useSetTheme() {
  return useThemeStore(state => state.setTheme);
}

// Using selectors for performance
export function useIsLightTheme() {
  // Only re-renders when result changes
  return useThemeStore(state => state.theme === 'light');
}

// Zustand store with multiple slices
// stores/app-store.ts
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface AppState {
  ui: {
    sidebarOpen: boolean;
    notifications: number;
  };
  user: {
    id: string | null;
    name: string | null;
    preferences: Record<string, unknown>;
  };
  actions: {
    toggleSidebar: () => void;
    updateUserPreference: (key: string, value: unknown) => void;
    clearNotifications: () => void;
  };
}

export const useAppStore = create<AppState>()(
  immer((set) => ({
    ui: {
      sidebarOpen: false,
      notifications: 0,
    },
    user: {
      id: null,
      name: null,
      preferences: {},
    },
    actions: {
      toggleSidebar: () => 
        set(state => {
          state.ui.sidebarOpen = !state.ui.sidebarOpen;
        }),
      updateUserPreference: (key, value) => 
        set(state => {
          state.user.preferences[key] = value;
        }),
      clearNotifications: () => 
        set(state => {
          state.ui.notifications = 0;
        }),
    },
  }))
);

// TanStack Query for server state
// hooks/use-users.ts
'use client';

import { 
  useSuspenseQuery, 
  useMutation, 
  useQueryClient 
} from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUsers(filter = '') {
  return useSuspenseQuery({
    queryKey: ['users', filter],
    queryFn: () => fetchUsers(filter),
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createUser,
    onSuccess: (newUser) => {
      // Update cache optimistically
      queryClient.setQueryData(
        ['users'], 
        (old: User[] = []) => [...old, newUser]
      );
      toast.success('User created!');
    },
    onError: (error) => {
      toast.error(`Failed to create user: ${error.message}`);
    },
  });
}
```

**State Management Best Practices:**

- Use Server Components to minimize client-side state
- For client-side state:
  - Use small, focused Zustand stores for global state
  - Use TanStack Query for server state
  - Use React's built-in hooks for component-level state
- Create custom hooks to access store state (avoids exposing internal store)
- Use atomic selectors to minimize re-renders
- Implement Zustand's middleware for persistence and devtools
- Use TanStack Query's Suspense mode for loading states
- Keep actions separate from state in store definitions
- Use server actions for mutations when possible
- Combine optimistic updates with server validation
- Structure stores as slices for better organization

<!-- GUIDELINE_END -->

## Supabase Integration <!--supabase-integration-->

*Best practices for integrating with Supabase's latest features.*

### Package Versions & Setup <!--package-versions--setup-->

*Proper setup for optimal Supabase integration with Next.js 15.x.*

```typescript
// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Database } from '@/types/database.types';

export async function createServerSupabaseClient() {
  const cookieStore = await cookies();
  
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name, options) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );
}

// lib/supabase/client.ts
'use client';

import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/database.types';

export function createClientSupabaseClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// middleware.ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value;
        },
        set(name, value, options) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name, options) {
          request.cookies.set({ name, value: '', ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  // Optional: Check auth status for protected routes
  const { data: { session } } = await supabase.auth.getSession();

  // Protected routes check
  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
```

**Key Points:**

- Use `@supabase/supabase-js@^3.43.0` for full Edge-runtime support and streaming APIs
- Use `@supabase/ssr@^0.16.0` instead of deprecated auth-helpers-nextjs for compatibility with Next.js 15's async `cookies()` API
- Access Supabase UI components from `@supabase/ui@^0.52.0`
- Generate types from your database schema for type safety
- Implement server-side and client-side Supabase instances
- Use middleware for protected routes and authentication
- Handle auth state properly in both client and server components

<!-- GUIDELINE_END -->

### Authentication & Session Management <!--authentication--session-management-->

*Implementation of middleware for authentication and protected routes.*

```typescript
// middleware.ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Create Supabase client for session handling
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value;
        },
        set(name, value, options) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          
          // Update the response as well
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name, options) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          
          // Update the response
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  // This will refresh session if expired - essential for Server Components
  const { data: { user } } = await supabase.auth.getUser();

  // Protected routes handling
  if (request.nextUrl.pathname.startsWith('/dashboard') && !user) {
    const redirectUrl = new URL('/auth/signin', request.url);
    redirectUrl.searchParams.set('redirectedFrom', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Redirect authenticated users from auth pages to dashboard
  if (
    user &&
    (request.nextUrl.pathname.startsWith('/auth/signin') ||
      request.nextUrl.pathname.startsWith('/auth/signup'))
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Validate x-middleware-subrequest header (security)
  const isSubrequest = request.headers.get('x-middleware-subrequest');
  if (isSubrequest && !['next-route', 'next-api'].includes(isSubrequest)) {
    return new NextResponse(null, { status: 403 });
  }

  return response;
}

// Configure matcher for middleware
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

// lib/utils.ts
export function encodedRedirect(
  type: 'error' | 'success',
  path: string,
  message: string,
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}
```

**Authentication Best Practices:**

- Use Supabase Auth for all authentication needs
- Implement passwordless magic links for improved security
- Offer social login options (Google, GitHub, etc.)
- Enable MFA (Multi-Factor Authentication) for sensitive applications
- Use Row-Level Security (RLS) policies on all tables
- Never expose service_role key to the client
- Implement custom claims for role-based access control
- Use Identity Linking to connect multiple providers to one account
- Implement Session Management for security
- Create auth helpers for protected routes

<!-- GUIDELINE_END -->

### Edge Functions <!--edge-functions-->

*Serverless functions for secure backend logic.*

```typescript
// Deploying Edge Functions via Supabase CLI
// supabase/functions/send-notification/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  
  try {
    const { recipientId, message } = await req.json();
    
    // Create authenticated Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );
    
    // Get user info
    const { data: userData, error: userError } = await supabaseClient
      .from('profiles')
      .select('email, notification_preferences')
      .eq('id', recipientId)
      .single();
      
    if (userError) throw userError;
      
    // Send notification logic
    const result = await sendNotification(userData.email, message);
    
    // Log activity
    await supabaseClient
      .from('notification_logs')
      .insert({
        recipient_id: recipientId,
        message: message,
        status: 'sent',
      });
    
    return new Response(
      JSON.stringify({ success: true, data: result }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});

// Client-side or Server Component calling Edge Function
const callFunction = async (payload) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_SUPABASE_FUNCTION_URL,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify(payload)
    }
  );
  return response.json();
};
```

**Edge Functions Best Practices:**

- Use Edge Functions for serverless backend logic
- Deploy Deno 2.1-based functions directly from Supabase Dashboard
- Set environment variables in the Supabase UI
- Implement proper authentication and authorization
- Use for intensive operations (PDF generation, email sending)
- Leverage webhooks to trigger Edge Functions (e.g., on database changes)
- Implement proper error handling and logging
- Set CORS headers for browser access
- Use TypeScript for type safety
- Access database through authenticated client

<!-- GUIDELINE_END -->

### Realtime & Presence <!--realtime--presence-->

*Real-time data synchronization and user presence.*

```typescript
// Realtime subscriptions
'use client';

import { useEffect, useState } from 'react';
import { createClientSupabaseClient } from '@/lib/supabase/client';

export function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState({});
  const supabase = createClientSupabaseClient();
  
  useEffect(() => {
    // Subscribe to new messages
    const channel = supabase
      .channel(`room:${roomId}`)
      // Listen for changes to messages table
      .on(
        'postgres_changes',
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages',
          filter: `room_id=eq.${roomId}`
        },
        (payload) => {
          setMessages(prev => [...prev, payload.new]);
        }
      )
      // Track user presence
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        setUsers(state);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          // Track user presence on this channel
          await channel.track({
            user_id: supabase.auth.user().id,
            username: supabase.auth.user().user_metadata.username,
            online_at: new Date().toISOString(),
          });
        }
      });
    
    // Cleanup subscription
    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId, supabase]);
  
  return (
    <div>
      <div className="user-list">
        {Object.values(users).map(userPresence => (
          <div key={userPresence.user_id}>
            {userPresence.username} - Online
          </div>
        ))}
      </div>
      
      <div className="messages">
        {messages.map(message => (
          <div key={message.id}>
            {message.content}
          </div>
        ))}
      </div>
    </div>
  );
}

// Broadcast example
'use client';

import { useEffect } from 'react';
import { createClientSupabaseClient } from '@/lib/supabase/client';

export function CollaborativeEditor({ documentId }) {
  const supabase = createClientSupabaseClient();
  
  useEffect(() => {
    const channel = supabase
      .channel(`document:${documentId}`)
      // Listen for cursor movements from other users
      .on('broadcast', { event: 'cursor-move' }, (payload) => {
        updateCursorPosition(payload.userId, payload.position);
      })
      .subscribe();
    
    const handleMouseMove = (e) => {
      // Broadcast cursor position to other users
      channel.send({
        type: 'broadcast',
        event: 'cursor-move',
        payload: {
          userId: supabase.auth.user().id,
          position: { x: e.clientX, y: e.clientY },
        },
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      supabase.removeChannel(channel);
    };
  }, [documentId, supabase]);
  
  return <div>Collaborative Editor</div>;
}
```

**Realtime Best Practices:**

- Use Postgres Changes to subscribe to database updates
- Implement Presence for tracking online users
- Use Broadcast for ephemeral messages (like cursor positions)
- Set up proper RLS policies for realtime security
- Use PostgreSQL triggers for server-initiated broadcasts
- Implement clean subscription cleanup in useEffect returns
- Use channel name conventions to organize subscriptions
- Combine with optimistic UI updates for responsive experience
- Consider rate limiting for high-frequency events

<!-- GUIDELINE_END -->

### Storage Optimization <!--storage-optimization-->

*Efficient storage and delivery of user-uploaded content.*

```typescript
// components/file-upload.client.tsx
'use client';

import { useState } from 'react';
import { createClientSupabaseClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

interface FileUploadProps {
  bucket: string;
  path?: string;
  onUploadComplete?: (url: string) => void;
  acceptedFileTypes?: string;
  maxSize?: number; // in MB
}

export function FileUpload({
  bucket,
  path = '',
  onUploadComplete,
  acceptedFileTypes = '*',
  maxSize = 10, // Default 10MB
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientSupabaseClient();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFile(null);
      return;
    }
    
    const selectedFile = e.target.files[0];
    
    // Check file size
    if (selectedFile.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds the maximum limit of ${maxSize}MB`);
      setFile(null);
      return;
    }
    
    setFile(selectedFile);
    setError(null);
  };
  
  const handleUpload = async () => {
    if (!file) return;
    
    try {
      setUploading(true);
      setProgress(0);
      
      // Generate a unique filename
      const fileExt = file.name.split('.').pop();
      const filePath = `${path}${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      // Upload the file with progress tracking
      const { error: uploadError, data } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          onUploadProgress: (progress) => {
            const percent = Math.round((progress.loaded / progress.total) * 100);
            setProgress(percent);
          },
        });
        
      if (uploadError) throw uploadError;
      
      // Get public URL for the uploaded file
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);
        
      // Call the completion callback with the URL
      onUploadComplete?.(publicUrl);
      
      // Reset the file input
      setFile(null);
    } catch (error: any) {
      console.error('Error uploading file:', error.message);
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <Input
        type="file"
        accept={acceptedFileTypes}
        onChange={handleFileChange}
        disabled={uploading}
      />
      
      {file && (
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">
            {file.name} ({(file.size / (1024 * 1024)).toFixed(2)}MB)
          </span>
          <Button
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </Button>
        </div>
      )}
      
      {uploading && (
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <span className="text-xs text-gray-500">{progress}% complete</span>
        </div>
      )}
      
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

// Server component to handle user avatar updates
// app/dashboard/profile/avatar-uploader.tsx
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { FileUpload } from '@/components/file-upload.client';
import { revalidatePath } from 'next/cache';

export default async function AvatarUploader({ userId }: { userId: string }) {
  const supabase = await createServerSupabaseClient();
  
  // Server action to update the user's profile with the avatar URL
  async function updateAvatar(formData: FormData) {
    'use server';
    
    const avatarUrl = formData.get('avatarUrl') as string;
    if (!avatarUrl) return;
    
    const supabase = await createServerSupabaseClient();
    
    await supabase
      .from('profiles')
      .update({ avatar_url: avatarUrl })
      .eq('id', userId);
      
    // Revalidate the profile page to show the updated avatar
    revalidatePath('/dashboard/profile');
  }
  
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-medium mb-4">Update Avatar</h3>
      
      <form action={updateAvatar}>
        <input type="hidden" name="avatarUrl" id="avatarUrl" />
        
        <FileUpload
          bucket="avatars"
          path={`${userId}/`}
          acceptedFileTypes="image/png, image/jpeg, image/gif"
          maxSize={2} // 2MB
          onUploadComplete={(url) => {
            // Set the hidden input value to the uploaded file URL
            document.getElementById('avatarUrl').value = url;
            
            // Submit the form with the URL
            document.querySelector('form')?.requestSubmit();
          }}
        />
      </form>
    </div>
  );
}

// Using signed URLs for private files
// utils/storage.ts
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function getSignedUrl(bucket: string, filePath: string, expiresIn = 60) {
  const supabase = await createServerSupabaseClient();
  
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(filePath, expiresIn);
    
  if (error) throw error;
  
  return data.signedUrl;
}
```

```

**Storage Best Practices:**
- Implement bucket-specific security with RLS policies
- Enable CDN for public files for faster global delivery
- Use signed URLs for private file access with expiration
- Set appropriate cacheControl directives
- Organize files by user ID for simpler access control
- Use proper content-type and metadata
- Implement client-side image resizing before upload when possible
- Use transformations for image optimization (resize, crop)
- Set upload limits to prevent abuse
- Create appropriate storage triggers for automated image processing

<!-- GUIDELINE_END -->

### Declarative Schemas & Migrations <!--declarative-schemas--migrations-->
*Version-controlled database schema management.*

```bash
# Initialize Supabase project with type generation
supabase init
supabase start

# Create a new migration
supabase migration new add_profiles_table

# Edit the migration file in supabase/migrations/timestamp_add_profiles_table.sql
```

```sql
-- supabase/migrations/timestamp_add_profiles_table.sql

-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create RLS policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by everyone"
ON profiles
FOR SELECT
USING (true);

CREATE POLICY "Users can update their own profile"
ON profiles
FOR UPDATE
USING (auth.uid() = id);

-- Create trigger to set updated_at on update
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_updated_at();

-- Create function for user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'username',
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();
```

```bash
# Apply migrations locally
supabase migration up

# Create types from database
supabase gen types typescript --local > types/database.types.ts

# Deploy to production
supabase db push
```

**Schema Management Best Practices:**

- Write migrations in SQL (not UI clicks) for source-control
- Use `supabase migration new` to create migration files
- Store migration files in Git repository
- Hook migrations into CI/CD for consistent DB state
- Generate TypeScript types from database schema
- Create helper functions in PostgreSQL for complex operations
- Use triggers for automatic data management
- Design schemas with RLS in mind from the beginning
- Use declarative RLS policies in migrations
- Document database schema changes

<!-- GUIDELINE_END -->

### Advanced Features <!--advanced-features-->

*Cutting-edge Supabase capabilities for enhanced functionality.*

```typescript
// Vector similarity search for AI features
// SQL setup
/*
-- Enable vector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create documents table with vector column
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  embedding VECTOR(1536) NOT NULL
);

-- Create function to generate embeddings
CREATE OR REPLACE FUNCTION generate_embedding(content TEXT)
RETURNS VECTOR
LANGUAGE plpgsql
AS $$
DECLARE
  embedding VECTOR;
BEGIN
  -- Call external embedding service (e.g., OpenAI)
  -- This is simplified; in reality you'd use pgrouter or http extension
  SELECT openai_embedding(content) INTO embedding;
  RETURN embedding;
END;
$$;

-- Create trigger to automatically generate embeddings
CREATE TRIGGER documents_embedding_trigger
BEFORE INSERT OR UPDATE ON documents
FOR EACH ROW
EXECUTE FUNCTION set_embedding_from_content();
*/

// Semantic search function
async function semanticSearch(query, limit = 5) {
  const supabase = createServerSupabaseClient();
  
  // Get embedding for query (via external API/Edge Function)
  const { data: queryEmbedding } = await supabase.functions.invoke(
    'generate-embedding',
    { body: { text: query } }
  );
  
  // Search using vector similarity
  const { data: documents, error } = await supabase.rpc(
    'match_documents',
    {
      query_embedding: queryEmbedding,
      match_threshold: 0.7,
      match_count: limit
    }
  );
  
  if (error) throw error;
  
  return documents;
}

// GraphQL API using pg_graphql extension
// Client-side GraphQL query
const fetchUserWithPosts = async (userId) => {
  const supabase = createClientSupabaseClient();
  
  const { data, error } = await supabase.graphql.query(`
    query GetUserWithPosts($userId: UUID!) {
      userCollection(filter: { id: { eq: $userId } }) {
        edges {
          node {
            id
            username
            full_name
            postsCollection {
              edges {
                node {
                  id
                  title
                  content
                  created_at
                }
              }
            }
          }
        }
      }
    }
  `, {
    variables: {
      userId
    }
  });
  
  if (error) throw error;
  
  return data.userCollection.edges[0]?.node;
};
```

**Advanced Features Best Practices:**

- Use **Vector Embeddings** for AI-powered search
- Implement **pg_graphql** for automatic GraphQL API generation
- Leverage **Foreign Data Wrappers** to access external data sources
- Use **Postgres Functions** for complex server-side logic
- Implement **Row Level Security** with dynamic policies
- Use **WebHooks** to trigger external services on database changes
- Implement **Materialized Views** for complex reporting
- Use **Database Replicas** for read-heavy workloads
- Leverage **Supabase Auth** advanced features like MFA and SSO
- Implement **Recursive Queries** for hierarchical data

<!-- GUIDELINE_END -->

## Performance Optimization <!--performance-optimization-->

*Strategies for achieving optimal Core Web Vitals and user experience.*

### Core Web Vitals Targets (2025)

| Metric | Target | Tips |
|--------|--------|------|
| INP (replaced FID in Mar 2024) | < 200 ms | Avoid long JS tasks; split Client bundles; use React Compiler |
| LCP | < 2.5 s | Optimize hero images via next/image w/ priority |
| CLS | < 0.1 | Reserve space; use size="*" |

```typescript
// Image optimization with next/image
import Image from 'next/image';

export function HeroSection() {
  return (
    <div className="relative h-96 w-full">
      <Image
        src="/hero.jpg"
        alt="Hero image"
        fill
        sizes="100vw"
        priority={true} // LCP optimization
        className="object-cover"
        placeholder="blur" // Reduces CLS
        blurDataURL="data:image/jpeg;base64,iVBORw0KGgo..." // Base64 placeholder
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Welcome</h1>
      </div>
    </div>
  );
}

// Prevent CLS with skeleton loading
export function ProductCardSkeleton() {
  return (
    <div className="border rounded-lg p-4 animate-pulse">
      <div className="w-full h-48 bg-gray-200 mb-4" /> {/* Image placeholder */}
      <div className="h-6 bg-gray-200 w-3/4 mb-2" /> {/* Title placeholder */}
      <div className="h-4 bg-gray-200 w-1/2 mb-4" /> {/* Price placeholder */}
      <div className="h-10 bg-gray-200 w-full" /> {/* Button placeholder */}
    </div>
  );
}

// Streaming Server Components with Suspense
export default function ProductsPage() {
  return (
    <div>
      <h1>Products</h1>
      <Suspense fallback={<ProductsGridSkeleton />}>
        <ProductsGrid />
      </Suspense>
    </div>
  );
}

// Optimize long lists with windowing
'use client';

import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

export function VirtualizedList({ items }) {
  const parentRef = useRef(null);
  
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50, // px height per row
  });
  
  return (
    <div 
      ref={parentRef} 
      className="h-[500px] overflow-auto"
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map(item => (
          <div
            key={items[item.index].id}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${item.size}px`,
              transform: `translateY(${item.start}px)`,
            }}
          >
            {items[item.index].name}
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Performance Optimization Best Practices:**

- Enable React Compiler for automatic optimizations
- Use `<script async="true">` for streaming helpers
- Implement image optimization with next/image
- Set `priority={true}` for LCP images
- Use route-based code splitting with dynamic imports
- Implement proper loading patterns with Suspense
- Enable IPPR using generateStaticParams for dynamic pages with stable segments
- Use virtualization for long lists (TanStack Virtual)
- Implement staggered loading for non-critical content
- Set explicit cache settings for all fetch calls
- Use Next.js Font Optimization to avoid layout shifts
- Properly size images with `sizes` attribute
- Preload critical resources with `<link rel="preload">`
- Defer non-critical JavaScript
- Use streaming server components for progressive rendering

<!-- 🤖prompt: "Optimize Core Web Vitals: optimize LCP by using next/image with priority, minimize INP by using React Compiler, prevent CLS by reserving space" -->

<!-- GUIDELINE_END -->

## Testing & CI/CD <!--testing--cicd-->

*Comprehensive testing strategies for reliable applications.*

```typescript
// Unit test example with Vitest
// components/button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './button';

describe('Button component', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });
  
  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('renders disabled state correctly', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});

// Server Component test
// app/dashboard/page.test.tsx
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render } from '@testing-library/react';
import DashboardPage from './page';

// Mock data fetching
vi.mock('@/lib/data', () => ({
  fetchDashboardData: vi.fn().mockResolvedValue({
    stats: { total: 100, active: 75 },
    recentActivity: [{ id: 1, action: 'login' }]
  })
}));

describe('DashboardPage', () => {
  it('renders dashboard with fetched data', async () => {
    const { findByText } = render(await DashboardPage());
    
    expect(await findByText('Active: 75')).toBeInTheDocument();
    expect(await findByText('login')).toBeInTheDocument();
  });
});

// Middleware test
// middleware.test.ts
import { describe, it, expect, vi } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import { middleware } from './middleware';

describe('Middleware', () => {
  it('redirects unauthenticated users from protected routes', async () => {
    // Mock supabase auth
    vi.mock('@supabase/ssr', () => ({
      createServerClient: vi.fn().mockImplementation(() => ({
        auth: {
          getSession: vi.fn().mockResolvedValue({
            data: { session: null }
          })
        }
      }))
    }));
    
    const request = new NextRequest(
      new URL('https://example.com/dashboard')
    );
    
    const response = await middleware(request);
    
    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe('https://example.com/login');
  });
});
```

**Testing Best Practices:**

- Use Vitest for unit and integration tests
- Use Jest 32 with ESM support when needed
- Use "jest-environment-edge" when testing middleware
- Use React Testing Library for component tests
- Use Playwright for E2E tests
- Test Server Components with mocked data fetching
- Test error states and edge cases
- Implement visual regression testing when needed
- Use MSW (Mock Service Worker) for API mocking
- Run tests in CI/CD pipelines

<!-- GUIDELINE_END -->

### Automated E2E Testing <!--automated-e2e-testing-->

*End-to-end testing for critical user flows.*

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['junit', { outputFile: 'test-results/junit.xml' }]
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
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
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});

// e2e/auth.spec.ts
import { test, expect } from '@playwright/test';
import { generateRandomEmail } from './utils';

test.describe('Authentication flow', () => {
  test('signup and login flow', async ({ page }) => {
    const email = generateRandomEmail();
    const password = 'SecurePassword123!';
    
    // Sign up
    await page.goto('/signup');
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.fill('input[name="confirmPassword"]', password);
    await page.click('button[type="submit"]');
    
    // Wait for redirect after signup
    await page.waitForURL('/dashboard');
    
    // Check that we're logged in
    await expect(page.locator('text=Welcome')).toBeVisible();
    
    // Logout
    await page.click('button:has-text("Logout")');
    await page.waitForURL('/login');
    
    // Login
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
    
    // Wait for redirect after login
    await page.waitForURL('/dashboard');
    
    // Check that we're logged in again
    await expect(page.locator('text=Welcome')).toBeVisible();
  });
});
```

**E2E Testing Best Practices:**

- Use Playwright for cross-browser testing
- Test critical user flows (auth, checkout, forms)
- Run tests against multiple browsers and viewport sizes
- Use test fixtures for common setup/teardown
- Implement proper waiting strategies
- Use screenshots and videos for failure debugging
- Run E2E tests in CI on PRs
- Set up test data through API calls or DB seeding
- Keep tests independent from each other
- Use data-testid attributes for stable selectors

<!-- GUIDELINE_END -->

### Lighthouse CI for Performance Budgets <!--lighthouse-ci-for-performance-budgets-->

*Automated performance monitoring in CI/CD pipelines.*

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push, pull_request]
jobs:
  lighthouse:
    name: Lighthouse
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build project
        run: npm run build
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            https://staging-url.com/
            https://staging-url.com/products
            https://staging-url.com/about
          budgetPath: ./lighthouse-budget.json
          uploadArtifacts: true
          temporaryPublicStorage: true

# lighthouse-budget.json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.9}],
        "categories:best-practices": ["error", {"minScore": 0.9}],
        "categories:seo": ["error", {"minScore": 0.9}],
        "first-contentful-paint": ["error", {"maxNumericValue": 2000}],
        "largest-contentful-paint": ["error", {"maxNumericValue": 2500}],
        "cumulative-layout-shift": ["error", {"maxNumericValue": 0.1}],
        "interactive": ["error", {"maxNumericValue": 3500}],
        "max-potential-fid": ["error", {"maxNumericValue": 200}],
        "server-response-time": ["error", {"maxNumericValue": 200}],
        "total-blocking-time": ["error", {"maxNumericValue": 300}]
      }
    }
  }
}
```performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.9}],
        "categories:best-practices": ["error", {"minScore": 0.9}],
        "categories:seo": ["error", {"minScore": 0.9}],
        "first-contentful-paint": ["error", {"maxNumericValue": 2000}],
        "largest-contentful-paint": ["error", {"maxNumericValue": 2500}],
        "cumulative-layout-shift": ["error", {"maxNumericValue": 0.1}],
        "interactive": ["error", {"maxNumericValue": 3500}],
        "max-potential-fid": ["error", {"maxNumericValue": 200}],
        "server-response-time": ["error", {"maxNumericValue": 200}],
        "total-blocking-time": ["error", {"maxNumericValue": 300}]
      }
    }
  }
}
