import { Router } from 'express'
import authRoutes from './authRoutes.js'
import eventRoutes from './eventRoutes.js'
import blogPostRoutes from './blogPostRoutes.js'

const router = Router()

// Health check endpoint
router.get('/health', (_, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  })
})

// Mount routes
router.use('/auth', authRoutes)
router.use('/events', eventRoutes)
router.use('/blog-posts', blogPostRoutes)

export default router
