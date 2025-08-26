import React, { memo } from 'react'
import { AppBar, Toolbar, Box, Drawer, useTheme, useMediaQuery } from '@mui/material'
import { useMobileDrawer } from '@/hooks/useMobileDrawer'
import { DesktopNavigation } from './DesktopNavigation'
import { Logo } from './Logo'
import { MobileDrawer } from './MobileDrawer'
import { MobileMenuButton } from './MobileMenuButton'

/**
 * HeaderNav component provides sticky navigation with responsive mobile drawer.
 */
export const HeaderNav: React.FC = memo(() => {
  const theme = useTheme()

  const isXs = useMediaQuery(theme.breakpoints.only('xs'))
  const isSm = useMediaQuery(theme.breakpoints.only('sm'))
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'))

  const { mobileOpen, handleDrawerToggle, handleDrawerClose } = useMobileDrawer()

  const getResponsiveSpacing = () => {
    if (isXs) return { px: 0, py: 1, minHeight: 64 }
    if (isSm) return { px: 0, py: 1.5, minHeight: 68 }
    if (isTablet) return { px: 0, py: 2, minHeight: 72 }

    return { px: 0, py: 1, minHeight: 76 }
  }

  const toolbarSpacing = getResponsiveSpacing()

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        component="nav"
        role="navigation"
        aria-label="Main navigation"
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: {
            xs: '0px 1px 3px rgba(0, 0, 0, 0.15)',
            sm: '0px 2px 4px rgba(0, 0, 0, 0.18)',
            md: '0px 2px 4px rgba(0, 0, 0, 0.2)',
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
        }}
      >
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
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
              gap: { xs: 1, sm: 2, md: 2 },
            }}
          >
            <Logo />

            {!isMobile && <DesktopNavigation />}
          </Box>

          {isMobile && <MobileMenuButton mobileOpen={mobileOpen} onToggle={handleDrawerToggle} />}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerClose}
        id="mobile-navigation-drawer"
        ModalProps={{
          keepMounted: true,
          disableScrollLock: false,
        }}
      >
        <MobileDrawer onClose={handleDrawerClose} />
      </Drawer>
    </>
  )
})

HeaderNav.displayName = 'HeaderNav'
