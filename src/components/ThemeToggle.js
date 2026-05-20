import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import * as styles from './ThemeToggle.module.css'
import { ThemeContext } from '../context/ThemeContext'

const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext)
    const { t } = useTranslation()
    const label = isDarkMode ? t('tooltipLightMode') : t('tooltipDarkMode')

    return (
        <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={label}
            data-tooltip={label}
        >
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
        </button>
    )
}

export default ThemeToggle