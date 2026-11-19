---
name: audit
description: "Runs a security and architecture audit covering hardcoded secrets, input sanitization, auth, dependency vulnerabilities and drift from PROJECT_MANIFEST patterns, then reports findings with remediation priorities. Use when asked to audit the codebase. Requires a PROJECT_MANIFEST file for the architecture and drift checks."
allowed-tools: Read, Grep, Bash(npm audit)
disable-model-invocation: true
---

# Codebase Audit

Perform security and architectural audits:

## Audit Types

### Security Audit

- Check for hardcoded secrets
- Validate input sanitization
- Review authentication/authorization
- Scan for known vulnerabilities
- Check dependency security

### Architecture Audit

- Verify adherence to PROJECT_MANIFEST patterns
- Check for architectural violations
- Validate data flow compliance
- Review API design consistency

### Drift Detection

- Compare current state vs PROJECT_MANIFEST
- Identify pattern deviations
- Flag new anti-patterns
- Check for consistency regression

## Usage

- `/audit` - Full audit (security + architecture)
- `/audit security` - Security audit only
- `/audit --focus=types` - Focus on type safety
- `/audit --quick` - Essential checks only

## Output

Generates audit report with:

- 🔒 Security findings
- 🏗️ Architecture violations
- 📈 Drift metrics
- 🎯 Remediation priorities
