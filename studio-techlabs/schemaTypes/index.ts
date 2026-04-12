import { event } from './event'
import { faq } from './faq'
import { localeString, localeText, localeStringArray } from './locale'
import { partner } from './partner'
import { siteSettings } from './siteSettings'
import { story } from './story'
import { teamMember } from './teamMember'
import { track } from './track'

export const schemaTypes = [
  localeString,
  localeText,
  localeStringArray,
  track,
  event,
  story,
  partner,
  faq,
  teamMember,
  siteSettings,
]
