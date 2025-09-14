import React from 'react'
import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material'
import { Section, SectionHeading } from '@/components/Layouts'

type TeamData = {
  title: string
  description: string
  members: Array<{
    name: string
    role: string
    bio: string
    imageUrl: string
  }>
}

export const TeamSection: React.FC<{ data: TeamData }> = ({ data }) => (
  <Section variant="paper">
    <Container maxWidth="lg">
      <SectionHeading level={2} centered maxWidth="700px">
        {data.title}
      </SectionHeading>
      <Typography
        variant="body1"
        color="text.secondary"
        textAlign="center"
        sx={{ mt: 3, maxWidth: '600px', mx: 'auto', mb: 6 }}>
        {data.description}
      </Typography>

      <Grid container spacing={4}>
        {data.members.map(member => (
          <Grid key={member.name.toLowerCase().replaceAll(/\s+/g, '-')} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              sx={{
                height: '100%',
                textAlign: 'center',
                p: 3,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 3,
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                  transition: 'all 0.3s ease',
                },
              }}>
              <CardContent>
                <Box
                  sx={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    backgroundColor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    color: 'white',
                    fontSize: '2rem',
                    fontWeight: 600,
                  }}>
                  {member.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')}
                </Box>
                <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                  {member.name}
                </Typography>
                <Typography variant="body2" color="primary.main" fontWeight={500} gutterBottom>
                  {member.role}
                </Typography>
                <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
                  {member.bio}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Section>
)
