---
title: 'Enhanced Supabase User Creation Script'
description:
  'A production-ready Node.js script for programmatically creating users with comprehensive role
  management and database integration for Supabase project.'
category: 'Supabse User Creation'
---

# Enhanced Supabase User Creation Script

A production-ready Node.js script for programmatically creating users with comprehensive role
management and database integration for Supabase projects.

## Features

- **Robust User Management**: Create individual users or batches with comprehensive error handling
- **Advanced Role System**: Support for super_admin, admin, moderator, editor, and user roles with
  permissions
- **Multi-Table Support**: Updates auth.users, profiles, and user_preferences tables
- **Production-Ready**: Comprehensive validation, logging, and graceful error handling
- **Flexible Configuration**: Supports custom UUIDs, environment-specific settings, and table
  customization
- **Development-Friendly**: Skip email confirmation, batch processing, existing user detection
- **Security-Focused**: Service role validation, credential management, security reminders

**important: dont execute this blindly, adapt it the the context and the project**

## Setup

1. **Install dependencies:**

```bash
npm install
```

2. **Create `.env` file:**

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
DEFAULT_DEV_PASSWORD=<your-dev-password>
```

3. **Get your service role key:**
   - Go to your Supabase project dashboard
   - Navigate to Settings > API
   - Copy the `service_role` key (NOT the anon key)
   - ⚠️ **Never expose this key in client-side code**

## Usage(adapt this to the projects types/auth and requirements)

### Create Default Development Users

Creates super_admin, regular user, and moderator accounts:

```bash
npm run create-dev
# or
node create-users.js create-dev
```

### Create Admin Users Only

Creates only admin and super_admin users:

```bash
node create-users.js create-admin
```

### Create Single User

```bash
node create-users.js create-single user@example.com admin MyPassword123!
```

### List All Users

Shows all users with roles and verification status:

```bash
npm run list-users
# or
node create-users.js list
```

### Help

```bash
npm run help
```

## Default Users Created

| Email                | Role        | Permissions                             | Status   |
| -------------------- | ----------- | --------------------------------------- | -------- |
| <admin@example.com> | super_admin | read, write, delete, admin, super_admin | verified |
| <user@example.com>  | user        | read                                    | pending  |
| <mod@example.com>   | moderator   | read, write, moderate                   | verified |

## Enhanced Role System

The script supports five built-in roles with hierarchical permissions:

- **super_admin**: Ultimate permissions (read, write, delete, admin, super_admin)
- **admin**: Full management permissions (read, write, delete, admin)
- **moderator**: Content management (read, write, moderate)
- **editor**: Content creation (read, write)
- **user**: Basic access (read only)

### Multi-Table Integration

The script automatically updates:

- **auth.users**: Authentication and user metadata
- **profiles**: User profile information with role and status
- **user_preferences**: Default notification and privacy settings

Roles and permissions are stored in `app_metadata` while profile data goes to your profiles table.

## Configuration

### Environment Variables

```env
# Required
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Optional
DEFAULT_DEV_PASSWORD=<your-dev-password>
```

### Script Configuration

Customize the `DEFAULT_CONFIG` object in the script:

```javascript
const DEFAULT_CONFIG = {
  envPath: '.env', // Environment file path
  tableName: 'profiles', // Profiles table name
  preferencesTable: 'user_preferences', // Preferences table name
  defaultPassword: '<your-dev-password>', // Default password
  requireEmailConfirmation: false, // Skip email verification
  createProfiles: true, // Update profiles table
  createPreferences: true, // Create user preferences
};
```

### Custom Users with Specific UUIDs

Perfect for database seeding with fixed IDs:

```javascript
const ADMIN_USERS = [
  {
    id: '00000000-0000-0000-0000-000000000001', // Specific UUID
    email: 'owner@company.com', //replace with actual domain
    password: 'SecurePassword123!', //use superadmin password
    role: 'super_admin',
    name: 'Company Owner',
    profile: {
      verification_status: 'verified',
      status: 'active',
      department: 'Management',
    },
    preferences: {
      notification_settings: {
        email_notifications: true,
        push_notifications: false,
      },
    },
  },
];
```

### Custom Roles

Add new roles to the `USER_ROLES` object and update `getPermissionsForRole()`:

```javascript
const USER_ROLES = {
  ADMIN: 'admin',
  SUPER_USER: 'super_user',
  // ... existing roles
};

function getPermissionsForRole(role) {
  const permissions = {
    // ... existing permissions
    [USER_ROLES.SUPER_USER]: ['read', 'write', 'admin', 'super'],
  };
  return permissions[role] || permissions[USER_ROLES.USER];
}
```

## Advanced Usage

### Using as a Module

```javascript
const {
  createUser,
  createUsers,
  USER_ROLES,
  validateConfiguration,
  initializeSupabase,
} = require('./create-users.js');

// Initialize Supabase client
const supabase = await initializeSupabase();

// Create single user with full configuration
const result = await createUser(supabase, {
  id: '123e4567-e89b-12d3-a456-426614174000', // Optional specific UUID
  email: 'test@example.com',
  password: 'SecurePassword123!',
  role: USER_ROLES.ADMIN,
  name: 'Test Admin',
  profile: {
    verification_status: 'verified',
    status: 'active',
    department: 'Engineering',
  },
  preferences: {
    notification_settings: {
      email_notifications: true,
      push_notifications: false,
    },
  },
});

// Create multiple users with options
const users = [
  { email: 'user1@test.com', role: USER_ROLES.USER },
  { email: 'admin@test.com', role: USER_ROLES.ADMIN },
];

// Validate before creating
if (validateConfiguration(users)) {
  const results = await createUsers(supabase, users, {
    skipExisting: true, // Skip users that already exist
    updateExisting: false, // Don't update existing users
    batchSize: 3, // Process 3 users at a time
    showCredentials: true, // Display credentials after creation
  });
}
```

### Batch Operations with Error Handling

```javascript
// Process large batches with comprehensive error handling
const results = await createUsers(supabase, largeUserArray, {
  batchSize: 5, // Smaller batches for large datasets
  skipExisting: true, // Gracefully handle existing users
  updateExisting: false, // Or set to true to update existing
});

// Analyze results
const successful = results.filter((r) => r.success && !r.skipped);
const existing = results.filter((r) => r.skipped);
const failed = results.filter((r) => !r.success);

console.log(
  `Created: ${successful.length}, Existing: ${existing.length}, Failed: ${failed.length}`
);
```

## Database Integration

### Required Table Structure

**Profiles Table:**

```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  role TEXT NOT NULL DEFAULT 'user',
  name TEXT,
  verification_status TEXT DEFAULT 'pending',
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**User Preferences Table:**

```sql
CREATE TABLE user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);
```

### Row Level Security (RLS) Policies

```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Basic policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    (auth.jwt() ->> 'app_metadata')::jsonb ->> 'role' IN ('admin', 'super_admin')
  );

CREATE POLICY "Users can manage own preferences" ON user_preferences
  FOR ALL USING (auth.uid() = user_id);
```

### Automatic Profile Creation

Set up triggers to automatically create profiles:

```sql
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $
BEGIN
  INSERT INTO profiles (id, name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    COALESCE(NEW.raw_app_meta_data->>'role', 'user')
  );
  RETURN NEW;
END;
$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

## Security Considerations

### Service Role Key Security

- **Server-Side Only**: Never expose service role key in client-side code
- **Full Database Access**: Service role bypasses all RLS policies
- **Environment Protection**: Store in `.env`, never commit to version control
- **Key Rotation**: Regularly rotate service role keys in production
- **Separate Projects**: Use different Supabase projects for dev/staging/prod

### Password Management

- **Strong Defaults**: Script uses secure default passwords
- **Immediate Changes**: Users should change passwords on first login
- **No Hardcoding**: Store default passwords in environment variables
- **Development Only**: Default credentials are for development environments only

### User Account Security

- **Email Verification**: Can be enabled for production environments
- **Role Validation**: Script validates roles before assignment
- **Audit Trail**: All created users are tagged with creation source
- **2FA Recommendation**: Enable two-factor authentication for admin accounts

### Database Security

- **RLS Policies**: Ensure proper Row Level Security policies are in place
- **Principle of Least Privilege**: Assign minimal required permissions
- **Regular Audits**: Review user roles and access regularly
- **Secure Connections**: Always use HTTPS for database connections

### Production Deployment

- **Credential Management**: Use secure credential management systems
- **Access Logging**: Monitor who runs user creation scripts
- **Environment Separation**: Never run dev scripts against production
- **Backup Strategy**: Ensure user data is properly backed up

## Enhanced Error Handling

The script includes comprehensive validation and error handling:

### Pre-execution Validation

- **Environment Variables**: Validates all required Supabase credentials
- **User Configuration**: Checks for duplicate emails, IDs, and invalid formats
- **Database Connection**: Tests connection before proceeding
- **UUID Format**: Validates custom UUIDs if provided
- **Email Format**: Ensures valid email addresses

### Runtime Error Handling

- **Graceful Failures**: Continues processing other users if one fails
- **Detailed Logging**: Shows exactly what succeeded, failed, or was skipped
- **Existing User Detection**: Intelligently handles users that already exist
- **Batch Processing**: Prevents rate limiting with controlled batching
- **Connection Recovery**: Handles temporary connection issues

### Exit Handling

- **Graceful Shutdown**: Handles SIGINT (Ctrl+C) and SIGTERM
- **Process Cleanup**: Ensures clean exit on errors or interruption
- **Status Codes**: Returns appropriate exit codes for scripting

## Troubleshooting

**"Missing environment variables" error:**

- Ensure `.env` file exists with required variables
- Check that `SUPABASE_SERVICE_ROLE_KEY` is the service role, not anon key
- Verify `NEXT_PUBLIC_SUPABASE_URL` or `SUPABASE_URL` is set

**"Configuration validation failed":**

- Check for duplicate emails or UUIDs in your user configuration
- Verify email formats are valid
- Ensure UUIDs follow proper format if specified

**"Connection test failed":**

- Verify your Supabase URL is correct and accessible
- Ensure service role key has proper permissions
- Check if Supabase project is active and not paused

**"User already exists" warnings:**

- Script skips existing users by default (safe behavior)
- Use `list` command to see current users
- Set `updateExisting: true` if you want to update existing users

**Profile/Preferences update failures:**

- Check if your database has the required tables (`profiles`, `user_preferences`)
- Verify RLS policies allow service role operations
- Ensure table schemas match expected structure

**Rate limiting issues:**

- Script includes built-in delays between batches
- Reduce `batchSize` if encountering limits
- Supabase has generous rate limits for service role operations
