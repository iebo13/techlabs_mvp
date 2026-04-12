import React, { memo } from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useI18n } from '../../hooks'

export const LanguageToggle: React.FC = memo(() => {
  const { currentLanguage, availableLanguages, changeLanguage, t } = useI18n()

  const handleChange = async (_: React.MouseEvent, value: string | null) => {
    if (value) await changeLanguage(value)
  }

  return (
    <ToggleButtonGroup
      exclusive
      value={currentLanguage}
      onChange={handleChange}
      size="small"
      aria-label={t('accessibility.selectLanguage', { current: currentLanguage })}
      sx={{
        '& .MuiToggleButtonGroup-grouped': {
          border: '1px solid',
          borderColor: 'divider',
          '&:first-of-type': { borderRadius: '8px 0 0 8px' },
          '&:last-of-type': { borderRadius: '0 8px 8px 0' },
          '&.Mui-selected': {
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            borderColor: 'primary.main',
            '&:hover': { backgroundColor: 'primary.dark' },
          },
        },
      }}>
      {availableLanguages.map(lang => (
        <ToggleButton
          key={lang.code}
          value={lang.code}
          aria-label={lang.name}
          sx={{
            px: 1.25,
            py: 0.5,
            fontSize: '0.8125rem',
            fontWeight: 600,
            textTransform: 'none',
            lineHeight: 1.5,
          }}>
          {lang.code.toUpperCase().slice(0, 2)}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
})

LanguageToggle.displayName = 'LanguageToggle'
