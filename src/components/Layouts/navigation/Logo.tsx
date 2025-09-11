import React from 'react'
import { Typography } from '@mui/material'
import { NavLink } from './NavLink'

export const Logo: React.FC = () => {
  return (
    <NavLink
      to="/"
      showActive={false}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        padding: '8px 0',
        '&:hover': {
          backgroundColor: 'transparent',
        },
      }}
    >
      <img
        src="/Logo.svg"
        alt="TechLabs Logo"
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
        }}
      >
        TechLabs
      </Typography>
    </NavLink>
  )
}
