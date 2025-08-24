import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/features': path.resolve(__dirname, './src/features'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/theme': path.resolve(__dirname, './src/theme'),
      '@/config': path.resolve(__dirname, './src/config'),
      '@/contexts': path.resolve(__dirname, './src/contexts'),
      '@/styles': path.resolve(__dirname, './src/styles'),
      '@/assets': path.resolve(__dirname, './src/assets'),
      '@/mocks': path.resolve(__dirname, './src/mocks'),
    },
  },
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
