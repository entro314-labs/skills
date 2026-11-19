---
name: meta-api
description: "Generates complete API endpoints (REST, gRPC, or GraphQL) with implementation, tests, authentication, validation, security measures, documentation, and example client code for a given description and framework. Use when asked to create an API endpoint or service."
disable-model-invocation: true
---

# API Endpoint Generator

## Purpose

Generate complete API endpoints with implementation, comprehensive testing, security measures, and
documentation for multiple frameworks and API patterns. Handles REST, gRPC, and GraphQL with proper
authentication, validation, and best practices.

## Claude Code Integration

### Slash Command Usage

```
/meta-api <description> [--type] [--framework]
```

**API Types:**

- `--rest` - RESTful HTTP APIs with JSON (default)
- `--grpc` - gRPC services with Protocol Buffers
- `--graphql` - GraphQL APIs with schema and resolvers
- `--websocket` - Real-time WebSocket APIs

**Framework Detection:** Automatically detects and supports:

- **Java**: Spring Boot, Quarkus, JAX-RS
- **Go**: ConnectRPC, Gin, Echo, Fiber
- **Rust**: Axum, Actix-web, Rocket
- **Node.js**: Express, Fastify, Hapi
- **Python**: FastAPI, Django REST, Flask

### Automatic Project Analysis

The command analyzes project structure and frameworks:

**Framework Detection**:
!`find . -name "pom.xml" -o -name "go.mod" -o -name "Cargo.toml" -o -name "package.json" | head -5 || true`

**Existing APIs**:
!`find . -name "*.proto" -o -name "openapi.yaml" -o -name "schema.graphql" | head -5 || true`

**Auth Patterns**:
!`grep -r "JWT\|OAuth\|Bearer" --include="*.java" --include="*.go" --include="*.rs" . | head -5 || true`

**API Versioning**:
!`grep -r "/v[0-9]\|/api/v" --include="*.java" --include="*.go" --include="*.rs" . | head -5 || true`

2. Design endpoint:
   - Determine HTTP method (GET, POST, PUT, DELETE, PATCH)
   - Design RESTful URL path following conventions
   - Define request parameters (path, query, body)
   - Specify response schema and status codes
   - Plan error responses and edge cases

3. Implement endpoint:

   **Spring Boot (Java):**

   ```java
   @RestController
   @RequestMapping("/api/v1")
   public class Controller {
       @PostMapping("/resource")
       public ResponseEntity<Response> create(@Valid @RequestBody Request req) {
           // Implementation
       }
   }
   ```

   **ConnectRPC (Go):**

   ```go
   func (s *Server) Method(ctx context.Context,
       req *connect.Request[pb.Request]) (*connect.Response[pb.Response], error) {
       // Implementation
   }
   ```

   **Axum (Rust):**

   ```rust
   async fn handler(
       State(state): State<AppState>,
       Json(payload): Json<Request>,
   ) -> Result<Json<Response>, StatusCode> {
       // Implementation
   }
   ```

   - Add input validation and sanitization
   - Implement business logic with proper separation
   - Add comprehensive error handling
   - Include structured logging
   - Implement rate limiting if needed

4. Security implementation:
   - Add authentication checks
   - Implement authorization/permission checks
   - Validate and sanitize all inputs
   - Prevent injection attacks
   - Add CORS configuration if needed
   - Implement request signing if required

5. Generate tests:

   **Java (JUnit/MockMvc):**

   ```java
   @Test
   void testEndpoint() throws Exception {
       mockMvc.perform(post("/api/v1/resource")
           .contentType(MediaType.APPLICATION_JSON)
           .content(jsonRequest))
           .andExpect(status().isOk());
   }
   ```

   **Go (testing package):**

   ```go
   func TestEndpoint(t *testing.T) {
       req := httptest.NewRequest("POST", "/api/v1/resource", body)
       w := httptest.NewRecorder()
       handler(w, req)
       assert.Equal(t, http.StatusOK, w.Code)
   }
   ```

   **Rust (axum-test):**

   ```rust
   #[tokio::test]
   async fn test_endpoint() {
       let app = create_app();
       let response = app.oneshot(request).await.unwrap();
       assert_eq!(response.status(), StatusCode::OK);
   }
   ```

   - Test all response codes (200, 400, 401, 403, 404, 500)
   - Test edge cases and invalid inputs
   - Load testing with k6 or Gatling
   - Security tests (auth bypass, injection)

6. Create documentation:
   - OpenAPI/Swagger specification
   - Request/response examples
   - Error code documentation
   - Rate limiting information
   - Authentication requirements
   - Curl/HTTPie examples

7. Database/Service integration:
   - **Java**: JPA/Hibernate, JOOQ, MyBatis
   - **Go**: sqlx, GORM, Ent
   - **Rust**: sqlx, Diesel, SeaORM
   - Implement repository pattern
   - Add database migrations (Flyway, migrate, sqlx)
   - Configure connection pooling
   - Add caching (Redis/DragonflyDB)
   - Consider event sourcing with Kafka/RedPanda

Output:

- Complete endpoint implementation
- Comprehensive test suite
- API documentation
- Database migrations (if needed)
- Example client code
