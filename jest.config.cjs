module.exports = {
  // Use ts-jest for TypeScript support
  preset: 'ts-jest',

  // jsdom environment for React component tests
  testEnvironment: 'jsdom',

  // Setup files before environment
  setupFiles: ['<rootDir>/src/test/jest.polyfills.ts'],

  // Setup files after environment
  setupFilesAfterEnv: ['<rootDir>/src/test/jest.setup.ts'],

  // Test file patterns
  testMatch: ['<rootDir>/src/**/__tests__/**/*.(ts|tsx)', '<rootDir>/src/**/*.(test|spec).(ts|tsx)'],

  // Coverage collection
  collectCoverageFrom: [
    'src/**/*.(ts|tsx)',
    '!src/**/*.d.ts',
    '!src/main.tsx',
    '!src/vite-env.d.ts',
    '!src/test/**/*',
    '!src/mocks/**/*',
  ],

  // Module name mapping for static assets and styles
  moduleNameMapper: {
    // Handle CSS imports
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',

    // Handle image and other asset imports
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'jest-transform-stub',

    // Handle absolute imports (if using path mapping)
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // Transform files with ts-jest
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
      },
    ],
  },

  // File extensions to consider
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  // Paths to ignore when running tests
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/', '<rootDir>/coverage/'],

  // Clear mocks between tests
  clearMocks: true,

  // Reset mocks between tests
  resetMocks: true,

  // Coverage directory
  coverageDirectory: 'coverage',

  // Coverage reporters
  coverageReporters: ['text', 'lcov', 'html'],

  // Coverage thresholds (aim for ~70-80% as per specifications)
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },

  // Test timeout
  testTimeout: 10000,

  // Verbose output
  verbose: false,

  // Pass with no tests (for initial setup)
  passWithNoTests: true,

  // Transform ignore patterns
  transformIgnorePatterns: ['node_modules/(?!(.*\\.mjs$|@testing-library))'],
}
