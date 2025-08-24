import { useEffect, useRef } from 'react'
import performanceMonitor from '@/utils/performance'

type UsePerformanceOptions = {
  componentName?: string
  trackRenders?: boolean
  trackInteractions?: boolean
}

/**
 * React hook for performance monitoring
 */
export const usePerformance = (options: UsePerformanceOptions = {}) => {
  const {
    componentName = 'UnknownComponent',
    trackRenders = true,
    trackInteractions = true,
  } = options

  const renderCount = useRef(0)
  const lastRenderTime = useRef(performance.now())

  // Track component render performance
  useEffect(() => {
    if (trackRenders) {
      performanceMonitor.markComponentRender(componentName)

      const renderTime = performance.now()
      const timeSinceLastRender = renderTime - lastRenderTime.current

      performanceMonitor.recordCustomMetric('COMPONENT_RENDER', timeSinceLastRender, {
        component: componentName,
        renderCount: ++renderCount.current,
      })

      lastRenderTime.current = renderTime
    }
  })

  // Track user interactions
  const trackInteraction = (interactionName: string, metadata?: Record<string, unknown>) => {
    if (trackInteractions) {
      performanceMonitor.recordCustomMetric('USER_INTERACTION', performance.now(), {
        component: componentName,
        interaction: interactionName,
        ...metadata,
      })
    }
  }

  // Track async operations
  const trackAsyncOperation = async <T>(
    operationName: string,
    operation: () => Promise<T>,
    metadata?: Record<string, unknown>
  ): Promise<T> => {
    const startTime = performance.now()

    try {
      const result = await operation()
      const duration = performance.now() - startTime

      performanceMonitor.recordCustomMetric('ASYNC_OPERATION', duration, {
        component: componentName,
        operation: operationName,
        status: 'success',
        ...metadata,
      })

      return result
    } catch (error) {
      const duration = performance.now() - startTime

      performanceMonitor.recordCustomMetric('ASYNC_OPERATION', duration, {
        component: componentName,
        operation: operationName,
        status: 'error',
        error: error instanceof Error ? error.message : String(error),
        ...metadata,
      })

      throw error
    }
  }

  return {
    trackInteraction,
    trackAsyncOperation,
    getMetrics: () => performanceMonitor.getMetricsByName(componentName),
  }
}

export default usePerformance
