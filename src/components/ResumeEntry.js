import React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import * as styles from "./ResumeEntry.module.css";

const ResumeEntry = ({ data, type }) => {
  const { t, i18n } = useTranslation();
  const content = data[i18n.language];

  if (!content) {
    return null; // or some fallback UI
  }

  return (
    <section className={styles.resumeSection}>
      <h2 className={styles.sectionTitle}>{t(type.toLowerCase())}</h2>
      {content.map((entry, index) => (
        <div key={index} className={styles.resumeItem}>
          <div className={styles.resumeHeader}>
            <a
              href={entry[`${type.toLowerCase()}LogoUrl`]}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={entry[`${type.toLowerCase()}Logo`]}
                alt={entry[`${type.toLowerCase()}Title`]}
                className={styles.logo}
              />
            </a>
            <div className={styles.resumeInfoTags}>
              {entry[`${type.toLowerCase()}InfoTags`].map((tag, tagIndex) => (
                <span key={tagIndex} className={styles.resumeInfoTag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <h3 className={styles.resumeTitle}>
            {entry[`${type.toLowerCase()}Title`]}
          </h3>
          <div className={styles.resumeDescription}>
            {entry[`${type.toLowerCase()}Description`]
              .split("\n")
              .map((line, index) => (
                <p key={index}>{line}</p>
              ))}
          </div>
          <div className={styles.resumeTags}>
            {entry[`${type.toLowerCase()}Tags`].map((tag, tagIndex) => (
              <span key={tagIndex} className={styles.resumeTag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default ResumeEntry;
