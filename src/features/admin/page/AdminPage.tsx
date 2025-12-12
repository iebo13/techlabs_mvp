/**
 * AdminPage component
 * Main admin dashboard with tabs for managing Events and Blog Posts
 */

import React, { useState } from 'react'
import { Box, Container, Tab, Tabs, Paper, Alert } from '@mui/material'
import { Dashboard as DashboardIcon, Event as EventIcon, Article as ArticleIcon } from '@mui/icons-material'
import { AdminProvider } from '../contexts'
import { AdminHeader, AdminDashboard } from '../components'
import { BlogPostsTab } from './BlogPostsTab'
import { EventsTab } from './EventsTab'

type TabValue = 'dashboard' | 'events' | 'blog'

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
  const [currentTab, setCurrentTab] = useState<TabValue>('dashboard')

  const handleTabChange = (_: React.SyntheticEvent, newValue: TabValue): void => {
    setCurrentTab(newValue)
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <AdminHeader />

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Alert severity="success" sx={{ mb: 3 }}>
          ✅ Connected to backend API - All changes are now persisted to the database.
        </Alert>

        <Paper elevation={2} sx={{ mb: 3 }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            aria-label="Admin management tabs"
            sx={{
              px: 2,
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                minHeight: 64,
              },
            }}>
            <Tab icon={<DashboardIcon />} iconPosition="start" value="dashboard" label="Dashboard" {...a11yProps('dashboard')} />
            <Tab icon={<EventIcon />} iconPosition="start" value="events" label="Events" {...a11yProps('events')} />
            <Tab icon={<ArticleIcon />} iconPosition="start" value="blog" label="Blog Posts" {...a11yProps('blog')} />
          </Tabs>
        </Paper>

        <TabPanel value={currentTab} index="dashboard">
          <AdminDashboard />
        </TabPanel>

        <TabPanel value={currentTab} index="events">
          <EventsTab />
        </TabPanel>

        <TabPanel value={currentTab} index="blog">
          <BlogPostsTab />
        </TabPanel>
      </Container>
    </Box>
  )
}

export const AdminPage: React.FC = () => {
  return (
    <AdminProvider>
      <AdminPageContent />
    </AdminProvider>
  )
}
