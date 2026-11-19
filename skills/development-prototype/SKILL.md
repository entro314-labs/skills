---
name: development-prototype
description: "Builds a rapid working proof-of-concept for an idea (APIs, real-time, data pipelines) with core features, tests, performance metrics, and a validation report, in chosen tech modes. Use when asked to prototype, spike, or build a PoC."
disable-model-invocation: true
---

# Rapid Prototyping Assistant

## Purpose

Quickly create working proof-of-concept implementations to validate ideas, test hypotheses, and
demonstrate functionality. Focuses on rapid iteration, core feature validation, and measurable
outcomes with minimal time investment.

## Claude Code Integration

### Slash Command Usage

```
/development-prototype <concept> [--tech] [--mode]
```

**Concept Types:**

- **API Systems**: REST APIs, GraphQL endpoints, microservices
- **Real-time Features**: WebSockets, SSE, live updates
- **Data Processing**: Pipelines, transformations, ETL processes
- **UI Components**: Interactive features, visualization, forms
- **Integration Points**: Third-party APIs, databases, message queues
- **Algorithms**: Performance testing, optimization validation

**Technology Options:**

- `--tech=deno` - Deno/TypeScript for web APIs and tooling
- `--tech=rust` - Rust for performance-critical or system prototypes
- `--tech=go` - Go for concurrent systems and microservices
- `--tech=node` - Node.js for familiar JavaScript ecosystem
- `--tech=python` - Python for data processing and ML integration

**Prototyping Modes:**

- `--quick` - 30-60 minute time-boxed prototype
- `--functional` - 2-4 hour working prototype with key features
- `--comprehensive` - Full-day prototype with metrics and docs
- `--benchmark` - Performance-focused prototype with measurements

### Automatic Environment Setup

The command intelligently sets up prototype environment:

**Project Detection**:
!`find . -name "package.json" -o -name "deno.json" -o -name "go.mod" -o -name "Cargo.toml" | head -3 || true`

**Available Runtimes**:
!`deno --version; node --version; go version; rustc --version 2>/dev/null | head -4 || true`

**Workspace Setup**:
!`mkdir -p prototypes/$(date +%Y%m%d)_prototype && echo "Prototype workspace ready" || true`

## Usage Examples

### API Gateway Prototype

```
/development-prototype API gateway with rate limiting --tech=deno
```

**Prototyping Process:**

1. **Rapid Setup**: Creates isolated environment with minimal dependencies
2. **Core Implementation**: Builds essential gateway features (routing, rate limiting)
3. **Quick Testing**: Implements basic test scenarios and load testing
4. **Metrics Collection**: Measures throughput, latency, and resource usage
5. **Documentation**: Records key findings, limitations, and next steps

**Expected Output:**

````markdown
# Prototype: API Gateway with Rate Limiting

## Status: ✅ Working Prototype

- **Build Time**: 90 minutes
- **Tech Stack**: Deno + Oak framework
- **Dependencies**: 3 external packages

## Core Features Implemented

### ✅ What Works

- **Request Routing**: Path-based routing to multiple backends
- **Rate Limiting**: Token bucket algorithm with Redis storage
- **Health Checks**: Endpoint monitoring and circuit breaker
- **Logging**: Structured request/response logging
- **Metrics**: Prometheus-compatible metrics endpoint

### ⚠️ Current Limitations

- **Authentication**: Mock JWT validation only
- **Persistence**: In-memory rate limit storage
- **Error Handling**: Basic error responses
- **Configuration**: Hard-coded settings
- **Security**: No input validation or sanitization

## Performance Metrics

### Load Testing Results

```bash
# Test setup: 1000 concurrent requests
Requests/sec:     2,847 ± 156
Avg Response:     23ms
P95 Response:     45ms
P99 Response:     78ms
Memory Usage:     45MB
CPU Usage:        15% (single core)
```
````

### Rate Limiting Validation

- **Bucket Size**: 100 requests/minute
- **Overflow Handling**: 429 status with retry-after header
- **Reset Behavior**: Clean bucket reset every 60 seconds
- **Accuracy**: ±2% rate limit enforcement

## Architecture

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Client    │───▶│  Gateway    │───▶│  Backend    │
└─────────────┘    └─────────────┘    └─────────────┘
                          │
                          ▼
                   ┌─────────────┐
                   │   Redis     │
                   │ (Rate Limit)│
                   └─────────────┘
```

## Key Code Implementation

### Rate Limiting Middleware

```typescript
// rate-limiter.ts
import { RedisClient } from './deps.ts';

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  keyGenerator: (request: Request) => string;
}

export class TokenBucketRateLimiter {
  constructor(
    private config: RateLimitConfig,
    private redis: RedisClient
  ) {}

  async isAllowed(request: Request): Promise<{
    allowed: boolean;
    remaining: number;
    resetTime: number;
  }> {
    const key = this.config.keyGenerator(request);
    const now = Date.now();
    const windowStart = Math.floor(now / this.config.windowMs) * this.config.windowMs;
    const windowKey = `rate_limit:${key}:${windowStart}`;

    // Atomic increment with expiry
    const pipeline = this.redis.pipeline();
    pipeline.incr(windowKey);
    pipeline.expire(windowKey, Math.ceil(this.config.windowMs / 1000));
    const results = await pipeline.exec();

    const currentCount = results[0] as number;
    const allowed = currentCount <= this.config.maxRequests;

    return {
      allowed,
      remaining: Math.max(0, this.config.maxRequests - currentCount),
      resetTime: windowStart + this.config.windowMs,
    };
  }
}
```

### Gateway Router

```typescript
// gateway.ts
import { Application, Router } from '@oak/oak';
import { TokenBucketRateLimiter } from './rate-limiter.ts';

const app = new Application();
const router = new Router();

// Rate limiting middleware
app.use(async (ctx, next) => {
  const rateLimitResult = await rateLimiter.isAllowed(ctx.request);

  if (!rateLimitResult.allowed) {
    ctx.response.status = 429;
    ctx.response.headers.set('Retry-After', '60');
    ctx.response.body = { error: 'Rate limit exceeded' };
    return;
  }

  // Add rate limit headers
  ctx.response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString());
  ctx.response.headers.set('X-RateLimit-Reset', rateLimitResult.resetTime.toString());

  await next();
});

// Proxy routes
router.all('/api/users/(.*)', async (ctx) => {
  const targetUrl = `http://user-service:3001${ctx.request.url.pathname}`;
  const response = await fetch(targetUrl, {
    method: ctx.request.method,
    headers: ctx.request.headers,
    body: ctx.request.hasBody ? ctx.request.body() : undefined,
  });

  ctx.response.status = response.status;
  ctx.response.body = await response.text();
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log('🚀 API Gateway running on http://localhost:8000');
await app.listen({ port: 8000 });
```

## Testing & Validation

### Manual Testing

```bash
# Basic functionality test
curl -X GET http://localhost:8000/api/users/123

# Rate limit test
for i in {1..105}; do
  curl -w "%{http_code}\n" http://localhost:8000/api/users/123
done

# Health check
curl http://localhost:8000/health
```

### Load Testing

```bash
# Install wrk for load testing
brew install wrk

# Run load test
wrk -t12 -c400 -d30s --script=test-script.lua http://localhost:8000/api/users/123
```

## Next Steps for Production

### Phase 1: Security & Reliability (1-2 weeks)

- [ ] **Authentication**: Implement proper JWT validation
- [ ] **Input Validation**: Add request sanitization and validation
- [ ] **Error Handling**: Comprehensive error responses and logging
- [ ] **Configuration**: Environment-based configuration management
- [ ] **Health Checks**: Detailed health checking for dependencies

### Phase 2: Scalability & Operations (2-3 weeks)

- [ ] **Persistent Storage**: Replace in-memory storage with Redis cluster
- [ ] **Monitoring**: Full observability with metrics, traces, and logs
- [ ] **Circuit Breaker**: Implement circuit breaker for backend failures
- [ ] **Load Balancing**: Multiple backend support with health-aware routing
- [ ] **Caching**: Response caching for improved performance

### Phase 3: Advanced Features (3-4 weeks)

- [ ] **API Versioning**: Support for multiple API versions
- [ ] **WebSocket Support**: Real-time connection proxying
- [ ] **Plugin System**: Extensible middleware architecture
- [ ] **Analytics**: Detailed API usage analytics and reporting
- [ ] **Documentation**: Auto-generated API documentation

## Key Learnings & Insights

### Technical Insights

- **Rate Limiting**: Token bucket with Redis provides good accuracy and performance
- **Deno Performance**: Handles 2.8k req/sec with minimal resource usage
- **Memory Efficiency**: 45MB footprint suitable for containerized deployment
- **Latency**: Sub-25ms average latency meets performance requirements

### Architecture Decisions

- **Stateless Design**: Gateway remains stateless by using Redis for rate limits
- **Middleware Pattern**: Clean separation of concerns with composable middleware
- **Error Isolation**: Circuit breaker pattern prevents cascade failures
- **Observability**: Structured logging and metrics essential for debugging

### Risks & Considerations

- **Redis Dependency**: Single point of failure; consider clustering for production
- **Rate Limit Accuracy**: ±2% variance acceptable for most use cases
- **Memory Growth**: Monitor for memory leaks in long-running processes
- **Configuration Complexity**: Will need sophisticated config management at scale

## Implementation Timeline

- **Setup & Basic Routing**: 20 minutes
- **Rate Limiting Implementation**: 35 minutes
- **Testing & Validation**: 25 minutes
- **Documentation & Metrics**: 10 minutes
- **Total Time**: 90 minutes

```

### Real-time Chat System
```

/development-prototype real-time WebSocket chat system --functional

```

**Chat System Features:**
1. **WebSocket Server**: Real-time bidirectional communication
2. **Message Broadcasting**: Multi-user chat room functionality
3. **Connection Management**: User join/leave handling
4. **Simple UI**: Basic web interface for testing
5. **Performance Testing**: Concurrent connection validation

### Machine Learning Pipeline
```

/development-prototype ML inference pipeline --tech=python --benchmark

````

**ML Pipeline Components:**
1. **Model Loading**: Load pre-trained model (ONNX, TensorFlow, PyTorch)
2. **Data Preprocessing**: Input validation and transformation
3. **Inference Engine**: Batch and real-time prediction endpoints
4. **Performance Monitoring**: Latency, throughput, and accuracy metrics
5. **API Interface**: REST endpoints for model serving

## Advanced Prototyping Features

### Multi-Technology Integration

```markdown
## Polyglot Prototype Strategy

### Service Architecture
- **API Gateway**: Deno (TypeScript) for web handling
- **Processing Engine**: Rust for performance-critical operations
- **Data Layer**: Go for concurrent database operations
- **ML Services**: Python for machine learning inference
- **Message Queue**: Redis for inter-service communication

### Communication Patterns
```typescript
// Inter-service communication prototype
interface ServiceConfig {
  name: string;
  endpoint: string;
  timeout: number;
  retries: number;
}

class ServiceMesh {
  private services = new Map<string, ServiceConfig>();

  async callService(serviceName: string, path: string, data?: any) {
    const config = this.services.get(serviceName);
    if (!config) throw new Error(`Service ${serviceName} not configured`);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.timeout);

    try {
      const response = await fetch(`${config.endpoint}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      throw new Error(`Service call failed: ${error.message}`);
    }
  }
}
````

````

### Performance Benchmarking Framework

```typescript
// prototype-benchmark.ts
interface BenchmarkResult {
  name: string;
  iterations: number;
  totalTime: number;
  avgTime: number;
  minTime: number;
  maxTime: number;
  throughput: number;
  memoryUsage: number;
}

class PrototypeBenchmark {
  async run(name: string, fn: () => Promise<void>, iterations = 1000): Promise<BenchmarkResult> {
    const times: number[] = [];
    const startMemory = Deno.memoryUsage().heapUsed;

    // Warmup
    for (let i = 0; i < 10; i++) {
      await fn();
    }

    // Actual benchmark
    const startTime = performance.now();

    for (let i = 0; i < iterations; i++) {
      const iterStart = performance.now();
      await fn();
      times.push(performance.now() - iterStart);
    }

    const totalTime = performance.now() - startTime;
    const endMemory = Deno.memoryUsage().heapUsed;

    return {
      name,
      iterations,
      totalTime,
      avgTime: totalTime / iterations,
      minTime: Math.min(...times),
      maxTime: Math.max(...times),
      throughput: iterations / (totalTime / 1000),
      memoryUsage: endMemory - startMemory
    };
  }
}

// Usage example
const benchmark = new PrototypeBenchmark();
const result = await benchmark.run("API Processing", async () => {
  await processApiRequest(sampleData);
});

console.table(result);
````

### Prototype Templates Library

```markdown
## Template Categories

### API Prototypes

- **REST API**: Basic CRUD operations with validation
- **GraphQL API**: Schema-first API with resolvers
- **WebSocket API**: Real-time communication patterns
- **gRPC Service**: High-performance RPC communication

### Data Processing

- **Stream Processor**: Real-time data transformation
- **Batch ETL**: Large dataset processing pipeline
- **Event Sourcing**: Event-driven data architecture
- **Time Series**: Time-based data analysis

### Frontend Prototypes

- **React Component**: Interactive UI components
- **Dashboard**: Data visualization and metrics
- **Real-time UI**: Live updating interfaces
- **Mobile PWA**: Progressive web application

### Integration Prototypes

- **Database Connector**: Multi-database integration
- **Message Queue**: Async communication patterns
- **External API**: Third-party service integration
- **File Processing**: Document and media handling
```

## Integration with Claude Code Features

### Memory System Integration

Tracks prototype experiments and learnings:

```markdown
# Added to CLAUDE.md

## Prototype History

- **2025-01-27**: API Gateway - Successful, 2.8k req/sec performance
- **2025-01-25**: Chat System - WebSocket handling 500 concurrent users
- **2025-01-20**: ML Pipeline - 50ms inference latency achieved

## Prototype Patterns

- **Deno**: Excellent for web APIs and tooling, good performance
- **Rust**: Best for CPU-intensive processing, worth the complexity
- **Go**: Great for concurrent systems, simple deployment
- **Python**: Essential for ML integration, slower but feature-rich

## Performance Baselines

- **API Gateway**: 2.8k req/sec target for production
- **WebSocket**: 500+ concurrent connections minimum
- **ML Inference**: <100ms latency requirement
- **Data Processing**: 1M records/minute throughput goal
```

### Collaborative Prototyping

```markdown
## Team Collaboration

### Prototype Sharing

- **Demo Sessions**: Regular prototype demos to stakeholders
- **Code Sharing**: Prototype repositories for team access
- **Knowledge Transfer**: Document key learnings and decisions
- **Iteration Planning**: Use prototype insights for sprint planning

### Validation Process

- **Technical Validation**: Performance, scalability, maintainability
- **Business Validation**: Feature usefulness, user experience
- **Risk Assessment**: Technical risks, implementation complexity
- **Go/No-Go Decision**: Clear criteria for production development
```

## Best Practices

### Prototyping Guidelines

- **Time-boxed Development**: Strict time limits prevent over-engineering
- **Feature Focus**: One core feature per prototype
- **Performance First**: Measure early and often
- **Document Assumptions**: Clear limitations and constraints
- **Plan Production Path**: Clear next steps for production implementation

### Common Pitfalls

- **Scope Creep**: Adding features beyond core validation
- **Over-Engineering**: Perfect code instead of working prototype
- **Missing Metrics**: No performance or usage measurements
- **Poor Documentation**: Inadequate explanation of learnings
- **No Exit Strategy**: Unclear path from prototype to production

### Success Metrics

- **Speed**: Time from idea to working prototype
- **Validation**: Clear go/no-go decision criteria
- **Learning**: Technical insights and risk identification
- **Communication**: Stakeholder understanding and buy-in
- **Production Readiness**: Clear implementation roadmap

## Related Commands

- `/workflow-plan` - Create implementation plan from successful prototype
- `/test` - Comprehensive testing after prototype validation
- `/quality-benchmark` - Detailed performance analysis of prototype
- `/meta-document` - Document prototype findings and decisions

The goal is to rapidly validate ideas and technical approaches with minimal investment, providing
clear data for informed development decisions and risk mitigation.

#### Web API Prototype (Deno Fresh)

```typescript
// main.ts - Minimal API prototype
import { serve } from '@std/http/server.ts';

const handler = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);

  if (url.pathname === '/api/demo' && req.method === 'POST') {
    const data = await req.json();
    // Prototype logic here
    return Response.json({
      success: true,
      processed: data,
      timestamp: new Date().toISOString(),
    });
  }

  return new Response('Prototype API', { status: 200 });
};

console.log('Prototype running on http://localhost:8000');
await serve(handler);
```

#### CLI Tool Prototype (Rust)

```rust
// src/main.rs - Quick CLI prototype
use clap::Parser;
use anyhow::Result;

#[derive(Parser)]
#[command(name = "prototype")]
#[command(about = "A prototype CLI tool")]
struct Args {
    /// Input file to process
    #[arg(short, long)]
    input: String,

    /// Enable verbose output
    #[arg(short, long)]
    verbose: bool,
}

fn main() -> Result<()> {
    let args = Args::parse();

    println!("Processing: {}", args.input);

    // Prototype logic here
    let result = process_file(&args.input)?;

    println!("Result: {:?}", result);
    Ok(())
}

fn process_file(path: &str) -> Result<String> {
    // Mock implementation
    Ok(format!("Processed {}", path))
}
```

#### Data Pipeline Prototype (Python/Deno)

```typescript
// pipeline.ts - Stream processing prototype
import { readLines } from '@std/io/read_lines.ts';

async function* processStream(input: AsyncIterable<string>) {
  for await (const line of input) {
    // Transform logic
    const processed = line.toUpperCase().trim();
    if (processed.length > 0) {
      yield {
        original: line,
        processed,
        timestamp: Date.now(),
      };
    }
  }
}

// Usage
const file = await Deno.open('input.txt');
const lines = readLines(file);

for await (const result of processStream(lines)) {
  console.log(JSON.stringify(result));
}
```

### 3. Quick Integration Prototypes

#### Database Connection

```typescript
// Quick PostgreSQL prototype
import { Client } from 'https://deno.land/x/postgres/mod.ts';

const client = new Client({
  user: 'prototype',
  database: 'prototype_db',
  hostname: 'localhost',
  port: 5432,
});

await client.connect();

// Test query
const result = await client.queryObject`
  SELECT * FROM users WHERE active = true LIMIT 5
`;

console.log('Sample data:', result.rows);
```

#### Message Queue

```go
// Quick Redis Pub/Sub prototype
package main

import (
    "fmt"
    "github.com/redis/go-redis/v9"
    "context"
)

func main() {
    ctx := context.Background()
    rdb := redis.NewClient(&redis.Options{
        Addr: "localhost:6379",
    })

    // Publisher prototype
    go func() {
        for i := 0; i < 10; i++ {
            rdb.Publish(ctx, "prototype-channel", fmt.Sprintf("Message %d", i))
            time.Sleep(time.Second)
        }
    }()

    // Subscriber prototype
    sub := rdb.Subscribe(ctx, "prototype-channel")
    for msg := range sub.Channel() {
        fmt.Printf("Received: %s\n", msg.Payload)
    }
}
```

### 4. UI Prototypes

#### React Component (Quick)

```jsx
// PrototypeComponent.jsx
export default function PrototypeFeature({ data }) {
  const [state, setState] = useState(data);
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setState((prev) => ({ ...prev, updated: Date.now() }));
    setLoading(false);
  };

  return (
    <div style={{ padding: 20, border: '1px solid #ccc' }}>
      <h3>Prototype: {state.name}</h3>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <button onClick={handleAction} disabled={loading}>
        {loading ? 'Processing...' : 'Test Action'}
      </button>
    </div>
  );
}
```

### 5. Algorithm Prototypes

```typescript
// algorithm-prototype.ts
function prototypeAlgorithm(input: number[]): {
  result: number[];
  metrics: {
    iterations: number;
    comparisons: number;
    timeMs: number;
  };
} {
  const start = performance.now();
  let iterations = 0;
  let comparisons = 0;

  // Prototype algorithm implementation
  const result = [...input];

  for (let i = 0; i < result.length; i++) {
    iterations++;
    for (let j = i + 1; j < result.length; j++) {
      comparisons++;
      if (result[i] > result[j]) {
        [result[i], result[j]] = [result[j], result[i]];
      }
    }
  }

  return {
    result,
    metrics: {
      iterations,
      comparisons,
      timeMs: performance.now() - start,
    },
  };
}

// Test with sample data
const testData = Array.from({ length: 100 }, () => Math.random() * 1000);
const output = prototypeAlgorithm(testData);
console.log('Metrics:', output.metrics);
```

### 6. Validation & Metrics

```typescript
// prototype-test.ts
Deno.test('Prototype validation', async (t) => {
  await t.step('performance baseline', () => {
    const start = performance.now();
    const result = prototypeFunction(testInput);
    const duration = performance.now() - start;

    assert(duration < 100, `Too slow: ${duration}ms`);
    assertEquals(result.length, expectedLength);
  });

  await t.step('edge cases', () => {
    assertDoesNotThrow(() => prototypeFunction([]));
    assertDoesNotThrow(() => prototypeFunction(null));
  });
});
```

## Output Format

````markdown
## Prototype: [Feature Name]

**Status:** Working Prototype **Time to Build:** X minutes **Dependencies:** [List key dependencies]

### What Works:

- ✅ Core functionality implemented
- ✅ Basic error handling
- ✅ Sample data processing

### Limitations:

- ⚠️ No authentication
- ⚠️ In-memory storage only
- ⚠️ Limited error handling

### Performance Metrics:

- Throughput: X ops/second
- Memory usage: Y MB
- Response time: Z ms

### How to Run:

```bash
# Clone and setup
git clone [prototype-repo]
cd prototype-dir

# Install and run
[package manager] install
[run command]

# Test endpoints
curl -X POST http://localhost:8000/api/demo \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```
````

### Next Steps

1. Add authentication layer
2. Implement persistent storage
3. Add comprehensive error handling
4. Create production configuration
5. Add monitoring/logging

### Key Code

[Include 1-2 most important code snippets]

### Learnings

- [Technical insight 1]
- [Technical insight 2]
- [Risk or concern discovered]

```
## Prototype Strategies

1. **Time-boxed**: Limit to 2-4 hours max
2. **Feature-focused**: One core feature only
3. **Mock external dependencies**: Use in-memory/fake services
4. **Hardcode config**: No complex configuration
5. **Skip edge cases**: Happy path only
6. **Document assumptions**: List what's not handled

## Common Prototypes

- API endpoint with mock data
- CLI tool with basic functionality
- Data processing pipeline
- Authentication flow
- Real-time websocket connection
- Background job processor
- Integration with third-party service

## Guidelines

- Start with the smallest possible implementation
- Use familiar tools for speed
- Copy/paste liberally from docs
- Don't worry about code quality initially
- Focus on proving the concept
- Measure key metrics early
- Document limitations clearly
```
