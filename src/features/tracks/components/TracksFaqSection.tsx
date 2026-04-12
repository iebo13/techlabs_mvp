import React from 'react'
import { Container } from '@mui/material'
import { FAQAccordion } from '@/components/Forms/FaqAccordion'
import { Section, SectionHeading } from '@/components/Layouts'
import type { FAQ } from '@/features/home/types/homePage.type'
import { useI18n } from '@/hooks'

export const TracksFaqSection: React.FC = () => {
  const { t } = useI18n()
  const items = t('tracks.overview.faq.items', { returnObjects: true }) as FAQ[]

  return (
    <Section variant="paper" sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="md">
        <SectionHeading
          level={2}
          emphasis="primary"
          centered
          subtitle={t('tracks.overview.faq.subtitle')}
          sx={{ mb: 4 }}>
          {t('tracks.overview.faq.title')}
        </SectionHeading>
        <FAQAccordion faqs={items} maxWidth="md" />
      </Container>
    </Section>
  )
}

TracksFaqSection.displayName = 'TracksFaqSection'
