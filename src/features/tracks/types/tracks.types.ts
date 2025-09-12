export type TrackKey = 'web-dev' | 'data-science' | 'product-design' | 'ai'

export type Track = {
  id: TrackKey
  label: string
}

export type DetailedTrack = {
  id: string
  label: string
  description: string
  duration: string
  format: string
  skills: string[]
  projects: string[]
  careerPaths: string[]
  nextCohort: string
  applicationDeadline: string
  spotsAvailable: number
  icon: string
}

export type TrackCardProps = {
  track: DetailedTrack
  isExpanded?: boolean
  onToggle?: (trackId: string) => void
}
