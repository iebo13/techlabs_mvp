import React from 'react'
import { Link } from 'react-router-dom'
import { Schedule as ClockIcon } from '@mui/icons-material'
import { Container, Button, Box } from '@mui/material'
import { Section } from '@/components/Layouts'
import { SectionHeading } from '@/components/Layouts'
import homeData from '@/mocks/home.json'
import { FeatureItem } from './ValuePropCard'

/**
 * WhyTechlabsSection component - showcases 3 key value propositions
 * MVP-09: Displays "Totally free", "Networking", "Job Ready" cards with CTA
 */
export const WhyTechlabsSection: React.FC = () => {
  return (
    <Section sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        {/* Section Heading */}
        <SectionHeading
          level={2}
          centered={true}
          sx={{
            mb: 5, // 40px spacing to features
            fontSize: { xs: '48px', md: '56px' },
            fontWeight: 800,
            color: '#FF2D6C', // Brand pink
            letterSpacing: '-0.02em', // Tight tracking
          }}
        >
          Why Techlabs?
        </SectionHeading>

        {/* Features Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: { xs: 5, md: '96px' }, // 72-96px between columns
            maxWidth: '1140px',
            mx: 'auto',
            mb: 4, // 32px to CTA
          }}
        >
          {homeData.features.map(feature => (
            <FeatureItem
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              body={feature.body}
            />
          ))}
        </Box>

        {/* Start Learning CTA */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1, // 8px spacing between button and note
          }}
        >
          <Button
            component={Link}
            to="/tracks"
            variant="contained"
            sx={{
              height: '48px', // Fixed height
              px: 3, // ~24px horizontal padding
              borderRadius: '8px', // Rectangular, not pill
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '1rem',
              bgcolor: '#FF2D6C', // Brand pink
              color: '#FFFFFF',
              '&:hover': {
                bgcolor: '#AF1740', // Darker pink on hover
              },
            }}
          >
            Start learning
          </Button>

          {/* Application Deadline Note */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              color: '#6B7280', // Medium grey
              fontSize: '12px',
            }}
          >
            {/* Clock Icon */}
            <ClockIcon sx={{ fontSize: '16px' }} />
            <Box>Application closes in 2 weeks for next batch</Box>
          </Box>
        </Box>
      </Container>
    </Section>
  )
}
