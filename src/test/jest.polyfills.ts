/**
 * Jest Polyfills
 * This file runs before the test environment is set up
 * and provides necessary polyfills for MSW and other libraries
 */

// Polyfill for TextEncoder/TextDecoder in Node.js environment
import { TextEncoder, TextDecoder } from 'util'

// Make TextEncoder and TextDecoder globally available
Object.assign(global, { TextEncoder, TextDecoder })

// Polyfill for fetch API in Node.js environment (jsdom should provide this in newer versions)
// MSW will provide fetch polyfill when needed for HTTP mocking

// Mock IntersectionObserver for components that use it (common with MUI)
Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  value: jest.fn(() => {
    return {
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
      root: null,
      rootMargin: '0px',
      thresholds: [0],
    }
  }),
})

// Mock ResizeObserver for MUI components and responsive design
Object.defineProperty(global, 'ResizeObserver', {
  writable: true,
  value: jest.fn(() => {
    return {
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }
  }),
})
