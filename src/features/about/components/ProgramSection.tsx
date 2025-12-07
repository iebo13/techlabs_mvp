import React from 'react'
import { Assignment, Build, RocketLaunch, School } from '@mui/icons-material'
import { Box, Card, CardContent, Chip, Container, Grid, Typography } from '@mui/material'
import { Section, SectionHeading } from '@/components/Layouts'
import { useI18n } from '@/hooks'

export const ProgramSection: React.FC = () => {
  const { t } = useI18n()

  const phases = [
    {
      key: 'application',
      icon: <Assignment />,
      title: t('about.programSection.phases.application.title'),
      description: t('about.programSection.phases.application.description'),
      duration: t('about.programSection.phases.application.duration'),
    },
    {
      key: 'foundation',
      icon: <School />,
      title: t('about.programSection.phases.foundation.title'),
      description: t('about.programSection.phases.foundation.description'),
      duration: t('about.programSection.phases.foundation.duration'),
    },
    {
      key: 'project',
      icon: <Build />,
      title: t('about.programSection.phases.project.title'),
      description: t('about.programSection.phases.project.description'),
      duration: t('about.programSection.phases.project.duration'),
    },
    {
      key: 'career',
      icon: <RocketLaunch />,
      title: t('about.programSection.phases.career.title'),
      description: t('about.programSection.phases.career.description'),
      duration: t('about.programSection.phases.career.duration'),
    },
  ]

  return (
    <Section variant="paper">
      <Container maxWidth="lg">
        <SectionHeading level={2} centered maxWidth="700px">
          {t('about.programSection.title')}
        </SectionHeading>
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          sx={{ mt: 3, maxWidth: '600px', mx: 'auto', mb: 6 }}>
          {t('about.programSection.description')}
        </Typography>

        <Grid container spacing={4}>
          {phases.map(phase => (
            <Grid key={phase.key} size={{ xs: 12, sm: 6, md: 3 }}>
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
                }}>
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mb: 2,
                      color: 'primary.main',
                      fontSize: '2.5rem',
                    }}>
                    {phase.icon}
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
