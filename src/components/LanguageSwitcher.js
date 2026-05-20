import React from 'react'
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next'
import * as styles from './LanguageSwitcher.module.css'

const LanguageSwitcher = () => {
    const { changeLanguage, language } = useI18next()
    const { t } = useTranslation()

    const alternateLanguage = language === 'en' ? 'DE' : 'EN'
    const tooltip = language === 'en' ? t('tooltipSwitchToDe') : t('tooltipSwitchToEn')

    const toggleLanguage = () => {
        const newLang = language === 'en' ? 'de' : 'en'
        const update = () => changeLanguage(newLang)
        const supportsVT =
            typeof document !== 'undefined' &&
            typeof document.startViewTransition === 'function'
        const reduceMotion =
            typeof window !== 'undefined' &&
            window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (supportsVT && !reduceMotion) {
            document.startViewTransition(update)
        } else {
            update()
        }
    }

    return (
        <button
            onClick={toggleLanguage}
            className={styles.languageButton}
            aria-label={tooltip}
            data-tooltip={tooltip}
        >
            {alternateLanguage}
        </button>
    )
}

export default LanguageSwitcher
