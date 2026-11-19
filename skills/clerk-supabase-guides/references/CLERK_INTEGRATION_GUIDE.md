# Clerk + Supabase Integration Guide

## ✅ Integration Status: READY FOR TESTING

This guide documents the complete Clerk + Supabase integration implementation for MyRoomie v3.

## 📋 What Was Implemented

### 1. Core Dependencies & Configuration

- ✅ **Installed**: `@clerk/nextjs` v6.31.1 and `svix` v1.73.0
- ✅ **Environment Variables**: Added Clerk keys to `.env.example`
- ✅ **Supabase Config**: Enabled Clerk third-party auth in `config.toml`
- ✅ **Layout Provider**: Wrapped app with `ClerkProvider`

### 2. Authentication Infrastructure  

- ✅ **Middleware**: Complete rewrite using `clerkMiddleware` with route protection
- ✅ **Client Utils**: `src/lib/supabase/clerk-client.ts` - Client-side Supabase with Clerk tokens
- ✅ **Server Utils**: `src/lib/supabase/clerk-server.ts` - Server-side Supabase with Clerk tokens
- ✅ **Auth Pages**: Sign-in/Sign-up routes at `/sign-in` and `/sign-up`

### 3. Database Migrations

- ✅ **Migration 25**: Clerk compatibility functions and RLS policy helpers
- ✅ **Migration 26**: Updated all existing RLS policies for Clerk JWT tokens
- ✅ **Helper Functions**: `get_user_id()`, `get_user_email()`, `is_admin()` for dual auth support

### 4. Testing & Webhooks

- ✅ **Test Pages**: `/clerk-test` for manual verification  
- ✅ **Test API**: `/api/clerk-test` for programmatic testing
- ✅ **Webhook Handler**: `/api/webhooks/clerk` for user sync

## 🚀 Setup Instructions

### Step 1: Configure Clerk Application

1. **Create Clerk Account**: Visit [clerk.com](https://clerk.com) and create an application
2. **Get API Keys**: Copy your publishable and secret keys
3. **Add to Environment**: Update your `.env.local`:

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   CLERK_WEBHOOK_SECRET=whsec_...
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   ```

### Step 2: Connect Clerk to Supabase

1. **Clerk Dashboard**: Visit [Supabase Integration Setup](https://dashboard.clerk.com/setup/supabase)
2. **Activate Integration**: Click "Activate Supabase integration"
3. **Copy Domain**: Copy your Clerk domain (e.g., `https://your-app.clerk.accounts.dev`)
4. **Supabase Dashboard**:
   - Go to Authentication > Sign In / Up
   - Click "Add provider" → Select "Clerk"
   - Paste your Clerk domain
   - Click "Create connection"

### Step 3: Run Database Migrations

```bash
# Apply the new migrations
supabase db reset --local  # For local development
# OR
supabase db push          # For remote database
```

### Step 4: Configure Webhooks (Optional)

1. **Clerk Dashboard**: Go to Webhooks
2. **Add Endpoint**: `https://yourdomain.com/api/webhooks/clerk`
3. **Select Events**: `user.created`, `user.updated`, `user.deleted`
4. **Get Secret**: Copy webhook secret to `CLERK_WEBHOOK_SECRET`

## 🧪 Testing the Integration

### Manual Testing

1. Visit `/clerk-test` to verify the integration
2. Sign up/sign in at `/sign-up` or `/sign-in`
3. Check if user profile is created in Supabase

### API Testing

```bash
# Test the integration endpoint
curl -H "Authorization: Bearer YOUR_CLERK_TOKEN" \
     http://localhost:3000/api/clerk-test

# Create/update profile
curl -X POST -H "Authorization: Bearer YOUR_CLERK_TOKEN" \
     http://localhost:3000/api/clerk-test
```

## 📊 Database Schema Changes

### New Helper Functions

- `public.get_user_id()` - Extracts user ID from Clerk or Supabase JWT
- `public.get_user_email()` - Extracts email from either auth system  
- `public.is_admin()` - Checks admin status across both systems
- `public.get_auth_system()` - Returns 'clerk', 'supabase', or 'none'
- `public.sync_clerk_user()` - Syncs Clerk user data to profiles

### Updated Tables

- **profiles**: Added `auth_provider` column ('supabase' | 'clerk')
- **All tables**: RLS policies updated to use new helper functions

### Row Level Security

All RLS policies now work with both authentication systems:

- Use `public.get_user_id()` instead of `auth.uid()`
- Use `public.is_admin()` for admin checks
- Maintained backward compatibility with existing Supabase Auth

## 🔒 Security Features

- ✅ **Route Protection**: Dashboard, admin, and API routes protected
- ✅ **Admin Access**: Multi-method admin verification (JWT claims, email, database role)
- ✅ **Token Passing**: Clerk JWT tokens passed to Supabase for RLS
- ✅ **Webhook Security**: Svix signature verification for user sync
- ✅ **Dual Auth**: Supports both Clerk and existing Supabase Auth

## 📁 File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── clerk-test/route.ts          # Integration test API
│   │   └── webhooks/clerk/route.ts      # User sync webhook
│   ├── clerk-test/page.tsx              # Manual test page
│   ├── sign-in/[[...sign-in]]/page.tsx  # Clerk sign-in
│   ├── sign-up/[[...sign-up]]/page.tsx  # Clerk sign-up
│   └── layout.tsx                       # ClerkProvider wrapper
├── lib/supabase/
│   ├── clerk-client.ts                  # Client Supabase + Clerk
│   └── clerk-server.ts                  # Server Supabase + Clerk
└── middleware.ts                        # Clerk middleware

supabase/
├── config.toml                          # Clerk enabled
└── migrations/
    ├── 25_clerk_integration_support.sql # Clerk helper functions
    └── 26_update_rls_policies_for_clerk.sql # Updated RLS policies
```

## 🔄 Migration Strategy

The integration is designed for **zero-downtime migration**:

1. **Existing Users**: Continue using Supabase Auth
2. **New Users**: Can use either Clerk or Supabase Auth  
3. **Gradual Migration**: Users can be migrated to Clerk over time
4. **Dual Support**: Both auth systems work simultaneously

## 🐛 Troubleshooting

### Common Issues

1. **"Unauthorized" errors**: Check Clerk keys in environment
2. **Database connection fails**: Verify Supabase integration in Clerk dashboard
3. **RLS policy errors**: Run migrations 25 and 26
4. **TypeScript errors**: Regenerate database types: `pnpm run types:remote`

### Debugging Tools

- **Test Page**: `/clerk-test` - Visual integration verification
- **Test API**: `/api/clerk-test` - Programmatic testing
- **Logs**: Check browser console and server logs for errors

## 📈 Next Steps

1. **Generate Types**: Run `pnpm run types:remote` to update TypeScript types
2. **Test All Features**: Verify existing functionality works with Clerk tokens
3. **User Migration**: Plan migration strategy for existing Supabase Auth users
4. **Monitor**: Set up logging and monitoring for the integration

## 🔧 Development Commands

```bash
# Type checking
pnpm run typecheck

# Database operations  
supabase db reset --local
supabase db push
supabase status

# Generate types
pnpm run types:remote

# Start development
pnpm run dev
```

---

**Integration Status**: ✅ **COMPLETE - READY FOR TESTING**

The Clerk + Supabase integration is now fully implemented using the latest 2025 patterns. The system supports both authentication methods simultaneously, ensuring a smooth transition path.
