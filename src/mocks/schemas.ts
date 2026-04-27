import { z } from 'zod'
export const TrackKeySchema = z.enum(['web-dev', 'data-science', 'product-design', 'ai'])

export const TrackSchema = z.object({
  id: TrackKeySchema,
  label: z.string().min(1),
})

export const PartnerSchema = z.object({
  name: z.string().min(1),
  logoUrl: z.string().min(1), // Allow relative paths for MVP
  href: z.string().nullish(),
})

export const PartnerTierSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  color: z.string().min(1),
})

export const DetailedPartnerSchema = z.object({
  tier: z.string().min(1).nullish(),
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

export const PartnerTestimonialSchema = z.object({
  quote: z.string().min(1),
  name: z.string().min(1),
  role: z.string().min(1),
  company: z.string().min(1),
})

export const PartnerImpactMetricSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
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

export const StoryNarrativeSchema = z.object({
  challenge: z.string().min(1),
  discovery: z.string().min(1),
  experience: z.string().min(1),
  transformation: z.string().min(1),
  outcome: z.string().min(1),
})

export const StoryMetricSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
})

export const StoryPhotoCreditSchema = z.object({
  photographer: z.string().min(1),
  profileUrl: z.string().url(),
  photoPageUrl: z.string().url(),
})

export const StorySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).nullish(),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  fullDescription: z.string().min(1),
  imageUrl: z.string().min(1),
  coverImageUrl: z.string().url().nullish(),
  href: z.string().min(1),
  track: TrackKeySchema,
  trackLabel: z.string().min(1),
  graduationDate: z.string().min(1),
  location: z.string().min(1),
  currentRole: z.string().min(1),
  company: z.string().min(1),
  beforeRole: z.string().min(1).nullish(),
  achievements: z.array(z.string().min(1)).nullish(),
  quote: z.string().min(1).nullish(),
  narrative: StoryNarrativeSchema.nullish(),
  metrics: z.array(StoryMetricSchema).nullish(),
  photoCredit: StoryPhotoCreditSchema.nullish(),
})

export const EventTypeSchema = z.enum(['upcoming', 'past'])

export const EventAgendaItemSchema = z.object({
  time: z.string().min(1),
  title: z.string().min(1),
})

export const EventSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  blurb: z.string().min(1),
  date: z.string().min(1), // ISO date string
  location: z.string().min(1),
  type: EventTypeSchema,
  imageUrl: z.string().min(1),
  href: z.string().min(1),
  description: z.array(z.string().min(1)).min(1),
  highlights: z.array(z.string().min(1)).nullish(),
  agenda: z.array(EventAgendaItemSchema).nullish(),
  externalUrl: z.string().url().nullish(),
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

// About page schemas — split to aboutSchemas.ts for line limit
export {
  AboutDataSchema,
  ContactSchema,
  DepartmentKeySchema,
  DepartmentSchema,
  MissionSchema,
  ProgramPhaseSchema,
  ProgramSchema,
  TeamMemberSchema,
  TeamSchema,
  TimelineMilestoneSchema,
  TimelineSchema,
  ValueSchema,
} from './aboutSchemas'

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
export type EventTypeValidated = z.infer<typeof EventTypeSchema>
export type EventValidated = z.infer<typeof EventSchema>
export type PartnerValidated = z.infer<typeof PartnerSchema>
export type PartnerTierValidated = z.infer<typeof PartnerTierSchema>
export type DetailedPartnerValidated = z.infer<typeof DetailedPartnerSchema>
export type PartnersDataValidated = z.infer<typeof PartnersDataSchema>
export type PartnerTestimonialValidated = z.infer<typeof PartnerTestimonialSchema>
export type PartnerImpactMetricValidated = z.infer<typeof PartnerImpactMetricSchema>

// About page types
export type {
  AboutDataValidated,
  ContactValidated,
  DepartmentKeyValidated,
  DepartmentValidated,
  MissionValidated,
  ProgramValidated,
  TeamValidated,
  TimelineValidated,
} from './aboutSchemas'
export type FAQValidated = z.infer<typeof FAQSchema>
