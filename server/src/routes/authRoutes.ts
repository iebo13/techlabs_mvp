import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { env } from '../config/env'
import { createAppError } from '../lib/errors'
import { requireAuth } from '../middleware/auth'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export const authRoutes = Router()

authRoutes.post('/login', async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body as unknown)

    if (email.toLowerCase() !== env.ADMIN_EMAIL.toLowerCase()) {
      return next(createAppError(401, 'INVALID_CREDENTIALS', 'Invalid email or password'))
    }

    const ok = env.ADMIN_PASSWORD_HASH
      ? await bcrypt.compare(password, env.ADMIN_PASSWORD_HASH)
      : password === env.ADMIN_PASSWORD
    if (!ok) {
      return next(createAppError(401, 'INVALID_CREDENTIALS', 'Invalid email or password'))
    }

    const token = jwt.sign({ sub: 'admin-1', email, role: 'admin' }, env.JWT_SECRET, {
      expiresIn: '8h',
    })

    return res.json({
      data: {
        token,
        user: {
          id: 'admin-1',
          email,
          role: 'admin',
        },
      },
    })
  } catch (err) {
    return next(err)
  }
})

authRoutes.get('/me', requireAuth, (req, res, next) => {
  try {
    if (!req.user) {
      return next(createAppError(401, 'UNAUTHORIZED', 'Not authenticated'))
    }

    return res.json({
      data: {
        user: {
          id: req.user.sub,
          email: req.user.email,
          role: req.user.role,
        },
      },
    })
  } catch (err) {
    return next(err)
  }
})
