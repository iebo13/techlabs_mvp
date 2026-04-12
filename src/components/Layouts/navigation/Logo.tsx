import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import { useI18n } from '@/hooks'
import { CitySelector } from './CitySelector'
import { NavLink } from './NavLink'

export const Logo: React.FC = () => {
  const { t } = useI18n()
  const navigate = useNavigate()

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
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography
          variant="h6"
          component="div"
          onClick={() => navigate('/')}
          sx={{
            fontWeight: 800,
            fontSize: '1.5rem',
            color: 'primary.main',
            cursor: 'pointer',
          }}>
          TechLabs
        </Typography>
        <CitySelector />
      </Box>
    </Box>
  )
}
