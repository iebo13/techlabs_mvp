import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import { useSanityData } from '@/config/dataSource'
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

  return useQuery({
    queryKey: ['tracks'],
    queryFn: async () => {
      if (!isSanity) {
        const tracksData = await import('@/mocks/tracks.json')

        return TracksArraySchema.parse(tracksData.tracks)
      }

      return sanityFetch(ALL_TRACKS_QUERY, {}, TracksArraySchema)
    },
    staleTime: 5 * 60 * 1000,
  })
}
