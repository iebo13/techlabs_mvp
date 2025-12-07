import type { TFunction } from 'i18next'
import type { TrackKey, DetailedTrack } from '../types/tracks.types'

const TRACK_SELECTION_KEY = 'techlabs-track-selection'

export const saveTrackSelection = (trackIds: TrackKey[]): void => {
  try {
    const serialized = JSON.stringify(trackIds)

    sessionStorage.setItem(TRACK_SELECTION_KEY, serialized)
  } catch {
    // Silently fail if sessionStorage is unavailable
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

      return parsed.filter((id): id is TrackKey => typeof id === 'string' && validTrackKeys.includes(id as TrackKey))
    }

    return []
  } catch {
    // Silently fail if sessionStorage is unavailable or data is corrupted
    return []
  }
}

export const clearTrackSelection = (): void => {
  try {
    sessionStorage.removeItem(TRACK_SELECTION_KEY)
  } catch {
    // Silently fail if sessionStorage is unavailable
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

type TrackMockData = {
  id: string
  applicationDeadline: string
  spotsAvailable: number
  icon: string
}

export const getLocalizedTrack = (trackData: TrackMockData, t: TFunction): DetailedTrack => {
  const trackId = trackData.id

  return {
    id: trackData.id,
    label: t(`tracks.items.${trackId}.label`),
    description: t(`tracks.items.${trackId}.description`),
    duration: t(`tracks.items.${trackId}.duration`),
    format: t(`tracks.items.${trackId}.format`),
    skills: t(`tracks.items.${trackId}.skills`, { returnObjects: true }) as string[],
    projects: t(`tracks.items.${trackId}.projects`, { returnObjects: true }) as string[],
    careerPaths: t(`tracks.items.${trackId}.careerPaths`, { returnObjects: true }) as string[],
    nextCohort: t(`tracks.items.${trackId}.nextCohort`),
    applicationDeadline: trackData.applicationDeadline,
    spotsAvailable: trackData.spotsAvailable,
    icon: trackData.icon,
  }
}
