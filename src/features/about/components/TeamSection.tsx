import React, { useState } from 'react'
import type { z } from 'zod'
import { Box, Container, Grid, Stack, Tab, Tabs, Typography } from '@mui/material'
import { CTAButton } from '@/components/Buttons/CtaButton'
import { Section, SectionHeading } from '@/components/Layouts'
import { useI18n } from '@/hooks'
import type { DepartmentKeySchema, TeamMemberSchema } from '@/mocks/schemas'
import { TeamMemberCard } from './TeamMemberCard'

type DepartmentKey = z.infer<typeof DepartmentKeySchema>
type TeamMember = z.infer<typeof TeamMemberSchema>

const DEPARTMENTS: DepartmentKey[] = ['leadership', 'mentors', 'tech', 'marketing', 'operations']

type TabValue = 'all' | DepartmentKey

type TeamSectionProps = {
  readonly members: TeamMember[]
}

export const TeamSection: React.FC<TeamSectionProps> = ({ members }) => {
  const { t } = useI18n()
  const [activeTab, setActiveTab] = useState<TabValue>('all')

  const handleTabChange = (_: React.SyntheticEvent, newValue: TabValue) => {
    setActiveTab(newValue)
  }

  const filteredMembers = activeTab === 'all' ? members : members.filter(m => m.department === activeTab)

  return (
    <Section>
      <Container maxWidth="lg">
        <Stack spacing={4} alignItems="center">
          <SectionHeading level={2} centered maxWidth="700px" subtitle={t('about.teamSection.description')}>
            {t('about.teamSection.title')}
          </SectionHeading>

          <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              centered={false}
              sx={{
                '& .MuiTab-root': {
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  minHeight: 48,
                },
              }}>
              <Tab value="all" label={t('about.teamSection.allDepartments')} />
              {DEPARTMENTS.map(dept => (
                <Tab key={dept} value={dept} label={t(`about.teamSection.departments.${dept}.label`)} />
              ))}
            </Tabs>
          </Box>

          {activeTab !== 'all' && (
            <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ maxWidth: 600 }}>
              {t(`about.teamSection.departments.${activeTab}.description`)}
            </Typography>
          )}

          <Grid container spacing={4}>
            {filteredMembers.map(member => (
              <Grid key={member.name} size={{ xs: 12, sm: 6, md: 4 }}>
                <TeamMemberCard member={member} />
              </Grid>
            ))}
          </Grid>

          <CTAButton to="/about#contact" variant="outlined">
            {t('about.teamSection.cta')}
          </CTAButton>
        </Stack>
      </Container>
    </Section>
  )
}

TeamSection.displayName = 'TeamSection'
