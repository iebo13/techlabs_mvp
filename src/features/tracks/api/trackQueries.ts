export const ALL_TRACKS_QUERY = /* groq */ `
  *[_type == "track"] | order(trackId asc) {
    _id,
    "id": trackId,
    applicationDeadline,
    spotsAvailable,
    icon,
    imageUrl
  }
`

export const TRACK_BY_ID_QUERY = /* groq */ `
  *[_type == "track" && trackId == $trackId][0] {
    _id,
    "id": trackId,
    "label": label[$lang],
    "description": description[$lang],
    "tagline": tagline[$lang],
    "intro": intro[$lang],
    "duration": duration[$lang],
    "format": format[$lang],
    "nextCohort": nextCohort[$lang],
    "skills": skills[$lang],
    "careerPaths": careerPaths[$lang],
    applicationDeadline,
    spotsAvailable,
    icon,
    imageUrl,
    "personas": personas[] {
      "title": title[$lang],
      "body": body[$lang],
      icon
    },
    "techStack": techStack[] {
      name,
      icon
    },
    "curriculum": curriculum[] {
      "title": title[$lang],
      "duration": duration[$lang],
      "outcomes": outcomes[$lang]
    },
    "projects": projects[] {
      "title": title[$lang],
      "description": description[$lang],
      skills
    },
    "faq": faq[] {
      "q": q[$lang],
      "a": a[$lang]
    }
  }
`
