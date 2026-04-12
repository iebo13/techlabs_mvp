import { defineType, defineField } from 'sanity'

export const track = defineType({
  name: 'track',
  title: 'Track',
  type: 'document',
  fields: [
    defineField({
      name: 'trackId',
      title: 'Track ID',
      type: 'string',
      options: {
        list: [
          { title: 'Web Development', value: 'web-dev' },
          { title: 'Data Science', value: 'data-science' },
          { title: 'Product Design', value: 'product-design' },
          { title: 'Artificial Intelligence', value: 'ai' },
        ],
      },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'localeString',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'applicationDeadline',
      title: 'Application Deadline',
      type: 'string',
      description: 'Human-readable deadline (e.g. "February 15, 2025")',
    }),
    defineField({
      name: 'spotsAvailable',
      title: 'Spots Available',
      type: 'number',
      validation: rule => rule.min(0),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Emoji icon for the track',
    }),
  ],
  preview: {
    select: { title: 'label.en', subtitle: 'trackId' },
  },
})
