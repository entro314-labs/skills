---
name: security-audit
description: "Runs a comprehensive security and compliance audit covering code vulnerabilities, dependency CVEs, infrastructure and container configuration, secrets, and regulatory frameworks (PCI, SOX, GDPR), producing a report with remediation steps. Use when asked for a security audit or vulnerability scan."
disable-model-invocation: true
---

# Security & Compliance Audit

## Purpose

Comprehensive security, compliance, and best practices audit with automated scanning, vulnerability
detection, and remediation guidance. Covers code-level security, infrastructure configuration,
dependency vulnerabilities, and regulatory compliance requirements.

## Claude Code Integration

### Slash Command Usage

```
/security-audit <scope> [--compliance] [--focus]
```

**Audit Scopes:**

- `security` - Comprehensive security vulnerability assessment
- `compliance` - Regulatory compliance evaluation (PCI, SOX, GDPR, etc.)
- `dependencies` - Third-party package vulnerability scanning
- `infrastructure` - Container and Kubernetes security audit
- `code-quality` - Best practices and maintainability review
- `privacy` - Data protection and privacy compliance

**Compliance Frameworks:**

- `--pci-dss` - Payment Card Industry Data Security Standard
- `--sox` - Sarbanes-Oxley compliance requirements
- `--gdpr` - General Data Protection Regulation
- `--hipaa` - Health Insurance Portability and Accountability Act
- `--iso27001` - ISO 27001 information security standard
- `--cis` - CIS (Center for Internet Security) benchmarks

**Focus Areas:**

- `--focus=authentication` - Authentication and authorization security
- `--focus=data-protection` - Data encryption and privacy controls
- `--focus=network` - Network security and communication protocols
- `--focus=container` - Container and orchestration security
- `--focus=api` - API security and endpoint protection

### Automatic Scanning Integration

The command integrates with multiple security tools:

**Static Analysis**:
!`find . -name "*.java" -o -name "*.go" -o -name "*.rs" -o -name "*.js" -o -name "*.py" | head -10 || true`

**Secret Detection**: !`find . -name ".env*" -o -name "*config*" -type f | head -10 || true`

**Container Security**: !`find . -name "Dockerfile" -o -name "docker-compose.yml" | head -5 || true`

**Kubernetes Manifests**:
!`find . -name "*.yaml" -o -name "*.yml" | grep -E "k8s|kubernetes" | head -5 || true`

## Usage Examples

### Comprehensive Security Audit

```
/security-audit security --full
```

**Audit Process:**

1. **Secret Detection**: Scans for hardcoded credentials and sensitive data
2. **Code Analysis**: Static analysis for security vulnerabilities
3. **Dependency Scanning**: Identifies vulnerable dependencies and licenses
4. **Infrastructure Review**: Container and Kubernetes security assessment
5. **Configuration Analysis**: Security configuration and best practices
6. **Compliance Mapping**: Maps findings to security frameworks

**Expected Output:**

````markdown
# Security Audit Report

**Generated**: 2025-01-27 14:30:00 UTC  
**Project**: E-commerce API Platform  
**Audit Scope**: Comprehensive Security Assessment  
**Tools Used**: Semgrep, Trivy, GitLeaks, Kubesec

## Executive Summary

### Risk Assessment

- **Overall Risk**: MEDIUM
- **Critical Issues**: 2
- **High Priority**: 8
- **Medium Priority**: 15
- **Low Priority**: 23
- **Estimated Remediation**: 40 hours

### Key Findings

- **Authentication**: Weak JWT token validation
- **Data Protection**: Unencrypted sensitive data in logs
- **Dependencies**: 3 high-severity CVEs in dependencies
- **Infrastructure**: Missing Pod Security Standards

## Critical Issues (Immediate Action Required)

### 🔴 [SEC-001] Hardcoded Database Credentials

**File**: `src/config/database.go:23`  
**Risk**: Critical  
**CVSS Score**: 9.8

```go
// VULNERABLE CODE
func connectDB() *sql.DB {
    db, err := sql.Open("postgres", "postgres://admin:password123@db:5432/app")
    //                                     ^^^^^^^^^^^^^ Hardcoded credentials
    if err != nil {
        log.Fatal(err)
    }
    return db
}
```
````

**Impact**:

- Database credentials exposed in source code
- Potential unauthorized database access
- Violation of secrets management best practices

**Remediation**:

```go
// SECURE CODE
func connectDB() *sql.DB {
    dbURL := os.Getenv("DATABASE_URL")
    if dbURL == "" {
        log.Fatal("DATABASE_URL environment variable not set")
    }

    db, err := sql.Open("postgres", dbURL)
    if err != nil {
        log.Fatal(err)
    }
    return db
}
```

**Action Items**:

1. Move credentials to environment variables
2. Update Kubernetes secrets management
3. Rotate exposed credentials immediately
4. Implement secret scanning in CI/CD

### 🔴 [SEC-002] SQL Injection Vulnerability

**File**: `src/handlers/user.go:45`  
**Risk**: Critical  
**CVSS Score**: 9.3

```go
// VULNERABLE CODE
func getUserByID(userID string) (*User, error) {
    query := fmt.Sprintf("SELECT * FROM users WHERE id = '%s'", userID)
    //       ^^^^^^^^^^^^ Direct string interpolation vulnerable to SQL injection
    row := db.QueryRow(query)
    // ...
}
```

**Impact**:

- Potential data breach through SQL injection
- Unauthorized data access and manipulation
- Compliance violations (PCI DSS, GDPR)

**Remediation**:

```go
// SECURE CODE
func getUserByID(userID string) (*User, error) {
    query := "SELECT * FROM users WHERE id = \$1"
    row := db.QueryRow(query, userID)
    // ...
}
```

## High Priority Issues

### 🟠 [SEC-003] Weak JWT Token Validation

**File**: `src/middleware/auth.go:67`  
**Risk**: High  
**CVSS Score**: 7.5

```go
// VULNERABLE CODE
func validateToken(tokenString string) (*jwt.Token, error) {
    return jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
        return []byte("secret"), nil  // Weak secret, no algorithm validation
    })
}
```

**Issues**:

- Weak hardcoded JWT secret
- Missing algorithm validation (algorithm confusion attack)
- No token expiration validation

**Remediation**:

```go
// SECURE CODE
func validateToken(tokenString string) (*jwt.Token, error) {
    secret := os.Getenv("JWT_SECRET")
    if len(secret) < 32 {
        return nil, errors.New("JWT secret too weak")
    }

    return jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
        // Validate signing algorithm
        if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
            return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
        }
        return []byte(secret), nil
    })
}
```

### 🟠 [SEC-004] Missing Input Validation

**File**: `src/handlers/order.go:89`  
**Risk**: High  
**CVSS Score**: 7.2

```go
// VULNERABLE CODE
func createOrder(w http.ResponseWriter, r *http.Request) {
    var order Order
    json.NewDecoder(r.Body).Decode(&order)  // No validation

    // Direct processing without validation
    result := processOrder(order)
}
```

**Issues**:

- No input validation or sanitization
- Potential for malicious data processing
- Missing content-type validation

**Remediation**:

```go
// SECURE CODE
func createOrder(w http.ResponseWriter, r *http.Request) {
    if r.Header.Get("Content-Type") != "application/json" {
        http.Error(w, "Invalid content type", http.StatusBadRequest)
        return
    }

    var order Order
    if err := json.NewDecoder(r.Body).Decode(&order); err != nil {
        http.Error(w, "Invalid JSON", http.StatusBadRequest)
        return
    }

    // Validate order data
    if err := validateOrder(order); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    result := processOrder(order)
}

func validateOrder(order Order) error {
    if order.Amount <= 0 {
        return errors.New("order amount must be positive")
    }
    if len(order.Items) == 0 {
        return errors.New("order must contain at least one item")
    }
    return nil
}
```

## Dependency Vulnerabilities

### High Severity Dependencies

| Package                       | Version | CVE            | Severity | Fix Available |
| ----------------------------- | ------- | -------------- | -------- | ------------- |
| `github.com/gin-gonic/gin`    | v1.7.7  | CVE-2023-29401 | High     | v1.9.1        |
| `github.com/golang-jwt/jwt`   | v3.2.0  | CVE-2023-26048 | High     | v4.5.0        |
| `go.mongodb.org/mongo-driver` | v1.8.0  | CVE-2023-29402 | Medium   | v1.11.0       |

**Remediation Commands**:

```bash
# Update vulnerable dependencies
go get github.com/gin-gonic/gin@v1.9.1
go get github.com/golang-jwt/jwt/v4@v4.5.0
go get go.mongodb.org/mongo-driver@v1.11.0
go mod tidy

# Verify updates
go mod verify
```

## Infrastructure Security

### Kubernetes Security Issues

#### 🟠 [K8S-001] Missing Pod Security Standards

**File**: `k8s/deployment.yaml`  
**Risk**: High

```yaml
# CURRENT (INSECURE)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-server
spec:
  template:
    spec:
      containers:
        - name: api
          image: api-server:latest
          # Missing security context
```

**Issues**:

- Containers running as root
- No security context restrictions
- Missing Pod Security Standards

**Remediation**:

```yaml
# SECURE VERSION
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-server
spec:
  template:
    spec:
      securityContext:
        runAsNonRoot: true
        runAsUser: 10001
        fsGroup: 10001
      containers:
        - name: api
          image: api-server:latest
          securityContext:
            allowPrivilegeEscalation: false
            readOnlyRootFilesystem: true
            runAsNonRoot: true
            runAsUser: 10001
            capabilities:
              drop:
                - ALL
          resources:
            requests:
              cpu: 100m
              memory: 128Mi
            limits:
              cpu: 500m
              memory: 512Mi
```

#### 🟡 [K8S-002] Missing Network Policies

**Risk**: Medium

**Issue**: No network segmentation between services

**Remediation**:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: api-server-netpol
spec:
  podSelector:
    matchLabels:
      app: api-server
  policyTypes:
    - Ingress
    - Egress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: frontend
      ports:
        - protocol: TCP
          port: 8080
  egress:
    - to:
        - podSelector:
            matchLabels:
              app: database
      ports:
        - protocol: TCP
          port: 5432
```

## Compliance Assessment

### PCI DSS Compliance Status

| Requirement                   | Status | Finding                                          |
| ----------------------------- | ------ | ------------------------------------------------ |
| 1. Firewall Configuration     | ❌     | Missing network segmentation                     |
| 2. Default Passwords          | ❌     | Hardcoded credentials found                      |
| 3. Cardholder Data Protection | ⚠️     | Encryption implemented, but logging needs review |
| 4. Encrypted Transmission     | ✅     | TLS 1.3 properly configured                      |
| 6. Secure Development         | ❌     | SQL injection vulnerabilities                    |
| 8. Access Control             | ❌     | Weak authentication mechanisms                   |
| 10. Logging and Monitoring    | ⚠️     | Logging present, but incomplete                  |
| 11. Security Testing          | ❌     | No automated security testing                    |

**Compliance Score**: 3/8 Requirements Met  
**Certification Readiness**: Not Ready  
**Estimated Remediation**: 60-80 hours

## Remediation Roadmap

### Phase 1: Critical Issues (Week 1)

- [ ] **Immediate**: Rotate hardcoded credentials
- [ ] **Day 1**: Fix SQL injection vulnerabilities
- [ ] **Day 2**: Implement proper JWT validation
- [ ] **Day 3**: Add input validation across all endpoints
- [ ] **Week 1**: Update vulnerable dependencies

### Phase 2: High Priority (Week 2-3)

- [ ] **Week 2**: Implement Pod Security Standards
- [ ] **Week 2**: Add comprehensive input validation
- [ ] **Week 3**: Set up automated secret scanning
- [ ] **Week 3**: Implement network policies

### Phase 3: Medium Priority (Week 4-6)

- [ ] **Week 4**: Enhance logging and monitoring
- [ ] **Week 5**: Implement security headers
- [ ] **Week 6**: Add rate limiting and DDoS protection

### Phase 4: Long-term (Month 2)

- [ ] **Month 2**: Complete compliance certification
- [ ] **Month 2**: Implement security training program
- [ ] **Month 2**: Establish security review processes

## Recommended Tools Integration

### CI/CD Security Pipeline

```yaml
# .github/workflows/security.yml
name: Security Checks
on: [push, pull_request]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7

      - name: Run Semgrep
        uses: semgrep/semgrep-action@v1
        with:
          config: auto

      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          scan-ref: '.'

      - name: Run GitLeaks
        uses: gitleaks/gitleaks-action@v3
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Pre-commit Hooks

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/gitleaks/gitleaks
    rev: v8.16.1
    hooks:
      - id: gitleaks

  - repo: https://github.com/semgrep/semgrep
    rev: v1.45.0
    hooks:
      - id: semgrep
        args: ['--config=auto']
```

## Summary and Next Steps

### Priority Actions

1. **Immediate** (Next 24 hours):
   - Rotate all hardcoded credentials
   - Apply critical security patches
   - Implement emergency monitoring

2. **Short-term** (Next 2 weeks):
   - Fix all critical and high-severity issues
   - Implement security scanning in CI/CD
   - Update security documentation

3. **Medium-term** (Next 2 months):
   - Complete compliance certification
   - Implement comprehensive security training
   - Establish ongoing security processes

### Monitoring and Validation

- **Weekly**: Re-run security scans
- **Monthly**: Compliance assessment
- **Quarterly**: External security audit
- **Annually**: Penetration testing

**Report Generated**: 2025-01-27 14:30:00 UTC  
**Next Audit Scheduled**: 2025-04-27  
**Audit ID**: AUDIT-2025-001-SEC

````

3. File permissions audit:
   - Check executable scripts have proper permissions
   - Verify no world-writable files
   - Ensure backup directories have restricted access
   - Validate .ssh and sensitive config permissions

4. Portability checks:
   - Verify no hard-coded paths (should use ~ or variables)
   - Check for platform-specific commands
   - Validate shell compatibility (bash vs zsh)
   - Ensure Windows compatibility where needed

5. Backup safety:
   - Verify backups don't include sensitive data
   - Check backup paths are secure
   - Validate restore process doesn't expose secrets
   - Ensure atomic operations for critical files

6. Best practices review:
   - Check for proper error handling
   - Verify cleanup on script failure
   - Validate logging doesn't expose sensitive data
   - Ensure idempotent operations

7. Language/Framework specific:
   **Java:**
   - Dependency vulnerabilities (OWASP Dependency Check)
   - Outdated Spring Boot version
   - Insecure defaults
   - JVM security flags

   **Go:**
   - Module vulnerabilities (nancy, gosec)
   - Goroutine leaks
   - Race conditions
   - Proper context cancellation

   **Rust:**
   - Cargo audit results
   - Unsafe code justification
   - Proper error handling

   **Kubernetes:**
   - Pod security policies
   - RBAC misconfigurations
   - Network policies
   - Secret management

8. Infrastructure security:
   - Container image scanning (Trivy, Grype)
   - Kubernetes manifest validation
   - Helm chart security
   - Infrastructure as Code scanning (Terraform, CloudFormation)
   - CI/CD pipeline security

9. Generate audit report:
   ```markdown
   # Security Audit Report

   Generated: [timestamp]
   Project Type: [Java/Go/Rust/K8s/Mixed]

   ## Critical Issues (Immediate Action Required)

   - [CVE-2023-XXXXX] Vulnerable dependency: package@version
   - [SEC001] Hardcoded database password in config.properties:45

   ## High Priority (Fix Soon)

   - [SEC002] SQL injection risk in UserRepository.java:78
   - [SEC003] Missing RBAC for admin endpoints

   ## Medium Priority (Plan to Fix)

   - [SEC004] Outdated TLS version in use
   - [SEC005] Missing rate limiting on API

   ## Low Priority (Best Practice)

   - [BP001] Consider using structured logging
   - [BP002] Add security headers

   ## Compliance Status

   - OWASP Top 10: [Status]
   - CIS Benchmarks: [Status]
   - PCI DSS: [Status if applicable]

   ## Summary

   - Total issues found: X
   - Critical: X, High: X, Medium: X, Low: X
   - Estimated remediation time: X hours
   - Recommended actions: [prioritized list]
````

Save report to: `/tmp/security-audit-[timestamp].md`

Include specific remediation commands and code examples for each finding.
