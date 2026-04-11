import type { TrackKey } from '@/features/tracks'

export type StoryNarrative = {
  readonly challenge: string
  readonly discovery: string
  readonly experience: string
  readonly transformation: string
  readonly outcome: string
}

export type StoryMetric = {
  readonly label: string
  readonly value: string
}

/** Attribution for hotlinked Unsplash portraits (see Unsplash API guidelines). */
export type StoryPhotoCredit = {
  readonly photographer: string
  readonly profileUrl: string
  readonly photoPageUrl: string
}

export type Story = {
  id: string
  name?: string
  title: string
  excerpt: string
  fullDescription: string
  imageUrl: string
  /** Wide / landscape image for the detail-page hero (cards/avatars use {@link imageUrl}). */
  coverImageUrl?: string
  href: string
  track: TrackKey
  trackLabel: string
  graduationDate: string
  location: string
  currentRole: string
  company: string
  beforeRole?: string
  achievements: string[]
  quote?: string
  narrative?: StoryNarrative
  metrics?: StoryMetric[]
  photoCredit?: StoryPhotoCredit
}

export type StoryCardProps = {
  readonly story: Story
}
