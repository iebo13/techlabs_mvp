import { useEffect, useRef, useCallback, useMemo } from 'react'
import type { PerformanceMetric } from '@/utils/performanceTypes'

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

  // Memoize the start tracking function to prevent unnecessary re-renders
  const startTracking = useCallback(() => {
    if (!enabled || typeof window === 'undefined' || !('performance' in window)) {
      return
    }

    startTimeRef.current = performance.now()
    isTrackingRef.current = true
  }, [enabled])

  // Memoize the stop tracking function to prevent unnecessary re-renders
  const stopTracking = useCallback(() => {
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
  }, [enabled, threshold, onThresholdExceeded, componentName])

  // Memoize the performance data to prevent unnecessary re-renders
  const performanceData = useMemo(
    () => ({
      startTracking,
      stopTracking,
      isTracking: isTrackingRef.current,
    }),
    [startTracking, stopTracking]
  )

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
  }, [enabled, startTracking, stopTracking])

  return performanceData
}

export default usePerformance
