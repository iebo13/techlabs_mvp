import { i18n } from '../internationalization'

export const differenceInWeeks = (laterDate: Date, earlierDate: Date): number => {
  const diffTime = laterDate.getTime() - earlierDate.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return Math.floor(diffDays / 7)
}

export const differenceInDays = (laterDate: Date, earlierDate: Date): number => {
  const diffTime = laterDate.getTime() - earlierDate.getTime()

  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export const formatDeadlineText = (deadlineISO: string): string => {
  const deadline = new Date(deadlineISO)
  const now = new Date()

  if (deadline <= now) {
    return i18n.t('applications.closed')
  }

  const days = differenceInDays(deadline, now)

  if (days > 7) {
    const weeks = Math.floor(days / 7)

    return i18n.t('applications.closeIn.weeks', { count: weeks })
  }

  return i18n.t('applications.closeIn.days', { count: days })
}
