import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Card, CardContent, Chip, Grid, Typography, useTheme } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { OptimizedImage } from '@/components/Layouts'
import { useI18n } from '@/hooks'
import { createLinkCardWrapper, createLinkCard, CHIP_OVERLAY, CARD_TITLE, CARD_DESCRIPTION } from '@/theme'
import type { TrackCardProps } from '../types/tracks.types'

export const TrackCard: React.FC<TrackCardProps> = ({ track }) => {
  const theme = useTheme()
  const { t } = useI18n()
  const isLowCapacity = track.spotsAvailable < 10
  const chipLabel = isLowCapacity
    ? t('tracks.card.spotsLeft', { count: track.spotsAvailable })
    : t('tracks.card.applicationOpen')

  return (
    <Grid size={{ xs: 12, sm: 6 }}>
      <Box
        component={Link}
        to={`/tracks/${track.id}`}
        aria-label={t('tracks.card.viewDetails', { title: track.label })}
        sx={createLinkCardWrapper(theme)}>
        <Card sx={createLinkCard(theme)}>
          <Box
            sx={{
              position: 'relative',
              overflow: 'hidden',
              borderTopLeftRadius: 'inherit',
              borderTopRightRadius: 'inherit',
            }}>
            {track.imageUrl ? (
              <OptimizedImage
                src={track.imageUrl}
                alt={track.label}
                width="100%"
                height="220px"
                sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 400px"
                lazy
              />
            ) : (
              <Box
                sx={{
                  height: 220,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.12)} 0%, ${alpha(theme.palette.primary.main, 0.28)} 100%)`,
                }}>
                <Typography component="span" aria-hidden="true" sx={{ fontSize: '4rem', lineHeight: 1 }}>
                  {track.icon}
                </Typography>
              </Box>
            )}
            <Chip
              label={chipLabel}
              size="small"
              sx={{
                ...CHIP_OVERLAY,
                fontWeight: 500,
                borderRadius: 1,
                bgcolor: isLowCapacity ? theme.palette.warning.main : theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
              }}
            />
          </Box>

          <CardContent sx={{ pt: 2, pb: 2.5 }}>
            <Typography variant="subtitle1" component="h2" sx={CARD_TITLE}>
              {track.label}
            </Typography>

            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
              {t('tracks.card.durationFormat', { duration: track.duration, format: track.format })}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={CARD_DESCRIPTION}>
              {track.description}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  )
}

TrackCard.displayName = 'TrackCard'
