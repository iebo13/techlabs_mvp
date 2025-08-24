import React from 'react'
import { KeyboardArrowDown } from '@mui/icons-material'
import { Box, Button } from '@mui/material'
import { navigationItems, ctaButtons } from '@/config/data/navigationData'
import { NavLink } from './NavLink'

/**
 * DesktopNavigation - Renders the desktop navigation menu
 * Extracted from HeaderNav for better separation of concerns
 */
export const DesktopNavigation: React.FC = () => {
  return (
    <>
      {/* Desktop Navigation */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {navigationItems.map(item => (
          <Box key={item.path} sx={{ display: 'flex', alignItems: 'center' }}>
            <NavLink to={item.path}>{item.label}</NavLink>
          </Box>
        ))}
      </Box>

      {/* Right cluster: Locale + CTAs */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        {/* Locale/City selector */}
        <Button
          variant="text"
          endIcon={<KeyboardArrowDown />}
          sx={{
            fontWeight: 700,
            color: 'primary.main',
            px: 1,
            py: 0.5,
            minWidth: 'auto',
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
        >
          Düsseldorf / EN
        </Button>

        {/* CTAs */}
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          {ctaButtons.map(button => (
            <Button
              key={button.path}
              variant={button.variant}
              component={NavLink}
              to={button.path}
              size="large"
              sx={{
                height: 48,
                borderRadius: '999px',
                fontWeight: 800,
                px: 3,
                minWidth: 'fit-content',
                whiteSpace: 'nowrap',
                ...(button.variant === 'outlined' && {
                  borderWidth: '2px',
                  '&:hover': {
                    borderWidth: '2px',
                  },
                }),
              }}
            >
              {button.label}
            </Button>
          ))}
        </Box>
      </Box>
    </>
  )
}
