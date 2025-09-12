import React from 'react'
import { Link } from 'react-router-dom'
import { Button, type ButtonProps, Box, Typography, useTheme } from '@mui/material'

type CTAButtonStyle = 'default' | 'track-chooser'

type AdditionalContent = {
  icon?: React.ReactNode
  text?: string
  textVariant?: 'caption' | 'body2'
}

type CTAButtonProps = Omit<ButtonProps, 'component'> & {
  to?: string
  href?: string
  variant?: 'contained' | 'outlined' | 'text'
  size?: 'small' | 'medium' | 'large'
  children: React.ReactNode
  ctaStyle?: CTAButtonStyle
  fullWidth?: boolean
  additionalContent?: AdditionalContent
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  to,
  href,
  variant = 'contained',
  size = 'large',
  children,
  sx,
  ctaStyle = 'default',
  fullWidth = false,
  additionalContent,
  ...buttonProps
}) => {
  const theme = useTheme()

  const getButtonStyles = () => {
    const baseStyles = {
      textTransform: 'none' as const,
    }

    if (ctaStyle === 'track-chooser') {
      return {
        ...baseStyles,
        height: 60,
        minWidth: 140,
        width: fullWidth ? '100%' : undefined,
        px: 2,
        fontSize: '1rem',
        fontWeight: 800,
        borderRadius: '16px',
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
        '&:focus-visible': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: 2,
        },
        '&:disabled': {
          opacity: 0.5,
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
        },
      }
    }

    return {
      ...baseStyles,
      borderRadius: '28px',
      px: 4,
      py: 1.5,
      fontWeight: 600,
      boxShadow: variant === 'contained' ? 2 : 'none',
      width: fullWidth ? '100%' : undefined,
      '&:hover': {
        boxShadow: variant === 'contained' ? 4 : 'none',
      },
    }
  }

  const combinedSx = { ...getButtonStyles(), ...sx }

  const renderAdditionalContent = () => {
    if (!additionalContent) return null

    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1.5,
          mt: 1,
        }}
      >
        {additionalContent.icon && additionalContent.icon}
        {additionalContent.text && (
          <Typography
            variant={additionalContent.textVariant || 'caption'}
            sx={{
              fontSize: { xs: '0.75rem', sm: '0.8125rem' },
              color: 'text.secondary',
              fontWeight: 400,
            }}
          >
            {additionalContent.text}
          </Typography>
        )}
      </Box>
    )
  }

  const renderButton = (buttonElement: React.ReactNode) => {
    if (additionalContent) {
      return (
        <Box sx={{ textAlign: 'center' }}>
          {buttonElement}
          {renderAdditionalContent()}
        </Box>
      )
    }

    return buttonElement
  }

  if (to) {
    const buttonElement = (
      <Link to={to} style={{ textDecoration: 'none' }}>
        <Button variant={variant} size={size} sx={combinedSx} component="span" {...buttonProps}>
          {children}
        </Button>
      </Link>
    )

    return renderButton(buttonElement)
  }

  if (href) {
    const buttonElement = (
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
        <Button variant={variant} size={size} sx={combinedSx} component="span" {...buttonProps}>
          {children}
        </Button>
      </a>
    )

    return renderButton(buttonElement)
  }

  const buttonElement = (
    <Button variant={variant} size={size} sx={combinedSx} {...buttonProps}>
      {children}
    </Button>
  )

  return renderButton(buttonElement)
}
