import React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import * as styles from "./AboutMe.module.css";

const AboutMe = ({ data }) => {
  const { t, i18n } = useTranslation();

  const content = data && data[i18n.language];
  if (!content) return null;

  const paragraphs = content.profileDescription.split("\n").filter(Boolean);

  return (
    <div className={styles.aboutMeWrapper}>
      <h2 className={styles.sectionTitle}>{t("aboutMe")}</h2>
      <div className={styles.aboutMe}>
        <div className={styles.header}>
          <img
            src={content.profilePicture}
            alt={content.profileTitle}
            className={styles.profilePicture}
            width="68"
            height="68"
            fetchpriority="high"
            loading="eager"
            decoding="async"
          />
          <h1 className={styles.title}>{content.profileTitle}</h1>
        </div>
        <div className={styles.description}>
          {paragraphs.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
