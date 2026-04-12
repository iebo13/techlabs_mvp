import React from 'react'
import { Chip, Paper, Stack } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { SectionHeading } from '@/components/Layouts'
import { useI18n } from '@/hooks'

type CareerOutcomesProps = {
  readonly careerPaths: string[]
}

export const CareerOutcomes: React.FC<CareerOutcomesProps> = ({ careerPaths }) => {
  const { t } = useI18n()

  return (
    <Stack spacing={3}>
      <SectionHeading level={3} emphasis="primary" subtitle={t('tracks.detail.sections.outcomes.subtitle')}>
        {t('tracks.detail.sections.outcomes.title')}
      </SectionHeading>

      <Paper
        elevation={0}
        sx={theme => ({
          p: { xs: 3, md: 4 },
          borderRadius: 2,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.12)} 100%)`,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.22)}`,
        })}>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
          {careerPaths.map(path => (
            <Chip key={path} label={path} color="primary" sx={{ fontWeight: 600 }} />
          ))}
        </Stack>
      </Paper>
    </Stack>
  )
}

CareerOutcomes.displayName = 'CareerOutcomes'
