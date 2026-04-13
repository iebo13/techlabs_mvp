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

export const PARTNER_TESTIMONIALS_QUERY = /* groq */ `
  *[_type == "partnerTestimonial"] | order(order asc) {
    "quote": quote[$lang],
    name,
    role,
    company
  }
`

export const PARTNER_FAQS_QUERY = /* groq */ `
  *[_type == "faq" && section == "partners"] | order(order asc) {
    "q": question[$lang],
    "a": answer[$lang]
  }
`

export const PARTNER_IMPACT_METRICS_QUERY = /* groq */ `
  *[_type == "partnerImpactMetric"] | order(order asc) {
    value,
    "label": label[$lang]
  }
`
