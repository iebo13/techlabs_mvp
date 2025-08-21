import React from 'react'

import { Box, Typography } from '@mui/material'

import { Section } from './Section'

/**
 * Hero component provides the main landing section with primary value proposition.
 * Features responsive typography with emphasis on "Tech" and supporting subhead.
 */
export const Hero: React.FC = () => {
    return (
        <Section
            component="section"
            sx={{
                minHeight: { xs: '60vh', md: '70vh' },
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                py: { xs: 8, md: 12 },
                '& > .MuiContainer-root': {
                    '&[aria-labelledby]': {
                        ariaLabelledby: 'hero-heading',
                    }
                }
            }}
        >
            <Box sx={{ width: '100%', maxWidth: '800px', mx: 'auto' }}>
                {/* Main Heading */}
                <Typography
                    id="hero-heading"
                    component="h1"
                    sx={{
                        fontSize: {
                            xs: 'clamp(2.125rem, 8vw, 3.5rem)', // 34px to 56px on mobile
                            md: 'clamp(3rem, 6vw, 5.5rem)',     // 48px to 88px on desktop
                        },
                        fontWeight: 800,
                        lineHeight: 1.1,
                        letterSpacing: '-0.02em',
                        color: 'text.primary',
                        mb: 3,
                        '& .emphasis': {
                            color: 'primary.main',
                            fontWeight: 'inherit',
                        },
                    }}
                >
                    Learn{' '}
                    <Box component="span" className="emphasis">
                        Tech
                    </Box>{' '}
                    Skills for Free
                </Typography>

                {/* Subhead */}
                <Typography
                    variant="subtitle1"
                    component="p"
                    sx={{
                        fontSize: { xs: '1.125rem', md: '1.25rem' },
                        fontWeight: 400,
                        lineHeight: 1.5,
                        color: 'text.secondary',
                        maxWidth: '600px',
                        mx: 'auto',
                        '& .separator': {
                            color: 'text.disabled',
                            mx: 1,
                            fontSize: '0.875em',
                            userSelect: 'none',
                        },
                    }}
                >
                    Blended learning
                    <Box component="span" className="separator">
                        ·
                    </Box>
                    Local Community
                    <Box component="span" className="separator">
                        ·
                    </Box>
                    Practical Projects
                </Typography>
            </Box>
        </Section>
    )
}
