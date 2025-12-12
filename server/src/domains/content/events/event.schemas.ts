import { z } from 'zod'

export const EventTypeSchema = z.enum(['upcoming', 'past'])

export const EventSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  blurb: z.string().min(1),
  date: z.string().min(1),
  location: z.string().min(1),
  type: EventTypeSchema,
  imageUrl: z.string().min(1),
  href: z.string().min(1),
})

export const CreateEventSchema = EventSchema.omit({ id: true })
export const UpdateEventSchema = EventSchema.partial().required({ id: true })

export type Event = z.infer<typeof EventSchema>
export type CreateEventInput = z.infer<typeof CreateEventSchema>
export type UpdateEventInput = z.infer<typeof UpdateEventSchema>
