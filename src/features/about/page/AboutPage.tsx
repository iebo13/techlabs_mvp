import React, { useEffect, useRef } from 'react'
import { Box } from '@mui/material'
import { DataLoadingState, LazyIntersection, SEO } from '@/components/Layouts'
import { useI18n } from '@/hooks'
import {
  AboutHero,
  ContactSection,
  FaqsSection,
  JoinUsSection,
  MissionSection,
  OurApproachSection,
  OurStorySection,
  ProgramSection,
  TeamSection,
} from '../components'
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
        <AboutHero />
        <OurApproachSection />
        <LazyIntersection>
          <OurStorySection />
        </LazyIntersection>
        <LazyIntersection>
          <MissionSection />
        </LazyIntersection>
        <LazyIntersection>
          <ProgramSection />
        </LazyIntersection>
        <LazyIntersection>
          <TeamSection members={aboutData?.team.members ?? []} />
        </LazyIntersection>
        <JoinUsSection />
        <Box ref={faqRef} tabIndex={-1}>
          <FaqsSection faqs={faqs ?? []} />
        </Box>
        {aboutData?.contact && <ContactSection data={aboutData.contact} />}
      </DataLoadingState>
    </main>
  )
}
