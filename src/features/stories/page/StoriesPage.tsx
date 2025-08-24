import React, { useState, lazy, Suspense } from 'react'
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
} from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import { Section } from '@/components/Layouts/Section'
import { SectionHeading } from '@/components/Layouts/SectionHeading'
import storiesData from '@/mocks/stories.json'
import type { Story, TrackKey } from '@/types/home'
import { StoryCard } from '../components/StoryCard'

// Lazy load StoryModal component since it's only used when user clicks on a story
const StoryModal = lazy(() =>
  import('@/components/Popups/StoryModal').then(module => ({ default: module.StoryModal }))
)

// Type assertion for the JSON data
const typedStoriesData = storiesData as Story[]

type StoriesPageProps = {}

// Track options for filter
const trackOptions = [
  { value: 'all', label: 'All Tracks' },
  { value: 'web-dev', label: 'Web Development' },
  { value: 'data-science', label: 'Data Science' },
  { value: 'product-design', label: 'Product Design' },
  { value: 'ai', label: 'Artificial Intelligence' },
] as const

/**
 * StoriesPage - Gallery of graduate success stories with filtering and detailed modals
 */
export const StoriesPage: React.FC<StoriesPageProps> = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

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
              title="Our Graduates' Stories"
              subtitle="Discover how TechLabs alumni are transforming their careers and making an impact in the tech industry"
              align="center"
            >
              Our Graduates' Stories
            </SectionHeading>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="track-filter-label">Filter by Track</InputLabel>
              <Select
                labelId="track-filter-label"
                value={selectedTrack}
                label="Filter by Track"
                onChange={handleTrackChange}
                size="medium"
              >
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
              Showing {filteredStories.length} of {storiesData.length} stories
              {selectedTrack !== 'all' &&
                ` in ${trackOptions.find(t => t.value === selectedTrack)?.label}`}
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
                No stories found for this track
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try selecting a different track or check back later for new stories.
              </Typography>
            </Box>
          )}
        </Stack>
      </Section>

      {/* StoryModal with lazy loading */}
      {selectedStory && (
        <Suspense fallback={<CircularProgress />}>
          <StoryModal story={selectedStory} onClose={handleCloseModal} isMobile={isMobile} />
        </Suspense>
      )}
    </>
  )
}
