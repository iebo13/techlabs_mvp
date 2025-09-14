import React, { lazy } from 'react'
import { LazyIntersection, SEO, SectionSkeleton, CarouselSkeleton } from '@/components/Layouts'
import homeData from '@/mocks/home.json'
import { HeroSection, HeroVideo } from '../components'
import type { HomeData } from '../types/homePage.type'

const WhyTechlabsSection = lazy(() => import('../components/WhyTechlabs').then(m => ({ default: m.WhyTechlabs })))
const StoriesCarousel = lazy(() =>
  import('../components/storiesSection').then(m => ({
    default: m.StoriesCarousel,
  }))
)
const NumbersBand = lazy(() => import('../components/NumbersBand').then(m => ({ default: m.NumbersBand })))
const SupportCta = lazy(() => import('@/features/home/components/SupportCta').then(m => ({ default: m.SupportCta })))
const FaqsSection = lazy(() =>
  import('@/features/about/components/FaqsSection').then(m => ({ default: m.FaqsSection }))
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
        tags={['tech education', 'free coding', 'web development', 'data science', 'product design', 'AI']}
      />
      <HeroSection />
      <HeroVideo
        posterUrl={homeData.video.posterUrl}
        srcUrl={homeData.video.srcUrl}
        duration={homeData.video.duration}
        title="TechLabs Introduction Video"
      />

      <LazyIntersection fallback={<SectionSkeleton height={300} />} minHeight={300}>
        <WhyTechlabsSection />
      </LazyIntersection>

      <LazyIntersection fallback={<CarouselSkeleton cards={3} cardHeight={350} />} minHeight={350}>
        <StoriesCarousel stories={homeData.stories as HomeData['stories']} />
      </LazyIntersection>

      <LazyIntersection fallback={<SectionSkeleton height={200} />} minHeight={200}>
        <NumbersBand numbers={homeData.numbers} />
      </LazyIntersection>

      <LazyIntersection fallback={<SectionSkeleton height={250} />} minHeight={250}>
        <SupportCta body={homeData.support.body} cta={homeData.support.cta} />
      </LazyIntersection>

      <LazyIntersection fallback={<SectionSkeleton height={400} />} minHeight={400}>
        <FaqsSection faqs={homeData.faqs} />
      </LazyIntersection>
    </main>
  )
}
