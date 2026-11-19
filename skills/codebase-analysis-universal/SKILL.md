---
name: codebase-analysis-universal
description: "Runs a language-agnostic codebase analysis covering structure, stack, architecture, patterns, quality and risks, producing a standardized report. Use when asked to analyze or understand an unfamiliar repository in any language."
disable-model-invocation: true
---

# Universal Codebase Analysis Prompt

You are tasked with performing a comprehensive analysis of any codebase, regardless of technology stack, programming language, or architectural pattern. Your goal is to identify structural issues, missing components, architectural inconsistencies, and improvement opportunities across all layers of the application.

## Phase 1: Technology Stack and Architecture Discovery

### 1. Technology Identification

**First, identify and document:**

- **Primary programming language(s)** and versions
- **Framework(s)** and their versions (React, Vue, Angular, Django, Rails, Spring, .NET, etc.)
- **Database technology** (SQL, NoSQL, ORM/ODM used)
- **Build tools and package managers** (npm, yarn, pip, maven, gradle, etc.)
- **Testing frameworks** and coverage tools
- **Deployment and infrastructure** patterns
- **Third-party services** and integrations
- **Development tools** and configuration

### 2. Architectural Pattern Recognition

**Identify the architectural approach:**

- **Monolithic** vs **Microservices** vs **Hybrid**
- **MVC**, **MVP**, **MVVM**, **Component-based**, or **Custom patterns**
- **Layered architecture** (presentation, business, data layers)
- **API-first**, **Server-side rendered**, **SPA**, **JAMstack**, or **Hybrid**
- **Event-driven**, **CQRS**, **Hexagonal**, or **Clean Architecture** patterns
- **State management** patterns (Redux, Vuex, MobX, Context, etc.)

### 3. Project Structure Analysis

**Map the codebase organization:**

- **Directory structure** and naming conventions
- **Module/package** organization
- **Configuration** file locations and patterns
- **Asset and resource** organization
- **Documentation** structure
- **Test** organization and patterns

## Phase 2: Layer-by-Layer Analysis Framework

### 1. Data Layer Analysis

#### A. Data Storage and Models

- **Database schema** or data model structure
- **Entity relationships** and constraints
- **Data validation** rules and business logic
- **Migration** or schema evolution patterns
- **Indexing** and performance optimization
- **Data access patterns** (repositories, DAOs, active record, etc.)

#### B. Data Layer Issues to Identify

- **Missing relationships** between related entities
- **Inconsistent data validation** across the application
- **Performance bottlenecks** in data access
- **Missing indexes** for common queries
- **Data model complexity** vs. business requirements mismatch
- **Orphaned or unused** data structures
- **Missing data integrity** constraints

### 2. Business Logic Layer Analysis

#### A. Business Rule Implementation

- **Service classes**, **use cases**, or **business logic modules**
- **Domain models** and business entity representations
- **Validation logic** and business rule enforcement
- **Workflow** and process implementations
- **Business calculations** and algorithms
- **External service integrations** and adapters

#### B. Business Logic Issues to Identify

- **Scattered business logic** across inappropriate layers
- **Duplicated business rules** in multiple locations
- **Missing business validations** or incomplete rule sets
- **Inconsistent error handling** for business scenarios
- **Hard-coded values** that should be configurable
- **Missing business process** implementations
- **Overly complex** or **unnecessarily simple** business logic

### 3. API/Interface Layer Analysis

#### A. API Design and Implementation

- **REST**, **GraphQL**, **RPC**, or **Custom API** patterns
- **Endpoint organization** and naming conventions
- **Request/response** structure and consistency
- **Authentication** and **authorization** implementations
- **Error handling** and **status code** usage
- **API documentation** and contract definitions
- **Rate limiting** and **security** measures

#### B. API Layer Issues to Identify

- **Missing CRUD operations** for data entities
- **Inconsistent API design** patterns
- **Missing error handling** or inappropriate error responses
- **Security vulnerabilities** in API endpoints
- **Performance issues** in API responses
- **Missing API documentation** or outdated contracts
- **Inconsistent authentication/authorization** patterns

### 4. Presentation Layer Analysis

#### A. User Interface Structure

- **Component/view** organization and hierarchy
- **Styling** approach and consistency
- **State management** implementation
- **User interaction** handling
- **Form validation** and user feedback
- **Navigation** and routing implementation
- **Responsive design** and accessibility features

#### B. Presentation Layer Issues to Identify

- **Missing UI components** for data operations
- **Inconsistent styling** or design patterns
- **Poor state management** or data flow
- **Missing form validations** or user feedback
- **Accessibility issues** and missing features
- **Performance problems** in rendering or interactions
- **Missing responsive** design implementations

### 5. Integration Layer Analysis

#### A. External Integrations

- **Third-party service** connections
- **Payment processing** integrations
- **Authentication providers** (OAuth, SAML, etc.)
- **Messaging systems** (email, SMS, push notifications)
- **File storage** and media handling
- **Analytics** and monitoring integrations
- **CDN** and asset delivery

#### B. Integration Issues to Identify

- **Missing error handling** for external service failures
- **Inconsistent integration patterns** across services
- **Missing fallback mechanisms** for service outages
- **Security issues** in external communications
- **Performance bottlenecks** in external calls
- **Missing monitoring** for integration health
- **Outdated or deprecated** API usage

## Phase 3: Cross-Cutting Concerns Analysis

### 1. Security Analysis

- **Authentication** and **authorization** implementation
- **Data encryption** and secure storage
- **Input validation** and **sanitization**
- **HTTPS** and secure communication
- **Session management** and security
- **Dependency vulnerabilities** and updates
- **Security headers** and **CORS** configuration

### 2. Performance Analysis

- **Database query** optimization
- **Caching** strategies and implementation
- **Asset optimization** and delivery
- **Code splitting** and lazy loading
- **Memory usage** and potential leaks
- **Network request** optimization
- **Bundle size** and loading performance

### 3. Maintainability Analysis

- **Code organization** and modularity
- **Naming conventions** and consistency
- **Documentation** quality and completeness
- **Test coverage** and quality
- **Dependency management** and updates
- **Code complexity** and technical debt
- **Refactoring** opportunities

### 4. Scalability Analysis

- **Architecture scalability** for growth
- **Database scalability** considerations
- **Caching** and performance under load
- **Resource utilization** efficiency
- **Horizontal vs vertical** scaling readiness
- **Bottleneck identification** and mitigation
- **Load balancing** and distribution readiness

## Phase 4: Technology-Specific Deep Dive

### Based on identified technology stack, perform specialized analysis

#### For Web Applications (React/Vue/Angular/etc.)

- **Component reusability** and composition
- **State management** efficiency
- **Bundle optimization** and code splitting
- **SEO** and accessibility compliance
- **Browser compatibility** and polyfills

#### For Backend Services (Node.js/Python/Java/.NET/etc.)

- **Request handling** efficiency
- **Database connection** management
- **Background job** processing
- **Logging** and monitoring implementation
- **Configuration** management

#### For Mobile Applications (React Native/Flutter/Native/etc.)

- **Platform-specific** implementations
- **Performance** on different devices
- **Offline** functionality
- **App store** compliance
- **Push notification** handling

#### For Desktop Applications

- **Platform compatibility** and native features
- **Resource management** and efficiency
- **Update mechanisms** and distribution
- **User experience** consistency

## Universal Analysis Report Structure

### 1. Executive Summary

- **Technology Stack Overview**
  - Identified technologies and versions
  - Architectural pattern assessment
  - Overall complexity evaluation
  - Technology choice appropriateness

- **Critical Issues Summary**
  - High-priority problems affecting functionality
  - Security vulnerabilities requiring immediate attention
  - Performance bottlenecks impacting user experience
  - Architectural issues limiting scalability

### 2. Architecture Assessment

```
- Architectural Pattern Evaluation
  - Current Pattern: [Identified architecture]
  - Appropriateness: [How well it fits the use case]
  - Strengths: [What works well]
  - Weaknesses: [What could be improved]

- Layer Separation Analysis
  - Data Layer Health: [Score and issues]
  - Business Logic Layer Health: [Score and issues]
  - Presentation Layer Health: [Score and issues]
  - Integration Layer Health: [Score and issues]

- Cross-Cutting Concerns
  - Security Implementation: [Assessment and gaps]
  - Performance Characteristics: [Bottlenecks and optimizations]
  - Maintainability Factors: [Code quality and organization]
  - Scalability Readiness: [Growth limitations and preparations]
```

### 3. Missing Components Report

- **Data Layer Gaps**
  - Missing entities or relationships
  - Incomplete data validation
  - Missing database optimizations
  - Inadequate data access patterns

- **Business Logic Gaps**
  - Missing business rules or validations
  - Incomplete workflow implementations
  - Missing error handling scenarios
  - Inadequate business process support

- **API/Service Gaps**
  - Missing endpoints or operations
  - Incomplete CRUD implementations
  - Missing authentication/authorization
  - Inadequate error handling

- **UI/Presentation Gaps**
  - Missing user interfaces for operations
  - Incomplete form validations
  - Missing responsive design elements
  - Inadequate user feedback mechanisms

### 4. Code Quality Assessment

- **Maintainability Metrics**
  - Code organization and structure
  - Naming conventions consistency
  - Documentation quality and coverage
  - Test coverage and quality

- **Technical Debt Analysis**
  - Code duplication and redundancy
  - Complex or overly coupled components
  - Outdated dependencies and practices
  - Refactoring opportunities

- **Best Practices Compliance**
  - Framework-specific best practices
  - Security best practices
  - Performance best practices
  - Accessibility standards compliance

### 5. Performance and Scalability Report

- **Current Performance Issues**
  - Identified bottlenecks and their impact
  - Resource utilization inefficiencies
  - Slow operations and optimization opportunities

- **Scalability Assessment**
  - Current scaling limitations
  - Architecture changes needed for growth
  - Database and storage scaling considerations
  - Infrastructure and deployment scaling needs

### 6. Security and Compliance Analysis

- **Security Vulnerabilities**
  - Identified security issues and risks
  - Missing security implementations
  - Dependency vulnerabilities
  - Data protection and privacy concerns

- **Compliance Considerations**
  - Regulatory compliance gaps
  - Industry standard adherence
  - Accessibility compliance status
  - Data handling compliance issues

### 7. Technology Recommendation Report

- **Technology Stack Assessment**
  - Current technology appropriateness
  - Outdated dependencies requiring updates
  - Technology alternatives for improvement
  - Integration opportunities with modern tools

- **Architecture Evolution Recommendations**
  - Architectural improvements for better maintainability
  - Pattern changes for improved scalability
  - Refactoring strategies for better organization
  - Migration paths for technology updates

### 8. Prioritized Action Plan

#### Immediate Actions (Critical Issues)

- Security vulnerabilities requiring immediate fixes
- Performance issues severely impacting users
- Broken functionality requiring urgent repair
- Critical missing components blocking operations

#### Short-term Improvements (1-3 months)

- Code quality improvements and refactoring
- Missing feature implementations
- Performance optimizations
- Documentation and testing improvements

#### Medium-term Strategic Changes (3-12 months)

- Architectural improvements and pattern implementations
- Technology stack upgrades and modernizations
- Scalability preparations and infrastructure improvements
- Comprehensive security and compliance implementations

#### Long-term Evolution (12+ months)

- Major architectural overhauls
- Technology platform migrations
- Advanced feature implementations
- Comprehensive performance and scalability solutions

## Analysis Instructions

1. **Adapt analysis depth to codebase size and complexity** - Scale your analysis approach
2. **Focus on technology-appropriate patterns** - Use framework/language-specific best practices
3. **Consider the application domain** - Adapt recommendations to the specific use case
4. **Prioritize by impact and effort** - Balance improvement value against implementation cost
5. **Provide actionable recommendations** - Give specific, implementable suggestions
6. **Consider team expertise** - Recommend solutions appropriate for the development team
7. **Include migration strategies** - Provide practical paths for implementing changes

## Output Format

Provide the analysis in a structured markdown report with:

- **Clear technology identification** and stack assessment
- **Specific code examples** and file references where possible
- **Quantified metrics** for performance, security, and quality measures
- **Priority levels** (Critical, High, Medium, Low) for all recommendations
- **Implementation guidance** with estimated effort and complexity
- **Technology-specific best practices** and improvement suggestions
- **Practical next steps** with clear deliverables and timelines

Focus on being comprehensive, technology-aware, and practical in your analysis while providing actionable insights regardless of the technology stack used.
