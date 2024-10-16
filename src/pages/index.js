import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import AboutMe from "../components/AboutMe"
import ResumeEntry from "../components/ResumeEntry"
import ThemeToggle from "../components/ThemeToggle"
import SocialLinks from "../components/SocialLinks"
import * as styles from "./index.module.css"

const IndexPage = ({ data }) => (
  <Layout>
    <div className={styles.content}>
      <section className={styles.column}>
        {data.aboutMeJson && <AboutMe data={data.aboutMeJson} />}
        <div className={styles.bottomRow}>
          <SocialLinks links={data.allSocialLinksJson.edges.map(edge => edge.node)} />
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