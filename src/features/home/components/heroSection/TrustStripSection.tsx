import { Box, Grid, useTheme } from '@mui/material'
import { PartnerLogo, type Partner } from '@/features/partners'

type TrustStripSectionProps = {
  partners: Partner[]
}

export const TrustStripSection: React.FC<TrustStripSectionProps> = ({ partners }) => {
  const theme = useTheme()

  return (
    <Box sx={{ backgroundColor: theme.palette.grey[300], width: '100%' }}>
      <Grid
        container
        sx={{
          minWidth: '100%',
          display: 'flex',
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {partners.map((partner: Partner) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 3 }}
            key={partner.name}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: { xs: 60, sm: 70, md: 80 },
            }}>
            <PartnerLogo partner={partner} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
