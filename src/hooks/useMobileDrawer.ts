import { useState, useEffect } from 'react'

/**
 * Custom hook for managing mobile drawer state and interactions
 * Extracts mobile drawer logic from HeaderNav component
 */
export const useMobileDrawer = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  // Handle drawer toggle
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  // Handle drawer close
  const handleDrawerClose = () => {
    setMobileOpen(false)
  }

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileOpen) {
        handleDrawerClose()
      }
    }

    document.addEventListener('keydown', handleEscape)

    return () => document.removeEventListener('keydown', handleEscape)
  }, [mobileOpen])

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : 'unset'

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileOpen])

  return {
    mobileOpen,
    handleDrawerToggle,
    handleDrawerClose,
  }
}
