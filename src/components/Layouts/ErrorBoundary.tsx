import React, { useState, useEffect, type ReactNode } from 'react'
import {
  ExpandMore as ExpandMoreIcon,
  Refresh as RefreshIcon,
  ErrorOutline as ErrorIcon,
} from '@mui/icons-material'
import {
  Box,
  Typography,
  Button,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import { errorMonitor } from '@/utils/errorMonitor'

type ErrorBoundaryProps = {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

type ErrorBoundaryState = {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
  errorId?: string
}

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children, fallback, onError }) => {
  const [state, setState] = useState<ErrorBoundaryState>({ hasError: false })

  useEffect(() => {
    const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
      const errorId = `error_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`

      // Report to error monitor
      errorMonitor.captureError(
        {
          message: `React Error Boundary: ${error.message}`,
          stack: error.stack,
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          route: window.location.pathname,
        },
        {
          errorId,
          componentStack: errorInfo.componentStack,
          errorBoundary: 'ErrorBoundary',
        }
      )

      // Call custom error handler if provided
      onError?.(error, errorInfo)

      setState({ hasError: true, error, errorInfo, errorId })
    }

    // Set up global error handlers
    const originalErrorHandler = window.onerror
    const originalUnhandledRejectionHandler = window.onunhandledrejection

    window.onerror = (message, source, lineno, colno, error) => {
      if (error) {
        handleError(error, { componentStack: '' })
      }

      if (originalErrorHandler) {
        return originalErrorHandler(message, source, lineno, colno, error)
      }

      return false
    }

    window.onunhandledrejection = event => {
      if (event.reason instanceof Error) {
        handleError(event.reason, { componentStack: '' })
      }

      if (originalUnhandledRejectionHandler) {
        originalUnhandledRejectionHandler.call(window, event)
      }
    }

    return () => {
      window.onerror = originalErrorHandler
      window.onunhandledrejection = originalUnhandledRejectionHandler
    }
  }, [onError])

  const _handleRetry = (): void => {
    setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  const _handleReload = (): void => {
    window.location.reload()
  }

  if (state.hasError) {
    if (fallback) {
      return <>{fallback}</>
    }

    const isDev = import.meta.env.DEV
    const { error, errorInfo, errorId } = state

    return (
      <Box
        sx={{
          minHeight: '50vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
          textAlign: 'center',
        }}
      >
        <ErrorIcon sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />

        <Typography variant="h4" component="h1" gutterBottom>
          Something went wrong
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 600 }}>
          We apologize for the inconvenience. The error has been automatically reported to our team.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Button variant="contained" startIcon={<RefreshIcon />} onClick={_handleRetry}>
            Try Again
          </Button>
          <Button variant="outlined" onClick={_handleReload}>
            Reload Page
          </Button>
        </Box>

        {errorId && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Error ID: <code>{errorId}</code>
          </Alert>
        )}

        {isDev && error && (
          <Accordion sx={{ width: '100%', maxWidth: 800 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle2">Developer Information</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="subtitle2" gutterBottom>
                  Error Message:
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 2 }}>
                  {error.message}
                </Typography>

                {error.stack && (
                  <>
                    <Typography variant="subtitle2" gutterBottom>
                      Stack Trace:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: 'monospace',
                        whiteSpace: 'pre-wrap',
                        fontSize: '0.75rem',
                        mb: 2,
                      }}
                    >
                      {error.stack}
                    </Typography>
                  </>
                )}

                {errorInfo?.componentStack && (
                  <>
                    <Typography variant="subtitle2" gutterBottom>
                      Component Stack:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: 'monospace',
                        whiteSpace: 'pre-wrap',
                        fontSize: '0.75rem',
                      }}
                    >
                      {errorInfo.componentStack}
                    </Typography>
                  </>
                )}
              </Box>
            </AccordionDetails>
          </Accordion>
        )}
      </Box>
    )
  }

  return <>{children}</>
}
