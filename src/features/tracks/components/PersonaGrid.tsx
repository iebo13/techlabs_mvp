import React from 'react'
import { Grid, Paper, Stack, Typography } from '@mui/material'
import { SectionHeading } from '@/components/Layouts'
import { useI18n } from '@/hooks'
import type { Persona } from '../types/tracks.types'

type PersonaGridProps = {
  readonly personas: Persona[]
}

export const PersonaGrid: React.FC<PersonaGridProps> = ({ personas }) => {
  const { t } = useI18n()

  return (
    <Stack spacing={3}>
      <SectionHeading level={3} emphasis="primary" subtitle={t('tracks.detail.sections.persona.subtitle')}>
        {t('tracks.detail.sections.persona.title')}
      </SectionHeading>

      <Grid container spacing={2}>
        {personas.map(persona => (
          <Grid size={{ xs: 12, sm: 6 }} key={persona.title}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                height: '100%',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
              }}>
              <Stack spacing={1}>
                <Typography component="span" aria-hidden="true" sx={{ fontSize: '1.75rem', lineHeight: 1 }}>
                  {persona.icon}
                </Typography>
                <Typography variant="subtitle1" fontWeight={700}>
                  {persona.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  {persona.body}
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Stack>
  )
}

PersonaGrid.displayName = 'PersonaGrid'
