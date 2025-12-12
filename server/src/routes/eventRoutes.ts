import { Router } from 'express'
import { eventController } from '../controllers/index.js'
import { authenticate, authorize, validate } from '../middleware/index.js'
import { createEventSchema, updateEventSchema, idParamSchema, paginationSchema } from '../lib/schemas.js'

const router = Router()

// GET /api/events - Get all events (public)
router.get('/', validate(paginationSchema, 'query'), eventController.getAllEvents)

// GET /api/events/:id - Get event by ID (public)
router.get('/:id', validate(idParamSchema, 'params'), eventController.getEventById)

// POST /api/events - Create event (admin only)
router.post('/', authenticate, authorize('admin'), validate(createEventSchema), eventController.createEvent)

// PUT /api/events/:id - Update event (admin only)
router.put(
  '/:id',
  authenticate,
  authorize('admin'),
  validate(idParamSchema, 'params'),
  validate(updateEventSchema),
  eventController.updateEvent
)

// DELETE /api/events/:id - Delete event (admin only)
router.delete('/:id', authenticate, authorize('admin'), validate(idParamSchema, 'params'), eventController.deleteEvent)

export default router
