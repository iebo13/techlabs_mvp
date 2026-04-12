export const ABOUT_CONTENT_QUERY = /* groq */ `
  *[_type == "siteSettings"][0].about {
    mission,
    program,
    timeline,
    team {
      title,
      description
    },
    contact
  }
`

export const TEAM_MEMBERS_QUERY = /* groq */ `
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    role,
    bio,
    imageUrl,
    "imageAssetUrl": image.asset->url
  }
`

export const ALL_FAQS_QUERY = /* groq */ `
  *[_type == "faq"] | order(order asc) {
    _id,
    "q": question[$lang],
    "a": answer[$lang]
  }
`
