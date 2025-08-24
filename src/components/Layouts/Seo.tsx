import React, { useEffect } from 'react'

export type SEOProps = {
  title: string
  description: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  author?: string
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tags?: string[]
}

/**
 * SEO - Comprehensive SEO component for managing meta tags and structured data
 * Provides proper meta tags, Open Graph tags, and Twitter Card support
 * Ensures each page has unique, descriptive metadata for better search visibility
 * Uses native document API for React 19 compatibility
 */
export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image = '/img/techlabs-og-image.jpg',
  url,
  type = 'website',
  author = 'TechLabs',
  publishedTime,
  modifiedTime,
  section,
  tags = [],
}) => {
  useEffect(() => {
    // Update document title
    document.title = title

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', description)

    // Update or create meta keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]')
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta')
        metaKeywords.setAttribute('name', 'keywords')
        document.head.appendChild(metaKeywords)
      }
      metaKeywords.setAttribute('content', keywords)
    }

    // Update or create meta author
    let metaAuthor = document.querySelector('meta[name="author"]')
    if (!metaAuthor) {
      metaAuthor = document.createElement('meta')
      metaAuthor.setAttribute('name', 'author')
      document.head.appendChild(metaAuthor)
    }
    metaAuthor.setAttribute('content', author)

    // Update or create Open Graph tags
    const ogTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      {
        property: 'og:image',
        content: image.startsWith('http') ? image : `${window.location.origin}${image}`,
      },
      {
        property: 'og:url',
        content: url ? `${window.location.origin}${url}` : window.location.href,
      },
      { property: 'og:type', content: type },
      { property: 'og:site_name', content: 'TechLabs' },
      { property: 'og:locale', content: 'en_US' },
    ]

    ogTags.forEach(({ property, content }) => {
      let ogTag = document.querySelector(`meta[property="${property}"]`)
      if (!ogTag) {
        ogTag = document.createElement('meta')
        ogTag.setAttribute('property', property)
        document.head.appendChild(ogTag)
      }
      ogTag.setAttribute('content', content)
    })

    // Update or create Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      {
        name: 'twitter:image',
        content: image.startsWith('http') ? image : `${window.location.origin}${image}`,
      },
      { name: 'twitter:site', content: '@techlabs' },
    ]

    twitterTags.forEach(({ name, content }) => {
      let twitterTag = document.querySelector(`meta[name="${name}"]`)
      if (!twitterTag) {
        twitterTag = document.createElement('meta')
        twitterTag.setAttribute('name', name)
        document.head.appendChild(twitterTag)
      }
      twitterTag.setAttribute('content', content)
    })

    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute(
      'href',
      url ? `${window.location.origin}${url}` : window.location.href
    )

    // Cleanup function to remove dynamically added meta tags
    return () => {
      // Note: We don't remove meta tags on unmount as they might be needed for other components
      // The next SEO component will update them appropriately
    }
  }, [
    title,
    description,
    keywords,
    image,
    url,
    type,
    author,
    publishedTime,
    modifiedTime,
    section,
    tags,
  ])

  // This component doesn't render anything visible
  return null
}
