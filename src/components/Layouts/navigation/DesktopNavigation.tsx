import React from 'react'
import { KeyboardArrowDown } from '@mui/icons-material'
import { Box, Button } from '@mui/material'
import { LanguageToggle } from '@/components/LanguageToggle'
import { navigationItems, ctaButtons } from '@/config/data/navigationData'
import { useI18n } from '@/hooks'
import { NavLink } from './NavLink'

export const DesktopNavigation: React.FC = () => {
  const { t } = useI18n()

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, pl: 4, width: '100%' }}>
        {navigationItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              minWidth: 0,
              px: 2,
            }}>
            {t(item.labelKey)}
          </NavLink>
        ))}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button
          variant="text"
          endIcon={<KeyboardArrowDown />}
          aria-label={t('navigation.selectCity')}
          aria-haspopup="true"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            px: 1,
          }}>
          {t('footer.city')}
        </Button>

        {ctaButtons.map(button => (
          <Button
            key={button.path}
            variant={button.variant}
            component={NavLink}
            to={button.path}
            sx={{
              borderRadius: '6px',
              fontWeight: 600,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '150px',
            }}>
            {t(button.labelKey)}
          </Button>
        ))}

        <LanguageToggle />
      </Box>
    </Box>
  )
}

DesktopNavigation.displayName = 'DesktopNavigation'
