// Web Vitals types - we'll implement our own lightweight version
export type MetricName = 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB' | 'API_CALL' | 'BUNDLE_LOAD' | 'COMPONENT_RENDER'

export type PerformanceMetric = {
  name: MetricName
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  id: string
}

export type PerformanceConfig = {
  debug?: boolean
  sampleRate?: number
  endpoint?: string
  enableWebVitals?: boolean
  enableComponentTracking?: boolean
  enableApiTracking?: boolean
  enableBundleTracking?: boolean
}

export type PerformanceMonitor = {
  init: () => void
  markComponentRender: (componentName: string) => void
  measureComponentRender: (componentName: string) => void
  recordCustomMetric: (name: string, value: number, metadata?: Record<string, unknown>) => void
  getMetrics: () => PerformanceMetric[]
  clearMetrics: () => void
  setComponentTracking: (enabled: boolean) => void
  getConfig: () => PerformanceConfig
}
