import React from 'react'
import { Card, CardContent, Container, Grid, Typography } from '@mui/material'
import { Section, SectionHeading } from '@/components/Layouts'

type MissionData = {
  title: string
  subtitle: string
  description: string
  values: Array<{
    title: string
    description: string
  }>
}

export const MissionSection: React.FC<{ data: MissionData }> = ({ data }) => {
  return (
    <>
      <Section variant="primary" paddingScale={1.5}>
        <Container maxWidth="lg">
          <SectionHeading level={1} centered emphasis="gradient" maxWidth="800px">
            {data.title}
          </SectionHeading>
          <Typography
            variant="h5"
            component="p"
            color="white"
            textAlign="center"
            sx={{ mt: 3, maxWidth: '700px', mx: 'auto', lineHeight: 1.4 }}
          >
            {data.subtitle}
          </Typography>
          <Typography
            variant="body1"
            color="white"
            textAlign="center"
            sx={{ mt: 3, maxWidth: '600px', mx: 'auto', opacity: 0.9, lineHeight: 1.6 }}
          >
            {data.description}
          </Typography>
        </Container>
      </Section>

      <Section>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {data.values.map(value => (
              <Grid
                key={value.title.toLowerCase().replaceAll(/\s+/g, '-')}
                size={{ xs: 12, sm: 6, md: 3 }}
              >
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
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                      {value.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Section>
    </>
  )
}
