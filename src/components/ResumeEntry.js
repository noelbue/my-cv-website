import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import {
  parseDateRangeFromInfoTags,
  isOngoing,
  formatDuration,
} from "../utils/dateRange";
import * as styles from "./ResumeEntry.module.css";

const ResumeItem = ({ entry, type }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const key = type.toLowerCase();
  const { t, i18n } = useTranslation();

  const infoTags = entry[`${key}InfoTags`] ?? [];
  const range = parseDateRangeFromInfoTags(infoTags);
  const current = isOngoing(range);
  const duration = formatDuration(range, i18n.language);
  const [dateTag, ...metaTags] = infoTags;

  const toggle = () => setOpen((v) => !v);
  const handleKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  const didMount = useRef(false);
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    if (!open || !ref.current) return;
    const el = ref.current;
    const timer = setTimeout(() => {
      const rect = el.getBoundingClientRect();
      const navOffset = 100;
      const viewportH = window.innerHeight;
      const cardFits = rect.height <= viewportH - navOffset - 20;
      let targetY = null;
      if (cardFits && rect.bottom > viewportH) {
        targetY = window.scrollY + rect.bottom - viewportH + 24;
      } else if (rect.top < navOffset || !cardFits) {
        targetY = window.scrollY + rect.top - navOffset;
      }
      if (targetY !== null) {
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
    }, 380);
    return () => clearTimeout(timer);
  }, [open]);

  return (
    <div
      ref={ref}
      className={`${styles.resumeItem} ${open ? styles.open : ""} ${
        current ? styles.current : ""
      }`}
      role="button"
      tabIndex={0}
      aria-expanded={open}
      onClick={toggle}
      onKeyDown={handleKey}
    >
      <span className={styles.timelineDot} aria-hidden="true" />
      <div className={styles.resumeHeader}>
        <a
          href={entry[`${key}LogoUrl`]}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.logoLink}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={entry[`${key}Logo`]}
            alt={entry[`${key}Title`]}
            className={styles.logo}
            width="60"
            height="60"
            loading="lazy"
            decoding="async"
          />
        </a>
        <div className={styles.headerMain}>
          <div className={styles.metaTop}>
            {current && (
              <span className={styles.nowBadge}>
                <span className={styles.nowDot} />
                {t("now")}
              </span>
            )}
            {dateTag && <span className={styles.dateText}>{dateTag}</span>}
            {duration && (
              <span className={styles.durationText}>· {duration}</span>
            )}
          </div>
          <h3 className={styles.resumeTitle}>{entry[`${key}Title`]}</h3>
          {metaTags.length > 0 && (
            <div className={styles.metaBottom}>{metaTags.join(" · ")}</div>
          )}
        </div>
        <span className={styles.chevron} aria-hidden="true">
          <FontAwesomeIcon icon={faChevronDown} />
        </span>
      </div>
      <div className={styles.collapsible}>
        <div className={styles.collapsibleInner}>
          <div className={styles.resumeDescription}>
            {entry[`${key}Description`].split("\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <div className={styles.resumeTags}>
            {entry[`${key}Tags`].map((tag, i) => (
              <span key={i} className={styles.resumeTag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ResumeEntry = ({ data, type }) => {
  const { t, i18n } = useTranslation();
  const content = data[i18n.language];

  if (!content) return null;

  return (
    <section className={styles.resumeSection}>
      <h2 className={styles.sectionTitle}>{t(type.toLowerCase())}</h2>
      <div className={styles.timeline}>
        {content.map((entry, index) => (
          <ResumeItem key={index} entry={entry} type={type} />
        ))}
      </div>
    </section>
  );
};

export default ResumeEntry;
