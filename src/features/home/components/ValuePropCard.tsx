import React from 'react'
import { Typography, Box } from '@mui/material'

type ValuePropCardProps = {
  icon: string
  title: string
  body: string
}

export const ValuePropCard: React.FC<ValuePropCardProps> = ({ icon, title, body }) => {
  return (
    <Box sx={{ textAlign: 'center', maxWidth: '300px', mx: 'auto' }}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={`/img/icons/${icon}.svg`} width={48} height={48} alt={`${title} icon`} style={{ display: 'block' }} />
      </Box>

      <Typography variant="h3" component="h3" color="primary" fontWeight="600">
        {title}
      </Typography>

      <Typography variant="body1" color="text.secondary" maxWidth="260px" mx="auto">
        {body}
      </Typography>
    </Box>
  )
}
