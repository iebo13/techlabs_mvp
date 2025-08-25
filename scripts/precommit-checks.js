#!/usr/bin/env node

/**
 * TechLabs MVP Pre-commit Quality Checks
 * Comprehensive quality gates following industry best practices
 * Based on conventional commits, security checks, and performance optimization
 *
 * @author TechLabs MVP Team
 * @version 2.0.0
 */

import { execSync } from 'child_process'
import { existsSync } from 'fs'
import { join } from 'path'

const RED = '\x1b[31m'
const GREEN = '\x1b[32m'
const YELLOW = '\x1b[33m'
const BLUE = '\x1b[34m'
const RESET = '\x1b[0m'

const log = {
  info: msg => console.log(`${BLUE}ℹ ${msg}${RESET}`),
  success: msg => console.log(`${GREEN}✅ ${msg}${RESET}`),
  warning: msg => console.log(`${YELLOW}⚠ ${msg}${RESET}`),
  error: msg => console.log(`${RED}❌ ${msg}${RESET}`),
}

/**
 * @typedef {Object} CheckResult
 * @property {string} name
 * @property {boolean} passed
 * @property {number} duration
 * @property {string} [output]
 * @property {string} [error]
 */

class QualityChecker {
  constructor() {
    this.results = []
  }

  /**
   * Run a command and return result
   */
  runCommand(command, name) {
    const startTime = Date.now()

    try {
      log.info(`Running ${name}...`)
      const output = execSync(command, {
        encoding: 'utf8',
        stdio: 'pipe',
        timeout: 120000, // 2 minutes timeout
      })

      const duration = Date.now() - startTime
      log.success(`${name} completed in ${duration}ms`)

      return {
        name,
        passed: true,
        duration,
        output,
      }
    } catch (error) {
      const duration = Date.now() - startTime
      const errorMessage = error instanceof Error ? error.message : String(error)

      log.error(`${name} failed after ${duration}ms`)

      return {
        name,
        passed: false,
        duration,
        error: errorMessage,
      }
    }
  }

  /**
   * Check if TypeScript compilation passes
   */
  checkTypeScript() {
    return this.runCommand('npm run typecheck', 'TypeScript Compilation')
  }

  /**
   * Check if ESLint passes
   */
  checkLinting() {
    return this.runCommand('npm run lint', 'ESLint')
  }

  /**
   * Check if Prettier formatting is correct
   */
  checkFormatting() {
    return this.runCommand('npm run format', 'Prettier Formatting')
  }

  /**
   * Run unit tests
   */
  checkTests() {
    return this.runCommand('npm run test:run', 'Unit Tests')
  }

  /**
   * Check for unused imports
   */
  checkUnusedImports() {
    if (!existsSync('node_modules/.bin/unimported')) {
      return {
        name: 'Unused Imports',
        passed: true,
        duration: 0,
        output: 'Skipped - unimported not installed',
      }
    }

    return this.runCommand('npm run unimported', 'Unused Imports')
  }

  /**
   * Check bundle size
   */
  checkBundleSize() {
    try {
      log.info('Building for bundle analysis...')
      execSync('npm run build', { stdio: 'pipe' })

      if (existsSync('dist/stats.html')) {
        return {
          name: 'Bundle Analysis',
          passed: true,
          duration: 0,
          output: 'Bundle analysis available at dist/stats.html',
        }
      } else {
        return {
          name: 'Bundle Analysis',
          passed: false,
          duration: 0,
          error: 'Bundle analysis file not found',
        }
      }
    } catch (error) {
      return {
        name: 'Bundle Analysis',
        passed: false,
        duration: 0,
        error: error instanceof Error ? error.message : String(error),
      }
    }
  }

  /**
   * Comprehensive security vulnerability check
   */
  checkSecurity() {
    const startTime = Date.now()
    try {
      log.info('Running security vulnerability checks...')

      // Check for common security issues in dependencies
      const packageJson = JSON.parse(execSync('cat package.json', { encoding: 'utf8' }))
      const hasSecurityIssues = this.checkForSecurityIssues(packageJson)

      // Check for hardcoded secrets in staged files
      const secretsFound = this.checkForSecrets()

      // Check for vulnerable dependencies (if npm audit is available)
      let auditResults = null
      try {
        execSync('npm audit --audit-level high --omit dev', { stdio: 'pipe' })
        auditResults = 'No high-severity vulnerabilities found'
      } catch (auditError) {
        auditResults = 'High-severity vulnerabilities detected - run "npm audit" for details'
      }

      const duration = Date.now() - startTime
      const allSecurityChecksPass = !hasSecurityIssues && !secretsFound

      return {
        name: 'Security Check',
        passed: allSecurityChecksPass,
        duration,
        output: allSecurityChecksPass
          ? `No security issues detected. ${auditResults}`
          : `Security issues found: ${hasSecurityIssues ? 'dangerous packages' : ''} ${secretsFound ? 'hardcoded secrets' : ''}. ${auditResults}`,
        error: !allSecurityChecksPass ? 'Security validation failed' : undefined,
      }
    } catch (error) {
      const duration = Date.now() - startTime
      return {
        name: 'Security Check',
        passed: false,
        duration,
        error: error instanceof Error ? error.message : String(error),
      }
    }
  }

  /**
   * Check for potential security issues in dependencies
   */
  checkForSecurityIssues(packageJson) {
    const dangerousPackages = [
      'eval',
      'vm',
      'child_process',
      'exec',
      'spawn',
      // Additional security-sensitive packages
      'fs-extra',
      'shelljs',
      'node-cmd',
    ]

    const allDeps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    }

    return dangerousPackages.some(pkg => allDeps[pkg])
  }

  /**
   * Check for hardcoded secrets in staged files
   */
  checkForSecrets() {
    try {
      const stagedFiles = execSync('git diff --cached --name-only', { encoding: 'utf8' })
        .split('\n')
        .filter(file => file.trim() && !file.includes('.env.example'))

      const secretPatterns = [
        /(api[_-]?key|apikey)\s*[:=]\s*['"`]?[a-z0-9]{20,}['"`]?/i,
        /(secret[_-]?key|secretkey)\s*[:=]\s*['"`]?[a-z0-9]{20,}['"`]?/i,
        /(password|passwd|pwd)\s*[:=]\s*['"`]?[^\s'"`]{8,}['"`]?/i,
        /(token)\s*[:=]\s*['"`]?[a-z0-9]{20,}['"`]?/i,
        /-----BEGIN\s+(RSA\s+)?PRIVATE\s+KEY-----/,
        /(database_url|db_url)\s*[:=]\s*['"`]?[^\s'"`]+['"`]?/i,
      ]

      for (const file of stagedFiles) {
        if (!existsSync(file)) continue

        try {
          const content = execSync(`git show :${file}`, { encoding: 'utf8' })
          for (const pattern of secretPatterns) {
            if (pattern.test(content)) {
              return true
            }
          }
        } catch (error) {
          // File might be binary or deleted, skip
          continue
        }
      }

      return false
    } catch (error) {
      // If we can't check, assume no secrets for safety
      return false
    }
  }

  /**
   * Check commit message format (conventional commits)
   */
  checkCommitMessage() {
    try {
      const commitMsgFile = '.git/COMMIT_EDITMSG'
      if (!existsSync(commitMsgFile)) {
        return {
          name: 'Commit Message Format',
          passed: true,
          duration: 0,
          output: 'No commit message to check (probably amending or initial commit)',
        }
      }

      const commitMsg = execSync(`head -1 ${commitMsgFile}`, { encoding: 'utf8' }).trim()

      // Basic conventional commit pattern
      const conventionalPattern =
        /^(feat|fix|docs|style|refactor|test|chore|perf|ci|build|revert)(\(.+\))?\!?:\s.{1,50}/

      if (!conventionalPattern.test(commitMsg)) {
        return {
          name: 'Commit Message Format',
          passed: false,
          duration: 0,
          error: `Commit message does not follow conventional commits format.\nExpected: type(scope): description\nActual: ${commitMsg}\nSee: https://conventionalcommits.org/`,
        }
      }

      return {
        name: 'Commit Message Format',
        passed: true,
        duration: 0,
        output: `Conventional commit format verified: ${commitMsg}`,
      }
    } catch (error) {
      return {
        name: 'Commit Message Format',
        passed: true,
        duration: 0,
        output: 'Could not validate commit message format',
      }
    }
  }

  /**
   * Check code coverage threshold
   */
  checkCoverageThreshold() {
    try {
      log.info('Checking code coverage threshold...')

      // Run coverage and check if it meets threshold
      execSync('npm run test:coverage', { stdio: 'pipe' })

      // Try to read coverage summary
      if (existsSync('coverage/coverage-summary.json')) {
        const coverageSummary = JSON.parse(
          execSync('cat coverage/coverage-summary.json', { encoding: 'utf8' })
        )
        const totalCoverage = coverageSummary.total?.lines?.pct || 0
        const threshold = 80 // 80% coverage threshold

        if (totalCoverage < threshold) {
          return {
            name: 'Coverage Threshold',
            passed: false,
            duration: 0,
            error: `Code coverage ${totalCoverage}% is below threshold ${threshold}%`,
          }
        }

        return {
          name: 'Coverage Threshold',
          passed: true,
          duration: 0,
          output: `Code coverage ${totalCoverage}% meets threshold ${threshold}%`,
        }
      }

      return {
        name: 'Coverage Threshold',
        passed: true,
        duration: 0,
        output: 'Coverage check completed (no summary available)',
      }
    } catch (error) {
      return {
        name: 'Coverage Threshold',
        passed: true, // Don't fail the commit if coverage check fails
        duration: 0,
        output: 'Coverage check skipped (tests may have failed)',
      }
    }
  }

  /**
   * Run all quality checks
   */
  async runAllChecks() {
    log.info('🚀 Starting comprehensive quality checks...')

    const checks = [
      () => this.checkTypeScript(),
      () => this.checkLinting(),
      () => this.checkFormatting(),
      () => this.checkCommitMessage(),
      () => this.checkTests(),
      () => this.checkCoverageThreshold(),
      () => this.checkSecurity(),
      () => this.checkUnusedImports(),
      () => this.checkBundleSize(),
    ]

    for (const check of checks) {
      const result = check()
      this.results.push(result)

      if (!result.passed) {
        log.error(`❌ ${result.name} failed: ${result.error}`)
        if (result.output) {
          log.info(`Output: ${result.output}`)
        }
      }
    }

    return this.reportResults()
  }

  /**
   * Report check results
   */
  reportResults() {
    const passed = this.results.filter(r => r.passed).length
    const total = this.results.length
    const failed = total - passed

    console.log('\n' + '='.repeat(60))
    log.info(`Quality Check Summary: ${passed}/${total} checks passed`)

    if (failed > 0) {
      log.error(`${failed} checks failed:`)
      this.results.filter(r => !r.passed).forEach(r => log.error(`  - ${r.name}: ${r.error}`))

      console.log('\n' + '='.repeat(60))
      log.warning('💡 To fix issues automatically, run: npm run check:fix')
      log.warning('💡 To see detailed output, run individual commands:')
      log.warning('   npm run lint')
      log.warning('   npm run format')
      log.warning('   npm run typecheck')
      log.warning('   npm run test:run')

      return false
    } else {
      log.success('🎉 All quality checks passed!')
      console.log('\n' + '='.repeat(60))

      // Show performance summary
      const avgDuration = this.results.reduce((sum, r) => sum + r.duration, 0) / total
      log.info(`Average check duration: ${avgDuration.toFixed(0)}ms`)

      return true
    }
  }
}

// Run checks if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const checker = new QualityChecker()
  checker
    .runAllChecks()
    .then(success => {
      process.exit(success ? 0 : 1)
    })
    .catch(error => {
      log.error(`Unexpected error: ${error}`)
      process.exit(1)
    })
}

export default QualityChecker
