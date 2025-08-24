import React from 'react'
import { Box, Chip, Container, Paper, Stack, Typography } from '@mui/material'
import { Section } from '@/components/Layouts/Section'
import { SectionHeading } from '@/components/Layouts/SectionHeading'

type TimelineData = {
  title: string
  description: string
  milestones: Array<{
    year: string
    title: string
    description: string
  }>
}

/**
 * Timeline section component with milestones
 */
export const TimelineSection: React.FC<{ data: TimelineData }> = ({ data }) => (
  <Section>
    <Container maxWidth="lg">
      <SectionHeading level={2} centered maxWidth="700px">
        {data.title}
      </SectionHeading>
      <Typography
        variant="body1"
        color="text.secondary"
        textAlign="center"
        sx={{ mt: 3, maxWidth: '600px', mx: 'auto', mb: 6 }}
      >
        {data.description}
      </Typography>

      <Box sx={{ position: 'relative' }}>
        {/* Timeline line */}
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '2px',
            backgroundColor: 'primary.main',
            transform: 'translateX(-50%)',
            display: { xs: 'none', md: 'block' },
          }}
        />

        <Stack spacing={4}>
          {data.milestones.map((milestone, index) => (
            <Box
              key={`${milestone.year}-${milestone.title.toLowerCase().replace(/\s+/g, '-')}`}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { xs: 'flex-start', md: 'center' },
                position: 'relative',
              }}
            >
              {/* Timeline dot */}
              <Box
                sx={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: 'primary.main',
                  border: '4px solid white',
                  boxShadow: 2,
                  position: { xs: 'static', md: 'absolute' },
                  left: { xs: 'auto', md: '50%' },
                  transform: { xs: 'none', md: 'translateX(-50%)' },
                  mb: { xs: 2, md: 0 },
                }}
              />

              {/* Content */}
              <Box
                sx={{
                  flex: 1,
                  textAlign: { xs: 'left', md: index % 2 === 0 ? 'right' : 'left' },
                  pr: { xs: 0, md: index % 2 === 0 ? 4 : 0 },
                  pl: { xs: 0, md: index % 2 === 0 ? 0 : 4 },
                  order: { xs: 1, md: index % 2 === 0 ? 0 : 1 },
                }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    p: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 3,
                    maxWidth: '400px',
                    mx: { xs: 'auto', md: 0 },
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 3,
                      transition: 'all 0.3s ease',
                    },
                  }}
                >
                  <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                    {milestone.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
                    {milestone.description}
                  </Typography>
                  <Chip label={milestone.year} color="primary" size="small" sx={{ mt: 2 }} />
                </Paper>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
    </Container>
  </Section>
)
