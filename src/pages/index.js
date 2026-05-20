import React from "react";
import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout";
import AboutMe from "../components/AboutMe";
import Skills from "../components/Skills";
import StatsStrip from "../components/StatsStrip";
import ResumeEntry from "../components/ResumeEntry";
import ThemeToggle from "../components/ThemeToggle";
import SocialLinks from "../components/SocialLinks";
import LanguageSwitcher from "../components/LanguageSwitcher";
import * as styles from "./index.module.css";

const IndexPage = ({ data }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const experience = data.customExperienceJson?.[lang];
  const skills = data.customSkillsJson?.[lang];
  const aboutMe = data.customAboutMeJson?.[lang];
  const education = data.customEducationJson?.[lang];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Noel Bürgler",
    url: "https://noelbuergler.ch/",
    jobTitle: experience?.[0]?.experienceTitle ?? t("pageTitle"),
    description: t("pageDescription"),
    image: "https://noelbuergler.ch/images/profile-pic.png",
    sameAs: data.allSocialLinksJson.edges
      .map((e) => e.node.url)
      .filter((u) => u && u.startsWith("http")),
    knowsAbout: skills
      ? Array.from(
          new Set(skills.categories.flatMap((c) => c.items)),
        ).slice(0, 80)
      : undefined,
    knowsLanguage: skills?.languages?.map((l) => l.name),
    worksFor: experience?.[0]
      ? {
          "@type": "Organization",
          name: experience[0].experienceTitle,
          url: experience[0].experienceLogoUrl,
        }
      : undefined,
    alumniOf: education?.map((e) => ({
      "@type": "EducationalOrganization",
      name: e.educationTitle,
      url: e.educationLogoUrl,
    })),
  };

  return (
    <Layout>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <header className={styles.topBar}>
          <a
            href="#top"
            className={styles.brand}
            aria-label="Scroll to top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className={styles.brandName}>noelbuergler</span>
            <span className={styles.brandTld}>.ch</span>
          </a>
          <div className={styles.topGroup}>
            <span className={styles.topGroupLabel}>{t("quickLinks")}</span>
            <SocialLinks
              links={data.allSocialLinksJson.edges.map((edge) => edge.node)}
            />
          </div>
          <div className={styles.topGroup}>
            <span className={styles.topGroupLabel}>{t("settings")}</span>
            <div className={styles.togglesWrapper}>
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
      </header>

      <div className={styles.content}>
        {experience && skills && (
          <StatsStrip experience={experience} skills={skills} />
        )}

        <div className={styles.row}>
          <section className={styles.cell}>
            {aboutMe && <AboutMe data={data.customAboutMeJson} />}
          </section>
          <section className={styles.cell}>
            {skills && <Skills data={data.customSkillsJson} />}
          </section>
        </div>
        <div className={styles.row}>
          <section className={styles.cell}>
            {experience && (
              <ResumeEntry data={data.customExperienceJson} type="Experience" />
            )}
          </section>
          <section className={styles.cell}>
            {education && (
              <ResumeEntry data={data.customEducationJson} type="Education" />
            )}
          </section>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    customAboutMeJson {
      en {
        profilePicture
        profileTitle
        profileDescription
      }
      de {
        profilePicture
        profileTitle
        profileDescription
      }
    }
    customSkillsJson {
      en {
        languages {
          name
          level
          note
        }
        categories {
          icon
          title
          items
        }
      }
      de {
        languages {
          name
          level
          note
        }
        categories {
          icon
          title
          items
        }
      }
    }
    customExperienceJson {
      en {
        experienceLogo
        experienceLogoUrl
        experienceInfoTags
        experienceTitle
        experienceDescription
        experienceTags
      }
      de {
        experienceLogo
        experienceLogoUrl
        experienceInfoTags
        experienceTitle
        experienceDescription
        experienceTags
      }
    }
    customEducationJson {
      en {
        educationLogo
        educationLogoUrl
        educationInfoTags
        educationTitle
        educationDescription
        educationTags
      }
      de {
        educationLogo
        educationLogoUrl
        educationInfoTags
        educationTitle
        educationDescription
        educationTags
      }
    }
    allSocialLinksJson {
      edges {
        node {
          name
          url
          icon
        }
      }
    }
  }
`;

export default IndexPage;
