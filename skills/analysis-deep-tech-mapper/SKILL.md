---
name: analysis-deep-tech-mapper
description: "Analyzes how specific features are technically implemented: module design, algorithms, design patterns, performance, concurrency, resource handling and extension points. Use when asked for a deep technical walkthrough of a feature. Writes technical-implementation.md."
disable-model-invocation: true
---

# Technical Implementation Analysis Command

<task>
You are a senior software engineer and code architect. Analyze the codebase to understand how specific features are technically implemented, including algorithms, design patterns, performance optimizations, and engineering solutions to complex problems.
</task>

<context>
This command provides deep technical insight into feature implementation, engineering decisions, algorithm choices, performance patterns, and code organization. It's designed for engineers who need to understand how complex features are built and can be extended or optimized.

Target: $ARGUMENTS (if specified, focus on specific features or technical areas) </context>

<analysis_methodology>

## Phase 1: Implementation Pattern Discovery

### Code Organization and Structure

- **Module Design**: How features are broken down into modules and components
- **Design Patterns**: Which design patterns are used and how they're implemented
- **Abstraction Layers**: How different concerns are separated and abstracted
- **Code Reuse**: How common functionality is shared across features

### Algorithm and Logic Implementation

- **Core Algorithms**: Key algorithms that drive feature functionality
- **Data Structures**: How data is organized and manipulated in memory
- **Business Logic**: How business rules are encoded and enforced
- **Edge Case Handling**: How unusual scenarios and errors are managed

## Phase 2: Performance and Optimization

### Performance Patterns

- **Optimization Techniques**: How performance bottlenecks are addressed
- **Caching Strategies**: How expensive operations are cached
- **Lazy Loading**: How resources are loaded on demand
- **Background Processing**: How long-running tasks are handled

### Resource Management

- **Memory Usage**: How memory is allocated and managed
- **Concurrency**: How parallel operations are implemented
- **Resource Pooling**: How expensive resources are reused
- **Cleanup Patterns**: How resources are properly released

## Phase 3: Integration and Extension

### Component Integration

- **Inter-Module Communication**: How different parts of the system interact
- **Event Systems**: How components communicate through events
- **Plugin Architecture**: How the system can be extended
- **Configuration Systems**: How behavior can be customized

### Extensibility Patterns

- **Hook Systems**: How third-party code can extend functionality
- **Strategy Patterns**: How different implementations can be swapped
- **Factory Patterns**: How objects are created and configured
- **Observer Patterns**: How components react to state changes

</analysis_methodology>

<code_reading_focus>

## Implementation-Focused Code Reading

### 1. Feature Implementation Analysis

```
- Examine core feature implementation code
- Understand algorithm and logic implementation
- Analyze data flow through feature components
- Map performance optimization techniques
```

### 2. Design Pattern Usage Analysis

```
- Identify design patterns used in implementation
- Understand how patterns solve specific problems
- Analyze pattern consistency across codebase
- Map pattern effectiveness and appropriateness
```

### 3. Performance Implementation Analysis

```
- Find performance optimization code
- Understand caching and memoization strategies
- Analyze async and concurrent processing
- Map resource management patterns
```

### 4. Integration and Extension Analysis

```
- Examine how components integrate with each other
- Understand configuration and customization systems
- Analyze plugin and extension mechanisms
- Map event systems and communication patterns
```

</code_reading_focus>

<output_format>

## Technical Implementation Analysis Report

### Implementation Overview

- **Architecture Style**: [How the codebase is technically organized]
- **Primary Patterns**: [Key design patterns used throughout]
- **Technology Integration**: [How different technologies work together]
- **Code Organization**: [How features are structured and organized]

### Core Feature Implementations

#### [Feature Name 1] - Technical Implementation

- **Purpose**: [What this feature accomplishes technically]
- **Architecture**: [How the feature is architecturally structured]
- **Key Components**:
  - **Component 1**: [Technical purpose and implementation approach]
  - **Component 2**: [Technical purpose and implementation approach]
  - **Component 3**: [Technical purpose and implementation approach]
- **Algorithms**: [Key algorithms and their implementation details]
- **Data Structures**: [How data is organized and manipulated]
- **Performance Considerations**: [How performance is optimized]
- **Error Handling**: [How errors and edge cases are managed]
- **Integration Points**: [How this feature connects to other parts]
- **Extension Mechanisms**: [How this feature can be extended or customized]

#### [Feature Name 2] - Technical Implementation

[Same structure as above]

### Design Pattern Implementation

#### Creational Patterns

- **Factory Pattern**: [How object creation is abstracted and managed]
- **Builder Pattern**: [How complex objects are constructed]
- **Singleton Pattern**: [How single instances are managed]
- **Prototype Pattern**: [How object cloning is implemented]

#### Structural Patterns

- **Adapter Pattern**: [How incompatible interfaces are bridged]
- **Decorator Pattern**: [How behavior is extended without inheritance]
- **Facade Pattern**: [How complex subsystems are simplified]
- **Composite Pattern**: [How tree structures are implemented]

#### Behavioral Patterns

- **Observer Pattern**: [How components react to state changes]
- **Strategy Pattern**: [How algorithms are encapsulated and interchanged]
- **Command Pattern**: [How operations are encapsulated as objects]
- **State Pattern**: [How state-dependent behavior is managed]

### Algorithm Implementation Analysis

#### [Algorithm Name 1] - [Purpose]

- **Location**: [Where in the codebase this algorithm is implemented]
- **Input**: [What data the algorithm takes as input]
- **Algorithm Steps**:
  1. [Step 1 with implementation details]
  2. [Step 2 with implementation details]
  3. [Step 3 with implementation details]
- **Data Structures Used**: [Arrays, trees, hash tables, etc.]
- **Time Complexity**: [Big O analysis of the algorithm]
- **Space Complexity**: [Memory usage characteristics]
- **Optimization Techniques**: [How the algorithm is optimized]
- **Edge Cases**: [Special cases handled by the algorithm]
- **Testing Strategy**: [How the algorithm is tested and validated]

#### [Algorithm Name 2] - [Purpose]

[Same structure as above]

### Performance Implementation

#### Caching Strategies

- **In-Memory Caching**: [How frequently accessed data is cached in memory]
- **Database Query Caching**: [How database results are cached]
- **Computed Value Caching**: [How expensive calculations are cached]
- **Cache Invalidation**: [How cached data is kept fresh and consistent]

#### Asynchronous Processing

- **Async/Await Usage**: [How asynchronous operations are implemented]
- **Promise Handling**: [How promises are managed and chained]
- **Background Tasks**: [How long-running operations are handled]
- **Concurrent Processing**: [How parallel operations are coordinated]

#### Optimization Techniques

- **Lazy Loading**: [How resources are loaded on demand]
- **Batch Processing**: [How operations are batched for efficiency]
- **Connection Pooling**: [How database connections are reused]
- **Resource Pooling**: [How expensive resources are managed]

#### Memory Management

- **Object Lifecycle**: [How objects are created, used, and destroyed]
- **Memory Leaks Prevention**: [How memory leaks are avoided]
- **Garbage Collection**: [How garbage collection is optimized]
- **Resource Cleanup**: [How resources are properly released]

### Data Flow and Processing

#### Data Transformation Pipelines

- **Input Processing**: [How raw input data is processed and validated]
- **Transformation Steps**: [How data is transformed through processing stages]
- **Output Generation**: [How final results are produced and formatted]
- **Error Handling**: [How errors in the pipeline are managed]

#### State Management Implementation

- **Application State**: [How global application state is managed]
- **Component State**: [How local component state is handled]
- **State Persistence**: [How state is saved and restored]
- **State Synchronization**: [How state is kept consistent across components]

#### Event Processing

- **Event Definition**: [How events are defined and structured]
- **Event Propagation**: [How events flow through the system]
- **Event Handling**: [How components respond to events]
- **Event Persistence**: [How events are stored and replayed if needed]

### Component Architecture

#### Component Design

- **Component Hierarchy**: [How components are organized hierarchically]
- **Component Communication**: [How components interact with each other]
- **Component Lifecycle**: [How components are created, updated, destroyed]
- **Component Reusability**: [How components are designed for reuse]

#### Interface Design

- **API Contracts**: [How component interfaces are defined]
- **Type Safety**: [How interfaces ensure type safety]
- **Backward Compatibility**: [How interface changes are managed]
- **Documentation**: [How interfaces are documented and communicated]

#### Module Organization

- **Module Boundaries**: [How functionality is divided into modules]
- **Dependency Management**: [How modules depend on each other]
- **Module Loading**: [How modules are loaded and initialized]
- **Module Configuration**: [How modules are configured and customized]

### Integration Implementation

#### Internal Integration

- **Service Communication**: [How internal services communicate]
- **Data Sharing**: [How data is shared between components]
- **Event Systems**: [How components communicate through events]
- **Configuration Sharing**: [How configuration is shared across components]

#### External Integration

- **API Client Implementation**: [How external APIs are integrated]
- **Error Handling**: [How external service errors are managed]
- **Retry Logic**: [How failed external calls are retried]
- **Circuit Breaker**: [How external service failures are handled]

#### Real-Time Integration

- **WebSocket Implementation**: [How real-time communication is implemented]
- **Event Streaming**: [How real-time events are processed]
- **Connection Management**: [How real-time connections are managed]
- **Fallback Mechanisms**: [How real-time features degrade gracefully]

### Error Handling and Resilience

#### Error Handling Patterns

- **Exception Hierarchies**: [How different error types are organized]
- **Error Propagation**: [How errors bubble up through the system]
- **Error Recovery**: [How the system recovers from errors]
- **Error Logging**: [How errors are logged for debugging]

#### Resilience Patterns

- **Retry Mechanisms**: [How failed operations are retried]
- **Circuit Breakers**: [How cascading failures are prevented]
- **Bulkhead Pattern**: [How failures are isolated to prevent spread]
- **Timeout Handling**: [How operations are protected from hanging]

#### Validation Implementation

- **Input Validation**: [How user input is validated and sanitized]
- **Business Rule Validation**: [How business rules are enforced]
- **Data Integrity**: [How data consistency is maintained]
- **Constraint Enforcement**: [How system constraints are enforced]

### Configuration and Customization

#### Configuration Systems

- **Configuration Loading**: [How configuration is loaded and parsed]
- **Environment Handling**: [How different environments are managed]
- **Runtime Configuration**: [How configuration can be changed at runtime]
- **Configuration Validation**: [How configuration correctness is ensured]

#### Customization Mechanisms

- **Plugin Architecture**: [How the system can be extended with plugins]
- **Hook Systems**: [How custom code can be injected at specific points]
- **Theme Systems**: [How visual appearance can be customized]
- **Feature Flags**: [How features can be enabled/disabled dynamically]

### Testing Implementation

#### Unit Testing Patterns

- **Test Organization**: [How unit tests are structured and organized]
- **Mocking Strategies**: [How dependencies are mocked for testing]
- **Test Data Management**: [How test data is created and managed]
- **Assertion Patterns**: [How test assertions are structured]

#### Integration Testing

- **Test Environment Setup**: [How integration test environments are created]
- **Database Testing**: [How database operations are tested]
- **API Testing**: [How API endpoints are tested]
- **End-to-End Testing**: [How complete workflows are tested]

### Development Workflow Implementation

#### Build System

- **Build Pipeline**: [How the application is built and packaged]
- **Asset Processing**: [How static assets are processed and optimized]
- **Code Generation**: [How code is automatically generated]
- **Dependency Management**: [How dependencies are resolved and bundled]

#### Development Tools

- **Hot Reloading**: [How development changes are applied without restart]
- **Debugging Tools**: [How debugging is facilitated during development]
- **Code Quality Tools**: [How code quality is enforced]
- **Documentation Generation**: [How documentation is automatically generated]

### Monitoring and Observability Implementation

#### Logging Implementation

- **Log Levels**: [How different log levels are used]
- **Structured Logging**: [How logs are structured for analysis]
- **Log Aggregation**: [How logs are collected and centralized]
- **Log Analysis**: [How logs are analyzed for insights]

#### Metrics Collection

- **Performance Metrics**: [How application performance is measured]
- **Business Metrics**: [How business KPIs are tracked]
- **Custom Metrics**: [How custom metrics are defined and collected]
- **Metric Visualization**: [How metrics are displayed and analyzed]

#### Health Monitoring

- **Health Checks**: [How application health is monitored]
- **Dependency Monitoring**: [How external dependencies are monitored]
- **Resource Monitoring**: [How system resources are tracked]
- **Alert Systems**: [How alerts are generated and delivered]

</output_format>

<verification_requirements>

## Implementation Analysis Validation

- **Code Evidence**: All described implementations must be found in actual code
- **Algorithm Accuracy**: All algorithm descriptions must match actual implementation
- **Pattern Verification**: All design patterns must be correctly identified in code
- **Performance Claims**: All performance optimizations must be verifiable
- **Integration Truth**: All integration patterns must exist in actual implementation

## Engineering Quality Checks

- **Implementation Quality**: Is the code well-implemented and maintainable?
- **Pattern Appropriateness**: Are design patterns used appropriately?
- **Performance Effectiveness**: Are performance optimizations actually effective?
- **Extensibility**: Is the implementation designed for future extension?

</verification_requirements>

<usage_examples>

## Full Implementation Analysis

```
/tech:implementation
```

## Feature-Specific Analysis

```
/tech:implementation "AI recommendation engine"
/tech:implementation "real-time collaboration system"
/tech:implementation "energy pattern analysis algorithms"
```

## Pattern-Specific Analysis

```
/tech:implementation "design patterns and architectural decisions"
/tech:implementation "performance optimization techniques"
```

## Component-Specific Analysis

```
/tech:implementation "component architecture and communication"
/tech:implementation "data processing and transformation pipelines"
```

</usage_examples>

<output_file_generation>

## Generated Documentation File

The command will create: `technical-implementation.md`

### File Structure

- Executive summary of implementation approach and quality
- Feature-by-feature technical implementation analysis
- Design pattern usage and architectural decisions
- Algorithm implementation and performance optimization
- Component architecture and integration patterns
- Error handling, testing, and monitoring implementation

### Focus Areas

- How complex features are technically implemented
- Algorithm and data structure choices and implementation
- Design pattern usage and architectural decisions
- Performance optimization techniques and effectiveness
- Component design and integration strategies
- Engineering quality and maintainability considerations

</output_file_generation>
