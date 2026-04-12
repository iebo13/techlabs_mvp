import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'
import { Box, Chip, IconButton, Stack, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { useI18n } from '@/hooks'
import type { DetailedTrack } from '../types/tracks.types'

type TrackDetailHeroProps = {
  readonly track: DetailedTrack
}

export const TrackDetailHero: React.FC<TrackDetailHeroProps> = ({ track }) => {
  const navigate = useNavigate()
  const { t } = useI18n()
  const sep = t('tracks.detail.metaSeparator')

  return (
    <Box
      component="header"
      sx={theme => ({
        position: 'relative',
        bgcolor: theme.palette.secondary.dark,
        minHeight: { xs: 320, md: 420 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden',
      })}>
      {track.imageUrl && (
        <Box
          component="img"
          src={track.imageUrl}
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}

      <Box
        aria-hidden="true"
        sx={theme => ({
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: `linear-gradient(to top, ${alpha(theme.palette.common.black, 0.92)} 0%, ${alpha(theme.palette.common.black, 0.5)} 45%, ${alpha(theme.palette.common.black, 0.35)} 100%)`,
        })}
      />

      <Box
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          right: 16,
          zIndex: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 2,
        }}>
        <IconButton
          onClick={() => navigate('/tracks')}
          aria-label={t('tracks.detail.backToTracks')}
          sx={theme => ({
            color: theme.palette.common.white,
            bgcolor: alpha(theme.palette.common.white, 0.12),
            backdropFilter: 'blur(8px)',
            '&:hover': { bgcolor: alpha(theme.palette.common.white, 0.22) },
          })}>
          <ArrowBackIcon />
        </IconButton>
        <Chip
          label={t('tracks.detail.applicationOpen')}
          sx={{ fontWeight: 700, fontSize: '0.75rem', bgcolor: 'primary.main', color: 'primary.contrastText' }}
        />
      </Box>

      <Box sx={{ position: 'relative', zIndex: 2, p: { xs: 3, md: 6 }, pt: { xs: 10, md: 10 } }}>
        <Typography
          component="h1"
          sx={theme => ({
            color: theme.palette.common.white,
            fontWeight: 900,
            lineHeight: 1.1,
            mb: 1.5,
            fontSize: { xs: '1.75rem', sm: '2.25rem', md: 'clamp(2rem, 5vw, 3rem)' },
            letterSpacing: '-0.01em',
            wordBreak: 'break-word',
          })}>
          {track.label}
        </Typography>

        <Typography
          variant="h6"
          sx={theme => ({
            color: alpha(theme.palette.common.white, 0.88),
            fontWeight: 500,
            mb: 1.5,
            maxWidth: 720,
          })}>
          {track.tagline}
        </Typography>

        <Stack direction="row" spacing={1.5} sx={{ flexWrap: 'wrap', gap: 1 }}>
          <Typography
            variant="body2"
            sx={theme => ({ color: alpha(theme.palette.common.white, 0.78), fontWeight: 500 })}>
            {track.duration}
            <Box component="span" sx={{ mx: 1 }}>
              {sep}
            </Box>
            {track.format}
            <Box component="span" sx={{ mx: 1 }}>
              {sep}
            </Box>
            {track.nextCohort}
          </Typography>
        </Stack>
      </Box>
    </Box>
  )
}

TrackDetailHero.displayName = 'TrackDetailHero'
