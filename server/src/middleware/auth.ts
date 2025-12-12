import type { Response, NextFunction } from 'express'
import type { AuthRequest } from '../types/index.js'
import { verifyToken } from '../lib/jwt.js'
import { logger } from '../config/logger.js'

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required',
        },
      })
      return
    }

    const token = authHeader.slice(7) // Remove 'Bearer ' prefix

    const decoded = verifyToken(token)

    req.user = decoded

    next()
  } catch (error) {
    logger.error({ error }, 'Authentication failed')

    res.status(401).json({
      error: {
        code: 'INVALID_TOKEN',
        message: 'Invalid or expired token',
      },
    })
  }
}

export const authorize =
  (...roles: Array<'admin' | 'user'>) =>
  (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required',
        },
      })
      return
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        error: {
          code: 'FORBIDDEN',
          message: 'Insufficient permissions',
        },
      })
      return
    }

    next()
  }
