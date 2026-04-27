import { defineType, defineField } from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'localeString',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'localeText',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'section',
      title: 'Section',
      type: 'string',
      description: 'Which page this FAQ belongs to',
      options: {
        list: [
          { title: 'General / Home', value: 'general' },
          { title: 'Partners', value: 'partners' },
          { title: 'Tracks', value: 'tracks' },
          { title: 'About', value: 'about' },
        ],
      },
      initialValue: 'general',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
  ],
  preview: {
    select: { title: 'question.en', subtitle: 'section' },
  },
})
