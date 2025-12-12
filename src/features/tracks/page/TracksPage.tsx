import React, { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Container, Grid, Typography } from '@mui/material'
import { Section, SEO } from '@/components/Layouts'
import { loadTrackSelection, queryParamToTrackIds, getLocalizedTrack } from '@/features/tracks/utils/tracksUtils'
import { useI18n } from '@/hooks'
import tracksData from '@/mocks/tracks.json'
import { TrackCard } from '../components/TrackCard'

export const TracksPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const [expandedTrack, setExpandedTrack] = useState<string | null>(null)
  const i18n = useI18n()

  const localizedTracks = useMemo(() => {
    return tracksData.tracks.map(track => getLocalizedTrack(track, i18n.t))
  }, [i18n.t])

  useEffect(() => {
    const urlPrefs = searchParams.get('pref')

    if (urlPrefs) {
      const trackIds = queryParamToTrackIds(urlPrefs)

      if (trackIds.length === 1) {
        setExpandedTrack(trackIds[0])
      }
    } else {
      loadTrackSelection()
    }
  }, [searchParams])

  const handleTrackToggle = (trackId: string) => {
    setExpandedTrack(expandedTrack === trackId ? null : trackId)
  }

  return (
    <>
      <SEO
        title={i18n.t('tracks.page.title')}
        description={i18n.t('tracks.page.description')}
        keywords={i18n.t('tracks.page.keywords')}
        image="/img/tracks-og-image.jpg"
        url="/tracks"
        type="website"
        tags={i18n.t('tracks.page.tags') as unknown as string[]}
      />
      <Section sx={{ py: { xs: 4, md: 6 } }}>
        <Container maxWidth="lg">
          <Typography variant="h1" component="h1" sx={{ mb: 4, textAlign: 'center' }}>
            {i18n.t('tracks.page.title')}
          </Typography>
          <Grid container spacing={4}>
            {localizedTracks.map(track => (
              <Grid size={{ xs: 12, md: 6 }} key={track.id}>
                <TrackCard track={track} isExpanded={expandedTrack === track.id} onToggle={handleTrackToggle} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>
    </>
  )
}
