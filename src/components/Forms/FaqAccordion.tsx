import React, { useState } from 'react'
import { ExpandMore } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from '@mui/material'
import type { FAQ } from '@/features/home/types/homePage.type'

type FAQAccordionProps = {
  faqs: FAQ[]
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  showBorder?: boolean
  singleOpen?: boolean
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  faqs,
  maxWidth = 'md',
  showBorder = true,
  singleOpen = true,
}) => {
  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    if (singleOpen) {
      setExpanded(isExpanded ? panel : false)
    } else {
      setExpanded(prev => (prev === panel ? false : panel))
    }
  }

  return (
    <Box maxWidth={maxWidth} mx="auto" width="100%">
      <Stack spacing={2}>
        {faqs.map((faq, index) => (
          <Accordion
            key={`faq-${faq.q.slice(0, 20).toLowerCase().replaceAll(/\s+/g, '-')}`}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            sx={{
              border: showBorder ? '1px solid' : 'none',
              borderColor: showBorder ? 'divider' : 'transparent',
              borderRadius: 2,
              '&:before': {
                display: 'none',
              },
              '&.Mui-expanded': {
                borderColor: showBorder ? 'primary.main' : 'transparent',
                boxShadow: showBorder ? 2 : 'none',
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls={`panel${index}bh-content`}
              id={`panel${index}bh-header`}
              sx={{
                '& .MuiAccordionSummary-content': {
                  margin: 2,
                },
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                }}
              >
                {faq.q}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 3, pb: 3 }}>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                {faq.a}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </Box>
  )
}
