import React, { lazy } from 'react'
import { DataLoadingState, LazyIntersection, SEO, SectionSkeleton } from '@/components/Layouts'
import { useI18n } from '@/hooks'
import { PartnersHero } from '../components/PartnersHero'
import { usePartnerFaqs } from '../hooks/usePartnerFaqs'
import { usePartnerImpactMetrics } from '../hooks/usePartnerImpactMetrics'
import { usePartners } from '../hooks/usePartners'
import { usePartnerTestimonials } from '../hooks/usePartnerTestimonials'

const PartnersGrid = lazy(() => import('../components/PartnersGrid').then(m => ({ default: m.PartnersGrid })))
const ImpactBand = lazy(() => import('../components/ImpactBand').then(m => ({ default: m.ImpactBand })))
const WhyPartnerSection = lazy(() =>
  import('../components/WhyPartnerSection').then(m => ({ default: m.WhyPartnerSection }))
)
const PartnershipModelsSection = lazy(() =>
  import('../components/PartnershipModelsSection').then(m => ({ default: m.PartnershipModelsSection }))
)
const PartnerTestimonialsSection = lazy(() =>
  import('../components/PartnerTestimonialsSection').then(m => ({ default: m.PartnerTestimonialsSection }))
)
const PartnerFaqSection = lazy(() =>
  import('../components/PartnerFaqSection').then(m => ({ default: m.PartnerFaqSection }))
)
const PartnerCTA = lazy(() => import('../components/PartnerCta').then(m => ({ default: m.PartnerCTA })))

export const PartnersPage: React.FC = () => {
  const { t } = useI18n()
  const { data: partners, isLoading: partnersLoading, error: partnersError } = usePartners()
  const { data: testimonials } = usePartnerTestimonials()
  const { data: faqs } = usePartnerFaqs()
  const { data: impactMetrics } = usePartnerImpactMetrics()

  return (
    <main>
      <SEO title={t('partners.title')} description={t('partners.description')} url="/partners" type="website" />

      <PartnersHero />

      <DataLoadingState isLoading={partnersLoading} error={partnersError}>
        <LazyIntersection fallback={<SectionSkeleton height={400} />} minHeight={400}>
          <PartnersGrid partners={partners ?? []} />
        </LazyIntersection>
      </DataLoadingState>

      {impactMetrics && impactMetrics.length > 0 && (
        <LazyIntersection fallback={<SectionSkeleton height={200} />} minHeight={200}>
          <ImpactBand metrics={impactMetrics} />
        </LazyIntersection>
      )}

      <LazyIntersection fallback={<SectionSkeleton height={400} />} minHeight={400}>
        <WhyPartnerSection />
      </LazyIntersection>

      <LazyIntersection fallback={<SectionSkeleton height={400} />} minHeight={400}>
        <PartnershipModelsSection />
      </LazyIntersection>

      {testimonials && testimonials.length > 0 && (
        <LazyIntersection fallback={<SectionSkeleton height={300} />} minHeight={300}>
          <PartnerTestimonialsSection testimonials={testimonials} />
        </LazyIntersection>
      )}

      {faqs && faqs.length > 0 && (
        <LazyIntersection fallback={<SectionSkeleton height={400} />} minHeight={400}>
          <PartnerFaqSection faqs={faqs} />
        </LazyIntersection>
      )}

      <LazyIntersection fallback={<SectionSkeleton height={300} />} minHeight={300}>
        <PartnerCTA />
      </LazyIntersection>
    </main>
  )
}
