import React, { useState } from 'react'
import { QuestionAnswer, Search, UnfoldLess, UnfoldMore } from '@mui/icons-material'
import { Box, Button, Container, Grid, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import { CTAButton } from '@/components/Buttons/CtaButton'
import { FAQAccordion } from '@/components/Forms/FaqAccordion'
import { Section, SectionHeading } from '@/components/Layouts'
import type { FAQ } from '@/features/home/types/homePage.type'
import { useI18n } from '@/hooks'

type FaqsSectionProps = {
  readonly faqs: FAQ[]
}

export const FaqsSection: React.FC<FaqsSectionProps> = ({ faqs }) => {
  const { t } = useI18n()
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedPanels, setExpandedPanels] = useState<Set<string>>(new Set())

  const query = searchQuery.toLowerCase().trim()
  const filteredFaqs = query
    ? faqs.filter(faq => faq.q.toLowerCase().includes(query) || faq.a.toLowerCase().includes(query))
    : faqs

  const allExpanded = filteredFaqs.length > 0 && expandedPanels.size === filteredFaqs.length

  const handleToggle = (panel: string) => {
    setExpandedPanels(prev => {
      const next = new Set(prev)

      if (next.has(panel)) next.delete(panel)
      else next.add(panel)

      return next
    })
  }

  const handleToggleAll = () => {
    if (allExpanded) {
      setExpandedPanels(new Set())
    } else {
      setExpandedPanels(new Set(filteredFaqs.map((_, i) => `panel-${i}`)))
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setExpandedPanels(new Set())
  }

  return (
    <Section variant="paper" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="flex-start">
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={3} sx={{ position: { md: 'sticky' }, top: { md: 100 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 3,
                    bgcolor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <QuestionAnswer sx={{ color: 'white', fontSize: 24 }} />
                </Box>
                <SectionHeading level={2} sx={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
                  {t('about.faqSection.title')}
                </SectionHeading>
              </Box>

              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                {t('about.faqSection.subtitle')}
              </Typography>

              <TextField
                placeholder={t('about.faqSection.searchPlaceholder')}
                value={searchQuery}
                onChange={handleSearchChange}
                size="small"
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search sx={{ color: 'text.disabled', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              />

              <Box sx={{ display: { xs: 'none', md: 'block' }, mt: 2 }}>
                <CTAButton to="/about#contact" variant="outlined" size="medium">
                  {t('about.faqSection.contactCta')}
                </CTAButton>
              </Box>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  size="small"
                  onClick={handleToggleAll}
                  startIcon={allExpanded ? <UnfoldLess /> : <UnfoldMore />}
                  sx={{ textTransform: 'none', fontWeight: 600, color: 'text.secondary' }}>
                  {allExpanded ? t('about.faqSection.collapseAll') : t('about.faqSection.expandAll')}
                </Button>
              </Box>

              {filteredFaqs.length > 0 ? (
                <FAQAccordion
                  faqs={filteredFaqs}
                  maxWidth="xl"
                  showBorder
                  numbered
                  singleOpen={false}
                  expandedPanels={expandedPanels}
                  onToggle={handleToggle}
                />
              ) : (
                <Box
                  sx={{
                    textAlign: 'center',
                    py: 6,
                    px: 3,
                    borderRadius: 4,
                    bgcolor: 'background.paper',
                    border: '1px dashed',
                    borderColor: 'divider',
                  }}>
                  <Typography variant="body1" color="text.secondary">
                    {t('about.faqSection.noResults')}
                  </Typography>
                </Box>
              )}

              <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'center', mt: 2 }}>
                <CTAButton to="/about#contact" variant="outlined" size="medium">
                  {t('about.faqSection.contactCta')}
                </CTAButton>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Section>
  )
}
