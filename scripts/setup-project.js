#!/usr/bin/env node

/**
 * Project Setup Script
 * Automates initial project setup and validates configuration
 */

import { execSync } from 'child_process'
import { existsSync, writeFileSync, readFileSync } from 'fs'
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

class ProjectSetup {
  constructor() {
    this.rootDir = process.cwd()
  }

  /**
   * Run a command with error handling
   */
  runCommand(command, description) {
    try {
      log.info(`${description}...`)
      execSync(command, { stdio: 'inherit', cwd: this.rootDir })
      log.success(`${description} completed`)
      return true
    } catch (error) {
      log.error(`${description} failed: ${error.message}`)
      return false
    }
  }

  /**
   * Check if Node.js version matches .nvmrc
   */
  checkNodeVersion() {
    const nvmrcPath = join(this.rootDir, '.nvmrc')
    if (!existsSync(nvmrcPath)) {
      log.warning('No .nvmrc file found - skipping Node.js version check')
      return true
    }

    const expectedVersion = readFileSync(nvmrcPath, 'utf8').trim()
    const currentVersion = process.version.replace('v', '')

    if (!currentVersion.startsWith(expectedVersion)) {
      log.error(`Node.js version mismatch!`)
      log.error(`Expected: ${expectedVersion}`)
      log.error(`Current: ${currentVersion}`)
      log.warning('Run "nvm use" to switch to the correct version')
      return false
    }

    log.success(`Node.js version ${currentVersion} matches requirements`)
    return true
  }

  /**
   * Create .env file from .env.example if it doesn't exist
   */
  setupEnvironment() {
    const envExamplePath = join(this.rootDir, '.env.example')
    const envPath = join(this.rootDir, '.env')

    if (!existsSync(envExamplePath)) {
      log.warning('No .env.example file found - skipping environment setup')
      return true
    }

    if (existsSync(envPath)) {
      log.info('.env file already exists - skipping environment setup')
      return true
    }

    try {
      const envContent = readFileSync(envExamplePath, 'utf8')
      writeFileSync(envPath, envContent)
      log.success('Created .env file from .env.example')
      log.info('Please review and update .env file with your actual values')
      return true
    } catch (error) {
      log.error(`Failed to create .env file: ${error.message}`)
      return false
    }
  }

  /**
   * Install dependencies
   */
  installDependencies() {
    return this.runCommand('npm install', 'Installing dependencies')
  }

  /**
   * Setup Git hooks
   */
  setupGitHooks() {
    return this.runCommand('npm run prepare', 'Setting up Git hooks')
  }

  /**
   * Run initial quality checks
   */
  runQualityChecks() {
    log.info('Running initial quality checks...')

    const checks = [
      { command: 'npm run typecheck', description: 'TypeScript compilation' },
      { command: 'npm run lint', description: 'ESLint checks' },
      { command: 'npm run format', description: 'Prettier formatting' },
      { command: 'npm run test:run', description: 'Unit tests' },
    ]

    let allPassed = true
    for (const check of checks) {
      const passed = this.runCommand(check.command, check.description)
      if (!passed) {
        allPassed = false
      }
    }

    return allPassed
  }

  /**
   * Validate project structure
   */
  validateProjectStructure() {
    log.info('Validating project structure...')

    const requiredFiles = [
      'package.json',
      'tsconfig.json',
      'vite.config.ts',
      'src/main.tsx',
      'src/App.tsx',
    ]

    const requiredDirs = ['src/components', 'src/features', 'src/hooks', 'src/utils', 'src/theme']

    let isValid = true

    // Check required files
    for (const file of requiredFiles) {
      const filePath = join(this.rootDir, file)
      if (!existsSync(filePath)) {
        log.error(`Required file missing: ${file}`)
        isValid = false
      }
    }

    // Check required directories
    for (const dir of requiredDirs) {
      const dirPath = join(this.rootDir, dir)
      if (!existsSync(dirPath)) {
        log.error(`Required directory missing: ${dir}`)
        isValid = false
      }
    }

    if (isValid) {
      log.success('Project structure validation passed')
    } else {
      log.error('Project structure validation failed')
    }

    return isValid
  }

  /**
   * Generate build and test it
   */
  testBuild() {
    log.info('Testing production build...')

    if (!this.runCommand('npm run build', 'Building for production')) {
      return false
    }

    if (
      !this.runCommand(
        'npm run preview & sleep 3 && curl -f http://localhost:4173 && pkill -f "vite preview"',
        'Testing build'
      )
    ) {
      log.warning('Build test failed - you may need to test manually')
      return false
    }

    log.success('Production build test passed')
    return true
  }

  /**
   * Run the complete setup process
   */
  async runSetup() {
    log.info('🚀 Starting TechLabs MVP project setup...')
    console.log()

    const steps = [
      { name: 'Node.js Version Check', fn: () => this.checkNodeVersion() },
      { name: 'Environment Setup', fn: () => this.setupEnvironment() },
      { name: 'Dependency Installation', fn: () => this.installDependencies() },
      { name: 'Git Hooks Setup', fn: () => this.setupGitHooks() },
      { name: 'Project Structure Validation', fn: () => this.validateProjectStructure() },
      { name: 'Quality Checks', fn: () => this.runQualityChecks() },
      { name: 'Build Test', fn: () => this.testBuild() },
    ]

    let successCount = 0
    for (const step of steps) {
      console.log(`\n${'='.repeat(60)}`)
      log.info(`Step ${successCount + 1}/${steps.length}: ${step.name}`)
      console.log()

      const success = step.fn()
      if (success) {
        successCount++
      } else {
        log.error(`Setup failed at step: ${step.name}`)
        break
      }
    }

    console.log(`\n${'='.repeat(60)}`)
    if (successCount === steps.length) {
      log.success('🎉 Project setup completed successfully!')
      console.log()
      log.info('Next steps:')
      log.info('1. Review and update .env file with your actual values')
      log.info('2. Start development server: npm run dev')
      log.info('3. Open http://localhost:3000 in your browser')
      log.info('4. Read docs/setup-guide.md for detailed information')
    } else {
      log.error(`❌ Setup failed after ${successCount}/${steps.length} steps`)
      console.log()
      log.info('To fix issues and retry:')
      log.info('1. Check the error messages above')
      log.info('2. Fix any issues manually')
      log.info('3. Run this script again: node scripts/setup-project.js')
      log.info('4. Or run individual commands as needed')
    }

    return successCount === steps.length
  }
}

// Run setup if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const setup = new ProjectSetup()
  setup
    .runSetup()
    .then(success => {
      process.exit(success ? 0 : 1)
    })
    .catch(error => {
      console.error(`Setup failed with error: ${error}`)
      process.exit(1)
    })
}

export default ProjectSetup
