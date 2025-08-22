import React from 'react'

import { Box } from '@mui/material'

import type { Partner } from '../types/home'

/**
 * Partner logo component with lazy loading and proper accessibility
 */
export const PartnerLogo: React.FC<{ partner: Partner }> = ({ partner }) => {
  return (
    <Box
      component="img"
      src={partner.logoUrl}
      alt={partner.name}
      loading="lazy"
      sx={{
        height: { xs: 18, sm: 20, md: 24 },
        width: 'auto',
        maxWidth: '100%',
        objectFit: 'contain',
        filter: 'grayscale(1)',
        opacity: 0.7,
        // Remove hover effects to match Figma
      }}
    />
  )
}
