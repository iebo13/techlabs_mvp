import React, { useState, useEffect, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Stack } from '@mui/material'
import { Section } from '@/components/Layouts'
import { TrackChooserSection } from '@/features/home/components/heroSection/TrackChooserSection'
import type { TrackKey } from '@/features/tracks/types/tracks.type'
import homeData from '@/mocks/home.json'
import { HomeDataSchema } from '@/mocks/schemas'
import type { HomeData } from '@/types/home'
import { saveTrackSelection, loadTrackSelection, trackIdsToQueryParam } from '@/utils/persistence'
import { AwardLine } from './AwardLine'
import { HeroHeading } from './HeroHeading'
import { TrustStripSection } from './TrustStripSection'

export const HeroSection: React.FC = memo(() => {
  const [selectedTracks, setSelectedTracks] = useState<TrackKey[]>([])
  const navigate = useNavigate()
  const validatedData: HomeData = HomeDataSchema.parse(homeData)
  const { tracks, partners } = validatedData

  useEffect(() => {
    const savedTracks = loadTrackSelection()

    setSelectedTracks(savedTracks)
  }, [])

  const handleTrackChange = (trackId: TrackKey, checked: boolean) => {
    setSelectedTracks(prev => {
      const newSelection = checked ? [...prev, trackId] : prev.filter(id => id !== trackId)

      saveTrackSelection(newSelection)

      return newSelection
    })
  }

  const handleStartLearning = () => {
    const queryParam = trackIdsToQueryParam(selectedTracks)
    const route = selectedTracks.length > 0 ? `/tracks?pref=${queryParam}` : '/tracks'

    navigate(route)
  }

  return (
    <Section
      component="section"
      sx={{
        minHeight: { xs: '50vh', md: '60vh' },
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'background.default',
        p: 0,
        pt: { xs: 6, md: 6 },
      }}
    >
      <Stack spacing={2} alignItems="center" sx={{ width: '100%' }}>
        <HeroHeading />

        <TrackChooserSection
          tracks={tracks}
          selectedTracks={selectedTracks}
          onTrackChange={handleTrackChange}
          onStartLearning={handleStartLearning}
        />

        <AwardLine />

        <TrustStripSection partners={partners} />
      </Stack>
    </Section>
  )
})

HeroSection.displayName = 'HeroSection'
