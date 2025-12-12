import { Router } from 'express'
import { z } from 'zod'
import { requireAuth, requireAdmin } from '../middleware/auth'
import { createAppError } from '../lib/errors'
import type { MemoryStore } from '../store/memoryStore'

const createEventSchema = z.object({
  title: z.string().min(1),
  blurb: z.string().min(1),
  date: z.string().min(1),
  location: z.string().min(1),
  type: z.enum(['upcoming', 'past']),
  imageUrl: z.string().min(1),
  href: z.string().min(1),
})

const updateEventSchema = createEventSchema.partial().extend({
  id: z.string().min(1),
})

const createBlogPostSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  featuredImage: z.string().optional(),
  author: z.string().min(1),
  tags: z.array(z.string()),
  status: z.enum(['draft', 'published']),
})

const updateBlogPostSchema = createBlogPostSchema.partial().extend({
  id: z.string().min(1),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  publishedAt: z.string().optional(),
})

export const createAdminRoutes = (store: MemoryStore): Router => {
  const router = Router()

  router.use(requireAuth, requireAdmin)

  // Events
  router.get('/events', (_req, res) => {
    return res.json({ data: store.getEvents() })
  })

  router.post('/events', (req, res, next) => {
    try {
      const input = createEventSchema.parse(req.body as unknown)
      const created = store.createEvent(input)
      return res.status(201).json({ data: created })
    } catch (err) {
      return next(err)
    }
  })

  router.put('/events/:id', (req, res, next) => {
    try {
      const input = updateEventSchema.parse({ ...(req.body as unknown), id: req.params.id })
      const updated = store.updateEvent(input)
      if (!updated) {
        return next(createAppError(404, 'NOT_FOUND', 'Event not found'))
      }
      return res.json({ data: updated })
    } catch (err) {
      return next(err)
    }
  })

  router.delete('/events/:id', (req, res, next) => {
    const ok = store.deleteEvent(req.params.id)
    if (!ok) {
      return next(createAppError(404, 'NOT_FOUND', 'Event not found'))
    }
    return res.status(204).send()
  })

  // Blog posts
  router.get('/blog-posts', (_req, res) => {
    return res.json({ data: store.getBlogPosts() })
  })

  router.post('/blog-posts', (req, res, next) => {
    try {
      const input = createBlogPostSchema.parse(req.body as unknown)
      const created = store.createBlogPost(input)
      return res.status(201).json({ data: created })
    } catch (err) {
      return next(err)
    }
  })

  router.put('/blog-posts/:id', (req, res, next) => {
    try {
      const input = updateBlogPostSchema.parse({ ...(req.body as unknown), id: req.params.id })
      const updated = store.updateBlogPost(input)
      if (!updated) {
        return next(createAppError(404, 'NOT_FOUND', 'Blog post not found'))
      }
      return res.json({ data: updated })
    } catch (err) {
      return next(err)
    }
  })

  router.delete('/blog-posts/:id', (req, res, next) => {
    const ok = store.deleteBlogPost(req.params.id)
    if (!ok) {
      return next(createAppError(404, 'NOT_FOUND', 'Blog post not found'))
    }
    return res.status(204).send()
  })

  return router
}
