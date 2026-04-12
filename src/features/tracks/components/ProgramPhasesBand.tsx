import React from 'react'
import { Container, Grid, Paper, Stack, Typography } from '@mui/material'
import { Section, SectionHeading } from '@/components/Layouts'
import { useI18n } from '@/hooks'

const PHASE_KEYS = ['application', 'foundation', 'project', 'career'] as const

export const ProgramPhasesBand: React.FC = () => {
  const { t } = useI18n()

  return (
    <Section variant="paper" sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <SectionHeading
          level={2}
          emphasis="primary"
          centered
          subtitle={t('tracks.overview.programPhases.subtitle')}
          sx={{ mb: 4 }}>
          {t('tracks.overview.programPhases.title')}
        </SectionHeading>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {PHASE_KEYS.map((key, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={key}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                }}>
                <Stack spacing={1.5}>
                  <Typography variant="overline" color="primary.main" sx={{ fontWeight: 700, letterSpacing: 1 }}>
                    {`0${index + 1}`}
                  </Typography>
                  <Typography variant="subtitle1" component="h3" fontWeight={700}>
                    {t(`about.programSection.phases.${key}.title`)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {t(`about.programSection.phases.${key}.duration`)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {t(`about.programSection.phases.${key}.description`)}
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}

ProgramPhasesBand.displayName = 'ProgramPhasesBand'
