import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  define: {
    // Make environment variables available to the client
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
  },
  plugins: [
    react({
      // Optimize React for production
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
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
  build: {
    target: 'es2015', // Target modern browsers for better tree shaking
    minify: 'esbuild', // Use esbuild for better compatibility
    rollupOptions: {
      output: {
        manualChunks: id => {
          // Vendor chunks with better optimization
          if (id.includes('node_modules')) {
            // Core React chunks
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react'
            }
            // MUI chunks - split by core and icons
            if (id.includes('@mui/material') && !id.includes('@mui/icons-material')) {
              return 'vendor-mui-core'
            }
            if (id.includes('@mui/icons-material')) {
              return 'vendor-mui-icons'
            }
            if (id.includes('@emotion')) {
              return 'vendor-emotion'
            }
            // Router
            if (id.includes('react-router-dom')) {
              return 'vendor-router'
            }
            // Form libraries
            if (id.includes('react-hook-form') || id.includes('@hookform') || id.includes('zod')) {
              return 'vendor-forms'
            }
            // Query library
            if (id.includes('@tanstack/react-query')) {
              return 'vendor-query'
            }
            // Utility libraries
            if (id.includes('date-fns') || id.includes('lodash') || id.includes('ramda')) {
              return 'vendor-utils'
            }
            // Font libraries
            if (id.includes('@fontsource')) {
              return 'vendor-fonts'
            }
            // Other vendor libraries
            return 'vendor-other'
          }

          // Feature chunks with better granularity
          if (id.includes('/features/home/')) {
            return 'feature-home'
          }
          if (id.includes('/features/tracks/')) {
            return 'feature-tracks'
          }
          if (id.includes('/features/events/')) {
            return 'feature-events'
          }
          if (id.includes('/features/stories/')) {
            return 'feature-stories'
          }
          if (id.includes('/features/partners/')) {
            return 'feature-partners'
          }
          if (id.includes('/features/about/')) {
            return 'feature-about'
          }

          // Component chunks with better organization
          if (id.includes('/components/Layouts/')) {
            return 'components-layout'
          }
          if (id.includes('/components/Forms/')) {
            return 'components-forms'
          }
          if (id.includes('/components/Buttons/')) {
            return 'components-buttons'
          }
          if (id.includes('/components/Popups/')) {
            return 'components-popups'
          }

          // Utility chunks
          if (id.includes('/utils/')) {
            return 'utils'
          }
          if (id.includes('/hooks/')) {
            return 'hooks'
          }
          if (id.includes('/theme/')) {
            return 'theme'
          }
        },
        // Optimize chunk loading
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 1000, // Increase warning limit to 1MB
    sourcemap: false, // Disable sourcemaps in production for smaller bundle
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Optimize dependencies
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@mui/material',
      '@mui/icons-material',
      'react-router-dom',
      '@emotion/react',
      '@emotion/styled',
    ],
    exclude: ['@emotion/babel-plugin'], // Exclude build-time dependencies
  },
  // Performance optimizations
  server: {
    hmr: {
      overlay: false, // Disable error overlay for better performance
    },
  },
})
