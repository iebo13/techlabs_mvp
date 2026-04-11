import React, { useEffect, useRef } from 'react'
import { Box } from '@mui/material'
import { DataLoadingState, SEO } from '@/components/Layouts'
import { FaqsSection } from '@/features/about/components/FaqsSection'
import { useI18n } from '@/hooks'
import { ContactSection, MissionSection, TeamSection, ProgramSection } from '../components'
import { useAboutData, useFaqs } from '../hooks/useAboutData'

export const AboutPage: React.FC = () => {
  const { t } = useI18n()
  const faqRef = useRef<HTMLDivElement>(null)
  const { data: aboutData, isLoading: aboutLoading, error: aboutError } = useAboutData()
  const { data: faqs, isLoading: faqsLoading, error: faqsError } = useFaqs()

  useEffect(() => {
    if (window.location.hash === '#faq' && faqRef.current) {
      setTimeout(() => {
        faqRef.current?.scrollIntoView({ behavior: 'smooth' })
        faqRef.current?.focus()
      }, 100)
    }
  }, [])

  const isLoading = aboutLoading || faqsLoading
  const error = aboutError || faqsError

  return (
    <main>
      <SEO
        title={t('about.page.title')}
        description={t('about.page.description')}
        keywords={t('about.page.keywords')}
        image="/img/about-og-image.jpg"
        url="/about"
        type="website"
        tags={t('about.page.tags', { returnObjects: true }) as string[]}
      />
      <DataLoadingState isLoading={isLoading} error={error}>
        <MissionSection />
        <ProgramSection />
        <TeamSection />
        {aboutData?.contact && <ContactSection data={aboutData.contact} />}
        <Box ref={faqRef} tabIndex={-1}>
          <FaqsSection faqs={faqs ?? []} />
        </Box>
      </DataLoadingState>
    </main>
  )
}
