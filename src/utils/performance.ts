import type {
  MetricName,
  PerformanceMetric,
  PerformanceConfig,
  PerformanceMonitor,
} from './performanceTypes'
import { getPerformanceRating, sendMetric, monitorBundlePerformance, monitorApiCalls } from './performanceUtils'
import { setupWebVitals } from './performanceWebVitals'

// Create performance monitor using factory function
const createPerformanceMonitor = (config: PerformanceConfig = {}): PerformanceMonitor => {
  const _config = {
    debug: false,
    sampleRate: 1.0, // 100% sampling
    ...config,
  }

  const _metrics = new Map<string, PerformanceMetric>()

  /**
   * Initialize performance monitoring
   */
  const init = (): void => {
    if (typeof window === 'undefined') return

    // Only track if we're in production or debug is enabled
    if (!_config.debug && process.env.NODE_ENV !== 'production') {
      return
    }

    // Apply sampling rate
    if (Math.random() > (_config.sampleRate ?? 1.0)) {
      return
    }

    setupWebVitals(recordCustomMetric)
    monitorBundlePerformance(recordCustomMetric)
    monitorApiCalls(recordCustomMetric)
  }

  /**
   * Mark component render start
   */
  const markComponentRender = (componentName: string): void => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(`${componentName}-render-start`)
    }
  }

  /**
   * Mark component render end and measure
   */
  const measureComponentRender = (componentName: string): void => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(`${componentName}-render-end`)
      performance.measure(
        `${componentName}-render`,
        `${componentName}-render-start`,
        `${componentName}-render-end`
      )

      const measure = performance.getEntriesByName(`${componentName}-render`)[0]

      if (measure) {
        recordCustomMetric('COMPONENT_RENDER', measure.duration, {
          component: componentName,
        })
      }
    }
  }

  /**
   * Record custom performance metric
   */
  const recordCustomMetric = (
    name: string,
    value: number,
    metadata: Record<string, unknown> = {}
  ): void => {
    const metric: PerformanceMetric = {
      name: name as MetricName,
      value,
      rating: getPerformanceRating(value, name),
      delta: 0,
      id: `${name}-${Date.now()}`,
    }

    _metrics.set(metric.id, metric)

    if (_config.debug) {
      // eslint-disable-next-line no-console
      console.log(`Custom Metric - ${name}:`, { value, metadata })
    }

    if (_config.endpoint) {
      sendMetric(metric, metadata, _config.endpoint, _config.debug)
    }
  }

  /**
   * Get all recorded metrics
   */
  const getMetrics = (): PerformanceMetric[] => {
    return [..._metrics.values()]
  }

  /**
   * Get metrics by name
   */
  const getMetricsByName = (name: string): PerformanceMetric[] => {
    return getMetrics().filter(metric => metric.name === name)
  }

  /**
   * Clear all metrics
   */
  const clearMetrics = (): void => {
    _metrics.clear()
  }

  /**
   * Get performance summary
   */
  const getSummary = (): Record<
    string,
    { avg: number; min: number; max: number; count: number }
  > => {
    const summary: Record<string, { avg: number; min: number; max: number; count: number }> = {}

    getMetrics().forEach(metric => {
      if (!summary[metric.name]) {
        summary[metric.name] = { avg: 0, min: Infinity, max: -Infinity, count: 0 }
      }

      const stats = summary[metric.name]

      stats.count++
      stats.min = Math.min(stats.min, metric.value)
      stats.max = Math.max(stats.max, metric.value)
      stats.avg = (stats.avg * (stats.count - 1) + metric.value) / stats.count
    })

    return summary
  }

  return {
    init,
    markComponentRender,
    measureComponentRender,
    recordCustomMetric,
    getMetrics,
    getMetricsByName,
    clearMetrics,
    getSummary,
  }
}

// Create default instance
const performanceMonitor = createPerformanceMonitor({
  debug: process.env.NODE_ENV === 'development',
})

// Export default instance and factory function
export default performanceMonitor
export { createPerformanceMonitor }
