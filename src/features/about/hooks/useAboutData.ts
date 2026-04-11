import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import { useSanityData } from '@/config/dataSource'
import type { AboutDataValidated, FAQValidated } from '@/mocks/schemas'
import { AboutDataSchema, FAQSchema } from '@/mocks/schemas'
import { sanityFetch } from '@/utils/sanityFetch'
import { ABOUT_CONTENT_QUERY, ALL_FAQS_QUERY, TEAM_MEMBERS_QUERY } from '../api/aboutQueries'

const FAQsArraySchema = z.array(FAQSchema)

export const useAboutData = () => {
  const isSanity = useSanityData()

  return useQuery({
    queryKey: ['about'],
    queryFn: async (): Promise<AboutDataValidated> => {
      if (!isSanity) {
        const contentData = await import('@/mocks/content.json')

        return AboutDataSchema.parse(contentData.about)
      }

      const [aboutContent, teamMembers] = await Promise.all([
        sanityFetch(ABOUT_CONTENT_QUERY),
        sanityFetch(TEAM_MEMBERS_QUERY),
      ])

      return AboutDataSchema.parse({
        ...(aboutContent as Record<string, unknown>),
        team: {
          ...((aboutContent as Record<string, unknown>).team as Record<string, unknown>),
          members: teamMembers,
        },
      })
    },
    staleTime: 5 * 60 * 1000,
  })
}

export const useFaqs = () => {
  const isSanity = useSanityData()

  return useQuery({
    queryKey: ['faqs'],
    queryFn: async (): Promise<FAQValidated[]> => {
      if (!isSanity) {
        const faqData = await import('@/mocks/faq.json')

        return FAQsArraySchema.parse(faqData.faqs)
      }

      return sanityFetch(ALL_FAQS_QUERY, {}, FAQsArraySchema)
    },
    staleTime: 5 * 60 * 1000,
  })
}
