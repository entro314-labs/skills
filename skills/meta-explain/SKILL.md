---
name: meta-explain
description: "Explains code, architecture, or technical concepts with overview, code breakdown, patterns, gotchas, and testing and performance notes, and gives implementation guidance for new approaches, at selectable depth. Use when asked to explain code, how something works, or how to implement an approach."
---

# Code & Concept Explanation

## Purpose

Provide comprehensive explanations of existing code, architecture, or technical concepts, plus
detailed implementation guidance for new approaches. This unified command handles both understanding
existing systems and planning new implementations with deep context, examples, and actionable
guidance.

## Claude Code Integration

### Slash Command Usage

```
/meta-explain <target> [--elaborate] [--depth]
```

**Target Types:**

- **Code Elements**: Function names, class names, specific algorithms
- **File References**: `@filename:line` or `@filename:start-end`
- **Concepts**: Architecture patterns, design principles, technical approaches
- **Implementation Plans**: Use `--elaborate` for new feature planning

**Options:**

- `--elaborate` - Switch to implementation planning mode with roadmap
- `--quick` - Concise explanation focusing on key points
- `--deep` - Comprehensive analysis with alternatives and trade-offs
- `--visual` - Include ASCII diagrams and flowcharts where helpful

### Automatic Context Discovery

The command intelligently gathers context:

**Code Analysis**: `rg "$TARGET" -B 5 -A 5 --type-add 'source:*.{js,ts,py,rs,go,java,cpp,h}'`

**Usage Patterns**: `rg "$TARGET\\(" -A 2 -B 2`

**Test Coverage**: `fd "test.*$TARGET" --type f`

**Dependencies**: `rg "import.*$TARGET|require.*$TARGET|use.*$TARGET"`

## Usage Examples

### Explaining Existing Code

```
/meta-explain calculateTotal function
```

**Analysis Process:**

1. **Context Discovery**: Locates function definition and all usage sites
2. **Dependency Mapping**: Identifies imports, parameters, and return types
3. **Pattern Recognition**: Detects design patterns and conventions used
4. **Usage Analysis**: Shows how the function is called throughout codebase
5. **Comprehensive Explanation**: Provides detailed breakdown with examples

**Expected Output:**

````markdown
# Function Explanation: calculateTotal

## Overview

- **Purpose**: Calculates order total with taxes, discounts, and shipping
- **Location**: `src/utils/pricing.js:45-67`
- **Used by**: 8 components across checkout and cart modules
- **Pattern**: Pure function following functional programming principles

## Code Breakdown

```javascript
function calculateTotal(items, options = {}) {
  // [1] Function signature
  const subtotal = items.reduce((sum, item) => {
    // [2] Subtotal calculation
    return sum + item.price * item.quantity;
  }, 0);

  const discount = options.coupon // [3] Conditional discount
    ? applyDiscount(subtotal, options.coupon)
    : 0;

  const tax = (subtotal - discount) * options.taxRate || 0; // [4] Tax calculation
  const shipping = calculateShipping(items, options.location); // [5] Shipping costs

  return {
    // [6] Return structured result
    subtotal,
    discount,
    tax,
    shipping,
    total: subtotal - discount + tax + shipping,
  };
}
```
````

**Line-by-line Analysis:**

1. **Function signature**: Accepts items array and optional configuration object
2. **Subtotal calculation**: Uses reduce to sum price × quantity for all items
3. **Conditional discount**: Applies coupon discount only if coupon provided
4. **Tax calculation**: Applies tax rate to discounted subtotal (with fallback to 0)
5. **Shipping costs**: Delegates to separate shipping calculation function
6. **Structured return**: Returns object with breakdown for transparency

## Design Patterns

### Pure Function Pattern

- No side effects or external state modification
- Deterministic output for same inputs
- Easy to test and reason about

### Options Object Pattern

- Flexible parameter passing
- Backward compatibility with new options
- Clear default behavior

## Usage Examples

```javascript
// Basic usage
const result = calculateTotal(cartItems, {
  taxRate: 0.08,
  location: 'CA',
});

// With coupon
const discounted = calculateTotal(items, {
  taxRate: 0.08,
  coupon: 'SAVE20',
  location: 'NY',
});

// Destructured result
const { total, subtotal, tax } = calculateTotal(items, options);
```

## Integration Points

### Dependencies

- `applyDiscount(subtotal, coupon)` - Coupon processing logic
- `calculateShipping(items, location)` - Shipping cost calculation
- Expects items with `price` and `quantity` properties

### Callers (8 locations found)

- `CheckoutSummary.jsx:34` - Display order summary
- `CartTotal.jsx:21` - Real-time cart total
- `OrderProcessor.js:89` - Pre-payment validation
- `PriceEstimator.js:45` - Quote generation

## Common Gotchas

⚠️ **Tax calculation timing**: Tax applies to discounted amount, not original subtotal ⚠️ **Shipping
dependency**: Requires valid location for accurate shipping costs ⚠️ **Coupon validation**:
`applyDiscount` should validate coupon before applying ⚠️ **Number precision**: Consider using
decimal.js for currency calculations

## Testing Strategy

```javascript
// Unit test examples
describe('calculateTotal', () => {
  it('calculates basic total without options', () => {
    const items = [{ price: 10, quantity: 2 }];
    expect(calculateTotal(items).total).toBe(20);
  });

  it('applies tax correctly after discount', () => {
    const items = [{ price: 100, quantity: 1 }];
    const options = { taxRate: 0.1, coupon: 'SAVE10' }; // 10% off
    const result = calculateTotal(items, options);
    expect(result.tax).toBe(9); // Tax on \$90, not \$100
  });
});
```

## Performance Considerations

- O(n) complexity for subtotal calculation
- Consider memoization for expensive shipping calculations
- Validate input early to avoid unnecessary processing

```

### Explaining Architecture Concepts
```

/meta-explain event-driven architecture

```

**Concept Analysis:**
1. **Pattern Definition**: Explains core principles and benefits
2. **Real-World Analogies**: Compares to familiar systems (postal service, restaurant orders)
3. **Component Breakdown**: Publishers, subscribers, event buses, message queues
4. **Trade-offs Analysis**: Benefits vs complexities, when to use vs avoid
5. **Implementation Examples**: Code snippets showing typical patterns

### Implementation Planning Mode
```

/meta-explain --elaborate microservices architecture with event sourcing

````

**Elaboration Process:**
1. **Approach Overview**: High-level concept and why it works
2. **Technical Architecture**: Component breakdown and data flow
3. **Implementation Roadmap**: Phased approach with timelines
4. **Code Examples**: Concrete implementation patterns
5. **Integration Strategy**: APIs, dependencies, deployment considerations
6. **Risk Analysis**: Technical and operational risks with mitigation

**Expected Output:**
```markdown
# Implementation Guide: Microservices with Event Sourcing

## Approach Overview

**Summary**: Decompose monolithic application into independent services communicating via events, with event sourcing providing audit trail and eventual consistency.

**Core Concept**: Each service owns its data and publishes domain events, while event sourcing captures all state changes as immutable events for reproducible state reconstruction.

**Key Principles**:
- Service autonomy and bounded contexts
- Event-driven communication over direct calls
- Immutable event log as source of truth
- Eventual consistency over immediate consistency
- Fault tolerance through redundancy and isolation

## Technical Architecture

### Component Breakdown

````

┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │ Service │ │ Service │ │ Service │ │ A │ │ B │ │ C
│ │ │ │ │ │ │ │ ┌─────────┐ │ │ ┌─────────┐ │ │ ┌─────────┐ │ │ │Event │ │ │ │Event │ │ │ │Event │ │
│ │Store │ │ │ │Store │ │ │ │Store │ │ │ └─────────┘ │ │ └─────────┘ │ │ └─────────┘ │
└─────┬───────┘ └─────┬───────┘ └─────┬───────┘ │ │ │ └──────────────────┼──────────────────┘ ▼
┌─────────────────┐ │ Event Bus │ │ (Apache Kafka) │ └─────────────────┘

````

- **Microservices**: Independent, deployable units with single responsibility
- **Event Stores**: Service-specific event logs (PostgreSQL + event sourcing library)
- **Event Bus**: Message broker for inter-service communication (Apache Kafka)
- **API Gateway**: External interface and request routing
- **Service Discovery**: Dynamic service location (Consul/etcd)

### Technology Stack

**Core Technologies**:
- Services: Node.js/TypeScript with Express or Go with Gin
- Event Store: PostgreSQL with custom event sourcing library
- Message Bus: Apache Kafka with schema registry
- API Gateway: Kong or AWS API Gateway

**Supporting Tools**:
- Build: Docker containers with multi-stage builds
- Testing: Jest for unit tests, TestContainers for integration
- Monitoring: Prometheus + Grafana, distributed tracing with Jaeger
- Infrastructure: Kubernetes for orchestration, Helm for deployment

## Implementation Roadmap

### Phase 1: Foundation (Weeks 1-3)

- [ ] **Event Store Implementation**
  - Design event schema and versioning strategy
  - Implement event store with optimistic concurrency control
  - Create event replay and projection mechanisms

- [ ] **Message Infrastructure**
  - Set up Kafka cluster with proper partitioning
  - Implement schema registry for event validation
  - Create dead letter queue handling

- [ ] **First Service Extraction**
  - Choose bounded context with clear boundaries
  - Implement event sourcing pattern
  - Create integration tests

### Phase 2: Service Decomposition (Weeks 4-8)

- [ ] **Additional Services**
  - Extract 2-3 more services following established patterns
  - Implement cross-service sagas for distributed transactions
  - Add service-to-service authentication

- [ ] **Event Choreography**
  - Design event schemas for inter-service communication
  - Implement event handlers with idempotency
  - Add circuit breakers for resilience

### Phase 3: Production Hardening (Weeks 9-12)

- [ ] **Observability**
  - Distributed tracing across all services
  - Centralized logging with correlation IDs
  - Business metrics and alerting

- [ ] **Operational Excellence**
  - Blue-green deployment pipeline
  - Chaos engineering testing
  - Disaster recovery procedures

## Code Examples

### Event Sourcing Pattern
```typescript
// Event store implementation
interface DomainEvent {
  id: string;
  aggregateId: string;
  type: string;
  version: number;
  timestamp: Date;
  data: Record<string, any>;
}

class EventStore {
  async appendEvents(
    aggregateId: string,
    events: DomainEvent[],
    expectedVersion: number
  ): Promise<void> {
    // Optimistic concurrency control
    const currentVersion = await this.getVersion(aggregateId);
    if (currentVersion !== expectedVersion) {
      throw new ConcurrencyError('Version conflict');
    }

    // Atomic append to event stream
    await this.db.transaction(async (tx) => {
      for (const event of events) {
        await tx.query(
          'INSERT INTO events (id, aggregate_id, type, version, data) VALUES (\$1, \$2, \$3, \$4, \$5)',
          [event.id, aggregateId, event.type, event.version, event.data]
        );
      }
    });

    // Publish events to message bus
    await this.eventBus.publish(events);
  }

  async getEvents(aggregateId: string): Promise<DomainEvent[]> {
    const result = await this.db.query(
      'SELECT * FROM events WHERE aggregate_id = \$1 ORDER BY version',
      [aggregateId]
    );
    return result.rows.map(row => this.deserializeEvent(row));
  }
}
````

### Service Event Handler

```typescript
// Event handler with idempotency
class OrderEventHandler {
  async handleUserRegistered(event: UserRegisteredEvent): Promise<void> {
    // Idempotency check
    const processed = await this.isEventProcessed(event.id);
    if (processed) return;

    try {
      // Business logic
      await this.createWelcomeOrder(event.data.userId);

      // Mark as processed
      await this.markEventProcessed(event.id);

      // Emit follow-up events
      await this.eventStore.appendEvents(event.data.userId, [
        new WelcomeOrderCreatedEvent({ userId: event.data.userId }),
      ]);
    } catch (error) {
      // Handle failures with retry logic
      await this.scheduleRetry(event, error);
    }
  }
}
```

## Integration Points

### APIs and Contracts

- **Event Schemas**: JSON Schema validation with versioning
- **REST APIs**: Service-specific endpoints for queries
- **GraphQL Federation**: Unified query interface across services
- **gRPC**: High-performance service-to-service communication

### Service Dependencies

- **Event Store**: PostgreSQL 12+ with JSONB support
- **Message Broker**: Apache Kafka 2.8+ with Schema Registry
- **Service Mesh**: Istio for traffic management and security
- **Configuration**: Vault for secrets, Consul for service config

## Risk Analysis

### Technical Risks

**Eventual Consistency Challenges**

- _Risk_: Users see inconsistent state across services
- _Mitigation_: Design UX for eventual consistency, provide status updates
- _Contingency_: Implement compensating actions for critical flows

**Event Schema Evolution**

- _Risk_: Breaking changes break downstream services
- _Mitigation_: Semantic versioning, backward compatibility requirements
- _Contingency_: Event transformation layers for legacy consumers

**Distributed Transaction Complexity**

- _Risk_: Saga failures leave system in inconsistent state
- _Mitigation_: Comprehensive testing, idempotent operations
- _Contingency_: Manual intervention procedures for complex failures

### Operational Risks

**Increased Deployment Complexity**

- _Risk_: Coordinating deployments across multiple services
- _Mitigation_: Independent deployability, feature flags
- _Contingency_: Rollback procedures for each service

**Monitoring and Debugging Difficulty**

- _Risk_: Distributed traces hard to follow, root cause analysis complex
- _Mitigation_: Comprehensive observability stack, correlation IDs
- _Contingency_: Centralized logging with advanced search capabilities

## Alternative Variations

### Variation 1: CQRS + Event Sourcing

- **When to use**: Complex read requirements, high query performance needs
- **Trade-offs**: Additional complexity for read model management
- **Migration**: Add read models incrementally to existing event streams

### Variation 2: Event Streaming without Event Sourcing

- **When to use**: Simpler requirements, traditional database preferred
- **Trade-offs**: Less audit capability, harder to rebuild state
- **Migration**: Use Change Data Capture to generate events from database

### Variation 3: Choreography vs Orchestration

- **When to use**: Orchestration for complex workflows, choreography for loose coupling
- **Trade-offs**: Orchestration easier to debug, choreography more resilient
- **Migration**: Start with choreography, add orchestration for complex flows

## Related Commands

- `/meta-research` - Research specific technologies (Kafka, event sourcing libraries)
- `/evaluate` - Compare event sourcing vs traditional architecture
- `/workflow-plan` - Create detailed implementation plan with tasks
- `/development-migrate` - Plan migration from monolith to microservices

```

## Advanced Explanation Features

### Context-Aware Analysis

The command uses Claude Code's file reference system:
```

/meta-explain @src/auth/middleware.ts:45-67

````

**Automatic Context Gathering:**
- Reads referenced file and surrounding code
- Identifies imports and dependencies
- Locates related test files
- Finds usage patterns across codebase

### Visual Documentation

For complex systems, includes ASCII diagrams:
```markdown
## Data Flow Diagram

````

Request ──▶ Middleware ──▶ Controller ──▶ Service ──▶ Repository │ │ │ │ │ ▼ ▼ ▼ ▼ ▼ Auth
Validation Business Database Database Check Rules Logic Query Response

```

```

### Progressive Disclosure

Adapts explanation depth based on context:

- **Quick mode**: Key points and usage examples
- **Standard mode**: Complete breakdown with patterns and gotchas
- **Deep mode**: Implementation details, alternatives, and migration paths

## Integration with Claude Code Features

### Memory System Integration

Automatically updates project knowledge:

```markdown
# Added to CLAUDE.md

## Architecture Patterns

- Event-driven architecture implemented in user service
- Event sourcing pattern used for audit requirements
- CQRS planned for reporting module

## Code Conventions

- Pure functions preferred for business logic
- Options object pattern for flexible parameters
- Structured error handling with custom error types
```

### File Reference Integration

Seamlessly works with Claude Code's file system:

- `@filename` references automatically include context
- Line number ranges for specific code sections
- Automatic discovery of related files (tests, configs)

### Hook Integration

**Pre-explanation hooks:**

- Validate file references exist
- Check if concept requires research
- Gather related documentation

**Post-explanation hooks:**

- Update project documentation
- Generate follow-up research tasks
- Create implementation todos

## Best Practices

### When to Use Each Mode

- **Standard explanation**: Understanding existing code during development
- **Elaborate mode**: Planning new features or architectural changes
- **Quick mode**: Code reviews or quick clarifications
- **Deep mode**: Onboarding, complex debugging, or architecture decisions

### Optimal Explanation Structure

1. **Start with purpose**: Why does this exist?
2. **Show the big picture**: How does it fit in the system?
3. **Break down the details**: How does it work internally?
4. **Provide examples**: How is it used in practice?
5. **Highlight gotchas**: What could go wrong?
6. **Suggest improvements**: How could it be better?

## Related Commands

- `/meta-research` - Deep research on technologies or patterns
- `/evaluate` - Compare different implementation approaches
- `/workflow-plan` - Create implementation plan from explanation
- `/meta-document` - Generate formal documentation from explanation

The goal is to bridge the gap between understanding existing systems and implementing new ones with
comprehensive, actionable explanations.
