import React from 'react'
import { Typography, Box } from '@mui/material'
import type { TypographyProps } from '@mui/material/Typography'

export type SectionHeadingProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  emphasis?: 'primary' | 'secondary' | 'gradient'
  subtitle?: string
  centered?: boolean
  maxWidth?: string | number
  children: React.ReactNode
} & Omit<TypographyProps, 'variant'>

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  level = 2,
  emphasis,
  subtitle,
  centered = false,
  maxWidth = '600px',
  children,
  sx,
  ...typographyProps
}) => {
  const getVariant = (): TypographyProps['variant'] => {
    switch (level) {
      case 1:
        return 'h1'
      case 2:
        return 'h2'
      case 3:
        return 'h3'
      case 4:
        return 'h4'
      case 5:
        return 'h5'
      case 6:
        return 'h6'
      default:
        return 'h2'
    }
  }

  const getEmphasisStyles = () => {
    switch (emphasis) {
      case 'primary':
        return {
          color: 'primary.main',
        }
      case 'secondary':
        return {
          color: 'secondary.main',
        }
      case 'gradient':
        return {
          background: 'linear-gradient(45deg, #ff3366 0%, #6c5ce7 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }
      default:
        return {}
    }
  }

  const containerStyles = {
    textAlign: centered ? 'center' : 'inherit',
    maxWidth: centered ? maxWidth : 'none',
    mx: centered ? 'auto' : 0,
  }

  return (
    <Box sx={containerStyles}>
      <Typography
        component={`h${level}` as React.ElementType}
        variant={getVariant()}
        sx={{
          ...getEmphasisStyles(),
          ...sx,
        }}
        {...typographyProps}>
        {children}
      </Typography>
      {subtitle && (
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2, pb: 4, fontSize: '1.125rem', lineHeight: 1.6 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  )
}
