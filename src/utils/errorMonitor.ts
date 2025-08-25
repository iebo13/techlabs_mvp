/**
 * Production error monitoring and logging utility
 * Captures and reports errors for deployed applications
 */

type ErrorReport = {
  message: string
  stack?: string
  url: string
  line?: number
  column?: number
  timestamp: number
  userAgent: string
  userId?: string
  buildVersion?: string
  route?: string
  additionalData?: Record<string, unknown>
}

type ErrorMonitorInstance = {
  init: () => void
  captureError: (error: Partial<ErrorReport>, additionalData?: Record<string, unknown>) => void
  getStoredErrors: () => ErrorReport[]
  clearStoredErrors: () => void
  reportError: (message: string, error?: Error, additionalData?: Record<string, unknown>) => void
}

const createErrorMonitor = (): ErrorMonitorInstance => {
  let _isInitialized = false
  const _errorQueue: ErrorReport[] = []
  const _maxQueueSize = 50

  const _setupGlobalErrorHandlers = (): void => {
    window.addEventListener('error', event => {
      captureError({
        message: event.message,
        stack: event.error?.stack,
        url: event.filename || window.location.href,
        line: event.lineno,
        column: event.colno,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        route: window.location.pathname,
        buildVersion: import.meta.env.VITE_BUILD_VERSION || 'unknown',
      })
    })
  }

  const _setupUnhandledRejectionHandler = (): void => {
    window.addEventListener('unhandledrejection', event => {
      captureError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
        url: window.location.href,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        route: window.location.pathname,
        buildVersion: import.meta.env.VITE_BUILD_VERSION || 'unknown',
      })
    })
  }

  const _setupReactErrorBoundary = (): void => {
    // This will be called by React error boundaries
    ;(window as unknown as Record<string, unknown>).__errorMonitor = { captureError }
  }

  const captureError = (
    error: Partial<ErrorReport>,
    additionalData?: Record<string, unknown>
  ): void => {
    const fullError: ErrorReport = {
      message: error.message || 'Unknown error',
      stack: error.stack,
      url: error.url || window.location.href,
      line: error.line,
      column: error.column,
      timestamp: error.timestamp || Date.now(),
      userAgent: error.userAgent || navigator.userAgent,
      route: error.route || window.location.pathname,
      buildVersion: error.buildVersion || import.meta.env.VITE_BUILD_VERSION || 'unknown',
      additionalData,
    }

    // Add to queue
    _errorQueue.push(fullError)
    if (_errorQueue.length > _maxQueueSize) {
      _errorQueue.shift() // Remove oldest error
    }

    // Log to console in development
    if (import.meta.env.DEV) {
      console.error('Error captured:', fullError)
    }

    // Send to monitoring service
    _sendErrorReport(fullError)
  }

  const _sendErrorReport = (error: ErrorReport): void => {
    try {
      // Option 1: Send to your own backend
      // await fetch('/api/errors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(error)
      // })

      // Option 2: Send to Firebase (if using Firebase)
      // const { logEvent } = await import('firebase/analytics')
      // const analytics = getAnalytics()
      // logEvent(analytics, 'exception', {
      //   description: error.message,
      //   fatal: false
      // })

      // Option 3: Log to console for now (can be viewed in browser dev tools)
      console.error('Production Error Report:', {
        ...error,
        formattedTime: new Date(error.timestamp).toISOString(),
      })

      // Store in localStorage for debugging
      _storeErrorLocally(error)
    } catch (reportingError) {
      console.error('Failed to report error:', reportingError)
    }
  }

  const _storeErrorLocally = (error: ErrorReport): void => {
    try {
      const stored = localStorage.getItem('error_reports') || '[]'
      const errors = JSON.parse(stored)

      errors.push(error)

      // Keep only last 20 errors
      if (errors.length > 20) {
        errors.splice(0, errors.length - 20)
      }

      localStorage.setItem('error_reports', JSON.stringify(errors))
    } catch {
      // Ignore localStorage errors
    }
  }

  const getStoredErrors = (): ErrorReport[] => {
    try {
      const stored = localStorage.getItem('error_reports') || '[]'

      return JSON.parse(stored)
    } catch {
      return []
    }
  }

  const clearStoredErrors = (): void => {
    try {
      localStorage.removeItem('error_reports')
    } catch {
      // Ignore localStorage errors
    }
  }

  // Manual error reporting for components
  const reportError = (
    message: string,
    error?: Error,
    additionalData?: Record<string, unknown>
  ): void => {
    captureError(
      {
        message,
        stack: error?.stack,
        additionalData,
      },
      additionalData
    )
  }

  const init = (): void => {
    if (_isInitialized || import.meta.env.DEV) {
      return
    }

    _isInitialized = true
    _setupGlobalErrorHandlers()
    _setupUnhandledRejectionHandler()
    _setupReactErrorBoundary()

    // Error monitoring initialized
  }

  return {
    init,
    captureError,
    getStoredErrors,
    clearStoredErrors,
    reportError,
  }
}

export const errorMonitor = createErrorMonitor()
export default errorMonitor
