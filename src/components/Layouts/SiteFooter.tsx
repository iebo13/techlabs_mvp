import React from 'react'
import { Box, Container, Grid, Divider } from '@mui/material'
import { FooterBottom } from './FooterBottom'
import { FooterBrandSection } from './FooterBrandSection'
import { FooterLinksSection } from './FooterLinksSection'

/**
 * SiteFooter component provides comprehensive site navigation and legal information.
 * Includes 4 organized link columns, social media links, and legal pages.
 */
export const SiteFooter: React.FC = () => {
  return (
    <Box component="footer" sx={{ backgroundColor: 'background.paper', mt: 'auto' }}>
      <Container maxWidth="lg">
        <Box sx={{ py: 6 }}>
          {/* Main Footer Content */}
          <Grid container spacing={4}>
            <FooterBrandSection />
            <FooterLinksSection />
          </Grid>
        </Box>

        <Divider sx={{ borderColor: 'divider' }} />

        <FooterBottom />
      </Container>
    </Box>
  )
}
