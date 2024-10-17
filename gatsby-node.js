exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions
    const typeDefs = `
      type AboutMeJson implements Node @dontInfer {
        en: AboutMeContent
        de: AboutMeContent
      }
      type AboutMeContent {
        profilePicture: String
        profileTitle: String
        profileDescription: String
        profileTags: [String]
      }
      type ExperienceJson implements Node @dontInfer {
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
      type EducationJson implements Node @dontInfer {
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
    const { createNode, createNodeField } = actions
    if (node.internal.type === 'File') {
        if (node.name === 'about-me') {
            const content = JSON.parse(node.internal.content)
            createNode({
                ...content,
                id: 'about-me',
                parent: node.id,
                children: [],
                internal: {
                    type: 'AboutMeJson',
                    contentDigest: node.internal.contentDigest,
                },
            })
        } else if (node.name === 'experience') {
            const content = JSON.parse(node.internal.content)
            createNode({
                ...content,
                id: 'experience',
                parent: node.id,
                children: [],
                internal: {
                    type: 'ExperienceJson',
                    contentDigest: node.internal.contentDigest,
                },
            })
        } else if (node.name === 'education') {
            const content = JSON.parse(node.internal.content)
            createNode({
                ...content,
                id: 'education',
                parent: node.id,
                children: [],
                internal: {
                    type: 'EducationJson',
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