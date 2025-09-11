import React from 'react'
import { FormGroup, FormControlLabel, Checkbox, Typography } from '@mui/material'
import type { Track, TrackKey } from '@/features/tracks/types/tracks.type'

type TrackChooserFormProps = {
  tracks: Track[]
  selectedTracks: TrackKey[]
  onTrackChange: (trackId: TrackKey, checked: boolean) => void
}

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
          mb: { xs: 2.5, sm: 3 },
          fontSize: { xs: '0.875rem', sm: '1rem' },
          color: 'text.secondary',
          fontWeight: 400,
        }}
      >
        Select the tracks that interest you most
      </Typography>

      <FormGroup
        role="group"
        aria-labelledby="track-chooser-heading"
        sx={{ gap: { xs: 3, sm: 4 } }}
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
                  fontSize: { xs: '1rem', sm: '1.125rem' },
                  fontWeight: 700,
                  ml: 1.5,
                }}
              >
                {track.label}
              </Typography>
            }
            sx={{
              alignItems: 'flex-start',
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
