import type { Request, Response, NextFunction } from 'express'
import type { ZodSchema } from 'zod'
import { logger } from '../config/logger.js'

type ValidationTarget = 'body' | 'query' | 'params'

export const validate =
  (schema: ZodSchema, target: ValidationTarget = 'body') =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      const data = req[target]
      const validated = schema.parse(data)

      req[target] = validated

      next()
    } catch (error) {
      logger.error({ error }, 'Validation failed')

      res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid request data',
          details: error,
        },
      })
    }
  }
