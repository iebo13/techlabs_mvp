import React from 'react'
import { Box, Typography } from '@mui/material'
import { Logo } from '../Logo'

export const FooterBrandSection: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <Logo />
      <Typography variant="body1" color="textSecondary">
        Düsseldorf
      </Typography>
    </Box>
  )
}
