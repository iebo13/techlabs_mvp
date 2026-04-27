import React from 'react'
import { Stack } from '@mui/material'
import { FAQAccordion } from '@/components/Forms/FaqAccordion'
import { SectionHeading } from '@/components/Layouts'
import { useI18n } from '@/hooks'
import type { TrackFaq } from '../types/tracks.types'

type TrackFaqSectionProps = {
  readonly faqs: TrackFaq[]
}

export const TrackFaqSection: React.FC<TrackFaqSectionProps> = ({ faqs }) => {
  const { t } = useI18n()

  if (!faqs || faqs.length === 0) return null

  return (
    <Stack spacing={3}>
      <SectionHeading level={3} emphasis="primary">
        {t('tracks.detail.sections.faq.title')}
      </SectionHeading>
      <FAQAccordion faqs={faqs} maxWidth="md" />
    </Stack>
  )
}

TrackFaqSection.displayName = 'TrackFaqSection'
