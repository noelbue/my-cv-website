import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import * as styles from './ThemeToggle.module.css'
import { ThemeContext } from '../context/ThemeContext'

const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext)

    return (
        <button className={styles.themeToggle} onClick={toggleTheme} aria-label="Toggle theme">
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
        </button>
    )
}

export default ThemeToggle