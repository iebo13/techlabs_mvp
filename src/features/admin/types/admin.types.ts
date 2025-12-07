/**
 * Admin module type definitions
 * Provides types for CRUD operations on Events, Stories, and Partners
 */

import { z } from 'zod'

// Entity status as const object (compatible with erasableSyntaxOnly)
export const EntityStatus = {
  ACTIVE: 'active',
  DRAFT: 'draft',
  ARCHIVED: 'archived',
} as const

export type EntityStatusType = (typeof EntityStatus)[keyof typeof EntityStatus]

// Event type as const object
export const EventType = {
  UPCOMING: 'upcoming',
  PAST: 'past',
} as const

export type EventTypeValue = (typeof EventType)[keyof typeof EventType]

// Admin Event schema and type
export const AdminEventSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1, 'Title is required'),
  blurb: z.string().min(1, 'Description is required'),
  date: z.string().min(1, 'Date is required'),
  location: z.string().min(1, 'Location is required'),
  type: z.enum(['upcoming', 'past']),
  imageUrl: z.string().min(1, 'Image URL is required'),
  href: z.string().min(1, 'Link is required'),
})

export const CreateEventSchema = AdminEventSchema.omit({ id: true })
export const UpdateEventSchema = AdminEventSchema.partial().required({ id: true })

export type AdminEvent = z.infer<typeof AdminEventSchema>
export type CreateEventInput = z.infer<typeof CreateEventSchema>
export type UpdateEventInput = z.infer<typeof UpdateEventSchema>

// Track key as const object
export const TrackKey = {
  WEB_DEV: 'web-dev',
  DATA_SCIENCE: 'data-science',
  PRODUCT_DESIGN: 'product-design',
  AI: 'ai',
} as const

export type TrackKeyValue = (typeof TrackKey)[keyof typeof TrackKey]

// Admin Story schema and type
export const AdminStorySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1, 'Title is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  fullDescription: z.string().min(1, 'Full description is required'),
  imageUrl: z.string().min(1, 'Image URL is required'),
  href: z.string().min(1, 'Link is required'),
  track: z.enum(['web-dev', 'data-science', 'product-design', 'ai']),
  trackLabel: z.string().min(1, 'Track label is required'),
  graduationDate: z.string().min(1, 'Graduation date is required'),
  location: z.string().min(1, 'Location is required'),
  currentRole: z.string().min(1, 'Current role is required'),
  company: z.string().min(1, 'Company is required'),
  achievements: z.array(z.string().min(1)).min(1, 'At least one achievement is required'),
})

export const CreateStorySchema = AdminStorySchema.omit({ id: true })
export const UpdateStorySchema = AdminStorySchema.partial().required({ id: true })

export type AdminStory = z.infer<typeof AdminStorySchema>
export type CreateStoryInput = z.infer<typeof CreateStorySchema>
export type UpdateStoryInput = z.infer<typeof UpdateStorySchema>

// Admin Partner schema and type
export const AdminPartnerSchema = z.object({
  id: z.string().min(1),
  tier: z.string().min(1, 'Tier is required'),
  name: z.string().min(1, 'Name is required'),
  logoUrl: z.string().min(1, 'Logo URL is required'),
  description: z.string().min(1, 'Description is required'),
  website: z.string().url('Valid URL is required'),
  category: z.string().min(1, 'Category is required'),
})

export const CreatePartnerSchema = AdminPartnerSchema.omit({ id: true })
export const UpdatePartnerSchema = AdminPartnerSchema.partial().required({ id: true })

export type AdminPartner = z.infer<typeof AdminPartnerSchema>
export type CreatePartnerInput = z.infer<typeof CreatePartnerSchema>
export type UpdatePartnerInput = z.infer<typeof UpdatePartnerSchema>

// Generic CRUD operation types
export type EntityType = 'event' | 'story' | 'partner'

export type CrudOperation = 'create' | 'read' | 'update' | 'delete'

export type AdminEntity = AdminEvent | AdminStory | AdminPartner

// Table column definition
export type TableColumn<T> = {
  id: keyof T | 'actions'
  label: string
  minWidth?: number
  align?: 'left' | 'right' | 'center'
  format?: (value: T[keyof T]) => string
}

// Admin state type
export type AdminState = {
  events: AdminEvent[]
  stories: AdminStory[]
  partners: AdminPartner[]
  loading: boolean
  error: string | null
}

// Admin action types
export type AdminAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_EVENTS'; payload: AdminEvent[] }
  | { type: 'ADD_EVENT'; payload: AdminEvent }
  | { type: 'UPDATE_EVENT'; payload: AdminEvent }
  | { type: 'DELETE_EVENT'; payload: string }
  | { type: 'SET_STORIES'; payload: AdminStory[] }
  | { type: 'ADD_STORY'; payload: AdminStory }
  | { type: 'UPDATE_STORY'; payload: AdminStory }
  | { type: 'DELETE_STORY'; payload: string }
  | { type: 'SET_PARTNERS'; payload: AdminPartner[] }
  | { type: 'ADD_PARTNER'; payload: AdminPartner }
  | { type: 'UPDATE_PARTNER'; payload: AdminPartner }
  | { type: 'DELETE_PARTNER'; payload: string }
