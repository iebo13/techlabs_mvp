import type { PerformanceMonitor } from './PerformanceTypes'

/**
 * Setup Web Vitals monitoring
 */
export const setupWebVitals = (recordCustomMetric: PerformanceMonitor['recordCustomMetric']): void => {
  setupCLS(recordCustomMetric)
  setupFID(recordCustomMetric)
  setupFCP(recordCustomMetric)
  setupLCP(recordCustomMetric)
  setupTTFB(recordCustomMetric)
}

/**
 * Setup Cumulative Layout Shift monitoring
 */
const setupCLS = (recordCustomMetric: PerformanceMonitor['recordCustomMetric']): void => {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'layout-shift' && !(entry as unknown as { hadRecentInput: boolean }).hadRecentInput) {
          recordCustomMetric('CLS', (entry as unknown as { value: number }).value)
        }
      }
    })

    observer.observe({ entryTypes: ['layout-shift'] })
  }
}

/**
 * Setup First Input Delay monitoring
 */
const setupFID = (recordCustomMetric: PerformanceMonitor['recordCustomMetric']): void => {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'first-input') {
          const firstInputEntry = entry as unknown as {
            processingStart: number
            startTime: number
          }

          recordCustomMetric('FID', firstInputEntry.processingStart - firstInputEntry.startTime)
        }
      }
    })

    observer.observe({ entryTypes: ['first-input'] })
  }
}

/**
 * Setup First Contentful Paint monitoring
 */
const setupFCP = (recordCustomMetric: PerformanceMonitor['recordCustomMetric']): void => {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
          recordCustomMetric('FCP', entry.startTime)
        }
      }
    })

    observer.observe({ entryTypes: ['paint'] })
  }
}

/**
 * Setup Largest Contentful Paint monitoring
 */
const setupLCP = (recordCustomMetric: PerformanceMonitor['recordCustomMetric']): void => {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          recordCustomMetric('LCP', entry.startTime)
        }
      }
    })

    observer.observe({ entryTypes: ['largest-contentful-paint'] })
  }
}

/**
 * Setup Time to First Byte monitoring
 */
const setupTTFB = (recordCustomMetric: PerformanceMonitor['recordCustomMetric']): void => {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          const navigationEntry = entry as PerformanceNavigationTiming

          recordCustomMetric('TTFB', navigationEntry.responseStart - navigationEntry.requestStart)
        }
      }
    })

    observer.observe({ entryTypes: ['navigation'] })
  }
}
