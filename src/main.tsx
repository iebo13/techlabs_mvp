import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/global.css'

// Fix for MUI v7 locale initialization error
// Set document language to English to prevent MUI from trying to access other locales
document.documentElement.lang = 'en'
document.documentElement.setAttribute('data-mui-color-scheme', 'light')

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)
