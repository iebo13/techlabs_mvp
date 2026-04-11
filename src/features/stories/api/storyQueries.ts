export const ALL_STORIES_QUERY = /* groq */ `
  *[_type == "story"] | order(graduationDate desc) {
    _id,
    "id": _id,
    name,
    title,
    excerpt,
    fullDescription,
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
    beforeRole,
    achievements,
    quote,
    narrative,
    metrics,
    photoCredit
  }
`

export const STORY_BY_SLUG_QUERY = /* groq */ `
  *[_type == "story" && slug.current == $slug][0] {
    _id,
    "id": _id,
    name,
    title,
    excerpt,
    fullDescription,
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
    beforeRole,
    achievements,
    quote,
    narrative,
    metrics,
    photoCredit
  }
`
