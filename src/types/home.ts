/**
 * Type definitions for homepage data structure
 * Based on MVP.md specification
 */

export type TrackKey = 'web-dev' | 'data-science' | 'product-design' | 'ai'

export type Track = {
  id: TrackKey
  label: string
}

export type Partner = {
  name: string
  logoUrl: string
  href?: string
}

export type VideoData = {
  posterUrl: string
  srcUrl: string
  duration: number // seconds
}

export type Feature = {
  icon: string
  title: string
  body: string
}

export type Story = {
  id: string
  title: string
  excerpt: string
  imageUrl: string
  href: string
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
  applicationDeadlineISO: string // e.g., '2025-10-01T00:00:00Z'
  partners: Partner[]
  video: VideoData
  features: Feature[]
  stories: Story[]
  numbers: NumberStat[]
  support: SupportData
  faqs: FAQ[]
}
