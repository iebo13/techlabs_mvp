import React from 'react'
import { Box, Typography } from '@mui/material'
import { Logo } from '../navigation/Logo'

export const FooterBrandSection: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'start',
        flex: 1,
        py: { xs: 2, md: 0 },
      }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Logo />
        <Typography variant="body1" color="text.secondary" sx={{ p: 0 }}>
          Düsseldorf
        </Typography>
      </Box>
    </Box>
  )
}
