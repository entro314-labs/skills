---
name: analysis-tech-mapper
description: "Analyzes technical architecture: architectural style, stack, layers, data flow, integration patterns, performance and scalability, infrastructure. Use when asked to map or document system architecture. Writes project-info/technical-architecture.md."
disable-model-invocation: true
---

# Technical Architecture Analysis Command

<task>
You are a senior software architect. Analyze the codebase to understand the technical architecture, system design patterns, data flows, integration points, and scalability considerations. Focus on how the system is built, not what it does for users.
</task>

<context>
This command provides deep technical insight into system architecture, technology choices, performance patterns, and engineering decisions. It's designed for engineers who need to understand how the system works at a technical level.

Target: $ARGUMENTS (if specified, focus on specific architectural areas) </context>

<analysis_methodology>

## Phase 1: System Architecture Discovery

### High-Level Architecture Patterns

- **Architectural Style**: Monolith, microservices, serverless, hybrid patterns
- **Framework Architecture**: How the chosen framework structures the application
- **Layer Separation**: Presentation, business logic, data access layer boundaries
- **Service Boundaries**: How different concerns are separated and organized

### Technology Stack Analysis

- **Frontend Architecture**: Framework choice, state management, routing, rendering patterns
- **Backend Architecture**: Server framework, API design, data processing patterns
- **Database Architecture**: Database choice, query patterns, indexing strategy
- **Infrastructure Patterns**: Deployment, caching, CDN, monitoring

## Phase 2: Data Flow and Integration

### Data Architecture

- **Data Models**: Entity relationships, schema design, normalization patterns
- **Data Flow Patterns**: How data moves through the system layers
- **State Management**: Application state, session state, persistent state
- **Caching Strategy**: What gets cached, where, and how invalidation works

### Integration Patterns

- **Internal Integration**: How modules/services communicate internally
- **External Integration**: Third-party service integration patterns
- **API Design**: RESTful patterns, GraphQL usage, RPC patterns
- **Event Systems**: Pub/sub, webhooks, real-time communication

## Phase 3: Performance and Scale

### Performance Architecture

- **Request/Response Patterns**: How requests are processed and responses generated
- **Concurrency Patterns**: Async processing, parallel execution, queue systems
- **Resource Management**: Memory usage, connection pooling, resource cleanup
- **Optimization Strategies**: Query optimization, asset optimization, lazy loading

### Scalability Considerations

- **Horizontal Scaling**: How the system handles increased load
- **Database Scaling**: Read replicas, sharding, query optimization
- **Caching Layers**: Application cache, database cache, CDN strategy
- **Rate Limiting**: How the system protects against abuse

</analysis_methodology>

<code_reading_focus>

## Architecture-Focused Code Reading

### 1. Framework and Structure Analysis

```
- Examine project structure and organization patterns
- Understand framework-specific architectural decisions
- Map dependency injection and service location patterns
- Analyze configuration and environment management
```

### 2. Data Layer Architecture

```
- Database connection patterns and pooling
- ORM/query builder usage and patterns
- Migration and schema management
- Indexing and query optimization strategies
```

### 3. Integration and Communication

```
- HTTP client patterns and configuration
- WebSocket implementation and management
- Queue systems and background processing
- External service integration patterns
```

### 4. Performance and Resource Management

```
- Caching implementation and strategies
- Asset processing and optimization
- Memory management and garbage collection considerations
- Monitoring and observability patterns
```

</code_reading_focus>

<output_format>

## Technical Architecture Report

### System Overview

- **Architecture Style**: [Monolith/Microservices/Serverless/Hybrid]
- **Primary Technologies**: [Key frameworks, languages, databases]
- **Deployment Model**: [How the application is deployed and hosted]
- **Integration Approach**: [How external systems are integrated]

### Frontend Architecture

#### Framework and Structure

- **Frontend Framework**: [React/Vue/Angular/etc with version]
- **Rendering Strategy**: [SSR/SSG/CSR/Hybrid and why]
- **Routing Architecture**: [Client-side/server-side routing patterns]
- **State Management**: [Redux/Zustand/Context/etc implementation]
- **Component Architecture**: [Component organization and reuse patterns]

#### Build and Asset Management

- **Build System**: [Webpack/Vite/etc configuration]
- **Asset Pipeline**: [CSS/JS/image processing and optimization]
- **Code Splitting**: [How bundles are split and loaded]
- **Performance Optimizations**: [Lazy loading, prefetching, caching]

### Backend Architecture

#### Server Architecture

- **Server Framework**: [Express/Fastify/Next.js API/etc]
- **Request Processing**: [Middleware stack and request lifecycle]
- **API Design**: [RESTful/GraphQL/RPC patterns]
- **Error Handling**: [Global error handling and logging patterns]

#### Business Logic Organization

- **Service Layer**: [How business logic is organized]
- **Validation Patterns**: [Input validation and sanitization]
- **Background Processing**: [Job queues, scheduled tasks, async processing]
- **Configuration Management**: [Environment variables, feature flags]

### Database Architecture

#### Database Design

- **Database System**: [PostgreSQL/MySQL/MongoDB/etc]
- **Schema Design**: [Table structure, relationships, constraints]
- **Indexing Strategy**: [Index design for performance]
- **Query Patterns**: [Common query patterns and optimizations]

#### Data Access Patterns

- **ORM/Query Builder**: [Prisma/TypeORM/Drizzle/raw SQL usage]
- **Connection Management**: [Pooling, connection lifecycle]
- **Transaction Handling**: [Transaction scope and management]
- **Migration Strategy**: [Schema versioning and deployment]

### Integration Architecture

#### Internal Communication

- **Module Communication**: [How internal modules interact]
- **Event Systems**: [Event-driven architecture patterns]
- **Shared State**: [How state is shared across components]
- **Service Discovery**: [How services find and communicate with each other]

#### External Integrations

- **Third-Party APIs**: [HTTP client patterns, retry logic, circuit breakers]
- **Authentication Providers**: [OAuth, SAML, custom auth integration]
- **Payment Systems**: [Payment processor integration patterns]
- **Monitoring Services**: [Logging, metrics, error tracking integration]

### Security Architecture

#### Authentication and Authorization

- **Authentication Flow**: [Session/JWT/OAuth implementation]
- **Authorization Patterns**: [RBAC/ABAC implementation]
- **Session Management**: [Session storage and lifecycle]
- **Token Management**: [Token generation, validation, refresh]

#### Data Protection

- **Input Validation**: [Validation framework and patterns]
- **SQL Injection Prevention**: [Parameterized queries, ORM protection]
- **XSS Protection**: [Content sanitization, CSP implementation]
- **Encryption**: [Data at rest and in transit encryption]

### Performance Architecture

#### Caching Strategy

- **Application Cache**: [In-memory caching patterns]
- **Database Cache**: [Query result caching]
- **CDN Integration**: [Static asset delivery]
- **Cache Invalidation**: [Cache busting and TTL strategies]

#### Optimization Patterns

- **Database Optimization**: [Query optimization, connection pooling]
- **Asset Optimization**: [Compression, minification, bundling]
- **Network Optimization**: [HTTP/2, compression, multiplexing]
- **Resource Management**: [Memory usage, CPU optimization]

### Scalability Architecture

#### Horizontal Scaling

- **Load Balancing**: [Load balancer configuration and strategy]
- **Stateless Design**: [How statelessness is maintained]
- **Database Scaling**: [Read replicas, sharding strategies]
- **Microservice Boundaries**: [Service decomposition patterns]

#### Performance Monitoring

- **Application Monitoring**: [APM integration and metrics]
- **Database Monitoring**: [Query performance tracking]
- **Infrastructure Monitoring**: [Server metrics and alerting]
- **User Experience Monitoring**: [Frontend performance tracking]

### Infrastructure Architecture

#### Deployment Strategy

- **Containerization**: [Docker/Kubernetes usage]
- **CI/CD Pipeline**: [Build, test, deploy automation]
- **Environment Management**: [Dev/staging/prod environment strategy]
- **Blue/Green Deployment**: [Zero-downtime deployment patterns]

#### Infrastructure as Code

- **Provisioning**: [Terraform/CloudFormation/CDK usage]
- **Configuration Management**: [Infrastructure configuration patterns]
- **Service Mesh**: [Inter-service communication patterns]
- **Observability**: [Logging, metrics, tracing implementation]

### Technology Decision Analysis

#### Framework Choices

- **Why These Technologies**: [Rationale for major technology decisions]
- **Trade-offs Made**: [Performance vs. development speed vs. scalability]
- **Migration Considerations**: [How to evolve the architecture]
- **Technical Debt**: [Architectural decisions that may need revision]

#### Architecture Patterns

- **Design Patterns Used**: [Observer, Factory, Strategy, etc.]
- **Anti-Patterns Present**: [Areas where patterns are misused]
- **Consistency**: [How consistently patterns are applied]
- **Extensibility**: [How easy it is to add new features]

</output_format>

<verification_requirements>

## Technical Accuracy Validation

- **Code Evidence**: Every architectural decision must be backed by actual code examination
- **Configuration Reality**: All described infrastructure must exist in actual config files
- **Framework Usage**: Framework patterns must match actual implementation
- **Integration Truth**: All described integrations must be found in actual code
- **Performance Claims**: Performance patterns must be verifiable in implementation

## Engineering Quality Checks

- **Architectural Consistency**: Do the patterns align across the codebase?
- **Scalability Reality**: Are the scalability claims supported by the architecture?
- **Technology Appropriateness**: Do the technology choices fit the use case?
- **Implementation Quality**: Is the architecture well-implemented?

</verification_requirements>

<usage_examples>

## Full Architecture Analysis

```
/tech:architecture
```

## Specific Component Focus

```
/tech:architecture "database layer and data flow"
/tech:architecture "frontend state management and routing"
/tech:architecture "API design and integration patterns"
```

## Performance Focus

```
/tech:architecture "caching and performance optimization"
/tech:architecture "scalability and load handling"
```

## Infrastructure Focus

```
/tech:architecture "deployment and infrastructure patterns"
```

</usage_examples>

<output_file_generation>

## Generated Documentation File

This command will create: a "project-info" folder in working directory if it doesn't already exist and then inside it will create: `technical-architecture.md`

### File Structure

- Executive summary of architectural approach
- Detailed technology stack analysis
- System design patterns and rationale
- Performance and scalability considerations
- Integration architecture and patterns
- Infrastructure and deployment strategy

### Focus Areas

- How the system is technically structured
- Technology choices and trade-offs
- Performance and scalability patterns
- Integration and communication strategies
- Infrastructure and operational concerns

</output_file_generation>
