import React from 'react'
import { Section, SectionHeading } from '@/components/Layouts'

export const CareersPage: React.FC = () => (
  <main>
    <Section>
      <SectionHeading level={1} centered>
        Join our team
      </SectionHeading>
      <p>Careers page placeholder</p>
    </Section>
  </main>
)

export const PrivacyPage: React.FC = () => (
  <main>
    <Section>
      <SectionHeading level={1} centered>
        Privacy Policy
      </SectionHeading>
      <p>Privacy Policy page placeholder - will contain data protection information</p>
    </Section>
  </main>
)

export const ImprintPage: React.FC = () => (
  <main>
    <Section>
      <SectionHeading level={1} centered>
        Imprint
      </SectionHeading>
      <p>Imprint page placeholder - will contain legal information</p>
    </Section>
  </main>
)

CareersPage.displayName = 'CareersPage'
PrivacyPage.displayName = 'PrivacyPage'
ImprintPage.displayName = 'ImprintPage'
