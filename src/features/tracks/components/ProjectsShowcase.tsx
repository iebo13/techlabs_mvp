import React from 'react'
import { Card, CardContent, Chip, Grid, Stack, Typography, useTheme } from '@mui/material'
import { SectionHeading } from '@/components/Layouts'
import { useI18n } from '@/hooks'
import { RADIUS, SHADOW, TRANSITION } from '@/theme'
import type { ProjectShowcase } from '../types/tracks.types'

type ProjectsShowcaseProps = {
  readonly projects: ProjectShowcase[]
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({ projects }) => {
  const theme = useTheme()
  const { t } = useI18n()

  return (
    <Stack spacing={3}>
      <SectionHeading level={3} emphasis="primary" subtitle={t('tracks.detail.sections.projects.subtitle')}>
        {t('tracks.detail.sections.projects.title')}
      </SectionHeading>

      <Grid container spacing={3}>
        {projects.map(project => (
          <Grid size={{ xs: 12, md: 4 }} key={project.title}>
            <Card
              sx={{
                height: '100%',
                transition: `all ${TRANSITION.normal}`,
                borderRadius: RADIUS.md,
                boxShadow: SHADOW.cardBrand,
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8],
                },
              }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle1" component="h3" fontWeight={700} sx={{ mb: 1 }}>
                  {project.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, mb: 2 }}>
                  {project.description}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 0.75 }}>
                  {project.skills.map(skill => (
                    <Chip key={skill} label={skill} size="small" variant="outlined" color="primary" />
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  )
}

ProjectsShowcase.displayName = 'ProjectsShowcase'
