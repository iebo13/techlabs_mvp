import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import { ExpandMore, QuestionAnswer } from '@mui/icons-material'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Container,
    Stack,
    Typography,
} from '@mui/material'

import { Section } from './Section'

type FAQ = {
    q: string
    a: string
}

type FaqsProps = {
    faqs: FAQ[]
}

/**
 * Faqs component - FAQ accordion with single-open behavior and keyboard navigation.
 * Shows FAQ items with expandable answers and a link to the full FAQ page.
 */
export const Faqs: React.FC<FaqsProps> = ({ faqs }) => {
    const [expanded, setExpanded] = useState<string | false>(false)

    const handleChange = (panel: string) => (
        _event: React.SyntheticEvent,
        isExpanded: boolean
    ) => {
        setExpanded(isExpanded ? panel : false)
    }

    return (
        <Section sx={{ py: { xs: 6, md: 8 } }}>
            <Container maxWidth="lg">
                <Stack spacing={6}>
                    {/* Section Header */}
                    <Box textAlign="center">
                        <Typography
                            variant="h2"
                            component="h2"
                            gutterBottom
                            sx={{
                                fontSize: { xs: '2rem', md: '2.5rem' },
                                fontWeight: 700,
                                color: 'text.primary',
                            }}
                        >
                            Frequently Asked Questions
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ fontSize: { xs: '1rem', md: '1.125rem' } }}
                        >
                            Get answers to common questions about TechLabs
                        </Typography>
                    </Box>

                    {/* FAQ Accordion */}
                    <Box maxWidth="md" mx="auto" width="100%">
                        <Stack spacing={2}>
                            {faqs.map((faq, index) => (
                                <Accordion
                                    key={`faq-${faq.q.slice(0, 20).toLowerCase().replace(/\s+/g, '-')}`}
                                    expanded={expanded === `panel${index}`}
                                    onChange={handleChange(`panel${index}`)}
                                    sx={{
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        borderRadius: 2,
                                        '&:before': {
                                            display: 'none',
                                        },
                                        '&.Mui-expanded': {
                                            borderColor: 'primary.main',
                                            boxShadow: 2,
                                        },
                                    }}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMore />}
                                        aria-controls={`panel${index}bh-content`}
                                        id={`panel${index}bh-header`}
                                        sx={{
                                            '& .MuiAccordionSummary-content': {
                                                margin: 2,
                                            },
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            component="div"
                                            sx={{
                                                fontWeight: 600,
                                                color: 'text.primary',
                                            }}
                                        >
                                            {faq.q}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ px: 3, pb: 3 }}>
                                        <Typography
                                            variant="body1"
                                            color="text.secondary"
                                            sx={{ lineHeight: 1.6 }}
                                        >
                                            {faq.a}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </Stack>
                    </Box>

                    {/* More Questions Link */}
                    <Box textAlign="center">
                        <Button
                            component={Link}
                            to="/about#faq"
                            variant="outlined"
                            size="large"
                            startIcon={<QuestionAnswer />}
                            sx={{
                                px: 4,
                                py: 1.5,
                                borderRadius: 3,
                                borderWidth: 2,
                                fontSize: '1rem',
                                fontWeight: 600,
                                '&:hover': {
                                    borderWidth: 2,
                                    transform: 'translateY(-1px)',
                                    boxShadow: 3,
                                },
                            }}
                        >
                            More Questions
                        </Button>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 2 }}
                        >
                            Can't find what you're looking for? Check our full FAQ section.
                        </Typography>
                    </Box>
                </Stack>
            </Container>
        </Section>
    )
}
