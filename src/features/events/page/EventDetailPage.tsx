import React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Button, Container, Grid, List, ListItem, ListItemText, Stack, Typography } from '@mui/material'
import { CTAButton } from '@/components/Buttons'
import { DataLoadingState, LazyIntersection, Section, SectionHeading, SEO } from '@/components/Layouts'
import { useI18n } from '@/hooks'
import { EventDetailHero } from '../components/EventDetailHero'
import { EventDetailSidebar } from '../components/EventDetailSidebar'
import { useEventBySlug } from '../hooks/useEvents'

export const EventDetailPage: React.FC = () => {
  const { eventSlug } = useParams<{ eventSlug: string }>()
  const { t } = useI18n()
  const { data: event, isLoading, error } = useEventBySlug(eventSlug ?? '')

  if (isLoading) {
    return (
      <DataLoadingState isLoading error={null}>
        {null}
      </DataLoadingState>
    )
  }

  if (error || !event) {
    return (
      <Section sx={{ py: 12, textAlign: 'center' }}>
        <SectionHeading level={2} emphasis="primary">
          {t('events.detail.notFound')}
        </SectionHeading>
        <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 480, mx: 'auto' }}>
          {t('events.detail.notFoundMessage')}
        </Typography>
        <CTAButton to="/events">{t('events.detail.backToEvents')}</CTAButton>
      </Section>
    )
  }

  const canonicalUrl = `/events/${eventSlug}`

  return (
    <Box>
      <SEO
        title={`${event.title} — TechLabs Events`}
        description={event.blurb}
        keywords={`${event.title}, ${event.location}, TechLabs, event, workshop`}
        image={event.imageUrl}
        url={canonicalUrl}
        type="article"
        publishedTime={event.date}
        section={event.type === 'upcoming' ? 'Upcoming' : 'Past'}
        tags={[event.location, event.type]}
      />

      <EventDetailHero event={event} />

      <Section component="article" sx={{ py: { xs: 4, md: 6 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 3, md: 4 }}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Box>
                  <Typography variant="h5" component="h2" color="primary.main" sx={{ fontWeight: 800, mb: 2 }}>
                    {t('events.detail.about')}
                  </Typography>
                  {event.description.map(paragraph => (
                    <Typography key={paragraph} variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.7 }}>
                      {paragraph}
                    </Typography>
                  ))}
                </Box>

                {event.highlights && event.highlights.length > 0 && (
                  <LazyIntersection minHeight={120}>
                    <Box>
                      <Typography variant="h5" component="h2" color="primary.main" sx={{ fontWeight: 800, mb: 2 }}>
                        {t('events.detail.highlights')}
                      </Typography>
                      <List
                        dense
                        sx={{ listStyleType: 'disc', pl: 2, '& .MuiListItem-root': { display: 'list-item' } }}>
                        {event.highlights.map(item => (
                          <ListItem key={item} disablePadding sx={{ display: 'list-item', py: 0.5 }}>
                            <ListItemText
                              primary={item}
                              primaryTypographyProps={{ variant: 'body1', color: 'text.secondary' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </LazyIntersection>
                )}

                {event.agenda && event.agenda.length > 0 && (
                  <LazyIntersection minHeight={160}>
                    <Box>
                      <Typography variant="h5" component="h2" color="primary.main" sx={{ fontWeight: 800, mb: 2 }}>
                        {t('events.detail.agenda')}
                      </Typography>
                      <Stack spacing={1.5}>
                        {event.agenda.map(row => (
                          <Box
                            key={`${row.time}-${row.title}`}
                            sx={{
                              display: 'flex',
                              gap: 2,
                              flexWrap: 'wrap',
                              alignItems: 'baseline',
                              py: 1,
                              borderBottom: '1px solid',
                              borderColor: 'divider',
                            }}>
                            <Typography
                              variant="subtitle2"
                              sx={{ minWidth: 88, fontWeight: 700, color: 'primary.main' }}>
                              {row.time}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                              {row.title}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>
                    </Box>
                  </LazyIntersection>
                )}
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <EventDetailSidebar event={event} />
            </Grid>
          </Grid>
        </Container>
      </Section>

      <Section sx={{ py: 6, textAlign: 'center', bgcolor: 'background.default' }}>
        <Container maxWidth="md">
          <Typography variant="h6" gutterBottom color="primary.main">
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
        </Container>
      </Section>
    </Box>
  )
}

EventDetailPage.displayName = 'EventDetailPage'
