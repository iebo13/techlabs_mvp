import React, { useState } from 'react'
import { Box, Container, Tab, Tabs, Typography } from '@mui/material'
import { BlogPostsTab } from './BlogPostsTab'
import { EventsTab } from './EventsTab'

type TabValue = 'events' | 'blog'

type TabPanelProps = {
  readonly children: React.ReactNode
  readonly value: TabValue
  readonly index: TabValue
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      sx={{ py: 3 }}>
      {value === index && children}
    </Box>
  )
}

const a11yProps = (index: TabValue): Record<string, string> => ({
  id: `admin-tab-${index}`,
  'aria-controls': `admin-tabpanel-${index}`,
})

const AdminPageContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<TabValue>('events')

  const handleTabChange = (_: React.SyntheticEvent, newValue: TabValue): void => {
    setCurrentTab(newValue)
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: 'text.primary' }}>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage events and blog posts for the TechLabs website.
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="Admin management tabs"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem',
            },
          }}>
          <Tab value="events" label="Events" {...a11yProps('events')} />
          <Tab value="blog" label="Blog Posts" {...a11yProps('blog')} />
        </Tabs>
      </Box>

      <TabPanel value={currentTab} index="events">
        <EventsTab />
      </TabPanel>

      <TabPanel value={currentTab} index="blog">
        <BlogPostsTab />
      </TabPanel>
    </Container>
  )
}

export const AdminPage: React.FC = () => {
  return (
    <AdminPageContent />
  )
}
