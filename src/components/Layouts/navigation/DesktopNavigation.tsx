import React from 'react'
import { Box, Button, Divider } from '@mui/material'
import { LanguageToggle } from '@/components/LanguageToggle'
import { navigationItems, ctaButtons } from '@/config/data/navigationData'
import { useI18n } from '@/hooks'
import { NavLink } from './NavLink'

export const DesktopNavigation: React.FC = () => {
  const { t } = useI18n()

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
      {/* Centered nav links */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, pl: 4 }}>
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

      {/* Right section */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {ctaButtons.map(button => (
            <Button
              key={button.path}
              variant={button.variant}
              component={NavLink}
              to={button.path}
              size="small"
              sx={{
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.875rem',
                whiteSpace: 'nowrap',
                px: 2,
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: button.variant === 'contained' ? '0 2px 8px rgba(0,0,0,0.18)' : 'none',
                  transform: button.variant === 'contained' ? 'translateY(-1px)' : undefined,
                },
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              }}>
              {t(button.labelKey)}
            </Button>
          ))}
        </Box>
        <Divider orientation="vertical" flexItem sx={{ mx: 0.75, my: 1 }} />
        <LanguageToggle />
      </Box>
    </Box>
  )
}

DesktopNavigation.displayName = 'DesktopNavigation'
