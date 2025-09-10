import React, { Suspense, lazy } from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

type LazyComponentProps = {
  importFn: () => Promise<{ default: React.ComponentType<Record<string, unknown>> }>
  fallback?: React.ReactNode
  props?: Record<string, unknown>
}

const DefaultFallback: React.FC = () => (
  <Box display="flex" alignItems="center" justifyContent="center" minHeight="200px" gap={2}>
    <CircularProgress size={24} />
    <Typography variant="body2" color="text.secondary">
      Loading...
    </Typography>
  </Box>
)

export const LazyComponent: React.FC<LazyComponentProps> = ({
  importFn,
  fallback = <DefaultFallback />,
  props = {},
}) => {
  const Component = lazy(importFn)

  return (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  )
}
