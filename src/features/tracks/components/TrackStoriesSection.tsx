import React from 'react'
import { Stack } from '@mui/material'
import { SectionHeading } from '@/components/Layouts'
import { StoriesCarousel } from '@/features/home/components/storiesSection/StoriesCarousel'
import { useStories } from '@/features/stories/hooks/useStories'
import type { Story } from '@/features/stories/types/stories.types'
import { useI18n } from '@/hooks'
import type { TrackKey } from '../types/tracks.types'

type TrackStoriesSectionProps = {
  readonly trackId: TrackKey
}

export const TrackStoriesSection: React.FC<TrackStoriesSectionProps> = ({ trackId }) => {
  const { t } = useI18n()
  const { data: stories } = useStories()

  const filtered = (stories?.filter(story => story.track === trackId) ?? []) as unknown as Story[]

  if (filtered.length === 0) return null

  return (
    <Stack spacing={2}>
      <SectionHeading level={3} emphasis="primary">
        {t('tracks.detail.sections.stories.title')}
      </SectionHeading>
      <StoriesCarousel stories={filtered} showSeeAllLink={false} />
    </Stack>
  )
}

TrackStoriesSection.displayName = 'TrackStoriesSection'
