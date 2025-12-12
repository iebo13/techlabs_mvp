import type { UserClaims } from '../types/user'

declare global {
  namespace Express {
    type User = UserClaims

    interface Request {
      user?: User
    }
  }
}

export {}
