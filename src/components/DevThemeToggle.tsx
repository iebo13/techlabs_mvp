import React from 'react'
import { Brightness4, Brightness7 } from '@mui/icons-material'
import { IconButton, Tooltip, useTheme as useMuiTheme } from '@mui/material'
import { useTheme } from '@/contexts/ThemeContext'

export const DevThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme()
  const muiTheme = useMuiTheme()

  // Only render in development mode
  if (!import.meta.env.DEV) {
    return null
  }

  return (
    <Tooltip title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode (Dev only)`} placement="bottom">
      <IconButton
        onClick={toggleTheme}
        size="medium"
        sx={{
          color: muiTheme.palette.text.primary,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            color: muiTheme.palette.primary.main,
            backgroundColor: muiTheme.palette.action.hover,
          },
          '@media print': {
            display: 'none',
          },
        }}
        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}>
        {isDarkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  )
}
