import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import { useSanityData } from '@/config/dataSource'
import { useI18n } from '@/hooks'
import { PartnerImpactMetricSchema } from '@/mocks/schemas'
import { sanityFetch } from '@/utils/sanityFetch'
import { PARTNER_IMPACT_METRICS_QUERY } from '../api/partnerQueries'

const MetricsArraySchema = z.array(PartnerImpactMetricSchema)

export const usePartnerImpactMetrics = () => {
  const isSanity = useSanityData()
  const { currentLanguage: lang } = useI18n()

  return useQuery({
    queryKey: ['partnerImpactMetrics', lang],
    queryFn: async () => {
      if (!isSanity) {
        const data = await import('@/mocks/partners.json')

        return MetricsArraySchema.parse(data.impactMetrics)
      }

      return sanityFetch(PARTNER_IMPACT_METRICS_QUERY, { lang }, MetricsArraySchema)
    },
    staleTime: 5 * 60 * 1000,
  })
}
