import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    typecheck: {
      tsconfig: './tsconfig.test.json',
    },
    // Optimize resource usage to prevent EMFILE errors
    pool: 'forks',
    poolOptions: {
      forks: {
        maxForks: 1, // Further reduce concurrent workers
        minForks: 1,
      },
    },
    // Reduce file handle pressure by limiting concurrent operations
    maxConcurrency: 1,
    // Sequential test execution
    sequence: {
      concurrent: false,
    },
    // Clean up between test files
    isolate: true,
    // Add timeout to prevent hanging tests
    testTimeout: 60000,
    // Optimize dependencies
    deps: {
      optimizer: {
        web: {
          enabled: true,
          exclude: ['@mui/icons-material'],
        },
      },
    },
  },
})
