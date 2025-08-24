import React from 'react'
import { Check } from '@mui/icons-material'
import { Box } from '@mui/material'

/**
 * Custom square checkbox icons for Figma design consistency
 */
export const SquareCheckboxIcon: React.FC = () => (
  <Box
    sx={{
      width: 20,
      height: 20,
      borderRadius: '3px',
      border: '2px solid',
      borderColor: 'primary.main',
      backgroundColor: 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  />
)

export const SquareCheckedIcon: React.FC = () => (
  <Box
    sx={{
      width: 20,
      height: 20,
      borderRadius: '3px',
      border: '2px solid',
      borderColor: 'primary.main',
      backgroundColor: 'primary.main',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Check
      sx={{
        color: 'white',
        fontSize: '14px',
      }}
    />
  </Box>
)
