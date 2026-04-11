import React from 'react'
import {
  ArrowDownward as ArrowDownIcon,
  Business as BusinessIcon,
  Label as LabelIcon,
  LocationOn as LocationIcon,
  School as SchoolIcon,
} from '@mui/icons-material'
import { Avatar, Box, Card, CardContent, Chip, Divider, Stack, Typography } from '@mui/material'
import { CTAButton } from '@/components/Buttons'
import { useI18n } from '@/hooks'
import type { Story } from '../types/stories.types'

type StoryProfileCardProps = {
  readonly story: Story
}

type InfoRowProps = {
  readonly icon: React.ReactNode
  readonly label: string
  readonly value: string
}

const InfoRow: React.FC<InfoRowProps> = ({ icon, label, value }) => (
  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
    <Box sx={{ color: 'primary.main', mt: 0.2, flexShrink: 0, lineHeight: 0 }}>{icon}</Box>
    <Box>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.3 }}>
        {label}
      </Typography>
      <Typography variant="body2" fontWeight={600}>
        {value}
      </Typography>
    </Box>
  </Box>
)

export const StoryProfileCard: React.FC<StoryProfileCardProps> = ({ story }) => {
  const { t } = useI18n()
  const displayName = story.name ?? story.title

  return (
    <Box sx={{ position: { md: 'sticky' }, top: { md: 88 } }}>
      <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, overflow: 'hidden' }}>
        <Box sx={{ height: 6, bgcolor: 'primary.main' }} />

        <CardContent sx={{ p: 3 }}>
          {/* Identity */}
          <Stack spacing={1.5} alignItems="center" textAlign="center" sx={{ mb: 3 }}>
            <Avatar
              src={story.imageUrl}
              alt={displayName}
              sx={{ width: 96, height: 96, border: '3px solid', borderColor: 'primary.light', boxShadow: 2 }}
            />
            <Box sx={{ maxWidth: '100%', overflow: 'hidden' }}>
              <Typography variant="h6" fontWeight={700} sx={{ lineHeight: 1.25, mb: 0.5, wordBreak: 'break-word' }}>
                {displayName}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'break-word' }}>
                {story.currentRole}
              </Typography>
            </Box>
            <Chip label={story.trackLabel} size="small" color="primary" variant="outlined" icon={<LabelIcon />} />
          </Stack>

          <Divider sx={{ mb: 2.5 }} />

          {/* Before → After journey mini-visual */}
          {story.beforeRole && (
            <>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5, mb: 2.5 }}>
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    bgcolor: 'grey.100',
                    textAlign: 'center',
                    width: '100%',
                  }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                    {t('common:stories.detail.before')}
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {story.beforeRole}
                  </Typography>
                </Box>

                <ArrowDownIcon sx={{ color: 'primary.main', fontSize: 20 }} />

                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    border: '2px solid',
                    borderColor: 'primary.main',
                    textAlign: 'center',
                    width: '100%',
                  }}>
                  <Typography variant="caption" color="primary.main" sx={{ display: 'block', fontWeight: 600 }}>
                    {t('common:stories.detail.after')}
                  </Typography>
                  <Typography variant="body2" fontWeight={700} color="primary.main">
                    {story.currentRole}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ mb: 2.5 }} />
            </>
          )}

          {/* Info rows */}
          <Stack spacing={2} sx={{ mb: 3 }}>
            <InfoRow
              icon={<LocationIcon fontSize="small" />}
              label={t('common:stories.detail.location')}
              value={story.location}
            />
            <InfoRow
              icon={<SchoolIcon fontSize="small" />}
              label={t('common:stories.detail.graduated')}
              value={story.graduationDate}
            />
            <InfoRow
              icon={<BusinessIcon fontSize="small" />}
              label={t('common:stories.detail.company')}
              value={story.company}
            />
          </Stack>

          <Divider sx={{ mb: 2.5 }} />

          <CTAButton to="/tracks" fullWidth>
            {t('common:navigation.cta.startLearning')}
          </CTAButton>
        </CardContent>
      </Card>
    </Box>
  )
}

StoryProfileCard.displayName = 'StoryProfileCard'
