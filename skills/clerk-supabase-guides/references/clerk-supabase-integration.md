# Clerk + Supabase Integration Guide (August 2025)

This guide shows you how to integrate Clerk as a third-party authentication provider with Supabase using the latest patterns for Next.js App Router, covering both the native integration approach and advanced implementation details.

## Important Updates (August 2025)

- **Supabase**: Uses `@supabase/supabase-js` directly (no `@supabase/ssr` needed when using Clerk)
- **Clerk**: Native third-party auth provider integration (JWT templates deprecated as of April 2025)
- **Next.js**: Full support for App Router with Server Components and Server Actions

## Prerequisites

- Clerk account and application
- Supabase project
- Next.js 13+ application with App Router
- Basic understanding of React Server Components and JWT tokens

## Overview

The integration uses Clerk's native third-party auth provider feature, which automatically adds the `role: "authenticated"` claim required by Supabase. This allows Clerk-authenticated users to access Supabase resources through Row Level Security (RLS) policies that validate against JWT claims.

**Key Difference**: We use `@supabase/supabase-js` directly, NOT `@supabase/ssr`, because Clerk handles authentication state, not Supabase's cookie-based auth.

## Step 1: Installation

```bash
npm install @clerk/nextjs @supabase/supabase-js
```

Note: We're intentionally NOT installing `@supabase/ssr` because Clerk manages authentication state.

## Step 2: Configure Third-Party Auth Provider

### Clerk Dashboard Configuration

1. Navigate to [Clerk Supabase integration setup](https://dashboard.clerk.com/setup/supabase)
2. Click **Activate Supabase integration**
3. Copy the **Clerk domain** (format: `https://[your-instance].clerk.accounts.dev`)

This native integration automatically adds the required `role: "authenticated"` claim to your Clerk session tokens.

### Supabase Dashboard Configuration

1. Go to **Authentication > Sign In / Up** in your Supabase dashboard
2. Click **Add provider**
3. Select **Clerk** from the provider list
4. Paste the Clerk domain from above
5. Click **Create connection**

### Local Development Configuration

Add this to your `supabase/config.toml` file:

```toml
[auth.third_party.clerk]
enabled = true
domain = "https://your-app.clerk.accounts.dev"
```

## Step 3: Environment Variables

```env
# .env.local

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[your-project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

Get these values:

- **Clerk keys**: Clerk Dashboard → API Keys
- **Supabase URL/Key**: Supabase Dashboard → Project Settings → API

## Step 4: Clerk Provider Setup

```typescript
// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
```

## Step 5: Clerk Middleware

```typescript
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/tasks(.*)',
  '/api/protected(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
```

## Step 6: Supabase Client Utilities

### Client-Side Supabase Client

```typescript
// lib/supabase/client.ts
'use client'

import { createClient } from '@supabase/supabase-js'
import { useSession } from '@clerk/nextjs'

export function useSupabaseClient() {
  const { session } = useSession()
  
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        fetch: async (url, options = {}) => {
          const clerkToken = await session?.getToken()
          
          const headers = new Headers(options?.headers)
          if (clerkToken) {
            headers.set('Authorization', `Bearer ${clerkToken}`)
          }
          
          return fetch(url, {
            ...options,
            headers,
          })
        },
      },
    }
  )
}
```

### Server-Side Supabase Client

```typescript
// lib/supabase/server.ts
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'

export async function createServerClient() {
  const { getToken } = await auth()
  const token = await getToken()
  
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        fetch: async (url, options = {}) => {
          const headers = new Headers(options?.headers)
          if (token) {
            headers.set('Authorization', `Bearer ${token}`)
          }
          
          return fetch(url, {
            ...options,
            headers,
          })
        },
      },
    }
  )
}
```

## Step 7: Database Setup with RLS

### Create Table with User Association

```sql
-- Create table with user_id that defaults to Clerk user ID
CREATE TABLE tasks (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  is_done BOOLEAN DEFAULT false,
  user_id TEXT NOT NULL DEFAULT (auth.jwt()->>'sub'),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
```

### Create RLS Policies

```sql
-- Basic user isolation policies
CREATE POLICY "Users can view own tasks" 
  ON tasks FOR SELECT 
  TO authenticated 
  USING ((auth.jwt()->>'sub') = user_id);

CREATE POLICY "Users can insert own tasks" 
  ON tasks FOR INSERT 
  TO authenticated 
  WITH CHECK ((auth.jwt()->>'sub') = user_id);

CREATE POLICY "Users can update own tasks" 
  ON tasks FOR UPDATE 
  TO authenticated 
  USING ((auth.jwt()->>'sub') = user_id)
  WITH CHECK ((auth.jwt()->>'sub') = user_id);

CREATE POLICY "Users can delete own tasks" 
  ON tasks FOR DELETE 
  TO authenticated 
  USING ((auth.jwt()->>'sub') = user_id);
```

## Step 8: TypeScript Support

Generate types for your database:

```bash
npx supabase gen types typescript --project-id [your-project-ref] > lib/database.types.ts
```

Update your client utilities with types:

```typescript
// lib/supabase/server.ts (updated)
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/lib/database.types'

export async function createServerClient() {
  const { getToken } = await auth()
  const token = await getToken()
  
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        fetch: async (url, options = {}) => {
          const headers = new Headers(options?.headers)
          if (token) {
            headers.set('Authorization', `Bearer ${token}`)
          }
          
          return fetch(url, {
            ...options,
            headers,
          })
        },
      },
    }
  )
}
```

## Step 9: Implementation Examples

### Client Component (React 19/Next.js 15 Patterns)

```typescript
// components/TaskList.tsx
'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useSupabaseClient } from '@/lib/supabase/client'

interface Task {
  id: number
  name: string
  is_done: boolean
  user_id: string
  created_at: string
  updated_at: string
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user, isLoaded } = useUser()
  const supabase = useSupabaseClient()

  useEffect(() => {
    if (!isLoaded || !user) return
    loadTasks()
  }, [user, isLoaded])

  async function loadTasks() {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setTasks(data || [])
    } catch (err) {
      console.error('Error loading tasks:', err)
      setError(err instanceof Error ? err.message : 'Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }

  async function addTask(formData: FormData) {
    const name = formData.get('name') as string
    if (!name?.trim()) return

    try {
      const { error } = await supabase
        .from('tasks')
        .insert({ name: name.trim() })
      
      if (error) throw error
      await loadTasks()
    } catch (err) {
      console.error('Error adding task:', err)
      setError(err instanceof Error ? err.message : 'Failed to add task')
    }
  }

  async function toggleTask(taskId: number, isDone: boolean) {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ is_done: isDone })
        .eq('id', taskId)
      
      if (error) throw error
      await loadTasks()
    } catch (err) {
      console.error('Error updating task:', err)
      setError(err instanceof Error ? err.message : 'Failed to update task')
    }
  }

  async function deleteTask(taskId: number) {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId)
      
      if (error) throw error
      await loadTasks()
    } catch (err) {
      console.error('Error deleting task:', err)
      setError(err instanceof Error ? err.message : 'Failed to delete task')
    }
  }

  if (!isLoaded) return <div>Loading authentication...</div>
  if (!user) return <div>Please sign in to view tasks</div>
  
  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form action={addTask} className="flex gap-2">
        <input
          name="name"
          type="text"
          placeholder="Add a new task"
          className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button 
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Task
        </button>
      </form>

      {loading ? (
        <div>Loading tasks...</div>
      ) : (
        <ul className="space-y-2">
          {tasks.length === 0 ? (
            <li className="text-gray-500">No tasks found. Add one above!</li>
          ) : (
            tasks.map(task => (
              <li key={task.id} className="flex items-center gap-3 p-3 border rounded">
                <input
                  type="checkbox"
                  checked={task.is_done}
                  onChange={(e) => toggleTask(task.id, e.target.checked)}
                  className="w-4 h-4"
                />
                <span className={`flex-1 ${task.is_done ? 'line-through text-gray-500' : ''}`}>
                  {task.name}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}
```

### Server Component

```typescript
// app/tasks/page.tsx
import { auth, currentUser } from '@clerk/nextjs/server'
import { createServerClient } from '@/lib/supabase/server'
import TaskList from '@/components/TaskList'

export default async function TasksPage() {
  const { userId } = await auth()
  const user = await currentUser()
  
  if (!userId) {
    return (
      <div className="p-6">
        <h1>Please sign in to view tasks</h1>
      </div>
    )
  }

  const supabase = await createServerClient()
  const { data: tasks, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching tasks:', error)
    return (
      <div className="p-6">
        <h1>Error loading tasks</h1>
        <p className="text-red-600">{error.message}</p>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Welcome, {user?.firstName || 'User'}!
      </h1>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Server-rendered tasks:</h2>
        <ul className="space-y-1">
          {tasks?.map(task => (
            <li key={task.id} className="flex items-center gap-2">
              <span>{task.is_done ? '✅' : '⏳'}</span>
              <span className={task.is_done ? 'line-through text-gray-500' : ''}>
                {task.name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t pt-6">
        <h2 className="text-lg font-semibold mb-4">Interactive task manager:</h2>
        <TaskList />
      </div>
    </div>
  )
}
```

### Server Actions

```typescript
// app/actions/tasks.ts
'use server'

import { auth } from '@clerk/nextjs/server'
import { createServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createTask(name: string) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  const supabase = await createServerClient()
  const { error } = await supabase
    .from('tasks')
    .insert({ name: name.trim() })

  if (error) throw error
  revalidatePath('/tasks')
}

export async function updateTask(id: number, updates: Partial<{ name: string; is_done: boolean }>) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  const supabase = await createServerClient()
  const { error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', id)

  if (error) throw error
  revalidatePath('/tasks')
}

export async function deleteTask(id: number) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  const supabase = await createServerClient()
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)

  if (error) throw error
  revalidatePath('/tasks')
}

// Batch operations example
export async function markAllTasksComplete() {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  const supabase = await createServerClient()
  const { error } = await supabase
    .from('tasks')
    .update({ is_done: true })
    .eq('user_id', userId)
    .eq('is_done', false)

  if (error) throw error
  revalidatePath('/tasks')
}
```

## Step 10: Advanced Features

### Multi-Tenancy with Organizations

For B2B applications using Clerk Organizations:

```sql
-- Helper function to get the appropriate owner ID
CREATE OR REPLACE FUNCTION requesting_owner_id() 
RETURNS TEXT 
LANGUAGE SQL 
STABLE 
AS $$
  SELECT COALESCE(
    (auth.jwt()->'o'->>'id')::text,  -- Organization ID if present
    (auth.jwt()->>'sub')::text        -- User ID as fallback
  );
$$;

-- Updated table schema for organization support
ALTER TABLE tasks ADD COLUMN organization_id TEXT;
ALTER TABLE tasks ADD COLUMN owner_id TEXT NOT NULL DEFAULT requesting_owner_id();

-- Organization-aware policies
CREATE POLICY "Access based on ownership" 
  ON tasks FOR ALL 
  TO authenticated 
  USING (requesting_owner_id() = owner_id);

-- Organization admin policies
CREATE POLICY "Organization admins have full access"
  ON tasks FOR ALL
  TO authenticated
  USING (
    (auth.jwt()->>'org_role') = 'org:admin' AND
    organization_id = (auth.jwt()->'o'->>'id')::text
  );
```

### Second Factor Authentication Requirements

```sql
-- Policy requiring 2FA for sensitive operations
CREATE POLICY "Require 2FA for sensitive data"
  ON sensitive_table
  AS RESTRICTIVE
  FOR ALL
  TO authenticated
  USING (
    (auth.jwt()->'fva'->>1) != '-1'
  );
```

### Real-time Subscriptions

```typescript
// hooks/useRealtimeTasks.ts
'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useSupabaseClient } from '@/lib/supabase/client'

export function useRealtimeTasks() {
  const [tasks, setTasks] = useState<any[]>([])
  const { user } = useUser()
  const supabase = useSupabaseClient()

  useEffect(() => {
    if (!user) return

    // Initial load
    loadTasks()

    // Set up real-time subscription
    const subscription = supabase
      .channel('tasks')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tasks',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log('Real-time update:', payload)
          loadTasks() // Reload tasks on any change
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [user])

  async function loadTasks() {
    const { data } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })
    
    setTasks(data || [])
  }

  return { tasks, loadTasks }
}
```

## Step 11: Testing and Debugging

### Test User Isolation

1. Sign up/in as User A and create tasks
2. Sign out and sign up/in as User B
3. Verify User B cannot see User A's tasks
4. Create tasks as User B
5. Switch back to User A and verify isolation

### Debug Common Issues

```typescript
// Debug helper function
export async function debugAuth() {
  const { userId, sessionId, getToken } = await auth()
  const token = await getToken()
  
  console.log('Auth Debug:', {
    userId,
    sessionId,
    hasToken: !!token,
    tokenClaims: token ? JSON.parse(atob(token.split('.')[1])) : null
  })
}
```

**Common Issues:**

- **No data visible**: Verify RLS is enabled and policies allow SELECT
- **Authentication errors**: Check Clerk domain configuration in Supabase
- **Token issues**: Ensure native integration is activated in Clerk
- **Policy violations**: Test policies in Supabase SQL editor

### Error Handling Patterns

```typescript
// Enhanced error handling utility
export async function safeSupabaseOperation<T>(
  operation: () => Promise<{ data: T | null; error: any }>,
  context?: string
): Promise<T> {
  try {
    const { data, error } = await operation()
    
    if (error) {
      // Log error details for debugging
      console.error(`Supabase error${context ? ` in ${context}` : ''}:`, {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      })
      
      // Provide user-friendly error messages
      if (error.code === 'PGRST116') {
        throw new Error('Access denied: insufficient permissions')
      }
      if (error.code === '23505') {
        throw new Error('This record already exists')
      }
      throw new Error(`Database error: ${error.message}`)
    }
    
    if (!data) {
      throw new Error('No data returned from operation')
    }
    
    return data
  } catch (error) {
    console.error(`Operation failed${context ? ` in ${context}` : ''}:`, error)
    throw error
  }
}
```

## Step 12: Production Considerations

### Security Best Practices

- Always enable RLS on tables containing user data
- Use restrictive policies for sensitive operations  
- Validate organization membership in RLS policies
- Never expose service role keys in client code
- Consider rate limiting for API routes

### Performance Optimization

```sql
-- Index commonly queried columns
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_created_at ON tasks(created_at DESC);
CREATE INDEX idx_tasks_organization_id ON tasks(organization_id) WHERE organization_id IS NOT NULL;

-- Composite indexes for complex queries
CREATE INDEX idx_tasks_user_status ON tasks(user_id, is_done);
```

### Monitoring and Logging

```typescript
// lib/monitoring.ts
export function logSupabaseOperation(
  operation: string,
  userId: string,
  metadata?: Record<string, any>
) {
  console.log('Supabase Operation:', {
    operation,
    userId,
    timestamp: new Date().toISOString(),
    ...metadata
  })
}
```

## Key Differences from Standard Supabase SSR

1. **No cookie management**: Clerk handles all authentication state
2. **Token passing**: We pass Clerk's JWT token in the Authorization header
3. **No middleware refresh**: Clerk's middleware handles session refresh
4. **Simpler client creation**: No need for complex cookie management
5. **Direct JWT access**: Use `auth.jwt()` in RLS policies, not `auth.uid()`

## Common Pitfalls to Avoid

1. **Don't use `@supabase/ssr`'s cookie functions** - Clerk manages auth state
2. **Don't use `auth.uid()`** in RLS policies - use `auth.jwt()->>'sub'`
3. **Always await `auth()` and `getToken()`** in server components
4. **Don't expose service role keys** - only use anon keys in client code
5. **Don't assume session is immediately available** - check `isLoaded` in client components

## Migration from JWT Templates

If migrating from the deprecated JWT template approach:

1. Enable the native Clerk Supabase integration
2. Update client code to use session tokens instead of custom JWTs
3. Remove JWT templates from Clerk dashboard
4. Test thoroughly before production deployment

The native integration provides better security and performance compared to JWT templates, eliminating the need to share JWT secrets and reducing token generation latency.

## Conclusion

This integration combines Clerk's authentication features with Supabase's database capabilities using the latest patterns for Next.js App Router. The native integration approach is secure, performant, and eliminates many of the complexities associated with manual JWT management while providing full support for both client-side and server-side data access patterns.
