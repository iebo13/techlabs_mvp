import React, { useState, lazy, Suspense } from 'react'
import { PlayArrow as PlayArrowIcon } from '@mui/icons-material'
import { Box, IconButton, Chip, useTheme, useMediaQuery, CircularProgress } from '@mui/material'
import { OptimizedImage, Section } from '@/components/Layouts'
import { useI18n } from '@/hooks'

const VIDEO_THUMBNAIL = '/img/Intro-thumbnail.png'
const VideoEmbed = lazy(() => import('@/components/Forms/VideoEmbed').then(module => ({ default: module.VideoEmbed })))

type HeroVideoProps = {
  posterUrl: string
  srcUrl: string
  duration: number
  title?: string
}

export const HeroVideo: React.FC<HeroVideoProps> = ({ posterUrl, srcUrl, duration, title }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { t } = useI18n()
  const displayTitle = title || t('hero.video.introTitle')

  const handlePlayClick = () => {
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const durationText = formatDuration(duration)

  return (
    <Section sx={{ py: 0 }}>
      <Box sx={{ width: '100%', overflow: 'hidden' }}>
        <Box
          component="div"
          sx={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 0,
          }}>
          <OptimizedImage
            src={posterUrl || VIDEO_THUMBNAIL}
            alt={`${displayTitle} thumbnail`}
            width="100%"
            height="600px"
            sizes="(max-width: 600px) 100vw, (max-width: 900px) 80vw, 800px"
            priority
            style={{
              aspectRatio: '16/9',
              objectFit: 'cover',
              borderRadius: 'inherit',
            }}
          />

          <Box
            component="button"
            onClick={handlePlayClick}
            onKeyDown={event => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                handlePlayClick()
              }
            }}
            aria-label={t('hero.video.playLabel', { title: displayTitle, duration: durationText })}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgba(0, 0, 0, 0.3)',
              transition: 'background-color 0.2s ease-in-out',
              border: 'none',
              cursor: 'pointer',
              width: '100%',
              height: '100%',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.4)',
              },
              '&:focus-visible': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: 2,
              },
            }}>
            <IconButton
              size="large"
              aria-hidden="true"
              tabIndex={-1}
              sx={{
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                width: { xs: 64, sm: 80 },
                height: { xs: 64, sm: 80 },
                pointerEvents: 'none',
                '&:hover': {
                  bgcolor: 'primary.dark',
                  transform: 'scale(1.1)',
                },
              }}>
              <PlayArrowIcon sx={{ fontSize: { xs: 32, sm: 40 } }} />
            </IconButton>
          </Box>

          <Chip
            label={durationText}
            size={isMobile ? 'small' : 'medium'}
            sx={{
              position: 'absolute',
              bottom: 16,
              right: 16,
              bgcolor: 'rgba(0, 0, 0, 0.8)',
              color: 'common.white',
              '& .MuiChip-label': {
                px: 1.5,
              },
            }}
            aria-label={t('hero.video.duration', { duration: durationText })}
          />
        </Box>

        {modalOpen && (
          <Suspense fallback={<CircularProgress />}>
            <VideoEmbed
              open={modalOpen}
              onClose={handleCloseModal}
              title={displayTitle}
              srcUrl={srcUrl}
              posterUrl={posterUrl}
            />
          </Suspense>
        )}
      </Box>
    </Section>
  )
}
