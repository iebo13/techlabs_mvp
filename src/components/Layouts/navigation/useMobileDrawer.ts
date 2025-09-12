import { useState, useEffect, useRef } from 'react'

export const useMobileDrawer = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const triggerButtonRef = useRef<HTMLButtonElement>(null)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleDrawerClose = () => {
    setMobileOpen(false)

    setTimeout(() => {
      triggerButtonRef.current?.focus()
    }, 100)
  }

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileOpen) {
        handleDrawerClose()
      }
    }

    document.addEventListener('keydown', handleEscape)

    return () => document.removeEventListener('keydown', handleEscape)
  }, [mobileOpen])

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
    triggerButtonRef,
  }
}
