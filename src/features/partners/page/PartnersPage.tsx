import React from 'react'
import { Box, Button, Card, Stack, Typography } from '@mui/material'
import { Section, SectionHeading } from '@/components/Layouts'
import { useI18n } from '@/hooks'
import partnersData from '@/mocks/partners.json'
import { PartnerLogo } from '../components/PartnerLogo'
import type { Partner } from '../types/partners.type'

export const PartnersPage: React.FC = () => {
  const { t } = useI18n()

  return (
    <main>
      <Section>
        <Stack spacing={4} alignItems="center" textAlign="center">
          <SectionHeading level={1} centered>
            {t('partners.title')}
          </SectionHeading>
          <Typography variant="h5" color="text.secondary" maxWidth="600px">
            {t('partners.description')}
          </Typography>
          <Box
            component="ul"
            role="list"
            aria-label={t('partners.logoListLabel', { defaultValue: 'Partner organizations' })}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 4,
              listStyle: 'none',
              p: 0,
              m: 0,
            }}>
            {partnersData.partners.map((partner: Partner) => (
              <Box component="li" key={partner.name}>
                <PartnerLogo partner={partner} />
              </Box>
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
          }}>
          <Stack spacing={3} alignItems="center">
            <Typography variant="h4" component="h2" fontWeight={700}>
              {t('partners.becomePartner.title', { defaultValue: 'Become a Partner' })}
            </Typography>
            <Typography variant="h6" component="p" maxWidth="600px">
              {t('partners.becomePartner.description', {
                defaultValue:
                  'Join our mission to make tech education accessible to everyone. Partner with us to shape the future of digital learning.',
              })}
            </Typography>
            <Button
              variant="outlined"
              size="large"
              href="/about#contact"
              sx={{
                color: 'white',
                borderColor: 'white',
                '&:focus-visible': {
                  outline: '2px solid white',
                  outlineOffset: 2,
                },
              }}>
              {t('partners.becomePartner.cta', { defaultValue: 'Get in Touch' })}
            </Button>
          </Stack>
        </Card>
      </Section>
    </main>
  )
}
