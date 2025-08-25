import React, { forwardRef } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Link, useTheme } from '@mui/material'
import type { LinkProps } from '@mui/material/Link'

export type NavLinkProps = {
  /** Target route path */
  to: string
  /** Whether this is an external link */
  external?: boolean
  /** Whether to show active state based on current route */
  showActive?: boolean
  /** Children content */
  children: React.ReactNode
} & Omit<LinkProps, 'component'>

/**
 * NavLink component provides consistent navigation styling with active states.
 * Integrates with React Router for internal navigation and supports external links.
 */
export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ to, external = false, showActive = true, children, sx, ...linkProps }, ref) => {
    const location = useLocation()
    const theme = useTheme()

    const isActive = showActive && location.pathname === to

    const linkStyles = {
      color: isActive ? 'primary.main' : 'text.primary',
      textDecoration: 'none',
      fontWeight: isActive ? 700 : 600,
      fontSize: '1rem',
      px: 1.5,
      py: 0.5,
      borderRadius: '8px',
      transition: theme.transitions.create(['color'], {
        duration: theme.transitions.duration.short,
      }),
      '&:hover': {
        color: 'primary.main',
        textDecoration: 'none',
      },
      '&:focus-visible': {
        outline: `3px solid ${theme.palette.primary.main}25`,
        outlineOffset: 2,
      },
      ...sx,
    }

    if (external) {
      return (
        <Link
          ref={ref}
          href={to}
          target="_blank"
          rel="noopener noreferrer"
          sx={linkStyles}
          {...linkProps}
        >
          {children}
        </Link>
      )
    }

    return (
      <Link ref={ref} component={RouterLink} to={to} sx={linkStyles} {...linkProps}>
        {children}
      </Link>
    )
  }
)

NavLink.displayName = 'NavLink'
