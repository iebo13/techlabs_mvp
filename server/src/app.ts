import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import pinoHttp from 'pino-http'
import { env } from './config/env'
import { logger } from './lib/logger'
import { mapUnknownError } from './lib/errors'
import { authRoutes } from './routes/authRoutes'
import { createAdminRoutes } from './routes/adminRoutes'
import type { MemoryStore } from './store/memoryStore'

export const createApp = (store: MemoryStore): express.Express => {
  const app = express()

  app.disable('x-powered-by')

  app.use(
    pinoHttp({
      logger,
      genReqId: req => {
        const id = req.headers['x-request-id']
        return typeof id === 'string' ? id : undefined
      },
    })
  )

  app.use(helmet())
  app.use(
    cors({
      origin: env.NODE_ENV === 'production' ? false : true,
      credentials: true,
    })
  )
  app.use(express.json({ limit: '1mb' }))

  app.get('/api/health', (_req, res) => {
    return res.json({ data: { ok: true } })
  })

  app.use('/api/auth', authRoutes)
  app.use('/api/admin', createAdminRoutes(store))

  app.use((err: unknown, req: express.Request, res: express.Response, _next: express.NextFunction) => {
    const mapped = mapUnknownError(err)
    const traceId = typeof req.id === 'string' ? req.id : undefined

    req.log.error({ err, traceId }, 'request_failed')

    return res.status(mapped.status).json({
      error: {
        ...mapped.error,
        ...(traceId ? { traceId } : {}),
      },
    })
  })

  return app
}
