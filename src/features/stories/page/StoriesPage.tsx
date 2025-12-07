import React, { useState, lazy, Suspense, useMemo } from 'react'
import {
  Box,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  type SelectChangeEvent,
} from '@mui/material'
import { Section, SectionHeading } from '@/components/Layouts'
import type { TrackKey } from '@/features/tracks'
import { useI18n } from '@/hooks'
import storiesData from '@/mocks/stories.json'
import { StoryCard } from '../components/StoryCard'
import type { Story } from '../types/stories.types'

const StoryModal = lazy(() =>
  import('@/features/stories/components/StoryModal').then(module => ({
    default: module.StoryModal,
  }))
)
const typedStoriesData = storiesData as Story[]

export const StoriesPage: React.FC = () => {
  const theme = useTheme()
  const { t } = useI18n()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const trackOptions = useMemo(
    () =>
      [
        { value: 'all', label: t('common:stories.filter.allTracks') },
        { value: 'web-dev', label: t('common:tracks.items.web-dev.label') },
        { value: 'data-science', label: t('common:tracks.items.data-science.label') },
        { value: 'product-design', label: t('common:tracks.items.product-design.label') },
        { value: 'ai', label: t('common:tracks.items.ai.label') },
      ] as const,
    [t]
  )

  const [selectedTrack, setSelectedTrack] = useState<TrackKey | 'all'>('all')
  const [selectedStory, setSelectedStory] = useState<Story | null>(null)

  const filteredStories = (() => {
    if (selectedTrack === 'all') return typedStoriesData

    return typedStoriesData.filter(story => story.track === selectedTrack)
  })()

  const handleStoryClick = (story: Story) => {
    setSelectedStory(story)
  }

  const handleCloseModal = () => {
    setSelectedStory(null)
  }

  const handleTrackChange = (event: SelectChangeEvent<TrackKey | 'all'>) => {
    setSelectedTrack(event.target.value as TrackKey | 'all')
  }

  return (
    <>
      <Section sx={{ py: { xs: 4, md: 6 } }}>
        <Stack spacing={4}>
          <Box sx={{ textAlign: 'center' }}>
            <SectionHeading
              title={t('common:stories.page.title')}
              subtitle={t('common:stories.page.subtitle')}
              align="center">
              {t('common:stories.page.title')}
            </SectionHeading>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="track-filter-label">{t('common:stories.page.filterByTrack')}</InputLabel>
              <Select
                labelId="track-filter-label"
                value={selectedTrack}
                label={t('common:stories.page.filterByTrack')}
                onChange={handleTrackChange}
                size="medium">
                {trackOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              {t('common:stories.page.showingCount', {
                count: filteredStories.length,
                total: storiesData.length,
              })}
              {selectedTrack !== 'all' &&
                ` ${t('common:stories.page.inTrack', { track: trackOptions.find(track => track.value === selectedTrack)?.label })}`}
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {filteredStories.map(story => (
              <StoryCard key={story.id} story={story} onClick={handleStoryClick} />
            ))}
          </Grid>

          {filteredStories.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {t('common:stories.page.noStoriesFound')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('common:stories.page.tryDifferentTrack')}
              </Typography>
            </Box>
          )}
        </Stack>
      </Section>

      {selectedStory && (
        <Suspense fallback={<CircularProgress />}>
          <StoryModal story={selectedStory} onClose={handleCloseModal} isMobile={isMobile} />
        </Suspense>
      )}
    </>
  )
}
