import React from 'react'
import { Box, Typography } from '@mui/material'
import { SectionHeading } from '@/components/Layouts/SectionHeading'

/**
 * TrackChooserHeader - Renders the header section of the track chooser
 * Extracted from TrackChooser for better separation of concerns
 */
export const TrackChooserHeader: React.FC = () => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <SectionHeading
        level={2}
        centered
        id="track-chooser-heading"
        sx={{
          fontSize: { xs: '2.5rem', md: '3rem' }, // 40-48px
          fontWeight: 900, // Extra-bold
          lineHeight: 1.1, // Tight line-height
          mb: 1,
        }}
      >
        Choose your Journey Now
      </SectionHeading>
      <Typography
        variant="h3"
        sx={{
          fontSize: { xs: '1.5rem', md: '1.875rem' },
          fontWeight: 900,
          color: 'primary.main', // Pink color
          lineHeight: 1.1,
        }}
      >
        & Become a digital shaper of tomorrow
      </Typography>
    </Box>
  )
}
