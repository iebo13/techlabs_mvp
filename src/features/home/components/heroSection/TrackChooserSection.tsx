import React, { memo } from 'react'
import { HourglassEmpty } from '@mui/icons-material'
import { Box, Typography, Stack, FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import { CTAButton } from '@/components/Buttons/CtaButton'
import { SquareCheckboxIcon, SquareCheckedIcon } from '@/components/Buttons/SquareCheckbox'
import type { Track, TrackKey } from '@/features/tracks/types/tracks.type'

export type TrackChooserSectionProps = {
  tracks: Track[]
  selectedTracks: TrackKey[]
  onTrackChange: (trackId: TrackKey, checked: boolean) => void
  onStartLearning: () => void
}

export const TrackChooserSection: React.FC<TrackChooserSectionProps> = memo(
  ({ tracks, selectedTracks, onTrackChange, onStartLearning }) => {
    const formGroupStyles = {
      gap: { xs: 2.5, sm: 3 },
      width: '100%',
      maxWidth: 400,
      pl: 4,
    }

    const handleTrackChange =
      (trackId: TrackKey) => (event: React.ChangeEvent<HTMLInputElement>) => {
        onTrackChange(trackId, event.target.checked)
      }

    const handleStartLearningClick = () => {
      onStartLearning()
    }

    return (
      <Stack spacing={6} p={2} alignItems="center" sx={{ width: '100%' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h3" color="primary">
            Choose your Journey Now <br /> & Become a digital shaper of tomorrow
          </Typography>
        </Box>

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Stack sx={{ gap: 3 }}>
            <FormGroup role="group" aria-labelledby="track-chooser-heading" sx={formGroupStyles}>
              {tracks.map((track: Track) => (
                <FormControlLabel
                  key={track.id}
                  control={
                    <Checkbox
                      checked={selectedTracks.includes(track.id)}
                      onChange={handleTrackChange(track.id)}
                      name={track.id}
                      color="primary"
                      icon={<SquareCheckboxIcon />}
                      checkedIcon={<SquareCheckedIcon />}
                      size="medium"
                    />
                  }
                  label={
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: { xs: '1rem', sm: '1.125rem' },
                        fontWeight: 600,
                        ml: 1.5,
                      }}
                    >
                      {track.label}
                    </Typography>
                  }
                  sx={{
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    margin: 0,
                    width: '100%',
                    '& .MuiFormControlLabel-label': {
                      width: '100%',
                    },
                  }}
                />
              ))}
            </FormGroup>

            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <CTAButton
                variant="contained"
                size="large"
                onClick={handleStartLearningClick}
                disabled={selectedTracks.length === 0}
                ctaStyle="track-chooser"
                fullWidth
                additionalContent={{
                  icon: (
                    <HourglassEmpty
                      sx={{
                        fontSize: '1rem',
                        color: 'text.secondary',
                      }}
                    />
                  ),
                  text: 'Application closes in 2 weeks for next batch',
                }}
              >
                Start learning
              </CTAButton>
            </Box>
          </Stack>
        </Box>
      </Stack>
    )
  }
)

TrackChooserSection.displayName = 'TrackChooserSection'
