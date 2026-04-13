import React from 'react'
import { Trans } from 'react-i18next'
import { Box, Typography } from '@mui/material'
import { useI18n } from '@/hooks'

export const HeroHeading: React.FC = () => {
  const { t } = useI18n()

  return (
    <Box sx={{ width: '100%', mx: 'auto' }}>
      <Typography
        variant="h1"
        id="hero-heading"
        component="h1"
        color="text.primary"
        sx={{
          pb: 2,
          px: { xs: 2, md: 0 },
          fontSize: { xs: '2.5rem', md: '4rem' },
          textAlign: { xs: 'start', md: 'center' },
          '& .emphasis': {
            color: 'primary.main',
            fontWeight: 'inherit',
          },
        }}>
        <Trans
          i18nKey="hero.title"
          ns="common"
          components={{
            tech: <Box component="span" sx={{ display: 'inline', color: 'primary.main' }} />,
          }}
        />
      </Typography>

      <Typography
        variant="body1"
        component="p"
        color="text.primary"
        sx={{
          fontSize: '14px',
          fontWeight: 500,
          lineHeight: 1.5,
          '& .separator': {
            color: 'text.primary',
            mx: 0.5,
            fontSize: '0.8em',
            userSelect: 'none',
          },
        }}>
        {t('hero.subtitle.blended')}
        <Box component="span" className="separator">
          ·
        </Box>
        {t('hero.subtitle.community')}
        <Box component="span" className="separator">
          ·
        </Box>
        {t('hero.subtitle.projects')}
      </Typography>
    </Box>
  )
}

HeroHeading.displayName = 'HeroHeading'
