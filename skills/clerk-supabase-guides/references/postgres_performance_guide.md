# PostgreSQL Performance Reference Guide

## Table of Contents

1. [Row Level Security (RLS) Performance](#rls-performance)
2. [Declarative Database Schemas](#declarative-schemas)
3. [PostgreSQL Insert Performance](#insert-performance)

---

## Row Level Security (RLS) Performance {#rls-performance}

### Performance Impact Assessment

RLS can significantly impact query performance, especially on operations that examine every row (SELECT, UPDATE, queries with LIMIT/OFFSET).

**Testing RLS Performance:**

```sql
-- Switch to test mode (non-production only)
set session role authenticated;
set request.jwt.claims to '{"role":"authenticated", "sub":"5950b438-b07c-4012-8190-6ce79e4bd8e5"}';
explain analyze SELECT count(*) FROM table_name;
set session role postgres;
```

**Enable explain for PostgREST clients:**

```sql
alter role authenticator set pgrst.db_plan_enabled to true;
NOTIFY pgrst, 'reload config';
```

```javascript
// Client-side performance analysis
const { data, error } = await supabase
  .from('projects')
  .select('*')
  .eq('id', 1)
  .explain({ analyze: true })
```

### RLS Optimization Techniques

#### 1. Index Non-Primary Key Columns Used in RLS

**Before:**

```sql
-- Policy
auth.uid() = user_id
```

**After:**

```sql
-- Add index
create index userid on test_table using btree (user_id) tablespace pg_default;
```

**Performance gain:** Up to 100x improvement on large tables

#### 2. Wrap Functions in SELECT Statements

**Purpose:** Creates initPlan for function caching instead of per-row execution

**Before:**

```sql
is_admin() or auth.uid() = user_id
```

**After:**

```sql
(select is_admin()) OR (select auth.uid()) = user_id
```

**Warning:** Only use when function results don't change based on row data

**Sample Security Definer Function:**

```sql
CREATE OR REPLACE FUNCTION is_admin() RETURNS boolean as $$
begin 
  return exists(select from rlstest_roles where auth.uid() = user_id and role = 'admin');
end;
$$ language plpgsql security definer;
```

#### 3. Separate Filtering from Security

**Don't rely on RLS for filtering - use explicit filters**

**Before:**

```javascript
.from('table').select()
// With RLS: auth.uid() = user_id
```

**After:**

```javascript
.from('table').select().eq('user_id', userId)
// Still has RLS for security, but explicit filter for performance
```

#### 4. Use Security Definer Functions for Cross-Table Queries

**Before:**

```sql
-- Both tables have RLS
exists (select 1 from roles_table where auth.uid() = user_id and role = 'good_role')
```

**After:**

```sql
-- Bypass RLS on roles_table
(select has_role())
```

```sql
CREATE OR REPLACE FUNCTION has_role() RETURNS boolean as $$
begin 
  return exists (select 1 from roles_table where auth.uid() = user_id and role = 'good_role');
end;
$$ language plpgsql security definer;
```

#### 5. Optimize Join Queries

**Before (slow):**

```sql
auth.uid() in (select user_id from team_user where team_user.team_id = table.team_id)
```

**After (fast):**

```sql
team_id in (select team_id from team_user where user_id = auth.uid())
```

**Or with security definer function:**

```sql
team_id in (select user_teams())
```

#### 6. Use Role-based Access Control

**Always specify roles in policies:**

- Use `TO authenticated` instead of `TO public`
- Never rely only on `auth.uid()` checks for anon exclusion
- Use dashboard roles dropdown or TO clause

### RLS Performance Results

| Test | Before | After | Improvement |
|------|--------|--------|-------------|
| Index on user_id | 171ms | <0.1ms | 1700x |
| Wrapped auth.uid() | 179ms | 9ms | 20x |
| Wrapped is_admin() | 11,000ms | 7ms | 1571x |
| Security definer function | 178,000ms | 12ms | 14,833x |
| Optimized joins | 9,000ms | 20ms | 450x |
| TO authenticated (for anon) | 170ms | <0.1ms | 1700x |

### Advanced RLS Patterns

**Array-based team membership function:**

```sql
CREATE OR REPLACE FUNCTION user_teams() RETURNS int[] as $$
begin 
  return array(select team_id from team_user where auth.uid() = user_id);
end;
$$ language plpgsql security definer;
```

**Usage with proper wrapping and indexing:**

```sql
-- Policy
team_id = ANY(ARRAY(select user_teams()))

-- Required index
create index team_id_idx on main_table(team_id);
```

**Performance with different team counts:**

- 10 teams: 2ms
- 100 teams: 3ms  
- 500 teams: 3ms
- 1000+ teams: 24ms

---

## Declarative Database Schemas {#declarative-schemas}

### Overview

Declarative schemas define the desired final state of database structure in `.sql` files, stored alongside project code in version control.

### Benefits

**Single Pane of Glass:**

- Entire database schema in one location
- Eliminates redundancy and potential errors
- Centralized maintenance

**Versioned Migrations:**

- Automatic migration file generation
- Consistent schema updates across environments
- Version control integration

**Simplified Code Reviews:**

- Review table/view/function changes without complex migration scripts
- Clear diff visualization
- Easier conflict resolution

### Traditional Migration Problems

**Complex Schema Example:**

```sql
-- Multiple files spread across migrations
create table private.projects (
  id bigint not null,
  name text not null,
  organization_id bigint not null,
  inserted_at timestamp not null,
  updated_at timestamp not null
);

alter table private.projects enable row level security;

create policy projects_select 
  on private.projects 
  for select 
  to authenticated
  using auth.can_read(project_id);

-- Public view
create view public.projects as select
  projects.id,
  projects.name,
  projects.organization_id,
  projects.inserted_at,
  projects.updated_at
from private.projects
where auth.can_read(projects.id);

-- Trigger for view updates
create function public.public_projects_on_insert() returns trigger
as $$
begin
  insert into private.projects(
    name,
    organization_id,
    inserted_at,
    updated_at
  ) values (
    NEW.name,
    NEW.organization_id,
    coalesce(NEW.inserted_at, now()),
    coalesce(NEW.updated_at, now())
  ) returning * into NEW;
  return NEW;
end
$$ language plpgsql;

create trigger public_projects_on_insert
  instead of insert
  on public.projects
  for each row
execute function public.public_projects_on_insert();
```

**Traditional Process Issues:**

1. Find latest schema across multiple migration files
2. Write ALTER statement in new migration
3. Update all dependent views/functions
4. Copy and modify trigger functions
5. Update tests
6. Review hundreds of lines of migration code
7. Resolve merge conflicts manually

### Declarative Schema Solution

**Simple Schema File (`supabase/schemas/projects.sql`):**

```sql
create table private.projects (
  id bigint not null,
  name text not null,
  organization_id bigint not null,
  metadata jsonb,  -- Single line addition
  inserted_at timestamp not null,
  updated_at timestamp not null
);

alter table private.projects enable row level security;

create policy projects_select 
  on private.projects 
  for select 
  to authenticated
  using auth.can_read(project_id);

-- All related entities in one file
create view public.projects as select
  projects.id,
  projects.name,
  projects.organization_id,
  projects.metadata,  -- Automatically included
  projects.inserted_at,
  projects.updated_at
from private.projects
where auth.can_read(projects.id);

-- Trigger automatically updated by schema diff tool
create function public.public_projects_on_insert() returns trigger
as $$
begin
  insert into private.projects(
    name,
    organization_id,
    metadata,  -- Automatically included
    inserted_at,
    updated_at
  ) values (
    NEW.name,
    NEW.organization_id,
    NEW.metadata,  -- Automatically included
    coalesce(NEW.inserted_at, now()),
    coalesce(NEW.updated_at, now())
  ) returning * into NEW;
  return NEW;
end
$$ language plpgsql;
```

**Change Process:**

1. Edit single schema file
2. Run schema diff tool (like `migra`)
3. Review generated migration
4. Deploy

### Implementation

**Schema diff tools:**

- [migra](https://github.com/djrobstep/migra) - PostgreSQL schema diff
- Supabase CLI built-in schema management

**File Organization:**

```
project/
├── supabase/
│   ├── schemas/
│   │   ├── projects.sql
│   │   ├── users.sql
│   │   └── analytics.sql
│   └── migrations/
│       ├── 001_initial.sql
│       └── 002_add_metadata.sql  # Auto-generated
└── src/
```

**Workflow:**

1. Define complete schema state in declarative files
2. Use CLI to generate migration from current state to desired state
3. Review and apply generated migration
4. Commit both schema files and migration files

### Migration Generation

**Supabase CLI commands:**

```bash
# Generate migration from schema diff
supabase db diff -f new_migration_name

# Apply migrations
supabase db push

# Reset to schema state
supabase db reset
```

---

## PostgreSQL Insert Performance {#insert-performance}

### Core Performance Principles

**Batch Operations:**

- Insert hundreds/thousands of rows per statement
- Use parallel INSERT/COPY commands
- Avoid row-by-row insertion

**Resource Management:**

- Match client CPU cores to parallel workers
- Use performant storage (SSD preferred)
- Separate WAL and data disks where possible
- Optimize shared_buffers (25% of RAM)

### Insert Methods Performance Comparison

| Method | Batch Size | Performance | Use Case |
|--------|------------|-------------|----------|
| INSERT...VALUES | 1 row | Slowest | Single record |
| INSERT...VALUES | 1000+ rows | Good | General batching |
| INSERT...UNNEST | 1000+ rows | 2x faster than VALUES | Flexible batching |
| COPY (text) | Large batches | Very fast | Bulk loading |
| COPY (binary) | Large batches | Fastest (19x) | Maximum throughput |

### General PostgreSQL Optimization

#### 1. Index Management

**Principle:** Indexes slow down inserts due to maintenance overhead

**Analysis:**

```sql
-- Check existing indexes
\d table_name

-- Evaluate index necessity vs insert cost
-- Consider dropping non-essential indexes during bulk loads
```

**Best Practices:**

- Minimize indexes during high-volume inserts
- Drop and recreate indexes for bulk loads
- Use UNLOGGED tables for temporary high-volume inserts

#### 2. Constraint Optimization

**Foreign Key Constraints:**

- Consider disabling during bulk loads
- Re-enable with validation after load completes
- Use deferred constraints where appropriate

**Unique Constraints:**

- Avoid unnecessary UNIQUE constraints
- Consider using partial unique indexes instead

#### 3. Storage Configuration

**Disk Setup:**

- Use high-performance SSDs (1000+ read IOPS, 100+ write IOPS)
- Separate WAL and data on different disks
- Consider hardware RAID with battery-backed cache

**Memory Configuration:**

```sql
-- Set shared_buffers to ~25% of available RAM
shared_buffers = '2GB'  -- For 8GB system

-- For bulk loading
max_wal_size = '4GB'
checkpoint_segments = 32  -- Older versions
```

#### 4. Batch Insert Techniques

**INSERT...VALUES (Standard):**

```sql
INSERT INTO table_name (col1, col2, col3) VALUES
  ('val1', 'val2', 'val3'),
  ('val4', 'val5', 'val6'),
  -- ... hundreds/thousands of rows
  ('valN', 'valN+1', 'valN+2');
```

**INSERT...UNNEST (2x Performance Boost):**

```sql
INSERT INTO table_name (col1, col2, col3)
SELECT * FROM UNNEST(
  ARRAY['val1', 'val4', 'valN'],      -- col1 values
  ARRAY['val2', 'val5', 'valN+1'],    -- col2 values  
  ARRAY['val3', 'val6', 'valN+2']     -- col3 values
);
```

**COPY (Maximum Performance):**

```sql
-- Text format
COPY table_name (col1, col2, col3) FROM STDIN WITH (FORMAT text);
val1 val2 val3
val4 val5 val6
\.

-- Binary format (fastest)
COPY table_name (col1, col2, col3) FROM STDIN WITH (FORMAT binary);
```

#### 5. Parallel Processing

**Client-Side Parallelization:**

```python
# Example: Multiple INSERT workers
import concurrent.futures
import psycopg2

def insert_batch(connection_params, data_batch):
    conn = psycopg2.connect(**connection_params)
    cur = conn.cursor()
    cur.execute("INSERT INTO table VALUES %s", data_batch)
    conn.commit()
    conn.close()

# Run multiple batches in parallel
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
    futures = []
    for batch in data_batches:
        future = executor.submit(insert_batch, conn_params, batch)
        futures.append(future)
```

**Resource Requirements:**

- Match CPU cores to parallel workers
- Ensure adequate database connection limits
- Monitor lock contention on target tables

#### 6. Time-Series Specific Optimizations

**Insert Order:**

- Insert in loose time order (day 1 across all sources, then day 2)
- Avoid sequential insertion by source (prevents disk thrashing)
- Consider partitioning by time for very large datasets

**TimescaleDB Enhancements:**

```sql
-- Create hypertable for time-series data
SELECT create_hypertable('sensor_data', 'timestamp');

-- Parallel COPY for large datasets
timescaledb-parallel-copy --connection "host=localhost user=postgres" 
  --table sensor_data --file data.csv --workers 4
```

### Performance Configuration

#### PostgreSQL Settings for Bulk Loading

**High-Performance (Risk: Data Loss on Crash):**

```sql
-- ONLY for bulk loading, restore defaults after
fsync = off
full_page_writes = off
synchronous_commit = off
checkpoint_completion_target = 0.9
max_wal_size = '4GB'
```

**Safe High-Performance:**

```sql
shared_buffers = '25% of RAM'
max_wal_size = '2GB'
checkpoint_completion_target = 0.9
random_page_cost = 1.1  -- For SSDs
effective_cache_size = '75% of RAM'
```

#### Application-Level Optimizations

**Connection Management:**

- Use connection pooling (PgBouncer, built-in pooling)
- Minimize connection overhead for batch operations
- Consider prepared statements for repeated inserts

**Network Optimization:**

- Co-locate client and database in same region/AZ
- Use appropriate network bandwidth for data volume
- Monitor network latency impact on small batches

**Prepared Statements:**

```sql
-- Ensure optimal plan caching
SET plan_cache_mode = 'auto';  -- Default, good for most cases
-- or
SET plan_cache_mode = 'force_generic_plan';  -- For consistent batch inserts
```

### Measurement and Testing

**Performance Testing Setup:**

```sql
-- Enable timing
\timing on

-- Test with explain analyze
EXPLAIN (ANALYZE, BUFFERS) INSERT INTO test_table 
SELECT generate_series(1, 100000), random(), random();
```

**Key Metrics:**

- Rows per second throughput
- CPU utilization during inserts
- I/O wait times
- WAL generation rate
- Lock wait times

**Benchmarking Tools:**

- pgbench for standardized testing
- Custom tools for application-specific patterns
- Monitor pg_stat_statements for query performance

### Troubleshooting Performance Issues

**Common Bottlenecks:**

1. **Too Many Indexes:** Review necessity, drop during bulk loads
2. **Small Batch Sizes:** Increase to 1000+ rows per INSERT
3. **Sequential Processing:** Implement parallel workers
4. **Disk I/O:** Move to faster storage, separate WAL disk
5. **Foreign Key Checks:** Disable/defer during bulk operations
6. **Lock Contention:** Partition tables, stagger operations

**Diagnostic Queries:**

```sql
-- Check for lock waits
SELECT * FROM pg_locks WHERE NOT granted;

-- Monitor WAL generation
SELECT * FROM pg_stat_wal;

-- Check checkpoint frequency
SELECT * FROM pg_stat_bgwriter;

-- Table size and bloat
SELECT schemaname, tablename, 
       pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename))
FROM pg_tables WHERE schemaname = 'public';
```
