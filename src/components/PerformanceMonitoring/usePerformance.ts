import { useEffect, useRef } from 'react'
import type { PerformanceMetric } from '@/components/PerformanceMonitoring'

type PerformanceOptions = {
  enabled?: boolean
  threshold?: number
  onThresholdExceeded?: (metric: PerformanceMetric) => void
}

/**
 * Optimized performance monitoring hook
 * Only tracks when explicitly enabled to reduce overhead
 */
export const usePerformance = (componentName: string, options: PerformanceOptions = {}) => {
  const {
    enabled = false, // Disabled by default for better performance
    threshold = 100, // 100ms threshold
    onThresholdExceeded,
  } = options

  const startTimeRef = useRef<number>(0)
  const isTrackingRef = useRef(false)

  // Start tracking function
  const startTracking = () => {
    if (!enabled || typeof window === 'undefined' || !('performance' in window)) {
      return
    }

    startTimeRef.current = performance.now()
    isTrackingRef.current = true
  }

  // Stop tracking function
  const stopTracking = () => {
    if (!enabled || !isTrackingRef.current || typeof window === 'undefined') {
      return
    }

    const duration = performance.now() - startTimeRef.current

    isTrackingRef.current = false

    // Only log if threshold is exceeded
    if (duration > threshold) {
      const metric: PerformanceMetric = {
        name: 'COMPONENT_RENDER',
        value: duration,
        rating: duration < 50 ? 'good' : duration < 100 ? 'needs-improvement' : 'poor',
        delta: 0,
        id: `${componentName}-${Date.now()}`,
      }

      if (onThresholdExceeded) {
        onThresholdExceeded(metric)
      }

      // Only log in development
      if (import.meta.env.DEV) {
        console.warn(
          `Performance warning: ${componentName} took ${duration.toFixed(2)}ms to render`
        )
      }
    }
  }

  // Performance data
  const performanceData = {
    startTracking,
    stopTracking,
    isTracking: isTrackingRef.current,
  }

  // Auto-track on mount/unmount if enabled
  useEffect(() => {
    if (enabled) {
      startTracking()

      return () => {
        if (isTrackingRef.current) {
          stopTracking()
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled])

  return performanceData
}
