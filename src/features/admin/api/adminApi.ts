import { z } from 'zod'
import { apiFetch } from '@/config/http'
import {
  AdminEventSchema,
  BlogPostSchema,
  type AdminEvent,
  type BlogPost,
  type CreateBlogPostInput,
  type CreateEventInput,
  type UpdateBlogPostInput,
  type UpdateEventInput,
} from '../types'

const eventsSchema = z.array(AdminEventSchema)
const blogPostsSchema = z.array(BlogPostSchema)

export const getAdminEvents = async (): Promise<AdminEvent[]> => {
  const data = await apiFetch<AdminEvent[]>('/admin/events')

  return eventsSchema.parse(data)
}

export const createAdminEvent = async (input: CreateEventInput): Promise<AdminEvent> => {
  const data = await apiFetch<AdminEvent>('/admin/events', {
    method: 'POST',
    body: JSON.stringify(input),
  })

  return AdminEventSchema.parse(data)
}

export const updateAdminEvent = async (input: UpdateEventInput): Promise<AdminEvent> => {
  const { id, ...rest } = input
  const data = await apiFetch<AdminEvent>(`/admin/events/${id}`, {
    method: 'PUT',
    body: JSON.stringify(rest),
  })

  return AdminEventSchema.parse(data)
}

export const deleteAdminEvent = async (id: string): Promise<void> => {
  await apiFetch<void>(`/admin/events/${id}`, { method: 'DELETE' })
}

export const getAdminBlogPosts = async (): Promise<BlogPost[]> => {
  const data = await apiFetch<BlogPost[]>('/admin/blog-posts')

  return blogPostsSchema.parse(data)
}

export const createAdminBlogPost = async (input: CreateBlogPostInput): Promise<BlogPost> => {
  const data = await apiFetch<BlogPost>('/admin/blog-posts', {
    method: 'POST',
    body: JSON.stringify(input),
  })

  return BlogPostSchema.parse(data)
}

export const updateAdminBlogPost = async (input: UpdateBlogPostInput): Promise<BlogPost> => {
  const { id, ...rest } = input
  const data = await apiFetch<BlogPost>(`/admin/blog-posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(rest),
  })

  return BlogPostSchema.parse(data)
}

export const deleteAdminBlogPost = async (id: string): Promise<void> => {
  await apiFetch<void>(`/admin/blog-posts/${id}`, { method: 'DELETE' })
}
