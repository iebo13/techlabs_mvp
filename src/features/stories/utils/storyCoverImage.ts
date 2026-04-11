import type { Story } from '../types/stories.types'
import { PORTRAIT_IMAGE_OBJECT_POSITION } from './portraitObjectPosition'

/** Landscape / banner-style heroes: center-weighted (not portrait crop). */
export const COVER_HERO_OBJECT_POSITION = '50% 45%' as const

/**
 * Optional wide Unsplash (or other) URL for the detail hero. Falls back to {@link Story.imageUrl}.
 */
export function getStoryCoverImageUrl(story: Story): string {
  return story.coverImageUrl ?? story.imageUrl
}

export function getStoryHeroObjectPosition(story: Story): string {
  return story.coverImageUrl ? COVER_HERO_OBJECT_POSITION : PORTRAIT_IMAGE_OBJECT_POSITION
}
