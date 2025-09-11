export type Partner = {
  name: string
  logoUrl: string
  href?: string
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
