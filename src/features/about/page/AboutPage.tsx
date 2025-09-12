import React, { useEffect, useRef } from 'react'
import { Box } from '@mui/material'
import { SEO } from '@/components/Layouts'
import { FaqsSection } from '@/features/about/components/FaqsSection'
import contentData from '@/mocks/content.json'
import faqData from '@/mocks/faq.json'
import { ContactSection, MissionSection, TeamSection, ProgramSection } from '../components'

export const AboutPage: React.FC = () => {
  const faqRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.location.hash === '#faq' && faqRef.current) {
      setTimeout(() => {
        faqRef.current?.scrollIntoView({ behavior: 'smooth' })
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
      <MissionSection data={contentData.about.mission} />
      <ProgramSection data={contentData.about.program} />
      <TeamSection data={contentData.about.team} />
      <ContactSection data={contentData.about.contact} />
      <Box ref={faqRef} tabIndex={-1}>
        <FaqsSection faqs={faqData.faqs} />
      </Box>
    </main>
  )
}
