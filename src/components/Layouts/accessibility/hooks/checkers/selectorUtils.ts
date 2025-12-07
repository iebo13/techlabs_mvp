/**
 * Generates a unique CSS selector for an element
 */
export const generateUniqueSelector = (element: Element, index: number): string => {
  if (element.id) {
    return `#${element.id}`
  }

  if (element.classList.length > 0) {
    const classes = [...element.classList].slice(0, 2).join('.')

    return `${element.tagName.toLowerCase()}.${classes}`
  }

  const parent = element.parentElement

  if (parent) {
    const parentTag = parent.tagName.toLowerCase()
    const parentId = parent.id ? `#${parent.id}` : parentTag

    return `${parentId} > ${element.tagName.toLowerCase()}:nth-child(${index + 1})`
  }

  return `${element.tagName.toLowerCase()}:nth-child(${index + 1})`
}

/** Truncation length for messages */
export const TRUNCATE_LENGTH = 40
