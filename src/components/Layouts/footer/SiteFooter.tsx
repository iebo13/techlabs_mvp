import React from 'react'
import { Box } from '@mui/material'
import { FooterBrandSection } from './FooterBrandSection'
import { FooterCopyRights } from './FooterCopyRights'
import { FooterLinksSection } from './FooterLinksSection'
import { FooterSocialRow } from './FooterSocialRow'

export const SiteFooter: React.FC = () => {
  return (
    <Box component="footer">
      <Box
        sx={{
          backgroundColor: '#F7F7F8',
          width: '100%',
          padding: 2,
          pb: 1,
        }}
      >
        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems="flex-start"
          px={2}
          py={2}
          width="100%"
        >
          <FooterBrandSection />
          <FooterLinksSection />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: { xs: 'column', md: 'row' },
            px: { xs: 2, md: 6 },
            py: { xs: 2, md: 0 },
          }}
        >
          <FooterCopyRights />
          <FooterSocialRow />
        </Box>
      </Box>
    </Box>
  )
}
