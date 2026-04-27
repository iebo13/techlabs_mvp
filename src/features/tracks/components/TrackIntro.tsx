import React from 'react'
import { Stack, Typography } from '@mui/material'
import { SectionHeading } from '@/components/Layouts'
import { useI18n } from '@/hooks'

type TrackIntroProps = {
  readonly paragraphs: string[]
}

export const TrackIntro: React.FC<TrackIntroProps> = ({ paragraphs }) => {
  const { t } = useI18n()

  return (
    <Stack spacing={2}>
      <SectionHeading level={2} emphasis="primary">
        {t('tracks.detail.sections.intro.title')}
      </SectionHeading>
      {paragraphs.map(paragraph => (
        <Typography
          key={paragraph.slice(0, 32)}
          variant="body1"
          color="text.primary"
          sx={{ lineHeight: 1.7, fontSize: '1.0625rem' }}>
          {paragraph}
        </Typography>
      ))}
    </Stack>
  )
}

TrackIntro.displayName = 'TrackIntro'
