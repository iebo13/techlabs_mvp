import React, { useState, useEffect } from 'react'
import { ExpandMore, ExpandLess } from '@mui/icons-material'
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Collapse,
  Stack,
  Grid,
  useTheme,
} from '@mui/material'

export type Track = {
  id: string
  label: string
  description: string
  duration: string
  format: string
  skills: string[]
  projects: string[]
  careerPaths: string[]
  nextCohort: string
  applicationDeadline: string
  spotsAvailable: number
  icon: string
}

type TrackCardProps = {
  track: Track
  isExpanded?: boolean
  onToggle?: (trackId: string) => void
}

export const TrackCard: React.FC<TrackCardProps> = ({ track, isExpanded = false, onToggle }) => {
  const [expanded, setExpanded] = useState(isExpanded)
  const theme = useTheme()

  // Sync local state with prop changes
  useEffect(() => {
    setExpanded(isExpanded)
  }, [isExpanded])

  const handleToggle = () => {
    const newExpanded = !expanded
    setExpanded(newExpanded)
    onToggle?.(track.id)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h2" sx={{ fontSize: '2.5rem', mr: 2 }}>
            {track.icon}
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h3" component="h2" gutterBottom>
              {track.label}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
              {track.description}
            </Typography>
          </Box>
        </Box>

        {/* Key Info */}
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Chip label={track.duration} size="small" color="primary" variant="outlined" />
          <Chip label={track.format} size="small" color="secondary" variant="outlined" />
          <Chip
            label={`${track.spotsAvailable} spots left`}
            size="small"
            color={track.spotsAvailable < 10 ? 'error' : 'success'}
            variant="outlined"
          />
        </Stack>

        {/* Expandable Content */}
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box sx={{ mt: 2 }}>
            {/* Skills */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Skills You'll Learn
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {track.skills.map(skill => (
                  <Chip key={skill} label={skill} size="small" variant="outlined" />
                ))}
              </Box>
            </Box>

            {/* Projects */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Projects You'll Build
              </Typography>
              <Grid container spacing={1}>
                {track.projects.map(project => (
                  <Grid size={{ xs: 12, sm: 6 }} key={project}>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        component="span"
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          bgcolor: 'primary.main',
                          mr: 1,
                        }}
                      />
                      {project}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Career Paths */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Career Paths
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {track.careerPaths.map(career => (
                  <Chip key={career} label={career} size="small" color="primary" />
                ))}
              </Box>
            </Box>

            {/* Application Info */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Application Details
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2">
                  <strong>Next Cohort:</strong> {track.nextCohort}
                </Typography>
                <Typography variant="body2">
                  <strong>Application Deadline:</strong> {formatDate(track.applicationDeadline)}
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Collapse>

        {/* Actions */}
        <Box sx={{ mt: 'auto', pt: 2 }}>
          <Button
            variant="outlined"
            onClick={handleToggle}
            endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
            fullWidth
            sx={{ mb: 2 }}
            aria-expanded={expanded}
            aria-label={expanded ? 'Show less details' : 'Show more details'}
          >
            {expanded ? 'Show Less' : 'Show Details'}
          </Button>

          <Button
            variant="contained"
            fullWidth
            size="large"
            href={`/apply?track=${track.id}`}
            sx={{
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            Apply Now
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}
