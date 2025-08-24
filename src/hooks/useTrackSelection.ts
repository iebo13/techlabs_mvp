import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveTrackSelection, loadTrackSelection, trackIdsToQueryParam } from '@/utils/persistence'

// Define TrackKey locally to avoid import issues
type TrackKey = 'web-dev' | 'data-science' | 'product-design' | 'ai'

/**
 * Custom hook for managing track selection state and navigation
 * Extracts business logic from TrackChooser component
 */
export const useTrackSelection = () => {
  const navigate = useNavigate()
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

  return {
    selectedTracks,
    handleTrackChange,
    handleStartLearning,
  }
}
