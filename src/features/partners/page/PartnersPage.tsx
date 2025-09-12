import React from 'react'
import { Box, Button, Card, Stack, Typography } from '@mui/material'
import { Section, SectionHeading } from '@/components/Layouts'
import partnersData from '@/mocks/partners.json'
import { PartnerLogo } from '../components/PartnerLogo'
import type { Partner } from '../types/partners.type'

export const PartnersPage: React.FC = () => {
  return (
    <main>
      <Section>
        <Stack spacing={4} alignItems="center" textAlign="center">
          <SectionHeading level={2} centered>
            Our Partners
          </SectionHeading>
          <Typography variant="h5" color="text.secondary" maxWidth="600px">
            Together with our partners, we're making tech education accessible to everyone. Join us
            in shaping the future of digital learning.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 4,
            }}
          >
            {partnersData.partners.map((partner: Partner) => (
              <PartnerLogo key={partner.name} partner={partner} />
            ))}
          </Box>
        </Stack>
      </Section>

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
              variant="outlined"
              size="large"
              href="/about#contact"
              sx={{
                color: 'white',
                borderColor: 'white',
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
