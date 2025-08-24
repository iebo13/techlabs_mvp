import React, { lazy, Suspense, useEffect, memo } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, CssBaseline, Box } from '@mui/material'
import { HeaderNav } from '@/components/Layouts/HeaderNav'
import { LazyPage } from '@/components/Layouts/LazyPage'
import { Section } from '@/components/Layouts/Section'
import { SectionHeading } from '@/components/Layouts/SectionHeading'
import { SiteFooter } from '@/components/Layouts/SiteFooter'
import { SkipToContent } from '@/components/Layouts/SkipToContent'
import { theme } from '@/theme/theme'
import performanceMonitor from '@/utils/performance'

// Optimized lazy loading with preloading hints
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
  import('@/components/Layouts/AccessibilityTester').then(module => ({
    default: module.AccessibilityTester,
  }))
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
  // Initialize performance monitoring only once
  useEffect(() => {
    // Only initialize in production or when explicitly enabled
    if (import.meta.env.PROD || import.meta.env.VITE_ENABLE_PERFORMANCE === 'true') {
      performanceMonitor.init()
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
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
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  )
})

App.displayName = 'App'

export { App }
export default App
