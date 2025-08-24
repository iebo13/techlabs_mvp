import React from 'react'

import { Menu as MenuIcon } from '@mui/icons-material'
import { IconButton, useTheme } from '@mui/material'

type MobileMenuButtonProps = {
  mobileOpen: boolean
  onToggle: () => void
}

/**
 * MobileMenuButton - Renders the mobile menu toggle button
 * Extracted from HeaderNav for better separation of concerns
 */
export const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ mobileOpen, onToggle }) => {
  const theme = useTheme()

  return (
    <IconButton
      edge="end"
      onClick={onToggle}
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
  )
}
