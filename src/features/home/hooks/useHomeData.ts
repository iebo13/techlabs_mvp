import { useQuery } from '@tanstack/react-query'
import { useSanityData } from '@/config/dataSource'
import { useI18n } from '@/hooks'
import { HomeDataSchema } from '@/mocks/schemas'
import type { HomeDataValidated } from '@/mocks/schemas'
import { sanityFetch } from '@/utils/sanityFetch'
import { HOME_PAGE_QUERY } from '../api/homeQueries'

type HomePageSanityResult = {
  readonly settings: {
    readonly hero: HomeDataValidated['hero']
    readonly applicationDeadlineISO: string
    readonly video: HomeDataValidated['video']
    readonly features: HomeDataValidated['features']
    readonly numbers: HomeDataValidated['numbers']
    readonly support: HomeDataValidated['support']
  }
  readonly tracks: HomeDataValidated['tracks']
  readonly partners: HomeDataValidated['partners']
  readonly stories: HomeDataValidated['stories']
  readonly faqs: HomeDataValidated['faqs']
}

export const useHomeData = () => {
  const isSanity = useSanityData()
  const { currentLanguage: lang } = useI18n()

  return useQuery({
    queryKey: ['home', lang],
    queryFn: async (): Promise<HomeDataValidated> => {
      if (!isSanity) {
        const homeData = await import('@/mocks/home.json')

        return HomeDataSchema.parse(homeData)
      }

      const result = await sanityFetch<HomePageSanityResult>(HOME_PAGE_QUERY, { lang })

      return {
        hero: result.settings.hero,
        applicationDeadlineISO: result.settings.applicationDeadlineISO,
        video: result.settings.video,
        features: result.settings.features,
        numbers: result.settings.numbers,
        support: result.settings.support,
        tracks: result.tracks,
        partners: result.partners,
        stories: result.stories,
        faqs: result.faqs,
      }
    },
    staleTime: 5 * 60 * 1000,
  })
}
