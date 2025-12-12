import React from 'react'
import { Link } from 'react-router-dom'
import { Button, type ButtonProps, Box, Typography, useTheme, type SxProps, type Theme } from '@mui/material'

type CTAButtonStyle = 'default' | 'track-chooser'

type AdditionalContent = {
  icon?: React.ReactNode
  text?: string
  textVariant?: 'caption' | 'body2'
}

type CTAButtonProps = {
  to?: string
  href?: string
  variant?: 'contained' | 'outlined' | 'text'
  size?: 'small' | 'medium' | 'large'
  children: React.ReactNode
  ctaStyle?: CTAButtonStyle
  fullWidth?: boolean
  additionalContent?: AdditionalContent
  'aria-label'?: string
  sx?: SxProps<Theme>
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  color?: ButtonProps['color']
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
  'aria-label': ariaLabel,
  onClick,
  disabled,
  color,
}) => {
  const theme = useTheme()

  const getButtonStyles = () => {
    const baseStyles = {
      textTransform: 'none' as const,
      '&:focus-visible': {
        outline: `2px solid ${theme.palette.primary.main}`,
        outlineOffset: 2,
      },
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
        aria-hidden="true">
        {additionalContent.icon && additionalContent.icon}
        {additionalContent.text && (
          <Typography
            variant={additionalContent.textVariant || 'caption'}
            sx={{
              fontSize: { xs: '0.75rem', sm: '0.8125rem' },
              color: 'text.secondary',
              fontWeight: 400,
            }}>
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

  // Use Button with Link component for internal navigation (accessible pattern)
  if (to) {
    const buttonElement = (
      <Button
        component={Link}
        to={to}
        variant={variant}
        size={size}
        color={color}
        sx={combinedSx}
        aria-label={ariaLabel}>
        {children}
      </Button>
    )

    return renderButton(buttonElement)
  }

  // Use Button with 'a' component for external links
  if (href) {
    const buttonElement = (
      <Button
        component="a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        variant={variant}
        size={size}
        color={color}
        sx={combinedSx}
        aria-label={ariaLabel ? `${ariaLabel} (opens in new tab)` : undefined}>
        {children}
      </Button>
    )

    return renderButton(buttonElement)
  }

  const buttonElement = (
    <Button
      variant={variant}
      size={size}
      color={color}
      disabled={disabled}
      sx={combinedSx}
      aria-label={ariaLabel}
      onClick={onClick}>
      {children}
    </Button>
  )

  return renderButton(buttonElement)
}
