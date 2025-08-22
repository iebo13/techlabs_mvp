import React, { useState, useEffect } from 'react'

import { useSearchParams } from 'react-router-dom'

import { Container, Grid, Typography, Box, Button, Stack, Alert, Chip } from '@mui/material'

import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'
import { TrackCard, type Track } from '../components/TrackCard'
import tracksData from '../mocks/tracks.json'

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

    const handleStartLearning = () => {
        // Navigate back to home with track preferences
        const prefParam = preferredTracks.length > 0 ? `?pref=${preferredTracks.join(',')}` : ''
        window.location.href = `/#tracks${prefParam}`
    }

    const tracks: Track[] = tracksData.tracks

    return (
        <main>
            <Section>
                <Container maxWidth="lg">
                    {/* Header */}
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <SectionHeading level={1} centered>
                            Choose Your Learning Track
                        </SectionHeading>
                        <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
                            Select the track that aligns with your career goals and interests
                        </Typography>

                        {/* Track Preferences Display */}
                        {preferredTracks.length > 0 && (
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="h6" gutterBottom>
                                    Your Preferred Tracks:
                                </Typography>
                                <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap">
                                    {preferredTracks.map(trackId => {
                                        const track = tracks.find(t => t.id === trackId)
                                        return track ? (
                                            <Chip
                                                key={trackId}
                                                label={track.label}
                                                color="primary"
                                                variant="outlined"
                                                size="medium"
                                            />
                                        ) : null
                                    })}
                                </Stack>
                            </Box>
                        )}

                        {/* CTA Button */}
                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleStartLearning}
                            sx={{
                                px: 4,
                                py: 1.5,
                                fontSize: '1.1rem',
                                borderRadius: '28px',
                            }}
                        >
                            Start Learning
                        </Button>
                    </Box>

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
