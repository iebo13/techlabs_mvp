import React from 'react'
import { Box, Typography } from '@mui/material'
import { useI18n } from '@/hooks'
import { CitySelector } from './CitySelector'
import { NavLink } from './NavLink'

type LogoProps = {
  compact?: boolean
}

export const Logo: React.FC<LogoProps> = ({ compact = false }) => {
  const { t } = useI18n()

  return (
    <Box sx={{ display: 'flex', gap: { xs: 0, md: 1 }, alignItems: 'center' }}>
      <NavLink
        to="/"
        showActive={false}
        sx={{
          display: 'flex',
          alignItems: 'center',
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}>
        <img
          src="/Logo.svg"
          alt={t('navigation.logoAlt')}
          style={{
            width: 32,
            height: 32,
          }}
        />
      </NavLink>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: compact ? 'flex-start' : 'center' }}>
        <NavLink
          to="/"
          showActive={false}
          sx={{
            p: 0,
            '&:hover': { backgroundColor: 'transparent' },
          }}>
          <Typography
            variant="h6"
            component="span"
            sx={{
              fontWeight: 800,
              fontSize: '1.5rem',
              color: 'primary.main',
            }}>
            TechLabs
          </Typography>
        </NavLink>
        {!compact && <CitySelector />}
      </Box>
    </Box>
  )
}

Logo.displayName = 'Logo'
