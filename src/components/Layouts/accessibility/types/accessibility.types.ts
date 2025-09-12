export type AccessibilityIssue = {
  type: 'error' | 'warning' | 'info'
  message: string
  element?: HTMLElement
  selector?: string
}

export type AccessibilityIssueListProps = {
  issues: AccessibilityIssue[]
  onIssueClick: (issue: AccessibilityIssue) => void
}
