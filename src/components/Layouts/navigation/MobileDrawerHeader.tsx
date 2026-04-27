import React from 'react'
import { Close as CloseIcon } from '@mui/icons-material'
import { Box, IconButton, Stack, Typography, useTheme } from '@mui/material'
import { LanguageToggle } from '@/components/LanguageToggle'
import { useI18n } from '@/hooks'
import { Logo } from './Logo'
import { createCloseButtonStyles } from './MobileDrawerUtils'

type MobileDrawerHeaderProps = {
  onClose: () => void
  px: number
  mb: number
}

export const MobileDrawerHeader: React.FC<MobileDrawerHeaderProps> = ({ onClose, px, mb }) => {
  const theme = useTheme()
  const { t } = useI18n()
  const closeButtonStyles = createCloseButtonStyles(theme)

  return (
    <Box
      id="mobile-drawer-title"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        gap: 1.5,
        px,
        mb,
        flexShrink: 0,
      }}>
      <Stack spacing={0.5} sx={{ minWidth: 0, flex: 1, justifyContent: 'space-between' }}>
        <Logo compact />
        <Typography variant="caption" color="text.secondary" sx={{ pl: 2 }}>
          {t('navigation.mobileDrawer.tagline')}
        </Typography>
      </Stack>
      <Typography
        id="mobile-drawer-description"
        sx={{
          position: 'absolute',
          left: '-10000px',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
        }}>
        {t('navigation.mobileMenuDescription')}
      </Typography>
      <Stack alignItems="flex-end" sx={{ justifyContent: 'space-between', flexShrink: 0 }}>
        <IconButton edge="end" onClick={onClose} aria-label={t('navigation.closeMenu')} sx={closeButtonStyles}>
          <CloseIcon sx={{ fontSize: { xs: 24, sm: 26 } }} />
        </IconButton>
        <LanguageToggle />
      </Stack>
    </Box>
  )
}

MobileDrawerHeader.displayName = 'MobileDrawerHeader'
