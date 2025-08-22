/**
 * Zod validation schemas for mock data
 * Ensures runtime type safety for all JSON data
 */

import { z } from 'zod'

// Base schemas
export const TrackKeySchema = z.enum(['web-dev', 'data-science', 'product-design', 'ai'])

export const TrackSchema = z.object({
  id: TrackKeySchema,
  label: z.string().min(1),
})

export const PartnerSchema = z.object({
  name: z.string().min(1),
  logoUrl: z.string().min(1), // Allow relative paths for MVP
  href: z.string().optional(),
})

export const PartnerTierSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  color: z.string().min(1),
})

export const DetailedPartnerSchema = z.object({
  tier: z.string().min(1),
  name: z.string().min(1),
  logoUrl: z.string().min(1),
  description: z.string().min(1),
  website: z.string().url(),
  category: z.string().min(1),
})

export const PartnersDataSchema = z.object({
  partners: z.array(DetailedPartnerSchema),
  tiers: z.array(PartnerTierSchema),
})

export const VideoDataSchema = z.object({
  posterUrl: z.string().min(1), // Allow relative paths for MVP
  srcUrl: z.string().min(1), // Allow relative paths for MVP
  duration: z.number().positive(),
})

export const FeatureSchema = z.object({
  icon: z.string().min(1),
  title: z.string().min(1),
  body: z.string().min(1),
})

export const StorySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  fullDescription: z.string().min(1),
  imageUrl: z.string().min(1), // Allow relative paths for MVP
  href: z.string().min(1),
  track: TrackKeySchema,
  trackLabel: z.string().min(1),
  graduationDate: z.string().min(1),
  location: z.string().min(1),
  currentRole: z.string().min(1),
  company: z.string().min(1),
  achievements: z.array(z.string().min(1)),
})

export const NumberStatSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
})

export const SupportDataSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  imageUrl: z.string().min(1), // Allow relative paths for MVP
  cta: z.object({
    label: z.string().min(1),
    to: z.string().min(1),
  }),
})

export const FAQSchema = z.object({
  q: z.string().min(1),
  a: z.string().min(1),
})

// About page schemas
export const ValueSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
})

export const MissionSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1),
  description: z.string().min(1),
  values: z.array(ValueSchema),
})

export const ProgramPhaseSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  duration: z.string().min(1),
  icon: z.string().min(1),
})

export const ProgramSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  phases: z.array(ProgramPhaseSchema),
})

export const TimelineMilestoneSchema = z.object({
  year: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
})

export const TimelineSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  milestones: z.array(TimelineMilestoneSchema),
})

export const TeamMemberSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  bio: z.string().min(1),
  imageUrl: z.string().min(1),
})

export const TeamSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  members: z.array(TeamMemberSchema),
})

export const ContactSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  address: z.string().min(1),
  social: z.object({
    linkedin: z.string().url(),
    twitter: z.string().url(),
    github: z.string().url(),
  }),
})

export const AboutDataSchema = z.object({
  mission: MissionSchema,
  program: ProgramSchema,
  timeline: TimelineSchema,
  team: TeamSchema,
  contact: ContactSchema,
})

export const HeroDataSchema = z.object({
  title: z.string().min(1),
  emphasis: z.string().min(1),
  subtitle: z.string().min(1),
})

// Main schema
export const HomeDataSchema = z.object({
  hero: HeroDataSchema,
  tracks: z.array(TrackSchema).min(1),
  applicationDeadlineISO: z.string().datetime(),
  partners: z.array(PartnerSchema),
  video: VideoDataSchema,
  features: z.array(FeatureSchema),
  stories: z.array(StorySchema),
  numbers: z.array(NumberStatSchema),
  support: SupportDataSchema,
  faqs: z.array(FAQSchema),
})

// Export types inferred from schemas
export type HomeDataValidated = z.infer<typeof HomeDataSchema>
export type TrackKeyValidated = z.infer<typeof TrackKeySchema>
export type TrackValidated = z.infer<typeof TrackSchema>
export type StoryValidated = z.infer<typeof StorySchema>
export type PartnerValidated = z.infer<typeof PartnerSchema>
export type PartnerTierValidated = z.infer<typeof PartnerTierSchema>
export type DetailedPartnerValidated = z.infer<typeof DetailedPartnerSchema>
export type PartnersDataValidated = z.infer<typeof PartnersDataSchema>

// About page types
export type AboutDataValidated = z.infer<typeof AboutDataSchema>
export type MissionValidated = z.infer<typeof MissionSchema>
export type ProgramValidated = z.infer<typeof ProgramSchema>
export type TimelineValidated = z.infer<typeof TimelineSchema>
export type TeamValidated = z.infer<typeof TeamSchema>
export type ContactValidated = z.infer<typeof ContactSchema>
export type FAQValidated = z.infer<typeof FAQSchema>
