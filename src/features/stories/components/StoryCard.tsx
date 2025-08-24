import React from 'react'
import {
  LocationOn as LocationIcon,
  Work as WorkIcon,
  School as SchoolIcon,
} from '@mui/icons-material'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import type { Story } from '@/types/home'

type StoryCardProps = {
  story: Story
  onClick: (story: Story) => void
}

/**
 * StoryCard component for individual story display
 */
export const StoryCard: React.FC<StoryCardProps> = ({ story, onClick }) => {
  const theme = useTheme()

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={story.id}>
      <Card
        sx={{
          height: '100%',
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme.shadows[8],
          },
        }}
        onClick={() => onClick(story)}
        role="button"
        tabIndex={0}
        onKeyDown={event => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onClick(story)
          }
        }}
        aria-label={`View details for ${story.title}`}
      >
        <CardMedia
          component="img"
          height="200"
          image={story.imageUrl}
          alt={`${story.title} - ${story.excerpt}`}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Stack spacing={2}>
            <Chip
              label={story.trackLabel}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ alignSelf: 'flex-start' }}
            />
            <Typography variant="h6" component="h3" gutterBottom>
              {story.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
              {story.excerpt}
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <LocationIcon fontSize="small" color="action" />
                <Typography variant="caption" color="text.secondary">
                  {story.location}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <WorkIcon fontSize="small" color="action" />
                <Typography variant="caption" color="text.secondary">
                  {story.currentRole}
                </Typography>
              </Box>
            </Stack>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <SchoolIcon fontSize="small" color="action" />
              <Typography variant="caption" color="text.secondary">
                Graduated {story.graduationDate}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  )
}
