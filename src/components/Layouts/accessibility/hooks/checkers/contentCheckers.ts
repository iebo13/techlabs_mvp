import type { AccessibilityIssue } from '../../types/accessibility.types'
import { generateUniqueSelector, TRUNCATE_LENGTH } from './selectorUtils'

export const checkImages = (issues: AccessibilityIssue[]) => {
  const images = document.querySelectorAll('img')

  images.forEach((img, index) => {
    const alt = img.getAttribute('alt')
    const ariaLabel = img.getAttribute('aria-label')
    const role = img.getAttribute('role')

    if (alt === null && !ariaLabel && role !== 'presentation') {
      issues.push({
        type: 'error',
        message: `Image missing alt text: ${img.src?.slice(-TRUNCATE_LENGTH) || `Image ${index + 1}`}`,
        element: img,
        selector: generateUniqueSelector(img, index),
      })
    }

    if (alt && /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(alt)) {
      issues.push({
        type: 'warning',
        message: `Alt text contains filename: "${alt}"`,
        element: img,
        selector: generateUniqueSelector(img, index),
      })
    }
  })
}

export const checkHeadings = (issues: AccessibilityIssue[]) => {
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
  let previousLevel = 0

  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.charAt(1))

    if (level > previousLevel + 1) {
      issues.push({
        type: 'warning',
        message: `Heading hierarchy skip: ${heading.tagName} follows H${previousLevel || 'none'} - "${heading.textContent?.slice(0, TRUNCATE_LENGTH)}"`,
        element: heading as HTMLElement,
        selector: generateUniqueSelector(heading, index),
      })
    }

    if (!heading.textContent?.trim()) {
      issues.push({
        type: 'error',
        message: `Empty heading found: ${heading.tagName}`,
        element: heading as HTMLElement,
        selector: generateUniqueSelector(heading, index),
      })
    }

    previousLevel = level
  })

  const h1Tags = document.querySelectorAll('h1')

  if (h1Tags.length > 1) {
    h1Tags.forEach((h1, index) => {
      issues.push({
        type: 'error',
        message: `Multiple H1 tags found (${h1Tags.length}): "${h1.textContent?.slice(0, 30)}"`,
        element: h1 as HTMLElement,
        selector: generateUniqueSelector(h1, index),
      })
    })
  }
}

export const checkLinks = (issues: AccessibilityIssue[]) => {
  const links = document.querySelectorAll('a[href]')

  links.forEach((link, index) => {
    const hasContent = link.textContent?.trim()
    const ariaLabel = link.getAttribute('aria-label')
    const title = link.getAttribute('title')
    const href = link.getAttribute('href')

    if (!hasContent && !ariaLabel && !title) {
      issues.push({
        type: 'error',
        message: `Link missing accessible name: ${href?.slice(0, 30)}`,
        element: link as HTMLElement,
        selector: generateUniqueSelector(link, index),
      })
    }

    const vagueTexts = ['click here', 'read more', 'learn more', 'here', 'more']

    if (hasContent && vagueTexts.includes(hasContent.toLowerCase())) {
      issues.push({
        type: 'warning',
        message: `Vague link text: "${hasContent}"`,
        element: link as HTMLElement,
        selector: generateUniqueSelector(link, index),
      })
    }

    const isExternal = href?.startsWith('http') && !href.includes(window.location.hostname)

    if (isExternal && !link.getAttribute('rel')?.includes('noopener')) {
      issues.push({
        type: 'warning',
        message: 'External link missing rel="noopener noreferrer"',
        element: link as HTMLElement,
        selector: generateUniqueSelector(link, index),
      })
    }
  })
}
