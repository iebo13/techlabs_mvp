import React from 'react'
import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material'
import { Section, SectionHeading } from '@/components/Layouts'
import { useI18n } from '@/hooks'

export const TeamSection: React.FC = () => {
  const { t } = useI18n()

  const members = [
    {
      key: 'sarah',
      name: t('about.teamSection.members.sarah.name'),
      role: t('about.teamSection.members.sarah.role'),
      bio: t('about.teamSection.members.sarah.bio'),
    },
    {
      key: 'marcus',
      name: t('about.teamSection.members.marcus.name'),
      role: t('about.teamSection.members.marcus.role'),
      bio: t('about.teamSection.members.marcus.bio'),
    },
    {
      key: 'lisa',
      name: t('about.teamSection.members.lisa.name'),
      role: t('about.teamSection.members.lisa.role'),
      bio: t('about.teamSection.members.lisa.bio'),
    },
  ]

  return (
    <Section variant="paper">
      <Container maxWidth="lg">
        <SectionHeading level={2} centered maxWidth="700px">
          {t('about.teamSection.title')}
        </SectionHeading>
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          sx={{ mt: 3, maxWidth: '600px', mx: 'auto', mb: 6 }}>
          {t('about.teamSection.description')}
        </Typography>

        <Grid container spacing={4}>
          {members.map(member => (
            <Grid key={member.key} size={{ xs: 12, sm: 6, md: 4 }}>
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
                    role="img"
                    aria-label={t('about.teamSection.avatarAlt', { name: member.name })}
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
                    <Box component="span" aria-hidden="true">
                      {member.name
                        .split(' ')
                        .map(n => n[0])
                        .join('')}
                    </Box>
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
}
