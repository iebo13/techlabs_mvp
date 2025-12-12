/* eslint-disable security/detect-object-injection */
import React from 'react'
import { Box, Typography } from '@mui/material'
import { Section } from '@/components'
import { useI18n } from '@/hooks'

type NumbersBandProps = {
  numbers: Array<{
    label: string
    value: string
  }>
  title?: string
}

export const NumbersBand: React.FC<NumbersBandProps> = ({ numbers, title }) => {
  const { t } = useI18n()
  const displayTitle = title || t('hero.numbersSection.title')

  const translationKeyMap: Record<string, string> = {
    cities: 'hero.numbersSection.cities',
    graduates: 'hero.numbersSection.graduates',
    mentors: 'hero.numbersSection.mentors',
  }

  const getTranslatedLabel = (label: string): string => {
    const normalizedLabel = label.toLowerCase().trim()
    const translationKey = translationKeyMap[normalizedLabel]

    if (translationKey) {
      return t(translationKey)
    }

    return label
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }

  return (
    <Section sx={{ py: { xs: 6, md: 8 } }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Typography variant="h2" color="primary.main" textAlign="center" pb={4}>
          {displayTitle}
        </Typography>

        <Box
          component="dl"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-evenly',
            alignItems: 'center',
            width: '100%',
            gap: 3,
            m: 0,
          }}>
          {numbers.map(metric => (
            <Box
              key={metric.label}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}>
              <Typography
                component="dd"
                color="text.primary"
                fontWeight={900}
                sx={{ fontSize: '4rem', m: 0, lineHeight: 1.2 }}
                aria-label={`${metric.value} ${getTranslatedLabel(metric.label)}`}>
                {metric.value}
              </Typography>

              <Typography component="dt" color="text.primary" fontWeight={600} sx={{ fontSize: '1.5rem', order: -1 }}>
                {getTranslatedLabel(metric.label)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Section>
  )
}
