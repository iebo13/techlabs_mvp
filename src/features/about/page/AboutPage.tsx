import React, { useEffect, useRef } from 'react'
import { Box } from '@mui/material'
import { SEO } from '@/components/Layouts'
import { FaqsSection } from '@/features/about/components/FaqsSection'
import { useI18n } from '@/hooks'
import contentData from '@/mocks/content.json'
import faqData from '@/mocks/faq.json'
import { ContactSection, MissionSection, TeamSection, ProgramSection } from '../components'

export const AboutPage: React.FC = () => {
  const { t } = useI18n()
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
    <main role="main" aria-label={t('about.page.mainLabel', { defaultValue: t('about.page.title') })}>
      <SEO
        title={t('about.page.title')}
        description={t('about.page.description')}
        keywords={t('about.page.keywords')}
        image="/img/about-og-image.jpg"
        url="/about"
        type="website"
        tags={t('about.page.tags', { returnObjects: true }) as string[]}
      />
      <MissionSection />
      <ProgramSection />
      <TeamSection />
      <ContactSection data={contentData.about.contact} />
      <Box ref={faqRef} tabIndex={-1}>
        <FaqsSection faqs={faqData.faqs} />
      </Box>
    </main>
  )
}
