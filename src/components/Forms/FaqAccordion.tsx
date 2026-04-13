import React, { useState } from 'react'
import { Add, Remove } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, Stack, Typography } from '@mui/material'
import type { FAQ } from '@/features/home/types/homePage.type'

type FAQAccordionProps = {
  readonly faqs: FAQ[]
  readonly maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  readonly showBorder?: boolean
  readonly singleOpen?: boolean
  readonly numbered?: boolean
  readonly expandedPanels?: Set<string>
  readonly onToggle?: (panel: string) => void
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  faqs,
  maxWidth = 'md',
  showBorder = true,
  singleOpen = true,
  numbered = false,
  expandedPanels,
  onToggle,
}) => {
  const [internalExpanded, setInternalExpanded] = useState<string | false>(false)
  const isControlled = expandedPanels !== undefined

  const isExpanded = (panel: string) => {
    if (isControlled) return expandedPanels.has(panel)

    return internalExpanded === panel
  }

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, open: boolean) => {
    if (isControlled && onToggle) {
      onToggle(panel)
    } else if (singleOpen) {
      setInternalExpanded(open ? panel : false)
    } else {
      setInternalExpanded(prev => (prev === panel ? false : panel))
    }
  }

  return (
    <Box maxWidth={maxWidth} mx="auto" width="100%">
      <Stack spacing={1.5}>
        {faqs.map((faq, index) => {
          const panelId = `panel-${index}`
          const open = isExpanded(panelId)

          return (
            <Accordion
              key={`faq-${faq.q.slice(0, 20).toLowerCase().replaceAll(/\s+/g, '-')}`}
              expanded={open}
              onChange={handleChange(panelId)}
              disableGutters
              TransitionProps={{ unmountOnExit: true, timeout: 300 }}
              sx={{
                border: showBorder ? '1px solid' : 'none',
                borderColor: open ? 'primary.light' : 'divider',
                borderRadius: '16px !important',
                borderLeft: open ? '3px solid' : '1px solid',
                borderLeftColor: open ? 'primary.main' : showBorder ? 'divider' : 'transparent',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:before': { display: 'none' },
                '&:hover': {
                  borderColor: open ? 'primary.light' : 'grey.400',
                  bgcolor: open ? 'transparent' : 'grey.50',
                },
                '&.Mui-expanded': {
                  bgcolor: 'background.paper',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                },
              }}>
              <AccordionSummary
                expandIcon={
                  open ? (
                    <Remove sx={{ color: 'primary.main', fontSize: 20 }} />
                  ) : (
                    <Add sx={{ color: 'text.secondary', fontSize: 20 }} />
                  )
                }
                aria-controls={`${panelId}-content`}
                id={`${panelId}-header`}
                sx={{
                  px: 3,
                  py: 1,
                  minHeight: 64,
                  '& .MuiAccordionSummary-content': { my: 1.5, alignItems: 'center', gap: 2 },
                }}>
                {numbered && (
                  <Chip
                    label={String(index + 1).padStart(2, '0')}
                    size="small"
                    sx={{
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      minWidth: 36,
                      height: 28,
                      bgcolor: open ? 'primary.main' : 'grey.200',
                      color: open ? 'white' : 'text.secondary',
                      transition: 'all 0.3s ease',
                    }}
                  />
                )}
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{
                    fontWeight: open ? 700 : 600,
                    color: open ? 'primary.dark' : 'text.primary',
                    transition: 'color 0.3s ease',
                    fontSize: { xs: '0.95rem', md: '1.05rem' },
                  }}>
                  {faq.q}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: numbered ? 3 : 3, pb: 3, pt: 0, pl: numbered ? 8.5 : 3 }}>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.75, fontSize: '0.95rem' }}>
                  {faq.a}
                </Typography>
              </AccordionDetails>
            </Accordion>
          )
        })}
      </Stack>
    </Box>
  )
}
