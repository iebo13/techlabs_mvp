import React, { useState } from 'react'
import { Alert, Box, Button, Container, Grid, Tab, Tabs, Typography } from '@mui/material'
import { useI18n } from '@/hooks'
import eventsData from '@/mocks/events.json'
import { EventCard, type Event } from '../components/EventCard'

type EventType = 'upcoming' | 'past' | 'all'

const EVENTS_PER_PAGE = 6

export const EventsPage: React.FC = () => {
  const { t } = useI18n()
  const [selectedTab, setSelectedTab] = useState<EventType>('all')
  const [visibleCount, setVisibleCount] = useState(EVENTS_PER_PAGE)

  const filteredEvents = (() => {
    if (selectedTab === 'all') {
      return eventsData.events as Event[]
    }

    return (eventsData.events as Event[]).filter(event => event.type === selectedTab)
  })()

  const sortedEvents = (() => {
    return [...filteredEvents].sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)

      if (selectedTab === 'past') {
        return dateB.getTime() - dateA.getTime()
      }

      return dateA.getTime() - dateB.getTime()
    })
  })()

  const visibleEvents = sortedEvents.slice(0, visibleCount)
  const hasMoreEvents = visibleCount < sortedEvents.length

  const handleTabChange = (_: React.SyntheticEvent, newValue: EventType) => {
    setSelectedTab(newValue)
    setVisibleCount(EVENTS_PER_PAGE)
  }

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + EVENTS_PER_PAGE, sortedEvents.length))
  }

  const getTabLabel = (type: EventType) => {
    const events = eventsData.events as Event[]

    switch (type) {
      case 'upcoming':
        return t('events.tabs.upcoming', { count: events.filter(e => e.type === 'upcoming').length })
      case 'past':
        return t('events.tabs.past', { count: events.filter(e => e.type === 'past').length })
      default:
        return t('events.tabs.all', { count: events.length })
    }
  }

  return (
    <main id="main-content" tabIndex={-1}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              lineHeight: 1.2,
              color: 'text.primary',
            }}>
            {t('events.page.title')}
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{
              fontWeight: 400,
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.4,
            }}>
            {t('events.page.subtitle')}
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="fullWidth"
            aria-label={t('events.tabs.ariaLabel')}
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
            <Tab value="all" label={getTabLabel('all')} id="events-tab-all" aria-controls="events-tabpanel" />
            <Tab
              value="upcoming"
              label={getTabLabel('upcoming')}
              id="events-tab-upcoming"
              aria-controls="events-tabpanel"
            />
            <Tab value="past" label={getTabLabel('past')} id="events-tab-past" aria-controls="events-tabpanel" />
          </Tabs>
        </Box>

        <Box id="events-tabpanel" role="tabpanel" aria-labelledby={`events-tab-${selectedTab}`} aria-live="polite">
          {visibleEvents.length === 0 ? (
            <Alert severity="info" sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" gutterBottom>
                {t('events.emptyState.title')}
              </Typography>
              <Typography variant="body1">
                {selectedTab === 'upcoming'
                  ? t('events.emptyState.upcomingMessage')
                  : t('events.emptyState.pastMessage')}
              </Typography>
            </Alert>
          ) : (
            <>
              <Grid container spacing={3} sx={{ mb: 4 }}>
                {visibleEvents.map(event => (
                  <Grid key={event.id} size={{ xs: 12, sm: 6, md: 4 }}>
                    <EventCard event={event} />
                  </Grid>
                ))}
              </Grid>

              {hasMoreEvents && (
                <Box sx={{ textAlign: 'center' }}>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={handleLoadMore}
                    aria-label={t('events.page.loadMoreAriaLabel', { count: sortedEvents.length - visibleCount })}
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: '28px',
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '1rem',
                    }}>
                    {t('events.page.loadMore')}
                  </Button>
                </Box>
              )}
            </>
          )}
        </Box>

        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom color="text.secondary">
            {t('events.hostEvent.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {t('events.hostEvent.description')}
          </Typography>
          <Button
            variant="contained"
            size="large"
            href="/about#contact"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: '28px',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem',
            }}>
            {t('events.hostEvent.cta')}
          </Button>
        </Box>
      </Container>
    </main>
  )
}
