import { env } from './config/env'
import { logger } from './lib/logger'
import { createApp } from './app'
import { createMemoryStore } from './store/memoryStore'

const start = async (): Promise<void> => {
  const store = await createMemoryStore()
  const app = createApp(store)

  const server = app.listen(env.PORT, () => {
    logger.info({ port: env.PORT }, 'api_started')
  })

  server.on('error', err => {
    logger.error({ err }, 'api_failed_to_start')
    process.exitCode = 1
  })
}

void start()
