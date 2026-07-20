import { definePlugin } from "sanity"

interface SingletonPluginOptions {
  types: string[]
}

export const singletonPlugin = definePlugin<SingletonPluginOptions>(
  (options) => {
    return {
      name: "singleton",
      document: {
        newDocumentOptions: (prev, { creationContext }) => {
          if (creationContext.type === "global") {
            return prev.filter(
              (template) => !options.types.includes(template.templateId),
            )
          }
          return prev
        },
        actions: (prev, { schemaType }) => {
          if (options.types.includes(schemaType)) {
            return prev.filter(
              (action) =>
                action.action === "publish" ||
                action.action === "discardChanges" ||
                action.action === "restore",
            )
          }
          return prev
        },
      },
    }
  },
)
