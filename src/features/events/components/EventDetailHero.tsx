import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'
import { Box, Button, Chip, IconButton, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { useI18n } from '@/hooks'
import type { Event } from '../types/events.types'

type EventDetailHeroProps = {
  readonly event: Event
}

export const EventDetailHero: React.FC<EventDetailHeroProps> = ({ event }) => {
  const navigate = useNavigate()
  const { t, formatDate } = useI18n()
  const isUpcoming = event.type === 'upcoming'
  const dateLine = formatDate(event.date, { hour: 'numeric', minute: '2-digit' })

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
      <Box
        component="img"
        src={event.imageUrl}
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

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
          onClick={() => navigate('/events')}
          aria-label={t('events.detail.backToEvents')}
          sx={theme => ({
            color: theme.palette.common.white,
            bgcolor: alpha(theme.palette.common.white, 0.12),
            backdropFilter: 'blur(8px)',
            '&:hover': { bgcolor: alpha(theme.palette.common.white, 0.22) },
          })}>
          <ArrowBackIcon />
        </IconButton>
        <Chip
          label={isUpcoming ? t('events.card.upcomingLabel') : t('events.card.pastLabel')}
          color={isUpcoming ? 'primary' : 'default'}
          sx={theme => ({
            fontWeight: 700,
            fontSize: '0.75rem',
            ...(isUpcoming
              ? { bgcolor: 'primary.main', color: 'primary.contrastText' }
              : {
                  color: theme.palette.common.white,
                  bgcolor: alpha(theme.palette.common.white, 0.18),
                }),
          })}
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
          {event.title}
        </Typography>

        <Typography
          variant="h6"
          sx={theme => ({
            color: alpha(theme.palette.common.white, 0.88),
            fontWeight: 500,
            mb: 0.5,
          })}>
          {dateLine}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={theme => ({
            color: alpha(theme.palette.common.white, 0.7),
            fontWeight: 400,
            wordBreak: 'break-word',
          })}>
          {event.location}
        </Typography>

        {event.externalUrl && (
          <Button
            href={event.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            size="large"
            sx={{
              mt: 3,
              borderRadius: '28px',
              textTransform: 'none',
              fontWeight: 700,
            }}>
            {isUpcoming ? t('events.detail.register') : t('events.detail.learnMore')}
          </Button>
        )}
      </Box>
    </Box>
  )
}

EventDetailHero.displayName = 'EventDetailHero'
