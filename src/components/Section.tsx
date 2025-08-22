import React from 'react'

import { Container, Box } from '@mui/material'
import type { ContainerProps } from '@mui/material/Container'

export type SectionProps = {
  /** Background color variant */
  variant?: 'default' | 'paper' | 'primary' | 'secondary'
  /** Additional padding multiplier (default: 1) */
  paddingScale?: number
  /** Whether to render as a semantic section element */
  component?: 'section' | 'div' | 'main' | 'article' | 'aside'
  /** Children content */
  children: React.ReactNode
} & Omit<ContainerProps, 'component'>

/**
 * Section component provides consistent spacing and layout for page sections.
 * Uses MUI Container with semantic HTML and consistent padding.
 */
export const Section: React.FC<SectionProps> = ({
  variant = 'default',
  paddingScale = 1,
  component = 'section',
  children,
  sx,
  ...containerProps
}) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'paper':
        return 'background.paper'
      case 'primary':
        return 'primary.main'
      case 'secondary':
        return 'secondary.main'
      default:
        return 'transparent'
    }
  }

  const getTextColor = () => {
    switch (variant) {
      case 'primary':
      case 'secondary':
        return 'white'
      default:
        return 'inherit'
    }
  }

  return (
    <Box
      component={component}
      sx={{
        backgroundColor: getBackgroundColor(),
        color: getTextColor(),
        py: theme => theme.spacing(8 * paddingScale),
        ...sx,
      }}
    >
      <Container {...containerProps}>{children}</Container>
    </Box>
  )
}
