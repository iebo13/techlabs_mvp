import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Container, Grid } from '@mui/material'
import { Section, SEO } from '@/components/Layouts'
import { loadTrackSelection, queryParamToTrackIds } from '@/features/tracks/utils/tracksUtils'
import tracksData from '@/mocks/tracks.json'
import { TrackCard } from '../components/TrackCard'

export const TracksPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const [expandedTrack, setExpandedTrack] = useState<string | null>(null)

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
    <main>
      <SEO
        title="Learning Tracks - TechLabs"
        description="Explore our learning tracks: Web Development, Data Science, Product Design, and AI. Choose the path that fits your career goals and start learning for free."
        keywords="learning tracks, web development, data science, product design, AI, tech education, free courses"
        image="/img/tracks-og-image.jpg"
        url="/tracks"
        type="website"
        tags={['learning tracks', 'web development', 'data science', 'product design', 'AI']}
      />
      <Section sx={{ py: { xs: 4, md: 6 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {tracksData.tracks.map(track => (
              <Grid size={{ xs: 12, md: 6 }} key={track.id}>
                <TrackCard track={track} isExpanded={expandedTrack === track.id} onToggle={handleTrackToggle} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>
    </main>
  )
}
