/**
 * Jest setup file for testing environment
 * This file is run before each test file
 */
// Jest environment setup for jsdom
import 'jest-environment-jsdom';
// Mock IntersectionObserver for components that use it
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));
// Mock ResizeObserver for MUI components
global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}));
// Mock matchMedia for responsive design tests
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});
// Extend Jest matchers if needed
// import '@testing-library/jest-dom';
// Configure console warnings for tests
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;
beforeAll(() => {
    console.error = (...args) => {
        if (typeof args[0] === 'string' && args[0].includes('Warning: ReactDOM.render is deprecated')) {
            return;
        }
        originalConsoleError.call(console, ...args);
    };
    console.warn = (...args) => {
        if (typeof args[0] === 'string' &&
            args[0].includes('componentWillReceiveProps has been renamed')) {
            return;
        }
        originalConsoleWarn.call(console, ...args);
    };
});
afterAll(() => {
    console.error = originalConsoleError;
    console.warn = originalConsoleWarn;
});
