import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock all MUI icons to prevent EMFILE errors by intercepting the module resolution
vi.mock('@mui/icons-material/PlayArrow', async () => {
    return {
        __esModule: true,
        default: function PlayArrowIcon() {
            return '▶'
        }
    }
})

vi.mock('@mui/icons-material/Close', async () => {
    return {
        __esModule: true,
        default: function CloseIcon() {
            return '✕'
        }
    }
})

// Mock the entire icons module to prevent deep imports
vi.mock('@mui/icons-material', async () => {
    const actual = await vi.importActual('@mui/icons-material')
    return {
        ...actual,
        PlayArrow: function PlayArrowIcon() { return '▶' },
        Close: function CloseIcon() { return '✕' }
    }
})
