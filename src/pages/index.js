import React, { useRef } from "react"
import { graphql } from "gatsby"
import { useTranslation } from 'gatsby-plugin-react-i18next'
import Layout from "../components/Layout"
import AboutMe from "../components/AboutMe"
import ResumeEntry from "../components/ResumeEntry"
import ThemeToggle from "../components/ThemeToggle"
import SocialLinks from "../components/SocialLinks"
import LanguageSwitcher from "../components/LanguageSwitcher"
import * as styles from "./index.module.css"

const IndexPage = ({ data }) => {
  const { t } = useTranslation()
  const contentRef = useRef(null);

  const generatePdf = async () => {
    if (typeof window === 'undefined') return;
    if (!contentRef.current) return;

    const html2pdf = (await import('html2pdf.js')).default;

    const content = contentRef.current.cloneNode(true);
    content.classList.add('pdf-mode');
    document.body.appendChild(content);

    const opt = {
      margin: 10,
      filename: 'noel_buergler_cv.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: true,
        letterRendering: true
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(content).save().then(() => {
      document.body.removeChild(content);
    }).catch(err => console.error('PDF generation failed', err));
  };

  return (
    <Layout>
      <div className={styles.content} ref={contentRef}>
        <section className={styles.column}>
          {data.customAboutMeJson && <AboutMe data={data.customAboutMeJson} />}
          <div className={styles.bottomRow}>
            <SocialLinks
              links={data.allSocialLinksJson.edges.map(edge => edge.node)}
              onPdfClick={generatePdf}
            />
            <div className={styles.togglesWrapper}>
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </section>
        <section className={styles.column}>
          {data.customExperienceJson && <ResumeEntry data={data.customExperienceJson} type="Experience" />}
        </section>
        <section className={styles.column}>
          {data.customEducationJson && <ResumeEntry data={data.customEducationJson} type="Education" />}
        </section>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
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
`

export default IndexPage