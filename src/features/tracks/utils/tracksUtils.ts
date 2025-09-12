import type { TrackKey } from '../types/tracks.types'

const TRACK_SELECTION_KEY = 'techlabs-track-selection'

export const saveTrackSelection = (trackIds: TrackKey[]): void => {
  try {
    const serialized = JSON.stringify(trackIds)

    sessionStorage.setItem(TRACK_SELECTION_KEY, serialized)
  } catch (error) {
    console.warn('Failed to save track selection to sessionStorage:', error)
  }
}

export const loadTrackSelection = (): TrackKey[] => {
  try {
    const stored = sessionStorage.getItem(TRACK_SELECTION_KEY)

    if (!stored) return []

    const parsed = JSON.parse(stored)

    // Validate that the stored data is an array of valid track keys
    if (Array.isArray(parsed)) {
      const validTrackKeys: TrackKey[] = ['web-dev', 'data-science', 'product-design', 'ai']

      return parsed.filter(
        (id): id is TrackKey => typeof id === 'string' && validTrackKeys.includes(id as TrackKey)
      )
    }

    return []
  } catch (error) {
    console.warn('Failed to load track selection from sessionStorage:', error)

    return []
  }
}

export const clearTrackSelection = (): void => {
  try {
    sessionStorage.removeItem(TRACK_SELECTION_KEY)
  } catch (error) {
    console.warn('Failed to clear track selection from sessionStorage:', error)
  }
}

export const trackIdsToQueryParam = (trackIds: TrackKey[]): string => {
  return trackIds.join(',')
}

export const queryParamToTrackIds = (param: string | null): TrackKey[] => {
  if (!param) return []

  const ids = param.split(',').map(id => id.trim())
  const validTrackKeys: TrackKey[] = ['web-dev', 'data-science', 'product-design', 'ai']

  return ids.filter((id): id is TrackKey => validTrackKeys.includes(id as TrackKey))
}
