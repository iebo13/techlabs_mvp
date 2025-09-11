import React, { useEffect, useRef } from 'react'
import { Faqs } from '@/features/home/components/Faqs'
import { SEO } from '@/components/Layouts'
import { ProgramSection } from '@/features/tracks/components/ProgramSection'
import contentData from '@/mocks/content.json'
import faqData from '@/mocks/faq.json'
import { ContactSection } from '../components/ContactSection'
import { MissionSection } from '../components/MissionSection'
import { TeamSection } from '../components/TeamSection'

// Type definitions for the content data
type AboutData = typeof contentData.about
type FAQ = (typeof faqData.faqs)[0]

/**
 * AboutPage component - Comprehensive about page with mission, program, timeline, team, and FAQ sections.
 * Implements #faq anchor functionality for deep linking from other pages.
 */
export const AboutPage: React.FC = () => {
  const faqRef = useRef<HTMLDivElement>(null)
  const aboutData: AboutData = contentData.about
  const faqs: FAQ[] = faqData.faqs

  // Handle #faq anchor navigation
  useEffect(() => {
    if (window.location.hash === '#faq' && faqRef.current) {
      // Small delay to ensure component is fully rendered
      setTimeout(() => {
        faqRef.current?.scrollIntoView({ behavior: 'smooth' })
        // Focus management for accessibility
        faqRef.current?.focus()
      }, 100)
    }
  }, [])

  return (
    <main>
      <SEO
        title="About Us - TechLabs"
        description="Learn about TechLabs mission to provide free tech education, our program approach, timeline, team, and frequently asked questions."
        keywords="about techlabs, mission, program, team, timeline, FAQ, tech education"
        image="/img/about-og-image.jpg"
        url="/about"
        type="website"
        tags={['about', 'mission', 'program', 'team', 'timeline', 'FAQ']}
      />
      <MissionSection data={aboutData.mission} />
      <ProgramSection data={aboutData.program} />
      <TeamSection data={aboutData.team} />
      <ContactSection data={aboutData.contact} />

      {/* FAQ Section with anchor */}
      <div ref={faqRef} tabIndex={-1}>
        <Faqs faqs={faqs} />
      </div>
    </main>
  )
}
