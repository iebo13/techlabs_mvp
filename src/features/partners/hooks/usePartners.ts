import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import { useSanityData } from '@/config/dataSource'
import { DetailedPartnerSchema } from '@/mocks/schemas'
import { sanityFetch } from '@/utils/sanityFetch'
import { ALL_PARTNERS_QUERY } from '../api/partnerQueries'

const PartnersArraySchema = z.array(DetailedPartnerSchema)

export const usePartners = () => {
  const isSanity = useSanityData()

  return useQuery({
    queryKey: ['partners'],
    queryFn: async () => {
      if (!isSanity) {
        const partnersData = await import('@/mocks/partners.json')

        return PartnersArraySchema.parse(partnersData.partners)
      }

      return sanityFetch(ALL_PARTNERS_QUERY, {}, PartnersArraySchema)
    },
    staleTime: 5 * 60 * 1000,
  })
}
