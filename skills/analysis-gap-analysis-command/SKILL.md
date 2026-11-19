---
name: analysis-gap-analysis-command
description: "Compares generated analysis reports against the actual implementation to find gaps and misalignments across database, API, UI, types and security layers, and incomplete features. Use when asked for gap analysis. Requires prior analysis reports and writes system-gap-analysis.md."
disable-model-invocation: true
---

# Gap Analysis Command

<task>
You are a systems integration specialist and quality assurance architect. Analyze all generated reports and the codebase to identify gaps, misalignments, incomplete implementations, and inconsistencies across different system layers (database, API, UI, types, security, etc.).
</task>

<context>
This command performs comprehensive gap analysis by comparing what's documented in various reports against actual implementation, and identifying where different system layers are misaligned or incomplete. It finds the "missing links" that prevent features from working end-to-end.

Target: All analysis reports and codebase examination </context>

<analysis_methodology>

## Phase 1: Cross-Layer Consistency Analysis

### Database-API-UI Flow Validation

- **Database Schema ↔ API Endpoints**: Every table should have corresponding CRUD endpoints
- **API Endpoints ↔ UI Components**: Every endpoint should be consumed by UI or have clear
  integration path
- **Type Definitions ↔ Implementation**: TypeScript types should match actual data structures
- **Security Policies ↔ Enforcement**: Documented security should be implemented at all layers

### Feature Completeness Analysis

- **Product Features ↔ Technical Implementation**: Every described product feature should be fully
  implemented
- **User Workflows ↔ Technical Support**: Every user journey should have complete technical backing
- **AI Features ↔ Integration**: Every AI capability should be fully integrated across the stack
- **Business Logic ↔ Code Implementation**: Every business rule should be enforced in code

## Phase 2: Implementation Completeness Validation

### End-to-End Feature Analysis

- **Complete User Flows**: Validate that user actions can complete successfully
- **Data Flow Integrity**: Ensure data flows correctly from input to storage to display
- **Error Handling Coverage**: Verify error handling exists at every layer
- **Performance Implementation**: Check that performance optimizations are actually implemented

### Integration Point Analysis

- **Third-Party Service Integration**: Verify complete integration with external services
- **Real-Time Feature Implementation**: Validate WebSocket/real-time features work end-to-end
- **Authentication Flow Completeness**: Ensure auth works across all protected features
- **Permission Enforcement**: Verify authorization is enforced at every access point

## Phase 3: Quality and Consistency Analysis

### Code Quality Consistency

- **Pattern Adherence**: Check that design patterns are consistently applied
- **Naming Conventions**: Verify consistent naming across all layers
- **Error Handling Patterns**: Ensure consistent error handling approaches
- **Testing Coverage**: Identify missing or incomplete test coverage

### Documentation-Implementation Alignment

- **API Documentation ↔ Implementation**: Verify API docs match actual endpoints
- **Type Documentation ↔ Actual Types**: Ensure type definitions match documentation
- **Security Documentation ↔ Implementation**: Verify security measures are actually implemented
- **Performance Claims ↔ Actual Implementation**: Validate performance optimizations exist

</analysis_methodology>

<gap_identification_patterns>

## Critical Gap Patterns to Identify

### 1. Incomplete CRUD Operations

```
PATTERN: Database table exists but missing API endpoints
EXAMPLE:
- Table: user_preferences
- Missing: GET /api/user-preferences
- Missing: PUT /api/user-preferences
- Missing: UI components to manage preferences
```

### 2. Orphaned UI Components

```
PATTERN: UI component exists but no backend support
EXAMPLE:
- Component: EnergyTrendChart
- Missing: API endpoint to fetch trend data
- Missing: Database aggregation queries
- Missing: Type definitions for chart data
```

### 3. Security Policy Gaps

```
PATTERN: Security documented but not enforced
EXAMPLE:
- Documented: Team-level data isolation
- Missing: RLS policies on specific tables
- Missing: API authorization checks
- Missing: UI permission hiding
```

### 4. Type Definition Mismatches

```
PATTERN: Types don't match actual data structures
EXAMPLE:
- Type: EnergyLog has 'quality' field
- Database: energy_logs table missing quality column
- API: endpoint returns different field names
- UI: component expects different structure
```

### 5. Incomplete Feature Implementation

```
PATTERN: Feature partially implemented across layers
EXAMPLE:
- Product: "AI-powered rest recommendations"
- AI: Algorithm exists
- API: Endpoint missing
- UI: Component skeleton only
- Database: Missing recommendation storage
```

</gap_identification_patterns>

<analysis_focus>

## Gap Analysis Process

### 1. Report Cross-Reference Analysis

```
- Compare product features listed vs. technical implementation
- Cross-check API documentation vs. actual endpoint implementations
- Validate database schema vs. type definitions
- Verify security documentation vs. actual security measures
```

### 2. Layer-by-Layer Validation

```
- Database: Check for tables without corresponding business logic
- API: Check for endpoints without UI consumption
- UI: Check for components without backend support
- Types: Check for type definitions without implementations
```

### 3. Feature Flow Tracing

```
- Trace complete user workflows from UI to database
- Identify broken or incomplete data flows
- Find features that work in isolation but not end-to-end
- Validate error handling across the entire stack
```

### 4. Integration Point Validation

```
- Verify all third-party integrations are complete
- Check real-time features work bidirectionally
- Validate authentication flows cover all scenarios
- Ensure authorization is enforced everywhere needed
```

</analysis_focus>

<output_format>

## Gap Analysis Report

### Executive Summary

- **Overall Integration Health**: [Score 1-10 with rationale]
- **Critical Gaps**: [Number of gaps that break core functionality]
- **Alignment Issues**: [Number of mismatches between layers]
- **Incomplete Features**: [Number of partially implemented features]
- **Priority Recommendation**: [Most critical gaps to address first]

### Critical Implementation Gaps

#### High-Priority Gaps (Break Core Functionality)

1. **[Gap Category]**: [Specific gap description]
   - **Impact**: [How this affects users and system functionality]
   - **Missing Pieces**: [Specific implementations that are missing]
   - **Evidence**: [Where this gap was discovered]
   - **Dependencies**: [What else depends on fixing this]
   - **Effort Estimate**: [Complexity to fix]

#### Medium-Priority Gaps (Limit Functionality)

[Same structure for secondary gaps]

#### Low-Priority Gaps (Polish and Optimization)

[Same structure for minor gaps]

### Layer Misalignment Analysis

#### Database ↔ API Misalignments

- **Missing API Endpoints**:
  - Table: `[table_name]` → Missing: `[expected_endpoint]`
  - Purpose: [What this endpoint should do]
  - Current State: [What exists vs. what's needed]

- **Extra API Endpoints**:
  - Endpoint: `[endpoint_path]` → No corresponding database operations
  - Purpose: [What this endpoint claims to do]
  - Issue: [Why it's not properly backed]

- **Parameter Mismatches**:
  - Endpoint expects: `[parameter_structure]`
  - Database provides: `[actual_structure]`
  - Fix needed: [What needs to align]

#### API ↔ UI Misalignments

- **Unused API Endpoints**:
  - Endpoint: `[endpoint_path]` → No UI consumption
  - Intended use: [What this should be used for]
  - Missing UI: [What components should use this]

- **Missing API Support**:
  - UI Component: `[component_name]` → No backend support
  - Component expects: `[expected_data_structure]`
  - Missing API: [What endpoints need to be created]

- **Data Structure Mismatches**:
  - UI expects: `[expected_format]`
  - API returns: `[actual_format]`
  - Impact: [How this breaks functionality]

#### Type ↔ Implementation Misalignments

- **Missing Type Definitions**:
  - Implementation exists: `[code_location]`
  - Type definition missing: [What types need to be created]
  - Current issue: [How lack of types causes problems]

- **Incorrect Type Definitions**:
  - Type defined as: `[type_definition]`
  - Implementation actually: `[actual_structure]`
  - Fix needed: [How to align types with reality]

### Feature Completeness Analysis

#### Incomplete Product Features

- **[Feature Name]**: [Completion percentage]
  - **Product Description**: [What the feature should do]
  - **Current Implementation**: [What's actually implemented]
  - **Missing Pieces**:
    - Database: [Missing tables, columns, indexes]
    - API: [Missing endpoints, validation, authorization]
    - UI: [Missing components, forms, displays]
    - Types: [Missing type definitions]
    - Logic: [Missing business rules, calculations]
  - **Integration Issues**: [How missing pieces affect other features]

#### Half-Implemented Workflows

- **[Workflow Name]**: [User journey that doesn't work end-to-end]
  - **Expected Flow**: [Step-by-step user journey]
  - **Current State**: [Where the flow breaks or is incomplete]
  - **Blocking Issues**: [Specific gaps preventing completion]
  - **Downstream Effects**: [How this affects other workflows]

### Security Implementation Gaps

#### Authentication Gaps

- **Missing Auth Protection**: [Endpoints/components without proper auth]
- **Inconsistent Auth**: [Where auth implementation varies]
- **Auth Flow Breaks**: [Where authentication flow is incomplete]

#### Authorization Gaps

- **Missing Permission Checks**: [Where role-based access isn't enforced]
- **Inconsistent Permissions**: [Where permission logic varies]
- **Privilege Escalation Risks**: [Where authorization can be bypassed]

#### Data Protection Gaps

- **Unprotected Sensitive Data**: [Where sensitive data lacks protection]
- **Missing Input Validation**: [Where input isn't properly validated]
- **Encryption Gaps**: [Where encryption should be but isn't implemented]

### Performance Implementation Gaps

#### Missing Optimizations

- **Uncached Operations**: [Expensive operations without caching]
- **Inefficient Queries**: [Database queries that could be optimized]
- **Unoptimized Assets**: [Frontend assets that could be optimized]

#### Incomplete Performance Features

- **Partial Lazy Loading**: [Where lazy loading is started but not completed]
- **Missing Pagination**: [Large datasets without proper pagination]
- **Incomplete Monitoring**: [Performance monitoring gaps]

### Integration and Third-Party Gaps

#### External Service Integration Issues

- **[Service Name]**: [Integration completeness status]
  - **Working Parts**: [What's properly integrated]
  - **Missing Parts**: [What integration is missing]
  - **Error Handling**: [Whether error cases are handled]
  - **Fallback Mechanisms**: [Whether fallbacks exist]

#### Real-Time Feature Gaps

- **WebSocket Implementation**: [Completeness of real-time features]
- **Event Handling**: [Missing event handlers or listeners]
- **State Synchronization**: [Where real-time state gets out of sync]

### Testing and Quality Gaps

#### Missing Test Coverage

- **Untested Components**: [UI components without tests]
- **Untested API Endpoints**: [Backend endpoints without tests]
- **Untested Integration Points**: [Integration flows without tests]
- **Missing Edge Case Tests**: [Error conditions and edge cases]

#### Quality Assurance Gaps

- **Missing Error Handling**: [Where error cases aren't handled]
- **Inconsistent Validation**: [Where validation is missing or different]
- **Missing Accessibility**: [Accessibility features not implemented]

### Technical Debt Contributing to Gaps

#### Architecture Debt

- **Inconsistent Patterns**: [Where design patterns aren't consistently applied]
- **Tight Coupling**: [Where components are too tightly coupled]
- **Missing Abstractions**: [Where abstractions would improve consistency]

#### Code Quality Debt

- **Copy-Paste Code**: [Where code is duplicated instead of shared]
- **Hardcoded Values**: [Where configuration should be parameterized]
- **Missing Documentation**: [Where code behavior isn't documented]

### Prioritized Fix Roadmap

#### Immediate Fixes (Blocking Core Functionality)

1. **[Fix Description]**:
   - **Priority**: Critical
   - **Effort**: [Time estimate]
   - **Impact**: [How this unblocks functionality]
   - **Dependencies**: [What else this enables]

#### Short-Term Fixes (Complete Partial Features)

1. **[Fix Description]**:
   - **Priority**: High
   - **Effort**: [Time estimate]
   - **Impact**: [How this improves user experience]
   - **Risk**: [What breaks if this isn't fixed]

#### Medium-Term Alignment (Consistency and Quality)

1. **[Fix Description]**:
   - **Priority**: Medium
   - **Effort**: [Time estimate]
   - **Impact**: [How this improves maintainability]
   - **Benefits**: [Long-term advantages]

### Systemic Issues Requiring Architectural Changes

#### Pattern Inconsistencies

- **Issue**: [Fundamental pattern inconsistency]
- **Root Cause**: [Why this inconsistency exists]
- **System-Wide Impact**: [How this affects the entire codebase]
- **Resolution Strategy**: [How to systematically fix this]

#### Missing Infrastructure

- **Need**: [Missing infrastructure component]
- **Impact**: [How lack of this infrastructure creates gaps]
- **Implementation**: [What needs to be built]
- **Timeline**: [How long this would take to implement]

### Risk Assessment

#### Functional Risks

- **User Experience Breaks**: [Where gaps cause poor user experience]
- **Data Integrity Risks**: [Where gaps could corrupt or lose data]
- **Security Vulnerabilities**: [Where gaps create security risks]

#### Development Risks

- **Development Velocity**: [How gaps slow down future development]
- **Code Quality Degradation**: [How gaps encourage bad practices]
- **Technical Debt Accumulation**: [How gaps create more technical debt]

#### Business Risks

- **Feature Delivery**: [How gaps affect ability to deliver features]
- **System Reliability**: [How gaps affect system stability]
- **Competitive Position**: [How gaps affect competitive advantage]

</output_format>

<verification_requirements>

## Gap Analysis Validation

- **Evidence-Based**: Every identified gap must be backed by specific code examination
- **Reproducible**: Gaps must be demonstrable in actual codebase
- **Impact Assessment**: Each gap must have clear impact on functionality
- **Fix Specificity**: Recommendations must be specific and actionable
- **Priority Accuracy**: Priority must reflect actual business and user impact

## Quality Assurance Checks

- **No False Positives**: Ensure identified gaps are actually problems
- **Complete Coverage**: Cover all major system integration points
- **Practical Solutions**: Ensure recommended fixes are technically feasible
- **Risk Appropriate**: Ensure risk assessments match actual consequences

</verification_requirements>

<usage_examples>

## Full Gap Analysis

```
/system:analyze:gaps
```

## Specific Layer Focus

```
/system:analyze:gaps "database and API layer misalignments"
/system:analyze:gaps "UI and backend integration issues"
/system:analyze:gaps "type safety and implementation consistency"
```

## Feature-Specific Analysis

```
/system:analyze:gaps "AI feature implementation completeness"
/system:analyze:gaps "authentication and authorization gaps"
/system:analyze:gaps "energy tracking feature end-to-end validation"
```

## Quality Focus

```
/system:analyze:gaps "security implementation gaps"
/system:analyze:gaps "performance optimization missing pieces"
/system:analyze:gaps "testing and quality assurance coverage"
```

</usage_examples>

<output_file_generation>

## Generated Documentation File

The command will create: `system-gap-analysis.md`

### File Structure

- Executive summary of integration health and critical gaps
- Layer-by-layer misalignment analysis with specific examples
- Feature completeness assessment with missing implementation pieces
- Security, performance, and quality gaps with risk assessment
- Prioritized roadmap for addressing gaps with effort estimates
- Systemic issues requiring architectural changes

### Focus Areas

- **Integration Breaks**: Where different layers don't work together
- **Incomplete Features**: Where features are partially implemented
- **Consistency Issues**: Where patterns and approaches vary
- **Missing Safety Nets**: Where error handling and validation are absent
- **Technical Debt**: Where shortcuts create ongoing maintenance issues

</output_file_generation>
