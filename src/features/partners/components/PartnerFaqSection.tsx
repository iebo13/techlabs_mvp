import React from 'react'
import { Container } from '@mui/material'
import { FAQAccordion } from '@/components/Forms/FaqAccordion'
import { Section, SectionHeading } from '@/components/Layouts'
import type { FAQ } from '@/features/home/types/homePage.type'
import { useI18n } from '@/hooks'

type PartnerFaqSectionProps = {
  readonly faqs: FAQ[]
}

export const PartnerFaqSection: React.FC<PartnerFaqSectionProps> = ({ faqs }) => {
  const { t } = useI18n()

  return (
    <Section variant="paper" sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="md">
        <SectionHeading level={2} emphasis="primary" centered subtitle={t('partners.faq.subtitle')} sx={{ mb: 4 }}>
          {t('partners.faq.title')}
        </SectionHeading>
        <FAQAccordion faqs={faqs} maxWidth="md" />
      </Container>
    </Section>
  )
}

PartnerFaqSection.displayName = 'PartnerFaqSection'
