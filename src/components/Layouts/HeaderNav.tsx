import React from 'react'
import { AppBar, Toolbar, Box, Drawer, useTheme, useMediaQuery } from '@mui/material'
import { useMobileDrawer } from '@/hooks/useMobileDrawer'
import { DesktopNavigation } from './DesktopNavigation'
import { Logo } from './Logo'
import { MobileDrawer } from './MobileDrawer'
import { MobileMenuButton } from './MobileMenuButton'

/**
 * HeaderNav component provides sticky navigation with responsive mobile drawer.
 * Includes elevation on scroll, accessibility features, and branded CTAs.
 */
export const HeaderNav: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { mobileOpen, handleDrawerToggle, handleDrawerClose } = useMobileDrawer()

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
            {!isMobile && <DesktopNavigation />}
          </Box>

          {/* Mobile Menu Button */}
          {isMobile && <MobileMenuButton mobileOpen={mobileOpen} onToggle={handleDrawerToggle} />}
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
