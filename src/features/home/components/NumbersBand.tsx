import React from 'react'
import { Box, Typography, Container } from '@mui/material'
import { Section } from '@/components'

type NumbersBandProps = {
  numbers: Array<{
    label: string
    value: string
  }>
  title?: string
}

export const NumbersBand: React.FC<NumbersBandProps> = ({ numbers, title = 'Techlabs in Numbers' }) => {
  const formatLabel = (label: string): string => {
    return label
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }

  return (
    <Section sx={{ py: { xs: 6, md: 8 } }}>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 3, md: 4 },
        }}>
        <Typography variant="h2" color="primary.main" textAlign="center" pb={4}>
          {title}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-evenly',
            alignItems: 'center',
            width: '100%',
            gap: 3,
          }}>
          {numbers.map(metric => (
            <Box
              key={metric.label}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}>
              <Typography variant="h2" color="primary.main" fontWeight={600}>
                {metric.value}
              </Typography>

              <Typography variant="h6" color="primary.main" fontWeight={600}>
                {formatLabel(metric.label)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Section>
  )
}
