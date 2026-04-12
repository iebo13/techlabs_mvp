import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import { useSanityData } from '@/config/dataSource'
import { useI18n } from '@/hooks'
import { EventSchema } from '@/mocks/schemas'
import { sanityFetch } from '@/utils/sanityFetch'
import { ALL_EVENTS_QUERY, EVENT_BY_SLUG_QUERY } from '../api/eventQueries'

const EventsArraySchema = z.array(EventSchema)

export const useEvents = () => {
  const isSanity = useSanityData()
  const { currentLanguage: lang } = useI18n()

  return useQuery({
    queryKey: ['events', lang],
    queryFn: async () => {
      if (!isSanity) {
        const eventsData = await import('@/mocks/events.json')

        return EventsArraySchema.parse(eventsData.events)
      }

      return sanityFetch(ALL_EVENTS_QUERY, { lang }, EventsArraySchema)
    },
    staleTime: 5 * 60 * 1000,
  })
}

export const useEventBySlug = (slug: string) => {
  const isSanity = useSanityData()
  const { currentLanguage: lang } = useI18n()

  return useQuery({
    queryKey: ['events', slug, lang],
    queryFn: async (): Promise<z.infer<typeof EventSchema> | null> => {
      if (!isSanity) {
        const eventsData = await import('@/mocks/events.json')
        const events = EventsArraySchema.parse(eventsData.events)

        return events.find(e => e.href === `/events/${slug}`) ?? null
      }

      return sanityFetch(EVENT_BY_SLUG_QUERY, { slug, lang }, EventSchema.nullable())
    },
    enabled: Boolean(slug),
  })
}
