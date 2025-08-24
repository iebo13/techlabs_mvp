import React from 'react'

import { Faqs } from '../components/Faqs'
import { HeroSection } from '../components/HeroSection'
import HeroVideo from '../components/HeroVideo'
import { NumbersBand } from '../components/NumbersBand'
import { Section } from '../components/Section'
import { SEO } from '../components/Seo'
import { StoriesCarousel } from '../components/StoriesCarousel'
import { SupportCta } from '../components/SupportCta'
import { WhyTechlabs } from '../components/WhyTechlabs'
import homeData from '../mocks/home.json'

import type { HomeData } from '../types/home'

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
      <WhyTechlabs />

      {/* Stories Carousel Section - MVP-10 */}
      <StoriesCarousel stories={homeData.stories as HomeData['stories']} />

      {/* Numbers Band Section - MVP-11 */}
      <NumbersBand numbers={homeData.numbers} />

      {/* Support CTA Section - MVP-12 */}
      <SupportCta
        title={homeData.support.title}
        body={homeData.support.body}
        imageUrl={homeData.support.imageUrl}
        cta={homeData.support.cta}
      />

      {/* FAQs Section - MVP-13 */}
      <Faqs faqs={homeData.faqs} />

      {/* Additional homepage sections will be added in subsequent MVP stories */}
    </main>
  )
}
