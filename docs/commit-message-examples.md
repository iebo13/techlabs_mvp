# Conventional Commit Message Examples

This document provides comprehensive examples of conventional commit messages
following the [Conventional Commits](https://conventionalcommits.org/)
specification.

## Structure

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Commit Types

| Type       | Purpose                                          | Example                                                   |
| ---------- | ------------------------------------------------ | --------------------------------------------------------- |
| `feat`     | New feature                                      | `feat(auth): add user authentication`                     |
| `fix`      | Bug fix                                          | `fix(api): resolve data validation error`                 |
| `docs`     | Documentation changes                            | `docs(readme): update installation guide`                 |
| `style`    | Code style changes (formatting, no logic change) | `style(components): fix indentation in Button.tsx`        |
| `refactor` | Code refactoring (no new features or bug fixes)  | `refactor(utils): simplify date formatting logic`         |
| `perf`     | Performance improvements                         | `perf(images): optimize image loading with lazy loading`  |
| `test`     | Adding or updating tests                         | `test(auth): add unit tests for login validation`         |
| `chore`    | Maintenance tasks, tooling, dependencies         | `chore(deps): update React to v18.3.1`                    |
| `ci`       | CI/CD pipeline changes                           | `ci(github): add automated deployment workflow`           |
| `build`    | Build system or external dependencies            | `build(vite): optimize bundle splitting configuration`    |
| `revert`   | Reverting previous changes                       | `revert: let us never again speak of the noodle incident` |

## Simple Examples

### Basic Commits (No Body)

```bash
# New feature
feat: add user profile page

# Bug fix
fix: resolve login button not responding

# Documentation
docs: correct spelling of CHANGELOG

# Style changes
style: fix code formatting in utils

# Refactoring
refactor: extract validation logic to separate module

# Performance improvement
perf: reduce bundle size by 15%

# Tests
test: add unit tests for user service

# Maintenance
chore: update dependencies to latest versions

# CI/CD
ci: add automated testing workflow

# Build changes
build: configure webpack for production optimization
```

### With Scope

```bash
# Feature with scope
feat(auth): implement OAuth2 integration

# Fix with scope
fix(api): handle null values in user data

# Documentation with scope
docs(contributing): add code review guidelines

# Style with scope
style(components): standardize button spacing

# Refactor with scope
refactor(hooks): simplify useAuth custom hook

# Performance with scope
perf(images): implement WebP format with fallbacks

# Test with scope
test(utils): add comprehensive date utility tests

# Maintenance with scope
chore(eslint): update linting rules configuration

# CI with scope
ci(deploy): add staging environment deployment

# Build with scope
build(docker): optimize container image size
```

## Breaking Changes

### Using `!` Suffix

```bash
# Breaking change with exclamation mark
feat!: migrate to new authentication system

# Breaking change with scope
feat(api)!: change user data structure

# Breaking change in different types
chore!: drop Node 16 support, require Node 18+

# Multiple scopes with breaking change
refactor(auth,api)!: restructure user permissions model
```

### Using BREAKING CHANGE Footer

```bash
# Breaking change with detailed explanation
feat: implement new configuration system

BREAKING CHANGE: Configuration format has changed from JSON to YAML.
Migrate your config.json to config.yaml using the migration script:
npm run migrate-config
```

### Both Methods Combined

```bash
# Using both exclamation and footer for clarity
feat(api)!: redesign REST endpoint structure

BREAKING CHANGE: API endpoints have been restructured.
- /api/users -> /api/v2/users
- /api/auth -> /api/v2/authentication
Update your client code to use the new endpoints.
```

## Detailed Examples with Body and Footer

### Feature Implementation

```bash
feat(payment): implement Stripe payment integration

Add complete payment processing using Stripe API including:
- Credit card payment form validation
- Secure token handling for PCI compliance
- Webhook endpoint for payment confirmations
- Error handling for failed transactions

The implementation follows security best practices and includes
comprehensive error handling for edge cases.

Closes #142
Co-authored-by: Jane Developer <jane@example.com>
```

### Bug Fix with Investigation Details

```bash
fix(performance): resolve memory leak in image carousel

The carousel component was holding references to DOM elements
after component unmounting, causing memory to accumulate over time.

Changes made:
- Add cleanup in useEffect return function
- Implement proper event listener removal
- Clear intersection observer references
- Add memory usage monitoring in development

Performance impact:
- Reduced memory usage by ~40MB after 100 image loads
- Eliminated growing heap size during navigation
- Fixed browser tab crashes on low-memory devices

Fixes #298
Tested-by: QA Team <qa@example.com>
Refs: performance-audit-2024-08
```

### Refactoring with Detailed Explanation

```bash
refactor(components): migrate class components to functional components

Modernize component architecture by converting all class components
to functional components with hooks. This improves:

- Code maintainability and readability
- Tree-shaking optimization
- Bundle size reduction (~12KB)
- Development experience with better debugging
- Consistency across the codebase

Components migrated:
- UserProfile: 145 lines -> 89 lines
- ProductCard: 203 lines -> 127 lines
- NavigationMenu: 167 lines -> 98 lines
- SearchFilter: 234 lines -> 156 lines

All existing functionality preserved with 100% test coverage maintained.

Related: #156, #178, #201
Performance-impact: bundle-size-reduction
```

### Documentation with Context

```bash
docs(api): add comprehensive REST API documentation

Create complete API documentation including:

- Authentication and authorization examples
- Request/response schemas for all endpoints
- Error code definitions and handling
- Rate limiting information and best practices
- SDK usage examples for common scenarios
- Postman collection for manual testing

The documentation is generated from OpenAPI specs and includes
interactive examples that can be executed directly from the docs.

Documentation available at: https://api-docs.techlabs-mvp.com

Addresses: #89, #112, #134
Requested-by: Developer Relations Team
```

### Performance Optimization

```bash
perf(images): implement advanced image optimization pipeline

Implement comprehensive image optimization to improve Core Web Vitals:

Technical improvements:
- WebP/AVIF format generation with fallbacks
- Responsive image sizing with srcset
- Lazy loading with intersection observer
- Progressive JPEG encoding for large images
- Image compression optimization (75% quality)
- CDN integration with automatic optimization

Performance results:
- LCP improved from 4.2s to 1.8s (57% improvement)
- Image payload reduced by 68% on average
- First contentful paint improved by 1.2s
- Cumulative layout shift reduced to 0.08

Browser compatibility:
- WebP: 97% coverage (fallback to JPEG)
- AVIF: 86% coverage (fallback to WebP/JPEG)
- Lazy loading: 98% coverage (native + polyfill)

Lighthouse score improved from 64 to 91.

Closes #245
Performance-audit: lighthouse-2024-08-25
```

### Security Fix

```bash
fix(security): patch XSS vulnerability in comment system

Address cross-site scripting vulnerability discovered in user comment
rendering that could allow malicious script execution.

Security impact:
- Severity: High (CVSS 7.3)
- Attack vector: User-generated content
- Affected versions: v1.2.0 - v1.4.2
- Exploitation: Requires authenticated user

Mitigation implemented:
- Sanitize all HTML input using DOMPurify
- Implement Content Security Policy (CSP)
- Add XSS protection headers
- Escape special characters in output
- Validate input on both client and server

Testing performed:
- Automated security scan with OWASP ZAP
- Manual penetration testing
- Code review by security team
- Regression testing for functionality

No user data was compromised. Users should update immediately.

Security-advisory: SA-2024-001
Fixes: CVE-2024-12345
Discovered-by: Security Research Team <security@example.com>
```

### Complex Feature with Breaking Changes

````bash
feat(auth)!: implement role-based access control (RBAC)

Add comprehensive role-based permissions system to replace the previous
binary admin/user model. This enables fine-grained access control
and better security modeling.

New features:
- Hierarchical role system (Admin > Manager > Editor > Viewer)
- Resource-based permissions (read/write/delete per resource)
- Dynamic permission checking middleware
- Role assignment UI for administrators
- Permission inheritance and override capabilities
- Audit logging for all permission changes

Database changes:
- Add roles table with hierarchical structure
- Add permissions table for resource-action mapping
- Add user_roles junction table for many-to-many relationships
- Migrate existing users: admin->Admin, others->Viewer

API changes:
- New endpoints: /api/roles, /api/permissions
- Modified endpoints: /api/users (now includes role information)
- New middleware: requirePermission(), hasRole()

Frontend changes:
- Permission-aware navigation components
- Role management interface
- Permission guard for sensitive operations

BREAKING CHANGE: User authentication response structure has changed.
The 'isAdmin' boolean field has been replaced with 'roles' array.

Migration required:
1. Run database migration: npm run migrate:roles
2. Update client code to check roles instead of isAdmin
3. Review and update permission requirements

Before:
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "isAdmin": true
  }
}
````

After:

```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "roles": ["Admin", "Editor"],
    "permissions": ["users:read", "users:write", "content:publish"]
  }
}
```

Closes #67, #89, #134, #167 Implements: RFC-2024-003-RBAC Security-review:
passed Breaking-change: authentication-structure Migration-guide:
docs/migrations/v2.0.0-rbac.md

````

## Long Commit Message Example (Complex Feature)

```bash
feat(analytics): implement comprehensive user analytics dashboard

Add a full-featured analytics dashboard providing insights into user
behavior, performance metrics, and business intelligence data.

## Overview

The analytics dashboard provides real-time and historical data analysis
for stakeholders to make informed decisions about product development
and business strategy. The system integrates with multiple data sources
and provides customizable reporting capabilities.

## Features Implemented

### Data Collection
- User interaction tracking (clicks, page views, session duration)
- Performance metrics collection (Core Web Vitals, load times)
- Custom event tracking API for business-specific metrics
- Error monitoring and crash reporting integration
- A/B testing framework with statistical significance calculation

### Dashboard Components
- Interactive charts using Chart.js with customizable time ranges
- Real-time metrics updates via WebSocket connections
- Exportable reports in PDF, CSV, and Excel formats
- Customizable widgets with drag-and-drop interface
- Mobile-responsive design with touch-friendly interactions

### Data Processing Pipeline
- ETL pipeline for processing raw analytics data
- Data aggregation and caching for improved performance
- Automated report generation and delivery via email
- Data retention policies with automatic cleanup
- GDPR-compliant data anonymization

### Security & Privacy
- Role-based access to sensitive analytics data
- Data anonymization for user privacy protection
- Secure API endpoints with rate limiting
- Audit logging for data access and modifications
- GDPR compliance with data deletion capabilities

## Technical Implementation

### Backend Architecture
- Express.js API with MongoDB aggregation pipeline
- Redis caching for frequently accessed metrics
- Bull queue for background data processing
- Elasticsearch integration for fast text search
- GraphQL API for flexible data querying

### Frontend Implementation
- React dashboard with TypeScript for type safety
- React Query for efficient data fetching and caching
- Chart.js integration with custom themes
- Responsive grid layout using CSS Grid
- Accessibility compliance (WCAG 2.1 AA)

### Database Schema
- New collections: analytics_events, user_sessions, reports
- Optimized indexes for time-based queries
- Partitioning strategy for large datasets
- Data archival process for historical data

### Performance Optimizations
- Lazy loading for chart components
- Virtual scrolling for large datasets
- Data compression for API responses
- CDN integration for static assets
- Service worker for offline capability

## Metrics & Impact

### Performance Benchmarks
- Initial dashboard load: <2.5s (target: <3s)
- Chart rendering: <500ms for 10K data points
- Real-time updates: <100ms latency
- Memory usage: <50MB for typical session
- Bundle size impact: +180KB (acceptable for feature scope)

### Business Value
- Reduces manual reporting time by 15 hours/week
- Provides insights into user engagement patterns
- Enables data-driven decision making for product team
- Improves customer retention through behavior analysis
- Supports A/B testing for conversion optimization

## Testing Coverage

### Unit Tests
- 94% code coverage across all analytics modules
- Jest test suites for data processing functions
- Mock integrations for external analytics services
- Property-based testing for statistical calculations

### Integration Tests
- End-to-end testing with Cypress
- API integration tests with real data
- Performance testing under load
- Cross-browser compatibility testing
- Mobile device testing on iOS and Android

### Security Testing
- OWASP security scan (no critical issues)
- Penetration testing by external security firm
- SQL injection prevention verification
- XSS protection validation
- CSRF token implementation verification

## Documentation

### User Documentation
- Administrator setup guide
- End-user dashboard tutorial
- Custom reporting how-to guide
- Troubleshooting and FAQ section

### Developer Documentation
- API reference with example requests
- Database schema documentation
- Analytics event tracking guide
- Deployment and configuration instructions
- Architecture decision records (ADRs)

## Migration & Deployment

### Database Migration
- Zero-downtime migration strategy
- Backward compatibility for 2 versions
- Rollback procedures documented
- Data validation scripts included

### Feature Flags
- Dashboard access controlled by feature flag
- Gradual rollout to user segments
- A/B testing for dashboard engagement
- Easy rollback capability if issues arise

## Dependencies & External Services

### New Dependencies
- chart.js: ^4.2.1 (MIT license)
- date-fns: ^2.29.3 (MIT license)
- elasticsearch: ^8.8.0 (Apache 2.0 license)
- bull: ^4.10.4 (MIT license)

### External Integrations
- Google Analytics 4 for cross-validation
- Mixpanel for advanced cohort analysis
- Sentry for error monitoring integration
- Mailgun for automated report delivery

## Future Enhancements

### Phase 2 Features (Q4 2024)
- Machine learning insights and predictions
- Advanced segmentation and cohort analysis
- Custom SQL query builder for power users
- White-label dashboard for enterprise customers

### Technical Debt
- Migrate remaining Chart.js components to D3.js for flexibility
- Implement GraphQL subscriptions for real-time updates
- Add data streaming for very large datasets
- Optimize database queries with advanced indexing

## Risk Assessment

### Identified Risks
- High memory usage with large datasets (mitigation: pagination)
- Potential data privacy concerns (mitigation: anonymization)
- Complex caching invalidation (mitigation: documented strategies)
- Third-party service dependencies (mitigation: fallback options)

### Monitoring & Alerting
- Performance monitoring with custom metrics
- Error rate alerting via PagerDuty integration
- Data quality monitoring with automated tests
- User engagement tracking for feature adoption

## Compliance & Legal

### Privacy Compliance
- GDPR Article 17 (Right to erasure) implementation
- CCPA compliance for California users
- Cookie consent integration for tracking
- Data processing agreement templates

### Security Compliance
- SOC 2 Type II compliance maintained
- Regular security audits scheduled
- Penetration testing results documented
- Incident response procedures updated

## Team & Acknowledgments

This feature was developed collaboratively by:
- Frontend Team: React dashboard and user experience
- Backend Team: API and data processing pipeline
- Data Team: Analytics algorithms and insights
- DevOps Team: Infrastructure and deployment automation
- QA Team: Comprehensive testing and quality assurance
- Security Team: Privacy and security review
- Product Team: Requirements and user experience design

Special thanks to the beta testing group for valuable feedback
and to the Legal team for privacy compliance guidance.

## References & Resources

- Product Requirements Document: PRD-2024-008-Analytics
- Technical Design Document: TDD-2024-012-Analytics-Dashboard
- Security Review: SEC-2024-005-Analytics
- Performance Benchmarks: PERF-2024-003-Dashboard
- User Research: UXR-2024-007-Analytics-Needs

Implements: #123, #156, #189, #234, #267, #298, #334, #367, #398
Closes: epic-analytics-dashboard
Epic: user-insights-q3-2024
Feature-flag: analytics-dashboard-v1
Security-review: passed-2024-08-15
Performance-review: passed-2024-08-20
Privacy-review: gdpr-compliant-2024-08-18
Deployment-strategy: blue-green-with-feature-flags
Rollback-plan: documented-in-runbook-section-4.2
````

## Best Practices Summary

### ✅ Do

- **Use imperative mood**: "Add feature" not "Added feature"
- **Keep subject line under 50 characters** when possible
- **Capitalize the subject line**
- **Don't end subject line with a period**
- **Use body to explain what and why vs. how**
- **Include ticket/issue references in footer**
- **Use breaking change indicators when appropriate**
- **Be specific about scope when relevant**

### ❌ Don't

- Use vague descriptions like "fix bug" or "update code"
- Mix multiple unrelated changes in one commit
- Include implementation details in subject line
- Use past tense ("Fixed" instead of "Fix")
- Exceed 72 characters per line in body
- Forget to explain the reasoning behind changes
- Skip testing information for complex changes

### 📝 Template for Complex Commits

```bash
<type>(<scope>): <short description>

<longer description explaining what changed and why>

<any breaking changes or migration notes>

<references to issues, PRs, or other resources>
Closes #123
Co-authored-by: Name <email@example.com>
Security-review: passed
Performance-impact: improved
```

## Tools and Validation

- **Commitlint**: Automatically validates commit message format
- **Husky**: Runs validation before commits are created
- **Conventional Changelog**: Generates changelogs from commit history
- **Semantic Release**: Automates versioning based on commit types

For more information, see:

- [Conventional Commits Specification](https://conventionalcommits.org/)
- [Angular Commit Message Guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)
- [Semantic Versioning](https://semver.org/)
