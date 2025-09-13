import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { errorReportingService } from '@/components/ErrorHandling'
import App from './App.tsx'
import './theme/fonts'
import './theme/global.css'
import './internationalization'

errorReportingService.initialize()

document.documentElement.lang = 'en'
// Theme attribute is now managed by ThemeContext

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)
