import type { Partner } from "@/features/partners/types/partners.type"

export type TrackKey = 'web-dev' | 'data-science' | 'product-design' | 'ai'

export type Track = {
    id: TrackKey
    label: string
}



export type PartnerTier = {
    id: string
    name: string
    description: string
    color: string
}

export type DetailedPartner = {
    tier: string
    name: string
    logoUrl: string
    description: string
    website: string
    category: string
}

export type PartnersData = {
    partners: DetailedPartner[]
    tiers: PartnerTier[]
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
