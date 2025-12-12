import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

type JwtPayload = {
  id: string
  email: string
  role: 'admin' | 'user'
}

export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  })
}

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload
}
