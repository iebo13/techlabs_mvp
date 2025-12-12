import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { z } from 'zod'
import { EventSchema, type Event } from '../../domains/content/events/event.schemas'

const eventsFileSchema = z.object({
  events: z.array(EventSchema),
})

export const loadSeedEvents = async (): Promise<Event[]> => {
  const eventsPath = path.resolve(process.cwd(), 'src/mocks/events.json')
  const raw = await readFile(eventsPath, { encoding: 'utf8' })
  const parsed = eventsFileSchema.parse(JSON.parse(raw) as unknown)

  return parsed.events
}
