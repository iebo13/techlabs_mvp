export const ABOUT_CONTENT_QUERY = /* groq */ `
  *[_type == "siteSettings"][0].about {
    mission,
    program,
    timeline,
    team {
      title,
      description,
      departments[] {
        key,
        label,
        description
      }
    },
    contact,
    story {
      hook,
      body,
      quote {
        text,
        name,
        role
      }
    }
  }
`

export const TEAM_MEMBERS_QUERY = /* groq */ `
  *[_type == "teamMember"] | order(department asc, order asc) {
    _id,
    name,
    role,
    department,
    bio,
    imageUrl,
    "imageAssetUrl": image.asset->url,
    socialLinks {
      linkedin,
      github
    }
  }
`

export const ALL_FAQS_QUERY = /* groq */ `
  *[_type == "faq"] | order(order asc) {
    _id,
    "q": question[$lang],
    "a": answer[$lang]
  }
`
