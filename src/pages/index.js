import React from "react";
import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Layout from "../components/Layout";
import AboutMe from "../components/AboutMe";
import ResumeEntry from "../components/ResumeEntry";
import ThemeToggle from "../components/ThemeToggle";
import SocialLinks from "../components/SocialLinks";
import LanguageSwitcher from "../components/LanguageSwitcher";
import * as styles from "./index.module.css";

const IndexPage = ({ data }) => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className={styles.content}>
        <section className={styles.column}>
          {data.customAboutMeJson && <AboutMe data={data.customAboutMeJson} />}
          <div className={styles.bottomRow}>
            <SocialLinks
              links={data.allSocialLinksJson.edges.map((edge) => edge.node)}
            />
            <div className={styles.togglesWrapper}>
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </section>
        <section className={styles.column}>
          {data.customExperienceJson && (
            <ResumeEntry data={data.customExperienceJson} type="Experience" />
          )}
        </section>
        <section className={styles.column}>
          {data.customEducationJson && (
            <ResumeEntry data={data.customEducationJson} type="Education" />
          )}
        </section>
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
        profileTags
      }
      de {
        profilePicture
        profileTitle
        profileDescription
        profileTags
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