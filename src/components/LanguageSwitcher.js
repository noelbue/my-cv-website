import React from 'react'
import { useI18next } from 'gatsby-plugin-react-i18next'
import * as styles from './LanguageSwitcher.module.css'

const LanguageSwitcher = () => {
    const { languages, changeLanguage, language } = useI18next()

    const toggleLanguage = () => {
        const newLang = language === 'en' ? 'de' : 'en'
        changeLanguage(newLang)
    }

    return (
        <button onClick={toggleLanguage} className={styles.languageButton}>
            {language.toUpperCase()}
        </button>
    )
}

export default LanguageSwitcher