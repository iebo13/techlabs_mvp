/**
 * Admin utility functions
 * Helper functions for admin CRUD operations
 */

import {
  type CreateEventInput,
  type CreateBlogPostInput,
  type EventTypeValue,
  type BlogPostStatusValue,
  EventType,
  BlogPostStatus,
} from '../types'

/**
 * Generate a slug from a title
 */
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replaceAll(/[^\w\s-]/g, '')
    .replaceAll(/\s+/g, '-')
    .replaceAll(/-+/g, '-')
    .trim()
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
 * Get default blog post form values
 */
export const getDefaultBlogPostValues = (): CreateBlogPostInput => ({
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  featuredImage: '',
  author: '',
  tags: [],
  status: BlogPostStatus.DRAFT,
})

/**
 * Truncate text for table display
 */
export const truncateText = (text: string, maxLength = 50): string => {
  if (text.length <= maxLength) return text

  return `${text.slice(0, maxLength)}...`
}

/**
 * Strip HTML tags from content for excerpt
 */
export const stripHtml = (html: string): string => {
  const tmp = document.createElement('div')

  tmp.innerHTML = html

  return tmp.textContent ?? tmp.innerText ?? ''
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

/**
 * Get blog post status label
 */
export const getBlogPostStatusLabel = (status: BlogPostStatusValue): string => {
  const labels: Record<BlogPostStatusValue, string> = {
    [BlogPostStatus.DRAFT]: 'Draft',
    [BlogPostStatus.PUBLISHED]: 'Published',
  }

  return labels[status]
}
