import React from 'react'
import { Box, Typography } from '@mui/material'
import type { Story } from '@/features/stories'

const STORY_IMAGES = {
  '1': '/img/stories/person1.png',
  '2': '/img/stories/person2.png',
  '3': '/img/stories/person3.png',
} as const

type CarouselItemProps = {
  story: Story
}

export const CarouselItem: React.FC<CarouselItemProps> = ({ story }) => {
  const getStoryImage = (storyId: string) => {
    return STORY_IMAGES[storyId as keyof typeof STORY_IMAGES] || STORY_IMAGES['1']
  }

  return (
    <Box
      component="a"
      href={`/stories/${story.id}`}
      aria-label={story.title}
      sx={{
        position: 'relative',
        display: 'block',
        height: '480px',
        borderRadius: '20px',
        overflow: 'hidden',
        textDecoration: 'none',
        cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
        },
        '&:focus-visible': {
          outline: '2px solid',
          outlineColor: 'primary.main',
          outlineOffset: '2px',
        },
      }}>
      <Box component="img" src={getStoryImage(story.id)} alt="" role="presentation" aria-hidden="true" />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.9))',
          pointerEvents: 'none',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          color: '#FFFFFF',
          pointerEvents: 'none',
        }}>
        <Typography variant="h3" component="h3" id={`story-title-${story.id}`}>
          {story.title}
        </Typography>
        <Typography variant="body2" color="white" aria-describedby={`story-title-${story.id}`}>
          {'" ' + story.excerpt + '"'}
        </Typography>
      </Box>
    </Box>
  )
}
