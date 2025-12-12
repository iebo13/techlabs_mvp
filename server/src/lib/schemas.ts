import { z } from 'zod'

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
})

// Event schemas
export const createEventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  type: z.enum(['workshop', 'meetup', 'hackathon', 'networking', 'career', 'social', 'bootcamp', 'panel', 'graduation']),
  date: z.string().datetime(),
  location: z.string().min(1, 'Location is required'),
  blurb: z.string().min(1, 'Blurb is required').max(500),
  description: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal('')),
  registrationUrl: z.string().url().optional().or(z.literal('')),
  capacity: z.number().int().min(0).optional(),
  isPublished: z.boolean().default(true),
})

export const updateEventSchema = createEventSchema.partial()

// BlogPost schemas
export const createBlogPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  excerpt: z.string().min(1, 'Excerpt is required').max(500),
  content: z.string().min(1, 'Content is required'),
  featuredImage: z.string().url().optional().or(z.literal('')),
  author: z.string().default('TechLabs Team'),
  tags: z.array(z.string()).default([]),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
})

export const updateBlogPostSchema = createBlogPostSchema.partial()

// Track schemas
export const createTrackSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().min(1, 'Description is required'),
  duration: z.string().min(1, 'Duration is required'),
  icon: z.string().optional(),
  skills: z.array(z.string()).default([]),
  learningOutcomes: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
})

export const updateTrackSchema = createTrackSchema.partial()

// Story schemas
export const createStorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  track: z.string().min(1, 'Track is required'),
  quote: z.string().min(1, 'Quote is required').max(500),
  story: z.string().min(1, 'Story is required'),
  imageUrl: z.string().url().optional().or(z.literal('')),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  isPublished: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
})

export const updateStorySchema = createStorySchema.partial()

// Partner schemas
export const createPartnerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  logoUrl: z.string().url(),
  websiteUrl: z.string().url().optional().or(z.literal('')),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
})

export const updatePartnerSchema = createPartnerSchema.partial()

// Pagination schemas
export const paginationSchema = z.object({
  page: z.string().transform(Number).default('1'),
  limit: z.string().transform(Number).default('10'),
  sort: z.string().optional(),
  order: z.enum(['asc', 'desc']).optional().default('desc'),
})

// ID parameter schema
export const idParamSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format'),
})
