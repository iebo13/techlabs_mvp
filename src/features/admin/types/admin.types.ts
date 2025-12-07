/**
 * Admin module type definitions
 * Provides types for CRUD operations on Events and Blog Posts
 */

import { z } from 'zod'

// Entity status as const object (compatible with erasableSyntaxOnly)
export const EntityStatus = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
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

// Blog Post status
export const BlogPostStatus = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
} as const

export type BlogPostStatusValue = (typeof BlogPostStatus)[keyof typeof BlogPostStatus]

// Blog Post schema and type
export const BlogPostSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  content: z.string().min(1, 'Content is required'),
  featuredImage: z.string().optional(),
  author: z.string().min(1, 'Author is required'),
  tags: z.array(z.string()),
  status: z.enum(['draft', 'published']),
  publishedAt: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const CreateBlogPostSchema = BlogPostSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  publishedAt: true,
})

export const UpdateBlogPostSchema = BlogPostSchema.partial().required({ id: true })

export type BlogPost = z.infer<typeof BlogPostSchema>
export type CreateBlogPostInput = z.infer<typeof CreateBlogPostSchema>
export type UpdateBlogPostInput = z.infer<typeof UpdateBlogPostSchema>

// Generic CRUD operation types
export type EntityType = 'event' | 'blogPost'

export type CrudOperation = 'create' | 'read' | 'update' | 'delete'

export type AdminEntity = AdminEvent | BlogPost

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
  blogPosts: BlogPost[]
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
  | { type: 'SET_BLOG_POSTS'; payload: BlogPost[] }
  | { type: 'ADD_BLOG_POST'; payload: BlogPost }
  | { type: 'UPDATE_BLOG_POST'; payload: BlogPost }
  | { type: 'DELETE_BLOG_POST'; payload: string }
