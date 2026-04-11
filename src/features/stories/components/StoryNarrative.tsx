import React from 'react'
import { Box, Typography } from '@mui/material'
import { SectionHeading } from '@/components/Layouts'
import { useI18n } from '@/hooks'
import type { StoryNarrative as StoryNarrativeType } from '../types/stories.types'

type StoryNarrativeProps = {
  readonly narrative?: StoryNarrativeType
  readonly fallbackDescription?: string
}

type NarrativeSectionProps = {
  readonly titleKey: string
  readonly content: string
  readonly emphasis?: 'primary' | 'secondary' | 'gradient'
}

const NarrativeSection: React.FC<NarrativeSectionProps> = ({ titleKey, content, emphasis }) => {
  const { t } = useI18n()

  return (
    <Box>
      <SectionHeading level={3} emphasis={emphasis} sx={{ mb: 2 }}>
        {t(titleKey)}
      </SectionHeading>
      <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.85, fontSize: '1.05rem' }}>
        {content}
      </Typography>
    </Box>
  )
}

export const StoryNarrative: React.FC<StoryNarrativeProps> = ({ narrative, fallbackDescription }) => {
  const { t } = useI18n()

  if (!narrative) {
    return (
      <Box>
        <SectionHeading level={3} emphasis="primary" sx={{ mb: 2 }}>
          {t('common:stories.detail.theirStory')}
        </SectionHeading>
        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.85, fontSize: '1.05rem' }}>
          {fallbackDescription}
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <NarrativeSection
        titleKey="common:stories.detail.theChallenge"
        content={narrative.challenge}
        emphasis="primary"
      />
      <NarrativeSection titleKey="common:stories.detail.discoveringTechLabs" content={narrative.discovery} />
      <NarrativeSection
        titleKey="common:stories.detail.theExperience"
        content={narrative.experience}
        emphasis="primary"
      />
      <NarrativeSection titleKey="common:stories.detail.theBreakthrough" content={narrative.transformation} />
      <NarrativeSection
        titleKey="common:stories.detail.whereTheyAreNow"
        content={narrative.outcome}
        emphasis="primary"
      />
    </Box>
  )
}

StoryNarrative.displayName = 'StoryNarrative'
