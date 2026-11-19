---
name: codebase-analysis-comprehensive
description: "Runs an exhaustive multi-section codebase analysis covering architecture, data flow, features, quality, security, performance and documentation gaps, producing a detailed report. Use when asked for a complete deep analysis of a repository."
disable-model-invocation: true
---

# Comprehensive Codebase Analysis Prompt

## Analysis Objective

Conduct a thorough exploration of this codebase to understand its architecture, business logic, and implementation details. Generate a comprehensive report highlighting issues, improvements, and recommendations.

## Preliminary Analysis

### Codebase Classification

- Identify the type of codebase:
  - Architecture type (monolith, microservices, serverless, etc.)
  - Application type (web, mobile, desktop, API-only, etc.)
  - Deployment model (cloud-native, on-premise, hybrid, etc.)
- Determine the primary purpose of the application (e-commerce, CRM, content management, etc.)
- Identify the target platforms and environments

### Technology Stack Identification

- Programming languages and versions used
- Application type identification:
  - **Web**: Frontend frameworks (React, Angular, Vue, etc.)
  - **Mobile**: Native frameworks (SwiftUI, UIKit, Jetpack Compose, Flutter, React Native)
  - **Desktop**: GUI frameworks (WPF, WinForms, Electron, Qt, PySide, SwiftUI, AppKit)
  - **Cross-platform**: Frameworks enabling code sharing (React Native, Flutter, Xamarin, Qt)
- Backend frameworks and technologies (Express, Django, Rails, .NET Core, Spring, etc.)
- Database technologies:
  - Server databases (SQL, NoSQL, specific products)
  - Mobile/desktop local storage (Core Data, SQLite, Realm, etc.)
- API technologies (REST, GraphQL, gRPC, etc.)
- State management solutions:
  - Web (Redux, MobX, Context API, etc.)
  - Mobile (Combine, RxSwift, MobX, Redux, Provider, BLoC)
  - Desktop (MVVM implementations, Observable patterns)
- Platform-specific build tools:
  - Web (Webpack, Rollup, Vite, etc.)
  - Mobile (Xcode build system, Gradle, CocoaPods, Swift Package Manager)
  - Desktop (MSBuild, CMake, Xcode build system)
- Testing frameworks and tools for each platform
- DevOps and CI/CD tools
- Deployment targets (web servers, app stores, desktop installers)
- Third-party integrations, SDKs, and APIs

### Analysis Depth Selection

- Quick scan: High-level overview focusing on major architecture and critical issues
- Standard analysis: Comprehensive review of code quality, architecture, and business logic
- Deep dive: Detailed exploration including performance, security, scalability aspects

## Exploration Strategy

### 1. Initial Overview

- List all top-level directories and their purpose
- Identify key configuration files (package.json, tsconfig.json, etc.)
- Understand the project's tech stack, frameworks, and libraries
- Identify entry points to the application
- Map the repository structure and organization

### 2. Architecture Analysis

- Map the overall architecture (frontend/backend separation, microservices, client-server, etc.)
- Identify patterns used:
  - Web: MVC, MVVM, Clean Architecture, etc.
  - Mobile: VIPER, MVP, MVVM, MVI, Clean Architecture
  - Desktop: MVVM, MVP, MVC, Document-View
- Document the dependency graph between major components
- Analyze the communication patterns between components
- Identify service boundaries in microservice architectures
- Document event handling patterns (pub/sub, event sourcing, delegates/callbacks, notifications)
- Evaluate platform integration approaches:
  - Mobile: native API usage, permissions handling, hardware access
  - Desktop: system API integration, file system access, OS feature utilization
- Assess cross-cutting concerns implementation (logging, caching, etc.)

### 3. Business Logic Exploration

- Identify core domain models and entities
- Map business workflows and processes
- Understand authorization and permissions models
- Document business rules and validations
- Trace user journeys through the codebase
- Identify integration points with external systems

### 4. UI/UX Analysis

- Evaluate component/view structure and hierarchy
- Analyze state management approach
- Review UI/UX patterns and consistency
- Platform-specific UI implementation:
  - Web: Responsiveness, browser compatibility
  - Mobile: Adherence to platform guidelines (Human Interface Guidelines, Material Design)
  - Desktop: Window management, keyboard shortcuts, platform conventions
- Assess accessibility:
  - Web: WCAG compliance
  - Mobile: VoiceOver/TalkBack support, dynamic text sizes
  - Desktop: Screen reader compatibility, keyboard navigation
- Verify frontend-backend integration points
- Evaluate internationalization (i18n) and localization (l10n) implementation
- Check for component/view reusability and composition
- Review handling of platform-specific features:
  - Mobile: Touch gestures, device orientation, notches/dynamic islands
  - Desktop: Multi-window support, drag-and-drop, clipboard integration
- Analyze performance optimization techniques
- Assess offline capabilities and sync strategies (for mobile)

### 5. Backend Analysis

- Examine API structure and RESTfulness
- Review database schema and relationships
- Analyze data access patterns
- Check authentication mechanisms
- Evaluate error handling and logging
- Assess performance optimization techniques
- Review rate limiting implementations
- Analyze caching strategies (CDN, application, database levels)
- Evaluate background job processing systems
- Check API versioning approach
- Assess database migration strategies

### 6. Performance Analysis

- Identify potential performance bottlenecks
- Platform-specific performance considerations:
  - Web: DOM rendering, JavaScript execution
  - Mobile: UI thread management, render performance, startup time
  - Desktop: Memory usage, CPU utilization, startup time
- Review database/data storage query optimization
- Assess load times and responsiveness
- Evaluate API/network response times
- Check memory usage patterns and potential leaks
- Analyze resource utilization (CPU, memory, disk I/O)
- Review caching effectiveness
- Assess network payload optimizations and data transfer efficiency
- Evaluate code splitting and lazy loading implementations (where applicable)
- Review asset optimization strategies (images, media, resources)
- Mobile-specific: battery usage, background task efficiency, thermal impact
- Desktop-specific: large dataset handling, long-running process management

### 7. Security Assessment

- Identify potential OWASP vulnerabilities
- Evaluate authentication and authorization mechanisms
- Assess input validation and sanitization
- Check for proper data encryption (at rest and in transit)
- Review security headers and CORS configuration
- Evaluate dependency security (outdated packages with vulnerabilities)
- Check API security measures
- Assess secure coding practices
- Review secrets management approach
- Evaluate privacy compliance measures (GDPR, CCPA, etc.)

### 8. DevOps and CI/CD Analysis

- Evaluate build pipeline configuration and efficiency
- Review deployment strategy and environments
- Assess infrastructure as code quality
- Check containerization approach
- Evaluate monitoring and observability setup
- Assess logging strategy and implementation
- Review disaster recovery and backup procedures
- Check environment configuration management
- Evaluate deployment frequency capabilities
- Assess automated testing integration in the pipeline

### 9. Scalability Assessment

- Identify potential bottlenecks under increased load
- Evaluate stateful vs. stateless component design
- Assess database scaling strategies
- Review horizontal vs. vertical scaling approaches
- Check for single points of failure
- Evaluate load balancing configuration
- Assess resource allocation strategies
- Review caching layer scalability
- Evaluate data partitioning strategies
- Assess connection pooling implementations

### 10. Code Quality Assessment

- Check for consistent coding standards
- Identify code duplication
- Assess test coverage and quality
- Review error handling practices
- Evaluate comments and documentation
- Check for security vulnerabilities
- Assess code complexity metrics
- Review naming conventions consistency
- Evaluate function/method length and complexity
- Assess separation of concerns

### 11. Team Collaboration Analysis

- Evaluate code review processes and documentation
- Assess knowledge distribution across codebase
- Review contributor documentation completeness
- Check commit message quality and conventions
- Evaluate branch strategy effectiveness
- Assess onboarding documentation for new developers
- Review issue and pull request templates
- Evaluate technical documentation accessibility
- Assess code ownership distribution
- Review pair programming or collaborative development patterns

## Specific Issues to Identify

### Missing Elements

- Required but unimplemented features
- Missing tests for critical functionality
- Incomplete error handling
- Absent documentation for complex logic
- Missing validations for user inputs
- Incomplete implementations of design patterns
- Accessibility features required for compliance
- Security measures for sensitive operations
- Proper logging for debugging and auditing
- Monitoring for critical components

### Unnecessary Code

- Dead code that's never called
- Commented-out code blocks
- Unused imports, variables, and functions
- Overcomplicated solutions for simple problems
- Unnecessary abstractions
- Duplicate utility functions
- Redundant data transformation logic
- Unused configurations and dependencies
- Excessive logging or comments
- Deprecated feature implementations

### Integration Issues

- Inconsistent data formats between frontend and backend
- Missing API endpoints needed by frontend
- Mismatched type definitions
- Incorrect error handling across boundaries
- Inefficient data fetching patterns
- Inconsistent authentication handling
- Redundant API calls for the same data
- Improper handling of API versioning
- Inconsistent error response formats
- Unhandled timeout scenarios

### Styling Issues

- Inconsistent styling approaches
- CSS specificity problems
- Unused styles
- Non-responsive elements
- Accessibility issues
- Inconsistent theming implementation
- Mixed usage of units (px, em, rem, etc.)
- CSS performance issues (complex selectors)
- Inefficient media query implementation
- Style duplication across components

### Syntax and Best Practices

- Deprecated API usage
- Non-idiomatic code for the chosen frameworks
- Potential performance bottlenecks
- Security anti-patterns
- Code that doesn't follow project conventions
- Inconsistent error handling
- Improper promises/async-await usage
- Inconsistent state management patterns
- Unclear logic with side effects
- Magic numbers and hardcoded values

### 12. Platform-Specific Analysis

#### Mobile Applications

- Evaluate lifecycle management implementation
- Assess battery usage optimization
- Review permissions handling and privacy features
- Analyze offline capability and data synchronization
- Evaluate responsive design across different device sizes
- Check background processing implementation
- Assess notification handling
- Review app store compliance considerations
- Evaluate crash reporting and analytics integration
- Analyze platform-specific optimizations (iOS/Android)

#### Desktop Applications

- Assess installation and update mechanisms
- Evaluate system integration points (file associations, etc.)
- Review multi-window/multi-display handling
- Analyze memory management and resource usage
- Evaluate startup performance and optimization
- Check for proper cleanup on application exit
- Assess keyboard shortcut implementation
- Review platform-specific features utilization
- Evaluate cross-platform compatibility (if applicable)
- Analyze use of native vs. cross-platform components

## Technical Debt Quantification

### Measurement Methods

- Calculate maintainability index scores for key components
- Use cyclomatic complexity metrics to identify problematic areas
- Assess code churn (frequency of changes to files) to identify unstable areas
- Measure test coverage percentage across different areas
- Count TODOs and FIXMEs with categorization by criticality
- Evaluate duplication percentage across codebase
- Measure dependency freshness (how up-to-date are dependencies)
- Assess documentation completeness for critical components

### Remediation Cost Estimation

- Categorize issues by complexity (simple, moderate, complex)
- Estimate effort in developer-days for each category
- Prioritize based on business impact and remediation cost
- Create a remediation roadmap with effort estimations
- Calculate technical debt ratio (remediation cost / development cost)
- Estimate ROI for addressing specific technical debt items

### Business Impact Assessment

- Identify performance issues affecting user experience
- Evaluate security vulnerabilities by potential business impact
- Assess maintenance overhead impact on feature development velocity
- Identify areas where technical debt affects scalability
- Evaluate impact on developer onboarding and productivity
- Assess impact on time-to-market for new features

## Modernization Opportunities

### Legacy Code Migration

- Identify legacy patterns and outdated architectural approaches
- Recommend incremental modernization strategies
- Suggest strangler pattern implementations for legacy systems
- Outline refactoring paths for monolithic components
- Propose domain-driven modernization approaches
- Recommend test coverage improvements before modernization

### Framework and Library Upgrades

- Identify outdated dependencies and frameworks
- Map upgrade paths with potential breaking changes
- Suggest intermediate steps for major version upgrades
- Recommend parallel implementations for critical components
- Outline feature flag strategies for gradual rollouts
- Identify polyfill and compatibility requirements

### Architecture Modernization

- Assess microservices transformation opportunities
- Evaluate serverless implementation possibilities
- Recommend API-first transformation strategies
- Suggest event-driven architecture patterns where appropriate
- Outline cloud-native transformation paths
- Propose containerization and orchestration approaches
- Recommend state management modernization

## Existence Verification

For each recommendation involving implementation of new features or components:

- Verify if similar functionality already exists elsewhere in the codebase
- Check if there are abandoned or incomplete implementations
- Assess if existing utilities or libraries could fulfill the need
- Confirm that the feature aligns with the architecture pattern
- Validate that the recommended implementation doesn't duplicate existing code

## Report Structure

### 1. Executive Summary

- Overview of the codebase health
- Key strengths and critical issues
- High-level recommendations
- Technical debt summary
- Modernization opportunities overview

### 2. Codebase Classification

- Type of application and architecture
- Technology stack summary
- Key architectural patterns identified
- Development and operational paradigms

### 3. Architecture Assessment

- Current architecture evaluation
- Recommendations for architectural improvements
- Diagrams of current vs. recommended structure (if applicable)
- Service boundaries and communication patterns
- Data flow analysis

### 4. Detailed Findings

For each category (frontend, backend, business logic, etc.):

- Critical issues (high priority)
- Important improvements (medium priority)
- Nice-to-have enhancements (low priority)
- Each finding should include:
  - Issue description
  - Location in codebase
  - Potential impact
  - Recommendation for resolution
  - Complexity estimate for fixing (simple, moderate, complex)

### 5. Technical Debt Analysis

- Quantified technical debt by category
- Remediation cost estimates
- Business impact assessment
- Technical debt trends (if historical data available)
- Debt reduction recommendations

### 6. Modernization Roadmap

- Legacy code migration strategies
- Framework and library upgrade paths
- Architecture modernization opportunities
- Estimated timelines and effort
- Risk assessment for modernization efforts

### 7. Implementation Roadmap

- Prioritized list of recommendations
- Suggested implementation order
- Dependencies between recommendations
- Quick wins identification
- Long-term strategic improvements

### 8. Code Quality Metrics

- Summary of code quality issues by type
- Patterns of recurring issues
- Recommendations for quality improvement
- Suggested quality gates and metrics

### 9. Team Collaboration Insights

- Knowledge distribution assessment
- Contribution patterns analysis
- Documentation completeness evaluation
- Onboarding readiness assessment
- Suggested collaboration improvements

### 10. Best Practices Checklist

- List of recommended best practices for this specific codebase
- Areas where best practices are being followed well
- Areas where best practices need improvement
- Framework-specific recommendations

## Documentation Generation Guidelines

Based on the codebase analysis, generate appropriate documentation that fits the project's needs. Select from the following based on what would be most valuable:

### README.md

A properly structured README.md that includes:

- Project title and description
- Technology stack and version requirements
- Setup and installation instructions
- Development workflow
- Testing approach
- Deployment process
- Key features and capabilities
- Contributing guidelines
- License information

### Architecture Documentation

Consider which of these elements would be most valuable:

- System context diagram
- Container/component diagrams
- Code organization explanation
- Key design patterns used
- Data models and relationships
- API documentation
- Integration points
- Security model

### Development Guides

Select appropriate guides based on the codebase:

- Onboarding documentation
- Coding standards and conventions
- Testing strategies
- Branching strategy
- Release process
- Environment setup
- Debugging guidelines
- Performance optimization tips

### Operational Documentation

If needed:

- Deployment procedures
- Monitoring setup
- Backup and recovery
- Scaling guidelines
- Security protocols
- Incident response procedures
- Maintenance tasks

## Additional Instructions

- Provide concrete code examples where possible
- Include line numbers and file paths for specific issues
- Consider the project's apparent goals and constraints when making recommendations
- Focus on actionable insights rather than minor stylistic preferences
- Acknowledge assumptions made during the analysis
- Highlight potential risks associated with recommended changes
- Adapt the analysis depth based on the size and complexity of the codebase
- Prioritize findings based on business impact, security risks, and technical debt
