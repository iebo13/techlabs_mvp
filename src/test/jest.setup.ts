/**
 * Jest setup file for testing environment
 * This file is run after the test environment is set up but before each test file
 */

// Import jest-dom custom matchers
import '@testing-library/jest-dom'

// Import userEvent for test utilities
import userEvent from '@testing-library/user-event'

// Note: MSW setup is available but commented out until needed in specific tests
// Uncomment and configure when you need HTTP mocking in your tests

/* MSW server setup example:
import { server } from './mocks/server';

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'warn' });
});

afterEach(() => {
  server.resetHandlers();
  localStorage.clear();
  sessionStorage.clear();
});

afterAll(() => {
  server.close();
});
*/

// Basic cleanup after each test
afterEach(() => {
  // Clear localStorage after each test
  localStorage.clear()

  // Clear sessionStorage after each test
  sessionStorage.clear()
})

// Note: matchMedia mock moved to jest.polyfills.ts to avoid being reset by clearMocks

// Mock window.scrollTo for components that use it
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true,
})

// Mock HTMLElement.scrollIntoView
Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
  value: jest.fn(),
  writable: true,
})

// Mock getComputedStyle for CSS-dependent tests
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    display: 'block',
    visibility: 'visible',
    getPropertyValue: () => '',
  }),
  writable: true,
})

// Configure console warnings/errors for cleaner test output
const originalConsoleError = console.error
const originalConsoleWarn = console.warn

beforeAll(() => {
  // Filter out common React/MUI warnings that don't affect test validity
  console.error = (...args: unknown[]) => {
    const message = typeof args[0] === 'string' ? args[0] : ''

    // Skip known warnings that are safe to ignore in tests
    const ignoredWarnings = [
      'Warning: ReactDOM.render is deprecated',
      'Warning: componentWillReceiveProps has been renamed',
      'Warning: componentWillMount has been renamed',
      'Warning: componentWillUpdate has been renamed',
    ]

    if (ignoredWarnings.some(warning => message.includes(warning))) {
      return
    }

    originalConsoleError(...args)
  }

  console.warn = (...args: unknown[]) => {
    const message = typeof args[0] === 'string' ? args[0] : ''

    // Skip common MUI warnings in test environment
    const ignoredWarnings = [
      'Material-UI: the `css` function is deprecated',
      'MUI: The `css` function is deprecated',
    ]

    if (ignoredWarnings.some(warning => message.includes(warning))) {
      return
    }

    originalConsoleWarn(...args)
  }
})

afterAll(() => {
  // Restore original console methods
  console.error = originalConsoleError
  console.warn = originalConsoleWarn
})

// Global test utilities (optional - can be imported as needed)
export const testUtils = {
  // Helper to wait for next tick
  waitForNextTick: () => new Promise(resolve => setTimeout(resolve, 0)),

  // Helper to create test user for user-event
  createUser: () => userEvent.setup(),
}
