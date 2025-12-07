import type { AccessibilityIssue } from '../../types/accessibility.types'
import { generateUniqueSelector } from './selectorUtils'

export const checkFormControls = (issues: AccessibilityIssue[]) => {
  const formInputs = document.querySelectorAll('input, select, textarea')

  formInputs.forEach((input, index) => {
    const id = input.getAttribute('id')
    const ariaLabel = input.getAttribute('aria-label')
    const ariaLabelledBy = input.getAttribute('aria-labelledby')
    const hasLabel = id ? document.querySelector(`label[for="${id}"]`) : null
    const type = input.getAttribute('type')

    if (type === 'hidden' || type === 'submit' || type === 'button') return

    if (!ariaLabel && !ariaLabelledBy && !hasLabel) {
      issues.push({
        type: 'error',
        message: `Form ${input.tagName.toLowerCase()} missing accessible label`,
        element: input as HTMLElement,
        selector: generateUniqueSelector(input, index),
      })
    }
  })
}

export const checkButtons = (issues: AccessibilityIssue[]) => {
  const buttons = document.querySelectorAll('button, [role="button"]')

  buttons.forEach((button, index) => {
    const hasContent = button.textContent?.trim()
    const ariaLabel = button.getAttribute('aria-label')
    const ariaLabelledBy = button.getAttribute('aria-labelledby')
    const title = button.getAttribute('title')

    if (!hasContent && !ariaLabel && !ariaLabelledBy && !title) {
      issues.push({
        type: 'error',
        message: 'Button missing accessible name',
        element: button as HTMLElement,
        selector: generateUniqueSelector(button, index),
      })
    }
  })
}

export const checkARIA = (issues: AccessibilityIssue[]) => {
  const elementsWithRole = document.querySelectorAll('[role]')
  const validRoles = [
    'alert',
    'alertdialog',
    'button',
    'checkbox',
    'dialog',
    'gridcell',
    'link',
    'listbox',
    'menu',
    'menuitem',
    'option',
    'progressbar',
    'radio',
    'region',
    'slider',
    'status',
    'tab',
    'tabpanel',
    'textbox',
    'navigation',
    'main',
    'complementary',
    'banner',
    'contentinfo',
    'form',
    'search',
    'list',
    'listitem',
    'img',
    'presentation',
    'none',
    'article',
    'heading',
    'group',
    'separator',
  ]

  elementsWithRole.forEach((el, index) => {
    const role = el.getAttribute('role')

    if (role && !validRoles.includes(role)) {
      issues.push({
        type: 'error',
        message: `Invalid ARIA role: "${role}"`,
        element: el as HTMLElement,
        selector: generateUniqueSelector(el, index),
      })
    }
  })
}

export const checkKeyboardNavigation = (issues: AccessibilityIssue[]) => {
  const positiveTabIndex = document.querySelectorAll('[tabindex]:not([tabindex="0"]):not([tabindex="-1"])')

  positiveTabIndex.forEach((el, index) => {
    const tabIndex = el.getAttribute('tabindex')

    if (tabIndex && parseInt(tabIndex) > 0) {
      issues.push({
        type: 'warning',
        message: `Positive tabindex (${tabIndex}) disrupts natural tab order`,
        element: el as HTMLElement,
        selector: generateUniqueSelector(el, index),
      })
    }
  })
}

export const checkLandmarks = (issues: AccessibilityIssue[]) => {
  const mainContent = document.querySelector('main, [role="main"]')
  const navigation = document.querySelector('nav, [role="navigation"]')

  if (!mainContent) {
    issues.push({
      type: 'warning',
      message: 'Page missing <main> landmark region',
      element: document.body,
      selector: 'body',
    })
  }

  if (!navigation) {
    issues.push({
      type: 'info',
      message: 'Page missing <nav> landmark region',
      element: document.body,
      selector: 'body',
    })
  }
}
