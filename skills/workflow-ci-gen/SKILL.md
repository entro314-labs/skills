---
name: workflow-ci-gen
description: "Generates CI/CD pipelines by detecting the stack (Go, Rust, Java, Node/Deno, Python, Docker, Kubernetes), with matrix tests, caching, security scanning, container push, and deploy for GitHub Actions, GitLab CI, or CircleCI. Use when asked to create or update CI/CD workflows."
disable-model-invocation: true
---

# CI/CD Pipeline Generator

## Purpose

Generate comprehensive CI/CD pipelines for multiple platforms with technology stack detection,
security integration, and deployment automation. Creates production-ready workflows following
industry best practices.

## Description

This command automatically creates comprehensive CI/CD pipelines tailored to your specific
technology stack and project requirements. It follows industry best practices for testing, security,
and deployment automation.

### What it generates

#### 1. Technology Stack Detection

Analyzes your project to determine the appropriate CI configuration:

**Project Analysis:**

- **Go**: Detects `go.mod`, analyzes Go version and build tags
- **Rust**: Identifies `Cargo.toml`, Rust edition, and feature flags
- **Java**: Finds `pom.xml`/`build.gradle`, determines Java version and build tool
- **Node/Deno**: Locates `package.json`/`deno.json`, package manager detection
- **Python**: Discovers `requirements.txt`/`pyproject.toml`, virtual environment setup
- **Docker**: Detects `Dockerfile` and `docker-compose.yml`
- **Kubernetes**: Identifies `k8s/` directory and manifest files

#### 2. Comprehensive Workflow Generation

**Go Project Example:**

````yaml
name: Go CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

env:
  GO_VERSION: '1.21'

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: testdb
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

      redis:
        image: redis:7-alpine
        options: >-
          --health-cmd \"redis-cli ping\"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 6379:6379

    steps:
    - uses: actions/checkout@v7

    - name: Set up Go
      uses: actions/setup-go@v7
      with:
        go-version: ${{ env.GO_VERSION }}
        cache: true
        cache-dependency-path: go.sum
    
    - name: Download dependencies
      run: go mod download
    
    - name: Verify dependencies
      run: go mod verify
    
    - name: Run go vet
      run: go vet ./...
    
    - name: Install staticcheck
      run: go install honnef.co/go/tools/cmd/staticcheck@latest
    
    - name: Run staticcheck
      run: staticcheck ./...
    
    - name: Install golangci-lint
      uses: golangci/golangci-lint-action@v9
      with:
        version: latest
        args: --timeout=5m
    
    - name: Run tests
      run: |
        go test -v -race -coverprofile=coverage.out ./...
        go tool cover -html=coverage.out -o coverage.html
    
    - name: Upload coverage reports
      uses: codecov/codecov-action@v7
      with:
        files: ./coverage.out
        flags: unittests
        name: codecov-go

  security-scan:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v7
    
    - name: Run Gosec Security Scanner
      uses: securecodewarrior/github-action-gosec@master
      with:
        args: './...'
    
    - name: Run govulncheck
      run: |
        go install golang.org/x/vuln/cmd/govulncheck@latest
        govulncheck ./...

  build:
    needs: [test, security-scan]
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v7
    
    - name: Set up Go
      uses: actions/setup-go@v7
      with:
        go-version: ${{ env.GO_VERSION }}
    
    - name: Build
      run: |
        CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o bin/app ./cmd/...
    
    - name: Build Docker image
      if: github.event_name == 'push'
      run: |
        docker build -t ${{ github.repository }}:${{ github.sha }} .
        docker tag ${{ github.repository }}:${{ github.sha }} ${{ github.repository }}:latest
```

**Rust Project Example:**
```yaml
name: Rust CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

env:
  CARGO_TERM_COLOR: always
  RUST_BACKTRACE: 1

jobs:
  check:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v7
    
    - name: Install Rust toolchain
      uses: dtolnay/rust-toolchain@stable
      with:
        components: clippy, rustfmt
    
    - name: Cache Cargo registry
      uses: actions/cache@v6
      with:
        path: |
          ~/.cargo/registry
          ~/.cargo/git
          target
        key: ${{ runner.os }}-cargo-${{ hashFiles('**/Cargo.lock') }}
    
    - name: Format check
      run: cargo fmt -- --check
    
    - name: Clippy lint
      run: cargo clippy --all-targets --all-features -- -D warnings
    
    - name: Security audit
      run: |
        cargo install cargo-audit
        cargo audit

  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        rust-version: [stable, beta]
    
    steps:
    - uses: actions/checkout@v7
    
    - name: Install Rust ${{ matrix.rust-version }}
      uses: dtolnay/rust-toolchain@master
      with:
        toolchain: ${{ matrix.rust-version }}
    
    - name: Run tests
      run: |
        cargo test --verbose --all-features
        cargo test --verbose --no-default-features
    
    - name: Run doctests
      run: cargo test --doc
    
    - name: Generate code coverage
      if: matrix.rust-version == 'stable'
      run: |
        cargo install cargo-tarpaulin
        cargo tarpaulin --verbose --all-features --workspace --timeout 120 --out Xml
    
    - name: Upload coverage
      if: matrix.rust-version == 'stable'
      uses: codecov/codecov-action@v7
      with:
        files: cobertura.xml

  build:
    needs: [check, test]
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v7
    
    - name: Install Rust
      uses: dtolnay/rust-toolchain@stable
    
    - name: Build release
      run: cargo build --release --verbose
    
    - name: Upload artifacts
      uses: actions/upload-artifact@v7
      with:
        name: binary
        path: target/release/
```

#### 3. Advanced Features

**Matrix Testing:**
```yaml
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest, macos-latest]
    rust-version: [stable, beta, nightly]
    include:
      - os: ubuntu-latest
        rust-version: stable
        features: "--all-features"
    exclude:
      - os: windows-latest
        rust-version: nightly
```

**Dependency Caching:**
```yaml
- name: Cache dependencies
  uses: actions/cache@v6
  with:
    path: |
      ~/.cargo/registry
      ~/.cargo/git
      target
      node_modules
      ~/.deno
    key: ${{ runner.os }}-deps-${{ hashFiles('**/Cargo.lock', '**/package-lock.json', '**/deno.lock') }}
    restore-keys: |
      ${{ runner.os }}-deps-
```

**Security Integration:**
```yaml
security:
  runs-on: ubuntu-latest
  steps:
  - uses: actions/checkout@v7
  
  - name: Run Trivy vulnerability scanner
    uses: aquasecurity/trivy-action@master
    with:
      scan-type: 'fs'
      scan-ref: '.'
      format: 'sarif'
      output: 'trivy-results.sarif'
  
  - name: Upload Trivy scan results
    uses: github/codeql-action/upload-sarif@v4
    with:
      sarif_file: 'trivy-results.sarif'
  
  - name: SAST CodeQL Analysis
    uses: github/codeql-action/analyze@v4
    with:
      languages: go, javascript
```

#### 4. Deployment Integration

**Container Registry Push:**
```yaml
deploy:
  if: github.ref == 'refs/heads/main'
  needs: [test, security]
  runs-on: ubuntu-latest
  
  steps:
  - uses: actions/checkout@v7
  
  - name: Set up Docker Buildx
    uses: docker/setup-buildx-action@v4
  
  - name: Login to GitHub Container Registry
    uses: docker/login-action@v4
    with:
      registry: ghcr.io
      username: ${{ github.actor }}
      password: ${{ secrets.GITHUB_TOKEN }}
  
  - name: Build and push Docker image
    uses: docker/build-push-action@v7
    with:
      context: .
      push: true
      tags: |
        ghcr.io/${{ github.repository }}:latest
        ghcr.io/${{ github.repository }}:${{ github.sha }}
      cache-from: type=gha
      cache-to: type=gha,mode=max
```

**Kubernetes Deployment:**
```yaml
  - name: Deploy to Kubernetes
    run: |
      echo "${{ secrets.KUBE_CONFIG }}" | base64 -d > kubeconfig
      export KUBECONFIG=kubeconfig
      
      # Update image tag in deployment
      kubectl set image deployment/app app=ghcr.io/${{ github.repository }}:${{ github.sha }}
      
      # Wait for rollout
      kubectl rollout status deployment/app --timeout=600s
      
      # Verify deployment
      kubectl get pods -l app=myapp
```

### 5. Quality Gates and Notifications

**Branch Protection Integration:**
```yaml
# Generates .github/branch-protection.yml
branch_protection:
  main:
    required_status_checks:
      - "test"
      - "security-scan"
      - "build"
    enforce_admins: false
    required_pull_request_reviews:
      required_approving_review_count: 2
      dismiss_stale_reviews: true
      require_code_owner_reviews: true
```

**Slack/Discord Notifications:**
```yaml
  - name: Notify deployment status
    if: always()
    uses: 8398a7/action-slack@v3
    with:
      status: ${{ job.status }}
      channel: '#deployments'
      webhook_url: ${{ secrets.SLACK_WEBHOOK }}
      fields: repo,message,commit,author,action,eventName,ref,workflow
```

## Platform Support

### GitHub Actions (Default)
- Full workflow generation with advanced features
- Integration with GitHub native features
- Supports GitHub Container Registry
- CodeQL security scanning integration

### GitLab CI
```yaml
# .gitlab-ci.yml
stages:
  - test
  - security
  - build
  - deploy

variables:
  DOCKER_DRIVER: overlay2
  DOCKER_TLS_CERTDIR: "/certs"

test:go:
  stage: test
  image: golang:1.21
  services:
    - postgres:15
  script:
    - go mod download
    - go test -v -race -coverprofile=coverage.out ./...
  coverage: '/coverage: \d+\.\d+% of statements/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage.xml
```

### CircleCI
```yaml
# .circleci/config.yml
version: 2.1

orbs:
  go: circleci/go@1.7.0
  docker: circleci/docker@2.2.0

workflows:
  test-and-deploy:
    jobs:
      - go/test:
          version: "1.21"
      - docker/publish:
          requires:
            - go/test
          filters:
            branches:
              only: main
```

## Examples

### Generate basic CI for current project:
```
/workflow-ci-gen
```

### Create advanced CI with security scanning:
```
/workflow-ci-gen --template advanced
```

### Generate GitLab CI configuration:
```
/workflow-ci-gen --platform gitlab
```

### Update existing CI workflow:
```
/workflow-ci-gen --update
```

## Configuration Templates

### Basic Template
- Essential testing and building
- Basic security scanning
- Simple deployment to staging

### Advanced Template
- Matrix testing across platforms/versions
- Comprehensive security scanning
- Performance benchmarking
- Multi-environment deployment

### Security Template
- SAST/DAST scanning
- Dependency vulnerability checks
- Container image scanning
- Compliance reporting

## Integration with Other Commands
- Use with `/containerize` to add Docker build steps
- Combine with `/workflow-deploy` for Kubernetes deployment automation
- Use with `/security-harden` to include security scanning
- Integrate with `/test` to include comprehensive testing strategies
````
