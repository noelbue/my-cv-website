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
            <link
                rel="preload"
                as="font"
                type="font/woff2"
                href="/fonts/SF-Pro-Display-Regular.woff2"
                crossOrigin="anonymous"
            />
        </Helmet>
    )
}

export default Seo