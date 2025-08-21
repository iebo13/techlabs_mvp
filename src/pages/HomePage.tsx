import React from 'react'

import { Hero } from '../components/Hero'

/**
 * HomePage component - main landing page for TechLabs website.
 * Contains Hero section and will be extended with additional sections.
 */
export const HomePage: React.FC = () => {
    return (
        <main>
            <Hero />
            {/* Additional homepage sections will be added in subsequent MVP stories */}
        </main>
    )
}
