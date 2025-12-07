import React from 'react'
import { AppBar, Toolbar, Box, Drawer, useTheme, useMediaQuery } from '@mui/material'
import { LanguageToggle } from '@/components/LanguageToggle'
import { useI18n } from '@/hooks'
import { SkipToContent } from '../accessibility/SkipToContent'
import { DesktopNavigation } from './DesktopNavigation'
import { Logo } from './Logo'
import { MobileDrawer } from './MobileDrawer'
import { MobileMenuButton } from './MobileMenuButton'
import { useMobileDrawer } from './useMobileDrawer'

export const HeaderNav: React.FC = () => {
  const theme = useTheme()
  const { t } = useI18n()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const { mobileOpen, handleDrawerToggle, handleDrawerClose, triggerButtonRef } = useMobileDrawer()

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
            px: { xs: 0, md: 3 },
          }}>
          <Logo />

          {!isMobile && <DesktopNavigation />}
          {isMobile && (
            <Box>
              <LanguageToggle />
              <MobileMenuButton ref={triggerButtonRef} mobileOpen={mobileOpen} onToggle={handleDrawerToggle} />
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
          'aria-modal': true,
          'aria-labelledby': 'mobile-drawer-title',
        }}>
        <MobileDrawer onClose={handleDrawerClose} />
      </Drawer>
    </>
  )
}

HeaderNav.displayName = 'HeaderNav'
