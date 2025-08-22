import React from 'react'

import { Link } from 'react-router-dom'

import { Container, Grid, Button, Box } from '@mui/material'

import homeData from '../mocks/home.json'

import { Section } from './Section'
import { SectionHeading } from './SectionHeading'
import { ValuePropCard } from './ValuePropCard'

/**
 * WhyTechlabs component - showcases 3 key value propositions
 * MVP-09: Displays "Totally free", "Networking", "Job Ready" cards with CTA
 */
export const WhyTechlabs: React.FC = () => {
    return (
        <Section sx={{ py: { xs: 8, md: 12 } }}>
            <Container maxWidth="lg">
                {/* Section Heading */}
                <SectionHeading
                    level={2}
                    centered={true}
                    subtitle="Discover what makes our programs unique and effective"
                    sx={{ mb: { xs: 6, md: 8 } }}
                >
                    Why TechLabs?
                </SectionHeading>

                {/* Value Proposition Cards */}
                <Grid container spacing={{ xs: 3, md: 4 }} sx={{ mb: { xs: 6, md: 8 } }}>
                    {homeData.features.map((feature) => (
                        <Grid size={{ xs: 12, md: 4 }} key={feature.title}>
                            <ValuePropCard
                                icon={feature.icon}
                                title={feature.title}
                                body={feature.body}
                            />
                        </Grid>
                    ))}
                </Grid>

                {/* Call to Action */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Button
                        component={Link}
                        to="/tracks"
                        variant="contained"
                        size="large"
                        sx={{
                            px: 4,
                            py: 1.5,
                            borderRadius: 28,
                            textTransform: 'none',
                            fontWeight: 700,
                            fontSize: '1.1rem'
                        }}
                    >
                        Start learning
                    </Button>
                </Box>
            </Container>
        </Section>
    )
}
