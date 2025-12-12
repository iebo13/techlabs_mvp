import { Router } from 'express'
import { blogPostController } from '../controllers/index.js'
import { authenticate, authorize, validate } from '../middleware/index.js'
import { createBlogPostSchema, updateBlogPostSchema, idParamSchema, paginationSchema } from '../lib/schemas.js'

const router = Router()

// GET /api/blog-posts - Get all blog posts (public)
router.get('/', validate(paginationSchema, 'query'), blogPostController.getAllBlogPosts)

// GET /api/blog-posts/:id - Get blog post by ID (public)
router.get('/:id', validate(idParamSchema, 'params'), blogPostController.getBlogPostById)

// POST /api/blog-posts - Create blog post (admin only)
router.post(
  '/',
  authenticate,
  authorize('admin'),
  validate(createBlogPostSchema),
  blogPostController.createBlogPost
)

// PUT /api/blog-posts/:id - Update blog post (admin only)
router.put(
  '/:id',
  authenticate,
  authorize('admin'),
  validate(idParamSchema, 'params'),
  validate(updateBlogPostSchema),
  blogPostController.updateBlogPost
)

// DELETE /api/blog-posts/:id - Delete blog post (admin only)
router.delete(
  '/:id',
  authenticate,
  authorize('admin'),
  validate(idParamSchema, 'params'),
  blogPostController.deleteBlogPost
)

export default router
