import React from 'react'
import type { z } from 'zod'
import { GitHub, LinkedIn } from '@mui/icons-material'
import { Avatar, Card, CardContent, Chip, IconButton, Stack, Typography } from '@mui/material'
import { useI18n } from '@/hooks'
import type { TeamMemberSchema } from '@/mocks/schemas'

type TeamMember = z.infer<typeof TeamMemberSchema>

type TeamMemberCardProps = {
  readonly member: TeamMember
}

const getInitials = (name: string) =>
  name
    .split(' ')
    .map(n => n[0])
    .join('')

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  const { t } = useI18n()

  return (
    <Card
      sx={{
        height: '100%',
        textAlign: 'center',
        p: 3,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        transition: 'all 0.25s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        },
      }}>
      <CardContent>
        <Stack spacing={1.5} alignItems="center">
          <Avatar
            src={member.imageUrl}
            alt={member.name}
            sx={{
              width: 80,
              height: 80,
              bgcolor: 'primary.main',
              fontSize: '1.5rem',
              fontWeight: 600,
            }}>
            {getInitials(member.name)}
          </Avatar>

          <Stack direction="row" spacing={0.5}>
            <Chip
              label={t('about.teamSection.volunteerBadge')}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ fontSize: '0.7rem' }}
            />
            <Chip
              label={t(`about.teamSection.departments.${member.department}.label`)}
              size="small"
              sx={{ fontSize: '0.7rem', bgcolor: 'grey.200', color: 'text.secondary' }}
            />
          </Stack>

          <Typography variant="h6" component="h3" fontWeight={600}>
            {member.name}
          </Typography>

          <Typography variant="body2" color="primary.main" fontWeight={500}>
            {member.role}
          </Typography>

          <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
            {member.bio}
          </Typography>

          {member.socialLinks && (
            <Stack direction="row" spacing={0.5}>
              {member.socialLinks.linkedin && (
                <IconButton
                  component="a"
                  href={member.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  aria-label={`${member.name} LinkedIn`}>
                  <LinkedIn fontSize="small" />
                </IconButton>
              )}
              {member.socialLinks.github && (
                <IconButton
                  component="a"
                  href={member.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  aria-label={`${member.name} GitHub`}>
                  <GitHub fontSize="small" />
                </IconButton>
              )}
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}
