import { Router } from 'express'
import { authController } from '../controllers/index.js'
import { authenticate, validate } from '../middleware/index.js'
import { loginSchema, registerSchema } from '../lib/schemas.js'

const router = Router()

// POST /api/auth/login - User login
router.post('/login', validate(loginSchema), authController.login)

// POST /api/auth/register - User registration
router.post('/register', validate(registerSchema), authController.register)

// GET /api/auth/me - Get current user (protected)
router.get('/me', authenticate, authController.getMe)

export default router
