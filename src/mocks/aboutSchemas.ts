import { z } from 'zod'

export const DepartmentKeySchema = z.enum(['leadership', 'mentors', 'tech', 'marketing', 'operations'])

export const DepartmentSchema = z.object({
  key: DepartmentKeySchema,
  label: z.string().min(1),
  description: z.string().min(1),
})

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
  department: DepartmentKeySchema,
  bio: z.string().min(1),
  imageUrl: z.string().min(1),
  socialLinks: z.object({ linkedin: z.string().url(), github: z.string().url() }).partial().nullish(),
})

export const TeamSchema = z.object({
  title: z.string().min(1).nullish(),
  description: z.string().min(1).nullish(),
  departments: z.array(DepartmentSchema).nullish(),
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
  timeline: TimelineSchema.nullish(),
  team: TeamSchema,
  contact: ContactSchema,
})

export type AboutDataValidated = z.infer<typeof AboutDataSchema>
export type DepartmentKeyValidated = z.infer<typeof DepartmentKeySchema>
export type DepartmentValidated = z.infer<typeof DepartmentSchema>
export type MissionValidated = z.infer<typeof MissionSchema>
export type ProgramValidated = z.infer<typeof ProgramSchema>
export type TimelineValidated = z.infer<typeof TimelineSchema>
export type TeamValidated = z.infer<typeof TeamSchema>
export type ContactValidated = z.infer<typeof ContactSchema>
