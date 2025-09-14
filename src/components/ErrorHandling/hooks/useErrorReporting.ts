/* eslint-disable */
/**
 * React hooks for unified error reporting
 *
 * These hooks provide easy-to-use error reporting functionality
 * for React components, eliminating duplication across the codebase.
 */

import { useCallback, useEffect, useRef } from 'react'
import {
  errorReportingService,
  type ErrorContext,
  type ErrorReportingOptions,
  type ErrorSeverity,
  type ErrorReport,
} from '../ErrorReportingService'

// Hook for basic error reporting
export const useErrorReporting = () => {
  const reportError = useCallback((error: Error | string, options?: ErrorReportingOptions) => {
    return errorReportingService.reportError(error, options)
  }, [])

  const reportErrorWithContext = useCallback(
    (message: string, context: ErrorContext, options?: ErrorReportingOptions) => {
      return errorReportingService.reportErrorWithContext(message, context, options)
    },
    []
  )

  return {
    reportError,
    reportErrorWithContext,
  }
}

// Hook for component-specific error reporting
export const useComponentErrorReporting = (componentName: string) => {
  const componentContext = useRef<ErrorContext>({ componentName })

  const reportError = useCallback(
    (error: Error | string, additionalContext?: ErrorContext, options?: ErrorReportingOptions) => {
      const context = { ...componentContext.current, ...additionalContext }
      const enhancedOptions = { ...options, context: { ...options?.context, ...context } }

      return errorReportingService.reportError(error, enhancedOptions)
    },
    [componentName]
  )

  const reportComponentError = useCallback(
    (error: Error, componentStack?: string | null) => {
      return errorReportingService.reportComponentError(error, componentName, componentStack)
    },
    [componentName]
  )

  // Update component context
  const updateContext = useCallback((newContext: Partial<ErrorContext>) => {
    componentContext.current = { ...componentContext.current, ...newContext }
  }, [])

  return {
    reportError,
    reportComponentError,
    updateContext,
  }
}

// Hook for handling async operations with error reporting
export const useAsyncErrorReporting = () => {
  const { reportError } = useErrorReporting()

  const withErrorReporting = useCallback(
    <T extends unknown[], R>(asyncFn: (...args: T) => Promise<R>, errorOptions?: ErrorReportingOptions) => {
      return async (...args: T): Promise<R> => {
        try {
          return await asyncFn(...args)
        } catch (error) {
          reportError(error as Error, {
            source: 'user_action',
            severity: 'medium',
            ...errorOptions,
          })
          throw error // Re-throw to maintain original behavior
        }
      }
    },
    [reportError]
  )

  return { withErrorReporting }
}

// Hook for network request error reporting
export const useNetworkErrorReporting = () => {
  const reportNetworkError = useCallback((url: string, status: number, error: Error) => {
    return errorReportingService.reportNetworkError(url, status, error)
  }, [])

  const withNetworkErrorReporting = useCallback(
    <T extends unknown[], R>(networkFn: (...args: T) => Promise<Response | R>, getUrl: (...args: T) => string) => {
      return async (...args: T): Promise<Response | R> => {
        try {
          const result = await networkFn(...args)

          // Check if result is a Response object
          if (result instanceof Response && !result.ok) {
            const url = getUrl(...args)
            const error = new Error(`Network request failed: ${result.status} ${result.statusText}`)
            reportNetworkError(url, result.status, error)
          }

          return result
        } catch (error) {
          const url = getUrl(...args)
          reportNetworkError(url, 0, error as Error)
          throw error
        }
      }
    },
    [reportNetworkError]
  )

  return {
    reportNetworkError,
    withNetworkErrorReporting,
  }
}

// Hook for image loading error reporting
export const useImageErrorReporting = () => {
  const reportImageError = useCallback((src: string, error?: Error) => {
    return errorReportingService.reportImageLoadError(src, error)
  }, [])

  const createImageErrorHandler = useCallback(
    (src: string, onError?: () => void) => {
      return () => {
        reportImageError(src)
        onError?.()
      }
    },
    [reportImageError]
  )

  return {
    reportImageError,
    createImageErrorHandler,
  }
}

// Hook for form validation error reporting
export const useValidationErrorReporting = () => {
  const reportValidationError = useCallback((field: string, value: unknown, rule: string) => {
    return errorReportingService.reportValidationError(field, value, rule)
  }, [])

  const createValidationErrorReporter = useCallback(
    (field: string) => {
      return (value: unknown, rule: string) => {
        return reportValidationError(field, value, rule)
      }
    },
    [reportValidationError]
  )

  return {
    reportValidationError,
    createValidationErrorReporter,
  }
}

// Hook for error boundary integration
export const useErrorBoundaryReporting = () => {
  const reportComponentError = useCallback((error: Error, componentName: string, componentStack?: string | null) => {
    return errorReportingService.reportComponentError(error, componentName, componentStack)
  }, [])

  return { reportComponentError }
}

// Hook for error management and debugging
export const useErrorManagement = () => {
  const getStoredErrors = useCallback(() => {
    return errorReportingService.getStoredErrors()
  }, [])

  const getErrorById = useCallback((id: string) => {
    return errorReportingService.getErrorById(id)
  }, [])

  const clearStoredErrors = useCallback(() => {
    errorReportingService.clearStoredErrors()
  }, [])

  const clearErrorById = useCallback((id: string) => {
    errorReportingService.clearErrorById(id)
  }, [])

  return {
    getStoredErrors,
    getErrorById,
    clearStoredErrors,
    clearErrorById,
  }
}

// Hook for error reporting configuration
export const useErrorReportingConfig = () => {
  const setSeverityThreshold = useCallback((threshold: ErrorSeverity) => {
    errorReportingService.setSeverityThreshold(threshold)
  }, [])

  const addErrorHandler = useCallback((handler: (report: ErrorReport) => void) => {
    errorReportingService.addErrorHandler(handler)

    // Return cleanup function
    return () => errorReportingService.removeErrorHandler(handler)
  }, [])

  return {
    setSeverityThreshold,
    addErrorHandler,
  }
}

// Hook for initializing error reporting in the app
export const useErrorReportingInit = () => {
  const isInitialized = useRef(false)

  useEffect(() => {
    if (!isInitialized.current) {
      errorReportingService.initialize()
      isInitialized.current = true
    }

    return () => {
      // Only destroy if this hook was responsible for initialization
      if (isInitialized.current) {
        errorReportingService.destroy()
        isInitialized.current = false
      }
    }
  }, [])

  return { isInitialized: isInitialized.current }
}
