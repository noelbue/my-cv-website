// gatsby-node.js
exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions
    const typeDefs = `
      type CustomAboutMeJson implements Node @dontInfer {
        en: AboutMeContent
        de: AboutMeContent
      }
      type AboutMeContent {
        profilePicture: String
        profileTitle: String
        profileDescription: String
        profileTags: [String]
      }
      type CustomExperienceJson implements Node @dontInfer {
        en: [ExperienceContent]
        de: [ExperienceContent]
      }
      type ExperienceContent {
        experienceLogo: String
        experienceLogoUrl: String
        experienceInfoTags: [String]
        experienceTitle: String
        experienceDescription: String
        experienceTags: [String]
      }
      type CustomEducationJson implements Node @dontInfer {
        en: [EducationContent]
        de: [EducationContent]
      }
      type EducationContent {
        educationLogo: String
        educationLogoUrl: String
        educationInfoTags: [String]
        educationTitle: String
        educationDescription: String
        educationTags: [String]
      }
    `
    createTypes(typeDefs)
}

exports.onCreateNode = ({ node, actions }) => {
    const { createNode } = actions
    if (node.internal.type === 'File') {
        const nodeName = node.name
        const content = JSON.parse(node.internal.content)

        if (nodeName === 'about-me') {
            createNode({
                ...content,
                id: 'about-me',
                parent: node.id,
                children: [],
                internal: {
                    type: 'CustomAboutMeJson',
                    contentDigest: node.internal.contentDigest,
                },
            })
        } else if (nodeName === 'experience') {
            createNode({
                ...content,
                id: 'experience',
                parent: node.id,
                children: [],
                internal: {
                    type: 'CustomExperienceJson',
                    contentDigest: node.internal.contentDigest,
                },
            })
        } else if (nodeName === 'education') {
            createNode({
                ...content,
                id: 'education',
                parent: node.id,
                children: [],
                internal: {
                    type: 'CustomEducationJson',
                    contentDigest: node.internal.contentDigest,
                },
            })
        }
    }
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    if (stage === "build-html" || stage === "develop-html") {
        actions.setWebpackConfig({
            module: {
                rules: [
                    {
                        test: /html2pdf\.js/,
                        use: loaders.null(),
                    },
                ],
            },
        })
    }
}
