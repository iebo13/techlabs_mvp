/**
 * Jest Polyfills
 * This file runs before the test environment is set up
 * and provides necessary polyfills for MSW and other libraries
 */
// Polyfill for TextEncoder/TextDecoder in Node.js environment
import { TextEncoder, TextDecoder } from 'util';
// Make TextEncoder and TextDecoder globally available
Object.assign(global, { TextEncoder, TextDecoder });
// Polyfill for fetch API in Node.js environment (jsdom should provide this in newer versions)
// MSW will provide fetch polyfill when needed for HTTP mocking
// Mock IntersectionObserver for components that use it (common with MUI)
global.IntersectionObserver = jest
    .fn()
    .mockImplementation((callback) => ({
    callback,
    root: null,
    rootMargin: '0px',
    thresholds: [0],
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));
// Mock ResizeObserver for MUI components and responsive design
global.ResizeObserver = jest.fn().mockImplementation((callback) => ({
    callback,
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));
// Mock window.matchMedia for responsive design tests
// This needs to be in polyfills to avoid being reset by clearMocks
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    }),
});
