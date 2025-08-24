import type { PerformanceMetric } from './performanceTypes'

/**
 * Get performance rating based on thresholds
 */
export const getPerformanceRating = (value: number, metricName: string): 'good' | 'needs-improvement' | 'poor' => {
  const thresholds = {
    CLS: { good: 0.1, poor: 0.25 },
    FID: { good: 100, poor: 300 },
    FCP: { good: 1800, poor: 3000 },
    LCP: { good: 2500, poor: 4000 },
    TTFB: { good: 800, poor: 1800 },
    API_CALL: { good: 200, poor: 1000 },
    BUNDLE_LOAD: { good: 1000, poor: 3000 },
    COMPONENT_RENDER: { good: 16, poor: 50 }, // 60fps = 16ms
  }

  const threshold = thresholds[metricName as keyof typeof thresholds]

  if (!threshold) return 'good'

  if (value <= threshold.good) return 'good'
  if (value <= threshold.poor) return 'needs-improvement'

  return 'poor'
}

/**
 * Send metric to analytics endpoint
 */
export const sendMetric = async (
  metric: PerformanceMetric,
  metadata: Record<string, unknown> = {},
  endpoint?: string,
  debug = false
): Promise<void> => {
  if (!endpoint) return

  try {
    await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        metric,
        metadata,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href,
      }),
    })
  } catch (error) {
    if (debug) {
      console.error('Failed to send performance metric:', error)
    }
  }
}

/**
 * Monitor bundle loading performance
 */
export const monitorBundlePerformance = (
  recordCustomMetric: (name: string, value: number, metadata?: Record<string, unknown>) => void
): void => {
  if ('performance' in window) {
    const observer = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'resource') {
          const resourceEntry = entry as PerformanceResourceTiming

          if (resourceEntry.name.includes('.js') || resourceEntry.name.includes('.css')) {
            recordCustomMetric('BUNDLE_LOAD', resourceEntry.duration, {
              name: resourceEntry.name,
              size: resourceEntry.transferSize,
              type: resourceEntry.initiatorType,
            })
          }
        }
      }
    })

    observer.observe({ entryTypes: ['resource'] })
  }
}

/**
 * Monitor API calls performance
 */
export const monitorApiCalls = (
  recordCustomMetric: (name: string, value: number, metadata?: Record<string, unknown>) => void
): void => {
  if (typeof window === 'undefined') return

  const originalFetch = window.fetch

  window.fetch = async (...args) => {
    const start = performance.now()

    try {
      const response = await originalFetch(...args)
      const duration = performance.now() - start

      recordCustomMetric('API_CALL', duration, {
        url: typeof args[0] === 'string' ? args[0] : 'unknown',
        method: args[1]?.method || 'GET',
        status: response.status,
      })

      return response
    } catch (error) {
      const duration = performance.now() - start

      recordCustomMetric('API_CALL', duration, {
        url: typeof args[0] === 'string' ? args[0] : 'unknown',
        method: args[1]?.method || 'GET',
        status: 'error',
        error: error instanceof Error ? error.message : String(error),
      })

      throw error
    }
  }
}
