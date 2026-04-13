import React from 'react'
import { Container, Stack } from '@mui/material'
import { CTAButton } from '@/components/Buttons/CtaButton'
import { Section, SectionHeading } from '@/components/Layouts'
import { useI18n } from '@/hooks'

export const PartnersHero: React.FC = () => {
  const { t } = useI18n()

  return (
    <Section sx={{ py: { xs: 4, md: 6 } }}>
      <Container maxWidth="md">
        <SectionHeading level={1} emphasis="primary" centered subtitle={t('partners.hero.subtitle')}>
          {t('partners.hero.title')}
        </SectionHeading>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mt: 4 }}>
          <CTAButton to="/about#contact">{t('partners.hero.cta')}</CTAButton>
          <CTAButton href="#why-partner" variant="outlined">
            {t('partners.hero.secondaryCta')}
          </CTAButton>
        </Stack>
      </Container>
    </Section>
  )
}

PartnersHero.displayName = 'PartnersHero'
