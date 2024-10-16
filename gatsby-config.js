module.exports = {
    siteMetadata: {
        title: `My CV Website`,
        description: `A personal CV website built with Gatsby`,
        author: `Noel Bürgler`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        `gatsby-transformer-json`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/static/images`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `data`,
                path: `${__dirname}/data`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
              name: `fonts`,
              path: `${__dirname}/src/fonts`,
            },
        }
    ],
}