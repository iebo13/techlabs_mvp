import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { ThemeProvider, CssBaseline, Box } from '@mui/material'

import { HeaderNav } from './components/HeaderNav'
import { Section } from './components/Section'
import { SectionHeading } from './components/SectionHeading'
import { SiteFooter } from './components/SiteFooter'
import { AboutPage } from './pages/AboutPage'
import { EventsPage } from './pages/EventsPage'
import { HomePage } from './pages/HomePage'
import { PartnersPage } from './pages/PartnersPage'
import { StoriesPage } from './pages/StoriesPage'
import { TracksPage } from './pages/TracksPage'
import { theme } from './theme/theme'

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
          <HeaderNav />
          <Box component="main" sx={{ flex: 1 }}>
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
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export { App }
export default App
