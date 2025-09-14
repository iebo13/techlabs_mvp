import React, { memo } from 'react'
import { Language as LanguageIcon } from '@mui/icons-material'
import { Button, Menu, MenuItem, ListItemIcon } from '@mui/material'
import { useI18n } from '../../hooks'

export const LanguageToggle: React.FC = memo(() => {
  const { currentLanguage, availableLanguages, changeLanguage } = useI18n()
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
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={<LanguageIcon />}
        variant="outlined"
        size="small"
      >
        {currentLang?.flag}
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
        }}
      >
        {availableLanguages.map(language => (
          <MenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            selected={language.code === currentLanguage}
          >
            <ListItemIcon sx={{ minWidth: 36, p: 0, display: 'flex', alignItems: 'center' }}>
              {language.flag}
            </ListItemIcon>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
})

LanguageToggle.displayName = 'LanguageToggle'
