import React from 'react'
import { Box, Card, CardContent, Chip, Grid, Typography, useTheme } from '@mui/material'
import { OptimizedImage } from '@/components/Layouts'
import { useI18n } from '@/hooks'
import type { StoryCardProps } from '../types/stories.types'

export const StoryCard: React.FC<StoryCardProps> = ({ story, onClick }) => {
  const theme = useTheme()
  const { t } = useI18n()
  const storyImage = '/img/background.png'

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={story.id}>
      <Box
        component="button"
        onClick={() => onClick(story)}
        aria-label={t('common:stories.card.viewDetails', { title: story.title })}
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
        }}>
        <Card
          sx={{
            height: '100%',
            transition: 'all 0.2s ease-in-out',
            borderRadius: 0.5,
            boxShadow: '8px 12px 12px rgba(44, 42, 42, 0.3)',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: theme.shadows[8],
            },
          }}>
          {/* Image container with overlaying tag */}
          <Box sx={{ position: 'relative' }}>
            <OptimizedImage
              src={storyImage}
              alt={`${story.title} - ${story.excerpt}`}
              width="100%"
              height="180px"
              sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 400px"
              lazy
              placeholder="/img/stories/person2.png"
            />
            <Chip
              label={story.trackLabel}
              size="small"
              sx={{
                position: 'absolute',
                top: 12,
                left: 12,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                fontWeight: 500,
                borderRadius: 1,
              }}
            />
          </Box>

          <CardContent sx={{ pt: 2, pb: 2.5 }}>
            {/* Title */}
            <Typography
              variant="subtitle1"
              component="h2"
              sx={{
                fontWeight: 600,
                mb: 0.5,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
              {story.title}
            </Typography>

            {/* Date and Category */}
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
              {story.graduationDate}
              <Box component="span" sx={{ mx: 1 }}>
                •
              </Box>
              {story.trackLabel}
            </Typography>

            {/* Description */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                lineHeight: 1.6,
              }}>
              {story.excerpt}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  )
}
