import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faPhone,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "gatsby-plugin-react-i18next";
import * as styles from "./SocialLinks.module.css";

const iconMap = {
  github: faGithub,
  linkedin: faLinkedin,
  envelope: faEnvelope,
  phone: faPhone,
};

const SocialLinks = ({ links }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.socialLinks}>
      {links.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
          aria-label={link.name}
          data-tooltip={link.name}
        >
          <FontAwesomeIcon icon={iconMap[link.icon]} />
        </a>
      ))}
      <a
        href="/CV_Noel-Buergler.pdf"
        download="Noel_Buergler_CV.pdf"
        className={styles.socialLink}
        aria-label={t("tooltipDownloadCv")}
        data-tooltip={t("tooltipDownloadCv")}
      >
        <FontAwesomeIcon icon={faFilePdf} />
      </a>
    </div>
  );
};

export default SocialLinks;
