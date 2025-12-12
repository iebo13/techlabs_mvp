import React from 'react'
import { Typography } from '@mui/material'
import { Section, SectionHeading } from '@/components/Layouts'
import { useI18n } from '@/hooks'

export const CareersPage: React.FC = () => {
  const { t } = useI18n()

  return (
    <Section>
      <SectionHeading level={1} centered>
        {t('pages.careers.title')}
      </SectionHeading>
      <Typography variant="body1">{t('pages.careers.placeholder')}</Typography>
    </Section>
  )
}

export const PrivacyPage: React.FC = () => {
  const { t } = useI18n()

  return (
    <Section>
      <SectionHeading level={1} centered>
        {t('pages.privacy.title')}
      </SectionHeading>
      <Typography variant="body1">{t('pages.privacy.placeholder')}</Typography>
    </Section>
  )
}

export const ImprintPage: React.FC = () => {
  const { t } = useI18n()

  return (
    <Section>
      <SectionHeading level={1} centered>
        {t('pages.imprint.title')}
      </SectionHeading>
      <Typography variant="body1">{t('pages.imprint.placeholder')}</Typography>
    </Section>
  )
}

CareersPage.displayName = 'CareersPage'
PrivacyPage.displayName = 'PrivacyPage'
ImprintPage.displayName = 'ImprintPage'
