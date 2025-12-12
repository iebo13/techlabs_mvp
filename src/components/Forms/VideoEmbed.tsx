import React, { useEffect, useRef } from 'react'
import { Close as CloseIcon } from '@mui/icons-material'
import { Dialog, DialogContent, DialogTitle, IconButton, Box, useTheme, useMediaQuery } from '@mui/material'
import { useFocusTrap } from '@/components/Layouts/accessibility/hooks/useFocusTrap'
import { useI18n } from '@/hooks'

type VideoEmbedProps = {
  open: boolean
  onClose: () => void
  title: string
  srcUrl: string
  posterUrl: string
}

export const VideoEmbed: React.FC<VideoEmbedProps> = ({ open, onClose, title, srcUrl, posterUrl }) => {
  const theme = useTheme()
  const { t } = useI18n()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const videoRef = useRef<HTMLVideoElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useFocusTrap<HTMLDivElement>({
    enabled: open,
    autoFocus: true,
    restoreFocus: true,
    initialFocus: closeButtonRef.current || undefined,
  })

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (open) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open && videoRef.current) {
      videoRef.current.pause()
    }
  }, [open])

  return (
    <Dialog
      ref={dialogRef}
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      fullScreen={isMobile}
      aria-labelledby="video-dialog-title"
      aria-modal="true"
      PaperProps={{
        sx: {
          bgcolor: 'common.black',
          color: 'text.primary',
          borderRadius: isMobile ? 0 : 2,
          maxHeight: '90vh',
          overflow: 'hidden',
        },
      }}
      keepMounted={false}>
      <DialogTitle
        id="video-dialog-title"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'common.white',
          pb: 1,
        }}>
        {title}
        <IconButton
          ref={closeButtonRef}
          onClick={onClose}
          aria-label={t('video.closeVideo')}
          sx={{ color: 'common.white' }}>
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
            maxHeight: '70vh',
            overflow: 'hidden',
          }}>
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
            aria-label={t('video.player', { title })}>
            <source src={srcUrl} type="video/mp4" />
            <track kind="captions" src="/captions/intro.vtt" srcLang="en" label="English captions" default />
            {t('video.unsupportedBrowser')}
          </video>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
