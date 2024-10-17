import React from "react"
import { useI18next } from 'gatsby-plugin-react-i18next'
import { Helmet } from "react-helmet"

const Seo = () => {
    const { t, i18n } = useI18next()

    return (
        <Helmet>
            <html lang={i18n.language} />
            <title>{t('pageTitle')}</title>
            <meta name="description" content={t('pageDescription')} />
            <link rel="icon" href="/images/favicon.ico" />
        </Helmet>
    )
}

export default Seo