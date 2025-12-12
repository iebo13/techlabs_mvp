import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('5000'),
  MONGO_URI: z.string().default('mongodb://localhost:27017/techlabs'),
  JWT_SECRET: z.string().default('supersecret'),
  CORS_ORIGIN: z.string().default('*'),
});

export const env = envSchema.parse(process.env);
