export const ALL_PARTNERS_QUERY = /* groq */ `
  *[_type == "partner"] | order(name asc) {
    _id,
    name,
    logoUrl,
    "logoAssetUrl": logo.asset->url,
    description,
    website,
    category,
    tier
  }
`
