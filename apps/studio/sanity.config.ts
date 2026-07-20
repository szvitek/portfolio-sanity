import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { schemaTypes } from "@portfolio/sanity/schemas"
import { singletonPlugin } from "./plugins/singleton"

const projectId = process.env.SANITY_STUDIO_PROJECT_ID!
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production"

export default defineConfig({
  name: "portfolio",
  title: "Portfolio",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Profile")
              .id("profile")
              .child(
                S.document()
                  .schemaType("profile")
                  .documentId("profile"),
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => item.getId() !== "profile",
            ),
          ]),
    }),
    singletonPlugin({ types: ["profile"] }),
  ],
  schema: {
    types: schemaTypes,
  },
})
