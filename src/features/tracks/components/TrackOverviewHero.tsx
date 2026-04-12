import React from 'react'
import { Container } from '@mui/material'
import { Section, SectionHeading } from '@/components/Layouts'
import { useI18n } from '@/hooks'

export const TrackOverviewHero: React.FC = () => {
  const { t } = useI18n()

  return (
    <Section sx={{ py: { xs: 4, md: 6 } }}>
      <Container maxWidth="md">
        <SectionHeading level={2} emphasis="primary" centered subtitle={t('tracks.overview.hero.subtitle')}>
          {t('tracks.overview.hero.title')}
        </SectionHeading>
      </Container>
    </Section>
  )
}

TrackOverviewHero.displayName = 'TrackOverviewHero'
