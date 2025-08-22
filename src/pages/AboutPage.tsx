import React, { useEffect, useRef } from 'react'

import { ContactSection } from '../components/ContactSection'
import { Faqs } from '../components/Faqs'
import { MissionSection } from '../components/MissionSection'
import { ProgramSection } from '../components/ProgramSection'
import { TeamSection } from '../components/TeamSection'
import { TimelineSection } from '../components/TimelineSection'
import contentData from '../mocks/content.json'
import faqData from '../mocks/faq.json'

// Type definitions for the content data
type AboutData = typeof contentData.about
type FAQ = typeof faqData.faqs[0]

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
      <MissionSection data={aboutData.mission} />
      <ProgramSection data={aboutData.program} />
      <TimelineSection data={aboutData.timeline} />
      <TeamSection data={aboutData.team} />
      <ContactSection data={aboutData.contact} />

      {/* FAQ Section with anchor */}
      <div ref={faqRef} tabIndex={-1}>
        <Faqs faqs={faqs} />
      </div>
    </main>
  )
}
