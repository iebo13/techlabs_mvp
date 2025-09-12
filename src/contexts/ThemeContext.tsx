import React, { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { Theme } from '@mui/material'
import { theme, darkTheme } from '@/theme'

interface ThemeContextType {
  currentTheme: Theme
  isDarkMode: boolean
  toggleTheme: () => void
  setTheme: (isDark: boolean) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
}

const THEME_STORAGE_KEY = 'techlabs-dev-theme'

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (import.meta.env.DEV) {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)

      return savedTheme === 'dark'
    }

    return false
  })

  const currentTheme = isDarkMode ? darkTheme : theme

  const setTheme = (isDark: boolean) => {
    setIsDarkMode(isDark)

    document.documentElement.setAttribute('data-mui-color-scheme', isDark ? 'dark' : 'light')

    if (import.meta.env.DEV) {
      localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light')
    }
  }

  const toggleTheme = () => {
    setTheme(!isDarkMode)
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-mui-color-scheme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  const value: ThemeContextType = {
    currentTheme,
    isDarkMode,
    toggleTheme,
    setTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
