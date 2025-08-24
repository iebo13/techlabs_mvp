import React, { useState, useEffect } from 'react'

import { Menu as MenuIcon, KeyboardArrowDown } from '@mui/icons-material'
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Drawer,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material'

import { navigationItems, ctaButtons } from '@/config/data/navigationData'

import { Logo } from './Logo'
import { MobileDrawer } from './MobileDrawer'
import { NavLink } from './NavLink'

/**
 * HeaderNav component provides sticky navigation with responsive mobile drawer.
 * Includes elevation on scroll, accessibility features, and branded CTAs.
 */
export const HeaderNav: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = useState(false)
  // Removed scroll state as header styling is now consistent per Figma requirements

  // Handle drawer toggle
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  // Handle drawer close
  const handleDrawerClose = () => {
    setMobileOpen(false)
  }

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileOpen) {
        handleDrawerClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [mobileOpen])

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileOpen])

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)', // Consistent hairline border
          boxShadow: 'none', // No shadows per Figma
        }}
      >
        <Toolbar sx={{ px: { xs: 2, sm: 3, md: 4 }, minHeight: { xs: 64, md: 72 } }}>
          {/* Left cluster: Logo + Nav */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mr: 'auto' }}>
            <Logo />

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {navigationItems.map(item => (
                  <Box key={item.path} sx={{ display: 'flex', alignItems: 'center' }}>
                    <NavLink to={item.path}>{item.label}</NavLink>
                  </Box>
                ))}
              </Box>
            )}
          </Box>

          {/* Right cluster: Locale + CTAs */}
          {!isMobile && (
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
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              edge="end"
              onClick={handleDrawerToggle}
              aria-label="open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-drawer"
              sx={{
                color: 'text.primary',
                '&:focus-visible': {
                  outline: `3px solid ${theme.palette.primary.main}40`,
                  outlineOffset: 2,
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerClose}
        id="mobile-navigation-drawer"
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        PaperProps={{
          sx: {
            backgroundColor: 'background.paper',
            '& .MuiBackdrop-root': {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        }}
      >
        <MobileDrawer onClose={handleDrawerClose} />
      </Drawer>
    </>
  )
}
