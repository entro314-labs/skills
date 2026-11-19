---
name: analysis-api-mapper
description: "Analyzes API architecture in a codebase: style, endpoints, request and response patterns, data contracts, authentication, caching, rate limiting and integrations. Use when asked to map or document the API surface. Writes project-info/api-analysis.md."
disable-model-invocation: true
---

# API Analysis Command

<task>
You are an API architect and integration specialist. Analyze the codebase to understand API design patterns, endpoint structure, data contracts, authentication mechanisms, and integration strategies.
</task>

<context>
This command provides comprehensive analysis of API architecture, endpoint design, request/response patterns, authentication flows, error handling, and integration capabilities. It's designed for API developers, integration engineers, and backend architects.

Target: $ARGUMENTS (if specified, focus on specific API areas or endpoints) </context>

<analysis_methodology>

## Phase 1: API Architecture Discovery

### API Design Patterns

- **API Style**: RESTful, GraphQL, RPC, or hybrid approaches
- **Endpoint Organization**: How URLs are structured and grouped
- **Resource Modeling**: How business entities are exposed as API resources
- **Version Strategy**: How API versioning is handled

### Integration Architecture

- **Internal APIs**: APIs for frontend-backend communication
- **External APIs**: Third-party service integrations
- **Webhook Systems**: Event-driven integration patterns
- **Real-time APIs**: WebSocket, SSE, or polling patterns

## Phase 2: Endpoint Analysis

### Request/Response Patterns

- **HTTP Methods**: How different HTTP verbs are used
- **Content Types**: JSON, form data, multipart handling
- **Parameter Handling**: Query params, path params, request bodies
- **Response Formats**: Standard response structures and data formats

### Data Contracts

- **Input Validation**: How incoming data is validated
- **Schema Definition**: Request and response schema patterns
- **Type Safety**: How types are enforced and validated
- **Documentation**: How API contracts are documented

## Phase 3: Security and Performance

### Authentication and Authorization

- **Auth Mechanisms**: How API access is controlled
- **Token Management**: JWT, session, or API key patterns
- **Permission Systems**: Role-based or attribute-based access
- **Security Headers**: CORS, CSP, and other security measures

### Performance and Optimization

- **Caching Strategies**: How API responses are cached
- **Rate Limiting**: How API abuse is prevented
- **Pagination**: How large datasets are handled
- **Optimization**: Query optimization and response efficiency

</analysis_methodology>

<code_reading_focus>

## API-Focused Code Reading

### 1. Endpoint Definition Analysis

```
- Examine route definitions and URL patterns
- Understand handler functions and middleware
- Analyze request/response processing
- Map API resource organization
```

### 2. Authentication and Security Analysis

```
- Find authentication middleware and flows
- Understand authorization checking mechanisms
- Analyze input validation and sanitization
- Map security header and CORS configuration
```

### 3. Integration Pattern Analysis

```
- Examine third-party API client code
- Understand webhook handling and event processing
- Analyze real-time communication patterns
- Map external service integration points
```

### 4. Error Handling and Monitoring

```
- Find error handling middleware and patterns
- Understand logging and monitoring integration
- Analyze rate limiting and abuse prevention
- Map API documentation and testing
```

</code_reading_focus>

<output_format>

## API Analysis Report

### API Architecture Overview

- **API Style**: [REST/GraphQL/RPC/Hybrid]
- **Framework**: [Express/Fastify/Next.js API/etc.]
- **Base URL Structure**: [How API URLs are organized]
- **Version Strategy**: [How API versioning is handled]

### Endpoint Inventory and Analysis

#### Authentication Endpoints

- **Login/Registration**: [User authentication API patterns]
- **Token Management**: [Token refresh, validation, revocation]
- **OAuth Integration**: [Third-party authentication flows]
- **Session Management**: [Session creation and management]

#### Core Business Logic Endpoints

##### [Endpoint Group 1] - [Business Domain]

- **Base Path**: `/api/[path]`
- **Endpoints**:
  - `GET /api/[path]` - [Purpose and functionality]
  - `POST /api/[path]` - [Purpose and functionality]
  - `PUT /api/[path]/{id}` - [Purpose and functionality]
  - `DELETE /api/[path]/{id}` - [Purpose and functionality]
- **Authentication Required**: [Yes/No and requirements]
- **Authorization Rules**: [Who can access and under what conditions]
- **Request Format**: [Expected request structure and validation]
- **Response Format**: [Standard response structure and data types]
- **Error Handling**: [Common error responses and codes]

##### [Endpoint Group 2] - [Business Domain]

[Same structure as above]

### Request/Response Patterns

#### Standard Request Structure

- **Headers**: [Standard headers required or used]
- **Authentication**: [How auth credentials are passed]
- **Content Types**: [Supported content types for requests]
- **Parameter Patterns**: [Query params, path params, body structure]

#### Standard Response Structure

- **Success Responses**: [Standard success response format]
- **Error Responses**: [Standard error response format]
- **Status Codes**: [HTTP status codes used and their meanings]
- **Headers**: [Standard response headers]

#### Data Validation

- **Input Validation**: [How request data is validated]
- **Schema Enforcement**: [Request/response schema validation]
- **Type Checking**: [How data types are enforced]
- **Sanitization**: [How input data is cleaned and sanitized]

### Authentication and Authorization

#### Authentication Mechanisms

- **Primary Auth**: [Main authentication method used]
- **Token Format**: [JWT/Session/API Key format and structure]
- **Token Lifecycle**: [How tokens are created, validated, expired]
- **Multi-Factor Auth**: [Additional security measures if any]

#### Authorization Patterns

- **Role-Based Access**: [How roles control API access]
- **Resource-Level Permissions**: [Fine-grained access control]
- **Scope-Based Access**: [How different scopes are handled]
- **Team/Organization Isolation**: [Multi-tenant access patterns]

#### Security Implementation

- **HTTPS Enforcement**: [How secure transport is enforced]
- **CORS Configuration**: [Cross-origin resource sharing setup]
- **Rate Limiting**: [API abuse prevention mechanisms]
- **Input Sanitization**: [XSS and injection prevention]

### Third-Party Integrations

#### External API Integrations

- **[Service Name 1]**:
  - **Purpose**: [What this integration accomplishes]
  - **API Pattern**: [How the external API is called]
  - **Authentication**: [How auth is handled with external service]
  - **Error Handling**: [How external API errors are managed]
  - **Rate Limiting**: [How external API limits are respected]
  - **Caching**: [How external API responses are cached]

- **[Service Name 2]**: [Same structure as above]

#### Webhook Systems

- **Incoming Webhooks**: [Webhooks the API receives]
- **Outgoing Webhooks**: [Webhooks the API sends]
- **Event Processing**: [How webhook events are processed]
- **Retry Logic**: [How failed webhook deliveries are handled]

### Real-Time Communication

#### WebSocket Implementation

- **Connection Management**: [How WebSocket connections are established]
- **Event Types**: [Different types of real-time events]
- **Authentication**: [How WebSocket connections are authenticated]
- **Error Handling**: [How connection errors are managed]

#### Server-Sent Events

- **Event Streams**: [What events are streamed to clients]
- **Connection Lifecycle**: [How SSE connections are managed]
- **Fallback Mechanisms**: [Polling or other fallbacks for real-time data]

### Error Handling and Monitoring

#### Error Response Patterns

- **Error Format**: [Standard error response structure]
- **Error Codes**: [Custom error codes and their meanings]
- **Error Classification**: [How different error types are categorized]
- **Error Logging**: [How errors are logged for debugging]

#### Monitoring and Observability

- **Request Logging**: [What request information is logged]
- **Performance Monitoring**: [How API performance is tracked]
- **Health Checks**: [API health monitoring endpoints]
- **Metrics Collection**: [What metrics are collected and how]

### Performance Optimization

#### Caching Strategy

- **Response Caching**: [What API responses are cached]
- **Cache Headers**: [How HTTP caching headers are used]
- **Cache Invalidation**: [How cache is invalidated when data changes]
- **Cache Storage**: [Where cached data is stored]

#### Query Optimization

- **Database Queries**: [How API endpoints optimize database access]
- **N+1 Prevention**: [How N+1 query problems are avoided]
- **Eager Loading**: [How related data is efficiently loaded]
- **Pagination**: [How large datasets are paginated]

#### Rate Limiting and Throttling

- **Rate Limit Strategy**: [How API usage is limited]
- **Limit Headers**: [How rate limits are communicated to clients]
- **Throttling Behavior**: [What happens when limits are exceeded]
- **Bypass Mechanisms**: [How rate limits are bypassed for internal use]

### API Documentation and Testing

#### Documentation Strategy

- **API Documentation**: [How API endpoints are documented]
- **Schema Documentation**: [How request/response schemas are documented]
- **Example Requests**: [How API usage examples are provided]
- **Integration Guides**: [How developers learn to use the API]

#### Testing Patterns

- **Unit Testing**: [How individual endpoints are tested]
- **Integration Testing**: [How API interactions are tested]
- **Contract Testing**: [How API contracts are validated]
- **Load Testing**: [How API performance under load is tested]

### Client Integration Patterns

#### Frontend Integration

- **API Client**: [How frontend code calls the API]
- **State Management**: [How API data is managed in frontend state]
- **Error Handling**: [How frontend handles API errors]
- **Loading States**: [How loading and pending states are managed]

#### Mobile Integration

- **Mobile API Patterns**: [API patterns specific to mobile clients]
- **Offline Support**: [How API supports offline usage]
- **Sync Mechanisms**: [How data synchronization works]
- **Push Notifications**: [How push notifications are integrated]

### API Evolution and Versioning

#### Version Strategy

- **Versioning Approach**: [URL versioning, header versioning, etc.]
- **Backward Compatibility**: [How backward compatibility is maintained]
- **Deprecation Process**: [How old API versions are deprecated]
- **Migration Support**: [How clients are helped to migrate]

#### API Lifecycle Management

- **Feature Development**: [How new API features are developed]
- **Breaking Changes**: [How breaking changes are handled]
- **Documentation Updates**: [How API documentation is kept current]
- **Client Communication**: [How API changes are communicated]

### Integration Capabilities

#### External System Integration

- **Integration Patterns**: [How external systems integrate with this API]
- **API Keys**: [How external access is managed]
- **Webhook Delivery**: [How events are delivered to external systems]
- **Data Export**: [How data can be exported via API]

#### Developer Experience

- **API Discoverability**: [How developers find and understand the API]
- **SDK Support**: [Official or community SDKs available]
- **Testing Tools**: [Tools provided for API testing]
- **Support Channels**: [How developers get help with API integration]

### Security Considerations

#### Input Security

- **Injection Prevention**: [How SQL injection and other attacks are prevented]
- **XSS Protection**: [How cross-site scripting is prevented]
- **CSRF Protection**: [How cross-site request forgery is prevented]
- **File Upload Security**: [How file uploads are secured]

#### Output Security

- **Data Sanitization**: [How output data is sanitized]
- **Information Disclosure**: [How sensitive information leakage is prevented]
- **Error Information**: [How error messages avoid information disclosure]
- **Response Headers**: [Security headers in API responses]

### Performance Characteristics

#### Current Performance

- **Response Times**: [Typical API response times]
- **Throughput**: [Requests per second handling capability]
- **Concurrent Users**: [How many concurrent users are supported]
- **Resource Usage**: [CPU, memory, database usage patterns]

#### Scalability Design

- **Horizontal Scaling**: [How the API scales across multiple servers]
- **Database Scaling**: [How database access scales with API usage]
- **Caching Scalability**: [How caching supports increased load]
- **Bottleneck Identification**: [Known performance bottlenecks]

</output_format>

<verification_requirements>

## API Analysis Validation

- **Endpoint Accuracy**: All described endpoints must exist in actual route definitions
- **Authentication Reality**: All auth mechanisms must be implemented in actual middleware
- **Response Format Truth**: All response formats must match actual API responses
- **Integration Evidence**: All described integrations must be found in actual code
- **Security Implementation**: All security measures must be verifiable in code

## API Design Quality Checks

- **RESTful Design**: Does the API follow REST principles appropriately?
- **Security Completeness**: Are appropriate security measures in place?
- **Error Handling Quality**: Is error handling comprehensive and helpful?
- **Documentation Accuracy**: Does the API behavior match documentation?

</verification_requirements>

<usage_examples>

## Full API Analysis

```
/api:analysis
```

## Specific API Domain Focus

```
/api:analysis "authentication and user management APIs"
/api:analysis "AI-powered recommendation endpoints"
/api:analysis "real-time collaboration APIs"
```

## Integration Focus

```
/api:analysis "third-party service integrations"
/api:analysis "webhook and event systems"
```

## Security Focus

```
/api:analysis "authentication and authorization patterns"
/api:analysis "input validation and security measures"
```

</usage_examples>

<output_file_generation>

## Generated Documentation File

This command will create: a "project-info" folder in working directory if it doesn't already exist and then inside it will create: `api-analysis.md`

### File Structure

- Executive summary of API architecture approach
- Complete endpoint inventory with request/response patterns
- Authentication and authorization implementation
- Third-party integration patterns and webhook systems
- Performance optimization and caching strategies
- Security measures and error handling patterns

### Focus Areas

- How APIs are designed and structured
- Authentication and authorization implementation
- Request/response patterns and data contracts
- Integration capabilities and patterns
- Performance optimization and security measures
- Developer experience and API evolution strategy

</output_file_generation>
