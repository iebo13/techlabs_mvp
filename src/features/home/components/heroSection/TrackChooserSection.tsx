import React from 'react'
import { HourglassEmpty } from '@mui/icons-material'
import { Box, Typography, Stack, FormGroup, FormControlLabel, Checkbox, useMediaQuery } from '@mui/material'
import { CTAButton, SquareCheckboxIcon, SquareCheckedIcon } from '@/components/Buttons'
import { APPLICATION_CONFIG } from '@/config/application'
import type { Track, TrackKey } from '@/features/tracks'
import { theme } from '@/theme'
import { formatDeadlineText } from '@/utils/date'

export type TrackChooserSectionProps = {
  tracks: Track[]
  selectedTracks: TrackKey[]
  onTrackChange: (trackId: TrackKey, checked: boolean) => void
  onStartLearning: () => void
}

export const TrackChooserSection: React.FC<TrackChooserSectionProps> = ({
  tracks,
  selectedTracks,
  onTrackChange,
  onStartLearning,
}) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const formGroupStyles = {
    gap: { xs: 2.5, sm: 3 },
    width: isMobile ? '100%' : '400px',
    maxWidth: 400,
    pl: isMobile ? 0 : 12,
  }

  const handleTrackChange = (trackId: TrackKey) => (event: React.ChangeEvent<HTMLInputElement>) => {
    onTrackChange(trackId, event.target.checked)
  }

  const handleStartLearningClick = () => {
    onStartLearning()
  }

  return (
    <Stack spacing={6} p={2} sx={{ width: isMobile ? '100%' : 'auto' }}>
      <Box>
        <Typography
          variant="h3"
          color="primary"
          fontSize={isMobile ? '24px' : '40px'}
          textAlign={isMobile ? 'start' : 'center'}>
          Choose your Journey Now
        </Typography>
        {!isMobile && (
          <Typography variant="h3" color="primary">
            & Become a digital shaper of tomorrow
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: isMobile ? 'start' : 'center',
        }}>
        <Stack sx={{ gap: 3, width: isMobile ? '100%' : '400px' }}>
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
                    }}>
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

          <Box sx={{ textAlign: 'center', mt: 3, width: isMobile ? '100%' : '400px' }}>
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
                text: formatDeadlineText(APPLICATION_CONFIG.deadline),
              }}>
              Start learning
            </CTAButton>
          </Box>
        </Stack>
      </Box>
    </Stack>
  )
}

TrackChooserSection.displayName = 'TrackChooserSection'
