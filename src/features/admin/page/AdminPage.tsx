/**
 * AdminPage component
 * Main admin dashboard with tabs for managing Events and Blog Posts
 */

import React, { useState } from 'react'
import LogoutIcon from '@mui/icons-material/Logout'
import RefreshIcon from '@mui/icons-material/Refresh'
import { Alert, Box, Button, Chip, Container, Tab, Tabs, Typography } from '@mui/material'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { AdminProvider, useAdmin } from '../contexts'
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
  const { state, refresh, clearError } = useAdmin()
  const { user, signOut } = useAuth()

  const handleTabChange = (_: React.SyntheticEvent, newValue: TabValue): void => {
    setCurrentTab(newValue)
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2,
            flexWrap: 'wrap',
          }}>
          <Box>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: 'text.primary' }}>
              Admin Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage events and blog posts for the TechLabs website.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {user?.email ? <Chip label={user.email} variant="outlined" /> : null}
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={() => {
                void refresh()
              }}>
              Refresh
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={() => {
                void signOut()
              }}>
              Sign out
            </Button>
          </Box>
        </Box>
      </Box>

      {state.error ? (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          onClose={clearError}
          action={
            <Button
              color="inherit"
              size="small"
              startIcon={<RefreshIcon />}
              onClick={() => {
                void refresh()
              }}>
              Retry
            </Button>
          }>
          {state.error}
        </Alert>
      ) : null}

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
    <AdminProvider>
      <AdminPageContent />
    </AdminProvider>
  )
}
