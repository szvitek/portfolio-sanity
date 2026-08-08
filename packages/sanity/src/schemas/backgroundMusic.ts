import { defineType, defineField } from "sanity"

export const backgroundMusic = defineType({
  name: "backgroundMusic",
  title: "Background Music",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "audioFile",
      title: "Audio File",
      type: "file",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "enabled",
      title: "Enabled",
      type: "boolean",
      description: "When off, the header waveform player is hidden.",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Playback order. Lower numbers play first.",
      initialValue: 0,
    }),
  ],
})
