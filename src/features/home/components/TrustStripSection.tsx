import React from 'react'
import { Box, Typography, Stack, Grid, useTheme } from '@mui/material'
import { PartnerLogo } from '@/features/partners/components/PartnerLogo'
import type { Partner } from '@/types/home'

export type TrustStripSectionProps = {
  partners: Partner[]
}

/**
 * TrustStripSection component - displays award information and partner logos
 */
export const TrustStripSection: React.FC<TrustStripSectionProps> = ({ partners }) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.grey[300],
        width: '100%',
      }}
    >
      <Stack spacing={3} alignItems="center" sx={{ width: '100%' }}>
        {/* Partner Logos Grid */}
        <Box sx={{ width: '100%', maxWidth: 1000 }}>
          <Grid
            container
            spacing={{ xs: 2, sm: 3, md: 4 }}
            justifyContent="center"
            alignItems="center"
          >
            {partners.map((partner: Partner) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 3 }}
                key={partner.name}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: { xs: 60, sm: 70, md: 80 },
                }}
              >
                {partner.href ? (
                  <Box
                    component="a"
                    href={partner.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textDecoration: 'none',
                      width: '100%',
                      '&:focus-visible': {
                        outline: `2px solid ${theme.palette.primary.main}`,
                        outlineOffset: 2,
                        borderRadius: 1,
                      },
                    }}
                    aria-label={`Visit ${partner.name} website`}
                  >
                    <PartnerLogo partner={partner} />
                  </Box>
                ) : (
                  <PartnerLogo partner={partner} />
                )}
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Additional context for screen readers */}
        <Typography
          component="p"
          aria-label="Our trusted partners support TechLabs educational programs"
          sx={{
            sr: 'only',
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: 0,
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            border: 0,
          }}
        >
          Our trusted partners who support TechLabs educational programs
        </Typography>
      </Stack>
    </Box>
  )
}
