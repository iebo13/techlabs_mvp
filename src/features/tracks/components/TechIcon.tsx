import React from 'react'
import { Box } from '@mui/material'
import { webIcons } from '../utils/techIconMap'
import { dataIcons } from '../utils/techIconMapData'

type TechIconProps = {
  readonly name: string
  readonly fallbackEmoji: string
  readonly size?: number
}

const allIcons: Record<string, (s: number) => React.ReactNode> = {
  ...webIcons,
  ...dataIcons,
}

export const TechIcon: React.FC<TechIconProps> = ({ name, fallbackEmoji, size = 32 }) => {
  const renderer = allIcons[name]

  if (renderer) {
    return <Box sx={{ lineHeight: 0, display: 'inline-flex' }}>{renderer(size)}</Box>
  }

  return (
    <Box component="span" aria-hidden="true" sx={{ fontSize: `${size * 0.8}px`, lineHeight: 1 }}>
      {fallbackEmoji}
    </Box>
  )
}

TechIcon.displayName = 'TechIcon'
