import React from 'react'
import { Link } from 'react-router-dom'
import { Button, type ButtonProps } from '@mui/material'

type CTAButtonProps = Omit<ButtonProps, 'component'> & {
  to?: string
  href?: string
  variant?: 'contained' | 'outlined' | 'text'
  size?: 'small' | 'medium' | 'large'
  children: React.ReactNode
}

/**
 * CTAButton - Reusable call-to-action button component
 * Supports internal routing (to), external links (href), and regular button behavior
 * Follows MUI design system with consistent styling and accessibility
 */
export const CTAButton: React.FC<CTAButtonProps> = ({
  to,
  href,
  variant = 'contained',
  size = 'large',
  children,
  sx,
  ...buttonProps
}) => {
  // Default styling for CTA buttons
  const defaultSx = {
    borderRadius: '28px', // Pill shape
    px: 4, // Horizontal padding
    py: 1.5, // Vertical padding
    fontWeight: 600,
    textTransform: 'none' as const,
    boxShadow: variant === 'contained' ? 2 : 'none',
    '&:hover': {
      boxShadow: variant === 'contained' ? 4 : 'none',
    },
  }

  const combinedSx = { ...defaultSx, ...sx }

  // Internal routing - use React Router Link
  if (to) {
    return (
      <Link to={to} style={{ textDecoration: 'none' }}>
        <Button variant={variant} size={size} sx={combinedSx} component="span" {...buttonProps}>
          {children}
        </Button>
      </Link>
    )
  }

  // External link - use anchor tag
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
        <Button variant={variant} size={size} sx={combinedSx} component="span" {...buttonProps}>
          {children}
        </Button>
      </a>
    )
  }

  // Regular button
  return (
    <Button variant={variant} size={size} sx={combinedSx} {...buttonProps}>
      {children}
    </Button>
  )
}
