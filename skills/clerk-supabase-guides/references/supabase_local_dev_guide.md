# Supabase Local Development & Migrations Reference Guide

## Overview

This reference covers Supabase local development workflows, database migrations, environment management, database seeding, and declarative schema management.

## Prerequisites

- Supabase CLI installed
- Git repository initialized
- Node.js (for certain seeding operations)

## Local Development Setup

### Initialize Supabase Project

```bash
supabase init
```

Creates a `supabase` directory with:

- `config.toml` - Configuration file
- `migrations/` - Migration SQL files
- `seed.sql` - Database seed data
- `schemas/` - Declarative schema files (optional)

### Link to Remote Project

```bash
supabase login
supabase link --project-ref $PROJECT_ID
```

Get `$PROJECT_ID` from dashboard URL: `https://supabase.com/dashboard/project/<project-id>`

### Pull Existing Schema

If your project has existing schema changes made through the dashboard:

```bash
supabase db pull
```

Creates `supabase/migrations/<timestamp>_remote_schema.sql` with current schema.

### Start Local Development

```bash
supabase start
```

Starts local Supabase stack including:

- PostgreSQL database
- Auth server
- Storage server
- Edge Functions
- Dashboard (default: `localhost:54323`)

### Reset Local Database

```bash
supabase db reset
```

Recreates local database from scratch, applies all migrations, and runs seed files.

## Database Migrations

### Creating Migrations

#### Manual Migration (Recommended for complex changes)

```bash
supabase migration new create_employees_table
```

Creates: `supabase/migrations/<timestamp>_create_employees_table.sql`

Example migration content:

```sql
create table if not exists employees (
  id bigint primary key generated always as identity,
  name text not null,
  email text,
  created_at timestamptz default now()
);
```

#### Auto-Generated Migration (From UI changes)

Make changes in Dashboard, then:

```bash
supabase db diff -f migration_name
```

Options:

- `-f <name>` - Save to file
- `--use-migra` - Use migra tool for more concise output (experimental)
- Without `-f` - Output to stdout

### Applying Migrations

```bash
supabase migration up
```

Applies pending migrations to local database.

### Migration Management Commands

```bash
# List migration status
supabase migration list

# Repair corrupted migrations
supabase migration repair

# Squash multiple migrations into one
supabase migration squash

# Generate diff between environments
supabase db diff
```

### Migration from stdin

```bash
supabase migration new new_employee < create_employees_table.sql
```

### Deploying Migrations

```bash
# Deploy to remote database
supabase db push

# Deploy with seed data
supabase db push --include-seed
```

## Environment Management

### Multiple Environment Setup

Typical setup includes:

- Local development
- Staging environment
- Production environment

Each requires separate Supabase projects.

### GitHub Actions Configuration

Create `.github/workflows/ci.yml`:

```yaml
name: CI
on:
  pull_request:
  workflow_dispatch:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: supabase/setup-cli@v1
        with:
          version: latest
      - name: Start Supabase local development setup
        run: supabase db start
      - name: Verify generated types are checked in
        run: |
          supabase gen types typescript --local > types.gen.ts
          if ! git diff --ignore-space-at-eol --exit-code --quiet types.gen.ts; then
            echo "Detected uncommitted changes after build. See status below:"
            git diff
            exit 1
          fi
```

### Environment Variables for CI/CD

Required secrets:

- `SUPABASE_ACCESS_TOKEN` - Personal access token
- `SUPABASE_DB_PASSWORD` - Project database password  
- `SUPABASE_PROJECT_ID` - Project reference ID

### Environment Workflow

1. **Development**: Create feature branch, add migrations
2. **Staging**: Deploy via PR to `develop` branch
3. **Production**: Deploy via PR from `develop` to `main`

### Syncing Environments

To sync production schema to staging:

```bash
supabase db push
```

Or use GitHub Actions to auto-deploy migrations.

## Database Seeding

### Basic Seeding

Create `supabase/seed.sql`:

```sql
insert into public.employees (name)
values 
  ('Erlich Bachman'), 
  ('Richard Hendricks'), 
  ('Monica Hall');
```

Seed files run:

- First time running `supabase start`
- Every time running `supabase db reset`
- After all migrations complete

### Multiple Seed Files

Configure in `config.toml`:

```toml
[db.seed]
enabled = true
sql_paths = ['./countries.sql', './cities.sql']
```

Or use glob patterns:

```toml
[db.seed]
enabled = true
sql_paths = ['./seeds/*.sql']
```

**Notes:**

- Files processed in order declared in `sql_paths`
- Glob patterns sorted lexicographically
- Base folder is `supabase/`
- Duplicate patterns are deduplicated
- Non-matching patterns log warnings

### Generated Seed Data with Snaplet

#### Setup

```bash
npm init -y
npx @snaplet/seed init
```

Creates:

- `seed.config.ts` - Configuration
- `seed.ts` - Example seed script

#### Configuration Example

```typescript
export default defineConfig({
  adapter: async () => {
    const client = new Client({
      connectionString: 'postgresql://postgres:postgres@localhost:54322/postgres',
    })
    await client.connect()
    return new SeedPg(client)
  },
  // Only generate data for public schema
  select: ['!*', 'public.*'],
})
```

#### Seed Script Example

```typescript
import { createSeedClient } from '@snaplet/seed'
import { copycat } from '@snaplet/copycat'

async function main() {
  const seed = await createSeedClient({ dryRun: true })
  
  await seed.Post([
    {
      title: 'There is a lot of snow around here!',
      createdBy: {
        email: (ctx) => copycat.email(ctx.seed, { domain: 'acme.org' }),
      },
      Comment: (x) => x(3), // Generate 3 comments
    },
  ])
  
  process.exit()
}
main()
```

#### Generate Seed File

```bash
npx tsx seed.ts > supabase/seed.sql
```

#### Sync After Schema Changes

```bash
npx @snaplet/seed sync
```

#### Enhanced Data with LLMs

Add to `.env`:

```
OPENAI_API_KEY=<your_openai_api_key>
# or
GROQ_API_KEY=<your_groq_api_key>
```

Then:

```bash
npx @snaplet/seed sync
npx tsx seed.ts > supabase/seed.sql
```

## Declarative Schema Management

### Overview

Declarative schemas let you define desired database state instead of writing step-by-step migration instructions. The CLI generates migrations by comparing your declared schema to the current state.

### Creating Schema Files

Create `supabase/schemas/employees.sql`:

```sql
create table "employees" (
  "id" integer not null,
  "name" text
);
```

### Generate Migration from Schema

```bash
supabase db diff -f create_employees_table
```

### Apply Migrations

```bash
supabase start
supabase migration up
```

### Updating Schema

Edit schema file:

```sql
create table "employees" (
  "id" integer not null,
  "name" text,
  "age" smallint not null  -- New column added
);
```

Generate incremental migration:

```bash
supabase db diff -f add_age
```

**Best Practice:** Always append new columns to avoid messy diffs.

### Schema Dependencies

Files run in lexicographic order by default. For custom ordering, configure in `config.toml`:

```toml
[db.migrations]
schema_paths = [
  "./schemas/employees.sql",
  "./schemas/*.sql",
]
```

### Complex Entities

Declarative schemas work well for:

- Tables
- Views
- Functions
- Indexes

Example with view and function:

```sql
create table "employees" (
  "id" integer not null,
  "name" text,
  "age" smallint not null
);

create view "profiles" as 
  select id, name from "employees";

create function "get_age"(employee_id integer) 
returns smallint 
language "sql"
as $$ 
  select age from employees where id = employee_id;
$$;
```

### Import Existing Production Schema

```bash
supabase db dump > supabase/schemas/prod.sql
```

### Rolling Back During Development

Reset to specific migration version:

```bash
supabase db reset --version 20241005112233
```

**Warning:** Only reset versions not deployed to production.

### Known Limitations

The following require traditional migrations:

**Data Manipulation:**

- INSERT, UPDATE, DELETE statements not captured

**View Issues:**

- View ownership and grants
- Security invoker on views  
- Materialized views
- Column type changes don't recreate views

**RLS Policies:**

- Row Level Security policies not tracked

**Other Entities:**

- Schema privileges (each schema diffed separately)
- Comments not tracked
- Partitions not tracked
- `alter publication ... add table ...`
- Domain statements ignored
- Grant statements duplicated from default privileges

## CLI Tools and Utilities

### Database Inspection

```bash
supabase inspect db
```

Includes 19 commands for:

- Slow query analysis
- Index optimization
- Performance debugging

Use with external database:

```bash
supabase inspect db --db-url postgresql://user:pass@host:port/db
```

### Database Backup

```bash
supabase db dump
```

Uses `pg_dump` with proper permissions handling.

### Testing

```bash
# Create test stub
supabase test new

# Run tests
supabase test db
```

Uses pgTAP testing framework. See [Supabase Test Helpers](https://github.com/usebasejump/supabase-test-helpers) for advanced testing utilities.

### Linting

Database linting available through `plpgsql_check` extension.

### Type Generation

```bash
# Generate TypeScript types
supabase gen types typescript --local > types.gen.ts

# With helper types
# Before: Database['public']['Tables']['movies']['Row']
# After: Tables<'movies'>
```

### Official GitHub Action

Available at: <https://github.com/marketplace/actions/supabase-cli-action>

Use for:

- Type generation on PRs
- Test execution on commits

## CLI Release Channels

### Stable Release

Updated every 2 weeks:

- npm: `latest` tag
- Homebrew: `supabase/tap`
- Binary downloads: GitHub releases

### Beta Release

Updated on every merged PR:

- npm: `beta` tag
- For testing new features

Install beta:

```bash
npm install -g supabase@beta
```

## Local Logging and Debugging

Local logs accessible in Dashboard after running `supabase start`. Includes:

- Database logs
- Auth logs
- Storage logs
- Edge Function logs

No additional configuration required.

## Troubleshooting

### Permission Errors on db pull

```sql
grant all on all tables in schema graphql to postgres, anon, authenticated, service_role;
grant all on all functions in schema graphql to postgres, anon, authenticated, service_role;
grant all on all sequences in schema graphql to postgres, anon, authenticated, service_role;
```

### Permission Errors on db push

Reassign table ownership:

```sql
ALTER TABLE users OWNER TO postgres;
```

Also reassign ownership for types, functions, and schemas as needed.

### Rebasing Migrations

When teammate merges migration to main:

```bash
git pull
supabase migration new dev_A
# Rename file with new timestamp
mv old_timestamp_dev_A.sql new_timestamp_dev_A.sql
supabase db reset
```

### Sync Production to Staging

Deploy existing migrations to staging:

1. Create `develop` branch from `main`
2. Push `develop` to GitHub
3. GitHub Actions deploys migrations

Or manually:

```bash
supabase db push
supabase migration list  # Verify versions match
```

## Best Practices

### Migration Guidelines

- Use descriptive migration names
- Keep migrations focused and small
- Include only DDL in migrations, not DML
- Test migrations locally before deploying
- Never modify deployed migrations

### Schema Management

- Append new columns to avoid diff issues
- Use consistent naming conventions
- Document complex functions and views
- Keep schema files organized by domain

### Environment Management

- Always use separate projects for staging/production
- Test in staging before production deployment
- Use CI/CD for consistent deployments
- Monitor migration deployments

### Seeding Strategy

- Use seed data for reproducible development
- Keep seed data minimal but representative
- Consider using generated data for larger datasets
- Separate seed concerns by domain/table

### Version Control

- Commit migrations before schema changes
- Use meaningful commit messages
- Create PRs for all schema changes
- Review generated migrations carefully
