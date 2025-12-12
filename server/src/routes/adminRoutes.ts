import { Router } from 'express'
import { requireAuth, requireAdmin } from '../middleware/auth'
import { createAppError } from '../lib/errors'
import { CreateBlogPostSchema, UpdateBlogPostSchema } from '../domains/content/blogPosts/blogPost.schemas'
import { CreateEventSchema, UpdateEventSchema } from '../domains/content/events/event.schemas'
import type { MemoryStore } from '../store/memory/memoryStore'

export const createAdminRoutes = (store: MemoryStore): Router => {
  const router = Router()

  router.use(requireAuth, requireAdmin)

  // Events
  router.get('/events', (_req, res) => {
    return res.json({ data: store.getEvents() })
  })

  router.post('/events', (req, res, next) => {
    try {
      const input = CreateEventSchema.parse(req.body as unknown)
      const created = store.createEvent(input)
      return res.status(201).json({ data: created })
    } catch (err) {
      return next(err)
    }
  })

  router.put('/events/:id', (req, res, next) => {
    try {
      const input = UpdateEventSchema.parse({ ...(req.body as unknown), id: req.params.id })
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
      const input = CreateBlogPostSchema.parse(req.body as unknown)
      const created = store.createBlogPost(input)
      return res.status(201).json({ data: created })
    } catch (err) {
      return next(err)
    }
  })

  router.put('/blog-posts/:id', (req, res, next) => {
    try {
      const input = UpdateBlogPostSchema.parse({ ...(req.body as unknown), id: req.params.id })
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
