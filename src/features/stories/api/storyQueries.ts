export const ALL_STORIES_QUERY = /* groq */ `
  *[_type == "story"] | order(graduationDate desc) {
    _id,
    "id": _id,
    name,
    "title": title[$lang],
    "excerpt": excerpt[$lang],
    "fullDescription": fullDescription[$lang],
    imageUrl,
    "imageAssetUrl": image.asset->url,
    coverImageUrl,
    "coverImageAssetUrl": coverImage.asset->url,
    "href": "/stories/" + slug.current,
    track,
    trackLabel,
    graduationDate,
    location,
    currentRole,
    company,
    "beforeRole": beforeRole[$lang],
    "achievements": achievements[$lang],
    "quote": quote[$lang],
    "narrative": narrative {
      "challenge": challenge[$lang],
      "discovery": discovery[$lang],
      "experience": experience[$lang],
      "transformation": transformation[$lang],
      "outcome": outcome[$lang]
    },
    "metrics": metrics[] {
      _key,
      "label": label[$lang],
      value
    },
    photoCredit
  }
`

export const STORY_BY_SLUG_QUERY = /* groq */ `
  *[_type == "story" && slug.current == $slug][0] {
    _id,
    "id": _id,
    name,
    "title": title[$lang],
    "excerpt": excerpt[$lang],
    "fullDescription": fullDescription[$lang],
    imageUrl,
    "imageAssetUrl": image.asset->url,
    coverImageUrl,
    "coverImageAssetUrl": coverImage.asset->url,
    "href": "/stories/" + slug.current,
    track,
    trackLabel,
    graduationDate,
    location,
    currentRole,
    company,
    "beforeRole": beforeRole[$lang],
    "achievements": achievements[$lang],
    "quote": quote[$lang],
    "narrative": narrative {
      "challenge": challenge[$lang],
      "discovery": discovery[$lang],
      "experience": experience[$lang],
      "transformation": transformation[$lang],
      "outcome": outcome[$lang]
    },
    "metrics": metrics[] {
      _key,
      "label": label[$lang],
      value
    },
    photoCredit
  }
`
