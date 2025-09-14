import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { TrackKey } from '@/features/tracks'
import { saveTrackSelection, loadTrackSelection, trackIdsToQueryParam } from '@/features/tracks/utils/tracksUtils'

export const useTrackSelection = () => {
  const navigate = useNavigate()
  const [selectedTracks, setSelectedTracks] = useState<TrackKey[]>([])

  useEffect(() => {
    const savedTracks = loadTrackSelection()

    setSelectedTracks(savedTracks)
  }, [])

  const handleTrackChange = (trackId: TrackKey, checked: boolean) => {
    const newSelection = checked ? [...selectedTracks, trackId] : selectedTracks.filter(id => id !== trackId)

    setSelectedTracks(newSelection)
    saveTrackSelection(newSelection)
  }

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
