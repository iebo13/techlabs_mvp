import React from 'react'
import { Box, Typography, Stack } from '@mui/material'
import type { Partner } from '../types/partners.type'

export const PartnerLogo: React.FC<{ partner: Partner }> = ({ partner }) => {
  return (
    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ textAlign: 'left' }}>
      <Box
        component="img"
        src={partner.logoUrl}
        alt={`${partner.name} logo`}
        loading="lazy"
        sx={{
          height: { xs: 24, sm: 28, md: 32 },
          width: 'auto',
          maxWidth: { xs: 80, sm: 100, md: 120 },
          maxHeight: { xs: 24, sm: 28, md: 38 },
          objectFit: 'contain',
          flexShrink: 0,
        }}
      />
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{
          fontSize: { xs: '0.75rem', sm: '0.8rem' },
          fontWeight: 500,
          lineHeight: 1.2,
          maxWidth: 100,
          wordBreak: 'break-word',
        }}
      >
        {partner.name}
      </Typography>
    </Stack>
  )
}
