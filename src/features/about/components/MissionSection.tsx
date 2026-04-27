import React from 'react'
import { Card, CardContent, Container, Grid, Typography } from '@mui/material'
import { Section, SectionHeading } from '@/components/Layouts'
import { useI18n } from '@/hooks'
import { TRANSITION } from '@/theme'

const VALUE_KEYS = ['accessibility', 'community', 'practicality', 'innovation'] as const

export const MissionSection: React.FC = () => {
  const { t } = useI18n()

  return (
    <Section>
      <Container maxWidth="lg">
        <SectionHeading level={2} centered maxWidth="700px" subtitle={t('about.missionSection.subtitle')}>
          {t('about.missionSection.title')}
        </SectionHeading>

        <Grid container spacing={4} sx={{ mt: 2 }}>
          {VALUE_KEYS.map(key => (
            <Grid key={key} size={{ xs: 12, sm: 6, md: 3 }}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  p: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 3,
                  transition: `all ${TRANSITION.slow}`,
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}>
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                    {t(`about.missionSection.values.${key}.title`)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
                    {t(`about.missionSection.values.${key}.description`)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}

MissionSection.displayName = 'MissionSection'
