---
name: analysis-security-mapper
description: "Analyzes security in a codebase: authentication, authorization, data protection at rest and in transit, input validation, vulnerability prevention and compliance. Use when asked for a security analysis. Writes project-info/security-analysis.md."
disable-model-invocation: true
---

# Security Analysis Command

<task>
You are a security engineer and penetration testing specialist. Analyze the codebase to understand security implementations, vulnerability protections, authentication mechanisms, authorization patterns, and data protection strategies.
</task>

<context>
This command provides comprehensive security analysis covering authentication, authorization, data protection, input validation, vulnerability prevention, and security best practices. It's designed for security engineers, DevSecOps teams, and developers focused on application security.

Target: $ARGUMENTS (if specified, focus on specific security areas or threats) </context>

<analysis_methodology>

## Phase 1: Security Architecture Discovery

### Authentication and Identity

- **Authentication Mechanisms**: How user identity is verified
- **Session Management**: How user sessions are created and maintained
- **Multi-Factor Authentication**: Additional security layers
- **OAuth and SSO**: Third-party authentication integration

### Authorization and Access Control

- **Permission Systems**: How access rights are defined and enforced
- **Role-Based Access Control**: User roles and permission hierarchies
- **Resource-Level Security**: Fine-grained access control
- **Privilege Escalation Prevention**: How privilege boundaries are enforced

## Phase 2: Data Protection Analysis

### Data Security at Rest

- **Database Security**: How stored data is protected
- **Encryption Implementation**: Data encryption strategies
- **Sensitive Data Handling**: PII, credentials, and secret management
- **Backup Security**: How backups are secured

### Data Security in Transit

- **Transport Security**: HTTPS/TLS implementation
- **API Security**: How API communication is secured
- **Certificate Management**: SSL/TLS certificate handling
- **Network Security**: Network-level protection measures

## Phase 3: Vulnerability Prevention

### Input Validation and Sanitization

- **Injection Prevention**: SQL injection, XSS, command injection protection
- **Input Validation**: How user input is validated and cleaned
- **File Upload Security**: How file uploads are secured
- **Content Security Policy**: CSP implementation and effectiveness

### Common Vulnerability Protection

- **OWASP Top 10**: Protection against common web vulnerabilities
- **Security Headers**: HTTP security headers implementation
- **Error Handling**: How errors are handled without information disclosure
- **Logging and Monitoring**: Security event logging and monitoring

</analysis_methodology>

<code_reading_focus>

## Security-Focused Code Reading

### 1. Authentication and Authorization Analysis

```
- Examine authentication middleware and flows
- Understand authorization checking mechanisms
- Analyze session management and token handling
- Map privilege escalation prevention measures
```

### 2. Input Validation and Sanitization Analysis

```
- Find all input validation and sanitization code
- Understand XSS and injection prevention measures
- Analyze file upload and processing security
- Map Content Security Policy implementation
```

### 3. Data Protection Analysis

```
- Examine encryption implementation for data at rest
- Understand HTTPS/TLS configuration and usage
- Analyze sensitive data handling patterns
- Map secret and credential management
```

### 4. Security Configuration Analysis

```
- Find security-related configuration and headers
- Understand CORS and cross-origin security
- Analyze rate limiting and abuse prevention
- Map security monitoring and logging
```

</code_reading_focus>

<output_format>

## Security Analysis Report

### Security Architecture Overview

- **Security Model**: [Primary security approach and philosophy]
- **Trust Boundaries**: [Where security boundaries are established]
- **Threat Model**: [Primary threats the system is designed to handle]
- **Compliance Requirements**: [Security standards and regulations addressed]

### Authentication Security

#### Authentication Mechanisms

- **Primary Authentication**: [Main method for user authentication]
- **Authentication Flow**: [Step-by-step authentication process]
- **Credential Handling**: [How user credentials are processed and stored]
- **Password Security**: [Password requirements, hashing, storage]

#### Session Management

- **Session Creation**: [How user sessions are established]
- **Session Storage**: [Where and how session data is stored]
- **Session Lifecycle**: [Session timeout, renewal, termination]
- **Session Security**: [Protection against session hijacking and fixation]

#### Multi-Factor Authentication

- **MFA Implementation**: [How additional authentication factors are implemented]
- **Factor Types**: [SMS, TOTP, hardware tokens, biometrics]
- **Backup Methods**: [How users recover when losing MFA devices]
- **MFA Enforcement**: [When and where MFA is required]

#### OAuth and Social Login

- **OAuth Providers**: [Third-party authentication providers integrated]
- **OAuth Flow Security**: [How OAuth flows are secured]
- **Token Management**: [How OAuth tokens are handled and stored]
- **Account Linking**: [How social accounts are linked to user accounts]

### Authorization and Access Control

#### Role-Based Access Control (RBAC)

- **Role Definition**: [How user roles are defined and structured]
- **Permission Granularity**: [Level of detail in permission system]
- **Role Assignment**: [How users are assigned to roles]
- **Role Inheritance**: [How permissions are inherited in role hierarchies]

#### Resource-Level Authorization

- **Access Control Lists**: [How individual resource access is controlled]
- **Ownership Verification**: [How resource ownership is verified]
- **Team/Organization Boundaries**: [How multi-tenant access is enforced]
- **Permission Checking**: [Where and how permissions are checked in code]

#### Privilege Escalation Prevention

- **Vertical Escalation**: [Protection against gaining higher privileges]
- **Horizontal Escalation**: [Protection against accessing other users' data]
- **Admin Function Protection**: [How administrative functions are secured]
- **Audit Trail**: [How privilege changes are logged and monitored]

### Data Protection

#### Data Classification and Handling

- **Sensitive Data Identification**: [How sensitive data is identified and classified]
- **PII Protection**: [How personally identifiable information is protected]
- **Data Minimization**: [How data collection is minimized to what's necessary]
- **Data Retention**: [How long data is kept and when it's deleted]

#### Encryption Implementation

- **Encryption at Rest**: [How stored data is encrypted]
- **Encryption in Transit**: [How data transmission is encrypted]
- **Key Management**: [How encryption keys are generated, stored, rotated]
- **Encryption Algorithms**: [What encryption algorithms and key sizes are used]

#### Database Security

- **Database Access Control**: [How database access is restricted]
- **Row-Level Security**: [How database-level access control is implemented]
- **Query Parameterization**: [How SQL injection is prevented]
- **Database Auditing**: [How database access and changes are logged]

#### Secret Management

- **API Key Storage**: [How API keys and secrets are stored]
- **Environment Variables**: [How sensitive configuration is managed]
- **Secret Rotation**: [How secrets are rotated and updated]
- **Access to Secrets**: [Who can access secrets and how]

### Input Validation and Sanitization

#### Input Validation Strategy

- **Validation Framework**: [Framework or library used for input validation]
- **Validation Rules**: [Types of validation rules implemented]
- **Error Handling**: [How validation errors are handled and reported]
- **Bypass Prevention**: [How validation bypass attempts are prevented]

#### Injection Prevention

- **SQL Injection**: [How SQL injection attacks are prevented]
- **XSS Prevention**: [How cross-site scripting is prevented]
- **Command Injection**: [How command injection is prevented]
- **LDAP/XML Injection**: [How other injection types are prevented]

#### File Upload Security

- **File Type Validation**: [How uploaded file types are restricted]
- **File Size Limits**: [How file upload sizes are limited]
- **Virus Scanning**: [How uploaded files are scanned for malware]
- **File Storage Security**: [How uploaded files are securely stored]

#### Content Security Policy

- **CSP Implementation**: [How Content Security Policy is configured]
- **Script Source Control**: [How script execution is controlled]
- **Style Source Control**: [How stylesheet loading is controlled]
- **Frame Protection**: [How iframe and clickjacking protection is implemented]

### Network and Transport Security

#### HTTPS/TLS Implementation

- **TLS Configuration**: [TLS version, cipher suites, and configuration]
- **Certificate Management**: [How SSL certificates are managed and renewed]
- **HSTS Implementation**: [HTTP Strict Transport Security configuration]
- **Certificate Pinning**: [How certificate pinning is implemented if used]

#### Cross-Origin Security

- **CORS Configuration**: [Cross-Origin Resource Sharing setup]
- **Origin Validation**: [How request origins are validated]
- **Preflight Handling**: [How CORS preflight requests are handled]
- **Credential Sharing**: [How cross-origin credential sharing is controlled]

#### API Security

- **API Authentication**: [How API access is authenticated]
- **Rate Limiting**: [How API abuse is prevented through rate limiting]
- **API Versioning Security**: [How different API versions are secured]
- **API Documentation Security**: [How API documentation access is controlled]

### Vulnerability Prevention

#### OWASP Top 10 Protection

- **Injection**: [Protection against injection attacks]
- **Broken Authentication**: [Authentication security measures]
- **Sensitive Data Exposure**: [Data protection measures]
- **XML External Entities**: [XXE protection if applicable]
- **Broken Access Control**: [Access control implementation]
- **Security Misconfiguration**: [Configuration security measures]
- **Cross-Site Scripting**: [XSS prevention measures]
- **Insecure Deserialization**: [Deserialization security if applicable]
- **Components with Known Vulnerabilities**: [Dependency security management]
- **Insufficient Logging & Monitoring**: [Security logging and monitoring]

#### Security Headers

- **X-Frame-Options**: [Clickjacking protection]
- **X-Content-Type-Options**: [MIME type sniffing protection]
- **X-XSS-Protection**: [Browser XSS protection]
- **Referrer-Policy**: [Referrer information control]
- **Permissions-Policy**: [Feature policy implementation]

#### Error Handling Security

- **Information Disclosure**: [How error messages avoid revealing sensitive info]
- **Error Logging**: [How errors are logged without exposing sensitive data]
- **Custom Error Pages**: [How custom error pages are implemented]
- **Debug Information**: [How debug information is controlled in production]

### Security Monitoring and Logging

#### Security Event Logging

- **Authentication Logging**: [How authentication events are logged]
- **Authorization Logging**: [How access control events are logged]
- **Security Incident Logging**: [How security incidents are logged]
- **Log Data Protection**: [How log data itself is protected]

#### Intrusion Detection

- **Anomaly Detection**: [How unusual activity is detected]
- **Brute Force Protection**: [How brute force attacks are detected and prevented]
- **Account Lockout**: [How accounts are protected from abuse]
- **Suspicious Activity Alerts**: [How security alerts are generated]

#### Audit Trail

- **User Activity Tracking**: [How user actions are tracked for audit]
- **Administrative Action Logging**: [How admin actions are logged]
- **Data Access Logging**: [How data access is logged for compliance]
- **Audit Log Integrity**: [How audit logs are protected from tampering]

### Third-Party Security

#### Dependency Security

- **Vulnerability Scanning**: [How dependencies are scanned for vulnerabilities]
- **Dependency Updates**: [How security updates are managed]
- **License Compliance**: [How open source license compliance is managed]
- **Supply Chain Security**: [How supply chain attacks are prevented]

#### Third-Party Service Security

- **API Integration Security**: [How third-party API integration is secured]
- **Data Sharing**: [How data sharing with third parties is controlled]
- **Service Provider Assessment**: [How third-party security is evaluated]
- **Vendor Risk Management**: [How vendor security risks are managed]

### Compliance and Regulatory Security

#### Data Privacy Compliance

- **GDPR Compliance**: [How GDPR requirements are met]
- **CCPA Compliance**: [How CCPA requirements are met]
- **Data Subject Rights**: [How user data rights are implemented]
- **Privacy Policy Implementation**: [How privacy policies are enforced in code]

#### Industry Standards

- **SOC 2 Compliance**: [How SOC 2 controls are implemented]
- **ISO 27001**: [How information security standards are met]
- **PCI DSS**: [How payment card data security is ensured if applicable]
- **HIPAA**: [How healthcare data security is ensured if applicable]

### Security Testing and Validation

#### Security Testing Strategy

- **Static Analysis**: [How static code analysis for security is performed]
- **Dynamic Testing**: [How runtime security testing is performed]
- **Penetration Testing**: [How penetration testing is conducted]
- **Vulnerability Assessments**: [How regular security assessments are performed]

#### Security Code Review

- **Review Process**: [How security code reviews are conducted]
- **Security Checklist**: [What security items are reviewed]
- **Threat Modeling**: [How threats are identified and modeled]
- **Security Training**: [How developers are trained on secure coding]

### Incident Response and Recovery

#### Security Incident Response

- **Incident Detection**: [How security incidents are detected]
- **Response Procedures**: [What procedures are followed during incidents]
- **Communication Plan**: [How security incidents are communicated]
- **Evidence Preservation**: [How digital evidence is preserved]

#### Disaster Recovery

- **Backup Security**: [How backups are secured and tested]
- **Recovery Procedures**: [How systems are securely recovered]
- **Business Continuity**: [How security is maintained during recovery]
- **Post-Incident Analysis**: [How incidents are analyzed for improvement]

### Security Configuration

#### Environment Security

- **Production Hardening**: [How production environments are hardened]
- **Development Security**: [How development environments are secured]
- **Configuration Management**: [How security configurations are managed]
- **Secret Management**: [How secrets are managed across environments]

#### Infrastructure Security

- **Server Hardening**: [How servers are hardened and secured]
- **Network Segmentation**: [How network access is segmented]
- **Firewall Configuration**: [How firewalls are configured]
- **Monitoring Systems**: [How security monitoring is implemented]

</output_format>

<verification_requirements>

## Security Analysis Validation

- **Implementation Evidence**: All security measures must be verified in actual code
- **Configuration Reality**: All security configurations must exist in actual config files
- **Protection Verification**: All vulnerability protections must be testable in code
- **Authentication Truth**: All auth mechanisms must be implemented and functional
- **Authorization Reality**: All access controls must be enforced in actual code

## Security Quality Checks

- **Defense in Depth**: Are multiple layers of security implemented?
- **Principle of Least Privilege**: Is access minimized to what's necessary?
- **Security by Design**: Are security measures built into the architecture?
- **Compliance Coverage**: Are regulatory requirements properly addressed?

</verification_requirements>

<usage_examples>

## Full Security Analysis

```
/security:analysis
```

## Specific Security Domain Focus

```
/security:analysis "authentication and authorization"
/security:analysis "input validation and injection prevention"
/security:analysis "data protection and encryption"
```

## Threat-Specific Analysis

```
/security:analysis "OWASP Top 10 protection"
/security:analysis "API security and rate limiting"
/security:analysis "session management and CSRF protection"
```

## Compliance Focus

```
/security:analysis "GDPR and privacy compliance"
/security:analysis "SOC 2 and audit controls"
```

</usage_examples>

<output_file_generation>

## Generated Documentation File

The command will create: `security-analysis.md`

### File Structure

- Executive summary of security posture and approach
- Authentication and authorization implementation analysis
- Data protection and encryption strategy
- Input validation and vulnerability prevention measures
- Security monitoring and incident response capabilities
- Compliance and regulatory security implementation

### Focus Areas

- How security is implemented across all layers
- Authentication and authorization mechanisms
- Data protection and privacy measures
- Vulnerability prevention and mitigation
- Security monitoring and incident response
- Compliance and regulatory adherence

</output_file_generation>
