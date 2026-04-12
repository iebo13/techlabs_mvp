export type TrackKey = 'web-dev' | 'data-science' | 'product-design' | 'ai'

export type Track = {
  id: TrackKey
  label: string
}

export type Persona = {
  title: string
  body: string
  icon: string
}

export type TechStackItem = {
  name: string
  icon: string
}

export type CurriculumPhase = {
  title: string
  duration: string
  outcomes: string[]
}

export type ProjectShowcase = {
  title: string
  description: string
  skills: string[]
}

export type TrackFaq = {
  q: string
  a: string
}

export type DetailedTrack = {
  id: string
  label: string
  description: string
  tagline: string
  intro: string[]
  duration: string
  format: string
  skills: string[]
  projects: ProjectShowcase[]
  careerPaths: string[]
  personas: Persona[]
  techStack: TechStackItem[]
  curriculum: CurriculumPhase[]
  faq: TrackFaq[]
  nextCohort: string
  applicationDeadline: string
  spotsAvailable: number
  icon: string
  imageUrl?: string
}

export type TrackCardProps = {
  track: DetailedTrack
}
