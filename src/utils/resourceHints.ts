/**
 * Resource hints utility for improving loading performance
 * Provides functions to add preload, prefetch, and preconnect hints
 */

type ResourceHintType = 'preload' | 'prefetch' | 'preconnect' | 'dns-prefetch'
type ResourceType = 'script' | 'style' | 'font' | 'image' | 'fetch' | 'document'

type ResourceHintOptions = {
  href: string
  type: ResourceHintType
  as?: ResourceType
  crossorigin?: 'anonymous' | 'use-credentials'
  media?: string
}

/**
 * Add a resource hint to the document head
 */
export const addResourceHint = ({ href, type, as, crossorigin, media }: ResourceHintOptions): void => {
  // Check if hint already exists
  const existing = document.querySelector(`link[rel="${type}"][href="${href}"]`)

  if (existing) return

  const link = document.createElement('link')

  link.rel = type
  link.href = href

  if (as) link.as = as
  if (crossorigin) link.crossOrigin = crossorigin
  if (media) link.media = media

  document.head.appendChild(link)
}

/**
 * Preload critical resources
 */
export const preloadCriticalResources = (): void => {
  // Note: Font preloading removed - fonts are now loaded via @fontsource
  // packages bundled with the application for better performance and reliability

  // Preload hero images
  addResourceHint({
    href: '/img/person1.jpg',
    type: 'preload',
    as: 'image',
  })
}

/**
 * Prefetch likely next pages
 */
export const prefetchLikelyPages = (): void => {
  const routes = ['/tracks', '/about', '/events']

  routes.forEach(route => {
    addResourceHint({
      href: route,
      type: 'prefetch',
      as: 'document',
    })
  })
}

/**
 * Add DNS prefetch for external domains
 */
export const addDnsPrefetch = (): void => {
  const domains = ['https://fonts.googleapis.com', 'https://fonts.gstatic.com']

  domains.forEach(domain => {
    addResourceHint({
      href: domain,
      type: 'dns-prefetch',
    })
  })
}

/**
 * Initialize all performance hints
 */
export const initializeResourceHints = (): void => {
  // Add DNS prefetch immediately
  addDnsPrefetch()

  // Preload critical resources
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadCriticalResources)
  } else {
    preloadCriticalResources()
  }

  // Prefetch likely pages after initial load
  setTimeout(prefetchLikelyPages, 2000)
}
