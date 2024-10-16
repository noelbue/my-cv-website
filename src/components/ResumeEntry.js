import React from "react"
import * as styles from "./ResumeEntry.module.css"

const ResumeEntry = ({ data, type }) => {
    return (
        <section className={styles.resumeSection}>
            <h2 className={styles.sectionTitle}>{type}</h2>
            {data.map(({ node }, index) => (
                <div key={index} className={styles.resumeItem}>
                    <div className={styles.resumeHeader}>
                        <a
                            href={node[`${type.toLowerCase()}LogoUrl`]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.logoLink}
                        >
                            <img
                                src={node[`${type.toLowerCase()}Logo`]}
                                alt={node[`${type.toLowerCase()}Title`]}
                                className={styles.logo}
                            />
                        </a>
                        <div className={styles.resumeInfoTags}>
                            {node[`${type.toLowerCase()}InfoTags`].map((tag, tagIndex) => (
                                <span key={tagIndex} className={styles.resumeInfoTag}>{tag}</span>
                            ))}
                        </div>
                    </div>
                    <h3 className={styles.resumeTitle}>{node[`${type.toLowerCase()}Title`]}</h3>
                    <p className={styles.resumeDescription}>{node[`${type.toLowerCase()}Description`]}</p>
                    <div className={styles.resumeTags}>
                        {node[`${type.toLowerCase()}Tags`].map((tag, tagIndex) => (
                            <span key={tagIndex} className={styles.resumeTag}>{tag}</span>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    )
}

export default ResumeEntry