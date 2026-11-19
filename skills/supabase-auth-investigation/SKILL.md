---
name: supabase-auth-investigation
description: "Investigates a Next.js 15 project's remote Supabase auth and RBAC setup (schemas, policies, roles, triggers) and produces a blueprint for creating users correctly. Use when debugging Supabase auth, RLS or role assignment, or planning user creation."
disable-model-invocation: true
---

# Next.js 15.3+ & Remote Supabase Auth/RBAC Investigation and User Creation Blueprint

## Project Discovery Phase

- [ ] **Next.js Supabase Integration Analysis**
  - Locate Supabase client configuration (`lib/supabase/`, `utils/supabase/`)
  - Verify remote Supabase connection via `supabase status --linked`
  - Check `.env.local` and `.env` for remote Supabase credentials
  - Identify auth providers and middleware patterns (`middleware.ts`, auth components)
  - Map Server Components vs Client Components auth usage
  - Review route protection and redirect logic
  - Analyze auth state management (Context, Zustand, etc.)

- [ ] **Supabase Schema Discovery**
  - Review `supabase/migrations/` for complete auth table evolution
  - Parse database types file (`supabase/types/database.types.ts`, `database.ts`, or similar)
  - Identify custom auth tables beyond standard `auth.users`
  - Map profile, preference, and role-related table relationships
  - Document RLS policies and security rules from migrations

- [ ] **Role System Detection**
  - Scan TypeScript types for role definitions (`types/`, `lib/types/`)
  - Check validation schemas (`zod`, `yup`) for role constraints
  - Identify enum definitions in database types
  - Map role assignment patterns (metadata vs dedicated tables)
  - Document permission checking utilities and hooks
  - **Create comprehensive role inventory**: List every role type for test user creation
  - Identify role hierarchies and inheritance patterns
  - Document role-specific feature access and restrictions

## Comprehensive Supabase Feature Analysis

- [ ] **Storage Requirements Assessment**
  - **Check if storage is needed**: Scan codebase for file upload/download functionality
  - Search for image, document, or media handling components
  - Identify user avatars, file attachments, or content upload features
  - **If storage is required**: Review `supabase.storage` usage patterns
  - **If storage exists but not needed**: Document for potential cleanup
  - Map bucket configurations and file access patterns only if actively used
  - Review storage RLS policies in migrations only for required buckets

- [ ] **Real-time Features Requirements**
  - **Check if real-time is needed**: Search for live updates, notifications, or collaborative features
  - Identify chat, messaging, or live data synchronization requirements
  - Look for presence indicators, live cursors, or collaborative editing
  - **If real-time is required**: Search for `supabase.channel()` and subscription patterns
  - **If real-time exists but not needed**: Document for potential cleanup
  - Map real-time table configurations only for active subscriptions
  - Document real-time permission structures only where implemented

- [ ] **Edge Functions Requirements**
  - **Check if edge functions are needed**: Look for server-side processing requirements
  - Identify webhook handling, external API integrations, or complex business logic
  - Search for scheduled tasks, background processing, or custom auth flows
  - **If edge functions are required**: Review `supabase/functions/` directory
  - **If functions exist but not needed**: Document for cleanup consideration
  - Map function invocation patterns only for active functions
  - Document function dependencies only where functions are used

- [ ] **Auth Configuration Review**
  - Check remote Supabase dashboard for auth provider settings
  - **Assess required auth providers**: Match enabled providers with app login methods
  - Review email templates only if email auth is implemented
  - **Disable unused auth providers**: Document providers not used in codebase
  - Map auth event handlers and webhooks only if custom flows exist

- [ ] **Vault and Secrets Requirements**
  - **Check if vault features are needed**: Search for encrypted data handling
  - Look for sensitive user data, payment information, or confidential content
  - Identify compliance requirements (GDPR, HIPAA, etc.)
  - **If vault is required**: Check for `supabase.rpc()` calls to vault functions
  - **If vault features exist but not needed**: Document for potential cleanup
  - Map secret access patterns only where encryption is actively used

## API Key Migration Assessment

- [ ] **Current API Key Analysis**
  - Check `.env` files for legacy API key patterns
  - Identify service role vs anon key usage
  - Review API key permissions and restrictions
  - Document current key rotation practices
  - Assess need for new API key migration ([Supabase Migration Guide](https://github.com/orgs/supabase/discussions/29260))

- [ ] **Migration Planning (if needed)**
  - Plan migration to new API key format
  - Update environment variables and CI/CD configs
  - Test new keys in development environment
  - Plan rollout strategy for production migration
  - Document rollback procedures

## Feature-Driven Migration Review

- [ ] **Required Features Migration Audit**
  - Review migrations only for features actively used in codebase
  - **Remove unused feature migrations**: Identify storage, real-time, or function setup not used
  - Focus index optimization on tables with actual query patterns
  - Validate foreign key relationships only for active table relationships
  - Assess RLS policy coverage only for features the app implements

- [ ] **Migration Optimization Based on Usage**
  - Merge migrations only for features that are actively used
  - **Skip unused feature setup**: Don't create buckets, channels, or functions not referenced in code
  - Remove development-only migrations for unused features
  - Optimize table creation order only for tables the app actually uses
  - Clean up unused columns, tables, or functions identified in analysis

- [ ] **Performance Review for Active Features**
  - Add indexes only for query patterns found in codebase
  - Review RLS policies only for tables with active data access
  - Optimize stored procedures only if they're called from the application
  - Plan backup procedures only for data the application generates
  - Document maintenance only for features actively in use

## Remote Supabase Setup and Validation

- [ ] **Environment Configuration**
  - Verify `.env` contains correct remote Supabase credentials
  - Test connection to remote database via CLI (`supabase db ping`)
  - Validate API key permissions in remote dashboard
  - Check rate limiting and usage quotas
  - Verify domain allowlists and CORS settings

- [ ] **Feature-Specific Migration Deployment**
  - Apply migrations only for features the app requires
  - **Skip unused feature setup**: Don't configure storage buckets if no file uploads exist
  - **Skip real-time setup**: Don't configure channels if no live features exist
  - **Skip edge function deployment**: Don't deploy functions if none are called
  - Generate updated TypeScript types (`supabase gen types typescript --linked`)
  - Test only the Supabase features actually implemented in the app

## Dynamic User Creation with Required Features

- [ ] **Service Role User Creation Script Development**
  - Reference `docs/supabase user creation/` for TypeScript implementation examples
  - Use `docs/supabase user creation/supabase user creation guide (typescript).md` as implementation guide
  - Adapt `docs/supabase user creation/typescript-user-creator.ts` for current role system
  - Import types from `docs/supabase user creation/types-definition.ts` or create similar
  - Implement admin API user creation using remote service role key
  - Handle Supabase auth user metadata population
  - Create profile records linked to auth users
  - Test email confirmation flows with real email delivery

- [ ] **Role-Based Test User Population**
  - **Create test users for every role discovered**: Generate users for each role found in role system analysis
  - Map role permissions to test user creation parameters
  - Create users with varying permission levels within each role
  - Generate test users with different auth provider combinations
  - Populate role assignments based on discovered schema
  - Create edge case users (disabled, pending, expired roles)

- [ ] **Feature-Specific User Testing**
  - **Only if storage is used**: Create users with storage bucket access permissions
  - **Only if real-time is used**: Test real-time subscription access for different roles
  - **Only if edge functions are used**: Generate users with varying edge function permissions
  - **Only if vault is used**: Create test scenarios for vault/secrets access
  - Create test users only for auth providers actually implemented
  - Generate users with feature-specific metadata and permissions

## Next.js + Remote Supabase Testing Framework

- [ ] **Core Feature Validation with All Role Types**
  - Test SSR/SSG auth states with remote database using each role type
  - Verify middleware route protection with every role discovered in system
  - **Test role-specific access patterns**: Use test users from each role to validate permissions
  - **Conditional feature testing**: Test only features found in codebase analysis
  - Skip storage testing if no file upload/download code exists
  - Skip real-time testing if no subscription code exists
  - Skip edge function testing if no function invocation code exists

- [ ] **Comprehensive Role-Based Testing**
  - **Test each role's feature access**: Validate storage, real-time, and function permissions per role
  - Test role hierarchy and permission inheritance if implemented
  - Verify role-based UI/UX differences across the application
  - Test role transitions and permission updates
  - Validate role-based data access and RLS policy enforcement
  - Test edge cases (users with multiple roles, disabled roles, etc.)

- [ ] **Production-Ready Testing for Active Features**
  - Test email delivery and verification flows only if email auth is used
  - Verify OAuth integrations only for providers implemented in app
  - **Test with users from each role**: Ensure all auth flows work for every role type
  - Test rate limiting only for features that generate significant load
  - Validate backup procedures only for data the app actually creates
  - Check monitoring only for features actively used

## Documentation and Production Readiness

- [ ] **Feature-Specific Documentation**
  - Document only Supabase features actively used by the application
  - **Record all test user credentials**: Document login credentials for each role type created
  - **Map role-specific test scenarios**: Document what each test user can/cannot access
  - Create role-based testing checklists for manual QA validation
  - **Exclude unused features**: Don't document storage if app doesn't handle files
  - Create deployment checklists only for features being deployed
  - Document monitoring only for active features

- [ ] **Test User Documentation**
  - Create comprehensive test user registry with role assignments
  - Document test user authentication methods (email/password, OAuth, etc.)
  - Map test user permissions and expected access patterns
  - Create role-based testing scenarios and validation steps
  - Document test user lifecycle (creation, updates, cleanup)
  - Record test data associated with each user role

- [ ] **Production Migration Plan**
  - Plan staging to production migration only for required features
  - **Skip unused feature migration**: Don't migrate storage buckets if no file handling exists
  - Create production user creation procedures only for implemented auth flows
  - Plan production data seeding only for tables the app actually uses
  - **Plan role-based production setup**: Document how to create initial admin/user roles in production
  - Document rollback procedures only for features being used

## Supabase Resource Provisioning

- [ ] **Identify Missing Supabase Resources**
  - List storage buckets referenced in codebase but not configured in Supabase
  - Identify edge functions called from application but not deployed
  - Document real-time channels subscribed to in code but not configured
  - Note auth providers implemented in app but not enabled in Supabase
  - Record database tables/columns accessed by application but missing in schema

- [ ] **Resource Creation Planning**
  - Plan creation of missing storage buckets with appropriate policies
  - Schedule deployment of missing edge functions with proper permissions
  - Enable required auth providers to match application implementation
  - Configure missing real-time channels and broadcast settings
  - Create missing database tables, columns, and indexes based on codebase requirements
  - Set up missing RLS policies for tables accessed by application

- [ ] **Automated Resource Provisioning**
  - Create scripts to provision missing storage buckets with correct RLS policies
  - Deploy missing edge functions with environment variables and secrets
  - Configure auth providers with proper redirect URLs and settings
  - Set up real-time configurations for channels used in application
  - Generate and apply migrations for missing database schema elements
  - Document all created resources and their configuration rationale

This blueprint ensures AI agents focus on implementing and testing only the Supabase features actually required by the application, avoiding unnecessary complexity and resource usage.
