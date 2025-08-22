/**
 * TrackChooser component - allows users to select tracks and navigate to tracks page
 * Features: checkboxes, deadline text, sessionStorage persistence, URL routing with preferences
 */

import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { HourglassEmpty } from '@mui/icons-material'
import {
  Paper,
  Stack,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  useTheme,
} from '@mui/material'

import homeData from '../mocks/home.json'
import { HomeDataSchema } from '../mocks/schemas'
// import { formatDeadlineText } from '../utils/date' // Commented out for now
import { saveTrackSelection, loadTrackSelection, trackIdsToQueryParam } from '../utils/persistence'

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
  const theme = useTheme()

  // Validate and parse mock data
  const validatedData: HomeData = HomeDataSchema.parse(homeData)
  const { tracks } = validatedData
  // const { applicationDeadlineISO } = validatedData // Commented out for now

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
    const route = selectedTracks.length > 0 ? `/tracks?pref=${queryParam}` : '/tracks'

    navigate(route)
  }

  // Generate deadline helper text (keeping logic for future use)
  // const deadlineText = formatDeadlineText(applicationDeadlineISO)

  return (
    <Section
      className={className}
      sx={{
        pt: { xs: 7, md: 9 }, // 56-72px top spacing
        pb: { xs: 6, md: 8 },
      }}
    >
      <Stack spacing={6} alignItems="center">
        <Box sx={{ textAlign: 'center' }}>
          <SectionHeading
            level={2}
            centered
            id="track-chooser-heading"
            sx={{
              fontSize: { xs: '2.5rem', md: '3rem' }, // 40-48px
              fontWeight: 900, // Extra-bold
              lineHeight: 1.1, // Tight line-height
              mb: 1,
            }}
          >
            Choose your Journey Now
          </SectionHeading>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '1.5rem', md: '1.875rem' },
              fontWeight: 900,
              color: 'primary.main', // Pink color
              lineHeight: 1.1,
            }}
          >
            & Become a digital shaper of tomorrow
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, sm: 6 }, // 32-48px padding for generous spacing
            maxWidth: 880, // Compact desktop width per Figma
            width: '100%',
            borderRadius: 6, // 48px radius for very rounded look
            boxShadow: '0px 4px 32px rgba(0,0,0,0.08)', // Soft/wide shadow
            border: 'none', // Remove border for cleaner look
          }}
        >
          <Stack spacing={3}>
            <Typography
              variant="body2"
              textAlign="center"
              sx={{
                mb: { xs: 2.5, sm: 3 }, // 20px margin below
                fontSize: { xs: '0.875rem', sm: '1rem' }, // 14-16px
                color: 'text.secondary', // Muted gray
                fontWeight: 400,
              }}
            >
              Select the tracks that interest you most
            </Typography>

            <FormGroup
              role="group"
              aria-labelledby="track-chooser-heading"
              sx={{ gap: { xs: 3, sm: 4 } }} // 24-32px vertical spacing for better readability
            >
              {tracks.map((track: Track) => (
                <FormControlLabel
                  key={track.id}
                  control={
                    <Checkbox
                      checked={selectedTracks.includes(track.id)}
                      onChange={event => handleTrackChange(track.id, event.target.checked)}
                      name={track.id}
                      color="primary"
                    />
                  }
                  label={
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: { xs: '1rem', sm: '1.125rem' }, // 16-18px
                        fontWeight: 700, // Bold labels per Figma
                        ml: 1.5, // Increased space between checkbox and label
                      }}
                    >
                      {track.label}
                    </Typography>
                  }
                  sx={{
                    alignItems: 'flex-start', // Left align consistently
                    margin: 0,
                    '& .MuiFormControlLabel-label': {
                      width: '100%',
                    },
                  }}
                />
              ))}
            </FormGroup>

            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleStartLearning}
                sx={{
                  height: 56, // 56px height
                  px: { xs: 4, sm: 5 }, // Large and prominent
                  fontSize: '1rem',
                  fontWeight: 800, // Bold text
                  borderRadius: '9999px', // Pill radius
                  textTransform: 'none', // No ALL-CAPS
                  boxShadow: 'none', // No elevation
                  '&:hover': {
                    boxShadow: 'none',
                  },
                  '&:focus-visible': {
                    outline: `2px solid ${theme.palette.primary.main}`,
                    outlineOffset: 2,
                  },
                }}
              >
                Start learning
              </Button>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1.5, // 12px gap
                  mt: 1.5, // 12px gap from button
                }}
              >
                <HourglassEmpty
                  sx={{
                    fontSize: '1rem',
                    color: 'text.secondary',
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: { xs: '0.75rem', sm: '0.8125rem' }, // 12-13px
                    color: 'text.secondary', // Muted gray
                    fontWeight: 400,
                  }}
                >
                  Application closes in 2 weeks for next batch
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Paper>
      </Stack>
    </Section>
  )
}
