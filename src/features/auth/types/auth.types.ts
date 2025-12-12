import { z } from 'zod'

export const UserRole = {
  ADMIN: 'admin',
} as const

export type UserRoleValue = (typeof UserRole)[keyof typeof UserRole]

export const AuthUserSchema = z.object({
  id: z.string().min(1),
  email: z.string().email(),
  role: z.enum(['admin']),
})

export type AuthUser = z.infer<typeof AuthUserSchema>
