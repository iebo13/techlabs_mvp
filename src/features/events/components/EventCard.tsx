import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import { Link } from 'react-router-dom'
import { AccessTime, LocationOn } from '@mui/icons-material'
import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material'
import { OptimizedImage } from '@/components/Layouts'
import { useI18n } from '@/hooks'

const EVENT_BACKGROUND_IMAGE = '/img/background.png'

export type Event = {
  id: string
  title: string
  blurb: string
  date: string
  location: string
  type: 'upcoming' | 'past'
  imageUrl: string
  href: string
}

type EventCardProps = {
  event: Event
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { t } = useI18n()
  const isUpcoming = event.type === 'upcoming'
  const dateDistance = formatDistanceToNow(new Date(event.date), { addSuffix: true })

  return (
    <Card
      component={Link}
      to={event.href}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme => theme.shadows[8],
        },
        '&:focus-visible': {
          outline: '2px solid',
          outlineColor: theme => theme.palette.primary.main,
          outlineOffset: '2px',
        },
      }}>
      <OptimizedImage
        src={event.imageUrl || EVENT_BACKGROUND_IMAGE}
        alt={t('events.card.eventImageAlt', { title: event.title })}
        width="100%"
        height="200px"
        sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 300px"
        lazy
        placeholder={EVENT_BACKGROUND_IMAGE}
        style={{
          borderTopLeftRadius: 'inherit',
          borderTopRightRadius: 'inherit',
        }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ mb: 2 }}>
          <Chip
            label={isUpcoming ? t('events.card.upcomingLabel') : t('events.card.pastLabel')}
            color={isUpcoming ? 'primary' : 'default'}
            size="small"
            sx={{ mb: 1 }}
          />
          <Typography
            variant="h6"
            component="h3"
            gutterBottom
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              lineHeight: 1.3,
            }}>
            {event.title}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1, lineHeight: 1.5 }}>
          {event.blurb}
        </Typography>

        <Stack spacing={1}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} aria-hidden="true" />
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
              {dateDistance}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} aria-hidden="true" />
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
              {event.location}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}
