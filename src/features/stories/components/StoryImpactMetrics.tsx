import React from 'react'
import { Box, Grid, Paper, Typography } from '@mui/material'
import { SectionHeading } from '@/components/Layouts'
import { useI18n } from '@/hooks'
import type { StoryMetric } from '../types/stories.types'

type StoryImpactMetricsProps = {
  readonly metrics: readonly StoryMetric[]
}

export const StoryImpactMetrics: React.FC<StoryImpactMetricsProps> = ({ metrics }) => {
  const { t } = useI18n()

  if (metrics.length === 0) return null

  return (
    <Box>
      <SectionHeading level={3} emphasis="primary" sx={{ mb: 3 }}>
        {t('common:stories.detail.impactNumbers')}
      </SectionHeading>

      <Paper
        elevation={0}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
          p: { xs: 3, md: 4 },
        }}>
        <Grid container spacing={3}>
          {metrics.map(metric => (
            <Grid key={metric.label} size={{ xs: 6, md: 12 / metrics.length }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 900,
                    color: 'primary.main',
                    lineHeight: 1.1,
                    mb: 0.5,
                    fontSize: { xs: '1.5rem', sm: '1.875rem' },
                    wordBreak: 'break-word',
                  }}>
                  {metric.value}
                </Typography>
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                  {metric.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  )
}

StoryImpactMetrics.displayName = 'StoryImpactMetrics'
