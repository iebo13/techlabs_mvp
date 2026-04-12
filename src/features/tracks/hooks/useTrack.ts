import { useQuery } from '@tanstack/react-query'
import { useSanityData } from '@/config/dataSource'
import { useI18n } from '@/hooks'
import { sanityFetch } from '@/utils/sanityFetch'
import { TRACK_BY_ID_QUERY } from '../api/trackQueries'
import type { DetailedTrack } from '../types/tracks.types'
import { getLocalizedTrack, isValidTrackKey } from '../utils/tracksUtils'
import { useTracks } from './useTracks'

type UseTrackResult = {
  track: DetailedTrack | null
  isLoading: boolean
  error: Error | null
  notFound: boolean
}

export const useTrack = (trackId: string | undefined): UseTrackResult => {
  const isSanity = useSanityData()
  const { t, currentLanguage: lang } = useI18n()
  const validId = isValidTrackKey(trackId) ? trackId : null

  const mockQuery = useTracks()

  const sanityQuery = useQuery({
    queryKey: ['track', validId, lang],
    queryFn: () => sanityFetch<DetailedTrack>(TRACK_BY_ID_QUERY, { trackId: validId, lang }),
    enabled: isSanity && !!validId,
    staleTime: 5 * 60 * 1000,
  })

  if (isSanity) {
    const track = sanityQuery.data ?? null

    return {
      track,
      isLoading: sanityQuery.isLoading,
      error: (sanityQuery.error as Error) ?? null,
      notFound: !sanityQuery.isLoading && !sanityQuery.error && !!validId && !track,
    }
  }

  const raw = validId ? mockQuery.data?.find(item => item.id === validId) : undefined
  const track = raw ? getLocalizedTrack(raw, t) : null

  return {
    track,
    isLoading: mockQuery.isLoading,
    error: (mockQuery.error as Error) ?? null,
    notFound: !mockQuery.isLoading && !mockQuery.error && !!trackId && !track,
  }
}
