import React from 'react'

import { HourglassEmpty } from '@mui/icons-material'
import {
  Box,
  Typography,
  Stack,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  useTheme,
} from '@mui/material'

import { SquareCheckboxIcon, SquareCheckedIcon } from '@/components/Buttons/SquareCheckbox'

import type { Track } from '@/types/home'

// Define TrackKey locally to avoid import issues
type TrackKey = 'web-dev' | 'data-science' | 'product-design' | 'ai'

export type TrackChooserSectionProps = {
  tracks: Track[]
  selectedTracks: TrackKey[]
  onTrackChange: (trackId: TrackKey, checked: boolean) => void
  onStartLearning: () => void
}

/**
 * TrackChooserSection component - track selection with CTA button
 */
export const TrackChooserSection: React.FC<TrackChooserSectionProps> = ({
  tracks,
  selectedTracks,
  onTrackChange,
  onStartLearning,
}) => {
  const theme = useTheme()

  return (
    <Stack spacing={6} alignItems="center" sx={{ width: '100%' }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h3" color="primary">
          Choose your Journey Now <br /> & Become a digital shaper of tomorrow
        </Typography>
      </Box>

      <Box
        sx={{
          maxWidth: 880,
          width: '100%',
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Stack spacing={3}>
          <Typography
            variant="body2"
            textAlign="center"
            sx={{
              mb: { xs: 2.5, sm: 3 },
              fontSize: '0.875rem',
              color: 'text.secondary',
              fontWeight: 400,
            }}
          >
            Select the tracks that interest you most
          </Typography>

          <FormGroup
            role="group"
            aria-labelledby="track-chooser-heading"
            sx={{
              gap: { xs: 2.5, sm: 3 },
              width: '100%',
              maxWidth: 400,
            }}
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
            <Button
              variant="contained"
              size="large"
              onClick={onStartLearning}
              disabled={selectedTracks.length === 0}
              sx={{
                height: 60,
                minWidth: 140,
                width: '100%',
                px: 2,
                fontSize: '1rem',
                fontWeight: 800,
                borderRadius: 1,
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none',
                },
                '&:focus-visible': {
                  outline: `2px solid ${theme.palette.primary.main}`,
                  outlineOffset: 2,
                },
                '&:disabled': {
                  backgroundColor: theme.palette.action.disabled,
                  color: theme.palette.action.disabled,
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
                gap: 1.5,
                mt: 1,
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
                  fontSize: { xs: '0.75rem', sm: '0.8125rem' },
                  color: 'text.secondary',
                  fontWeight: 400,
                }}
              >
                Application closes in 2 weeks for next batch
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Box>
    </Stack>
  )
}
