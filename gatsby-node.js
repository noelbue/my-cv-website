exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions
    const typeDefs = `
      type AboutMeJson implements Node @dontInfer {
        profilePicture: String
        profileTitle: String
        profileDescription: String
        profileTags: [String]
      }
    `
    createTypes(typeDefs)
}

exports.onCreateNode = ({ node, actions }) => {
    const { createNode, createNodeField } = actions
    if (node.internal.type === 'File' && node.name === 'about-me') {
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
    }
}