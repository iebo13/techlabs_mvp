import React from 'react'
import { HourglassEmpty } from '@mui/icons-material'
import { Box, Button, Typography, useTheme } from '@mui/material'

type TrackChooserActionsProps = {
  onStartLearning: () => void
}

/**
 * TrackChooserActions - Renders the action buttons and deadline info
 * Extracted from TrackChooser for better separation of concerns
 */
export const TrackChooserActions: React.FC<TrackChooserActionsProps> = ({ onStartLearning }) => {
  const theme = useTheme()

  return (
    <Box sx={{ textAlign: 'center', mt: 3 }}>
      <Button
        variant="contained"
        size="large"
        onClick={onStartLearning}
        sx={{
          height: 56, // 56px height
          px: { xs: 4, sm: 5 }, // Large and prominent
          fontSize: '1rem',
          fontWeight: 800, // Bold text
          borderRadius: '9999px', // Pill radius
          textTransform: 'none', // No ALL-CAPS
          boxShadow: 'none', // No elevation
          '&:hover': {
            boxShadow: 'none',
          },
          '&:focus-visible': {
            outline: `2px solid ${theme.palette.primary.main}`,
            outlineOffset: 2,
          },
        }}
      >
        Start learning
      </Button>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1.5, // 12px gap
          mt: 1.5, // 12px gap from button
        }}
      >
        <HourglassEmpty
          sx={{
            fontSize: '1rem',
            color: 'text.secondary',
          }}
        />
        <Typography
          variant="caption"
          sx={{
            fontSize: { xs: '0.75rem', sm: '0.8125rem' }, // 12-13px
            color: 'text.secondary', // Muted gray
            fontWeight: 400,
          }}
        >
          Application closes in 2 weeks for next batch
        </Typography>
      </Box>
    </Box>
  )
}
