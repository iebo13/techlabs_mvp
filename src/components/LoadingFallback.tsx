import React from 'react'
import { Box, CircularProgress, Typography, type SxProps, type Theme } from '@mui/material'
import { useI18n } from '@/hooks'

type LoadingFallbackVariant = 'component' | 'page'

type LoadingFallbackProps = {
  variant?: LoadingFallbackVariant
  text?: string
  size?: number
  minHeight?: string | number
  sx?: SxProps<Theme>
}

const VARIANT_CONFIGS: Record<LoadingFallbackVariant, Partial<LoadingFallbackProps>> = {
  component: {
    size: 24,
    minHeight: '200px',
  },
  page: {
    size: 40,
    minHeight: '50vh',
  },
}

export const LoadingFallback: React.FC<LoadingFallbackProps> = ({
  variant = 'component',
  text,
  size,
  minHeight,
  sx,
}) => {
  const { t } = useI18n()
  // eslint-disable-next-line security/detect-object-injection
  const config = VARIANT_CONFIGS[variant]

  const defaultText = variant === 'page' ? t('common.loadingPage') : t('common.loading')
  const finalText = text ?? defaultText
  const finalSize = size ?? config.size ?? 24
  const finalMinHeight = minHeight ?? config.minHeight ?? '200px'

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight={finalMinHeight}
      gap={2}
      sx={sx}>
      <CircularProgress size={finalSize} />
      <Typography variant="body2" color="text.secondary">
        {finalText}
      </Typography>
    </Box>
  )
}
