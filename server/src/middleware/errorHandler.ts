import type { Request, Response, NextFunction } from 'express'
import type { ApiErrorResponse } from '../types/index.js'
import { logger } from '../config/logger.js'
import { env } from '../config/env.js'

export const errorHandler = (error: Error, req: Request, res: Response, _next: NextFunction): void => {
  logger.error({ error, path: req.path, method: req.method }, 'Request error')

  // Generate trace ID for error tracking
  const traceId = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

  // Default error response
  const errorResponse: ApiErrorResponse = {
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred',
      traceId,
    },
  }

  // Handle specific error types
  if (error.name === 'ValidationError') {
    errorResponse.error.code = 'VALIDATION_ERROR'
    errorResponse.error.message = 'Invalid data provided'
    res.status(400)
  } else if (error.name === 'CastError') {
    errorResponse.error.code = 'INVALID_ID'
    errorResponse.error.message = 'Invalid resource ID'
    res.status(400)
  } else if (error.name === 'MongoServerError' && 'code' in error && error.code === 11000) {
    errorResponse.error.code = 'DUPLICATE_ENTRY'
    errorResponse.error.message = 'Resource already exists'
    res.status(409)
  } else {
    res.status(500)
  }

  // Include error details in development
  if (env.NODE_ENV === 'development') {
    errorResponse.error.details = {
      message: error.message,
      stack: error.stack,
    }
  }

  res.json(errorResponse)
}

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.path} not found`,
    },
  })
}
