import React from 'react'
import { Box, Typography, Container } from '@mui/material'

export type NumbersBandProps = {
  numbers: Array<{
    label: string
    value: string
  }>
  title?: string
  subtitle?: string
}

export const NumbersBand: React.FC<NumbersBandProps> = ({
  numbers,
  title = 'Techlabs in Numbers',
  subtitle,
}) => {
  const formatLabel = (label: string): string => {
    return label
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 10 },
        bgcolor: 'background.default',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 3, md: 4 },
        }}
      >
        <Typography variant="h2" component="h2" color="primary.main" padding={4}>
          {title}
        </Typography>

        {subtitle && (
          <Typography
            variant="subtitle1"
            component="p"
            color="text.secondary"
            textAlign="center"
            sx={{ mb: 2 }}
          >
            {subtitle}
          </Typography>
        )}

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: { xs: 6, md: 12 },
            flexWrap: { xs: 'wrap', md: 'nowrap' },
          }}
        >
          {numbers.map(metric => (
            <Box
              key={metric.label}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                minWidth: { xs: '100px', md: '120px' },
              }}
            >
              <Typography
                variant="h1"
                component="div"
                sx={{
                  fontSize: { xs: '4.5rem', md: '5.5rem' },
                  fontWeight: 900,
                  lineHeight: 1.05,
                  color: 'primary.main',
                  mb: { xs: 1, md: 1.5 },
                  letterSpacing: 0,
                }}
              >
                {metric.value}
              </Typography>

              <Typography
                variant="body1"
                component="div"
                sx={{
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                  fontWeight: 600,
                  color: 'primary.main',
                  letterSpacing: 0,
                }}
              >
                {formatLabel(metric.label)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
