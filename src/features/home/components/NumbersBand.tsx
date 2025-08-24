import React from 'react'

import { Grid, Box } from '@mui/material'

import { Section } from '@/components/Layouts/Section'
import { SectionHeading } from '@/components/Layouts/SectionHeading'

import { KPIStat } from './KpiStat'

export type NumbersBandProps = {
  /** Array of metric data to display */
  numbers: Array<{
    label: string
    value: string
  }>
  /** Optional section title */
  title?: string
  /** Optional section subtitle */
  subtitle?: string
}

/**
 * NumbersBand component displays key metrics in a responsive grid layout.
 * Used for showing impact numbers like cities, graduates, and mentors.
 */
export const NumbersBand: React.FC<NumbersBandProps> = ({
  numbers,
  title = 'Our Impact',
  subtitle = 'Join thousands of learners building their future',
}) => {
  // Map labels to appropriate icons (using simple text icons to avoid MUI import issues)
  const getIconForLabel = (label: string) => {
    const lowerLabel = label.toLowerCase()
    if (lowerLabel.includes('cities') || lowerLabel.includes('city')) {
      return <span style={{ fontSize: '2rem' }}>🏙️</span>
    }
    if (lowerLabel.includes('graduates') || lowerLabel.includes('graduate')) {
      return <span style={{ fontSize: '2rem' }}>🎓</span>
    }
    if (lowerLabel.includes('mentors') || lowerLabel.includes('mentor')) {
      return <span style={{ fontSize: '2rem' }}>👥</span>
    }
    return undefined
  }

  return (
    <Section variant="paper" paddingScale={1}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <SectionHeading level={2} centered maxWidth="600px" sx={{ mb: 2 }}>
          {title}
        </SectionHeading>
        {subtitle && (
          <SectionHeading
            level={3}
            centered
            maxWidth="500px"
            sx={{
              fontSize: '1.25rem',
              fontWeight: 400,
              color: 'text.secondary',
            }}
          >
            {subtitle}
          </SectionHeading>
        )}
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {numbers.map(metric => (
          <Grid key={metric.label} size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: 'flex' }}>
            <KPIStat
              value={metric.value}
              label={metric.label}
              icon={getIconForLabel(metric.label)}
              emphasized={metric.label === 'Graduates'} // Emphasize the Graduates metric
              sx={{ width: '100%' }}
            />
          </Grid>
        ))}
      </Grid>
    </Section>
  )
}
