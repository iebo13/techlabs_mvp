import React from 'react'
import {
  Close as CloseIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  School as SchoolIcon,
} from '@mui/icons-material'
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import type { Story } from '../types/stories.types'

type StoryModalProps = {
  story: Story | null
  onClose: () => void
  isMobile: boolean
}

export const StoryModal: React.FC<StoryModalProps> = ({ story, onClose, isMobile }) => {
  if (!story) return null

  return (
    <Dialog
      open={!!story}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      aria-labelledby="story-dialog-title"
    >
      <DialogTitle
        id="story-dialog-title"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 2,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            {story.title}
          </Typography>
          <Chip label={story.trackLabel} color="primary" variant="outlined" sx={{ mb: 1 }} />
        </Box>
        <IconButton onClick={onClose} aria-label="Close story details" sx={{ flexShrink: 0 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3}>
          <Box
            sx={{
              width: '100%',
              height: { xs: 200, sm: 300 },
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <img
              src={story.imageUrl}
              alt={`${story.title} - Success story`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>

          <Typography variant="body1" paragraph>
            {story.fullDescription}
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <LocationIcon color="primary" />
                <Typography variant="subtitle2" color="text.secondary">
                  Location
                </Typography>
              </Box>
              <Typography variant="body1">{story.location}</Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <WorkIcon color="primary" />
                <Typography variant="subtitle2" color="text.secondary">
                  Current Role
                </Typography>
              </Box>
              <Typography variant="body1">{story.currentRole}</Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <SchoolIcon color="primary" />
                <Typography variant="subtitle2" color="text.secondary">
                  Graduation Date
                </Typography>
              </Box>
              <Typography variant="body1">{story.graduationDate}</Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <WorkIcon color="primary" />
                <Typography variant="subtitle2" color="text.secondary">
                  Company
                </Typography>
              </Box>
              <Typography variant="body1">{story.company}</Typography>
            </Grid>
          </Grid>

          <Box>
            <Typography variant="h6" gutterBottom>
              Key Achievements
            </Typography>
            <Stack spacing={1}>
              {story.achievements.map(achievement => (
                <Box
                  key={`achievement-${story.id}-${achievement}`}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    p: 1.5,
                    bgcolor: 'action.hover',
                    borderRadius: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      flexShrink: 0,
                    }}
                  />
                  <Typography variant="body2">{achievement}</Typography>
                </Box>
              ))}
            </Stack>
          </Box>

          <Box sx={{ textAlign: 'center', pt: 2 }}>
            <Button variant="contained" size="large" onClick={onClose} sx={{ px: 4 }}>
              Close
            </Button>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
