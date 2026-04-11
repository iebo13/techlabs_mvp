import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import { useSanityData } from '@/config/dataSource'
import { StorySchema } from '@/mocks/schemas'
import { sanityFetch } from '@/utils/sanityFetch'
import { ALL_STORIES_QUERY, STORY_BY_SLUG_QUERY } from '../api/storyQueries'

const StoriesArraySchema = z.array(StorySchema)

export const useStories = () => {
  const isSanity = useSanityData()

  return useQuery({
    queryKey: ['stories'],
    queryFn: async () => {
      if (!isSanity) {
        const storiesData = (await import('@/mocks/stories.json')).default

        return StoriesArraySchema.parse(storiesData)
      }

      return sanityFetch(ALL_STORIES_QUERY, {}, StoriesArraySchema)
    },
    staleTime: 5 * 60 * 1000,
  })
}

export const useStoryById = (storyId: string) => {
  const isSanity = useSanityData()

  return useQuery({
    queryKey: ['stories', storyId],
    queryFn: async (): Promise<z.infer<typeof StorySchema> | null> => {
      if (!isSanity) {
        const storiesData = (await import('@/mocks/stories.json')).default
        const stories = StoriesArraySchema.parse(storiesData)

        return stories.find(s => s.id === storyId) ?? null
      }

      return sanityFetch(STORY_BY_SLUG_QUERY, { slug: storyId }, StorySchema.nullable())
    },
    enabled: Boolean(storyId),
  })
}
