import React from 'react'

import { HeroSection } from '../components/HeroSection'
import HeroVideo from '../components/HeroVideo'
import { Section } from '../components/Section'
import homeData from '../mocks/home.json'

/**
 * HomePage component - main landing page for TechLabs website.
 * Contains unified Hero section with track selection and trust indicators, followed by additional sections.
 */
export const HomePage: React.FC = () => {
    return (
        <main>
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

            {/* Additional homepage sections will be added in subsequent MVP stories */}
        </main>
    )
}
