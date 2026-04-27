import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import { useSanityData } from '@/config/dataSource'
import { useI18n } from '@/hooks'
import { PartnerTestimonialSchema } from '@/mocks/schemas'
import { sanityFetch } from '@/utils/sanityFetch'
import { PARTNER_TESTIMONIALS_QUERY } from '../api/partnerQueries'

const TestimonialsArraySchema = z.array(PartnerTestimonialSchema)

export const usePartnerTestimonials = () => {
  const isSanity = useSanityData()
  const { currentLanguage: lang } = useI18n()

  return useQuery({
    queryKey: ['partnerTestimonials', lang],
    queryFn: async () => {
      if (!isSanity) {
        const data = await import('@/mocks/partners.json')

        return TestimonialsArraySchema.parse(data.testimonials)
      }

      return sanityFetch(PARTNER_TESTIMONIALS_QUERY, { lang }, TestimonialsArraySchema)
    },
    staleTime: 5 * 60 * 1000,
  })
}
