import React from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { theme } from './theme/theme'
import { Section } from './components/Section'
import { SectionHeading } from './components/SectionHeading'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <main>
          <Section>
            <SectionHeading level={1} emphasis="gradient" centered>
              TechLabs Website
            </SectionHeading>
            <SectionHeading
              level={2}
              centered
              subtitle="Theme and components are now configured!"
            >
              MVP Theme Foundation
            </SectionHeading>
          </Section>

          <Section variant="paper">
            <SectionHeading level={3}>
              Ready for Development
            </SectionHeading>
            <p>
              The MUI theme system is now configured with design tokens,
              responsive typography, and accessible color contrast.
              Section and SectionHeading components are ready for use throughout the application.
            </p>
          </Section>
        </main>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App