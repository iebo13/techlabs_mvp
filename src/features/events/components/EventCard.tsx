import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import { Link } from 'react-router-dom'
import { Box, Card, CardContent, Chip, Grid, Typography, useTheme } from '@mui/material'
import { OptimizedImage } from '@/components/Layouts'
import { useI18n } from '@/hooks'
import { createLinkCardWrapper, createLinkCard, CHIP_OVERLAY, CARD_TITLE, CARD_DESCRIPTION } from '@/theme'
import type { EventCardProps } from '../types/events.types'

const EVENT_BACKGROUND_IMAGE = '/img/background.png'

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const theme = useTheme()
  const { t } = useI18n()
  const isUpcoming = event.type === 'upcoming'
  const dateDistance = formatDistanceToNow(new Date(event.date), { addSuffix: true })

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Box
        component={Link}
        to={event.href}
        aria-label={t('events.card.viewDetails', { title: event.title })}
        sx={createLinkCardWrapper(theme)}>
        <Card sx={createLinkCard(theme)}>
          <Box sx={{ position: 'relative' }}>
            <OptimizedImage
              src={event.imageUrl || EVENT_BACKGROUND_IMAGE}
              alt={t('events.card.eventImageAlt', { title: event.title })}
              width="100%"
              height="220px"
              sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 400px"
              lazy
              placeholder={EVENT_BACKGROUND_IMAGE}
              style={{
                borderTopLeftRadius: 'inherit',
              }}
            />
            <Chip
              label={isUpcoming ? t('events.card.upcomingLabel') : t('events.card.pastLabel')}
              size="small"
              sx={{
                ...CHIP_OVERLAY,
                fontWeight: 500,
                borderRadius: 1,
                ...(isUpcoming
                  ? { backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }
                  : { backgroundColor: theme.palette.grey[600], color: theme.palette.common.white }),
              }}
            />
          </Box>

          <CardContent sx={{ pt: 2, pb: 2.5 }}>
            <Typography variant="subtitle1" component="h2" sx={CARD_TITLE}>
              {event.title}
            </Typography>

            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
              {dateDistance}
              <Box component="span" sx={{ mx: 1 }}>
                ·
              </Box>
              {event.location}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={CARD_DESCRIPTION}>
              {event.blurb}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  )
}

EventCard.displayName = 'EventCard'
