import type { SxProps, Theme } from '@mui/material'

/**
 * Style utilities for consistent design patterns across components
 * Provides reusable mixins and utility functions for common styling needs
 */

// Focus outline utilities
export const createFocusOutline = (
  color: string = 'primary.main',
  width: number = 2,
  offset: number = 2
): SxProps<Theme> => ({
  '&:focus-visible': {
    outline: `${width}px solid`,
    outlineColor: color,
    outlineOffset: offset,
  },
})

// Hover and focus combined patterns
export const interactiveFocus = (
  hoverColor: string = 'primary.dark',
  focusColor: string = 'primary.main'
): SxProps<Theme> => ({
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: hoverColor,
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: focusColor,
    outlineOffset: 2,
  },
})

// Button focus patterns
export const buttonFocusStyles: SxProps<Theme> = {
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'primary.main',
    outlineOffset: 2,
  },
}

// Screen reader only utility
export const srOnly: SxProps<Theme> = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
}

// Accessible overlay styles
export const createOverlayStyles = (opacity: number = 0.3): SxProps<Theme> => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  bgcolor: `rgba(0, 0, 0, ${opacity})`,
  transition: 'background-color 0.2s ease-in-out',
  '&:hover': {
    bgcolor: `rgba(0, 0, 0, ${Math.min(opacity + 0.1, 0.7)})`,
  },
})



// Responsive text truncation
export const createTextTruncation = (lines: number = 1): SxProps<Theme> =>
  lines === 1
    ? {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }
    : {
      display: '-webkit-box',
      WebkitLineClamp: lines,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    }
