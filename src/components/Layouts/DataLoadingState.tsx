import React from 'react'
import { Box, Typography } from '@mui/material'
import { SectionSkeleton } from './skeletons'

type DataLoadingStateProps = {
  readonly isLoading: boolean
  readonly error: Error | null
  readonly children: React.ReactNode
  readonly skeleton?: React.ReactNode
  readonly skeletonHeight?: number
}

export const DataLoadingState: React.FC<DataLoadingStateProps> = ({
  isLoading,
  error,
  children,
  skeleton,
  skeletonHeight = 400,
}) => {
  if (isLoading) {
    return <>{skeleton ?? <SectionSkeleton height={skeletonHeight} />}</>
  }

  if (error) {
    return (
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h6" color="error" gutterBottom>
          Something went wrong
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {error.message}
        </Typography>
      </Box>
    )
  }

  return <>{children}</>
}
