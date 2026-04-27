import React, { useState } from 'react'
import { Check, KeyboardArrowDown } from '@mui/icons-material'
import { Box, Button, Popover, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { cities } from '@/config/data/navigationData'
import { useI18n } from '@/hooks'

const DEFAULT_CITY = cities[0].slug

export const CitySelector: React.FC = () => {
  const { t } = useI18n()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedCity, setSelectedCity] = useState(DEFAULT_CITY)
  const open = Boolean(anchorEl)

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => setAnchorEl(null)

  const handleCityChange = (_: React.MouseEvent, value: string | null) => {
    if (value) {
      setSelectedCity(value)
      handleClose()
    }
  }

  const currentCity = cities.find(c => c.slug === selectedCity)

  return (
    <>
      <Button
        variant="text"
        size="small"
        endIcon={
          <KeyboardArrowDown
            sx={{
              transition: 'transform 0.2s ease',
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        }
        aria-label={t('navigation.selectCity')}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={handleOpen}
        sx={{
          color: 'text.secondary',
          fontSize: '0.75rem',
          fontWeight: 500,
          px: 0.5,
          py: 0.25,
          minWidth: 0,
          borderRadius: '6px',
          textTransform: 'none',
          whiteSpace: 'nowrap',
          lineHeight: 1.2,
          '& .MuiButton-startIcon': { mr: 0.25, '& > *:nth-of-type(1)': { fontSize: '0.875rem' } },
          '& .MuiButton-endIcon': { ml: 0.125, '& > *:nth-of-type(1)': { fontSize: '0.875rem' } },
          '&:hover': {
            backgroundColor: 'action.hover',
            color: 'text.primary',
          },
        }}>
        {currentCity?.name}
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: {
            elevation: 4,
            sx: { borderRadius: '12px', mt: 0.75, minWidth: 200, overflow: 'hidden' },
          },
        }}>
        <Box sx={{ p: 1.5 }}>
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              color: 'text.secondary',
              fontWeight: 600,
              px: 0.75,
              mb: 1,
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
            }}>
            {t('navigation.selectCity')}
          </Typography>

          <ToggleButtonGroup
            orientation="vertical"
            exclusive
            value={selectedCity}
            onChange={handleCityChange}
            fullWidth
            sx={{ gap: 0.25, display: 'flex', flexDirection: 'column' }}>
            {cities.map(city => (
              <ToggleButton
                key={city.slug}
                value={city.slug}
                aria-label={city.name}
                sx={{
                  justifyContent: 'space-between',
                  border: 'none',
                  borderRadius: '8px',
                  '&.MuiToggleButtonGroup-grouped': {
                    border: 'none',
                    borderRadius: '8px',
                  },
                  px: 1.5,
                  py: 0.875,
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  textTransform: 'none',
                  color: 'text.primary',
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': { backgroundColor: 'primary.dark' },
                  },
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}>
                <Box component="span">{city.name}</Box>
                {selectedCity === city.slug && <Check sx={{ fontSize: '1rem', ml: 1 }} aria-hidden="true" />}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
      </Popover>
    </>
  )
}

CitySelector.displayName = 'CitySelector'
