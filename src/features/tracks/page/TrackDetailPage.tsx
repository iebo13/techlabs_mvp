import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Box, Container, Grid, Stack } from '@mui/material'
import { CTAButton } from '@/components/Buttons'
import { DataLoadingState, LazyIntersection, Section, SEO } from '@/components/Layouts'
import { useI18n } from '@/hooks'
import { CareerOutcomes } from '../components/CareerOutcomes'
import { CurriculumTimeline } from '../components/CurriculumTimeline'
import { PersonaGrid } from '../components/PersonaGrid'
import { ProjectsShowcase } from '../components/ProjectsShowcase'
import { TechStackGrid } from '../components/TechStackGrid'
import { TrackDetailHero } from '../components/TrackDetailHero'
import { TrackDetailSidebar } from '../components/TrackDetailSidebar'
import { TrackFaqSection } from '../components/TrackFaqSection'
import { TrackIntro } from '../components/TrackIntro'
import { TracksBottomCta } from '../components/TracksBottomCta'
import { TrackStoriesSection } from '../components/TrackStoriesSection'
import { useTrack } from '../hooks/useTrack'
import { isValidTrackKey } from '../utils/tracksUtils'

export const TrackDetailPage: React.FC = () => {
  const { trackId } = useParams<{ trackId: string }>()
  const { t } = useI18n()
  const { track, isLoading, error, notFound } = useTrack(trackId)

  if (!isValidTrackKey(trackId) || notFound) {
    return <Navigate to="/tracks" replace />
  }

  if (isLoading || !track) {
    return (
      <DataLoadingState isLoading={isLoading} error={error}>
        {null}
      </DataLoadingState>
    )
  }

  return (
    <Box component="main">
      <SEO
        title={`${track.label} - TechLabs`}
        description={track.description}
        keywords={`${track.label}, TechLabs, bootcamp, ${track.skills.join(', ')}`}
        image={track.imageUrl ?? '/img/tracks-og-image.jpg'}
        url={`/tracks/${track.id}`}
        type="website"
      />

      <TrackDetailHero track={track} />

      <Section sx={{ py: { xs: 4, md: 6 } }}>
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 3, md: 5 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <TrackDetailSidebar track={track} />
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Stack spacing={5}>
                <TrackIntro paragraphs={track.intro} />
                <PersonaGrid personas={track.personas} />
                <CurriculumTimeline phases={track.curriculum} />
                <TechStackGrid items={track.techStack} />
                <ProjectsShowcase projects={track.projects} />
                <CareerOutcomes careerPaths={track.careerPaths} />
                <LazyIntersection minHeight={300}>
                  <TrackStoriesSection trackLabel={track.label} />
                </LazyIntersection>
                <TrackFaqSection faqs={track.faq} />
                <Box sx={{ display: { md: 'none' }, pt: 1 }}>
                  <CTAButton to={`/apply?track=${track.id}`} fullWidth>
                    {t('tracks.detail.sidebar.applyCta', { track: track.label })}
                  </CTAButton>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Section>

      <TracksBottomCta />
    </Box>
  )
}

TrackDetailPage.displayName = 'TrackDetailPage'
