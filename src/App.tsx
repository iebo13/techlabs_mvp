import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { ThemeProvider, CssBaseline, Box } from '@mui/material'

import { AccessibilityTester } from '@/components/Layouts/AccessibilityTester'
import { HeaderNav } from '@/components/Layouts/HeaderNav'
import { Section } from '@/components/Layouts/Section'
import { SectionHeading } from '@/components/Layouts/SectionHeading'
import { SiteFooter } from '@/components/Layouts/SiteFooter'
import { SkipToContent } from '@/components/Layouts/SkipToContent'
import { AboutPage } from '@/features/about/page/AboutPage'
import { EventsPage } from '@/features/events/page/EventsPage'
import { HomePage } from '@/features/home/page/HomePage'
import { PartnersPage } from '@/features/partners/page/PartnersPage'
import { StoriesPage } from '@/features/stories/page/StoriesPage'
import { TracksPage } from '@/features/tracks/page/TracksPage'
import { theme } from '@/theme/theme'

// Placeholder pages for navigation

const CareersPage: React.FC = () => (
  <main>
    <Section>
      <SectionHeading level={1} centered>
        Join our team
      </SectionHeading>
      <p>Careers page placeholder</p>
    </Section>
  </main>
)

const PrivacyPage: React.FC = () => (
  <main>
    <Section>
      <SectionHeading level={1} centered>
        Privacy Policy
      </SectionHeading>
      <p>Privacy Policy page placeholder - will contain data protection information</p>
    </Section>
  </main>
)

const ImprintPage: React.FC = () => (
  <main>
    <Section>
      <SectionHeading level={1} centered>
        Imprint
      </SectionHeading>
      <p>Imprint page placeholder - will contain legal information</p>
    </Section>
  </main>
)

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <SkipToContent />
          <HeaderNav />
          <Box component="main" id="main-content" sx={{ flex: 1 }} tabIndex={-1}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tracks" element={<TracksPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/stories" element={<StoriesPage />} />
              <Route path="/partners" element={<PartnersPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/imprint" element={<ImprintPage />} />
            </Routes>
          </Box>
          <SiteFooter />
          <AccessibilityTester />
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export { App }
export default App
