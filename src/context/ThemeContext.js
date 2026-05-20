import React, { createContext, useState, useEffect } from 'react'
import { flushSync } from 'react-dom'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        setIsDarkMode(savedTheme === 'dark' || (!savedTheme && prefersDark))
    }, [])

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark-mode')
            document.documentElement.classList.remove('light-mode')
        } else {
            document.documentElement.classList.add('light-mode')
            document.documentElement.classList.remove('dark-mode')
        }
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
    }, [isDarkMode])

    const toggleTheme = () => {
        const update = () => setIsDarkMode(prev => !prev)
        const supportsVT =
            typeof document !== 'undefined' &&
            typeof document.startViewTransition === 'function'
        const reduceMotion =
            typeof window !== 'undefined' &&
            window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (supportsVT && !reduceMotion) {
            document.startViewTransition(() => flushSync(update))
        } else {
            update()
        }
    }

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
