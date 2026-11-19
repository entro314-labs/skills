# Supabase Testing and Extensions Reference Guide

## Table of Contents

1. [Database Testing](#database-testing)
   - [Basic Testing with Supabase CLI](#basic-testing-with-supabase-cli)
   - [Advanced pgTAP Testing](#advanced-pgtap-testing)
2. [Database Extensions](#database-extensions)
   - [http: RESTful Client](#http-restful-client)
   - [index_advisor: Query Optimization](#index_advisor-query-optimization)
   - [pg_jsonschema: JSON Schema Validation](#pg_jsonschema-json-schema-validation)
   - [pgvector: Embeddings and Vector Similarity](#pgvector-embeddings-and-vector-similarity)
   - [pg_repack: Physical Storage Optimization](#pg_repack-physical-storage-optimization)
   - [plpgsql_check: PL/pgSQL Linter](#plpgsql_check-plpgsql-linter)
   - [uuid-ossp: Unique Identifiers](#uuid-ossp-unique-identifiers)

---

## Database Testing

### Basic Testing with Supabase CLI

#### Requirements

- Supabase CLI v1.11.4 or higher

#### Setup

```bash
# Create tests directory
mkdir -p ./supabase/tests/database

# Create test file
touch ./supabase/tests/database/hello_world.test.sql
```

#### Writing Tests

All `.sql` files use pgTAP as the test runner.

**Basic test structure:**

```sql
begin;
select plan(1); -- specify number of tests

SELECT has_column(
    'auth', 
    'users', 
    'id', 
    'id should exist'
);

select * from finish();
rollback;
```

#### Running Tests

```bash
supabase test db
```

**Expected output:**

```
supabase/tests/database/hello_world.test.sql .. ok
All tests successful.
Files=1, Tests=1, 1 wallclock secs ( 0.01 usr 0.00 sys + 0.04 cusr 0.02 csys = 0.07 CPU)
Result: PASS
```

### Advanced pgTAP Testing

#### Setting up database.dev

**Prerequisites installation:**

```sql
create extension if not exists http with schema extensions;
create extension if not exists pg_tle;

drop extension if exists "supabase-dbdev";
select pgtle.uninstall_extension_if_exists('supabase-dbdev');

select pgtle.install_extension(
    'supabase-dbdev',
    resp.contents ->> 'version',
    'PostgreSQL package manager',
    resp.contents ->> 'sql'
)
from http((
    'GET',
    'https://api.database.dev/rest/v1/' ||
    'package_versions?select=sql,version' ||
    '&package_name=eq.supabase-dbdev' ||
    '&order=version.desc' ||
    '&limit=1',
    array[('apiKey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtdXB0cHBsZnZpaWZyYndtbXR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAxMDczNzIsImV4cCI6MTk5NTY4MzM3Mn0.z2CN0mvO2No8wSi46Gw59DFGCTJrzM0AQKsu_5k134s')::http_header],
    null,
    null
)) x,
lateral (
    select ((row_to_json(x) -> 'content') #>> '{}')::json -> 0
) resp(contents);

create extension "supabase-dbdev";
select dbdev.install('supabase-dbdev');

drop extension if exists "supabase-dbdev";
create extension "supabase-dbdev";
```

#### Installing Test Helpers

```sql
select dbdev.install('basejump-supabase_test_helpers');
create extension if not exists "basejump-supabase_test_helpers" version '0.0.6';
```

#### Test Helper Functions

**User Management:**

- `tests.create_supabase_user()` - Create test users
- `tests.authenticate_as()` - Switch user contexts
- `tests.get_supabase_uid()` - Retrieve user IDs
- `tests.authenticate_as_service_role()` - Authenticate as service role
- `tests.clear_authentication()` - Clear authentication

**RLS Testing:**

- `tests.rls_enabled()` - Verify RLS status on tables
- Test policy enforcement across different user contexts

**Time Management:**

- `tests.freeze_time()` - Freeze time for testing
- `tests.unfreeze_time()` - Resume normal time

#### Test File Organization

**Setup file naming:** Use `000-setup-tests-hooks.sql` to run first.

**Setup file example:**

```sql
-- Install test utilities
create extension if not exists pgtap with schema extensions;

-- Install dbdev (complete installation code from above)

-- Install test helpers
select dbdev.install('basejump-supabase_test_helpers');
create extension if not exists "basejump-supabase_test_helpers" version '0.0.6';

-- Verify setup
begin;
select plan(1);
select ok(true, 'Pre-test hook completed successfully');
select * from finish();
rollback;
```

#### Schema-wide RLS Testing

```sql
begin;
select plan(1);

-- Verify RLS is enabled on all tables in public schema
select tests.rls_enabled('public');

select * from finish();
rollback;
```

#### Advanced RLS Testing Example

```sql
begin;
select plan(4);

-- Create test users
select tests.create_supabase_user('user1@test.com');
select tests.create_supabase_user('user2@test.com');

-- Create test data
insert into public.todos (task, user_id) values 
    ('User 1 Task 1', tests.get_supabase_uid('user1@test.com')),
    ('User 1 Task 2', tests.get_supabase_uid('user1@test.com')),
    ('User 2 Task 1', tests.get_supabase_uid('user2@test.com'));

-- Test as User 1
select tests.authenticate_as('user1@test.com');

select results_eq(
    'select count(*) from todos',
    ARRAY[2::bigint],
    'User 1 should only see their 2 todos'
);

-- Test User 1 can create their own todo
select lives_ok(
    $$insert into todos (task, user_id) 
      values ('New Task', tests.get_supabase_uid('user1@test.com'))$$,
    'User 1 can create their own todo'
);

-- Test as User 2
select tests.authenticate_as('user2@test.com');

select results_eq(
    'select count(*) from todos',
    ARRAY[1::bigint],
    'User 2 should only see their 1 todo'
);

-- Test User 2 cannot modify User 1's todo
SELECT results_ne(
    $$ update todos set task = 'Hacked!' 
       where user_id = tests.get_supabase_uid('user1@test.com') 
       returning 1 $$,
    $$ values(1) $$,
    'User 2 cannot modify User 1 todos'
);

select * from finish();
rollback;
```

---

## Database Extensions

### http: RESTful Client

#### Overview

Make RESTful API calls directly from PostgreSQL.

#### Enable Extension

Dashboard → Database → Extensions → Search "http" → Enable

#### Functions

- `http('http_request')` - Main function
- `http_get()` - GET requests
- `http_post()` - POST requests  
- `http_put()` - PUT requests
- `http_delete()` - DELETE requests
- `http_head()` - HEAD requests

#### Return Values

```sql
status: integer
content_type: character varying
headers: http_header[]
content: character varying  -- Cast to jsonb with content::jsonb
```

#### Examples

**GET request:**

```sql
select "status", "content"::jsonb
from http_get('https://jsonplaceholder.typicode.com/todos/1');
```

**POST request:**

```sql
select "status", "content"::jsonb
from http_post(
    'https://jsonplaceholder.typicode.com/posts',
    '{ "title": "foo", "body": "bar", "userId": 1 }',
    'application/json'
);
```

### index_advisor: Query Optimization

#### Overview

Recommends indexes to improve query performance.

#### Features

- Supports generic parameters (`$1`, `$2`)
- Supports materialized views
- Identifies tables/columns obfuscated by views
- Skips duplicate indexes

#### Enable Extension

```sql
create extension index_advisor;
```

#### Function Signature

```sql
index_advisor(query text)
returns table (
    startup_cost_before jsonb,
    startup_cost_after jsonb,
    total_cost_before jsonb,
    total_cost_after jsonb,
    index_statements text[],
    errors text[]
)
```

#### Basic Example

```sql
create table book(
    id int primary key,
    title text not null
);

select *
from index_advisor('select book.id from book where title = $1');

-- Returns:
-- startup_cost_before | startup_cost_after | total_cost_before | total_cost_after | index_statements | errors
-- 0.00               | 1.17               | 25.88             | 6.40             | {"CREATE INDEX ON public.book USING btree (title)"} | {}
```

#### Complex Query Example

```sql
select *
from index_advisor('
    select book.id, book.title, publisher.name as publisher_name,
           author.name as author_name, review.body review_body
    from book 
    join publisher on book.publisher_id = publisher.id
    join author on book.author_id = author.id  
    join review on book.id = review.book_id
    where author.id = $1 and publisher.id = $2
');

-- Returns multiple index recommendations:
-- {"CREATE INDEX ON public.book USING btree (author_id)",
--  "CREATE INDEX ON public.book USING btree (publisher_id)", 
--  "CREATE INDEX ON public.review USING btree (book_id)"}
```

#### Limitations

- Only recommends single column B-tree indexes
- Generic arguments need explicit type casting if type is unclear (`$1::int`)

### pg_jsonschema: JSON Schema Validation

#### Overview

Validates PostgreSQL's `json` and `jsonb` data types against JSON Schema documents.

#### Enable Extension

Dashboard → Database → Extensions → Search "pg_jsonschema" → Enable

#### Functions

- `json_matches_schema(schema json, instance json)` - Validate json
- `jsonb_matches_schema(schema json, instance jsonb)` - Validate jsonb

#### Basic Usage

```sql
select extensions.json_matches_schema(
    schema := '{"type": "object"}',
    instance := '{}'
);
```

#### Table Constraint Example

```sql
create table customer(
    id serial primary key,
    metadata json,
    check (
        json_matches_schema(
            '{
                "type": "object",
                "properties": {
                    "tags": {
                        "type": "array",
                        "items": {
                            "type": "string",
                            "maxLength": 16
                        }
                    }
                }
            }',
            metadata
        )
    )
);

-- Valid payload
insert into customer(metadata)
values ('{"tags": ["vip", "darkmode-ui"]}');

-- Invalid payload (will fail)
insert into customer(metadata)
values ('{"tags": [1, 3]}');
-- ERROR: new row for relation "customer" violates check constraint
```

### pgvector: Embeddings and Vector Similarity

#### Overview

Vector similarity search and embeddings storage for AI applications.

#### Enable Extension

Dashboard → Database → Extensions → Search "vector" → Enable

#### Concepts

**Vector Similarity:** Measure similarity between related items by converting them to vectors of numbers.

**Embeddings:** Numerical representations of data (text, images) useful for retrieval augmented generation.

#### Basic Usage

**Create table with vector column:**

```sql
create table posts (
    id serial primary key,
    title text not null,
    body text not null,
    embedding vector(384)  -- 384-dimensional vector
);
```

**Store embeddings (using Transformer.js):**

```javascript
import { pipeline } from '@xenova/transformers'

const generateEmbedding = await pipeline(
    'feature-extraction', 
    'Supabase/gte-small'
)

const title = 'First post!'
const body = 'Hello world!'

// Generate vector
const output = await generateEmbedding(body, {
    pooling: 'mean',
    normalize: true,
})

const embedding = Array.from(output.data)

// Store in database
const { data, error } = await supabase
    .from('posts')
    .insert({ title, body, embedding })
```

#### Queries with Filtering

**Issue:** Naive filtering may return fewer rows than requested:

```sql
-- May return < 5 rows even if 5 exist
SELECT * FROM items 
WHERE category_id = 123 
ORDER BY embedding <-> '[3,1,2]' 
LIMIT 5;
```

**Solution:** Use iterative search to continue scanning until enough results found.

### pg_repack: Physical Storage Optimization

#### Overview

Remove bloat from tables and indexes online without exclusive locks. Comparable efficiency to CLUSTER but non-blocking.

#### Features

- Online CLUSTER: Non-blocking table data ordering
- Order by specified columns
- Online VACUUM FULL: Non-blocking row packing
- Rebuild/relocate indexes only

#### Requirements

- Target table must have PRIMARY KEY or UNIQUE index on NOT NULL column
- Free disk space ~2x the size of target table and indexes
- Version 1.5.2+ for non-superuser support

#### Check Version

```sql
select default_version
from pg_available_extensions
where name = 'pg_repack';
```

#### Enable Extension

Dashboard → Database → Extensions → Search "pg_repack" → Enable

#### CLI Installation

Install from [pg_repack documentation](https://reorg.github.io/pg_repack/#download).

#### Syntax

Always include `-k` flag to skip superuser check:

```bash
pg_repack -k [OPTION]... [DBNAME]
```

#### Example Usage

```bash
# Online VACUUM FULL on specific tables
pg_repack -k -h db.<PROJECT_REF>.supabase.co -p 5432 -U postgres \
    -d postgres --no-order --table public.foo --table public.bar
```

#### Limitations

- Cannot reorganize temporary tables
- Cannot cluster by GiST indexes
- No DDL commands on target tables during operation (except VACUUM/ANALYZE)
- Holds ACCESS SHARE lock on target table

### plpgsql_check: PL/pgSQL Linter

#### Overview

Static analysis tool for PL/pgSQL functions to catch syntax, semantic, and logic errors before execution.

#### Enable Extension

Dashboard → Database → Extensions → Search "plpgsql_check" → Enable

#### Main Function

```sql
plpgsql_check_function( ... )
```

#### Example Usage

**Create function with error:**

```sql
create table place(
    x float,
    y float
);

create or replace function public.some_func() 
returns void 
language plpgsql
as $$
declare 
    rec record;
begin 
    for rec in select * from place loop
        -- Bug: No column 'created_at' on table 'place'
        raise notice '%', rec.created_at;
    end loop;
end;
$$;
```

**Function executes without error (no rows in table):**

```sql
select public.some_func();
-- Returns normally
```

**Detect error with plpgsql_check:**

```sql
select plpgsql_check_function('public.some_func()');

-- Returns:
-- error:42703:8:RAISE:record "rec" has no field "created_at"
-- Context: SQL expression "rec.created_at"
```

### uuid-ossp: Unique Identifiers

#### Overview

Generate UUID (Universally Unique Identifier) values for primary keys and unique identifiers.

#### Enable Extension

**Note:** Currently enabled by default and cannot be disabled.

Dashboard → Database → Extensions → Search "uuid-ossp" → Enable

#### UUID Type

Once enabled, `uuid` type becomes available.

#### Functions

**uuid_generate_v1():**

- Based on MAC address, timestamp, and random value
- May leak identifiable information

**uuid_generate_v4():**

- Based solely on random numbers
- Recommended for most use cases
- Alternative: Use built-in `gen_random_uuid()`

#### Examples

**Generate UUID in query:**

```sql
select uuid_generate_v4();
```

**Use as primary key:**

```sql
create table contacts (
    id uuid default uuid_generate_v4(),
    first_name text,
    last_name text,
    primary key (id)
);
```

**Alternative using built-in function:**

```sql
create table contacts (
    id uuid default gen_random_uuid(),
    first_name text,
    last_name text,
    primary key (id)
);
```

---

## Testing Best Practices

### File Organization

1. Use `000-setup-tests-hooks.sql` for shared setup
2. Name test files sequentially: `001-auth-tests.sql`, `002-rls-tests.sql`
3. Each test file should focus on specific functionality
4. Use `plan()` to specify exact number of tests

### RLS Testing Strategy

1. Test that RLS is enabled on all required tables
2. Verify users can only access their own data
3. Test cross-user access restrictions
4. Verify role-based permissions work correctly
5. Test policy enforcement under different conditions

### Complex Testing Scenarios

1. Multi-tenant applications with organization isolation
2. Role hierarchies and permission inheritance
3. Plan-based feature restrictions
4. Time-based content access
5. Premium content visibility rules

### Error Handling

1. Use `lives_ok()` for operations that should succeed
2. Use `throws_ok()` for operations that should fail
3. Use `results_eq()` to verify exact query results
4. Use `results_ne()` to verify results don't match
5. Always wrap tests in transactions with `rollback`
