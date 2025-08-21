import React from 'react'
import { Typography, Box, TypographyProps } from '@mui/material'

export interface SectionHeadingProps extends Omit<TypographyProps, 'variant'> {
    /** Heading level for semantic HTML and styling */
    level?: 1 | 2 | 3 | 4 | 5 | 6
    /** Visual emphasis style */
    emphasis?: 'primary' | 'secondary' | 'gradient'
    /** Optional subtitle text */
    subtitle?: string
    /** Whether to center align the heading */
    centered?: boolean
    /** Maximum width for centered headings */
    maxWidth?: string | number
    /** Children content (heading text) */
    children: React.ReactNode
}

/**
 * SectionHeading component provides consistent heading typography and styling.
 * Supports semantic heading levels with optional emphasis and subtitles.
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
    level = 2,
    emphasis,
    subtitle,
    centered = false,
    maxWidth = '600px',
    children,
    sx,
    ...typographyProps
}) => {
    const getVariant = (): TypographyProps['variant'] => {
        switch (level) {
            case 1:
                return 'h1'
            case 2:
                return 'h2'
            case 3:
                return 'h3'
            case 4:
                return 'h4'
            case 5:
                return 'h5'
            case 6:
                return 'h6'
            default:
                return 'h2'
        }
    }

    const getEmphasisStyles = () => {
        switch (emphasis) {
            case 'primary':
                return {
                    color: 'primary.main',
                }
            case 'secondary':
                return {
                    color: 'secondary.main',
                }
            case 'gradient':
                return {
                    background: 'linear-gradient(45deg, #ff3366 0%, #6c5ce7 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                }
            default:
                return {}
        }
    }

    const containerStyles = {
        textAlign: centered ? 'center' : 'inherit',
        maxWidth: centered ? maxWidth : 'none',
        mx: centered ? 'auto' : 0,
    }

    return (
        <Box sx={containerStyles}>
            <Typography
                component={`h${level}` as any}
                variant={getVariant()}
                sx={{
                    ...getEmphasisStyles(),
                    ...sx,
                }}
                {...typographyProps}
            >
                {children}
            </Typography>
            {subtitle && (
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                        mt: 2,
                        fontSize: '1.125rem',
                        lineHeight: 1.6,
                    }}
                >
                    {subtitle}
                </Typography>
            )}
        </Box>
    )
}
