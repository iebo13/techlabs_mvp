import React from 'react'
import { Box, Typography } from '@mui/material'
import { useI18n } from '@/hooks'
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
  const { t } = useI18n()

  if (isLoading) {
    return <>{skeleton ?? <SectionSkeleton height={skeletonHeight} />}</>
  }

  if (error) {
    return (
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h6" color="error" gutterBottom>
          {t('errorBoundary.title')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {error.message}
        </Typography>
      </Box>
    )
  }

  return <>{children}</>
}

DataLoadingState.displayName = 'DataLoadingState'
