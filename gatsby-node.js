exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
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
    `;
  createTypes(typeDefs);
};

exports.onCreateNode = async ({ node, actions, loadNodeContent }) => {
  const { createNode } = actions;

  if (
    node.internal.type === "File" &&
    node.sourceInstanceName === "data" &&
    node.extension === "json"
  ) {
    const nodeName = node.name;
    const content = await loadNodeContent(node);

    let parsedContent;
    try {
      parsedContent = JSON.parse(content);
    } catch (error) {
      console.error(
        `Error parsing JSON from file ${node.relativePath}: ${error}`
      );
      return;
    }

    let typeName;
    if (nodeName === "about-me") {
      typeName = "CustomAboutMeJson";
    } else if (nodeName === "experience") {
      typeName = "CustomExperienceJson";
    } else if (nodeName === "education") {
      typeName = "CustomEducationJson";
    } else {
      return;
    }

    createNode({
      ...parsedContent,
      id: nodeName,
      parent: node.id,
      children: [],
      internal: {
        type: typeName,
        contentDigest: node.internal.contentDigest,
      },
    });
  }
};
