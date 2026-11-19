# Supabase CLI Complete Reference Guide

## Overview

The Supabase CLI provides tools for local development and deployment to the Supabase Platform. The CLI contains functionality for managing projects, database migrations, Edge Functions, and the local development environment.

**System Requirements:**

- At least 7GB of RAM recommended to start all services
- Docker required for local development stack

## Installation and Authentication

### Initial Setup

```bash
# Initialize a new project
supabase init

# Login to Supabase (requires personal access token)
supabase login

# Link to remote project
supabase link --project-ref <project-ref>
```

### Authentication Methods

- Interactive login via browser
- Token-based login: `--token <token>`
- Environment variable: `SUPABASE_ACCESS_TOKEN`
- Credentials stored in native keyring or `~/.supabase/access-token`

## Global Flags

Available for all commands:

- `--create-ticket` - Create support ticket for CLI errors
- `--debug` - Output debug logs to stderr
- `--dns-resolver <string>` - Specify DNS resolver
- `--experimental` - Enable experimental features
- `--help` - Show help
- `--network-id <string>` - Use specific Docker network
- `--output <format>` - Output format for status variables
- `--profile <string>` - Use specific profile for Supabase API
- `--workdir <path>` - Path to Supabase project directory
- `--yes` - Answer yes to all prompts

## Core Commands

### Project Initialization and Management

#### `supabase init [flags]`

Initialize local project configuration.

**Flags:**

- `--force` - Overwrite existing config.toml
- `--use-orioledb` - Use OrioleDB storage engine
- `--with-intellij-settings` - Generate IntelliJ IDEA settings
- `--with-vscode-settings` - Generate VS Code settings

**Creates:**

- `supabase/config.toml` - Main configuration file
- Directory structure for migrations, functions, tests, etc.

#### `supabase start [flags]`

Start local development stack.

**Flags:**

- `-x, --exclude <strings>` - Containers to exclude: `[gotrue,realtime,storage-api,imgproxy,kong,mailpit,postgrest,postgres-meta,studio,edge-runtime,logflare,vector,supavisor]`
- `--ignore-health-check` - Ignore unhealthy services

**Requirements:**

- Must run `supabase init` first
- Requires `supabase/config.toml`

#### `supabase stop [flags]`

Stop local development stack.

**Flags:**

- `--all` - Stop all local projects on machine
- `--no-backup` - Delete all data volumes
- `--project-id <string>` - Specific project ID to stop

#### `supabase status [flags]`

Show status of local development stack.

**Flags:**

- `--override-name <strings>` - Override specific variable names
- `-o env` - Export connection parameters for supabase-js

**Output includes:**

- API URL, GraphQL URL, DB URL, Studio URL
- JWT secret, anon key, service role key

### Database Operations

#### Migration Commands

##### `supabase migration new <name>`

Create new migration file in `supabase/migrations/`.

##### `supabase migration list [flags]`

List migration history (local vs remote).

**Flags:**

- `--db-url <string>` - Database connection string
- `--linked` - List from linked project
- `--local` - List from local database
- `-p, --password <string>` - Database password

##### `supabase migration repair <version> [flags]`

Repair migration history table.

**Flags:**

- `--status <applied|reverted>` - Version status to update
- `--db-url <string>` - Database connection string
- `--linked` - Repair linked project
- `--local` - Repair local database

##### `supabase migration squash [flags]`

Squash local migrations into single file.

**Limitations:**

- Omits data manipulation statements (INSERT, UPDATE, DELETE)
- Manual restoration required for cron jobs, storage buckets, vault secrets

**Flags:**

- `--version <string>` - Squash up to specified version
- `--db-url <string>` - Database connection string

#### Database Management

##### `supabase db push [flags]`

Push local migrations to remote database.

**Flags:**

- `--dry-run` - Preview changes without applying
- `--include-all` - Include all missing migrations
- `--include-roles` - Include custom roles from `supabase/roles.sql`
- `--include-seed` - Include seed data
- `--db-url <string>` - Database connection string
- `--linked` - Push to linked project
- `--local` - Push to local database

##### `supabase db pull [migration name] [flags]`

Pull schema changes from remote database.

**Flags:**

- `--db-url <string>` - Database connection string
- `--linked` - Pull from linked project
- `--local` - Pull from local database
- `-s, --schema <strings>` - Comma-separated schema list

**Behavior:**

- Creates new migration file in `supabase/migrations/`
- Uses `pg_dump` for initial pull, schema diff for subsequent pulls
- Excludes auth and storage schemas by default

##### `supabase db reset [flags]`

Reset database to clean state.

**Flags:**

- `--db-url <string>` - Database connection string
- `--last <uint>` - Reset to last n migrations
- `--linked` - Reset linked project with local migrations
- `--local` - Reset local database
- `--no-seed` - Skip running seed script
- `--version <string>` - Reset to specified version

##### `supabase db dump [flags]`

Dump database contents.

**Flags:**

- `--data-only` - Dump only data records
- `--role-only` - Dump only cluster roles
- `-f, --file <string>` - Output file path
- `--keep-comments` - Keep commented lines
- `--use-copy` - Use COPY statements instead of INSERTs
- `-x, --exclude <strings>` - Exclude schema.tables from data dump
- `-s, --schema <strings>` - Include specific schemas

##### `supabase db diff [flags]`

Diff schema changes between databases.

**Flags:**

- `-f, --file <string>` - Save diff as new migration file
- `--use-migra` - Use migra for schema diff
- `--use-pg-schema` - Use pg-schema-diff
- `--use-pgadmin` - Use pgAdmin for schema diff
- `-s, --schema <strings>` - Include specific schemas

**Known Limitations:**

- May fail with publication changes
- Issues with storage bucket changes
- Problems with views containing `security_invoker` attributes

##### `supabase db lint [flags]`

Lint database for schema errors.

**Flags:**

- `--level <warning|error>` - Error level to emit
- `--fail-on <none|warning|error>` - Exit code behavior
- `-s, --schema <strings>` - Include specific schemas

Uses `plpgsql_check` extension for validation.

#### Database Inspection

##### Query Analysis Commands

- `supabase inspect db calls` - Queries ordered by call frequency
- `supabase inspect db outliers` - Queries by total execution time
- `supabase inspect db long-running-queries` - Queries running >5 minutes

##### Lock and Blocking Analysis

- `supabase inspect db blocking` - Blocked and blocking statements
- `supabase inspect db locks` - Exclusive locks on relations

##### Performance Analysis

- `supabase inspect db bloat` - Table and index bloat estimation
- `supabase inspect db vacuum-stats` - Vacuum activity statistics
- `supabase inspect db replication-slots` - Replication slot information

##### Statistics Commands

- `supabase inspect db db-stats` - Database statistics
- `supabase inspect db index-stats` - Index usage statistics
- `supabase inspect db table-stats` - Table statistics
- `supabase inspect db role-stats` - Role statistics

##### `supabase inspect report [flags]`

Generate comprehensive inspection report.

**Flags:**

- `--output-dir <string>` - Path for CSV files

### Testing

#### `supabase test db [path] [flags]`

Execute pgTAP tests against database.

**Flags:**

- `--db-url <string>` - Database connection string
- `--linked` - Test linked project
- `--local` - Test local database

**Requirements:**

- Test files in `supabase/tests/` directory
- Files with `.sql` or `.pg` extension
- Each test runs in separate transaction (auto-rollback)

#### `supabase test new <name> [flags]`

Create new test file.

**Flags:**

- `-t, --template <pgtap>` - Template framework

### Type Generation

#### `supabase gen types [flags]`

Generate type definitions from database schema.

**Flags:**

- `--lang <typescript|go|swift>` - Output language (default: typescript)
- `--db-url <string>` - Database connection string
- `--linked` - Generate from linked project
- `--local` - Generate from local database
- `--project-id <string>` - Generate from project ID
- `-s, --schema <strings>` - Include specific schemas
- `--swift-access-control <internal|public>` - Swift access control
- `--postgrest-v9-compat` - PostgREST v9 compatibility (with --db-url only)

#### `supabase gen keys [flags]`

Generate API keys.

**Flags:**

- `--override-name <strings>` - Override variable names
- `--project-ref <string>` - Project reference
- `--experimental` - Enable experimental features

#### `supabase gen signing-key [flags]`

Generate JWT signing key.

**Flags:**

- `--algorithm <RS256|ES256>` - Algorithm (ES256 recommended)
- `--append` - Append to existing keys file

**Supported Algorithms:**

- ES256: ECDSA with P-256 curve and SHA-256 (recommended)
- RS256: RSA with SHA-256

### Edge Functions

#### `supabase functions new <name>`

Create new Edge Function with boilerplate code.

Creates directory `supabase/functions/<name>/index.ts` with starter code.

#### `supabase functions serve [flags]`

Serve all functions locally with debugging support.

**Flags:**

- `--env-file <string>` - Path to environment file
- `--import-map <string>` - Path to import map file
- `--inspect` - Alias for `--inspect-mode brk`
- `--inspect-mode <run|brk|wait>` - Inspector capability
  - `run`: Allow connections without additional behavior
  - `brk`: Set breakpoint at first line
  - `wait`: Pause until inspector session connects
- `--inspect-main` - Allow inspecting main worker
- `--no-verify-jwt` - Disable JWT verification

**Configuration in `supabase/config.toml`:**

```toml
[edge_runtime]
inspector_port = 8083
policy = "per_worker" # or "oneshot"
```

#### `supabase functions deploy [name] [flags]`

Deploy functions to linked project.

**Flags:**

- `--import-map <string>` - Path to import map file
- `-j, --jobs <uint>` - Max parallel jobs
- `--no-verify-jwt` - Disable JWT verification
- `--project-ref <string>` - Project reference
- `--prune` - Delete remote functions not present locally
- `--use-api` - Use Management API for bundling
- `--use-docker` - Use Docker for bundling

#### `supabase functions list [flags]`

List all functions in linked project.

#### `supabase functions download <name> [flags]`

Download function source code from linked project.

**Flags:**

- `--legacy-bundle` - Use legacy bundling mechanism

#### `supabase functions delete <name> [flags]`

Delete function from linked project (local files preserved).

### Project Management

#### `supabase projects create [name] [flags]`

Create new Supabase project.

**Flags:**

- `--db-password <string>` - Database password
- `--org-id <string>` - Organization ID
- `--region <string>` - Deployment region
- `--size <string>` - Instance size

#### `supabase projects list`

List accessible projects.

#### `supabase projects api-keys [flags]`

Get project API keys.

#### `supabase projects delete [ref]`

Delete project.

#### Organizations

- `supabase orgs create` - Create organization
- `supabase orgs list` - List organizations

### Configuration Management

#### `supabase config push [flags]`

Push local config.toml to remote project.

**Flags:**

- `--project-ref <string>` - Project reference

### Branch Management

#### `supabase branches create [name] [flags]`

Create preview branch.

**Flags:**

- `--persistent` - Create persistent branch
- `--region <string>` - Branch region
- `--size <string>` - Instance size
- `--with-data` - Clone production data

#### Branch Operations

- `supabase branches list` - List preview branches
- `supabase branches get <name>` - Get branch details
- `supabase branches update <name> [flags]` - Update branch
- `supabase branches delete <name>` - Delete branch

### Secrets Management

#### `supabase secrets set <NAME=VALUE> [flags]`

Set environment secrets for Edge Functions.

**Flags:**

- `--env-file <string>` - Load from .env file
- `--project-ref <string>` - Project reference

#### Secret Operations

- `supabase secrets list` - List all secrets
- `supabase secrets unset <name>` - Remove secret

### Storage Management

**Note:** Storage commands require `--experimental` flag.

#### `supabase storage ls [path] [flags]`

List storage objects.

**Flags:**

- `-r, --recursive` - Recursive listing
- `--linked` - Use linked project
- `--local` - Use local storage

#### Storage Operations

- `supabase storage cp <src> <dst> [flags]` - Copy files
- `supabase storage mv <src> <dst> [flags]` - Move files  
- `supabase storage rm <file> [flags]` - Remove files

**Additional Flags for cp:**

- `--cache-control <string>` - Custom cache control header
- `--content-type <string>` - Custom content type
- `-j, --jobs <uint>` - Max parallel jobs

### SSO Management

#### `supabase sso add [flags]`

Add SSO identity provider.

**Flags:**

- `-t, --type <saml>` - Identity provider type
- `--metadata-url <string>` - SAML 2.0 metadata URL
- `--metadata-file <string>` - SAML 2.0 metadata file
- `--domains <strings>` - Associated email domains
- `--attribute-mapping-file <string>` - JSON attribute mapping
- `--skip-url-validation` - Skip URL validation

#### SSO Operations

- `supabase sso list` - List SSO providers
- `supabase sso show <provider-id> [flags]` - Show provider details
- `supabase sso info` - Show project SAML configuration
- `supabase sso update <provider-id> [flags]` - Update provider
- `supabase sso remove <provider-id>` - Remove provider

### Domain Management

**Note:** Custom domains and vanity subdomains are mutually exclusive.

#### Custom Domains

- `supabase domains create [flags]` - Create custom hostname
- `supabase domains get` - Get domain configuration
- `supabase domains activate` - Activate custom domain
- `supabase domains reverify` - Reverify domain
- `supabase domains delete` - Delete custom domain

#### Vanity Subdomains

- `supabase vanity-subdomains activate [flags]` - Activate vanity subdomain
- `supabase vanity-subdomains get` - Get subdomain configuration
- `supabase vanity-subdomains check-availability [flags]` - Check availability
- `supabase vanity-subdomains delete` - Delete vanity subdomain

### Security Management

#### Network Management

- `supabase network-bans get` - View IP bans
- `supabase network-bans remove [flags]` - Remove IP bans
- `supabase network-restrictions get` - View network restrictions
- `supabase network-restrictions update [flags]` - Update restrictions

#### SSL Configuration

- `supabase ssl-enforcement get` - Get SSL enforcement status
- `supabase ssl-enforcement update [flags]` - Update SSL enforcement

#### PostgreSQL Configuration

- `supabase postgres-config get` - Get Postgres configuration
- `supabase postgres-config update [flags]` - Update configuration
- `supabase postgres-config delete [flags]` - Delete configuration overrides

**Warning:** Custom Postgres configuration may result in unstable database behavior and override compute add-on optimizations.

### Encryption Management

- `supabase encryption get-root-key` - Get root encryption key
- `supabase encryption update-root-key` - Update root encryption key

### SQL Snippets

- `supabase snippets list` - List SQL snippets
- `supabase snippets download <snippet-id>` - Download snippet content

### Shell Completion

#### `supabase completion <shell>`

Generate shell completion scripts.

**Supported Shells:**

- `bash` - Bash completion
- `zsh` - Zsh completion  
- `fish` - Fish completion
- `powershell` - PowerShell completion

**Installation Examples:**

```bash
# Bash (Linux)
supabase completion bash > /etc/bash_completion.d/supabase

# Zsh (macOS)
supabase completion zsh > $(brew --prefix)/share/zsh/site-functions/_supabase

# Fish
supabase completion fish > ~/.config/fish/completions/supabase.fish
```

## Common Workflows

### Local Development Setup

```bash
# 1. Initialize project
supabase init

# 2. Start local stack
supabase start

# 3. Check status
supabase status

# 4. Create migration
supabase migration new initial_schema

# 5. Reset database (apply migrations)
supabase db reset
```

### Remote Database Operations

```bash
# Link to remote project
supabase link --project-ref <project-ref>

# Pull remote schema
supabase db pull

# Push local changes
supabase db push --dry-run  # Preview changes
supabase db push           # Apply changes

# Generate types
supabase gen types --linked --lang typescript > types.ts
```

### Edge Function Development

```bash
# Create function
supabase functions new my-function

# Serve locally with debugging
supabase functions serve --inspect

# Deploy to remote
supabase functions deploy my-function
```

### Testing Workflow

```bash
# Create test
supabase test new my_test

# Run tests locally
supabase test db

# Run tests on linked project
supabase test db --linked
```

## Environment Variables

### Authentication

- `SUPABASE_ACCESS_TOKEN` - Bypass login requirement
- `SUPABASE_DB_PASSWORD` - Database password for linking

### Configuration

- `SUPABASE_WORKDIR` - Override project directory path

## File Structure

```
project/
├── supabase/
│   ├── config.toml          # Main configuration
│   ├── seed.sql            # Seed data
│   ├── roles.sql           # Custom roles
│   ├── migrations/         # Schema migrations
│   │   └── <timestamp>_<name>.sql
│   ├── functions/          # Edge Functions
│   │   └── <function-name>/
│   │       └── index.ts
│   └── tests/             # pgTAP tests
│       └── <test-name>.sql
```

## Error Handling and Troubleshooting

### Common Issues

- **Health check failures:** Use `--ignore-health-check` flag
- **Migration conflicts:** Use `supabase migration repair`
- **Schema diff failures:** Known issues with publications, storage buckets, security_invoker views
- **Memory requirements:** Ensure at least 7GB RAM for all services

### Debug Mode

Use `--debug` flag with any command for verbose output.

### Support

Use `--create-ticket` flag to automatically create support tickets for CLI errors.

## Limitations and Constraints

### Schema Diffing

- May not capture publication changes
- Storage bucket modifications not fully supported  
- Views with `security_invoker` attributes cause issues

### Migration Squashing

- Data manipulation statements (INSERT, UPDATE, DELETE) are omitted
- Manual restoration required for:
  - Cron jobs
  - Storage buckets  
  - Vault encrypted secrets

### Local Development

- Requires Docker
- Minimum 7GB RAM recommended
- Health checks may fail in resource-constrained environments

### Remote Operations

- Database operations require project linking
- Some commands need database password
- Network connectivity required for remote operations
