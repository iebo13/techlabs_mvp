import jwt from 'jsonwebtoken'
import type { RequestHandler } from 'express'
import { env } from '../config/env'
import { createAppError } from '../lib/errors'
import type { UserClaims } from '../types/user'

const parseBearerToken = (value: string | undefined): string | null => {
  if (!value) return null

  const [scheme, token] = value.split(' ')
  if (scheme !== 'Bearer' || !token) return null

  return token
}

export const requireAuth: RequestHandler = (req, _res, next) => {
  const token = parseBearerToken(req.header('authorization'))
  if (!token) {
    return next(createAppError(401, 'UNAUTHORIZED', 'Missing bearer token'))
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as UserClaims
    req.user = decoded
    return next()
  } catch {
    return next(createAppError(401, 'UNAUTHORIZED', 'Invalid token'))
  }
}

export const requireAdmin: RequestHandler = (req, _res, next) => {
  if (!req.user) {
    return next(createAppError(401, 'UNAUTHORIZED', 'Not authenticated'))
  }

  if (req.user.role !== 'admin') {
    return next(createAppError(403, 'FORBIDDEN', 'Insufficient permissions'))
  }

  return next()
}
