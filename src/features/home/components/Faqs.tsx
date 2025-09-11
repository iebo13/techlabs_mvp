import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ExpandMore, QuestionAnswer } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material'
import { Section } from '@/components/Layouts'

type FAQ = {
  q: string
  a: string
}

type FaqsProps = {
  faqs: FAQ[]
}

export const Faqs: React.FC<FaqsProps> = ({ faqs }) => {
  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <Section sx={{ py: { xs: 6, md: 8 } }}>
      <Stack spacing={6} alignItems="center" p={2}>
        <Typography variant="h2" component="h2" gutterBottom color="primary.main" fontWeight={600}>
          Frequently Asked Questions
        </Typography>

        <Box maxWidth="md" mx="auto" width="100%">
          <Stack spacing={2}>
            {faqs.map((faq, index) => {
              const faqId = `faq-${faq.q.slice(0, 50).toLowerCase().replaceAll(/[^\w]/g, '-').replaceAll(/-+/g, '-').replaceAll(/^-|-$/g, '')}-${index}`
              const panelId = `panel-${faqId}`

              return (
                <Accordion
                  key={faqId}
                  expanded={expanded === panelId}
                  onChange={handleChange(panelId)}
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    '&.Mui-expanded': {
                      borderColor: 'primary.main',
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls={`${panelId}-content`}
                    id={`${panelId}-header`}
                    sx={{
                      pl: 2,
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight={600}>
                      {faq.q}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 3, pb: 3 }}>
                    <Typography variant="body1" fontWeight={400}>
                      {faq.a}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              )
            })}
          </Stack>
        </Box>

        <Button
          component={Link}
          to="/about#faq"
          variant="outlined"
          startIcon={<QuestionAnswer />}
          sx={{
            fontWeight: 600,
          }}
        >
          More Questions
        </Button>
      </Stack>
    </Section>
  )
}
