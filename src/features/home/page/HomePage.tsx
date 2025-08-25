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
const WhyTechlabs = lazy(() =>
  import('../components/WhyTechlabs').then(m => ({ default: m.WhyTechlabs }))
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

// Optimized loading fallbacks
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

/**
 * HomePage component - main landing page for TechLabs website.
 * Contains unified Hero section with track selection and trust indicators, followed by additional sections.
 */
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

      {/* Video Banner Section - MVP-08 */}
      <Section sx={{ py: { xs: 6, md: 8 } }}>
        <HeroVideo
          posterUrl={homeData.video.posterUrl}
          srcUrl={homeData.video.srcUrl}
          duration={homeData.video.duration}
          title="TechLabs Introduction Video"
        />
      </Section>

      {/* Why TechLabs Section - MVP-09 */}
      <LazyIntersection fallback={<SectionSkeleton height={300} />} minHeight={300}>
        <WhyTechlabs />
      </LazyIntersection>

      {/* Stories Carousel Section - MVP-10 */}
      <LazyIntersection fallback={<CarouselSkeleton />} minHeight={350}>
        <StoriesCarousel stories={homeData.stories as HomeData['stories']} />
      </LazyIntersection>

      {/* Numbers Band Section - MVP-11 */}
      <LazyIntersection fallback={<SectionSkeleton height={150} />} minHeight={150}>
        <NumbersBand numbers={homeData.numbers} />
      </LazyIntersection>

      {/* Support CTA Section - MVP-12 */}
      <LazyIntersection fallback={<SectionSkeleton height={250} />} minHeight={250}>
        <SupportCta
          title={homeData.support.title}
          body={homeData.support.body}
          imageUrl={homeData.support.imageUrl}
          cta={homeData.support.cta}
        />
      </LazyIntersection>

      {/* FAQs Section - MVP-13 */}
      <LazyIntersection fallback={<SectionSkeleton height={400} />} minHeight={400}>
        <Faqs faqs={homeData.faqs} />
      </LazyIntersection>

      {/* Additional homepage sections will be added in subsequent MVP stories */}
    </main>
  )
}
