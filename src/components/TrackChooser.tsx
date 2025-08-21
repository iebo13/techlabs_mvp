/**
 * TrackChooser component - allows users to select tracks and navigate to tracks page
 * Features: checkboxes, deadline text, sessionStorage persistence, URL routing with preferences
 */

import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import {
    Paper,
    Stack,
    Typography,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Button,
    Box,
} from '@mui/material'

import homeData from '../mocks/home.json'
import { HomeDataSchema } from '../mocks/schemas'
import { formatDeadlineText } from '../utils/date'
import {
    saveTrackSelection,
    loadTrackSelection,
    trackIdsToQueryParam
} from '../utils/persistence'

import { Section } from './Section'
import { SectionHeading } from './SectionHeading'

import type { HomeData, Track } from '../types/home'

// Define TrackKey locally to avoid import issues
type TrackKey = 'web-dev' | 'data-science' | 'product-design' | 'ai'

/**
 * TrackChooser component props
 */
export type TrackChooserProps = {
    className?: string
}

/**
 * TrackChooser component
 */
export const TrackChooser: React.FC<TrackChooserProps> = ({ className }) => {
    const navigate = useNavigate()

    // Validate and parse mock data
    const validatedData: HomeData = HomeDataSchema.parse(homeData)
    const { tracks, applicationDeadlineISO } = validatedData

    // State for selected tracks
    const [selectedTracks, setSelectedTracks] = useState<TrackKey[]>([])

    // Load saved selections on mount
    useEffect(() => {
        const savedTracks = loadTrackSelection()
        setSelectedTracks(savedTracks)
    }, [])

    // Handle track selection change
    const handleTrackChange = (trackId: TrackKey, checked: boolean) => {
        const newSelection = checked
            ? [...selectedTracks, trackId]
            : selectedTracks.filter(id => id !== trackId)

        setSelectedTracks(newSelection)
        saveTrackSelection(newSelection)
    }

    // Handle "Start Learning" button click
    const handleStartLearning = () => {
        const queryParam = trackIdsToQueryParam(selectedTracks)
        const route = selectedTracks.length > 0
            ? `/tracks?pref=${queryParam}`
            : '/tracks'

        navigate(route)
    }

    // Generate deadline helper text
    const deadlineText = formatDeadlineText(applicationDeadlineISO)

    return (
        <Section className={className}>
            <Stack spacing={4} alignItems="center">
                <SectionHeading
                    level={2}
                    centered
                    id="track-chooser-heading"
                >
                    Choose your Journey Now
                </SectionHeading>

                <Paper
                    elevation={2}
                    sx={{
                        p: 4,
                        maxWidth: 600,
                        width: '100%',
                        borderRadius: 3,
                    }}
                >
                    <Stack spacing={3}>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            textAlign="center"
                            sx={{ mb: 2 }}
                        >
                            Select the tracks that interest you most
                        </Typography>

                        <FormGroup
                            role="group"
                            aria-labelledby="track-chooser-heading"
                            sx={{ gap: 1 }}
                        >
                            {tracks.map((track: Track) => (
                                <FormControlLabel
                                    key={track.id}
                                    control={
                                        <Checkbox
                                            checked={selectedTracks.includes(track.id)}
                                            onChange={(event) =>
                                                handleTrackChange(track.id, event.target.checked)
                                            }
                                            name={track.id}
                                            color="primary"
                                        />
                                    }
                                    label={
                                        <Typography variant="body1">
                                            {track.label}
                                        </Typography>
                                    }
                                />
                            ))}
                        </FormGroup>

                        <Box sx={{ textAlign: 'center', mt: 3 }}>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={handleStartLearning}
                                sx={{
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    borderRadius: 2,
                                    textTransform: 'none',
                                }}
                            >
                                Start Learning
                            </Button>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 2, fontStyle: 'italic' }}
                            >
                                {deadlineText}
                            </Typography>
                        </Box>
                    </Stack>
                </Paper>
            </Stack>
        </Section>
    )
}
