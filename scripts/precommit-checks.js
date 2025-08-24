#!/usr/bin/env node

/**
 * Pre-commit quality checks script
 * Runs all quality gates before allowing commits
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
   * Check for security vulnerabilities
   */
  checkSecurity() {
    try {
      // Check for common security issues in dependencies
      const packageJson = JSON.parse(execSync('cat package.json', { encoding: 'utf8' }))
      const hasSecurityIssues = this.checkForSecurityIssues(packageJson)

      return {
        name: 'Security Check',
        passed: !hasSecurityIssues,
        duration: 0,
        output: hasSecurityIssues
          ? 'Potential security issues found'
          : 'No security issues detected',
      }
    } catch (error) {
      return {
        name: 'Security Check',
        passed: false,
        duration: 0,
        error: error instanceof Error ? error.message : String(error),
      }
    }
  }

  /**
   * Check for potential security issues in dependencies
   */
  checkForSecurityIssues(packageJson) {
    const dangerousPackages = ['eval', 'vm', 'child_process', 'exec', 'spawn']

    const allDeps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    }

    return dangerousPackages.some(pkg => allDeps[pkg])
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
      () => this.checkTests(),
      () => this.checkUnusedImports(),
      () => this.checkBundleSize(),
      () => this.checkSecurity(),
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
