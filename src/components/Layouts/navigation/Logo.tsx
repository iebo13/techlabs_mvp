import React from 'react'
import { Typography } from '@mui/material'
import { useI18n } from '@/hooks'
import { NavLink } from './NavLink'

export const Logo: React.FC = () => {
  const { t } = useI18n()

  return (
    <NavLink
      to="/"
      showActive={false}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        p: { xs: 2, md: 0 },
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
      <Typography
        variant="h6"
        component="div"
        sx={{
          fontWeight: 800,
          fontSize: '1.5rem',
          color: 'primary.main',
          letterSpacing: '-0.02em',
        }}>
        TechLabs
      </Typography>
    </NavLink>
  )
}
