---
name: technical-stack-analysis
description: "Analyzes a codebase's technical stack and architecture: dependencies, versions, structure, patterns, integrations and technical debt, producing a structured technical report. Use when asked for a technical or architecture analysis of a project."
disable-model-invocation: true
---

# Technical Stack & Architecture Analysis Prompt

## Objective

Conduct comprehensive technical analysis of this codebase focusing on architecture, technology stack, performance, security, and modernization opportunities. Generate actionable technical recommendations with priority and effort estimates.

## Analysis Framework

### 1. Technology Stack Assessment

**Inventory and evaluate current technologies:**

- Programming languages and versions
- Frontend/backend frameworks and libraries
- Database technologies and ORMs
- Build tools, bundlers, and CI/CD systems
- Testing frameworks and coverage tools
- Deployment and infrastructure technologies
- Third-party integrations and APIs

**For each technology, assess:**

- Current version vs. latest stable version
- Security vulnerability status
- End-of-life timeline and support status
- Performance characteristics and limitations
- Community support and ecosystem health

### 2. Architecture Analysis

**Evaluate system design and patterns:**

- Overall architecture type (monolith, microservices, serverless)
- Design patterns implementation (MVC, MVVM, Clean Architecture)
- Component coupling and cohesion
- Service boundaries and communication patterns
- Data flow and state management approach
- Error handling and logging strategies
- Scalability and fault tolerance design

### 3. Code Quality & Technical Debt Assessment

**Analyze code health metrics:**

- Code complexity and maintainability scores
- Test coverage percentage and quality
- Code duplication and redundancy levels
- Consistent coding standards adherence
- Documentation completeness
- Technical debt indicators (TODOs, FIXMEs, hacks)
- Performance bottlenecks and anti-patterns

### 4. Security Analysis

**Identify security vulnerabilities and risks:**

- Authentication and authorization mechanisms
- Input validation and sanitization practices
- Data encryption (at rest and in transit)
- Dependency vulnerabilities (use security scanners)
- API security measures and rate limiting
- Security headers and CORS configuration
- Secrets management and environment variables
- OWASP Top 10 compliance assessment

### 5. Database & Data Architecture Review

**Evaluate data layer implementation:**

- Database schema design and normalization
- Index optimization and query performance
- Data access patterns and ORM usage
- Migration strategies and version control
- Data validation and integrity constraints
- Backup and recovery procedures
- Scalability considerations (sharding, replication)
- Data synchronization and consistency models

### 6. Performance & Optimization Analysis

**Assess system performance characteristics:**

- Application startup and response times
- Database query performance and N+1 problems
- Memory usage patterns and potential leaks
- Frontend load times and Core Web Vitals
- API response times and throughput
- Caching strategies and effectiveness
- Resource utilization (CPU, memory, I/O)
- Scalability bottlenecks and limits

## Critical Issues to Identify

### Security Vulnerabilities

- Outdated dependencies with known CVEs
- Missing authentication/authorization checks
- SQL injection and XSS vulnerabilities
- Insecure data storage and transmission
- Exposed secrets and API keys

### Performance Problems

- Inefficient database queries
- Memory leaks and resource overconsumption
- Blocking operations in critical paths
- Missing or ineffective caching
- Large bundle sizes and slow load times

### Technical Debt

- Deprecated API usage and obsolete patterns
- Inconsistent error handling across modules
- Missing or inadequate test coverage
- Code duplication and copy-paste programming
- Complex, unmaintainable legacy code sections

### Architecture Issues

- Tight coupling between components
- Missing abstraction layers
- Inconsistent design pattern usage
- Poor separation of concerns
- Scalability limitations and single points of failure

### Modernization Opportunities

- Legacy framework/library upgrades
- Cloud-native architecture adoption
- DevOps and automation improvements
- Modern development toolchain adoption
- API modernization (REST to GraphQL, etc.)

## Report Structure

### Executive Summary

- Technology stack health overview
- Critical security and performance issues
- Technical debt summary with cost estimates
- Priority modernization recommendations

### Technology Stack Analysis

**Current Stack Inventory:**

- Detailed technology version matrix
- Security and support status for each component
- Upgrade paths and compatibility considerations
- Recommended technology replacements

### Architecture Assessment

- Current architecture evaluation with diagrams
- Design pattern consistency analysis
- Component dependency mapping
- Scalability and reliability assessment
- Recommended architectural improvements

### Security Audit Results

**Critical Security Issues:**

- Immediate threats requiring patches
- Vulnerable dependencies needing updates
- Missing security controls and implementations
- Compliance gaps and remediation steps

### Performance Analysis

**Performance Bottlenecks:**

- Database optimization opportunities
- Frontend performance improvements
- API response time optimizations
- Caching strategy enhancements
- Resource utilization optimizations

### Technical Debt Quantification

- Code quality metrics and trends
- Technical debt cost estimates (developer-days)
- Refactoring priorities with ROI analysis
- Testing coverage gaps and remediation plan

### Modernization Roadmap

**Phase 1 (0-3 months) - Critical Fixes:**

- Security vulnerability patches
- Performance critical optimizations
- Dependency updates for stability

**Phase 2 (3-6 months) - Infrastructure:**

- Architecture improvements
- Database optimizations
- CI/CD enhancements

**Phase 3 (6-12 months) - Modernization:**

- Framework/library upgrades
- Cloud migration opportunities
- Advanced feature implementations

### Implementation Guidelines

- Specific technical recommendations with code examples
- Migration strategies for major changes
- Testing approaches for each modification
- Risk mitigation strategies
- Success metrics and monitoring approaches

## Deliverables

1. **Technology Audit Report**: Complete inventory with recommendations
2. **Security Assessment**: Vulnerability report with remediation steps
3. **Performance Optimization Plan**: Specific improvements with impact estimates
4. **Technical Debt Reduction Strategy**: Prioritized refactoring roadmap
5. **Modernization Blueprint**: Long-term technical evolution plan

## Success Metrics

- Security vulnerability count (by severity)
- Performance improvement percentages
- Technical debt reduction (complexity/maintainability scores)
- Test coverage percentage targets
- Deployment frequency and reliability metrics
