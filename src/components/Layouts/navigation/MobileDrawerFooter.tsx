import React from 'react'
import { Box, Button, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { ctaButtons } from '@/config/data/navigationData'
import { useI18n } from '@/hooks'
import { createFocusRing } from '@/theme'
import { socialLinks } from '../footer/footerData'
import { createCtaButtonStyles, getSectionLabelSx } from './MobileDrawerUtils'
import { NavLink } from './NavLink'

type MobileDrawerFooterProps = {
  onNavigate: () => void
  px: number
  py: number
  ctaMt: number
  dividerMb: number
}

export const MobileDrawerFooter: React.FC<MobileDrawerFooterProps> = ({ onNavigate, px, py, ctaMt, dividerMb }) => {
  const theme = useTheme()
  const { t } = useI18n()

  const getCtaStyles = (variant: 'contained' | 'outlined') => createCtaButtonStyles(theme, variant)

  return (
    <Box
      sx={{
        px,
        mt: ctaMt,
        flexShrink: 0,
        pb: {
          xs: `max(${py * 8}px, env(safe-area-inset-bottom, ${py * 8}px))`,
        },
      }}>
      <Divider sx={{ mb: dividerMb }} />
      <Typography component="h2" sx={{ ...getSectionLabelSx(), px: 0, mt: 0 }}>
        {t('navigation.sections.getInvolved')}
      </Typography>
      <Stack spacing={{ xs: 1.5, sm: 2 }} sx={{ mt: 1.25 }}>
        {ctaButtons.map(button => (
          <Button
            key={button.path}
            component={NavLink}
            to={button.path}
            variant={button.variant}
            fullWidth
            onClick={onNavigate}
            sx={getCtaStyles(button.variant)}>
            {t(button.labelKey)}
          </Button>
        ))}
      </Stack>
      <Stack direction="row" spacing={0.75} justifyContent="center" sx={{ mt: { xs: 2, sm: 2.5 } }}>
        {socialLinks.map(social => {
          const Icon = social.icon

          return (
            <IconButton
              key={social.name}
              component="a"
              href={social.url}
              target={social.name === 'Email' ? '_self' : '_blank'}
              rel={social.name === 'Email' ? undefined : 'noopener noreferrer'}
              aria-label={social.ariaLabel}
              sx={{
                width: 40,
                height: 40,
                color: 'text.secondary',
                transition: theme.transitions.create(['color', 'background-color', 'transform'], {
                  duration: theme.transitions.duration.short,
                }),
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  transform: 'translateY(-2px)',
                },
                '&:focus-visible': createFocusRing(theme),
              }}>
              <Icon fontSize="small" />
            </IconButton>
          )
        })}
      </Stack>
    </Box>
  )
}

MobileDrawerFooter.displayName = 'MobileDrawerFooter'
