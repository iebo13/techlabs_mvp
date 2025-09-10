import React, { lazy, Suspense, useEffect, memo } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, CssBaseline, Box } from '@mui/material'
import { ErrorBoundary, SiteFooter, HeaderNav, SkipToContent } from '@/components/Layouts'
import { initializeApp } from '@/config/preload'
import { routes } from '@/config/routes'
import { theme } from '@/theme/theme'
import errorMonitor from '@/utils/errorMonitor'
import performanceMonitor from '@/utils/performance'
import { initializeResourceHints } from '@/utils/resourceHints'

const AccessibilityTester = lazy(() =>
  import('@/components/Layouts/accessibility/AccessibilityTester').then(module => ({
    default: module.AccessibilityTester,
  }))
)

const DebugPanel = lazy(() =>
  import('@/utils/debugPanel').then(module => ({ default: module.DebugPanel }))
)

const App: React.FC = memo(() => {
  useEffect(() => {
    initializeResourceHints()
    errorMonitor.init()

    if (import.meta.env.PROD || import.meta.env.VITE_ENABLE_PERFORMANCE === 'true') {
      performanceMonitor.init()
    }

    initializeApp()
  }, [])

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
            <SkipToContent />
            <HeaderNav />
            <Box component="main" id="main-content" sx={{ flex: 1 }} tabIndex={-1}>
              <Routes>
                {routes.map(({ path, element }) => (
                  <Route key={path} path={path} element={element} />
                ))}
              </Routes>
            </Box>
            <SiteFooter />
            <Suspense fallback={null}>
              <AccessibilityTester />
            </Suspense>
            <Suspense fallback={null}>
              <DebugPanel />
            </Suspense>
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  )
})

App.displayName = 'App'

export { App }
export default App
