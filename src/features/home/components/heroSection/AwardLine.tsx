import React from 'react'
import { Box, Typography } from '@mui/material'

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
      }}>
      <Typography variant="body2" color="textPrimary" textAlign="center">
        Winner of the
      </Typography>
      <Box
        component="img"
        src="/img/partners/google.svg"
        alt="Google.org"
        sx={{
          height: { xs: 20, sm: 44 },
          width: 'auto',
          opacity: 0.9,
        }}
      />
      <Typography variant="body2" color="textPrimary" textAlign="center">
        Impact Challenge Germany 2018
      </Typography>
    </Box>
  )
}
