import React from 'react'
import { AppBar, Toolbar, Box, Drawer, useTheme, useMediaQuery } from '@mui/material'
import { DevThemeToggle } from '@/components/DevThemeToggle'
import { LanguageToggle } from '@/components/LanguageToggle'
import { SkipToContent } from '../accessibility/SkipToContent'
import { DesktopNavigation } from './DesktopNavigation'
import { Logo } from './Logo'
import { MobileDrawer } from './MobileDrawer'
import { MobileMenuButton } from './MobileMenuButton'
import { useMobileDrawer } from './useMobileDrawer'

export const HeaderNav: React.FC = () => {
  const theme = useTheme()

  const isXs = useMediaQuery(theme.breakpoints.only('xs'))
  const isSm = useMediaQuery(theme.breakpoints.only('sm'))
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'))

  const { mobileOpen, handleDrawerToggle, handleDrawerClose, triggerButtonRef } = useMobileDrawer()

  const getResponsiveSpacing = () => {
    if (isXs) return { px: 2, py: 1, minHeight: 64 }
    if (isSm) return { px: 0, py: 1.5, minHeight: 68 }
    if (isTablet) return { px: 0, py: 2, minHeight: 72 }

    return { px: 0, py: 1, minHeight: 76 }
  }

  const toolbarSpacing = getResponsiveSpacing()

  return (
    <>
      <SkipToContent />
      <AppBar
        position="sticky"
        elevation={0}
        component="nav"
        role="navigation"
        aria-label="Main navigation"
        sx={{
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(26, 26, 26, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom:
            theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: {
            xs: theme.palette.mode === 'dark' ? '0px 1px 3px rgba(0, 0, 0, 0.3)' : '0px 1px 3px rgba(0, 0, 0, 0.15)',
            sm: theme.palette.mode === 'dark' ? '0px 2px 4px rgba(0, 0, 0, 0.4)' : '0px 2px 4px rgba(0, 0, 0, 0.18)',
            md: theme.palette.mode === 'dark' ? '0px 2px 4px rgba(0, 0, 0, 0.5)' : '0px 2px 4px rgba(0, 0, 0, 0.2)',
          },
          zIndex: theme.zIndex.appBar,
          userSelect: 'none',
          width: '100vw',
          left: 0,
          right: 0,
          paddingTop: {
            xs: 'env(safe-area-inset-top, 0px)',
            md: 0,
          },
        }}>
        <Toolbar
          sx={{
            ...toolbarSpacing,
            width: '100%',
            minHeight: {
              xs: '64px !important',
              sm: '68px !important',
              md: '72px !important',
              lg: '76px !important',
            },
          }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
              gap: { xs: 1, sm: 2, md: 2 },
            }}>
            <Logo />

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 1, sm: 1.5, md: 2 },
              }}>
              {!isMobile && <DesktopNavigation />}
              <LanguageToggle />
              <DevThemeToggle />

              {isMobile && (
                <MobileMenuButton ref={triggerButtonRef} mobileOpen={mobileOpen} onToggle={handleDrawerToggle} />
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerClose}
        id="mobile-navigation-drawer"
        sx={{
          padding: 0,
          margin: 0,
        }}
        ModalProps={{
          keepMounted: true,
          disableScrollLock: false,
          'aria-modal': true,
          role: 'dialog',
          'aria-labelledby': 'mobile-drawer-title',
          'aria-describedby': 'mobile-drawer-description',
        }}>
        <MobileDrawer onClose={handleDrawerClose} />
      </Drawer>
    </>
  )
}

HeaderNav.displayName = 'HeaderNav'
