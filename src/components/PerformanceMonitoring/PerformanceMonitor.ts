import type {
  MetricName,
  PerformanceMetric,
  PerformanceConfig,
  PerformanceMonitor,
} from './PerformanceTypes'
import {
  getPerformanceRating,
  sendMetric,
  monitorBundlePerformance,
  monitorApiCalls,
} from './PerformanceUtils'
import { setupWebVitals } from './PerformanceWebVitals'

// Create performance monitor using factory function
const createPerformanceMonitor = (config: PerformanceConfig = {}): PerformanceMonitor => {
  const _config = {
    debug: false,
    sampleRate: 0.1, // Reduce to 10% sampling for better performance
    enableWebVitals: true,
    enableComponentTracking: false, // Disable by default to reduce overhead
    enableApiTracking: true,
    enableBundleTracking: true,
    ...config,
  }

  const _metrics = new Map<string, PerformanceMetric>()
  let _isInitialized = false

  /**
   * Initialize performance monitoring
   */
  const init = (): void => {
    if (typeof window === 'undefined' || _isInitialized) return

    // Only track if we're in production or debug is enabled
    if (!_config.debug && !import.meta.env.PROD) {
      return
    }

    // Apply sampling rate
    if (Math.random() > (_config.sampleRate ?? 0.1)) {
      return
    }

    // Setup monitoring based on configuration
    if (_config.enableWebVitals) {
      setupWebVitals(recordCustomMetric)
    }

    if (_config.enableBundleTracking) {
      monitorBundlePerformance(recordCustomMetric)
    }

    if (_config.enableApiTracking) {
      monitorApiCalls(recordCustomMetric)
    }

    _isInitialized = true
  }

  /**
   * Mark component render start - only if component tracking is enabled
   */
  const markComponentRender = (componentName: string): void => {
    if (
      !_config.enableComponentTracking ||
      typeof window === 'undefined' ||
      !('performance' in window)
    ) {
      return
    }

    performance.mark(`${componentName}-render-start`)
  }

  /**
   * Mark component render end and measure - only if component tracking is enabled
   */
  const measureComponentRender = (componentName: string): void => {
    if (
      !_config.enableComponentTracking ||
      typeof window === 'undefined' ||
      !('performance' in window)
    ) {
      return
    }

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

  /**
   * Record custom performance metric with throttling
   */
  const recordCustomMetric = (
    name: string,
    value: number,
    metadata: Record<string, unknown> = {}
  ): void => {
    // Throttle metric recording to reduce overhead
    const metricId = `${name}-${Math.floor(Date.now() / 1000)}` // Group by second

    if (_metrics.has(metricId)) {
      return // Skip if we already recorded this metric type in this second
    }

    const metric: PerformanceMetric = {
      name: name as MetricName,
      value,
      rating: getPerformanceRating(value, name),
      delta: 0,
      id: metricId,
    }

    _metrics.set(metricId, metric)

    // Clean up old metrics to prevent memory leaks
    if (_metrics.size > 100) {
      const firstKey = _metrics.keys().next().value

      if (firstKey) {
        _metrics.delete(firstKey)
      }
    }

    if (_config.debug) {
      // eslint-disable-next-line no-console
      console.log(`Custom Metric - ${name}:`, { value, metadata })
    }

    if (_config.endpoint) {
      sendMetric(metric, metadata, _config.endpoint, _config.debug)
    }
  }

  /**
   * Get performance metrics
   */
  const getMetrics = (): PerformanceMetric[] => {
    return [..._metrics.values()]
  }

  /**
   * Clear performance metrics
   */
  const clearMetrics = (): void => {
    _metrics.clear()
  }

  /**
   * Enable/disable component tracking
   */
  const setComponentTracking = (enabled: boolean): void => {
    _config.enableComponentTracking = enabled
  }

  /**
   * Get current configuration
   */
  const getConfig = (): PerformanceConfig => {
    return { ..._config }
  }

  return {
    init,
    markComponentRender,
    measureComponentRender,
    recordCustomMetric,
    getMetrics,
    clearMetrics,
    setComponentTracking,
    getConfig,
  }
}

// Create and export the default performance monitor instance
export const performanceMonitor = createPerformanceMonitor({
  debug: import.meta.env.DEV,
  sampleRate: import.meta.env.PROD ? 0.05 : 0.1, // 5% in production, 10% in development
  enableComponentTracking: false, // Disable by default for better performance
  enableWebVitals: true,
  enableApiTracking: true,
  enableBundleTracking: true,
})
