import React from 'react'
import { Grid, Card, CardContent, Typography, Box } from '@mui/material'
import { Event, Article, TrendingUp, People } from '@mui/icons-material'
import { useAdmin } from '../contexts'

type StatCardProps = {
  readonly title: string
  readonly value: number
  readonly icon: React.ReactNode
  readonly color: string
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => (
  <Card elevation={2}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 1 }}>
            {value}
          </Typography>
        </Box>
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            bgcolor: `${color}.light`,
            color: `${color}.main`,
          }}>
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
)

export const AdminDashboard: React.FC = () => {
  const { state } = useAdmin()

  const stats = [
    {
      title: 'Total Events',
      value: state.events.length,
      icon: <Event />,
      color: 'primary',
    },
    {
      title: 'Blog Posts',
      value: state.blogPosts.length,
      icon: <Article />,
      color: 'success',
    },
    {
      title: 'Published Posts',
      value: state.blogPosts.filter(p => p.status === 'published').length,
      icon: <TrendingUp />,
      color: 'info',
    },
    {
      title: 'Upcoming Events',
      value: state.events.filter(e => new Date(e.date) > new Date()).length,
      icon: <People />,
      color: 'warning',
    },
  ]

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Card elevation={2}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              Quick Actions
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Select a tab above to manage events or blog posts.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}
