import { defineType, defineField } from 'sanity'

export const story = defineType({
  name: 'story',
  title: 'Success Story',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Person Name',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Story Title',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'text',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'imageUrl',
      title: 'Profile Image URL',
      type: 'url',
      description: 'External image URL',
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'coverImageUrl',
      title: 'Cover Image URL',
      type: 'url',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'track',
      title: 'Track',
      type: 'string',
      options: {
        list: [
          { title: 'Web Development', value: 'web-dev' },
          { title: 'Data Science', value: 'data-science' },
          { title: 'Product Design', value: 'product-design' },
          { title: 'AI', value: 'ai' },
        ],
      },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'trackLabel',
      title: 'Track Label',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'graduationDate',
      title: 'Graduation Date',
      type: 'string',
      description: 'Format: YYYY-MM (e.g. 2024-03)',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'currentRole',
      title: 'Current Role',
      type: 'string',
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
    }),
    defineField({
      name: 'beforeRole',
      title: 'Before Role',
      type: 'string',
      description: 'Role before joining TechLabs',
    }),
    defineField({
      name: 'achievements',
      title: 'Achievements',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'narrative',
      title: 'Narrative',
      type: 'object',
      fields: [
        defineField({ name: 'challenge', title: 'Challenge', type: 'text' }),
        defineField({ name: 'discovery', title: 'Discovery', type: 'text' }),
        defineField({ name: 'experience', title: 'Experience', type: 'text' }),
        defineField({
          name: 'transformation',
          title: 'Transformation',
          type: 'text',
        }),
        defineField({ name: 'outcome', title: 'Outcome', type: 'text' }),
      ],
    }),
    defineField({
      name: 'metrics',
      title: 'Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'value', title: 'Value', type: 'string' }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
          },
        },
      ],
    }),
    defineField({
      name: 'photoCredit',
      title: 'Photo Credit',
      type: 'object',
      fields: [
        defineField({
          name: 'photographer',
          title: 'Photographer',
          type: 'string',
        }),
        defineField({
          name: 'profileUrl',
          title: 'Profile URL',
          type: 'url',
        }),
        defineField({
          name: 'photoPageUrl',
          title: 'Photo Page URL',
          type: 'url',
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'track', media: 'image' },
  },
})
