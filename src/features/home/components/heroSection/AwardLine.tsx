import React from 'react'
import { Box, Typography } from '@mui/material'
import { useI18n } from '@/hooks'

export const AwardLine: React.FC = () => {
  const { t } = useI18n()

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.5,
        flexWrap: 'wrap',
        py: { xs: 2, sm: 3 },
      }}>
      <Typography variant="body2" color="textPrimary" textAlign="center">
        {t('hero.award.winnerOf')}
      </Typography>
      <Box
        component="img"
        src="/img/partners/google.svg"
        alt="Google.org"
        sx={{
          height: { xs: 20, sm: 44 },
          width: 'auto',
          opacity: 0.9,
        }}
      />
      <Typography variant="body2" color="textPrimary" textAlign="center">
        {t('hero.award.impactChallenge')}
      </Typography>
    </Box>
  )
}
