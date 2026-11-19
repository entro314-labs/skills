---
name: analysis-database-mapper
description: "Analyzes database design in a codebase: schema, relationships, query and ORM patterns, indexing, multi-tenancy, performance and scalability. Use when asked to map or review the data layer. Writes project-info/database-design-analysis.md."
disable-model-invocation: true
---

# Database Design Analysis Command

<task>
You are a database architect and data modeling expert. Analyze the codebase to understand database schema design, relationships, query patterns, performance optimizations, and data management strategies.
</task>

<context>
This command provides comprehensive analysis of database architecture, schema design, query optimization, indexing strategies, and data access patterns. It's designed for database engineers, backend developers, and architects working on data layer optimization.

Target: $ARGUMENTS (if specified, focus on specific database areas or tables) </context>

<analysis_methodology>

## Phase 1: Schema Discovery and Analysis

### Database Structure Analysis

- **Schema Organization**: How tables, views, and functions are organized
- **Entity Relationships**: Primary entities and their relationships
- **Data Modeling Patterns**: Normalization level, denormalization strategies
- **Constraint Design**: Foreign keys, unique constraints, check constraints

### Data Architecture Patterns

- **Multi-Tenancy**: How data isolation is achieved across organizations/teams
- **Temporal Data**: Time-series data patterns and historical tracking
- **Hierarchical Data**: Tree structures, nested sets, adjacency lists
- **Document Storage**: JSON/JSONB usage for flexible schema design

## Phase 2: Query Pattern Analysis

### Query Performance Analysis

- **Index Usage**: How indexes are designed and utilized
- **Query Optimization**: Common query patterns and optimizations
- **Join Patterns**: How tables are joined and relationship traversal
- **Aggregation Patterns**: How summary data is calculated and cached

### Data Access Patterns

- **ORM Usage**: How Object-Relational Mapping is implemented
- **Raw SQL**: Direct SQL usage patterns and optimization
- **Stored Procedures**: Database-side logic and processing
- **View Usage**: How views simplify complex queries

## Phase 3: Performance and Scalability

### Performance Optimization

- **Indexing Strategy**: Primary, foreign, composite, partial indexes
- **Query Optimization**: Execution plans, query rewriting, caching
- **Connection Management**: Pooling, transaction handling, deadlock prevention
- **Batch Processing**: Bulk operations and data migration patterns

### Scalability Considerations

- **Read Replicas**: Read-write separation patterns
- **Partitioning**: Table partitioning and sharding strategies
- **Caching Layers**: Database-level and application-level caching
- **Archive Strategies**: Historical data management and cleanup

</analysis_methodology>

<code_reading_focus>

## Database-Focused Code Reading

### 1. Schema Definition Analysis

```
- Examine migration files and schema definitions
- Understand table structure and relationship design
- Analyze constraint and index definitions
- Map data types and column design choices
```

### 2. Query Pattern Analysis

```
- Find all database queries in the codebase
- Understand ORM configuration and usage
- Analyze complex joins and aggregations
- Map transaction boundaries and isolation levels
```

### 3. Data Access Layer Analysis

```
- Examine repository patterns and data access objects
- Understand connection management and pooling
- Analyze error handling and retry logic
- Map data validation and sanitization
```

### 4. Performance Optimization Analysis

```
- Find indexing strategies and rationale
- Understand caching implementation
- Analyze bulk operation patterns
- Map database monitoring and optimization
```

</code_reading_focus>

<output_format>

## Database Design Analysis Report

### Database Overview

- **Database System**: [PostgreSQL/MySQL/MongoDB/etc with version]
- **Schema Organization**: [How database schema is structured]
- **Multi-Tenancy Model**: [How data isolation is achieved]
- **Migration Strategy**: [How schema changes are managed]

### Schema Design and Architecture

#### Core Entity Model

- **Primary Entities**: [Main business objects and their purpose]
- **Entity Relationships**: [How entities relate to each other]
- **Inheritance Patterns**: [Table inheritance, polymorphic associations]
- **Naming Conventions**: [Table and column naming standards]

#### Table Design Analysis

##### [Table Name 1] - [Business Purpose]

- **Purpose**: [What this table represents in the business domain]
- **Key Columns**:
  - `column_name` (type): [Purpose and business meaning]
  - `another_column` (type): [Purpose and business meaning]
- **Relationships**: [Foreign keys and what they reference]
- **Constraints**: [Unique constraints, check constraints, not null]
- **Indexes**: [Indexes defined and their purpose]
- **Data Patterns**: [How data is typically inserted, updated, queried]

##### [Table Name 2] - [Business Purpose]

[Same structure as above]

### Data Relationships and Modeling

#### Relationship Patterns

- **One-to-Many**: [Key parent-child relationships]
- **Many-to-Many**: [Junction tables and association patterns]
- **Hierarchical**: [Tree structures and nested data]
- **Temporal**: [Time-based relationships and historical tracking]

#### Referential Integrity

- **Foreign Key Strategy**: [How referential integrity is enforced]
- **Cascade Rules**: [DELETE/UPDATE cascade behaviors]
- **Orphan Prevention**: [How orphaned records are prevented]
- **Soft Deletes**: [Logical deletion patterns vs hard deletes]

#### Data Normalization

- **Normalization Level**: [How normalized the schema is and why]
- **Denormalization Decisions**: [Where denormalization is used for performance]
- **Lookup Tables**: [Reference data organization]
- **Computed Columns**: [Derived data storage vs calculation]

### Query Patterns and Performance

#### Common Query Patterns

- **Entity Retrieval**: [How single entities are fetched]
- **List Queries**: [How collections are retrieved with pagination]
- **Search Patterns**: [Full-text search, filtering, sorting]
- **Aggregation Queries**: [COUNT, SUM, GROUP BY patterns]
- **Join Patterns**: [Complex multi-table queries]

#### Query Optimization Strategies

- **Index Usage**: [How indexes are designed for common queries]
- **Query Rewriting**: [How complex queries are optimized]
- **Subquery vs JOIN**: [Trade-offs in query structure]
- **LIMIT and OFFSET**: [Pagination optimization strategies]

#### Performance Monitoring

- **Slow Query Analysis**: [How slow queries are identified and optimized]
- **Execution Plan Analysis**: [Query plan optimization patterns]
- **Index Effectiveness**: [How index usage is monitored]
- **Resource Usage**: [Memory, CPU, I/O optimization]

### Indexing Strategy

#### Primary Indexes

- **Primary Keys**: [Primary key design patterns]
- **Unique Indexes**: [Uniqueness enforcement beyond primary keys]
- **Clustered Indexes**: [How data is physically organized]

#### Secondary Indexes

- **Single Column Indexes**: [Individual column indexes and usage]
- **Composite Indexes**: [Multi-column indexes for complex queries]
- **Partial Indexes**: [Conditional indexes for subset data]
- **Functional Indexes**: [Indexes on expressions or functions]

#### Index Maintenance

- **Index Monitoring**: [How index effectiveness is tracked]
- **Index Updates**: [How indexes are maintained during data changes]
- **Reindexing Strategy**: [When and how indexes are rebuilt]
- **Index Size Management**: [Keeping indexes optimal size]

### Data Access Layer Architecture

#### ORM Integration

- **ORM Framework**: [Prisma/TypeORM/Sequelize/etc usage]
- **Model Definitions**: [How database models are defined]
- **Relationship Mapping**: [How ORM handles relationships]
- **Query Builder**: [ORM query construction patterns]

#### Raw SQL Usage

- **Complex Queries**: [When and why raw SQL is used]
- **Stored Procedures**: [Database-side logic implementation]
- **Views**: [How views simplify complex data access]
- **Functions**: [Database functions and their usage]

#### Connection Management

- **Connection Pooling**: [How database connections are managed]
- **Transaction Handling**: [Transaction scope and isolation levels]
- **Error Handling**: [Database error recovery and retry logic]
- **Deadlock Prevention**: [How deadlocks are avoided and handled]

### Multi-Tenancy and Security

#### Data Isolation

- **Tenant Separation**: [How different tenants' data is isolated]
- **Row-Level Security**: [Database-level access controls]
- **Schema Separation**: [How different tenants use separate schemas]
- **Access Controls**: [Who can access what data and how]

#### Security Implementation

- **Authentication**: [How database access is authenticated]
- **Authorization**: [Permission-based data access]
- **Data Encryption**: [Encryption at rest and in transit]
- **Audit Logging**: [How data access and changes are logged]

### Specialized Data Features

#### JSON/Document Storage

- **JSONB Usage**: [How semi-structured data is stored]
- **JSON Indexing**: [Indexing strategies for JSON columns]
- **JSON Queries**: [How JSON data is queried and updated]
- **Schema Flexibility**: [Balancing structure with flexibility]

#### Full-Text Search

- **Search Implementation**: [How text search is implemented]
- **Indexing Strategy**: [Full-text indexing approaches]
- **Search Performance**: [Search query optimization]
- **Relevance Ranking**: [How search results are ranked]

#### Vector Storage and Search

- **Vector Extensions**: [pgvector or similar vector storage]
- **Embedding Storage**: [How vector embeddings are stored]
- **Similarity Search**: [Vector similarity query patterns]
- **Vector Indexing**: [Optimization for vector operations]

#### Time-Series Data

- **Temporal Tables**: [How time-based data is structured]
- **Partitioning**: [Time-based table partitioning]
- **Aggregation**: [Time-series data summarization]
- **Retention Policies**: [How old data is managed or archived]

### Data Migration and Evolution

#### Schema Migration

- **Migration Framework**: [How schema changes are managed]
- **Version Control**: [Schema versioning and deployment]
- **Rollback Strategy**: [How failed migrations are handled]
- **Data Migration**: [How existing data is migrated during schema changes]

#### Data Lifecycle Management

- **Data Archival**: [How old data is archived or removed]
- **Backup Strategy**: [Database backup and recovery procedures]
- **Data Retention**: [How long different types of data are kept]
- **Compliance**: [How data retention policies meet regulatory requirements]

### Performance Optimization

#### Query Performance

- **Query Analysis**: [How query performance is monitored]
- **Optimization Techniques**: [Query rewriting and restructuring]
- **Caching Strategy**: [What queries are cached and for how long]
- **Batch Operations**: [How bulk operations are optimized]

#### Database Tuning

- **Configuration Optimization**: [Database server configuration tuning]
- **Memory Management**: [Buffer pool and cache optimization]
- **I/O Optimization**: [Disk access pattern optimization]
- **Vacuum and Maintenance**: [Database maintenance procedures]

### Monitoring and Observability

#### Performance Monitoring

- **Query Monitoring**: [How database queries are monitored]
- **Resource Usage**: [CPU, memory, disk usage tracking]
- **Connection Monitoring**: [Connection pool and usage monitoring]
- **Replication Lag**: [How replication performance is monitored]

#### Health Checks

- **Database Health**: [How database health is assessed]
- **Automated Alerts**: [When and how database alerts are triggered]
- **Capacity Planning**: [How future database needs are projected]
- **Disaster Recovery**: [Database backup and recovery testing]

### Scalability and Future Considerations

#### Current Scale Handling

- **Data Volume**: [How much data the current design handles]
- **Query Volume**: [Transaction throughput and concurrent users]
- **Growth Patterns**: [How data and usage grow over time]
- **Performance Characteristics**: [Response times under current load]

#### Scaling Strategies

- **Vertical Scaling**: [Hardware upgrade strategies]
- **Horizontal Scaling**: [Read replicas and load distribution]
- **Sharding Considerations**: [How data could be partitioned]
- **Microservice Data**: [How data layer supports service decomposition]

</output_format>

<verification_requirements>

## Database Analysis Validation

- **Schema Accuracy**: All described tables and columns must exist in actual schema
- **Relationship Reality**: All described relationships must be present in foreign keys
- **Query Evidence**: All described query patterns must be found in actual code
- **Index Verification**: All described indexes must exist in database schema
- **Performance Claims**: Performance patterns must be verifiable in implementation

## Database Design Quality Checks

- **Normalization Appropriateness**: Is the normalization level appropriate for use case?
- **Index Effectiveness**: Are indexes well-designed for actual query patterns?
- **Constraint Completeness**: Are appropriate constraints in place for data integrity?
- **Scalability Design**: Does the design support current and projected scale needs?

</verification_requirements>

<usage_examples>

## Full Database Analysis

```
/database:design
```

## Specific Table/Entity Focus

```
/database:design "user and authentication tables"
/database:design "energy logging and time-series data"
/database:design "AI patterns and embeddings storage"
```

## Performance Focus

```
/database:design "query optimization and indexing"
/database:design "scalability and performance patterns"
```

## Architecture Focus

```
/database:design "multi-tenancy and security model"
/database:design "schema design and relationships"
```

</usage_examples>

<output_file_generation>

## Generated Documentation File

This command will create: a "project-info" folder in working directory if it doesn't already exist and then inside it will create: `database-design-analysis.md`

### File Structure

- Executive summary of database architecture approach
- Complete schema analysis with table-by-table breakdown
- Relationship mapping and data modeling patterns
- Query pattern analysis and performance optimization
- Indexing strategy and scalability considerations
- Security, multi-tenancy, and data management policies

### Focus Areas

- How data is structured and organized
- Relationship design and referential integrity
- Query patterns and performance optimization
- Indexing strategies and database tuning
- Multi-tenancy, security, and compliance
- Scalability and future growth considerations

</output_file_generation>
