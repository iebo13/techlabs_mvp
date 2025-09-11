import React, { memo } from 'react'
import { Box, Typography } from '@mui/material'

export const HeroHeading: React.FC = memo(() => {
  return (
    <Box sx={{ width: '100%', mx: 'auto' }}>
      <Typography
        variant="h2"
        id="hero-heading"
        component="h2"
        color="textPrimary"
        sx={{
          pb: 2,
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
        sx={{
          '& .separator': {
            color: 'text.secondary',
            mx: 0.5,
            fontSize: '0.875em',
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
