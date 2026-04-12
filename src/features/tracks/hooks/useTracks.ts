import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import { useSanityData } from '@/config/dataSource'
import { useI18n } from '@/hooks'
import { sanityFetch } from '@/utils/sanityFetch'
import { ALL_TRACKS_QUERY } from '../api/trackQueries'

const TrackMockSchema = z.object({
  id: z.string(),
  applicationDeadline: z.string(),
  spotsAvailable: z.number(),
  icon: z.string(),
})

const TracksArraySchema = z.array(TrackMockSchema)

export const useTracks = () => {
  const isSanity = useSanityData()
  const { currentLanguage: lang } = useI18n()

  return useQuery({
    queryKey: ['tracks', lang],
    queryFn: async () => {
      if (!isSanity) {
        const tracksData = await import('@/mocks/tracks.json')

        return TracksArraySchema.parse(tracksData.tracks)
      }

      return sanityFetch(ALL_TRACKS_QUERY, { lang }, TracksArraySchema)
    },
    staleTime: 5 * 60 * 1000,
  })
}
