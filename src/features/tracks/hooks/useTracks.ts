import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import { useSanityData } from '@/config/dataSource'
import { useI18n } from '@/hooks'
import { sanityFetch } from '@/utils/sanityFetch'
import { ALL_TRACKS_QUERY } from '../api/trackQueries'

const TrackKeySchema = z.enum(['web-dev', 'data-science', 'product-design', 'ai'])

const TrackMockSchema = z.object({
  id: TrackKeySchema,
  applicationDeadline: z.string(),
  spotsAvailable: z.number(),
  icon: z.string(),
  imageUrl: z.string().optional(),
})

const TracksArraySchema = z.array(TrackMockSchema)

export const useTracks = () => {
  const isSanity = useSanityData()
  const { currentLanguage: lang } = useI18n()

  return useQuery({
    queryKey: ['tracks', lang],
    queryFn: async () => {
      if (!isSanity) {
        const { default: tracksFile } = await import('@/mocks/tracks.json')

        return TracksArraySchema.parse(tracksFile.tracks)
      }

      return sanityFetch(ALL_TRACKS_QUERY, { lang }, TracksArraySchema)
    },
    staleTime: 5 * 60 * 1000,
  })
}
