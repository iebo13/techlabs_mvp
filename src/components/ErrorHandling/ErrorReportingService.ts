/* eslint-disable */
/**
 * Unified Error Reporting Service
 *
 * This service provides a standardized interface for all error reporting
 * across the application, eliminating duplication and ensuring consistency.
 */

// Enhanced error types for unified reporting
export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical'

export type ErrorSource =
  | 'javascript_error'
  | 'unhandled_rejection'
  | 'react_component'
  | 'network_request'
  | 'image_load'
  | 'performance'
  | 'user_action'
  | 'validation'
  | 'manual'

export type ErrorContext = {
  componentName?: string
  userId?: string
  sessionId?: string
  featureName?: string
  actionName?: string
  requestId?: string
  buildVersion?: string
  environment?: string
  [key: string]: unknown
}

export type ErrorReport = {
  // Core error data
  id: string
  message: string
  source: ErrorSource
  severity: ErrorSeverity
  timestamp: number

  // Error details
  stack?: string
  cause?: string

  // Location data
  url: string
  route: string
  line?: number
  column?: number

  // Environment data
  userAgent: string
  buildVersion: string
  environment: string

  // Context data
  context?: ErrorContext
  additionalData?: Record<string, unknown>
}

export type ErrorReportingOptions = {
  severity?: ErrorSeverity
  source?: ErrorSource
  context?: ErrorContext
  skipLogging?: boolean
  skipStorage?: boolean
  skipRemoteReporting?: boolean
}

export type ErrorHandler = (report: ErrorReport) => void | Promise<void>

// Error reporting service interface
export type ErrorReportingService = {
  // Core reporting methods
  reportError: (error: Error | string, options?: ErrorReportingOptions) => string
  reportErrorWithContext: (message: string, context: ErrorContext, options?: ErrorReportingOptions) => string

  // Specialized reporting methods
  reportJavaScriptError: (event: ErrorEvent) => string
  reportUnhandledRejection: (event: PromiseRejectionEvent) => string
  reportComponentError: (error: Error, componentName: string, componentStack?: string | null) => string
  reportNetworkError: (url: string, status: number, error: Error) => string
  reportImageLoadError: (src: string, error?: Error) => string
  reportValidationError: (field: string, value: unknown, rule: string) => string

  // Error management
  getStoredErrors: () => ErrorReport[]
  getErrorById: (id: string) => ErrorReport | undefined
  clearStoredErrors: () => void
  clearErrorById: (id: string) => void

  // Configuration
  addErrorHandler: (handler: ErrorHandler) => void
  removeErrorHandler: (handler: ErrorHandler) => void
  setSeverityThreshold: (threshold: ErrorSeverity) => void

  // Lifecycle
  initialize: () => void
  destroy: () => void
}

// Error reporting service implementation
const createErrorReportingService = (): ErrorReportingService => {
  let isInitialized = false
  let severityThreshold: ErrorSeverity = 'low'
  const errorHandlers: Set<ErrorHandler> = new Set()
  const errorQueue: ErrorReport[] = []
  const errorMap: Map<string, ErrorReport> = new Map()
  const maxQueueSize = 100
  const maxStorageSize = 50

  // Severity levels for filtering
  const severityLevels = { low: 0, medium: 1, high: 2, critical: 3 }

  // Generate unique error ID
  const generateErrorId = (source: ErrorSource): string => {
    const timestamp = Date.now()
    const randomSuffix = Math.random().toString(36).slice(2, 11)
    return `${source}_${timestamp}_${randomSuffix}`
  }

  // Get environment information
  const getEnvironmentInfo = () => ({
    buildVersion: import.meta.env.VITE_BUILD_VERSION || 'unknown',
    environment: import.meta.env.MODE || 'unknown',
    url: window.location.href,
    route: window.location.pathname,
    userAgent: navigator.userAgent,
  })

  // Normalize error data
  const normalizeErrorData = (
    error: Error | string,
    source: ErrorSource,
    options: ErrorReportingOptions = {}
  ): Partial<ErrorReport> => {
    const message = typeof error === 'string' ? error : error.message
    const stack = typeof error === 'object' ? error.stack : undefined
    const cause = typeof error === 'object' ? (error.cause as string) : undefined

    return {
      message,
      stack,
      cause,
      source,
      severity: options.severity || 'medium',
      timestamp: Date.now(),
      ...getEnvironmentInfo(),
      context: options.context,
      additionalData: {},
    }
  }

  // Create complete error report
  const createErrorReport = (
    error: Error | string,
    source: ErrorSource,
    options: ErrorReportingOptions = {}
  ): ErrorReport => {
    const normalized = normalizeErrorData(error, source, options)
    const id = generateErrorId(source)

    return {
      id,
      message: normalized.message || 'Unknown error',
      source: normalized.source || source,
      severity: normalized.severity || 'medium',
      timestamp: normalized.timestamp || Date.now(),
      stack: normalized.stack,
      cause: normalized.cause,
      url: normalized.url || window.location.href,
      route: normalized.route || window.location.pathname,
      line: normalized.line,
      column: normalized.column,
      userAgent: normalized.userAgent || navigator.userAgent,
      buildVersion: normalized.buildVersion || 'unknown',
      environment: normalized.environment || 'unknown',
      context: normalized.context,
      additionalData: {
        ...normalized.additionalData,
        ...options.context,
      },
    }
  }

  // Process and store error report
  const processErrorReport = (report: ErrorReport, options: ErrorReportingOptions = {}): void => {
    // Check severity threshold
    if (severityLevels[report.severity] < severityLevels[severityThreshold]) {
      return
    }

    // Add to queue and map
    errorQueue.push(report)
    errorMap.set(report.id, report)

    // Maintain queue size
    if (errorQueue.length > maxQueueSize) {
      const removed = errorQueue.shift()
      if (removed) {
        errorMap.delete(removed.id)
      }
    }

    // Console logging
    if (!options.skipLogging && import.meta.env.DEV) {
      console.error(`[${report.source}] ${report.message}`, report)
    }

    // Local storage
    if (!options.skipStorage) {
      storeErrorLocally(report)
    }

    // Call registered handlers
    errorHandlers.forEach(handler => {
      try {
        handler(report)
      } catch (handlerError) {
        console.error('Error handler failed:', handlerError)
      }
    })

    // Remote reporting (placeholder for future integration)
    if (!options.skipRemoteReporting) {
      // TODO: Implement remote error reporting service integration
      if (report.severity === 'critical' || report.severity === 'high') {
        console.error('High-severity error reported:', report)
      }
    }
  }

  // Store error in localStorage
  const storeErrorLocally = (report: ErrorReport): void => {
    try {
      const stored = localStorage.getItem('error_reports') || '[]'
      const errors = JSON.parse(stored) as ErrorReport[]

      errors.push(report)

      // Maintain storage size
      if (errors.length > maxStorageSize) {
        errors.splice(0, errors.length - maxStorageSize)
      }

      localStorage.setItem('error_reports', JSON.stringify(errors))
    } catch {
      // Ignore localStorage errors
    }
  }

  // Set up global error handlers
  const setupGlobalHandlers = (): void => {
    window.addEventListener('error', event => {
      const id = reportJavaScriptError(event)
      // Prevent default browser error reporting for handled errors
      if (id) {
        event.preventDefault()
      }
    })

    window.addEventListener('unhandledrejection', event => {
      const id = reportUnhandledRejection(event)
      // Prevent unhandled rejection console warnings for handled errors
      if (id) {
        event.preventDefault()
      }
    })
  }

  // Public API implementation
  const reportError = (error: Error | string, options: ErrorReportingOptions = {}): string => {
    const source = options.source || 'manual'
    const report = createErrorReport(error, source, options)
    processErrorReport(report, options)
    return report.id
  }

  const reportErrorWithContext = (
    message: string,
    context: ErrorContext,
    options: ErrorReportingOptions = {}
  ): string => {
    const enhancedOptions = { ...options, context: { ...options.context, ...context } }
    return reportError(message, enhancedOptions)
  }

  const reportJavaScriptError = (event: ErrorEvent): string => {
    const report = createErrorReport(event.error || event.message, 'javascript_error', {
      severity: 'high',
      context: {
        filename: event.filename,
        line: event.lineno,
        column: event.colno,
      },
    })

    report.line = event.lineno
    report.column = event.colno

    processErrorReport(report)
    return report.id
  }

  const reportUnhandledRejection = (event: PromiseRejectionEvent): string => {
    const report = createErrorReport(
      event.reason instanceof Error ? event.reason : String(event.reason),
      'unhandled_rejection',
      {
        severity: 'high',
        context: { rejectionReason: String(event.reason) },
      }
    )

    processErrorReport(report)
    return report.id
  }

  const reportComponentError = (error: Error, componentName: string, componentStack?: string | null): string => {
    const report = createErrorReport(error, 'react_component', {
      severity: 'high',
      context: {
        componentName,
        componentStack: componentStack || undefined,
      },
    })

    processErrorReport(report)
    return report.id
  }

  const reportNetworkError = (url: string, status: number, error: Error): string => {
    const report = createErrorReport(error, 'network_request', {
      severity: status >= 500 ? 'high' : 'medium',
      context: {
        requestUrl: url,
        statusCode: status,
      },
    })

    processErrorReport(report)
    return report.id
  }

  const reportImageLoadError = (src: string, error?: Error): string => {
    const message = error ? error.message : `Failed to load image: ${src}`
    const report = createErrorReport(message, 'image_load', {
      severity: 'low',
      context: { imageSrc: src },
    })

    processErrorReport(report)
    return report.id
  }

  const reportValidationError = (field: string, value: unknown, rule: string): string => {
    const message = `Validation failed for field '${field}': ${rule}`
    const report = createErrorReport(message, 'validation', {
      severity: 'low',
      context: { field, value, rule },
    })

    processErrorReport(report)
    return report.id
  }

  const getStoredErrors = (): ErrorReport[] => {
    try {
      const stored = localStorage.getItem('error_reports') || '[]'
      return JSON.parse(stored) as ErrorReport[]
    } catch {
      return []
    }
  }

  const getErrorById = (id: string): ErrorReport | undefined => {
    return errorMap.get(id)
  }

  const clearStoredErrors = (): void => {
    try {
      localStorage.removeItem('error_reports')
      errorQueue.length = 0
      errorMap.clear()
    } catch {
      // Ignore localStorage errors
    }
  }

  const clearErrorById = (id: string): void => {
    const index = errorQueue.findIndex(error => error.id === id)
    if (index !== -1) {
      errorQueue.splice(index, 1)
      errorMap.delete(id)
    }
  }

  const addErrorHandler = (handler: ErrorHandler): void => {
    errorHandlers.add(handler)
  }

  const removeErrorHandler = (handler: ErrorHandler): void => {
    errorHandlers.delete(handler)
  }

  const setSeverityThreshold = (threshold: ErrorSeverity): void => {
    severityThreshold = threshold
  }

  const initialize = (): void => {
    if (isInitialized) return

    isInitialized = true
    setupGlobalHandlers()

    // Set production severity threshold
    if (import.meta.env.PROD) {
      setSeverityThreshold('medium')
    }
  }

  const destroy = (): void => {
    if (!isInitialized) return

    isInitialized = false
    errorHandlers.clear()
    errorQueue.length = 0
    errorMap.clear()

    // Note: Cannot remove global event listeners without references
    // This is acceptable as the service is typically a singleton
  }

  return {
    reportError,
    reportErrorWithContext,
    reportJavaScriptError,
    reportUnhandledRejection,
    reportComponentError,
    reportNetworkError,
    reportImageLoadError,
    reportValidationError,
    getStoredErrors,
    getErrorById,
    clearStoredErrors,
    clearErrorById,
    addErrorHandler,
    removeErrorHandler,
    setSeverityThreshold,
    initialize,
    destroy,
  }
}

// Export singleton instance
export const errorReportingService = createErrorReportingService()
