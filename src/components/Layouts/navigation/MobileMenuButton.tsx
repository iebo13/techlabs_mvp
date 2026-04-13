import { forwardRef } from 'react'
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material'
import { IconButton, useTheme, useMediaQuery } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { useI18n } from '@/hooks'
import { createFocusRing } from '@/theme'

type MobileMenuButtonProps = {
  mobileOpen: boolean
  onToggle: () => void
}

export const MobileMenuButton = forwardRef<HTMLButtonElement, MobileMenuButtonProps>(
  ({ mobileOpen, onToggle }, ref) => {
    const theme = useTheme()
    const { t } = useI18n()
    const isXs = useMediaQuery(theme.breakpoints.only('xs'))
    const isSm = useMediaQuery(theme.breakpoints.only('sm'))

    const getButtonSize = () => {
      if (isXs) return { size: 44, iconSize: 26 }
      if (isSm) return { size: 48, iconSize: 28 }

      return { size: 52, iconSize: 30 }
    }

    const { size, iconSize } = getButtonSize()

    return (
      <IconButton
        ref={ref}
        edge="end"
        onClick={onToggle}
        aria-label={mobileOpen ? t('navigation.closeMenu') : t('navigation.openMenu')}
        aria-expanded={mobileOpen}
        aria-controls="mobile-navigation-drawer"
        aria-haspopup="true"
        sx={{
          color: 'text.primary',
          width: size,
          height: size,
          minWidth: '44px',
          minHeight: '44px',
          borderRadius: 2,
          m: 0,
          p: 0,
          transition: theme.transitions.create(['background-color', 'transform', 'color'], {
            duration: theme.transitions.duration.short,
          }),
          '&:hover': {
            backgroundColor: alpha(theme.palette.common.black, 0.08),
            transform: 'scale(1.05)',
            color: 'primary.main',
          },
          '&:focus-visible': {
            ...createFocusRing(theme),
            backgroundColor: alpha(theme.palette.common.black, 0.04),
          },
          '&:active': {
            transform: 'scale(0.95)',
            backgroundColor: alpha(theme.palette.common.black, 0.12),
          },
        }}>
        <MenuIcon
          sx={{
            fontSize: iconSize,
            transition: theme.transitions.create(['transform', 'opacity'], {
              duration: theme.transitions.duration.short,
            }),
            transform: mobileOpen ? 'rotate(90deg) scale(0)' : 'rotate(0deg) scale(1)',
            opacity: mobileOpen ? 0 : 1,
            position: 'absolute',
          }}
        />
        <CloseIcon
          sx={{
            fontSize: iconSize,
            transition: theme.transitions.create(['transform', 'opacity'], {
              duration: theme.transitions.duration.short,
            }),
            transform: mobileOpen ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0)',
            opacity: mobileOpen ? 1 : 0,
            position: 'absolute',
          }}
        />
      </IconButton>
    )
  }
)

MobileMenuButton.displayName = 'MobileMenuButton'
