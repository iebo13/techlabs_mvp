#!/usr/bin/env node

/**
 * Setup Validation Script
 * Validates that the project setup is correctly configured
 */

import { execSync } from 'child_process'
import { existsSync, readFileSync } from 'fs'
import { join } from 'path'

const GREEN = '\x1b[32m'
const BLUE = '\x1b[34m'
const YELLOW = '\x1b[33m'
const RED = '\x1b[31m'
const RESET = '\x1b[0m'

const log = {
  info: msg => console.log(`${BLUE}ℹ ${msg}${RESET}`),
  success: msg => console.log(`${GREEN}✅ ${msg}${RESET}`),
  warning: msg => console.log(`${YELLOW}⚠ ${msg}${RESET}`),
  error: msg => console.log(`${RED}❌ ${msg}${RESET}`),
}

class SetupValidator {
  constructor() {
    this.rootDir = process.cwd()
    this.validationResults = []
  }

  /**
   * Add validation result
   */
  addResult(name, passed, message = '') {
    this.validationResults.push({ name, passed, message })
    if (passed) {
      log.success(`${name}: ${message || 'OK'}`)
    } else {
      log.error(`${name}: ${message || 'Failed'}`)
    }
  }

  /**
   * Check if a file exists
   */
  checkFileExists(filePath, description) {
    const exists = existsSync(join(this.rootDir, filePath))
    this.addResult(`File: ${description}`, exists, exists ? `Found at ${filePath}` : `Missing: ${filePath}`)
    return exists
  }

  /**
   * Check Node.js version
   */
  checkNodeVersion() {
    try {
      const nvmrcPath = join(this.rootDir, '.nvmrc')
      if (!existsSync(nvmrcPath)) {
        this.addResult('Node.js Version', true, 'No .nvmrc file - version not enforced')
        return true
      }

      const expectedVersion = readFileSync(nvmrcPath, 'utf8').trim()
      const currentVersion = process.version.replace('v', '')
      const matches = currentVersion.startsWith(expectedVersion)

      this.addResult(
        'Node.js Version',
        matches,
        matches ? `${currentVersion} matches ${expectedVersion}` : `${currentVersion} does not match ${expectedVersion}`
      )
      return matches
    } catch (error) {
      this.addResult('Node.js Version', false, error.message)
      return false
    }
  }

  /**
   * Check dependencies are installed
   */
  checkDependencies() {
    try {
      const nodeModulesExists = existsSync(join(this.rootDir, 'node_modules'))
      const packageLockExists = existsSync(join(this.rootDir, 'package-lock.json'))

      const result = nodeModulesExists && packageLockExists
      this.addResult(
        'Dependencies',
        result,
        result ? 'Dependencies installed' : 'Run npm install to install dependencies'
      )
      return result
    } catch (error) {
      this.addResult('Dependencies', false, error.message)
      return false
    }
  }

  /**
   * Check TypeScript configuration
   */
  checkTypeScriptConfig() {
    const configs = ['tsconfig.json', 'tsconfig.app.json', 'tsconfig.node.json', 'tsconfig.test.json']

    let allValid = true
    for (const config of configs) {
      try {
        const configPath = join(this.rootDir, config)
        if (existsSync(configPath)) {
          const content = readFileSync(configPath, 'utf8')
          JSON.parse(content) // Validate JSON
          this.addResult(`TypeScript Config: ${config}`, true, 'Valid JSON')
        } else {
          this.addResult(`TypeScript Config: ${config}`, false, 'File missing')
          allValid = false
        }
      } catch (error) {
        this.addResult(`TypeScript Config: ${config}`, false, `Invalid JSON: ${error.message}`)
        allValid = false
      }
    }

    return allValid
  }

  /**
   * Check environment configuration
   */
  checkEnvironmentConfig() {
    const envExample = existsSync(join(this.rootDir, '.env.example'))
    const envFile = existsSync(join(this.rootDir, '.env'))

    this.addResult('Environment Template', envExample, envExample ? '.env.example found' : '.env.example missing')

    this.addResult('Environment File', envFile, envFile ? '.env found' : '.env missing - copy from .env.example')

    return envExample
  }

  /**
   * Check Git configuration
   */
  checkGitConfig() {
    try {
      // Check if Git is initialized
      const gitDir = existsSync(join(this.rootDir, '.git'))
      this.addResult('Git Repository', gitDir, gitDir ? 'Git initialized' : 'Git not initialized')

      // Check Husky hooks
      const huskyDir = existsSync(join(this.rootDir, '.husky'))
      const preCommitHook = existsSync(join(this.rootDir, '.husky/pre-commit'))

      this.addResult(
        'Git Hooks',
        huskyDir && preCommitHook,
        huskyDir && preCommitHook ? 'Husky hooks configured' : 'Run npm run prepare'
      )

      return gitDir
    } catch (error) {
      this.addResult('Git Configuration', false, error.message)
      return false
    }
  }

  /**
   * Check build tools configuration
   */
  checkBuildConfig() {
    const viteConfig = this.checkFileExists('vite.config.ts', 'Vite Configuration')
    const eslintConfig = this.checkFileExists('eslint.config.mjs', 'ESLint Configuration')
    const prettierConfig = this.checkFileExists('.prettierrc.json', 'Prettier Configuration')

    return viteConfig && eslintConfig && prettierConfig
  }

  /**
   * Check project structure
   */
  checkProjectStructure() {
    const requiredFiles = [
      { path: 'src/main.tsx', desc: 'Main Entry Point' },
      { path: 'src/App.tsx', desc: 'App Component' },
      { path: 'index.html', desc: 'HTML Template' },
    ]

    const requiredDirs = [
      { path: 'src/components', desc: 'Components Directory' },
      { path: 'src/features', desc: 'Features Directory' },
      { path: 'src/hooks', desc: 'Hooks Directory' },
      { path: 'src/utils', desc: 'Utils Directory' },
      { path: 'src/theme', desc: 'Theme Directory' },
    ]

    let allValid = true

    for (const file of requiredFiles) {
      const exists = this.checkFileExists(file.path, file.desc)
      if (!exists) allValid = false
    }

    for (const dir of requiredDirs) {
      const exists = existsSync(join(this.rootDir, dir.path))
      this.addResult(`Directory: ${dir.desc}`, exists, exists ? `Found at ${dir.path}` : `Missing: ${dir.path}`)
      if (!exists) allValid = false
    }

    return allValid
  }

  /**
   * Test if scripts work
   */
  checkScripts() {
    const scriptsToTest = [
      { command: 'npm run typecheck', name: 'TypeScript Check' },
      { command: 'npm run lint', name: 'ESLint Check' },
      { command: 'npm run format', name: 'Prettier Check' },
    ]

    let allPassed = true

    for (const script of scriptsToTest) {
      try {
        execSync(script.command, { stdio: 'pipe', cwd: this.rootDir })
        this.addResult(script.name, true, 'Script executed successfully')
      } catch (error) {
        this.addResult(script.name, false, `Script failed: ${error.message}`)
        allPassed = false
      }
    }

    return allPassed
  }

  /**
   * Check package.json configuration
   */
  checkPackageJson() {
    try {
      const packagePath = join(this.rootDir, 'package.json')
      if (!existsSync(packagePath)) {
        this.addResult('package.json', false, 'File missing')
        return false
      }

      const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'))

      // Check required fields
      const requiredFields = ['name', 'version', 'type', 'scripts', 'dependencies']
      let allFieldsPresent = true

      for (const field of requiredFields) {
        if (!packageJson[field]) {
          this.addResult(`package.json field: ${field}`, false, 'Field missing')
          allFieldsPresent = false
        }
      }

      if (allFieldsPresent) {
        this.addResult('package.json Structure', true, 'All required fields present')
      }

      // Check if it's a module
      const isModule = packageJson.type === 'module'
      this.addResult('ES Modules', isModule, isModule ? 'type: module configured' : 'type: module missing')

      return allFieldsPresent && isModule
    } catch (error) {
      this.addResult('package.json', false, `Invalid JSON: ${error.message}`)
      return false
    }
  }

  /**
   * Run all validations
   */
  async runValidation() {
    log.info('🔍 Validating TechLabs MVP project setup...')
    console.log()

    const validations = [
      { name: 'Node.js Version', fn: () => this.checkNodeVersion() },
      { name: 'Package Configuration', fn: () => this.checkPackageJson() },
      { name: 'Dependencies', fn: () => this.checkDependencies() },
      { name: 'TypeScript Configuration', fn: () => this.checkTypeScriptConfig() },
      { name: 'Build Tools Configuration', fn: () => this.checkBuildConfig() },
      { name: 'Environment Configuration', fn: () => this.checkEnvironmentConfig() },
      { name: 'Git Configuration', fn: () => this.checkGitConfig() },
      { name: 'Project Structure', fn: () => this.checkProjectStructure() },
      { name: 'Script Execution', fn: () => this.checkScripts() },
    ]

    let passedCount = 0
    for (const validation of validations) {
      console.log(`\n${'-'.repeat(50)}`)
      log.info(`Validating: ${validation.name}`)
      console.log()

      const passed = validation.fn()
      if (passed) {
        passedCount++
      }
    }

    console.log(`\n${'='.repeat(60)}`)
    const allPassed = passedCount === validations.length

    if (allPassed) {
      log.success(`🎉 All ${validations.length} validations passed!`)
      log.info('Your project setup is correctly configured.')
    } else {
      log.warning(`⚠ ${passedCount}/${validations.length} validations passed`)
      log.info('Please fix the issues above and run validation again.')
    }

    // Show summary
    console.log(`\n${'-'.repeat(60)}`)
    log.info('Validation Summary:')
    for (const result of this.validationResults) {
      const status = result.passed ? '✅' : '❌'
      console.log(`  ${status} ${result.name}`)
    }

    console.log()
    if (!allPassed) {
      log.info('To fix issues:')
      log.info('1. Run: node scripts/setup-project.js')
      log.info('2. Or fix issues manually and re-run validation')
      log.info('3. Check docs/setup-guide.md for detailed instructions')
    }

    return allPassed
  }
}

// Run validation if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const validator = new SetupValidator()
  validator
    .runValidation()
    .then(success => {
      process.exit(success ? 0 : 1)
    })
    .catch(error => {
      console.error(`Validation failed with error: ${error}`)
      process.exit(1)
    })
}

export default SetupValidator
