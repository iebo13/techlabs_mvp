import React from 'react'
import { Box, IconButton, useTheme } from '@mui/material'
import { createFocusRing, TRANSITION } from '@/theme'
import { socialLinks } from './footerData'

export const FooterSocialRow: React.FC = () => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        mt: 3,
        mb: 3,
      }}>
      {socialLinks.map(social => {
        const IconComponent = social.icon

        return (
          <IconButton
            key={social.name}
            component="a"
            href={social.url}
            target={social.name === 'Email' ? '_self' : '_blank'}
            rel={social.name === 'Email' ? undefined : 'noopener noreferrer'}
            aria-label={social.ariaLabel}
            sx={{
              width: 44,
              height: 44,
              backgroundColor: 'primary.main',
              color: 'common.white',
              borderRadius: '50%',
              border: 'none',
              '&:hover': {
                backgroundColor: 'primary.main',
                transform: 'scale(1.1)',
                transition: `transform ${TRANSITION.fast}`,
              },
              '&:focus-visible': createFocusRing(theme),
            }}>
            <IconComponent fontSize="small" />
          </IconButton>
        )
      })}
    </Box>
  )
}

FooterSocialRow.displayName = 'FooterSocialRow'
