import { defineType, defineField } from "sanity"

export const job = defineType({
  name: "job",
  title: "Job",
  type: "document",
  fields: [
    defineField({
      name: "company",
      title: "Company",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "blockContent",
    }),
    defineField({
      name: "image",
      title: "Company Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "website",
      title: "Website",
      type: "url",
    }),
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      of: [{ type: "reference", to: [{ type: "skill" }] }],
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
            }),
            defineField({
              name: "category",
              title: "Category",
              type: "string",
              options: {
                list: [
                  { title: "Architecture", value: "ARCH" },
                  { title: "Feature", value: "FEAT" },
                  { title: "Leadership", value: "LEAD" },
                  { title: "Performance", value: "PERF" },
                  { title: "DevOps", value: "DEVOPS" },
                  { title: "Finance", value: "FIN" },
                ],
                layout: "dropdown",
              },
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "category",
            },
          },
        },
      ],
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
  ],
})
