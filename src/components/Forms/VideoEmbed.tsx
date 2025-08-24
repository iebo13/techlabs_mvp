import React, { useEffect, useRef } from 'react'
import { Close as CloseIcon } from '@mui/icons-material'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material'

type VideoEmbedProps = {
  open: boolean
  onClose: () => void
  title: string
  srcUrl: string
  posterUrl: string
}

const VideoEmbed: React.FC<VideoEmbedProps> = ({ open, onClose, title, srcUrl, posterUrl }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const videoRef = useRef<HTMLVideoElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (open) {
      document.addEventListener('keydown', handleKeyDown)
      // Focus the close button when modal opens for keyboard accessibility
      setTimeout(() => {
        closeButtonRef.current?.focus()
      }, 100)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  // Pause video when modal closes
  useEffect(() => {
    if (!open && videoRef.current) {
      videoRef.current.pause()
    }
  }, [open])

  // Respect prefers-reduced-motion (ready for future animation features)
  // const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      fullScreen={isMobile}
      aria-labelledby="video-dialog-title"
      PaperProps={{
        sx: {
          bgcolor: 'common.black',
          color: 'common.white',
          borderRadius: isMobile ? 0 : 2,
        },
      }}
      // Focus trap is handled by MUI Dialog
      disableRestoreFocus
    >
      <DialogTitle
        id="video-dialog-title"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'common.white',
          pb: 1,
        }}
      >
        {title}
        <IconButton
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close video"
          sx={{ color: 'common.white' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0, bgcolor: 'common.black' }}>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: isMobile ? '50vh' : 'auto',
            aspectRatio: isMobile ? 'auto' : '16/9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <video
            ref={videoRef}
            width="100%"
            height="100%"
            controls
            poster={posterUrl}
            preload="metadata"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
            }}
            aria-label={`${title} video player`}
          >
            <source src={srcUrl} type="video/mp4" />
            <track
              kind="captions"
              src="/captions/intro.vtt"
              srcLang="en"
              label="English captions"
              default
            />
            Your browser does not support the video tag.
          </video>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default VideoEmbed
