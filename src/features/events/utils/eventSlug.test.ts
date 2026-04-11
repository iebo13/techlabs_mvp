import eventsData from '@/mocks/events.json'
import type { Event } from '../types/events.types'
import { findEventBySlug, getEventSlugFromHref } from './eventSlug'

const events = eventsData.events as Event[]

describe('eventSlug', () => {
  it('getEventSlugFromHref extracts slug after /events/', () => {
    expect(getEventSlugFromHref('/events/techlabs-dusseldorf-meetup')).toBe('techlabs-dusseldorf-meetup')
  })

  it('findEventBySlug returns event for known slug', () => {
    const found = findEventBySlug(events, 'web-development-workshop')
    expect(found?.title).toBe('Web Development Workshop')
  })

  it('findEventBySlug returns undefined for unknown slug', () => {
    expect(findEventBySlug(events, 'does-not-exist')).toBeUndefined()
  })

  it('findEventBySlug returns undefined when slug is undefined', () => {
    expect(findEventBySlug(events, undefined)).toBeUndefined()
  })
})
