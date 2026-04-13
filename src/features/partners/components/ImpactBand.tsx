import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import { Section } from '@/components/Layouts'
import { useI18n } from '@/hooks'

type ImpactMetric = {
  value: string
  label: string
}

type ImpactBandProps = {
  readonly metrics: ImpactMetric[]
}

export const ImpactBand: React.FC<ImpactBandProps> = ({ metrics }) => {
  const { t } = useI18n()

  return (
    <Section variant="paper" sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h3" color="primary.main" pb={4}>
            {t('partners.impact.title')}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: { xs: 3, sm: 4 },
            }}>
            {metrics.map(metric => (
              <Box key={metric.label} sx={{ textAlign: 'center', minWidth: { xs: '40%', sm: 'auto' } }}>
                <Typography
                  variant="h2"
                  color="text.primary"
                  fontWeight={900}
                  sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
                  {metric.value}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" fontWeight={600}>
                  {metric.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Section>
  )
}
