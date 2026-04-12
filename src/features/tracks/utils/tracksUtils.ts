import type { TFunction } from 'i18next'
import type {
  TrackKey,
  DetailedTrack,
  Persona,
  TechStackItem,
  CurriculumPhase,
  ProjectShowcase,
  TrackFaq,
} from '../types/tracks.types'

const TRACK_SELECTION_KEY = 'techlabs-track-selection'
const VALID_TRACK_KEYS: TrackKey[] = ['web-dev', 'data-science', 'product-design', 'ai']

export const isValidTrackKey = (id: string | undefined | null): id is TrackKey =>
  typeof id === 'string' && VALID_TRACK_KEYS.includes(id as TrackKey)

export const saveTrackSelection = (trackIds: TrackKey[]): void => {
  try {
    sessionStorage.setItem(TRACK_SELECTION_KEY, JSON.stringify(trackIds))
  } catch {
    // Silently fail if sessionStorage is unavailable
  }
}

export const loadTrackSelection = (): TrackKey[] => {
  try {
    const stored = sessionStorage.getItem(TRACK_SELECTION_KEY)

    if (!stored) return []

    const parsed = JSON.parse(stored)

    if (Array.isArray(parsed)) {
      return parsed.filter(isValidTrackKey)
    }

    return []
  } catch {
    return []
  }
}

export const clearTrackSelection = (): void => {
  try {
    sessionStorage.removeItem(TRACK_SELECTION_KEY)
  } catch {
    // Silently fail
  }
}

export const trackIdsToQueryParam = (trackIds: TrackKey[]): string => trackIds.join(',')

export const queryParamToTrackIds = (param: string | null): TrackKey[] => {
  if (!param) return []

  return param
    .split(',')
    .map(id => id.trim())
    .filter(isValidTrackKey)
}

type TrackMockData = {
  id: string
  applicationDeadline: string
  spotsAvailable: number
  icon: string
  imageUrl?: string
}

export const getLocalizedTrack = (trackData: TrackMockData, t: TFunction): DetailedTrack => {
  const { id } = trackData
  const base = `tracks.items.${id}`

  return {
    id,
    label: t(`${base}.label`),
    description: t(`${base}.description`),
    tagline: t(`${base}.tagline`),
    intro: t(`${base}.intro`, { returnObjects: true }) as string[],
    duration: t(`${base}.duration`),
    format: t(`${base}.format`),
    skills: t(`${base}.skills`, { returnObjects: true }) as string[],
    projects: t(`${base}.projects`, { returnObjects: true }) as ProjectShowcase[],
    careerPaths: t(`${base}.careerPaths`, { returnObjects: true }) as string[],
    personas: t(`${base}.personas`, { returnObjects: true }) as Persona[],
    techStack: t(`${base}.techStack`, { returnObjects: true }) as TechStackItem[],
    curriculum: t(`${base}.curriculum`, { returnObjects: true }) as CurriculumPhase[],
    faq: t(`${base}.faq`, { returnObjects: true }) as TrackFaq[],
    nextCohort: t(`${base}.nextCohort`),
    applicationDeadline: trackData.applicationDeadline,
    spotsAvailable: trackData.spotsAvailable,
    icon: trackData.icon,
    imageUrl: trackData.imageUrl,
  }
}
