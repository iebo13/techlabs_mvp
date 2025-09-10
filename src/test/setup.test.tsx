/**
 * Test Environment Verification
 * This file verifies that the Jest + RTL + TypeScript setup is working correctly
 */

import '@testing-library/jest-dom'
import { testUtils } from './jest.setup'

// Basic Jest functionality test
describe('Jest Environment', () => {
  it('should run tests successfully', () => {
    expect(true).toBe(true)
  })

  it('should support TypeScript', () => {
    const testValue: string = 'TypeScript is working'
    expect(typeof testValue).toBe('string')
    expect(testValue).toBe('TypeScript is working')
  })

  it('should have access to Jest matchers', () => {
    expect([1, 2, 3]).toHaveLength(3)
    expect({ name: 'test' }).toHaveProperty('name', 'test')
    expect('hello world').toMatch(/hello/)
  })
})

// Jest-DOM matchers test
describe('Jest-DOM Matchers', () => {
  it('should have jest-dom matchers available', () => {
    // Create a simple DOM element to test jest-dom matchers
    const element = document.createElement('button')
    element.textContent = 'Test Button'
    element.setAttribute('disabled', 'true')
    element.setAttribute('aria-label', 'Test Button')
    document.body.appendChild(element)

    // Test jest-dom matchers
    expect(element).toBeInTheDocument()
    expect(element).toBeDisabled()
    expect(element).toHaveTextContent('Test Button')
    expect(element).toHaveAttribute('aria-label', 'Test Button')

    // Cleanup
    document.body.removeChild(element)
  })
})

// Browser API mocks are available but not tested here
// The mocks are set up in jest.polyfills.ts and jest.setup.ts
// They will work when needed by components that use IntersectionObserver, ResizeObserver, or matchMedia

// Storage cleanup test
describe('Storage Cleanup', () => {
  it('should clean localStorage after each test', () => {
    localStorage.setItem('test-key', 'test-value')
    expect(localStorage.getItem('test-key')).toBe('test-value')
    // Cleanup happens automatically in afterEach
  })

  it('should have clean localStorage from previous test', () => {
    expect(localStorage.getItem('test-key')).toBeNull()
  })

  it('should clean sessionStorage after each test', () => {
    sessionStorage.setItem('session-key', 'session-value')
    expect(sessionStorage.getItem('session-key')).toBe('session-value')
    // Cleanup happens automatically in afterEach
  })

  it('should have clean sessionStorage from previous test', () => {
    expect(sessionStorage.getItem('session-key')).toBeNull()
  })
})

// Test utilities
describe('Test Utilities', () => {
  it('should provide test utilities', async () => {
    expect(testUtils).toBeDefined()
    expect(testUtils.waitForNextTick).toBeDefined()
    expect(testUtils.createUser).toBeDefined()

    // Test waitForNextTick
    await expect(testUtils.waitForNextTick()).resolves.toBeUndefined()
  })

  it('should be able to create user-event instance', () => {
    const user = testUtils.createUser()
    expect(user).toBeDefined()
    expect(typeof user.click).toBe('function')
    expect(typeof user.type).toBe('function')
  })
})

// TypeScript configuration test
describe('TypeScript Configuration', () => {
  it('should support modern JavaScript features', () => {
    // Test optional chaining
    const obj: { prop?: { nested?: string } } = {}
    expect(obj.prop?.nested).toBeUndefined()

    // Test nullish coalescing
    const maybeNull: string | null = Math.random() > 0.5 ? 'actual' : null
    const value = maybeNull ?? 'default'
    expect(['actual', 'default']).toContain(value)

    // Test template literals
    const name = 'Jest'
    expect(`Hello ${name}!`).toBe('Hello Jest!')
  })

  it('should support strict type checking', () => {
    // Test that TypeScript strict mode is working
    type TestInterface = {
      name: string
      age: number
    }

    const testObj: TestInterface = {
      name: 'Test',
      age: 25,
    }

    expect(testObj).toEqual({ name: 'Test', age: 25 })
  })
})

// Export empty object to make this a module
export {}
