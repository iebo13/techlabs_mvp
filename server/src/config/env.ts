import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).optional(),
  PORT: z.coerce.number().int().positive().default(4000),
  JWT_SECRET: z.string().min(16).default('dev-secret-change-me-now'),
  ADMIN_EMAIL: z.string().email().default('admin@techlabs.local'),
  ADMIN_PASSWORD: z.string().min(8).default('adminadmin'),
  ADMIN_PASSWORD_HASH: z.string().min(1).optional(),
})

export type Env = z.infer<typeof envSchema>

export const env = envSchema.parse(process.env)
