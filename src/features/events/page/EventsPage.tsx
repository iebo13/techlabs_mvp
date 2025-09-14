import React, { useState } from 'react'
import { Alert, Box, Button, Container, Grid, Tab, Tabs, Typography } from '@mui/material'
import eventsData from '@/mocks/events.json'
import { EventCard, type Event } from '../components/EventCard'

type EventType = 'upcoming' | 'past' | 'all'

const EVENTS_PER_PAGE = 6

export const EventsPage: React.FC = () => {
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
        return `Upcoming (${events.filter(e => e.type === 'upcoming').length})`
      case 'past':
        return `Past (${events.filter(e => e.type === 'past').length})`
      default:
        return `All Events (${events.length})`
    }
  }

  return (
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
          TechLabs Events
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
          Join our community events, workshops, and networking opportunities
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Tabs
          value={selectedTab}
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

      {visibleEvents.length === 0 ? (
        <Alert severity="info" sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" gutterBottom>
            No events found
          </Typography>
          <Typography variant="body1">
            {selectedTab === 'upcoming'
              ? 'Check back soon for upcoming events!'
              : 'No past events available at the moment.'}
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
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: '28px',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                }}>
                Load More Events
              </Button>
            </Box>
          )}
        </>
      )}

      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom color="text.secondary">
          Want to host an event?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Partner with us to create meaningful learning experiences for our community.
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
          Get in Touch
        </Button>
      </Box>
    </Container>
  )
}
