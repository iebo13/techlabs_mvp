import React from 'react'
import { Link } from 'react-router-dom'
import { QuestionAnswer } from '@mui/icons-material'
import { Button, Stack, Typography } from '@mui/material'
import { FAQAccordion } from '@/components/Forms/FaqAccordion'
import { Section } from '@/components/Layouts'
import type { FAQ } from '@/features/home/types/homePage.type'

type FaqsSectionProps = {
  faqs: FAQ[]
}

export const FaqsSection: React.FC<FaqsSectionProps> = ({ faqs }) => {
  return (
    <Section sx={{ py: { xs: 6, md: 8 } }}>
      <Stack spacing={6} alignItems="center" p={2}>
        <Typography variant="h2" component="h2" gutterBottom color="primary.main" fontWeight={600}>
          Frequently Asked Questions
        </Typography>

        <FAQAccordion faqs={faqs} maxWidth="md" showBorder singleOpen />

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
