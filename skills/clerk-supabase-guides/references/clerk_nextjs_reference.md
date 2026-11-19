# Clerk Next.js Reference Guide

## Table of Contents

1. [clerkMiddleware()](#clerkmiddleware)
2. [Route Handlers](#route-handlers)
3. [currentUser()](#currentuser)
4. [auth()](#auth)
5. [Session Tokens](#session-tokens)

---

## clerkMiddleware()

### Basic Setup

```javascript
// middleware.ts (in root or src/)
import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
```

**Important**: By default, clerkMiddleware protects NO routes. All routes are public unless explicitly protected.

### Creating Route Matchers

```javascript
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define protected route patterns
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/forum(.*)'])
const isAdminRoute = createRouteMatcher(['/admin(.*)'])
const isTenantRoute = createRouteMatcher(['/organization-selector(.*)', '/orgid/(.*)'])
```

### Authentication-Based Protection

#### Using auth.protect() (Auto-redirect)

```javascript
export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect() // Automatically redirects to sign-in
  }
})
```

#### Using auth() for Custom Logic

```javascript
export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth()
  
  if (!userId && isProtectedRoute(req)) {
    // Add custom logic before redirecting
    return redirectToSignIn()
  }
})
```

### Authorization-Based Protection

#### Using auth.protect() with Permissions

```javascript
export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    await auth.protect((has) => {
      return has({ permission: 'org:admin:example1' }) || 
             has({ permission: 'org:admin:example2' })
    })
  }
})
```

#### Using auth() with has() for Custom Logic

```javascript
export default clerkMiddleware(async (auth, req) => {
  const { has, redirectToSignIn } = await auth()
  
  if (isAdminRoute(req) && !has({ permission: 'org:admin:example1' })) {
    // Custom logic for unauthorized users
    return redirectToSignIn()
  }
})
```

### Multiple Route Groups

```javascript
const isTenantRoute = createRouteMatcher(['/organization-selector(.*)', '/orgid/(.*)'])
const isTenantAdminRoute = createRouteMatcher(['/orgId/(.*)/memberships', '/orgId/(.*)/domain'])

export default clerkMiddleware(async (auth, req) => {
  // Different protection levels
  if (isTenantAdminRoute(req)) {
    await auth.protect((has) => {
      return has({ permission: 'org:admin:example1' }) || 
             has({ permission: 'org:admin:example2' })
    })
  }
  
  if (isTenantRoute(req)) {
    await auth.protect() // Just requires sign-in
  }
})
```

### Protecting All Routes (Whitelist Approach)

```javascript
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})
```

### Token Type Protection

```javascript
const isOAuthAccessible = createRouteMatcher(['/oauth(.*)'])
const isApiKeyAccessible = createRouteMatcher(['/api(.*)'])
const isMachineTokenAccessible = createRouteMatcher(['/m2m(.*)'])
const isUserAccessible = createRouteMatcher(['/user(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isOAuthAccessible(req)) await auth.protect({ token: 'oauth_token' })
  if (isApiKeyAccessible(req)) await auth.protect({ token: 'api_key' })
  if (isMachineTokenAccessible(req)) await auth.protect({ token: 'machine_token' })
  if (isUserAccessible(req)) await auth.protect({ token: 'session_token' })
})
```

**Token Types**:

- `oauth_token` - OAuth access tokens
- `api_key` - API keys
- `machine_token` - Machine-to-machine tokens
- `session_token` - User session tokens (default)
- `any` - Accept any valid token type

### Configuration Options

```javascript
export default clerkMiddleware(
  (auth, req) => {
    // Middleware logic
  },
  {
    // Static options
    debug: true, // Enable debug logging
    audience: 'your-audience', // JWT audience validation
    authorizedParties: ['http://localhost:3000', 'https://example.com'],
    clockSkewInMs: 5000, // Token clock skew tolerance (default: 5000ms)
    domain: 'example.com', // For satellite domains
    isSatellite: false, // Set to true for satellite apps
    jwtKey: 'your-jwt-key', // For networkless JWT verification
    publishableKey: 'pk_...', // Clerk publishable key
    secretKey: 'sk_...', // Clerk secret key (requires CLERK_ENCRYPTION_KEY)
    signInUrl: '/sign-in',
    signUpUrl: '/sign-up',
    proxyUrl: 'https://your-proxy.com',
  }
)
```

### Dynamic Configuration

```javascript
export default clerkMiddleware(
  (auth, req) => {
    // Middleware logic
  },
  (req) => ({
    // Dynamic options based on request
    domain: req.nextUrl.host,
    debug: process.env.NODE_ENV === 'development',
  })
)
```

### Multi-tenant Setup

```javascript
const tenantKeys = {
  tenant1: { publishableKey: 'pk_tenant1...', secretKey: 'sk_tenant1...' },
  tenant2: { publishableKey: 'pk_tenant2...', secretKey: 'sk_tenant2...' },
}

export default clerkMiddleware(
  (auth, req) => {
    // Auth logic
  },
  (req) => {
    const tenant = getTenant(req) // Your tenant resolution logic
    return tenantKeys[tenant]
  }
)
```

### Organization Sync Options

```javascript
export default clerkMiddleware(
  (auth, req) => {
    // Auth logic
  },
  {
    organizationSyncOptions: {
      organizationPatterns: ["/orgs/:slug", "/orgs/:slug/(.*)"],
      personalAccountPatterns: ["/me", "/me/(.*)"]
    }
  }
)
```

**Pattern Examples**:

- `/orgs/:slug` - Matches `/orgs/acmecorp`, sets `acmecorp` as active org
- `/orgs/:id` - Matches organization by Clerk ID
- `/app/:any/orgs/:slug` - Nested patterns
- `/personal-account/(.*)` - Personal account routes

### Combining with Other Middleware

```javascript
import createIntlMiddleware from 'next-intl/middleware'

const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'es'],
  defaultLocale: 'en',
})

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect()
  
  return intlMiddleware(req) // Chain other middleware
})
```

### Debugging

```javascript
export default clerkMiddleware(
  (auth, req) => {
    // Your logic
  },
  { 
    debug: true // Enable debug logs in terminal
    // Or conditionally: debug: process.env.NODE_ENV === 'development'
  }
)
```

---

## Route Handlers

### Basic Protection

#### Using auth.protect() (Returns 404 on failure)

```javascript
import { auth } from '@clerk/nextjs/server'

export async function GET() {
  await auth.protect() // Returns 404 if not signed in
  
  // Protected route logic
  return Response.json({ message: 'Hello authenticated user!' })
}
```

#### Using auth() for Custom Responses

```javascript
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const { userId } = await auth()
  
  if (!userId) {
    return NextResponse.json(
      { error: 'No signed in user' }, 
      { status: 401 }
    )
  }
  
  return NextResponse.json({ userId })
}
```

### External Data Integration

```javascript
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const { userId, getToken } = await auth()
  
  if (!userId) {
    return new Response('Unauthorized', { status: 401 })
  }
  
  // Get JWT token for external service
  const token = await getToken({ template: 'supabase' })
  
  // Use token with external API
  const response = await fetch('https://api.external-service.com/data', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  
  const data = await response.json()
  return NextResponse.json({ data })
}
```

### Getting Current User Data

```javascript
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const user = await currentUser()
  
  if (!user) {
    return new Response('Unauthorized', { status: 401 })
  }
  
  // Access user properties
  return NextResponse.json({ 
    userId: user.id,
    email: user.emailAddresses[0]?.emailAddress,
    firstName: user.firstName,
    lastName: user.lastName,
  })
}
```

### Backend API Integration

```javascript
import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextResponse, NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  
  if (!userId) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }
  
  const params = { firstName: 'John', lastName: 'Wick' }
  const client = await clerkClient()
  
  // Use Clerk Backend API
  const user = await client.users.updateUser(userId, params)
  
  return NextResponse.json({ user })
}
```

### Authorization in Route Handlers

```javascript
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function DELETE(req: Request) {
  const { userId, has } = await auth()
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Check permissions
  if (!has({ permission: 'org:admin:delete' })) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  
  // Perform admin action
  return NextResponse.json({ success: true })
}
```

---

## currentUser()

### Basic Usage

```javascript
import { currentUser } from '@clerk/nextjs/server'

export default async function Page() {
  const user = await currentUser()
  
  if (!user) {
    return <div>Not signed in</div>
  }
  
  return <div>Hello {user.firstName}</div>
}
```

### Key Properties

The `currentUser()` function returns a User object with these common properties:

```javascript
const user = await currentUser()

// Basic info
user.id                    // Clerk user ID
user.firstName             // First name
user.lastName              // Last name
user.fullName              // Full name (computed)
user.username              // Username (if set)
user.imageUrl              // Profile image URL

// Email addresses
user.emailAddresses        // Array of email objects
user.primaryEmailAddress   // Primary email object
user.emailAddresses[0]?.emailAddress // Email string

// Phone numbers  
user.phoneNumbers          // Array of phone objects
user.primaryPhoneNumber    // Primary phone object

// Timestamps
user.createdAt             // Account creation date
user.updatedAt             // Last update date
user.lastSignInAt          // Last sign-in timestamp

// Organization info
user.organizationMemberships // Array of org memberships

// Metadata
user.publicMetadata        // Public metadata object
user.privateMetadata       // Private metadata object  
user.unsafeMetadata        // Unsafe metadata object
```

### Important Characteristics

- **Automatic deduping**: Uses `fetch()` internally, so multiple calls per request are deduplicated
- **Rate limited**: Counts toward Backend API rate limits
- **Server-side only**: Works in Server Components, Route Handlers, Server Actions
- **Returns null**: When no user is signed in

### Best Practices

- Use `useUser()` hook on client-side when possible to avoid rate limits
- Only use `currentUser()` when you specifically need user data server-side
- Handle null return value for unauthenticated users

---

## auth()

### Basic Usage

```javascript
import { auth } from '@clerk/nextjs/server'

export default async function Page() {
  const { userId } = await auth()
  
  if (!userId) {
    return <div>Please sign in</div>
  }
  
  return <div>User ID: {userId}</div>
}
```

### Return Values

```javascript
const authData = await auth()

// Available properties:
authData.userId              // User ID (null if not signed in)
authData.sessionId           // Session ID 
authData.orgId               // Active organization ID
authData.orgRole             // User's role in active org
authData.orgSlug             // Active organization slug
authData.sessionClaims       // JWT session claims
authData.getToken            // Function to get tokens
authData.has                 // Authorization checker function
authData.redirectToSignIn    // Redirect function
authData.protect             // Protection method
```

### Token Acceptance

```javascript
// Accept specific token types
const { userId } = await auth({
  acceptsToken: 'oauth_token'
})

// Accept multiple token types
const { userId } = await auth({
  acceptsToken: ['session_token', 'oauth_token']
})

// Accept any token type
const { userId } = await auth({
  acceptsToken: 'any'
})
```

### auth.protect()

#### Basic Authentication Check

```javascript
export default async function Page() {
  await auth.protect() // Throws error/redirects if not authenticated
  
  return <div>Protected content</div>
}
```

#### Role-Based Protection

```javascript
export default async function AdminPage() {
  await auth.protect({ role: 'admin' })
  
  return <div>Admin only content</div>
}
```

#### Permission-Based Protection

```javascript
export default async function Page() {
  await auth.protect({ permission: 'org:admin:delete' })
  
  return <div>Can delete resources</div>
}
```

#### Custom Authorization Logic

```javascript
export default async function Page() {
  await auth.protect((has) => {
    return has({ role: 'admin' }) || has({ permission: 'special:access' })
  })
  
  return <div>Admin or special access required</div>
}
```

#### Token-Based Protection

```javascript
export async function GET() {
  await auth.protect({ token: 'api_key' }) // Only API keys accepted
  
  return Response.json({ data: 'API data' })
}
```

#### Custom Redirect URLs

```javascript
export default async function Page() {
  await auth.protect({
    unauthenticatedUrl: '/custom-sign-in',
    unauthorizedUrl: '/access-denied'
  })
  
  return <div>Protected content</div>
}
```

### Protection Behavior Matrix

| Authenticated | Authorized | auth.protect() Result |
|---------------|------------|----------------------|
| ✅ Yes        | ✅ Yes     | Returns auth object  |
| ✅ Yes        | ❌ No      | Returns 404 error    |
| ❌ No         | ❌ No      | Redirects to sign-in |

### Manual Authorization Checks

```javascript
export default async function Page() {
  const { userId, has } = await auth()
  
  if (!userId) {
    return <div>Please sign in</div>
  }
  
  const canDelete = has({ permission: 'org:admin:delete' })
  const isAdmin = has({ role: 'admin' })
  const hasSpecialAccess = has({ role: 'manager' }) || has({ permission: 'special:access' })
  
  return (
    <div>
      {canDelete && <button>Delete Resource</button>}
      {isAdmin && <div>Admin Panel</div>}
      {hasSpecialAccess && <div>Special Content</div>}
    </div>
  )
}
```

### Getting Tokens

```javascript
export default async function Page() {
  const { getToken } = await auth()
  
  // Get session token
  const sessionToken = await getToken()
  
  // Get custom JWT template token
  const supabaseToken = await getToken({ template: 'supabase' })
  const firebaseToken = await getToken({ template: 'firebase' })
  
  return <div>Tokens retrieved</div>
}
```

### Redirecting to Sign-in

```javascript
export default async function Page() {
  const { userId, redirectToSignIn } = await auth()
  
  if (!userId) {
    return redirectToSignIn({ returnBackUrl: '/dashboard' })
  }
  
  return <div>Dashboard content</div>
}
```

### Organization Context

```javascript
export default async function Page() {
  const { userId, orgId, orgRole, orgSlug } = await auth()
  
  if (!userId) {
    return <div>Please sign in</div>
  }
  
  return (
    <div>
      <p>User: {userId}</p>
      {orgId && (
        <>
          <p>Organization: {orgSlug}</p>
          <p>Role: {orgRole}</p>
        </>
      )}
    </div>
  )
}
```

### Usage Patterns

#### Server Components

```javascript
import { auth } from '@clerk/nextjs/server'

export default async function ServerComponent() {
  const { userId } = await auth()
  // Component logic
}
```

#### Route Handlers

```javascript
import { auth } from '@clerk/nextjs/server'

export async function GET() {
  const { userId } = await auth()
  // API logic
}
```

#### Server Actions

```javascript
import { auth } from '@clerk/nextjs/server'

export async function serverAction() {
  'use server'
  const { userId } = await auth()
  // Action logic
}
```

### Requirements

- **App Router only** - Not available in Pages Router
- **Server-side only** - Cannot be used in client components
- **Requires clerkMiddleware()** - Must be configured in middleware.ts

---

## Session Tokens

Session tokens are short-lived JSON Web Tokens (JWT) generated by Clerk when a user is authenticated. These tokens contain user and session information and are automatically included in requests to authenticate backend operations.

### Token Storage and Transport

- Stored in HTTP-only cookies for web applications
- Automatically sent with requests to your backend
- Short-lived for security (configurable via JWT template settings)
- Subject to browser cookie size limits (4KB total)

### Default Claims

Every session token includes these standard claims that cannot be overridden:

```javascript
{
  // Standard JWT claims (RFC 7519)
  "azp": "https://example.com",           // authorized party (app origin)
  "exp": 1713158400,                      // expiration time (Unix timestamp)
  "iat": 1713158400,                      // issued at time (Unix timestamp)
  "iss": "https://clerk.your-site.com",   // issuer (Clerk instance URL)
  "jti": "1234567890",                    // JWT ID (unique identifier)
  "nbf": 1713158400,                      // not before time (Unix timestamp)
  "sid": "sess_123",                      // session ID
  "sub": "user_123",                      // subject (user ID)
  
  // Clerk-specific claims
  "v": 2,                                 // version
  "fva": [7, -1],                         // factor verification ages [first, second]
  "pla": "u:free,o:pro",                  // plans (u=user, o=org)
  "fea": "o:dashboard,o:impersonation",   // features (o=org, u=user, uo=both)
  "sts": "pending"                        // status
}
```

### Organization Claims

When a user has an active organization, additional organization claims are included:

```javascript
{
  // Long-form organization claims
  "org_id": "org_123",
  "org_slug": "my-org",
  "org_role": "org:admin",
  "org_permissions": [
    "org:admin:example_permission",
    "org:member:example_permission"
  ],
  
  // Compact organization object (o claim)
  "o": {
    "id": "org_123",                      // organization ID
    "slg": "my-org",                      // slug
    "rol": "admin",                       // role (without org: prefix)
    "per": "read,manage",                 // permissions (comma-separated)
    "fpm": "3,2"                         // feature-permission map (bitmask)
  }
}
```

### Feature-Permission Map (fpm)

The `fpm` field uses bitmasks to efficiently encode feature permissions:

```javascript
// Example: fpm: "3,2" with per: "read,manage,delete"
// Feature 1: 3 (binary: 011) = read,manage allowed, delete not allowed
// Feature 2: 2 (binary: 010) = manage allowed, read and delete not allowed

// Decoding logic:
const permissions = ["read", "manage", "delete"]
const featureMap = "3,2".split(',')

featureMap.forEach((bitmask, featureIndex) => {
  const mask = parseInt(bitmask)
  permissions.forEach((permission, permIndex) => {
    const hasPermission = (mask & (1 << permIndex)) !== 0
    console.log(`Feature ${featureIndex}, ${permission}: ${hasPermission}`)
  })
})
```

### Factor Verification Ages (fva)

The `fva` array tracks authentication factor freshness:

```javascript
{
  "fva": [7, -1]  // [firstFactorAge, secondFactorAge]
}

// Examples:
[7, -1]   // First factor verified 7 minutes ago, no second factor
[5, 2]    // First factor 5 minutes ago, second factor 2 minutes ago
[-1, -1]  // No factors verified (shouldn't happen in valid sessions)
```

### Impersonation Claims (act)

When user impersonation is active, the `act` (actor) claim contains impersonator info:

```javascript
{
  "act": {
    "iss": "https://dashboard.clerk.com",  // impersonation source
    "sid": "sess_456",                     // impersonator session ID
    "sub": "user_456"                      // impersonator user ID
  }
}
```

### Custom Claims

You can add custom claims through JWT templates or custom session tokens:

```javascript
// Example custom claims
{
  "custom_role": "premium_user",
  "department": "engineering",
  "permissions": ["read", "write"],
  "metadata": {
    "onboardingComplete": true,
    "preferences": {...}
  }
}
```

### Accessing Claims in Your Application

```javascript
// Server-side - Route Handler
import { auth } from '@clerk/nextjs/server'

export async function GET() {
  const { sessionClaims } = await auth()
  
  // Access standard claims
  const userId = sessionClaims?.sub
  const sessionId = sessionClaims?.sid
  const orgId = sessionClaims?.org_id
  
  // Access custom claims
  const customRole = sessionClaims?.custom_role
  
  return Response.json({
    userId,
    sessionId,
    orgId,
    customRole
  })
}

// Server Component
import { auth } from '@clerk/nextjs/server'

export default async function Page() {
  const { sessionClaims, orgId, orgRole } = await auth()
  
  return (
    <div>
      <p>Session ID: {sessionClaims?.sid}</p>
      <p>Organization: {orgId}</p>
      <p>Role: {orgRole}</p>
    </div>
  )
}
```

### Size Limitations

**Critical Constraint**: Session tokens are stored in cookies with a 4KB browser limit.

**Available Space**:

- Total cookie size: 4KB (4,096 bytes)
- Clerk default claims: ~2.8KB
- **Available for custom claims: ~1.2KB**

**Claims that commonly cause size issues**:

- `user.organizations` (if user belongs to many orgs)
- `user.public_metadata`
- `user.unsafe_metadata`
- `org.public_metadata`
- `org_membership.public_metadata`

### Managing Large Claims

**Problem**: Storing large metadata in session tokens exceeds 4KB limit.

```javascript
// ❌ This will likely exceed 4KB cookie limit
{
  "metadata": {
    "onboardingComplete": true,
    "birthday": "2000-01-01",
    "country": "Canada",
    "bio": "Very long bio content...", // 6KB of data
    "preferences": {...},             // Large object
    "history": [...]                  // Large array
  }
}
```

**Solution 1**: Store only essential data in session token.

```javascript
// ✅ Custom session token - keep it minimal
{
  "onboardingComplete": true,
  "userId": "user_123",
  "role": "admin"
}
```

**Solution 2**: Fetch additional data separately when needed.

```javascript
// Route handler to get full user data
import { auth, clerkClient } from '@clerk/nextjs/server'

export async function GET() {
  const { userId } = await auth()
  
  if (!userId) {
    return new Response('Unauthorized', { status: 401 })
  }
  
  const client = await clerkClient()
  const user = await client.users.getUser(userId)
  
  // Access full publicMetadata, unsafe_metadata, etc.
  return Response.json({
    bio: user.publicMetadata.bio,
    preferences: user.publicMetadata.preferences,
    history: user.privateMetadata.history
  })
}
```

**Solution 3**: Use external database for large data.

```javascript
// Store large data in your database, reference by user ID
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/database'

export async function GET() {
  const { userId } = await auth()
  
  if (!userId) {
    return new Response('Unauthorized', { status: 401 })
  }
  
  // Fetch from your database instead
  const userData = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: { preferences: true, history: true }
  })
  
  return Response.json(userData)
}
```

### Token Validation

**Automatic Validation**: If using Clerk middleware, session tokens are validated automatically on every request.

**Manual Validation**: For custom implementations, use Clerk's validation helpers:

```javascript
import { verifyToken } from '@clerk/backend'

// Manual JWT verification
export async function validateToken(token: string) {
  try {
    const payload = await verifyToken(token, {
      jwtKey: process.env.CLERK_JWT_KEY,
      issuer: `https://clerk.${process.env.CLERK_DOMAIN}`,
      authorizedParties: ['https://yourdomain.com']
    })
    
    return { valid: true, payload }
  } catch (error) {
    return { valid: false, error: error.message }
  }
}
```

### Token Lifecycle

```javascript
// Check token expiration
const { sessionClaims } = await auth()

if (sessionClaims) {
  const now = Math.floor(Date.now() / 1000)
  const exp = sessionClaims.exp
  const timeUntilExpiry = exp - now
  
  console.log(`Token expires in ${timeUntilExpiry} seconds`)
  
  if (timeUntilExpiry < 300) { // 5 minutes
    console.log('Token expires soon - consider refreshing')
  }
}
```

### Development vs Production Tokens

```javascript
// Token issuer varies by environment
const { sessionClaims } = await auth()

// Development: https://your-site.clerk.accounts.dev
// Production: https://clerk.your-site.com
const issuer = sessionClaims?.iss

const isProduction = !issuer?.includes('.clerk.accounts.dev')
const isDevelopment = issuer?.includes('.clerk.accounts.dev')
```

### Best Practices

1. **Keep custom claims minimal** - Stay well under 1.2KB limit
2. **Use external storage** - Store large data in your database
3. **Monitor token size** - Test with realistic data volumes
4. **Cache user data** - Reduce Backend API calls for supplementary data
5. **Handle expiration** - Implement proper token refresh flows
6. **Validate audience** - Check `azp` claim matches your domain
7. **Use typed interfaces** - Create TypeScript interfaces for custom claims

```typescript
// TypeScript interface for custom claims
interface CustomSessionClaims {
  onboardingComplete?: boolean
  department?: string
  role?: 'admin' | 'user' | 'manager'
  permissions?: string[]
}

// Usage with type safety
const { sessionClaims } = await auth()
const customClaims = sessionClaims as CustomSessionClaims

if (customClaims.onboardingComplete === false) {
  // Redirect to onboarding
}
```

---

## Common Patterns

### Complete Authentication Flow

```javascript
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})

// app/dashboard/page.tsx
import { auth, currentUser } from '@clerk/nextjs/server'

export default async function Dashboard() {
  const { userId } = await auth()
  const user = await currentUser()
  
  if (!userId || !user) {
    return <div>Access denied</div>
  }
  
  return (
    <div>
      <h1>Welcome, {user.firstName}!</h1>
      <p>User ID: {userId}</p>
    </div>
  )
}

// app/api/protected/route.ts
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const { userId } = await auth()
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  return NextResponse.json({ message: 'Protected data' })
}
```

### Multi-tenant Organization Setup

```javascript
// middleware.ts
export default clerkMiddleware(
  async (auth, req) => {
    const isOrgRoute = createRouteMatcher(['/org/:id(.*)'])
    
    if (isOrgRoute(req)) {
      await auth.protect()
    }
  },
  {
    organizationSyncOptions: {
      organizationPatterns: ['/org/:id', '/org/:id/(.*)'],
      personalAccountPatterns: ['/personal(.*)']
    }
  }
)

// app/org/[id]/page.tsx
export default async function OrgPage() {
  const { userId, orgId, has } = await auth()
  
  const canManageMembers = has({ permission: 'org:admin:members' })
  
  return (
    <div>
      <h1>Organization: {orgId}</h1>
      {canManageMembers && <button>Manage Members</button>}
    </div>
  )
}
```

This reference covers the core Clerk Next.js functionality for authentication and authorization in server-side contexts. All examples use actual API signatures and tested patterns from the official documentation.
