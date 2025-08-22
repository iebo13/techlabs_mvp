import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Completely mock the entire @mui/icons-material module to prevent EMFILE errors
vi.mock('@mui/icons-material', () => ({
  PlayArrow: () => '▶',
  Close: () => '✕',
  ArrowBack: () => '←',
  ArrowForward: () => '→',
  HourglassEmpty: () => '⏳',
  // Add any other icons that might be used
  default: {
    PlayArrow: () => '▶',
    Close: () => '✕',
    ArrowBack: () => '←',
    ArrowForward: () => '→',
    HourglassEmpty: () => '⏳',
  },
}))

// Also mock specific icon imports to be extra safe
vi.mock('@mui/icons-material/PlayArrow', () => ({
  __esModule: true,
  default: () => '▶',
}))

vi.mock('@mui/icons-material/Close', () => ({
  __esModule: true,
  default: () => '✕',
}))

vi.mock('@mui/icons-material/ArrowBack', () => ({
  __esModule: true,
  default: () => '←',
}))

vi.mock('@mui/icons-material/ArrowForward', () => ({
  __esModule: true,
  default: () => '→',
}))

vi.mock('@mui/icons-material/HourglassEmpty', () => ({
  __esModule: true,
  default: () => '⏳',
}))
