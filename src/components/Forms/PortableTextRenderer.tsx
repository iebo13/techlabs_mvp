import React from 'react'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { Box, Link, Typography } from '@mui/material'
import { urlFor } from '@/config/sanity'

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <Typography variant="h4" component="h2" gutterBottom>
        {children}
      </Typography>
    ),
    h3: ({ children }) => (
      <Typography variant="h5" component="h3" gutterBottom>
        {children}
      </Typography>
    ),
    normal: ({ children }) => (
      <Typography variant="body1" paragraph>
        {children}
      </Typography>
    ),
    blockquote: ({ children }) => (
      <Box component="blockquote" sx={{ borderLeft: 3, borderColor: 'primary.main', pl: 2, my: 2 }}>
        <Typography variant="body1" fontStyle="italic">
          {children}
        </Typography>
      </Box>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <Link href={value?.href} target="_blank" rel="noopener noreferrer">
        {children}
      </Link>
    ),
  },
  types: {
    image: ({ value }) => (
      <Box component="figure" sx={{ my: 2 }}>
        <Box
          component="img"
          src={urlFor(value).width(800).auto('format').url()}
          alt={value.alt || ''}
          loading="lazy"
          sx={{ width: '100%', borderRadius: 1 }}
        />
      </Box>
    ),
  },
}

type PortableTextRendererProps = {
  readonly value: PortableTextBlock[]
}

export const PortableTextRenderer: React.FC<PortableTextRendererProps> = ({ value }) => (
  <PortableText value={value} components={components} />
)

PortableTextRenderer.displayName = 'PortableTextRenderer'
