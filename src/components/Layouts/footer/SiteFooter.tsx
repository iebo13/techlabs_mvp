import React from 'react'
import { Box, Container } from '@mui/material'
import { FooterBrandSection } from './FooterBrandSection'
import { FooterCopyRights } from './FooterCopyRights'
import { FooterLinksSection } from './FooterLinksSection'
import { FooterSocialRow } from './FooterSocialRow'

export const SiteFooter: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#F7F7F8',
        mt: 'auto',
        width: '100%',
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          pt: { xs: 6, md: 8 },
          pb: { xs: 4, md: 5 },
          px: { xs: 3, sm: 3, md: 12 },
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <FooterBrandSection />
          <FooterLinksSection />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <FooterCopyRights />
          <FooterSocialRow />
        </Box>
      </Container>
    </Box>
  )
}
