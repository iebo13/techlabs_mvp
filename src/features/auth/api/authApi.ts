import { z } from 'zod'
import { apiFetch } from '@/config/http'
import { AuthUserSchema } from '../types/auth.types'

const loginResponseSchema = z.object({
  token: z.string().min(1),
  user: AuthUserSchema,
})

export type LoginResponse = z.infer<typeof loginResponseSchema>

const meResponseSchema = z.object({
  user: AuthUserSchema,
})

export type MeResponse = z.infer<typeof meResponseSchema>

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const data = await apiFetch<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

  return loginResponseSchema.parse(data)
}

export const getMe = async (): Promise<MeResponse> => {
  const data = await apiFetch<MeResponse>('/auth/me')

  return meResponseSchema.parse(data)
}
