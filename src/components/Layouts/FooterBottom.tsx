import React from 'react'

import { Box, Typography, Stack } from '@mui/material'

import { NavLink } from './NavLink'

/**
 * FooterBottom - Renders the footer bottom section with copyright and legal links
 * Extracted from SiteFooter for better separation of concerns
 */
export const FooterBottom: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <Box
      sx={{
        py: 3,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        gap: 2,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {currentYear} TechLabs. All rights reserved.
      </Typography>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 3 }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
      >
        <NavLink
          to="/privacy"
          showActive={false}
          sx={{
            color: 'text.secondary',
            textDecoration: 'none',
            fontSize: '0.875rem',
            '&:hover': {
              color: 'primary.main',
              textDecoration: 'none',
            },
            '&:focus-visible': {
              outline: '3px solid rgba(250, 33, 92, 0.25)',
              outlineOffset: 2,
              borderRadius: '4px',
            },
          }}
        >
          Privacy Policy
        </NavLink>
        <NavLink
          to="/imprint"
          showActive={false}
          sx={{
            color: 'text.secondary',
            textDecoration: 'none',
            fontSize: '0.875rem',
            '&:hover': {
              color: 'primary.main',
              textDecoration: 'none',
            },
            '&:focus-visible': {
              outline: '3px solid rgba(250, 33, 92, 0.25)',
              outlineOffset: 2,
              borderRadius: '4px',
            },
          }}
        >
          Imprint
        </NavLink>
      </Stack>
    </Box>
  )
}
