import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Box, Button, Card, CardContent, Divider, Stack, Typography } from '@mui/material'
import { useI18n } from '@/hooks'
import { STICKY_TOP } from '@/theme'
import type { DetailedTrack } from '../types/tracks.types'

type TrackDetailSidebarProps = {
  readonly track: DetailedTrack
}

type InfoRowProps = {
  readonly label: string
  readonly value: string
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => (
  <Box>
    <Typography variant="overline" color="primary.main" sx={{ fontWeight: 700, display: 'block', lineHeight: 1.4 }}>
      {label}
    </Typography>
    <Typography variant="body2" fontWeight={600}>
      {value}
    </Typography>
  </Box>
)

export const TrackDetailSidebar: React.FC<TrackDetailSidebarProps> = ({ track }) => {
  const { t, formatDate } = useI18n()

  return (
    <Box sx={{ position: { md: 'sticky' }, top: { md: STICKY_TOP.sidebar } }}>
      <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ height: 6, bgcolor: 'primary.main' }} />

        <CardContent sx={{ p: 3 }}>
          <Stack spacing={2}>
            <InfoRow label={t('tracks.detail.sidebar.duration')} value={track.duration} />
            <InfoRow label={t('tracks.detail.sidebar.format')} value={track.format} />
            <InfoRow label={t('tracks.detail.sidebar.nextCohort')} value={track.nextCohort} />
            <InfoRow label={t('tracks.detail.sidebar.deadline')} value={formatDate(track.applicationDeadline)} />
            <InfoRow
              label={t('tracks.detail.sidebar.spotsHeading')}
              value={t('tracks.card.spotsLeft', { count: track.spotsAvailable })}
            />

            <Divider />

            <Button
              component={RouterLink}
              to={`/apply?track=${track.id}`}
              variant="contained"
              fullWidth
              sx={{ borderRadius: '28px', textTransform: 'none', fontWeight: 700 }}>
              {t('tracks.detail.sidebar.applyCta', { track: track.label })}
            </Button>
            <Button
              component={RouterLink}
              to="/about#contact"
              variant="outlined"
              fullWidth
              sx={{ borderRadius: '28px', textTransform: 'none', fontWeight: 600 }}>
              {t('tracks.detail.sidebar.talkCta')}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}

TrackDetailSidebar.displayName = 'TrackDetailSidebar'
