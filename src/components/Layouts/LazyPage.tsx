import React, { Suspense, memo, useMemo } from 'react'
import { Refresh as RefreshIcon } from '@mui/icons-material'
import { Box, CircularProgress, Typography, Alert, Button } from '@mui/material'

type LazyPageProps = {
  children: React.ReactNode
  fallback?: React.ReactNode
  errorFallback?: React.ReactNode
}

// Memoized default fallback to prevent unnecessary re-renders
const DefaultFallback = memo(() => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    minHeight="50vh"
    gap={2}
  >
    <CircularProgress size={40} />
    <Typography variant="body2" color="text.secondary">
      Loading page...
    </Typography>
  </Box>
))

DefaultFallback.displayName = 'DefaultFallback'

// Memoized error fallback to prevent unnecessary re-renders
const DefaultErrorFallback = memo(() => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    minHeight="50vh"
    gap={2}
    p={3}
  >
    <Alert severity="error" sx={{ mb: 2 }}>
      Failed to load page content
    </Alert>
    <Button variant="outlined" startIcon={<RefreshIcon />} onClick={() => window.location.reload()}>
      Retry
    </Button>
  </Box>
))

DefaultErrorFallback.displayName = 'DefaultErrorFallback'

// Error boundary component for lazy-loaded pages
const LazyPageErrorBoundary: React.FC<{
  children: React.ReactNode
  fallback: React.ReactNode
}> = ({ children, fallback }) => {
  const [hasError, setHasError] = React.useState(false)

  React.useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      // Log error for debugging
      if (import.meta.env.DEV) {
        console.error('LazyPage Error:', error)
      }

      setHasError(true)
    }

    window.addEventListener('error', handleError)

    return () => window.removeEventListener('error', handleError)
  }, [])

  if (hasError) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

export const LazyPage: React.FC<LazyPageProps> = memo(
  ({ children, fallback = <DefaultFallback />, errorFallback = <DefaultErrorFallback /> }) => {
    // Memoize the error boundary to prevent unnecessary re-renders
    const errorBoundary = useMemo(
      () => <LazyPageErrorBoundary fallback={errorFallback}>{children}</LazyPageErrorBoundary>,
      [children, errorFallback]
    )

    return <Suspense fallback={fallback}>{errorBoundary}</Suspense>
  }
)

LazyPage.displayName = 'LazyPage'
