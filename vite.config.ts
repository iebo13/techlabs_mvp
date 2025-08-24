import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
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
    rollupOptions: {
      output: {
        manualChunks: id => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react'
            }
            if (id.includes('@mui') || id.includes('@emotion')) {
              return 'vendor-mui'
            }
            if (id.includes('react-router-dom')) {
              return 'vendor-router'
            }
            if (id.includes('react-hook-form') || id.includes('@hookform') || id.includes('zod')) {
              return 'vendor-forms'
            }
            if (id.includes('@tanstack/react-query')) {
              return 'vendor-query'
            }
            if (id.includes('date-fns')) {
              return 'vendor-utils'
            }
            if (id.includes('@fontsource')) {
              return 'vendor-fonts'
            }
            // Other vendor libraries
            return 'vendor-other'
          }

          // Feature chunks
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

          // Component chunks
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
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase warning limit to 1MB
    sourcemap: false, // Disable sourcemaps in production for smaller bundle
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@mui/material', '@mui/icons-material', 'react-router-dom'],
  },
})
