import React from 'react'
import { Assignment, Build, RocketLaunch, School } from '@mui/icons-material'
import { Box, Card, CardContent, Chip, Container, Grid, Typography } from '@mui/material'
import { Section, SectionHeading } from '@/components/Layouts'

type ProgramData = {
  title: string
  description: string
  phases: Array<{
    title: string
    description: string
    duration: string
    icon: string
  }>
}

export const ProgramSection: React.FC<{ data: ProgramData }> = ({ data }) => {
  const getPhaseIcon = (iconName: string) => {
    switch (iconName) {
      case 'Assignment':
        return <Assignment />
      case 'School':
        return <School />
      case 'Build':
        return <Build />
      case 'RocketLaunch':
        return <RocketLaunch />
      default:
        return <Assignment />
    }
  }

  return (
    <Section variant="paper">
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

        <Grid container spacing={4}>
          {data.phases.map(phase => (
            <Grid
              key={phase.title.toLowerCase().replaceAll(/\s+/g, '-')}
              size={{ xs: 12, sm: 6, md: 3 }}
            >
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  p: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 3,
                  position: 'relative',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                    transition: 'all 0.3s ease',
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mb: 2,
                      color: 'primary.main',
                      fontSize: '2.5rem',
                    }}
                  >
                    {getPhaseIcon(phase.icon)}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                    {phase.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" lineHeight={1.6} mb={2}>
                    {phase.description}
                  </Typography>
                  <Chip label={phase.duration} color="primary" variant="outlined" size="small" />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
