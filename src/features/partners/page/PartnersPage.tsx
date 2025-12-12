import React from 'react'
import { Box, Button, Card, Stack, Typography } from '@mui/material'
import { Section, SectionHeading, SEO } from '@/components/Layouts'
import { useI18n } from '@/hooks'
import partnersData from '@/mocks/partners.json'
import { PartnerLogo } from '../components/PartnerLogo'
import type { Partner } from '../types/partners.type'

export const PartnersPage: React.FC = () => {
  const { t } = useI18n()
  
  return (
    <main>
      <SEO
        title={t('partners.page.title')}
        description={t('partners.page.description')}
        keywords={t('partners.page.keywords')}
        image="/img/partners-og-image.jpg"
        url="/partners"
        type="website"
        tags={t('partners.page.tags', { returnObjects: true }) as string[]}
      />
      <Section>
        <Stack spacing={4} alignItems="center" textAlign="center">
          <SectionHeading level={1} centered>
            {t('partners.page.title')}
          </SectionHeading>
          <Typography variant="h5" color="text.secondary" maxWidth="600px">
            {t('partners.page.subtitle')}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 4,
            }}>
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
          }}>
          <Stack spacing={3} alignItems="center">
            <Typography variant="h4" component="h2" fontWeight={700}>
              {t('partners.becomePartner.title')}
            </Typography>
            <Typography variant="h6" maxWidth="600px">
              {t('partners.becomePartner.description')}
            </Typography>
            <Button
              variant="outlined"
              size="large"
              href="/about#contact"
              aria-label={t('partners.becomePartner.ctaAriaLabel')}
              sx={{
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                },
              }}>
              {t('partners.becomePartner.cta')}
            </Button>
          </Stack>
        </Card>
      </Section>
    </main>
  )
}
