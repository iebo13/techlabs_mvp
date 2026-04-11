import type { ZodType } from 'zod'
import { sanityClient } from '@/config/sanity'

export const sanityFetch = async <T>(
  query: string,
  params: Record<string, unknown> = {},
  schema?: ZodType<T>
): Promise<T> => {
  const data = await sanityClient.fetch<T>(query, params)

  return schema ? schema.parse(data) : data
}
