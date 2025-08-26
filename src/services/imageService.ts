/**
 * Image Service using Unsplash API for random photos
 * Based on Context7 Unsplash API documentation
 */

export type ImageCategory =
  | 'person'
  | 'business'
  | 'technology'
  | 'event'
  | 'team'
  | 'education'
  | 'startup'
  | 'conference'
  | 'office'
  | 'hero'

export type ImageSize = 'thumb' | 'small' | 'regular' | 'full' | 'raw'

export type ImageOrientation = 'landscape' | 'portrait' | 'squarish'

/**
 * Generate Unsplash URL for random photos
 */
export const generateUnsplashUrl = (
  category: ImageCategory,
  options: {
    width?: number
    height?: number
    orientation?: ImageOrientation
    size?: ImageSize
  } = {}
): string => {
  const { width = 400, height = 400 } = options

  // Base Unsplash random image URL
  const baseUrl = 'https://images.unsplash.com'

  // Create a deterministic seed based on category for consistent images
  const seed = category + Date.now().toString().slice(-6)

  // Use Unsplash's Source API for simpler integration
  // Format: https://source.unsplash.com/{width}x{height}/?{query}
  let query: string

  switch (category) {
    case 'person':
      query = 'portrait,people,professional'
      break
    case 'business':
      query = 'business,office,corporate'
      break
    case 'technology':
      query = 'technology,computer,digital'
      break
    case 'education':
      query = 'education,learning,classroom'
      break
    case 'event':
      query = 'event,conference,meeting'
      break
    case 'conference':
      query = 'conference,meeting,professional'
      break
    case 'startup':
      query = 'startup,innovation,entrepreneur'
      break
    case 'team':
      query = 'team,group,people'
      break
    case 'hero':
      query = 'technology,innovation,future,abstract'
      break
    default:
      query = category
  }

  return `${baseUrl}/${width}x${height}/?${query}&sig=${seed}`
}

/**
 * Get optimized image URL with responsive sizing
 */
export const getOptimizedImageUrl = (
  category: ImageCategory,
  options: {
    width?: number
    height?: number
    orientation?: ImageOrientation
  } = {}
): string => {
  return generateUnsplashUrl(category, options)
}

/**
 * Generate responsive srcSet for different screen sizes
 */
export const generateResponsiveSrcSet = (
  category: ImageCategory,
  options: {
    baseWidth?: number
    baseHeight?: number
    orientation?: ImageOrientation
  } = {}
): string => {
  const { orientation = 'squarish' } = options

  const sizes = [200, 400, 600, 800]

  return sizes
    .map(width => {
      const height =
        orientation === 'landscape'
          ? Math.round(width * 0.6)
          : orientation === 'portrait'
            ? Math.round(width * 1.2)
            : width

      const url = generateUnsplashUrl(category, { width, height, orientation })

      return `${url} ${width}w`
    })
    .join(', ')
}

/**
 * Story image helper
 */
export const getStoryImage = (storyId: string): string => {
  // Use the story ID to create deterministic but varied images
  const categories: ImageCategory[] = ['person', 'business', 'technology']
  const categoryIndex = parseInt(storyId.slice(-1), 16) % categories.length
  const category = categories.at(categoryIndex) ?? 'person'

  return generateUnsplashUrl(category, {
    width: 400,
    height: 400,
    orientation: 'squarish',
  })
}

/**
 * Event image helper
 */
export const getEventImage = (eventId: string): string => {
  const categories: ImageCategory[] = ['event', 'conference', 'technology', 'education']
  const categoryIndex = parseInt(eventId.slice(-1), 16) % categories.length
  const category = categories.at(categoryIndex) ?? 'event'

  return generateUnsplashUrl(category, {
    width: 600,
    height: 400,
    orientation: 'landscape',
  })
}

/**
 * Team member image helper
 */
export const getTeamImage = (_memberId: string): string => {
  return generateUnsplashUrl('person', {
    width: 300,
    height: 300,
    orientation: 'squarish',
  })
}

/**
 * Hero image helper
 */
export const getHeroImage = (_seed?: string): string => {
  return generateUnsplashUrl('hero', {
    width: 1920,
    height: 1080,
    orientation: 'landscape',
  })
}

/**
 * Support/CTA image helper
 */
export const getSupportImage = (type = 'default'): string => {
  const category = type === 'custom' ? 'startup' : 'business'

  return generateUnsplashUrl(category, {
    width: 800,
    height: 600,
    orientation: 'landscape',
  })
}

/**
 * Meta/OG image helper
 */
export const getMetaImage = (page: string): string => {
  let category: ImageCategory = 'technology'

  switch (page) {
    case 'home':
      category = 'technology'
      break
    case 'about':
      category = 'team'
      break
    case 'tracks':
      category = 'education'
      break
    case 'events':
      category = 'conference'
      break
    case 'stories':
      category = 'startup'
      break
    case 'partners':
      category = 'business'
      break
    default:
      category = 'technology'
  }

  return generateUnsplashUrl(category, {
    width: 1200,
    height: 630,
    orientation: 'landscape',
  })
}
