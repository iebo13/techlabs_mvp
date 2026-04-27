export const ALL_EVENTS_QUERY = /* groq */ `
  *[_type == "event"] | order(date asc) {
    _id,
    "id": _id,
    "title": title[$lang],
    "blurb": blurb[$lang],
    date,
    location,
    type,
    "slug": slug.current,
    "href": "/events/" + slug.current,
    imageUrl,
    "imageAssetUrl": image.asset->url,
    "description": description[$lang],
    "highlights": highlights[$lang],
    "agenda": agenda[] {
      _key,
      time,
      "title": title[$lang]
    },
    externalUrl
  }
`

export const EVENT_BY_SLUG_QUERY = /* groq */ `
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    "id": _id,
    "title": title[$lang],
    "blurb": blurb[$lang],
    date,
    location,
    type,
    "slug": slug.current,
    "href": "/events/" + slug.current,
    imageUrl,
    "imageAssetUrl": image.asset->url,
    "description": description[$lang],
    "highlights": highlights[$lang],
    "agenda": agenda[] {
      _key,
      time,
      "title": title[$lang]
    },
    externalUrl
  }
`
