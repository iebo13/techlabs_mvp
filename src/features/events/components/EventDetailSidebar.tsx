import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import { useI18n } from '@/hooks'
import { STICKY_TOP } from '@/theme'
import type { Event } from '../types/events.types'

type EventDetailSidebarProps = {
  readonly event: Event
}

export const EventDetailSidebar: React.FC<EventDetailSidebarProps> = ({ event }) => {
  const { t, formatDate } = useI18n()
  const isUpcoming = event.type === 'upcoming'
  const dateLine = formatDate(event.date, { hour: 'numeric', minute: '2-digit' })

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        position: { md: 'sticky' },
        top: { md: STICKY_TOP.sidebar },
      }}>
      <Stack spacing={2}>
        <Box>
          <Typography variant="overline" color="primary.main" sx={{ fontWeight: 700 }}>
            {t('events.detail.dateTime')}
          </Typography>
          <Typography variant="body1" color="text.primary" sx={{ fontWeight: 600 }}>
            {dateLine}
          </Typography>
        </Box>

        <Box>
          <Typography variant="overline" color="primary.main" sx={{ fontWeight: 700 }}>
            {t('events.detail.location')}
          </Typography>
          <Typography variant="body1" color="text.primary">
            {event.location}
          </Typography>
        </Box>

        {event.externalUrl && (
          <Button
            component="a"
            href={event.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            fullWidth
            sx={{ borderRadius: '28px', textTransform: 'none', fontWeight: 700 }}>
            {isUpcoming ? t('events.detail.register') : t('events.detail.learnMore')}
          </Button>
        )}

        <Box>
          <Typography variant="subtitle2" color="primary.main" sx={{ mb: 0.5 }}>
            {t('events.detail.questions')}
          </Typography>
          <Button
            component={RouterLink}
            to="/about#contact"
            variant="outlined"
            fullWidth
            sx={{ borderRadius: '28px', textTransform: 'none', fontWeight: 600 }}>
            {t('events.detail.contactUs')}
          </Button>
        </Box>
      </Stack>
    </Paper>
  )
}

EventDetailSidebar.displayName = 'EventDetailSidebar'
