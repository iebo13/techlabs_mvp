import React, { useState, lazy, Suspense } from 'react'
import { PlayArrow as PlayArrowIcon } from '@mui/icons-material'
import {
  Card,
  Box,
  IconButton,
  Chip,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from '@mui/material'
import { OptimizedImage, Section } from '@/components/Layouts'

const VIDEO_THUMBNAIL = '/img/Intro-thumbnail.png'
const VideoEmbed = lazy(() =>
  import('@/components/Forms/VideoEmbed').then(module => ({ default: module.VideoEmbed }))
)

type HeroVideoProps = {
  posterUrl: string
  srcUrl: string
  duration: number
  title?: string
}

export const HeroVideo: React.FC<HeroVideoProps> = ({
  posterUrl,
  srcUrl,
  duration,
  title = 'TechLabs Introduction Video',
}) => {
  const [modalOpen, setModalOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

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
        <Card
          sx={{
            position: 'relative',
            cursor: 'pointer',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            overflow: 'hidden',
            borderRadius: 0,
            '&:focus-within': {
              outline: '2px solid',
              outlineColor: 'primary.main',
              outlineOffset: 2,
            },
          }}
          onClick={handlePlayClick}
          role="button"
          tabIndex={0}
          onKeyDown={event => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              handlePlayClick()
            }
          }}
          aria-label={`Play ${title}, duration ${durationText}`}
        >
          <OptimizedImage
            src={posterUrl || VIDEO_THUMBNAIL}
            alt={`${title} thumbnail`}
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
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.4)',
              },
            }}
          >
            <IconButton
              size="large"
              aria-label={`Play introduction video, duration ${durationText}`}
              sx={{
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                width: { xs: 64, sm: 80 },
                height: { xs: 64, sm: 80 },
                '&:hover': {
                  bgcolor: 'primary.dark',
                  transform: 'scale(1.1)',
                },
              }}
              onClick={event => {
                event.stopPropagation()
                handlePlayClick()
              }}
            >
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
            aria-label={`Video duration ${durationText}`}
          />
        </Card>

        {modalOpen && (
          <Suspense fallback={<CircularProgress />}>
            <VideoEmbed
              open={modalOpen}
              onClose={handleCloseModal}
              title={title}
              srcUrl={srcUrl}
              posterUrl={posterUrl}
            />
          </Suspense>
        )}
      </Box>
    </Section>
  )
}
