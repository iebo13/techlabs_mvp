import React from 'react'
import { Box } from '@mui/material'
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
      <Logo />
    </Box>
  )
}
