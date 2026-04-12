import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Card, CardContent, Chip, Grid, Typography, useTheme } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { OptimizedImage } from '@/components/Layouts'
import { useI18n } from '@/hooks'
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
        sx={{
          display: 'block',
          textDecoration: 'none',
          color: 'inherit',
          height: '100%',
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: 'primary.main',
            outlineOffset: '3px',
            borderRadius: 1,
          },
        }}>
        <Card
          sx={{
            height: '100%',
            transition: 'all 0.22s ease-in-out',
            borderRadius: 0.5,
            boxShadow: '8px 12px 12px rgba(44, 42, 42, 0.3)',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: theme.shadows[8],
            },
          }}>
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
                height="180px"
                sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 400px"
                lazy
              />
            ) : (
              <Box
                sx={{
                  height: 180,
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
                position: 'absolute',
                top: 12,
                left: 12,
                fontWeight: 500,
                borderRadius: 1,
                bgcolor: isLowCapacity ? theme.palette.warning.main : theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
              }}
            />
          </Box>

          <CardContent sx={{ pt: 2, pb: 2.5 }}>
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
              {track.label}
            </Typography>

            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
              {t('tracks.card.durationFormat', { duration: track.duration, format: track.format })}
            </Typography>

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
              {track.description}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  )
}

TrackCard.displayName = 'TrackCard'
