import React from 'react'
import { Grid, Paper, Stack, Typography } from '@mui/material'
import { SectionHeading } from '@/components/Layouts'
import { useI18n } from '@/hooks'
import type { TechStackItem } from '../types/tracks.types'
import { TechIcon } from './TechIcon'

type TechStackGridProps = {
  readonly items: TechStackItem[]
}

export const TechStackGrid: React.FC<TechStackGridProps> = ({ items }) => {
  const { t } = useI18n()

  return (
    <Stack spacing={3}>
      <SectionHeading level={3} emphasis="primary" subtitle={t('tracks.detail.sections.techStack.subtitle')}>
        {t('tracks.detail.sections.techStack.title')}
      </SectionHeading>

      <Grid container spacing={2}>
        {items.map(item => (
          <Grid size={{ xs: 6, sm: 4, md: 3 }} key={item.name}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                textAlign: 'center',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                transition: 'border-color 0.2s ease',
                '&:hover': { borderColor: 'primary.main' },
              }}>
              <TechIcon name={item.name} fallbackEmoji={item.icon} size={36} />
              <Typography variant="body2" fontWeight={600} sx={{ mt: 1 }}>
                {item.name}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Stack>
  )
}

TechStackGrid.displayName = 'TechStackGrid'
