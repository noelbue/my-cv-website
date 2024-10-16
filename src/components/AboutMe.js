import React from "react"
import * as styles from "./AboutMe.module.css"

const AboutMe = ({ data }) => (
    <div className={styles.aboutMeWrapper}>
        <h2 className={styles.sectionTitle}>About Me</h2>
        <div className={styles.aboutMe}>
            <div className={styles.header}>
                <img src={data.profilePicture} alt={data.profileTitle} className={styles.profilePicture} />
                <h1 className={styles.title}>{data.profileTitle}</h1>
            </div>
            <p className={styles.description}>{data.profileDescription}</p>
            <div className={styles.tags}>
                {data.profileTags.map((tag, index) => (
                    <span key={index} className={styles.tag}>{tag}</span>
                ))}
            </div>
        </div>
    </div>
)

export default AboutMe