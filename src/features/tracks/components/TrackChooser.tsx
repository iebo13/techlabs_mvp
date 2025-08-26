/**
 * TrackChooser component - allows users to select tracks and navigate to tracks page
 * Features: checkboxes, deadline text, sessionStorage persistence, URL routing with preferences
 */

import React from 'react'
import { Paper, Stack } from '@mui/material'
import { Section } from '@/components/Layouts/Section'
import { useTrackSelection } from '@/hooks/useTrackSelection'
import homeData from '@/mocks/home.json'
import { HomeDataSchema } from '@/mocks/schemas'
import type { HomeData } from '@/types/home'
import { TrackChooserActions } from './TrackChooserActions'
import { TrackChooserForm } from './TrackChooserForm'
import { TrackChooserHeader } from './TrackChooserHeader'

/**
 * TrackChooser component
 */
export const TrackChooser: React.FC = () => {
  // Validate and parse mock data
  const validatedData: HomeData = HomeDataSchema.parse(homeData)
  const { tracks } = validatedData

  const { selectedTracks, handleTrackChange, handleStartLearning } = useTrackSelection()

  return (
    <Section
      sx={{
        pt: { xs: 7, md: 9 }, // 56-72px top spacing
        pb: { xs: 6, md: 8 },
      }}
    >
      <Stack spacing={6} alignItems="center">
        <TrackChooserHeader />

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
            <TrackChooserForm
              tracks={tracks}
              selectedTracks={selectedTracks}
              onTrackChange={handleTrackChange}
            />

            <TrackChooserActions onStartLearning={handleStartLearning} />
          </Stack>
        </Paper>
      </Stack>
    </Section>
  )
}
