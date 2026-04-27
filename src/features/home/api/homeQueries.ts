export const HOME_PAGE_QUERY = /* groq */ `{
  "settings": *[_type == "siteSettings"][0] {
    "hero": hero {
      "title": title[$lang],
      "emphasis": emphasis[$lang],
      "subtitle": subtitle[$lang]
    },
    applicationDeadlineISO,
    video,
    "features": features[] {
      _key,
      icon,
      "title": title[$lang],
      "body": body[$lang]
    },
    "numbers": numbers[] {
      _key,
      "label": label[$lang],
      value
    },
    "support": support {
      "title": title[$lang],
      "body": body[$lang],
      imageUrl,
      "cta": cta {
        "label": label[$lang],
        to
      }
    }
  },
  "tracks": *[_type == "track"] | order(trackId asc) {
    "id": trackId,
    "label": label[$lang]
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
    "title": title[$lang],
    "excerpt": excerpt[$lang],
    "fullDescription": fullDescription[$lang],
    imageUrl,
    "imageAssetUrl": image.asset->url,
    "href": "/stories/" + slug.current,
    track,
    trackLabel,
    graduationDate,
    location,
    currentRole,
    company,
    "achievements": achievements[$lang],
    photoCredit
  },
  "faqs": *[_type == "faq"] | order(order asc) [0...4] {
    "q": question[$lang],
    "a": answer[$lang]
  }
}`
