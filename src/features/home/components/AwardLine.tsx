import React from 'react'
import { Box, Typography } from '@mui/material'
import googleOrgLogo from '@/assets/partners/google.svg'

/**
 * AwardLine component - displays Google.org award information
 */
export const AwardLine: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.5,
        flexWrap: 'wrap',
        py: { xs: 2, sm: 3 },
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        textAlign="center"
        sx={{
          fontSize: '0.875rem',
          fontWeight: 500,
        }}
      >
        Winner of the
      </Typography>
      <Box
        component="img"
        src={googleOrgLogo}
        alt="Google.org"
        sx={{
          height: { xs: 20, sm: 22 },
          width: 'auto',
          opacity: 0.9,
        }}
      />
      <Typography
        variant="body2"
        color="text.secondary"
        textAlign="center"
        sx={{
          fontSize: '0.875rem',
          fontWeight: 500,
        }}
      >
        Impact Challenge Germany 2018
      </Typography>
    </Box>
  )
}
