/**
 * Date utilities for deadline calculations
 * Computes weeks/days remaining until application deadline
 */

/**
 * Calculate the difference in weeks between two dates
 */
export const differenceInWeeks = (laterDate: Date, earlierDate: Date): number => {
  const diffTime = laterDate.getTime() - earlierDate.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.floor(diffDays / 7) // Use floor to get complete weeks
}

/**
 * Calculate the difference in days between two dates
 */
export const differenceInDays = (laterDate: Date, earlierDate: Date): number => {
  const diffTime = laterDate.getTime() - earlierDate.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

/**
 * Format deadline text based on time remaining
 * Shows weeks if > 7 days, otherwise shows days
 */
export const formatDeadlineText = (deadlineISO: string): string => {
  const deadline = new Date(deadlineISO)
  const now = new Date()

  // If deadline has passed, return appropriate message
  if (deadline <= now) {
    return 'Applications are currently closed'
  }

  const days = differenceInDays(deadline, now)

  // If more than 7 days, show in weeks
  if (days > 7) {
    const weeks = Math.floor(days / 7)
    const weekText = weeks === 1 ? 'week' : 'weeks'
    return `Applications close in ${weeks} ${weekText} for next batch`
  }

  // Otherwise show in days
  const dayText = days === 1 ? 'day' : 'days'
  return `Applications close in ${days} ${dayText} for next batch`
}
