import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Card, CardContent, Chip, Grid, Typography, useTheme } from '@mui/material'
import { OptimizedImage } from '@/components/Layouts'
import { useI18n } from '@/hooks'
import { createLinkCardWrapper, createLinkCard, CHIP_OVERLAY, CARD_TITLE, CARD_DESCRIPTION } from '@/theme'
import type { StoryCardProps } from '../types/stories.types'
import { PORTRAIT_IMAGE_OBJECT_POSITION } from '../utils/portraitObjectPosition'

export const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  const theme = useTheme()
  const { t } = useI18n()

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Box
        component={Link}
        to={`/stories/${story.id}`}
        aria-label={t('common:stories.card.viewDetails', { title: story.title })}
        sx={createLinkCardWrapper(theme)}>
        <Card sx={createLinkCard(theme)}>
          {/* Image with track badge overlay */}
          <Box sx={{ position: 'relative' }}>
            <OptimizedImage
              src={story.imageUrl}
              alt={`${story.title} - ${story.excerpt}`}
              width="100%"
              height="220px"
              objectPosition={PORTRAIT_IMAGE_OBJECT_POSITION}
              sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 400px"
              lazy
              placeholder="/img/background.png"
            />
            <Chip
              label={story.trackLabel}
              size="small"
              sx={{
                ...CHIP_OVERLAY,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                fontWeight: 500,
                borderRadius: 1,
              }}
            />
          </Box>

          <CardContent sx={{ pt: 2, pb: 2.5 }}>
            <Typography variant="subtitle1" component="h2" sx={CARD_TITLE}>
              {story.title}
            </Typography>

            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
              {story.graduationDate}
              <Box component="span" sx={{ mx: 1 }}>
                •
              </Box>
              {story.trackLabel}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={CARD_DESCRIPTION}>
              {story.excerpt}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  )
}

StoryCard.displayName = 'StoryCard'
