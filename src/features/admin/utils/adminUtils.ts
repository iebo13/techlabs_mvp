/**
 * Admin utility functions
 * Helper functions for admin CRUD operations
 */

import {
  type AdminEvent,
  type AdminStory,
  type AdminPartner,
  type CreateEventInput,
  type CreateStoryInput,
  type CreatePartnerInput,
  type EventTypeValue,
  type TrackKeyValue,
  EventType,
  TrackKey,
} from '../types'

/**
 * Generate a unique ID for new entities
 * Uses timestamp + random string for uniqueness
 */
export const generateId = (): string => {
  const timestamp = Date.now().toString(36)
  const randomPart = Math.random().toString(36).slice(2, 11)

  return `${timestamp}-${randomPart}`
}

/**
 * Format date for display
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Format date for input field (ISO format)
 */
export const formatDateForInput = (dateString: string): string => {
  const date = new Date(dateString)

  return date.toISOString().slice(0, 16)
}

/**
 * Create a new event with generated ID
 */
export const createEventWithId = (input: CreateEventInput): AdminEvent => ({
  ...input,
  id: generateId(),
})

/**
 * Create a new story with generated ID
 */
export const createStoryWithId = (input: CreateStoryInput): AdminStory => ({
  ...input,
  id: generateId(),
})

/**
 * Create a new partner with generated ID
 */
export const createPartnerWithId = (input: CreatePartnerInput): AdminPartner => ({
  ...input,
  id: generateId(),
})

/**
 * Get default event form values
 */
export const getDefaultEventValues = (): CreateEventInput => ({
  title: '',
  blurb: '',
  date: new Date().toISOString(),
  location: '',
  type: EventType.UPCOMING,
  imageUrl: '/img/events/meetup.jpg',
  href: '/events/',
})

/**
 * Get default story form values
 */
export const getDefaultStoryValues = (): CreateStoryInput => ({
  title: '',
  excerpt: '',
  fullDescription: '',
  imageUrl: '/public/stories/person1.png',
  href: '/stories/',
  track: TrackKey.WEB_DEV,
  trackLabel: 'Web Development',
  graduationDate: '',
  location: '',
  currentRole: '',
  company: '',
  achievements: [''],
})

/**
 * Get default partner form values
 */
export const getDefaultPartnerValues = (): CreatePartnerInput => ({
  tier: 'gold',
  name: '',
  logoUrl: '/img/partners/',
  description: '',
  website: 'https://',
  category: 'Technology',
})

/**
 * Truncate text for table display
 */
export const truncateText = (text: string, maxLength = 50): string => {
  if (text.length <= maxLength) return text

  return `${text.slice(0, maxLength)}...`
}

/**
 * Get track label from track key
 */
export const getTrackLabel = (track: TrackKeyValue): string => {
  const labels: Record<TrackKeyValue, string> = {
    [TrackKey.WEB_DEV]: 'Web Development',
    [TrackKey.DATA_SCIENCE]: 'Data Science',
    [TrackKey.PRODUCT_DESIGN]: 'Product Design',
    [TrackKey.AI]: 'Artificial Intelligence',
  }

  return labels[track]
}

/**
 * Get event type label
 */
export const getEventTypeLabel = (type: EventTypeValue): string => {
  const labels: Record<EventTypeValue, string> = {
    [EventType.UPCOMING]: 'Upcoming',
    [EventType.PAST]: 'Past',
  }

  return labels[type]
}
