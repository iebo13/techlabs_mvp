import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Language as LanguageIcon } from '@mui/icons-material'
import { Button, Menu, MenuItem, ListItemIcon } from '@mui/material'

const languages = [
  { code: 'en', flag: 'US' },
  { code: 'de', flag: 'DE' },
]

export const LanguageToggle: React.FC = memo(() => {
  const { i18n } = useTranslation()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode)
    handleClose()
  }

  const currentLanguage = languages.find(lang => lang.code === i18n.language)

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
        {currentLanguage?.flag}
      </Button>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {languages.map(language => (
          <MenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            selected={language.code === i18n.language}
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
