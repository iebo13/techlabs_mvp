export const HOME_PAGE_QUERY = /* groq */ `{
  "settings": *[_type == "siteSettings"][0] {
    hero,
    applicationDeadlineISO,
    video,
    features,
    numbers,
    support
  },
  "tracks": *[_type == "track"] | order(trackId asc) {
    "id": trackId,
    label
  },
  "partners": *[_type == "partner"] | order(name asc) {
    name,
    logoUrl,
    "logoAssetUrl": logo.asset->url,
    "href": website
  },
  "stories": *[_type == "story"] | order(graduationDate desc) [0...3] {
    _id,
    "id": _id,
    name,
    title,
    excerpt,
    fullDescription,
    imageUrl,
    "imageAssetUrl": image.asset->url,
    "href": "/stories/" + slug.current,
    track,
    trackLabel,
    graduationDate,
    location,
    currentRole,
    company,
    achievements,
    photoCredit
  },
  "faqs": *[_type == "faq"] | order(order asc) [0...4] {
    "q": question,
    "a": answer
  }
}`
