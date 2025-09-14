import React, { lazy, Suspense } from 'react'
import { LoadingFallback } from '@/components'
import { CareersPage, PrivacyPage, ImprintPage } from '@/config/placeholderPages'

const HomePage = lazy(() =>
  import('@/features/home/page/HomePage').then(module => ({ default: module.HomePage }))
)

const TracksPage = lazy(() =>
  import('@/features/tracks/page/TracksPage').then(module => ({ default: module.TracksPage }))
)

const EventsPage = lazy(() =>
  import('@/features/events/page/EventsPage').then(module => ({ default: module.EventsPage }))
)

const StoriesPage = lazy(() =>
  import('@/features/stories/page/StoriesPage').then(module => ({ default: module.StoriesPage }))
)

const PartnersPage = lazy(() =>
  import('@/features/partners/page/PartnersPage').then(module => ({ default: module.PartnersPage }))
)

const AboutPage = lazy(() =>
  import('@/features/about/page/AboutPage').then(module => ({ default: module.AboutPage }))
)


export type RouteConfig = {
  path: string
  element: React.ReactElement
  lazy?: boolean
}

export const routes: RouteConfig[] = [
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingFallback variant="page" />}>
        <HomePage />
      </Suspense>
    ),
    lazy: true,
  },
  {
    path: '/tracks',
    element: (
      <Suspense fallback={<LoadingFallback variant="page" />}>
        <TracksPage />
      </Suspense>
    ),
    lazy: true,
  },
  {
    path: '/events',
    element: (
      <Suspense fallback={<LoadingFallback variant="page" />}>
        <EventsPage />
      </Suspense>
    ),
    lazy: true,
  },
  {
    path: '/stories',
    element: (
      <Suspense fallback={<LoadingFallback variant="page" />}>
        <StoriesPage />
      </Suspense>
    ),
    lazy: true,
  },
  {
    path: '/partners',
    element: (
      <Suspense fallback={<LoadingFallback variant="page" />}>
        <PartnersPage />
      </Suspense>
    ),
    lazy: true,
  },
  {
    path: '/about',
    element: (
      <Suspense fallback={<LoadingFallback variant="page" />}>
        <AboutPage />
      </Suspense>
    ),
    lazy: true,
  },
  {
    path: '/careers',
    element: <CareersPage />,
  },
  {
    path: '/privacy',
    element: <PrivacyPage />,
  },
  {
    path: '/imprint',
    element: <ImprintPage />,
  },
]
