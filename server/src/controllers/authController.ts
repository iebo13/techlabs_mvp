import type { Request, Response } from 'express'
import type { AuthRequest } from '../types/index.js'
import { authService } from '../services/index.js'
import { logger } from '../config/logger.js'

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body

    const result = await authService.login({ email, password })

    res.json({
      data: {
        user: result.user,
        token: result.token,
      },
    })
  } catch (error) {
    logger.error({ error }, 'Login failed')

    res.status(401).json({
      error: {
        code: 'LOGIN_FAILED',
        message: error instanceof Error ? error.message : 'Login failed',
      },
    })
  }
}

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, firstName, lastName } = req.body

    const result = await authService.register({ email, password, firstName, lastName })

    res.status(201).json({
      data: {
        user: result.user,
        token: result.token,
      },
    })
  } catch (error) {
    logger.error({ error }, 'Registration failed')

    res.status(400).json({
      error: {
        code: 'REGISTRATION_FAILED',
        message: error instanceof Error ? error.message : 'Registration failed',
      },
    })
  }
}

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required',
        },
      })
      return
    }

    const user = await authService.getMe(req.user.id)

    res.json({
      data: user,
    })
  } catch (error) {
    logger.error({ error }, 'Get user failed')

    res.status(404).json({
      error: {
        code: 'USER_NOT_FOUND',
        message: 'User not found',
      },
    })
  }
}
