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

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common'],

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,
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
