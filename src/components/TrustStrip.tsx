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
    useMediaQuery,
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
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    // Validate and parse mock data
    const validatedData: HomeData = HomeDataSchema.parse(homeData)
    const { partners } = validatedData

    return (
        <Section
            className={className}
            sx={{
                py: { xs: 4, md: 6 },
                backgroundColor: 'grey.50',
                borderTop: '1px solid',
                borderBottom: '1px solid',
                borderColor: 'grey.200',
            }}
        >
            <Stack spacing={4} alignItems="center">
                {/* Award Line */}
                <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                    sx={{
                        fontStyle: 'italic',
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                        fontWeight: 500,
                    }}
                >
                    Winner of the Google.org Impact Challenge Germany 2018
                </Typography>

                {/* Partner Logos Grid */}
                <Box sx={{ width: '100%', maxWidth: 800 }}>
                    <Grid
                        container
                        spacing={{ xs: 2, sm: 3, md: 4 }}
                        justifyContent="center"
                        alignItems="center"
                    >
                        {partners.map((partner: Partner, index: number) => (
                            <Grid
                                size={{ xs: 6, sm: 3, md: 3 }}
                                key={`${partner.name}-${index}`}
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
                    variant="srOnly"
                    component="p"
                    aria-label="Our trusted partners support TechLabs educational programs"
                >
                    Our trusted partners who support TechLabs educational programs
                </Typography>
            </Stack>
        </Section>
    )
}
