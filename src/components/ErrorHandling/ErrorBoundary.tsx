/* eslint-disable */
// Error Boundaries must be class components - React doesn't support functional error boundaries
import React, { Component, type ReactNode } from 'react'
import { ExpandMore as ExpandMoreIcon, Refresh as RefreshIcon, ErrorOutline as ErrorIcon } from '@mui/icons-material'
import { Box, Typography, Button, Alert, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { i18n } from '@/internationalization'
import { errorReportingService } from './ErrorReportingService'

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

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Use unified error reporting service for consistent error handling
    const errorId = errorReportingService.reportComponentError(
      error,
      'ErrorBoundary',
      errorInfo.componentStack || undefined
    )

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo)

    // Update state with error details
    this.setState({
      error,
      errorInfo,
      errorId,
    })
  }

  private handleRetry = (): void => {
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
      errorId: undefined,
    })
  }

  private handleReload = (): void => {
    window.location.reload()
  }

  render(): ReactNode {
    const { children, fallback } = this.props
    const { hasError, error, errorInfo, errorId } = this.state

    if (hasError) {
      if (fallback) {
        return <>{fallback}</>
      }

      const isDev = import.meta.env.DEV

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
          }}>
          <ErrorIcon sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />

          <Typography variant="h4" component="h1" gutterBottom>
            {i18n.t('common:errorBoundary.title')}
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 600 }}>
            {i18n.t('common:errorBoundary.description')}
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Button variant="contained" startIcon={<RefreshIcon />} onClick={this.handleRetry}>
              {i18n.t('common:common.retry')}
            </Button>
            <Button variant="outlined" onClick={this.handleReload}>
              {i18n.t('common:common.reloadPage')}
            </Button>
          </Box>

          {errorId && (
            <Alert severity="info" sx={{ mb: 2 }}>
              {i18n.t('common:errorBoundary.errorId')}: <code>{errorId}</code>
            </Alert>
          )}

          {isDev && error && (
            <Accordion sx={{ width: '100%', maxWidth: 800 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle2">{i18n.t('common:errorBoundary.developerInfo')}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="subtitle2" gutterBottom>
                    {i18n.t('common:errorBoundary.errorMessage')}:
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', mb: 2 }}>
                    {error.message}
                  </Typography>

                  {error.stack && (
                    <>
                      <Typography variant="subtitle2" gutterBottom>
                        {i18n.t('common:errorBoundary.stackTrace')}:
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: 'monospace',
                          whiteSpace: 'pre-wrap',
                          fontSize: '0.75rem',
                          mb: 2,
                        }}>
                        {error.stack}
                      </Typography>
                    </>
                  )}

                  {errorInfo?.componentStack && (
                    <>
                      <Typography variant="subtitle2" gutterBottom>
                        {i18n.t('common:errorBoundary.componentStack')}:
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: 'monospace',
                          whiteSpace: 'pre-wrap',
                          fontSize: '0.75rem',
                        }}>
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
}
