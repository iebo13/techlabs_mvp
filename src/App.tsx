import React, { lazy, Suspense, useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider as MuiThemeProvider, CssBaseline, Box } from '@mui/material'
import { ErrorBoundary } from '@/components/ErrorHandling'
import { SiteFooter, HeaderNav } from '@/components/Layouts'
import { performanceMonitor } from '@/components/PerformanceMonitoring'
import { initializeApp } from '@/config/preload'
import { routes } from '@/config/routes'
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext'
import { AuthProvider } from '@/features/auth/contexts/AuthContext'
import { initializeResourceHints } from '@/utils/resourceHints'

const AccessibilityTester = lazy(() =>
  import('@/components/Layouts/accessibility/AccessibilityTester').then(module => ({
    default: module.AccessibilityTester,
  }))
)

const DebugPanel = lazy(() => import('@/components/ErrorHandling').then(module => ({ default: module.DebugPanel })))

const AppFrame: React.FC = () => {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      {isAdminRoute ? null : <HeaderNav />}
      <Box component="main" id="main-content" sx={{ flex: 1 }} tabIndex={-1}>
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </Box>
      {isAdminRoute ? null : <SiteFooter />}
      <Suspense fallback={null}>
        <AccessibilityTester />
        <DebugPanel />
      </Suspense>
    </Box>
  )
}

const AppContent: React.FC = () => {
  const { currentTheme } = useTheme()

  useEffect(() => {
    initializeResourceHints()

    if (import.meta.env.PROD || import.meta.env.VITE_ENABLE_PERFORMANCE === 'true') {
      performanceMonitor.init()
    }

    initializeApp()
  }, [])

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <MuiThemeProvider theme={currentTheme}>
          <CssBaseline />
          <BrowserRouter>
            <AppFrame />
          </BrowserRouter>
        </MuiThemeProvider>
      </ErrorBoundary>
    </HelmetProvider>
  )
}

const App: React.FC = () => (
  <ThemeProvider>
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  </ThemeProvider>
)

App.displayName = 'App'

export { App }
export default App
