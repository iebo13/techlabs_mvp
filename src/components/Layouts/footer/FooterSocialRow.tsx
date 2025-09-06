import React from 'react'
import { Box, IconButton } from '@mui/material'
import { socialLinks } from './footerData'

/**
 * FooterSocialRow - Renders centered social media icons row
 * 40×40px circular buttons with brand pink background per Figma design
 * Order: Instagram → YouTube → X → LinkedIn → Facebook → Email
 */
export const FooterSocialRow: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2, // 16px spacing between circles
        mt: 3, // 24px top margin
        mb: 3,
      }}
    >
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
              width: 40, // 40×40px per specification
              height: 40,
              backgroundColor: 'primary.main', // Brand pink fill
              color: 'white', // White glyphs
              borderRadius: '50%', // Fully rounded
              border: 'none',
              '&:hover': {
                backgroundColor: 'primary.main',
                transform: 'scale(1.1)',
                transition: 'transform 0.2s ease-in-out',
              },
              '&:focus-visible': {
                outline: '3px solid rgba(250, 33, 92, 0.25)',
                outlineOffset: 2,
              },
            }}
          >
            <IconComponent fontSize="small" />
          </IconButton>
        )
      })}
    </Box>
  )
}
