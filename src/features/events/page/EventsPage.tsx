import React, { useMemo, useState } from 'react'
import { Box, Button, Grid, Stack, Tab, Tabs, Typography, useMediaQuery, useTheme } from '@mui/material'
import { CTAButton } from '@/components/Buttons'
import { DataLoadingState, Section } from '@/components/Layouts'
import { useI18n } from '@/hooks'
import { EventCard } from '../components/EventCard'
import { useEvents } from '../hooks/useEvents'
import type { Event } from '../types/events.types'

type EventTypeFilter = 'all' | 'past' | 'upcoming'

const MOBILE_PAGE_SIZE = 4

export const EventsPage: React.FC = () => {
  const theme = useTheme()
  const { t } = useI18n()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { data: eventsRaw, isLoading, error } = useEvents()

  const allEvents = useMemo(() => eventsRaw ?? [], [eventsRaw])

  const [selectedType, setSelectedType] = useState<EventTypeFilter>('all')
  const [mobileVisibleCount, setMobileVisibleCount] = useState(MOBILE_PAGE_SIZE)

  const getTabLabel = (type: EventTypeFilter) => {
    switch (type) {
      case 'upcoming':
        return t('events.tabs.upcoming', { count: allEvents.filter(e => e.type === 'upcoming').length })
      case 'past':
        return t('events.tabs.past', { count: allEvents.filter(e => e.type === 'past').length })
      default:
        return t('events.tabs.all', { count: allEvents.length })
    }
  }

  // eslint-disable-next-line no-restricted-syntax
  const filteredSortedEvents = useMemo(() => {
    const byDateAsc = (a: Event, b: Event) => new Date(a.date).getTime() - new Date(b.date).getTime()
    const byDateDesc = (a: Event, b: Event) => new Date(b.date).getTime() - new Date(a.date).getTime()

    if (selectedType === 'all') {
      const upcoming = allEvents.filter(e => e.type === 'upcoming').sort(byDateAsc)
      const past = allEvents.filter(e => e.type === 'past').sort(byDateDesc)

      return [...upcoming, ...past]
    }

    const list = allEvents.filter(e => e.type === selectedType)

    list.sort(selectedType === 'past' ? byDateDesc : byDateAsc)

    return list
  }, [selectedType, allEvents])

  const visibleEvents = isMobile ? filteredSortedEvents.slice(0, mobileVisibleCount) : filteredSortedEvents
  const hasMoreEvents = isMobile && mobileVisibleCount < filteredSortedEvents.length

  const handleTabChange = (_: React.SyntheticEvent, newValue: EventTypeFilter) => {
    setSelectedType(newValue)
    setMobileVisibleCount(MOBILE_PAGE_SIZE)
  }

  const handleShowMore = () => {
    setMobileVisibleCount(prev => prev + MOBILE_PAGE_SIZE)
  }

  const selectedFilterLabel =
    selectedType === 'all'
      ? undefined
      : selectedType === 'upcoming'
        ? t('events.filter.upcoming')
        : t('events.filter.past')

  const emptyMessage = (() => {
    if (selectedType === 'upcoming') {
      return t('events.emptyState.upcomingMessage')
    }

    if (selectedType === 'past') {
      return t('events.emptyState.pastMessage')
    }

    return t('events.noEvents')
  })()

  return (
    <DataLoadingState isLoading={isLoading} error={error}>
      <Section sx={{ py: { xs: 4, md: 6 } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            px: { xs: 1, md: 0 },
            maxWidth: '720px',
            textAlign: 'center',
            mx: 'auto',
          }}>
          <Typography component="h1" variant="h2" sx={{ color: 'primary.main' }}>
            {t('events.page.title')}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 2, pb: 2, fontSize: '1.125rem', lineHeight: 1.6 }}>
            {t('events.page.subtitle')}
          </Typography>
        </Box>

        <Stack spacing={4}>
          <Box>
            <Tabs
              value={selectedType}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                '& .MuiTab-root': {
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  minHeight: '56px',
                },
                '& .Mui-selected': {
                  color: 'primary.main',
                },
              }}>
              <Tab value="all" label={getTabLabel('all')} />
              <Tab value="upcoming" label={getTabLabel('upcoming')} />
              <Tab value="past" label={getTabLabel('past')} />
            </Tabs>
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              {t('events.page.showingCount', {
                count: visibleEvents.length,
                total: filteredSortedEvents.length,
              })}
              {selectedType !== 'all' && selectedFilterLabel
                ? ` ${t('events.page.inFilter', { label: selectedFilterLabel })}`
                : ''}
            </Typography>
          </Box>

          <Grid container spacing={3} px={{ xs: 2, md: 4 }}>
            {visibleEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </Grid>

          {hasMoreEvents && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button variant="text" sx={{ textDecoration: 'underline' }} onClick={handleShowMore}>
                {t('events.page.showMore')}
              </Button>
            </Box>
          )}

          {filteredSortedEvents.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {t('events.emptyState.title')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {emptyMessage}
              </Typography>
            </Box>
          )}

          <Box sx={{ px: 2 }}>
            <CTAButton to="/about#contact" fullWidth sx={{ borderRadius: 0.5 }}>
              {t('events.hostEvent.cta')}
            </CTAButton>
          </Box>
        </Stack>
      </Section>
    </DataLoadingState>
  )
}
