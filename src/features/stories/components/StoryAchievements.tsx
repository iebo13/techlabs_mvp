import React from 'react'
import { CheckCircle as CheckIcon } from '@mui/icons-material'
import { Box, Paper, Typography } from '@mui/material'
import { SectionHeading } from '@/components/Layouts'
import { useI18n } from '@/hooks'

type StoryAchievementsProps = {
  readonly achievements: readonly string[]
}

export const StoryAchievements: React.FC<StoryAchievementsProps> = ({ achievements }) => {
  const { t } = useI18n()

  return (
    <Box>
      <SectionHeading level={3} sx={{ mb: 2.5 }}>
        {t('common:stories.detail.keyAchievements')}
      </SectionHeading>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {achievements.map(achievement => (
          <Paper
            key={achievement}
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 2,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              transition: 'border-color 0.2s',
              '&:hover': { borderColor: 'primary.light' },
            }}>
            <CheckIcon sx={{ color: 'primary.main', flexShrink: 0 }} />
            <Typography variant="body1" fontWeight={500} sx={{ minWidth: 0, wordBreak: 'break-word' }}>
              {achievement}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  )
}

StoryAchievements.displayName = 'StoryAchievements'
