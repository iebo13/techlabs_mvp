import type { EventValidated } from '@/mocks/schemas'

export type Event = EventValidated

export type EventCardProps = {
  readonly event: Event
}
