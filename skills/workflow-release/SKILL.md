---
name: workflow-release
description: "Automates a release: determines the semantic version from conventional commits, bumps versions, generates the changelog, tags, publishes, and supports dry-run, prerelease, and patch/minor/major types. Use when asked to cut a release, bump a version, or publish."
disable-model-invocation: true
---

# Release Automation Suite

## Purpose

Automates the entire software release process.

## Usage

```
/workflow-release
/workflow-release --version <version>
/workflow-release --type <patch|minor|major>
/workflow-release --prerelease <alpha|beta|rc>
/workflow-release --dry-run
```

## Description

This command orchestrates the complete software release workflow, from version bumping and changelog
generation to tag creation and distribution. It ensures every release is properly documented,
tagged, and published consistently.

### What it does

#### 1. Version Management

Intelligently determines the next version based on conventional commits or user input:

**Semantic Version Detection:**

- Analyzes commit messages since last release
- Automatically determines version bump type:
  - `patch`: Bug fixes, documentation updates
  - `minor`: New features, backwards-compatible changes
  - `major`: Breaking changes, API modifications

**Version Bump Examples:**

```bash
# Current version: v1.2.3

# Commits since last release:
# - fix: resolve memory leak in auth handler
# - docs: update API documentation
# Result: v1.2.4 (patch release)

# Commits since last release:
# - feat: add user profile endpoints
# - fix: resolve login timeout issue
# Result: v1.3.0 (minor release)

# Commits since last release:
# - feat!: migrate to new authentication system
# - BREAKING CHANGE: removed deprecated /v1/auth endpoint
# Result: v2.0.0 (major release)
```

#### 2. Comprehensive Changelog Generation

Creates detailed, user-friendly changelogs from git history:

**Generated CHANGELOG.md:**

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2024-06-06

### Added

- User profile management endpoints for enhanced user experience (#123)
- Real-time notification system with WebSocket support (#145)
- Advanced search functionality with full-text indexing (#156)
- Export functionality for user data (GDPR compliance) (#167)

### Changed

- Improved authentication token refresh mechanism (#134)
- Updated database connection pooling for better performance (#142)
- Enhanced error messages for better debugging (#151)

### Fixed

- Resolved memory leak in background job processor (#129)
- Fixed race condition in concurrent user registration (#138)
- Corrected timezone handling in scheduled tasks (#149)

### Security

- Updated JWT library to address security vulnerability CVE-2024-1234 (#161)
- Implemented rate limiting for authentication endpoints (#165)

### Breaking Changes

- Removed deprecated `/v1/auth/login` endpoint (use `/v2/auth/login`)
- Changed response format for `/api/users` - now returns `{ users: [...] }`

### Migration Guide

For users upgrading from v1.2.x:

1. Update authentication endpoints to use `/v2/auth/*`
2. Update API response parsing for user list endpoints
3. Review and update any hardcoded API paths

### Contributors

- @alice (8 commits)
- @bob (5 commits)
- @charlie (3 commits)

## [1.2.3] - 2024-05-15

### Fixed

- Critical security fix for SQL injection vulnerability (#118)
- Resolved Docker build issues on ARM64 platforms (#121)

[Full Changelog](https://github.com/org/repo/compare/v1.2.2...v1.2.3)
```

#### 3. Multi-Language Version Updates

Updates version information across different project files:

**Go Projects:**

````go
// cmd/version.go
package main

const (
    Version = "1.3.0"
    BuildDate = "2024-06-06T14:30:00Z"
    GitCommit = "abc123def456"
)
```

**Rust Projects:**
```toml
# Cargo.toml
[package]
name = "myapp"
version = "1.3.0"
edition = "2021"

# Also updates Cargo.lock automatically
```

**Node.js/Deno Projects:**
```json
// package.json
{
  "name": "myapp",
  "version": "1.3.0",
  "description": "My awesome application"
}

// deno.json
{
  "name": "@org/myapp",
  "version": "1.3.0",
  "exports": "./mod.ts"
}
```

**Java Projects:**
```xml
<!-- pom.xml -->
<project>
    <groupId>com.example</groupId>
    <artifactId>myapp</artifactId>
    <version>1.3.0</version>
</project>

<!-- gradle.properties -->
version=1.3.0
```

#### 4. Git Tag Creation and Management
Creates annotated git tags with comprehensive metadata:

**Tag Creation:**
```bash
# Creates annotated tag with changelog excerpt
git tag -a v1.3.0 -m "Release v1.3.0

New Features:
- User profile management endpoints
- Real-time notification system
- Advanced search functionality

Breaking Changes:
- Removed deprecated /v1/auth/login endpoint

See CHANGELOG.md for complete release notes."

# Push tag to remote
git push origin v1.3.0
```

#### 5. GitHub Release Creation
Generates comprehensive GitHub releases with assets:

**Release Creation Script:**
```bash
# Create GitHub release with gh CLI
gh release create v1.3.0 \
  --title "Release v1.3.0 - Enhanced User Management" \
  --notes-file release-notes.md \
  --target main

# Upload release artifacts
gh release upload v1.3.0 \
  dist/myapp-linux-amd64.tar.gz \
  dist/myapp-darwin-amd64.tar.gz \
  dist/myapp-windows-amd64.zip \
  dist/checksums.txt
```

**Generated Release Notes:**
```markdown
## 🚀 What's New in v1.3.0

### ✨ New Features
- **User Profiles**: Complete user profile management system
- **Real-time Notifications**: WebSocket-based notification system
- **Advanced Search**: Full-text search with filtering and sorting
- **Data Export**: GDPR-compliant user data export functionality

### 🔧 Improvements
- Enhanced authentication with automatic token refresh
- Improved database performance with connection pooling
- Better error messages for easier debugging

### 🐛 Bug Fixes
- Fixed memory leak in background job processor
- Resolved race condition in user registration
- Corrected timezone handling in scheduled tasks

### 🔒 Security Updates
- Updated JWT library (addresses CVE-2024-1234)
- Implemented rate limiting for auth endpoints

### ⚠️ Breaking Changes
- Removed deprecated `/v1/auth/login` endpoint
- Changed response format for `/api/users` endpoint

### 📥 Installation

#### Docker
```bash
docker pull ghcr.io/org/myapp:v1.3.0
```

#### Binary Downloads
- [Linux (AMD64)](https://github.com/org/myapp/releases/download/v1.3.0/myapp-linux-amd64.tar.gz)
- [macOS (AMD64)](https://github.com/org/myapp/releases/download/v1.3.0/myapp-darwin-amd64.tar.gz)
- [Windows (AMD64)](https://github.com/org/myapp/releases/download/v1.3.0/myapp-windows-amd64.zip)

#### Package Managers
```bash
# Homebrew (macOS)
brew install org/tap/myapp

# npm
npm install -g @org/myapp

# Go
go install github.com/org/myapp/cmd/myapp@v1.3.0
```

### 🔄 Migration Guide

For users upgrading from v1.2.x, please review our [migration guide](MIGRATION.md).

### 👥 Contributors

Special thanks to all contributors who made this release possible:
- @alice - User profile system implementation
- @bob - Real-time notification architecture
- @charlie - Search functionality and performance optimizations

**Full Changelog**: https://github.com/org/myapp/compare/v1.2.3...v1.3.0
```

#### 6. Artifact Building and Distribution
Builds and distributes release artifacts across platforms:

**Multi-Platform Build:**
```bash
#!/bin/bash
# Generated build script

VERSION="1.3.0"
PROJECT="myapp"

# Build for multiple platforms
platforms=("linux/amd64" "linux/arm64" "darwin/amd64" "darwin/arm64" "windows/amd64")

for platform in "${platforms[@]}"; do
    OS=$(echo $platform | cut -d'/' -f1)
    ARCH=$(echo $platform | cut -d'/' -f2)
    
    echo "Building for $OS/$ARCH..."
    
    if [ "$OS" = "windows" ]; then
        EXT=".exe"
    else
        EXT=""
    fi
    
    env GOOS=$OS GOARCH=$ARCH go build \
        -ldflags="-X main.Version=$VERSION -X main.BuildDate=$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
        -o "dist/${PROJECT}-${OS}-${ARCH}${EXT}" \
        ./cmd/main.go
    
    # Create archive
    if [ "$OS" = "windows" ]; then
        zip "dist/${PROJECT}-${OS}-${ARCH}.zip" "dist/${PROJECT}-${OS}-${ARCH}${EXT}"
    else
        tar -czf "dist/${PROJECT}-${OS}-${ARCH}.tar.gz" -C dist "${PROJECT}-${OS}-${ARCH}${EXT}"
    fi
done

# Generate checksums
cd dist
sha256sum *.tar.gz *.zip > checksums.txt
cd ..

echo "Build completed for version $VERSION"
```

### 7. Package Publishing
Automatically publishes to relevant package registries:

**Registry Publishing:**
```bash
# Docker Registry
docker build -t myapp:$VERSION .
docker tag myapp:$VERSION ghcr.io/org/myapp:$VERSION
docker tag myapp:$VERSION ghcr.io/org/myapp:latest
docker push ghcr.io/org/myapp:$VERSION
docker push ghcr.io/org/myapp:latest

# NPM Registry (for Node.js/Deno packages)
npm publish --access public

# Cargo Registry (for Rust crates)
cargo publish

# Go Module (automatic via git tags)
# GOPROXY will automatically index the new tag

# Homebrew Tap Update
# Updates formula with new version and checksums
```

### 8. Notification and Communication
Notifies teams and stakeholders about the release:

**Automated Notifications:**
```bash
# Slack notification
curl -X POST -H 'Content-type: application/json' \
  --data '{
    "text": "🚀 Release v1.3.0 is now available!",
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*MyApp v1.3.0* has been released!\n\n✨ New user profile management\n📊 Real-time notifications\n🔍 Advanced search functionality\n\n<https://github.com/org/myapp/releases/tag/v1.3.0|View Release Notes>"
        }
      }
    ]
  }' \
  $SLACK_WEBHOOK_URL

# Email notification to stakeholders
# Discord webhook
# Teams notification
```

## Release Types

### Standard Release
```
/workflow-release
```
Analyzes commits and creates appropriate version bump.

### Patch Release
```
/workflow-release --type patch
```
Forces a patch version increment (bug fixes only).

### Minor Release
```
/workflow-release --type minor
```
Forces a minor version increment (new features).

### Major Release
```
/workflow-release --type major
```
Forces a major version increment (breaking changes).

### Prerelease
```
/workflow-release --prerelease beta
```
Creates prerelease version (v1.3.0-beta.1).

### Custom Version
```
/workflow-release --version 2.0.0-rc.1
```
Specifies exact version number.

### Dry Run
```
/workflow-release --dry-run
```
Shows what would be released without making changes.

## Configuration
Supports project-specific configuration via `.releaserc.yml`:

```yaml
# Release configuration
release:
  # Version bumping strategy
  version_strategy: "conventional"  # conventional, manual, calendar
  
  # Changelog generation
  changelog:
    include_authors: true
    group_by_type: true
    breaking_changes_section: true
    migration_guide: true
  
  # Build and distribution
  build:
    platforms: ["linux/amd64", "darwin/amd64", "windows/amd64"]
    archive_format: "tar.gz"  # zip for windows
    include_checksums: true
  
  # Publishing targets
  publish:
    github_releases: true
    docker_registry: "ghcr.io"
    npm_registry: true
    homebrew_tap: "org/homebrew-tap"
  
  # Notifications
  notifications:
    slack_webhook: "${SLACK_WEBHOOK_URL}"
    email_recipients: ["releases@company.com"]
    discord_webhook: "${DISCORD_WEBHOOK_URL}"
  
  # Git settings
  git:
    tag_format: "v{version}"
    commit_message: "chore(release): {version}"
    sign_tags: true
```

## Pre-Release Validation
Performs comprehensive checks before releasing:

**Release Checklist:**
- [ ] All tests pass in CI
- [ ] No uncommitted changes in working directory
- [ ] Current branch is main/master
- [ ] Local branch is up to date with remote
- [ ] No security vulnerabilities in dependencies
- [ ] Documentation is up to date
- [ ] Breaking changes are documented
- [ ] Migration guide is provided (if needed)

## Integration with Other Commands
- Uses `/meta-document` to update documentation before release
- Integrates with `/workflow-ci-gen` to ensure proper CI/CD pipeline
- Combines with `/containerize` for Docker image releases
- Uses `/security-harden` security checks before release
````
