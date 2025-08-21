import React from 'react'

import { Hero } from '../components/Hero'
import HeroVideo from '../components/HeroVideo'
import { Section } from '../components/Section'
import { TrackChooser } from '../components/TrackChooser'
import { TrustStrip } from '../components/TrustStrip'
import homeData from '../mocks/home.json'

/**
 * HomePage component - main landing page for TechLabs website.
 * Contains Hero section, Track Chooser, Trust Strip, and additional sections to follow.
 */
export const HomePage: React.FC = () => {
    return (
        <main>
            <Hero />
            <TrackChooser />
            <TrustStrip />

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
