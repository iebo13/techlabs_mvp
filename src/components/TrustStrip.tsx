/**
 * TrustStrip component - displays award line and partner logos to build credibility
 * Features: Google.org award line, partner logo grid with lazy loading, responsive design
 */

import React from 'react'

import {
    Stack,
    Typography,
    Box,
    Grid,
    useTheme,
} from '@mui/material'

import homeData from '../mocks/home.json'
import { HomeDataSchema } from '../mocks/schemas'

import { Section } from './Section'

import type { HomeData, Partner } from '../types/home'

/**
 * TrustStrip component props
 */
export type TrustStripProps = {
    className?: string
}

/**
 * Partner logo component with lazy loading and proper accessibility
 */
const PartnerLogo: React.FC<{ partner: Partner }> = ({ partner }) => {
    return (
        <Box
            component="img"
            src={partner.logoUrl}
            alt={partner.name}
            loading="lazy"
            sx={{
                height: { xs: 32, sm: 40, md: 48 },
                width: 'auto',
                maxWidth: '100%',
                objectFit: 'contain',
                filter: 'grayscale(1)',
                opacity: 0.7,
                transition: 'all 0.3s ease',
                '&:hover': {
                    filter: 'grayscale(0)',
                    opacity: 1,
                },
            }}
        />
    )
}

/**
 * TrustStrip component
 */
export const TrustStrip: React.FC<TrustStripProps> = ({ className }) => {
    const theme = useTheme()
    // Mobile breakpoint ready for future responsive features
    // const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    // Validate and parse mock data
    const validatedData: HomeData = HomeDataSchema.parse(homeData)
    const { partners } = validatedData

    return (
        <Section
            className={className}
            sx={{
                py: { xs: 3, md: 4 }, // Modest gap spacing
                backgroundColor: 'background.default', // Pure white background
                // Remove borders for cleaner minimal look
            }}
        >
            <Stack spacing={3} alignItems="center">
                {/* Award Line with inline Google.org mark */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1.5,
                        flexWrap: 'wrap',
                    }}
                >
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        textAlign="center"
                        sx={{
                            fontSize: { xs: '0.875rem', sm: '1rem' },
                            fontWeight: 500,
                        }}
                    >
                        Winner of the
                    </Typography>
                    <Box
                        component="img"
                        src="https://www.google.org/static/images/google-org-logo.svg"
                        alt="Google.org"
                        sx={{
                            height: { xs: 20, sm: 24 },
                            width: 'auto',
                            opacity: 0.8,
                        }}
                    />
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        textAlign="center"
                        sx={{
                            fontSize: { xs: '0.875rem', sm: '1rem' },
                            fontWeight: 500,
                        }}
                    >
                        Impact Challenge Germany 2018
                    </Typography>
                </Box>

                {/* Partner Logos Grid */}
                <Box sx={{ width: '100%', maxWidth: 800 }}>
                    <Grid
                        container
                        spacing={{ xs: 2, sm: 3, md: 4 }}
                        justifyContent="center"
                        alignItems="center"
                    >
                        {partners.map((partner: Partner) => (
                            <Grid
                                size={{ xs: 6, sm: 3, md: 3 }}
                                key={partner.name}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    minHeight: { xs: 60, sm: 80 },
                                }}
                            >
                                {partner.href ? (
                                    <Box
                                        component="a"
                                        href={partner.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            textDecoration: 'none',
                                            '&:focus-visible': {
                                                outline: `2px solid ${theme.palette.primary.main}`,
                                                outlineOffset: 2,
                                                borderRadius: 1,
                                            },
                                        }}
                                        aria-label={`Visit ${partner.name} website`}
                                    >
                                        <PartnerLogo partner={partner} />
                                    </Box>
                                ) : (
                                    <PartnerLogo partner={partner} />
                                )}
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Additional context for screen readers */}
                <Typography
                    component="p"
                    aria-label="Our trusted partners support TechLabs educational programs"
                    sx={{
                        sr: 'only', // Screen reader only
                        position: 'absolute',
                        width: '1px',
                        height: '1px',
                        padding: 0,
                        margin: '-1px',
                        overflow: 'hidden',
                        clip: 'rect(0, 0, 0, 0)',
                        whiteSpace: 'nowrap',
                        border: 0,
                    }}
                >
                    Our trusted partners who support TechLabs educational programs
                </Typography>
            </Stack>
        </Section>
    )
}
