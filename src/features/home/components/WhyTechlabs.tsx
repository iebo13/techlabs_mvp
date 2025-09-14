import React from 'react'
import { HourglassEmpty } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { CTAButton } from '@/components'
import { Section } from '@/components/Layouts'
import { APPLICATION_CONFIG } from '@/config/application'
import homeData from '@/mocks/home.json'
import { formatDeadlineText } from '@/utils/date'
import { ValuePropCard } from './ValuePropCard'

export const WhyTechlabs: React.FC = () => {
  return (
    <Section sx={{ py: { xs: 4, md: 6 } }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}>
        <Typography variant="h2" color="primary" textAlign="center" pb={6}>
          Why Techlabs ?
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            px: 6,
            pb: 2,
            width: '100%',
          }}>
          {homeData.features.map(feature => (
            <ValuePropCard key={feature.title} icon={feature.icon} title={feature.title} body={feature.body} />
          ))}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CTAButton
            variant="contained"
            size="large"
            to="/tracks"
            fullWidth
            sx={{ borderRadius: '16px' }}
            additionalContent={{
              icon: <HourglassEmpty />,
              text: formatDeadlineText(APPLICATION_CONFIG.deadline),
            }}>
            Start learning
          </CTAButton>
        </Box>
      </Box>
    </Section>
  )
}
