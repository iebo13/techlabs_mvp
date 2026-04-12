import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'localeString' }),
        defineField({ name: 'emphasis', title: 'Emphasis Word', type: 'localeString' }),
        defineField({ name: 'subtitle', title: 'Subtitle', type: 'localeString' }),
      ],
    }),
    defineField({
      name: 'applicationDeadlineISO',
      title: 'Application Deadline',
      type: 'datetime',
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'object',
      fields: [
        defineField({ name: 'posterUrl', title: 'Poster URL', type: 'string' }),
        defineField({ name: 'srcUrl', title: 'Video Source URL', type: 'string' }),
        defineField({ name: 'duration', title: 'Duration (seconds)', type: 'number' }),
      ],
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'icon', title: 'Icon', type: 'string' }),
            defineField({ name: 'title', title: 'Title', type: 'localeString' }),
            defineField({ name: 'body', title: 'Body', type: 'localeText' }),
          ],
          preview: {
            select: { title: 'title.en', subtitle: 'icon' },
          },
        },
      ],
    }),
    defineField({
      name: 'numbers',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'localeString' }),
            defineField({ name: 'value', title: 'Value', type: 'string' }),
          ],
          preview: {
            select: { title: 'label.en', subtitle: 'value' },
          },
        },
      ],
    }),
    defineField({
      name: 'support',
      title: 'Support Section',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'localeString' }),
        defineField({ name: 'body', title: 'Body', type: 'localeText' }),
        defineField({ name: 'imageUrl', title: 'Image URL', type: 'string' }),
        defineField({
          name: 'cta',
          title: 'Call to Action',
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'localeString' }),
            defineField({ name: 'to', title: 'Link', type: 'string' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'about',
      title: 'About Page Content',
      type: 'object',
      fields: [
        defineField({
          name: 'mission',
          title: 'Mission',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
            defineField({
              name: 'values',
              title: 'Values',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'title', title: 'Title', type: 'string' }),
                    defineField({ name: 'description', title: 'Description', type: 'text' }),
                  ],
                },
              ],
            }),
          ],
        }),
        defineField({
          name: 'program',
          title: 'Program',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
            defineField({
              name: 'phases',
              title: 'Phases',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'title', title: 'Title', type: 'string' }),
                    defineField({ name: 'description', title: 'Description', type: 'text' }),
                    defineField({ name: 'duration', title: 'Duration', type: 'string' }),
                    defineField({ name: 'icon', title: 'Icon', type: 'string' }),
                  ],
                },
              ],
            }),
          ],
        }),
        defineField({
          name: 'timeline',
          title: 'Timeline',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
            defineField({
              name: 'milestones',
              title: 'Milestones',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'year', title: 'Year', type: 'string' }),
                    defineField({ name: 'title', title: 'Title', type: 'string' }),
                    defineField({ name: 'description', title: 'Description', type: 'text' }),
                  ],
                },
              ],
            }),
          ],
        }),
        defineField({
          name: 'team',
          title: 'Team Section',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
          ],
        }),
        defineField({
          name: 'contact',
          title: 'Contact',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
            defineField({ name: 'email', title: 'Email', type: 'string' }),
            defineField({ name: 'phone', title: 'Phone', type: 'string' }),
            defineField({ name: 'address', title: 'Address', type: 'string' }),
            defineField({
              name: 'social',
              title: 'Social Links',
              type: 'object',
              fields: [
                defineField({ name: 'linkedin', title: 'LinkedIn', type: 'url' }),
                defineField({ name: 'twitter', title: 'Twitter', type: 'url' }),
                defineField({ name: 'github', title: 'GitHub', type: 'url' }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
