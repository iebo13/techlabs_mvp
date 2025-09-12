import React from 'react'
import { Box } from '@mui/material'

/**
 * SkipToContent - Accessibility component for keyboard navigation
 * Provides a hidden link that becomes visible on focus, allowing users to skip navigation
 * and go directly to the main content area
 */
export const SkipToContent: React.FC = () => {
  const handleClick = () => {
    const mainContent = document.getElementById('main-content')

    if (mainContent) {
      mainContent.focus()
      mainContent.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Box
      component="a"
      href="#main-content"
      onClick={handleClick}
      sx={{
        position: 'absolute',
        top: '-40px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        padding: '8px 16px',
        borderRadius: '4px',
        textDecoration: 'none',
        fontSize: '14px',
        fontWeight: 600,
        zIndex: 9999,
        transition: 'top 0.3s ease',
        '&:focus': {
          top: '16px',
          outline: '2px solid',
          outlineColor: 'primary.main',
          outlineOffset: '2px',
        },
        '&:hover': {
          backgroundColor: 'primary.dark',
        },
      }}
    >
      Skip to main content
    </Box>
  )
}
