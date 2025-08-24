/**
 * HeroSection component - combines Hero, TrackChooser, and TrustStrip into one unified section
 * Features: main value proposition, track selection, and trust indicators
 */

import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { Box, Typography, Stack } from '@mui/material'

import { Section } from '@/components/Layouts/Section'
import { TrackChooserSection } from '@/features/tracks/components/TrackChooserSection'
import homeData from '@/mocks/home.json'
import { HomeDataSchema } from '@/mocks/schemas'
import { saveTrackSelection, loadTrackSelection, trackIdsToQueryParam } from '@/utils/persistence'

import { TrustStripSection } from './TrustStripSection'

import type { HomeData } from '@/types/home'

// Define TrackKey locally to avoid import issues
type TrackKey = 'web-dev' | 'data-science' | 'product-design' | 'ai'

/**
 * HeroSection component props
 */
export type HeroSectionProps = {
  className?: string
}

/**
 * HeroSection component - unified hero area with track selection and trust indicators
 */
export const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  const navigate = useNavigate()

  // Validate and parse mock data
  const validatedData: HomeData = HomeDataSchema.parse(homeData)
  const { tracks, partners } = validatedData

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

  return (
    <Section
      className={className}
      component="section"
      sx={{
        minHeight: { xs: '50vh', md: '60vh' },
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'background.default',
        pt: { xs: 6, md: 6 },
        pb: { xs: 8, md: 8 },
      }}
    >
      <Stack spacing={{ xs: 6, md: 8 }} alignItems="center" sx={{ width: '100%' }}>
        {/* Hero Content */}
        <Box sx={{ width: '100%', mx: 'auto' }}>
          {/* Main Heading */}
          <Typography
            variant="h2"
            id="hero-heading"
            component="h2"
            sx={{
              pb: 2,
              color: 'text.secondary',
              '& .emphasis': {
                color: 'primary.main',
                fontWeight: 'inherit',
              },
            }}
          >
            Learn{' '}
            <Box component="span" className="emphasis">
              Tech
            </Box>{' '}
            Skills for Free
          </Typography>

          {/* Subhead */}
          <Typography
            variant="body1"
            component="p"
            sx={{
              color: 'text.secondary',
              '& .separator': {
                color: 'text.secondary',
                mx: 0.5,
                fontSize: '0.875em',
                userSelect: 'none',
              },
            }}
          >
            Blended learning
            <Box component="span" className="separator">
              ·
            </Box>
            Local Community
            <Box component="span" className="separator">
              ·
            </Box>
            Practical Projects
          </Typography>
        </Box>

        {/* Track Chooser Content */}
        <TrackChooserSection
          tracks={tracks}
          selectedTracks={selectedTracks}
          onTrackChange={handleTrackChange}
          onStartLearning={handleStartLearning}
        />

        {/* Trust Strip Content */}
        <TrustStripSection partners={partners} />
      </Stack>
    </Section>
  )
}
