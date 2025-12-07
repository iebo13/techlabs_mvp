import React from 'react'
import { Brightness4, Brightness7 } from '@mui/icons-material'
import { IconButton, Tooltip, useTheme as useMuiTheme } from '@mui/material'
import { useTheme } from '@/contexts/ThemeContext'
import { useI18n } from '@/hooks'

export const DevThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme()
  const muiTheme = useMuiTheme()
  const { t } = useI18n()

  // Only render in development mode
  if (!import.meta.env.DEV) {
    return null
  }

  const mode = isDarkMode ? t('theme.light') : t('theme.dark')
  const tooltipText = `${t('theme.switchTo', { mode })} ${t('theme.devOnly')}`

  return (
    <Tooltip title={tooltipText} placement="bottom">
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
        aria-label={t('theme.switchTo', { mode })}>
        {isDarkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  )
}
