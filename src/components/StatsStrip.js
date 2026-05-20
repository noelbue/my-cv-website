import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import * as styles from "./StatsStrip.module.css";
import { totalYearsSinceEarliest } from "../utils/dateRange";

const useCountUp = (target, duration = 900) => {
  const [value, setValue] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setValue(target);
      return;
    }
    let raf = null;
    let start = null;

    const animate = (ts) => {
      if (start === null) start = ts;
      const progress = Math.min(1, (ts - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          raf = requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [target, duration]);

  return [value, ref];
};

const StatItem = ({ value, label, suffix }) => {
  const [count, ref] = useCountUp(value);
  return (
    <div className={styles.stat} ref={ref}>
      <span className={styles.value}>
        {count}
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </span>
      <span className={styles.label}>{label}</span>
    </div>
  );
};

const StatsStrip = ({ experience, skills }) => {
  const { t } = useTranslation();

  const years = totalYearsSinceEarliest(experience);
  const roles = experience?.length ?? 0;
  const techCount = skills?.categories
    ? new Set(
        skills.categories
          .filter((c) => c.icon !== "handshake")
          .flatMap((c) => c.items),
      ).size
    : 0;
  const languages = skills?.languages?.length ?? 0;

  return (
    <div className={styles.strip}>
      <StatItem value={years} suffix="+" label={t("statsYears")} />
      <StatItem value={roles} label={t("statsRoles")} />
      <StatItem value={techCount} suffix="+" label={t("statsTechnologies")} />
      <StatItem value={languages} label={t("statsLanguages")} />
    </div>
  );
};

export default StatsStrip;
