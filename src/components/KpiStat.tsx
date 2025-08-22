import React from 'react'

import { Box, Typography, Paper } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'

export type KPIStatProps = {
    /** The numeric value to display prominently */
    value: string
    /** The label/description for the metric */
    label: string
    /** Optional icon to display above the value */
    icon?: React.ReactNode
    /** Whether to use primary color emphasis */
    emphasized?: boolean
    /** Additional styling */
    sx?: SxProps<Theme>
}

/**
 * KPIStat component displays a single key performance indicator or metric.
 * Used for showing numbers like "15 Cities", "+600 Graduates", etc.
 */
export const KPIStat: React.FC<KPIStatProps> = ({
    value,
    label,
    icon,
    emphasized = false,
    sx,
}) => {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 4,
                textAlign: 'center',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                    borderColor: emphasized ? 'primary.main' : 'divider',
                    transform: 'translateY(-2px)',
                },
                ...sx,
            }}
        >
            {icon && (
                <Box
                    sx={{
                        mb: 2,
                        color: emphasized ? 'primary.main' : 'text.secondary',
                        fontSize: '2rem',
                    }}
                >
                    {icon}
                </Box>
            )}

            <Typography
                variant="h2"
                component="div"
                sx={{
                    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                    fontWeight: 900,
                    lineHeight: 0.9,
                    color: emphasized ? 'primary.main' : 'text.primary',
                    mb: 1,
                }}
            >
                {value}
            </Typography>

            <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontSize: '0.875rem',
                }}
            >
                {label}
            </Typography>
        </Paper>
    )
}
