import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faLayerGroup,
  faDatabase,
  faServer,
  faPlug,
  faNewspaper,
  faGears,
  faPrint,
  faNetworkWired,
  faHandshake,
  faLanguage,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import * as styles from "./Skills.module.css";

const iconMap = {
  code: faCode,
  "layer-group": faLayerGroup,
  database: faDatabase,
  server: faServer,
  plug: faPlug,
  newspaper: faNewspaper,
  gears: faGears,
  print: faPrint,
  "network-wired": faNetworkWired,
  handshake: faHandshake,
};

const levelToDots = { C2: 6, C1: 5, B2: 4, B1: 3, A2: 2, A1: 1 };

const ProficiencyDots = ({ level }) => {
  const filled = levelToDots[level] ?? 0;
  return (
    <span className={styles.dots} aria-label={`Level ${level}`}>
      {Array.from({ length: 6 }).map((_, i) => (
        <span
          key={i}
          className={`${styles.dot} ${i < filled ? styles.dotFilled : ""}`}
        />
      ))}
    </span>
  );
};

const SkillCategoryCard = ({ category, open, onToggle, index = 0 }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <div
      ref={ref}
      className={`${styles.card} ${styles.clickable} ${
        open ? styles.open : ""
      } ${visible ? styles.visible : ""}`}
      style={{ transitionDelay: visible ? "0ms" : `${index * 40}ms` }}
      role="button"
      tabIndex={0}
      aria-expanded={open}
      onClick={onToggle}
      onKeyDown={handleKey}
    >
      <div className={styles.cardHeader}>
        <span className={styles.cardIcon}>
          <FontAwesomeIcon icon={iconMap[category.icon] ?? faCode} />
        </span>
        <h3 className={styles.cardTitle} title={category.title}>
          {category.title}
        </h3>
        <span className={styles.chevron} aria-hidden="true">
          <FontAwesomeIcon icon={faChevronDown} />
        </span>
      </div>
      <div className={styles.collapsible}>
        <div className={styles.collapsibleInner}>
          <div className={styles.chips}>
            {category.items.map((item, i) => (
              <span key={i} className={styles.chip}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Skills = ({ data }) => {
  const { t, i18n } = useTranslation();
  const [openSet, setOpenSet] = useState(() => new Set());

  const content = data && data[i18n.language];
  if (!content) return null;

  const generalCompetencies = content.categories.find(
    (c) => c.icon === "handshake",
  );
  const otherCategories = content.categories.filter(
    (c) => c.icon !== "handshake",
  );

  const allOpen =
    otherCategories.length > 0 && openSet.size === otherCategories.length;

  const toggleOne = (key) =>
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const toggleAll = () => {
    if (allOpen) setOpenSet(new Set());
    else setOpenSet(new Set(otherCategories.map((c) => c.title)));
  };

  return (
    <section className={styles.skillsSection}>
      <div className={styles.skillsHeader}>
        <h2 className={styles.sectionTitle}>{t("skills")}</h2>
        <button
          type="button"
          className={styles.expandToggle}
          onClick={toggleAll}
          aria-pressed={allOpen}
        >
          <span>{allOpen ? t("collapseAll") : t("expandAll")}</span>
          <span
            className={`${styles.expandChevron} ${
              allOpen ? styles.expandChevronOpen : ""
            }`}
            aria-hidden="true"
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </span>
        </button>
      </div>

      <div className={styles.topRow}>
        <div className={`${styles.card} ${styles.visible} ${styles.flatCard}`}>
          <div className={styles.cardHeader}>
            <span className={styles.cardIcon}>
              <FontAwesomeIcon icon={faLanguage} />
            </span>
            <h3 className={styles.cardTitle}>{t("languages")}</h3>
          </div>
          <ul className={styles.languageList}>
            {content.languages.map((lang, i) => (
              <li key={i} className={styles.languageItem}>
                <div className={styles.languageHeader}>
                  <span className={styles.languageName}>{lang.name}</span>
                  <span className={styles.languageLevel}>{lang.level}</span>
                </div>
                <ProficiencyDots level={lang.level} />
                {lang.note && (
                  <span className={styles.languageNote}>{lang.note}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {generalCompetencies && (
          <div
            className={`${styles.card} ${styles.visible} ${styles.flatCard}`}
          >
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>
                <FontAwesomeIcon icon={faHandshake} />
              </span>
              <h3 className={styles.cardTitle}>{generalCompetencies.title}</h3>
            </div>
            <div className={`${styles.chips} ${styles.competenciesChips}`}>
              {generalCompetencies.items.map((item, i) => (
                <span key={i} className={styles.chip}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={styles.cardGrid}>
        {otherCategories.map((category, i) => (
          <SkillCategoryCard
            key={category.title}
            category={category}
            open={openSet.has(category.title)}
            onToggle={() => toggleOne(category.title)}
            index={i}
          />
        ))}
      </div>
    </section>
  );
};

export default Skills;
