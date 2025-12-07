import React from 'react'
import { Box, Skeleton } from '@mui/material'
import { useI18n } from '@/hooks'
import { Section } from '../sections/Section'

type SectionSkeletonProps = {
  height?: number
  padding?: number
}

type GridSkeletonProps = {
  items?: number
  itemHeight?: number
  columns?: { xs?: number; sm?: number; md?: number; lg?: number }
  gap?: number
}

type CarouselSkeletonProps = {
  cards?: number
  cardHeight?: number
  padding?: number
}

export const SectionSkeleton: React.FC<SectionSkeletonProps> = ({ height = 200, padding = 4 }) => {
  const { t } = useI18n()

  return (
    <Section>
      <Box sx={{ py: padding }} role="status" aria-label={t('common.loadingContent')}>
        <Skeleton variant="rectangular" height={height} sx={{ borderRadius: 2 }} aria-hidden="true" />
      </Box>
    </Section>
  )
}

export const CarouselSkeleton: React.FC<CarouselSkeletonProps> = ({ cards = 3, cardHeight = 300, padding = 4 }) => {
  const { t } = useI18n()

  return (
    <Section>
      <Box
        sx={{ py: padding, display: 'flex', gap: 2, overflow: 'hidden' }}
        role="status"
        aria-label={t('common.loadingCards', { count: cards })}>
        {Array.from({ length: cards }, (_, i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            height={cardHeight}
            sx={{ flex: 1, borderRadius: 2, minWidth: 200 }}
            aria-hidden="true"
          />
        ))}
      </Box>
    </Section>
  )
}

export const GridSkeleton: React.FC<GridSkeletonProps> = ({
  items = 6,
  itemHeight = 200,
  columns = { xs: 1, sm: 2, md: 3 },
  gap = 2,
}) => {
  const { t } = useI18n()

  return (
    <Section>
      <Box sx={{ py: 4 }} role="status" aria-label={t('common.loadingItems', { count: items })}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: `repeat(${columns.xs || 1}, 1fr)`,
              sm: `repeat(${columns.sm || 2}, 1fr)`,
              md: `repeat(${columns.md || 3}, 1fr)`,
              lg: `repeat(${columns.lg || columns.md || 3}, 1fr)`,
            },
            gap,
          }}>
          {Array.from({ length: items }, (_, i) => (
            <Skeleton key={i} variant="rectangular" height={itemHeight} sx={{ borderRadius: 2 }} aria-hidden="true" />
          ))}
        </Box>
      </Box>
    </Section>
  )
}
