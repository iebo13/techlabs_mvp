import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import { useSanityData } from '@/config/dataSource'
import { useI18n } from '@/hooks'
import { StorySchema } from '@/mocks/schemas'
import { sanityFetch } from '@/utils/sanityFetch'
import { ALL_STORIES_QUERY, STORY_BY_SLUG_QUERY } from '../api/storyQueries'

const StoriesArraySchema = z.array(StorySchema)

export const useStories = () => {
  const isSanity = useSanityData()
  const { currentLanguage: lang } = useI18n()

  return useQuery({
    queryKey: ['stories', lang],
    queryFn: async () => {
      if (!isSanity) {
        const storiesData = (await import('@/mocks/stories.json')).default

        return StoriesArraySchema.parse(storiesData)
      }

      return sanityFetch(ALL_STORIES_QUERY, { lang }, StoriesArraySchema)
    },
    staleTime: 5 * 60 * 1000,
  })
}

export const useStoryById = (storyId: string) => {
  const isSanity = useSanityData()
  const { currentLanguage: lang } = useI18n()

  return useQuery({
    queryKey: ['stories', storyId, lang],
    queryFn: async (): Promise<z.infer<typeof StorySchema> | null> => {
      if (!isSanity) {
        const storiesData = (await import('@/mocks/stories.json')).default
        const stories = StoriesArraySchema.parse(storiesData)

        return stories.find(s => s.id === storyId) ?? null
      }

      return sanityFetch(STORY_BY_SLUG_QUERY, { slug: storyId, lang }, StorySchema.nullable())
    },
    enabled: Boolean(storyId),
  })
}
