import React from 'react'

import { Hero } from '../components/Hero'
import { TrackChooser } from '../components/TrackChooser'
import { TrustStrip } from '../components/TrustStrip'

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
            {/* Additional homepage sections will be added in subsequent MVP stories */}
        </main>
    )
}
