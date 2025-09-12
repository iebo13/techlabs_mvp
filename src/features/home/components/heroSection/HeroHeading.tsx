import React, { memo } from 'react'
import { Box, Typography, useMediaQuery } from '@mui/material'
import { theme } from '@/theme'

export const HeroHeading: React.FC = memo(() => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box sx={{ width: '100%', mx: 'auto' }}>
      <Typography
        variant={isMobile ? 'h1' : 'h2'}
        id="hero-heading"
        component={isMobile ? 'h1' : 'h2'}
        color="text.primary"
        sx={{
          pb: 2,
          px: isMobile ? 2 : 0,
          fontSize: isMobile ? '4.5rem' : '4rem',
          textAlign: isMobile ? 'start' : 'center',
          '& .emphasis': {
            color: 'primary.main',
            fontWeight: 'inherit',
          },
        }}
      >
        Learn{' '}
        <Box component="span" className="emphasis">
          Tech
        </Box>{' '}
        Skills for Free
      </Typography>

      <Typography
        variant="body1"
        component="p"
        color="text.primary"
        sx={{
          fontSize: '14px',
          fontWeight: 500,
          lineHeight: 1.5,
          '& .separator': {
            color: 'text.primary',
            mx: 0.5,
            fontSize: '0.8em',
            userSelect: 'none',
          },
        }}
      >
        Blended learning
        <Box component="span" className="separator">
          ·
        </Box>
        Local Community
        <Box component="span" className="separator">
          ·
        </Box>
        Practical Projects
      </Typography>
    </Box>
  )
})

HeroHeading.displayName = 'HeroHeading'
