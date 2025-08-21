/**
 * Tests for date utilities
 */

import { vi } from 'vitest'

import { differenceInWeeks, differenceInDays, formatDeadlineText } from '../date'

describe('Date utilities', () => {
    describe('differenceInWeeks', () => {
        it('calculates weeks correctly for positive differences', () => {
            const earlier = new Date('2025-01-01')
            const later = new Date('2025-01-15') // 14 days = 2 weeks

            expect(differenceInWeeks(later, earlier)).toBe(2)
        })

        it('calculates partial weeks by rounding down', () => {
            const earlier = new Date('2025-01-01')
            const later = new Date('2025-01-08') // 7 days = 1 week

            expect(differenceInWeeks(later, earlier)).toBe(1)

            const later2 = new Date('2025-01-09') // 8 days = 1 week (rounded down)
            expect(differenceInWeeks(later2, earlier)).toBe(1)

            const later3 = new Date('2025-01-15') // 14 days = 2 weeks
            expect(differenceInWeeks(later3, earlier)).toBe(2)
        })
    })

    describe('differenceInDays', () => {
        it('calculates days correctly', () => {
            const earlier = new Date('2025-01-01')
            const later = new Date('2025-01-05') // 4 days

            expect(differenceInDays(later, earlier)).toBe(4)
        })

        it('handles single day differences', () => {
            const earlier = new Date('2025-01-01')
            const later = new Date('2025-01-02') // 1 day

            expect(differenceInDays(later, earlier)).toBe(1)
        })
    })

    describe('formatDeadlineText', () => {
        beforeEach(() => {
            // Mock current date to be consistent
            vi.useFakeTimers()
            vi.setSystemTime(new Date('2025-01-01T12:00:00Z'))
        })

        afterEach(() => {
            vi.useRealTimers()
        })

        it('shows weeks when > 7 days remaining', () => {
            const deadlineISO = '2025-01-15T00:00:00Z' // 14 days from mock date
            const result = formatDeadlineText(deadlineISO)

            expect(result).toBe('Applications close in 2 weeks for next batch')
        })

        it('shows days when exactly 7 days remaining', () => {
            const deadlineISO = '2025-01-08T00:00:00Z' // 7 days from mock date  
            const result = formatDeadlineText(deadlineISO)

            expect(result).toBe('Applications close in 7 days for next batch')
        })

        it('shows days when less than 1 week remaining', () => {
            const deadlineISO = '2025-01-04T00:00:00Z' // 3 days from mock date
            const result = formatDeadlineText(deadlineISO)

            expect(result).toBe('Applications close in 3 days for next batch')
        })

        it('shows singular day when exactly 1 day', () => {
            const deadlineISO = '2025-01-02T00:00:00Z' // 1 day from mock date
            const result = formatDeadlineText(deadlineISO)

            expect(result).toBe('Applications close in 1 day for next batch')
        })

        it('shows closed message when deadline has passed', () => {
            const deadlineISO = '2024-12-31T00:00:00Z' // Past date
            const result = formatDeadlineText(deadlineISO)

            expect(result).toBe('Applications are currently closed')
        })
    })
})
