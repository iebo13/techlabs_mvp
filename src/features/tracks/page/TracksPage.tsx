import React from 'react'
import { Box } from '@mui/material'
import { SEO } from '@/components/Layouts'
import { useI18n } from '@/hooks'
import { ProgramPhasesBand } from '../components/ProgramPhasesBand'
import { TrackOverviewHero } from '../components/TrackOverviewHero'
import { TracksBottomCta } from '../components/TracksBottomCta'
import { TracksFaqSection } from '../components/TracksFaqSection'
import { TracksGrid } from '../components/TracksGrid'
import { WhyTechLabsStrip } from '../components/WhyTechLabsStrip'

export const TracksPage: React.FC = () => {
  const { t } = useI18n()

  return (
    <Box component="main">
      <SEO
        title={t('tracks.page.title')}
        description={t('tracks.page.description')}
        keywords={t('tracks.page.keywords')}
        image="/img/tracks-og-image.jpg"
        url="/tracks"
        type="website"
        tags={t('tracks.page.tags') as unknown as string[]}
      />
      <TrackOverviewHero />
      <TracksGrid />
      <ProgramPhasesBand />
      <WhyTechLabsStrip />
      <TracksFaqSection />
      <TracksBottomCta />
    </Box>
  )
}

TracksPage.displayName = 'TracksPage'
