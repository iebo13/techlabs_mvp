import React from 'react'
import { FormGroup, FormControlLabel, Checkbox, Typography } from '@mui/material'
import type { Track } from '@/types/home'

// Define TrackKey locally to avoid import issues
type TrackKey = 'web-dev' | 'data-science' | 'product-design' | 'ai'

type TrackChooserFormProps = {
  tracks: Track[]
  selectedTracks: TrackKey[]
  onTrackChange: (trackId: TrackKey, checked: boolean) => void
}

/**
 * TrackChooserForm - Renders the track selection form
 * Extracted from TrackChooser for better separation of concerns
 */
export const TrackChooserForm: React.FC<TrackChooserFormProps> = ({
  tracks,
  selectedTracks,
  onTrackChange,
}) => {
  return (
    <>
      <Typography
        variant="body2"
        textAlign="center"
        sx={{
          mb: { xs: 2.5, sm: 3 }, // 20px margin below
          fontSize: { xs: '0.875rem', sm: '1rem' }, // 14-16px
          color: 'text.secondary', // Muted gray
          fontWeight: 400,
        }}
      >
        Select the tracks that interest you most
      </Typography>

      <FormGroup
        role="group"
        aria-labelledby="track-chooser-heading"
        sx={{ gap: { xs: 3, sm: 4 } }} // 24-32px vertical spacing for better readability
      >
        {tracks.map((track: Track) => (
          <FormControlLabel
            key={track.id}
            control={
              <Checkbox
                checked={selectedTracks.includes(track.id)}
                onChange={event => onTrackChange(track.id, event.target.checked)}
                name={track.id}
                color="primary"
              />
            }
            label={
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', sm: '1.125rem' }, // 16-18px
                  fontWeight: 700, // Bold labels per Figma
                  ml: 1.5, // Increased space between checkbox and label
                }}
              >
                {track.label}
              </Typography>
            }
            sx={{
              alignItems: 'flex-start', // Left align consistently
              margin: 0,
              '& .MuiFormControlLabel-label': {
                width: '100%',
              },
            }}
          />
        ))}
      </FormGroup>
    </>
  )
}
