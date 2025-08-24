import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Container, Grid, Typography, Box, Button, Alert } from '@mui/material'
import { Section } from '@/components/Layouts/Section'
import { SEO } from '@/components/Layouts/Seo'
import tracksData from '@/mocks/tracks.json'
import { TrackCard, type Track } from '../components/TrackCard'

export const TracksPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const [expandedTrack, setExpandedTrack] = useState<string | null>(null)
  const [preferredTracks, setPreferredTracks] = useState<string[]>([])

  // Load track preferences from session storage and URL params
  useEffect(() => {
    const urlPrefs = searchParams.get('pref')
    const sessionPrefs = sessionStorage.getItem('selectedTracks')

    if (urlPrefs) {
      const trackIds = urlPrefs.split(',').filter(Boolean)

      setPreferredTracks(trackIds)

      // If only one track is preferred, expand it automatically
      if (trackIds.length === 1) {
        setExpandedTrack(trackIds[0])
      }
    } else if (sessionPrefs) {
      try {
        const trackIds = JSON.parse(sessionPrefs)

        setPreferredTracks(trackIds)
      } catch (error) {
        console.warn('Failed to parse session storage tracks:', error)
      }
    }
  }, [searchParams])

  const handleTrackToggle = (trackId: string) => {
    setExpandedTrack(expandedTrack === trackId ? null : trackId)
  }

  const tracks: Track[] = tracksData.tracks

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
      <Section>
        <Container maxWidth="lg">
          {/* Preferred Tracks Display */}
          {preferredTracks.length > 0 && (
            <Box
              sx={{
                mb: 4,
                p: 3,
                bgcolor: 'primary.50',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'primary.200',
              }}
            >
              <Typography variant="h6" gutterBottom color="primary.main">
                🎯 Your Preferred Tracks
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Based on your selection:{' '}
                {preferredTracks
                  .map(id => tracks.find(t => t.id === id)?.label)
                  .filter(Boolean)
                  .join(', ')}
              </Typography>
            </Box>
          )}

          {/* Tracks Grid */}
          <Grid container spacing={4}>
            {tracks.map(track => (
              <Grid size={{ xs: 12, md: 6 }} key={track.id}>
                <TrackCard
                  track={track}
                  isExpanded={expandedTrack === track.id}
                  onToggle={handleTrackToggle}
                />
              </Grid>
            ))}
          </Grid>

          {/* Additional Info */}
          <Box sx={{ mt: 8, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Not Sure Which Track to Choose?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Take our quick assessment to find the best track for your skills and goals
            </Typography>
            <Button
              variant="outlined"
              size="large"
              href="/assessment"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: '28px',
              }}
            >
              Take Assessment
            </Button>
          </Box>

          {/* Application Deadline Alert */}
          <Box sx={{ mt: 6 }}>
            <Alert severity="info" sx={{ textAlign: 'center' }}>
              <Typography variant="body1">
                <strong>Application Deadlines:</strong> Each track has different start dates and
                application deadlines. Make sure to apply early to secure your spot!
              </Typography>
            </Alert>
          </Box>
        </Container>
      </Section>
    </main>
  )
}
