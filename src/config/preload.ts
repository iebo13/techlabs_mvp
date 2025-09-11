export const preloadPages = () => {
  import('@/features/home/components/heroSection/HeroSection')

  setTimeout(() => {
    import('@/features/tracks/page/TracksPage')
  }, 2000)

  setTimeout(() => {
    import('@/features/about/page/AboutPage')
  }, 3000)
}

export const initializeApp = () => {
  if (import.meta.env.PROD) {
    preloadPages()
  }
}
