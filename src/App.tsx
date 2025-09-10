import React, { lazy, Suspense, useEffect, memo } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, CssBaseline, Box } from '@mui/material'
import {
  ErrorBoundary,
  SiteFooter,
  HeaderNav,
  LazyPage,
  Section,
  SectionHeading,
  SkipToContent,
} from '@/components/Layouts'
import { theme } from '@/theme/theme'
import errorMonitor from '@/utils/errorMonitor'
import performanceMonitor from '@/utils/performance'
import { initializeResourceHints } from '@/utils/resourceHints'

// Optimized lazy loading with preloading hints and priority-based loading
const HomePage = lazy(() =>
  import('@/features/home/page/HomePage').then(module => ({ default: module.HomePage }))
)

const TracksPage = lazy(() =>
  import('@/features/tracks/page/TracksPage').then(module => ({ default: module.TracksPage }))
)
const EventsPage = lazy(() =>
  import('@/features/events/page/EventsPage').then(module => ({ default: module.EventsPage }))
)
const StoriesPage = lazy(() =>
  import('@/features/stories/page/StoriesPage').then(module => ({ default: module.StoriesPage }))
)
const PartnersPage = lazy(() =>
  import('@/features/partners/page/PartnersPage').then(module => ({ default: module.PartnersPage }))
)
const AboutPage = lazy(() =>
  import('@/features/about/page/AboutPage').then(module => ({ default: module.AboutPage }))
)

// Lazy load AccessibilityTester since it's not immediately needed
const AccessibilityTester = lazy(() =>
  import('@/components/Layouts/accessibility/AccessibilityTester').then(module => ({
    default: module.AccessibilityTester,
  }))
)

// Lazy load DebugPanel for production debugging
const DebugPanel = lazy(() =>
  import('@/utils/debugPanel').then(module => ({ default: module.DebugPanel }))
)

// Memoized placeholder pages to prevent unnecessary re-renders
const CareersPage: React.FC = memo(() => (
  <main>
    <Section>
      <SectionHeading level={1} centered>
        Join our team
      </SectionHeading>
      <p>Careers page placeholder</p>
    </Section>
  </main>
))

const PrivacyPage: React.FC = memo(() => (
  <main>
    <Section>
      <SectionHeading level={1} centered>
        Privacy Policy
      </SectionHeading>
      <p>Privacy Policy page placeholder - will contain data protection information</p>
    </Section>
  </main>
))

const ImprintPage: React.FC = memo(() => (
  <main>
    <Section>
      <SectionHeading level={1} centered>
        Imprint
      </SectionHeading>
      <p>Imprint page placeholder - will contain legal information</p>
    </Section>
  </main>
))

// Memoized main App component
const App: React.FC = memo(() => {
  // Initialize performance monitoring and preloading
  useEffect(() => {
    // Initialize resource hints for better loading performance
    initializeResourceHints()

    // Initialize error monitoring
    errorMonitor.init()

    // Only initialize in production or when explicitly enabled
    if (import.meta.env.PROD || import.meta.env.VITE_ENABLE_PERFORMANCE === 'true') {
      performanceMonitor.init()
    }

    // Preload likely-to-be-visited pages after initial load
    const preloadPages = () => {
      // Preload critical home page dependencies immediately
      import('@/features/home/components/HeroSection')

      // Preload tracks page (common next navigation)
      setTimeout(() => {
        import('@/features/tracks/page/TracksPage')
      }, 2000)

      // Preload about page (common footer navigation)
      setTimeout(() => {
        import('@/features/about/page/AboutPage')
      }, 3000)
    }

    // Only preload in production to avoid dev overhead
    if (import.meta.env.PROD) {
      preloadPages()
    }
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
                <Route
                  path="/"
                  element={
                    <LazyPage>
                      <HomePage />
                    </LazyPage>
                  }
                />
                <Route
                  path="/tracks"
                  element={
                    <LazyPage>
                      <TracksPage />
                    </LazyPage>
                  }
                />
                <Route
                  path="/events"
                  element={
                    <LazyPage>
                      <EventsPage />
                    </LazyPage>
                  }
                />
                <Route
                  path="/stories"
                  element={
                    <LazyPage>
                      <StoriesPage />
                    </LazyPage>
                  }
                />
                <Route
                  path="/partners"
                  element={
                    <LazyPage>
                      <PartnersPage />
                    </LazyPage>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <LazyPage>
                      <AboutPage />
                    </LazyPage>
                  }
                />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/imprint" element={<ImprintPage />} />
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
