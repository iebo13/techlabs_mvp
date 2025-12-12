import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import pinoHttp from 'pino-http'
import { env } from './config/env.js'
import { logger } from './config/logger.js'
import { connectDatabase } from './config/database.js'
import routes from './routes/index.js'
import { errorHandler, notFoundHandler } from './middleware/index.js'

const app = express()

// Security middleware
app.use(helmet())

// CORS middleware
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
)

// Request logging middleware
app.use(
  pinoHttp({
    logger,
    customLogLevel: (_, res) => {
      if (res.statusCode >= 500) return 'error'
      if (res.statusCode >= 400) return 'warn'
      return 'info'
    },
    customSuccessMessage: (_, res) => {
      return `${res.statusCode} - Request completed`
    },
    customErrorMessage: (_, res) => {
      return `${res.statusCode} - Request failed`
    },
  })
)

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// API routes
app.use('/api', routes)

// Error handling
app.use(notFoundHandler)
app.use(errorHandler)

// Start server
const startServer = async (): Promise<void> => {
  try {
    // Connect to database
    await connectDatabase()

    // Start listening
    app.listen(env.PORT, () => {
      logger.info(`🚀 Server running on port ${env.PORT}`)
      logger.info(`📝 Environment: ${env.NODE_ENV}`)
      logger.info(`🔗 API: http://localhost:${env.PORT}/api`)
    })
  } catch (error) {
    logger.error({ error }, '❌ Failed to start server')
    process.exit(1)
  }
}

// Graceful shutdown
const gracefulShutdown = async (): Promise<void> => {
  logger.info('🔄 Starting graceful shutdown...')

  // Close database connection
  const mongoose = await import('mongoose')
  await mongoose.connection.close()

  logger.info('✅ Graceful shutdown completed')
  process.exit(0)
}

process.on('SIGTERM', gracefulShutdown)
process.on('SIGINT', gracefulShutdown)

// Start the server
startServer()
