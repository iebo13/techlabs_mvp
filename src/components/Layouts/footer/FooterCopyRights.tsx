import React from 'react'
import { Box, Typography } from '@mui/material'

export const FooterCopyRights: React.FC = () => {
  return (
    <Box>
      <Typography variant="body2" color="textPrimary">
        © 2024 by TechLabs.
      </Typography>
      <Typography variant="body2" color="textPrimary">
        Board: Sabrina Engling, Ranjini Kishen Kumar, Carolina Constant Sanchez
      </Typography>
    </Box>
  )
}
