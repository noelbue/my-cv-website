import React from 'react'
import { useI18next } from 'gatsby-plugin-react-i18next'
import * as styles from './LanguageSwitcher.module.css'

const LanguageSwitcher = () => {
    const { changeLanguage, language } = useI18next()

    const alternateLanguage = language === 'en' ? 'DE' : 'EN'

    const toggleLanguage = () => {
        const newLang = language === 'en' ? 'de' : 'en'
        changeLanguage(newLang)
    }

    return (
        <button onClick={toggleLanguage} className={styles.languageButton}>
            {alternateLanguage}
        </button>
    )
}

export default LanguageSwitcher
