import React from 'react'
import { Box } from '@mui/material'

type VisuallyHiddenProps = {
  /** Content to be hidden visually but available to screen readers */
  children: React.ReactNode
  /** HTML element to render as */
  component?: React.ElementType
}

/**
 * VisuallyHidden - Hides content visually while keeping it accessible to screen readers
 * Use for accessible labels, skip links, and form instructions
 *
 * @example
 * <VisuallyHidden>This text is only for screen readers</VisuallyHidden>
 */
export const VisuallyHidden: React.FC<VisuallyHiddenProps> = ({ children, component = 'span' }) => (
  <Box
    component={component}
    sx={{
      position: 'absolute',
      width: '1px',
      height: '1px',
      padding: 0,
      margin: '-1px',
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      border: 0,
    }}>
    {children}
  </Box>
)
