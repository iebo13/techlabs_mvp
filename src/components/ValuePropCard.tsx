import React from 'react'

import GroupsIcon from '@mui/icons-material/Groups'
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import { Card, CardContent, Typography, Box } from '@mui/material'

type ValuePropCardProps = {
    /** MUI icon name as string */
    icon: string
    /** Card title */
    title: string
    /** Card body text */
    body: string
}

// Icon mapping for the specific icons we use
const iconMap = {
    VolunteerActivism: VolunteerActivismIcon,
    Groups: GroupsIcon,
    WorkspacePremium: WorkspacePremiumIcon
} as const

/**
 * ValuePropCard - Reusable card component for displaying value propositions
 * Used in Why TechLabs section to showcase key benefits
 */
export const ValuePropCard: React.FC<ValuePropCardProps> = ({
    icon,
    title,
    body
}) => {
    // Get the specific icon component from our map
    const IconComponent = iconMap[icon as keyof typeof iconMap]

    return (
        <Card
            sx={{
                height: '100%',
                borderRadius: 4,
                boxShadow: 1,
                border: '1px solid',
                borderColor: 'grey.200',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                    boxShadow: 2,
                    transform: 'translateY(-2px)'
                }
            }}
        >
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
                {/* Icon */}
                <Box
                    sx={{
                        mb: 3,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    {IconComponent && (
                        <IconComponent
                            sx={{
                                fontSize: 48,
                                color: 'primary.main'
                            }}
                        />
                    )}
                </Box>

                {/* Title */}
                <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                        mb: 2,
                        fontWeight: 700,
                        color: 'text.primary'
                    }}
                >
                    {title}
                </Typography>

                {/* Body */}
                <Typography
                    variant="body1"
                    sx={{
                        color: 'text.secondary',
                        lineHeight: 1.6
                    }}
                >
                    {body}
                </Typography>
            </CardContent>
        </Card>
    )
}
