---
name: analysis-implementation-alignment-command
description: "Implements fixes from a gap analysis: generates code, migrations, API endpoints, UI components and types to resolve misalignments, in database, types, API, UI order. Use when asked to fix gaps found by gap analysis. Requires analysis reports and writes implementation-alignment-plan.md."
disable-model-invocation: true
---

# Implementation Alignment Command

<task>
You are a senior full-stack engineer and system integration specialist. Based on the gap analysis and master reports, generate complete implementations to fix misalignments, complete partial features, and ensure 100% consistency across all system layers (database, API, UI, types, security, etc.).
</task>

<context>
This command reads the gap analysis report and other analysis reports to systematically implement missing pieces, fix misalignments, and ensure complete feature integration across the entire stack. It generates actual code, database migrations, API endpoints, UI components, and type definitions.

Target: system-gap-analysis.md + all other analysis reports + codebase examination </context>

<implementation_methodology>

## Phase 1: Gap Resolution Strategy

### Priority-Based Implementation

- **Critical Gaps First**: Fix gaps that break core functionality
- **Layer Dependencies**: Implement in correct order (database → types → API → UI)
- **Feature Completion**: Complete partial features end-to-end
- **Integration Validation**: Ensure fixes work together properly

### Pattern-Consistent Implementation

- **Follow Existing Patterns**: Maintain consistency with current codebase
- **Reuse Components**: Leverage existing infrastructure and utilities
- **Maintain Standards**: Follow established naming conventions and structures
- **Quality Consistency**: Apply same testing and validation patterns

## Phase 2: Cross-Layer Implementation

### Database Layer Completion

- **Missing Tables**: Create tables for incomplete features
- **Missing Columns**: Add columns to support full feature functionality
- **Missing Indexes**: Add indexes for performance optimization
- **Missing Constraints**: Add proper foreign keys and validation

### API Layer Implementation

- **Missing Endpoints**: Create CRUD endpoints for all database entities
- **Missing Validation**: Add proper input validation and sanitization
- **Missing Authorization**: Implement proper permission checking
- **Missing Error Handling**: Add comprehensive error responses

### UI Layer Integration

- **Missing Components**: Create UI components for all features
- **Missing Forms**: Build forms for all data input needs
- **Missing Displays**: Create display components for all data types
- **Missing Navigation**: Add navigation for all features

### Type System Alignment

- **Missing Types**: Create TypeScript definitions for all data structures
- **Type Consistency**: Align types across database, API, and UI
- **Schema Validation**: Add runtime validation matching types
- **Type Safety**: Ensure end-to-end type safety

## Phase 3: Quality and Security Implementation

### Security Implementation

- **Authentication Enforcement**: Add auth protection where missing
- **Authorization Implementation**: Implement role-based access control
- **Input Sanitization**: Add comprehensive input cleaning
- **Data Protection**: Implement encryption and privacy measures

### Performance Implementation

- **Caching Addition**: Add caching where performance benefits exist
- **Query Optimization**: Optimize database queries and API responses
- **Asset Optimization**: Implement frontend performance improvements
- **Monitoring Integration**: Add performance monitoring and alerting

</implementation_methodology>

<code_generation_patterns>

## Implementation Generation Patterns

### 1. Database Schema Completion

```sql
-- Pattern: Create missing table with proper structure
CREATE TABLE user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  team_id UUID NOT NULL REFERENCES teams (id) ON DELETE CASCADE,
  preferences JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Add indexes for performance
CREATE INDEX idx_user_preferences_user_team ON user_preferences (user_id, team_id);
```

### 2. API Endpoint Generation

```typescript
// Pattern: Complete CRUD endpoint implementation
export async function GET(request: NextRequest) {
  return createAuthAPIHandler(async (user, supabase) => {
    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', user.id);

    if (error) throw new APIError('Failed to fetch preferences', APIErrorCodes.DATABASE_ERROR);
    return NextResponse.json({ data });
  });
}
```

### 3. UI Component Generation

```typescript
// Pattern: Complete UI component with proper integration
export function UserPreferencesForm({ userId, teamId }: Props) {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);

  const { mutate: updatePreferences } = useMutation({
    mutationFn: (data: UserPreferences) =>
      fetch(`/api/user-preferences`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    onSuccess: () => toast.success('Preferences updated'),
  });

  return (
    // Complete form implementation
  );
}
```

### 4. Type Definition Alignment

```typescript
// Pattern: Complete type definitions matching all layers
export interface UserPreferences {
  id: string;
  user_id: string;
  team_id: string;
  preferences: {
    communication_style: 'visual' | 'text' | 'audio' | 'mixed';
    privacy_level: 'open' | 'team_only' | 'private';
    interface_mode: 'focus' | 'awareness' | 'balance';
  };
  created_at: string;
  updated_at: string;
}
```

</code_generation_patterns>

<implementation_focus>

## Implementation Generation Process

### 1. Gap Analysis Processing

```
- Read and parse gap analysis report
- Extract specific missing implementations
- Categorize by layer and priority
- Identify dependencies between fixes
```

### 2. Pattern Analysis

```
- Examine existing codebase patterns
- Extract naming conventions and structures
- Identify reusable components and utilities
- Determine architectural patterns to follow
```

### 3. Code Generation

```
- Generate database migrations for missing schema
- Create API endpoints following existing patterns
- Build UI components matching design system
- Generate type definitions for all data structures
```

### 4. Integration Validation

```
- Ensure generated code follows existing patterns
- Validate that all layers work together
- Check that security and validation are properly implemented
- Verify performance considerations are addressed
```

</implementation_focus>

<output_format>

## Implementation Alignment Report

### Executive Summary

- **Total Gaps Addressed**: [Number of gaps fixed]
- **Implementation Scope**: [Database/API/UI/Types/Security changes]
- **Code Generation Summary**: [Files created/modified]
- **Integration Status**: [End-to-end functionality validation]
- **Quality Assurance**: [Testing and validation completeness]

### Critical Gap Resolutions

#### [Gap Category 1]: [Description]

##### Database Layer Implementation

```sql
-- Migration: [migration_name]
-- Purpose: [What this fixes]
CREATE TABLE missing_table (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Complete table definition following project patterns
);

-- RLS policies
ALTER TABLE missing_table ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can access own data" ON missing_table FOR ALL USING (auth.uid () = user_id);

-- Performance indexes
CREATE INDEX idx_missing_table_lookup ON missing_table (user_id, team_id);
```

##### Type Definitions

```typescript
// types/database.ts additions
export interface MissingTableType {
  id: string;
  user_id: string;
  team_id: string;
  // Complete type definition
  created_at: string;
  updated_at: string;
}

// Add to Database interface
export interface Database {
  public: {
    Tables: {
      missing_table: {
        Row: MissingTableType;
        Insert: Omit<MissingTableType, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<MissingTableType, 'id' | 'created_at' | 'updated_at'>>;
      };
      // ... existing tables
    };
  };
}
```

##### API Endpoint Implementation

```typescript
// app/api/missing-endpoint/route.ts
import { createAuthAPIHandler } from '@/lib/api/auth-handler';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return createAuthAPIHandler(async (user, supabase) => {
    // Complete CRUD implementation
    const { data, error } = await supabase.from('missing_table').select('*').eq('user_id', user.id);

    if (error) {
      throw new APIError('Failed to fetch data', APIErrorCodes.DATABASE_ERROR);
    }

    return NextResponse.json({ data });
  });
}

export async function POST(request: NextRequest) {
  return createAuthAPIHandler(async (user, supabase) => {
    const body = await request.json();
    const validatedData = validateInput(createSchema, body);

    const { data, error } = await supabase
      .from('missing_table')
      .insert({
        ...validatedData,
        user_id: user.id,
      })
      .select()
      .single();

    if (error) {
      throw new APIError('Failed to create data', APIErrorCodes.DATABASE_ERROR);
    }

    return NextResponse.json({ data });
  });
}

// Additional PUT, DELETE methods following same pattern
```

##### UI Component Implementation

```typescript
// components/missing-feature/missing-component.tsx
'use client';

import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MissingComponentProps {
  userId: string;
  teamId: string;
}

export function MissingComponent({ userId, teamId }: MissingComponentProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['missing-data', userId],
    queryFn: () => fetch('/api/missing-endpoint').then(res => res.json()),
  });

  const { mutate: createData } = useMutation({
    mutationFn: (newData: CreateDataInput) =>
      fetch('/api/missing-endpoint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      }),
    onSuccess: () => {
      // Handle success
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Missing Feature</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Complete component implementation */}
      </CardContent>
    </Card>
  );
}
```

##### Integration Hooks

```typescript
// hooks/use-missing-feature.ts
import { useQuery, useMutation } from '@tanstack/react-query';

export function useMissingFeature(userId: string) {
  const query = useQuery({
    queryKey: ['missing-feature', userId],
    queryFn: () => fetch(`/api/missing-endpoint`).then(res => res.json()),
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateInput) =>
      fetch('/api/missing-endpoint', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    create: createMutation.mutate,
    isCreating: createMutation.isPending,
  };
}
```

### Feature Completion Implementations

#### [Incomplete Feature Name]: [Completion Status]

##### Missing Backend Logic

```typescript
// lib/services/missing-service.ts
export class MissingService {
  constructor(private supabase: SupabaseClient) {}

  async processFeatureLogic(input: FeatureInput): Promise<FeatureOutput> {
    // Complete business logic implementation
    const validatedInput = this.validateInput(input);
    const processedData = await this.processData(validatedInput);
    const result = await this.saveResult(processedData);

    return result;
  }

  private validateInput(input: FeatureInput): ValidatedInput {
    // Validation logic
  }

  private async processData(input: ValidatedInput): Promise<ProcessedData> {
    // Core business logic
  }

  private async saveResult(data: ProcessedData): Promise<FeatureOutput> {
    // Database persistence
  }
}
```

##### Missing Frontend Integration

```typescript
// components/feature/feature-container.tsx
export function FeatureContainer() {
  const { data, actions } = useFeatureLogic();

  return (
    <div className="feature-container">
      <FeatureDisplay data={data} />
      <FeatureControls actions={actions} />
      <FeatureStatus status={data?.status} />
    </div>
  );
}
```

### Security Implementation Fixes

#### Missing Authentication Protection

```typescript
// middleware.ts additions
export async function middleware(request: NextRequest) {
  // Add protection for missing endpoints
  if (request.nextUrl.pathname.startsWith('/api/missing-endpoint')) {
    const session = await getSession(request);
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}
```

#### Missing Authorization Checks

```typescript
// lib/rbac/missing-permissions.ts
export const MISSING_FEATURE_PERMISSIONS = {
  read: 'missing_feature:read',
  write: 'missing_feature:write',
  admin: 'missing_feature:admin',
} as const;

// Add to API endpoints
export async function POST(request: NextRequest) {
  return createAuthAPIHandler(async (user, supabase) => {
    // Add permission check
    const hasPermission = await can(user.id, MISSING_FEATURE_PERMISSIONS.write, {
      team_id: teamId,
    });

    if (!hasPermission) {
      throw new APIError('Insufficient permissions', APIErrorCodes.FORBIDDEN);
    }

    // Continue with implementation
  });
}
```

### Performance Implementation Fixes

#### Missing Caching Implementation

```typescript
// lib/cache/missing-feature-cache.ts
export class MissingFeatureCache {
  private static instance: MissingFeatureCache;
  private cache = new Map<string, CachedData>();

  static getInstance(): MissingFeatureCache {
    if (!this.instance) {
      this.instance = new MissingFeatureCache();
    }
    return this.instance;
  }

  async get(key: string): Promise<CachedData | null> {
    return this.cache.get(key) || null;
  }

  async set(key: string, data: CachedData, ttl: number = 300): Promise<void> {
    this.cache.set(key, data);
    setTimeout(() => this.cache.delete(key), ttl * 1000);
  }
}
```

#### Missing Query Optimization

```sql
-- Additional indexes for performance
CREATE INDEX CONCURRENTLY idx_missing_table_performance ON missing_table (team_id, created_at DESC)
WHERE
  status = 'active';

-- Optimized view for common queries
CREATE VIEW missing_table_summary AS
SELECT
  team_id,
  COUNT(*) AS total_count,
  COUNT(*) FILTER (
    WHERE
      status = 'active'
  ) AS active_count
FROM
  missing_table
GROUP BY
  team_id;
```

### Testing Implementation

#### Missing Unit Tests

```typescript
// __tests__/missing-feature.test.ts
import { describe, it, expect } from 'vitest';
import { MissingService } from '@/lib/services/missing-service';

describe('MissingService', () => {
  it('should process feature logic correctly', async () => {
    const service = new MissingService(mockSupabase);
    const input = createMockInput();

    const result = await service.processFeatureLogic(input);

    expect(result).toMatchObject({
      success: true,
      data: expect.any(Object),
    });
  });
});
```

#### Missing Integration Tests

```typescript
// __tests__/integration/missing-feature-flow.test.ts
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MissingFeatureContainer } from '@/components/missing-feature';

describe('Missing Feature Integration', () => {
  it('should complete full user workflow', async () => {
    render(<MissingFeatureContainer />);

    // Test complete user flow
    const createButton = screen.getByRole('button', { name: /create/i });
    fireEvent.click(createButton);

    // Verify API call and UI update
    await screen.findByText(/success/i);
  });
});
```

### Documentation Implementation

#### Missing API Documentation

```yaml
# docs/api/missing-endpoint.yaml
paths:
  /api/missing-endpoint:
    get:
      summary: Retrieve missing feature data
      security:
        - bearerAuth: []
      responses:
        200:
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MissingFeatureResponse'
    post:
      summary: Create missing feature data
      security:
        - bearerAuth: []
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateMissingFeatureRequest'
```

### Implementation Validation

#### End-to-End Validation

```typescript
// scripts/validate-implementation.ts
async function validateImplementation() {
  console.log('Validating complete implementation...');

  // Test database connectivity
  await validateDatabaseSchema();

  // Test API endpoints
  await validateAPIEndpoints();

  // Test UI components
  await validateUIComponents();

  // Test integration flows
  await validateIntegrationFlows();

  console.log('Implementation validation complete');
}
```

### Deployment and Migration Plan

#### Database Migration Sequence

```bash
# Run migrations in correct order
supabase migration up 001_add_missing_tables
supabase migration up 002_add_missing_columns
supabase migration up 003_add_missing_indexes
supabase migration up 004_add_missing_policies
```

#### Frontend Deployment Plan

```typescript
// Feature flag rollout for new implementations
export const FEATURE_FLAGS = {
  missing_feature_enabled:
    process.env.NODE_ENV === 'production' ? process.env.MISSING_FEATURE_ENABLED === 'true' : true,
};
```

### Quality Assurance Checklist

#### Implementation Completeness

- [ ] Database schema complete and optimized
- [ ] API endpoints implement full CRUD with validation
- [ ] UI components handle all user interactions
- [ ] Type definitions match all data structures
- [ ] Security implemented at all layers
- [ ] Error handling covers all edge cases
- [ ] Performance optimization implemented
- [ ] Testing coverage meets requirements
- [ ] Documentation updated and complete

#### Integration Validation

- [ ] End-to-end user workflows function correctly
- [ ] Data flows properly from UI to database and back
- [ ] Authentication and authorization enforced everywhere
- [ ] Real-time features work bidirectionally
- [ ] AI features integrate properly with new implementations
- [ ] Performance meets requirements under load
- [ ] Error scenarios handled gracefully
- [ ] Mobile and desktop experiences work correctly

### Post-Implementation Monitoring

#### Success Metrics

- **Functional Completeness**: All user workflows complete successfully
- **Performance Targets**: Response times within acceptable ranges
- **Error Rates**: Error rates below threshold percentages
- **User Adoption**: New features see expected usage patterns

#### Ongoing Maintenance

- **Monitoring Setup**: Application and database monitoring configured
- **Alert Configuration**: Alerts for errors and performance issues
- **Documentation Maintenance**: Keep documentation current with changes
- **Continuous Integration**: Automated testing for all new implementations

</output_format>

<verification_requirements>

## Implementation Quality Validation

- **Pattern Consistency**: All generated code follows existing project patterns
- **Integration Completeness**: All layers work together properly
- **Security Implementation**: Proper authentication and authorization everywhere
- **Performance Optimization**: Appropriate caching and optimization implemented
- **Error Handling**: Comprehensive error handling at all layers

## Code Quality Checks

- **Type Safety**: Complete TypeScript coverage with proper typing
- **Testing Coverage**: Unit and integration tests for all new code
- **Documentation**: Complete documentation for all new implementations
- **Accessibility**: UI components meet accessibility requirements

</verification_requirements>

<usage_examples>

## Full Implementation Alignment

```
/system:implement:alignment
```

## Specific Gap Category Focus

```
/system:implement:alignment "database and API layer gaps only"
/system:implement:alignment "UI component missing implementations"
/system:implement:alignment "security and authorization fixes"
```

## Feature-Specific Implementation

```
/system:implement:alignment "complete AI recommendation feature"
/system:implement:alignment "finish energy pattern analysis workflow"
/system:implement:alignment "implement missing collaboration features"
```

## Layer-Specific Implementation

```
/system:implement:alignment "frontend layer completeness"
/system:implement:alignment "backend API and database alignment"
/system:implement:alignment "type system and validation consistency"
```

</usage_examples>

<output_file_generation>

## Generated Documentation File

The command will create: `implementation-alignment-plan.md`

### Additional Generated Files

- **Database migrations**: Complete SQL migrations for missing schema
- **API endpoint implementations**: TypeScript files for missing endpoints
- **UI component implementations**: React components for missing interfaces
- **Type definitions**: TypeScript interfaces and types for consistency
- **Test implementations**: Unit and integration tests for all new code
- **Documentation updates**: API docs and component documentation

### Implementation Package Structure

```
generated-implementations/
├── database/
│   ├── migrations/
│   └── schema-updates/
├── api/
│   ├── endpoints/
│   └── middleware/
├── ui/
│   ├── components/
│   ├── pages/
│   └── hooks/
├── types/
│   └── definitions/
├── tests/
│   ├── unit/
│   └── integration/
└── docs/
    ├── api/
    └── components/
```

### Focus Areas

- **Complete Feature Implementation**: End-to-end implementation of partial features
- **Layer Integration**: Ensuring all layers work together seamlessly
- **Quality Consistency**: Maintaining code quality and testing standards
- **Security Implementation**: Proper security at every level
- **Performance Optimization**: Appropriate optimization throughout the stack

</output_file_generation>
