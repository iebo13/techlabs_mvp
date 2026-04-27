import React from 'react'
import { AppBar, Toolbar, SwipeableDrawer, useTheme, useMediaQuery } from '@mui/material'
import { useI18n } from '@/hooks'
import { SkipToContent } from '../accessibility/SkipToContent'
import { DesktopNavigation } from './DesktopNavigation'
import { Logo } from './Logo'
import { MobileDrawer } from './MobileDrawer'
import { MobileMenuButton } from './MobileMenuButton'
import { useMobileDrawer } from './useMobileDrawer'

const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent)

export const HeaderNav: React.FC = () => {
  const theme = useTheme()
  const { t } = useI18n()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const { mobileOpen, handleDrawerToggle, handleDrawerOpen, handleDrawerClose, triggerButtonRef } = useMobileDrawer()

  return (
    <>
      <SkipToContent />
      <AppBar
        position="sticky"
        elevation={0}
        component="nav"
        role="navigation"
        aria-label={t('navigation.mainNavigation')}
        sx={{
          backgroundColor: 'background.paper',
          backdropFilter: 'blur(10px)',
          borderBottom: 1,
          borderColor: 'divider',
        }}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: { xs: 64, md: 72 },
            px: { xs: 2, md: 3 },
          }}>
          <Logo />

          {!isMobile && <DesktopNavigation />}
          {isMobile && (
            <MobileMenuButton ref={triggerButtonRef} mobileOpen={mobileOpen} onToggle={handleDrawerToggle} />
          )}
        </Toolbar>
      </AppBar>

      <SwipeableDrawer
        anchor="right"
        open={mobileOpen}
        onOpen={handleDrawerOpen}
        onClose={handleDrawerClose}
        disableBackdropTransition={!isIOS}
        disableDiscovery={isIOS}
        ModalProps={{
          keepMounted: true,
          'aria-modal': true,
          'aria-labelledby': 'mobile-drawer-title',
        }}
        slotProps={{
          paper: {
            id: 'mobile-navigation-drawer',
            sx: {
              width: 'min(92vw, 400px)',
              backgroundImage: 'none',
            },
          },
        }}>
        <MobileDrawer open={mobileOpen} onClose={handleDrawerClose} />
      </SwipeableDrawer>
    </>
  )
}

HeaderNav.displayName = 'HeaderNav'
