import mongoose from 'mongoose'
import { env } from './env.js'
import { logger } from './logger.js'

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(env.MONGODB_URI)

    logger.info('✅ MongoDB connected successfully')

    mongoose.connection.on('error', (error) => {
      logger.error({ error }, 'MongoDB connection error')
    })

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected')
    })
  } catch (error) {
    logger.error({ error }, '❌ MongoDB connection failed')
    process.exit(1)
  }
}

export const disconnectDatabase = async (): Promise<void> => {
  await mongoose.connection.close()
  logger.info('MongoDB connection closed')
}
