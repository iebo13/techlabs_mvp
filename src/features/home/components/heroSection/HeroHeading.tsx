import React from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { Box, Typography, useMediaQuery } from '@mui/material'
import { theme } from '@/theme'

export const HeroHeading: React.FC = () => {
  const { t } = useTranslation('components')
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box sx={{ width: '100%', mx: 'auto' }}>
      <Typography
        variant={isMobile ? 'h1' : 'h2'}
        id="hero-heading"
        component={isMobile ? 'h1' : 'h2'}
        color="text.primary"
        sx={{
          pb: 2,
          px: isMobile ? 2 : 0,
          fontSize: isMobile ? '4.5rem' : '4rem',
          textAlign: isMobile ? 'start' : 'center',
          '& .emphasis': {
            color: 'primary.main',
            fontWeight: 'inherit',
          },
        }}
      >
        <Trans
          i18nKey="hero.title"
          ns="components"
          components={{
            tech: <span className="emphasis" />
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
        }}
      >
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
