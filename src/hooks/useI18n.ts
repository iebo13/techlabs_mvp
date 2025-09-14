import { useTranslation } from 'react-i18next'

export interface Language {
    code: string
    flag: string
    name: string
}

export interface UseI18nReturn {
    t: (key: string, options?: Record<string, unknown>) => string
    tWithFallback: (key: string, fallback: string, options?: Record<string, unknown>) => string
    currentLanguage: string
    availableLanguages: Language[]
    changeLanguage: (languageCode: string) => Promise<void>
    isLanguageSupported: (languageCode: string) => boolean
    formatDate: (date: Date | string, options?: Intl.DateTimeFormatOptions) => string
    formatNumber: (number: number, options?: Intl.NumberFormatOptions) => string
    formatCurrency: (amount: number, currency?: string) => string
    isReady: boolean
    isLoading: boolean
}

const SUPPORTED_LANGUAGES: Language[] = [
    { code: 'en', flag: 'US', name: 'English' },
    { code: 'de', flag: 'DE', name: 'Deutsch' },
]

export const useI18n = (): UseI18nReturn => {
    const { t, i18n, ready } = useTranslation()

    const isLanguageSupported = (languageCode: string) => {
        return SUPPORTED_LANGUAGES.some(lang => lang.code === languageCode)
    }

    const tWithFallback = (key: string, fallback: string, options?: Record<string, unknown>) => {
        const translation = t(key, options)

        return translation === key ? fallback : translation
    }

    const changeLanguage = async (languageCode: string) => {
        if (isLanguageSupported(languageCode)) {
            await i18n.changeLanguage(languageCode)
            document.documentElement.lang = languageCode
        }
    }

    const formatDate = (date: Date | string, options?: Intl.DateTimeFormatOptions) => {
        const dateObj = typeof date === 'string' ? new Date(date) : date

        return new Intl.DateTimeFormat(i18n.language, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            ...options,
        }).format(dateObj)
    }

    const formatNumber = (number: number, options?: Intl.NumberFormatOptions) => {
        return new Intl.NumberFormat(i18n.language, options).format(number)
    }

    const formatCurrency = (amount: number, currency = 'EUR') => {
        return new Intl.NumberFormat(i18n.language, {
            style: 'currency',
            currency,
        }).format(amount)
    }

    const availableLanguages = SUPPORTED_LANGUAGES
    const currentLanguage = i18n.language
    const isReady = ready
    const isLoading = !ready

    return {
        t,
        tWithFallback,

        currentLanguage,
        availableLanguages,
        changeLanguage,
        isLanguageSupported,

        formatDate,
        formatNumber,
        formatCurrency,

        isReady,
        isLoading,
    }
}
