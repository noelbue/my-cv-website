import React from "react"
import '../fonts.css'
import '../global.css'
import '../styles/pdf-styles.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import * as styles from './Layout.module.css'
import { ThemeProvider } from '../context/ThemeContext'
import Seo from './Seo'

const Layout = ({ children }) => {
  return (
    <ThemeProvider>
      <Seo />
      <div className={styles.layout}>
        <main className={styles.mainContent}>{children}</main>
      </div>
    </ThemeProvider>
  )
}

export default Layout