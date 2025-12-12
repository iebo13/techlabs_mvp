import React from 'react'
import { Card, CardContent, Container, Grid, Typography } from '@mui/material'
import { Section, SectionHeading } from '@/components/Layouts'
import { useI18n } from '@/hooks'

export const MissionSection: React.FC = () => {
  const { t } = useI18n()

  const values = [
    {
      key: 'accessibility',
      title: t('about.missionSection.values.accessibility.title'),
      description: t('about.missionSection.values.accessibility.description'),
    },
    {
      key: 'community',
      title: t('about.missionSection.values.community.title'),
      description: t('about.missionSection.values.community.description'),
    },
    {
      key: 'practicality',
      title: t('about.missionSection.values.practicality.title'),
      description: t('about.missionSection.values.practicality.description'),
    },
    {
      key: 'innovation',
      title: t('about.missionSection.values.innovation.title'),
      description: t('about.missionSection.values.innovation.description'),
    },
  ]

  return (
    <>
      <Section variant="primary" paddingScale={1.5}>
        <Container maxWidth="lg">
          <SectionHeading level={1} centered emphasis="gradient" maxWidth="800px">
            {t('about.missionSection.title')}
          </SectionHeading>
          <Typography
            variant="h5"
            component="p"
            color="white"
            textAlign="center"
            sx={{ mt: 3, maxWidth: '700px', mx: 'auto', lineHeight: 1.4 }}>
            {t('about.missionSection.subtitle')}
          </Typography>
          <Typography
            variant="body1"
            color="white"
            textAlign="center"
            sx={{ mt: 3, maxWidth: '600px', mx: 'auto', opacity: 0.9, lineHeight: 1.6 }}>
            {t('about.missionSection.description')}
          </Typography>
        </Container>
      </Section>

      <Section>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {values.map(value => (
              <Grid key={value.key} size={{ xs: 12, sm: 6, md: 3 }}>
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    p: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 3,
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                      transition: 'all 0.3s ease',
                    },
                  }}>
                  <CardContent>
                    <Typography variant="h6" component="h2" gutterBottom fontWeight={600}>
                      {value.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>
    </>
  )
}
