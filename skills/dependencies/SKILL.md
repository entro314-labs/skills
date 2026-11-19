---
name: dependencies
description: "Analyzes project dependencies for security vulnerabilities, outdated packages, version drift, unused or duplicate packages and bundle size impact using npm audit, outdated and ls. Use when asked to check, audit or review dependencies. Supports analyze, security and outdated sub-modes."
allowed-tools: Read, Bash(npm audit), Bash(npm outdated), Bash(npm ls)
disable-model-invocation: true
---

# Dependency Management

Analyze project dependencies for security, updates, and drift prevention:

## Analysis Types

### Security Analysis

- Run npm/yarn audit for vulnerabilities
- Check for known security issues
- Validate dependency sources
- Review license compatibility

### Update Analysis

- Check for outdated packages
- Identify major version updates
- Assess breaking change risks
- Prioritize critical updates

### Drift Analysis

- Compare current vs intended versions
- Identify unexpected dependency additions
- Check for version inconsistencies
- Validate dependency graph health

### Bundle Analysis

- Analyze bundle size impact
- Identify duplicate dependencies
- Check for unused dependencies
- Optimize dependency tree

## Usage

- `/dependencies` - Full dependency analysis
- `/dependencies analyze` - Comprehensive health check
- `/dependencies security` - Security audit only
- `/dependencies outdated` - Check for updates

## Output

Provides analysis with:

- 🔒 Security vulnerabilities found
- 📦 Outdated packages list
- ⚠️ Potential breaking changes
- 💡 Recommended actions
- 📊 Bundle size impact
