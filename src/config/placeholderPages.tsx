import React from 'react'
import { Section, SectionHeading } from '@/components/Layouts'
import { useI18n } from '@/hooks'

export const CareersPage: React.FC = () => {
  const { t } = useI18n()

  return (
    <Section>
      <SectionHeading level={1} centered>
        {t('pages.careers.title')}
      </SectionHeading>
      <p>{t('pages.careers.placeholder')}</p>
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
      <p>{t('pages.privacy.placeholder')}</p>
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
      <p>{t('pages.imprint.placeholder')}</p>
    </Section>
  )
}

CareersPage.displayName = 'CareersPage'
PrivacyPage.displayName = 'PrivacyPage'
ImprintPage.displayName = 'ImprintPage'
