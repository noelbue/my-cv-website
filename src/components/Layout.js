import React from "react"
import '../fonts.css'
import '../global.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import * as styles from './Layout.module.css'
import { ThemeProvider } from '../context/ThemeContext'

const Layout = ({ children }) => {
  return (
    <ThemeProvider>
      <div className={styles.layout}>
        <main className={styles.mainContent}>{children}</main>
      </div>
    </ThemeProvider>
  )
}

export default Layout