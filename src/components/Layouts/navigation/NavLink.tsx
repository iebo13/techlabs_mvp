import React, { forwardRef } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Link, useTheme, useMediaQuery } from '@mui/material'
import type { LinkProps } from '@mui/material/Link'

export type NavLinkProps = {
  to: string
  external?: boolean
  showActive?: boolean
  children: React.ReactNode
  variant?: 'desktop' | 'mobile' | 'drawer'
} & Omit<LinkProps, 'component'>

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  (
    { to, external = false, showActive = true, children, variant = 'desktop', sx, ...linkProps },
    ref
  ) => {
    const location = useLocation()
    const theme = useTheme()

    const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'))

    const isActive = showActive && location.pathname === to

    const getResponsiveStyles = () => {
      const baseStyles = {
        color: isActive ? 'primary.main' : 'text.primary',
        textDecoration: 'none',
        fontWeight: isActive ? 700 : 600,
        position: 'relative' as const,
        transition: theme.transitions.create(['color', 'background-color', 'transform'], {
          duration: theme.transitions.duration.short,
        }),
        '&:hover': {
          color: 'primary.main',
          textDecoration: 'none',
          transform: 'scale(1.02)',
        },
        '&:focus-visible': {
          outline: `3px solid ${theme.palette.primary.main}40`,
          outlineOffset: 2,
          borderRadius: '4px',
        },
        '&:active': {
          transform: 'scale(0.98)',
        },
      }

      switch (variant) {
        case 'mobile':
          return {
            ...baseStyles,
            fontSize: {
              xs: '1.1rem',
              sm: '1.2rem',
            },
            fontWeight: isActive ? 700 : 600,
            px: {
              xs: 2,
              sm: 2.5,
            },
            py: {
              xs: 1.5,
              sm: 1.75,
            },
            minHeight: {
              xs: '48px',
              sm: '52px',
            },
            display: 'flex',
            alignItems: 'center',
            borderRadius: 2,
            '&:hover': {
              ...baseStyles['&:hover'],
              backgroundColor: 'action.hover',
            },
          }

        case 'drawer':
          return {
            ...baseStyles,
            fontSize: {
              xs: '1rem',
              sm: '1.1rem',
            },
            fontWeight: isActive ? 700 : 600,
            px: 0,
            py: 0,
            display: 'block',
            width: '100%',
            '&:hover': {
              ...baseStyles['&:hover'],
              transform: 'none',
            },
          }

        case 'desktop':
        default:
          return {
            ...baseStyles,
            fontSize: {
              md: '0.95rem',
              lg: '1rem',
              xl: '1.05rem',
            },
            px: {
              md: isTablet ? 1 : 1.5,
              lg: 2,
              xl: 2.5,
            },
            py: {
              md: 0.75,
              lg: 1,
            },
            minHeight: '44px',
            display: 'flex',
            alignItems: 'center',
            borderRadius: 1,
            '&:hover': {
              ...baseStyles['&:hover'],
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }
      }
    }

    const linkStyles = {
      ...getResponsiveStyles(),
      ...sx,
    }

    const accessibilityProps = {
      'aria-current': isActive ? ('page' as const) : undefined,
      'aria-label': external ? `${children} (opens in new tab)` : undefined,
    }

    if (external) {
      return (
        <Link
          ref={ref}
          href={to}
          target="_blank"
          rel="noopener noreferrer"
          sx={linkStyles}
          {...accessibilityProps}
          {...linkProps}
        >
          {children}
        </Link>
      )
    }

    return (
      <Link
        ref={ref}
        component={RouterLink}
        to={to}
        sx={linkStyles}
        {...linkProps}
        {...accessibilityProps}
      >
        {children}
      </Link>
    )
  }
)

NavLink.displayName = 'NavLink'
