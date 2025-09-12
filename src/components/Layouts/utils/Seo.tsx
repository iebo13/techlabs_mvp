import React from 'react'
import { Helmet } from 'react-helmet-async'

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
 * SEO - Comprehensive SEO component using react-helmet-async
 * Provides proper meta tags, Open Graph tags, and Twitter Card support
 * Ensures each page has unique, descriptive metadata for better search visibility
 * Prevents duplicate tag accumulation through react-helmet-async's built-in deduplication
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
  const fullImageUrl = image.startsWith('http') ? image : `${window.location.origin}${image}`
  const fullUrl = url ? `${window.location.origin}${url}` : window.location.href

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />

      {/* Open Graph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="TechLabs" />
      <meta property="og:locale" content="en_US" />

      {/* Article-specific Open Graph tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && section && <meta property="article:section" content={section} />}
      {type === 'article' &&
        tags.length > 0 &&
        tags.map(tag => <meta key={`article-tag-${tag}`} property="article:tag" content={tag} />)}

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:site" content="@techlabs" />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  )
}
