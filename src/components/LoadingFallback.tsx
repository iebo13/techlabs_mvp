import React from 'react'
import { Box, CircularProgress, Typography, type SxProps, type Theme } from '@mui/material'

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
        text: 'Loading...',
        size: 24,
        minHeight: '200px',
    },
    page: {
        text: 'Loading page...',
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
    const config = VARIANT_CONFIGS[variant]

    const finalText = text ?? config.text ?? 'Loading...'
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
            sx={sx}
        >
            <CircularProgress size={finalSize} />
            <Typography variant="body2" color="text.secondary">
                {finalText}
            </Typography>
        </Box>
    )
}
