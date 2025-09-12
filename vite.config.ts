import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Optimize React for production
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    // Only include bundle analyzer when explicitly requested
    ...(process.env.ANALYZE === 'true'
      ? [
          visualizer({
            filename: 'dist/stats.html',
            open: false,
            gzipSize: true,
            brotliSize: true,
          }),
        ]
      : []),
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
    target: 'es2022', // Target more modern browsers for better compatibility
    minify: 'esbuild', // Use esbuild for better compatibility
    rollupOptions: {
      output: {
        // Let Vite handle chunking automatically to prevent initialization issues
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 500,
    sourcemap: false,
    cssCodeSplit: true,
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
  },
  optimizeDeps: {
    exclude: ['@emotion/babel-plugin'],
  },
  // Performance optimizations
  server: {
    port: 3000,
    host: true,
    hmr: {
      overlay: false,
      port: process.env.VITE_HMR_PORT ? parseInt(process.env.VITE_HMR_PORT) : 24678,
      protocol: 'ws',
      host: process.env.VITE_HMR_HOST || 'localhost',
      timeout: 30000,
      clientPort: process.env.VITE_HMR_PORT ? parseInt(process.env.VITE_HMR_PORT) : 24678,
    },
    strictPort: false,
    open: false,
    watch: {
      usePolling: false,
      interval: 100,
    },
    ...(process.env.NODE_ENV === 'development' && {
      cors: true,
    }),
  },

  experimental: {
    renderBuiltUrl: () => {
      return { relative: true }
    },
  },
})
