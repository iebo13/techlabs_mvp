import React from 'react'
import { Box, Grid, Divider } from '@mui/material'
import { FooterBottom } from './FooterBottom'
import { FooterBrandSection } from './FooterBrandSection'
import { FooterLinksSection } from './FooterLinksSection'

/**
 * SiteFooter component provides comprehensive site navigation and legal information.
 * Includes 4 organized link columns, social media links, and legal pages.
 */
export const SiteFooter: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        mt: 'auto',
        width: '100%',
      }}
    >
      <Box
        sx={{
          py: { xs: 4, md: 6 },
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {/* Main Footer Content */}
        <Grid container spacing={4}>
          <FooterBrandSection />
          <FooterLinksSection />
        </Grid>
      </Box>

      <Divider sx={{ borderColor: 'divider' }} />

      <Box
        sx={{
          maxWidth: '1200px',
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <FooterBottom />
      </Box>
    </Box>
  )
}
