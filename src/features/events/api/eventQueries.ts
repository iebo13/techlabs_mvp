export const ALL_EVENTS_QUERY = /* groq */ `
  *[_type == "event"] | order(date asc) {
    _id,
    title,
    blurb,
    date,
    location,
    type,
    "id": _id,
    "slug": slug.current,
    "href": "/events/" + slug.current,
    imageUrl,
    "imageAssetUrl": image.asset->url,
    description,
    highlights,
    agenda,
    externalUrl
  }
`

export const EVENT_BY_SLUG_QUERY = /* groq */ `
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    blurb,
    date,
    location,
    type,
    "id": _id,
    "slug": slug.current,
    "href": "/events/" + slug.current,
    imageUrl,
    "imageAssetUrl": image.asset->url,
    description,
    highlights,
    agenda,
    externalUrl
  }
`
