import React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Container, Grid } from '@mui/material'
import { CTAButton } from '@/components/Buttons'
import { DataLoadingState, LazyIntersection, Section, SectionHeading, SEO } from '@/components/Layouts'
import { useI18n } from '@/hooks'
import { StoryAchievements } from '../components/StoryAchievements'
import { StoryBottomCta } from '../components/StoryBottomCta'
import { StoryHero } from '../components/StoryHero'
import { StoryImpactMetrics } from '../components/StoryImpactMetrics'
import { StoryNarrative } from '../components/StoryNarrative'
import { StoryProfileCard } from '../components/StoryProfileCard'
import { StoryPullQuote } from '../components/StoryPullQuote'
import { useStoryById } from '../hooks/useStories'
import type { Story } from '../types/stories.types'
import { getStoryCoverImageUrl } from '../utils/storyCoverImage'

export const StoryDetailPage: React.FC = () => {
  const { storyId } = useParams<{ storyId: string }>()
  const { t } = useI18n()
  const { data: storyData, isLoading, error } = useStoryById(storyId ?? '')

  if (isLoading) {
    return (
      <DataLoadingState isLoading error={null}>
        {null}
      </DataLoadingState>
    )
  }

  const story = storyData as Story | null | undefined

  if (error || !story) {
    return (
      <Section sx={{ py: 12, textAlign: 'center' }}>
        <SectionHeading level={2}>{t('common:stories.detail.notFound')}</SectionHeading>
        <CTAButton to="/stories">{t('common:stories.detail.backToStories')}</CTAButton>
      </Section>
    )
  }

  const displayName = story.name ?? story.title

  return (
    <Box>
      <SEO
        title={`${displayName} — TechLabs Success Story`}
        description={story.excerpt}
        keywords={`${displayName}, ${story.trackLabel}, ${story.company}, TechLabs, success story`}
        image={getStoryCoverImageUrl(story)}
        url={`/stories/${story.id}`}
        type="article"
        publishedTime={story.graduationDate}
        section={story.trackLabel}
        tags={[story.trackLabel, 'success story', story.company]}
      />

      <StoryHero story={story} />

      <Section sx={{ py: { xs: 4, md: 6 } }}>
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 3, md: 5 }}>
            {/* Left: sticky profile card */}
            <Grid size={{ xs: 12, md: 4 }}>
              <StoryProfileCard story={story} />
            </Grid>

            {/* Right: storytelling content */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {/* Pull quote — above the fold */}
                {story.quote && (
                  <StoryPullQuote
                    quote={story.quote}
                    attribution={displayName}
                    role={`${story.currentRole}, ${story.company}`}
                    avatarUrl={story.imageUrl}
                  />
                )}

                {/* Narrative arc */}
                <LazyIntersection minHeight={300}>
                  <StoryNarrative narrative={story.narrative} fallbackDescription={story.fullDescription} />
                </LazyIntersection>

                {/* Impact metrics */}
                {story.metrics && story.metrics.length > 0 && (
                  <LazyIntersection minHeight={150}>
                    <StoryImpactMetrics metrics={story.metrics} />
                  </LazyIntersection>
                )}

                {/* Achievements */}
                <LazyIntersection minHeight={200}>
                  <StoryAchievements achievements={story.achievements} />
                </LazyIntersection>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Section>

      <StoryBottomCta />
    </Box>
  )
}

StoryDetailPage.displayName = 'StoryDetailPage'
