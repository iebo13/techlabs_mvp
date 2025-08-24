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
    target: 'es2020', // Target more modern browsers for better compatibility
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
    include: [
      // Core React dependencies - pre-bundle for faster dev
      'react',
      'react-dom',
      'react-dom/client',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      // MUI core components and icons
      '@mui/material/styles',
      '@mui/material/Button',
      '@mui/material/Typography',
      '@mui/material/Box',
      '@mui/material/Container',
      '@mui/icons-material',
      // Emotion core
      '@emotion/react',
      '@emotion/styled',
      '@emotion/cache',
      // Router essentials
      'react-router-dom',
    ],
    exclude: [
      '@emotion/babel-plugin',
      'firebase',
    ],
    force: true,
    entries: ['src/main.tsx'],
  },
  // Performance optimizations
  server: {
    port: 3000,
    host: true,
    hmr: {
      overlay: false,
      port: 24678,
      protocol: 'ws',
      host: '127.0.0.1',
      timeout: 30000,
    },
    fs: {
      allow: ['..'],
    },
    strictPort: false,
    open: false,
    ...(process.env.NODE_ENV === 'development' && {
      cors: true,
      hmr: {
        ...(process.env.VITE_HMR_HOST && { host: process.env.VITE_HMR_HOST }),
        ...(process.env.VITE_HMR_PORT && { port: parseInt(process.env.VITE_HMR_PORT) }),
      },
    }),
  },

  experimental: {
    renderBuiltUrl: () => {
      return { relative: true }
    },
  },
})
