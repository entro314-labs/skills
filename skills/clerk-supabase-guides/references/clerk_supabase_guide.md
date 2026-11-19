# Clerk + Supabase Integration Reference Guide

## Overview

This guide covers integrating Clerk authentication with Supabase databases using the native third-party auth provider approach (recommended) and webhook-based data synchronization.

## Initial Setup

### 1. Configure Clerk as Supabase Third-Party Provider

**In Clerk Dashboard:**

1. Navigate to [Supabase integration setup](https://dashboard.clerk.com/setup/supabase)
2. Select configuration options and click "Activate Supabase integration"
3. Copy the revealed Clerk domain

**In Supabase Dashboard:**

1. Go to Authentication > Sign In / Up
2. Click "Add provider" and select "Clerk"
3. Paste the Clerk domain from step above

### 2. Local Development Setup

Add to `supabase/config.toml`:

```toml
[auth.third_party.clerk]
enabled = true
domain = "example.clerk.accounts.dev"
```

### 3. Manual Configuration (Alternative)

If automatic setup unavailable:

1. Add `role` claim to Clerk session tokens via customization
2. Set authenticated users to have `"role": "authenticated"` claim
3. Add Third-Party Auth integration in Supabase dashboard

## Environment Variables

Add to `.env`:

```env
SUPABASE_URL=your_project_url
SUPABASE_KEY=your_anon_public_key
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_KEY=your_anon_public_key
```

Get these from Supabase dashboard > Project Settings > Data API.

## Install Dependencies

```bash
npm i @supabase/supabase-js
# or
yarn add @supabase/supabase-js
```

## Row Level Security (RLS) Setup

### Create Table with User ID Column

```sql
-- Create table with user_id defaulting to Clerk user ID
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    user_id TEXT NOT NULL DEFAULT auth.jwt()->>'sub'
);

-- Enable RLS
ALTER TABLE "tasks" ENABLE ROW LEVEL SECURITY;
```

### Basic RLS Policies

```sql
-- Allow users to view their own tasks
CREATE POLICY "User can view their own tasks" 
ON "public"."tasks" 
FOR SELECT 
TO authenticated 
USING (
    ((SELECT auth.jwt()->>'sub') = (user_id)::text)
);

-- Allow users to insert their own tasks
CREATE POLICY "Users must insert their own tasks" 
ON "public"."tasks" 
AS PERMISSIVE 
FOR INSERT 
TO authenticated 
WITH CHECK (
    ((SELECT auth.jwt()->>'sub') = (user_id)::text)
);
```

### Advanced RLS Examples

**Organization Admin Check:**

```sql
CREATE POLICY "Only organization admins can insert in table"
ON secured_table
FOR INSERT
TO authenticated
WITH CHECK (
    (((SELECT auth.jwt()->>'org_role') = 'org:admin') 
     OR ((SELECT auth.jwt()->'o'->>'rol') = 'admin'))
    AND (organization_id = (SELECT COALESCE(auth.jwt()->>'org_id', auth.jwt()->'o'->>'id')))
);
```

**Second Factor Verification Check:**

```sql
CREATE POLICY "Only users that have passed second factor verification can read from table"
ON secured_table
AS RESTRICTIVE
FOR SELECT
TO authenticated
USING (
    ((SELECT auth.jwt()->'fva'->>1) != '-1')
);
```

## Client-Side Implementation

### React Hook Implementation

```javascript
'use client'
import { useEffect, useState } from 'react'
import { useSession, useUser } from '@clerk/nextjs'
import { createClient } from '@supabase/supabase-js'

export default function Home() {
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState('')
    
    const { user } = useUser()
    const { session } = useSession()
    
    // Create Clerk-authenticated Supabase client
    function createClerkSupabaseClient() {
        return createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_KEY,
            {
                accessToken: async () => session?.getToken() ?? null,
            }
        )
    }
    
    const client = createClerkSupabaseClient()
    
    useEffect(() => {
        if (!user) return
        
        async function loadTasks() {
            setLoading(true)
            const { data, error } = await client.from('tasks').select()
            if (!error) setTasks(data)
            setLoading(false)
        }
        
        loadTasks()
    }, [user])
    
    async function createTask(e) {
        e.preventDefault()
        await client.from('tasks').insert({ name })
        window.location.reload()
    }
    
    return (
        <div>
            <h1>Tasks</h1>
            {loading && <p>Loading...</p>}
            {!loading && tasks.length > 0 && 
                tasks.map((task) => <p key={task.id}>{task.name}</p>)
            }
            {!loading && tasks.length === 0 && <p>No tasks found</p>}
            
            <form onSubmit={createTask}>
                <input
                    type="text"
                    placeholder="Enter new task"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <button type="submit">Add</button>
            </form>
        </div>
    )
}
```

## Server-Side Implementation

### Create Reusable Server Client

`utils/supabase-server.js`:

```javascript
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'

export function createServerSupabaseClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_KEY,
        {
            accessToken: async () => (await auth()).getToken(),
        }
    )
}
```

### Server Component Usage

```javascript
import { createServerSupabaseClient } from './utils/supabase-server'

export default async function ServerPage() {
    const client = createServerSupabaseClient()
    const { data, error } = await client.from('tasks').select()
    
    if (error) throw error
    
    return (
        <div>
            <h1>Tasks</h1>
            {data?.map((task) => (
                <p key={task.id}>{task.name}</p>
            ))}
        </div>
    )
}
```

### Server Actions

```javascript
'use server'
import { createServerSupabaseClient } from './utils/supabase-server'

export async function addTask(name) {
    const client = createServerSupabaseClient()
    
    try {
        const response = await client.from('tasks').insert({ name })
        return response
    } catch (error) {
        console.error('Error adding task:', error.message)
        throw new Error('Failed to add task')
    }
}
```

## Webhook Data Synchronization

### Create Supabase Edge Function

1. Create function:

```bash
pnpx supabase functions new clerk-webhooks
```

2. Add Clerk dependency:

```bash
pnpx deno add npm:@clerk/backend
```

3. Function code (`supabase/functions/clerk-webhooks/index.ts`):

```typescript
import { createClient } from 'npm:@supabase/supabase-js'
import { verifyWebhook } from 'npm:@clerk/backend/webhooks'

Deno.serve(async (req) => {
    // Verify webhook signature
    const webhookSecret = Deno.env.get('CLERK_WEBHOOK_SECRET')
    if (!webhookSecret) {
        return new Response('Webhook secret not configured', { status: 500 })
    }
    
    const event = await verifyWebhook(req, { signingSecret: webhookSecret })
    
    // Create supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    
    if (!supabaseUrl || !supabaseServiceKey) {
        return new Response('Supabase credentials not configured', { status: 500 })
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    switch (event.type) {
        case 'user.created': {
            const { data: user, error } = await supabase
                .from('users')
                .insert([{
                    id: event.data.id,
                    first_name: event.data.first_name,
                    last_name: event.data.last_name,
                    avatar_url: event.data.image_url,
                    created_at: new Date(event.data.created_at).toISOString(),
                    updated_at: new Date(event.data.updated_at).toISOString(),
                }])
                .select()
                .single()
                
            if (error) {
                console.error('Error creating user:', error)
                return new Response(JSON.stringify({ error: error.message }), { status: 500 })
            }
            
            return new Response(JSON.stringify({ user }), { status: 200 })
        }
        
        case 'user.updated': {
            const { data: user, error } = await supabase
                .from('users')
                .update({
                    first_name: event.data.first_name,
                    last_name: event.data.last_name,
                    avatar_url: event.data.image_url,
                    updated_at: new Date(event.data.updated_at).toISOString(),
                })
                .eq('id', event.data.id)
                .select()
                .single()
                
            if (error) {
                console.error('Error updating user:', error)
                return new Response(JSON.stringify({ error: error.message }), { status: 500 })
            }
            
            return new Response(JSON.stringify({ user }), { status: 200 })
        }
        
        case 'organization.created': {
            const { data, error } = await supabase
                .from('organizations')
                .insert([{
                    id: event.data.id,
                    name: event.data.name,
                    created_at: new Date(event.data.created_at).toISOString(),
                    updated_at: new Date(event.data.updated_at).toISOString(),
                }])
                .select()
                .single()
                
            if (error) {
                console.error('Error creating organization:', error)
                return new Response(JSON.stringify({ error: error.message }), { status: 500 })
            }
            
            return new Response(JSON.stringify({ data }), { status: 200 })
        }
        
        case 'organizationMembership.created': {
            const { data, error } = await supabase
                .from('members')
                .insert([{
                    id: event.data.id,
                    user_id: event.data.public_user_data?.user_id,
                    organization_id: event.data.organization?.id,
                    created_at: new Date(event.data.created_at).toISOString(),
                    updated_at: new Date(event.data.updated_at).toISOString(),
                }])
                .select()
                .single()
                
            if (error) {
                console.error('Error creating membership:', error)
                return new Response(JSON.stringify({ error: error.message }), { status: 500 })
            }
            
            return new Response(JSON.stringify({ data }), { status: 200 })
        }
        
        default: {
            console.log('Unhandled event type:', JSON.stringify(event, null, 2))
            return new Response(JSON.stringify({ success: true }), { status: 200 })
        }
    }
})
```

4. Deploy function:

```bash
pnpx supabase functions deploy
```

### Configure Webhook in Clerk

1. Go to Clerk Dashboard > Configure > Webhooks
2. Click "Add Endpoint"
3. Enter your Supabase Edge Function URL
4. Enable desired events (e.g., `user.created`, `user.updated`)
5. Copy the signing secret

### Configure Edge Function Secrets

In Supabase dashboard:

1. Go to Edge Functions > Secrets
2. Add `CLERK_WEBHOOK_SECRET` with the signing secret from Clerk
3. Disable "Enforce JWT Verification" in function details

## Database Schema for User Sync

```sql
-- Users table
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Organizations table  
CREATE TABLE organizations (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Members table (for organization memberships)
CREATE TABLE members (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(id),
    organization_id TEXT REFERENCES organizations(id),
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
);
```

## Available JWT Claims

Access these in RLS policies using `auth.jwt()`:

- `sub` - User ID
- `org_id` - Organization ID  
- `org_role` - Organization role
- `o` - Organization object with nested data
- `fva` - Factor verification age array
- `role` - Database role (always "authenticated")

## Common Issues & Troubleshooting

### RLS Not Working

- Verify RLS is enabled: `ALTER TABLE "table_name" ENABLE ROW LEVEL SECURITY;`
- Check policy syntax and JWT claim access
- Ensure policies are properly restrictive

### Webhook Function Errors

- Check function logs in Supabase dashboard
- Verify secrets are properly configured
- Ensure JWT verification is disabled for the function
- Confirm webhook events are enabled in Clerk

### Token Issues

- Verify Clerk third-party integration is activated
- Check that session tokens contain required claims
- Ensure proper client initialization with `accessToken` function

## Migration from Deprecated JWT Templates

The JWT template approach is deprecated as of April 1, 2025. Benefits of native integration:

- No need to fetch new tokens for each request
- No need to share JWT secret with third parties
- Better security and performance
- Reduced latency

Existing JWT template integrations remain supported until January 1, 2026, but migration to native integration is recommended.

## Performance Considerations

### Caching

- Implement caching layer for Backend API calls to avoid rate limits
- Use React Query or SWR for client-side caching
- Consider server-side caching for frequently accessed data

### Database Optimization

- Index user_id columns used in RLS policies
- Consider materialized views for complex queries
- Monitor RLS policy performance impact

### Webhook Processing

- Implement idempotency in webhook handlers
- Add retry logic for failed database operations
- Consider batching for high-volume events

## Security Best Practices

- Always enable RLS on user data tables
- Use restrictive policies that default to deny
- Validate JWT claims in policies rather than trusting client data
- Use service role key only in secure server environments
- Regularly audit RLS policies for correctness
- Implement proper error handling without exposing sensitive data
