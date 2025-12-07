import React, { memo } from 'react'
import { Language as LanguageIcon } from '@mui/icons-material'
import { Button, Menu, MenuItem, ListItemIcon, Typography } from '@mui/material'
import { useI18n } from '../../hooks'

export const LanguageToggle: React.FC = memo(() => {
  const { currentLanguage, availableLanguages, changeLanguage, t } = useI18n()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLanguageChange = async (languageCode: string) => {
    await changeLanguage(languageCode)
    handleClose()
  }

  const currentLang = availableLanguages.find(lang => lang.code === currentLanguage)

  return (
    <>
      <Button
        id="language-button"
        aria-controls={open ? 'language-menu' : undefined}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t('accessibility.selectLanguage', { current: currentLang?.name || currentLanguage })}
        onClick={handleClick}
        startIcon={<LanguageIcon aria-hidden="true" />}
        variant="outlined"
        size="small">
        <span aria-hidden="true">{currentLang?.flag}</span>
      </Button>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}>
        {availableLanguages.map(language => (
          <MenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            selected={language.code === currentLanguage}
            aria-current={language.code === currentLanguage ? 'true' : undefined}>
            <ListItemIcon sx={{ minWidth: 36, p: 0, display: 'flex', alignItems: 'center' }} aria-hidden="true">
              {language.flag}
            </ListItemIcon>
            <Typography variant="body2" sx={{ ml: 1 }}>
              {language.name}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
})

LanguageToggle.displayName = 'LanguageToggle'
