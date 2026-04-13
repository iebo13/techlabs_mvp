import React from 'react'
import { Stack } from '@mui/material'
import { CTAButton } from '@/components/Buttons/CtaButton'
import { FAQAccordion } from '@/components/Forms/FaqAccordion'
import { Section, SectionHeading } from '@/components/Layouts'
import type { FAQ } from '@/features/home/types/homePage.type'
import { useI18n } from '@/hooks'

type FaqsSectionProps = {
  readonly faqs: FAQ[]
}

export const FaqsSection: React.FC<FaqsSectionProps> = ({ faqs }) => {
  const { t } = useI18n()

  return (
    <Section variant="paper" sx={{ py: { xs: 6, md: 8 } }}>
      <Stack spacing={6} alignItems="center" px={2}>
        <SectionHeading level={2} centered>
          {t('about.faqSection.title')}
        </SectionHeading>

        <FAQAccordion faqs={faqs} maxWidth="md" showBorder singleOpen />

        <CTAButton to="/about#contact" variant="outlined">
          {t('about.faqSection.contactCta')}
        </CTAButton>
      </Stack>
    </Section>
  )
}
