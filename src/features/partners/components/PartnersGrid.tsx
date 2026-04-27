import React, { useMemo, useState } from 'react'
import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  type SelectChangeEvent,
} from '@mui/material'
import { Section, SectionHeading } from '@/components/Layouts'
import { useI18n } from '@/hooks'
import type { DetailedPartner } from '../types/partners.type'
import { PartnerCard } from './PartnerCard'

type PartnersGridProps = {
  readonly partners: DetailedPartner[]
}

export const PartnersGrid: React.FC<PartnersGridProps> = ({ partners }) => {
  const { t } = useI18n()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // eslint-disable-next-line no-restricted-syntax
  const categories = useMemo(() => {
    const unique = [...new Set(partners.map(p => p.category))].sort()

    return [{ value: 'all', label: t('partners.grid.allCategories') }, ...unique.map(c => ({ value: c, label: c }))]
  }, [partners, t])

  // eslint-disable-next-line no-restricted-syntax
  const filteredPartners = useMemo(() => {
    if (selectedCategory === 'all') return partners

    return partners.filter(p => p.category === selectedCategory)
  }, [selectedCategory, partners])

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value)
  }

  return (
    <Section sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Stack spacing={4} alignItems="center">
          <SectionHeading level={2} centered subtitle={t('partners.grid.subtitle')}>
            {t('partners.grid.title')}
          </SectionHeading>

          {categories.length > 2 && (
            <Stack direction="row" spacing={2} alignItems="center">
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel id="partner-category-label">{t('partners.grid.filterLabel')}</InputLabel>
                <Select
                  labelId="partner-category-label"
                  value={selectedCategory}
                  label={t('partners.grid.filterLabel')}
                  onChange={handleCategoryChange}>
                  {categories.map(cat => (
                    <MenuItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          )}

          {selectedCategory !== 'all' && (
            <Typography variant="body2" color="text.secondary">
              {t('partners.grid.showingCount', { count: filteredPartners.length, total: partners.length })}
            </Typography>
          )}

          <Grid container spacing={3} justifyContent="center" px={{ xs: 2, md: 4 }}>
            {filteredPartners.map(partner => (
              <Grid key={partner.name} size={{ xs: 12, sm: 6, md: 4 }}>
                <PartnerCard partner={partner} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Section>
  )
}

PartnersGrid.displayName = 'PartnersGrid'
