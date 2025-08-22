/**
 * Tests for persistence utilities
 */

import { vi } from 'vitest'
import type { TrackKey } from '../../types/home'
import {
  saveTrackSelection,
  loadTrackSelection,
  clearTrackSelection,
  trackIdsToQueryParam,
  queryParamToTrackIds,
} from '../persistence'

// Mock sessionStorage
const mockSessionStorage = {
  store: {} as Record<string, string>,

  getItem: vi.fn((key: string) => mockSessionStorage.store[key] || null),
  setItem: vi.fn((key: string, value: string) => {
    mockSessionStorage.store[key] = value
  }),
  removeItem: vi.fn((key: string) => {
    delete mockSessionStorage.store[key]
  }),
  clear: vi.fn(() => {
    mockSessionStorage.store = {}
  }),
}

Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage,
})

describe('Persistence utilities', () => {
  beforeEach(() => {
    // Clear mock storage before each test
    mockSessionStorage.clear()
    vi.clearAllMocks()
  })

  describe('saveTrackSelection', () => {
    it('saves track selection to sessionStorage', () => {
      const tracks: TrackKey[] = ['web-dev', 'data-science']

      saveTrackSelection(tracks)

      expect(mockSessionStorage.setItem).toHaveBeenCalledWith(
        'techlabs-track-selection',
        JSON.stringify(tracks)
      )
    })

    it('handles empty array', () => {
      saveTrackSelection([])

      expect(mockSessionStorage.setItem).toHaveBeenCalledWith(
        'techlabs-track-selection',
        JSON.stringify([])
      )
    })

    it('handles sessionStorage errors gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      mockSessionStorage.setItem.mockImplementation(() => {
        throw new Error('Storage quota exceeded')
      })

      expect(() => saveTrackSelection(['web-dev'])).not.toThrow()
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to save track selection to sessionStorage:',
        expect.any(Error)
      )

      consoleSpy.mockRestore()
    })
  })

  describe('loadTrackSelection', () => {
    it('loads track selection from sessionStorage', () => {
      const tracks: TrackKey[] = ['product-design', 'ai']
      mockSessionStorage.store['techlabs-track-selection'] = JSON.stringify(tracks)

      const result = loadTrackSelection()

      expect(result).toEqual(tracks)
    })

    it('returns empty array when no data stored', () => {
      const result = loadTrackSelection()

      expect(result).toEqual([])
    })

    it('filters out invalid track keys', () => {
      const mixedData = ['web-dev', 'invalid-track', 'data-science', 123]
      mockSessionStorage.store['techlabs-track-selection'] = JSON.stringify(mixedData)

      const result = loadTrackSelection()

      expect(result).toEqual(['web-dev', 'data-science'])
    })

    it('handles malformed JSON gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      mockSessionStorage.store['techlabs-track-selection'] = 'invalid-json{'

      const result = loadTrackSelection()

      expect(result).toEqual([])
      expect(consoleSpy).toHaveBeenCalled()

      consoleSpy.mockRestore()
    })

    it('handles non-array data gracefully', () => {
      mockSessionStorage.store['techlabs-track-selection'] = JSON.stringify('not-an-array')

      const result = loadTrackSelection()

      expect(result).toEqual([])
    })
  })

  describe('clearTrackSelection', () => {
    it('removes track selection from sessionStorage', () => {
      clearTrackSelection()

      expect(mockSessionStorage.removeItem).toHaveBeenCalledWith('techlabs-track-selection')
    })

    it('handles storage errors gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      mockSessionStorage.removeItem.mockImplementation(() => {
        throw new Error('Storage error')
      })

      expect(() => clearTrackSelection()).not.toThrow()
      expect(consoleSpy).toHaveBeenCalled()

      consoleSpy.mockRestore()
    })
  })

  describe('trackIdsToQueryParam', () => {
    it('converts track IDs to comma-separated string', () => {
      const tracks: TrackKey[] = ['web-dev', 'data-science', 'ai']

      const result = trackIdsToQueryParam(tracks)

      expect(result).toBe('web-dev,data-science,ai')
    })

    it('handles empty array', () => {
      const result = trackIdsToQueryParam([])

      expect(result).toBe('')
    })

    it('handles single track', () => {
      const result = trackIdsToQueryParam(['product-design'])

      expect(result).toBe('product-design')
    })
  })

  describe('queryParamToTrackIds', () => {
    it('parses comma-separated track IDs', () => {
      const param = 'web-dev,data-science,ai'

      const result = queryParamToTrackIds(param)

      expect(result).toEqual(['web-dev', 'data-science', 'ai'])
    })

    it('filters out invalid track IDs', () => {
      const param = 'web-dev,invalid-track,data-science,another-invalid'

      const result = queryParamToTrackIds(param)

      expect(result).toEqual(['web-dev', 'data-science'])
    })

    it('handles null parameter', () => {
      const result = queryParamToTrackIds(null)

      expect(result).toEqual([])
    })

    it('handles empty string', () => {
      const result = queryParamToTrackIds('')

      expect(result).toEqual([])
    })

    it('trims whitespace around track IDs', () => {
      const param = ' web-dev , data-science , ai '

      const result = queryParamToTrackIds(param)

      expect(result).toEqual(['web-dev', 'data-science', 'ai'])
    })
  })
})
