import type { TrackKey } from '@/features/tracks'

export type Story = {
  id: string
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
  achievements: string[]
}

export type StoryCardProps = {
  story: Story
  onClick: (story: Story) => void
}
