export const ALL_TRACKS_QUERY = /* groq */ `
  *[_type == "track"] | order(trackId asc) {
    _id,
    "id": trackId,
    "label": label[$lang],
    applicationDeadline,
    spotsAvailable,
    icon
  }
`
