import React from 'react'
import { FormatQuote } from '@mui/icons-material'
import { Box, Card, CardContent, Container, Grid, Stack, Typography } from '@mui/material'
import { Section, SectionHeading } from '@/components/Layouts'
import { useI18n } from '@/hooks'

type Testimonial = {
  quote: string
  name: string
  role: string
  company: string
}

type PartnerTestimonialsSectionProps = {
  readonly testimonials: Testimonial[]
}

export const PartnerTestimonialsSection: React.FC<PartnerTestimonialsSectionProps> = ({ testimonials }) => {
  const { t } = useI18n()

  return (
    <Section sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <SectionHeading
          level={2}
          emphasis="primary"
          centered
          subtitle={t('partners.testimonials.subtitle')}
          sx={{ mb: 4 }}>
          {t('partners.testimonials.title')}
        </SectionHeading>

        <Grid container spacing={3} sx={{ mt: 2 }} px={{ xs: 2, md: 4 }}>
          {testimonials.map(testimonial => (
            <Grid size={{ xs: 12, md: 6 }} key={testimonial.company}>
              <Card
                sx={{
                  height: '100%',
                  borderLeft: '4px solid',
                  borderColor: 'primary.main',
                }}>
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Stack spacing={3}>
                    <Box sx={{ color: 'primary.light', opacity: 0.6 }}>
                      <FormatQuote sx={{ fontSize: 40, transform: 'rotate(180deg)' }} />
                    </Box>
                    <Typography variant="body1" color="text.primary" sx={{ fontStyle: 'italic', lineHeight: 1.7 }}>
                      {testimonial.quote}
                    </Typography>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={700} color="text.primary">
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role} — {testimonial.company}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}

PartnerTestimonialsSection.displayName = 'PartnerTestimonialsSection'
