import React, { useRef } from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import AboutMe from "../components/AboutMe"
import ResumeEntry from "../components/ResumeEntry"
import ThemeToggle from "../components/ThemeToggle"
import SocialLinks from "../components/SocialLinks"
import * as styles from "./index.module.css"

const IndexPage = ({ data }) => {
  const contentRef = useRef(null);

  const generatePdf = async () => {
    if (typeof window === 'undefined') return; // Check if we're in the browser
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
          {data.aboutMeJson && <AboutMe data={data.aboutMeJson} />}
          <div className={styles.bottomRow}>
            <SocialLinks
              links={data.allSocialLinksJson.edges.map(edge => edge.node)}
              onPdfClick={generatePdf}
            />
            <ThemeToggle />
          </div>
        </section>
        <section className={styles.column}>
          {data.allExperienceJson && <ResumeEntry data={data.allExperienceJson.edges} type="Experience" />}
        </section>
        <section className={styles.column}>
          {data.allEducationJson && <ResumeEntry data={data.allEducationJson.edges} type="Education" />}
        </section>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    aboutMeJson {
      profilePicture
      profileTitle
      profileDescription
      profileTags
    }
    allExperienceJson {
      edges {
        node {
          experienceLogo
          experienceLogoUrl
          experienceInfoTags
          experienceTitle
          experienceDescription
          experienceTags
        }
      }
    }
    allEducationJson {
      edges {
        node {
          educationLogo
          educationLogoUrl
          educationInfoTags
          educationTitle
          educationDescription
          educationTags
        }
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