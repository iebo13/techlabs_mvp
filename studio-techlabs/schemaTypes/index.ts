import { event } from './event'
import { faq } from './faq'
import { localeString, localeText, localeStringArray } from './locale'
import { partner } from './partner'
import { siteSettings } from './siteSettings'
import { story } from './story'
import { teamMember } from './teamMember'
import { track, trackPersona, trackTechStackItem, trackCurriculumPhase, trackProject, trackFaq } from './track'

export const schemaTypes = [
  localeString,
  localeText,
  localeStringArray,
  track,
  trackPersona,
  trackTechStackItem,
  trackCurriculumPhase,
  trackProject,
  trackFaq,
  event,
  story,
  partner,
  faq,
  teamMember,
  siteSettings,
]
