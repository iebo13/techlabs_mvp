import React from 'react'
import { Check } from '@mui/icons-material'
import { Box } from '@mui/material'

const CHECKBOX_BASE_STYLES = {
  width: 24,
  height: 24,
  borderRadius: '3px',
  border: '2px solid',
  borderColor: 'primary.main',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  flexShrink: 0,
} as const

export const SquareCheckboxIcon: React.FC = () => (
  <Box
    sx={{
      ...CHECKBOX_BASE_STYLES,
      backgroundColor: 'transparent',
    }}
  />
)

export const SquareCheckedIcon: React.FC = () => (
  <Box
    sx={{
      ...CHECKBOX_BASE_STYLES,
      backgroundColor: 'primary.main',
    }}>
    <Check
      sx={{
        color: 'white',
        fontSize: '14px',
      }}
    />
  </Box>
)
