import React from 'react'
import { Box } from '@mui/material'

export type SectionProps = {
  variant?: 'default' | 'paper' | 'primary' | 'secondary'
  paddingScale?: number
  component?: 'section' | 'div' | 'main' | 'article' | 'aside'
  children: React.ReactNode
  sx?: React.ComponentProps<typeof Box>['sx']
}

export const Section: React.FC<SectionProps> = ({
  variant = 'default',
  paddingScale = 1,
  component = 'section',
  children,
  sx,
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
      {children}
    </Box>
  )
}
