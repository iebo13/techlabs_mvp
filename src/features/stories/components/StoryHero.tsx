import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'
import { Avatar, Box, Chip, IconButton, Typography } from '@mui/material'
import { useI18n } from '@/hooks'
import type { Story } from '../types/stories.types'
import { PORTRAIT_IMAGE_OBJECT_POSITION } from '../utils/portraitObjectPosition'
import { getStoryCoverImageUrl, getStoryHeroObjectPosition } from '../utils/storyCoverImage'

type StoryHeroProps = {
  readonly story: Story
}

export const StoryHero: React.FC<StoryHeroProps> = ({ story }) => {
  const navigate = useNavigate()
  const { t } = useI18n()
  const displayName = story.name ?? story.title
  const coverSrc = getStoryCoverImageUrl(story)
  const coverObjectPosition = getStoryHeroObjectPosition(story)

  return (
    <Box
      component="header"
      sx={{
        position: 'relative',
        bgcolor: 'grey.900',
        minHeight: { xs: 320, md: 420 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden',
      }}>
      {/* Cover: wide banner when story.coverImageUrl is set; else portrait imageUrl */}
      <Box
        component="img"
        src={coverSrc}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        loading="eager"
        decoding="async"
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: coverObjectPosition,
        }}
      />

      {/* Gradient overlay — keeps title readable on any photo */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.35) 100%)',
          zIndex: 1,
        }}
      />

      {/* Top bar */}
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          right: 16,
          zIndex: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <IconButton
          onClick={() => navigate('/stories')}
          aria-label={t('common:stories.detail.backToStories')}
          sx={{
            color: 'white',
            bgcolor: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(8px)',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.22)' },
          }}>
          <ArrowBackIcon />
        </IconButton>
        <Chip
          label={story.trackLabel}
          sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 700, fontSize: '0.75rem' }}
        />
      </Box>

      {/* Person identity — large portrait left, text right */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          p: { xs: 3, md: 6 },
          display: 'flex',
          alignItems: 'flex-end',
          gap: { xs: 2, md: 3 },
          flexWrap: 'wrap',
        }}>
        <Avatar
          src={story.imageUrl}
          alt={displayName}
          sx={{
            width: { xs: 96, sm: 112, md: 132 },
            height: { xs: 96, sm: 112, md: 132 },
            border: '3px solid white',
            boxShadow: '0 4px 24px rgba(0,0,0,0.45)',
            flexShrink: 0,
            '& .MuiAvatar-img': { objectPosition: PORTRAIT_IMAGE_OBJECT_POSITION },
          }}
        />
        <Box sx={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
          <Typography
            component="h1"
            sx={{
              color: 'white',
              fontWeight: 900,
              lineHeight: 1.1,
              mb: 0.5,
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: 'clamp(2rem, 5vw, 3rem)' },
              letterSpacing: '-0.01em',
              wordBreak: 'break-word',
            }}>
            {displayName}
          </Typography>

          {story.name && (
            <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.7)', mb: 0.5, fontWeight: 400 }}>
              {story.title}
            </Typography>
          )}

          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)', fontWeight: 400, wordBreak: 'break-word' }}>
            {story.currentRole} · {story.company}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

StoryHero.displayName = 'StoryHero'
