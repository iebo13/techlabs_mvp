import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import deTranslations from './locales/deutsch.json'
import enTranslations from './locales/english.json'

const resources = {
  en: {
    common: enTranslations,
  },
  de: {
    common: deTranslations,
  },
}

const SUPPORTED_LANGUAGES = ['en', 'de']

const normalizeLanguage = (lng: string): string => {
  const baseLanguage = lng.split('-')[0].toLowerCase()

  return SUPPORTED_LANGUAGES.includes(baseLanguage) ? baseLanguage : 'en'
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: SUPPORTED_LANGUAGES,
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common'],

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
      convertDetectedLanguage: normalizeLanguage,
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },

    debug: import.meta.env.DEV,
  })

export default i18n
