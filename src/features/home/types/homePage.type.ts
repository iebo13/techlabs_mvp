import type { Partner } from '@/features/partners'
import type { Story } from '@/features/stories'
import type { Track } from '@/features/tracks'

export type VideoData = {
  posterUrl: string
  srcUrl: string
  duration: number
}

export type Feature = {
  icon: string
  title: string
  body: string
}

export type NumberStat = {
  label: string
  value: string
}

export type SupportData = {
  title: string
  body: string
  imageUrl: string
  cta: {
    label: string
    to: string
  }
}

export type FAQ = {
  q: string
  a: string
}

export type HeroData = {
  title: string
  emphasis: string
  subtitle: string
}

export type HomeData = {
  hero: HeroData
  tracks: Track[]
  applicationDeadlineISO: string
  partners: Partner[]
  video: VideoData
  features: Feature[]
  stories: Story[]
  numbers: NumberStat[]
  support: SupportData
  faqs: FAQ[]
}
