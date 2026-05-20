import React from "react";
import "../fonts.css";
import "../global.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import * as styles from "./Layout.module.css";
import { ThemeProvider } from "../context/ThemeContext";
import Seo from "./Seo";
import Atmosphere from "./Atmosphere";

const Layout = ({ children }) => {
  return (
    <ThemeProvider>
      <Seo />
      <Atmosphere />
      <div className={styles.layout}>
        <main className={styles.mainContent}>{children}</main>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
