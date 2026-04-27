import React from 'react'
import { Box, Container, Stack, Typography } from '@mui/material'
import { Section, SectionHeading } from '@/components/Layouts'
import { StoryPullQuote } from '@/features/stories/components/StoryPullQuote'
import { useI18n } from '@/hooks'
import { TimelineItem } from './TimelineItem'

const MILESTONE_COUNT = 6

export const OurStorySection: React.FC = () => {
  const { t } = useI18n()

  const bodyParagraphs = t('about.storySection.body').split('\n').filter(Boolean)

  const milestones = Array.from({ length: MILESTONE_COUNT }, (_, i) => ({
    year: t(`about.storySection.milestones.${i}.year`),
    title: t(`about.storySection.milestones.${i}.title`),
    description: t(`about.storySection.milestones.${i}.description`),
  }))

  return (
    <Section variant="paper" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md">
        <Stack spacing={4}>
          <SectionHeading level={2}>{t('about.storySection.title')}</SectionHeading>

          <Typography
            variant="body1"
            sx={{ fontSize: '1.15rem', fontWeight: 500, lineHeight: 1.7, color: 'text.primary' }}>
            {t('about.storySection.hook')}
          </Typography>

          {bodyParagraphs.map(paragraph => (
            <Typography
              key={paragraph.slice(0, 40)}
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 1.8, fontSize: '1.05rem' }}>
              {paragraph}
            </Typography>
          ))}
        </Stack>
      </Container>

      {/* Journey Timeline */}
      <Container maxWidth="md" sx={{ mt: { xs: 6, md: 8 } }}>
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{ mb: { xs: 4, md: 5 }, textAlign: { xs: 'left', md: 'center' } }}>
          {t('about.storySection.timelineTitle')}
        </Typography>

        <Box sx={{ position: 'relative' }}>
          {/* Vertical connecting line */}
          <Box
            sx={{
              position: 'absolute',
              left: { xs: '5px', md: '50%' },
              top: 0,
              bottom: 0,
              width: 2,
              bgcolor: 'divider',
              transform: { xs: 'none', md: 'translateX(-50%)' },
            }}
          />

          {milestones.map((milestone, index) => (
            <TimelineItem
              key={milestone.year}
              year={milestone.year}
              title={milestone.title}
              description={milestone.description}
              index={index}
              isLast={index === milestones.length - 1}
            />
          ))}
        </Box>
      </Container>

      <Container maxWidth="md" sx={{ mt: { xs: 4, md: 6 } }}>
        <StoryPullQuote
          quote={t('about.storySection.quote.text')}
          attribution={t('about.storySection.quote.name')}
          role={t('about.storySection.quote.role')}
        />
      </Container>
    </Section>
  )
}

OurStorySection.displayName = 'OurStorySection'
