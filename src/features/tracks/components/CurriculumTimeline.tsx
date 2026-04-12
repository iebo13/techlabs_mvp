import React from 'react'
import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, Stack, Typography } from '@mui/material'
import { SectionHeading } from '@/components/Layouts'
import { useI18n } from '@/hooks'
import type { CurriculumPhase } from '../types/tracks.types'

type CurriculumTimelineProps = {
  readonly phases: CurriculumPhase[]
}

export const CurriculumTimeline: React.FC<CurriculumTimelineProps> = ({ phases }) => {
  const { t } = useI18n()

  return (
    <Stack spacing={3}>
      <SectionHeading level={3} emphasis="primary" subtitle={t('tracks.detail.sections.curriculum.subtitle')}>
        {t('tracks.detail.sections.curriculum.title')}
      </SectionHeading>

      <Stack spacing={1.5}>
        {phases.map((phase, index) => (
          <Accordion
            key={phase.title}
            disableGutters
            elevation={0}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              '&:before': { display: 'none' },
              '&.Mui-expanded': { borderColor: 'primary.main' },
            }}>
            <AccordionSummary expandIcon={<ExpandMore />} sx={{ px: 2.5, py: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}>
                  {index + 1}
                </Box>
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography variant="subtitle1" fontWeight={700}>
                    {phase.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {phase.duration}
                  </Typography>
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 2.5, pb: 2.5, pt: 0 }}>
              <Box component="ul" sx={{ pl: 3, m: 0 }}>
                {phase.outcomes.map(outcome => (
                  <Typography
                    key={outcome}
                    component="li"
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.7, mb: 0.5 }}>
                    {outcome}
                  </Typography>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </Stack>
  )
}

CurriculumTimeline.displayName = 'CurriculumTimeline'
