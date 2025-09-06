import React, { lazy } from 'react'
import { Box, Skeleton } from '@mui/material'
import { LazyIntersection } from '@/components/Layouts/LazyIntersection'
import { Section } from '@/components/Layouts/Section'
import { SEO } from '@/components/Layouts/Seo'
import homeData from '@/mocks/home.json'
import type { HomeData } from '@/types/home'
import { HeroSection } from '../components/HeroSection'
import HeroVideo from '../components/HeroVideo'

// Lazy load below-the-fold components for better initial loading
const WhyTechlabsSection = lazy(() =>
  import('../components/WhyTechlabs').then(m => ({ default: m.WhyTechlabsSection }))
)
const StoriesCarousel = lazy(() =>
  import('@/features/stories/components/StoriesCarousel').then(m => ({
    default: m.StoriesCarousel,
  }))
)
const NumbersBand = lazy(() =>
  import('../components/NumbersBand').then(m => ({ default: m.NumbersBand }))
)
const SupportCta = lazy(() =>
  import('@/features/stories/components/SupportCta').then(m => ({ default: m.SupportCta }))
)
const Faqs = lazy(() => import('@/components/Forms/Faqs').then(m => ({ default: m.Faqs })))

const SectionSkeleton: React.FC<{ height?: number }> = ({ height = 200 }) => (
  <Section>
    <Box sx={{ py: 4 }}>
      <Skeleton variant="rectangular" height={height} sx={{ borderRadius: 2 }} />
    </Box>
  </Section>
)

const CarouselSkeleton: React.FC = () => (
  <Section>
    <Box sx={{ py: 4, display: 'flex', gap: 2 }}>
      {[1, 2, 3].map(i => (
        <Skeleton key={i} variant="rectangular" height={300} sx={{ flex: 1, borderRadius: 2 }} />
      ))}
    </Box>
  </Section>
)

export const HomePage: React.FC = () => {
  return (
    <main>
      <SEO
        title="TechLabs - Learn Tech Skills for Free"
        description="Learn tech skills for free with TechLabs. Blended learning, local community, practical projects. Winner of Google.org Impact Challenge Germany 2018."
        keywords="tech education, free coding, web development, data science, product design, AI, digital skills, Germany"
        image="/img/techlabs-og-image.jpg"
        url="/"
        type="website"
        tags={[
          'tech education',
          'free coding',
          'web development',
          'data science',
          'product design',
          'AI',
        ]}
      />
      <HeroSection />

      <Section sx={{ py: 0 }}>
        <HeroVideo
          posterUrl={homeData.video.posterUrl}
          srcUrl={homeData.video.srcUrl}
          duration={homeData.video.duration}
          title="TechLabs Introduction Video"
        />
      </Section>

      <LazyIntersection fallback={<SectionSkeleton height={300} />} minHeight={300}>
        <Section sx={{ py: 0 }}>
          <WhyTechlabsSection />
        </Section>
      </LazyIntersection>

      <LazyIntersection fallback={<CarouselSkeleton />} minHeight={350}>
        <Section sx={{ px: { xs: 2, md: 4 }, py: 0 }}>
          <StoriesCarousel stories={homeData.stories as HomeData['stories']} />
        </Section>
      </LazyIntersection>

      <LazyIntersection fallback={<SectionSkeleton height={150} />} minHeight={150}>
        <Section sx={{ px: { xs: 2, md: 4 }, py: 0 }}>
          <NumbersBand numbers={homeData.numbers} />
        </Section>
      </LazyIntersection>

      <LazyIntersection fallback={<SectionSkeleton height={250} />} minHeight={250}>
        <Section sx={{ px: { xs: 2, md: 4 }, py: 0 }}>
          <SupportCta
            title={homeData.support.title}
            body={homeData.support.body}
            cta={homeData.support.cta}
          />
        </Section>
      </LazyIntersection>

      <LazyIntersection fallback={<SectionSkeleton height={400} />} minHeight={400}>
        <Section sx={{ px: { xs: 2, md: 4 }, py: 0 }}>
          <Faqs faqs={homeData.faqs} />
        </Section>
      </LazyIntersection>
    </main>
  )
}
