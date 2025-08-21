import React from 'react'

import { Hero } from '../components/Hero'
import { TrackChooser } from '../components/TrackChooser'

/**
 * HomePage component - main landing page for TechLabs website.
 * Contains Hero section and Track Chooser with additional sections to follow.
 */
export const HomePage: React.FC = () => {
    return (
        <main>
            <Hero />
            <TrackChooser />
            {/* Additional homepage sections will be added in subsequent MVP stories */}
        </main>
    )
}
