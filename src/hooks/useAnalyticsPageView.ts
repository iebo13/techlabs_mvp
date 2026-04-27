import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { logAnalyticsEvent } from '@/config/firebase'

export const useAnalyticsPageView = (): void => {
  const location = useLocation()

  useEffect(() => {
    const path = location.pathname + location.search

    void logAnalyticsEvent('page_view', {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    })
  }, [location.pathname, location.search])
}
