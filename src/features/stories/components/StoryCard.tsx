import React from 'react'
import {
  LocationOn as LocationIcon,
  Work as WorkIcon,
  School as SchoolIcon,
} from '@mui/icons-material'
import { Box, Card, CardContent, Chip, Grid, Stack, Typography, useTheme } from '@mui/material'
import { OptimizedImage } from '@/components/Layouts'
import type { StoryCardProps } from '../types/stories.types'

export const StoryCard: React.FC<StoryCardProps> = ({ story, onClick }) => {
  const theme = useTheme()

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={story.id}>
      <Box
        component="button"
        onClick={() => onClick(story)}
        aria-label={`View details for ${story.title}`}
        sx={{
          border: 'none',
          background: 'none',
          padding: 0,
          cursor: 'pointer',
          textAlign: 'left',
          width: '100%',
          height: '100%',
          display: 'block',

          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: 'primary.main',
            outlineOffset: '2px',
          },
        }}
      >
        <Card
          sx={{
            height: '100%',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: theme.shadows[8],
            },
            'button:hover &': {
              transform: 'translateY(-4px)',
              boxShadow: theme.shadows[8],
            },
          }}
        >
          <OptimizedImage
            src={story.imageUrl}
            alt={`${story.title} - ${story.excerpt}`}
            width="100%"
            height="200"
            sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 400px"
            lazy
            style={{
              borderTopLeftRadius: 'inherit',
              borderTopRightRadius: 'inherit',
            }}
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
      </Box>
    </Grid>
  )
}
