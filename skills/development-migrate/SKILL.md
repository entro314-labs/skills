---
name: development-migrate
description: "Plans and executes migrations of databases, APIs, dependencies, code patterns, and infrastructure with risk assessment, backups, migration scripts, execution plan, validation, and rollback procedures. Use when asked to migrate, upgrade a stack, or change schemas."
disable-model-invocation: true
---

# Migration & Upgrade Assistant

## Purpose

Comprehensive migration strategies for databases, APIs, dependencies, code patterns, and
infrastructure. Provides systematic planning, risk assessment, and rollback procedures for safe
transitions across technology stacks and versions.

## Claude Code Integration

### Slash Command Usage

```
/development-migrate <target> [--type] [--mode]
```

**Migration Types:**

- `database` - Schema migrations, data transformations, database upgrades
- `dependency` - Package updates, framework upgrades, library migrations
- `api` - API versioning, endpoint migrations, breaking changes
- `infrastructure` - Kubernetes, Docker, cloud platform migrations
- `code-pattern` - Refactoring patterns, language version upgrades
- `configuration` - Config format changes, environment migrations

**Migration Modes:**

- `--dry-run` - Plan and validate without making changes
- `--staged` - Incremental migration with checkpoints
- `--rollback` - Create or execute rollback procedures
- `--automated` - Generate automation scripts for repeatable migrations
- `--emergency` - Fast-track migration for critical issues

### Automatic Environment Detection

The command analyzes current environment:

**Database Systems**: !`find . -name "*.sql" -o -name "flyway.conf" -o -name "migrate" | head -5 || true`

**Build Tools**:
!`find . -name "pom.xml" -o -name "build.gradle" -o -name "go.mod" -o -name "package.json" | head -5 || true`

**Infrastructure**:
!`find . -name "Dockerfile" -o -name "*.yaml" -o -name "*.yml" | grep -E "k8s|kubernetes|docker" | head -5 || true`

**Version Info**: !`java -version 2>&1 | head -1; go version; rustc --version | head -1 || true`

## Usage Examples

### Database Schema Migration

```
/development-migrate database schema from v2.1 to v3.0
```

**Migration Process:**

1. **Schema Analysis**: Compares current schema with target version
2. **Data Impact Assessment**: Identifies data transformation requirements
3. **Migration Script Generation**: Creates forward and rollback scripts
4. **Validation Strategy**: Develops comprehensive testing procedures
5. **Rollback Planning**: Ensures safe rollback at any migration step

**Expected Output:**

````markdown
# Database Migration Plan: v2.1 → v3.0

## Migration Overview

### Schema Changes Summary

- **New Tables**: user_preferences, audit_log, feature_flags
- **Modified Tables**: users (added columns), orders (index changes)
- **Removed Tables**: legacy_sessions (deprecated)
- **Data Transformations**: user roles normalization, timestamp standardization

### Impact Assessment

- **Estimated Downtime**: 15-30 minutes
- **Data Volume**: 2.3M users, 8.7M orders affected
- **Application Changes**: 12 queries need updates
- **Risk Level**: MEDIUM (non-destructive changes)

## Migration Scripts

### Forward Migration (V3_0\_\_major_schema_update.sql)

```sql
-- Create new tables
CREATE TABLE user_preferences (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    preference_key VARCHAR(255) NOT NULL,
    preference_value TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_preferences_user_id ON user_preferences(user_id);
CREATE UNIQUE INDEX idx_user_preferences_key ON user_preferences(user_id, preference_key);

-- Modify existing tables
ALTER TABLE users
    ADD COLUMN email_verified BOOLEAN DEFAULT FALSE,
    ADD COLUMN last_login TIMESTAMP,
    ADD COLUMN preferences_migrated BOOLEAN DEFAULT FALSE;

-- Data migration
UPDATE users
SET email_verified = TRUE
WHERE email IS NOT NULL AND created_at < '2023-01-01';

-- Create audit triggers
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO audit_log (table_name, operation, old_values, new_values, user_id, timestamp)
    VALUES (TG_TABLE_NAME, TG_OP, row_to_json(OLD), row_to_json(NEW), current_user_id(), NOW());
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_audit_trigger
    AFTER INSERT OR UPDATE OR DELETE ON users
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
```
````

### Rollback Migration (V3_0\_\_major_schema_update_rollback.sql)

```sql
-- Remove triggers
DROP TRIGGER IF EXISTS users_audit_trigger ON users;
DROP FUNCTION IF EXISTS audit_trigger_function();

-- Revert table modifications
ALTER TABLE users
    DROP COLUMN IF EXISTS email_verified,
    DROP COLUMN IF EXISTS last_login,
    DROP COLUMN IF EXISTS preferences_migrated;

-- Drop new tables (in reverse order)
DROP TABLE IF EXISTS user_preferences;
DROP TABLE IF EXISTS audit_log;
DROP TABLE IF EXISTS feature_flags;
```

## Pre-Migration Checklist

### Environment Preparation

- [ ] **Database Backup**: Full backup completed and verified
- [ ] **Staging Test**: Migration tested on production-like data
- [ ] **Application Compatibility**: Code changes deployed to staging
- [ ] **Monitoring Setup**: Enhanced monitoring during migration window
- [ ] **Team Notification**: All stakeholders informed of maintenance window

### Validation Scripts

```sql
-- Pre-migration data counts
SELECT 'users' as table_name, COUNT(*) as record_count FROM users
UNION ALL
SELECT 'orders', COUNT(*) FROM orders;

-- Post-migration validation
SELECT
    (SELECT COUNT(*) FROM users WHERE email_verified IS NULL) as null_email_verified,
    (SELECT COUNT(*) FROM user_preferences) as new_preferences_count,
    (SELECT COUNT(*) FROM audit_log) as audit_entries;
```

## Migration Execution Plan

### Phase 1: Preparation (T-30 minutes)

```bash
# Create migration backup
!pg_dump production_db > backup_pre_v3_migration_$(date +%Y%m%d_%H%M%S).sql

# Verify backup integrity
!pg_restore --list backup_pre_v3_migration_*.sql | head -20

# Stop application traffic (if required)
!kubectl scale deployment api-server --replicas=0
```

### Phase 2: Schema Migration (T-0 to T-15)

```bash
# Execute forward migration
!psql production_db < migrations/V3_0__major_schema_update.sql

# Verify schema changes
!psql production_db -c "\dt" | grep -E "user_preferences|audit_log"

# Run validation queries
!psql production_db < migrations/validate_v3_migration.sql
```

### Phase 3: Application Deployment (T-15 to T-25)

```bash
# Deploy application changes
!kubectl set image deployment/api-server api-server=myapp:v3.0

# Scale back up
!kubectl scale deployment api-server --replicas=3

# Verify application health
!kubectl get pods -l app=api-server
!curl -f http://api-server/health
```

### Phase 4: Validation (T-25 to T-30)

```bash
# Run integration tests
!mvn test -Dtest=MigrationValidationTest

# Check application logs
!kubectl logs -l app=api-server --tail=50 | grep -i error

# Verify data integrity
!psql production_db < migrations/post_migration_validation.sql
```

## Rollback Procedures

### Automatic Rollback Triggers

- Application health check failures
- Database constraint violations
- Integration test failures
- Manual intervention required

### Rollback Execution

```bash
# Emergency rollback procedure
!kubectl rollout undo deployment/api-server
!psql production_db < migrations/V3_0__major_schema_update_rollback.sql
!pg_restore backup_pre_v3_migration_*.sql
```

## Risk Assessment: MEDIUM

- **Data Loss Risk**: LOW (additive changes, comprehensive backups)
- **Downtime Risk**: MEDIUM (15-30 minute maintenance window)
- **Rollback Complexity**: LOW (automated rollback procedures)
- **Application Impact**: MEDIUM (12 queries require updates)

```

### Spring Boot Framework Upgrade
```

/development-migrate @pom.xml Spring Boot 2.7 to 3.1 --staged

```

**Framework Migration Process:**
1. **Compatibility Analysis**: Identifies breaking changes and deprecated features
2. **Dependency Resolution**: Updates compatible versions of all dependencies
3. **Configuration Migration**: Converts configuration formats and properties
4. **Code Pattern Updates**: Modernizes code to use new framework features
5. **Testing Strategy**: Comprehensive testing across all application layers

### Kubernetes Cluster Migration
```

/development-migrate Kubernetes v1.25 to v1.28 --dry-run

````

**Infrastructure Migration Strategy:**
1. **Resource Compatibility**: Analyzes deprecated APIs and resource definitions
2. **Cluster Upgrade Path**: Plans node-by-node or blue-green migration
3. **Workload Migration**: Updates deployments, services, and configurations
4. **Network Policy Updates**: Ensures security policies remain effective
5. **Monitoring and Observability**: Maintains visibility throughout migration

## Advanced Migration Features

### Multi-Environment Strategy

```markdown
## Environment Progression

### Development Environment
- **Purpose**: Initial migration testing and development
- **Timeline**: Week 1-2
- **Validation**: Unit tests, basic integration tests
- **Rollback**: Simple git reset or database restore

### Staging Environment
- **Purpose**: Production-like testing with realistic data volume
- **Timeline**: Week 3
- **Validation**: Full integration test suite, performance testing
- **Rollback**: Automated rollback procedures

### Production Environment
- **Purpose**: Final migration with minimal downtime
- **Timeline**: Week 4
- **Validation**: Health checks, business-critical function tests
- **Rollback**: Hot rollback procedures with immediate recovery
````

### Automated Migration Scripts

```typescript
// Generated migration automation script
// scripts/migrate-spring-boot-3.ts

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';

interface MigrationStep {
  name: string;
  action: () => Promise<void>;
  rollback: () => Promise<void>;
  validation: () => Promise<boolean>;
}

class SpringBootMigrator {
  private steps: MigrationStep[] = [
    {
      name: 'Update pom.xml dependencies',
      action: async () => {
        // Update Spring Boot version
        const pomContent = readFileSync('pom.xml', 'utf8');
        const updatedPom = pomContent
          .replace(/<spring-boot.version>2\.7\.\d+/, '<spring-boot.version>3.1.0')
          .replace(/javax\./g, 'jakarta.');
        writeFileSync('pom.xml', updatedPom);
      },
      rollback: async () => {
        execSync('git checkout pom.xml');
      },
      validation: async () => {
        const result = execSync('mvn dependency:resolve', { encoding: 'utf8' });
        return !result.includes('ERROR');
      },
    },
    {
      name: 'Update application properties',
      action: async () => {
        // Convert properties to new format
        const propsContent = readFileSync('src/main/resources/application.yml', 'utf8');
        const updatedProps = propsContent
          .replace(/spring.jpa.hibernate.ddl-auto/g, 'spring.jpa.hibernate.ddl-auto')
          .replace(/management.endpoint/g, 'management.endpoints');
        writeFileSync('src/main/resources/application.yml', updatedProps);
      },
      rollback: async () => {
        execSync('git checkout src/main/resources/application.yml');
      },
      validation: async () => {
        const result = execSync(
          'mvn spring-boot:run -Dspring-boot.run.arguments=--spring.profiles.active=test',
          { timeout: 10000 }
        );
        return true; // If no exception, validation passed
      },
    },
  ];

  async migrate(dryRun: boolean = false): Promise<void> {
    console.log(`Starting Spring Boot migration (dry-run: ${dryRun})`);

    for (const step of this.steps) {
      try {
        console.log(`Executing: ${step.name}`);

        if (!dryRun) {
          await step.action();

          const isValid = await step.validation();
          if (!isValid) {
            throw new Error(`Validation failed for step: ${step.name}`);
          }

          console.log(`✅ ${step.name} completed successfully`);
        } else {
          console.log(`🔍 [DRY RUN] Would execute: ${step.name}`);
        }
      } catch (error) {
        console.error(`❌ Error in step: ${step.name}`, error);

        if (!dryRun) {
          console.log(`🔄 Rolling back: ${step.name}`);
          await step.rollback();
        }

        throw error;
      }
    }

    console.log('✅ Migration completed successfully');
  }
}

// Usage
const migrator = new SpringBootMigrator();
await migrator.migrate(Deno.args.includes('--dry-run'));
```

### Data Migration Patterns

````markdown
## Large Dataset Migration

### Chunked Migration Strategy

```sql
-- Process data in chunks to avoid lock timeouts
DO $$
DECLARE
    chunk_size INTEGER := 10000;
    offset_val INTEGER := 0;
    affected_rows INTEGER;
BEGIN
    LOOP
        UPDATE users
        SET preferences_migrated = TRUE
        WHERE id IN (
            SELECT id FROM users
            WHERE preferences_migrated = FALSE
            ORDER BY id
            LIMIT chunk_size OFFSET offset_val
        );

        GET DIAGNOSTICS affected_rows = ROW_COUNT;

        IF affected_rows = 0 THEN
            EXIT;
        END IF;

        offset_val := offset_val + chunk_size;

        -- Progress logging
        RAISE NOTICE 'Processed % rows, offset %', affected_rows, offset_val;

        -- Brief pause to avoid overwhelming the database
        PERFORM pg_sleep(0.1);
    END LOOP;
END $$;
```
````

### Zero-Downtime Migration

```markdown
### Blue-Green Database Strategy

1. **Setup**: Maintain two identical database environments
2. **Migration**: Apply changes to "green" environment
3. **Validation**: Test application against green database
4. **Cutover**: Switch application traffic to green database
5. **Cleanup**: Keep blue as rollback option for 24-48 hours
```

````

## Integration with Claude Code Features

### Memory System Integration
Tracks migration history and decisions:
```markdown
# Added to CLAUDE.md

## Migration History
- **2025-01-27**: Spring Boot 2.7→3.1 - Successful, 2 hour downtime
- **2025-01-20**: Database v2.1→3.0 - Successful, 30 min downtime
- **2025-01-15**: Kubernetes 1.25→1.28 - Rollback required, networking issues

## Migration Preferences
- **Database**: Prefer chunked migrations for large datasets
- **Dependencies**: Always test in staging first
- **Infrastructure**: Blue-green strategy for zero downtime
- **Rollback**: Automated rollback triggers on health check failures

## Lessons Learned
- Test networking policies thoroughly in K8s upgrades
- Database migrations require 2x estimated time buffer
- Spring Boot 3.x requires jakarta.* package updates
- Always verify backup integrity before migration
````

### Collaboration and Communication

```markdown
## Stakeholder Communication

### Pre-Migration

- **Engineering Team**: Technical implementation details
- **Operations Team**: Monitoring and rollback procedures
- **Business Team**: Downtime windows and feature impacts
- **Support Team**: Known issues and troubleshooting guides

### During Migration

- **Real-time Updates**: Slack/Teams progress notifications
- **Escalation Procedures**: Clear escalation paths for issues
- **Go/No-Go Decisions**: Criteria for proceeding or rolling back

### Post-Migration

- **Success Metrics**: Performance, error rates, user satisfaction
- **Lessons Learned**: What worked well, what could be improved
- **Documentation Updates**: Updated runbooks and procedures
```

## Best Practices

### Migration Planning

- **Start Small**: Test migration strategies on non-critical systems first
- **Measure Twice**: Comprehensive testing in staging environments
- **Plan Rollbacks**: Always have a tested rollback strategy
- **Communicate Early**: Inform stakeholders well in advance
- **Document Everything**: Detailed procedures for repeatability

### Risk Mitigation

- **Backup Everything**: Database, configuration, application state
- **Test Rollbacks**: Verify rollback procedures work under pressure
- **Monitor Closely**: Enhanced monitoring during migration periods
- **Have Support Ready**: Team available for immediate issue response
- **Plan for Failure**: Assume something will go wrong and prepare accordingly

## Related Commands

- `/backup` - Create comprehensive backups before migration
- `/test` - Validate migration results with comprehensive testing
- `/workflow-monitor` - Set up enhanced monitoring during migrations
- `/meta-document` - Update documentation after successful migrations

The goal is to provide safe, systematic migration strategies that minimize risk, reduce downtime,
and ensure successful transitions across all aspects of the technology stack.
