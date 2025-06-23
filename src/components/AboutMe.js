import React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import * as styles from "./AboutMe.module.css";

const AboutMe = ({ data }) => {
  const { t, i18n } = useTranslation();
  const content = data && data[i18n.language];

  if (!content) {
    return null; // or some fallback UI
  }

  return (
    <div className={styles.aboutMeWrapper}>
      <h2 className={styles.sectionTitle}>{t("aboutMe")}</h2>
      <div className={styles.aboutMe}>
        <div className={styles.header}>
          <img
            src={content.profilePicture}
            alt={content.profileTitle}
            className={styles.profilePicture}
          />
          <h1 className={styles.title}>{content.profileTitle}</h1>
        </div>
        <div className={styles.description}>
          {content.profileDescription.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
        <div className={styles.tags}>
          {content.profileTags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
