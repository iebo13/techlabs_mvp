import React from 'react'

import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Box, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material'

import { Section } from '@/components/Layouts/Section'
import { SectionHeading } from '@/components/Layouts/SectionHeading'
import partnersData from '@/mocks/partners.json'

import type { DetailedPartner } from '@/types/home'

/**
 * Partners page displaying tiered partner organizations
 * with CTA to become a partner
 */
export const PartnersPage: React.FC = () => {
  // Group partners by tier
  const partnersByTier = (() => {
    const grouped: Record<string, DetailedPartner[]> = {}
    partnersData.partners.forEach(partner => {
      if (!grouped[partner.tier]) {
        grouped[partner.tier] = []
      }
      grouped[partner.tier].push(partner)
    })
    return grouped
  })()

  // Sort tiers by priority (platinum, gold, silver, bronze)
  const tierOrder = ['platinum', 'gold', 'silver', 'bronze']

  return (
    <main>
      {/* Hero Section */}
      <Section>
        <Stack spacing={4} alignItems="center" textAlign="center">
          <SectionHeading level={1} centered>
            Our Partners
          </SectionHeading>
          <Typography variant="h5" color="text.secondary" maxWidth="600px">
            Together with our partners, we're making tech education accessible to everyone. Join us
            in shaping the future of digital learning.
          </Typography>
        </Stack>
      </Section>

      {/* Partners by Tier */}
      {tierOrder.map(tierId => {
        const tier = partnersData.tiers.find(t => t.id === tierId)
        const partners = partnersByTier[tierId] || []

        if (!tier || partners.length === 0) return null

        return (
          <Section key={tierId}>
            <Stack spacing={4}>
              {/* Tier Header */}
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  component="h2"
                  sx={{
                    fontWeight: 700,
                    color: tier.color,
                    mb: 2,
                  }}
                >
                  {tier.name}
                </Typography>
                <Typography variant="h6" color="text.secondary" maxWidth="500px" mx="auto">
                  {tier.description}
                </Typography>
              </Box>

              {/* Partners Grid */}
              <Grid container spacing={3} justifyContent="center">
                {partners.map(partner => (
                  <Grid key={partner.name} size={{ xs: 12, sm: 6, md: 4 }}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 3,
                        },
                      }}
                    >
                      <CardContent sx={{ flex: 1, textAlign: 'center', p: 3 }}>
                        {/* Partner Logo */}
                        <Box
                          sx={{
                            height: 80,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 2,
                          }}
                        >
                          <Box
                            component="img"
                            src={partner.logoUrl}
                            alt={partner.name}
                            loading="lazy"
                            sx={{
                              maxHeight: '100%',
                              maxWidth: '100%',
                              objectFit: 'contain',
                              filter: 'grayscale(1)',
                              opacity: 0.8,
                            }}
                          />
                        </Box>

                        {/* Partner Info */}
                        <Typography variant="h6" component="h3" gutterBottom>
                          {partner.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={2}>
                          {partner.description}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block">
                          {partner.category}
                        </Typography>

                        {/* Website Link */}
                        <Button
                          variant="outlined"
                          size="small"
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          endIcon={<OpenInNewIcon />}
                          sx={{ mt: 2 }}
                        >
                          Visit Website
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Section>
        )
      })}

      {/* Become a Partner CTA */}
      <Section>
        <Card
          sx={{
            background: 'linear-gradient(135deg, #FF2D63 0%, #FF6B9D 100%)',
            color: 'white',
            textAlign: 'center',
            p: 4,
          }}
        >
          <Stack spacing={3} alignItems="center">
            <Typography variant="h4" component="h2" fontWeight={700}>
              Become a Partner
            </Typography>
            <Typography variant="h6" maxWidth="600px">
              Join our mission to make tech education accessible to everyone. Partner with us to
              shape the future of digital learning.
            </Typography>
            <Button
              variant="contained"
              size="large"
              href="/about#contact"
              sx={{
                backgroundColor: 'white',
                color: '#FF2D63',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                },
              }}
            >
              Get in Touch
            </Button>
          </Stack>
        </Card>
      </Section>
    </main>
  )
}
