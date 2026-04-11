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

export type Story = {
  id: string
  name?: string
  title: string
  excerpt: string
  fullDescription: string
  imageUrl: string
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
}

export type StoryCardProps = {
  readonly story: Story
}
