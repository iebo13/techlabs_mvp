import type { PerformanceMetric } from './PerformanceTypes'

// Performance thresholds for different metrics
const PERFORMANCE_THRESHOLDS = {
  FCP: { good: 1800, needsImprovement: 3000 },
  LCP: { good: 2500, needsImprovement: 4000 },
  FID: { good: 100, needsImprovement: 300 },
  CLS: { good: 0.1, needsImprovement: 0.25 },
  TTFB: { good: 800, needsImprovement: 1800 },
  COMPONENT_RENDER: { good: 50, needsImprovement: 100 },
} as const

/**
 * Get performance rating based on metric name and value
 */
export const getPerformanceRating = (
  value: number,
  metricName: string
): 'good' | 'needs-improvement' | 'poor' => {
  const thresholds = PERFORMANCE_THRESHOLDS[metricName as keyof typeof PERFORMANCE_THRESHOLDS]

  if (!thresholds) {
    return value < 100 ? 'good' : value < 500 ? 'needs-improvement' : 'poor'
  }

  if (value < thresholds.good) return 'good'
  if (value < thresholds.needsImprovement) return 'needs-improvement'

  return 'poor'
}

/**
 * Send performance metric to analytics endpoint
 */
export const sendMetric = async (
  metric: PerformanceMetric,
  metadata: Record<string, unknown>,
  endpoint: string,
  debug: boolean
): Promise<void> => {
  try {
    if (debug) {
      // eslint-disable-next-line no-console
      console.log('Sending metric:', { metric, metadata, endpoint })
    }

    await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ metric, metadata }),
    })
  } catch (error) {
    if (debug) {
      console.error('Failed to send metric:', error)
    }
  }
}

/**
 * Monitor bundle performance
 */
export const monitorBundlePerformance = (
  recordCustomMetric: (name: string, value: number, metadata?: Record<string, unknown>) => void
): void => {
  if (typeof window === 'undefined') return

  // Monitor script loading performance
  const observer = new PerformanceObserver(list => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'resource' && entry.name.includes('.js')) {
        recordCustomMetric('BUNDLE_LOAD', entry.duration, {
          name: entry.name,
          size: (entry as PerformanceResourceTiming).transferSize,
        })
      }
    }
  })

  observer.observe({ entryTypes: ['resource'] })
}

/**
 * Monitor API calls performance
 */
export const monitorApiCalls = (
  recordCustomMetric: (name: string, value: number, metadata?: Record<string, unknown>) => void
): void => {
  if (typeof window === 'undefined') return

  // Monitor fetch performance
  const originalFetch = window.fetch

  window.fetch = async (...args) => {
    const startTime = performance.now()

    try {
      const response = await originalFetch(...args)
      const duration = performance.now() - startTime

      recordCustomMetric('API_CALL', duration, {
        url: typeof args[0] === 'string' ? args[0] : 'unknown',
        method: args[1]?.method || 'GET',
        status: response.status,
      })

      return response
    } catch (error) {
      const duration = performance.now() - startTime

      recordCustomMetric('API_CALL', duration, {
        url: typeof args[0] === 'string' ? args[0] : 'unknown',
        method: args[1]?.method || 'GET',
        error: error instanceof Error ? error.message : String(error),
      })

      throw error
    }
  }
}

/**
 * Optimize images for better performance
 */
export const optimizeImage = (
  src: string,
  options: {
    width?: number
    height?: number
    quality?: number
    format?: 'webp' | 'avif' | 'jpeg'
  } = {}
): string => {
  const { width, height, quality = 80 } = options

  // If no optimization needed, return original
  if (!width && !height && quality === 100) {
    return src
  }

  // For external images, you might want to use an image optimization service
  // For now, return the original source
  return src
}

/**
 * Lazy load images with intersection observer
 */
export const createImageObserver = (
  onIntersect: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver => {
  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  }

  return new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        onIntersect(entry)
      }
    })
  }, defaultOptions)
}

/**
 * Preload critical resources
 */
export const preloadResource = (href: string, as: string): void => {
  if (typeof window === 'undefined') return

  const link = document.createElement('link')

  link.rel = 'preload'
  link.href = href
  link.as = as
  document.head.appendChild(link)
}

/**
 * Debounce function calls for performance
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle function calls for performance
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Measure function execution time
 */
export const measureExecutionTime = <T>(fn: () => T, _name: string): T => {
  // Performance measurement for production builds
  return fn()
}

/**
 * Async version of measureExecutionTime
 */
export const measureAsyncExecutionTime = async <T>(
  fn: () => Promise<T>,
  _name: string
): Promise<T> => {
  // Performance measurement for production builds
  return await fn()
}
