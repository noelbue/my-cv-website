import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import * as styles from './SocialLinks.module.css'

const iconMap = {
    github: faGithub,
    linkedin: faLinkedin,
}

const SocialLinks = ({ links }) => {
    return (
        <div className={styles.socialLinks}>
            {links.map((link, index) => (
                <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label={link.name}
                >
                    <FontAwesomeIcon icon={iconMap[link.icon]} />
                </a>
            ))}
        </div>
    )
}

export default SocialLinks