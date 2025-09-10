import React, { Suspense, memo, useState, useEffect } from 'react'
import { Refresh as RefreshIcon } from '@mui/icons-material'
import { Box, Typography, Alert, Button, Fade, LinearProgress } from '@mui/material'

type LazyPageProps = {
  children: React.ReactNode
  fallback?: React.ReactNode
  errorFallback?: React.ReactNode
}

// Enhanced fallback with progressive loading indication
const DefaultFallback = memo(() => {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Loading page...')

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev

        return prev + Math.random() * 15
      })
    }, 200)

    const textTimer = setTimeout(() => {
      setLoadingText('Almost ready...')
    }, 1000)

    return () => {
      clearInterval(timer)
      clearTimeout(textTimer)
    }
  }, [])

  return (
    <Fade in timeout={300}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="50vh"
        gap={2}
        px={2}
      >
        <Box sx={{ width: '100%', maxWidth: 400 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: 'grey.200',
              '& .MuiLinearProgress-bar': {
                borderRadius: 3,
                background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
              },
            }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {loadingText}
        </Typography>
      </Box>
    </Fade>
  )
})

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
    return (
      <Suspense fallback={fallback}>
        <LazyPageErrorBoundary fallback={errorFallback}>{children}</LazyPageErrorBoundary>
      </Suspense>
    )
  }
)

LazyPage.displayName = 'LazyPage'
