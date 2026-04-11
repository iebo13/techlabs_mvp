import type { Event } from '../types/events.types'

const EVENTS_PATH_PREFIX = '/events/'

/**
 * Returns the URL slug segment for an event (stable id for routing).
 */
export const getEventSlugFromHref = (href: string): string => {
  if (!href.startsWith(EVENTS_PATH_PREFIX)) {
    return href.replace(/^\//, '')
  }

  return href.slice(EVENTS_PATH_PREFIX.length)
}

/**
 * Resolves an event from mock data by route slug.
 */
export const findEventBySlug = (events: readonly Event[], slug: string | undefined): Event | undefined => {
  if (!slug) {
    return undefined
  }

  return events.find(e => getEventSlugFromHref(e.href) === slug)
}
