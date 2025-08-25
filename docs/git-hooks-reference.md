# Git Hooks Reference - TechLabs MVP

## Overview

This document provides a quick reference for the enhanced Git hooks system
implemented in the TechLabs MVP project.

## Hooks Summary

| Hook           | Purpose                          | When It Runs             | Key Checks                                    |
| -------------- | -------------------------------- | ------------------------ | --------------------------------------------- |
| **pre-commit** | Quality validation before commit | Before commit is created | Lint, format, tests, security, commit message |
| **pre-push**   | Production readiness check       | Before pushing to remote | Build, full test suite, security, performance |

## Pre-commit Hook (.husky/pre-commit)

### What It Does

- ✅ **Environment validation** - Node.js, npm availability
- ✅ **Quality checks** - TypeScript, ESLint, Prettier, tests
- ✅ **Security scanning** - Hardcoded secrets, dangerous packages
- ✅ **Commit message format** - Conventional commits validation
- ✅ **Coverage threshold** - Ensures minimum test coverage
- ✅ **Large file detection** - Warns about files >1MB
- ✅ **Sensitive file detection** - Prevents committing .env, keys, etc.

### Bypass When Needed

```bash
# Skip pre-commit checks temporarily
git commit --no-verify -m "emergency fix"

# Or set environment variable
HUSKY=0 git commit -m "skip all hooks"
```

## Pre-push Hook (.husky/pre-push)

### What It Does

- 🏗️ **Production build** - Ensures code builds successfully
- 🧪 **Full test suite** - Runs all tests including integration tests
- 📊 **Test coverage** - Validates coverage meets threshold
- 🔒 **Security checks** - Scans for sensitive files in push
- 📦 **Bundle analysis** - Checks bundle size if configured
- 🔍 **Final validation** - Last-chance linting and type checking
- 📋 **Dependency integrity** - Validates package-lock.json
- ⚡ **Performance check** - Lighthouse audit if available

### Bypass When Needed

```bash
# Skip pre-push checks
git push --no-verify

# Or disable Husky temporarily
HUSKY=0 git push
```

## Commit Message Standards

### Required Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Allowed Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code formatting (no logic change)
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Adding/updating tests
- `chore` - Maintenance tasks
- `ci` - CI/CD changes
- `build` - Build system changes
- `revert` - Reverting changes

### Examples

```bash
# Simple commits
feat: add user authentication
fix: resolve login button issue
docs: update API documentation

# With scope
feat(auth): implement OAuth2 integration
fix(api): handle null user data
perf(images): optimize loading with WebP

# Breaking changes
feat!: migrate to new authentication system
feat(api)!: change user data structure

BREAKING CHANGE: API endpoints restructured
- /api/users -> /api/v2/users
- Update client code accordingly
```

## Troubleshooting

### Common Issues

#### Hook Not Running

```bash
# Check if hooks are installed
ls -la .husky/

# Reinstall hooks
npm run prepare
```

#### Permission Denied

```bash
# Make hooks executable
chmod +x .husky/pre-commit
chmod +x .husky/pre-push
```

#### Node Command Not Found

```bash
# For nvm users, add to ~/.config/husky/init.sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

#### Tests Failing in Hook But Pass Locally

```bash
# Clear cache and reinstall
npm run clean
npm ci
npm run test
```

### Emergency Procedures

#### Bypass All Hooks Temporarily

```bash
# Set environment variable
export HUSKY=0

# Your git commands
git commit -m "emergency fix"
git push

# Re-enable hooks
unset HUSKY
```

#### Fix Broken Hook

```bash
# If a hook is broken, disable it temporarily
mv .husky/pre-commit .husky/pre-commit.disabled

# Fix the issue, then restore
mv .husky/pre-commit.disabled .husky/pre-commit
```

## Quality Gates Summary

### Pre-commit Quality Gates

1. **TypeScript Compilation** ✅ - Code must compile without errors
2. **ESLint Check** ✅ - Code must pass linting rules
3. **Prettier Format** ✅ - Code must be properly formatted
4. **Commit Message** ✅ - Must follow conventional commits
5. **Unit Tests** ✅ - All tests must pass
6. **Test Coverage** ⚠️ - Must meet minimum threshold (80%)
7. **Security Scan** ✅ - No hardcoded secrets or dangerous packages
8. **Bundle Size** ℹ️ - Analysis runs if configured

### Pre-push Quality Gates

1. **Production Build** ✅ - Must build successfully for production
2. **Full Test Suite** ✅ - All tests including integration tests
3. **Test Coverage** ⚠️ - Coverage validation
4. **Security Check** ✅ - No sensitive files in push
5. **Linting** ✅ - Final lint check
6. **Type Check** ✅ - TypeScript compilation
7. **Dependencies** ✅ - package-lock.json integrity
8. **Performance** ℹ️ - Lighthouse audit if configured

### Status Codes

- ✅ **Must Pass** - Will block commit/push if fails
- ⚠️ **Warning** - Will warn but allow commit/push
- ℹ️ **Info** - Informational, runs if available

## Configuration Files

### Hook Scripts

- `.husky/pre-commit` - Pre-commit hook implementation
- `.husky/pre-push` - Pre-push hook implementation
- `scripts/precommit-checks.js` - Quality validation logic

### Configuration

- `commitlint.config.js` - Commit message rules
- `package.json` - Script definitions
- `.lintstagedrc.cjs` - Staged file processing

## Team Guidelines

### For Developers

1. **Always run tests locally** before committing
2. **Write descriptive commit messages** following conventional format
3. **Keep commits atomic** - one logical change per commit
4. **Use scopes consistently** - prefer established scopes
5. **Don't bypass hooks** unless absolutely necessary
6. **Report hook issues** to the team immediately

### For Code Reviews

1. **Verify commit messages** follow conventions
2. **Check that hooks are working** in CI/CD
3. **Ensure quality gates passed** locally
4. **Review any hook bypasses** in the commit history

### For Emergency Situations

1. **Document any hook bypasses** in commit messages
2. **Fix issues immediately** after emergency commits
3. **Run quality checks** on emergency commits as soon as possible
4. **Notify team** of any temporary hook disabling

## Scripts Reference

### Quality Check Scripts

```bash
# Run individual checks
npm run lint          # ESLint check
npm run format        # Prettier check
npm run typecheck     # TypeScript check
npm run test:run      # Run tests once
npm run test:coverage # Run with coverage

# Combined checks
npm run check         # All quality checks
npm run check:fix     # Fix auto-fixable issues
npm run check:all     # Full check with coverage
```

### Hook Management Scripts

```bash
# Setup hooks
npm run prepare       # Install/update Git hooks

# Validation
npm run validate      # Validate project setup
npm run setup         # Complete project setup
```

### Performance Scripts

```bash
# Build and analysis
npm run build         # Production build
npm run build:analyze # Build with bundle analysis
npm run performance   # Lighthouse performance audit
```

## Best Practices

### Commit Workflow

1. **Stage your changes**: `git add .`
2. **Run quality checks**: `npm run check`
3. **Fix any issues**: `npm run check:fix`
4. **Commit with good message**: `git commit -m "feat: add new feature"`
5. **Push when ready**: `git push`

### Troubleshooting Workflow

1. **Check hook status**: `ls -la .husky/`
2. **Test individual scripts**: `npm run lint`, `npm run test`
3. **Clear cache**: `npm run clean && npm ci`
4. **Reinstall hooks**: `npm run prepare`
5. **Check permissions**: `chmod +x .husky/*`

## Support

### Getting Help

1. **Check this documentation** first
2. **Run diagnostics**: `npm run validate`
3. **Check console output** for specific error messages
4. **Ask team members** for assistance
5. **Create issue** in project repository if needed

### Useful Commands

```bash
# Diagnose setup
npm run validate
git config --list | grep hooks

# Reset hooks
rm -rf .husky/
npm run prepare

# Test hooks manually
./.husky/pre-commit
./.husky/pre-push origin main
```

## Version History

- **v2.0.0** - Enhanced hooks with comprehensive validation
- **v1.5.0** - Added security scanning and coverage checks
- **v1.0.0** - Initial hook implementation

---

For more information, see:

- [Conventional Commits](https://conventionalcommits.org/)
- [Husky Documentation](https://typicode.github.io/husky/)
- [Commitlint Documentation](https://commitlint.js.org/)
- [Project Commit Examples](./commit-message-examples.md)
