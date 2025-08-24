import React, { Suspense } from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

type LazyPageProps = {
  children: React.ReactNode
  fallback?: React.ReactNode
}

const DefaultFallback: React.FC = () => (
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
)

export const LazyPage: React.FC<LazyPageProps> = ({ children, fallback = <DefaultFallback /> }) => {
  return <Suspense fallback={fallback}>{children}</Suspense>
}
