import React from 'react'
import { Container, Grid } from '@mui/material'
import { DataLoadingState, Section } from '@/components/Layouts'
import { useI18n } from '@/hooks'
import { useTracks } from '../hooks/useTracks'
import { getLocalizedTrack } from '../utils/tracksUtils'
import { TrackCard } from './TrackCard'

export const TracksGrid: React.FC = () => {
  const { t } = useI18n()
  const { data: tracks, isLoading, error } = useTracks()
  const localizedTracks = tracks?.map(track => getLocalizedTrack(track, t)) ?? []

  return (
    <Section sx={{ p: 0 }}>
      <Container maxWidth="xl">
        <DataLoadingState isLoading={isLoading} error={error}>
          <Grid container spacing={3}>
            {localizedTracks.map(track => (
              <TrackCard key={track.id} track={track} />
            ))}
          </Grid>
        </DataLoadingState>
      </Container>
    </Section>
  )
}

TracksGrid.displayName = 'TracksGrid'
