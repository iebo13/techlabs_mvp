import { type Analytics, getAnalytics, isSupported, logEvent as firebaseLogEvent } from 'firebase/analytics'
import { type FirebaseApp, getApps, initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

const hasRequiredConfig = Boolean(firebaseConfig.apiKey && firebaseConfig.appId && firebaseConfig.measurementId)

const analyticsEnabled = hasRequiredConfig && (import.meta.env.PROD || import.meta.env.VITE_ENABLE_ANALYTICS === 'true')

let firebaseApp: FirebaseApp | null = null
let analyticsPromise: Promise<Analytics | null> | null = null

const getFirebaseApp = (): FirebaseApp | null => {
  if (!hasRequiredConfig) return null
  if (firebaseApp) return firebaseApp

  firebaseApp = getApps()[0] ?? initializeApp(firebaseConfig)

  return firebaseApp
}

export const getAnalyticsInstance = (): Promise<Analytics | null> => {
  if (!analyticsEnabled) return Promise.resolve(null)

  if (!analyticsPromise) {
    analyticsPromise = (async () => {
      const supported = await isSupported()
      const app = getFirebaseApp()

      if (!supported || !app) return null

      return getAnalytics(app)
    })().catch(() => null)
  }

  return analyticsPromise
}

export const logAnalyticsEvent = async (eventName: string, params?: Record<string, unknown>): Promise<void> => {
  const analytics = await getAnalyticsInstance()

  if (!analytics) return

  firebaseLogEvent(analytics, eventName, params)
}

export const initializeAnalytics = (): void => {
  void getAnalyticsInstance()
}
